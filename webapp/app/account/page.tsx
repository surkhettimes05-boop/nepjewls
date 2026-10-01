import Link from "next/link";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

export default function AccountPage() {
  return (
    <main className="bg-luxury-bg text-luxury-text min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-1 max-w-[900px] w-full mx-auto px-8 pt-48 pb-32 text-center">
        <span className="tracking-[0.4em] text-luxury-text-secondary text-[10px] uppercase">
          Private Client Portal
        </span>
        <h1 className="font-serif text-5xl md:text-7xl mt-8 mb-8">Client accounts are coming soon.</h1>
        <p className="text-luxury-text-secondary font-light text-lg leading-relaxed max-w-2xl mx-auto mb-12">
          We are not showing placeholder customer records. Until authenticated accounts are launched, order support and private viewing requests are handled directly by the NepJewls team.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/collections" className="border border-luxury-text px-8 py-4 text-xs uppercase tracking-[0.2em]">
            Browse collection
          </Link>
          <Link href="/" className="border border-luxury-gold text-luxury-gold px-8 py-4 text-xs uppercase tracking-[0.2em]">
            Return home
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
