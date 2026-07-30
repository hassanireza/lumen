import { useState } from "react";
import { motion } from "framer-motion";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";

const SORT_OPTIONS = [
  { value: "", label: "Featured" },
  { value: "price", label: "Price: low to high" },
  { value: "-price", label: "Price: high to low" },
  { value: "name", label: "Name: A–Z" },
];

export default function Collection() {
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("");
  const { data: products, isLoading } = useProducts({ search: search || undefined, ordering: ordering || undefined });

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Full collection</p>
        <h1 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">Every phone, in one place</h1>
      </motion.div>

      <div className="mt-10 flex flex-col gap-4 border-y border-line/60 py-5 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name…"
          className="w-full rounded-full border border-line bg-surface px-5 py-2.5 text-sm text-text placeholder:text-muted focus:border-prism-violet focus:outline-none sm:w-72"
        />
        <select
          value={ordering}
          onChange={(e) => setOrdering(e.target.value)}
          className="w-full rounded-full border border-line bg-surface px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-text focus:border-prism-violet focus:outline-none sm:w-56"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-14">
        {isLoading && <p className="text-muted">Loading devices…</p>}
        {!isLoading && products?.length === 0 && (
          <p className="text-muted">No devices match “{search}”. Try another search.</p>
        )}
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {products?.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
