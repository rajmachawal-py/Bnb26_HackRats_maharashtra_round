// YouTube Data API v3 Integration (Zero-Cost Free Quota: 10,000 units/day)
import { Creator } from '@/types/creator';

export interface YouTubeStatsResult {
  channelId: string;
  title: string;
  description: string;
  customUrl: string;
  subscriberCount: number;
  videoCount: number;
  viewCount: number;
  thumbnailUrl: string;
  isRealApiData: boolean;
}

// In-memory 24-hour cache to conserve quota
const cache = new Map<string, { data: YouTubeStatsResult; cachedAt: number }>();
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

export async function fetchYouTubeChannelStats(
  channelId: string,
  fallbackDefaults?: Partial<YouTubeStatsResult>
): Promise<YouTubeStatsResult> {
  const cached = cache.get(channelId);
  const now = Date.now();
  if (cached && now - cached.cachedAt < CACHE_TTL_MS) {
    return cached.data;
  }

  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey || process.env.NEXT_PUBLIC_USE_MOCK_FALLBACK === 'true') {
    // Return high-fidelity seeded fallback data
    return {
      channelId,
      title: fallbackDefaults?.title || 'Tech Creator Channel',
      description: fallbackDefaults?.description || 'Software engineering tutorials and modern tech deep dives.',
      customUrl: fallbackDefaults?.customUrl || '@creator',
      subscriberCount: fallbackDefaults?.subscriberCount || 142000,
      videoCount: fallbackDefaults?.videoCount || 184,
      viewCount: fallbackDefaults?.viewCount || 8450000,
      thumbnailUrl: fallbackDefaults?.thumbnailUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      isRealApiData: false,
    };
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`;
    const response = await fetch(url, { next: { revalidate: 86400 } });

    if (!response.ok) {
      throw new Error(`YouTube API returned HTTP ${response.status}`);
    }

    const data = await response.json();
    const item = data.items?.[0];

    if (!item) {
      throw new Error('Channel not found on YouTube');
    }

    const result: YouTubeStatsResult = {
      channelId: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      customUrl: item.snippet.customUrl || item.snippet.title,
      subscriberCount: parseInt(item.statistics.subscriberCount, 10) || 0,
      videoCount: parseInt(item.statistics.videoCount, 10) || 0,
      viewCount: parseInt(item.statistics.viewCount, 10) || 0,
      thumbnailUrl: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url || '',
      isRealApiData: true,
    };

    cache.set(channelId, { data: result, cachedAt: now });
    return result;
  } catch (err) {
    console.warn(`[YouTube API Warning]: ${(err as Error).message}. Using cached or seeded fallback.`);
    return {
      channelId,
      title: fallbackDefaults?.title || 'YouTube Creator',
      description: fallbackDefaults?.description || '',
      customUrl: fallbackDefaults?.customUrl || '@creator',
      subscriberCount: fallbackDefaults?.subscriberCount || 142000,
      videoCount: fallbackDefaults?.videoCount || 184,
      viewCount: fallbackDefaults?.viewCount || 8450000,
      thumbnailUrl: fallbackDefaults?.thumbnailUrl || '',
      isRealApiData: false,
    };
  }
}

export async function searchYouTube(query: string) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey || process.env.NEXT_PUBLIC_USE_MOCK_FALLBACK === 'true') {
    return [];
  }
  try {
    const searchRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(query)}&regionCode=IN&maxResults=10&order=viewCount&key=${apiKey}`,
      { cache: 'no-store' }
    );
    const searchData = await searchRes.json();
    if (!searchData.items || searchData.items.length === 0) return [];

    const channelIds = searchData.items.map((item: any) => item.snippet.channelId).join(',');
    const statsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelIds}&key=${apiKey}`,
      { cache: 'no-store' }
    );
    const statsData = await statsRes.json();
    return statsData.items || [];
  } catch (error) {
    console.error('YouTube Search Failed:', error);
    return [];
  }
}

export function normalizeYouTubeData(rawYtData: any[], targetNiches: string[] = ['Tech']): Creator[] {
  if (!Array.isArray(rawYtData)) return [];
  return rawYtData.map((item: any) => ({
    id: `yt-${item.id}`,
    name: item.snippet?.title || 'YouTube Creator',
    slug: item.snippet?.customUrl ? item.snippet.customUrl.replace(/^@/, '') : item.id,
    avatar: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.default?.url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    headline: (item.snippet?.description || '').substring(0, 80) + '...',
    state: 'unclaimed' as const,
    niche: targetNiches.length > 0 ? targetNiches : ['Tech', 'Digital'],
    bio: item.snippet?.description || '',
    wikipediaSlug: undefined,
    location: 'India',
    languages: ['English', 'Hindi'],
    primaryPlatform: 'youtube' as const,
    platforms: {
      youtube: {
        channelId: item.id,
        handle: item.snippet?.customUrl || `@${item.snippet?.title}`,
        subscribers: parseInt(item.statistics?.subscriberCount, 10) || 0,
        avgViews: Math.floor((parseInt(item.statistics?.viewCount, 10) || 0) / (parseInt(item.statistics?.videoCount, 10) || 1)),
        totalVideos: parseInt(item.statistics?.videoCount, 10) || 0,
        channelUrl: `https://youtube.com/channel/${item.id}`,
      }
    },
    rates: {
      dedicatedVideo: Math.floor((parseInt(item.statistics?.subscriberCount, 10) || 10000) * 0.05),
      reelOrShort: Math.floor((parseInt(item.statistics?.subscriberCount, 10) || 10000) * 0.02),
      integratedMention: Math.floor((parseInt(item.statistics?.subscriberCount, 10) || 10000) * 0.01),
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
      brandSafetyRating: 98,
    },
    audience: {
      topCountries: [{ country: 'India', percentage: 80 }],
      ageBrackets: [{ bracket: '18-24', percentage: 40 }],
      genderSplit: { male: 60, female: 40, other: 0 },
      primaryInterests: targetNiches,
    },
    verifiedBadges: ['Found via YouTube'],
    pastBrandCollaborations: [],
  }));
}

