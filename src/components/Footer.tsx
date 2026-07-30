export default function Footer() {
  return (
    <footer className="border-t border-line/60 mt-32">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-lg font-semibold">
              LUMEN<span className="spectral-text">.</span>
            </p>
            <p className="mt-3 max-w-xs text-sm text-muted">
              A small, curated collection of the finest smartphones, chosen for what they reveal, not what they promise.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 font-mono text-xs uppercase tracking-[0.18em] text-muted sm:grid-cols-3">
            <div className="space-y-3">
              <p className="text-text/70">Store</p>
              <p>Collection</p>
              <p>Shipping</p>
              <p>Returns</p>
            </div>
            <div className="space-y-3">
              <p className="text-text/70">Company</p>
              <p>About</p>
              <p>Journal</p>
              <p>Contact</p>
            </div>
          </div>
        </div>

        <div className="spectral-line my-10" />

        <div className="flex flex-col gap-2 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} LUMEN. All devices, all light.</p>
          <p className="font-mono">Built with Django + React</p>
        </div>
      </div>
    </footer>
  );
}
