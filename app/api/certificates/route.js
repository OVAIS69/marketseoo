import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const userId = searchParams.get('userId') || 'user_alex_morgan';

    if (code) {
      const certificate = await prisma.certificate.findUnique({
        where: { certificateCode: code },
        include: {
          user: {
            select: { name: true, email: true },
          },
          course: {
            select: { title: true, category: true },
          },
        },
      });

      if (!certificate) {
        return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true, certificate });
    }

    const certificates = await prisma.certificate.findMany({
      where: { userId },
      include: {
        course: { select: { title: true, category: true } },
      },
      orderBy: { issueDate: 'desc' },
    });

    return NextResponse.json({ success: true, certificates });
  } catch (error) {
    console.error('Certificate fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch certificates' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { userId = 'user_alex_morgan', courseId, issuedToName } = await request.json();

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const certificateCode = `ML-${new Date().getFullYear()}-${randomSuffix}-GROWTH`;

    const certificate = await prisma.certificate.create({
      data: {
        certificateCode,
        userId,
        courseId: courseId || null,
        title: 'Digital Marketing Mastery for Small Business',
        issuedToName: issuedToName || 'Alex Morgan',
        scoreAchieved: 96,
        verificationUrl: `https://marketlearn.dev/verify/${certificateCode}`,
      },
    });

    return NextResponse.json({ success: true, certificate });
  } catch (error) {
    console.error('Certificate creation error:', error);
    return NextResponse.json({ error: 'Failed to issue certificate' }, { status: 500 });
  }
}
