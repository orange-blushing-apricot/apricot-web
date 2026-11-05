import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist } from "next/font/google";
import { CartProvider } from "@/components/cart-provider";
import { Header } from "@/components/header";
import { LogoutButton } from "@/components/logout-button";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apricot",
  description: "Everything apricot, delivered.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <CartProvider>
          <Header>
            <Suspense fallback={null}>
              <LogoutButton />
            </Suspense>
          </Header>
          <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
