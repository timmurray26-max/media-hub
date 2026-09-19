import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop",
  description: "Digital products from the studio — buy securely via Polar.",
};

export default function ShopPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-studio-accent">Shop</p>
        <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Digital goods from the studio
        </h1>
        <p className="max-w-2xl text-sm text-studio-muted sm:text-base">
          Browse sellable products. Checkout is handled by Polar — you will leave this site for a
          secure payment page, then get access from Polar.
        </p>
      </section>

      {PRODUCTS.length === 0 ? (
        <div className="studio-card px-6 py-16 text-center">
          <p className="text-studio-muted">Nothing for sale yet. Check back soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
