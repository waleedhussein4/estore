// app/dashboard/products/[sku]/ProductDetails.jsx

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ProductDetails = ({ sku }) => {
  const [product, setProduct] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (sku) {
      fetch(`/api/products/${sku}`)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setProduct(data);
            setFormData(data);
          }
          setLoading(false);
        })
        .catch(err => {
          setError('An error occurred while fetching the product');
          setLoading(false);
        });
    }
  }, [sku]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
    setHasChanges(true);
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelClick = () => {
    setFormData(product);
    setEditing(false);
    setHasChanges(false);
  };

  const handleSaveClick = () => {
    fetch(`/api/products/${sku}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setProduct(data);
          setEditing(false);
          setHasChanges(false);
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

  if (!product) {
    return <div>No product found</div>;
  }

  return (
    <div className="flex flex-col gap-4 justify-between items-center p-4 w-full h-full">
      <h1 className="text-2xl font-bold mb-4">Product Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-full">
        <div className="mb-4">
          <label className="block font-bold mb-1">Name</label>
          {editing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          ) : (
            <p>{product.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-1">Description</label>
          {editing ? (
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          ) : (
            <p>{product.description}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-1">Price</label>
          {editing ? (
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          ) : (
            <p>${product.price.toFixed(2)}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-1">Stock Quantity</label>
          {editing ? (
            <input
              type="number"
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          ) : (
            <p>{product.stockQuantity}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-1">Category</label>
          {editing ? (
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          ) : (
            <p>{product.category}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-1">Discount</label>
          {editing ? (
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          ) : (
            <p>{product.discount}%</p>
          )}
        </div>
        <Image src={product.mainImage} alt={product.name} width={200} height={200} />
        {editing ? (
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleSaveClick}
              disabled={!hasChanges}
              className={`bg-blue-500 text-white px-4 py-2 rounded ${!hasChanges ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            >
              Save
            </button>
            <button
              onClick={handleCancelClick}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={handleEditClick}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
          >
            Edit
          </button>
        )}
        <Link href="/dashboard/products" className="text-blue-500 hover:underline mt-4 block">Back to Products</Link>
      </div>
    </div>
  );
};

export default ProductDetails;
