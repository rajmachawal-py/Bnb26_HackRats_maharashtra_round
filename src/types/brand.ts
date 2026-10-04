export interface BrandProfile {
  companyName: string;
  tagline?: string;
  industry: string;
  website: string;
  companySize: string;
  country: string;
  currency: 'INR' | 'USD' | 'EUR' | 'GBP';
  typicalBudget: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  logoUrl?: string;
  isCompleted: boolean;
  createdAt: string;
}

export const DEFAULT_BRAND_PROFILE: BrandProfile = {
  companyName: 'TechBrand Inc.',
  tagline: 'Developer Infrastructure & SaaS',
  industry: 'Tech & Software',
  website: 'https://techbrand.io',
  companySize: '51-200',
  country: 'India',
  currency: 'INR',
  typicalBudget: '₹2,00,000 - ₹5,00,000',
  contactName: 'Sarah Jenkins',
  contactEmail: 'sarah@techbrand.io',
  contactPhone: '+91 98765 43210',
  isCompleted: false,
  createdAt: new Date().toISOString(),
};
