"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/format";
import { checkout } from "./actions";

export default function CartPage() {
  const { lines, setQuantity, clear } = useCart();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const total = lines.reduce((sum, l) => sum + Number(l.price) * l.quantity, 0);

  function onCheckout() {
    startTransition(async () => {
      const result = await checkout(
        lines.map((l) => ({ product_id: l.productId, quantity: l.quantity })),
      );
      if (result.ok) {
        clear();
        setMessage(`Order #${result.orderId} placed`);
      } else {
        setMessage(result.error);
      }
    });
  }

  if (lines.length === 0) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Cart</h1>
        {message && <p className="text-green-700">{message}</p>}
        <p className="text-gray-500">
          Your cart is empty. <Link href="/" className="text-orange-700 underline">Keep shopping</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Cart</h1>
      <ul className="divide-y rounded-lg border">
        {lines.map((l) => (
          <li key={l.productId} className="flex items-center justify-between p-4">
            <span>{l.name}</span>
            <div className="flex items-center gap-4">
              <input
                type="number"
                min={0}
                value={l.quantity}
                onChange={(e) => setQuantity(l.productId, Number(e.target.value))}
                className="w-16 rounded border px-2 py-1"
              />
              <span className="w-20 text-right">{formatPrice(Number(l.price) * l.quantity)}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">Total {formatPrice(total)}</span>
        <button
          onClick={onCheckout}
          disabled={pending}
          className="rounded bg-orange-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {pending ? "Placing order…" : "Checkout"}
        </button>
      </div>
      {message && <p className="text-red-600">{message}</p>}
    </div>
  );
}
