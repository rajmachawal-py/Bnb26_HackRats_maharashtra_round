'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Creator } from '@/types/creator';
import { StatusBadge } from '@/components/common/StatusBadge';
import { formatCurrency, formatCompactNumber } from '@/lib/utils';
import { 
  X, 
  ExternalLink, 
  AlertTriangle, 
  Mail, 
  ShieldCheck, 
  Building2, 
  Sparkles, 
  Globe2, 
  BookOpen, 
  Calendar 
} from 'lucide-react';

interface IntelligenceDrawerProps {
  creator: Creator | null;
  isOpen: boolean;
  onClose: () => void;
}

interface WikipediaBioData {
  title: string;
  extract: string;
  description?: string;
  pageUrl: string;
  thumbnailUrl?: string;
  isRealApiData?: boolean;
}

export function IntelligenceDrawer({ creator, isOpen, onClose }: IntelligenceDrawerProps) {
  const [wikiData, setWikiData] = useState<WikipediaBioData | null>(null);
  const [isLoadingWiki, setIsLoadingWiki] = useState(false);
  const [claimRequested, setClaimRequested] = useState(false);

  useEffect(() => {
    if (!creator) return;
    setClaimRequested(false);

    if (creator.wikipediaSlug) {
      setIsLoadingWiki(true);
      fetch(`/api/integrations/wikipedia?slug=${encodeURIComponent(creator.wikipediaSlug)}`)
        .then((res) => res.json())
        .then((data) => {
          setWikiData(data);
          setIsLoadingWiki(false);
        })
        .catch(() => {
          setIsLoadingWiki(false);
        });
    } else {
      setWikiData(null);
    }
  }, [creator]);

  if (!isOpen || !creator) return null;

  const isUnclaimed = creator.state === 'unclaimed';

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Container */}
      <aside className="relative w-full max-w-xl bg-slate-950 border-l border-white/10 shadow-2xl h-full flex flex-col z-10 overflow-y-auto">
        {/* Drawer Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-5 bg-slate-950/90 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center gap-3">
            <StatusBadge state={creator.state} size="sm" />
            <span className="text-xs font-mono text-slate-400">
              ID: {creator.slug}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-6 flex flex-col gap-6">
          {/* Creator Profile Intro */}
          <div className="flex items-start gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={creator.avatar}
              alt={creator.name}
              className={`w-20 h-20 rounded-2xl object-cover border-2 ${
                isUnclaimed ? 'border-amber-400' : 'border-violet-500'
              }`}
            />
            <div>
              <h2 className="text-2xl font-display font-bold text-white leading-tight">
                {creator.name}
              </h2>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {creator.headline}
              </p>
              <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                <Globe2 size={13} className="text-violet-400" />
                <span>{creator.location}</span>
                <span>•</span>
                <span>{creator.languages.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* =================================================================
              UNCLAIMED CREATOR SPECIFIC VIEW (COLD-START BLUEPRINT)
              ================================================================= */}
          {isUnclaimed && (
            <div className="flex flex-col gap-4">
              {/* Amber Disclaimer Banner */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                <AlertTriangle size={20} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-amber-200 leading-relaxed">
                  <strong className="text-amber-300 block mb-1">
                    Unclaimed Public Discovery Profile
                  </strong>
                  This profile was generated from verified public data sources. Listing does not imply creator approval or platform endorsement. 
                  Commercial campaign offers are routed exclusively through their publicly listed talent management.
                </div>
              </div>

              {/* Wikipedia Real API Biography */}
              <div className="p-5 rounded-xl bg-slate-900/70 border border-white/10">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white">
                    <BookOpen size={15} className="text-cyan-400" />
                    <span>Wikipedia Biographical Extract</span>
                  </div>
                  {wikiData?.pageUrl && (
                    <a
                      href={wikiData.pageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono"
                    >
                      <span>MediaWiki REST</span>
                      <ExternalLink size={11} />
                    </a>
                  )}
                </div>

                {isLoadingWiki ? (
                  <div className="py-4 text-xs text-slate-400 flex items-center gap-2 font-mono">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span>Querying MediaWiki REST API...</span>
                  </div>
                ) : (
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {wikiData?.extract || creator.bio}
                  </p>
                )}
              </div>

              {/* Verified Talent Management Contact Card */}
              {creator.managerContact && (
                <div className="p-5 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/40 shadow-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Building2 size={16} className="text-amber-400" />
                      <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                        Talent Representation
                      </span>
                    </div>
                    <span className="badge badge-unclaimed text-[10px]">
                      Verified Agency Route
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-300 mb-4">
                    <div>
                      <span className="text-slate-500">Representative:</span>{' '}
                      <strong className="text-white">{creator.managerContact.name}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500">Agency:</span>{' '}
                      <strong className="text-amber-300">{creator.managerContact.agency}</strong>
                    </div>
                    <div className="flex items-center gap-2 pt-1 font-mono text-cyan-300">
                      <Mail size={13} />
                      <span>{creator.managerContact.email}</span>
                    </div>
                    {creator.managerContact.notes && (
                      <p className="text-[11px] text-slate-400 pt-1 italic">
                        &quot;{creator.managerContact.notes}&quot;
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link
                      href={`/campaigns/new?creatorId=${creator.id}&mode=manager`}
                      className="btn btn-primary w-full text-xs"
                    >
                      <Sparkles size={14} />
                      <span>Send Campaign Brief via Management</span>
                    </Link>

                    {/* Claim Profile Trigger */}
                    {!claimRequested ? (
                      <button
                        onClick={() => setClaimRequested(true)}
                        className="btn btn-ghost text-[11px] text-slate-400 hover:text-white"
                      >
                        Are you {creator.name}? Verify & Claim this Profile
                      </button>
                    ) : (
                      <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-300 text-center">
                        ✓ Verification request logged! In production, creator authenticates via YouTube OAuth to claim workspace.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =================================================================
              CLAIMED CREATOR SPECIFIC VIEW (FULL OS CAPABILITIES)
              ================================================================= */}
          {!isUnclaimed && (
            <div className="flex flex-col gap-5">
              {/* Verified Performance Passport Pills */}
              <div className="grid grid-cols-3 gap-2">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Engagement</div>
                  <div className="text-lg font-bold font-mono text-cyan-400">
                    {creator.metrics.avgEngagement}%
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">On-Time Delivery</div>
                  <div className="text-lg font-bold font-mono text-emerald-400">
                    {creator.metrics.onTimeDeliveryRate}%
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Verified Deals</div>
                  <div className="text-lg font-bold font-mono text-violet-400">
                    {creator.metrics.totalCompletedDeals}
                  </div>
                </div>
              </div>

              {/* Commercial Rate Card */}
              <div className="p-4 rounded-xl bg-slate-900/70 border border-white/10">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-3">
                  Commercial Rate Card
                </h4>
                <div className="flex flex-col gap-2 text-xs">
                  <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                    <span className="text-slate-300">Dedicated YouTube Video (60-90s)</span>
                    <span className="font-mono font-bold text-emerald-400">
                      {formatCurrency(creator.rates.dedicatedVideo)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                    <span className="text-slate-300">Instagram Reel / YouTube Short</span>
                    <span className="font-mono font-bold text-emerald-400">
                      {formatCurrency(creator.rates.reelOrShort)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-slate-300">Integrated Sponsored Mention</span>
                    <span className="font-mono font-bold text-emerald-400">
                      {formatCurrency(creator.rates.integratedMention)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Verified Past Brand Collaborations */}
              {creator.pastBrandCollaborations.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-900/70 border border-white/10">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-3 flex items-center justify-between">
                    <span>Verified Brand Collaborations</span>
                    <ShieldCheck size={14} className="text-emerald-400" />
                  </h4>
                  <div className="flex flex-col gap-2">
                    {creator.pastBrandCollaborations.map((collab) => (
                      <div
                        key={collab.dealId}
                        className="p-2.5 rounded-lg bg-slate-950/60 border border-white/5 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{collab.brandLogo}</span>
                          <div>
                            <div className="font-bold text-white">{collab.brandName}</div>
                            <div className="text-[10px] text-slate-400">{collab.campaignName}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-mono text-cyan-300 block">
                            {collab.dealId}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {collab.completedDate}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Audience Demographics */}
              <div className="p-4 rounded-xl bg-slate-900/70 border border-white/10">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-3">
                  Audience Demographics & Geography
                </h4>
                <div className="space-y-2 mb-4">
                  {creator.audience.topCountries.slice(0, 3).map((country) => (
                    <div key={country.country}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">{country.country}</span>
                        <span className="font-mono text-slate-400">{country.percentage}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full"
                          style={{ width: `${country.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/5">
                  <span>Primary Age: 25-34 (56%)</span>
                  <span>Gender: 82% Male / 16% Female</span>
                </div>
              </div>

              {/* Action Trigger */}
              <Link
                href={`/campaigns/new?creatorId=${creator.id}`}
                className="btn btn-primary w-full py-3 text-sm mt-2"
              >
                <Sparkles size={16} />
                <span>Invite to Live Prototype Campaign</span>
              </Link>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
