import { PrismaClient } from '@prisma/client';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import Link from 'next/link';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export default async function BridalPage() {
  // Try to find products specifically categorized as Bridal or Wedding.
  // If none exist yet (since we are using placeholder data), we will just fallback to all products.
  let products = await prisma.product.findMany({
    where: {
      category: {
        contains: 'Bridal' // Case-insensitive matching depends on DB, but SQLite might be exact.
      }
    }
  });

  // Fallback if no bridal products exist in the DB yet
  if (products.length === 0) {
    products = await prisma.product.findMany({ take: 4 });
  }

  return (
    <main className="bg-luxury-bg text-luxury-text min-h-screen flex flex-col">
      <Navigation />
      
      {/* Romantic Bridal Hero */}
      <section className="relative w-full h-[70vh] flex flex-col justify-center items-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-white/30 z-10"></div>
        <img 
          src="/images/hero_premium_light_1784305541092.jpg" 
          alt="Bridal Collection Hero" 
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        
        <div className="relative z-20 flex flex-col items-center justify-center w-full px-8 mt-24">
          <span className="tracking-nav mb-8 text-luxury-text-secondary text-[11px] uppercase">
            The Wedding Collection
          </span>
          <h1 className="font-serif text-5xl md:text-8xl text-luxury-text leading-[0.9] mb-8">
            Eternity,<br/>Realized.
          </h1>
          <p className="text-paragraph font-light text-luxury-text-secondary max-w-md">
            Rings and suites designed not just for a day, but for a lineage.
          </p>
        </div>
      </section>

      {/* Bridal Products Grid */}
      <section className="py-luxury-7 px-8 max-w-[1800px] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {products.map((product) => (
            <Link href={`/product/${product.sku}`} key={product.id} className="group block cursor-none">
              <div className="relative aspect-[3/4] overflow-hidden mb-8" data-cursor="view">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 z-10" 
                />
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-1000 ease-out group-hover:opacity-100 z-20 grayscale" 
                />
              </div>
              
              <div className="flex flex-col text-center items-center">
                <h3 className="font-serif text-2xl mb-2 group-hover:text-luxury-gold transition-colors duration-luxury-base">
                  {product.name}
                </h3>
                <span className="text-luxury-text font-light">Rs. {product.price.toLocaleString()}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
