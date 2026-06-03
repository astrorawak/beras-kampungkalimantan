import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product, Currency, Language } from '../types';

interface CartStore {
  items: CartItem[];
  currency: Currency;
  language: Language;
  addItem: (product: Product, qty?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, qty: number) => void;
  clearCart: () => void;
  setCurrency: (c: Currency) => void;
  setLanguage: (l: Language) => void;
  getTotalIDR: () => number;
  getTotalUSD: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      currency: 'IDR',
      language: 'id',
      addItem: (product, qty = 1) => set((s) => {
        const existing = s.items.find((i) => i.product.id === product.id);
        if (existing) return { items: s.items.map((i) => i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i) };
        return { items: [...s.items, { product, quantity: qty }] };
      }),
      removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i.product.id !== id) })),
      updateQuantity: (id, qty) => set((s) => {
        if (qty <= 0) return { items: s.items.filter((i) => i.product.id !== id) };
        return { items: s.items.map((i) => i.product.id === id ? { ...i, quantity: qty } : i) };
      }),
      clearCart: () => set({ items: [] }),
      setCurrency: (c) => set({ currency: c }),
      setLanguage: (l) => set({ language: l }),
      getTotalIDR: () => get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
      getTotalUSD: () => get().items.reduce((sum, i) => sum + i.product.priceUSD * i.quantity, 0),
    }),
    { name: 'beras-kampung-cart' }
  )
);
