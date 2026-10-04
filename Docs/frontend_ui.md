# Frontend UI/UX Design Specification: Creator–Brand Collaboration Network

> **Document Status:** Complete Design System & UI/UX Architecture  
> **Target Audience:** Product Designers, Frontend Engineers, Hackathon Evaluators  
> **Core Objective:** Deliver an industry-grade layout inspired by category leaders (**Qoruz, Upfluence, CreatorIQ, GRIN, Whalar, LTK**) while establishing a completely unique, premium, dark-glass editorial aesthetic with verified trust workflows.

---

## 1. Competitive UI/UX Analysis & Benchmarking

| Platform | Core Strength | UI/UX Layout Pattern | Major Flaws & Generic Traps to Avoid |
| :--- | :--- | :--- | :--- |
| **CreatorIQ** | Enterprise data & reporting | Modular tabs (*Discover, Manage, Measure*), dense metric grids, data cards. | Overly complex, rigid enterprise "Salesforce" aesthetic; cold, intimidating UI. |
| **Upfluence** | Granular filtering & e-commerce | Left-hand faceted filter sidebar, tabular creator lists, batch action bar. | Cluttered legacy table UI, tiny text, visual fatigue from endless grey borders. |
| **GRIN** | CRM pipeline & relationship hub | Horizontal Kanban stages (*Prospecting $\rightarrow$ Outreach $\rightarrow$ Content $\rightarrow$ Payment*). | Generic B2B SaaS appearance; feels like inventory management rather than a creative space. |
| **Qoruz** | Regional influencer intelligence | Audience demographic breakdowns, rate estimates, agency/manager contact tags. | Dense corporate dashboard, cluttered cards, lack of cohesive brand styling. |
| **Whalar** | Creative storytelling & aesthetics | High-end visual reels, editorial creator cards, dark/bold media-first presentation. | Often lacks deep self-serve utility or structured instant contracting workflows. |
| **LTK** | Creator commerce & attribution | Visual product cards, mobile-first feed, real-time conversion & affiliate stats. | Heavily consumer-facing; lacks structured brand campaign negotiation tools. |

---

## 2. Our Design Philosophy: *Neo-Editorial Cyber-Trust*

Rather than copying the standard "white-and-blue SaaS template" or cluttered data tables, our platform merges **Whalar's editorial luxury**, **CreatorIQ's data depth**, and **GRIN's pipeline fluidity** into a unified, **dark-mode glassmorphic operating system**.

### 🌟 Key Differentiators:
1. **Glassmorphism & Depth:** Deep obsidian backgrounds (`#0B0F17`) with frosted translucency (`backdrop-blur-md`), subtle radial glow effects, and ultra-crisp micro-borders (`rgba(255,255,255,0.08)`).
2. **Explainable AI Matching Cards:** Replaces raw follower counts with an interactive **AI Match Radar & Explainability Drawer** (highlighting brief alignment, audience overlap, and tone fit).
3. **Verified Deal Room with Live Trust Stamp:** Interactive contract view featuring dual-party signature locks, unique `Deal ID` hashes, and a public audit verification modal.
4. **Split-Screen AI Content Compliance:** Real-time side-by-side view comparing uploaded creator scripts/footage against campaign brief requirements with live green/amber/red status pills.
5. **Instant Role-Switcher Demo Dock:** A floating top bar permettant instant switching between **Brand Mode**, **Creator Mode**, and **Public Verification View** without logging out.

---

## 3. Design System & Design Tokens

### 3.1 Color Palette
```css
:root {
  /* Surface & Backgrounds */
  --bg-base: #080C14;           /* Deep obsidian night */
  --bg-surface: #0F172A;        /* Dark slate card container */
  --bg-surface-elevated: #1E293B;/* Hover / popup layer */
  --bg-glass: rgba(15, 23, 42, 0.65);
  --border-glass: rgba(255, 255, 255, 0.08);
  --border-glass-active: rgba(139, 92, 246, 0.4);

  /* Primary Accent & Gradients */
  --accent-primary: #8B5CF6;     /* Electric Violet */
  --accent-primary-hover: #7C3AED;
  --accent-secondary: #06B6D4;   /* Cyber Cyan */
  --accent-gradient: linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%);
  --accent-glow: 0 0 24px rgba(139, 92, 246, 0.25);

  /* Trust & Status Accents */
  --trust-verified: #10B981;    /* Emerald Green (Claimed/Confirmed) */
  --trust-unclaimed: #F59E0B;   /* Amber Glow (Unclaimed Profile) */
  --trust-danger: #EF4444;      /* Crimson (Non-compliant / Error) */

  /* Text & Typography */
  --text-primary: #F8FAFC;      /* High-contrast crisp white */
  --text-secondary: #94A3B8;    /* Muted slate text */
  --text-tertiary: #64748B;     /* Subtext & placeholders */
}
```

