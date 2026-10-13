import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  try {
    const { slug } = params;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'user_alex_morgan';

    const course = await prisma.course.findUnique({
      where: { slug },
      include: {
        lessons: {
          orderBy: { order: 'asc' },
        },
        quizzes: {
          include: {
            questions: {
              orderBy: { order: 'asc' },
            },
            attempts: {
              where: { userId },
              orderBy: { completedAt: 'desc' },
            },
          },
        },
      },
    });

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    const progressRecords = await prisma.userProgress.findMany({
      where: {
        userId,
        courseId: course.id,
      },
    });

    const completedLessonIds = new Set(
      progressRecords.filter((p) => p.completed).map((p) => p.lessonId)
    );

    const lessonsWithStatus = course.lessons.map((lesson) => ({
      ...lesson,
      isCompleted: completedLessonIds.has(lesson.id),
      keyTakeaways: lesson.keyTakeaways ? JSON.parse(lesson.keyTakeaways) : [],
    }));

    const totalLessons = course.lessons.length;
    const completedCount = lessonsWithStatus.filter((l) => l.isCompleted).length;
    const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

    return NextResponse.json({
      success: true,
      course: {
        ...course,
        lessons: lessonsWithStatus,
        totalLessons,
        completedCount,
        progressPercent,
      },
    });
  } catch (error) {
    console.error('Course slug fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch course details' }, { status: 500 });
  }
}
