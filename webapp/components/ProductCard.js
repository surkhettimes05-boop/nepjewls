import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.id}`} className="product-card" style={styles.card}>
      <div style={styles.imageWrapper}>
        <img src={product.image} alt={product.name} style={styles.image} />
        {product.hoverImage && (
          <img src={product.hoverImage} alt={`${product.name} alternate angle`} style={styles.hoverImage} />
        )}
      </div>
      <div style={styles.info}>
        <h3 style={styles.title}>{product.name}</h3>
        <p style={styles.price}>NPR {product.price.toLocaleString()}</p>
      </div>
    </Link>
  );
}

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-3)',
    cursor: 'pointer',
    group: 'product-card', // Placeholder for logical grouping if we used tailwind, but we use pure CSS below
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    aspectRatio: '4 / 5',
    backgroundColor: '#FAFAFA',
    borderRadius: 'var(--border-radius)',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity var(--duration-base) var(--ease-premium)',
  },
  hoverImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: 0,
    transition: 'opacity var(--duration-base) var(--ease-premium), transform var(--duration-slow) var(--ease-premium)',
    transform: 'scale(1.05)',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-1)',
  },
  title: {
    fontFamily: 'var(--font-inter)',
    fontSize: '1.1rem',
    fontWeight: 600,
    margin: 0,
  },
  price: {
    fontFamily: 'var(--font-inter)',
    fontSize: '1rem',
    color: 'var(--color-support)',
    margin: 0,
  }
};
