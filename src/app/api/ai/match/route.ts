import { NextRequest, NextResponse } from 'next/server';
import { generateCreatorMatchesWithAI } from '@/lib/ai/gemini';
import { SEED_CREATORS } from '@/lib/seedData';
import { CampaignBrief } from '@/types/campaign';
import { Creator } from '@/types/creator';
import { searchYouTube, normalizeYouTubeData } from '@/lib/integrations/youtube';
import { searchInstagram, normalizeInstagramData } from '@/lib/integrations/instagram';
import { searchTwitter, normalizeTwitterData } from '@/lib/integrations/twitter';

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
    let candidates: Creator[] = candidateIds
      ? SEED_CREATORS.filter((c) => candidateIds.includes(c.id))
      : SEED_CREATORS;

    const query = brief.targetNiches && brief.targetNiches.length > 0 ? brief.targetNiches[0] : (brief.brandIndustry || 'Tech');

    // Run all 3 searches simultaneously (Takes 2 seconds instead of 6 seconds)
    const results = await Promise.allSettled([
      searchYouTube(query),
      searchInstagram(query),
      searchTwitter(query)
    ]);

    // Extract successful results
    const ytData = results[0].status === 'fulfilled' ? results[0].value : [];
    const igData = results[1].status === 'fulfilled' ? results[1].value : [];
    const xData  = results[2].status === 'fulfilled' ? results[2].value : [];

    // Normalize creators across all 3 platforms
    const ytCandidates = ytData.length > 0 ? normalizeYouTubeData(ytData, brief.targetNiches) : [];
    const igCandidates = igData.length > 0 ? normalizeInstagramData(igData, brief.targetNiches) : [];
    const xCandidates  = xData.length > 0 ? normalizeTwitterData(xData, brief.targetNiches) : [];

    // Merge all multi-platform creators into liveCandidates (Gap 1 resolved)
    const liveCandidates: Creator[] = [...ytCandidates, ...igCandidates, ...xCandidates];

    // If live creators were retrieved across YouTube, Instagram, or Twitter, use them for Gemini evaluation
    if (liveCandidates.length > 0) {
      candidates = liveCandidates;
    }

    const matches = await generateCreatorMatchesWithAI(brief, candidates);

    // Sort by match score descending
    matches.sort((a, b) => b.matchScore - a.matchScore);

    return NextResponse.json({
      success: true,
      matches,
      creators: candidates,
      analyzedCount: candidates.length,
    });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
