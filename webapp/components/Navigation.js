'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function Navigation() {
  const { cartCount, isMounted } = useCart();

  return (
    <nav style={styles.nav}>
      <div className="container" style={styles.container}>
        <div style={styles.menu}>Menu</div>
        <Link href="/" style={styles.logo}>NepJewls</Link>
        <Link href="/cart" style={styles.cart}>
          Cart ({isMounted ? cartCount : 0})
        </Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    position: 'sticky',
    top: 0,
    backgroundColor: 'var(--color-neutral)',
    borderBottom: '1px solid rgba(27, 42, 58, 0.1)',
    zIndex: 100,
    padding: 'var(--space-4) 0',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontFamily: 'var(--font-playfair)',
    fontSize: '2rem',
    fontWeight: 700,
    letterSpacing: '1px',
    color: 'var(--color-primary)',
  },
  menu: {
    fontSize: '1.2rem',
    cursor: 'pointer',
  },
  cart: {
    fontSize: '1.2rem',
    cursor: 'pointer',
  }
};
