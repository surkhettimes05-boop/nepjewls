import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyKhaltiPayment } from '../../../../lib/khalti';
import { verifyEsewaPayment } from '../../../../lib/esewa';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { gateway, orderId, pidx, esewaData } = body;

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { payment: true }
    });

    if (!order || !order.payment) {
      return NextResponse.json({ error: 'Order or payment record not found' }, { status: 404 });
    }

    if (order.payment.status === 'VERIFIED') {
      return NextResponse.json({ message: 'Payment already verified', order });
    }

    let isVerified = false;

    if (gateway === 'khalti' && pidx) {
      // 1. Verify with Khalti
      const khaltiResponse = await verifyKhaltiPayment(pidx);
      
      // 2. Check if status is Completed and amount matches
      if (khaltiResponse.status === 'Completed' && khaltiResponse.total_amount === order.totalAmount * 100) {
        isVerified = true;
      }
    } else if (gateway === 'esewa' && esewaData) {
      // 1. Decode eSewa base64 data
      // eSewa returns a base64 encoded JSON string in the 'data' query param
      const decodedData = JSON.parse(Buffer.from(esewaData, 'base64').toString('utf-8'));
      
      const { transaction_code, status, total_amount, transaction_uuid } = decodedData;

      // 2. Verify with eSewa server (optional but recommended for security, we'll do it if it says COMPLETE)
      if (status === 'COMPLETE') {
        const product_code = process.env.ESEWA_MERCHANT_ID || 'EPAYTEST';
        
        // Wait, standard eSewa v2 might just need us to trust the signature or hit the status API
        // For this luxury demo, if it says COMPLETE we will hit the verification API to be sure
        const esewaResponse = await verifyEsewaPayment(product_code, order.totalAmount, transaction_uuid);
        
        if (esewaResponse.status === 'COMPLETE' || esewaResponse[0]?.transaction_details?.status === 'COMPLETE') {
            isVerified = true;
        }
      }
    }

    if (isVerified) {
      // Update database status
      await prisma.$transaction([
        prisma.order.update({
          where: { id: orderId },
          data: { status: 'PAID' }
        }),
        prisma.payment.update({
          where: { id: order.payment.id },
          data: { status: 'VERIFIED' }
        })
      ]);

      return NextResponse.json({ success: true, message: 'Payment verified successfully' });
    } else {
      return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 });
    }

  } catch (error) {
    console.error('Payment Verification Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
