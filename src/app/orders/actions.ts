"use server";

import { refresh } from "next/cache";
import { cancelOrder } from "@/lib/api";
import { requireSession } from "@/lib/auth";

export async function cancel(orderId: number) {
  await requireSession();
  await cancelOrder(orderId);
  refresh();
}
