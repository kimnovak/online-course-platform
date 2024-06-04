import React from 'react';

import { useCart } from './useCart';
import { Link } from '@tanstack/react-router';

export const Cart: React.FC = () => {
  const { cart, removeItem, getCartTotal } = useCart();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-4">
          <ul>
            {cart.map(item => (
              <li
                key={item.id}
                className="flex justify-between items-center border-b border-gray-200 py-2"
              >
                <div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-gray-600">${item.price}</p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-4 px-2 py-1 text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-4">
            <h2 className="text-xl font-semibold">
              Total: ${getCartTotal().toFixed(2)}
            </h2>
            <Link
              to="/checkout"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
