// Campaign Workspace, Deliverables, AI Compliance, and Analytics Data Models

export type DeliverableStatus = 
  | 'pending_draft'
  | 'submitted'
  | 'compliance_check_passed'
  | 'compliance_check_warning'
  | 'brand_approved'
  | 'published';

export interface AIComplianceFlag {
  id: string;
  type: 'pass' | 'warning' | 'error';
  category: 'talking_point' | 'cta' | 'promo_code' | 'duration' | 'claim_safety';
  title: string;
  description: string;
  expectedValue?: string;
  detectedValue?: string;
}

export interface ComplianceEvaluation {
  overallPassed: boolean;
  score: number; // 0 - 100
  evaluatedAt: string;
  productMentionDetected: boolean;
  ctaDetected: boolean;
  promoCodeDetected: boolean;
  detectedPromoCode?: string;
  estimatedDurationSeconds: number;
  unsupportedClaimsDetected: boolean;
  flags: AIComplianceFlag[];
  summaryFeedback: string;
}

export interface DeliverableSubmission {
  id: string;
  campaignId: string;
  creatorId: string;
  version: number;
  submittedAt: string;
  contentType: 'script_text' | 'video_link' | 'asset_upload';
  contentPayload: string; // The script text or video URL
  notes?: string;
  compliance?: ComplianceEvaluation;
  brandReviewStatus: 'pending' | 'revision_requested' | 'approved';
  brandFeedback?: string;
}

export interface DeliverableItem {
  id: string;
  title: string;
  type: string;
  dueDate: string;
  status: DeliverableStatus;
  submissions: DeliverableSubmission[];
  publishedUrl?: string;
  publishedAt?: string;
}

export interface CampaignMetricsSnapshot {
  campaignId: string;
  creatorId: string;
  recordedAt: string;
  totalReach: number;
  totalImpressions: number;
  totalViews: number;
  totalEngagements: number;
  engagementRate: number; // e.g. 6.4%
  clickThroughs: number;
  conversionsOrSales: number;
  revenueGenerated: number;
  effectiveCPM: number;
  effectiveCPA: number;
}
