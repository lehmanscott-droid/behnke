import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { isSold } from '../data/paintings.js'
import {
  concreteTexture,
  glowTexture,
  graffitiTexture,
  labelTexture,
  withRepeat,
} from '../gallery/textures.js'

// ---------------------------------------------------------------------------
// GalleryWalk — a first-person walk down a concrete warehouse corridor
// ---------------------------------------------------------------------------
// Full-screen overlay, lazy-loaded from App.jsx so three.js only downloads when
// someone taps "Enter the warehouse". Movement is one stop at a time — the
// entrance, each painting, the end wall — via the big Back / Next buttons, a
// single quick swipe, one mouse-wheel notch, or the arrow keys. The camera
// glides between stops along a fixed path.
// Paintings alternate left/right walls at their true size (the long side of a
// 24 × 30 in canvas = 0.762 m), each with a gallery wall label. Tapping a
// painting calls onOpen(painting), which opens the normal ArtworkModal on top,
// so buying works exactly as it does from the grid. New entries in
// paintings.js get a spot on the wall automatically.

const HALF_W = 3 // corridor is 6 m wide
const WALL_H = 4.4
const SPACING = 5 // metres between paintings
const EYE = 1.6
const HANG_Y = 1.55 // centre height of each painting
const LONG_SIDE = 0.762 // 30 in
const FOV = 60 // vertical field of view, degrees
const LABEL_W = 0.3
const LABEL_H = 0.15
const LABEL_GAP = 0.06
const BUMP = 1.4 // depth of the form joints / pores in the concrete
const WALL_TILE = 1.2 // metres of wall per concrete tile (6 board-form courses)

// Photographic concrete, generated once and made seamless (see CLAUDE.md).
const WALL_MAP = import.meta.env.BASE_URL + 'textures/concrete-wall.jpg'
const WALL_BUMP = import.meta.env.BASE_URL + 'textures/concrete-wall-bump.jpg'

// Painting size in metres from its image aspect (long side = 30 in).
function sizeOf(aspect = 0.8) {
  return aspect >= 1 ? [LONG_SIDE, LONG_SIDE / aspect] : [LONG_SIDE * aspect, LONG_SIDE]
}

// Where the camera stops for each painting. It stands as close as it can
// while the painting AND its label still fit on screen, so paintings fill
// the view on every device. On upright phones (viewAspect < 1) the label
// moves under the painting so the narrow screen only has to fit one width.
// `aspects` holds each painting's image aspect once its texture has loaded.
function layout(paintings, viewAspect, aspects) {
  const labelBelow = viewAspect < 1
  const tanV = Math.tan(((FOV / 2) * Math.PI) / 180)
  const tanH = tanV * viewAspect
  const items = paintings.map((p, i) => ({
    p,
    side: i % 2 === 0 ? -1 : 1, // -1 = left wall, 1 = right wall
    z: -(i + 1) * SPACING,
    labelBelow,
  }))
  const endZ = -(paintings.length + 1) * SPACING - 2
  const keys = [{ pos: [0, EYE, 3.5], look: [0, 1.7, -10] }]
  for (const it of items) {
    const [w, h] = sizeOf(aspects[it.p.id])
    let halfW, halfH, along, up
    if (labelBelow) {
      halfW = w / 2 + 0.05
      halfH = (h + LABEL_GAP + LABEL_H) / 2 + 0.05
      along = 0
      up = -(LABEL_GAP + LABEL_H) / 2
    } else {
      const span = w + LABEL_GAP * 2 + LABEL_W // painting + gap + label
      halfW = span / 2 + 0.12
      halfH = h / 2 + 0.14
      along = span / 2 - w / 2 // shift toward the label
      up = 0
    }
    const comfort = labelBelow ? 1.06 : 1.2 // breathing room around the art
    const dist = Math.max(halfW / tanH, halfH / tanV, 0.8) * comfort
    // The label is on the painting's right as you face it: -z on the left
    // wall, +z on the right wall, i.e. `side` along z.
    const dz = it.side * along
    keys.push({
      pos: [it.side * (HALF_W - dist), HANG_Y + up + 0.04, it.z + dz],
      look: [it.side * HALF_W, HANG_Y + up, it.z + dz],
    })
  }
  keys.push({ pos: [0, EYE, endZ + 5.5], look: [0, 2.2, endZ] })
  return { items, endZ, keys }
}

