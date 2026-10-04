# Final Implementation Plan & Team Collaboration Blueprint

> **Project:** Creator–Brand Collaboration Network  
> **Event:** BNB'26 Hackathon (Maharashtra Round)  
> **Audience:** Development Team, Engineering Collaborators, and Hackathon Evaluators  
> **Repository Strategy:** Clean Modular Architecture | $0 Cost Free-Tier Services | Single Connected Workflow

---

## 1. Executive Summary & Team Context

Welcome team! This document is the **single source of truth** for our repository. It defines our end-to-end architecture, complete file structure, technology stack, data models, team workstream allocations, and **detailed implementation phases**.

### 🎯 What We Are Building
We are **not** building just another social media scraper, link-in-bio page, or generic influencer database. We are building the **shared operating infrastructure connecting Brands, Creators, Managers, and Campaigns**.

### 🔑 The Core Problem We Solve
* Current creator-brand workflows are chaotic: discovery on Instagram/YouTube, negotiation in WhatsApp/DMs, contracts in loose PDFs, content reviews in Google Drive, and performance in siloed spreadsheets.
* **Our Solution:** A unified system that executes the complete business loop:  
  $$\textbf{Find} \longrightarrow \textbf{Trust} \longrightarrow \textbf{Deal} \longrightarrow \textbf{Create} \longrightarrow \textbf{Approve} \longrightarrow \textbf{Measure} \longrightarrow \textbf{Learn}$$

### 💡 The Breakthrough Dual-Tier Model: Creator & Brand Synergy
We solve the marketplace cold-start problem by dividing the ecosystem into two logical domains:
1. **The Global Index (Mega-Creators):** Established creators with massive subscriber bases (e.g. 5M+ subs) are auto-indexed via real-time YouTube APIs. Brands can instantly discover and match with them using AI without requiring the creator to "sign up".
2. **Verified Partners (Small-to-Medium Creators):** Growing creators who actively sign up, build their portfolios, and directly search the Deal Board for open brand campaigns.
3. **AI-Powered Discovery:** Brand briefs are fed into Gemini 3.8 Flash, which cross-references the requirements against both tiers to find the mathematically perfect fit.
4. **Active Workspace:** Once matched, both parties enter a shared workspace with a unified Deal Room, automated PDF contracts, and AI compliance auditing for content.

---

## 2. Complete Technology Stack

| Layer | Technology | Rationale & Free-Tier Limits | Cost |
| :--- | :--- | :--- | :--- |
| **Framework** | **Next.js 14+ (App Router)** | Full-stack React framework with server components and API routes. | **$0** |
| **Language** | **TypeScript** | Type-safe interfaces across all 12 core data models. | **$0** |
| **Styling** | **Vanilla CSS + CSS Modules** | Bespoke *Neo-Editorial Cyber-Trust* dark-glass theme (no generic Tailwind look). | **$0** |
| **Icons** | **Lucide React** | Clean, lightweight modern stroke icon set. | **$0** |
| **AI Intelligence** | **Google Gemini Flash API** | AI creator matching explanations and real-time script brief compliance checks. | **$0** (Free Tier) |
| **Real APIs** | **YouTube Data API v3** | Real channel subscriber counts, view velocity, and recent video stats. | **$0** (10k units/day) |
| **Real APIs** | **Wikipedia REST API** | Unclaimed creator biographical context and verified public domain history. | **$0** (No API key needed) |
| **Real APIs** | **Twitch Helix API** | Gaming creator streaming status, follower counts, and game categories. | **$0** (Free Client ID/Secret) |
| **Database/Auth** | **Supabase (PostgreSQL)** | Relational data persistence, auth sessions, and campaign asset storage. | **$0** (Free Tier) |
| **PDF Engine** | **jsPDF / @react-pdf/renderer** | Generates downloadable branded PDF agreements with unique `Deal ID`s. | **$0** (In-browser) |
| **Hosting** | **Vercel Hobby** | Automated Next.js deployment and global edge routing. | **$0** |

---

