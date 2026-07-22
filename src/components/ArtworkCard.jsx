import { motion } from 'framer-motion'

// ---------------------------------------------------------------------------
// ArtworkCard — a single tile on the Interactive Studio Wall
// ---------------------------------------------------------------------------
// Framer Motion supplies the tilt + lift on hover; the RGB-split glitch layers
// (see index.css .glitch-r / .glitch-b) fire via the `group` hover state.
// Sits inside a CSS-columns masonry, so the outer wrapper controls the break.

export default function ArtworkCard({ painting, onOpen, index }) {
  return (
    <motion.button
      layout
      onClick={() => onOpen(painting)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.06 }}
      whileHover={{ rotate: -1.2, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      className="group relative mb-4 block w-full overflow-hidden border border-white/10 bg-ink-800 text-left outline-none focus-visible:ring-2 focus-visible:ring-electric"
      aria-label={`Open ${painting.title}`}
    >
      {/* Base image */}
      <img
        src={painting.image}
        alt={painting.title}
        loading="lazy"
        draggable={false}
        className="block w-full transition-[filter] duration-300 group-hover:contrast-125 group-hover:saturate-150"
      />

      {/* RGB-split glitch layers (only visible on hover) */}
      <div
        className="glitch-layer glitch-r"
        style={{ backgroundImage: `url(${painting.image})` }}
        aria-hidden="true"
      />
      <div
        className="glitch-layer glitch-b"
        style={{ backgroundImage: `url(${painting.image})` }}
        aria-hidden="true"
      />

      {/* Neon scan-border on hover */}
      <span className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-300 group-hover:border-electric/70 group-hover:shadow-[inset_0_0_30px_rgba(0,229,255,0.15)]" />

      {/* Bottom caption bar */}
      <div className="absolute inset-x-0 bottom-0 translate-y-1 bg-gradient-to-t from-ink-900 via-ink-900/80 to-transparent px-3 pb-3 pt-10 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="flex items-end justify-between gap-2">
          <div>
            <h3 className="font-display text-lg leading-none text-white">
              {painting.title}
            </h3>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-neutral-400">
              {painting.year} · {painting.dimensions}
            </p>
          </div>
          <span className="shrink-0 border border-hotpink/70 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-hotpink">
            {painting.price}
          </span>
        </div>
      </div>

      {/* Always-visible index tag, brutalist detail */}
      <span className="absolute left-2 top-2 font-mono text-[10px] uppercase tracking-widest text-white/40">
        {String(index + 1).padStart(2, '0')}
      </span>
    </motion.button>
  )
}
