'use client';

import React from 'react';
import { Creator } from '@/types/creator';
import { CreatorMatchExplanation } from '@/lib/ai/gemini';
import { StatusBadge } from '@/components/common/StatusBadge';
import { formatCurrency, formatCompactNumber } from '@/lib/utils';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight, 
  Star, 
  TrendingUp,
  FileCheck
} from 'lucide-react';

interface MatchExplanationCardProps {
  match: CreatorMatchExplanation;
  creator: Creator;
  onSelectCreator: (creator: Creator) => void;
}

export function MatchExplanationCard({
  match,
  creator,
  onSelectCreator,
}: MatchExplanationCardProps) {
  const isHighMatch = match.matchScore >= 90;
  const isUnclaimed = creator.state === 'unclaimed';

  return (
    <div
      className={`glass-card p-6 border transition-all duration-300 flex flex-col justify-between ${
        isHighMatch
          ? 'border-violet-500/60 shadow-xl shadow-violet-950/40 bg-slate-900/80'
          : 'border-white/10 bg-slate-900/60'
      }`}
    >
      <div>
        {/* Top Header: Score Badge & Creator Info */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10 mb-4">
          <div className="flex items-center gap-3.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={creator.avatar}
              alt={creator.name}
              className={`w-14 h-14 rounded-2xl object-cover border-2 ${
                isUnclaimed ? 'border-amber-400' : 'border-violet-400'
              }`}
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">{creator.name}</h3>
                <StatusBadge state={creator.state} size="sm" />
              </div>
              <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                {creator.headline}
              </p>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1 font-mono">
                <span>Rate: {formatCurrency(creator.rates.dedicatedVideo)}</span>
                <span>•</span>
                <span className="text-cyan-400 font-bold">{creator.metrics.avgEngagement}% Engagement</span>
              </div>
            </div>
          </div>

          {/* AI Match Score Radar Pill */}
          <div className="text-right flex flex-col items-end">
            <div
              className={`px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1 ${
                isHighMatch
                  ? 'bg-violet-600/30 text-violet-200 border border-violet-500/60 shadow-lg shadow-violet-600/30'
                  : 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/40'
              }`}
            >
              <Sparkles size={13} className="text-cyan-400" />
              <span>{match.matchScore}% MATCH</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono mt-1">
              Gemini Flash AI
            </span>
          </div>
        </div>

        {/* Explainability Section: Why this creator fits */}
        <div className="mb-4">
          <div className="text-xs font-bold text-white font-mono uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-emerald-400" />
            <span>Why this creator satisfies the brief:</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {match.matchReasons.map((reason, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-400 text-xs mt-0.5">•</span>
                <span className="leading-relaxed">{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Supporting Evidence */}
        {match.evidence && match.evidence.length > 0 && (
          <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 mb-4">
            <div className="text-[11px] font-bold text-cyan-300 font-mono uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <TrendingUp size={12} />
              <span>Supporting Verifiable Evidence:</span>
            </div>
            <ul className="space-y-1 text-xs text-slate-400">
              {match.evidence.map((ev, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-cyan-400">✓</span>
                  <span>{ev}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Human Review Caveats / Needs Confirmation */}
        {match.risksOrCaveats && match.risksOrCaveats.length > 0 && (
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-4">
            <div className="text-[11px] font-bold text-amber-300 font-mono uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <AlertTriangle size={12} />
              <span>Needs Human Confirmation:</span>
            </div>
            <ul className="space-y-1 text-xs text-amber-200/90">
              {match.risksOrCaveats.map((risk, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-amber-400">!</span>
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Select CTA */}
      <button
        onClick={() => onSelectCreator(creator)}
        className="btn btn-primary w-full py-2.5 text-xs font-semibold flex items-center justify-center gap-2 mt-2"
      >
        <span>Select & Propose Deal Offer</span>
        <ArrowRight size={14} />
      </button>
    </div>
  );
}
