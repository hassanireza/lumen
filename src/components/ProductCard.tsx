import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { ProductListItem } from "../types/catalog";
import { formatPrice } from "../lib/format";

export default function ProductCard({ product, index = 0 }: { product: ProductListItem; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/product/${product.slug}`} className="group block">
        <div className="lens-card relative overflow-hidden rounded-2xl p-6">
          {product.discount_percentage > 0 && (
            <span className="absolute left-4 top-4 z-10 rounded-full bg-prism-coral/15 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-prism-coral">
              −{product.discount_percentage}%
            </span>
          )}
          <div className="flex aspect-square items-center justify-center overflow-hidden">
            {product.primary_image ? (
              <motion.img
                src={product.primary_image}
                alt={product.name}
                className="h-full w-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                whileHover={{ scale: 1.06, rotate: -1.5 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
              />
            ) : (
              <div className="h-full w-full rounded-xl bg-surface-2" />
            )}
          </div>
        </div>

        <div className="mt-5 flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{product.brand.name}</p>
            <h3 className="font-display text-lg font-medium leading-snug transition-colors group-hover:text-prism-violet">
              {product.name}
            </h3>
          </div>
          <div className="text-right">
            <p className="font-mono text-sm text-text">{formatPrice(product.price)}</p>
            {product.compare_price && (
              <p className="font-mono text-xs text-muted line-through">{formatPrice(product.compare_price)}</p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
