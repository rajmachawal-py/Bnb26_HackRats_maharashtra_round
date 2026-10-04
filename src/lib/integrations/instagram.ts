import { Creator } from '@/types/creator';

export async function searchInstagram(query: string): Promise<any[]> {
  const host = process.env.INSTAGRAM_API_HOST || 'instagram-scraper-api2.p.rapidapi.com';
  const apiKey = process.env.RAPIDAPI_KEY;

  if (!apiKey || process.env.NEXT_PUBLIC_USE_MOCK_FALLBACK === 'true') {
    return [];
  }

  const cleanQuery = query.trim().replace(/^@/, '');
  const cleanSlug = cleanQuery.replace(/\s+/g, '').toLowerCase();

  // 1. Support custom endpoint path if specified in .env.local (Solves Gap 3)
  const customPath = process.env.INSTAGRAM_API_PATH;
  const pathsToTry: string[] = [];

  if (customPath) {
    pathsToTry.push(
      customPath.includes('?')
        ? `${customPath}&search_query=${encodeURIComponent(cleanQuery)}&query=${encodeURIComponent(cleanQuery)}&username=${encodeURIComponent(cleanSlug)}`
        : `${customPath}?search_query=${encodeURIComponent(cleanQuery)}`
    );
  }

  // 2. Add provider-specific candidate endpoints based on subscribed RapidAPI host
  if (host.includes('fast-reliable-data-scraper')) {
    pathsToTry.push(`/profile?username=${encodeURIComponent(cleanSlug)}`);
    pathsToTry.push(`/users_search?query=${encodeURIComponent(cleanQuery)}`);
  } else {
    pathsToTry.push(`/v1/search_users?search_query=${encodeURIComponent(cleanQuery)}`);
    pathsToTry.push(`/search?query=${encodeURIComponent(cleanQuery)}`);
    pathsToTry.push(`/v1/search?query=${encodeURIComponent(cleanQuery)}`);
    pathsToTry.push(`/profile?username=${encodeURIComponent(cleanSlug)}`);
  }

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

      if (!res.ok) {
        continue;
      }

      const data = await res.json();
      if (Array.isArray(data)) return data;
      if (Array.isArray(data.items)) return data.items;
      if (Array.isArray(data.users)) return data.users;
      if (Array.isArray(data.data)) return data.data;
      if (data && (data.pk || data.username)) return [data];
    } catch (error) {
      console.warn(`[Instagram API Search Attempt Failed on ${path}]:`, (error as Error).message);
    }
  }

  return [];
}

export function normalizeInstagramData(rawIgData: any[], targetNiches: string[] = ['Creator', 'Lifestyle']): Creator[] {
  if (!Array.isArray(rawIgData)) return [];

  return rawIgData
    .filter((item) => item && (item.username || item.pk || item.full_name))
    .map((item: any) => {
      const username = item.username || item.slug || 'creator';
      const fullName = item.full_name || item.name || username;
      const pk = item.pk || item.id || username;
      const avatar = item.profile_pic_url || item.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
      const followerCount = item.follower_count || item.followers || 25000;
      const bio = item.biography || item.bio || `Instagram creator producing content in ${targetNiches.join(', ')}.`;
      const avgViews = item.latest_reel_views_avg || Math.floor(followerCount * 0.22);

      return {
        id: `ig-${pk}`,
        name: fullName,
        slug: username,
        avatar,
        bannerImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80',
        headline: bio.length > 80 ? bio.substring(0, 80) + '...' : bio,
        state: 'unclaimed' as const,
        niche: targetNiches.length > 0 ? targetNiches : ['Lifestyle', 'Digital'],
        bio,
        location: 'Global',
        languages: ['English'],
        primaryPlatform: 'instagram' as const,
        platforms: {
          instagram: {
            handle: username,
            followers: followerCount,
            avgViews,
            engagementRate: 4.2,
            profileUrl: `https://instagram.com/${username}`,
          },
        },
        // Estimated rates based on IG followers
        rates: {
          dedicatedVideo: Math.floor(followerCount * 0.05) || 500,
          reelOrShort: Math.floor(followerCount * 0.02) || 250,
          integratedMention: Math.floor(followerCount * 0.01) || 125,
        },
        managerContact: {
          name: item.public_email ? 'Public Talent Inquiries' : 'Creator Management',
          agency: 'Instagram Talent Route',
          email: item.public_email || 'partner@instagram-agency.com',
          verified: !!item.is_verified,
        },
        metrics: {
          avgEngagement: 4.2,
          onTimeDeliveryRate: 0,
          totalCompletedDeals: 0,
          brandSafetyRating: 98,
        },
        audience: {
          topCountries: [{ country: 'India', percentage: 65 }, { country: 'United States', percentage: 20 }],
          ageBrackets: [{ bracket: '18-24', percentage: 50 }, { bracket: '25-34', percentage: 40 }],
          genderSplit: { male: 50, female: 50 },
          primaryInterests: targetNiches,
        },
        verifiedBadges: item.is_verified ? ['Verified on Instagram', 'Found via Instagram'] : ['Found via Instagram'],
        pastBrandCollaborations: [],
      };
    });
}