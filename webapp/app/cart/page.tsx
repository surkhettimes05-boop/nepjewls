'use client';

import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import { useCart } from "../../context/CartContext";
import Link from "next/link";
import MagneticButton from "../../components/MagneticButton";

export default function CartPage() {
  const { cart, removeFromCart, cartTotal, isMounted } = useCart();

  if (!isMounted) return null; // Prevent hydration mismatch

  return (
    <main className="bg-luxury-bg text-luxury-text min-h-screen flex flex-col">
      <Navigation />
      
      <div className="flex-1 max-w-[1400px] mx-auto w-full px-8 pt-40 pb-24">
        <h1 className="font-serif text-5xl md:text-7xl mb-16 border-b hairline-border-b pb-8">
          {cart.length === 0 ? 'Your Vault is Empty' : 'Your Selected Acquisitions'}
        </h1>
        
        {cart.length === 0 ? (
          <div className="text-center py-32">
            <p className="text-luxury-text-secondary font-light text-xl mb-12">A blank canvas awaits. Discover masterpieces that will become the anchor of your legacy.</p>
            <Link href="/collections">
              <MagneticButton>
                <span className="tracking-[0.2em] text-[12px] uppercase border border-luxury-gold px-12 py-5 text-luxury-gold hover:bg-luxury-gold/5 inline-block transition-colors duration-[400ms] cursor-pointer">
                  Discover Masterpieces
                </span>
              </MagneticButton>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32">
            
            {/* Items List */}
            <div className="lg:col-span-8 flex flex-col gap-12">
              {cart.map((item: any) => (
                <div key={item.id} className="flex gap-8 pb-12 border-b hairline-border-b group">
                  <div className="w-32 h-40 md:w-48 md:h-64 overflow-hidden relative">
                    <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-2">
                    <div>
                      <h3 className="font-serif text-3xl md:text-4xl mb-4">{item.name}</h3>
                      <p className="text-luxury-text-secondary font-light text-lg">Qty: {item.quantity}</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <p className="font-light text-xl">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                      <button 
                        onClick={() => removeFromCart(item.id)} 
                        className="tracking-nav text-[10px] text-luxury-text-secondary hover:text-luxury-text uppercase transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Box */}
            <div className="lg:col-span-4">
              <div className="bg-luxury-bg-secondary p-12 sticky top-40">
                <h2 className="font-serif text-3xl mb-12 border-b hairline-border-b pb-8">Summary</h2>
                
                <div className="space-y-6 mb-12 font-light text-lg">
                  <div className="flex justify-between text-luxury-text-secondary">
                    <span>Subtotal</span>
                    <span>Rs. {cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-luxury-text-secondary">
                    <span>Shipping</span>
                    <span>Complimentary</span>
                  </div>
                </div>
                
                <div className="border-t hairline-border-t pt-8 mb-16 flex justify-between items-center text-2xl font-serif">
                  <span>Total</span>
                  <span>Rs. {cartTotal.toLocaleString()}</span>
                </div>
                
                <Link href="/checkout" className="block w-full">
                  <MagneticButton>
                    <span className="w-full tracking-[0.2em] text-[12px] uppercase bg-[#E5E0D8] text-[#1A1614] border border-[#E5E0D8] px-12 py-5 flex items-center justify-center hover:bg-transparent hover:text-[#E5E0D8] transition-colors duration-[600ms] cursor-pointer">
                      Secure Your Legacy
                    </span>
                  </MagneticButton>
                </Link>
                
                <p className="text-luxury-text-secondary font-light text-sm text-center mt-8">
                  Secure encryption on all transactions.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </main>
  );
}
