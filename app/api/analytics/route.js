import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30', 10);
    const userId = searchParams.get('userId') || 'user_alex_morgan';

    // Fetch campaigns
    const campaigns = await prisma.campaign.findMany({
      where: { userId },
    });

    const totalCampaigns = campaigns.length;
    const totalBudget = campaigns.reduce((acc, c) => acc + c.budget, 0);
    const totalReach = campaigns.reduce((acc, c) => acc + c.reach, 0);
    const totalClicks = campaigns.reduce((acc, c) => acc + c.clicks, 0);
    const totalConversions = campaigns.reduce((acc, c) => acc + c.conversions, 0);
    const avgCTR = totalReach > 0 ? ((totalClicks / totalReach) * 100).toFixed(2) : '2.84';
    const avgConversionRate = totalClicks > 0 ? ((totalConversions / totalClicks) * 100).toFixed(2) : '3.65';
    const estimatedCAC = totalConversions > 0 ? (totalBudget / totalConversions).toFixed(2) : '42.50';

    // Timeline series data customized by period
    const timelineData = [];
    const points = days === 7 ? 7 : days === 30 ? 10 : 12;
    for (let i = 0; i < points; i++) {
      const dayOffset = Math.round((days / points) * i);
      const label = `Day ${dayOffset + 1}`;
      const factor = (i + 1) / points;
      timelineData.push({
        name: label,
        reach: Math.round(500 + 1200 * factor + Math.random() * 300),
        clicks: Math.round(35 + 85 * factor + Math.random() * 20),
        conversions: Math.round(4 + 14 * factor + Math.random() * 5),
        spend: Math.round(25 + 50 * factor),
      });
    }

    // Channel breakdown
    const channelBreakdown = [
      { name: 'Instagram', value: 45, spend: 350, clicks: 840, conversions: 112, color: '#8B7CF6' },
      { name: 'Google Ads', value: 35, spend: 400, clicks: 620, conversions: 89, color: '#0EA5E9' },
      { name: 'Email Marketing', value: 15, spend: 100, clicks: 280, conversions: 42, color: '#22C55E' },
      { name: 'LinkedIn', value: 5, spend: 0, clicks: 95, conversions: 11, color: '#635BFF' },
    ];

    // Funnel data
    const funnelData = [
      { stage: 'Ad Impressions', count: totalReach > 0 ? totalReach : 23180, percentage: 100 },
      { stage: 'Website Clicks', count: totalClicks > 0 ? totalClicks : 1460, percentage: 6.3 },
      { stage: 'Add to Cart / Lead', count: Math.round((totalClicks > 0 ? totalClicks : 1460) * 0.32), percentage: 2.0 },
      { stage: 'Completed Sales', count: totalConversions > 0 ? totalConversions : 201, percentage: 0.86 },
    ];

    return NextResponse.json({
      success: true,
      kpis: {
        totalCampaigns,
        totalBudget,
        totalReach: totalReach > 0 ? totalReach : 23180,
        totalClicks: totalClicks > 0 ? totalClicks : 1460,
        totalConversions: totalConversions > 0 ? totalConversions : 201,
        avgCTR: `${avgCTR}%`,
        avgConversionRate: `${avgConversionRate}%`,
        estimatedCAC: `$${estimatedCAC}`,
        growthPercent: '+24.8%',
      },
      timelineData,
      channelBreakdown,
      funnelData,
    });
  } catch (error) {
    console.error('Analytics fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
