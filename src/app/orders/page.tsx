import { Suspense } from "react";
import { listOrders } from "@/lib/api";
import { formatPrice } from "@/lib/format";
import { cancel } from "./actions";

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-blue-100 text-blue-800",
  shipped: "bg-green-100 text-green-800",
  cancelled: "bg-gray-100 text-gray-600",
};

async function OrderList() {
  const orders = await listOrders();
  if (orders.length === 0) return <p className="text-gray-500">No orders yet.</p>;

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

export default function OrdersPage() {
  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold">Orders</h1>
      <Suspense fallback={<p className="text-gray-500">Loading orders…</p>}>
        <OrderList />
      </Suspense>
    </>
  );
}
