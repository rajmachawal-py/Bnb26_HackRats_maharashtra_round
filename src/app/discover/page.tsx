'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SEED_CREATORS } from '@/lib/seedData';
import { Creator } from '@/types/creator';
import { FilterRail, FilterState } from '@/components/discovery/FilterRail';
import { CreatorCard } from '@/components/discovery/CreatorCard';
import { IntelligenceDrawer } from '@/components/discovery/IntelligenceDrawer';
import { Compass, Users, Globe, ShieldCheck, Sparkles } from 'lucide-react';

const INITIAL_FILTERS: FilterState = {
  searchQuery: '',
  niche: 'all',
  platform: 'all',
  state: 'all',
};

export default function DiscoverPage() {
  const router = useRouter();
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [creators, setCreators] = useState<Creator[]>(SEED_CREATORS);
  const [isLoading, setIsLoading] = useState(false);

  // Live search via API
  useEffect(() => {
    let isMounted = true;
    const fetchCreators = async () => {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams({
          q: filters.searchQuery,
          niche: filters.niche,
          platform: filters.platform,
          state: filters.state
        });
        const res = await fetch(`/api/creators?${queryParams.toString()}`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted) setCreators(data.creators);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    
    // Debounce to prevent spamming API while typing
    const timeoutId = setTimeout(() => {
      fetchCreators();
    }, 500);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
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
            Search our Verified Partners for immediate campaign collaboration, or browse the Global Index to connect securely with any creator in the world.
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
            <span>{claimedCount} Partners</span>
          </button>

          <button
            onClick={() => setFilters({ ...filters, state: 'unclaimed' })}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-medium transition-all ${
              filters.state === 'unclaimed'
                ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-200'
                : 'bg-slate-900/60 border-white/10 text-slate-300 hover:border-white/20'
            }`}
          >
            <Globe size={14} className="text-cyan-400" />
            <span>{unclaimedCount} Global Index</span>
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
          totalResults={creators.length}
        />

        {/* Right Creator Grid */}
        <div className="flex-1 w-full">
          {isLoading ? (
            <div className="p-12 rounded-2xl bg-slate-900/40 border border-white/10 text-center flex flex-col items-center gap-3">
              <Sparkles size={32} className="text-violet-400 animate-spin" />
              <h3 className="text-base font-bold text-white">Live Searching APIs...</h3>
            </div>
          ) : creators.length === 0 ? (
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
              {creators.map((creator) => (
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
