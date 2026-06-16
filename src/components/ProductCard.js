'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, isFeatured = false }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  if (isFeatured) {
    return (
      <Link href={`/product/${product.id}`} className="block">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
          <div className="flex">
            {/* Image Section */}
            <div className="w-1/2 relative h-48 bg-gray-100">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Details Section */}
            <div className="w-1/2 p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {product.title}
                </h3>
                <p className="text-2xl font-bold text-gray-900 mb-3">
                  ${product.price}
                </p>
                
                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex text-[#0057B8]">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-lg">
                        {i < Math.floor(product.rating) ? '★' : '☆'}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Category */}
                <div className="mb-3">
                  <span className="text-gray-600 text-xs">Category: </span>
                  <span className="font-semibold text-gray-900 text-xs">{product.category}</span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#0066D6] text-white py-2 px-4 rounded-lg hover:bg-[#0057B8] transition-colors text-sm font-semibold"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/product/${product.id}`} className="block">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 w-full max-w-[280px]">
        {/* Product Image */}
        <div className="relative h-[200px] w-full bg-gray-100 flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Product Details */}
        <div className="p-4 text-left">
          <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 min-h-[40px]">
            {product.title}
          </h3>

          {/* Price */}
          <p className="text-lg font-bold text-gray-900 mb-4 text-left">
            ${product.price}
          </p>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-[#0066D6] text-white py-2 px-4 rounded-lg hover:bg-[#0057B8] transition-colors text-sm font-semibold"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
