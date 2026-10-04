'use client';

import React from 'react';
import { Creator } from '@/types/creator';
import { StatusBadge } from '@/components/common/StatusBadge';
import { PlatformIcon } from '@/components/common/PlatformIcon';
import { formatCompactNumber, formatCurrency } from '@/lib/utils';
import { 
  MapPin, 
  Star, 
  ShieldAlert, 
  Sparkles, 
  ArrowUpRight 
} from 'lucide-react';

interface CreatorCardProps {
  creator: Creator;
  onOpenIntelligence: (creator: Creator) => void;
  onSendOffer?: (creator: Creator) => void;
}

export function CreatorCard({ creator, onOpenIntelligence, onSendOffer }: CreatorCardProps) {
  const isUnclaimed = creator.state === 'unclaimed';

  return (
    <div
      className={`glass-card flex flex-col justify-between transition-all duration-300 group ${
        isUnclaimed
          ? 'hover:border-cyan-500/50 hover:shadow-cyan-950/30'
          : 'hover:border-violet-500/50 hover:shadow-violet-950/40'
      }`}
    >
      <div>
        {/* Top Banner Image & Profile Status Tag */}
        <div className="relative h-28 w-full overflow-hidden bg-slate-950">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={creator.bannerImage}
            alt={creator.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Status Badge floating on banner */}
          <div className="absolute top-2.5 right-2.5">
            <StatusBadge state={creator.state} size="sm" />
          </div>

          {/* Location Badge */}
          <div className="absolute bottom-2 left-20 flex items-center gap-1 text-[11px] text-slate-300 font-medium">
            <MapPin size={11} className="text-slate-400" />
            <span>{creator.location}</span>
          </div>
        </div>

        {/* Avatar & Core Metadata */}
        <div className="px-5 pt-0 pb-4 relative">
          {/* Overlapping Avatar */}
          <div className="relative -mt-10 mb-3 flex items-end justify-between">
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={creator.avatar}
                alt={creator.name}
                className={`w-16 h-16 rounded-2xl object-cover border-2 shadow-xl ${
                  isUnclaimed ? 'border-cyan-400/80 shadow-cyan-950/40' : 'border-violet-400/80 shadow-violet-950/40'
                }`}
              />
              {creator.state === 'claimed' && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center text-white text-[10px]">
                  ✓
                </div>
              )}
            </div>

            {/* Performance Metric Pill */}
            <div className="text-right">
              <div className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Avg. Engagement</div>
              <div className="text-sm font-bold font-mono text-cyan-400 flex items-center justify-end gap-1">
                <span>{creator.metrics.avgEngagement}%</span>
                <span className="text-[10px] text-emerald-400">★</span>
              </div>
            </div>
          </div>

          {/* Creator Name & Headline */}
          <div className="mb-3">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white group-hover:text-violet-300 transition-colors">
                {creator.name}
              </h3>
              {creator.wikipediaSlug && (
                <span className="text-[10px] px-1.5 py-0.2 rounded font-mono bg-white/10 text-slate-300 border border-white/10">
                  Wikipedia Bio
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
              {creator.headline}
            </p>
          </div>

          {/* Connected Platform Stats Strip */}
          <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-950/60 border border-white/5 mb-3 text-xs">
            {creator.platforms.youtube && (
              <div className="flex items-center gap-2">
                <PlatformIcon platform="youtube" size={14} />
                <div>
                  <div className="font-bold text-white font-mono leading-none">
                    {formatCompactNumber(creator.platforms.youtube.subscribers)}
                  </div>
                  <div className="text-[10px] text-slate-400 leading-tight">subscribers</div>
                </div>
              </div>
            )}

            {creator.platforms.twitch && (
              <div className="flex items-center gap-2">
                <PlatformIcon platform="twitch" size={14} />
                <div>
                  <div className="font-bold text-white font-mono leading-none">
                    {formatCompactNumber(creator.platforms.twitch.followers)}
                  </div>
                  <div className="text-[10px] text-slate-400 leading-tight">twitch followers</div>
                </div>
              </div>
            )}

            {creator.platforms.github && (
              <div className="flex items-center gap-2">
                <PlatformIcon platform="github" size={14} />
                <div>
                  <div className="font-bold text-white font-mono leading-none">
                    {formatCompactNumber(creator.platforms.github.totalStars)}
                  </div>
                  <div className="text-[10px] text-slate-400 leading-tight">repo stars</div>
                </div>
              </div>
            )}

            {creator.platforms.instagram && (
              <div className="flex items-center gap-2">
                <PlatformIcon platform="instagram" size={14} />
                <div>
                  <div className="font-bold text-white font-mono leading-none">
                    {formatCompactNumber(creator.platforms.instagram.followers)}
                  </div>
                  <div className="text-[10px] text-slate-400 leading-tight">IG followers</div>
                </div>
              </div>
            )}
          </div>

          {/* Niche Pills */}
          <div className="flex flex-wrap gap-1 mb-3">
            {creator.niche.slice(0, 3).map((n) => (
              <span
                key={n}
                className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5"
              >
                {n}
              </span>
            ))}
            {creator.niche.length > 3 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/5 text-slate-400">
                +{creator.niche.length - 3}
              </span>
            )}
          </div>

          {/* Network Banner or Partner Highlights */}
          {isUnclaimed ? (
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-start gap-1.5 text-[11px] text-cyan-300">
              <Sparkles size={14} className="flex-shrink-0 mt-0.5 text-cyan-400" />
              <span>
                Verified Global Talent. Outreach routed securely via <strong>{creator.managerContact?.agency}</strong>.
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <Star size={12} />
                <span>{creator.metrics.onTimeDeliveryRate}% On-Time Delivery</span>
              </span>
              <span>{creator.metrics.totalCompletedDeals} past verified deals</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Commercial Rates & Action Buttons */}
      <div className="px-5 py-3 border-t border-white/10 bg-slate-950/40 flex items-center justify-between gap-2">
        <div>
          <div className="text-[10px] text-slate-400 uppercase font-mono">Dedicated Rate</div>
          <div className="text-sm font-bold font-mono text-white">
            {formatCurrency(creator.rates.dedicatedVideo)}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onOpenIntelligence(creator)}
            className="btn btn-secondary btn-sm"
          >
            <span>Intelligence</span>
            <ArrowUpRight size={13} />
          </button>
          
          <button
            onClick={() => onSendOffer ? onSendOffer(creator) : onOpenIntelligence(creator)}
            className={`btn btn-sm ${isUnclaimed ? 'btn-glass text-cyan-300 border-cyan-500/30' : 'btn-primary'}`}
          >
            {isUnclaimed ? (
              <span>Outreach</span>
            ) : (
              <>
                <Sparkles size={12} />
                <span>Send Offer</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
