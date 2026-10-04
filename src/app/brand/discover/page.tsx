'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SEED_CREATORS } from '@/lib/seedData';
import { Creator } from '@/types/creator';
import { FilterRail, FilterState } from '@/components/discovery/FilterRail';
import { CreatorCard } from '@/components/discovery/CreatorCard';
import { IntelligenceDrawer } from '@/components/discovery/IntelligenceDrawer';
import { Search, Loader2 } from 'lucide-react';

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

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2 pb-6 border-b border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900">
          Discover Creators
        </h1>
        <p className="text-slate-500">
          Find the right creators for your campaign.
        </p>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Filter Rail */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <FilterRail
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters(INITIAL_FILTERS)}
            totalResults={creators.length}
          />
        </div>

        {/* Right Creator Grid */}
        <div className="flex-1 w-full min-w-0">
          {isLoading ? (
            <div className="saas-card p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
              <Loader2 className="w-8 h-8 text-primary-500 animate-spin mb-4" />
              <h3 className="text-lg font-medium text-slate-900">Loading creators...</h3>
            </div>
          ) : creators.length === 0 ? (
            <div className="saas-card p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
              <Search className="w-12 h-12 text-slate-300 mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No creators found</h3>
              <p className="text-sm text-slate-500 mb-6 max-w-sm">
                We couldn't find any creators matching your current filters. Try adjusting your search criteria.
              </p>
              <button
                onClick={() => setFilters(INITIAL_FILTERS)}
                className="btn btn-secondary"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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

      <IntelligenceDrawer
        creator={selectedCreator}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}
