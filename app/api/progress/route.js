import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request) {
  try {
    const { userId = 'user_alex_morgan', courseId, lessonId, completed = true } = await request.json();

    if (!courseId || !lessonId) {
      return NextResponse.json({ error: 'courseId and lessonId are required' }, { status: 400 });
    }

    const progress = await prisma.userProgress.upsert({
      where: {
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
      update: {
        completed,
        completedAt: completed ? new Date() : null,
      },
      create: {
        userId,
        courseId,
        lessonId,
        completed,
        completedAt: completed ? new Date() : null,
      },
    });

    // Award XP if completed
    let xpEarned = 0;
    if (completed) {
      xpEarned = 25;
      await prisma.user.update({
        where: { id: userId },
        data: {
          xp: { increment: xpEarned },
        },
      });
    }

    return NextResponse.json({
      success: true,
      progress,
      xpEarned,
    });
  } catch (error) {
    console.error('Progress update error:', error);
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
  }
}
