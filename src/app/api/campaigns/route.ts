import { NextRequest, NextResponse } from 'next/server';
import { DEMO_CAMPAIGN } from '@/lib/seedData';
import { Campaign } from '@/types/campaign';

const campaignsStore: Campaign[] = [DEMO_CAMPAIGN];

export async function GET() {
  return NextResponse.json({
    total: campaignsStore.length,
    campaigns: campaignsStore,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newCampaign: Campaign = {
      id: `campaign-${Date.now()}`,
      brandId: body.brandId || 'brand-techbrand-inc',
      brief: body.brief,
      createdAt: new Date().toISOString(),
      status: 'active',
      invitedCreatorIds: body.invitedCreatorIds || [],
      matchedCreators: body.matchedCreators || [],
    };

    campaignsStore.unshift(newCampaign);

    return NextResponse.json({
      success: true,
      campaign: newCampaign,
    });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
