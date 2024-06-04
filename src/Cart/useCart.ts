import { useState, useEffect } from 'react';
import { Course } from '../Courses/types';

export const useCart = () => {
  const [cart, setCart] = useState<Course[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addItem = (item: Course) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart;
      }
      return [...prevCart, item];
    });
  };

  const removeItem = (itemId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return {
    cart,
    addItem,
    removeItem,
    clearCart,
    getCartTotal,
  };
};
