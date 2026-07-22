# BEHNKE // Studio Wall

A single-page React art portfolio for abstract spray-paint, acrylic and
mixed-texture work. Dark, gritty, brutalist — built with **React + Vite +
Tailwind CSS + Framer Motion**.

## Run it

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Features

**The Interactive Studio Wall** — responsive CSS-columns masonry grid. Cards
tilt, glitch (RGB-split) and light up a neon border on hover; click to open the
full-screen modal.

**The Context Engine (modal)** — high-res viewer on the left, metadata + CTA on
the right, plus a **Studio Light Switch** that re-lights the piece:
_Dim Gallery Spotlight_, _Daylight Studio_, and _UV Blacklight Look_ (driven by
CSS filters + drop-shadows).

**Ambient Audio Engine** (`components/AudioPlayer.jsx`) — a floating vinyl
player, bottom-left. Play/pause, a "Studio Vibe" dropdown (Lo-Fi Beats,
Alternative/Radiohead, Industrial Electronic), a spinning record and a glitchy
CSS waveform visualizer. Mounted once at the app root so it **never re-mounts or
interrupts** when you open modals or the cart.

**Macro Texture Zoom** (`components/TextureZoom.jsx`) — inside the modal. On
desktop the cursor becomes a magnifying lens that tracks the mouse over the
hi-res image; on touch devices it's **pinch-to-zoom + double-tap** (Framer
Motion), with drag-to-pan while zoomed.

**Secure the Piece** (`components/CheckoutCart.jsx`) — the raw-bordered
`INQUIRE / BUY PIECE` button opens a slide-out checkout from the right with the
piece thumbnail, price, status, and a Name / Shipping Address / Email form.

## Where to drop your own stuff

| What | File | Notes |
| --- | --- | --- |
| Paintings (images, hi-res, titles, prices, notes) | `src/data/paintings.js` | Placeholders use `picsum.photos`. Set `hiRes` to your largest file for a crisp zoom lens. |
| Audio tracks / streams | `src/data/channels.js` | Point `src` at `/public/audio/*.mp3` or a streaming URL. |
| Payment integration | `src/components/CheckoutCart.jsx` → `handlePayment` | A commented-out **Stripe Checkout** redirect and a **Formspree** webhook are both stubbed in; swap in whichever you use. |
| Lighting presets | `src/components/StudioLightSwitch.jsx` | Tweak `stage`, `artFilter`, `artShadow`. |

## Project structure

```
src/
  App.jsx                    # composition root; owns modal + cart state
  data/
    paintings.js             # placeholder artwork data
    channels.js              # audio channel config
  components/
    StudioWall.jsx           # masonry grid
    ArtworkCard.jsx          # glitchy hover tile
    ArtworkModal.jsx         # full-screen "context engine"
    TextureZoom.jsx          # magnifying lens / pinch-zoom
    StudioLightSwitch.jsx    # lighting environment presets
    CheckoutCart.jsx         # slide-out checkout
    AudioPlayer.jsx          # persistent vinyl player
    Waveform.jsx             # CSS audio visualizer
    GrainOverlay.jsx         # film-grain overlay
```
