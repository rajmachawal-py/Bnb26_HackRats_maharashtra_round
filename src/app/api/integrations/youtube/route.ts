import { NextRequest, NextResponse } from 'next/server';
import { fetchYouTubeChannelStats } from '@/lib/integrations/youtube';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const channelId = searchParams.get('channelId');

  if (!channelId) {
    return NextResponse.json({ error: 'Missing channelId parameter' }, { status: 400 });
  }

  const stats = await fetchYouTubeChannelStats(channelId);
  return NextResponse.json(stats);
}
