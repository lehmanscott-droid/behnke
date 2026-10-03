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

## Browser checks (Playwright MCP)

`.mcp.json` registers the **Playwright MCP** server so Claude Code can drive a
real browser: start `npm run dev`, open the printed localhost URL, click
through the wall, modal, checkout and warehouse walk, and take screenshots
(try a phone size such as `iPhone 15`). `.claude/settings.json` pre-approves
it. In Claude Code cloud sessions it runs headless on the pre-installed
Chromium at `/opt/pw-browsers/chromium`; elsewhere it uses Playwright's own
browser. The version is pinned to `@playwright/mcp@0.0.83` because that is
the release verified against the cloud Chromium — re-test before bumping.
Snapshots land in `.playwright-mcp/` (gitignored). No API key needed.

## Plugins

`.claude/settings.json` registers two plugin marketplaces and enables their
plugins, so Claude Code offers to install them when the repo is trusted:

- **Impeccable** (`pbakaus/impeccable`) — frontend design skill with
  `/impeccable` commands (`audit`, `critique`, `polish`, …). Use it for UI work.
- **Claude Mem** (`thedotmack/claude-mem`) — persistent memory across
  sessions. Its database lives in `~/.claude-mem` on the machine, so it only
  builds up locally; cloud sessions start with an empty memory each time.

## Deployment

The site deploys to **Vercel** at the root of its own domain,
`https://scottlehmanart.com`. Vercel builds every push: `main` goes to
production, and every pull request gets its own preview URL. There is no
GitHub Actions deploy workflow and GitHub Pages is not used.

`vite.config.js` sets `base: '/'`. Keep `dev`, `build`, and `preview` all
agreeing on this base. Always reference files in `public/` through
`import.meta.env.BASE_URL` (see the `asset()` helper in `paintings.js`).

## Architecture

`src/App.jsx` is the composition root. It owns three pieces of view state:
which painting the modal shows (`active`), which painting the checkout is
securing (`checkout`), and whether the 3D warehouse walk is open (`walking`).

The **warehouse walk** (`GalleryWalk.jsx`, React Three Fiber + drei) is
lazy-loaded with `React.lazy`, so three.js (~230 kB gzipped) only downloads when
someone taps "Enter the warehouse". Keep it that way — never import it (or
three) eagerly from the main bundle. It sits at `z-[60]`, below the modal
(`z-[65]`) and checkout (`z-[70]`), so tapping a painting in the walk opens the
normal popup and buying works the same. Paintings are laid out automatically
from `paintings.js`. The walls are board-formed concrete: one seamless photo
tile (`public/textures/concrete-wall.jpg` + `-bump.jpg`, 1.2 m per tile)
generated with Higgsfield for this site, then cropped and blended to tile. Everything
else (floor, ceiling, the SCOTT LEHMAN name on the end wall, wall labels) is
drawn procedurally in `src/gallery/textures.js`, so no third-party assets.
The side walls carry no graffiti on purpose — the paintings carry the room.
Movement is step-based (`stop` index: entrance → each painting → end wall),
not scroll-based: Back/Next buttons, a ≥40 px swipe, one wheel notch or arrow
keys each move exactly one stop. The site has no background music: the old vinyl
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
    GalleryWalk.jsx          # 3D warehouse walk (lazy-loaded overlay)
  gallery/
    textures.js              # procedural floor / ceiling / graffiti name / labels
    GrainOverlay.jsx         # film-grain overlay
public/
  artwork/                   # image assets (full-res, -web, and -canvas crops)
  favicon.svg
  og-image.jpg               # 1200×630 link-preview image
  textures/                  # seamless concrete wall tile + bump map (warehouse)
  warehouse-teaser.jpg       # banner image for "Enter the warehouse"
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
| Warehouse walk (layout, path, lights, tags) | `src/components/GalleryWalk.jsx` |

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
- Every painting is shown on the same warehouse wall at true scale:
  `scripts/mockup/mockup.py` pastes the (untouched) painting onto
  `scripts/mockup/warehouse-wall.jpg` and writes `<id>.jpg` + `<id>-web.jpg`.
  Mark a sold piece `status: 'Sold'` (see `isSold` in `paintings.js`): it
  stays on the wall with no price and no checkout.
  Use it for every new piece so the wall stays consistent.
- Artwork images live in `public/artwork/`: `<id>-web.jpg` for the grid/modal,
  `<id>.jpg` for the zoom lens (`hiRes`), and `<id>-canvas.jpg` (the painting
  alone, straightened and cropped to its edges) for the warehouse walk.