## 3. System Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND PRESENTATION LAYER                               │
│  [Universal Role Switcher: Brand Mode | Creator Mode | Unclaimed View | Verify Modal]  │
├────────────────────┬────────────────────┬─────────────────────┬────────────────────────┤
│ Discovery & Search │ Campaign Builder   │ Deal Room & PDF     │ Campaign Workspace     │
│ (Faceted Filters)  │ (Brief Form + AI)  │ (Negotiation Diff)  │ (AI Script Compliance) │
└─────────┬──────────┴─────────┬──────────┴──────────┬──────────┴───────────┬────────────┘
          │                    │                     │                      │
┌─────────▼────────────────────▼─────────────────────▼──────────────────────▼────────────┐
│                             NEXT.JS API BACKEND CONTROLLERS                            │
│  /api/creators  •  /api/campaigns  •  /api/deals  •  /api/ai/match  •  /api/compliance │
└─────────┬──────────────────────────────────────────┬───────────────────────────────────┘
          │                                          │
┌─────────▼────────────────────────┐       ┌─────────▼───────────────────────────────────┐
│     SERVICE BOUNDARY ADAPTERS    │       │            DATA PERSISTENCE                 │
├──────────────────────────────────┤       ├─────────────────────────────────────────────┤
│ • YouTube Data API Provider      │       │ • Supabase PostgreSQL (12 Core Entities)    │
│ • Wikipedia MediaWiki Provider   │       │ • Seeded JSON Fallback Storage              │
│ • Twitch Helix API Provider      │       │ • Supabase Storage / Local Assets           │
│ • Gemini Flash AI Provider       │       │ • In-Browser Generated Contract Vault       │
│ • Mock Instagram/X Adapters      │       │                                             │
└──────────────────────────────────┘       └─────────────────────────────────────────────┘
```

---

## 4. Complete Project Directory & File Structure

```
Bnb26_HackRats_maharashtra_round/
├── Docs/                               # Project Documentation
│   ├── final_implementation_plan.md    # Collaborator Master Plan
│   ├── implementation_plan.md          # 12-Module MVP & Presentation Plan
│   ├── features.md                     # 10 High-Impact Post-Hackathon Features
│   ├── integration_implementation.md   # Zero-Cost Real API Schemas & Codes
│   ├── future_integrations.md          # Enterprise Scaling Roadmap (Stripe/Meta)
│   └── progress.md                     # Live Tracking & Change Log
├── progress.md                         # Root tracker for immediate collaborator access
├── public/                             # Static Assets
│   ├── avatars/                        # Seeded creator avatars
│   ├── logos/                          # Brand and platform logos
│   └── samples/                        # Sample script and video files for demo
├── src/
│   ├── app/                            # Next.js App Router Pages & API Routes
│   │   ├── layout.tsx                  # Root layout, fonts (Outfit/Inter), Theme Provider
│   │   ├── globals.css                 # Neo-Editorial design system, CSS variables, glass styles
│   │   ├── page.tsx                    # Landing Page: Platform overview (Discover, Collaborate, Grow)
│   │   ├── discover/
│   │   │   ├── page.tsx                # Creator Discovery feed + filter rail
│   │   │   └── [creatorId]/page.tsx    # Detailed creator profile & manager contact drawer
│   │   ├── campaigns/
│   │   │   ├── page.tsx                # Brand campaign dashboard & pipeline
│   │   │   ├── new/page.tsx            # Campaign Brief Builder form
│   │   │   └── [campaignId]/page.tsx   # Campaign Operations Workspace
│   │   ├── deals/
│   │   │   ├── [dealId]/page.tsx       # Deal Negotiation Room & PDF viewer
│   │   │   └── verify/[dealId]/page.tsx# Public deal verification & audit page
│   │   └── api/                        # Backend Serverless Endpoints
│   │       ├── creators/route.ts       # Query and filter creators
│   │       ├── campaigns/route.ts      # Create and retrieve campaigns
│   │       ├── deals/route.ts          # Deal state machine (counter, accept, confirm)
│   │       ├── ai/
│   │       │   ├── match/route.ts      # Gemini AI creator matching explainability
│   │       │   └── compliance/route.ts # Gemini AI script/content compliance auditor
│   │       └── integrations/
│   │           ├── youtube/route.ts    # YouTube channel stats endpoint
│   │           ├── wikipedia/route.ts  # Wikipedia summary endpoint
│   │           └── twitch/route.ts     # Twitch game & streaming stats endpoint
│   ├── components/                     # Modular React UI Components
│   │   ├── common/
│   │   │   ├── GlobalHeader.tsx        # Top command bar with logo & notifications
│   │   │   ├── RoleSwitcher.tsx        # Floating dock: Brand | Creator | Unclaimed | Verify
│   │   │   ├── GlassCard.tsx           # Reusable frosted glass container
│   │   │   └── StatusBadge.tsx         # Claimed (Green), Unclaimed (Amber), Deal badges
│   │   ├── discovery/
│   │   │   ├── FilterRail.tsx          # Faceted filters: Niche, Platform, Status, Budget
│   │   │   ├── CreatorCard.tsx         # Creator feed card with AI match radar score
│   │   │   └── IntelligenceDrawer.tsx  # Slide-over bio, platform metrics & manager contact
│   │   ├── campaigns/
│   │   │   ├── BriefForm.tsx           # Campaign parameters input form
│   │   │   └── MatchExplanationCard.tsx# AI explanation breakdown (Why this creator fits)
│   │   ├── deals/
│   │   │   ├── NegotiationTerms.tsx    # Commercial terms editor (Deliverables, Fee, Dates)
│   │   │   ├── ContractPdfViewer.tsx   # In-app rendered and downloadable PDF agreement
│   │   │   └── DealAuditTimeline.tsx   # Timestamped deal confirmation lifecycle
│   │   └── workspace/
│   │       ├── WorkspaceTabs.tsx       # Tabs: Brief | Deliverables | Review | Analytics
│   │       ├── ComplianceChecker.tsx   # Live script textarea with AI Pass/Warn/Fail pills
│   │       ├── ApprovalActionBar.tsx   # Brand feedback and Approve & Publish button
│   │       └── AnalyticsCards.tsx      # Performance metrics: Reach, Engagement, ROI
│   ├── lib/                            # Utility Libraries & Service Adapters
│   │   ├── ai/
│   │   │   └── gemini.ts               # Gemini API client & prompt templates
│   │   ├── integrations/
│   │   │   ├── youtube.ts              # YouTube Data API client & cache logic
│   │   │   ├── wikipedia.ts            # Wikipedia REST API client
│   │   │   ├── twitch.ts               # Twitch Helix client & OAuth token cache
│   │   │   └── mockSocials.ts          # Realistic Instagram & X seed adapters
│   │   ├── pdf/
│   │   │   └── generateContract.ts     # Client-side branded agreement PDF generator
│   │   ├── seedData.ts                 # Multi-state creator, brand & campaign dataset
│   │   └── utils.ts                    # Formatting helpers (currency, numbers, dates)
│   └── types/                          # TypeScript Interfaces & Enums
│       ├── creator.ts                  # Creator & Manager data types
│       ├── campaign.ts                 # Campaign & Brief data types
│       ├── deal.ts                     # Deal, Agreement & Audit types
│       └── workspace.ts                # Deliverable, Content, Approval & Metric types
├── .env.example                        # Documented environment variable template
├── .gitignore                          # Standard Next.js & workspace ignore rules
├── package.json                        # Dependencies and build scripts
├── tsconfig.json                       # TypeScript compiler configuration
└── README.md                           # Quickstart and demo presentation guide
```

---

## 5. Core Data Model (TypeScript Definitions)

All collaborators must strictly follow these schemas in `src/types/`:

```typescript
// 1. Creator Entity
export type CreatorState = 'discoverable' | 'unclaimed' | 'claimed' | 'active';

