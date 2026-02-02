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
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
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
          const parsed = JSON.parse(saved) as Partial<CartItem>[];
          return parsed
            .filter((item) => item && typeof item.id === 'string' && typeof item.name === 'string')
            .map((item) => ({
              id: item.id!,
              name: item.name!,
              price: typeof item.price === 'string' ? item.price : '',
              image: typeof item.image === 'string' ? item.image : '',
              category: typeof item.category === 'string' ? item.category : '',
              quantity:
                typeof item.quantity === 'number' && Number.isFinite(item.quantity) && item.quantity > 0
                  ? Math.floor(item.quantity)
                  : 1,
            }));
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
  const addToCart = (product: Omit<CartItem, 'quantity'>, quantity = 1) => {
    const safeQuantity = Number.isFinite(quantity) && quantity > 0 ? Math.floor(quantity) : 1;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + safeQuantity } : item
        );
      }
      return [...prev, { ...product, quantity: safeQuantity }];
    });
    setIsOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.flatMap((item) => {
        if (item.id !== id) return [item];
        const newQuantity = item.quantity + delta;
        if (newQuantity <= 0) return [];
        return [{ ...item, quantity: newQuantity }];
      })
    );
  };

  const cartTotal = cartItems.reduce((acc, item) => {
     // Assuming price is like "₦5,000", remove non-numeric chars
     const priceText = typeof item.price === 'string' ? item.price : '';
     const priceNum = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0;
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
