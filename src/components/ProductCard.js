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
            <div className="w-1/2 relative h-64 bg-gray-100">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Details Section */}
            <div className="w-1/2 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {product.title}
                </h3>
                <p className="text-3xl font-bold text-gray-900 mb-4">
                  ${product.price}
                </p>
                
                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex text-[#0057B8]">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-xl">
                        {i < Math.floor(product.rating) ? '★' : '☆'}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {product.description}
                </p>

                {/* Category */}
                <div className="mb-4">
                  <span className="text-gray-600 text-sm">Category: </span>
                  <span className="font-semibold text-gray-900 text-sm">{product.category}</span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#0066D6] text-white py-3 px-6 rounded-lg hover:bg-[#0057B8] transition-colors font-semibold"
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
      <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
        {/* Product Image */}
        <div className="relative h-[140px] w-full bg-gray-100 flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Product Details */}
        <div className="p-4 text-center">
          <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 min-h-[40px]">
            {product.title}
          </h3>

          {/* Price */}
          <p className="text-xl font-bold text-gray-900 mb-4">
            ${product.price}
          </p>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-[110px] bg-[#0066D6] text-white py-2 px-4 rounded-lg hover:bg-[#0057B8] transition-colors text-sm font-semibold mx-auto"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