export interface Creator {
  id: string;
  name: string;
  avatar: string;
  state: CreatorState;
  niche: string[];
  bio: string;
  wikipediaSlug?: string;
  location: string;
  platforms: {
    youtube?: { channelId: string; handle: string; subscribers: number; avgViews: number };
    twitch?: { username: string; followers: number; currentGame: string };
    instagram?: { handle: string; followers: number; engagementRate: number };
  };
  rates: {
    dedicatedVideo: number;
    reelOrShort: number;
    integratedMention: number;
  };
  managerContact?: {
    name: string;
    agency: string;
    email: string;
    verified: boolean;
  };
  metrics: {
    avgEngagement: number;
    onTimeDeliveryRate: number;
    totalCompletedDeals: number;
  };
}

// 2. Campaign Entity
export interface Campaign {
  id: string;
  brandName: string;
  brandLogo: string;
  title: string;
  objective: string;
  targetAudience: string;
  budgetTotal: number;
  deliverableType: 'Dedicated YouTube Video' | 'Instagram Reel' | 'Multi-Platform Package';
  mandatoryTalkingPoints: string[];
  mandatoryCTA: string;
  discountCode: string;
  deadline: string;
  status: 'draft' | 'matching' | 'active' | 'completed';
}

// 3. Deal & Agreement Entity
export type DealStatus = 'draft' | 'offer_sent' | 'negotiating' | 'accepted' | 'confirmed' | 'completed';

