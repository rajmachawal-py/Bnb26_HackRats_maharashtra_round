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
  ArrowRight
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
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Container */}
      <aside className="relative w-full max-w-lg bg-white border-l border-slate-200 shadow-xl h-full flex flex-col z-10 overflow-y-auto">
        {/* Drawer Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-5 bg-white/90 backdrop-blur-md border-b border-slate-100">
          <div className="flex items-center gap-3">
            <StatusBadge state={creator.state} size="sm" />
            <span className="text-xs font-mono text-slate-400">
              ID: {creator.slug}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-6 flex flex-col gap-6 flex-1">
          {/* Creator Profile Intro */}
          <div className="flex items-start gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={creator.avatar}
              alt={creator.name}
              className="w-20 h-20 rounded-full object-cover border border-slate-200"
            />
            <div>
              <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                {creator.name}
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                {creator.headline}
              </p>
              <div className="flex items-center gap-2 mt-2 text-xs text-slate-500 font-medium">
                <Globe2 size={14} className="text-slate-400" />
                <span>{creator.location}</span>
                <span>•</span>
                <span>{creator.languages.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Platforms Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
             {creator.platforms.youtube && (
               <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-center">
                 <div className="text-sm font-bold text-slate-900">{formatCompactNumber(creator.platforms.youtube.subscribers)}</div>
                 <div className="text-xs text-slate-500">YouTube</div>
               </div>
             )}
             {creator.platforms.instagram && (
               <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-center">
                 <div className="text-sm font-bold text-slate-900">{formatCompactNumber(creator.platforms.instagram.followers)}</div>
                 <div className="text-xs text-slate-500">Instagram</div>
               </div>
             )}
             {creator.platforms.twitch && (
               <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-center">
                 <div className="text-sm font-bold text-slate-900">{formatCompactNumber(creator.platforms.twitch.followers)}</div>
                 <div className="text-xs text-slate-500">Twitch</div>
               </div>
             )}
             {creator.platforms.twitter && (
               <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-center">
                 <div className="text-sm font-bold text-slate-900">{formatCompactNumber(creator.platforms.twitter.followers)}</div>
                 <div className="text-xs text-slate-500">X / Twitter</div>
               </div>
             )}
          </div>

          {/* UNCLAIMED CREATOR SPECIFIC VIEW */}
          {isUnclaimed && (
            <div className="flex flex-col gap-5 mt-2">
              {/* Disclaimer */}
              <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 flex items-start gap-3">
                <AlertTriangle size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800 leading-relaxed">
                  <strong className="block mb-1">Public Discovery Profile</strong>
                  This profile was generated from verified public data sources. Listing does not imply creator approval or platform endorsement. 
                </div>
              </div>

              {/* Wikipedia Bio */}
              <div className="saas-card p-5">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <BookOpen size={16} className="text-primary-500" />
                    <span>Wikipedia Biographical Extract</span>
                  </div>
                </div>
                {isLoadingWiki ? (
                  <div className="py-4 text-sm text-slate-500">Loading biography...</div>
                ) : (
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {wikiData?.extract || creator.bio}
                  </p>
                )}
              </div>

              {/* Talent Management */}
              {creator.managerContact && (
                <div className="saas-card p-5 bg-slate-50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 uppercase tracking-wider">
                      <Building2 size={16} />
                      Talent Representation
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-slate-700 mb-6">
                    <div><span className="text-slate-500">Representative:</span> <strong className="text-slate-900">{creator.managerContact.name}</strong></div>
                    <div><span className="text-slate-500">Agency:</span> <strong className="text-slate-900">{creator.managerContact.agency}</strong></div>
                    <div className="flex items-center gap-2 text-primary-600"><Mail size={14} /> <span>{creator.managerContact.email}</span></div>
                  </div>
                  <Link href={`/campaigns/new?creatorId=${creator.id}`} className="btn btn-primary w-full justify-center">
                    Contact via Management <ArrowRight size={16} />
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* CLAIMED CREATOR SPECIFIC VIEW */}
          {!isUnclaimed && (
            <div className="flex flex-col gap-5 mt-2">
              <div className="grid grid-cols-3 gap-3">
                <div className="saas-card p-3 text-center">
                  <div className="text-xs text-slate-500 uppercase mb-1">Engagement</div>
                  <div className="text-lg font-bold text-slate-900">{creator.metrics.avgEngagement}%</div>
                </div>
                <div className="saas-card p-3 text-center">
                  <div className="text-xs text-slate-500 uppercase mb-1">On-Time</div>
                  <div className="text-lg font-bold text-slate-900">{creator.metrics.onTimeDeliveryRate}%</div>
                </div>
                <div className="saas-card p-3 text-center">
                  <div className="text-xs text-slate-500 uppercase mb-1">Deals</div>
                  <div className="text-lg font-bold text-slate-900">{creator.metrics.totalCompletedDeals}</div>
                </div>
              </div>

              {/* Rate Card */}
              <div className="saas-card p-5">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Commercial Rate Card</h4>
                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="text-slate-600">Dedicated YouTube Video</span>
                    <span className="font-semibold text-slate-900">{formatCurrency(creator.rates.dedicatedVideo)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="text-slate-600">Instagram Reel / Short</span>
                    <span className="font-semibold text-slate-900">{formatCurrency(creator.rates.reelOrShort)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Sponsored Mention</span>
                    <span className="font-semibold text-slate-900">{formatCurrency(creator.rates.integratedMention)}</span>
                  </div>
                </div>
              </div>

              {/* Action Trigger */}
              <div className="mt-4">
                <Link href={`/campaigns/new?creatorId=${creator.id}`} className="btn btn-primary w-full justify-center py-2.5">
                  Invite to Campaign <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
