'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ProductList = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products')
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const results = products.filter(product =>
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchQuery, products]);

  const handleProductClick = (sku) => {
    router.push(`/dashboard/products/${sku}`);
  };

  return (
    <div className="flex flex-col gap-2 w-full overflow-y-auto h-full items-center">
      <input
        type="text"
        placeholder="Search by SKU"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="w-11/12 border rounded p-2 mb-6"
      />
      <div className="flex flex-col md:flex-row justify-between items-center px-8 border-b border-black gap-6 w-full">
        <span className="text-center w-1/5">Name</span>
        <span className="text-center w-1/5">SKU</span>
        <span className="text-center w-2/5">Description</span>
        <span className="text-center w-1/5">Category</span>
      </div>
      <div className="flex flex-col gap-6 w-full overflow-y-auto h-full p-4">
        {!filteredProducts && <span>No products found.</span>}
        {filteredProducts && filteredProducts.map(product => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product.sku)}
            className="flex flex-row gap-4 justify-between items-center p-4 bg-gray-100 rounded-lg hover:bg-blue-100 hover:cursor-pointer"
          >
            <span className="text-center w-1/5 font-bold text-ellipsis truncate">{product.name}</span>
            <span className="text-center w-1/5 text-ellipsis truncate">{product.sku}</span>
            <span className="text-center w-2/5 text-ellipsis truncate">{product.description}</span>
            <span className="text-center w-1/5 text-ellipsis truncate">{product.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
