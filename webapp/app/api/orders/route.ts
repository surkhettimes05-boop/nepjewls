import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { initiateKhaltiPayment } from '../../../lib/khalti';
import { createEsewaPayload } from '../../../lib/esewa';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, paymentMethod, email, name, phone } = body;

    let user = null;
    if (email) {
      user = await prisma.user.upsert({
        where: { email },
        update: { name },
        create: { email, name }
      });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({ where: { id: item.productId } });
      if (product) {
        totalAmount += product.price * item.quantity;
        orderItems.push({
          productId: product.id,
          quantity: item.quantity,
          priceAt: product.price
        });
      }
    }

    const order = await prisma.order.create({
      data: {
        userId: user?.id,
        totalAmount,
        paymentMethod: paymentMethod || 'KHALTI',
        items: {
          create: orderItems
        },
        payment: {
          create: {
            amount: totalAmount,
            provider: paymentMethod || 'KHALTI',
          }
        }
      },
      include: {
        items: true,
        payment: true
      }
    });

    let paymentPayload = null;
    let paymentUrl = null;

    if (paymentMethod === 'KHALTI') {
      const khaltiResponse = await initiateKhaltiPayment({
        return_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout/success?gateway=khalti`,
        website_url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        amount: totalAmount * 100, // Khalti requires amount in paisa
        purchase_order_id: order.id,
        purchase_order_name: `NepJewls Order ${order.id}`,
        customer_info: {
          name: name || 'Guest',
          email: email || 'guest@example.com',
          phone: phone || '9800000000'
        }
      });
      paymentPayload = khaltiResponse;
      paymentUrl = khaltiResponse.payment_url;
    } else if (paymentMethod === 'ESEWA') {
      paymentPayload = createEsewaPayload(totalAmount, order.id);
      paymentUrl = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
    }

    return NextResponse.json({ order, paymentPayload, paymentUrl }, { status: 201 });
  } catch (error) {
    console.error('Failed to create order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
