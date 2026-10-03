'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { SEED_CREATORS } from '@/lib/seedData';
import { Creator } from '@/types/creator';
import { FilterRail, FilterState } from '@/components/discovery/FilterRail';
import { CreatorCard } from '@/components/discovery/CreatorCard';
import { IntelligenceDrawer } from '@/components/discovery/IntelligenceDrawer';
import { Compass, Users, AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react';

const INITIAL_FILTERS: FilterState = {
  searchQuery: '',
  niche: 'all',
  platform: 'all',
  state: 'all',
  maxBudget: 50000,
};

export default function DiscoverPage() {
  const router = useRouter();
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Filtered creators list
  const filteredCreators = useMemo(() => {
    return SEED_CREATORS.filter((c) => {
      // 1. Keyword search
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = c.name.toLowerCase().includes(query);
        const matchesBio = c.bio.toLowerCase().includes(query);
        const matchesHeadline = c.headline.toLowerCase().includes(query);
        const matchesNiche = c.niche.some((n) => n.toLowerCase().includes(query));
        if (!matchesName && !matchesBio && !matchesHeadline && !matchesNiche) {
          return false;
        }
      }

      // 2. Niche
      if (filters.niche !== 'all') {
        const hasNiche = c.niche.some(
          (n) => n.toLowerCase() === filters.niche.toLowerCase()
        );
        if (!hasNiche) return false;
      }

      // 3. Platform
      if (filters.platform !== 'all') {
        if (filters.platform === 'youtube' && !c.platforms.youtube) return false;
        if (filters.platform === 'twitch' && !c.platforms.twitch) return false;
        if (filters.platform === 'instagram' && !c.platforms.instagram) return false;
        if (filters.platform === 'github' && !c.platforms.github) return false;
      }

      // 4. Claimed State
      if (filters.state !== 'all') {
        if (c.state !== filters.state) return false;
      }

      // 5. Budget
      if (c.rates.dedicatedVideo > filters.maxBudget) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const handleOpenIntelligence = (creator: Creator) => {
    setSelectedCreator(creator);
    setIsDrawerOpen(true);
  };

  const handleSendOffer = (creator: Creator) => {
    router.push(`/campaigns/new?creatorId=${creator.id}`);
  };

  const claimedCount = SEED_CREATORS.filter((c) => c.state === 'claimed').length;
  const unclaimedCount = SEED_CREATORS.filter((c) => c.state === 'unclaimed').length;

  return (
    <div className="page-container py-8 flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-600/15 border border-violet-500/30 text-xs font-semibold text-violet-300 font-mono mb-2">
            <Compass size={13} className="text-cyan-400" />
            <span>DISCOVERY GRAPH</span>
            <span>•</span>
            <span>MULTI-SIGNAL MATCHING</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
            Creator Intelligence & Discovery
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Discover claimed creators ready for immediate campaign collaboration, or browse established unclaimed profiles with verified manager contact routes.
          </p>
        </div>

        {/* Quick State Metric Pills */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilters({ ...filters, state: 'claimed' })}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-medium transition-all ${
              filters.state === 'claimed'
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200'
                : 'bg-slate-900/60 border-white/10 text-slate-300 hover:border-white/20'
            }`}
          >
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>{claimedCount} Claimed</span>
          </button>

          <button
            onClick={() => setFilters({ ...filters, state: 'unclaimed' })}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-medium transition-all ${
              filters.state === 'unclaimed'
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-200'
                : 'bg-slate-900/60 border-white/10 text-slate-300 hover:border-white/20'
            }`}
          >
            <AlertTriangle size={14} className="text-amber-400" />
            <span>{unclaimedCount} Unclaimed</span>
          </button>
        </div>
      </div>

      {/* Main Discovery Layout: Filter Rail (Left) + Grid (Right) */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Filter Rail */}
        <FilterRail
          filters={filters}
          onChange={setFilters}
          onReset={() => setFilters(INITIAL_FILTERS)}
          totalResults={filteredCreators.length}
        />

        {/* Right Creator Grid */}
        <div className="flex-1 w-full">
          {filteredCreators.length === 0 ? (
            <div className="p-12 rounded-2xl bg-slate-900/40 border border-white/10 text-center flex flex-col items-center gap-3">
              <Users size={32} className="text-slate-500" />
              <h3 className="text-base font-bold text-white">No creators match your filters</h3>
              <p className="text-xs text-slate-400 max-w-sm">
                Try widening your budget range or selecting all categories to view more profiles.
              </p>
              <button
                onClick={() => setFilters(INITIAL_FILTERS)}
                className="btn btn-secondary btn-sm mt-2"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredCreators.map((creator) => (
                <CreatorCard
                  key={creator.id}
                  creator={creator}
                  onOpenIntelligence={handleOpenIntelligence}
                  onSendOffer={handleSendOffer}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Slide-Over Intelligence Drawer */}
      <IntelligenceDrawer
        creator={selectedCreator}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}
