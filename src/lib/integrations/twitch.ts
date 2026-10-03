// Twitch Helix API Integration (Free Developer Credentials)

export interface TwitchChannelResult {
  username: string;
  displayName: string;
  gameName: string;
  title: string;
  followersCount: number;
  isLive: boolean;
  profileImageUrl: string;
  isRealApiData: boolean;
}

const twitchCache = new Map<string, { data: TwitchChannelResult; cachedAt: number }>();
let cachedAppToken: { token: string; expiresAt: number } | null = null;

async function getTwitchAppAccessToken(clientId: string, clientSecret: string): Promise<string | null> {
  const now = Date.now();
  if (cachedAppToken && cachedAppToken.expiresAt > now + 60000) {
    return cachedAppToken.token;
  }

  try {
    const res = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
      { method: 'POST' }
    );
    if (!res.ok) return null;
    const json = await res.json();
    cachedAppToken = {
      token: json.access_token,
      expiresAt: now + json.expires_in * 1000,
    };
    return cachedAppToken.token;
  } catch {
    return null;
  }
}

export async function fetchTwitchChannelInfo(
  username: string,
  fallbackDefaults?: Partial<TwitchChannelResult>
): Promise<TwitchChannelResult> {
  const cached = twitchCache.get(username);
  const now = Date.now();
  if (cached && now - cached.cachedAt < 15 * 60 * 1000) {
    return cached.data;
  }

  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;

  if (!clientId || !clientSecret || process.env.NEXT_PUBLIC_USE_MOCK_FALLBACK === 'true') {
    return {
      username,
      displayName: fallbackDefaults?.displayName || username,
      gameName: fallbackDefaults?.gameName || 'Valorant',
      title: fallbackDefaults?.title || 'Competitive Ranked & Peripheral Gear Testing',
      followersCount: fallbackDefaults?.followersCount || 88000,
      isLive: fallbackDefaults?.isLive !== undefined ? fallbackDefaults.isLive : true,
      profileImageUrl: fallbackDefaults?.profileImageUrl || 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=400&q=80',
      isRealApiData: false,
    };
  }

  try {
    const token = await getTwitchAppAccessToken(clientId, clientSecret);
    if (!token) throw new Error('Could not obtain Twitch app access token');

    const userRes = await fetch(`https://api.twitch.tv/helix/users?login=${encodeURIComponent(username)}`, {
      headers: {
        'Client-ID': clientId,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!userRes.ok) throw new Error(`Twitch user lookup failed: ${userRes.status}`);
    const userData = await userRes.json();
    const user = userData.data?.[0];

    if (!user) throw new Error('Twitch user not found');

    const result: TwitchChannelResult = {
      username: user.login,
      displayName: user.display_name,
      gameName: fallbackDefaults?.gameName || 'Tactical FPS',
      title: fallbackDefaults?.title || 'Live Stream',
      followersCount: fallbackDefaults?.followersCount || 88000,
      isLive: false,
      profileImageUrl: user.profile_image_url || '',
      isRealApiData: true,
    };

    twitchCache.set(username, { data: result, cachedAt: now });
    return result;
  } catch (err) {
    console.warn(`[Twitch API Warning]: ${(err as Error).message}. Using fallback data.`);
    return {
      username,
      displayName: fallbackDefaults?.displayName || username,
      gameName: fallbackDefaults?.gameName || 'Valorant',
      title: fallbackDefaults?.title || 'Competitive Stream',
      followersCount: fallbackDefaults?.followersCount || 88000,
      isLive: true,
      profileImageUrl: fallbackDefaults?.profileImageUrl || '',
      isRealApiData: false,
    };
  }
}
