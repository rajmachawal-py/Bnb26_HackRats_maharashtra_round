'use client';

import React from 'react';
import Link from 'next/link';
import { DEMO_CAMPAIGN, DEMO_DEAL, SEED_CREATORS } from '@/lib/seedData';
import { StatusBadge } from '@/components/common/StatusBadge';
import { formatCurrency } from '@/lib/utils';
import { 
  PlusCircle, 
  Briefcase, 
  Target, 
  Calendar, 
  DollarSign, 
  Users, 
  ArrowRight, 
  FileText, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function CampaignsDashboardPage() {
  const campaign = DEMO_CAMPAIGN;
  const matchedCreator = SEED_CREATORS.find(c => c.id === 'creator-alex-vance');

  return (
    <div className="page-container py-8 flex flex-col gap-8">
      {/* Dashboard Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-600/15 border border-violet-500/30 text-xs font-semibold text-violet-300 font-mono mb-2">
            <Briefcase size={13} className="text-cyan-400" />
            <span>BRAND OS PIPELINE</span>
            <span>•</span>
            <span>CAMPAIGN MANAGER</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
            Brand Campaigns Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Manage your structured briefs, monitor AI matching recommendations, and oversee live collaboration workspaces.
          </p>
        </div>

        <Link href="/campaigns/new" className="btn btn-primary">
          <PlusCircle size={16} />
          <span>Create New Campaign</span>
        </Link>
      </div>

      {/* High-Level Pipeline Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10">
          <div className="text-[11px] font-mono text-slate-400 uppercase">Active Campaigns</div>
          <div className="text-2xl font-bold font-display text-white mt-1">1 Live</div>
          <div className="text-[11px] text-emerald-400 mt-1">CyberFlow Pro Launch</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10">
          <div className="text-[11px] font-mono text-slate-400 uppercase">Total Budget Allocated</div>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">{formatCurrency(campaign.brief.totalBudget)}</div>
          <div className="text-[11px] text-slate-400 mt-1">$2,500 contracted</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10">
          <div className="text-[11px] font-mono text-slate-400 uppercase">Contracted Creators</div>
          <div className="text-2xl font-bold font-display text-cyan-400 mt-1">1 Creator</div>
          <div className="text-[11px] text-slate-400 mt-1">Alex Vance (Claimed)</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10">
          <div className="text-[11px] font-mono text-slate-400 uppercase">Agreement Status</div>
          <div className="text-2xl font-bold font-display text-violet-400 mt-1">Dual Confirmed</div>
          <div className="text-[11px] text-slate-400 mt-1">Deal {DEMO_DEAL.id}</div>
        </div>
      </div>

      {/* Active Campaign Card */}
      <div className="glass-card p-6 border border-violet-500/30">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="text-2xl">🚀</span>
              <h2 className="text-xl font-bold text-white">
                {campaign.brief.campaignTitle}
              </h2>
              <span className="badge badge-cyan text-xs">
                Active Campaign
              </span>
            </div>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              {campaign.brief.productDescription}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/campaigns/cyberflow/workspace"
              className="btn btn-primary btn-sm"
            >
              <Briefcase size={14} />
              <span>Open Campaign Workspace</span>
            </Link>
            <Link
              href="/deals/DEAL-2026-X89B"
              className="btn btn-secondary btn-sm"
            >
              <FileText size={14} />
              <span>Deal Room (v2)</span>
            </Link>
          </div>
        </div>

        {/* Campaign Deliverables & Timeline Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-xs">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 flex items-start gap-3">
            <Target size={18} className="text-violet-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white">Primary Objective</div>
              <div className="text-slate-400 text-[11px]">{campaign.brief.campaignObjective}</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 flex items-start gap-3">
            <Calendar size={18} className="text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white">Target Publishing Deadline</div>
              <div className="text-slate-400 text-[11px] font-mono">{campaign.brief.targetDeadline}</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 flex items-start gap-3">
            <DollarSign size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white">Deliverable Budget</div>
              <div className="text-slate-400 text-[11px] font-mono">{formatCurrency(campaign.brief.budgetPerCreator)} / Creator</div>
            </div>
          </div>
        </div>

        {/* Contracted Creator Row */}
        {matchedCreator && (
          <div className="mt-6 p-4 rounded-xl bg-slate-950/80 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={matchedCreator.avatar}
                alt={matchedCreator.name}
                className="w-12 h-12 rounded-xl object-cover border border-violet-500/50"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{matchedCreator.name}</span>
                  <StatusBadge state={matchedCreator.state} size="sm" />
                </div>
                <div className="text-[11px] text-slate-400">
                  Deliverable: {campaign.brief.deliverablesRequired[0]}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div>
                <span className="text-slate-400 block text-[10px]">Deal Status:</span>
                <span className="text-emerald-400 font-bold">Dual-Confirmed ✓</span>
              </div>
              <Link
                href="/deals/DEAL-2026-X89B"
                className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1"
              >
                <span>View Agreement</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
