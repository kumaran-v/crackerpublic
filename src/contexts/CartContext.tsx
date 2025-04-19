
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartState, CartItem, Product } from '@/lib/types';

type CartAction = 
  | { type: 'ADD_ITEM'; payload: { product: Product, quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string, quantity: number } }
  | { type: 'APPLY_PROMO'; payload: { code: string } }
  | { type: 'CLEAR_CART' };

interface CartContextType {
  cart: CartState;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  applyPromoCode: (code: string) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
}

const initialState: CartState = {
  items: [],
  subtotal: 0,
  discount: 0,
  total: 0,
  promoCode: undefined
};

// Get cart from localStorage if it exists
const getInitialState = (): CartState => {
  if (typeof window !== 'undefined') {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  }
  return initialState;
};

const calculateCartTotals = (items: CartItem[], discount = 0) => {
  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity, 
    0
  );
  
  return {
    items,
    subtotal,
    discount,
    total: subtotal - discount
  };
};

// Promotion codes and their discount values (in percentage)
const promoCodes: Record<string, number> = {
  'FESTIVAL10': 10,
  'DIWALI20': 20,
  'SUMMER15': 15
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.product.id === product.id);
      
      let newItems;
      if (existingItemIndex >= 0) {
        // Update quantity if item already exists
        newItems = state.items.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        newItems = [...state.items, { product, quantity }];
      }
      
      return calculateCartTotals(newItems, state.discount);
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.product.id !== action.payload.productId);
      return calculateCartTotals(newItems, state.discount);
    }
    
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        // If quantity is 0 or less, remove the item
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { productId } });
      }
      
      const newItems = state.items.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      );
      
      return calculateCartTotals(newItems, state.discount);
    }
    
    case 'APPLY_PROMO': {
      const { code } = action.payload;
      const discountPercentage = promoCodes[code];
      
      if (!discountPercentage) return state; // Invalid promo code
      
      const discount = Math.round(state.subtotal * (discountPercentage / 100));
      
      return {
        ...state,
        promoCode: code,
        discount,
        total: state.subtotal - discount
      };
    }
    
    case 'CLEAR_CART':
      return initialState;
      
    default:
      return state;
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState, getInitialState);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity: number) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const applyPromoCode = (code: string) => {
    dispatch({ type: 'APPLY_PROMO', payload: { code } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const isInCart = (productId: string) => {
    return cart.items.some(item => item.product.id === productId);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      applyPromoCode,
      clearCart,
      isInCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
