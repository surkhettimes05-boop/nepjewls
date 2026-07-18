'use client';

import { useState, useRef, useEffect } from 'react';

interface AccordionItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  onClick: () => void;
}

function AccordionItem({ title, content, isOpen, onClick }: AccordionItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div className="border-b border-white/10 overflow-hidden">
      <div 
        className="py-8 flex justify-between items-center cursor-pointer group"
        onClick={onClick}
      >
        <span className="tracking-[0.3em] text-[11px] uppercase text-[#8C857B] group-hover:text-white transition-colors duration-500">
          {title}
        </span>
        <span 
          className={`text-[#D4AF37] transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${isOpen ? 'rotate-45' : 'rotate-0'}`}
        >
          +
        </span>
      </div>
      <div 
        className="transition-[height] duration-700 ease-[cubic-bezier(0.85,0,0.15,1)]"
        style={{ height: `${height}px` }}
      >
        <div ref={contentRef} className="pb-8 pt-2">
          <p className="text-[#E5E0D8] font-light text-sm leading-[1.8] opacity-80">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ProductAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = [
    {
      title: "Provenance & Craft",
      content: "Forged in the shadows of the Himalayas. Every piece in our collection is hand-beaten by master Newari karigars in our Patan ateliers. Diamonds are strictly GIA-certified, D-F color, Flawless to VVS clarity. Our 24k and 18k gold is entirely cadmium-free, ensuring generational endurance."
    },
    {
      title: "Insured Global Courier",
      content: "Acquisitions are transported via our secure, fully insured global courier partners. Pieces are delivered in highly discreet, unmarked outer packaging to ensure absolute security until the unboxing ritual begins."
    },
    {
      title: "Legacy Maintenance",
      content: "A masterpiece should outlive its owner. We offer complimentary annual ultrasonic cleaning, prong tightening, and micro-polishing at our flagship boutique. True luxury requires zero compromises on preservation."
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="border-t border-white/10 w-full max-w-lg">
      {items.map((item, index) => (
        <AccordionItem 
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          onClick={() => handleToggle(index)}
        />
      ))}
    </div>
  );
}
