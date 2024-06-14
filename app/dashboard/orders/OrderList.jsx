'use client';

import { useState, useEffect } from 'react';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        await fetch('/api/orders')
          .then(response => response.json())
          .then(data => {
            if (data.error) {
              setError(data.error);
            } else {
              setOrders(data);
            }
            setLoading(false);
          });
      } catch (err) {
        setError('Failed to fetch orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col space-y-4">
      {!orders.length && <p>No orders found</p>}
      {orders.map(order => (
        <div key={order._id} className="flex flex-col bg-white p-4 rounded shadow">
          <div className="flex justify-between">
            <span className="font-bold">Order ID:</span>
            <span>{order._id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">Customer:</span>
            <span>{order.userId}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">Total:</span>
            <span>${order.totalAmount}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">Status:</span>
            <span>{order.status}</span>
          </div>
          <div className="flex space-x-4 mt-4">
            <button className="text-blue-500">View</button>
            <button className="text-red-500">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