export interface Deal {
  id: string; // e.g. "DEAL-2026-X89B"
  campaignId: string;
  creatorId: string;
  brandId: string;
  deliverables: string[];
  compensationAmount: number;
  paymentTerms: string;
  deadline: string;
  revisionLimit: number;
  usageRightsDuration: string;
  status: DealStatus;
  version: number;
  brandConfirmedAt?: string;
  creatorConfirmedAt?: string;
  sha256Hash: string;
}

// 4. Content Submission & AI Compliance Entity
export interface ComplianceResult {
  passed: boolean;
  productMentionDetected: boolean;
  ctaDetected: boolean;
  promoCodeDetected: boolean;
  detectedCode?: string;
  durationEstimateSeconds: number;
  unsupportedClaimsDetected: boolean;
  flags: Array<{ type: 'pass' | 'warning' | 'error'; message: string }>;
}
```

---

## 6. Detailed Implementation Phases & Milestones

To ensure synchronous execution across all 3 team members, the build is structured into **6 clear sequential phases**:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        SEQUENTIAL IMPLEMENTATION TIMELINE (16 HOURS)                   │
├──────────────┬─────────────────────────────────────────────────────────────────────────┤
│ Phase 0      │ Environment Scaffolding, Type Contracts & Seed Dataset (Hours 0–2)      │
│ Phase 1      │ Neo-Editorial Design System, Layout Shell & Role Switcher (Hours 2–4)   │
│ Phase 2      │ Creator Discovery Feed, Filter Rail & Real Free APIs (Hours 4–7)        │
│ Phase 3      │ Brand OS Brief Builder & Gemini AI Match Engine (Hours 7–10)            │
│ Phase 4      │ Verified Deal Room, Term Diffing & Client PDF Contract (Hours 10–13)    │
│ Phase 5      │ Campaign Workspace, AI Script Auditor & Retention Memory (Hours 13–15) │
│ Phase 6      │ End-to-End Rehearsal, Edge-Case Hardening & Presentation (Hours 15–16)  │
└──────────────┴─────────────────────────────────────────────────────────────────────────┘
```

---

### 🔹 Phase 0: Environment Scaffolding, Types & Seed Dataset (Hours 0–2)
* **Goal:** Initialize project repository, install dependencies, declare TypeScript interfaces, and prepare realistic demo seed records.
* **Key Tasks:**
  1. Initialize Next.js 14 project with TypeScript (`npm init -y`, `npx create-next-app@latest .`).
  2. Install required packages: `lucide-react`, `jspdf`, `@google/genai` (or native fetch), `canvas-confetti`.
  3. Create `src/types/` (`creator.ts`, `campaign.ts`, `deal.ts`, `workspace.ts`).
  4. Build `src/lib/seedData.ts` with 4 comprehensive creator personas:
     - *Alex Vance:* Claimed Tech/Dev creator (YouTube 142k, $2,500 dedicated video).
     - *Marques B.:* Established Unclaimed creator (YouTube 18M, Wikipedia bio, public manager route: `mgmt@m-agency.com`).
     - *Elena Rostova:* Claimed Lifestyle/Fashion creator (Instagram 280k, $1,800 reel).
     - *Kaelen "Vortex":* Claimed Gaming Streamer (Twitch 85k, $1,200 sponsorship).
  5. Add sample brand profile (*TechBrand Inc. - CyberFlow Launch*).
* **Deliverable:** Compiling project with typed mock datasets ready for UI consumption.
* **Exit Criteria:** `npm run dev` boots cleanly with zero TypeScript errors.

