import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end border-b border-white/10 pb-6">
        <div>
          <h1 className="font-serif text-4xl text-white mb-2">The Vault Inventory</h1>
          <p className="text-[#8C857B] font-light">Manage your masterpiece collections.</p>
        </div>
        <button className="tracking-widest text-[10px] uppercase bg-[#D4AF37] text-black px-6 py-3 hover:bg-white transition-colors cursor-pointer">
          + Add Masterpiece
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-[#1A1614] border border-white/10 group">
            <div className="aspect-[3/4] relative overflow-hidden border-b border-white/10">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-[1.05]" 
              />
              <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 text-[10px] tracking-widest text-[#D4AF37] uppercase border border-white/10">
                {product.category}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="font-serif text-xl text-white mb-2 truncate" title={product.name}>{product.name}</h3>
              <div className="flex justify-between items-end mt-4">
                <span className="text-[#8C857B] font-light text-sm">Rs. {product.price.toLocaleString()}</span>
                <span className="text-[10px] uppercase tracking-widest text-[#8C857B] font-mono">SKU: {product.sku}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 border-t border-white/10 text-center text-[10px] uppercase tracking-widest">
              <button className="py-4 text-[#8C857B] hover:text-white transition-colors border-r border-white/10">Edit</button>
              <button className="py-4 text-red-400 hover:text-red-300 transition-colors">Archive</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
