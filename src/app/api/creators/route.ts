import { NextRequest, NextResponse } from 'next/server';
import { SEED_CREATORS } from '@/lib/seedData';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';
  const niche = searchParams.get('niche');
  const platform = searchParams.get('platform');
  const state = searchParams.get('state');
  const maxBudget = searchParams.get('maxBudget') ? parseFloat(searchParams.get('maxBudget')!) : null;

  let results = [...SEED_CREATORS];

  // 1. Text Search Query
  if (query) {
    results = results.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.bio.toLowerCase().includes(query) ||
        c.headline.toLowerCase().includes(query) ||
        c.niche.some((n) => n.toLowerCase().includes(query))
    );
  }

  // 2. Niche Filter
  if (niche && niche !== 'all') {
    results = results.filter((c) =>
      c.niche.some((n) => n.toLowerCase() === niche.toLowerCase())
    );
  }

  // 3. Platform Filter
  if (platform && platform !== 'all') {
    results = results.filter((c) => {
      if (platform === 'youtube') return !!c.platforms.youtube;
      if (platform === 'twitch') return !!c.platforms.twitch;
      if (platform === 'instagram') return !!c.platforms.instagram;
      if (platform === 'github') return !!c.platforms.github;
      return true;
    });
  }

  // 4. State Filter (Claimed vs Unclaimed)
  if (state && state !== 'all') {
    results = results.filter((c) => c.state === state);
  }

  // 5. Budget Filter
  if (maxBudget !== null && !isNaN(maxBudget)) {
    results = results.filter((c) => c.rates.dedicatedVideo <= maxBudget);
  }

  return NextResponse.json({
    total: results.length,
    creators: results,
  });
}