const smooth = (t) => t * t * (3 - 2 * t)

// ── Camera glides to the current stop ─────────────────────────────────────
// `targetRef.current` is the stop index to head for. The rig moves at a steady
// pace (about 1.1 s per stop) and eases in/out within each segment, so a
// single tap of Next is one smooth walk to the next painting.
const STOPS_PER_SECOND = 0.9

function CameraRig({ keys, targetRef, progressRef }) {
  const t = useRef(targetRef.current)
  const look = useRef(new THREE.Vector3(...keys[0].look))
  const tPos = useMemo(() => new THREE.Vector3(), [])
  const tLook = useMemo(() => new THREE.Vector3(), [])
  const a = useMemo(() => new THREE.Vector3(), [])
  const b = useMemo(() => new THREE.Vector3(), [])

  useFrame((state, dt) => {
    const diff = targetRef.current - t.current
    t.current += Math.sign(diff) * Math.min(Math.abs(diff), Math.min(dt, 0.05) * STOPS_PER_SECOND)
    const last = keys.length - 1
    const i = Math.min(Math.floor(t.current), last - 1)
    const f = smooth(Math.min(1, Math.max(0, t.current - i)))
    tPos.lerpVectors(a.fromArray(keys[i].pos), b.fromArray(keys[i + 1].pos), f)
    tLook.lerpVectors(a.fromArray(keys[i].look), b.fromArray(keys[i + 1].look), f)
    // gentle hand-held sway
    tPos.y += Math.sin(state.clock.elapsedTime * 1.3) * 0.01
    const k = 1 - Math.exp(-dt * 8)
    state.camera.position.lerp(tPos, k)
    look.current.lerp(tLook, k)
    state.camera.lookAt(look.current)
    if (progressRef.current) progressRef.current.style.width = `${(t.current / last) * 100}%`
  })
  return null
}

// ── One painting + its lamp, light pool and wall label ────────────────────
function Painting({ p, side, z, labelBelow, glow, onOpen, onAspect }) {
  const tex = useTexture(p.canvas || p.image)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8
  const label = useMemo(() => labelTexture(p), [p])
  useEffect(() => () => label.dispose(), [label])
  const aspect = tex.image.width / tex.image.height
  const [w, h] = sizeOf(aspect)
  useEffect(() => onAspect(p.id, aspect), [onAspect, p.id, aspect])
  const labelPos = labelBelow
    ? [0, -h / 2 - LABEL_GAP - LABEL_H / 2, 0.004]
    : [w / 2 + LABEL_GAP + LABEL_W / 2, -h / 2 + LABEL_H / 2 + 0.07, 0.004]

  return (
    <group position={[side * (HALF_W - 0.04), HANG_Y, z]} rotation={[0, -side * (Math.PI / 2), 0]}>
      {/* light pool on the concrete */}
      <mesh position={[0, 0.25, -0.02]}>
        <planeGeometry args={[2.8, 3.2]} />
        <meshBasicMaterial map={glow} transparent blending={THREE.AdditiveBlending} depthWrite={false} opacity={0.32} />
      </mesh>
      {/* canvas edge / shadow */}
      <mesh position={[0.012, -0.018, -0.012]}>
        <boxGeometry args={[w + 0.01, h + 0.01, 0.035]} />
        <meshStandardMaterial color="#121212" roughness={0.9} />
      </mesh>
      {/* the painting — unlit material so the colours stay true */}
      <mesh
        position={[0, 0, 0.008]}
        onClick={(e) => {
          if (e.delta > 10) return // that was a swipe, not a tap
          e.stopPropagation()
          onOpen(p)
        }}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = '')}
      >
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>
      {/* wall label: to the right like a real gallery, or underneath on
          upright phones so painting + label fit the narrow screen */}
      <mesh position={labelPos}>
        <planeGeometry args={[LABEL_W, LABEL_H]} />
        <meshBasicMaterial map={label} toneMapped={false} />
      </mesh>
      {/* industrial lamp on an arm above */}
      <group position={[0, 1.45, 0.55]}>
        <mesh position={[0, 0.12, -0.3]}>
          <boxGeometry args={[0.03, 0.03, 0.6]} />
          <meshStandardMaterial color="#1b1b1b" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh rotation={[Math.PI / 5, 0, 0]}>
          <coneGeometry args={[0.13, 0.2, 18, 1, true]} />
          <meshStandardMaterial color="#222" metalness={0.5} roughness={0.5} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, -0.06, 0.04]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshBasicMaterial color="#ffe9c4" toneMapped={false} />
        </mesh>
      </group>
    </group>
  )
}

