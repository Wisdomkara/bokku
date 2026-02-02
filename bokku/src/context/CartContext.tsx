import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type CartItem = {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
  category: string;
};

type CartContextType = {
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  cartTotal: string;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('bokku_cart');
        if (saved) {
          return JSON.parse(saved);
        }
      }
    } catch (e) {
      console.warn('Failed to load cart from localStorage', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('bokku_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  // Open cart automatically when item is added
  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
             const newQuantity = item.quantity + delta;
             return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
          }
          return item;
        })
    );
  };

  const cartTotal = cartItems.reduce((acc, item) => {
     // Assuming price is like "₦5,000", remove non-numeric chars
     const priceNum = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
     return (acc + priceNum * item.quantity); // Keep as number context for now, format later
  }, 0).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' });

  return (
    <CartContext.Provider
      value={{
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal
      }}
    >
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
