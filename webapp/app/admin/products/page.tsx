import { prisma } from "../../../lib/prisma";
import { requireAdmin } from "../../../lib/admin-auth";
import AdminProductManager from "../../../components/AdminProductManager";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  await requireAdmin();

  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-serif text-4xl text-white mb-2">The Vault Inventory</h1>
        <p className="text-[#8C857B] font-light">
          Create products, update pricing and available stock, or archive pieces. Reserved stock cannot be archived.
        </p>
      </div>

      <AdminProductManager
        products={products.map((product) => ({
          id: product.id,
          sku: product.sku,
          name: product.name,
          description: product.description,
          price: Number(product.price),
          image: product.image,
          category: product.category,
          stockOnHand: product.stockOnHand,
          stockReserved: product.stockReserved,
          active: product.active,
        }))}
      />
    </div>
  );
}
