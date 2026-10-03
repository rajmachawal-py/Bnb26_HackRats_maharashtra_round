// Campaign & Brief Data Models

export type CampaignStatus = 'draft' | 'matching' | 'active' | 'completed';

export type DeliverableFormat = 
  | 'Dedicated YouTube Video (60-90s)'
  | 'Instagram Reel (30-60s)'
  | 'Twitch Stream Integration (2h)'
  | 'Multi-Platform Bundle (YouTube + Reel)';

export interface CampaignBrief {
  brandName: string;
  brandWebsite: string;
  brandIndustry: string;
  brandLogo: string;
  productName: string;
  productDescription: string;
  campaignTitle: string;
  campaignObjective: 'Brand Awareness' | 'Product Launch' | 'Conversions & Sales' | 'Developer Signups';
  targetAudience: string;
  targetGeographies: string[];
  targetNiches: string[];
  totalBudget: number;
  budgetPerCreator: number;
  deliverablesRequired: DeliverableFormat[];
  toneAndStyle: string;
  mandatoryTalkingPoints: string[];
  mandatoryCTA: string;
  discountCode: string;
  targetDeadline: string;
  usageRights: string;
  exclusivityDays: number;
  maxRevisionRounds: number;
}

export interface Campaign {
  id: string;
  brandId: string;
  brief: CampaignBrief;
  createdAt: string;
  status: CampaignStatus;
  invitedCreatorIds: string[];
  matchedCreators: Array<{
    creatorId: string;
    matchScore: number;
    matchReasons: string[];
    evidence: string[];
    risksOrCaveats: string[];
    status: 'recommended' | 'invited' | 'declined' | 'contracted';
  }>;
}
