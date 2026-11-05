import type { Order, Product } from "./types";

export const mockProducts: Product[] = [
  { id: 1, sku: "APR-001", name: "Dried Apricots 500g", description: "Sun-dried Turkish apricots.", price: "8.90", stock: 120, image_url: null, active: true },
  { id: 2, sku: "APR-002", name: "Apricot Jam", description: "Small-batch jam, 340g jar.", price: "6.50", stock: 80, image_url: null, active: true },
  { id: 3, sku: "APR-003", name: "Apricot Kernel Oil", description: "Cold-pressed, 100ml.", price: "14.00", stock: 4, image_url: null, active: true },
  { id: 4, sku: "APR-004", name: "Fresh Apricots 1kg", description: "Seasonal, hand-picked.", price: "5.20", stock: 200, image_url: null, active: true },
  { id: 5, sku: "APR-005", name: "Apricot Tea Blend", description: "Black tea with apricot pieces.", price: "9.75", stock: 0, image_url: null, active: true },
  { id: 6, sku: "APR-006", name: "Apricot Granola", description: "Oats, almonds and apricot.", price: "7.30", stock: 90, image_url: null, active: true },
];

export const mockOrders: Order[] = [
  {
    id: 1,
    status: "shipped",
    total: "21.30",
    created_at: "2026-10-01T10:00:00Z",
    items: [
      { product_id: 2, quantity: 2, unit_price: "6.50" },
      { product_id: 4, quantity: 1, unit_price: "5.20" },
    ],
  },
];
