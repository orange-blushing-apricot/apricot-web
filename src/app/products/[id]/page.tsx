import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AddToCart } from "@/components/add-to-cart";
import { getProduct } from "@/lib/api";
import { formatPrice } from "@/lib/format";

async function ProductDetail({ params }: { params: PageProps<"/products/[id]">["params"] }) {
  const { id } = await params;
  const product = await getProduct(Number(id));
  if (!product) notFound();

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="flex aspect-square items-center justify-center rounded-lg bg-orange-100 text-8xl">
        🍑
      </div>
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-xl font-semibold">{formatPrice(product.price)}</p>
        <p className="text-sm text-gray-500">{product.stock} in stock</p>
        <AddToCart product={product} />
      </div>
    </div>
  );
}

export default function ProductPage({ params }: PageProps<"/products/[id]">) {
  return (
    <Suspense fallback={<p className="text-gray-500">Loading…</p>}>
      <ProductDetail params={params} />
    </Suspense>
  );
}
