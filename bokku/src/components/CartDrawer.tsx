import { useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
  const { isOpen, closeCart, cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeCart]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-blue-950/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <h2 className="text-lg font-bold text-slate-900 font-display">Your Cart ({cartItems.length})</h2>
            <button
              onClick={closeCart}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-red-500 transition"
            >
              <i className="fa-solid fa-xmark" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
            {cartItems.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-slate-300">
                  <i className="fa-solid fa-basket-shopping text-2xl" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">Your bag is empty</h3>
                <p className="mb-6 max-w-[200px] text-sm text-slate-500">
                  Looks like you haven't added anything to your cart yet.
                </p>
                <button
                  onClick={closeCart}
                  className="rounded-full bg-blue-950 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-primary"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100 border border-slate-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-slate-900 line-clamp-2 text-sm pr-2">
                            {item.name}
                          </h4>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-400 hover:text-red-500 p-1"
                          >
                           <i className="fa-regular fa-trash-can text-xs" />
                          </button>
                        </div>
                        <p className="text-xs text-slate-500">{item.category}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-slate-200">
                           <button 
                             onClick={() => updateQuantity(item.id, -1)}
                             className="flex h-7 w-7 items-center justify-center text-slate-400 hover:text-slate-900"
                           >
                             <i className="fa-solid fa-minus text-[10px]" />
                           </button>
                           <span className="w-6 text-center text-sm font-semibold text-slate-900">{item.quantity}</span>
                           <button 
                             onClick={() => updateQuantity(item.id, 1)}
                             className="flex h-7 w-7 items-center justify-center text-slate-400 hover:text-slate-900"
                           >
                             <i className="fa-solid fa-plus text-[10px]" />
                           </button>
                        </div>
                        <span className="text-sm font-bold text-slate-900">{item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-slate-100 bg-white p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-slate-500">Subtotal</span>
                <span className="text-xl font-bold text-slate-900">{cartTotal}</span>
              </div>
              <p className="mb-4 text-xs text-slate-400 text-center">
                Taxes and shipping calculated at checkout
              </p>
              <button className="w-full rounded-full bg-blue-950 py-3.5 text-base font-bold text-white transition hover:bg-primary active:scale-95 shadow-lg shadow-slate-900/10">
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