// ── The spray-painted name on the end wall ────────────────────────────────────
function Tag({ word, seed, position, rotation, size = [3, 1.5] }) {
  const tex = useMemo(() => graffitiTexture(word, { seed }), [word, seed])
  useEffect(() => () => tex.dispose(), [tex])
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={size} />
      <meshStandardMaterial map={tex} transparent depthWrite={false} roughness={0.85} polygonOffset polygonOffsetFactor={-2} />
    </mesh>
  )
}

// ── The room ──────────────────────────────────────────────────────────────
function Warehouse({ items, endZ, onOpen, onAspect }) {
  const length = -endZ + 8
  const midZ = (endZ + 6) / 2
  const [wallMap, wallBump] = useTexture([WALL_MAP, WALL_BUMP])
  const tex = useMemo(() => {
    // one seamless concrete tile, repeated at real-world scale
    wallMap.colorSpace = THREE.SRGBColorSpace
    wallBump.colorSpace = THREE.NoColorSpace
    for (const t of [wallMap, wallBump]) {
      t.wrapS = t.wrapT = THREE.RepeatWrapping
      t.anisotropy = 8
    }
    const side = [length / WALL_TILE, WALL_H / WALL_TILE]
    const end = [(HALF_W * 2) / WALL_TILE, WALL_H / WALL_TILE]
    return {
      wall: withRepeat(wallMap, ...side),
      wallBump: withRepeat(wallBump, ...side),
      wallEnd: withRepeat(wallMap, ...end),
      wallEndBump: withRepeat(wallBump, ...end),
      floor: concreteTexture([HALF_W / 2, length / 4], { tone: 62 }),
      ceiling: concreteTexture([2, length / 4], { tone: 30 }),
      glow: glowTexture(),
    }
  }, [length, wallMap, wallBump])
  useEffect(() => () => Object.values(tex).forEach((t) => t.dispose()), [tex])

  return (
    <>
      {/* walls */}
      <mesh position={[-HALF_W, WALL_H / 2, midZ]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[length, WALL_H]} />
        <meshStandardMaterial map={tex.wall} bumpMap={tex.wallBump} bumpScale={BUMP} roughness={0.9} />
      </mesh>
      <mesh position={[HALF_W, WALL_H / 2, midZ]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[length, WALL_H]} />
        <meshStandardMaterial map={tex.wall} bumpMap={tex.wallBump} bumpScale={BUMP} roughness={0.9} />
      </mesh>
      <mesh position={[0, WALL_H / 2, endZ]}>
        <planeGeometry args={[HALF_W * 2, WALL_H]} />
        <meshStandardMaterial map={tex.wallEnd} bumpMap={tex.wallEndBump} bumpScale={BUMP} roughness={0.9} />
      </mesh>
      <mesh position={[0, WALL_H / 2, 6]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[HALF_W * 2, WALL_H]} />
        <meshStandardMaterial map={tex.wallEnd} bumpMap={tex.wallEndBump} bumpScale={BUMP} roughness={0.9} />
      </mesh>
      {/* floor + ceiling */}
      <mesh position={[0, 0, midZ]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[HALF_W * 2, length]} />
        <meshStandardMaterial map={tex.floor} roughness={0.7} metalness={0.05} />
      </mesh>
      <mesh position={[0, WALL_H, midZ]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[HALF_W * 2, length]} />
        <meshStandardMaterial map={tex.ceiling} roughness={1} />
      </mesh>
      {/* steel beams */}
      {Array.from({ length: Math.ceil(length / 3) }, (_, i) => (
        <mesh key={i} position={[0, WALL_H - 0.18, 5 - i * 3]}>
          <boxGeometry args={[HALF_W * 2, 0.3, 0.16]} />
          <meshStandardMaterial color="#1c1d20" metalness={0.7} roughness={0.45} />
        </mesh>
      ))}

      {/* the big name on the end wall — the only graffiti, so the side
          walls stay bare and the paintings carry the room */}
      <Tag word="SCOTT LEHMAN" seed={21} position={[0, 2.5, endZ + 0.03]} rotation={[0, 0, 0]} size={[5.6, 2.8]} />

      {items.map((it) => (
        <Painting key={it.p.id} {...it} glow={tex.glow} onOpen={onOpen} onAspect={onAspect} />
      ))}

      {/* lighting: dim warehouse fill + a warm lamp near each painting */}
      <ambientLight intensity={0.5} />
      <hemisphereLight args={['#9fb0c6', '#2b1c12', 0.55]} />
      {items.slice(0, 12).map((it) => (
        <pointLight
          key={it.p.id}
          position={[it.side * (HALF_W - 1.0), 3.1, it.z]}
          color="#ffd9a8"
          intensity={6}
          distance={8}
          decay={2}
        />
      ))}
      <pointLight position={[0, 3.4, endZ + 2.5]} color="#ffd9a8" intensity={18} distance={9} decay={2} />
    </>
  )
}

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return Boolean(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

export default function GalleryWalk({ paintings, onOpen, onExit, paused }) {
  const [viewAspect, setViewAspect] = useState(() => window.innerWidth / window.innerHeight)
  useEffect(() => {
    const onResize = () => setViewAspect(window.innerWidth / window.innerHeight)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  const [aspects, setAspects] = useState({})
  const onAspect = useCallback(
    (id, a) => setAspects((prev) => (prev[id] === a ? prev : { ...prev, [id]: a })),
    []
  )
  const { items, endZ, keys } = useMemo(
    () => layout(paintings, viewAspect, aspects),
    [paintings, viewAspect, aspects]
  )
  const progressRef = useRef(null)
  const [fontsReady, setFontsReady] = useState(false)

  // ── Movement: one stop at a time ────────────────────────────────────────
  const last = keys.length - 1
  const [stop, setStop] = useState(0)
  const targetRef = useRef(0)
  targetRef.current = Math.min(stop, last)
  const go = useCallback((d) => setStop((s) => Math.max(0, Math.min(last, s + d))), [last])
  const stopName =
    stop === 0 ? 'Entrance' : stop === last ? 'End of the hall' : items[stop - 1]?.p.title
  const atEnd = stop >= last

  // A swipe in any direction (40 px or more, any speed) = one stop
  // (left/up = forward). Smaller movements are taps, which open a painting.
  const swipe = useRef(null)
  const onPointerDown = (e) => {
    swipe.current = { x: e.clientX, y: e.clientY }
  }
  const onPointerUp = (e) => {
    const s = swipe.current
    swipe.current = null
    if (!s || paused) return
    const dx = e.clientX - s.x
    const dy = e.clientY - s.y
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 40) return // a tap, not a swipe
    const forward = Math.abs(dx) > Math.abs(dy) ? dx < 0 : dy < 0
    go(forward ? 1 : -1)
  }
  // One wheel "notch" (or trackpad flick) = one stop, with a short cooldown.
  const wheel = useRef({ acc: 0, lockUntil: 0 })
  const onWheel = (e) => {
    if (paused) return
    const w = wheel.current
    const now = performance.now()
    if (now < w.lockUntil) return
    w.acc += e.deltaY + e.deltaX
    if (Math.abs(w.acc) > 40) {
      go(w.acc > 0 ? 1 : -1)
      w.acc = 0
      w.lockUntil = now + 700
    }
  }
  const webgl = useMemo(hasWebGL, [])

  // Labels and tags are drawn with the site fonts, so wait for them.
  useEffect(() => {
    let live = true
    const done = () => live && setFontsReady(true)
    if (document.fonts?.load) {
      Promise.all([
        document.fonts.load('48px "Archivo Black"'),
        document.fonts.load('22px "Space Mono"'),
      ]).then(done, done)
    } else done()
    return () => {
      live = false
    }
  }, [])

  // Lock the page behind; Escape leaves (unless the painting popup is open).
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (paused) return
      if (e.key === 'Escape') onExit()
      else if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault()
        go(1)
      } else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault()
        go(-1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.body.style.cursor = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onExit, paused, go])

  return (
    <div
      className="fixed inset-0 z-[60] touch-none select-none bg-ink-900"
      role="dialog"
      aria-modal="true"
      aria-label="Walk the warehouse gallery"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onWheel={onWheel}
    >
      {webgl && fontsReady && (
        <Canvas
          dpr={[1, 1.5]}
          camera={{ fov: FOV, near: 0.05, far: 60, position: keys[0].pos }}
          gl={{ antialias: true, powerPreference: "high-performance" }}
        >
          <color attach="background" args={['#0b0b0d']} />
          <fog attach="fog" args={['#0b0b0d', 7, 24]} />
          <Suspense fallback={null}>
            <CameraRig keys={keys} targetRef={targetRef} progressRef={progressRef} />
            <Warehouse items={items} endZ={endZ} onOpen={onOpen} onAspect={onAspect} />
          </Suspense>
        </Canvas>
      )}

      {!webgl && (
        <div className="flex h-full items-center justify-center p-8 text-center font-mono text-sm text-neutral-400">
          This device can&apos;t show the 3D warehouse. The full collection is on the main page.
        </div>
      )}

      {/* HUD */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-4 sm:p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-neutral-300">
          Scott Lehman Art
          <span className="block text-neutral-500">The Warehouse</span>
        </p>
        <button
          onClick={onExit}
          className="pointer-events-auto border border-white/25 bg-ink-900/70 px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-white/80 backdrop-blur hover:border-electric hover:text-electric"
        >
          Exit ✕
        </button>
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900/90 to-transparent p-4 pt-10 sm:p-6 sm:pt-12">
        <div className="mx-auto flex max-w-xl items-center gap-3">
          <button
            onClick={() => go(-1)}
            disabled={stop === 0}
            aria-label="Back"
            className="h-14 w-20 shrink-0 border border-white/25 bg-ink-900/70 font-mono text-xs uppercase tracking-widest text-white backdrop-blur transition-colors enabled:hover:border-electric enabled:hover:text-electric disabled:opacity-30 sm:w-28"
          >
            ‹ Back
          </button>
          <div className="min-w-0 flex-1 text-center">
            <p className="truncate font-display text-base uppercase leading-tight text-white sm:text-lg">{stopName}</p>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-400">
              {stop > 0 && stop < last
                ? isSold(items[stop - 1]?.p) ? 'Sold · Private collection' : 'Tap the painting to buy'
                : `${items.length} works`}
            </p>
          </div>
          <button
            onClick={() => (atEnd ? onExit() : go(1))}
            aria-label={atEnd ? 'Exit the warehouse' : 'Next'}
            className="h-14 w-20 shrink-0 border-2 border-electric bg-electric/10 font-mono text-xs uppercase tracking-widest text-white backdrop-blur transition-colors hover:bg-electric hover:text-ink-900 sm:w-28"
          >
            {atEnd ? 'Exit' : 'Next ›'}
          </button>
        </div>
        <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
          Swipe, scroll or use the arrows
        </p>
        <div className="mt-2 h-px w-full bg-white/10">
          <div ref={progressRef} className="h-px bg-electric" style={{ width: '0%' }} />
        </div>
      </div>
    </div>
  )
}
