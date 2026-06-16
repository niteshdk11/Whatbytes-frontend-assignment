import { Suspense } from 'react';
import products from '../data/products.json';
import Sidebar from '../components/Sidebar';
import ProductCard from '../components/ProductCard';
import ProductListing from './ProductListing';

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center">Loading...</div>}>
      <ProductListing />
    </Suspense>
  );
}
