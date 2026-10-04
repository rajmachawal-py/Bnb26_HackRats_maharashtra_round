import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { idea } = await request.json();
    if (!idea) {
      return NextResponse.json({ error: 'Missing idea' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('Missing GEMINI_API_KEY');
    }

    const prompt = `You are an expert influencer marketing campaign manager. A brand gave you this rough concept:
"${idea}"

Generate a complete, professional, and detailed Campaign Brief in strict JSON format based on this concept.
The JSON must have the following keys and data types exactly:
- brandName (string): Invent a realistic brand name if not provided based on the idea.
- brandWebsite (string): Invent a realistic website URL if not provided.
- brandIndustry (string): A short string like "EdTech", "Consumer Tech", or "Finance".
- brandLogo (string): An emoji representing the brand.
- productName (string): Invent a realistic product name if not provided.
- productDescription (string): 2-3 sentences explaining the product's value.
- campaignTitle (string): A catchy internal title for the campaign.
- campaignObjective (string): MUST be one of: "Developer Signups", "Product Launch", "Brand Awareness", "Conversions & Sales". Choose the closest match.
- targetAudience (string): Who is this for? e.g. "College students looking for jobs".
- targetGeographies (array of strings): e.g. ["India"]. Always include India.
- targetNiches (array of strings): Select 1-3 from ["Developer Tools", "AI & Machine Learning", "Productivity Software", "Consumer Tech", "Sustainable Fashion", "Esports", "Finance", "Education", "Lifestyle", "Comedy"].
- totalBudget (number): Realistic total budget in USD (e.g. 50000).
- budgetPerCreator (number): Realistic per-creator budget in USD (e.g. 5000).
- deliverablesRequired (array of strings): Select 1-2 from ["Dedicated YouTube Video (60-90s)", "Instagram Reel (30-60s)", "Twitch Stream Integration (2h)", "Multi-Platform Bundle (YouTube + Reel)"].
- toneAndStyle (string): e.g. "Educational, engaging, and highly energetic."
- mandatoryTalkingPoints (array of 3 strings): Specific key features or benefits the creator MUST mention.
- mandatoryCTA (string): What should the creator tell the viewer to do? (e.g. "Click the link to sign up")
- discountCode (string): A short promo code, e.g. "INDIA20".
- targetDeadline (string): A date in YYYY-MM-DD format (roughly 1 month from today).
- usageRights (string): e.g. "6 months digital organic + paid amplification".
- exclusivityDays (number): e.g. 30.
- maxRevisionRounds (number): e.g. 2.

Return ONLY strict, raw JSON without any markdown formatting or backticks.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            responseMimeType: 'application/json',
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Gemini API request failed');
    }

    const data = await response.json();
    const textOutput = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!textOutput) {
      throw new Error('Empty response from Gemini');
    }

    // Strip markdown formatting if Gemini included it
    let cleanedText = textOutput.trim();
    if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/^```(json)?/, '').replace(/```$/, '').trim();
    }

    const brief = JSON.parse(cleanedText);
    return NextResponse.json({ brief });
  } catch (err: any) {
    console.error('Error generating brief:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
