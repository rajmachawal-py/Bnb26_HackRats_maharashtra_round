'use client';

import React, { useState } from 'react';
import { CampaignBrief, DeliverableFormat } from '@/types/campaign';
import { DEMO_CAMPAIGN } from '@/lib/seedData';
import { Sparkles, Building2, Target, DollarSign, FileCheck, Layers } from 'lucide-react';

interface BriefFormProps {
  onSubmit: (brief: CampaignBrief) => void;
  isLoading: boolean;
}

const AVAILABLE_DELIVERABLES: DeliverableFormat[] = [
  'Dedicated YouTube Video (60-90s)',
  'Instagram Reel (30-60s)',
  'Twitch Stream Integration (2h)',
  'Multi-Platform Bundle (YouTube + Reel)',
];

const AVAILABLE_NICHES = [
  'Developer Tools',
  'AI & Machine Learning',
  'Productivity Software',
  'Consumer Tech',
  'Sustainable Fashion',
  'Esports',
];

export function BriefForm({ onSubmit, isLoading }: BriefFormProps) {
  const [brief, setBrief] = useState<CampaignBrief>({
    brandName: '',
    brandWebsite: '',
    brandIndustry: 'Developer Tooling & Cloud Infra',
    brandLogo: '🚀',
    productName: '',
    productDescription: '',
    campaignTitle: '',
    campaignObjective: 'Developer Signups',
    targetAudience: '',
    targetGeographies: ['United States', 'Europe', 'India'],
    targetNiches: ['Developer Tools', 'AI & Machine Learning'],
    totalBudget: 5000,
    budgetPerCreator: 2500,
    deliverablesRequired: ['Dedicated YouTube Video (60-90s)'],
    toneAndStyle: 'Technical, crisp, authentic, and demo-driven.',
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
  });

  const handlePreFillDemo = () => {
    setBrief({ ...DEMO_CAMPAIGN.brief });
  };

  const handleTalkingPointChange = (index: number, value: string) => {
    const updated = [...brief.mandatoryTalkingPoints];
    updated[index] = value;
    setBrief({ ...brief, mandatoryTalkingPoints: updated });
  };

  const handleToggleDeliverable = (format: DeliverableFormat) => {
    if (brief.deliverablesRequired.includes(format)) {
      setBrief({
        ...brief,
        deliverablesRequired: brief.deliverablesRequired.filter((d) => d !== format),
      });
    } else {
      setBrief({
        ...brief,
        deliverablesRequired: [...brief.deliverablesRequired, format],
      });
    }
  };

  const handleToggleNiche = (niche: string) => {
    if (brief.targetNiches.includes(niche)) {
      setBrief({
        ...brief,
        targetNiches: brief.targetNiches.filter((n) => n !== niche),
      });
    } else {
      setBrief({
        ...brief,
        targetNiches: [...brief.targetNiches, niche],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(brief);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Top Banner with One-Click Pre-fill */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-950/70 via-slate-900/80 to-cyan-950/70 border border-violet-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Sparkles size={18} className="text-cyan-400 flex-shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-white block">Hackathon Demo Shortcut</span>
            <span className="text-slate-400">
              Pre-fill with CyberFlow AI campaign data for immediate evaluation.
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={handlePreFillDemo}
          className="btn btn-primary btn-sm flex-shrink-0"
        >
          <Sparkles size={13} />
          <span>Pre-fill Demo Brief</span>
        </button>
      </div>

      {/* SECTION 1: Brand & Product Profile */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col gap-4">
        <div className="flex items-center gap-2 text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider">
          <Building2 size={15} />
          <span>1. Brand & Product Identity</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300">Brand / Company Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. TechBrand Inc."
              value={brief.brandName}
              onChange={(e) => setBrief({ ...brief, brandName: e.target.value })}
              className="input-field text-xs"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300">Product or Service Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. CyberFlow AI"
              value={brief.productName}
              onChange={(e) => setBrief({ ...brief, productName: e.target.value })}
              className="input-field text-xs"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-300">Product Overview *</label>
          <textarea
            required
            rows={2}
            placeholder="Describe what the product does and why engineers/consumers love it..."
            value={brief.productDescription}
            onChange={(e) => setBrief({ ...brief, productDescription: e.target.value })}
            className="textarea-field text-xs"
          />
        </div>
      </div>

      {/* SECTION 2: Campaign Objective & Niches */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col gap-4">
        <div className="flex items-center gap-2 text-xs font-bold font-mono text-violet-400 uppercase tracking-wider">
          <Target size={15} />
          <span>2. Campaign Objective & Target Niches</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300">Campaign Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. CyberFlow Pro Launch Q4"
              value={brief.campaignTitle}
              onChange={(e) => setBrief({ ...brief, campaignTitle: e.target.value })}
              className="input-field text-xs"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300">Primary Objective</label>
            <select
              value={brief.campaignObjective}
              onChange={(e) =>
                setBrief({
                  ...brief,
                  campaignObjective: e.target.value as CampaignBrief['campaignObjective'],
                })
              }
              className="input-field text-xs bg-slate-950"
            >
              <option value="Developer Signups">Developer Signups & Trials</option>
              <option value="Product Launch">Product Launch & Awareness</option>
              <option value="Brand Awareness">Brand Awareness & Credibility</option>
              <option value="Conversions & Sales">Direct Conversions & Sales</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-300">Target Audience Description *</label>
          <input
            type="text"
            required
            placeholder="e.g. Senior Software Engineers, Full-Stack Developers, AI Practitioners"
            value={brief.targetAudience}
            onChange={(e) => setBrief({ ...brief, targetAudience: e.target.value })}
            className="input-field text-xs"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-300">Target Content Niches</label>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_NICHES.map((n) => {
              const isSelected = brief.targetNiches.includes(n);
              return (
                <button
                  type="button"
                  key={n}
                  onClick={() => handleToggleNiche(n)}
                  className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
                    isSelected
                      ? 'bg-violet-600/30 border border-violet-500/50 text-white font-semibold'
                      : 'bg-slate-950/60 border border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {n}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* SECTION 3: Commercials & Deliverables */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col gap-4">
        <div className="flex items-center gap-2 text-xs font-bold font-mono text-emerald-400 uppercase tracking-wider">
          <DollarSign size={15} />
          <span>3. Commercials & Deliverable Specs</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300">Budget Per Creator ($)</label>
            <input
              type="number"
              min={500}
              step={100}
              value={brief.budgetPerCreator}
              onChange={(e) =>
                setBrief({ ...brief, budgetPerCreator: parseFloat(e.target.value) || 0 })
              }
              className="input-field text-xs font-mono font-bold text-emerald-400"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300">Target Publishing Deadline</label>
            <input
              type="date"
              value={brief.targetDeadline}
              onChange={(e) => setBrief({ ...brief, targetDeadline: e.target.value })}
              className="input-field text-xs font-mono"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300">Max Free Revisions</label>
            <input
              type="number"
              min={1}
              max={5}
              value={brief.maxRevisionRounds}
              onChange={(e) =>
                setBrief({ ...brief, maxRevisionRounds: parseInt(e.target.value, 10) || 1 })
              }
              className="input-field text-xs font-mono"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-slate-300">Required Deliverable Formats</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {AVAILABLE_DELIVERABLES.map((d) => {
              const isChecked = brief.deliverablesRequired.includes(d);
              return (
                <button
                  type="button"
                  key={d}
                  onClick={() => handleToggleDeliverable(d)}
                  className={`p-2.5 rounded-xl text-xs text-left border flex items-center justify-between transition-all ${
                    isChecked
                      ? 'bg-cyan-500/20 border-cyan-500/50 text-white font-semibold'
                      : 'bg-slate-950/60 border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{d}</span>
                  {isChecked && <span className="text-cyan-400 font-bold">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* SECTION 4: Creative Guidelines & Compliance Rules */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col gap-4">
        <div className="flex items-center gap-2 text-xs font-bold font-mono text-amber-400 uppercase tracking-wider">
          <FileCheck size={15} />
          <span>4. Creative Guidelines & Mandatory Compliance Rules</span>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-slate-300">
            Mandatory Talking Points (Checked by AI Auditor)
          </label>
          {brief.mandatoryTalkingPoints.map((tp, idx) => (
            <input
              key={idx}
              type="text"
              value={tp}
              onChange={(e) => handleTalkingPointChange(idx, e.target.value)}
              className="input-field text-xs"
              placeholder={`Talking point #${idx + 1}`}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300">Mandatory Call to Action (CTA)</label>
            <input
              type="text"
              required
              value={brief.mandatoryCTA}
              onChange={(e) => setBrief({ ...brief, mandatoryCTA: e.target.value })}
              className="input-field text-xs"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300">Promo / Discount Code</label>
            <input
              type="text"
              required
              value={brief.discountCode}
              onChange={(e) => setBrief({ ...brief, discountCode: e.target.value })}
              className="input-field text-xs font-mono font-bold text-cyan-300"
            />
          </div>
        </div>
      </div>

      {/* Submit CTA */}
      <button
        type="submit"
        disabled={isLoading}
        className="btn btn-primary py-3.5 text-sm font-bold flex items-center justify-center gap-2 shadow-xl shadow-violet-600/30"
      >
        <Sparkles size={16} className={isLoading ? 'animate-spin' : ''} />
        <span>{isLoading ? 'Running Gemini AI Creator Matching...' : 'Run AI Creator Matching'}</span>
      </button>
    </form>
  );
}
