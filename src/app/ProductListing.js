'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo, Suspense } from 'react';
import products from '../data/products.json';
import Sidebar from '../components/Sidebar';
import ProductCard from '../components/ProductCard';

function ProductListingContent() {
  const searchParams = useSearchParams();

  const filteredProducts = useMemo(() => {
    const categoryParam = searchParams.get('category');
    const priceParam = searchParams.get('price');
    const searchParam = searchParams.get('search');

    return products.filter((product) => {
      // Category filter
      if (categoryParam && categoryParam !== 'All') {
        if (product.category !== categoryParam) return false;
      }

      // Price filter
      if (priceParam) {
        const maxPrice = Number(priceParam);
        if (product.price > maxPrice) return false;
      }

      // Search filter
      if (searchParam) {
        const searchLower = searchParam.toLowerCase();
        if (
          !product.title.toLowerCase().includes(searchLower) &&
          !product.category.toLowerCase().includes(searchLower)
        ) {
          return false;
        }
      }

      return true;
    });
  }, [searchParams]);

  const regularProducts = filteredProducts.filter(p => !p.featured);
  const featuredProduct = filteredProducts.find(p => p.featured);

  return (
    <div className="flex flex-col min-h-screen bg-[#F3F4F6]">
      <div className="flex flex-1 flex-col lg:flex-row">
        <Suspense fallback={<div className="w-full lg:w-1/4 p-4 lg:p-6 space-y-4 lg:space-y-6 bg-gray-200" />}>
          <Sidebar />
        </Suspense>
        <main className="w-full lg:w-3/4 p-4 lg:p-6">
          <h1 className="text-[28px] lg:text-[36px] font-bold text-gray-900 mb-4 lg:mb-6">Product Listing</h1>
          
          {filteredProducts.length === 0 ? (
            <div className="flex items-center justify-center h-96">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4  gap-2 lg:gap-3">
              {regularProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              {featuredProduct && (
                <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                  <ProductCard key={featuredProduct.id} product={featuredProduct} isFeatured={true} />
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function ProductListing() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center">Loading...</div>}>
      <ProductListingContent />
    </Suspense>
  );
}
