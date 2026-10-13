import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    if (body.scheduledDate) {
      body.scheduledDate = new Date(body.scheduledDate);
    }

    const item = await prisma.contentCalendar.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error('Content update error:', error);
    return NextResponse.json({ error: 'Failed to update content item' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await prisma.contentCalendar.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Content delete error:', error);
    return NextResponse.json({ error: 'Failed to delete content item' }, { status: 500 });
  }
}
