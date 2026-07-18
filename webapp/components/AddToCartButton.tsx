'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import MagneticButton from './MagneticButton';

interface AddToCartButtonProps {
  product: {
    id: string;
    sku: string;
    name: string;
    price: number;
    image: string;
  };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div onClick={handleAdd}>
      <MagneticButton>
        <span className={`tracking-btn text-[14px] uppercase border px-12 py-5 flex items-center justify-center transition-all duration-[400ms] cursor-pointer
          ${added 
            ? 'bg-luxury-gold text-luxury-bg border-luxury-gold' 
            : 'border-luxury-text text-luxury-text hover:bg-luxury-text hover:text-luxury-bg'
          }
        `}>
          {added ? 'Added to Bag' : 'Add to Bag'}
        </span>
      </MagneticButton>
    </div>
  );
}
