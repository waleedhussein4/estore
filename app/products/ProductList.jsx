'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ProductListing = () => {
  const router = useRouter();

  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/product-listing?page=${page}`);
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  const handleViewProduct = (sku) => {
    router.push(`/products/${sku}`);
  }

  return (
    <div className="h-full w-full flex justify-center items-center">
      {mobileFiltersOpen &&
        <div className='flex md:hidden h-[calc(100vh-10rem)] w-full border-b absolute top-[calc(5rem+5rem)] bg-white'>
          <h1>Filters</h1>
        </div>
      }

      {!products && loading && <p>Loading...</p>}

      {!products && !loading && <p>No products found</p>}

      {products && (
        <div className="flex flex-col w-full h-full">
          <div className='flex md:hidden justify-between items-center h-20 bg-white w-full border p-6'>
            <button onClick={() => setMobileFiltersOpen(prev => !prev)}>Filters</button>
            <button>Sort</button>
          </div>
          <div className="hidden md:grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-2 p-4">
            {products.map((product) => (
              <div key={product._id} className="border flex flex-col gap-2 p-4 w-full h-[360px]">
                <Image onClick={() => handleViewProduct(product.sku)} src={product.mainImage} alt={product.name} width={200} height={200} className="hover:cursor-pointer" />
                <h2 className="font-bold">{product.name}</h2>
                <span className="text-gray-500">{product.category}</span>
                <div className="flex flex-row items-center">
                  <span>$</span>
                  <span className="text-red-600 text-lg font-medium">{product.price}</span>
                </div>
                <div className="w-full flex justify-center items-center">
                  <button onClick={() => handleViewProduct(product.sku)} className="bg-blue-500 rounded w-24 text-white font-medium hover:bg-blue-400">View</button>
                </div>
              </div>
            ))}
          </div>
          {!mobileFiltersOpen &&
            <div className="flex md:hidden flex-col">
              {products.map((product) => (
                <div key={product._id} className="border flex flex-col p-2">
                  <h2 className="font-bold">{product.name}</h2>
                  <p>{product.description}</p>
                  <p>{product.sku}</p>
                  <p>{product.price}</p>
                  <p>{product.stockQuantity}</p>
                  <p>{product.category}</p>
                  <p>{product.discount}</p>
                </div>
              ))}
            </div>
          }
        </div>
      )}
    </div>
  )
}

export default ProductListing