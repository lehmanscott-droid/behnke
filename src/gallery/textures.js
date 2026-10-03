import * as THREE from 'three'

// ---------------------------------------------------------------------------
// Procedural textures for the warehouse walk
// ---------------------------------------------------------------------------
// Everything here is drawn on a <canvas> at runtime — brick, concrete, the
// graffiti and the wall labels — so the site ships no third-party texture
// files and no copied graffiti. A tiny seeded RNG keeps the "random" grime and
// drips identical on every visit.

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

// Speckle + blotch noise shared by brick and concrete.
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

// ── Brick ──────────────────────────────────────────────────────────────────
// Old Chicago common brick in running bond. One 1024 px tile = 1.6 m of wall:
// 8 bricks across (≈ 8 in each incl. mortar) and 24 courses (≈ 2⅔ in), so the
// tile repeats seamlessly. Returns a colour map plus a matching bump map
// (mortar recessed, chipped edges, pitted faces) so light catches the relief.
const BRICK_COLOURS = [
  [[146, 64, 45], 0.26], // common red
  [[122, 54, 41], 0.24], // dark red
  [[101, 47, 39], 0.15], // brown
  [[84, 42, 44], 0.12], // purple-brown
  [[156, 92, 62], 0.09], // orange
  [[62, 35, 31], 0.08], // over-fired / burnt
  [[170, 124, 92], 0.06], // tan
]

function pickColour(rand) {
  let r = rand()
  for (const [c, w] of BRICK_COLOURS) {
    if ((r -= w) <= 0) return c
  }
  return BRICK_COLOURS[0][0]
}

