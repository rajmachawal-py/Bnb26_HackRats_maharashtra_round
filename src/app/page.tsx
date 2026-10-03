import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  Compass, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  Users, 
  Layers, 
  TrendingUp,
  Zap,
  Globe2,
  FileCheck
} from 'lucide-react';
import { SEED_CREATORS, DEMO_CAMPAIGN } from '@/lib/seedData';
import { StatusBadge } from '@/components/common/StatusBadge';
import { GlassCard } from '@/components/common/GlassCard';

export default function HomePage() {
  const claimedCount = SEED_CREATORS.filter(c => c.state === 'claimed').length;
  const unclaimedCount = SEED_CREATORS.filter(c => c.state === 'unclaimed').length;

  return (
    <div className="flex flex-col gap-20 py-8">
      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <section className="page-container flex flex-col items-center text-center pt-10 pb-6 relative">
        {/* Glowing backdrop spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-violet-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />

        {/* Top Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-950/60 border border-violet-500/30 text-xs font-semibold text-violet-300 shadow-lg shadow-violet-950/40 mb-6 animate-float">
          <Sparkles size={13} className="text-cyan-400" />
          <span>BNB&apos;26 HACKATHON LIVE PROTOTYPE</span>
          <span className="w-1 h-1 rounded-full bg-violet-400" />
          <span className="text-cyan-300 font-mono">$0 FREE-TIER STACK</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight max-w-4xl text-white leading-[1.08] mb-6">
          The Shared Operating Layer Between <span className="gradient-text">Creators & Brands</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed mb-8">
          Bridge the fragmented creator economy. Connect discovery, verified legal agreements, 
          real-time AI brief compliance, and post-campaign retention memory in one unified workspace.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-14">
          <Link href="/discover" className="btn btn-primary btn-lg">
            <Compass size={18} />
            <span>Discover Creators</span>
            <ArrowRight size={16} />
          </Link>
          <Link href="/campaigns/new" className="btn btn-glass btn-lg">
            <Zap size={18} className="text-cyan-400" />
            <span>Create Campaign Brief</span>
          </Link>
          <Link href="/deals/DEAL-2026-X89B" className="btn btn-secondary btn-lg">
            <FileText size={18} className="text-violet-400" />
            <span>Open Deal Room</span>
          </Link>
        </div>

        {/* Live Metrics Trust Bar */}
        <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-900/50 border border-white/10 backdrop-blur-md text-left">
          <div className="p-3 border-r border-white/5">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">Platform Spend</div>
            <div className="text-2xl font-display font-bold text-emerald-400">$0 / Free Tier</div>
            <div className="text-[11px] text-slate-400">Zero mandatory infra cost</div>
          </div>
          <div className="p-3 border-r border-white/5">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">Active Ecosystem</div>
            <div className="text-2xl font-display font-bold text-white">{claimedCount} Claimed + {unclaimedCount} Public</div>
            <div className="text-[11px] text-slate-400">Solves cold-start dilemma</div>
          </div>
          <div className="p-3 border-r border-white/5">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">AI Verification</div>
            <div className="text-2xl font-display font-bold text-cyan-400">Gemini Flash</div>
            <div className="text-[11px] text-slate-400">Script compliance & matching</div>
          </div>
          <div className="p-3">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">Deal Integrity</div>
            <div className="text-2xl font-display font-bold text-violet-400">SHA-256 + PDF</div>
            <div className="text-[11px] text-slate-400">Dual-signed audit verification</div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          THE 14-STEP DEMO QUICK-JUMP MATRIX
          ========================================================================= */}
      <section className="page-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-violet-400 mb-1">
              Interactive Hackathon Walkthrough
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Experience the 4 Core Demo Stages
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-md">
            Click any module to jump directly into that step of the 14-stage workflow. 
            Use the floating top dock to toggle between Brand and Creator viewpoints.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <Link href="/discover" className="block group">
            <GlassCard className="h-full group-hover:border-violet-500/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-violet-600/20 text-violet-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Compass size={20} />
                </div>
                <div className="text-[11px] font-mono text-violet-400 font-semibold uppercase">Stage 01</div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                  Creator Discovery Graph
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Browse claimed small/medium creators alongside established unclaimed profiles (with live Wikipedia data & manager routing).
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-violet-400 group-hover:translate-x-1 transition-transform">
                <span>Open Discovery</span>
                <ArrowRight size={14} />
              </div>
            </GlassCard>
          </Link>

          {/* Card 2 */}
          <Link href="/campaigns/new" className="block group">
            <GlassCard className="h-full group-hover:border-cyan-500/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles size={20} />
                </div>
                <div className="text-[11px] font-mono text-cyan-400 font-semibold uppercase">Stage 02</div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  Brief Builder & AI Match
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Input structured brief requirements and watch Gemini AI explain why creators fit with explainable rationale.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
                <span>Build Campaign</span>
                <ArrowRight size={14} />
              </div>
            </GlassCard>
          </Link>

          {/* Card 3 */}
          <Link href="/deals/DEAL-2026-X89B" className="block group">
            <GlassCard className="h-full group-hover:border-emerald-500/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ShieldCheck size={20} />
                </div>
                <div className="text-[11px] font-mono text-emerald-400 font-semibold uppercase">Stage 03</div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  Deal Room & PDF Contract
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Simulate commercial counter-offers, execute dual confirmation, and download client-generated contract PDFs with Deal IDs.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
                <span>View Deal Room</span>
                <ArrowRight size={14} />
              </div>
            </GlassCard>
          </Link>

          {/* Card 4 */}
          <Link href="/campaigns/cyberflow/workspace" className="block group">
            <GlassCard className="h-full group-hover:border-amber-500/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileCheck size={20} />
                </div>
                <div className="text-[11px] font-mono text-amber-400 font-semibold uppercase">Stage 04</div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                  AI Compliance & Analytics
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Test draft scripts against brief requirements. Catch missing codes, approve deliverables, and log post-campaign ROI metrics.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
                <span>Open Workspace</span>
                <ArrowRight size={14} />
              </div>
            </GlassCard>
          </Link>
        </div>
      </section>

      {/* =========================================================================
          THE 3 CORE PILLARS (DISCOVER, COLLABORATE, GROW)
          ========================================================================= */}
      <section className="page-container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 mb-1">
            System Architecture
          </div>
          <h2 className="text-3xl font-display font-bold text-white mb-3">
            Three Connected Operating Jobs
          </h2>
          <p className="text-sm text-slate-400">
            A single continuous business loop that keeps relationship context alive across campaigns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white mb-5 shadow-lg shadow-violet-600/30">
              <Compass size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">1. Discover & Match</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Indexes small creators looking for deals alongside established tier-1 creators via legitimate public sources. No cold-start gatekeeping.
            </p>
            <ul className="flex flex-col gap-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" />
                <span>Multi-signal matching beyond follower vanity</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" />
                <span>Explainable AI recommendations with caveats</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" />
                <span>Verified agency & manager routing routes</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-600 to-teal-600 flex items-center justify-center text-white mb-5 shadow-lg shadow-cyan-600/30">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">2. Collaborate & Verify</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Structured negotiation eliminates undocumented DM promises. Dual confirmation generates an immutable Deal ID and downloadable PDF contract.
            </p>
            <ul className="flex flex-col gap-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-cyan-400 flex-shrink-0" />
                <span>Structured terms: deliverables, usage rights, fees</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-cyan-400 flex-shrink-0" />
                <span>Branded PDF agreement with dual timestamps</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-cyan-400 flex-shrink-0" />
                <span>AI compliance checking for scripts and CTAs</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-fuchsia-600 to-pink-600 flex items-center justify-center text-white mb-5 shadow-lg shadow-fuchsia-600/30">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">3. Grow & Retain</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Campaign outcomes do not vanish into emails. Performance metrics are attached to the creator portfolio and brand history for seamless re-booking.
            </p>
            <ul className="flex flex-col gap-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-fuchsia-400 flex-shrink-0" />
                <span>Post-campaign ROI & conversion tracking</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-fuchsia-400 flex-shrink-0" />
                <span>Creator portfolio enriched with verified deals</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-fuchsia-400 flex-shrink-0" />
                <span>Dual learning loops for creators and brands</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================================
          THE 4-STATE CREATOR LIFECYCLE SPOTLIGHT
          ========================================================================= */}
      <section className="page-container">
        <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-violet-500/20 backdrop-blur-xl relative overflow-hidden">
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs font-mono font-semibold mb-3">
              <Globe2 size={12} />
              <span>COLD-START SOLVER</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3">
              The 4-State Creator Discovery Model
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Why don&apos;t marketplaces work? Established creators refuse to create yet another profile. 
              Our acquisition principle: <strong className="text-white">Make creators visible first through public data, then give them a concrete reason (an incoming deal) to claim their profile.</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-400">01</span>
                <StatusBadge label="Discoverable" variant="neutral" size="sm" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Public Presence</h4>
              <p className="text-[11px] text-slate-400">
                Indexed from legitimate public sources like Wikipedia and YouTube stats. No account required.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-amber-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-amber-400">02</span>
                <StatusBadge state="unclaimed" size="sm" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Unclaimed Profile</h4>
              <p className="text-[11px] text-slate-400">
                Brands can see public signals and reach out via listed talent manager / agency email.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-emerald-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-emerald-400">03</span>
                <StatusBadge state="claimed" size="sm" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Claimed Creator</h4>
              <p className="text-[11px] text-slate-400">
                Creator claims ownership to manage rates, view direct offers, and negotiate contracts.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-cyan-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-cyan-400">04</span>
                <StatusBadge state="active" size="sm" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Active Deal</h4>
              <p className="text-[11px] text-slate-400">
                Executing campaigns with real-time AI compliance check, verified delivery, and analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LIVE DEMO CTA BAR
          ========================================================================= */}
      <section className="page-container text-center py-6">
        <div className="p-8 rounded-2xl bg-gradient-to-r from-violet-950/60 via-slate-900/60 to-cyan-950/60 border border-white/10 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h3 className="text-xl font-display font-bold text-white mb-1">
              Ready to verify the 14-step prototype?
            </h3>
            <p className="text-xs text-slate-400">
              Begin with Creator Discovery or jump straight into the CyberFlow campaign brief.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/discover" className="btn btn-primary">
              <Compass size={16} />
              <span>Launch Creator Discovery</span>
            </Link>
            <Link href="/deals/verify/DEAL-2026-X89B" className="btn btn-secondary">
              <ShieldCheck size={16} />
              <span>Verify Deal Audit</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
