"use server";

import { refresh } from "next/cache";
import { cancelOrder } from "@/lib/api";

export async function cancel(orderId: number) {
  await cancelOrder(orderId);
  refresh();
}
