'use client';

import { useState } from 'react';
import Navigation from "../../components/Navigation";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, cartTotal, isMounted } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      // 1. Generate unique transaction UUID
      const transaction_uuid = `nepjewls-${Date.now()}`;
      
      // 2. Request HMAC signature from our secure Next.js API
      const res = await fetch('/api/esewa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          total_amount: cartTotal.toString(),
          transaction_uuid: transaction_uuid
        })
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);

      // 3. Create a dynamic form to POST to eSewa's test portal
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://rc-epay.esewa.com.np/api/epay/main/v2/form';

      const fields = {
        amount: cartTotal.toString(),
        tax_amount: "0",
        total_amount: cartTotal.toString(),
        transaction_uuid: transaction_uuid,
        product_code: data.merchant_code,
        product_service_charge: "0",
        product_delivery_charge: "0",
        success_url: `${window.location.origin}/checkout/success`,
        failure_url: `${window.location.origin}/checkout/failure`,
        signed_field_names: data.signed_field_names,
        signature: data.signature,
      };

      for (const key in fields) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = fields[key];
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();
      
    } catch (err) {
      console.error(err);
      alert("Failed to initialize checkout. Please try again.");
      setIsProcessing(false);
    }
  };

  const handleCOD = () => {
    setIsProcessing(true);
    // Simulate COD order processing
    setTimeout(() => {
      alert("Cash on Delivery order placed successfully! Our team will contact you on WhatsApp to confirm the deposit for high-value items.");
      clearCart();
      setIsProcessing(false);
      window.location.href = '/';
    }, 1000);
  };

  if (!isMounted) return null; // Prevent hydration mismatch

  return (
    <>
      <Navigation />
      <main className="container" style={{ padding: 'var(--space-6) var(--space-4)', minHeight: '60vh' }}>
        <h1 style={{ marginBottom: 'var(--space-5)' }}>Your Cart</h1>
        
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div style={styles.cartLayout}>
            {/* Items List */}
            <div style={styles.itemsColumn}>
              {cart.map((item) => (
                <div key={item.id} style={styles.cartItem}>
                  <img src={item.image} alt={item.name} style={styles.itemImage} />
                  <div style={styles.itemDetails}>
                    <h3 style={styles.itemName}>{item.name}</h3>
                    <p style={styles.itemPrice}>NPR {item.price.toLocaleString()} x {item.quantity}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} style={styles.removeBtn}>Remove</button>
                </div>
              ))}
            </div>

            {/* Summary Box */}
            <div style={styles.summaryColumn}>
              <div style={styles.summaryBox}>
                <h2 style={{marginTop: 0}}>Order Summary</h2>
                <div style={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>NPR {cartTotal.toLocaleString()}</span>
                </div>
                <div style={styles.summaryRow}>
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div style={styles.divider}></div>
                <div style={styles.summaryRowTotal}>
                  <span>Total</span>
                  <span>NPR {cartTotal.toLocaleString()}</span>
                </div>
                
                <div style={styles.checkoutActions}>
                  <button 
                    style={styles.esewaBtn} 
                    onClick={handleCheckout}
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Pay with eSewa"}
                  </button>
                  
                  <button 
                    style={styles.codBtn} 
                    onClick={handleCOD}
                    disabled={isProcessing}
                  >
                    Cash on Delivery (COD)
                  </button>
                </div>
                <p style={styles.codDisclaimer}>*High-value COD orders may require a partial deposit.</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

const styles = {
  cartLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 350px',
    gap: 'var(--space-6)',
  },
  itemsColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-4)',
  },
  cartItem: {
    display: 'flex',
    gap: 'var(--space-4)',
    paddingBottom: 'var(--space-4)',
    borderBottom: '1px solid rgba(27, 42, 58, 0.1)',
    alignItems: 'center',
  },
  itemImage: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '4px',
    backgroundColor: '#FAFAFA',
  },
  itemDetails: {
    flexGrow: 1,
  },
  itemName: {
    margin: '0 0 var(--space-1) 0',
    fontSize: '1.2rem',
  },
  itemPrice: {
    margin: 0,
    color: 'var(--color-support)',
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    color: 'red',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  summaryColumn: {
    width: '100%',
  },
  summaryBox: {
    backgroundColor: 'var(--color-neutral)',
    padding: 'var(--space-5)',
    border: '1px solid rgba(27, 42, 58, 0.1)',
    borderRadius: '8px',
    position: 'sticky',
    top: '100px',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 'var(--space-2)',
  },
  summaryRowTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '1.4rem',
    fontWeight: 700,
    marginBottom: 'var(--space-5)',
  },
  divider: {
    height: '1px',
    backgroundColor: 'rgba(27, 42, 58, 0.1)',
    margin: 'var(--space-4) 0',
  },
  checkoutActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-3)',
  },
  esewaBtn: {
    backgroundColor: '#60BB46', // eSewa Brand Green
    color: 'white',
    border: 'none',
    padding: 'var(--space-3)',
    fontSize: '1.2rem',
    fontWeight: 600,
    cursor: 'pointer',
    borderRadius: '4px',
    width: '100%',
    transition: 'opacity var(--duration-fast)',
  },
  codBtn: {
    backgroundColor: 'transparent',
    color: 'var(--color-primary)',
    border: '2px solid var(--color-primary)',
    padding: 'var(--space-3)',
    fontSize: '1.2rem',
    fontWeight: 600,
    cursor: 'pointer',
    borderRadius: '4px',
    width: '100%',
    transition: 'background-color var(--duration-fast)',
  },
  codDisclaimer: {
    fontSize: '0.9rem',
    color: 'var(--color-support)',
    textAlign: 'center',
    marginTop: 'var(--space-3)',
    opacity: 0.8,
  }
};
