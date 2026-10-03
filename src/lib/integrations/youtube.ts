// YouTube Data API v3 Integration (Zero-Cost Free Quota: 10,000 units/day)

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
