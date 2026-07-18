import React from 'react';

export default function Logo({ 
  className = '', 
  iconClassName = 'w-6 h-6 md:w-8 md:h-8',
  textClassName = 'text-2xl md:text-3xl tracking-[0.3em]',
  hallmarkOnly = false 
}: { 
  className?: string,
  iconClassName?: string,
  textClassName?: string,
  hallmarkOnly?: boolean 
}) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      {/* The Hallmark: A minimalist geometric lotus/arch merging with an 'N' */}
      <svg 
        viewBox="0 0 40 40" 
        className={`${iconClassName} text-current transition-transform duration-[1200ms] group-hover:scale-110`} 
        fill="none" 
        stroke="currentColor"
      >
        {/* Outer geometric lotus petal structure */}
        <path 
          d="M 20 2 C 32 10 38 22 20 38 C 2 22 8 10 20 2 Z" 
          strokeWidth="0.5" 
          strokeOpacity="0.6"
        />
        {/* Inner geometric diamond/facet structure */}
        <path 
          d="M 20 8 L 28 20 L 20 32 L 12 20 Z" 
          strokeWidth="0.5" 
          strokeOpacity="0.4"
        />
        {/* The 'N' Monogram */}
        <path 
          d="M 16 26 L 16 14 L 24 26 L 24 14" 
          strokeWidth="1.25" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
      
      {/* The Wordmark */}
      {!hallmarkOnly && (
        <span className={`font-serif text-current uppercase pl-[0.3em] ${textClassName}`}>
          NepJewls
        </span>
      )}
    </div>
  );
}
