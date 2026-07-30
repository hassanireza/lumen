import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useProduct } from "../hooks/useProducts";
import { formatPrice } from "../lib/format";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading } = useProduct(slug);
  const [activeImage, setActiveImage] = useState(0);

  if (isLoading) {
    return <div className="mx-auto max-w-7xl px-6 py-24 text-muted lg:px-10">Loading device…</div>;
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <p className="text-muted">We couldn't find that device.</p>
        <Link to="/collection" className="mt-4 inline-block font-mono text-xs uppercase tracking-widest text-prism-violet">
          ← Back to collection
        </Link>
      </div>
    );
  }

  const specs = Object.entries(product.specifications ?? {});
  const activeUrl = product.images[activeImage]?.url ?? product.images[0]?.url;

  return (
    <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
      <Link to="/collection" className="font-mono text-xs uppercase tracking-widest text-muted hover:text-prism-violet">
        ← Collection
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-10">
        {/* Gallery */}
        <div className="lg:col-span-7">
          <div className="lens-card relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl p-10">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeUrl}
                src={activeUrl ?? undefined}
                alt={product.name}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
              />
            </AnimatePresence>
          </div>

          {product.images.length > 1 && (
            <div className="mt-4 flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImage(i)}
                  className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border p-2 transition-colors ${
                    i === activeImage ? "border-prism-violet" : "border-line hover:border-muted"
                  }`}
                >
                  <img src={img.url} alt="" className="h-full w-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="lg:col-span-5">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">{product.brand.name}</p>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-tight">{product.name}</h1>
          <p className="mt-4 text-muted">{product.short_description}</p>

          <div className="mt-6 flex items-center gap-3">
            <span className="font-mono text-2xl text-text">{formatPrice(product.price)}</span>
            {product.compare_price && (
              <span className="font-mono text-base text-muted line-through">{formatPrice(product.compare_price)}</span>
            )}
            {product.discount_percentage > 0 && (
              <span className="rounded-full bg-prism-coral/15 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-prism-coral">
                Save {product.discount_percentage}%
              </span>
            )}
          </div>

          <p className={`mt-4 font-mono text-xs uppercase tracking-widest ${product.in_stock ? "text-prism-mint" : "text-prism-coral"}`}>
            {product.in_stock ? `In stock · ${product.stock} units` : "Out of stock"}
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!product.in_stock}
            className="mt-8 w-full rounded-full bg-text py-4 font-mono text-xs uppercase tracking-[0.18em] text-ink transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          >
            {product.in_stock ? "Add to bag" : "Notify me"}
          </motion.button>

          <div className="spectral-line my-10" />

          <div>
            <h2 className="font-display text-lg font-semibold">About this device</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted">{product.description}</p>
          </div>

          {specs.length > 0 && (
            <div className="mt-10">
              <h2 className="font-display text-lg font-semibold">Specifications</h2>
              <dl className="mt-4 divide-y divide-line/60 border-y border-line/60">
                {specs.map(([key, value]) => (
                  <div key={key} className="flex items-start justify-between gap-6 py-3">
                    <dt className="font-mono text-xs uppercase tracking-widest text-muted">{key}</dt>
                    <dd className="text-right text-sm text-text">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-muted">SKU {product.sku}</p>
        </div>
      </div>
    </div>
  );
}
