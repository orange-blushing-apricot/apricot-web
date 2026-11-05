export type Product = {
  id: number;
  sku: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  image_url: string | null;
  active: boolean;
};

export type ProductPage = {
  items: Product[];
  total: number;
  page: number;
  page_size: number;
};

export type OrderStatus = "pending" | "paid" | "shipped" | "cancelled";

export type OrderItem = {
  product_id: number;
  quantity: number;
  unit_price: string;
};

export type Order = {
  id: number;
  status: OrderStatus;
  total: string;
  created_at: string;
  items: OrderItem[];
};

export type CartLine = {
  productId: number;
  name: string;
  price: string;
  quantity: number;
};