---

### 🔹 Phase 1: Neo-Editorial Design System, Layout & Role Switcher (Hours 2–4)
* **Goal:** Establish our unique dark-glass visual aesthetic and the floating universal role-switcher dock.
* **Key Tasks:**
  1. Build `src/app/globals.css`:
     - Define CSS custom properties: `--bg-base: #080C14`, `--bg-surface: #0F172A`, `--accent-primary: #8B5CF6`, `--accent-secondary: #06B6D4`, `--trust-verified: #10B981`, `--trust-unclaimed: #F59E0B`.
     - Implement utility classes: `.glass-panel`, `.glass-glow`, `.gradient-text`, `.btn-primary`, `.btn-glass`.
  2. Build `src/components/common/GlobalHeader.tsx`:
     - Navigation links, logo, live time indicator, demo notification pill.
  3. Build `src/components/common/RoleSwitcher.tsx`:
     - Floating top dock offering 4 view states:
       - 🏢 **Brand Mode** (TechBrand Inc.)
       - 🎨 **Creator Mode** (Alex Vance - Claimed)
       - 🕵️ **Unclaimed View** (Marques B. - Public)
       - 🛡️ **Verification View** (DEAL-2026-X89B)
  4. Build `src/app/page.tsx`:
     - High-impact landing page showcasing the 3 core pillars (*Discover*, *Collaborate*, *Grow*).
* **Deliverable:** Working responsive shell with role toggling stored in client state.
* **Exit Criteria:** Clicking any role immediately switches mock session state in the top header.

---

### 🔹 Phase 2: Creator Discovery Feed, Filter Rail & Real Free APIs (Hours 4–7)
* **Goal:** Build the search & discovery engine combining real external API stats with unclaimed profile badges and manager routing.
* **Key Tasks:**
  1. Build `src/components/discovery/FilterRail.tsx`:
     - Faceted multi-select: Niche (Tech, AI, Gaming, Fashion), Platform (YouTube, Twitch, Instagram), Claimed Status, Budget Range slider.
  2. Build `src/components/discovery/CreatorCard.tsx`:
     - Creator thumbnail, avatar, niche badges, rate indicators, follower counts, AI match pill, and status badges (`Claimed ✓` in emerald, `Unclaimed ⚡` in amber).
  3. Build `src/components/discovery/IntelligenceDrawer.tsx`:
     - Slide-over panel showing detailed platform stats, Wikipedia biographical excerpt, and public manager contact route box (`Send Campaign Brief via Manager`).
  4. Implement real API connectors in `src/lib/integrations/`:
     - `youtube.ts`: Calls YouTube Data API v3 (`channels.list`) with 24-hr cache fallback.
     - `wikipedia.ts`: Calls MediaWiki REST summary API (`api.rest_v1/page/summary/{title}`).
     - `twitch.ts`: Calls Twitch Helix API for live streaming status and game categories.
  5. Assemble `src/app/discover/page.tsx` connecting filters, creator cards, and real API enrichments.
* **Deliverable:** Interactive creator marketplace displaying live YouTube/Wikipedia data side-by-side with unclaimed profiles.
* **Exit Criteria:** Clicking an unclaimed creator immediately pulls real Wikipedia biographical summary without errors.

---

### 🔹 Phase 3: Brand OS Brief Builder & Gemini AI Match Engine (Hours 7–10)
* **Goal:** Enable brands to create structured briefs and receive AI-explained creator recommendations.
* **Key Tasks:**
  1. Build `src/app/campaigns/new/page.tsx` & `src/components/campaigns/BriefForm.tsx`:
     - Structured campaign inputs: Campaign Title, Objective, Budget, Deliverable type, Mandatory Talking Points, Mandatory CTA, Promo/Discount Code (`HACK20`), Target Deadline.
  2. Build API route `src/app/api/ai/match/route.ts`:
     - Sends campaign brief + creator profiles to Google Gemini Flash API.
     - System prompt instructs model to return structured JSON matching score (0–100), key alignment reasons, and risk caveats.
     - Graceful fallback to deterministic scoring algorithm if API key is unconfigured.
  3. Build `src/components/campaigns/MatchExplanationCard.tsx`:
     - Renders match percentage radar, *"Why Alex Vance fits this campaign"* breakdown, and direct *"Send Deal Offer"* CTA.
