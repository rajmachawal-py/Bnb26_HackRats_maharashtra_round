// MediaWiki / Wikipedia REST API Integration (100% Free Public REST Service)

export interface WikipediaSummaryResult {
  title: string;
  extract: string;
  description?: string;
  thumbnailUrl?: string;
  pageUrl: string;
  isRealApiData: boolean;
}

const wikiCache = new Map<string, { data: WikipediaSummaryResult; cachedAt: number }>();
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

export async function fetchWikipediaSummary(
  articleSlug: string,
  fallbackBio?: string
): Promise<WikipediaSummaryResult> {
  const cached = wikiCache.get(articleSlug);
  const now = Date.now();
  if (cached && now - cached.cachedAt < CACHE_TTL_MS) {
    return cached.data;
  }

  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(articleSlug)}`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'SynapseOS-Platform/1.0 (hackathon-demo-bot)',
        Accept: 'application/json',
      },
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      throw new Error(`Wikipedia REST API returned HTTP ${response.status}`);
    }

    const data = await response.json();
    const result: WikipediaSummaryResult = {
      title: data.title,
      extract: data.extract || fallbackBio || '',
      description: data.description || 'American YouTuber and professional tech reviewer',
      thumbnailUrl: data.thumbnail?.source,
      pageUrl: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${articleSlug}`,
      isRealApiData: true,
    };

    wikiCache.set(articleSlug, { data: result, cachedAt: now });
    return result;
  } catch (err) {
    console.warn(`[Wikipedia API Warning]: ${(err as Error).message}. Using fallback biography.`);
    return {
      title: articleSlug.replace(/_/g, ' '),
      extract: fallbackBio || 'Prominent creator and technology reviewer with a verified global community.',
      description: 'Public reference profile',
      thumbnailUrl: undefined,
      pageUrl: `https://en.wikipedia.org/wiki/${articleSlug}`,
      isRealApiData: false,
    };
  }
}
