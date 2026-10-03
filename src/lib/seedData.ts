import { Creator } from '@/types/creator';
import { Campaign } from '@/types/campaign';
import { Deal } from '@/types/deal';
import { CampaignMetricsSnapshot } from '@/types/workspace';

// ============================================================================
// 1. SEEDED CREATORS (Multi-State Ecosystem)
// ============================================================================

export const SEED_CREATORS: Creator[] = [
  {
    id: 'creator-alex-vance',
    name: 'Alex Vance',
    slug: 'alexvance',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    headline: 'Senior Full-Stack Engineer & AI Tooling Creator | 142k YouTube Community',
    state: 'claimed',
    niche: ['Developer Tools', 'AI & Machine Learning', 'Productivity Software', 'Web Development'],
    bio: 'Building and reviewing the modern software engineering stack. Dedicated deep-dives into LLMs, agentic developer workflows, and system architecture. Verified on-time delivery.',
    wikipediaSlug: undefined,
    location: 'San Francisco, CA & Remote',
    languages: ['English', 'German'],
    platforms: {
      youtube: {
        channelId: 'UC_x5XG1OV2P6uZZ5FSM9Ttw',
        handle: '@alexvance_dev',
        subscribers: 142000,
        avgViews: 34500,
        totalVideos: 184,
        channelUrl: 'https://youtube.com/@alexvance_dev',
      },
      github: {
        username: 'alexvance-code',
        followers: 4800,
        publicRepos: 52,
        totalStars: 3420,
        profileUrl: 'https://github.com/alexvance-code',
      },
      instagram: {
        handle: 'alexvance.builds',
        followers: 42000,
        engagementRate: 5.4,
        profileUrl: 'https://instagram.com/alexvance.builds',
      },
    },
    rates: {
      dedicatedVideo: 2500,
      reelOrShort: 1100,
      integratedMention: 800,
      customPackage: 3800,
    },
    managerContact: undefined, // Directly reachable on-platform
    metrics: {
      avgEngagement: 5.4,
      onTimeDeliveryRate: 100,
      totalCompletedDeals: 14,
      brandSafetyRating: 99,
      audienceFitScore: 96,
    },
    audience: {
      topCountries: [
        { country: 'United States', percentage: 48 },
        { country: 'India', percentage: 22 },
        { country: 'United Kingdom', percentage: 12 },
        { country: 'Germany', percentage: 8 },
        { country: 'Other', percentage: 10 },
      ],
      ageBrackets: [
        { bracket: '18-24', percentage: 24 },
        { bracket: '25-34', percentage: 56 },
        { bracket: '35-44', percentage: 16 },
        { bracket: '45+', percentage: 4 },
      ],
      genderSplit: { male: 82, female: 16, other: 2 },
      primaryInterests: ['Software Engineering', 'AI & Machine Learning', 'Cloud Infra', 'DevOps'],
    },
    verifiedBadges: ['Claimed Identity', '100% On-Time Delivery', 'Verified Brand Partner'],
    pastBrandCollaborations: [
      {
        brandName: 'Supabase',
        brandLogo: '⚡',
        campaignName: 'Postgres Vector Launch',
        completedDate: '2026-08-15',
        dealId: 'DEAL-2026-SUPA01',
        deliverableType: 'Dedicated YouTube Video',
      },
      {
        brandName: 'Linear',
        brandLogo: '📐',
        campaignName: 'Insights & Roadmaps Feature',
        completedDate: '2026-06-20',
        dealId: 'DEAL-2026-LINR02',
        deliverableType: 'Dedicated YouTube Video',
      },
      {
        brandName: 'Vercel',
        brandLogo: '▲',
        campaignName: 'AI SDK v4 Showcase',
        completedDate: '2026-04-10',
        dealId: 'DEAL-2026-VCL04',
        deliverableType: 'Multi-Platform Bundle',
      },
    ],
  },

  {
    id: 'creator-marques-b',
    name: 'Marques B.',
    slug: 'mkbhd',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    headline: 'Global Consumer Tech & Hardware Reviewer | 18.4M YouTube Community',
    state: 'unclaimed',
    niche: ['Consumer Tech', 'Smartphones', 'Hardware Reviews', 'Automotive Tech'],
    bio: 'Quality tech videos. Crisp reviews, smartphone cameras, electric vehicles, and future tech products. Discoverable via legitimate public records.',
    wikipediaSlug: 'Marques_Brownlee',
    location: 'New Jersey, United States',
    languages: ['English'],
    platforms: {
      youtube: {
        channelId: 'UCBJycsmduvYEL83R_U4JriQ',
        handle: '@mkbhd',
        subscribers: 18400000,
        avgViews: 2150000,
        totalVideos: 1650,
        channelUrl: 'https://youtube.com/@mkbhd',
      },
      instagram: {
        handle: 'mkbhd',
        followers: 4700000,
        engagementRate: 4.2,
        profileUrl: 'https://instagram.com/mkbhd',
      },
    },
    rates: {
      dedicatedVideo: 45000,
      reelOrShort: 18000,
      integratedMention: 12000,
      customPackage: 65000,
    },
    managerContact: {
      name: 'Adam Rogas',
      agency: 'M-Agency Talent Management',
      email: 'mgmt@m-agency-partners.com',
      verified: true,
      notes: 'Represented exclusively for commercial sponsorships and brand campaigns. Please send structured brief.',
    },
    metrics: {
      avgEngagement: 4.2,
      onTimeDeliveryRate: 98,
      totalCompletedDeals: 120,
      brandSafetyRating: 100,
      audienceFitScore: 88,
    },
    audience: {
      topCountries: [
        { country: 'United States', percentage: 54 },
        { country: 'United Kingdom', percentage: 14 },
        { country: 'Canada', percentage: 10 },
        { country: 'India', percentage: 8 },
        { country: 'Other', percentage: 14 },
      ],
      ageBrackets: [
        { bracket: '18-24', percentage: 32 },
        { bracket: '25-34', percentage: 48 },
        { bracket: '35-44', percentage: 14 },
        { bracket: '45+', percentage: 6 },
      ],
      genderSplit: { male: 78, female: 20, other: 2 },
      primaryInterests: ['Consumer Electronics', 'Hardware', 'Smartphones', 'EVs'],
    },
    verifiedBadges: ['Public Profile', 'Verified Agency Routing', 'Top Tier 1 Global'],
    pastBrandCollaborations: [],
  },

  {
    id: 'creator-elena-rostova',
    name: 'Elena Rostova',
    slug: 'elenarostova',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
    headline: 'Sustainable Fashion, Design Architecture & Editorial Reels | 285k Community',
    state: 'claimed',
    niche: ['Sustainable Fashion', 'Modern Lifestyle', 'Design & Aesthetics', 'Minimalism'],
    bio: 'Curating modern minimalism and ethical fashion. Editorial visual storytelling and aesthetic reels.',
    wikipediaSlug: undefined,
    location: 'London & Milan',
    languages: ['English', 'Italian'],
    platforms: {
      instagram: {
        handle: 'elena.rostova.design',
        followers: 285000,
        engagementRate: 4.8,
        profileUrl: 'https://instagram.com/elena.rostova.design',
      },
      youtube: {
        channelId: 'UC_demo_elena_london',
        handle: '@elena_atelier',
        subscribers: 64000,
        avgViews: 18500,
        totalVideos: 42,
        channelUrl: 'https://youtube.com/@elena_atelier',
      },
    },
    rates: {
      dedicatedVideo: 3000,
      reelOrShort: 1400,
      integratedMention: 900,
      customPackage: 4200,
    },
    managerContact: undefined,
    metrics: {
      avgEngagement: 4.8,
      onTimeDeliveryRate: 100,
      totalCompletedDeals: 19,
      brandSafetyRating: 98,
      audienceFitScore: 65,
    },
    audience: {
      topCountries: [
        { country: 'United Kingdom', percentage: 42 },
        { country: 'United States', percentage: 28 },
        { country: 'Italy', percentage: 15 },
        { country: 'Other', percentage: 15 },
      ],
      ageBrackets: [
        { bracket: '18-24', percentage: 22 },
        { bracket: '25-34', percentage: 62 },
        { bracket: '35-44', percentage: 12 },
        { bracket: '45+', percentage: 4 },
      ],
      genderSplit: { male: 18, female: 80, other: 2 },
      primaryInterests: ['Fashion', 'Interior Architecture', 'Travel', 'Wellness'],
    },
    verifiedBadges: ['Claimed Identity', 'Editorial Excellence'],
    pastBrandCollaborations: [
      {
        brandName: 'Allbirds',
        brandLogo: '👟',
        campaignName: 'Wool Runner 2 Launch',
        completedDate: '2026-07-12',
        dealId: 'DEAL-2026-ALLB01',
        deliverableType: 'Instagram Reel (30-60s)',
      },
    ],
  },

  {
    id: 'creator-kaelen-vortex',
    name: 'Kaelen "Vortex" Vance',
    slug: 'vortex',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=400&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    headline: 'Competitive Esports Streamer & Tactical Shooter Analyst | 88k Twitch Community',
    state: 'claimed',
    niche: ['Esports', 'Tactical Shooters', 'Gaming Hardware', 'PC Building'],
    bio: 'Daily high-tier competitive streams, mechanical breakdown tutorials, and peripheral gear testing.',
    wikipediaSlug: undefined,
    location: 'Austin, TX',
    languages: ['English'],
    platforms: {
      twitch: {
        username: 'vortex_live',
        followers: 88000,
        currentGame: 'Valorant',
        channelUrl: 'https://twitch.tv/vortex_live',
      },
      youtube: {
        channelId: 'UC_demo_vortex_clips',
        handle: '@vortex_fps',
        subscribers: 52000,
        avgViews: 14200,
        totalVideos: 110,
        channelUrl: 'https://youtube.com/@vortex_fps',
      },
    },
    rates: {
      dedicatedVideo: 1800,
      reelOrShort: 900,
      integratedMention: 600,
      customPackage: 2800,
    },
    managerContact: undefined,
    metrics: {
      avgEngagement: 6.2,
      onTimeDeliveryRate: 95,
      totalCompletedDeals: 8,
      brandSafetyRating: 94,
      audienceFitScore: 72,
    },
    audience: {
      topCountries: [
        { country: 'United States', percentage: 65 },
        { country: 'Canada', percentage: 15 },
        { country: 'Other', percentage: 20 },
      ],
      ageBrackets: [
        { bracket: '18-24', percentage: 58 },
        { bracket: '25-34', percentage: 34 },
        { bracket: '35+', percentage: 8 },
      ],
      genderSplit: { male: 88, female: 10, other: 2 },
      primaryInterests: ['Gaming', 'Competitive Esports', 'PC Hardware', 'Audio Gear'],
    },
    verifiedBadges: ['Twitch Partner', 'Claimed Identity'],
    pastBrandCollaborations: [
      {
        brandName: 'Logitech G',
        brandLogo: '🎮',
        campaignName: 'PRO X 2 Headset Debut',
        completedDate: '2026-05-30',
        dealId: 'DEAL-2026-LOGI01',
        deliverableType: 'Twitch Stream Integration (2h)',
      },
    ],
  },
];

