# CLAUDE.md

Guidance for Claude Code (and other AI assistants) working in this repository.

## What this is

**BEHNKE // Studio Wall** — a single-page React portfolio site for abstract
spray-paint, acrylic and mixed-texture work. Dark, gritty, brutalist aesthetic.
Built with **React 18 + Vite + Tailwind CSS + Framer Motion**. No backend.

## Commands

```bash
npm install        # install dependencies
npm run dev        # start the Vite dev server
npm run build      # production build → dist/
npm run preview    # preview the production build locally
```

There is no test runner, linter, or type checker configured — those scripts do
not exist. Do not invent them.

## Deployment

The site deploys to **GitHub Pages** as a project page at
`https://<user>.github.io/behnke/`. Because of this, `vite.config.js` sets
`base: '/behnke/'` so every asset URL is prefixed with `/behnke/`. Keep `dev`,
`build`, and `preview` all agreeing on this base. If the site moves to a custom
domain or the repo root, change `base` to `'/'`.

## Architecture

`src/App.jsx` is the composition root. It owns only two pieces of view state:
which painting the modal shows (`active`) and which painting the checkout is
securing (`checkout`). The `AudioPlayer` is a **sibling** of the modal and cart
and is never conditionally rendered, so opening either never re-mounts it — the
music keeps playing uninterrupted. Preserve this invariant when refactoring.

### Layout

```
src/
  App.jsx                    # composition root; owns modal + cart state
  main.jsx                   # React entry point
  config.js                  # public Formspree / Stripe config (no secrets)
  index.css                  # Tailwind entry + global styles
  data/
    paintings.js             # artwork data (images, prices, stripeLink, notes)
    channels.js              # audio channel config
  components/
    StudioWall.jsx           # CSS-columns masonry grid
    ArtworkCard.jsx          # glitchy RGB-split hover tile
    ArtworkModal.jsx         # full-screen "context engine" viewer
    TextureZoom.jsx          # magnifying lens (desktop) / pinch-zoom (touch)
    StudioLightSwitch.jsx    # lighting environment presets
    CheckoutCart.jsx         # slide-out checkout panel
    AudioPlayer.jsx          # persistent vinyl player (mounted once at root)
    Waveform.jsx             # CSS audio visualizer
    GrainOverlay.jsx         # film-grain overlay
public/
  artwork/                   # image assets (full-res + -web variants)
  favicon.svg
```

## Where content lives

| What | File |
| --- | --- |
| Paintings (images, hi-res, titles, prices, notes) | `src/data/paintings.js` |
| Audio tracks / streams | `src/data/channels.js` |
| Payments & inquiries config | `src/config.js` + `stripeLink` per piece in `paintings.js` |
| Lighting presets | `src/components/StudioLightSwitch.jsx` |

## Payments & inquiries — zero backend

Checkout runs with **no server**:

- **Stripe Payment Links** — a hosted checkout URL per painting, on each piece's
  `stripeLink` field in `paintings.js`. These URLs are public and safe to commit.
- **Formspree** — collects inquiries via a public form endpoint. Only the form
  ID (the part after `/f/`) goes in `src/config.js` as `FORMSPREE_FORM_ID`.

**There are no secret keys in this repo.** Everything in `config.js` and
`paintings.js` is public and safe to commit. Do not add API secrets to the
client bundle.

## Conventions

- Match the existing code style: functional components, hooks, Tailwind utility
  classes, and the descriptive block comments already present in `App.jsx` and
  `config.js`.
- Placeholder artwork uses `picsum.photos`; real images live in `public/artwork/`.
