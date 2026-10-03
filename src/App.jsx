import { Suspense, lazy, useState } from 'react'
import paintings from './data/paintings.js'
import GrainOverlay from './components/GrainOverlay.jsx'
import StudioWall from './components/StudioWall.jsx'
import ArtworkModal from './components/ArtworkModal.jsx'
import CheckoutCart from './components/CheckoutCart.jsx'
import Policies from './components/Policies.jsx'

// The 3D warehouse pulls in three.js (~250 kB gzipped), so it's only
// downloaded when someone taps "Enter the warehouse".
const GalleryWalk = lazy(() => import('./components/GalleryWalk.jsx'))

// ---------------------------------------------------------------------------
// App — composition root
// ---------------------------------------------------------------------------
// View state: which painting the modal shows, which painting the checkout is
// securing, and whether the 3D warehouse walk is open. The modal and checkout
// sit above the walk (higher z-index), so buying from inside it works the same
// as from the grid.

export default function App() {
  const [active, setActive] = useState(null) // painting shown in modal
  const [checkout, setCheckout] = useState(null) // painting being purchased
  const [walking, setWalking] = useState(false) // 3D warehouse open

  const openModal = (p) => setActive(p)
  const closeModal = () => setActive(null)

  // Buying from the modal: open the cart. We keep the modal mounted underneath
  // so closing the cart returns the viewer to the piece they were inspecting.
  const openCheckout = (p) => setCheckout(p)
  const closeCheckout = () => setCheckout(null)

  // "Shipping & returns" link inside the checkout: close both overlays and
  // scroll the page to the policies section underneath.
  const showPolicies = () => {
    setCheckout(null)
    setActive(null)
    setWalking(false)
    requestAnimationFrame(() =>
      document.getElementById('policies')?.scrollIntoView({ behavior: 'smooth' })
    )
  }

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
              Underground Studio · Est. MMXXV
            </p>
            <h1 className="font-display text-6xl leading-[0.85] text-white sm:text-7xl md:text-8xl">
              <span className="block">SCOTT LEHMAN</span>
              <span className="block text-stroke">ART</span>
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

        {/* Way into the 3D warehouse walk */}
        <button
          onClick={() => setWalking(true)}
          className="group relative mt-8 block h-40 w-full overflow-hidden border border-white/15 text-left outline-none transition-colors hover:border-electric focus-visible:ring-2 focus-visible:ring-electric sm:h-52"
        >
          <img
            src={`${import.meta.env.BASE_URL}warehouse-teaser.jpg`}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-90"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-ink-900/95 via-ink-900/30 to-transparent" />
          <span className="relative flex h-full flex-col justify-end p-5 sm:p-7">
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-electric">
              New · Walk the gallery in 3D
            </span>
            <span className="mt-2 font-display text-3xl uppercase leading-none text-white sm:text-5xl">
              Enter the warehouse <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
            </span>
          </span>
        </button>
      </header>

      {/* ----------------------------------------------------------------- */}
      {/* The Interactive Studio Wall                                       */}
      {/* ----------------------------------------------------------------- */}
      <main>
        <StudioWall paintings={paintings} onOpen={openModal} />
      </main>

      {/* Shipping, returns & commissions */}
      <Policies />

      {/* Footer */}
      <footer className="border-t border-white/10 px-4 py-10 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
          <span>Scott Lehman Art</span>
          <span>
            All works © the artist · Originals available ·{' '}
            <a href="#policies" className="underline underline-offset-4 hover:text-electric">
              Shipping &amp; returns
            </a>
          </span>
        </div>
      </footer>

      {/* ----------------------------------------------------------------- */}
      {/* Overlays                                                          */}
      {/* ----------------------------------------------------------------- */}
      {walking && (
        <Suspense
          fallback={
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-900 font-mono text-xs uppercase tracking-[0.35em] text-neutral-400">
              Opening the warehouse…
            </div>
          }
        >
          <GalleryWalk
            paintings={paintings}
            onOpen={openModal}
            onExit={() => setWalking(false)}
            paused={Boolean(active || checkout)}
          />
        </Suspense>
      )}
      <ArtworkModal painting={active} onClose={closeModal} onBuy={openCheckout} />
      <CheckoutCart painting={checkout} onClose={closeCheckout} onShowPolicies={showPolicies} />
    </div>
  )
}
