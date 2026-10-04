'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CampaignBrief } from '@/types/campaign';
import { Creator } from '@/types/creator';
import { CreatorMatchExplanation } from '@/lib/ai/gemini';
import { SEED_CREATORS, DEMO_CAMPAIGN } from '@/lib/seedData';
import { BriefForm } from '@/components/campaigns/BriefForm';
import { MatchExplanationCard } from '@/components/campaigns/MatchExplanationCard';
import { Sparkles, Compass, AlertCircle, ArrowLeft, Bot } from 'lucide-react';
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
      // Fallback to demo campaign matches
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
    // Navigate to deal room for the live prototype deal
    router.push(`/deals/DEAL-2026-X89B?creatorId=${creator.id}`);
  };

  return (
    <div className="page-container py-8 max-w-6xl flex flex-col gap-8">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <div>
          <Link
            href="/campaigns"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white mb-2 transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Back to Campaigns</span>
          </Link>
          <h1 className="text-3xl font-display font-extrabold text-white flex items-center gap-3">
            <span>Structured Brief Builder & AI Matching</span>
            <span className="text-xs px-2.5 py-1 rounded-full font-mono bg-violet-600/20 text-violet-300 border border-violet-500/30">
              Stage 02
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Create an unambiguous commercial brief with deliverables, budget caps, and mandatory talking points. 
            Gemini Flash AI will rank creators and output transparent explainability rationale.
          </p>
        </div>
      </div>

      {/* Main Grid: Brief Builder on Left + AI Matches on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Brief Input Form (7 cols) */}
        <div className="lg:col-span-7">
          <BriefForm onSubmit={handleRunMatching} isLoading={isLoading} />
        </div>

        {/* Right Column: AI Matching Results & Explainability (5 cols) */}
        <div className="lg:col-span-5 sticky top-28 flex flex-col gap-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Bot size={16} className="text-violet-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                AI Match Recommendations
              </h2>
            </div>
            {matchedExplanations && (
              <span className="text-xs font-mono text-cyan-400">
                {matchedExplanations.length} evaluated
              </span>
            )}
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-center gap-2">
              <AlertCircle size={15} className="flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-violet-500/30 text-center flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
              <div className="text-sm font-bold text-white">Gemini Flash AI Evaluating...</div>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                Analyzing audience fit, content tone, deliverable rates, and historical reliability signals.
              </p>
            </div>
          )}

          {/* Initial Blank State before submission */}
          {!isLoading && !matchedExplanations && (
            <div className="p-8 rounded-2xl bg-slate-900/40 border border-white/10 text-center flex flex-col items-center gap-3">
              <Sparkles size={28} className="text-violet-400" />
              <h3 className="text-sm font-bold text-white">No active matches generated yet</h3>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                Fill in the campaign brief on the left and click &apos;Run AI Creator Matching&apos;, or click &apos;Pre-fill Demo Brief&apos; for a 1-click test.
              </p>
            </div>
          )}

          {/* Matched Creators Cards */}
          {!isLoading && matchedExplanations && (
            <div className="flex flex-col gap-4">
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
