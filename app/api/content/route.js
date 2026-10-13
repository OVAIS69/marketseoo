import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'user_alex_morgan';

    const contentItems = await prisma.contentCalendar.findMany({
      where: { userId },
      orderBy: { scheduledDate: 'asc' },
    });

    return NextResponse.json({ success: true, contentItems });
  } catch (error) {
    console.error('Content fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch content planner' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const {
      userId = 'user_alex_morgan',
      title,
      platform,
      contentType,
      scheduledDate,
      caption,
      hashtags,
      status = 'Planned',
    } = data;

    if (!title || !platform || !scheduledDate) {
      return NextResponse.json({ error: 'Title, platform, and scheduled date are required' }, { status: 400 });
    }

    const item = await prisma.contentCalendar.create({
      data: {
        userId,
        title,
        platform,
        contentType: contentType || 'Single Image',
        scheduledDate: new Date(scheduledDate),
        caption: caption || '',
        hashtags: hashtags || '',
        status,
      },
    });

    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error('Content creation error:', error);
    return NextResponse.json({ error: 'Failed to create content item' }, { status: 500 });
  }
}