// ============================================================================
// 2. SEEDED BRAND & LIVE CAMPAIGN FOR HACKATHON DEMO
// ============================================================================

export const DEMO_CAMPAIGN: Campaign = {
  id: 'campaign-cyberflow-launch',
  brandId: 'brand-techbrand-inc',
  createdAt: '2026-10-04T00:00:00Z',
  status: 'active',
  invitedCreatorIds: ['creator-alex-vance'],
  brief: {
    brandName: 'TechBrand Inc.',
    brandWebsite: 'https://cyberflow.ai',
    brandIndustry: 'Developer Tooling & Agentic AI',
    brandLogo: '🚀',
    productName: 'CyberFlow AI',
    productDescription: 'CyberFlow AI is an agentic workflow automation platform designed specifically for engineering teams to automate multi-step development, CI/CD, and review loops.',
    campaignTitle: 'CyberFlow Pro Launch: Engineering Creator Campaign',
    campaignObjective: 'Developer Signups',
    targetAudience: 'Software Engineers, Full-Stack Developers, AI Practitioners (US & Global)',
    targetGeographies: ['United States', 'Europe', 'India', 'Canada'],
    targetNiches: ['Developer Tools', 'AI & Machine Learning', 'Productivity Software'],
    totalBudget: 5000,
    budgetPerCreator: 2500,
    deliverablesRequired: ['Dedicated YouTube Video (60-90s)'],
    toneAndStyle: 'Technical, crisp, authentic, and demo-driven. Show real developer workflows rather than generic marketing hype.',
    mandatoryTalkingPoints: [
      'CyberFlow automates complex multi-step developer workflows using autonomous agentic AI.',
      'Integrates directly with GitHub, Slack, and your terminal in under 2 minutes.',
      'Self-hosted privacy-first option available for enterprise engineering teams.',
    ],
    mandatoryCTA: 'Click the link in description and use code HACK20 to get 3 months free on the CyberFlow Pro tier.',
    discountCode: 'HACK20',
    targetDeadline: '2026-10-28',
    usageRights: '6 months digital organic + paid advertisement amplification rights',
    exclusivityDays: 30,
    maxRevisionRounds: 2,
  },
  matchedCreators: [
    {
      creatorId: 'creator-alex-vance',
      matchScore: 96,
      matchReasons: [
        'Audience is 80%+ verified software engineers and tech practitioners.',
        'High 5.4% engagement rate (2.2x category benchmark).',
        'Proven track record with similar developer tooling launches (Supabase, Linear, Vercel).',
        'Rate of $2,500 fits perfectly within the allocated per-creator budget.',
      ],
      evidence: [
        'Recent video on Agentic Coding reached 48,000 developer views with 98% like ratio.',
        '100% on-time delivery across 14 verified platform collaborations.',
      ],
      risksOrCaveats: [
        'Confirm Q4 exclusivity window to ensure no conflicting cloud platform sponsorships.',
      ],
      status: 'recommended',
    },
    {
      creatorId: 'creator-marques-b',
      matchScore: 82,
      matchReasons: [
        'Massive global consumer reach (18.4M subscribers).',
        'Industry authority in hardware and software design reviews.',
      ],
      evidence: [
        'Unclaimed public profile with verified business manager route.',
      ],
      risksOrCaveats: [
        'Dedicated video rate ($45,000) significantly exceeds current $2,500 campaign budget allocation.',
        'Audience is broad consumer tech rather than strictly developer-focused.',
      ],
      status: 'recommended',
    },
  ],
};

