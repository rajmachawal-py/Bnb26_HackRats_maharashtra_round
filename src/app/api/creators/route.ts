import { NextRequest, NextResponse } from 'next/server';
import { SEED_CREATORS } from '@/lib/seedData';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';
  const niche = searchParams.get('niche');
  const platform = searchParams.get('platform');
  const state = searchParams.get('state');

  let results = [...SEED_CREATORS];

  // 1. Text Search Query
  if (query) {
    // Check if we should use real API
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (apiKey && process.env.NEXT_PUBLIC_USE_MOCK_FALLBACK !== 'true') {
      try {
        // Fetch from YouTube Search API (regionCode=IN to prioritize Indian creators)
        const searchRes = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(
            query
          )}&regionCode=IN&maxResults=50&order=relevance&key=${apiKey}`,
          { cache: 'no-store' }
        );
        const searchData = await searchRes.json();
        
        if (searchData.items && searchData.items.length > 0) {
          const channelIds = searchData.items.map((item: any) => item.snippet.channelId).join(',');
          
          // Fetch channel stats
          const statsRes = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelIds}&key=${apiKey}`,
            { cache: 'no-store' }
          );
          const statsData = await statsRes.json();
          
          if (statsData.items) {
            let apiCreators = statsData.items.map((item: any) => {
              return {
                id: `yt-${item.id}`,
                name: item.snippet.title,
                slug: item.snippet.customUrl || item.id,
                avatar: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url || '',
                bannerImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80', // default banner
                headline: item.snippet.description.substring(0, 80) + '...',
                state: 'unclaimed', // Automatically mark found profiles as unclaimed
                niche: ['Tech', 'Lifestyle'], // Extracted dynamically in full version
                bio: item.snippet.description,
                wikipediaSlug: undefined,
                location: item.snippet.country === 'IN' ? 'India' : 'Global',
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
                  agency: 'Unclaimed Agency Route',
                  email: 'contact@example.com',
                  verified: false,
                },
                metrics: {
                  avgEngagement: 4.5,
                  onTimeDeliveryRate: 0,
                  totalCompletedDeals: 0,
                },
                audience: {
                  topCountries: [{ country: 'India', percentage: 80 }, { country: 'Other', percentage: 20 }],
                  ageBrackets: [{ bracket: '18-24', percentage: 40 }],
                  genderSplit: { male: 60, female: 40, other: 0 },
                  primaryInterests: [],
                },
                verifiedBadges: ['Found via YouTube'],
                pastBrandCollaborations: [],
              };
            });
            
            // Sort by subscribers descending to ensure the main channel comes first
            apiCreators.sort((a: any, b: any) => 
              b.platforms.youtube.subscribers - a.platforms.youtube.subscribers
            );
            
            // Overwrite results with the top 5 real API results
            results = apiCreators.slice(0, 5);
          }
        } else {
          results = []; // No matches found on YouTube
        }
      } catch (err) {
        console.error('YouTube search error', err);
      }
    } else {
      // Fallback local search
      results = results.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.bio.toLowerCase().includes(query) ||
          c.headline.toLowerCase().includes(query) ||
          c.niche.some((n) => n.toLowerCase().includes(query))
      );
    }
  }

  // 2. Niche Filter
  if (niche && niche !== 'all') {
    results = results.filter((c) =>
      c.niche.some((n) => n.toLowerCase() === niche.toLowerCase())
    );
  }

  // 3. Platform Filter
  if (platform && platform !== 'all') {
    results = results.filter((c) => {
      if (platform === 'youtube') return !!c.platforms.youtube;
      if (platform === 'twitch') return !!c.platforms.twitch;
      if (platform === 'instagram') return !!c.platforms.instagram;
      if (platform === 'github') return !!c.platforms.github;
      return true;
    });
  }

  // 4. State Filter (Claimed vs Unclaimed)
  if (state && state !== 'all') {
    results = results.filter((c) => c.state === state);
  }

  return NextResponse.json({
    total: results.length,
    creators: results,
  });
}
