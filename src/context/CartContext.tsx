import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode, useMemo } from 'react';
import { Product, CartItem } from '../types';
import { PRODUCTS, AVAILABLE_PROMOS } from '../data/products';
import { useToast } from './ToastContext';
import { AudioService } from '../services/audio';

interface CartContextValue {
  items: CartItem[];
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (product: Product, size?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  appliedPromo: string | null;
  discountPercent: number;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  useCredits: boolean;
  toggleUseCredits: () => void;
  subtotal: number;
  discountAmount: number;
  creditsDiscount: number;
  shipping: number;
  total: number;
  totalCount: number;
}

const STORAGE_KEY = 'techwear_cart_items_v2';

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed
            .map((item: CartItem) => {
              const liveProduct = PRODUCTS.find((p) => p.id === item.product?.id);
              if (!liveProduct) return null;
              return {
                ...item,
                product: liveProduct
              };
            })
            .filter((item): item is CartItem => item !== null);
        }
      }
    } catch {}
    return [];
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [useCredits, setUseCredits] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const openDrawer = useCallback(() => {
    setIsDrawerOpen(true);
    AudioService.playClick();
  }, []);

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    AudioService.playClick();
  }, []);

  const addItem = useCallback((product: Product, size?: string) => {
    const chosenSize = size || product.sizes[0] || 'STD';
    const itemId = `${product.id}-${chosenSize}`;

    setItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: itemId, product, quantity: 1, selectedSize: chosenSize }];
    });

    AudioService.playSuccess();
    showToast('MODULE MOUNTED //', `${product.name} [${chosenSize}] added to loadout`, 'blue');
  }, [showToast]);

  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => {
      const target = prev.find((i) => i.id === itemId);
      if (target) {
        showToast('MODULE UNMOUNTED //', `${target.product.name} removed from loadout`, 'pink');
      }
      return prev.filter((i) => i.id !== itemId);
    });
    AudioService.playClick();
  }, [showToast]);

  const updateQuantity = useCallback((itemId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
    AudioService.playClick();
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const applyPromo = useCallback((code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (AVAILABLE_PROMOS[clean]) {
      setAppliedPromo(clean);
      AudioService.playSuccess();
      showToast('CIPHER AUTHORIZED //', `Discount code [${clean}] applied (-${AVAILABLE_PROMOS[clean]}%)`, 'green');
      return true;
    } else {
      AudioService.playAlert();
      showToast('ACCESS DENIED //', 'Invalid or expired cipher key', 'error');
      return false;
    }
  }, [showToast]);

  const removePromo = useCallback(() => {
    setAppliedPromo(null);
    AudioService.playClick();
  }, []);

  const toggleUseCredits = useCallback(() => {
    setUseCredits((prev) => !prev);
    AudioService.playClick();
  }, []);

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [items]);

  const discountPercent = appliedPromo ? AVAILABLE_PROMOS[appliedPromo] || 0 : 0;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);

  // Free shipping over $200
  const shipping = subtotal > 200 || subtotal === 0 ? 0 : 15;

  // Max 50 credits discount if enabled
  const creditsDiscount = useCredits ? Math.min(50, Math.max(0, subtotal - discountAmount)) : 0;

  const total = Math.max(0, subtotal - discountAmount - creditsDiscount + (items.length > 0 ? shipping : 0));

  const totalCount = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        appliedPromo,
        discountPercent,
        applyPromo,
        removePromo,
        useCredits,
        toggleUseCredits,
        subtotal,
        discountAmount,
        creditsDiscount,
        shipping,
        total,
        totalCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within CartProvider');
  }
  return ctx;
};
