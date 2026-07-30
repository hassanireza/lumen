import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link to="/" className="font-display text-xl font-semibold tracking-tight">
          LUMEN
          <span className="spectral-text">.</span>
        </Link>

        <nav className="hidden items-center gap-8 font-mono text-xs uppercase tracking-[0.18em] text-muted md:flex">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "text-text" : "hover:text-text transition-colors")}
          >
            Index
          </NavLink>
          <NavLink
            to="/collection"
            className={({ isActive }) => (isActive ? "text-text" : "hover:text-text transition-colors")}
          >
            Collection
          </NavLink>
        </nav>

        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
          <Link
            to="/collection"
            className="rounded-full border border-line px-5 py-2 font-mono text-xs uppercase tracking-[0.18em] text-text transition-colors hover:border-prism-violet hover:text-prism-violet"
          >
            Shop now
          </Link>
        </motion.div>
      </div>
      <div className="spectral-line" />
    </header>
  );
}
