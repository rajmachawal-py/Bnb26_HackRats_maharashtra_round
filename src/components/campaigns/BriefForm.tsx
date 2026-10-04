'use client';

import React, { useState } from 'react';
import { CampaignBrief, DeliverableFormat } from '@/types/campaign';
import { Sparkles, Building2, Target, DollarSign, FileCheck, Info } from 'lucide-react';

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
  const [ideaInput, setIdeaInput] = useState('');
  const [isGeneratingBrief, setIsGeneratingBrief] = useState(false);
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

  const handleAIGenerate = async () => {
    if (!ideaInput.trim()) return;
    setIsGeneratingBrief(true);
    try {
      const res = await fetch('/api/ai/generate-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea: ideaInput }),
      });
      if (res.ok) {
        const data = await res.json();
        setBrief({ ...brief, ...data.brief });
        setIdeaInput('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingBrief(false);
    }
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
      {/* AI Autofill Banner */}
      <div className="saas-card p-5 bg-gradient-to-br from-primary-50 to-white border-primary-100 flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center shrink-0">
            <Sparkles size={16} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">AI Campaign Autofill</h3>
            <p className="text-sm text-slate-500 mt-1">
              Describe your idea in one sentence and let AI generate the entire structured brief.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={ideaInput}
            onChange={(e) => setIdeaInput(e.target.value)}
            placeholder="e.g. A campaign for a new fitness app targeting Indian college students"
            className="input-field flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAIGenerate();
              }
            }}
          />
          <button
            type="button"
            onClick={handleAIGenerate}
            disabled={isGeneratingBrief || !ideaInput.trim()}
            className="btn btn-secondary shrink-0"
          >
            {isGeneratingBrief ? 'Generating...' : 'Auto-Fill'}
          </button>
        </div>
      </div>

      <div className="saas-card overflow-hidden">
        {/* SECTION 1 */}
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
            <Building2 size={16} className="text-slate-400" />
            1. Brand & Product Identity
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Brand / Company Name *</label>
              <input
                type="text"
                required
                value={brief.brandName}
                onChange={(e) => setBrief({ ...brief, brandName: e.target.value })}
                className="input-field"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Product Name *</label>
              <input
                type="text"
                required
                value={brief.productName}
                onChange={(e) => setBrief({ ...brief, productName: e.target.value })}
                className="input-field"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Product Overview *</label>
            <textarea
              required
              rows={3}
              value={brief.productDescription}
              onChange={(e) => setBrief({ ...brief, productDescription: e.target.value })}
              className="textarea-field"
            />
          </div>
        </div>

        {/* SECTION 2 */}
        <div className="p-6 border-b border-slate-200 bg-slate-50/50">
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
            <Target size={16} className="text-slate-400" />
            2. Campaign Objective
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Campaign Title *</label>
              <input
                type="text"
                required
                value={brief.campaignTitle}
                onChange={(e) => setBrief({ ...brief, campaignTitle: e.target.value })}
                className="input-field"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Primary Objective</label>
              <select
                value={brief.campaignObjective}
                onChange={(e) => setBrief({ ...brief, campaignObjective: e.target.value as any })}
                className="select-field"
              >
                <option value="Developer Signups">Developer Signups & Trials</option>
                <option value="Product Launch">Product Launch & Awareness</option>
                <option value="Brand Awareness">Brand Awareness & Credibility</option>
                <option value="Conversions & Sales">Direct Conversions & Sales</option>
              </select>
            </div>
          </div>
          <div className="space-y-1.5 mb-5">
            <label className="text-sm font-medium text-slate-700">Target Audience *</label>
            <input
              type="text"
              required
              value={brief.targetAudience}
              onChange={(e) => setBrief({ ...brief, targetAudience: e.target.value })}
              className="input-field"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Target Niches</label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_NICHES.map((n) => {
                const isSelected = brief.targetNiches.includes(n);
                return (
                  <button
                    type="button"
                    key={n}
                    onClick={() => handleToggleNiche(n)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      isSelected
                        ? 'bg-primary-600 border-primary-600 text-white font-medium'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {n}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* SECTION 3 */}
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
            <DollarSign size={16} className="text-slate-400" />
            3. Commercials
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Budget Per Creator ($)</label>
              <input
                type="number"
                min={500}
                step={100}
                value={brief.budgetPerCreator}
                onChange={(e) => setBrief({ ...brief, budgetPerCreator: parseFloat(e.target.value) || 0 })}
                className="input-field font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Deadline</label>
              <input
                type="date"
                value={brief.targetDeadline}
                onChange={(e) => setBrief({ ...brief, targetDeadline: e.target.value })}
                className="input-field"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Max Revisions</label>
              <input
                type="number"
                min={1}
                max={5}
                value={brief.maxRevisionRounds}
                onChange={(e) => setBrief({ ...brief, maxRevisionRounds: parseInt(e.target.value, 10) || 1 })}
                className="input-field font-mono"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Deliverables</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {AVAILABLE_DELIVERABLES.map((d) => {
                const isChecked = brief.deliverablesRequired.includes(d);
                return (
                  <button
                    type="button"
                    key={d}
                    onClick={() => handleToggleDeliverable(d)}
                    className={`p-3 rounded-lg text-sm text-left border flex items-center justify-between transition-all ${
                      isChecked
                        ? 'bg-primary-50 border-primary-200 text-primary-900 font-medium'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{d}</span>
                    {isChecked && <div className="w-4 h-4 rounded-full bg-primary-600 flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-white"></div></div>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* SECTION 4 */}
        <div className="p-6 bg-slate-50/50">
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
            <FileCheck size={16} className="text-slate-400" />
            4. Compliance
          </h3>
          <div className="space-y-3 mb-6">
            <label className="text-sm font-medium text-slate-700">
              Mandatory Talking Points (Checked by AI Auditor)
            </label>
            {brief.mandatoryTalkingPoints.map((tp, idx) => (
              <input
                key={idx}
                type="text"
                value={tp}
                onChange={(e) => handleTalkingPointChange(idx, e.target.value)}
                className="input-field"
                placeholder={`Talking point #${idx + 1}`}
              />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Mandatory CTA</label>
              <input
                type="text"
                required
                value={brief.mandatoryCTA}
                onChange={(e) => setBrief({ ...brief, mandatoryCTA: e.target.value })}
                className="input-field"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Promo Code</label>
              <input
                type="text"
                required
                value={brief.discountCode}
                onChange={(e) => setBrief({ ...brief, discountCode: e.target.value })}
                className="input-field font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary btn-lg min-w-[200px]"
        >
          {isLoading ? 'Processing...' : 'Run AI Creator Matching'}
        </button>
      </div>
    </form>
  );
}