// ============================================================================
// 3. SEEDED VERIFIED DEAL
// ============================================================================

export const DEMO_DEAL: Deal = {
  id: 'DEAL-2026-X89B',
  campaignId: 'campaign-cyberflow-launch',
  creatorId: 'creator-alex-vance',
  brandId: 'brand-techbrand-inc',
  creatorName: 'Alex Vance',
  brandName: 'TechBrand Inc.',
  status: 'confirmed',
  version: 2,
  sha256Fingerprint: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
  createdAt: '2026-10-04T00:10:00Z',
  updatedAt: '2026-10-04T00:25:00Z',
  terms: {
    deliverablesSummary: ['1x Dedicated YouTube Video (60-90s integration)'],
    compensationAmount: 2500,
    paymentMilestones: [
      { title: 'Script & Concept Approval', percentage: 30, amount: 750, dueOnEvent: 'Script sign-off' },
      { title: 'Draft Video & AI Compliance Pass', percentage: 40, amount: 1000, dueOnEvent: 'Compliance pass' },
      { title: 'Publishing & 7-Day Performance Sync', percentage: 30, amount: 750, dueOnEvent: 'Live link sync' },
    ],
    submissionDeadline: '2026-10-22',
    publishingDeadline: '2026-10-28',
    maxRevisionRounds: 2,
    usageRightsDuration: '6 Months Digital Ad Amplification Rights',
    exclusivityDays: 30,
    governingLaw: 'State of California / Uniform Commercial Code',
    additionalClauses: [
      'Creator must include the verified link in the first 3 lines of YouTube description.',
      'Mandatory promo code HACK20 must be spoken and clearly rendered on screen.',
    ],
  },
  brandConfirmation: {
    party: 'brand',
    userName: 'Sarah Jenkins',
    userRole: 'Head of Developer Marketing, TechBrand Inc.',
    timestamp: '2026-10-04T00:22:15Z',
    signatureStamp: 'VERIFIED_SIG_BRAND_84920A',
    confirmed: true,
  },
  creatorConfirmation: {
    party: 'creator',
    userName: 'Alex Vance',
    userRole: 'Content Creator & Software Engineer',
    timestamp: '2026-10-04T00:24:48Z',
    signatureStamp: 'VERIFIED_SIG_CREATOR_77189B',
    confirmed: true,
  },
  history: [
    {
      id: 'evt-1',
      timestamp: '2026-10-04T00:10:00Z',
      actor: 'TechBrand Inc.',
      action: 'Offer Sent',
      details: 'Initial offer of $2,200 sent with 1x YouTube Video deliverable.',
      version: 1,
    },
    {
      id: 'evt-2',
      timestamp: '2026-10-04T00:18:30Z',
      actor: 'Alex Vance',
      action: 'Counter-Offer Proposed',
      details: 'Adjusted fee to standard dedicated rate of $2,500; confirmed delivery for Oct 22.',
      version: 2,
    },
    {
      id: 'evt-3',
      timestamp: '2026-10-04T00:22:15Z',
      actor: 'TechBrand Inc.',
      action: 'Counter Accepted & Terms Confirmed',
      details: 'Brand approved revised rate of $2,500 and signed agreement v2.',
      version: 2,
    },
    {
      id: 'evt-4',
      timestamp: '2026-10-04T00:24:48Z',
      actor: 'Alex Vance',
      action: 'Agreement Confirmed & Dual-Signed',
      details: 'Creator executed dual-party confirmation. Deal is active.',
      version: 2,
    },
  ],
};

