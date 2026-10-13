import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Find existing user or return demo user
    let user = await prisma.user.findUnique({
      where: { email },
      include: {
        businessProfile: true,
        userBadges: { include: { badge: true } },
      },
    });

    if (!user) {
      // Fallback for seamless demo experience
      if (email.toLowerCase().includes('admin')) {
        user = await prisma.user.findUnique({
          where: { email: 'admin@marketlearn.dev' },
          include: { businessProfile: true, userBadges: { include: { badge: true } } },
        });
      } else {
        user = await prisma.user.findUnique({
          where: { email: 'alex@marketlearn.dev' },
          include: { businessProfile: true, userBadges: { include: { badge: true } } },
        });
      }
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Failed to process login' }, { status: 500 });
  }
}
