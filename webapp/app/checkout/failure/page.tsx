import Link from "next/link";
import Navigation from "../../../components/Navigation";
import Footer from "../../../components/Footer";

export default function CheckoutFailurePage() {
  return (
    <main className="bg-luxury-bg text-luxury-text min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-1 flex items-center justify-center px-8 pt-32 pb-24">
        <div className="max-w-xl text-center">
          <h1 className="font-serif text-5xl mb-6">Payment not completed</h1>
          <p className="text-luxury-text-secondary font-light mb-10">
            No successful payment was recorded. You can return to checkout and try again.
          </p>
          <Link href="/checkout" className="inline-block border border-luxury-text px-10 py-4 uppercase tracking-[0.2em] text-xs">
            Return to checkout
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