* **Deliverable:** Full campaign creation flow that outputs explainable AI creator recommendations.
* **Exit Criteria:** Submitting a campaign generates an explainable recommendation card citing specific brief overlap points.

---

### 🔹 Phase 4: Verified Deal Room, Term Diffing & Client PDF Contract (Hours 10–13)
* **Goal:** Deliver the trust & contract layer with dual confirmations, unique Deal IDs, and branded PDF generation.
* **Key Tasks:**
  1. Build `src/app/deals/[dealId]/page.tsx` & `src/components/deals/NegotiationTerms.tsx`:
     - Split-screen negotiation view: Commercial terms editor on the left, live agreement preview on the right.
     - Interactive counter-offer simulator (e.g., creator requests deadline shift or fee adjustment).
  2. Implement Dual Confirmation State Machine:
     - `Brand Confirmed ✓` + `Creator Confirmed ✓` $\rightarrow$ transitions deal to `Confirmed`.
  3. Build `src/lib/pdf/generateContract.ts`:
     - Client-side PDF generation using `jspdf`.
     - Embeds: Official Brand & Creator names, Deliverables checklist, Compensation, Deal ID (`DEAL-2026-X89B`), SHA-256 hash, and dual confirmation timestamps.
  4. Build `src/app/deals/verify/[dealId]/page.tsx`:
     - Public audit verification page displaying agreement status, confirmation timestamp, and verification QR code badge.
* **Deliverable:** Functional Deal Room where users negotiate, dual-confirm, download a professional contract PDF, and view public audit verification.
* **Exit Criteria:** PDF downloads cleanly on one click; public verification URL accurately renders confirmation state.

---

### 🔹 Phase 5: Campaign Workspace, AI Script Compliance & Retention Memory (Hours 13–15)
* **Goal:** Shared post-deal campaign workspace with live AI script checking and post-campaign retention memory.
* **Key Tasks:**
  1. Build `src/app/campaigns/[campaignId]/page.tsx`:
     - Tabbed workspace: *Brief | Deliverables Checklist | Content Review | Analytics*.
  2. Build `src/components/workspace/ComplianceChecker.tsx`:
     - Creator script submission textarea with pre-loaded demo buttons:
       - Script A (Has error: uses code `FALL20` instead of `HACK20`).
       - Script B (Compliant: uses code `HACK20` and required CTA).
  3. Build API route `src/app/api/ai/compliance/route.ts`:
     - Google Gemini Flash prompt evaluating script against brief talking points, CTA, and discount code.
     - Returns instant status flags: `Pass`, `Warning`, or `Fail`.
  4. Build Brand Approval Action:
     - Clicking `Approve Content` transitions campaign status to `Published`.
  5. Build `src/components/workspace/AnalyticsCards.tsx`:
     - Automatically renders post-publication ROI metrics (Reach: 420k, Engagement: 6.4%, Conversions: 380).
     - Appends completed collaboration record to Alex Vance's creator portfolio and Brand's past campaigns.
* **Deliverable:** Interactive workspace demonstrating automated AI script compliance and closed-loop campaign outcome logging.
* **Exit Criteria:** Submitting Script A flags wrong promo code in amber; submitting Script B passes and enables brand approval.

---

### 🔹 Phase 6: End-to-End Rehearsal, Edge-Case Hardening & Presentation (Hours 15–16)
* **Goal:** Verify the full 14-step presentation narrative, eliminate console warnings, and polish presentation aesthetics.
* **Key Tasks:**
  1. Dry-run the entire 14-step presentation script twice using the floating Role Switcher.
  2. Verify offline / API failure fallbacks (if YouTube or Gemini rate-limits, seeded JSON takes over seamlessly).
  3. Add micro-animations (confetti on agreement signing, glowing borders on pass flags).
  4. Update `progress.md` with final completion status.
* **Deliverable:** Flawless, production-grade hackathon prototype ready for judges.

---

## 7. Collaborator Workstream Allocation

Work is divided across **3 distinct streams** to prevent merge conflicts:

