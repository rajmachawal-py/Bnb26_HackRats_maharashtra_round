'use client';

import React from 'react';
import { Search, RotateCcw, Filter, Check } from 'lucide-react';

export interface FilterState {
  searchQuery: string;
  niche: string;
  platform: string;
  state: string; // 'all' | 'claimed' | 'unclaimed'
}

interface FilterRailProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
}

const NICHES = [
  'All',
  'Developer Tools',
  'AI & Machine Learning',
  'Consumer Tech',
  'Sustainable Fashion',
  'Esports',
];

const PLATFORMS = [
  { id: 'all', label: 'All Platforms' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'twitch', label: 'Twitch' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'github', label: 'GitHub' },
];

const STATES = [
  { id: 'all', label: 'Entire Network' },
  { id: 'claimed', label: 'Verified Partners' },
  { id: 'unclaimed', label: 'Global Directory' },
];

export function FilterRail({ filters, onChange, onReset, totalResults }: FilterRailProps) {
  return (
    <aside className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-6 p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl h-fit sticky top-28">
      {/* Header with Results Count & Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2 text-white font-semibold text-sm">
          <Filter size={16} className="text-violet-400" />
          <span>Faceted Filters</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-violet-600/20 text-violet-300 font-mono">
            {totalResults}
          </span>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
          title="Reset all filters"
        >
          <RotateCcw size={12} />
          <span>Reset</span>
        </button>
      </div>

      {/* 1. Keyword Search */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-slate-300">Keyword Search</label>
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search creator, niche, topic..."
            value={filters.searchQuery}
            onChange={(e) => onChange({ ...filters, searchQuery: e.target.value })}
            className="input-field pl-9 text-xs"
          />
        </div>
      </div>

      {/* 2. Profile Claimed State (Cold-Start Feature) */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
          <span>Network Status</span>
        </label>
        <div className="flex flex-col gap-1.5">
          {STATES.map((s) => {
            const isSelected = filters.state === s.id;
            return (
              <button
                key={s.id}
                onClick={() => onChange({ ...filters, state: s.id })}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-all ${
                  isSelected
                    ? 'bg-violet-600/25 border border-violet-500/40 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                <span>{s.label}</span>
                {isSelected && <Check size={14} className="text-cyan-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Primary Niche */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-300">Content Category</label>
        <div className="flex flex-wrap gap-1.5">
          {NICHES.map((n) => {
            const isSelected = (filters.niche === 'all' && n === 'All') || filters.niche.toLowerCase() === n.toLowerCase();
            return (
              <button
                key={n}
                onClick={() => onChange({ ...filters, niche: n === 'All' ? 'all' : n })}
                className={`text-[11px] px-2.5 py-1 rounded-lg transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold shadow-sm'
                    : 'bg-slate-950/70 border border-white/5 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                {n}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Platforms */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-300">Connected Platform</label>
        <div className="grid grid-cols-2 gap-1.5">
          {PLATFORMS.map((p) => {
            const isSelected = filters.platform === p.id;
            return (
              <button
                key={p.id}
                onClick={() => onChange({ ...filters, platform: p.id })}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] text-center transition-all ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/40 font-semibold'
                    : 'bg-slate-950/60 border border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
