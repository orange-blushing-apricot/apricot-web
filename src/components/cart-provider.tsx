"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";
import type { CartLine } from "@/lib/types";

const STORAGE_KEY = "apricot-cart";

type CartContextValue = {
  lines: CartLine[];
  add: (line: Omit<CartLine, "quantity">, quantity?: number) => void;
  setQuantity: (productId: number, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function readCart() {
  return localStorage.getItem(STORAGE_KEY) ?? "[]";
}

function writeCart(lines: CartLine[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  listeners.forEach((l) => l());
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const raw = useSyncExternalStore(subscribe, readCart, () => "[]");
  const lines = useMemo<CartLine[]>(() => JSON.parse(raw), [raw]);
  const persist = writeCart;

  function add(line: Omit<CartLine, "quantity">, quantity = 1) {
    const existing = lines.find((l) => l.productId === line.productId);
    persist(
      existing
        ? lines.map((l) =>
            l.productId === line.productId ? { ...l, quantity: l.quantity + quantity } : l,
          )
        : [...lines, { ...line, quantity }],
    );
  }

  function setQuantity(productId: number, quantity: number) {
    persist(
      quantity <= 0
        ? lines.filter((l) => l.productId !== productId)
        : lines.map((l) => (l.productId === productId ? { ...l, quantity } : l)),
    );
  }

  return (
    <CartContext value={{ lines, add, setQuantity, clear: () => persist([]) }}>
      {children}
    </CartContext>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
