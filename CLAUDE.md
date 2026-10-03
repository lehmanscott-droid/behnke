# CLAUDE.md

Guidance for Claude Code (and other AI assistants) working in this repository.

## What this is

**Scott Lehman Art** (repo: `behnke`) — a single-page React portfolio site for abstract
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

The site deploys to **Vercel** at the root of its own domain,
`https://scottlehmanart.com`. Vercel builds every push: `main` goes to
production, and every pull request gets its own preview URL. There is no
GitHub Actions deploy workflow and GitHub Pages is not used.

`vite.config.js` sets `base: '/'`. Keep `dev`, `build`, and `preview` all
agreeing on this base. Always reference files in `public/` through
`import.meta.env.BASE_URL` (see the `asset()` helper in `paintings.js`).

## Architecture

`src/App.jsx` is the composition root. It owns only two pieces of view state:
which painting the modal shows (`active`) and which painting the checkout is
securing (`checkout`). The site has no background music: the old vinyl
AudioPlayer was removed on purpose (licensing, and it covered content on
phones). Don't add it back without asking.

### Layout

```
src/
  App.jsx                    # composition root; owns modal + cart state
  main.jsx                   # React entry point
  config.js                  # public Formspree / Stripe config (no secrets)
  index.css                  # Tailwind entry + global styles
  data/
    paintings.js             # artwork data (images, prices, stripeLink, notes)
  components/
    StudioWall.jsx           # CSS-columns masonry grid
    ArtworkCard.jsx          # glitchy RGB-split hover tile
    ArtworkModal.jsx         # full-screen "context engine" viewer
    TextureZoom.jsx          # magnifying lens (desktop) / pinch-zoom (touch)
    StudioLightSwitch.jsx    # lighting environment presets
    CheckoutCart.jsx         # slide-out checkout panel
    Policies.jsx             # shipping, returns & commissions section
    GrainOverlay.jsx         # film-grain overlay
public/
  artwork/                   # image assets (full-res + -web variants)
  favicon.svg
  og-image.jpg               # 1200×630 link-preview image
```

## Where content lives

| What | File |
| --- | --- |
| Paintings (images, hi-res, titles, prices, notes) | `src/data/paintings.js` |
| Payments & inquiries config | `src/config.js` + `stripeLink` per piece in `paintings.js` |
| Shipping & returns copy | `src/components/Policies.jsx` (keep in step with the $50 Stripe shipping rate) |
| Public contact email | `CONTACT_EMAIL` in `src/config.js` |
| Link preview (Open Graph) | `public/og-image.jpg` (1200×630) + `og:`/`twitter:` tags in `index.html` — absolute `https://www.scottlehmanart.com/` URLs |
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
