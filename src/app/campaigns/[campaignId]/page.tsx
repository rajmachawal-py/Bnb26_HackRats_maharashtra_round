'use client';
import { useState } from 'react';
import { DEMO_CAMPAIGN, DEMO_METRICS_SNAPSHOT } from '@/lib/seedData';
import { notFound } from 'next/navigation';
import { GlassCard } from '@/components/common/GlassCard';
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
    return <div className="text-white text-center mt-20">Campaign not found</div>;
  }

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: 'brief', label: 'Campaign Brief', icon: FileText },
    { id: 'deliverables', label: 'Script & Deliverables', icon: Video },
    { id: 'review', label: 'Brand Review', icon: PlaySquare },
    { id: 'analytics', label: 'Live Analytics', icon: BarChart2 },
  ];

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-500 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">{campaign.brief.campaignTitle}</h1>
        <p className="text-gray-400">Workspace Hub • {campaign.brief.productName}</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-8 bg-white/5 p-1 rounded-xl w-fit">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all \${
                isActive 
                  ? 'bg-purple-600/20 text-purple-300 shadow-sm' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
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
          <GlassCard className="p-8 space-y-6">
            <h2 className="text-2xl font-bold text-white">Campaign Brief Overview</h2>
            <div className="grid grid-cols-2 gap-8 text-gray-300">
              <div>
                <p className="text-sm text-gray-500 mb-1">Objective</p>
                <p className="text-lg text-white">{campaign.brief.campaignObjective}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Target Audience</p>
                <p className="text-white">{campaign.brief.targetAudience}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500 mb-1">Mandatory Talking Points</p>
                <ul className="list-disc pl-5 space-y-1">
                  {campaign.brief.mandatoryTalkingPoints.map((tp, i) => (
                    <li key={i}>{tp}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Discount Code</p>
                <p className="font-mono text-cyan-400 font-bold bg-cyan-900/30 px-3 py-1 rounded w-fit">{campaign.brief.discountCode}</p>
              </div>
            </div>
          </GlassCard>
        )}

        {activeTab === 'deliverables' && (
          <div className="space-y-6">
             <div className="mb-4">
               <h2 className="text-xl font-bold text-white mb-1">AI Script Compliance Auditor</h2>
               <p className="text-sm text-gray-400">Validate your script against the brief's mandatory talking points before recording.</p>
             </div>
             <ComplianceChecker />
          </div>
        )}

        {activeTab === 'review' && (
          <GlassCard className="text-center py-20">
            <PlaySquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Video Review Pending</h3>
            <p className="text-gray-400">Waiting for creator to upload the finalized video for brand approval.</p>
          </GlassCard>
        )}

        {activeTab === 'analytics' && (
          <AnalyticsCards metrics={DEMO_METRICS_SNAPSHOT} />
        )}
      </div>
    </div>
  );
}
