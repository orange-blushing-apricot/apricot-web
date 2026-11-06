import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-orange-200 bg-orange-50">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-6 text-sm text-orange-900 md:flex-row md:justify-between">
        <p>© Apricot. Grown with care.</p>
        <nav className="flex gap-4">
          <Link href="/">Shop</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/cart">Cart</Link>
        </nav>
      </div>
    </footer>
  );
}
