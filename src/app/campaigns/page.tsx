'use client';

import React from 'react';
import Link from 'next/link';
import { DEMO_CAMPAIGN, DEMO_DEAL, SEED_CREATORS } from '@/lib/seedData';
import { StatusBadge } from '@/components/common/StatusBadge';
import { formatCurrency } from '@/lib/utils';
import { 
  Plus, 
  Briefcase, 
  Target, 
  Calendar, 
  DollarSign, 
  ArrowRight, 
  FileText, 
  Users,
  CheckCircle2
} from 'lucide-react';

export default function CampaignsDashboardPage() {
  const campaign = DEMO_CAMPAIGN;
  const matchedCreator = SEED_CREATORS.find(c => c.id === 'creator-alex-vance');

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Campaigns
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your structured briefs and oversee live collaboration workspaces.
          </p>
        </div>

        <Link href="/campaigns/new" className="btn btn-primary">
          <Plus size={16} />
          <span>Create Campaign</span>
        </Link>
      </div>

      {/* High-Level Pipeline Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="saas-card p-5">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Campaigns</div>
          <div className="text-3xl font-bold text-slate-900 mt-2 mb-1">1 Live</div>
          <div className="text-sm font-medium text-emerald-600">CyberFlow Pro Launch</div>
        </div>
        <div className="saas-card p-5">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Budget Allocated</div>
          <div className="text-3xl font-bold text-slate-900 mt-2 mb-1">{formatCurrency(campaign.brief.totalBudget)}</div>
          <div className="text-sm font-medium text-slate-600">$2,500 contracted</div>
        </div>
        <div className="saas-card p-5">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Contracted Creators</div>
          <div className="text-3xl font-bold text-slate-900 mt-2 mb-1">1 Creator</div>
          <div className="text-sm font-medium text-slate-600">Alex Vance (Claimed)</div>
        </div>
        <div className="saas-card p-5">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Agreement Status</div>
          <div className="text-3xl font-bold text-slate-900 mt-2 mb-1">Dual Confirmed</div>
          <div className="text-sm font-medium text-slate-600">Deal {DEMO_DEAL.id}</div>
        </div>
      </div>

      {/* Active Campaign Card */}
      <div className="saas-card overflow-hidden border-primary-200 ring-1 ring-primary-100">
        <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-slate-50/50">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🚀</span>
              <h2 className="text-xl font-bold text-slate-900">
                {campaign.brief.campaignTitle}
              </h2>
              <StatusBadge label="Active" variant="success" size="sm" />
            </div>
            <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
              {campaign.brief.productDescription}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/campaigns/cyberflow/workspace"
              className="btn btn-primary"
            >
              <Briefcase size={16} />
              <span>Workspace</span>
            </Link>
            <Link
              href="/deals/DEAL-2026-X89B"
              className="btn btn-secondary"
            >
              <FileText size={16} />
              <span>Deal Room</span>
            </Link>
          </div>
        </div>

        {/* Campaign Deliverables & Timeline Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-b border-slate-100 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="p-5 flex items-start gap-4 bg-white">
            <div className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
               <Target size={18} />
            </div>
            <div>
              <div className="font-semibold text-slate-900 mb-1">Primary Objective</div>
              <div className="text-sm text-slate-600">{campaign.brief.campaignObjective}</div>
            </div>
          </div>

          <div className="p-5 flex items-start gap-4 bg-white">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
               <Calendar size={18} />
            </div>
            <div>
              <div className="font-semibold text-slate-900 mb-1">Target Deadline</div>
              <div className="text-sm text-slate-600">{campaign.brief.targetDeadline}</div>
            </div>
          </div>

          <div className="p-5 flex items-start gap-4 bg-white">
            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
               <DollarSign size={18} />
            </div>
            <div>
              <div className="font-semibold text-slate-900 mb-1">Deliverable Budget</div>
              <div className="text-sm text-slate-600">{formatCurrency(campaign.brief.budgetPerCreator)} / Creator</div>
            </div>
          </div>
        </div>

        {/* Contracted Creator Row */}
        {matchedCreator && (
          <div className="p-5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={matchedCreator.avatar}
                alt={matchedCreator.name}
                className="w-12 h-12 rounded-full object-cover border border-slate-200"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-slate-900 text-base">{matchedCreator.name}</span>
                  <StatusBadge state={matchedCreator.state} size="sm" />
                </div>
                <div className="text-sm text-slate-500">
                  Deliverable: <span className="text-slate-700 font-medium">{campaign.brief.deliverablesRequired[0]}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right hidden sm:block">
                <span className="text-slate-500 block text-xs uppercase tracking-wider font-semibold mb-1">Deal Status</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1.5 justify-end"><CheckCircle2 size={14} /> Dual-Confirmed</span>
              </div>
              <Link
                href="/deals/DEAL-2026-X89B"
                className="btn btn-secondary bg-slate-50"
              >
                <span>View Agreement</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
