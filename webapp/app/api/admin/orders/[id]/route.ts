import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Prisma } from "@prisma/client";
import { prisma } from "../../../../../lib/prisma";
import { ADMIN_COOKIE_NAME, verifyAdminSession } from "../../../../../lib/admin-session";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const authenticated = await verifyAdminSession(
    cookieStore.get(ADMIN_COOKIE_NAME)?.value
  );

  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { status } = await request.json();
    const { id } = await params;
    const targetStatus = String(status || "").toUpperCase();

    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: true, payment: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.status === targetStatus) {
      return NextResponse.json(order);
    }

    if (order.status === "PENDING" && targetStatus === "CANCELLED") {
      const updated = await prisma.$transaction(
        async (tx) => {
          for (const item of order.items) {
            const released = await tx.product.updateMany({
              where: {
                id: item.productId,
                stockReserved: { gte: item.quantity },
              },
              data: {
                stockOnHand: { increment: item.quantity },
                stockReserved: { decrement: item.quantity },
              },
            });

            if (released.count !== 1) {
              throw new Error("Inventory reservation is inconsistent");
            }
          }

          if (order.payment) {
            await tx.payment.update({
              where: { id: order.payment.id },
              data: { status: "FAILED" },
            });
          }

          return tx.order.update({
            where: { id },
            data: { status: "CANCELLED" },
          });
        },
        { isolationLevel: Prisma.TransactionIsolationLevel.Serializable }
      );

      return NextResponse.json(updated);
    }

    if (order.status === "PAID" && targetStatus === "SHIPPED") {
      const updated = await prisma.order.update({
        where: { id },
        data: { status: "SHIPPED" },
      });
      return NextResponse.json(updated);
    }

    return NextResponse.json(
      { error: "Invalid order status transition" },
      { status: 409 }
    );
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json({ error: "Unable to update order" }, { status: 500 });
  }
}
