import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProductWithPowers } from '@/hooks/useSupabase';

export type CartItem = {
  product: ProductWithPowers;
  power: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (product: ProductWithPowers, power: string) => void;
  removeItem: (productId: number, power: string) => void;
  updateQuantity: (productId: number, power: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);
  
  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);
  
  // Add item to cart
  const addItem = (product: ProductWithPowers, power: string) => {
    setItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.id === product.id && item.power === power
      );
      
      if (existingItemIndex >= 0) {
        // Increase quantity if it already exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, { product, power, quantity: 1 }];
      }
    });
  };
  
  // Remove item from cart
  const removeItem = (productId: number, power: string) => {
    setItems((prevItems) => 
      prevItems.filter(
        (item) => !(item.product.id === productId && item.power === power)
      )
    );
  };
  
  // Update item quantity
  const updateQuantity = (productId: number, power: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, power);
      return;
    }
    
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.product.id === productId && item.power === power) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };
  
  // Clear cart
  const clearCart = () => {
    setItems([]);
  };
  
  // Calculate total items
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
