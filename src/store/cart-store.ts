"use client";

import { create } from "zustand";
import type { CartItem, Coupon } from "@/types";

/** Coupons the storefront accepts, keyed by their uppercase code. */
const COUPONS: Record<string, Coupon> = {
  GLOW20: { code: "GLOW20", discount: 0.2, label: "Diskon 20% untuk pelanggan baru" },
  GLOW10: { code: "GLOW10", discount: 0.1, label: "Diskon 10% newsletter" },
};

export type CouponStatus = "idle" | "applied" | "invalid";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  coupon: Coupon | null;
  couponStatus: CouponStatus;
  /** Bumped on every add — the navbar badge watches this to trigger its pop. */
  lastAddedAt: number;

  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  /** Adds several products at once (quiz routine / bundle) without reopening the drawer per item. */
  addMany: (items: Omit<CartItem, "quantity">[]) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;

  openCart: () => void;
  closeCart: () => void;

  applyCoupon: (code: string) => CouponStatus;
  removeCoupon: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  coupon: null,
  couponStatus: "idle",
  lastAddedAt: 0,

  addItem: (item, quantity = 1) => {
    set((state) => {
      const existing = state.items.find((entry) => entry.id === item.id);
      const items = existing
        ? state.items.map((entry) =>
            entry.id === item.id ? { ...entry, quantity: entry.quantity + quantity } : entry,
          )
        : [...state.items, { ...item, quantity }];

      return { items, isOpen: true, lastAddedAt: state.lastAddedAt + 1 };
    });
  },

  addMany: (incoming) => {
    set((state) => {
      const items = [...state.items];

      incoming.forEach((item) => {
        const index = items.findIndex((entry) => entry.id === item.id);
        if (index >= 0) {
          items[index] = { ...items[index], quantity: items[index].quantity + 1 };
        } else {
          items.push({ ...item, quantity: 1 });
        }
      });

      return { items, isOpen: true, lastAddedAt: state.lastAddedAt + 1 };
    });
  },

  removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),

  updateQuantity: (id, quantity) => {
    // Dropping to zero removes the line entirely — matches shopper expectation.
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }

    set((state) => ({
      items: state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
    }));
  },

  clearCart: () => set({ items: [], coupon: null, couponStatus: "idle" }),

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  applyCoupon: (code) => {
    const normalized = code.trim().toUpperCase();
    const match = COUPONS[normalized];

    if (!match) {
      set({ coupon: null, couponStatus: "invalid" });
      return "invalid";
    }

    set({ coupon: match, couponStatus: "applied" });
    return "applied";
  },

  removeCoupon: () => set({ coupon: null, couponStatus: "idle" }),
}));

/* ------------------------------------------------------------------ */
/* Derived values                                                      */
/* Kept as plain selectors so components subscribe only to the numbers */
/* they actually render.                                               */
/* ------------------------------------------------------------------ */

export const selectItemCount = (state: CartState) =>
  state.items.reduce((total, item) => total + item.quantity, 0);

export const selectSubtotal = (state: CartState) =>
  state.items.reduce((total, item) => total + item.price * item.quantity, 0);

export const selectDiscount = (state: CartState) => {
  if (!state.coupon) return 0;
  return Math.round(selectSubtotal(state) * state.coupon.discount);
};

export const selectTotal = (state: CartState) => selectSubtotal(state) - selectDiscount(state);
