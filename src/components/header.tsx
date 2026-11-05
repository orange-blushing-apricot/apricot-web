"use client";

import Link from "next/link";
import { useCart } from "./cart-provider";

export function Header({ children }: { children?: React.ReactNode }) {
  const { lines } = useCart();
  const count = lines.reduce((sum, l) => sum + l.quantity, 0);

  return (
    <header className="border-b border-orange-200 bg-orange-50">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold text-orange-700">
          Apricot
        </Link>
        <div className="flex gap-6 text-sm">
          <Link href="/orders">Orders</Link>
          <Link href="/cart">Cart ({count})</Link>
          {children}
        </div>
      </nav>
    </header>
  );
}