### 3.2 Typography Hierarchy
* **Display & Headings:** `Plus Jakarta Sans` or `Outfit` (600/700 weight, tight tracking `-0.02em`)
* **Body & Interface UI:** `Inter` (400/500 weight, high readability)
* **Deal IDs, Codes & Timestamps:** `JetBrains Mono` or `Fira Code` (for cryptographic hashes, contract IDs, and metric figures)

### 3.3 Micro-Animations & Interactions
* **Card Hover:** Subtle translate-up (`-3px`) + border glow transition (`200ms ease-out`).
* **AI Match Pulse:** Soft pulsing cyan-violet ring around AI match percentages (>90%).
* **Verification Stamp Animation:** Scale-in with soundless checkmark draw on deal agreement confirmation.

---

## 4. Platform Layout Architecture & Wireframes

The application is structured into **5 Primary Layout Views**, sharing a common global sidebar and command navigation.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ GLOBAL APP HEADER: Logo | Search Bar | Quick Actions | Role Switcher [Brand/Creator]   │
├──────────────┬─────────────────────────────────────────────────────────────────────────┤
│ SIDEBAR      │ MAIN CONTENT VIEW AREA                                                  │
│              │                                                                         │
│ 🔍 Discovery │  [View Title] + Actions (Create Campaign, Export, Filter Toggle)        │
│ 🎯 Campaigns │ ─────────────────────────────────────────────────────────────────────── │
│ 🤝 Deal Room │                                                                         │
│ 📁 Workspace │  Dynamic Viewport (Grid / Pipeline / Split-Pane / Analytics Dashboards) │
│ 📈 Analytics │                                                                         │
│ ⚙️ Settings  │                                                                         │
└──────────────┴─────────────────────────────────────────────────────────────────────────┘
```

---

### View 0: Brand Profile Onboarding & Identity Gating (`/brand/onboarding`)
**Layout Pattern:** Distraction-Free Focused Modal/Page Layout (Navigation sidebar is suppressed to maximize form completion focus).

#### Key Components:
1. **Header & Context:**
   - Brand OS Welcome Banner with progress pills (`Company Identity` $\rightarrow$ `Scale & Budget` $\rightarrow$ `Primary Contact`).
   - Clear value proposition highlighting zero-friction local persistence.
2. **Three-Tier Form Sections:**
   - **Section 1: Company Identity:** Company name, brand tagline, primary industry dropdown (Gaming, FinTech, D2C, SaaS, AI, Health, Web3), and public website URL.
   - **Section 2: Scale & Budget:** Organization size picker, target geographic region, default settlement currency (`INR`, `USD`, `EUR`, `GBP`), and monthly influencer marketing budget input.
   - **Section 3: Primary Marketer Contact:** Marketer's full name and corporate business email.
3. **Reactive Validation & Submission:**
   - Real-time client-side error hints preventing empty or invalid submissions.
   - On completion, writes to `BrandContext` (`localStorage`) and seamlessly routes to `/brand/dashboard`.
4. **Dynamic Workspace Personalization:**
   - Injects the active brand identity into the Global Sidebar (custom company initials badge and email).
   - Injects custom greeting (`Good morning, {companyName}`) and industry tag into the main Brand OS Dashboard.
   - Provides full profile inspection, editing, and state-resetting tools in `/brand/settings`.

---

### View 1: Creator Discovery & Intelligence Engine (Upfluence + Qoruz Evolved)
**Layout Pattern:** Collapsible Faceted Filter Rail (Left) + Visual Responsive Grid (Center) + Slide-Over Creator Intelligence Drawer (Right).

#### Key Components:
1. **Faceted Filter Rail (Left - 280px):**
   - **Niche & Topics:** Multi-select pills (Tech, Fashion, Fitness, AI, Gaming).
   - **Profile State Filter:** `All`, `Claimed Creators (Instant Collab)`, `Unclaimed (Manager Outreach)`.
   - **Platform Badges:** YouTube, Instagram, X, TikTok, LinkedIn with follower/view sliders.
   - **Budget Fit Slider:** `$500` to `$15,000+`.
   - **Audience Geography & Language:** Country / City picker.

2. **Creator Discovery Grid (Center):**
   - **Creator Card:**
     - Top banner image / latest reel thumbnail.
     - Avatar with status badge (`Claimed ✓` in Emerald, `Unclaimed ⚡` in Amber).
     - Name, Primary Niche, Region.
     - **Quick Stats Bar:** Followers, Avg. Engagement Rate (e.g. `5.4%`), Avg. Reel Views.
     - **AI Match Score Pill:** `96% Match` with tooltip explaining fit.
     - **Action Buttons:** `View Profile` (opens drawer) and `Invite to Campaign`.

3. **Slide-Over Creator Intelligence Drawer (Right - 520px):**
   - Detailed audience age/gender/geography breakdown charts.
   - Verified past collaboration history (Brands worked with, deliverables completed).
   - **Manager / Business Contact Box:**
     - For *Claimed:* Direct Instant Invite & Chat CTA.
     - For *Unclaimed:* Verified public agency/manager email & representation details with "Send Campaign Offer via Manager" button.

---

### View 2: Brand Campaign Builder & AI Matching (CreatorIQ Evolved)
**Layout Pattern:** Multi-Step Wizard or Single-Page Structured Brief Builder with Live AI Creator Preview.

#### Key Components:
1. **Campaign Brief Form:**
   - **Brand Context:** Brand Name, Product Name, Industry, Website.
   - **Campaign Objective:** Awareness, App Installs, Sales Conversions, Product Review.
   - **Deliverable Specs:** Platform selector + Format (e.g., 1x 60s Dedicated YouTube Video + 2x IG Reels).
   - **Creative Guidelines:** Required Tone, Mandatory Talking Points, Mandatory CTA, Promo/Discount Code.
   - **Commercial Constraints:** Budget per Creator, Exclusivity Period, Target Publishing Deadline, Revision Limit (e.g., max 2 revisions).
2. **Live AI Match Recommendation Panel (Instant Trigger):**
   - Displays 3–5 recommended creators with **Explainability Cards**:
     - *"Why this match?"* (e.g., "Audience is 78% Tech enthusiasts in target US/India region; past engagement rate 2.1x category average; historical on-time delivery 100%").
     - *"Requirements Satisfied:"* Tech niche, within $2,000 budget, YouTube format expert.
     - *"Needs Confirmation:"* Exclusivity conflict check for Q4.

---

### View 3: Verified Deal Room & Contract Workspace (Our Unique Trust Layer)
**Layout Pattern:** Split-Screen Negotiation & Legal Agreement Interface.

```
┌───────────────────────────────────────────────┬──────────────────────────────────────────────┐
│ LEFT PANE: Structured Commercial Terms        │ RIGHT PANE: Live Generated Contract Preview  │
├───────────────────────────────────────────────┼──────────────────────────────────────────────┤
│ • Campaign: CyberFlow Launch                  │ 📜 AGREEMENT #D-84920-V2                     │
│ • Deliverables: 1x YouTube Video, 1x Reel     │ Parties: TechBrand Inc. & Alex Vance         │
│ • Compensation: $3,500 ($1,500 Adv / $2,000)  │ Deliverables: ...                            │
│ • Deadline: Oct 28, 2026                      │ Usage Rights: 6 Months Digital Ad Rights     │
│ • Revision Limits: 2 Free Revisions           │                                              │
│ • Usage Rights: Digital Organic + 90d Ads     │ [Dual Confirmation Status Box]               │
│                                               │ Brand:  ✅ Confirmed (Oct 04, 10:30 UTC)     │
│ [Make Counter Offer]  [Confirm Terms]         │ Creator: ⏳ Pending Signature                │
│                                               │                                              │
│ Deal Version: v2 (Updated Oct 04)             │ [ 📥 Download Branded Agreement PDF ]        │
└───────────────────────────────────────────────┴──────────────────────────────────────────────┘
```

#### Key Components:
- **Interactive Terms Editor:** Both sides can edit compensation, deliverables, and dates.
- **Versioning Engine:** Any modification triggers a new version (`v1` $\rightarrow$ `v2`) and invalidates prior approvals (enforcing re-confirmation).
- **Public Deal Verification Modal / Page:** Shareable audit page showing `Deal ID`, cryptographic hash, parties involved, confirmation timestamps, and fulfillment state.

---

### View 4: Campaign Execution & Content Intelligence Workspace (GRIN Evolved)
**Layout Pattern:** Tabbed Campaign Operations Hub (Brief | Deliverables | Content AI Review | Messages | Payouts).

#### Key Content Intelligence Tab (AI Compliance Auditor):
- **Upload / Submission Area:** Creator pastes script text or uploads video clip/draft URL.
- **AI Compliance Checklist (Live Audit):**
  - ✅ **Product Mention:** *"CyberFlow App"* detected at 00:14.
  - ✅ **Mandatory CTA:** *"Click the link in description to get 20% off"* detected.
  - ⚠️ **Promo Code Check:** Brief specified `HACK20`, script mentioned `FALL20` (Warning Flagged!).
  - ❌ **Forbidden Claims:** No unsubstantiated claims detected.
  - ⏱️ **Duration Check:** Script runtime ~55 seconds (Fits 45-60s requirement).
- **Brand Feedback & Approval Action Bar:**
  - `Request Revision with AI Notes` | `Approve Content & Ready for Publishing`.

---

### View 5: Campaign Analytics, Learning Loops & Creator Passport (LTK + CreatorIQ)
**Layout Pattern:** Executive Performance Dashboard with Creator Growth Attribution.

#### Key Components:
1. **Campaign ROI & Metric Overview Cards:**
   - Total Impressions / Reach (e.g., `450,000`).
   - Engagement Rate (e.g., `6.8%` vs `4.2%` benchmark).
   - Click-Through Rate & Conversions (e.g., `3,420 clicks`, `412 signups`).
   - Effective CPM / CAC.
2. **Creator Performance Passport:**
   - Completed campaigns archive with verified deal badges.
   - Reliability score (On-time delivery, compliance score, brand rating).
   - Relationship memory notes (e.g., "Excellent engagement on tech tutorials; recommend re-booking for Spring campaign").

---

## 5. UI Component Hierarchy & Design Matrix

| Component Name | Description | Key Interactive States |
| :--- | :--- | :--- |
| `AppHeader` | Top bar with search, notifications, demo role switcher. | Default, Role Switched (Brand/Creator/Public). |
| `CreatorCard` | Discover grid creator item. | Default, Hover Glow, Unclaimed Amber Border, Active. |
| `IntelligenceDrawer` | Slide-over deep profile and contact drawer. | Hidden, Open, Manager Outreach Mode, Claim Mode. |
| `CampaignWizard` | Multi-step structured brief creation form. | Step 1-4, AI Match Auto-trigger, Submitting. |
| `MatchExplanationCard`| AI rationale card with verified points vs caveats. | Default, Expanded evidence pill, Score badge. |
| `DealEditor` | Form for negotiating deliverables, fee, rights. | Draft, Counter-offer, Locked/Confirmed, Versioned. |
| `ContractPreview` | Branded PDF/HTML agreement representation. | Pending Dual-Confirm, Signed, PDF Generated. |
| `AIComplianceChecker`| Real-time content vs brief verification checklist. | Checking (Skeleton), Pass (Green), Warn (Amber), Fail (Red). |
| `KanbanPipeline` | Campaign progress tracker across deal stages. | Drag/drop ready, Stage filtered, Detail preview. |
| `MetricChartCard` | Time-series engagement and conversion graphs. | Metric toggles (Reach/Clicks/ROI), Date range. |

---

## 6. Zero-Cost Implementation Strategy for Frontend

- **Framework:** Next.js (App Router) + React + Vanilla CSS / CSS Modules.
- **Icons:** Lucide React (Clean, modern stroke icons).
- **Charts / Visualizations:** Recharts or Chart.js (Zero API cost, client-side rendering).
- **PDF Generation:** `@react-pdf/renderer` or `jspdf` (Client-side / serverless $0 PDF generation).
- **Mock / Seed Data Layer:** Robust JSON seed dataset mirroring real-world creator stats and campaigns with clean TypeScript interfaces for seamless backend/Supabase swap.

---

## 7. Next Steps & Summary Checklist
- [x] Competitive analysis of Qoruz, Upfluence, CreatorIQ, GRIN, Whalar, and LTK.
- [x] Defined unique *Neo-Editorial Cyber-Trust* visual theme and tokens.
- [x] Detailed wireframe architecture for Discovery, Campaign Builder, Deal Room, Workspace, and Analytics.
- [x] Specified AI Content Compliance and Trust/Verification components.
- [x] Prepared complete UI specification in `frontend_ui.md`.
