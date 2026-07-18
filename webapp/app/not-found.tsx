'use client';

import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import MagneticButton from '../components/MagneticButton';
import FadeInReveal from '../components/FadeInReveal';

export default function NotFound() {
  return (
    <main className="bg-luxury-bg text-luxury-text min-h-screen flex flex-col">
      <Navigation />
      
      <div className="flex-1 flex flex-col items-center justify-center text-center px-8 mt-24">
        <FadeInReveal>
          <span className="tracking-nav text-luxury-text-secondary text-[11px] mb-8 block uppercase">
            Page Not Found
          </span>
          <h1 className="font-serif text-5xl md:text-8xl leading-none mb-12">
            This collection<br/>is still being crafted.
          </h1>
          <p className="text-paragraph font-light text-luxury-text-secondary max-w-lg mx-auto mb-16">
            The page you are looking for does not exist or is currently being prepared by our artisans. Please return to our curated collections.
          </p>
          
          <div className="flex justify-center">
            <MagneticButton>
              <Link href="/" className="tracking-btn text-[14px] uppercase border border-luxury-text px-12 py-5 hover:bg-luxury-text hover:text-luxury-bg transition-colors duration-[400ms] inline-flex items-center justify-center group">
                Return to Maison
                <span className="inline-block transform transition-transform duration-[400ms] group-hover:translate-x-2 ml-4">→</span>
              </Link>
            </MagneticButton>
          </div>
        </FadeInReveal>
      </div>

      <Footer />
    </main>
  );
}
