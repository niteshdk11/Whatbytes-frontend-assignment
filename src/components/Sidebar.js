'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

const categories = ['All', 'Electronics', 'Clothing', 'Home'];

export default function Sidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isInitialized = useRef(false);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [priceRange, setPriceRange] = useState(() => {
    const priceParam = searchParams.get('price');
    if (priceParam) {
      return Number(priceParam);
    }
    return 1000;
  });

  useEffect(() => {
    isInitialized.current = true;
  }, []);

  useEffect(() => {
    if (!isInitialized.current) return;

    const params = new URLSearchParams();
    
    if (selectedCategory !== 'All') {
      params.set('category', selectedCategory);
    }
    
    if (priceRange < 1000) {
      params.set('price', priceRange.toString());
    }
    
    const queryString = params.toString();
    router.push(queryString ? `/?${queryString}` : '/', { scroll: false });
  }, [selectedCategory, priceRange, router]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handlePriceChange = (value) => {
    setPriceRange(Number(value));
  };

  return (
    <aside className="w-full lg:w-1/4 p-4 lg:p-6 space-y-4 lg:space-y-6">
      {/* Dark Blue Filter Card */}
      <div className="bg-[#0057B8] rounded-xl p-4 lg:p-6 text-white">
        <h2 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">Filters</h2>
        
        {/* Category */}
        <div className="mb-4 lg:mb-6">
          <h3 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4">Category</h3>
          <div className="space-y-2 lg:space-y-3">
            {categories.map((category) => (
              <label key={category} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === category}
                  onChange={() => handleCategoryChange(category)}
                  className="w-4 h-4 text-white border-white/50 focus:ring-white"
                />
                <span className="ml-3 text-sm lg:text-base">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price */}
        <div>
          <h3 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4">Price</h3>
          <div className="space-y-3 lg:space-y-4">
            <input
              type="range"
              min="0"
              max="1000"
              step="50"
              value={priceRange}
              onChange={(e) => handlePriceChange(e.target.value)}
              className="w-full h-2 bg-white/30 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs lg:text-sm">
              <span>0</span>
              <span>1000</span>
            </div>
          </div>
        </div>
      </div>

      {/* White Filter Card */}
      <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm">
        {/* Category */}
        <div className="mb-4 lg:mb-6">
          <h3 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4 text-gray-900">Category</h3>
          <div className="space-y-2 lg:space-y-3">
            {categories.map((category) => (
              <label key={category} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="category2"
                  checked={selectedCategory === category}
                  onChange={() => handleCategoryChange(category)}
                  className="w-4 h-4 text-[#0057B8] border-gray-300 focus:ring-[#0057B8]"
                />
                <span className="ml-3 text-sm lg:text-base text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Dropdown */}
        <div>
          <h3 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4 text-gray-900">Price</h3>
          <select
            value={priceRange}
            onChange={(e) => handlePriceChange(e.target.value)}
            className="w-full p-2 lg:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0057B8] text-sm lg:text-base text-black"
          >
            <option value="1000">5000</option>
            <option value="500">500</option>
            <option value="250">250</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>
    </aside>
  );
}
