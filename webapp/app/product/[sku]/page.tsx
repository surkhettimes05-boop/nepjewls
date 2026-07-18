import { PrismaClient } from '@prisma/client';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import AddToCartButton from '../../../components/AddToCartButton';
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

  // Fetch 3 related products (random or same category)
  const relatedProducts = await prisma.product.findMany({
    where: { 
      id: { not: product.id },
      category: product.category
    },
    take: 3
  });

  // If we don't have enough in the same category, just fetch any
  const finalRelated = relatedProducts.length > 0 ? relatedProducts : await prisma.product.findMany({
    where: { id: { not: product.id } },
    take: 3
  });

  return (
    <main className="bg-luxury-bg text-luxury-text min-h-screen">
      <Navigation />
      
      {/* Editorial Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Side: Sticky Image */}
        <div className="relative h-[60vh] lg:h-screen lg:sticky top-0 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] ease-out hover:scale-105"
          />
        </div>

        {/* Right Side: Product Information */}
        <div className="flex flex-col justify-center px-8 lg:px-24 py-24 lg:py-40">
          <span className="tracking-nav text-luxury-text-secondary text-[11px] mb-8 uppercase">
            {product.category}
          </span>
          
          <h1 className="font-serif text-5xl lg:text-7xl leading-[0.9] mb-8">
            {product.name}
          </h1>
          
          <div className="font-light text-2xl mb-12">
            Rs. {product.price.toLocaleString()}
          </div>
          
          <p className="text-luxury-text-secondary font-light text-lg leading-relaxed mb-16 max-w-lg">
            {product.description}
          </p>

          <div className="mb-24">
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

          {/* Details Accordion (Static for now) */}
          <div className="border-t hairline-border-t">
            <div className="py-6 border-b hairline-border-b flex justify-between items-center cursor-pointer group">
              <span className="tracking-nav text-[12px] uppercase">Artisan Details</span>
              <span className="text-luxury-gold transition-transform group-hover:rotate-180">+</span>
            </div>
            <div className="py-6 border-b hairline-border-b flex justify-between items-center cursor-pointer group">
              <span className="tracking-nav text-[12px] uppercase">Shipping & Returns</span>
              <span className="text-luxury-gold transition-transform group-hover:rotate-180">+</span>
            </div>
            <div className="py-6 border-b hairline-border-b flex justify-between items-center cursor-pointer group">
              <span className="tracking-nav text-[12px] uppercase">Lifetime Warranty</span>
              <span className="text-luxury-gold transition-transform group-hover:rotate-180">+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="py-luxury-7 px-8 max-w-[1800px] mx-auto">
        <h2 className="text-section-title font-serif text-center mb-24">You May Also Admire</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {finalRelated.map((related) => (
            <Link href={`/product/${related.sku}`} key={related.id} className="group block cursor-none">
              <div className="relative aspect-[3/4] overflow-hidden mb-8" data-cursor="view">
                <img src={related.image} alt={related.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 z-10" />
              </div>
              
              <div className="flex flex-col text-center">
                <h3 className="font-serif text-2xl mb-2">{related.name}</h3>
                <span className="text-luxury-text font-light">Rs. {related.price.toLocaleString()}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
