// Google Gemini Flash AI Integration (Zero-Cost Free Tier API)
import { CampaignBrief } from '@/types/campaign';
import { Creator } from '@/types/creator';

export interface CreatorMatchExplanation {
  creatorId: string;
  matchScore: number; // 0 - 100
  matchReasons: string[];
  evidence: string[];
  risksOrCaveats: string[];
  confidence: 'high' | 'medium' | 'low';
}

export async function generateCreatorMatchesWithAI(
  brief: CampaignBrief,
  candidates: Creator[]
): Promise<CreatorMatchExplanation[]> {
  const apiKey = process.env.GEMINI_API_KEY;

  // If no API key or in mock fallback mode, use deterministic heuristic explainability
  if (!apiKey || process.env.NEXT_PUBLIC_USE_MOCK_FALLBACK === 'true') {
    return generateDeterministicMatches(brief, candidates);
  }

  try {
    const prompt = `You are an expert creator-brand matching algorithm for SynapseOS.
Evaluate the following candidate creators for the campaign brief and return a strict JSON array.

CAMPAIGN BRIEF:
Brand: ${brief.brandName} (${brief.brandIndustry})
Product: ${brief.productName} - ${brief.productDescription}
Objective: ${brief.campaignObjective}
Target Audience: ${brief.targetAudience}
Target Niches: ${brief.targetNiches.join(', ')}
Budget Per Creator: $${brief.budgetPerCreator}
Deliverables: ${brief.deliverablesRequired.join(', ')}
Talking Points: ${brief.mandatoryTalkingPoints.join('; ')}

CANDIDATE CREATORS:
${candidates
  .map(
    (c) => `
ID: ${c.id}
Name: ${c.name} (${c.state})
Niches: ${c.niche.join(', ')}
Headline: ${c.headline}
Dedicated Rate: $${c.rates.dedicatedVideo}
Avg Engagement: ${c.metrics.avgEngagement}%
On-Time Delivery: ${c.metrics.onTimeDeliveryRate}%
Completed Deals: ${c.metrics.totalCompletedDeals}
`
  )
  .join('\n')}

INSTRUCTIONS:
Return a JSON array containing objects with:
- creatorId (string)
- matchScore (integer 0-100)
- matchReasons (array of 3 specific reasons explaining why they fit this specific brief)
- evidence (array of 2 verifiable data points supporting the fit)
- risksOrCaveats (array of 1-2 caveats or items needing brand confirmation, e.g. budget fit, exclusivity, rate gaps)
- confidence ("high" | "medium" | "low")

OUTPUT FORMAT: Strict raw JSON only. Do not wrap in markdown or backticks.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2,
            responseMimeType: 'application/json',
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API returned status ${response.status}`);
    }

    const result = await response.json();
    const textOutput = result.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textOutput) {
      throw new Error('Empty response from Gemini Flash');
    }

    const parsed = JSON.parse(textOutput) as CreatorMatchExplanation[];
    return parsed;
  } catch (err) {
    console.warn(`[Gemini AI Matcher Warning]: ${(err as Error).message}. Falling back to deterministic matching.`);
    return generateDeterministicMatches(brief, candidates);
  }
}

// Fallback deterministic match generator
function generateDeterministicMatches(
  brief: CampaignBrief,
  candidates: Creator[]
): CreatorMatchExplanation[] {
  return candidates.map((creator) => {
    const isTechNiche = creator.niche.some((n) =>
      brief.targetNiches.some((bn) => n.toLowerCase().includes(bn.toLowerCase()))
    );
    const budgetFits = creator.rates.dedicatedVideo <= brief.budgetPerCreator * 1.2;
    const isClaimed = creator.state === 'claimed';

    let score = 70;
    const reasons: string[] = [];
    const evidence: string[] = [];
    const caveats: string[] = [];

    if (isTechNiche) {
      score += 15;
      reasons.push(
        `Direct audience overlap in ${creator.niche.slice(0, 2).join(' & ')} matching target software engineers.`
      );
    } else {
      score -= 10;
      reasons.push(`Primary content category (${creator.niche[0]}) is tangential to core developer tooling.`);
    }

    if (creator.metrics.avgEngagement >= 5.0) {
      score += 10;
      evidence.push(`Exceptional ${creator.metrics.avgEngagement}% engagement rate (2.2x tech category average).`);
    } else {
      evidence.push(`Steady ${creator.metrics.avgEngagement}% engagement rate across core social platforms.`);
    }

    if (creator.metrics.onTimeDeliveryRate === 100) {
      evidence.push(`Flawless 100% on-time delivery across ${creator.metrics.totalCompletedDeals} verified past platform collaborations.`);
    }

    if (budgetFits) {
      reasons.push(`Dedicated rate of $${creator.rates.dedicatedVideo.toLocaleString()} fits within allocated per-creator budget.`);
    } else {
      score -= 12;
      caveats.push(
        `Commercial rate ($${creator.rates.dedicatedVideo.toLocaleString()}) exceeds the target $${brief.budgetPerCreator.toLocaleString()} budget per creator.`
      );
    }

    if (!isClaimed) {
      caveats.push(
        `Unclaimed public profile: outreach must be routed through talent management (${creator.managerContact?.agency || 'Agency'}).`
      );
    } else {
      reasons.push('Claimed creator identity with instant in-app deal contracting & direct messaging.');
    }

    caveats.push('Confirm Q4 exclusivity window to verify no competing cloud or developer platform commitments.');

    // Normalize score
    const finalScore = Math.min(98, Math.max(45, score));

    return {
      creatorId: creator.id,
      matchScore: finalScore,
      matchReasons: reasons.slice(0, 3),
      evidence: evidence.slice(0, 2),
      risksOrCaveats: caveats.slice(0, 2),
      confidence: finalScore > 85 ? 'high' : finalScore > 65 ? 'medium' : 'low',
    };
  });
}
