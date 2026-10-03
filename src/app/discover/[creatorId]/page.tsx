import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SEED_CREATORS } from '@/lib/seedData';
import { StatusBadge } from '@/components/common/StatusBadge';
import { PlatformIcon } from '@/components/common/PlatformIcon';
import { formatCurrency, formatCompactNumber } from '@/lib/utils';
import { fetchWikipediaSummary } from '@/lib/integrations/wikipedia';
import { 
  ArrowLeft, 
  MapPin, 
  ShieldAlert, 
  Sparkles, 
  Mail, 
  Building2, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  Globe2, 
  BookOpen 
} from 'lucide-react';

interface CreatorPageProps {
  params: Promise<{ creatorId: string }>;
}

export default async function CreatorProfilePage({ params }: CreatorPageProps) {
  const { creatorId } = await params;
  const creator = SEED_CREATORS.find(
    (c) => c.id === creatorId || c.slug === creatorId
  );

  if (!creator) {
    notFound();
  }

  const isUnclaimed = creator.state === 'unclaimed';
  const wikiData = creator.wikipediaSlug
    ? await fetchWikipediaSummary(creator.wikipediaSlug, creator.bio)
    : null;

  return (
    <div className="page-container py-8 max-w-5xl">
      {/* Back Link */}
      <Link
        href="/discover"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        <span>Back to Discovery Graph</span>
      </Link>

      {/* Main Profile Header Banner */}
      <div className="rounded-3xl overflow-hidden bg-slate-900/60 border border-white/10 backdrop-blur-xl mb-8">
        <div className="h-48 md:h-64 w-full relative bg-slate-950">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={creator.bannerImage}
            alt={creator.name}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute top-4 right-4">
            <StatusBadge state={creator.state} />
          </div>
        </div>

        <div className="px-6 md:px-8 pb-8 pt-0 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-16 mb-6">
            <div className="flex items-end gap-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={creator.avatar}
                alt={creator.name}
                className={`w-28 h-28 rounded-3xl object-cover border-4 shadow-2xl ${
                  isUnclaimed ? 'border-amber-400' : 'border-violet-500'
                }`}
              />
              <div className="mb-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl md:text-3xl font-display font-extrabold text-white">
                    {creator.name}
                  </h1>
                  {creator.state === 'claimed' && (
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">
                      ✓
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} className="text-violet-400" />
                    <span>{creator.location}</span>
                  </span>
                  <span>•</span>
                  <span>{creator.languages.join(', ')}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {isUnclaimed ? (
                <Link
                  href={`/campaigns/new?creatorId=${creator.id}&mode=manager`}
                  className="btn btn-primary"
                >
                  <Mail size={16} />
                  <span>Contact Talent Management</span>
                </Link>
              ) : (
                <Link
                  href={`/campaigns/new?creatorId=${creator.id}`}
                  className="btn btn-primary"
                >
                  <Sparkles size={16} />
                  <span>Send Campaign Offer</span>
                </Link>
              )}
            </div>
          </div>

          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed mb-6">
            {creator.headline}
          </p>

          {/* Social Platforms Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-950/60 border border-white/5">
            {creator.platforms.youtube && (
              <div className="flex items-center gap-2.5">
                <PlatformIcon platform="youtube" size={18} />
                <div>
                  <div className="font-bold text-white font-mono">
                    {formatCompactNumber(creator.platforms.youtube.subscribers)}
                  </div>
                  <div className="text-[10px] text-slate-400">YouTube Subs</div>
                </div>
              </div>
            )}
            {creator.platforms.github && (
              <div className="flex items-center gap-2.5">
                <PlatformIcon platform="github" size={18} />
                <div>
                  <div className="font-bold text-white font-mono">
                    {formatCompactNumber(creator.platforms.github.totalStars)}
                  </div>
                  <div className="text-[10px] text-slate-400">GitHub Stars</div>
                </div>
              </div>
            )}
            {creator.platforms.twitch && (
              <div className="flex items-center gap-2.5">
                <PlatformIcon platform="twitch" size={18} />
                <div>
                  <div className="font-bold text-white font-mono">
                    {formatCompactNumber(creator.platforms.twitch.followers)}
                  </div>
                  <div className="text-[10px] text-slate-400">Twitch Community</div>
                </div>
              </div>
            )}
            {creator.platforms.instagram && (
              <div className="flex items-center gap-2.5">
                <PlatformIcon platform="instagram" size={18} />
                <div>
                  <div className="font-bold text-white font-mono">
                    {formatCompactNumber(creator.platforms.instagram.followers)}
                  </div>
                  <div className="text-[10px] text-slate-400">Instagram Followers</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Unclaimed Warning */}
          {isUnclaimed && (
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
              <ShieldAlert size={22} className="text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-amber-200 leading-relaxed">
                <strong className="text-amber-300 block mb-1">
                  Public Unclaimed Creator Profile
                </strong>
                This profile is indexed from legitimate public reference sources and APIs. 
                Listing on SynapseOS does not imply creator endorsement. Outreach is routed to their authorized agency.
              </div>
            </div>
          )}

          {/* Biography / Wikipedia Section */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <BookOpen size={16} className="text-cyan-400" />
                <span>{wikiData ? 'Biographical Profile (MediaWiki REST API)' : 'About this Creator'}</span>
              </div>
              {wikiData?.pageUrl && (
                <a
                  href={wikiData.pageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono"
                >
                  <span>Wikipedia Reference</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {wikiData?.extract || creator.bio}
            </p>
          </div>

          {/* Past Verified Deals */}
          {creator.pastBrandCollaborations.length > 0 && (
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-400" />
                  <span>Verified Past Brand Collaborations</span>
                </h3>
                <span className="text-xs font-mono text-emerald-400 font-semibold">
                  100% On-Time Delivery
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {creator.pastBrandCollaborations.map((collab) => (
                  <div
                    key={collab.dealId}
                    className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 flex items-start gap-3"
                  >
                    <span className="text-2xl">{collab.brandLogo}</span>
                    <div className="flex-1">
                      <div className="font-bold text-white text-xs">{collab.brandName}</div>
                      <div className="text-[11px] text-slate-400">{collab.campaignName}</div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-2 pt-2 border-t border-white/5">
                        <span className="text-cyan-400">{collab.dealId}</span>
                        <span>{collab.completedDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar: Rates & Agency Contact */}
        <div className="flex flex-col gap-6">
          {/* Commercial Rates Card */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-4">
              Standard Commercial Rates
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-slate-300">Dedicated Video</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  {formatCurrency(creator.rates.dedicatedVideo)}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-slate-300">Short / Reel</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  {formatCurrency(creator.rates.reelOrShort)}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-slate-300">Integrated Mention</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  {formatCurrency(creator.rates.integratedMention)}
                </span>
              </div>
            </div>
          </div>

          {/* Agency / Management Route */}
          {creator.managerContact && (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/40 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <Building2 size={16} className="text-amber-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Talent Representation
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
              </div>
              <Link
                href={`/campaigns/new?creatorId=${creator.id}&mode=manager`}
                className="btn btn-primary w-full text-xs"
              >
                <span>Send Offer via Manager</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
