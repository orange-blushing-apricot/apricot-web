import "server-only";

import { mockOrders, mockProducts } from "./mock";
import type { Order, Product, ProductPage } from "./types";

const API_URL = process.env.APRICOT_API_URL;
const API_KEY = process.env.APRICOT_API_KEY ?? "shopper-demo-key";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
      ...init?.headers,
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(res.status, body.detail ?? res.statusText);
  }
  return res.json();
}

export async function listProducts(q?: string, page = 1): Promise<ProductPage> {
  if (!API_URL) {
    const items = q
      ? mockProducts.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()))
      : mockProducts;
    return { items, total: items.length, page: 1, page_size: 20 };
  }
  const params = new URLSearchParams({ page: String(page) });
  if (q) params.set("q", q);
  return request<ProductPage>(`/products?${params}`);
}

export async function getProduct(id: number): Promise<Product | null> {
  if (!API_URL) return mockProducts.find((p) => p.id === id) ?? null;
  try {
    return await request<Product>(`/products/${id}`);
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) return null;
    throw e;
  }
}

export async function listOrders(): Promise<Order[]> {
  if (!API_URL) return mockOrders;
  return request<Order[]>("/orders");
}

export async function createOrder(
  items: { product_id: number; quantity: number }[],
): Promise<Order> {
  if (!API_URL) {
    return {
      id: Math.floor(Math.random() * 10000),
      status: "pending",
      total: "0.00",
      created_at: new Date().toISOString(),
      items: items.map((i) => ({ ...i, unit_price: "0.00" })),
    };
  }
  return request<Order>("/orders", { method: "POST", body: JSON.stringify({ items }) });
}

export async function cancelOrder(id: number): Promise<Order> {
  if (!API_URL) {
    const order = mockOrders.find((o) => o.id === id);
    if (!order) throw new ApiError(404, "Order not found");
    return { ...order, status: "cancelled" };
  }
  return request<Order>(`/orders/${id}/cancel`, { method: "POST" });
}
