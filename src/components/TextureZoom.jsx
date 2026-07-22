import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'

// ---------------------------------------------------------------------------
// TextureZoom — the Macro Texture Lens
// ---------------------------------------------------------------------------
// Desktop (fine pointer + hover): the cursor becomes a circular magnifying lens
// that tracks the mouse and reveals a high-detail crop of `hiRes`, so viewers
// can inspect spray grain and raw acrylic up close.
//
// Mobile / touch (coarse pointer): the lens is impractical, so instead the image
// supports pinch-to-zoom (two fingers) and double-tap magnification, both driven
// by Framer Motion motion values with drag-to-pan while zoomed.
// ---------------------------------------------------------------------------

const LENS_SIZE = 190 // px diameter of the desktop lens
const ZOOM = 2.6 // magnification factor (shared by lens + mobile)

export default function TextureZoom({ src, hiRes, alt }) {
  const wrapRef = useRef(null)
  const imgRef = useRef(null)

  // Detect a coarse pointer (touch) once — decides which interaction we mount.
  const [isTouch, setIsTouch] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(hover: none), (pointer: coarse)')
    const update = () => setIsTouch(mq.matches)
    update()
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [])

  const source = hiRes || src

  return isTouch ? (
    <PinchZoom src={source} alt={alt} wrapRef={wrapRef} />
  ) : (
    <LensZoom
      src={src}
      hiRes={source}
      alt={alt}
      wrapRef={wrapRef}
      imgRef={imgRef}
    />
  )
}

// ---------------------------------------------------------------------------
// Desktop: magnifying-lens preview that follows the cursor
// ---------------------------------------------------------------------------
function LensZoom({ src, hiRes, alt, wrapRef, imgRef }) {
  const [lens, setLens] = useState({ show: false, x: 0, y: 0, bgX: 0, bgY: 0 })

  const onMove = (e) => {
    const img = imgRef.current
    if (!img) return
    const rect = img.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Ignore movement just outside the painting.
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
      setLens((l) => ({ ...l, show: false }))
      return
    }

    // Background is the image scaled by ZOOM; position keeps the point under
    // the cursor centred in the lens.
    const bgW = rect.width * ZOOM
    const bgH = rect.height * ZOOM
    const bgX = -(x * ZOOM - LENS_SIZE / 2)
    const bgY = -(y * ZOOM - LENS_SIZE / 2)

    setLens({
      show: true,
      x,
      y,
      bgX: Math.min(0, Math.max(-(bgW - LENS_SIZE), bgX)),
      bgY: Math.min(0, Math.max(-(bgH - LENS_SIZE), bgY)),
      bgW,
      bgH,
    })
  }

  return (
    <div
      ref={wrapRef}
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      onMouseMove={onMove}
      onMouseLeave={() => setLens((l) => ({ ...l, show: false }))}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        draggable={false}
        className="max-h-full max-w-full cursor-none object-contain shadow-2xl"
      />

      {/* The lens */}
      {lens.show && (
        <div
          className="pointer-events-none absolute rounded-full border-2 border-electric shadow-neon"
          style={{
            width: LENS_SIZE,
            height: LENS_SIZE,
            left: `calc(${lens.x}px)`,
            top: `calc(${lens.y}px)`,
            // Centre the lens on the cursor. The image is centred in the wrap,
            // so offset by the image's own left/top inside the flex container.
            transform: 'translate(-50%, -50%)',
            marginLeft:
              imgRef.current && wrapRef.current
                ? imgRef.current.getBoundingClientRect().left -
                  wrapRef.current.getBoundingClientRect().left
                : 0,
            marginTop:
              imgRef.current && wrapRef.current
                ? imgRef.current.getBoundingClientRect().top -
                  wrapRef.current.getBoundingClientRect().top
                : 0,
            backgroundImage: `url(${hiRes})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `${lens.bgW}px ${lens.bgH}px`,
            backgroundPosition: `${lens.bgX}px ${lens.bgY}px`,
            boxShadow:
              '0 0 0 2px rgba(0,229,255,0.8), 0 0 30px rgba(0,229,255,0.35), inset 0 0 24px rgba(0,0,0,0.6)',
          }}
        >
          {/* crosshair */}
          <span className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-electric/60" />
          <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-electric/60" />
        </div>
      )}

      {/* Hint chip */}
      <div className="pointer-events-none absolute bottom-3 left-3 border border-white/15 bg-ink-900/70 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-neutral-400">
        ⌖ hover to inspect texture
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Mobile: pinch-to-zoom + double-tap, Framer Motion driven
// ---------------------------------------------------------------------------
function PinchZoom({ src, alt, wrapRef }) {
  const scale = useMotionValue(1)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [zoomed, setZoomed] = useState(false)

  // Gesture bookkeeping for a manual two-finger pinch.
  const gesture = useRef({ startDist: 0, startScale: 1 })
  const lastTap = useRef(0)

  const dist = (touches) => {
    const [a, b] = touches
    return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY)
  }

  const clampScale = (s) => Math.min(4, Math.max(1, s))

  const onTouchStart = (e) => {
    if (e.touches.length === 2) {
      gesture.current = { startDist: dist(e.touches), startScale: scale.get() }
    }
  }

  const onTouchMove = (e) => {
    if (e.touches.length === 2 && gesture.current.startDist) {
      e.preventDefault()
      const ratio = dist(e.touches) / gesture.current.startDist
      const next = clampScale(gesture.current.startScale * ratio)
      scale.set(next)
      setZoomed(next > 1.02)
    }
  }

  const onTouchEnd = () => {
    gesture.current.startDist = 0
    if (scale.get() <= 1.02) resetZoom()
  }

  const resetZoom = () => {
    animate(scale, 1, { type: 'spring', stiffness: 260, damping: 26 })
    animate(x, 0, { type: 'spring', stiffness: 260, damping: 26 })
    animate(y, 0, { type: 'spring', stiffness: 260, damping: 26 })
    setZoomed(false)
  }

  // Double-tap toggles a 2.6× magnification.
  const onPointerUp = () => {
    const now = performance.now()
    if (now - lastTap.current < 300) {
      if (scale.get() > 1.02) {
        resetZoom()
      } else {
        animate(scale, ZOOM, { type: 'spring', stiffness: 260, damping: 26 })
        setZoomed(true)
      }
    }
    lastTap.current = now
  }

  return (
    <div
      ref={wrapRef}
      className="relative flex h-full w-full touch-none items-center justify-center overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onPointerUp={onPointerUp}
    >
      <motion.img
        src={src}
        alt={alt}
        draggable={false}
        style={{ scale, x, y }}
        drag={zoomed}
        dragMomentum={false}
        dragElastic={0.12}
        className="max-h-full max-w-full select-none object-contain shadow-2xl"
      />

      <div className="pointer-events-none absolute bottom-3 left-3 border border-white/15 bg-ink-900/70 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-neutral-400">
        ⌖ pinch or double-tap to inspect
      </div>

      {zoomed && (
        <button
          onClick={resetZoom}
          className="absolute right-3 top-3 border border-white/20 bg-ink-900/80 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-neutral-300"
        >
          reset
        </button>
      )}
    </div>
  )
}
