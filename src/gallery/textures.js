import * as THREE from 'three'

// ---------------------------------------------------------------------------
// Procedural textures for the warehouse walk
// ---------------------------------------------------------------------------
// Everything here is drawn on a <canvas> at runtime — the floor and ceiling
// concrete, the graffiti name and the wall labels — so the site ships no
// third-party texture files and no copied graffiti. (The concrete walls are
// the one exception: a photo tile in public/textures, see GalleryWalk.jsx.)
// A tiny seeded RNG keeps the "random" grime and drips identical on every
// visit.

export function rng(seed) {
  let s = seed >>> 0 || 1
  return () => {
    s ^= s << 13
    s ^= s >>> 17
    s ^= s << 5
    return ((s >>> 0) % 100000) / 100000
  }
}

const NEON = ['#00e5ff', '#ff2d95', '#c6ff00']

function canvas(w, h) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  return [c, c.getContext('2d')]
}

function toTexture(c, { repeat } = {}) {
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 4
  if (repeat) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping
    t.repeat.set(repeat[0], repeat[1])
  }
  return t
}

// Speckle + blotch noise for the concrete.
function grime(ctx, w, h, rand, { dots = 9000, blotches = 40, dark = 0.5 } = {}) {
  for (let i = 0; i < dots; i++) {
    const v = Math.floor(rand() * 60)
    ctx.fillStyle = `rgba(${v},${v},${v},${rand() * 0.25})`
    ctx.fillRect(rand() * w, rand() * h, 1 + rand() * 2, 1 + rand() * 2)
  }
  for (let i = 0; i < blotches; i++) {
    const x = rand() * w
    const y = rand() * h
    const r = 20 + rand() * 120
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, `rgba(0,0,0,${rand() * dark})`)
    g.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = g
    ctx.fillRect(x - r, y - r, r * 2, r * 2)
  }
}

// A repeat-specific copy of a tiled texture (shares the same pixels).
export function withRepeat(tex, x, y) {
  const t = tex.clone()
  t.repeat.set(x, y)
  t.needsUpdate = true
  return t
}

// ── Concrete ───────────────────────────────────────────────────────────────
export function concreteTexture(repeat, { tone = 58 } = {}) {
  const W = 1024
  const H = 1024
  const [c, ctx] = canvas(W, H)
  const rand = rng(tone)
  ctx.fillStyle = `rgb(${tone},${tone},${tone + 2})`
  ctx.fillRect(0, 0, W, H)
  grime(ctx, W, H, rand, { dots: 22000, blotches: 90, dark: 0.45 })
  // expansion joints
  ctx.strokeStyle = 'rgba(0,0,0,0.55)'
  ctx.lineWidth = 3
  ctx.strokeRect(0, 0, W, H)
  // hairline cracks
  ctx.strokeStyle = 'rgba(10,10,10,0.6)'
  ctx.lineWidth = 1.2
  for (let i = 0; i < 7; i++) {
    let x = rand() * W
    let y = rand() * H
    ctx.beginPath()
    ctx.moveTo(x, y)
    for (let s = 0; s < 14; s++) {
      x += (rand() - 0.5) * 60
      y += (rand() - 0.5) * 60
      ctx.lineTo(x, y)
    }
    ctx.stroke()
  }
  return toTexture(c, { repeat })
}

