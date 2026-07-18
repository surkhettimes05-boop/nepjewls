import { PrismaClient } from '@prisma/client';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import AddToCartButton from '../../../components/AddToCartButton';
import ProductAccordion from '../../../components/ProductAccordion';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const prisma = new PrismaClient();

// This ensures dynamic parameters are available
export const dynamicParams = true;

// Pre-generate static parameters at build time for speed, if we want
export async function generateStaticParams() {
  const products = await prisma.product.findMany();
  return products.map((p) => ({ sku: p.sku }));
}

// Generate SEO meta tags dynamically
export async function generateMetadata({ params }: { params: Promise<{ sku: string }> }) {
  const resolvedParams = await params;
  const product = await prisma.product.findUnique({ where: { sku: resolvedParams.sku } });
  if (!product) return { title: 'Product Not Found - NepJewls' };
  return {
    title: `${product.name} | NepJewls Masterpieces`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ sku: string }> }) {
  const resolvedParams = await params;
  const product = await prisma.product.findUnique({ where: { sku: resolvedParams.sku } });

  if (!product) {
    notFound();
  }

  // Fetch 3 related products
  const relatedProducts = await prisma.product.findMany({
    where: { 
      id: { not: product.id },
      category: product.category
    },
    take: 3
  });

  const finalRelated = relatedProducts.length > 0 ? relatedProducts : await prisma.product.findMany({
    where: { id: { not: product.id } },
    take: 3
  });

  return (
    <main className="bg-luxury-bg text-luxury-text min-h-screen">
      <Navigation />
      
      {/* Editorial Split Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 min-h-screen">
        
        {/* Left Side: Sticky Atmospheric Image */}
        <div className="relative h-[65vh] xl:h-screen xl:sticky top-0 overflow-hidden bg-[#1A1614]">
          <img 
            src={product.image} 
            alt={product.name} 
            className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-[3s] ease-[cubic-bezier(0.85,0,0.15,1)] hover:scale-[1.03]"
          />
          {/* Atmospheric Vignette overlay to blend edge into the dark background */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-luxury-bg/80 z-10 pointer-events-none"></div>
          {/* Subtle gradient specifically fading out the right edge on desktop */}
          <div className="hidden xl:block absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-luxury-bg to-transparent z-10 pointer-events-none"></div>
        </div>

        {/* Right Side: Product Information */}
        <div className="flex flex-col justify-center px-8 lg:px-24 xl:px-32 py-24 xl:py-40 relative z-20 bg-luxury-bg">
          
          <span className="tracking-[0.4em] text-[#8C857B] text-[10px] mb-8 uppercase font-light">
            {product.category}
          </span>
          
          <h1 className="font-serif text-6xl xl:text-[80px] leading-[1.0] mb-12 tracking-[-0.02em]">
            {product.name}
          </h1>
          
          <div className="font-light text-[#8C857B] text-xl mb-16 tracking-wide">
            Rs. {product.price.toLocaleString()}
          </div>
          
          <p className="text-[#E5E0D8] font-light text-lg leading-[1.8] mb-24 max-w-lg opacity-90">
            {product.description}
          </p>

          <div className="mb-32">
            <AddToCartButton 
              product={{
                id: product.id,
                sku: product.sku,
                name: product.name,
                price: product.price,
                image: product.image
              }} 
            />
          </div>

          {/* Details Accordion (Interactive Concierge) */}
          <ProductAccordion />
        </div>
      </div>

      {/* Quiet Acclaim (Curated Testimonial) */}
      <section className="py-32 px-8 max-w-[1200px] mx-auto text-center border-b border-white/5">
        <span className="tracking-[0.4em] text-[#8C857B] text-[10px] mb-12 block uppercase font-light">
          Quiet Acclaim
        </span>
        <h2 className="font-serif text-3xl md:text-5xl leading-tight max-w-4xl mx-auto mb-12 text-[#E5E0D8]">
          &ldquo;It does not feel like jewelry. It feels like armor. The weight of the gold is an absolute revelation.&rdquo;
        </h2>
        <p className="text-[#8C857B] font-light tracking-widest text-[11px] uppercase">
          — A.D., Private Client
        </p>
      </section>

      {/* Related Products - Editorial Staggered Layout */}
      <section className="py-40 px-8 max-w-[1800px] mx-auto">
        <div className="text-center mb-32">
          <h2 className="font-serif text-5xl md:text-6xl tracking-[-0.02em]">Complementary Acquisitions</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-24">
          {finalRelated.map((related, index) => {
            const isStaggered = index === 1; // Drop the middle item
            
            return (
              <Link 
                href={`/product/${related.sku}`} 
                key={related.id} 
                className={`group block cursor-none ${isStaggered ? 'md:mt-32' : ''}`}
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-8 bg-[#1A1614] border border-white/5" data-cursor="view">
                  <img 
                    src={related.image} 
                    alt={related.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.85,0,0.15,1)] group-hover:scale-[1.03] z-10 opacity-90 group-hover:opacity-100 grayscale-[20%] group-hover:grayscale-0" 
                  />
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <h3 className="font-serif text-2xl mb-3 inline-block relative w-max">
                    {related.name}
                    <span className="absolute -bottom-1 left-0 w-full h-px bg-[#E5E0D8] transform scale-x-0 origin-left transition-transform duration-[1200ms] ease-[cubic-bezier(0.85,0,0.15,1)] group-hover:scale-x-100"></span>
                  </h3>
                  <span className="text-[#8C857B] font-light text-sm tracking-wide">Rs. {related.price.toLocaleString()}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}
