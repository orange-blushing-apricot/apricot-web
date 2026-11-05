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
      {product.stock === 0 ? (
        <p className="mt-2 font-semibold text-gray-500">Sold out</p>
      ) : (
        <p className="mt-2 font-semibold">{formatPrice(product.price)}</p>
      )}
      {product.stock > 0 && product.stock < 10 && (
        <span className="mt-2 inline-block rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
          Only {product.stock} left
        </span>
      )}
    </Link>
  );
}
