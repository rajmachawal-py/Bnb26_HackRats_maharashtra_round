// Deal, Negotiation, and Agreement Data Models

export type DealStatus = 
  | 'draft'
  | 'offer_sent'
  | 'negotiating'
  | 'accepted'
  | 'confirmed'
  | 'active'
  | 'completed'
  | 'cancelled';

export interface CommercialTerms {
  deliverablesSummary: string[];
  compensationAmount: number;
  paymentMilestones: Array<{
    title: string;
    percentage: number;
    amount: number;
    dueOnEvent: string;
  }>;
  submissionDeadline: string;
  publishingDeadline: string;
  maxRevisionRounds: number;
  usageRightsDuration: string;
  exclusivityDays: number;
  governingLaw: string;
  additionalClauses?: string[];
}

export interface DealConfirmationRecord {
  party: 'brand' | 'creator';
  userName: string;
  userRole: string;
  timestamp: string;
  ipAddress?: string;
  signatureStamp: string;
  confirmed: boolean;
}

export interface DealAuditLogEvent {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  details: string;
  version: number;
}

export interface Deal {
  id: string; // e.g. "DEAL-2026-X89B"
  campaignId: string;
  creatorId: string;
  brandId: string;
  creatorName: string;
  brandName: string;
  status: DealStatus;
  version: number;
  terms: CommercialTerms;
  brandConfirmation?: DealConfirmationRecord;
  creatorConfirmation?: DealConfirmationRecord;
  sha256Fingerprint: string;
  createdAt: string;
  updatedAt: string;
  history: DealAuditLogEvent[];
  contractPdfUrl?: string;
}
