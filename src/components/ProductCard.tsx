import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="studio-card flex flex-col overflow-hidden transition hover:-translate-y-0.5 hover:border-studio-accent/30 hover:shadow-glow">
      <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br from-studio-panel via-studio-card to-studio-panel">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(245,208,0,0.18),transparent_55%),radial-gradient(ellipse_at_80%_80%,rgba(255,176,32,0.14),transparent_50%)]" />
        <div className="relative z-[1] flex flex-col items-center gap-2 px-4 text-center">
          <span className="text-3xl opacity-80" aria-hidden>
            ◎
          </span>
          <span className="rounded-full border border-white/10 bg-black/40 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur">
            Digital product
          </span>
        </div>
        <span className="absolute right-3 top-3 z-[1] rounded-full border border-studio-accent/30 bg-studio-accent/15 px-2.5 py-0.5 text-xs font-semibold text-studio-accent backdrop-blur">
          {product.price}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="space-y-2">
          <h2 className="text-base font-semibold tracking-tight text-studio-text">
            {product.title}
          </h2>
          <p className="text-sm leading-relaxed text-studio-muted">{product.description}</p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <span className="text-lg font-semibold text-white">{product.price}</span>
          <a
            href={product.polarCheckoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="studio-btn-primary"
          >
            Buy
          </a>
        </div>
      </div>
    </article>
  );
}
