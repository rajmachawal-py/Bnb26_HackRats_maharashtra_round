# Zero-Cost ($0) Integration Implementation Guide

> **Document Status:** Active Hackathon Architecture  
> **Cost Principle:** 100% Free / $0 Mandatory Spend  
> **Strategy:** Real free-tier APIs for core discovery + robust local/mock service adapters for permission-gated networks.

---

## 1. Zero-Cost Integration Architecture Overview

To achieve maximum real-world integration without spending any money, the platform uses a **Unified Provider Pattern**. Real APIs are used where free tiers or public access exists without credit card lockouts. For restricted or paid APIs, a service boundary is implemented with realistic mock adapters so the UI and business logic function identically.

```
                     ┌────────────────────────────────────────┐
                     │       Unified Data Adapter Layer       │
                     └───────────────────┬────────────────────┘
                                         │
        ┌────────────────────────────────┼────────────────────────────────┐
        │ REAL ZERO-COST APIS            │ MOCK / SERVICE BOUNDARY        │
        ▼                                ▼                                ▼
  ┌───────────────┐              ┌───────────────┐              ┌──────────────────┐
  │ YouTube Data  │              │ Wikipedia /   │              │ Instagram / X /  │
  │ API v3 (Free) │              │ MediaWiki API │              │ Mock Adapters    │
  └───────────────┘              └───────────────┘              └──────────────────┘
        │                                │                                │
  ┌───────────────┐              ┌───────────────┐              ┌──────────────────┐
  │ Twitch Helix  │              │ Gemini AI     │              │ Supabase Free    │
  │ API (Free)    │              │ (Free Tier)   │              │ Database & Auth  │
  └───────────────┘              └───────────────┘              └──────────────────┘
```

---

## 2. Active Free Integrations Matrix

| Priority | Platform / Service | Integration Scope | Authentication | Quota & Limits | Cost |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 🥇 | **YouTube Data API v3** | Channel statistics, subscriber count, total views, top recent video performance, metadata. | Google Cloud API Key | 10,000 units/day (Search = 100 units, Channel/Videos = 1 unit) | **$0** |
| 🥇 | **Wikipedia / MediaWiki REST API** | Biographical summary, career achievements, notable events, verified links for unclaimed/public creator profiles. | Public REST (Header: `User-Agent`) | Generous public rate limits (no hard quota for standard usage) | **$0** |
| 🥇 | **Twitch Helix API** | Gaming creator metrics, channel info, follower stats, game categories, live stream status. | Client Credentials (`Client-ID` + App Access Token) | 800 requests/minute | **$0** |
| 🥇 | **Google Gemini API** | AI-driven brief-to-creator matching explanations, automated script/content compliance checklist. | Gemini API Key | Free Tier (15 RPM / 1M TPM for eligible models) | **$0** |
| 🥇 | **Supabase** | PostgreSQL database, Creator/Brand Authentication, Asset Storage. | Project URL + Anon Key | 2 free projects, 500MB DB, 1GB Storage, 50k MAU | **$0** |
| 🥇 | **Local PDF Engine** | In-app branded contract generation with Deal ID and dual confirmation timestamps. | Pure Client/Serverless (`jsPDF` / `@react-pdf`) | Unlimited | **$0** |
| 🥈 | **Instagram (Adapter)** | Seeded engagement rates, follower tiers, recent post grid simulation. | Local JSON / Mock Service | Unlimited local cache | **$0** |
| 🥈 | **X/Twitter (Adapter)** | Seeded tweet engagement, impressions, audience demographic signals. | Local JSON / Mock Service | Unlimited local cache | **$0** |
| 🥈 | **Creator Website / Blog** | Store public business URL + OpenGraph/Favicon extraction. | Native Fetch / HTML Parser | Unlimited | **$0** |

---

## 3. Deep-Dive: Implementation Specifications

### 3.1 🥇 YouTube Data API v3 (Real API)
* **Purpose:** Fetch live, verifiable creator statistics to prove real-world platform capability.
* **Key Endpoints:**
  1. `GET /youtube/v3/channels?part=snippet,statistics,contentDetails&id={CHANNEL_ID}` (Cost: 1 unit)
  2. `GET /youtube/v3/search?part=snippet&q={CREATOR_NAME}&type=channel&maxResults=1` (Cost: 100 units - use sparingly or cache)
  3. `GET /youtube/v3/playlistItems?part=snippet&playlistId={UPLOADS_PLAYLIST_ID}&maxResults=5` (Cost: 1 unit)
* **Optimization & Caching Strategy:**
  - Store channel statistics in Supabase or local cache for **24 hours**.
  - Cache the `channelId` and `uploadsPlaylistId` to avoid high-cost search queries (100 quota units).
  - Only execute `channels.list` and `playlistItems.list` which cost just **1 unit** per call.

```typescript
// Example YouTube Provider Implementation Interface
export interface YouTubeChannelStats {
  channelId: string;
  title: string;
  description: string;
  customUrl: string;
  subscriberCount: number;
  videoCount: number;
  viewCount: number;
  thumbnailUrl: string;
  recentVideos: Array<{
    title: string;
    publishedAt: string;
    videoId: string;
    thumbnail: string;
  }>;
}

export async function fetchYouTubeStats(channelId: string, apiKey: string): Promise<YouTubeChannelStats> {
  const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&id=${channelId}&key=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  const item = data.items?.[0];
  return {
    channelId: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    customUrl: item.snippet.customUrl,
    subscriberCount: parseInt(item.statistics.subscriberCount, 10),
    videoCount: parseInt(item.statistics.videoCount, 10),
    viewCount: parseInt(item.statistics.viewCount, 10),
    thumbnailUrl: item.snippet.thumbnails.high.url,
    recentVideos: []
  };
}
```

