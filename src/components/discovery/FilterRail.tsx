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
    <aside className="w-full flex flex-col gap-6 p-5 saas-card sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-slate-500" />
          <span className="font-semibold text-slate-900">Filters</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
            {totalResults}
          </span>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors"
        >
          <RotateCcw size={12} />
          <span>Reset</span>
        </button>
      </div>

      {/* 1. Keyword Search */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Search</label>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Name, niche, topic..."
            value={filters.searchQuery}
            onChange={(e) => onChange({ ...filters, searchQuery: e.target.value })}
            className="input-field pl-9 text-sm py-2"
          />
        </div>
      </div>

      {/* 2. Network Status */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Network Status</label>
        <div className="flex flex-col gap-1.5">
          {STATES.map((s) => {
            const isSelected = filters.state === s.id;
            return (
              <button
                key={s.id}
                onClick={() => onChange({ ...filters, state: s.id })}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                  isSelected
                    ? 'bg-primary-50 text-primary-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span>{s.label}</span>
                {isSelected && <Check size={16} className="text-primary-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Content Category */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Content Category</label>
        <div className="flex flex-wrap gap-2">
          {NICHES.map((n) => {
            const isSelected = (filters.niche === 'all' && n === 'All') || filters.niche.toLowerCase() === n.toLowerCase();
            return (
              <button
                key={n}
                onClick={() => onChange({ ...filters, niche: n === 'All' ? 'all' : n })}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 font-medium'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
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
        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Platform</label>
        <div className="flex flex-col gap-1.5">
          {PLATFORMS.map((p) => {
            const isSelected = filters.platform === p.id;
            return (
              <button
                key={p.id}
                onClick={() => onChange({ ...filters, platform: p.id })}
                className={`px-3 py-2 rounded-lg text-sm text-left transition-all ${
                  isSelected
                    ? 'bg-primary-50 text-primary-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
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
