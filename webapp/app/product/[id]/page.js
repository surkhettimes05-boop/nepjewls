'use client';

import { use } from 'react';
import Navigation from "../../../components/Navigation";
import SpinViewer from "../../../components/SpinViewer";
import TrustBadge from "../../../components/TrustBadge";
import { getProductById } from "../../../lib/products";
import { useCart } from "../../../context/CartContext";

export default function ProductPage({ params }) {
  // In Next.js App Router, params is a Promise that needs to be unwrapped with React.use() in client components
  const { id } = use(params);
  
  const product = getProductById(id);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <>
        <Navigation />
        <div className="container" style={{ textAlign: 'center', padding: 'var(--space-7) 0' }}>
          <h1>Product Not Found</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      
      <main className="container" style={styles.grid}>
        {/* Left Column: Media */}
        <div style={styles.mediaColumn}>
          {product.has360 ? (
            <SpinViewer sku={product.id} totalFrames={36} />
          ) : (
            <img src={product.image} alt={product.name} style={styles.staticImage} />
          )}
        </div>

        {/* Right Column: Details & Cart */}
        <div style={styles.detailsColumn}>
          <h1 style={styles.title}>{product.name}</h1>
          <p style={styles.price}>NPR {product.price.toLocaleString()}</p>
          
          <div style={styles.divider}></div>
          
          <p style={styles.description}>{product.description}</p>
          
          <div style={styles.buttonGroup}>
            <button 
              style={styles.addToCartBtn} 
              onClick={() => {
                addToCart(product);
                alert(`${product.name} added to cart!`);
              }}
            >
              Add to Cart
            </button>

            <a 
              href={`https://wa.me/9779800000000?text=Hi!%20I'm%20interested%20in%20the%20${encodeURIComponent(product.name)}.`}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.whatsappBtn}
            >
              Ask about this piece (WhatsApp)
            </a>
          </div>
        </div>
      </main>

      <div style={{ marginTop: 'var(--space-7)' }}>
        <TrustBadge />
      </div>
    </>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 'var(--space-6)',
    paddingTop: 'var(--space-6)',
  },
  mediaColumn: {
    width: '100%',
  },
  staticImage: {
    width: '100%',
    aspectRatio: '4 / 5',
    objectFit: 'cover',
    borderRadius: 'var(--border-radius)',
    backgroundColor: '#FAFAFA',
  },
  detailsColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontSize: '3rem',
    marginBottom: 'var(--space-2)',
  },
  price: {
    fontSize: '1.5rem',
    color: 'var(--color-support)',
    marginBottom: 'var(--space-4)',
  },
  divider: {
    height: '1px',
    backgroundColor: 'rgba(27, 42, 58, 0.1)',
    marginBottom: 'var(--space-4)',
  },
  description: {
    fontSize: '1.2rem',
    marginBottom: 'var(--space-5)',
    opacity: 0.9,
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-3)',
  },
  addToCartBtn: {
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-neutral)',
    border: 'none',
    padding: 'var(--space-3)',
    fontSize: '1.2rem',
    fontWeight: 600,
    cursor: 'pointer',
    borderRadius: '4px',
    width: '100%',
    transition: 'opacity var(--duration-fast)',
  },
  whatsappBtn: {
    backgroundColor: '#25D366', // WhatsApp Brand Green
    color: 'white',
    textDecoration: 'none',
    textAlign: 'center',
    padding: 'var(--space-3)',
    fontSize: '1.2rem',
    fontWeight: 600,
    cursor: 'pointer',
    borderRadius: '4px',
    width: '100%',
    display: 'inline-block',
  }
};
