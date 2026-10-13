import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { order: 'asc' },
      include: {
        lessons: true,
        quizzes: true,
      },
    });
    return NextResponse.json({ success: true, courses });
  } catch (error) {
    console.error('Admin courses fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, slug, category, difficulty, duration, iconName, accentColor, description } = body;

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
    console.error('Admin course create error:', error);
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
    }

    await prisma.course.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin course delete error:', error);
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 });
  }
}
