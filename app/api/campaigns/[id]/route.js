import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    const campaign = await prisma.campaign.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({ success: true, campaign });
  } catch (error) {
    console.error('Campaign update error:', error);
    return NextResponse.json({ error: 'Failed to update campaign' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await prisma.campaign.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Campaign delete error:', error);
    return NextResponse.json({ error: 'Failed to delete campaign' }, { status: 500 });
  }
}
