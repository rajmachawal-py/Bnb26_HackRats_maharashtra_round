# CreatorFlow: Complete Workflow & Architecture

CreatorFlow is an end-to-end platform designed for both Brands and Creators. Our unique dual-sided architecture solves the classic "cold-start" problem by serving both up-and-coming creators who actively use the platform, and established mega-creators who are indexed automatically.

---

## 👥 The Two Tiers of Creators

### 1. Small & Medium Creators (Active Users)
**Status in UI:** 🛡️ Verified Partners
- These creators actively sign up and log in to CreatorFlow.
- They build their profiles, link their social accounts natively, and use their dashboard to search for open brand campaigns.
- They can directly apply to campaigns, submit pitches, and communicate with brands natively inside the platform.

### 2. Established / Mega Creators (Auto-Indexed)
**Status in UI:** 🌐 Global Directory / Global Network
- Established mega-creators (e.g., Sourav Joshi, CarryMinati) **do not need to sign up or create an account**.
- CreatorFlow acts as a global search engine. It automatically discovers and indexes these creators live using the YouTube API and Wikipedia API.
- Brands can search for them, view their estimated commercial rates, and use the platform to generate structured outreach routed directly to their talent agencies or public management contacts.

---

## 🏢 Brand POV (How Brands Use CreatorFlow)

### 1. Creator Discovery (`/discover`)
- **Global Search:** Brands search for creators by name, niche, or platform.
- **Live Integration:** The platform pings the real **YouTube Data API** (explicitly biased for Indian creators via `regionCode=IN`) to fetch real-time subscriber and video stats.
- **Enriched Intelligence:** When a brand clicks on a mega-creator, the **Wikipedia API** dynamically fetches their public biography to build a comprehensive "Intelligence Drawer".

### 2. Campaign Builder & AI Matching (`/campaigns/new`)
- **Structured Briefs:** Brands create formal campaign briefs (defining budgets, target audiences, mandatory talking points, and deliverables).
- **Live AI Sourcing:** When the brand clicks "Run AI Creator Matching," the backend searches YouTube for top Indian creators matching the campaign's specific niche.
- **Gemini Evaluation:** These real creator profiles are fed into **Gemini AI**, which scores them against the brief and outputs transparent, explainable reasons why they are a good or bad fit.

---

## 🎙️ Creator POV (How Creators Use CreatorFlow)

### 1. Campaign Discovery (For Verified Partners)
- Small and medium creators log into their specialized dashboard to browse live briefs posted by brands.
- They can filter campaigns by budget and niche, submit creative pitches, and manage their inbound brand requests.

### 2. The Deal Room & Negotiation (`/deals/[dealId]`)
- A secure, split-screen negotiation room where the Brand and the Creator (or their agency) finalize deliverables and payments.
- **Dual Confirmation:** Both parties must electronically "Confirm" the deal to lock it in.
- **Automated Contracts:** The platform automatically generates a legally-styled PDF contract stamped with cryptographic Deal IDs and timestamps.

### 3. Workspace Hub (`/campaigns/[workspace]`)
- The shared workspace where the actual content production happens.
- **AI Compliance Check:** The creator uploads their draft video script. **Gemini AI** automatically reads it and verifies if the creator successfully included all mandatory talking points and discount codes. This protects the creator from having to re-record rejected videos and gives the brand peace of mind.

---

## ⚙️ How Integrations Power the Ecosystem

1. **`YOUTUBE_API_KEY`**: Drives the live Discovery engine and the dynamic AI Campaign Matcher to pull real, up-to-date Indian creator statistics and candidates.
2. **`GEMINI_API_KEY`**: Powers the intelligent matchmaking algorithms (explaining why a creator fits a brief) and the script compliance auditor.
3. **Wikipedia (Native)**: Enriches the "Global Index" mega-creator profiles with rich biographical intelligence without requiring API authentication.

By seamlessly bridging the gap between active, eager micro-creators and globally established talent, CreatorFlow provides a unified, professional hub for any influencer marketing campaign.
