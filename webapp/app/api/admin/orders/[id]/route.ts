import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { status } = await request.json();
    const resolvedParams = await params;

    // Optional: Validate status string
    const validStatuses = ['PENDING', 'PAID', 'SHIPPED', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: resolvedParams.id },
      data: { status },
    });

    return NextResponse.json(updatedOrder);
  } catch (error: any) {
    console.error('Error updating order:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
