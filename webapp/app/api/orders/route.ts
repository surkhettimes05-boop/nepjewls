import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { initiateKhaltiPayment } from "../../../lib/khalti";
import { createEsewaPayload } from "../../../lib/esewa";

class CheckoutError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

type CheckoutItem = {
  productId: string;
  quantity: number;
};

function validateCheckout(body: any) {
  const name = String(body?.name || "").trim();
  const email = String(body?.email || "").trim().toLowerCase();
  const phone = String(body?.phone || "").trim().replace(/[\s-]/g, "");
  const paymentMethod = String(body?.paymentMethod || "").toUpperCase();

  if (name.length < 2 || name.length > 100) {
    throw new CheckoutError("A valid customer name is required");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    throw new CheckoutError("A valid email address is required");
  }
  if (!/^\+?[0-9]{7,15}$/.test(phone)) {
    throw new CheckoutError("A valid phone number is required");
  }
  if (!["KHALTI", "ESEWA"].includes(paymentMethod)) {
    throw new CheckoutError("Unsupported payment method");
  }
  if (!Array.isArray(body?.items) || body.items.length === 0 || body.items.length > 20) {
    throw new CheckoutError("Cart must contain between 1 and 20 items");
  }

  const merged = new Map<string, number>();
  for (const rawItem of body.items) {
    const productId = String(rawItem?.productId || "");
    const quantity = Number(rawItem?.quantity);

    if (!productId || !Number.isInteger(quantity) || quantity < 1 || quantity > 5) {
      throw new CheckoutError("Invalid cart item");
    }

    const combined = (merged.get(productId) || 0) + quantity;
    if (combined > 5) throw new CheckoutError("Quantity limit exceeded");
    merged.set(productId, combined);
  }

  const items: CheckoutItem[] = Array.from(merged, ([productId, quantity]) => ({
    productId,
    quantity,
  }));

  return { name, email, phone, paymentMethod, items };
}

async function cancelAndReleaseReservation(orderId: string) {
  await prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: { id: orderId },
      include: { items: true, payment: true },
    });

    if (!order || order.status !== "PENDING") return;

    for (const item of order.items) {
      await tx.product.update({
        where: { id: item.productId },
        data: {
          stockOnHand: { increment: item.quantity },
          stockReserved: { decrement: item.quantity },
        },
      });
    }

    if (order.payment) {
      await tx.payment.update({
        where: { id: order.payment.id },
        data: { status: "FAILED" },
      });
    }

    await tx.order.update({
      where: { id: order.id },
      data: { status: "CANCELLED" },
    });
  });
}

export async function POST(request: Request) {
  let createdOrderId: string | null = null;

  try {
    const input = validateCheckout(await request.json());

    const order = await prisma.$transaction(
      async (tx) => {
        const products = await tx.product.findMany({
          where: {
            id: { in: input.items.map((item) => item.productId) },
            active: true,
          },
        });

        if (products.length !== input.items.length) {
          throw new CheckoutError("One or more products are unavailable", 409);
        }

        const productById = new Map(products.map((product) => [product.id, product]));
        let totalAmount = new Prisma.Decimal(0);

        for (const item of input.items) {
          const product = productById.get(item.productId);
          if (!product) throw new CheckoutError("Product not found", 409);

          const reserved = await tx.product.updateMany({
            where: {
              id: product.id,
              active: true,
              stockOnHand: { gte: item.quantity },
            },
            data: {
              stockOnHand: { decrement: item.quantity },
              stockReserved: { increment: item.quantity },
            },
          });

          if (reserved.count !== 1) {
            throw new CheckoutError(product.name + " is out of stock", 409);
          }

          totalAmount = totalAmount.plus(product.price.mul(item.quantity));
        }

        const user = await tx.user.upsert({
          where: { email: input.email },
          update: { name: input.name, phone: input.phone },
          create: { email: input.email, name: input.name, phone: input.phone },
        });

        return tx.order.create({
          data: {
            userId: user.id,
            totalAmount,
            paymentMethod: input.paymentMethod as "KHALTI" | "ESEWA",
            items: {
              create: input.items.map((item) => {
                const product = productById.get(item.productId)!;
                return {
                  productId: product.id,
                  quantity: item.quantity,
                  priceAt: product.price,
                };
              }),
            },
            payment: {
              create: {
                amount: totalAmount,
                provider: input.paymentMethod as "KHALTI" | "ESEWA",
              },
            },
          },
          include: { payment: true },
        });
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable }
    );

    createdOrderId = order.id;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    if (input.paymentMethod === "KHALTI") {
      const amountPaisa = Math.round(Number(order.totalAmount) * 100);
      const khaltiResponse = await initiateKhaltiPayment({
        return_url: siteUrl + "/checkout/success?gateway=khalti",
        website_url: siteUrl,
        amount: amountPaisa,
        purchase_order_id: order.id,
        purchase_order_name: "NepJewls Order " + order.id,
        customer_info: {
          name: input.name,
          email: input.email,
          phone: input.phone,
        },
      });

      if (!khaltiResponse?.pidx || !khaltiResponse?.payment_url) {
        throw new Error("Khalti did not return a payment identifier");
      }

      await prisma.payment.update({
        where: { orderId: order.id },
        data: { providerRef: String(khaltiResponse.pidx) },
      });

      return NextResponse.json(
        {
          orderId: order.id,
          paymentUrl: khaltiResponse.payment_url,
          paymentPayload: null,
        },
        { status: 201 }
      );
    }

    const esewa = createEsewaPayload(Number(order.totalAmount), order.id);
    await prisma.payment.update({
      where: { orderId: order.id },
      data: { providerRef: order.id },
    });

    return NextResponse.json(
      {
        orderId: order.id,
        paymentUrl: esewa.paymentUrl,
        paymentPayload: esewa.fields,
      },
      { status: 201 }
    );
  } catch (error) {
    if (createdOrderId) {
      try {
        await cancelAndReleaseReservation(createdOrderId);
      } catch (cleanupError) {
        console.error("Failed to release checkout reservation:", cleanupError);
      }
    }

    if (error instanceof CheckoutError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    console.error("Failed to create order:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
