'use client';
import { useState } from 'react';
import { DEMO_CAMPAIGN, DEMO_METRICS_SNAPSHOT } from '@/lib/seedData';
import { notFound } from 'next/navigation';
import { ComplianceChecker } from '@/components/workspace/ComplianceChecker';
import { AnalyticsCards } from '@/components/workspace/AnalyticsCards';
import { FileText, Video, PlaySquare, BarChart2 } from 'lucide-react';
import React from 'react';

type Tab = 'brief' | 'deliverables' | 'review' | 'analytics';

export default function CampaignWorkspacePage({ params }: { params: Promise<{ campaignId: string }> }) {
  // Normally unwrap params with React.use() in client components for Next.js 15
  const resolvedParams = React.use(params);
  const campaignId = resolvedParams.campaignId;
  const [activeTab, setActiveTab] = useState<Tab>('deliverables');

  // Fetch campaign
  const campaign = campaignId === DEMO_CAMPAIGN.id ? DEMO_CAMPAIGN : null;
  
  if (!campaign) {
    return <div className="text-slate-900 text-center mt-20 font-medium">Campaign not found</div>;
  }

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: 'brief', label: 'Campaign Brief', icon: FileText },
    { id: 'deliverables', label: 'Script & Deliverables', icon: Video },
    { id: 'review', label: 'Brand Review', icon: PlaySquare },
    { id: 'analytics', label: 'Live Analytics', icon: BarChart2 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">{campaign.brief.campaignTitle}</h1>
        <p className="text-sm text-slate-500">Workspace Hub • {campaign.brief.productName}</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 mb-8 bg-slate-100 p-1 rounded-xl w-fit">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive 
                  ? 'bg-white text-primary-700 shadow-sm border border-slate-200' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="min-h-[500px]">
        {activeTab === 'brief' && (
          <div className="saas-card p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Campaign Brief Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-700">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Objective</p>
                <p className="text-sm font-medium text-slate-900">{campaign.brief.campaignObjective}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Target Audience</p>
                <p className="text-sm font-medium text-slate-900">{campaign.brief.targetAudience}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Mandatory Talking Points</p>
                <ul className="space-y-2">
                  {campaign.brief.mandatoryTalkingPoints.map((tp, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="text-primary-500 font-bold">•</span>
                      {tp}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Discount Code</p>
                <p className="font-mono text-sm font-bold text-primary-700 bg-primary-50 px-3 py-1 rounded w-fit">{campaign.brief.discountCode}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'deliverables' && (
          <div className="space-y-6">
             <div className="saas-card p-6 bg-slate-50/50 mb-4">
               <h2 className="text-lg font-bold text-slate-900 mb-1">AI Script Compliance Auditor</h2>
               <p className="text-sm text-slate-500">Validate your script against the brief's mandatory talking points before recording.</p>
             </div>
             <ComplianceChecker />
          </div>
        )}

        {activeTab === 'review' && (
          <div className="saas-card p-16 flex flex-col items-center text-center justify-center min-h-[400px]">
            <PlaySquare className="w-12 h-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Video Review Pending</h3>
            <p className="text-sm text-slate-500 max-w-sm">Waiting for creator to upload the finalized video for brand approval.</p>
          </div>
        )}

        {activeTab === 'analytics' && (
          <AnalyticsCards metrics={DEMO_METRICS_SNAPSHOT} />
        )}
      </div>
    </div>
  );
}
