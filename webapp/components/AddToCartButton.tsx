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
    <div onClick={handleAdd} className="inline-block w-full max-w-[300px]">
      <MagneticButton>
        <span className={`tracking-[0.2em] text-[12px] uppercase px-12 py-5 flex items-center justify-center transition-colors duration-[1200ms] ease-[cubic-bezier(0.85,0,0.15,1)] cursor-pointer w-full text-center
          ${added 
            ? 'bg-[#8C857B] text-[#1A1614]' 
            : 'bg-[#E5E0D8] text-[#1A1614] hover:bg-[#D4AF37]'
          }
        `}>
          {added ? 'Added to Bag' : 'Add to Bag'}
        </span>
      </MagneticButton>
    </div>
  );
}
