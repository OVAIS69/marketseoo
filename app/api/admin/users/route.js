import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        businessProfile: true,
        progress: true,
        quizAttempts: true,
        certificates: true,
      },
    });

    const enriched = users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      level: u.level,
      xp: u.xp,
      businessName: u.businessProfile?.businessName || 'N/A',
      industry: u.businessProfile?.industry || 'N/A',
      growthScore: u.businessProfile?.growthScore || 50,
      lessonsCompleted: u.progress.filter((p) => p.completed).length,
      quizzesPassed: u.quizAttempts.filter((q) => q.passed).length,
      certificatesCount: u.certificates.length,
      joinedAt: u.createdAt,
    }));

    return NextResponse.json({ success: true, users: enriched });
  } catch (error) {
    console.error('Admin users error:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
