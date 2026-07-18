'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '../../../context/CartContext';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const verifyPayment = async () => {
      const gateway = searchParams.get('gateway');
      let verifyPayload: any = {};

      if (gateway === 'khalti') {
        const pidx = searchParams.get('pidx');
        const purchase_order_id = searchParams.get('purchase_order_id');
        
        if (!pidx || !purchase_order_id) {
          setStatus('error');
          setErrorMessage('Invalid Khalti response');
          return;
        }
        verifyPayload = { gateway: 'khalti', pidx, orderId: purchase_order_id };
      } else if (gateway === 'esewa') {
        const data = searchParams.get('data');
        if (!data) {
          setStatus('error');
          setErrorMessage('Invalid eSewa response');
          return;
        }
        
        try {
          const decodedData = JSON.parse(Buffer.from(data, 'base64').toString('utf-8'));
          verifyPayload = { gateway: 'esewa', esewaData: data, orderId: decodedData.transaction_uuid };
        } catch (e) {
          setStatus('error');
          setErrorMessage('Failed to decode eSewa response');
          return;
        }
      } else {
        setStatus('error');
        setErrorMessage('Unknown payment gateway');
        return;
      }

      try {
        const res = await fetch('/api/payments/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(verifyPayload)
        });

        const data = await res.json();

        if (res.ok) {
          setStatus('success');
          clearCart(); // Empty the cart on successful checkout
        } else {
          setStatus('error');
          setErrorMessage(data.error || 'Verification failed');
        }
      } catch (err) {
        setStatus('error');
        setErrorMessage('Failed to contact verification server');
      }
    };

    if (searchParams.toString()) {
      verifyPayment();
    }
  }, [searchParams]);

  return (
    <main className="bg-luxury-bg text-luxury-text min-h-screen flex flex-col">
      <Navigation />
      
      <div className="flex-1 flex items-center justify-center pt-32 pb-24 px-8">
        <div className="max-w-xl w-full text-center">
          {status === 'verifying' && (
            <div className="animate-pulse">
              <div className="w-16 h-16 border-t-2 border-luxury-gold border-solid rounded-full animate-spin mx-auto mb-8"></div>
              <h1 className="font-serif text-4xl mb-6">Verifying Transaction</h1>
              <p className="text-luxury-text-secondary font-light">Please wait while we securely verify your payment...</p>
            </div>
          )}

          {status === 'success' && (
            <div>
              <div className="w-20 h-20 bg-luxury-gold/10 text-luxury-gold flex items-center justify-center rounded-full mx-auto mb-8">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h1 className="font-serif text-5xl mb-6">Payment Successful</h1>
              <p className="text-luxury-text-secondary font-light mb-12">Your masterpiece has been secured. We will contact you shortly with shipping details.</p>
              <Link href="/" className="tracking-btn text-[14px] uppercase border border-luxury-gold px-12 py-4 text-luxury-gold hover:bg-luxury-gold/5 inline-block transition-colors">
                Return to Boutique
              </Link>
            </div>
          )}

          {status === 'error' && (
            <div>
              <div className="w-20 h-20 bg-red-900/10 text-red-500 flex items-center justify-center rounded-full mx-auto mb-8">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </div>
              <h1 className="font-serif text-4xl mb-6 text-red-500">Verification Failed</h1>
              <p className="text-luxury-text-secondary font-light mb-12">{errorMessage}</p>
              <Link href="/checkout" className="tracking-btn text-[14px] uppercase border border-luxury-text px-12 py-4 hover:bg-luxury-text hover:text-luxury-bg inline-block transition-colors">
                Try Again
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
