import { NextResponse } from 'next/server';
import { ComplianceEvaluation, AIComplianceFlag } from '@/types/workspace';

export async function POST(req: Request) {
  try {
    const { scriptText, mandatoryTalkingPoints, discountCode } = await req.json();
    
    if (!scriptText) {
      return NextResponse.json({ error: 'Missing script text' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Use deterministic mock if no key or fallback enabled
    if (!apiKey || process.env.NEXT_PUBLIC_USE_MOCK_FALLBACK === 'true') {
      return NextResponse.json(generateDeterministicCompliance(scriptText, mandatoryTalkingPoints, discountCode));
    }

    const prompt = `You are a strict legal and compliance AI auditor for brand sponsorships.
Analyze the following creator script against the mandatory brand requirements.

SCRIPT TEXT:
"""
${scriptText}
"""

REQUIREMENTS:
1. Talking Points:
${(mandatoryTalkingPoints || []).map((tp: string) => `- ${tp}`).join('\n')}
2. Discount Code: Must explicitly mention the code "${discountCode || 'NONE'}"

INSTRUCTIONS:
Return a JSON object matching this schema:
{
  "overallPassed": boolean,
  "score": number (0-100),
  "productMentionDetected": boolean,
  "ctaDetected": boolean,
  "promoCodeDetected": boolean,
  "detectedPromoCode": string or null,
  "estimatedDurationSeconds": number (approx 130 words per minute),
  "unsupportedClaimsDetected": boolean,
  "summaryFeedback": string (1-2 sentences of feedback),
  "flags": [
    {
      "id": string (unique),
      "type": "pass" | "warning" | "error",
      "category": "talking_point" | "cta" | "promo_code" | "duration" | "claim_safety",
      "title": string,
      "description": string
    }
  ]
}

OUTPUT FORMAT: Strict raw JSON only. Do not wrap in markdown or backticks.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.1,
            responseMimeType: 'application/json',
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from Gemini');
    }

    const result = await response.json();
    const textOutput = result.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!textOutput) throw new Error('Empty response');

    const parsed: ComplianceEvaluation = JSON.parse(textOutput);
    parsed.evaluatedAt = new Date().toISOString();
    
    return NextResponse.json(parsed);
  } catch (error) {
    console.error('Compliance AI Error:', error);
    // Fallback on error
    return NextResponse.json({ error: 'AI processing failed' }, { status: 500 });
  }
}

// Fallback deterministic logic for demo purposes
function generateDeterministicCompliance(scriptText: string, points: string[], code: string): ComplianceEvaluation {
  const lowerScript = scriptText.toLowerCase();
  
  const hasCode = Boolean(code && lowerScript.includes(code.toLowerCase()));
  const words = scriptText.split(/\s+/).length;
  const estimatedSeconds = Math.round((words / 130) * 60);
  
  const missingPoints = (points || []).filter(p => {
    // Very simple heuristic: check if at least 2 keywords from the point exist in script
    const kws = p.toLowerCase().split(' ').filter(w => w.length > 4);
    if (kws.length === 0) return true;
    const matchCount = kws.filter(kw => lowerScript.includes(kw)).length;
    return matchCount < 2; // Needs at least 2 keywords
  });

  const flags: AIComplianceFlag[] = [];
  
  if (hasCode) {
    flags.push({
      id: 'f1', type: 'pass', category: 'promo_code',
      title: 'Promo Code Detected', description: `Successfully identified code "${code}"`
    });
  } else {
    flags.push({
      id: 'f1', type: 'error', category: 'promo_code',
      title: 'Missing Promo Code', description: `Script must include code "${code}"`
    });
  }

  if (missingPoints.length > 0) {
    flags.push({
      id: 'f2', type: 'error', category: 'talking_point',
      title: 'Missing Talking Points', description: `Failed to detect ${missingPoints.length} mandatory talking point(s).`
    });
  } else {
    flags.push({
      id: 'f2', type: 'pass', category: 'talking_point',
      title: 'Talking Points Verified', description: 'All mandatory talking points appear to be addressed.'
    });
  }

  const overallPassed = hasCode && missingPoints.length === 0;

  return {
    overallPassed,
    score: overallPassed ? 95 : 45,
    evaluatedAt: new Date().toISOString(),
    productMentionDetected: lowerScript.includes('cyberflow'),
    ctaDetected: lowerScript.includes('link in description'),
    promoCodeDetected: !!hasCode,
    detectedPromoCode: hasCode ? code : undefined,
    estimatedDurationSeconds: estimatedSeconds,
    unsupportedClaimsDetected: false,
    summaryFeedback: overallPassed 
      ? 'Script meets all mandatory brand guidelines and is ready for recording.'
      : 'Script is missing required elements. Please review the errors before recording.',
    flags,
  };
}
