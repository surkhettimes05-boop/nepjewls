import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "../../../../lib/admin-auth";
import { prisma } from "../../../../lib/prisma";

function parseProduct(body: any) {
  const sku = String(body?.sku || "").trim().toLowerCase();
  const name = String(body?.name || "").trim();
  const description = String(body?.description || "").trim();
  const image = String(body?.image || "").trim();
  const category = String(body?.category || "Signature").trim();
  const price = Number(body?.price);
  const stockOnHand = Number(body?.stockOnHand);

  if (!/^[a-z0-9][a-z0-9-]{2,79}$/.test(sku)) throw new Error("Invalid SKU");
  if (name.length < 2 || name.length > 120) throw new Error("Invalid product name");
  if (description.length < 10 || description.length > 4000) throw new Error("Invalid description");
  if (!image.startsWith("/images/") && !/^https:\/\//.test(image)) throw new Error("Invalid image path");
  if (!Number.isFinite(price) || price <= 0) throw new Error("Invalid price");
  if (!Number.isInteger(stockOnHand) || stockOnHand < 0 || stockOnHand > 100000) throw new Error("Invalid stock");
  if (!category || category.length > 120) throw new Error("Invalid category");

  return { sku, name, description, image, category, price, stockOnHand };
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const input = parseProduct(await request.json());
    const product = await prisma.product.create({
      data: {
        ...input,
        active: true,
      },
    });

    return NextResponse.json(
      { ...product, price: Number(product.price) },
      { status: 201 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create product";
    const status = message.includes("Unique constraint") ? 409 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
