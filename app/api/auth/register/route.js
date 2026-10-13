import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, password, businessName, industry, website, stage, primaryGoal, monthlyBudget } = data;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    // Check if user exists
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json({ error: 'A user with this email already exists' }, { status: 400 });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: password || 'password123',
        role: 'USER',
        xp: 100,
        level: 'Beginner',
        businessProfile: {
          create: {
            businessName: businessName || 'My New Venture',
            industry: industry || 'Retail / Services',
            website: website || '',
            stage: stage || 'Startup',
            primaryGoal: primaryGoal || 'Attract More Customers',
            monthlyBudget: monthlyBudget ? parseFloat(monthlyBudget) : 300,
            growthScore: 52,
          },
        },
      },
      include: {
        businessProfile: true,
      },
    });

    return NextResponse.json({
      success: true,
      user: newUser,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
