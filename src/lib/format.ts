const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export function formatPrice(value: string | number): string {
  return currency.format(Number(value));
}
