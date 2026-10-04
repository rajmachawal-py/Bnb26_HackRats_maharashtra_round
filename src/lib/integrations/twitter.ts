import { Creator } from '@/types/creator';

export async function searchTwitter(query: string): Promise<any[]> {
  const host = process.env.TWITTER_API_HOST || 'twitter241.p.rapidapi.com';
  const apiKey = process.env.RAPIDAPI_KEY;

  if (!apiKey || process.env.NEXT_PUBLIC_USE_MOCK_FALLBACK === 'true') {
    return [];
  }

  const cleanQuery = query.trim().replace(/^@/, '');
  const customPath = process.env.TWITTER_API_PATH;
  const pathsToTry: string[] = [];

  if (customPath) {
    pathsToTry.push(
      customPath.includes('?')
        ? `${customPath}&query=${encodeURIComponent(cleanQuery)}`
        : `${customPath}?query=${encodeURIComponent(cleanQuery)}`
    );
  }

  pathsToTry.push(`/user-search?query=${encodeURIComponent(cleanQuery)}`);
  pathsToTry.push(`/search?query=${encodeURIComponent(cleanQuery)}`);
  pathsToTry.push(`/v1/search?query=${encodeURIComponent(cleanQuery)}`);

  for (const path of pathsToTry) {
    try {
      const url = `https://${host}${path}`;
      const res = await fetch(url, {
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': host,
        },
        cache: 'no-store',
      });

      if (!res.ok) continue;

      const data = await res.json();
      if (Array.isArray(data)) return data;
      if (Array.isArray(data.result)) return data.result;
      if (Array.isArray(data.users)) return data.users;
      if (Array.isArray(data.items)) return data.items;
      if (data && (data.username || data.screen_name)) return [data];
    } catch (error) {
      console.warn(`[Twitter API Search Failed on ${path}]:`, (error as Error).message);
    }
  }

  return [];
}

export function normalizeTwitterData(rawTwitterData: any[], targetNiches: string[] = ['Tech']): Creator[] {
  if (!Array.isArray(rawTwitterData)) return [];

  return rawTwitterData
    .filter((item) => item && (item.screen_name || item.username || item.name || item.legacy))
    .map((item: any) => {
      const legacy = item.legacy || {};
      const username = item.username || item.screen_name || legacy.screen_name || 'twitter_user';
      const name = item.name || legacy.name || username;
      const rawId = item.id || item.rest_id || item.id_str || legacy.id_str || username;
      const rawAvatar = item.profile_image_url_https || legacy.profile_image_url_https || item.avatar || '';
      const avatar = rawAvatar ? rawAvatar.replace('_normal.', '_400x400.') : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80';
      const followers = item.followers_count || legacy.followers_count || item.followers || 18000;
      const description = item.description || legacy.description || item.bio || `Creator and thought leader on X / Twitter.`;
      const location = item.location || legacy.location || 'Global';

      return {
        id: `x-${rawId}`,
        name,
        slug: username,
        avatar,
        bannerImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        headline: description.length > 80 ? description.substring(0, 80) + '...' : description,
        state: 'unclaimed' as const,
        niche: targetNiches.length > 0 ? targetNiches : ['Tech & Startups'],
        bio: description,
        location,
        languages: ['English'],
        primaryPlatform: 'twitter' as const,
        platforms: {
          twitter: {
            handle: `@${username}`,
            followers,
            profileUrl: `https://x.com/${username}`,
          },
        },
        rates: {
          dedicatedVideo: Math.floor(followers * 0.03) || 500,
          reelOrShort: Math.floor(followers * 0.02) || 300,
          integratedMention: Math.floor(followers * 0.01) || 150,
        },
        managerContact: {
          name: 'Talent Outreach',
          agency: 'X Creator Partner Network',
          email: 'partner@x-talent.com',
          verified: false,
        },
        metrics: {
          avgEngagement: 3.2,
          onTimeDeliveryRate: 0,
          totalCompletedDeals: 0,
          brandSafetyRating: 95,
        },
        audience: {
          topCountries: [{ country: 'United States', percentage: 50 }, { country: 'India', percentage: 30 }],
          ageBrackets: [{ bracket: '25-34', percentage: 55 }],
          genderSplit: { male: 65, female: 35 },
          primaryInterests: targetNiches,
        },
        verifiedBadges: ['Found via X / Twitter'],
        pastBrandCollaborations: [],
      };
    });
}
