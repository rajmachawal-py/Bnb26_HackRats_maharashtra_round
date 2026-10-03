import { NextRequest, NextResponse } from 'next/server';
import { generateCreatorMatchesWithAI } from '@/lib/ai/gemini';
import { SEED_CREATORS } from '@/lib/seedData';
import { CampaignBrief } from '@/types/campaign';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const brief = body.brief as CampaignBrief;

    if (!brief || !brief.productName) {
      return NextResponse.json(
        { error: 'Missing or incomplete campaign brief' },
        { status: 400 }
      );
    }

    const candidateIds = body.creatorIds as string[] | undefined;
    const candidates = candidateIds
      ? SEED_CREATORS.filter((c) => candidateIds.includes(c.id))
      : SEED_CREATORS;

    const matches = await generateCreatorMatchesWithAI(brief, candidates);

    // Sort by match score descending
    matches.sort((a, b) => b.matchScore - a.matchScore);

    return NextResponse.json({
      success: true,
      matches,
      analyzedCount: candidates.length,
    });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
