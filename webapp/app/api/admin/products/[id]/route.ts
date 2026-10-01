import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "../../../../../lib/admin-auth";
import { prisma } from "../../../../../lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const data: Record<string, unknown> = {};

    if (body.name !== undefined) {
      const value = String(body.name).trim();
      if (value.length < 2 || value.length > 120) throw new Error("Invalid product name");
      data.name = value;
    }
    if (body.description !== undefined) {
      const value = String(body.description).trim();
      if (value.length < 10 || value.length > 4000) throw new Error("Invalid description");
      data.description = value;
    }
    if (body.image !== undefined) {
      const value = String(body.image).trim();
      if (!value.startsWith("/images/") && !/^https:\/\//.test(value)) throw new Error("Invalid image path");
      data.image = value;
    }
    if (body.category !== undefined) {
      const value = String(body.category).trim();
      if (!value || value.length > 120) throw new Error("Invalid category");
      data.category = value;
    }
    if (body.price !== undefined) {
      const value = Number(body.price);
      if (!Number.isFinite(value) || value <= 0) throw new Error("Invalid price");
      data.price = value;
    }
    if (body.stockOnHand !== undefined) {
      const value = Number(body.stockOnHand);
      if (!Number.isInteger(value) || value < 0 || value > 100000) throw new Error("Invalid stock");
      data.stockOnHand = value;
    }
    if (body.active !== undefined) {
      data.active = Boolean(body.active);
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    const product = await prisma.product.update({ where: { id }, data });
    return NextResponse.json({ ...product, price: Number(product.price) });
  } catch (error) {
    console.error("Product update failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update product" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    if (product.stockReserved > 0) {
      return NextResponse.json(
        { error: "Cannot archive a product with reserved stock" },
        { status: 409 }
      );
    }

    await prisma.product.update({
      where: { id },
      data: { active: false },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Product archive failed:", error);
    return NextResponse.json({ error: "Unable to archive product" }, { status: 500 });
  }
}
