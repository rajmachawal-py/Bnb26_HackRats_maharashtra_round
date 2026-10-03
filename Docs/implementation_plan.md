# Hackathon MVP Implementation Plan: Creator–Brand Collaboration Network

> **Target:** Tomorrow's Hackathon Presentation  
> **Budget Constraint:** $0 / ₹0 Mandatory Spend (Free Tiers & Seeded Data)  
> **Core Objective:** Build and demonstrate a bulletproof, crash-free, end-to-end working prototype that fulfills the complete collaboration loop:  
> **Find $\rightarrow$ Trust $\rightarrow$ Deal $\rightarrow$ Create $\rightarrow$ Approve $\rightarrow$ Measure $\rightarrow$ Learn**  
> *(Note: Advanced high-impact features are cataloged in [/Docs/features.md](file:///c:/Users/Lakshay/Desktop/Projects/Bnb26_HackRats_maharashtra_round/Docs/features.md) for post-hackathon implementation).*

---

## 1. Tomorrow's Hackathon Scope: The 12 Core Modules

To ensure maximum visual impact, rock-solid stability, and zero presentation glitches, tomorrow's build is strictly scoped to these **12 essential modules**:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              TOMORROW'S MVP SYSTEM MAP                                 │
├───────────────────────┬───────────────────────────────┬────────────────────────────────┤
│ 1. Landing Overview   │ 5. AI Match Engine (Gemini)   │ 9. Campaign Workspace Hub      │
│ 2. Creator Discovery  │ 6. Contact / Outreach Route   │ 10. AI Brief Compliance Check  │
│ 3. Deep Profile View  │ 7. Deal Terms Negotiation     │ 11. Campaign Analytics Cards   │
│ 4. Campaign Builder   │ 8. Verified Agreement & PDF   │ 12. Retention History Memory   │
└───────────────────────┴───────────────────────────────┴────────────────────────────────┘
```

### Module Breakdown
1. **Landing & Platform Overview:** Hero section clearly communicating the 3 jobs: *Discover, Collaborate, Grow*.
2. **Creator Discovery Grid:** Multi-creator feed showcasing small/medium claimed creators alongside established unclaimed creator profiles.
3. **Creator Profile Drawer:** Real YouTube/Twitch/Wikipedia stats, audience niche, claimed/unclaimed status badge, and public manager contact route.
4. **Brand Campaign Builder:** Clean structured brief form (objective, product, target audience, budget, deliverables, mandatory talking points, CTA).
5. **AI Matching Engine:** Google Gemini Flash integration recommending 3–5 creators with natural language explainability cards (*"Why this match?"*).
6. **Contact / Invitation Module:** Direct campaign offer invitation for claimed creators; verified public agency/manager route for unclaimed profiles.
7. **Deal Negotiation Panel:** Interactive terms editor (deliverables, fee, deadlines, revision limits, usage rights).
8. **Verified Agreement & PDF Generator:** Instant client-side branded PDF agreement with a unique `Deal ID`, dual-party confirmation timestamps, and status badge.
9. **Campaign Workspace:** Centralized execution hub displaying campaign brief, asset checklist, submission portal, and approval controls.
10. **AI Brief/Content Compliance Check:** Live script text auditor checking for product mention, required CTA, and promo code with pass/warn/fail pills.
11. **Campaign Analytics:** Visual performance cards displaying reach, engagement rate, clicks, and conversions using realistic seeded metrics.
12. **Relationship & Retention History:** Dynamic update appending the completed campaign outcome to both the brand's dashboard and the creator's portfolio.

---

## 2. Tomorrow's Zero-Cost ($0) Integration Stack

| Platform / Tool | Integration Approach | Cost | Why Essential for Tomorrow |
| :--- | :--- | :--- | :--- |
| **YouTube Data API v3** | Real Google API | **$0** (Free 10k quota) | Displays live, verifiable subscriber counts & recent video stats. |
| **Wikipedia REST API** | Real MediaWiki API | **$0** (No key required) | Enriches established unclaimed creator profiles with instant encyclopedic bios. |
| **Twitch Helix API** | Real Twitch API | **$0** (Free client credentials) | Shows live gaming creator categories and viewer metrics. |
| **Google Gemini API** | Real Gemini Flash API | **$0** (Free Tier) | Powers natural language match explanations and script compliance checks. |
| **Local PDF Engine** | `jspdf` / `@react-pdf` | **$0** (In-browser) | Generates professional, downloadable signed contracts on the spot. |
| **Social Adapters** | Seeded JSON Data Layer | **$0** (Local Cache) | Simulates realistic Instagram/X engagement without paying commercial API fees. |

---

## 3. Tomorrow's Killer UX Tool: Floating Role Switcher Dock

To keep the live hackathon pitch fast, fluid, and error-free without repeatedly logging in and out, a persistent glassmorphic dock floats at the top of the screen:

* 🏢 **Brand View (TechBrand Inc.):** Create campaign, view AI recommendations, send offer, review creator script, approve deliverables.
* 🎨 **Claimed Creator View (Alex Vance):** Receive brand offer, accept terms, submit draft script, trigger AI compliance check.
* 🕵️ **Unclaimed Creator View (Marques B.):** Demonstrate how the platform indexes established creators with public Wikipedia data and manager contact routing.
* 🛡️ **Public Verification View:** Display the verified contract state with `Deal ID` and dual confirmation timestamps.

---

## 4. The 14-Step Flawless Hackathon Demo Story

This exact narrative will be demonstrated to the judges:

1. **Step 1:** Brand opens campaign creator and inputs brief: *Product Launch, $2,500 budget, 1x Dedicated YouTube Video, mandatory CTA & code `HACK20`*.
2. **Step 2:** Platform displays matching creators: 1 claimed creator (**Alex Vance**) and 1 established unclaimed creator (**Marques B.**).
3. **Step 3:** Brand clicks on Marques B. $\rightarrow$ Sees Wikipedia bio, public stats, and verified manager email route (`mgmt@agency.com`). Explains cold-start solution.
4. **Step 4:** Brand selects claimed creator **Alex Vance** for the live collaboration.
5. **Step 5:** Gemini AI generates an instant explanation: *"95% Match: Alex's audience is 74% tech professionals, past engagement is 5.2%, budget fits within $2,500."*
6. **Step 6:** Brand sends structured offer; switch to Creator View $\rightarrow$ Creator accepts deal.
7. **Step 7:** Platform generates a branded PDF Agreement with unique `Deal ID: DEAL-2026-X89B` and dual confirmation timestamps.
8. **Step 8:** Campaign Workspace opens with deliverable checklist and deadline.
9. **Step 9:** Creator uploads a draft script containing a deliberate error (mentions promo code `FALL20` instead of `HACK20`).
10. **Step 10:** AI Content Auditor runs: flags the wrong discount code with an amber warning pill!
11. **Step 11:** Creator corrects script to `HACK20` $\rightarrow$ AI auditor gives 100% Green Pass.
12. **Step 12:** Switch to Brand View $\rightarrow$ Brand reviews and clicks **Approve Content**.
13. **Step 13:** Deliverable is marked **Published**; realistic performance metrics appear (420k reach, 6.4% engagement, 380 conversions).
14. **Step 14:** Campaign is archived into the Relationship Memory Log; Alex Vance's creator profile updates with verified brand collaboration evidence.

---

## 5. Tomorrow's Hour-by-Hour Implementation Schedule

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ TOTAL TIME BUDGET: 12-16 HOURS OF FOCUSED EXECUTION                                    │
├──────────────┬─────────────────────────────────────────────────────────────────────────┤
│ Hours 0–3    │ Setup & Shell: Next.js app, Neo-Editorial CSS theme, Role Switcher dock │
│ Hours 3–6    │ Discovery & APIs: Filter rail, CreatorCard, YouTube/Wiki/Twitch APIs   │
│ Hours 6–9    │ Brand OS & AI Match: Brief form, Gemini Flash match explanations        │
│ Hours 9–12   │ Deal Room & PDF: Term editor, Dual-confirmation, in-browser PDF download│
│ Hours 12–14  │ Campaign Workspace & Compliance: Script auditor, approval state machine │
│ Hours 14–16  │ Analytics & Rehearsal: Metric cards, polish, 14-step pitch dry-run     │
└──────────────┴─────────────────────────────────────────────────────────────────────────┘
```

### Detailed Milestone Checklist

#### Phase A: Project Setup & Global Shell (Hours 0–3)
- [ ] Initialize Next.js project with TypeScript.
- [ ] Implement Neo-Editorial glassmorphic theme in `globals.css` (obsidian `#080C14`, electric violet `#8B5CF6`, cyan `#06B6D4`).
- [ ] Build global `Header` with persistent `RoleSwitcher` (`Brand` vs `Creator` vs `Unclaimed`).
- [ ] Create `seedData.ts` with 4 diverse creator personas (2 claimed, 2 unclaimed) and 1 verified brand.

#### Phase B: Discovery Engine & Real Free APIs (Hours 3–6)
- [ ] Build `DiscoverPage` with left-hand faceted filters (niche, platform, claimed status).
- [ ] Build `CreatorCard` with status rings (Green = Claimed, Amber = Unclaimed).
- [ ] Connect `GET /api/youtube` to fetch live YouTube channel stats.
- [ ] Connect `GET /api/wikipedia` to fetch live public biography summaries.
- [ ] Connect `GET /api/twitch` to display streaming game categories.
- [ ] Build slide-over `CreatorDrawer` displaying public manager contact route for unclaimed profiles.

#### Phase C: Campaign Brief & Gemini AI Matching (Hours 6–9)
- [ ] Build `CampaignCreatePage` with structured brief fields (objective, budget, talking points, CTA).
- [ ] Connect `POST /api/ai/match` to Google Gemini Flash.
- [ ] Render `MatchExplanationCard` with match percentage, key reasons, and caveats.

#### Phase D: Deal Room & Verified PDF Engine (Hours 9–12)
- [ ] Build split-screen `DealRoomPage` showing commercial terms and counter-offer editor.
- [ ] Implement dual-party confirmation state (`Brand Confirmed ✓`, `Creator Confirmed ✓`).
- [ ] Integrate client-side PDF generation (`jspdf` or `@react-pdf`) creating a downloadable contract stamped with `Deal ID` and timestamps.

#### Phase E: Campaign Workspace & AI Content Auditor (Hours 12–14)
- [ ] Build `CampaignWorkspacePage` with tabs: *Brief, Deliverables, Content Review, Analytics*.
- [ ] Build `ComplianceChecker` component with sample script textarea.
- [ ] Connect `POST /api/ai/compliance` to check script against brief talking points and promo code.
- [ ] Implement brand `Approve` button that transitions campaign state to `Published`.

#### Phase F: Analytics, Retention & Pitch Polish (Hours 14–16)
- [ ] Render performance analytics cards (reach, engagement, clicks) upon publication.
- [ ] Display completed campaign under creator and brand collaboration history.
- [ ] Rehearse the 14-step demo flow twice to guarantee zero lag or broken links.

---

## 6. Strict Guardrails: What NOT to Build for Tomorrow

To prevent wasted time and presentation risks, do **NOT** attempt:
* ❌ Real payment gateway processing or live Stripe escrow.
* ❌ Scraping non-API social networks (Instagram / TikTok scraping scripts).
* ❌ Heavy video rendering or FFmpeg cloud worker pipelines.
* ❌ Native iOS/Android mobile apps.
* ❌ Multi-tenant complex database migrations (local state / Supabase free tier is plenty).

---

## 7. Post-Hackathon Roadmap Handoff

Once tomorrow's hackathon prototype is delivered and presented, the platform will be upgraded with the full feature suite documented in:
* **[Docs/features.md](file:///c:/Users/Lakshay/Desktop/Projects/Bnb26_HackRats_maharashtra_round/Docs/features.md):** 10 High-Impact Features including URL Smart-Briefs, Cryptographic QR Audits, Contract Diffing, and Milestone Escrow Rails.
* **[Docs/future_integrations.md](file:///c:/Users/Lakshay/Desktop/Projects/Bnb26_HackRats_maharashtra_round/Docs/future_integrations.md):** Production integrations including Meta Graph API, Stripe Connect, DocuSign, and Cloud Video Transcoding.
* **[Docs/integration_implementation.md](file:///c:/Users/Lakshay/Desktop/Projects/Bnb26_HackRats_maharashtra_round/Docs/integration_implementation.md):** Deep technical schemas for all active $0 APIs.