// ── Graffiti ───────────────────────────────────────────────────────────────
// A spray-painted word with a glow of overspray, a dark outline, drips and
// stray speckles. Transparent background so it sits on the wall.
export function graffitiTexture(word, { seed = 1, color, accent, w = 1024, h = 512 } = {}) {
  const [c, ctx] = canvas(w, h)
  const rand = rng(seed)
  const fill = color || NEON[seed % NEON.length]
  const second = accent || NEON[(seed + 1) % NEON.length]
  const fontSize = Math.min(h * 0.62, (w * 1.5) / Math.max(word.length, 2))
  ctx.font = `${fontSize}px "Archivo Black", Impact, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  const cx = w / 2
  const cy = h * 0.46

  ctx.save()
  ctx.translate(cx, cy)
  ctx.rotate((rand() - 0.5) * 0.18)
  ctx.transform(1, 0, (rand() - 0.5) * 0.4, 1, 0, 0) // a little hand-done slant

  // overspray halo
  ctx.shadowColor = fill
  ctx.shadowBlur = fontSize * 0.35
  ctx.fillStyle = fill
  ctx.globalAlpha = 0.55
  ctx.fillText(word, 0, 0)
  ctx.globalAlpha = 1
  ctx.shadowBlur = 0

  // fat outline, then the fill, then a second-colour highlight
  ctx.lineJoin = 'round'
  ctx.lineWidth = fontSize * 0.12
  ctx.strokeStyle = '#0b0b0d'
  ctx.strokeText(word, 0, 0)
  ctx.fillStyle = fill
  ctx.fillText(word, 0, 0)
  ctx.save()
  ctx.beginPath()
  ctx.rect(-w, -fontSize, w * 2, fontSize * 0.42)
  ctx.clip()
  ctx.fillStyle = second
  ctx.globalAlpha = 0.85
  ctx.fillText(word, 0, 0)
  ctx.restore()
  ctx.restore()

  // drips
  const textW = Math.min(ctx.measureText(word).width, w * 0.9)
  for (let i = 0; i < 9; i++) {
    const x = cx - textW / 2 + rand() * textW
    const y0 = cy + fontSize * 0.25
    const len = 20 + rand() * (h - y0 - 20)
    ctx.strokeStyle = fill
    ctx.globalAlpha = 0.9
    ctx.lineWidth = 3 + rand() * 6
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(x, y0)
    ctx.lineTo(x + (rand() - 0.5) * 4, y0 + len)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(x, y0 + len, ctx.lineWidth * 0.8, 0, Math.PI * 2)
    ctx.fillStyle = fill
    ctx.fill()
  }
  // overspray speckles
  ctx.globalAlpha = 1
  for (let i = 0; i < 900; i++) {
    const a = rand() * Math.PI * 2
    const r = fontSize * (0.4 + rand() * 1.4)
    ctx.fillStyle = rand() < 0.7 ? fill : second
    ctx.globalAlpha = rand() * 0.6
    ctx.fillRect(cx + Math.cos(a) * r * 2, cy + Math.sin(a) * r * 0.6, 2, 2)
  }
  ctx.globalAlpha = 1
  return toTexture(c)
}

// ── Wall label ─────────────────────────────────────────────────────────────
// Small gallery card: title, medium, size · year, and price or a red "sold"
// dot. 2:1 so it maps onto a 24 × 12 cm plane.
export function labelTexture(p) {
  const W = 640
  const H = 320
  const [c, ctx] = canvas(W, H)
  ctx.fillStyle = '#f2f0ea'
  ctx.fillRect(0, 0, W, H)
  ctx.fillStyle = 'rgba(0,0,0,0.06)'
  ctx.fillRect(0, H - 6, W, 6)
  const sold = /sold/i.test(p.status || '')
  const pad = 36
  ctx.fillStyle = '#111'
  ctx.textBaseline = 'top'
  ctx.font = '48px "Archivo Black", Impact, sans-serif'
  ctx.fillText(p.title.toUpperCase(), pad, pad, W - pad * 2)
  ctx.font = '22px "Space Mono", ui-monospace, monospace'
  ctx.fillStyle = '#333'
  ctx.fillText('Scott Lehman', pad, pad + 70)
  ctx.fillText(p.medium, pad, pad + 104, W - pad * 2)
  ctx.fillText(`${p.dimensions} · ${p.year}`, pad, pad + 138)
  ctx.font = '34px "Archivo Black", Impact, sans-serif'
  if (sold) {
    ctx.fillStyle = '#d0021b'
    ctx.beginPath()
    ctx.arc(pad + 14, H - pad - 18, 14, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#111'
    ctx.fillText('SOLD', pad + 42, H - pad - 36)
  } else {
    ctx.fillStyle = '#111'
    ctx.fillText(p.price, pad, H - pad - 36)
    ctx.font = '20px "Space Mono", ui-monospace, monospace'
    ctx.fillStyle = '#666'
    ctx.textAlign = 'right'
    ctx.fillText('tap painting to buy', W - pad, H - pad - 26)
  }
  return toTexture(c)
}

// ── Light pool ─────────────────────────────────────────────────────────────
// Soft radial glow used additively to fake a spotlight hitting the wall
// (real per-painting spotlights are too heavy for phones).
export function glowTexture() {
  const S = 256
  const [c, ctx] = canvas(S, S)
  const g = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2)
  g.addColorStop(0, 'rgba(255,236,205,0.9)')
  g.addColorStop(0.45, 'rgba(255,226,190,0.35)')
  g.addColorStop(1, 'rgba(255,220,180,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, S, S)
  return toTexture(c)
}
