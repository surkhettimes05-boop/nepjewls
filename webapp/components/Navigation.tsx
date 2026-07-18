'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

export default function Navigation() {
  const { cartCount, isMounted } = useCart();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isHome = pathname === '/';

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      // Hide on scroll down, reveal on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClasses = `fixed top-0 left-0 w-full z-50 py-6 md:py-8 transition-transform duration-[800ms] ease-[cubic-bezier(0.85,0,0.15,1)] ${
    hidden && !isMenuOpen ? '-translate-y-full' : 'translate-y-0'
  }`;

  const navBackgroundClasses = `absolute inset-0 transition-colors duration-[900ms] ease-out ${
    isScrolled ? 'bg-luxury-bg/95 backdrop-blur-md border-b hairline-border-b' : isMenuOpen ? 'bg-luxury-bg' : 'bg-transparent'
  }`;

  const linkClasses = `uppercase tracking-[0.4em] font-light text-[10px] text-luxury-text/70 hover:text-luxury-text relative group cursor-pointer transition-colors duration-300`;
  const logoClasses = `text-center flex-1 transition-colors duration-[900ms] ease-out text-luxury-text group cursor-pointer`;

  return (
    <>
      <nav className={navClasses}>
        <div className={navBackgroundClasses}></div>
        <div className="relative max-w-[1800px] mx-auto px-8 md:px-12 grid grid-cols-3 items-center h-[90px]">
          {/* Left Navigation (Desktop) */}
          <div className="hidden lg:flex gap-32 items-center justify-start">
            <Link href="/collections" className={linkClasses}>
              <span>Collections</span>
              <span className="absolute -bottom-2 left-0 w-full h-px bg-luxury-text transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </Link>
            <Link href="/bridal" className={linkClasses}>
              <span>Bridal</span>
              <span className="absolute -bottom-2 left-0 w-full h-px bg-luxury-text transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex justify-start">
            <div 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={linkClasses}
            >
              <span>{isMenuOpen ? 'Close' : 'Menu'}</span>
            </div>
          </div>
          
          {/* Center Logo */}
          <div className="flex justify-center">
            <Link href="/" className={logoClasses}>
              <Logo />
            </Link>
          </div>
          
          {/* Right Navigation (Desktop) */}
          <div className="hidden lg:flex gap-32 items-center justify-end">
            <Link href="/about" className={linkClasses}>
              <span>Heritage</span>
              <span className="absolute -bottom-2 left-0 w-full h-px bg-luxury-text transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </Link>
            <Link href="/account" className={linkClasses}>
              <span>Account</span>
              <span className="absolute -bottom-2 left-0 w-full h-px bg-luxury-text transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </Link>
            <Link href="/cart" className={linkClasses}>
              <span>Bag ({isMounted ? cartCount : 0})</span>
              <span className="absolute -bottom-2 left-0 w-full h-px bg-luxury-text transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </Link>
          </div>

          {/* Mobile Cart */}
          <div className="lg:hidden flex justify-end gap-8">
            <Link href="/cart" className={linkClasses}>Bag ({isMounted ? cartCount : 0})</Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.85, 0, 0.15, 1] }}
            className="fixed inset-0 top-[100px] bg-luxury-bg z-40 text-luxury-text overflow-y-auto lg:hidden"
          >
            <div className="px-8 py-16 flex flex-col gap-16 text-center">
              <Link href="/collections" className="font-serif text-4xl" onClick={() => setIsMenuOpen(false)}>Collections</Link>
              <Link href="/bridal" className="font-serif text-4xl" onClick={() => setIsMenuOpen(false)}>Bridal</Link>
              <Link href="/craftsmanship" className="font-serif text-4xl" onClick={() => setIsMenuOpen(false)}>Craftsmanship</Link>
              <Link href="/about" className="font-serif text-4xl" onClick={() => setIsMenuOpen(false)}>Heritage</Link>
              <Link href="/account" className="font-serif text-4xl" onClick={() => setIsMenuOpen(false)}>Account</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
