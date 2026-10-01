import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { active: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      products.map((product) => ({
        ...product,
        price: Number(product.price),
        availableStock: Math.max(0, product.stockOnHand),
      }))
    );
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
