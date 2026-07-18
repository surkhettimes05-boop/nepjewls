'use client';

import { useState, useRef, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

export default function CheckoutPage() {
  const { cart, cartTotal, isMounted } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    paymentMethod: 'KHALTI'
  });

  const esewaFormRef = useRef<HTMLFormElement>(null);
  const [esewaPayload, setEsewaPayload] = useState<any>(null);

  useEffect(() => {
    if (esewaPayload && esewaFormRef.current) {
      esewaFormRef.current.submit();
    }
  }, [esewaPayload]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const items = cart.map((item: any) => ({
        productId: item.id,
        quantity: item.quantity
      }));

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          items
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create order');
      }

      if (formData.paymentMethod === 'KHALTI') {
        window.location.href = data.paymentUrl;
      } else if (formData.paymentMethod === 'ESEWA') {
        setEsewaPayload({ ...data.paymentPayload, actionUrl: data.paymentUrl });
      }

    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (!isMounted) return null;

  return (
    <main className="bg-luxury-bg text-luxury-text min-h-screen">
      <Navigation />
      
      <div className="max-w-[1200px] mx-auto px-8 pt-40 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 className="font-serif text-5xl mb-12">Secure Checkout</h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <h2 className="tracking-nav text-luxury-text-secondary text-[11px]">Client Details</h2>
              
              <div>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  placeholder="Full Name" 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b hairline-border-b py-4 focus:outline-none focus:border-luxury-gold transition-colors font-light text-lg"
                />
              </div>
              
              <div>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  placeholder="Email Address" 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b hairline-border-b py-4 focus:outline-none focus:border-luxury-gold transition-colors font-light text-lg"
                />
              </div>

              <div>
                <input 
                  type="tel" 
                  name="phone" 
                  required 
                  placeholder="Phone Number" 
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b hairline-border-b py-4 focus:outline-none focus:border-luxury-gold transition-colors font-light text-lg"
                />
              </div>
            </div>

            <div className="space-y-6 pt-8">
              <h2 className="tracking-nav text-luxury-text-secondary text-[11px]">Payment Method</h2>
              
              <div className="flex gap-4">
                <label className={`flex-1 border p-6 cursor-pointer transition-colors ${formData.paymentMethod === 'KHALTI' ? 'border-luxury-gold bg-luxury-gold/5' : 'border-luxury-text/20'}`}>
                  <input type="radio" name="paymentMethod" value="KHALTI" className="hidden" onChange={handleChange} checked={formData.paymentMethod === 'KHALTI'} />
                  <span className="font-serif text-xl block text-center">Khalti</span>
                </label>
                
                <label className={`flex-1 border p-6 cursor-pointer transition-colors ${formData.paymentMethod === 'ESEWA' ? 'border-luxury-gold bg-luxury-gold/5' : 'border-luxury-text/20'}`}>
                  <input type="radio" name="paymentMethod" value="ESEWA" className="hidden" onChange={handleChange} checked={formData.paymentMethod === 'ESEWA'} />
                  <span className="font-serif text-xl block text-center">eSewa</span>
                </label>
              </div>
            </div>

            {error && <p className="text-red-500 font-light">{error}</p>}

            <button 
              type="submit" 
              disabled={loading || cart.length === 0}
              className="w-full tracking-btn text-[14px] uppercase border border-luxury-text px-12 py-5 text-luxury-text hover:bg-luxury-text hover:text-luxury-bg transition-colors duration-[400ms] disabled:opacity-50 mt-12"
            >
              {loading ? 'Processing...' : `Pay Rs. ${cartTotal.toLocaleString()}`}
            </button>
          </form>
        </div>

        <div className="bg-luxury-bg-secondary p-12">
          <h2 className="font-serif text-3xl mb-12 border-b hairline-border-b pb-8">Order Summary</h2>
          
          <div className="space-y-8 mb-12">
            {cart.map((item: any) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-20 overflow-hidden relative">
                    <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl">{item.name}</h3>
                    <p className="text-luxury-text-secondary font-light text-sm">Qty: {item.quantity}</p>
                  </div>
                </div>
                <div className="font-light">Rs. {(item.price * item.quantity).toLocaleString()}</div>
              </div>
            ))}
          </div>

          <div className="border-t hairline-border-t pt-8 flex justify-between items-center text-2xl font-serif">
            <span>Total</span>
            <span>Rs. {cartTotal.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Hidden eSewa Form for Redirection */}
      {esewaPayload && (
        <form ref={esewaFormRef} action={esewaPayload.actionUrl} method="POST" className="hidden">
          <input type="hidden" id="amount" name="amount" value={esewaPayload.amount} required />
          <input type="hidden" id="tax_amount" name="tax_amount" value={esewaPayload.tax_amount} required />
          <input type="hidden" id="total_amount" name="total_amount" value={esewaPayload.total_amount} required />
          <input type="hidden" id="transaction_uuid" name="transaction_uuid" value={esewaPayload.transaction_uuid} required />
          <input type="hidden" id="product_code" name="product_code" value={esewaPayload.product_code} required />
          <input type="hidden" id="product_service_charge" name="product_service_charge" value={esewaPayload.product_service_charge} required />
          <input type="hidden" id="product_delivery_charge" name="product_delivery_charge" value={esewaPayload.product_delivery_charge} required />
          <input type="hidden" id="success_url" name="success_url" value={esewaPayload.success_url} required />
          <input type="hidden" id="failure_url" name="failure_url" value={esewaPayload.failure_url} required />
          <input type="hidden" id="signed_field_names" name="signed_field_names" value={esewaPayload.signed_field_names} required />
          <input type="hidden" id="signature" name="signature" value={esewaPayload.signature} required />
        </form>
      )}

      <Footer />
    </main>
  );
}
