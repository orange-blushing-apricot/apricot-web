import { Suspense } from "react";
import { ProductCard } from "@/components/product-card";
import { listProducts } from "@/lib/api";

async function ProductGrid({ searchParams }: { searchParams: PageProps<"/">["searchParams"] }) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q : undefined;
  const { items, total } = await listProducts(query);

  if (items.length === 0) {
    return <p className="text-gray-500">No products match “{query}”.</p>;
  }

  return (
    <>
      <p className="mb-4 text-sm text-gray-500">{total} products</p>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}

export default function Home({ searchParams }: PageProps<"/">) {
  return (
    <>
      <div className="mb-6 flex items-end justify-between gap-4">
        <h1 className="text-2xl font-semibold">Shop</h1>
        <form className="flex gap-2">
          <input
            name="q"
            placeholder="Search products"
            className="rounded border px-3 py-1.5 text-sm"
          />
          <button className="rounded bg-orange-600 px-3 py-1.5 text-sm text-white">Search</button>
        </form>
      </div>
      <Suspense fallback={<p className="text-gray-500">Loading products…</p>}>
        <ProductGrid searchParams={searchParams} />
      </Suspense>
    </>
  );
}
