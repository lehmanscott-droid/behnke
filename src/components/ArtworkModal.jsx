import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import TextureZoom from './TextureZoom.jsx'
import StudioLightSwitch, { LIGHT_MODES } from './StudioLightSwitch.jsx'

// ---------------------------------------------------------------------------
// ArtworkModal — the Context Engine
// ---------------------------------------------------------------------------
// Full-screen overlay. Left: the Macro Texture Zoom viewer on a "wall" whose
// lighting is driven by the Studio Light Switch. Right: metadata + the
// INQUIRE / BUY PIECE call to action, which opens the CheckoutCart.

export default function ArtworkModal({ painting, onClose, onBuy }) {
  const [light, setLight] = useState('spotlight')
  const open = Boolean(painting)

  // Reset lighting each time a new piece is opened.
  useEffect(() => {
    if (painting) setLight('spotlight')
  }, [painting?.id])

  // Close on Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const mode = LIGHT_MODES[light]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[65] flex items-stretch bg-ink-900/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={painting.title}
        >
          <div className="flex h-full w-full flex-col lg:flex-row">
            {/* ---------------------------------------------------------- */}
            {/* LEFT — viewing wall + texture zoom                          */}
            {/* ---------------------------------------------------------- */}
            <div
              className="relative flex min-h-[45vh] flex-1 items-center justify-center overflow-hidden p-6 transition-[background] duration-500 lg:min-h-full lg:p-10"
              style={{ background: mode.stage }}
            >
              <motion.div
                key={painting.id}
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 26 }}
                className="h-full w-full transition-[filter] duration-500"
                style={{ filter: `${mode.artFilter} drop-shadow(${mode.artShadow})` }}
              >
                <TextureZoom
                  src={painting.image}
                  hiRes={painting.hiRes}
                  alt={painting.title}
                />
              </motion.div>

              {/* Close (mobile-friendly, top-left of stage) */}
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute left-4 top-4 z-10 border border-white/25 bg-ink-900/70 px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-white/80 backdrop-blur hover:border-electric hover:text-electric lg:hidden"
              >
                ← back
              </button>
            </div>

            {/* ---------------------------------------------------------- */}
            {/* RIGHT — context panel                                       */}
            {/* ---------------------------------------------------------- */}
            <motion.aside
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.05, duration: 0.4 }}
              className="scanlines relative flex w-full flex-col border-t border-white/10 bg-ink-800 lg:w-[420px] lg:border-l lg:border-t-0"
            >
              {/* Panel header */}
              <div className="flex items-start justify-between border-b border-white/10 px-6 py-5">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                    {painting.year} · No.{painting.id}
                  </p>
                  <h2 className="mt-1 font-display text-3xl leading-none text-white">
                    {painting.title}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="hidden shrink-0 border border-white/20 px-2 py-1 font-mono text-xs text-neutral-400 hover:border-hotpink hover:text-hotpink lg:block"
                >
                  ✕
                </button>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto px-6 py-5">
                {/* Spec grid */}
                <dl className="grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 text-sm">
                  <Spec label="Dimensions" value={painting.dimensions} />
                  <Spec label="Year" value={String(painting.year)} />
                  <Spec label="Medium" value={painting.medium} span />
                  <Spec label="Price" value={painting.price} accent="electric" />
                  <Spec label="Status" value={painting.status} accent="pink" />
                </dl>

                {/* Artist notes */}
                <div className="mt-6">
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500">
                    Artist Notes
                  </p>
                  <p className="font-mono text-sm leading-relaxed text-neutral-300">
                    {painting.notes}
                  </p>
                </div>

                {/* Light switch */}
                <div className="mt-6 border-t border-white/10 pt-6">
                  <StudioLightSwitch value={light} onChange={setLight} />
                </div>
              </div>

              {/* Sticky CTA */}
              <div className="border-t border-white/10 bg-ink-800 p-5">
                <button
                  onClick={() => onBuy(painting)}
                  className="group relative w-full overflow-hidden border-2 border-hotpink px-5 py-4 font-display text-lg uppercase tracking-wide text-white transition-colors hover:bg-hotpink hover:text-ink-900"
                >
                  <span className="relative z-10">Inquire / Buy Piece</span>
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-hotpink/20 transition-transform duration-500 group-hover:translate-x-0" />
                </button>
              </div>
            </motion.aside>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Spec({ label, value, span, accent }) {
  const color =
    accent === 'electric'
      ? 'text-electric'
      : accent === 'pink'
        ? 'text-hotpink'
        : 'text-neutral-100'
  return (
    <div className={`bg-ink-800 px-3 py-3 ${span ? 'col-span-2' : ''}`}>
      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
        {label}
      </dt>
      <dd className={`mt-1 font-mono text-sm ${color}`}>{value}</dd>
    </div>
  )
}
