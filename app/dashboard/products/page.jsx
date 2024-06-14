import React from 'react';
import ProductList from './ProductList';

const Products = () => {
  return (
    <div className="w-full flex flex-col justify-evenly items-center overflow-y-auto h-full">
      <h1 className="text-2xl font-bold p-4">Products</h1>
      <ProductList />
    </div>
  );
};

export default Products;
