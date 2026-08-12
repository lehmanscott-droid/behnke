export default function Header() {
  return (
    <header className="border-b border-charcoal-line/30 bg-offwhite">
      <div className="mx-auto max-w-content px-4 py-8">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="inline-block h-10 w-2 rounded-full bg-brick"
          />
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-forest">
            Marion Ct. · Chicago
          </p>
        </div>
        <h1 className="mt-3 text-4xl font-bold leading-tight text-charcoal sm:text-5xl">
          Marion Ct. Hub
        </h1>
        <p className="mt-2 max-w-xl text-lg text-charcoal/80">
          Your neighborhood, connected. Real-time alerts from your block
          captains, plus news, events, and trusted recommendations from
          neighbors.
        </p>
      </div>
    </header>
  );
}
