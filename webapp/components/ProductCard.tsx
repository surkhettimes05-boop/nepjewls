'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  primaryImage: string;
  secondaryImage: string;
}

export default function ProductCard({ id, name, price, primaryImage, secondaryImage }: ProductCardProps) {
  return (
    <Link href={`/product/${id}`} className="group block cursor-pointer">
      <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-luxury-champagne/20">
        {/* Primary Image */}
        <motion.img 
          src={primaryImage} 
          alt={name} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 z-10"
        />
        {/* Secondary Image for Hover Fade */}
        <motion.img 
          src={secondaryImage} 
          alt={`${name} Alternate`} 
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-1000 ease-in-out group-hover:opacity-100 z-20"
        />
      </div>

      <div className="flex flex-col items-center text-center">
        <h3 className="font-serif text-2xl text-luxury-charcoal relative inline-block overflow-hidden pb-1">
          {name}
          {/* Gold Underline Animation */}
          <span className="absolute bottom-0 left-0 w-full h-px bg-luxury-gold transform -translate-x-full transition-transform duration-700 ease-luxury-ease group-hover:translate-x-0"></span>
        </h3>
        
        {/* Price fades in softly */}
        <p className="luxury-tracking mt-3 text-luxury-charcoal/60 opacity-0 transform translate-y-2 transition-all duration-700 ease-luxury-ease group-hover:opacity-100 group-hover:translate-y-0">
          {price}
        </p>
      </div>
    </Link>
  );
}
