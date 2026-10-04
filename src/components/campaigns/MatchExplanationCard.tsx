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
  TrendingUp,
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

  return (
    <div className={`saas-card overflow-hidden ${isHighMatch ? 'border-primary-200 ring-1 ring-primary-100' : ''}`}>
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={creator.avatar}
            alt={creator.name}
            className="w-12 h-12 rounded-full object-cover border border-slate-200"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-slate-900">{creator.name}</h3>
              <StatusBadge state={creator.state} size="sm" />
            </div>
            <p className="text-sm text-slate-500 line-clamp-1">{creator.headline}</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-bold">
            <Sparkles size={14} />
            <span>{match.matchScore}% Match</span>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5 bg-slate-50/50">
        <div>
          <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2 mb-3">
            <CheckCircle2 size={16} className="text-emerald-500" />
            Why this creator fits
          </h4>
          <ul className="space-y-2">
            {match.matchReasons.map((reason, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="text-emerald-500 font-bold">•</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {match.risksOrCaveats && match.risksOrCaveats.length > 0 && (
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
            <h4 className="text-sm font-semibold text-amber-800 flex items-center gap-2 mb-2">
              <AlertTriangle size={16} className="text-amber-500" />
              Considerations
            </h4>
            <ul className="space-y-1">
              {match.risksOrCaveats.map((risk, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-amber-700">
                  <span className="font-bold">•</span>
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={() => onSelectCreator(creator)}
          className="btn btn-secondary w-full justify-center mt-2 bg-white"
        >
          Select & Propose Deal <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
