import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'user_alex_morgan';

    const latestResult = await prisma.assessmentResult.findFirst({
      where: { userId },
      orderBy: { completedAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      result: latestResult
        ? {
            ...latestResult,
            recommendations: JSON.parse(latestResult.recommendationsJson || '[]'),
          }
        : null,
    });
  } catch (error) {
    console.error('Assessment fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch assessment' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const {
      userId = 'user_alex_morgan',
      answers = {},
      socialScore = 80,
      seoScore = 55,
      contentScore = 72,
      advertisingScore = 61,
      analyticsScore = 48,
    } = await request.json();

    const overallScore = Math.round(
      (socialScore + seoScore + contentScore + advertisingScore + analyticsScore) / 5
    );

    const categoryScores = [
      {
        area: 'Analytics & Tracking',
        score: analyticsScore,
        courseSlug: 'analytics-and-growth-tracking',
        action: 'Implement Google Analytics 4 & conversion events on your checkout page to track true customer ROI.',
      },
      {
        area: 'Search Engine Optimization (SEO)',
        score: seoScore,
        courseSlug: 'search-engine-optimization-seo',
        action: 'Claim and optimize your Google Business profile, verify local citations, and focus on review acquisition.',
      },
      {
        area: 'Online Advertising',
        score: advertisingScore,
        courseSlug: 'online-advertising',
        action: 'Start with a tightly targeted $10/day local search campaign before expanding to higher-funnel social ads.',
      },
      {
        area: 'Content Marketing',
        score: contentScore,
        courseSlug: 'content-marketing',
        action: 'Build a bi-weekly educational newsletter answering the top 5 questions your prospective customers ask.',
      },
      {
        area: 'Social Media Marketing',
        score: socialScore,
        courseSlug: 'social-media-marketing',
        action: 'Leverage short-form video reels highlighting your business processes and customer transformations.',
      },
    ];

    categoryScores.sort((a, b) => a.score - b.score);

    const recommendations = categoryScores.slice(0, 3).map((item, idx) => ({
      area: item.area,
      score: item.score,
      priority: idx === 0 ? 'High' : idx === 1 ? 'High' : 'Medium',
      action: item.action,
      suggestedCourse: item.courseSlug,
    }));

    const result = await prisma.assessmentResult.create({
      data: {
        userId,
        overallScore,
        socialScore,
        seoScore,
        contentScore,
        advertisingScore,
        analyticsScore,
        recommendationsJson: JSON.stringify(recommendations),
      },
    });

    await prisma.businessProfile.updateMany({
      where: { userId },
      data: {
        growthScore: overallScore,
      },
    });

    return NextResponse.json({
      success: true,
      result: {
        ...result,
        recommendations,
      },
    });
  } catch (error) {
    console.error('Assessment save error:', error);
    return NextResponse.json({ error: 'Failed to record assessment' }, { status: 500 });
  }
}
