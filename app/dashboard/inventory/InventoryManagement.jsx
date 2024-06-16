// app/dashboard/inventory/InventoryManagement.jsx

'use client';

import { useEffect, useState } from 'react';

const InventoryManagement = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setProducts(data);
          setFilteredProducts(data);
        }
        setLoading(false);
      })
      .catch(err => {
        setError('An error occurred while fetching the products');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const results = products.filter(product =>
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchQuery, products]);

  const handleStockChange = (id, newStockQuantity) => {
    const updatedProducts = products.map(product =>
      product.id === id ? { ...product, stockQuantity: newStockQuantity } : product
    );
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
  };

  const handleSaveClick = (id) => {
    const product = products.find(product => product.id === id);
    fetch('/api/products', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: product.id, stockQuantity: product.stockQuantity }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setProducts(products.map(p => (p.id === id ? data.product : p)));
          setFilteredProducts(products.map(p => (p.id === id ? data.product : p)));
        }
      })
      .catch(err => {
        setError('An error occurred while saving the product');
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4 w-full h-full">
      <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>
      <div className="mb-4 flex items-center justify-center w-full">
        <input
          type="text"
          placeholder="Search by SKU"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-11/12 border rounded p-2"
        />
      </div>
      <div className="flex flex-col gap-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="md:flex md:items-center gap-4 justify-between w-7/10 sm:overflow-x-auto">
              <h2 className="text-xl font-semibold w-32 text-nowrap">{product.name}</h2>
              <p className="">{product.sku}</p>
              <p className=""><strong>Price:</strong> ${product.price.toFixed(2)}</p>
              <p className=""><strong>Category:</strong> {product.category}</p>
              <p className=""><strong>Discount:</strong> {product.discount}%</p>
            </div>
            <div className="flex flex-col md:flex-row md:items-center flex-1 justify-between">
              <div className="md:mr-4">
                <label className="block font-bold mb-1 md:mb-0">Stock Quantity</label>
                <input
                  type="number"
                  value={product.stockQuantity}
                  onChange={e => handleStockChange(product.id, parseInt(e.target.value))}
                  className="w-full border rounded p-2"
                />
              </div>
              <button
                onClick={() => handleSaveClick(product.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2 md:mt-0"
              >
                Save
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryManagement;
