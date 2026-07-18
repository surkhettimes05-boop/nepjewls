import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import Link from 'next/link';
import FadeInReveal from '../../components/FadeInReveal';

export default function AboutPage() {
  return (
    <main className="bg-luxury-bg text-luxury-text min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-32 px-8 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero_premium_editorial_1784304693078.jpg" 
            alt="NepJewls Craftsmanship" 
            className="w-full h-full object-cover opacity-40 grayscale-[30%]"
          />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-luxury-bg/80 to-luxury-bg z-10 pointer-events-none"></div>
        </div>
        
        <div className="relative z-20 max-w-4xl mx-auto text-center">
          <FadeInReveal delay={0.2} duration={1.6}>
            <span className="tracking-[0.4em] text-[#8C857B] text-[10px] mb-12 block uppercase font-light">
              The Heritage
            </span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-[100px] leading-[1.0] tracking-[-0.02em] mb-12 text-[#E5E0D8]">
              Forged in the Shadows of the Himalayas.
            </h1>
          </FadeInReveal>
        </div>
      </section>

      {/* Narrative Section 1 */}
      <section className="py-40 px-8 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <FadeInReveal delay={0.2} duration={1.2}>
            <div className="aspect-[3/4] relative overflow-hidden bg-black">
              <img 
                src="/images/product_signet_ring_1784343759398.jpg" 
                alt="The Signet" 
                className="w-full h-full object-cover opacity-90 transition-transform duration-[2s] hover:scale-[1.05]"
              />
            </div>
          </FadeInReveal>
          
          <div className="flex flex-col justify-center">
            <FadeInReveal delay={0.4} duration={1.2}>
              <span className="text-[#8C857B] font-mono text-[10px] tracking-widest uppercase mb-8 block">01 / The Philosophy</span>
              <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight text-[#E5E0D8]">A Secret Kept for Centuries.</h2>
              <p className="text-[#8C857B] font-light text-lg leading-[1.8] mb-8">
                For generations, the master karigars of Patan have beaten, shaped, and forged pure gold in the dark alleys of the Kathmandu Valley. Their techniques are not taught in modern academies; they are whispered from father to son.
              </p>
              <p className="text-[#8C857B] font-light text-lg leading-[1.8]">
                NepJewls was born from a singular obsession: to take this ancient, brutal craftsmanship and apply the most rigorous architectural restraint. The result is not merely jewelry. It is wearable armor.
              </p>
            </FadeInReveal>
          </div>
        </div>
      </section>

      {/* Narrative Section 2 (Flipped) */}
      <section className="py-40 px-8 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          
          <div className="flex flex-col justify-center order-2 md:order-1">
            <FadeInReveal delay={0.2} duration={1.2}>
              <span className="text-[#8C857B] font-mono text-[10px] tracking-widest uppercase mb-8 block">02 / The Materials</span>
              <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight text-[#E5E0D8]">Zero Compromise.</h2>
              <p className="text-[#8C857B] font-light text-lg leading-[1.8] mb-8">
                We reject the industry standard of hollowed-out bands and compromised alloys. Our gold is entirely cadmium-free, poured heavy to ensure a tactile, gravitational weight when worn. 
              </p>
              <p className="text-[#8C857B] font-light text-lg leading-[1.8]">
                Our diamonds are strictly GIA-certified, D-F color, Flawless to VVS clarity. Every stone is set in settings so minimal they border on the invisible, allowing the light to command the room.
              </p>
            </FadeInReveal>
          </div>

          <FadeInReveal delay={0.4} duration={1.2} className="order-1 md:order-2">
            <div className="aspect-[4/5] relative overflow-hidden bg-black">
              <img 
                src="/images/product_solitaire_diamond_1784343770631.jpg" 
                alt="The Solitaire" 
                className="w-full h-full object-cover opacity-90 transition-transform duration-[2s] hover:scale-[1.05]"
              />
            </div>
          </FadeInReveal>
        </div>
      </section>

      {/* The Hook */}
      <section className="py-40 px-8 max-w-[800px] mx-auto text-center border-t border-white/5">
        <FadeInReveal delay={0.2} duration={1.2}>
          <h2 className="font-serif text-4xl md:text-5xl mb-12 text-[#E5E0D8]">Your Legacy Awaits.</h2>
          <Link href="/collections" className="inline-block">
            <span className="tracking-[0.2em] text-[12px] uppercase border border-[#D4AF37] px-12 py-5 text-[#D4AF37] hover:bg-[#D4AF37]/5 transition-colors duration-[400ms] cursor-pointer">
              Explore The Masterpieces
            </span>
          </Link>
        </FadeInReveal>
      </section>

      <Footer />
    </main>
  );
}
