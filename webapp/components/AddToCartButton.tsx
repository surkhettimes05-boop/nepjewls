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
    <div className="fixed bottom-0 left-0 w-full z-40 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] bg-gradient-to-t from-luxury-bg via-luxury-bg to-transparent lg:static lg:p-0 lg:bg-none lg:w-full lg:max-w-[300px]">
      <div onClick={handleAdd} className="w-full">
        <MagneticButton>
          <span className={`tracking-[0.2em] text-[12px] uppercase px-12 py-5 flex items-center justify-center transition-colors duration-[1200ms] ease-[cubic-bezier(0.85,0,0.15,1)] cursor-pointer w-full text-center shadow-2xl lg:shadow-none
            ${added 
              ? 'bg-[#8C857B] text-[#1A1614]' 
              : 'bg-[#E5E0D8] text-[#1A1614] hover:bg-[#D4AF37]'
            }
          `}>
            {added ? 'Added to Bag' : 'Secure Your Legacy'}
          </span>
        </MagneticButton>
      </div>
    </div>
  );
}
