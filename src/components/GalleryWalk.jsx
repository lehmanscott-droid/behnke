import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, useScroll, useTexture } from '@react-three/drei'
import {
  brickTexture,
  concreteTexture,
  glowTexture,
  graffitiTexture,
  labelTexture,
} from '../gallery/textures.js'

// ---------------------------------------------------------------------------
// GalleryWalk — a first-person walk down a graffiti warehouse corridor
// ---------------------------------------------------------------------------
// Full-screen overlay, lazy-loaded from App.jsx so three.js only downloads when
// someone taps "Enter the warehouse". Scroll (desktop) or swipe (phone) moves
// the camera along a fixed path that stops in front of each painting.
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

const TAGS = ['SLA', '1 OF 1', 'RAW', 'CHI', 'STATIC', 'NO RESTOCK', 'ORIGINAL', 'WET PAINT']

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

// ── Camera follows the scroll along the keyframes ─────────────────────────
function CameraRig({ keys, progressRef }) {
  const scroll = useScroll()
  const look = useRef(new THREE.Vector3(...keys[0].look))
  const tPos = useMemo(() => new THREE.Vector3(), [])
  const tLook = useMemo(() => new THREE.Vector3(), [])
  const a = useMemo(() => new THREE.Vector3(), [])
  const b = useMemo(() => new THREE.Vector3(), [])

  useFrame((state, dt) => {
    const t = scroll.offset * (keys.length - 1)
    const i = Math.min(Math.floor(t), keys.length - 2)
    const f = smooth(Math.min(1, t - i))
    tPos.lerpVectors(a.fromArray(keys[i].pos), b.fromArray(keys[i + 1].pos), f)
    tLook.lerpVectors(a.fromArray(keys[i].look), b.fromArray(keys[i + 1].look), f)
    // gentle hand-held sway
    const time = state.clock.elapsedTime
    tPos.y += Math.sin(time * 1.3) * 0.012
    const k = 1 - Math.exp(-dt * 5)
    state.camera.position.lerp(tPos, k)
    look.current.lerp(tLook, k)
    state.camera.lookAt(look.current)
    if (progressRef.current) progressRef.current.style.width = `${scroll.offset * 100}%`
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
      {/* light pool on the brick */}
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

// ── A spray-painted tag on a wall ─────────────────────────────────────────
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
  const tex = useMemo(
    () => ({
      brick: brickTexture([length / 1.6, WALL_H / 1.6]),
      brickEnd: brickTexture([(HALF_W * 2) / 1.6, WALL_H / 1.6]),
      floor: concreteTexture([HALF_W / 2, length / 4], { tone: 62 }),
      ceiling: concreteTexture([2, length / 4], { tone: 30 }),
      glow: glowTexture(),
    }),
    [length]
  )
  useEffect(() => () => Object.values(tex).forEach((t) => t.dispose()), [tex])

  // Graffiti goes on the empty wall opposite each painting, plus a couple near
  // the door, and the big name on the end wall.
  const tags = useMemo(() => {
    const out = [
      { word: TAGS[0], seed: 3, position: [-HALF_W + 0.03, 2.3, 0.5], rotation: [0, Math.PI / 2, 0] },
      { word: TAGS[1], seed: 8, position: [HALF_W - 0.03, 1.2, -1.2], rotation: [0, -Math.PI / 2, 0], size: [2.4, 1.2] },
    ]
    items.forEach((it, i) => {
      out.push({
        word: TAGS[(i + 2) % TAGS.length],
        seed: 11 + i * 7,
        position: [-it.side * (HALF_W - 0.03), 2.0 + (i % 2) * 0.6, it.z - 0.4],
        rotation: [0, it.side * (Math.PI / 2), 0],
        size: [3.4, 1.7],
      })
    })
    return out
  }, [items])

  return (
    <>
      {/* walls */}
      <mesh position={[-HALF_W, WALL_H / 2, midZ]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[length, WALL_H]} />
        <meshStandardMaterial map={tex.brick} roughness={0.95} />
      </mesh>
      <mesh position={[HALF_W, WALL_H / 2, midZ]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[length, WALL_H]} />
        <meshStandardMaterial map={tex.brick} roughness={0.95} />
      </mesh>
      <mesh position={[0, WALL_H / 2, endZ]}>
        <planeGeometry args={[HALF_W * 2, WALL_H]} />
        <meshStandardMaterial map={tex.brickEnd} roughness={0.95} />
      </mesh>
      <mesh position={[0, WALL_H / 2, 6]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[HALF_W * 2, WALL_H]} />
        <meshStandardMaterial map={tex.brickEnd} roughness={0.95} />
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

      {/* the big name on the end wall */}
      <Tag word="SCOTT LEHMAN" seed={21} position={[0, 2.5, endZ + 0.03]} rotation={[0, 0, 0]} size={[5.6, 2.8]} />
      {tags.map((t, i) => (
        <Tag key={i} {...t} />
      ))}

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
    const onKey = (e) => e.key === 'Escape' && !paused && onExit()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.body.style.cursor = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onExit, paused])

  return (
    <div className="fixed inset-0 z-[60] bg-ink-900" role="dialog" aria-modal="true" aria-label="Walk the warehouse gallery">
      {webgl && fontsReady && (
        <Canvas
          dpr={[1, 1.5]}
          camera={{ fov: FOV, near: 0.05, far: 60, position: keys[0].pos }}
          gl={{ antialias: true, powerPreference: "high-performance" }}
        >
          <color attach="background" args={['#0b0b0d']} />
          <fog attach="fog" args={['#0b0b0d', 7, 24]} />
          <Suspense fallback={null}>
            <ScrollControls pages={keys.length} damping={0.2}>
              <CameraRig keys={keys} progressRef={progressRef} />
              <Warehouse items={items} endZ={endZ} onOpen={onOpen} onAspect={onAspect} />
            </ScrollControls>
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
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-6">
        <p className="mb-3 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-400">
          Scroll or swipe to walk · Tap a painting to buy
        </p>
        <div className="h-px w-full bg-white/10">
          <div ref={progressRef} className="h-px bg-electric" style={{ width: '0%' }} />
        </div>
      </div>
    </div>
  )
}