### 🛠️ Workstream A: Frontend UI/UX, Shell & Discovery (Teammate 1)
* Lead on: Phase 0 (Scaffolding & Seed data), Phase 1 (Design tokens & Role Switcher), Phase 2 (Discover page, Filter rail, CreatorCard, Drawer).

### 🧠 Workstream B: Brand OS, AI Intelligence & Workspace (Teammate 2)
* Lead on: Phase 3 (Brief form, Gemini matching API, Explanation card), Phase 5 (Workspace tabs, ComplianceChecker, Gemini compliance API, Analytics cards).

### 🤝 Workstream C: Verified Deal Room, PDF Engine & Real APIs (Teammate 3)
* Lead on: Phase 2 (Real YouTube, Wikipedia & Twitch API integrations), Phase 4 (Deal Room, Dual confirmation, PDF generator, Public verify page).

---

## 8. The 14-Step Presentation Rehearsal Script

When demoing the completed platform to the judges, follow this sequential script:

1. **[Role: Brand Mode]** Start on `/campaigns/new`. Show brief builder: *CyberFlow Launch, $2,500 budget, 1x YouTube Video, CTA with code `HACK20`*.
2. **[Brand Mode]** Click *Find Creators*. Platform displays 2 top recommendations: 1 Claimed creator (**Alex Vance**) and 1 Unclaimed creator (**Marques B.**).
3. **[Brand Mode]** Open Marques B.'s profile. Highlight the **live Wikipedia bio API** and the **verified agency manager contact route** (`mgmt@m-agency.com`). Explain how this solves cold-start onboarding.
4. **[Brand Mode]** Select claimed creator **Alex Vance**.
5. **[Brand Mode]** View the **Gemini AI Match Explanation Card**: Explains why Alex fits (*74% tech audience, budget fit, 5.2% engagement*).
6. **[Brand Mode]** Click *Send Deal Offer*.
7. **[Role Switcher $\rightarrow$ Creator Mode]** Switch to Alex Vance's view. Open `/deals/DEAL-2026-X89B`. Review terms and click *Accept & Sign Agreement*.
8. **[Role Switcher $\rightarrow$ Brand Mode]** Brand confirms terms. Watch deal transition to `Confirmed`.
9. **[Both Roles]** Click *Download Agreement PDF*. Open the generated PDF showing official terms, `Deal ID`, and cryptographic confirmation timestamps.
10. **[Role Switcher $\rightarrow$ Creator Mode]** Open `/campaigns/cyberflow/workspace`. Paste a demo script containing an intentional mistake (mentions code `FALL20` instead of `HACK20`).
11. **[Creator Mode]** Click *Run AI Compliance Check*. Gemini Flash flags the mismatched discount code in an amber warning badge.
12. **[Creator Mode]** Correct the script to `HACK20`. Rerun audit $\rightarrow$ 100% Green Pass. Creator clicks *Submit for Final Brand Approval*.
13. **[Role Switcher $\rightarrow$ Brand Mode]** Brand reviews the compliant submission and clicks *Approve & Mark Published*.
14. **[Both Roles]** Campaign transitions to `Completed`. Real-time performance metrics appear (420k reach, 6.4% engagement, 380 conversions), and the campaign outcome is automatically logged into the creator's portfolio and the brand's retention history.

---

## 9. Development Setup & Quickstart

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables (.env.local)
cp .env.example .env.local
# Add:
# YOUTUBE_API_KEY=your_key_here
# GEMINI_API_KEY=your_key_here
# TWITCH_CLIENT_ID=your_id_here
# TWITCH_CLIENT_SECRET=your_secret_here

# 3. Run development server
npm run dev
# App will run at http://localhost:3000
```

---

## 10. Team Action Items (Next Steps)
1. **Review and approve this document** with all teammates.
2. **Keep [`progress.md`](file:///c:/Users/Lakshay/Desktop/Projects/Bnb26_HackRats_maharashtra_round/progress.md) open and updated** as files are built and tested.
3. Refer to [Docs/integration_implementation.md](file:///c:/Users/Lakshay/Desktop/Projects/Bnb26_HackRats_maharashtra_round/Docs/integration_implementation.md) for ready-to-use API code snippets.
4. Begin execution of **Phase 0** and **Phase 1**!
