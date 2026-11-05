"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { useCart } from "./cart-provider";

export function AddToCart({ product }: { product: Product }) {
  const { add } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (product.stock === 0) {
    return <p className="font-medium text-red-600">Out of stock</p>;
  }

  return (
    <div className="flex items-center gap-3">
      <input
        type="number"
        min={1}
        max={product.stock}
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="w-20 rounded border px-2 py-1"
      />
      <button
        onClick={() => {
          add({ productId: product.id, name: product.name, price: product.price }, quantity);
          setAdded(true);
        }}
        className="rounded bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
      >
        Add to cart
      </button>
      {added && <span className="text-sm text-green-700">Added</span>}
    </div>
  );
}
