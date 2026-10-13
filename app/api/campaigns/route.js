import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'user_alex_morgan';

    const campaigns = await prisma.campaign.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, campaigns });
  } catch (error) {
    console.error('Campaigns fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch campaigns' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const {
      userId = 'user_alex_morgan',
      name,
      platform,
      objective,
      targetAudience,
      budget,
      startDate,
      endDate,
      status = 'Planned',
    } = data;

    if (!name || !platform || !budget) {
      return NextResponse.json({ error: 'Name, platform, and budget are required' }, { status: 400 });
    }

    const campaign = await prisma.campaign.create({
      data: {
        userId,
        name,
        platform,
        objective: objective || 'Brand Awareness',
        targetAudience: targetAudience || 'Local audience within 10 miles',
        budget: parseFloat(budget),
        startDate: startDate ? new Date(startDate) : new Date(),
        endDate: endDate ? new Date(endDate) : new Date(Date.now() + 30 * 86400000),
        status,
        progress: status === 'Active' ? 15 : 0,
        reach: status === 'Active' ? Math.round(parseFloat(budget) * 22) : 0,
        clicks: status === 'Active' ? Math.round(parseFloat(budget) * 1.8) : 0,
        conversions: status === 'Active' ? Math.round(parseFloat(budget) * 0.18) : 0,
      },
    });

    return NextResponse.json({ success: true, campaign });
  } catch (error) {
    console.error('Campaign creation error:', error);
    return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 });
  }
}