export function brickTextures() {
  const S = 1024
  const COLS = 8
  const ROWS = 24
  const bw = S / COLS
  const bh = S / ROWS
  const mortar = 5
  const [c, ctx] = canvas(S, S)
  const [hc, hctx] = canvas(S, S) // height: white = proud, black = recessed
  const rand = rng(7)

  ctx.fillStyle = '#5b544c'
  ctx.fillRect(0, 0, S, S)
  hctx.fillStyle = '#2a2a2a'
  hctx.fillRect(0, 0, S, S)

  // Draw at x, x ± S so bricks crossing the tile edge wrap seamlessly.
  const wrapX = (x, w, fn) => {
    for (const dx of [-S, 0, S]) if (x + dx < S && x + dx + w > 0) fn(x + dx)
  }
  const jag = () => (rand() - 0.5) * 2.2

  for (let row = 0; row < ROWS; row++) {
    const off = row % 2 ? bw / 2 : 0
    for (let col = -1; col <= COLS; col++) {
      const x0 = col * bw + off + mortar / 2
      const y0 = row * bh + mortar / 2
      const w = bw - mortar
      const h = bh - mortar
      const [r, g, b] = pickColour(rand)
      const v = 0.68 + rand() * 0.3 // weathered: a touch darker overall
      const fill = `rgb(${Math.min(255, r * v + jag() * 4)},${Math.min(255, g * v)},${Math.min(255, b * v)})`
      const corners = [jag(), jag(), jag(), jag(), jag(), jag(), jag(), jag()]
      const lift = 190 + Math.floor(rand() * 40)
      const flash = rand() < 0.35 // darker fire-flashed end
      const flashLeft = rand() < 0.5
      const chips = Array.from({ length: rand() < 0.5 ? 0 : 1 + Math.floor(rand() * 2) }, () => ({
        t: rand(),
        edge: Math.floor(rand() * 4),
        r: 1.2 + rand() * 2.6,
      }))

      wrapX(x0 - 4, w + 8, (x) => {
        x += 4
        const path = (cx) => {
          cx.beginPath()
          cx.moveTo(x + corners[0], y0 + corners[1])
          cx.lineTo(x + w + corners[2], y0 + corners[3])
          cx.lineTo(x + w + corners[4], y0 + h + corners[5])
          cx.lineTo(x + corners[6], y0 + h + corners[7])
          cx.closePath()
        }
        path(ctx)
        ctx.fillStyle = fill
        ctx.fill()
        // light from above: top slightly brighter, bottom slightly darker
        const lg = ctx.createLinearGradient(0, y0, 0, y0 + h)
        lg.addColorStop(0, 'rgba(255,235,215,0.08)')
        lg.addColorStop(1, 'rgba(0,0,0,0.12)')
        ctx.fillStyle = lg
        ctx.fill()
        if (flash) {
          const fg = ctx.createLinearGradient(x, 0, x + w, 0)
          fg.addColorStop(flashLeft ? 0 : 1, 'rgba(20,10,10,0.45)')
          fg.addColorStop(flashLeft ? 0.45 : 0.55, 'rgba(20,10,10,0)')
          ctx.fillStyle = fg
          ctx.fill()
        }
        path(hctx)
        hctx.fillStyle = `rgb(${lift},${lift},${lift})`
        hctx.fill()
        // chipped edges: bites of mortar colour / depth out of the brick
        for (const ch of chips) {
          const px = ch.edge % 2 === 0 ? x + ch.t * w : ch.edge === 1 ? x + w : x
          const py = ch.edge % 2 === 1 ? y0 + ch.t * h : ch.edge === 0 ? y0 : y0 + h
          ctx.fillStyle = '#4f4841'
          hctx.fillStyle = '#5a5a5a'
          for (const cx of [ctx, hctx]) {
            cx.beginPath()
            cx.arc(px, py, ch.r, 0, Math.PI * 2)
            cx.fill()
          }
        }
      })
    }
  }

  // Pits and speckles on the faces (both maps), wrapped.
  for (let i = 0; i < 22000; i++) {
    const x = rand() * S
    const y = rand() * S
    const sz = rand() < 0.98 ? 1 : 1.5 + rand() * 1.5 // mostly fine grit, few pits
    const dark = rand() < 0.7
    ctx.fillStyle = dark ? `rgba(25,15,12,${0.12 + rand() * 0.25})` : `rgba(235,215,190,${rand() * 0.18})`
    ctx.fillRect(x, y, sz, sz)
    if (dark && sz > 1) {
      hctx.fillStyle = 'rgba(0,0,0,0.6)'
      hctx.fillRect(x, y, sz, sz)
    }
  }

  // Large-scale age: damp patches, soot and white efflorescence, wrapped in
  // both directions so the tile edges never show.
  const blot = (x, y, r, colour) => {
    for (const dx of [-S, 0, S])
      for (const dy of [-S, 0, S]) {
        const g = ctx.createRadialGradient(x + dx, y + dy, 0, x + dx, y + dy, r)
        g.addColorStop(0, colour)
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.fillRect(x + dx - r, y + dy - r, r * 2, r * 2)
      }
  }
  for (let i = 0; i < 34; i++) blot(rand() * S, rand() * S, 60 + rand() * 200, `rgba(12,8,6,${0.2 + rand() * 0.32})`)
  for (let i = 0; i < 7; i++) blot(rand() * S, rand() * S, 30 + rand() * 90, `rgba(225,222,210,${0.12 + rand() * 0.16})`)

  // Fine per-pixel grain so faces read as fired clay, not flat colour.
  const img = ctx.getImageData(0, 0, S, S)
  const d = img.data
  for (let i = 0; i < d.length; i += 4) {
    const n = 0.9 + rand() * 0.2
    d[i] *= n
    d[i + 1] *= n
    d[i + 2] *= n
  }
  ctx.putImageData(img, 0, 0)

  const map = toTexture(c)
  map.wrapS = map.wrapT = THREE.RepeatWrapping
  const bump = new THREE.CanvasTexture(hc)
  bump.colorSpace = THREE.NoColorSpace
  bump.wrapS = bump.wrapT = THREE.RepeatWrapping
  bump.anisotropy = 8
  map.anisotropy = 8
  return { map, bump }
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
// stray speckles. Transparent background so it sits on the brick.
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
