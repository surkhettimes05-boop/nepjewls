'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-luxury-bg text-luxury-text py-32 px-8 border-t hairline-border-b">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center">
        
        {/* Brand Name */}
        <h2 className="font-serif text-[96px] mb-16 tracking-[0.1em]">
          NepJewls
        </h2>

        {/* Minimal Links */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 mb-32">
          <Link href="#" className="tracking-nav text-[12px] uppercase hover:text-luxury-gold transition-colors duration-luxury-base cursor-none">Instagram</Link>
          <Link href="#" className="tracking-nav text-[12px] uppercase hover:text-luxury-gold transition-colors duration-luxury-base cursor-none">Journal</Link>
          <Link href="#" className="tracking-nav text-[12px] uppercase hover:text-luxury-gold transition-colors duration-luxury-base cursor-none">Appointments</Link>
        </div>

        {/* Legal */}
        <div className="w-full flex flex-col items-center text-luxury-text-secondary text-[11px] tracking-widest gap-4">
          <p>© {new Date().getFullYear()} NepJewls. Handcrafted in Nepal.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-luxury-text transition-colors cursor-none">Privacy</Link>
            <Link href="#" className="hover:text-luxury-text transition-colors cursor-none">Terms</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
