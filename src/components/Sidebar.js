'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const categories = ['Electronics', 'Fashion', 'Home & Garden', 'Sports'];
const brands = ['Sony', 'Apple', 'Dell', 'Gucci', 'Nike', "Levi's", 'IKEA', 'Planters', 'Lululemon', 'Spalding', 'Samsung', 'Ray-Ban'];

export default function Sidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState(searchParams.get('category')?.split(',') || []);
  const [selectedBrands, setSelectedBrands] = useState(searchParams.get('brand')?.split(',') || []);
  const [priceRange, setPriceRange] = useState(() => {
    const priceParam = searchParams.get('price');
    if (priceParam) {
      const [min, max] = priceParam.split('-').map(Number);
      return { min, max };
    }
    return { min: 0, max: 1500 };
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    
    if (selectedCategories.length > 0) {
      params.set('category', selectedCategories.join(','));
    } else {
      params.delete('category');
    }
    
    if (selectedBrands.length > 0) {
      params.set('brand', selectedBrands.join(','));
    } else {
      params.delete('brand');
    }
    
    if (priceRange.min > 0 || priceRange.max < 1500) {
      params.set('price', `${priceRange.min}-${priceRange.max}`);
    } else {
      params.delete('price');
    }
    
    router.push(`/?${params.toString()}`);
  }, [selectedCategories, selectedBrands, priceRange, router, searchParams]);

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleBrandToggle = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  const handlePriceChange = (field, value) => {
    setPriceRange((prev) => ({ ...prev, [field]: Number(value) }));
  };

  return (
    <aside className="w-full md:w-64 bg-white border-r border-gray-200 p-6">
      <div className="space-y-8">
        {/* Category Filter */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Category</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Range</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Min: ${priceRange.min}</label>
              <input
                type="range"
                min="0"
                max="1500"
                step="50"
                value={priceRange.min}
                onChange={(e) => handlePriceChange('min', e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Max: ${priceRange.max}</label>
              <input
                type="range"
                min="0"
                max="1500"
                step="50"
                value={priceRange.max}
                onChange={(e) => handlePriceChange('max', e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Brand Filter */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Brand</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandToggle(brand)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
