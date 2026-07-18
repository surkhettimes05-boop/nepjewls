'use client';

import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import FadeInReveal from '../components/FadeInReveal';
import MagneticButton from '../components/MagneticButton';
import Footer from '../components/Footer';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import DigitalVitrine from '../components/Canvas/DigitalVitrine';

// Define the shape of our Prisma Product model
interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
      })
      .catch(err => console.error("Failed to load products:", err));
  }, []);

  // Use a subset for editorial display
  const editorialProducts = products.slice(0, 4);

  return (
    <main className="bg-transparent text-luxury-text min-h-screen overflow-x-hidden selection:bg-luxury-gold/20 relative">
      {/* 3D WebGL Background Canvas */}
      <DigitalVitrine />

      <div className="relative z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <Navigation />
        </div>

        {/* 1. Hero Section (Transparent to show 3D) */}
        <section className="relative w-screen h-[120vh] flex flex-col justify-start items-center text-center text-luxury-text pt-40 pb-20">
          
          <div className="relative z-20 flex flex-col items-center justify-start w-full max-w-[850px] px-8 pointer-events-auto">
            
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.6, delay: 0.5, ease: [0.85, 0, 0.15, 1] }}
              className="font-serif text-[#E5E0D8] tracking-tight mb-10 drop-shadow-[0_4px_32px_rgba(0,0,0,0.8)] mix-blend-difference"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: '1.25' }}
            >
              Forged in the Shadows.
            </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.8, delay: 1.0, ease: "easeOut" }}
            className="text-[20px] font-light max-w-lg text-[#3a3530] leading-[1.8] drop-shadow-sm"
          >
            Where ancient Newari mastery meets modern architectural restraint. We do not manufacture jewelry; we curate eternal legacies.
          </motion.p>
          
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.8, delay: 1.4, ease: "easeOut" }}
              className="mt-32 flex flex-col sm:flex-row items-center justify-center gap-12"
            >
              <MagneticButton>
                <Link href="/collections" className="tracking-[0.2em] text-[12px] uppercase bg-luxury-text text-luxury-bg px-14 py-5 hover:bg-luxury-gold transition-colors duration-[600ms] flex items-center justify-center group cursor-pointer backdrop-blur-sm bg-opacity-90">
                  Explore The Masterpieces
                </Link>
              </MagneticButton>
              
              <Link href="/account" className="tracking-[0.15em] text-[12px] uppercase text-luxury-text hover:text-luxury-gold transition-colors duration-[600ms] relative group py-2 drop-shadow-md">
                Request Private Viewing
                <span className="absolute bottom-0 left-0 w-full h-px bg-luxury-text transform scale-x-0 origin-left transition-transform duration-[600ms] group-hover:scale-x-100"></span>
              </Link>
            </motion.div>
          </div>

        {/* Luxury Trust Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.0, delay: 1.8, ease: "easeOut" }}
          className="absolute bottom-16 z-20 w-full flex justify-center"
        >
          <div className="flex items-center text-[10px] uppercase tracking-[0.3em] text-[#E5E0D8] text-center drop-shadow-lg mix-blend-difference pointer-events-auto">
            <span className="px-6">Certified Provenance</span>
            <span className="hidden sm:inline opacity-30">|</span>
            <span className="px-6">Conflict-Free Diamonds</span>
            <span className="hidden md:inline opacity-30">|</span>
            <span className="hidden md:inline px-6">Lifetime Legacy Maintenance</span>
          </div>
        </motion.div>
      </section>

      {/* Solidify background for subsequent sections to improve readability */}
      <div className="relative z-20 pointer-events-auto bg-luxury-bg">

      {/* 2. The Heritage (Craftsmanship / Artisan Story) */}
      <section className="py-40 px-8 text-center flex items-center justify-center min-h-[80vh] bg-luxury-bg-secondary">
        <FadeInReveal>
          <span className="tracking-[0.25em] text-luxury-text-secondary mb-12 block text-[10px] uppercase">The Heritage</span>
          <h2 className="text-section-title md:text-[72px] font-serif leading-[1.1] max-w-[900px] mx-auto text-luxury-text">
            A Secret Kept for Centuries.
          </h2>
          <p className="text-paragraph font-light text-luxury-text-secondary mt-12 max-w-2xl mx-auto leading-relaxed">
            In the hidden courtyards of the Kathmandu Valley, master karigars have forged gold for deities, emperors, and kings using techniques passed down in unbroken lineages. NepJewls was born to unveil this ancient mastery to the modern world. We take the spiritual depth and raw perfection of Himalayan craftsmanship and distill it into uncompromising, contemporary elegance.
          </p>
          <div className="mt-16">
            <Link href="/craftsmanship" className="tracking-[0.15em] text-[11px] uppercase text-luxury-text border-b border-luxury-text pb-1 hover:text-luxury-gold hover:border-luxury-gold transition-colors duration-500">
              Discover Our Process
            </Link>
          </div>
        </FadeInReveal>
      </section>

      {/* 3. The Masterpieces (Oversized Editorial Product Cards) */}
      <section className="py-40 px-8 max-w-[1800px] mx-auto">
        <FadeInReveal>
          <div className="text-center mb-32">
            <span className="tracking-[0.25em] text-luxury-text-secondary mb-8 block text-[10px] uppercase">The Signatures</span>
            <h2 className="text-section-title font-serif text-luxury-text">The Icons</h2>
          </div>
        </FadeInReveal>

        <div className="space-y-40">
          {editorialProducts.map((product, index) => (
            <div key={product.id} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 lg:gap-32`}>
              
              <div className="w-full lg:w-1/2">
                <FadeInReveal delay={0.1}>
                  <Link href={`/product/${product.sku}`} className="group block relative aspect-[4/5] overflow-hidden cursor-none" data-cursor="view">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] ease-out group-hover:scale-105 z-10" 
                    />
                    <div className="absolute inset-0 bg-black/5 z-20 group-hover:bg-transparent transition-colors duration-1000"></div>
                  </Link>
                </FadeInReveal>
              </div>

              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <FadeInReveal delay={0.2}>
                  <span className="tracking-[0.2em] text-luxury-text-secondary text-[10px] uppercase mb-6 block">
                    {product.category}
                  </span>
                  <h3 className="font-serif text-5xl lg:text-7xl mb-8 leading-[1.1] text-luxury-text">
                    {product.name}
                  </h3>
                  <p className="text-luxury-text-secondary font-light text-xl leading-relaxed mb-12 max-w-lg">
                    {product.description}
                  </p>
                  <MagneticButton>
                    <Link href={`/product/${product.sku}`} className="inline-block tracking-[0.2em] text-[12px] uppercase border border-luxury-text px-10 py-4 text-luxury-text hover:bg-luxury-text hover:text-luxury-bg transition-colors duration-[600ms] cursor-none">
                      View Piece
                    </Link>
                  </MagneticButton>
                </FadeInReveal>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 4. Craftsmanship (The Process) */}
      <section className="py-40 bg-luxury-dark text-white">
        <div className="max-w-[1400px] mx-auto px-8">
          <FadeInReveal>
            <div className="text-center mb-24">
              <span className="tracking-[0.25em] text-luxury-gold mb-8 block text-[10px] uppercase">The Process</span>
              <h2 className="text-section-title font-serif">The Weight of Perfection</h2>
            </div>
          </FadeInReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <FadeInReveal delay={0.1}>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border border-luxury-gold/30 rounded-full flex items-center justify-center mb-8 text-luxury-gold text-2xl font-serif">I</div>
                <h3 className="font-serif text-3xl mb-4">Forged in Silence</h3>
                <p className="font-light text-white/60 leading-relaxed max-w-xs mx-auto">
                  We reject the sterile speed of mass production. Every NepJewls piece is born from fire and absolute silence.
                </p>
              </div>
            </FadeInReveal>

            <FadeInReveal delay={0.3}>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border border-luxury-gold/30 rounded-full flex items-center justify-center mb-8 text-luxury-gold text-2xl font-serif">II</div>
                <h3 className="font-serif text-3xl mb-4">Ancient Secrets</h3>
                <p className="font-light text-white/60 leading-relaxed max-w-xs mx-auto">
                  Our karigars spend hundreds of hours coaxing raw metal into fluid geometry, utilizing metallurgical secrets preserved for generations.
                </p>
              </div>
            </FadeInReveal>

            <FadeInReveal delay={0.5}>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border border-luxury-gold/30 rounded-full flex items-center justify-center mb-8 text-luxury-gold text-2xl font-serif">III</div>
                <h3 className="font-serif text-3xl mb-4">Human Devotion</h3>
                <p className="font-light text-white/60 leading-relaxed max-w-xs mx-auto">
                  You are not buying a simple accessory; you are inheriting a physical manifestation of uncompromising human devotion.
                </p>
              </div>
            </FadeInReveal>
          </div>
        </div>
      </section>

      {/* 5. Reviews */}
      <section className="py-32 px-8 bg-luxury-bg border-b hairline-border-b">
        <div className="max-w-[1400px] mx-auto text-center">
          <FadeInReveal>
            <span className="tracking-[0.25em] text-luxury-text-secondary mb-12 block text-[10px] uppercase">Quiet Acclaim</span>
            <p className="font-serif text-3xl md:text-5xl max-w-4xl mx-auto leading-[1.3] text-luxury-text mb-16">
              "It does not feel like jewelry. It feels like armor. The weight and the finish are unlike anything I have purchased in Paris or Geneva."
            </p>
            <span className="tracking-[0.25em] text-luxury-text-secondary text-[11px] uppercase">
              — A.D., Private Client
            </span>
          </FadeInReveal>
        </div>
      </section>

      {/* 6. The Newsletter (Lead Capture) */}
      <section className="py-40 px-8 text-center bg-luxury-bg-secondary">
        <FadeInReveal>
          <div className="max-w-2xl mx-auto">
            <span className="tracking-[0.25em] text-luxury-text-secondary mb-12 block text-[10px] uppercase">The Inner Circle</span>
            <h2 className="font-serif text-5xl md:text-7xl mb-12 text-luxury-text">
              An Invitation to the Exclusive
            </h2>
            <p className="text-paragraph font-light text-luxury-text-secondary mb-16 max-w-lg mx-auto">
              Join our private ledger to receive privileged access to 1-of-1 museum-quality creations, private salon appointments, and the untold stories of our master karigars.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your private email address" 
                className="w-full bg-transparent border-b border-luxury-text/20 py-4 px-2 text-center text-luxury-text placeholder:text-luxury-text-secondary/50 focus:outline-none focus:border-luxury-gold transition-colors duration-500 font-light"
              />
              <button className="whitespace-nowrap tracking-[0.2em] text-[12px] uppercase bg-luxury-text text-luxury-bg px-8 py-4 hover:bg-luxury-gold transition-colors duration-[600ms] cursor-none mt-8 md:mt-0">
                Request Access
              </button>
            </div>
          </div>
        </FadeInReveal>
      </section>

      </div>
      </div>
    </main>
  );
}
