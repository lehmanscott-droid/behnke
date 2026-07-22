import { useState } from 'react'
import paintings from './data/paintings.js'
import GrainOverlay from './components/GrainOverlay.jsx'
import StudioWall from './components/StudioWall.jsx'
import ArtworkModal from './components/ArtworkModal.jsx'
import CheckoutCart from './components/CheckoutCart.jsx'
import AudioPlayer from './components/AudioPlayer.jsx'

// ---------------------------------------------------------------------------
// App — composition root
// ---------------------------------------------------------------------------
// Only two pieces of view state live here: which painting the modal shows, and
// which painting the checkout is securing. The AudioPlayer is a *sibling* of
// both and is never conditionally rendered, so opening the modal or the cart
// never re-mounts it — the music keeps playing uninterrupted.

export default function App() {
  const [active, setActive] = useState(null) // painting shown in modal
  const [checkout, setCheckout] = useState(null) // painting being purchased

  const openModal = (p) => setActive(p)
  const closeModal = () => setActive(null)

  // Buying from the modal: open the cart. We keep the modal mounted underneath
  // so closing the cart returns the viewer to the piece they were inspecting.
  const openCheckout = (p) => setCheckout(p)
  const closeCheckout = () => setCheckout(null)

  return (
    <div className="relative min-h-screen">
      <GrainOverlay />

      {/* ----------------------------------------------------------------- */}
      {/* Header                                                            */}
      {/* ----------------------------------------------------------------- */}
      <header className="mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 sm:pt-16">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 inline-block border border-white/15 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.35em] text-neutral-400">
              Underground Studio · Est. MMXX
            </p>
            <h1 className="font-display text-6xl leading-[0.85] text-white sm:text-7xl md:text-8xl">
              <span className="block">BEHNKE</span>
              <span className="block text-stroke">STUDIO WALL</span>
            </h1>
          </div>
          <p className="max-w-xs font-mono text-xs leading-relaxed text-neutral-400 md:text-right">
            Abstract spray-paint, raw acrylic and mixed-texture works. Hover a
            piece to glitch it, open it to inspect the grain, and secure
            originals straight off the wall.
          </p>
        </div>

        {/* Marquee-ish accent strip */}
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
          <span className="text-electric">▚ Spray-paint</span>
          <span className="text-hotpink">▚ Acrylic</span>
          <span className="text-acid">▚ Mixed Texture</span>
          <span className="ml-auto">{paintings.length} works on the wall</span>
        </div>
      </header>

      {/* ----------------------------------------------------------------- */}
      {/* The Interactive Studio Wall                                       */}
      {/* ----------------------------------------------------------------- */}
      <main>
        <StudioWall paintings={paintings} onOpen={openModal} />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 px-4 py-10 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
          <span>BEHNKE // Studio Wall</span>
          <span>All works © the artist · Prints & originals available</span>
        </div>
      </footer>

      {/* ----------------------------------------------------------------- */}
      {/* Overlays (never wrap the AudioPlayer)                             */}
      {/* ----------------------------------------------------------------- */}
      <ArtworkModal painting={active} onClose={closeModal} onBuy={openCheckout} />
      <CheckoutCart painting={checkout} onClose={closeCheckout} />

      {/* Persistent, independent audio engine */}
      <AudioPlayer />
    </div>
  )
}
