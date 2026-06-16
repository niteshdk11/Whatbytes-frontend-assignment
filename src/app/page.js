'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import products from '../data/products.json';
import Sidebar from '../components/Sidebar';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const searchParams = useSearchParams();

  const filteredProducts = useMemo(() => {
    const categoryParam = searchParams.get('category');
    const brandParam = searchParams.get('brand');
    const priceParam = searchParams.get('price');
    const searchParam = searchParams.get('search');

    return products.filter((product) => {
      // Category filter
      if (categoryParam) {
        const categories = categoryParam.split(',');
        if (!categories.includes(product.category)) return false;
      }

      // Brand filter
      if (brandParam) {
        const brands = brandParam.split(',');
        if (!brands.includes(product.brand)) return false;
      }

      // Price filter
      if (priceParam) {
        const [min, max] = priceParam.split('-').map(Number);
        if (product.price < min || product.price > max) return false;
      }

      // Search filter
      if (searchParam) {
        const searchLower = searchParam.toLowerCase();
        if (
          !product.title.toLowerCase().includes(searchLower) &&
          !product.category.toLowerCase().includes(searchLower) &&
          !product.brand.toLowerCase().includes(searchLower)
        ) {
          return false;
        }
      }

      return true;
    });
  }, [searchParams]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          {filteredProducts.length === 0 ? (
            <div className="flex items-center justify-center h-96">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
