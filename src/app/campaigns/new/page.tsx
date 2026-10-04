'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CampaignBrief } from '@/types/campaign';
import { Creator } from '@/types/creator';
import { CreatorMatchExplanation } from '@/lib/ai/gemini';
import { SEED_CREATORS, DEMO_CAMPAIGN } from '@/lib/seedData';
import { BriefForm } from '@/components/campaigns/BriefForm';
import { MatchExplanationCard } from '@/components/campaigns/MatchExplanationCard';
import { Sparkles, AlertCircle, ArrowLeft, Bot, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function NewCampaignPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [matchedExplanations, setMatchedExplanations] = useState<CreatorMatchExplanation[] | null>(null);
  const [matchedCreators, setMatchedCreators] = useState<Creator[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleRunMatching = async (brief: CampaignBrief) => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/ai/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brief }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate AI matches (HTTP ${response.status})`);
      }

      const data = await response.json();
      setMatchedExplanations(data.matches);
      setMatchedCreators(data.creators || SEED_CREATORS);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to run AI matching. Falling back to local scoring.');
      setMatchedExplanations(
        DEMO_CAMPAIGN.matchedCreators.map((m) => ({
          creatorId: m.creatorId,
          matchScore: m.matchScore,
          matchReasons: m.matchReasons,
          evidence: m.evidence,
          risksOrCaveats: m.risksOrCaveats,
          confidence: 'high' as const,
        }))
      );
      setMatchedCreators(SEED_CREATORS);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectCreator = (creator: Creator) => {
    router.push(`/deals/DEAL-2026-X89B?creatorId=${creator.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-2 pb-6 border-b border-slate-200">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 mb-2 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">
          Campaign Builder
        </h1>
        <p className="text-slate-500">
          Create an unambiguous commercial brief with deliverables, budget caps, and mandatory talking points.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Left Column: Brief Input Form */}
        <div className="xl:col-span-7">
          <BriefForm onSubmit={handleRunMatching} isLoading={isLoading} />
        </div>

        {/* Right Column: AI Matching Results */}
        <div className="xl:col-span-5 sticky top-24 flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2 text-slate-900 font-semibold">
              <Sparkles size={18} className="text-primary-500" />
              <h2>AI Match Recommendations</h2>
            </div>
            {matchedExplanations && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                {matchedExplanations.length} evaluated
              </span>
            )}
          </div>

          {errorMsg && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3 text-sm text-red-800">
              <AlertCircle size={18} className="flex-shrink-0 text-red-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          {isLoading && (
            <div className="saas-card p-12 text-center flex flex-col items-center gap-4">
              <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Evaluating Creators...</h3>
                <p className="text-sm text-slate-500">
                  Analyzing audience fit, content tone, and historical reliability signals.
                </p>
              </div>
            </div>
          )}

          {!isLoading && !matchedExplanations && (
            <div className="saas-card p-12 text-center flex flex-col items-center gap-4">
              <Bot className="w-10 h-10 text-slate-300" />
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">No matches generated yet</h3>
                <p className="text-sm text-slate-500 max-w-sm">
                  Fill in the campaign brief and click &quot;Run AI Creator Matching&quot; to see recommendations.
                </p>
              </div>
            </div>
          )}

          {!isLoading && matchedExplanations && (
            <div className="flex flex-col gap-6">
              {matchedExplanations.map((match) => {
                const creator = matchedCreators.find((c) => c.id === match.creatorId);
                if (!creator) return null;
                return (
                  <MatchExplanationCard
                    key={match.creatorId}
                    match={match}
                    creator={creator}
                    onSelectCreator={handleSelectCreator}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
