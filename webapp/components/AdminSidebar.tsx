'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Acquisitions (Orders)', href: '/admin/orders' },
    { name: 'Inventory (Products)', href: '/admin/products' },
  ];

  return (
    <aside className="w-64 bg-[#1A1614] border-r border-white/10 min-h-screen p-8 flex flex-col">
      <div className="mb-16">
        <Link href="/" className="font-serif text-2xl tracking-widest text-[#D4AF37]">
          NEPJEWLS <span className="text-[10px] uppercase tracking-[0.4em] block text-[#8C857B] mt-2">Ledger</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`block px-4 py-3 text-sm tracking-wide transition-colors ${
                isActive 
                  ? 'bg-white/5 text-[#D4AF37] border-l-2 border-[#D4AF37]' 
                  : 'text-[#8C857B] hover:text-[#E5E0D8] hover:bg-white/5 border-l-2 border-transparent'
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-8 border-t border-white/10">
        <Link 
          href="/" 
          className="text-xs text-[#8C857B] hover:text-white transition-colors tracking-widest uppercase"
        >
          &larr; Back to Storefront
        </Link>
      </div>
    </aside>
  );
}
