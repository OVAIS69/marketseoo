import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const difficulty = searchParams.get('difficulty');
    const userId = searchParams.get('userId') || 'user_alex_morgan';

    const where = {};
    if (category && category !== 'All') {
      where.category = category;
    }
    if (difficulty && difficulty !== 'All') {
      where.difficulty = difficulty;
    }

    const courses = await prisma.course.findMany({
      where,
      orderBy: { order: 'asc' },
      include: {
        lessons: {
          select: { id: true, slug: true, title: true, duration: true, order: true },
          orderBy: { order: 'asc' },
        },
        quizzes: {
          select: { id: true, title: true, passingScore: true },
        },
      },
    });

    const userProgress = await prisma.userProgress.findMany({
      where: { userId },
    });

    const completedLessonIds = new Set(
      userProgress.filter((p) => p.completed).map((p) => p.lessonId)
    );

    const enrichedCourses = courses.map((course) => {
      const totalLessons = course.lessons.length;
      const completedCount = course.lessons.filter((l) => completedLessonIds.has(l.id)).length;
      const percent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

      return {
        ...course,
        totalLessons,
        completedCount,
        progressPercent: percent,
        isCompleted: percent === 100,
      };
    });

    return NextResponse.json({
      success: true,
      courses: enrichedCourses,
    });
  } catch (error) {
    console.error('Courses fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, slug, category, difficulty, duration, iconName, accentColor, description } = body;

    if (!title || !slug || !category) {
      return NextResponse.json({ error: 'Title, slug, and category are required' }, { status: 400 });
    }

    const course = await prisma.course.create({
      data: {
        title,
        slug,
        category,
        difficulty: difficulty || 'Beginner',
        duration: duration || '2.0 Hours',
        iconName: iconName || 'Compass',
        accentColor: accentColor || '#635BFF',
        description: description || '',
      },
    });

    return NextResponse.json({ success: true, course });
  } catch (error) {
    console.error('Course creation error:', error);
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
  }
}
