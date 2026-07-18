import { PrismaClient } from '@prisma/client';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import Link from 'next/link';

const prisma = new PrismaClient();

// Disable caching for the collections page so new products show immediately
export const dynamic = 'force-dynamic';

export default async function CollectionsPage() {
  const products = await prisma.product.findMany();

  return (
    <main className="bg-luxury-bg text-luxury-text min-h-screen flex flex-col">
      <Navigation />
      
      <div className="flex-1 max-w-[1800px] w-full mx-auto px-8 pt-40 pb-24">
        
        <div className="text-center mb-24">
          <span className="tracking-nav text-luxury-text-secondary text-[11px] mb-8 block uppercase">
            Curated For You
          </span>
          <h1 className="font-serif text-5xl md:text-7xl leading-none">
            The Masterpieces
          </h1>
        </div>

        {products.length === 0 ? (
          <div className="text-center text-luxury-text-secondary py-32">
            No masterpieces available at this time.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {products.map((product) => (
              <Link href={`/product/${product.sku}`} key={product.id} className="group block cursor-none">
                <div className="relative aspect-[3/4] overflow-hidden mb-8" data-cursor="view">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 z-10" 
                  />
                  {/* Secondary Image Simulation */}
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-1000 ease-out group-hover:opacity-100 z-20 grayscale" 
                  />
                </div>
                
                <div className="flex flex-col">
                  <h3 className="font-serif text-2xl mb-2 inline-block relative w-max">
                    {product.name}
                    <span className="absolute bottom-0 left-0 w-full h-px bg-luxury-gold transform scale-x-0 origin-left transition-transform duration-[800ms] ease-[cubic-bezier(0.85,0,0.15,1)] group-hover:scale-x-100"></span>
                  </h3>
                  <span className="tracking-nav text-luxury-text-secondary text-[10px] mb-4">{product.category}</span>
                  <span className="text-luxury-text font-light">Rs. {product.price.toLocaleString()}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