---

### 3.2 🥇 Wikipedia / MediaWiki REST API (Real API)
* **Purpose:** Enrich unclaimed and established creator discovery profiles with factual public background, verifiable career highlights, and legitimate public domain credentials without scraping social sites.
* **Key Endpoints:**
  1. Summary Endpoint: `GET https://en.wikipedia.org/api/rest_v1/page/summary/{title}`
  2. Search Endpoint: `GET https://en.wikipedia.org/w/api.php?action=opensearch&search={creator_name}&limit=1&format=json`
* **Cost:** 100% Free. No API key required.
* **Requirements:** Custom `User-Agent` header (e.g. `User-Agent: CreatorBrandPlatform/1.0 (contact@example.com)`).

```typescript
export interface WikipediaBio {
  title: string;
  extract: string;
  thumbnailUrl?: string;
  pageUrl: string;
}

export async function fetchWikipediaBio(query: string): Promise<WikipediaBio | null> {
  const endpoint = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
  const response = await fetch(endpoint, {
    headers: {
      'User-Agent': 'CreatorBrandPlatform-Demo/1.0'
    }
  });
  if (!response.ok) return null;
  const data = await response.json();
  return {
    title: data.title,
    extract: data.extract,
    thumbnailUrl: data.thumbnail?.source,
    pageUrl: data.content_urls?.desktop?.page
  };
}
```

---

### 3.3 🥇 Twitch Helix API (Real API)
* **Purpose:** Power gaming & streaming creator discovery with real game tags, follower metrics, and stream history.
* **Authentication:** Free Twitch Developer App Credentials (`client_id` + `client_secret` $\rightarrow$ App Access Token via `https://id.twitch.tv/oauth2/token`).
* **Key Endpoints:**
  1. `GET https://api.twitch.tv/helix/users?login={username}`
  2. `GET https://api.twitch.tv/helix/channels?broadcaster_id={broadcaster_id}`
  3. `GET https://api.twitch.tv/helix/channels/followers?broadcaster_id={broadcaster_id}`
* **Cost:** Free (800 requests per minute limit).

```typescript
export async function getTwitchAppToken(clientId: string, clientSecret: string): Promise<string> {
  const res = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`, {
    method: 'POST'
  });
  const data = await res.json();
  return data.access_token;
}
```

---

### 3.4 🥇 Google Gemini API (Free Tier)
* **Purpose:**
  1. **Intelligent Creator-Brand Matching:** Computes brief-to-profile alignment and generates natural language explanations (why this creator fits, caveats, evidence).
  2. **Content Compliance Checker:** Audits creator script/draft text against the campaign brief (talking points, CTA, promo codes, claim safety).
* **Cost:** Free tier (Gemini Flash).
* **Optimization:** Keep system instructions concise; pass structured JSON schemas; store evaluation outputs so identical scripts don't trigger repeated API calls.

---

### 3.5 🥇 Supabase Free Tier + Local PDF Engine
* **Supabase Free Stack:**
  - `PostgreSQL`: Stores all 12 core entities (Creators, Brands, Campaigns, Deals, Agreements, Deliverables, Metrics).
  - `Supabase Auth`: Free email/password & demo account authentication.
  - `Supabase Storage`: Free 1GB bucket for campaign assets and agreement PDFs.
* **Branded Agreement Engine:**
  - Built with client-side/serverless JavaScript (`jspdf` or `@react-pdf/renderer`).
  - Generates verifiable PDF agreement stamped with:
    - Immutable `Deal ID` (e.g. `DEAL-2026-X89B`)
    - SHA-256 integrity hash
    - Timestamped dual confirmation events
    - Complete commercial terms, deliverables, revision limits, and usage rights.

---

### 3.6 🥈 Seeded Social Adapters (Instagram, X/Twitter, LinkedIn, Creator Websites)
* **Architecture Strategy:** Rather than incurring thousands of dollars in commercial API fees or facing scraping blocks, these platforms operate behind standardized TypeScript interfaces:

```typescript
export interface SocialPlatformMetrics {
  platform: 'instagram' | 'twitter' | 'linkedin' | 'website';
  handle: string;
  profileUrl: string;
  followersCount: number;
  avgEngagementRate: number;
  avgReelViews?: number;
  primaryAudienceDemographics: {
    topCountry: string;
    ageBracket: string;
    genderRatio: string;
  };
  samplePosts: Array<{
    id: string;
    caption: string;
    likes: number;
    comments: number;
    postedAt: string;
  }>;
}
```
* **Benefit:** When switching to official enterprise APIs later, zero frontend UI code changes are needed—only the data provider implementation swaps.

---

## 4. Environment Variables Configuration

```env
# YouTube Data API v3 (Free from Google Cloud Console)
YOUTUBE_API_KEY="your-google-cloud-api-key"

# Twitch Helix API (Free from Twitch Dev Console)
TWITCH_CLIENT_ID="your-twitch-client-id"
TWITCH_CLIENT_SECRET="your-twitch-client-secret"

# Google Gemini API (Free tier from Google AI Studio)
GEMINI_API_KEY="your-gemini-api-key"

# Supabase Free Tier
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

---

## 5. Zero-Cost Verification Checklist
- [x] All APIs selected have an active $0/free-tier tier.
- [x] Quota management rules established for YouTube (10k units/day).
- [x] Wikipedia REST API requires no API key.
- [x] Twitch API uses free client credentials flow.
- [x] Gemini API utilizes eligible free-tier model.
- [x] PDF contract generator runs in-browser/serverless with $0 licensing fees.
- [x] Paid/restricted networks (Instagram, X, LinkedIn) isolated behind mock adapters.
