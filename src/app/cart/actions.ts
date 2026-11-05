"use server";

import { ApiError, createOrder } from "@/lib/api";

export type CheckoutResult = { ok: true; orderId: number } | { ok: false; error: string };

export async function checkout(
  items: { product_id: number; quantity: number }[],
): Promise<CheckoutResult> {
  try {
    const order = await createOrder(items);
    return { ok: true, orderId: order.id };
  } catch (e) {
    if (e instanceof ApiError) return { ok: false, error: e.message };
    throw e;
  }
}
