import Link from "next/link";
import { Suspense } from "react";
import { listOrders } from "@/lib/api";
import { formatPrice } from "@/lib/format";
import type { OrderStatus } from "@/lib/types";
import { cancel } from "./actions";

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-blue-100 text-blue-800",
  shipped: "bg-green-100 text-green-800",
  cancelled: "bg-gray-100 text-gray-600",
};

const filters: Record<string, OrderStatus[]> = {
  open: ["pending", "paid"],
  shipped: ["shipped"],
  cancelled: ["cancelled"],
};

const tabs = [
  { label: "All", value: undefined },
  { label: "Open", value: "open" },
  { label: "Shipped", value: "shipped" },
  { label: "Cancelled", value: "cancelled" },
];

type SearchParams = PageProps<"/orders">["searchParams"];

async function activeFilter(searchParams: SearchParams) {
  const { status } = await searchParams;
  return typeof status === "string" && status in filters ? status : undefined;
}

async function OrderTabs({ searchParams }: { searchParams: SearchParams }) {
  const active = await activeFilter(searchParams);

  return (
    <nav className="mb-4 flex gap-2 text-sm">
      {tabs.map((t) => (
        <Link
          key={t.label}
          href={t.value ? `/orders?status=${t.value}` : "/orders"}
          aria-current={t.value === active ? "page" : undefined}
          className={`rounded px-3 py-1.5 ${
            t.value === active ? "bg-orange-600 text-white" : "text-gray-600 hover:bg-orange-50"
          }`}
        >
          {t.label}
        </Link>
      ))}
    </nav>
  );
}

async function OrderList({ searchParams }: { searchParams: SearchParams }) {
  const active = await activeFilter(searchParams);
  const orders = await listOrders(active ? filters[active] : []);
  if (orders.length === 0) {
    return (
      <p className="text-gray-500">{active ? "No orders match this filter" : "No orders yet."}</p>
    );
  }

  return (
    <ul className="space-y-3">
      {orders.map((o) => (
        <li key={o.id} className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <p className="font-medium">Order #{o.id}</p>
            <p className="text-sm text-gray-500">
              {new Date(o.created_at).toLocaleDateString()} · {o.items.length} items
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className={`rounded px-2 py-0.5 text-xs ${statusStyles[o.status]}`}>
              {o.status}
            </span>
            <span className="font-semibold">{formatPrice(o.total)}</span>
            {(o.status === "pending" || o.status === "paid") && (
              <form action={cancel.bind(null, o.id)}>
                <button className="text-sm text-red-600 hover:underline">Cancel</button>
              </form>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function OrdersPage({ searchParams }: PageProps<"/orders">) {
  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold">Orders</h1>
      <Suspense fallback={<p className="text-gray-500">Loading orders…</p>}>
        <OrderTabs searchParams={searchParams} />
        <OrderList searchParams={searchParams} />
      </Suspense>
    </>
  );
}
