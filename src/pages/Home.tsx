import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const { data: products, isLoading } = useProducts({ ordering: "-price" });
  const hero = products?.[0];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-br from-prism-violet/20 via-prism-coral/10 to-prism-mint/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-16 lg:grid-cols-12 lg:gap-6 lg:px-10 lg:pt-24">
          <div className="lg:col-span-6">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-mono text-xs uppercase tracking-[0.24em] text-prism-mint"
            >
              Six devices. No filler.
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
            >
              Flagship phones,
              <br />
              reduced to{" "}
              <span className="spectral-text">light and form</span>.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mt-6 max-w-md text-base text-muted"
            >
              LUMEN carries only the smartphones worth photographing, each one tested, kept in stock,
              and shot the way its designers intended. No filler catalog, no dead listings.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="mt-9 flex items-center gap-4"
            >
              <Link
                to="/collection"
                className="rounded-full bg-text px-7 py-3 font-mono text-xs uppercase tracking-[0.18em] text-ink transition-transform hover:scale-[1.03]"
              >
                View the collection
              </Link>
              <span className="font-mono text-xs text-muted">{products?.length ?? "..."} devices, in stock now</span>
            </motion.div>
          </div>

          <div className="lg:col-span-6">
            {hero && (
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="lens-card flex aspect-[4/5] items-center justify-center overflow-hidden rounded-3xl p-10"
              >
                {hero.primary_image && (
                  <motion.img
                    src={hero.primary_image}
                    alt={hero.name}
                    className="h-full w-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
                    animate={{ y: [0, -14, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </motion.div>
            )}
          </div>
        </div>
        <div className="spectral-line" />
      </section>

      {/* Featured grid */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">The collection</p>
            <h2 className="mt-2 font-display text-3xl font-semibold">Every device we sell</h2>
          </div>
          <Link
            to="/collection"
            className="hidden font-mono text-xs uppercase tracking-[0.18em] text-muted hover:text-prism-violet sm:block"
          >
            See all →
          </Link>
        </div>

        {isLoading && <p className="text-muted">Loading devices…</p>}

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {products?.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
