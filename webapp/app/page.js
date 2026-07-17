import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import TrustBadge from "../components/TrustBadge";
import SpinViewer from "../components/SpinViewer";
import ScrollStory from "../components/ScrollStory";
import ProductCard from "../components/ProductCard";
import { products } from "../lib/products";

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <TrustBadge />
      
      <main className="container" style={{ padding: 'var(--space-7) var(--space-4)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-5)' }}>Featured Collection</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-7)' }}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-5)' }}>SpinViewer Demo (PDP)</h2>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <SpinViewer sku="preview" totalFrames={36} />
        </div>
      </main>

      <ScrollStory />
    </>
  );
}
