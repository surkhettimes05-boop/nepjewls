"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ProductRow = {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stockOnHand: number;
  stockReserved: number;
  active: boolean;
};

export default function AdminProductManager({ products }: { products: ProductRow[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function request(url: string, options: RequestInit) {
    setError("");
    const response = await fetch(url, {
      ...options,
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Request failed");
    return data;
  }

  async function createProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy("new");
    try {
      const form = new FormData(event.currentTarget);
      await request("/api/admin/products", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(form.entries())),
      });
      event.currentTarget.reset();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create product");
    } finally {
      setBusy(null);
    }
  }

  async function updateProduct(event: React.FormEvent<HTMLFormElement>, id: string) {
    event.preventDefault();
    setBusy(id);
    try {
      const form = new FormData(event.currentTarget);
      await request("/api/admin/products/" + id, {
        method: "PATCH",
        body: JSON.stringify(Object.fromEntries(form.entries())),
      });
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update product");
    } finally {
      setBusy(null);
    }
  }

  async function archiveProduct(id: string) {
    if (!window.confirm("Archive this product from the storefront?")) return;
    setBusy(id);
    try {
      await request("/api/admin/products/" + id, { method: "DELETE" });
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to archive product");
    } finally {
      setBusy(null);
    }
  }

  const inputClass = "w-full bg-black/20 border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-[#D4AF37]";

  return (
    <div className="space-y-10">
      {error && <div className="border border-red-500/30 bg-red-500/10 p-4 text-red-300">{error}</div>}

      <form onSubmit={createProduct} className="bg-[#1A1614] border border-white/10 p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <input className={inputClass} name="sku" placeholder="SKU" required />
        <input className={inputClass} name="name" placeholder="Product name" required />
        <input className={inputClass} name="category" placeholder="Category" defaultValue="Signature" required />
        <input className={inputClass} name="price" type="number" min="0.01" step="0.01" placeholder="Price NPR" required />
        <input className={inputClass} name="stockOnHand" type="number" min="0" step="1" placeholder="Available stock" required />
        <input className={inputClass + " md:col-span-2"} name="image" placeholder="/images/product.jpg" required />
        <textarea className={inputClass + " md:col-span-2 xl:col-span-3"} name="description" placeholder="Description" minLength={10} required />
        <button disabled={busy === "new"} className="bg-[#D4AF37] text-black px-5 py-3 uppercase tracking-widest text-xs disabled:opacity-50">
          {busy === "new" ? "Saving..." : "Add product"}
        </button>
      </form>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {products.map((product) => (
          <form key={product.id} onSubmit={(event) => updateProduct(event, product.id)} className="bg-[#1A1614] border border-white/10 p-6 space-y-4">
            <div className="flex justify-between gap-4">
              <div>
                <div className="font-serif text-2xl text-white">{product.name}</div>
                <div className="text-[10px] uppercase tracking-widest text-[#8C857B]">{product.sku}</div>
              </div>
              <div className="text-right text-xs text-[#8C857B]">
                Reserved: {product.stockReserved}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input className={inputClass} name="name" defaultValue={product.name} required />
              <input className={inputClass} name="category" defaultValue={product.category} required />
              <input className={inputClass} name="price" type="number" min="0.01" step="0.01" defaultValue={product.price} required />
              <input className={inputClass} name="stockOnHand" type="number" min="0" step="1" defaultValue={product.stockOnHand} required />
              <input className={inputClass + " md:col-span-2"} name="image" defaultValue={product.image} required />
              <textarea className={inputClass + " md:col-span-2"} name="description" defaultValue={product.description} minLength={10} required />
            </div>
            <div className="flex gap-3">
              <button disabled={busy === product.id} className="bg-white text-black px-5 py-2 uppercase tracking-widest text-[10px] disabled:opacity-50">
                Save changes
              </button>
              <button
                type="button"
                disabled={busy === product.id || product.stockReserved > 0}
                onClick={() => archiveProduct(product.id)}
                className="border border-red-500/30 text-red-300 px-5 py-2 uppercase tracking-widest text-[10px] disabled:opacity-30"
              >
                Archive
              </button>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}
