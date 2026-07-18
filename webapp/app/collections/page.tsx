import { PrismaClient } from '@prisma/client';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import FadeInReveal from '../../components/FadeInReveal';
import Link from 'next/link';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export default async function CollectionsPage() {
  const products = await prisma.product.findMany();

  return (
    <main className="bg-luxury-bg text-luxury-text min-h-screen flex flex-col">
      <Navigation />
      
      {/* The Breath Principle: Massive top padding */}
      <div className="flex-1 max-w-[1800px] w-full mx-auto px-8 pt-56 pb-40">
        
        <FadeInReveal delay={0.2} duration={1.4}>
          <div className="text-center mb-40">
            <span className="tracking-[0.4em] text-[#8C857B] text-[10px] mb-12 block uppercase font-light">
              The Curation
            </span>
            <h1 className="font-serif text-6xl md:text-[96px] leading-[1.1] tracking-[-0.02em]">
              The Masterpieces
            </h1>
          </div>
        </FadeInReveal>

        {products.length === 0 ? (
          <div className="text-center text-[#8C857B] py-32 font-light">
            No masterpieces available at this time.
          </div>
        ) : (
          /* Asymmetrical Staggered Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-32 lg:gap-x-24 lg:gap-y-48">
            {products.map((product, index) => {
              // Stagger every other item to create an editorial flow
              const isStaggered = index % 2 !== 0;
              
              return (
                <FadeInReveal key={product.id} delay={0.3 + (index % 2) * 0.2} duration={1.4}>
                  <Link 
                    href={`/product/${product.sku}`} 
                    className={`group block cursor-none ${isStaggered ? 'md:mt-48' : ''}`}
                  >
                    {/* Image Container with Sharp Geometries */}
                    <div className="relative aspect-[3/4] overflow-hidden mb-10 bg-[#1A1614] border border-white/5" data-cursor="view">
                      {/* Secondary Lifestyle Image (Revealed on Hover) */}
                      <img 
                        src="/images/campaign_editorial_1784294400298.jpg" 
                        alt={`${product.name} Lifestyle`} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.85,0,0.15,1)] group-hover:scale-100 scale-105 z-0 opacity-0 group-hover:opacity-60" 
                      />
                      {/* Primary Macro Image */}
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-[1400ms] ease-[cubic-bezier(0.85,0,0.15,1)] group-hover:scale-[1.05] z-10 opacity-100 group-hover:opacity-0" 
                      />
                      {/* Atmospheric Glow Overlay */}
                      <div className="absolute inset-0 bg-radial-gradient from-transparent to-luxury-bg/30 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-[1400ms]"></div>
                    </div>
                    
                    {/* Typography System */}
                    <div className="flex flex-col items-start">
                      <h3 className="font-serif text-3xl mb-3 inline-block relative w-max tracking-[-0.01em]">
                        {product.name}
                        {/* 1px Hairline Underline animation */}
                        <span className="absolute -bottom-1 left-0 w-full h-px bg-[#E5E0D8] transform scale-x-0 origin-left transition-transform duration-[1200ms] ease-[cubic-bezier(0.85,0,0.15,1)] group-hover:scale-x-100"></span>
                      </h3>
                      <div className="flex justify-between w-full items-center mt-2">
                        <span className="tracking-[0.3em] text-[#8C857B] text-[10px] uppercase font-light">{product.category}</span>
                        <span className="text-[#8C857B] font-light text-sm tracking-wide">Rs. {product.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </Link>
                </FadeInReveal>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
