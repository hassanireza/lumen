import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-start px-6 py-32 lg:px-10">
      <p className="font-mono text-xs uppercase tracking-widest text-prism-coral">404</p>
      <h1 className="mt-3 font-display text-4xl font-semibold">Nothing to see here.</h1>
      <Link to="/" className="mt-6 font-mono text-xs uppercase tracking-widest text-prism-violet">
        ← Back to LUMEN
      </Link>
    </div>
  );
}
