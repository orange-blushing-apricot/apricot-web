import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="rounded-lg border border-orange-100 p-4 transition hover:border-orange-300 hover:shadow-sm"
    >
      <div className="mb-3 flex aspect-square items-center justify-center rounded bg-orange-100 text-4xl">
        🍑
      </div>
      <h3 className="font-medium">{product.name}</h3>
      <p className="text-sm text-gray-500">{product.sku}</p>
      <p className="mt-2 font-semibold">{formatPrice(product.price)}</p>
    </Link>
  );
}
