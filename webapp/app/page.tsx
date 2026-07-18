'use client';

import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import FadeInReveal from '../components/FadeInReveal';
import MagneticButton from '../components/MagneticButton';
import Footer from '../components/Footer';
import Link from 'next/link';
import { useState, useEffect } from 'react';

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
    <main className="bg-luxury-bg text-luxury-text min-h-screen overflow-x-hidden selection:bg-luxury-gold/20">
      <Navigation />

      {/* 1. Hero Section (Restrained, 900px Max-Width, Dual CTAs) */}
      <section className="relative w-screen h-screen flex flex-col justify-center items-center text-center text-luxury-text overflow-hidden bg-luxury-bg">
        {/* Gentle Warm Vignette / Blur overlay */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-luxury-bg/10 to-luxury-bg/60 z-10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px] z-10 pointer-events-none"></div>
        
        <motion.div
          initial={{ scale: 1.1, y: 64 }}
          animate={{ scale: 1.05, y: 64 }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 w-full h-full z-0"
        >
          <img 
            src="/images/hero_premium_light_1784305541092.jpg" 
            alt="NepJewls Cinematic Hero" 
            className="w-full h-full object-cover opacity-80"
          />
        </motion.div>
        
        <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-[850px] px-8 mt-32">
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, delay: 0.5, ease: [0.85, 0, 0.15, 1] }}
            className="font-serif text-luxury-text tracking-tight mb-10 drop-shadow-[0_4px_32px_rgba(255,255,255,0.7)]"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: '1.25' }}
          >
            Timeless Beauty, Crafted in Nepal.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.8, delay: 1.0, ease: "easeOut" }}
            className="text-[20px] font-light max-w-lg text-[#3a3530] leading-[1.8] drop-shadow-sm"
          >
            Heirlooms forged in the heart of the Himalayas. We do not merely shape gold and diamond—we curate living legacies crafted to bear witness to your most profound moments.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.8, delay: 1.4, ease: "easeOut" }}
            className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-12"
          >
            <MagneticButton>
              <Link href="/collections" className="tracking-[0.2em] text-[12px] uppercase bg-luxury-text text-luxury-bg px-14 py-5 hover:bg-luxury-gold transition-colors duration-[600ms] flex items-center justify-center group cursor-pointer">
                Explore Collections
              </Link>
            </MagneticButton>
            
            <Link href="/account" className="tracking-[0.15em] text-[12px] uppercase text-luxury-text hover:text-luxury-gold transition-colors duration-[600ms] relative group py-2">
              Book Private Appointment
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
          <div className="flex items-center text-[10px] uppercase tracking-[0.3em] text-[#3a3530] text-center">
            <span className="px-6">Certified Gold</span>
            <span className="hidden sm:inline opacity-30">|</span>
            <span className="px-6">Lifetime Craftsmanship</span>
            <span className="hidden md:inline opacity-30">|</span>
            <span className="hidden md:inline px-6">Handmade in Nepal</span>
            <span className="hidden lg:inline opacity-30">|</span>
            <span className="hidden lg:inline px-6">Secure Delivery</span>
          </div>
        </motion.div>
      </section>

      {/* 2. The Heritage (Craftsmanship / Artisan Story) */}
      <section className="py-40 px-8 text-center flex items-center justify-center min-h-[80vh] bg-luxury-bg-secondary">
        <FadeInReveal>
          <span className="tracking-[0.25em] text-luxury-text-secondary mb-12 block text-[10px] uppercase">The Heritage</span>
          <h2 className="text-section-title md:text-[72px] font-serif leading-[1.1] max-w-[900px] mx-auto text-luxury-text">
            Jewelry should outlive trends.
          </h2>
          <p className="text-paragraph font-light text-luxury-text-secondary mt-12 max-w-2xl mx-auto leading-relaxed">
            Every NepJewls creation is handcrafted by artisans carrying generations of Nepalese craftsmanship. We do not manufacture; we sculpt light into gold.
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
            <span className="tracking-[0.25em] text-luxury-text-secondary mb-8 block text-[10px] uppercase">Curated Masterpieces</span>
            <h2 className="text-section-title font-serif text-luxury-text">The Collections</h2>
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

      {/* 4. Authenticity & Care (Trust Sections) */}
      <section className="py-40 bg-luxury-dark text-white">
        <div className="max-w-[1400px] mx-auto px-8">
          <FadeInReveal>
            <div className="text-center mb-24">
              <span className="tracking-[0.25em] text-luxury-gold mb-8 block text-[10px] uppercase">Uncompromising Standards</span>
              <h2 className="text-section-title font-serif">A Promise of Eternity</h2>
            </div>
          </FadeInReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <FadeInReveal delay={0.1}>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border border-luxury-gold/30 rounded-full flex items-center justify-center mb-8 text-luxury-gold text-2xl font-serif">I</div>
                <h3 className="font-serif text-3xl mb-4">GIA Certified</h3>
                <p className="font-light text-white/60 leading-relaxed max-w-xs mx-auto">
                  Every diamond over 0.5 carats is accompanied by a GIA grading report, ensuring the highest standards of integrity.
                </p>
              </div>
            </FadeInReveal>

            <FadeInReveal delay={0.3}>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border border-luxury-gold/30 rounded-full flex items-center justify-center mb-8 text-luxury-gold text-2xl font-serif">II</div>
                <h3 className="font-serif text-3xl mb-4">Lifetime Warranty</h3>
                <p className="font-light text-white/60 leading-relaxed max-w-xs mx-auto">
                  We stand by our craftsmanship. Complimentary cleaning, prong checks, and polishing for the lifetime of your piece.
                </p>
              </div>
            </FadeInReveal>

            <FadeInReveal delay={0.5}>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border border-luxury-gold/30 rounded-full flex items-center justify-center mb-8 text-luxury-gold text-2xl font-serif">III</div>
                <h3 className="font-serif text-3xl mb-4">Maison Packaging</h3>
                <p className="font-light text-white/60 leading-relaxed max-w-xs mx-auto">
                  Presented in our signature handcrafted wooden boxes, sealed with wax, reflecting the gravity of the treasure inside.
                </p>
              </div>
            </FadeInReveal>
          </div>
        </div>
      </section>

      {/* 5. Editorial Press (Trust) */}
      <section className="py-32 px-8 bg-luxury-bg border-b hairline-border-b">
        <div className="max-w-[1400px] mx-auto text-center">
          <FadeInReveal>
            <p className="font-serif text-3xl md:text-5xl max-w-4xl mx-auto leading-[1.3] text-luxury-text mb-16">
              "NepJewls is quietly redefining high jewelry by returning to the slow, painstaking methods of the ancient Newari masters."
            </p>
            <span className="tracking-[0.25em] text-luxury-text-secondary text-[11px] uppercase">
              — The Editorial Standard
            </span>
          </FadeInReveal>
        </div>
      </section>

      {/* 6. Private Consultation (High-Touch Close) */}
      <section className="py-40 px-8 text-center bg-luxury-bg-secondary">
        <FadeInReveal>
          <div className="max-w-2xl mx-auto">
            <span className="tracking-[0.25em] text-luxury-text-secondary mb-12 block text-[10px] uppercase">Bespoke Services</span>
            <h2 className="font-serif text-5xl md:text-7xl mb-12 text-luxury-text">
              Commission a Masterpiece
            </h2>
            <p className="text-paragraph font-light text-luxury-text-secondary mb-16 max-w-lg mx-auto">
              Work directly with our master artisans to bring your most intimate visions to life in pure gold and conflict-free diamonds.
            </p>
            <MagneticButton>
              <Link href="/account" className="inline-block tracking-[0.2em] text-[12px] uppercase bg-luxury-text text-luxury-bg px-12 py-5 hover:bg-luxury-gold transition-colors duration-[600ms] cursor-none">
                Request Consultation
              </Link>
            </MagneticButton>
          </div>
        </FadeInReveal>
      </section>

      <Footer />
    </main>
  );
}
