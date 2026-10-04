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
    let candidates = candidateIds
      ? SEED_CREATORS.filter((c) => candidateIds.includes(c.id))
      : SEED_CREATORS;

    // Fetch real Indian creators from YouTube if API key is available
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (apiKey && process.env.NEXT_PUBLIC_USE_MOCK_FALLBACK !== 'true') {
      try {
        const query = brief.targetNiches.length > 0 ? brief.targetNiches[0] : brief.brandIndustry;
        const searchRes = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(query)}&regionCode=IN&maxResults=10&order=viewCount&key=${apiKey}`,
          { cache: 'no-store' }
        );
        const searchData = await searchRes.json();
        
        if (searchData.items && searchData.items.length > 0) {
          const channelIds = searchData.items.map((item: any) => item.snippet.channelId).join(',');
          const statsRes = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelIds}&key=${apiKey}`,
            { cache: 'no-store' }
          );
          const statsData = await statsRes.json();
          
          if (statsData.items) {
            candidates = statsData.items.map((item: any) => ({
              id: `yt-${item.id}`,
              name: item.snippet.title,
              slug: item.snippet.customUrl || item.id,
              avatar: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url || '',
              bannerImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
              headline: item.snippet.description.substring(0, 80) + '...',
              state: 'unclaimed',
              niche: brief.targetNiches,
              bio: item.snippet.description,
              wikipediaSlug: undefined,
              location: 'India',
              languages: ['English', 'Hindi'],
              platforms: {
                youtube: {
                  channelId: item.id,
                  handle: item.snippet.customUrl,
                  subscribers: parseInt(item.statistics.subscriberCount) || 0,
                  avgViews: Math.floor((parseInt(item.statistics.viewCount) || 0) / (parseInt(item.statistics.videoCount) || 1)),
                  totalVideos: parseInt(item.statistics.videoCount) || 0,
                  channelUrl: `https://youtube.com/channel/${item.id}`,
                }
              },
              rates: {
                dedicatedVideo: Math.floor((parseInt(item.statistics.subscriberCount) || 10000) * 0.05),
                reelOrShort: Math.floor((parseInt(item.statistics.subscriberCount) || 10000) * 0.02),
                integratedMention: Math.floor((parseInt(item.statistics.subscriberCount) || 10000) * 0.01),
              },
              managerContact: {
                name: 'Public Management',
                agency: 'Global Network Route',
                email: 'contact@example.com',
                verified: false,
              },
              metrics: {
                avgEngagement: 4.5,
                onTimeDeliveryRate: 0,
                totalCompletedDeals: 0,
              },
              audience: {
                topCountries: [{ country: 'India', percentage: 80 }],
                ageBrackets: [{ bracket: '18-24', percentage: 40 }],
                genderSplit: { male: 60, female: 40, other: 0 },
                primaryInterests: [],
              },
              verifiedBadges: ['Found via YouTube'],
              pastBrandCollaborations: [],
            }));
          }
        }
      } catch (err) {
        console.error('YouTube search error in matching', err);
      }
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
