import { NextRequest, NextResponse } from 'next/server';
import { fetchWikipediaSummary } from '@/lib/integrations/wikipedia';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Missing Wikipedia article slug' }, { status: 400 });
  }

  const summary = await fetchWikipediaSummary(slug);
  return NextResponse.json(summary);
}
