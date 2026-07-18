import { PrismaClient } from '@prisma/client';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import FadeInReveal from '../../components/FadeInReveal';
import Link from 'next/link';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export default async function BridalPage() {
  let products = await prisma.product.findMany({
    where: {
      category: {
        contains: 'Bridal'
      }
    }
  });

  if (products.length === 0) {
    products = await prisma.product.findMany({ take: 4 });
  }

  return (
    <main className="bg-luxury-bg text-luxury-text min-h-screen flex flex-col">
      <Navigation />
      
      {/* Romantic Bridal Hero - Atmospheric Depth */}
      <section className="relative w-full h-[85vh] flex flex-col justify-center items-center text-center overflow-hidden bg-[#1A1614]">
        <img 
          src="/images/hero_premium_light_1784305541092.jpg" 
          alt="Bridal Collection Hero" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        {/* Atmospheric Vignette */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-luxury-bg/50 to-luxury-bg z-10 pointer-events-none"></div>
        
        <div className="relative z-20 flex flex-col items-center justify-center w-full px-8 mt-24">
          <FadeInReveal delay={0.2} duration={1.6}>
            <span className="tracking-[0.4em] mb-8 text-[#E5E0D8] text-[10px] uppercase font-light drop-shadow-md">
              The Wedding Collection
            </span>
            <h1 className="font-serif text-6xl md:text-[110px] text-white leading-[0.95] mb-8 tracking-[-0.02em] drop-shadow-lg">
              Eternity,<br/>Realized.
            </h1>
            <p className="text-lg font-light text-[#E5E0D8] max-w-lg mx-auto drop-shadow-md">
              Rings and suites designed not just for a day, but for a lineage.
            </p>
          </FadeInReveal>
        </div>
      </section>

      {/* Bridal Products Grid - Asymmetrical Editorial Layout */}
      <section className="py-40 px-8 max-w-[1800px] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-32 lg:gap-x-24 lg:gap-y-48">
          {products.map((product, index) => {
            const isStaggered = index % 2 !== 0;
            
            return (
              <FadeInReveal key={product.id} delay={0.3 + (index % 2) * 0.2} duration={1.4}>
                <Link 
                  href={`/product/${product.sku}`} 
                  className={`group block cursor-none ${isStaggered ? 'md:mt-48' : ''}`}
                >
                  <div className="relative aspect-[3/4] overflow-hidden mb-10 bg-[#1A1614] border border-white/5" data-cursor="view">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.85,0,0.15,1)] group-hover:scale-[1.03] z-10 opacity-90 group-hover:opacity-100 grayscale-[20%] group-hover:grayscale-0" 
                    />
                    <div className="absolute inset-0 bg-radial-gradient from-transparent to-luxury-bg/30 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-[1400ms]"></div>
                  </div>
                  
                  <div className="flex flex-col items-start">
                    <h3 className="font-serif text-3xl mb-3 inline-block relative w-max tracking-[-0.01em]">
                      {product.name}
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
      </section>

      <Footer />
    </main>
  );
}
