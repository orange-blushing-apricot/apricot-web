"use server";

import { ApiError, createOrder } from "@/lib/api";
import { requireSession } from "@/lib/auth";

export type CheckoutResult = { ok: true; orderId: number } | { ok: false; error: string };

export async function checkout(
  items: { product_id: number; quantity: number }[],
): Promise<CheckoutResult> {
  await requireSession();
  try {
    const order = await createOrder(items);
    return { ok: true, orderId: order.id };
  } catch (e) {
    if (e instanceof ApiError) return { ok: false, error: e.message };
    throw e;
  }
}
