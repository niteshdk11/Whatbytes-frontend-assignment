'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Link from 'next/link';

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getCartCount } = useCart();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchQuery.trim()) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <header className="bg-[#0057B8] h-[75px] sticky top-0 z-50">
      <div className="max-w-full mx-auto px-6 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-white text-2xl font-bold">
              Logo
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-[350px] mx-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full h-[40px] pl-10 pr-4 rounded-lg border border-white/30 bg-white/10 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-200 h-5 w-5" />
            </div>
          </form>

          {/* Cart Button */}
          <Link href="/cart" className="relative bg-[#003B8F] text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-[#002B6F] transition-colors">
            <ShoppingBag className="h-5 w-5" />
            <span>Cart</span>
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-[#0057B8] text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {getCartCount()}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
