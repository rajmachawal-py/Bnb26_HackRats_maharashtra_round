// Creator & Manager Data Models

export type CreatorState = 'discoverable' | 'unclaimed' | 'claimed' | 'active';

export interface SocialPlatformMetrics {
  platform: 'youtube' | 'twitch' | 'instagram' | 'twitter' | 'github';
  handle: string;
  profileUrl: string;
  followersOrSubscribers: number;
  avgEngagementRate: number;
  avgViews?: number;
  highlightMetricLabel?: string;
  highlightMetricValue?: string;
  badge?: string;
}

export interface CreatorManagerContact {
  name: string;
  agency: string;
  email: string;
  verified: boolean;
  notes?: string;
}

export interface CreatorRates {
  dedicatedVideo: number;
  reelOrShort: number;
  integratedMention: number;
  customPackage?: number;
}

export interface CreatorPerformanceMetrics {
  avgEngagement: number;
  onTimeDeliveryRate: number;
  totalCompletedDeals: number;
  brandSafetyRating: number; // e.g. 98/100
  audienceFitScore?: number;
}

export interface CreatorAudienceDemographics {
  topCountries: Array<{ country: string; percentage: number }>;
  ageBrackets: Array<{ bracket: string; percentage: number }>;
  genderSplit: { male: number; female: number; other?: number };
  primaryInterests: string[];
}

export interface Creator {
  id: string;
  name: string;
  slug: string;
  avatar: string;
  bannerImage: string;
  headline: string;
  state: CreatorState;
  niche: string[];
  bio: string;
  wikipediaSlug?: string;
  location: string;
  languages: string[];
  platforms: {
    youtube?: {
      channelId: string;
      handle: string;
      subscribers: number;
      avgViews: number;
      totalVideos: number;
      channelUrl: string;
    };
    twitch?: {
      username: string;
      followers: number;
      currentGame: string;
      channelUrl: string;
    };
    instagram?: {
      handle: string;
      followers: number;
      engagementRate: number;
      profileUrl: string;
    };
    github?: {
      username: string;
      followers: number;
      publicRepos: number;
      totalStars: number;
      profileUrl: string;
    };
  };
  rates: CreatorRates;
  managerContact?: CreatorManagerContact;
  metrics: CreatorPerformanceMetrics;
  audience: CreatorAudienceDemographics;
  verifiedBadges: string[];
  pastBrandCollaborations: Array<{
    brandName: string;
    brandLogo: string;
    campaignName: string;
    completedDate: string;
    dealId: string;
    deliverableType: string;
  }>;
  matchScore?: number;
}
