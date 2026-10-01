import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "../../../../lib/prisma";
import { verifyKhaltiPayment } from "../../../../lib/khalti";
import {
  verifyEsewaPayment,
  verifyEsewaResponseSignature,
} from "../../../../lib/esewa";

function amountsMatch(a: unknown, b: unknown): boolean {
  const left = Math.round(Number(String(a).replace(/,/g, "")) * 100);
  const right = Math.round(Number(String(b).replace(/,/g, "")) * 100);
  return Number.isFinite(left) && Number.isFinite(right) && left === right;
}

async function finalizePaidOrder(
  orderId: string,
  transactionId: string,
  rawResponse: Record<string, unknown>
) {
  await prisma.$transaction(
    async (tx) => {
      const payment = await tx.payment.findUnique({
        where: { orderId },
        include: { order: { include: { items: true } } },
      });

      if (!payment) throw new Error("Payment record not found");
      if (payment.status === "VERIFIED") return;
      if (payment.order.status !== "PENDING") {
        throw new Error("Order is not awaiting payment");
      }

      for (const item of payment.order.items) {
        const released = await tx.product.updateMany({
          where: {
            id: item.productId,
            stockReserved: { gte: item.quantity },
          },
          data: {
            stockReserved: { decrement: item.quantity },
          },
        });

        if (released.count !== 1) {
          throw new Error("Inventory reservation is inconsistent");
        }
      }

      await tx.payment.update({
        where: { id: payment.id },
        data: {
          status: "VERIFIED",
          transactionId,
          verifiedAt: new Date(),
          rawResponse: rawResponse as Prisma.InputJsonValue,
        },
      });

      await tx.order.update({
        where: { id: orderId },
        data: { status: "PAID" },
      });
    },
    { isolationLevel: Prisma.TransactionIsolationLevel.Serializable }
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const gateway = String(body?.gateway || "").toLowerCase();
    const orderId = String(body?.orderId || "");

    if (!orderId || !["khalti", "esewa"].includes(gateway)) {
      return NextResponse.json({ error: "Invalid verification request" }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { payment: true },
    });

    if (!order?.payment) {
      return NextResponse.json({ error: "Order or payment record not found" }, { status: 404 });
    }

    if (order.payment.status === "VERIFIED") {
      return NextResponse.json({ success: true, message: "Payment already verified" });
    }

    const expectedProvider = gateway === "khalti" ? "KHALTI" : "ESEWA";
    if (order.payment.provider !== expectedProvider || order.paymentMethod !== expectedProvider) {
      return NextResponse.json({ error: "Payment provider mismatch" }, { status: 400 });
    }

    if (gateway === "khalti") {
      const pidx = String(body?.pidx || "");
      if (!pidx || !order.payment.providerRef || pidx !== order.payment.providerRef) {
        return NextResponse.json({ error: "Khalti payment reference mismatch" }, { status: 400 });
      }

      const response = await verifyKhaltiPayment(pidx);
      const expectedPaisa = Math.round(Number(order.payment.amount) * 100);

      if (
        response?.pidx !== pidx ||
        response?.status !== "Completed" ||
        Number(response?.total_amount) !== expectedPaisa ||
        !response?.transaction_id
      ) {
        return NextResponse.json({ error: "Khalti payment verification failed" }, { status: 400 });
      }

      await finalizePaidOrder(order.id, String(response.transaction_id), response);
      return NextResponse.json({ success: true, message: "Payment verified successfully" });
    }

    const encoded = String(body?.esewaData || "");
    if (!encoded) {
      return NextResponse.json({ error: "Missing eSewa response" }, { status: 400 });
    }

    let decoded: Record<string, unknown>;
    try {
      decoded = JSON.parse(Buffer.from(encoded, "base64").toString("utf-8"));
    } catch {
      return NextResponse.json({ error: "Invalid eSewa response" }, { status: 400 });
    }

    if (
      !verifyEsewaResponseSignature(decoded) ||
      decoded.status !== "COMPLETE" ||
      String(decoded.transaction_uuid || "") !== order.payment.providerRef ||
      !amountsMatch(decoded.total_amount, order.payment.amount)
    ) {
      return NextResponse.json({ error: "eSewa response integrity check failed" }, { status: 400 });
    }

    const statusResponse = await verifyEsewaPayment(
      Number(order.payment.amount),
      String(order.payment.providerRef)
    );

    if (
      statusResponse?.status !== "COMPLETE" ||
      !amountsMatch(statusResponse?.totalAmount ?? statusResponse?.total_amount, order.payment.amount)
    ) {
      return NextResponse.json({ error: "eSewa payment verification failed" }, { status: 400 });
    }

    const transactionId = String(
      decoded.transaction_code ||
      statusResponse?.refId ||
      statusResponse?.transaction_code ||
      ""
    );

    if (!transactionId) {
      return NextResponse.json({ error: "eSewa transaction identifier missing" }, { status: 400 });
    }

    await finalizePaidOrder(order.id, transactionId, {
      callback: decoded,
      status: statusResponse,
    });

    return NextResponse.json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    console.error("Payment Verification Error:", error);
    return NextResponse.json({ error: "Payment verification failed" }, { status: 500 });
  }
}
