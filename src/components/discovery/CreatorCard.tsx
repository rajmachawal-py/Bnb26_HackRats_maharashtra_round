'use client';

import React from 'react';
import { Creator } from '@/types/creator';
import { StatusBadge } from '@/components/common/StatusBadge';
import { formatCompactNumber, formatCurrency } from '@/lib/utils';
import { 
  CheckCircle2, 
  MapPin, 
  ExternalLink 
} from 'lucide-react';

interface CreatorCardProps {
  creator: Creator;
  onOpenIntelligence: (creator: Creator) => void;
  onSendOffer?: (creator: Creator) => void;
}

export function CreatorCard({ creator, onOpenIntelligence, onSendOffer }: CreatorCardProps) {
  const isUnclaimed = creator.state === 'unclaimed';
  
  // Calculate total followers across platforms
  const totalFollowers = Object.values(creator.platforms).reduce((acc, platform: any) => {
    return acc + (platform?.followers || platform?.subscribers || 0);
  }, 0);

  return (
    <div className="saas-card p-5 flex flex-col h-full hover:border-primary-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={creator.avatar}
              alt={creator.name}
              className="w-14 h-14 rounded-full object-cover border border-slate-200"
            />
            {!isUnclaimed && (
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
            )}
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              {creator.name}
            </h3>
            <p className="text-sm text-slate-500">@{creator.slug}</p>
          </div>
        </div>
        <StatusBadge state={creator.state} size="sm" />
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {creator.niche.slice(0, 3).map((n) => (
          <span
            key={n}
            className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 font-medium"
          >
            {n}
          </span>
        ))}
        {creator.niche.length > 3 && (
          <span className="text-xs px-2.5 py-1 rounded-md bg-slate-50 text-slate-500">
            +{creator.niche.length - 3}
          </span>
        )
        }
      </div>

      <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-100 mb-4">
        <div>
          <div className="text-xs text-slate-500 mb-1 font-medium uppercase tracking-wider">Followers</div>
          <div className="text-sm font-semibold text-slate-900">
            {formatCompactNumber(totalFollowers)}
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-500 mb-1 font-medium uppercase tracking-wider">Engagement</div>
          <div className="text-sm font-semibold text-slate-900">
            {creator.metrics.avgEngagement}%
          </div>
        </div>
      </div>
      
      {creator.matchScore && (
         <div className="flex items-center justify-between bg-primary-50 px-3 py-2 rounded-lg mb-5">
           <span className="text-xs font-semibold text-primary-700">AI Match</span>
           <span className="text-sm font-bold text-primary-700">{creator.matchScore}%</span>
         </div>
      )}

      <div className="mt-auto pt-4 flex gap-3">
        <button
          onClick={() => onOpenIntelligence(creator)}
          className="btn btn-secondary flex-1"
        >
          View Profile
        </button>
        
        <button
          onClick={() => onSendOffer ? onSendOffer(creator) : onOpenIntelligence(creator)}
          className="btn btn-primary flex-1"
        >
          {isUnclaimed ? 'Contact' : 'Invite'}
        </button>
      </div>
    </div>
  );
}