// ============================================================================
// 4. DEMO SCRIPTS FOR LIVE AI COMPLIANCE CHECKER
// ============================================================================

export const DEMO_SCRIPTS = {
  // Script with intentional errors to demonstrate AI auditor flagging issues
  erroneousScript: `Hey everyone! Today we're taking a look at CyberFlow. It's a new automation platform for developers that uses AI agents to help you write code faster. It connects to your GitHub repository in just a few minutes so you can see your issues and pull requests handled automatically.

If you want to check it out and get a special discount, click the link down in the description below and make sure to use code FALL20 at checkout for a free trial. Let me know what you think in the comments!`,

  // Compliant script that passes all checks
  compliantScript: `Hey everyone, welcome back! Today I want to show you CyberFlow AI, an agentic workflow automation platform built specifically for engineering teams. 

What makes it so powerful is that CyberFlow automates complex multi-step developer workflows using autonomous agentic AI. It integrates directly with GitHub, Slack, and your terminal in under 2 minutes, and for enterprise teams concerned with data privacy, there is also a self-hosted privacy-first option available.

I've been testing it on our open-source repositories and it cut our issue triaging time in half. Click the link in description and use code HACK20 to get 3 months free on the CyberFlow Pro tier. Check it out and let me know your thoughts!`,
};

// ============================================================================
// 5. SEEDED CAMPAIGN PERFORMANCE OUTCOMES
// ============================================================================

export const DEMO_METRICS_SNAPSHOT: CampaignMetricsSnapshot = {
  campaignId: 'campaign-cyberflow-launch',
  creatorId: 'creator-alex-vance',
  recordedAt: '2026-10-04T00:30:00Z',
  totalReach: 420000,
  totalImpressions: 485000,
  totalViews: 38400,
  totalEngagements: 2450,
  engagementRate: 6.4,
  clickThroughs: 3420,
  conversionsOrSales: 380,
  revenueGenerated: 11400,
  effectiveCPM: 5.15,
  effectiveCPA: 6.58,
};
