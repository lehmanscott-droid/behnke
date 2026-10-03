---
name: Scott Lehman Art
description: Original abstract spray-paint, acrylic and mixed-texture paintings, hung on a lit wall in a dark warehouse.
colors:
  ink-900: "#0b0b0d"
  ink-800: "#121216"
  ink-700: "#17171c"
  ink-600: "#1f1f26"
  ink-500: "#2a2a33"
  electric: "#00e5ff"
  hotpink: "#ff2d95"
  acid: "#c6ff00"
  bone: "#e5e5e5"
  ash: "#a3a3a3"
  smoke: "#737373"
  soot: "#525252"
  white: "#ffffff"
typography:
  display:
    fontFamily: "Archivo Black, Impact, system-ui, sans-serif"
    fontSize: "96px"
    fontWeight: 400
    lineHeight: 0.85
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Archivo Black, Impact, system-ui, sans-serif"
    fontSize: "30px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Archivo Black, Impact, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Space Mono, JetBrains Mono, ui-monospace, monospace"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Space Mono, JetBrains Mono, ui-monospace, monospace"
    fontSize: "10px"
    fontWeight: 400
    letterSpacing: "0.3em"
rounded:
  none: "0px"
spacing:
  gutter: "16px"
  gutter-wide: "24px"
  tile-gap: "16px"
  section: "64px"
components:
  button-buy:
    backgroundColor: "rgba(0, 229, 255, 0.1)"
    textColor: "{colors.white}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "16px"
  button-buy-hover:
    backgroundColor: "{colors.electric}"
    textColor: "{colors.ink-900}"
  button-inquire:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "16px 20px"
  button-inquire-hover:
    backgroundColor: "{colors.hotpink}"
    textColor: "{colors.ink-900}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ash}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "4px 8px"
  input:
    backgroundColor: "{colors.ink-900}"
    textColor: "{colors.bone}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "10px 12px"
  artwork-tile:
    backgroundColor: "{colors.ink-800}"
    rounded: "{rounded.none}"
  info-panel:
    backgroundColor: "{colors.ink-800}"
    textColor: "{colors.bone}"
    width: "420px"
---

# Design System: Scott Lehman Art

## Overview

**Creative North Star: "The Lit Wall"**

A dark warehouse after hours, and one wall lit. The underground mood (matte
charcoal, brick, film grain, raw type) is the room; the paintings are the only
things in full light. Visitors come for the surface: spray haze, dry pigment
worked back to the weave, metallic leaf, drips. Everything in the interface
exists to get them closer to it, and steps back the moment a painting is on
screen.

The aim is premium but edgy, full of raw emotion and authenticity. Premium
comes from restraint: a quiet near-black room, generous space around each
piece, and facts stated straight. The edge comes from the room itself: heavy
condensed capitals, monospaced labels, grain, hairline borders, and a single
live wire of neon. Authenticity means the work is always shown true. Nothing
in the interface tints, filters or distorts a painting where someone is
judging it.

The site has to work for a first-time buyer on a phone and, increasingly, for
a curator. Neither should have to look past the interface to see the work.

**Key Characteristics:**
- Matte near-black room (never pure black) with a faint cyan/pink vignette and film grain
- Paintings are the brightest, most colourful thing on any screen
- Archivo Black capitals for names; Space Mono for everything practical
- Square corners and 1px hairline borders throughout
- One live-wire accent (electric cyan); pink and acid are rare signals
- The painting is shown true wherever it is being judged: viewer, zoom, warehouse

## Colors

A near-black studio palette with one neon live wire. Colour belongs to the
paintings; the interface borrows as little as it can.

### Primary
- **Live Wire Cyan** (#00e5ff): the one interactive accent. Links, keyboard
  focus rings, input focus, the Buy (card payment) button, hover borders, and
  prices. When something on screen can be acted on, cyan is how you know.

### Secondary
- **Hot Pink Signal** (#ff2d95): status and inquiry only. The Inquire / Buy
  Piece button in the viewer, the painting's status, inquiry form errors, and
  close-button hover. Never a decorative fill.

### Tertiary
- **Acid Confirm** (#c6ff00): success only, such as the "Inquiry sent"
  confirmation.

### Neutral
- **Warehouse Black** (#0b0b0d, `ink-900`): page background, inputs, overlay
  base. Never replace with pure #000.
- **Night Panel** (#121216, `ink-800`): artwork tiles, the viewer's info
  panel, the checkout drawer.
- **Raised Panel** (#17171c, `ink-700`) and **Seam** (#1f1f26 / #2a2a33,
  `ink-600`/`ink-500`): nested surfaces, scrollbar thumb.
- **Bone** (#e5e5e5, `neutral-200`): body text.
- **Ash** (#a3a3a3, `neutral-400`): secondary copy, the hero intro.
- **Smoke** (#737373, `neutral-500`): labels and metadata.
- **Soot** (#525252, `neutral-600`): footer text, form placeholders.
- **White** (#ffffff): display headings; hairlines at 10–25% white.

### Named Rules
**The Live Wire Rule.** Electric cyan is the single interactive accent. Pink
marks status and inquiry, acid marks success, and neither is used to decorate.
The three neons appear together in one place only: the hero's medium tags
(▚ Spray-paint, ▚ Acrylic, ▚ Mixed Texture).

**The Brightest Thing Rule.** On any screen that shows a painting, the
painting is the brightest and most saturated thing in view. Neon is applied as
1px lines, small type or a brief hover, never as a large field next to art.

## Typography

**Display Font:** Archivo Black (with Impact, system-ui)
**Body Font:** Space Mono (with JetBrains Mono, ui-monospace)

**Character:** A heavy, condensed grotesk in tight caps does the shouting,
like a stencil on a warehouse door. A typewriter mono does the talking:
specs, notes, policies, forms. The mix is part sign-painter and part
inventory sheet.

### Hierarchy
- **Display** (Archivo Black, 60px → 72px at `sm` → 96px at `md`,
  line-height 0.85, tracking −0.02em, uppercase): the hero name only. "ART" is
  set in outline (`.text-stroke`, 1px white at 85%).
- **Headline** (Archivo Black, 30px, line-height 1, uppercase): painting title
  in the viewer, "Enter the warehouse" (30px → 48px), section headings at 24px.
- **Title** (Archivo Black, 18px, line-height 1): tile captions, checkout
  painting name, button labels (16–18px uppercase).
- **Body** (Space Mono 400, 14px viewer notes / 12px policies and hero intro,
  line-height 1.625): all reading text.
- **Label** (Space Mono 400, 10px, tracking 0.2–0.35em, uppercase): studio
  tags, spec labels, form labels, footer, index numbers.

### Named Rules
**The Stencil and Ledger Rule.** Archivo Black only names things (the artist,
a painting, a section, an action). Every fact, note, price or policy is
Space Mono.

## Layout

A single scrolling page in a centred container up to 1280px wide
(`max-w-7xl`), with 16px gutters (24px from 640px).

- **Hero:** studio tag, the stacked display name, a short intro (right-aligned
  from 768px), the three medium tags, and the "Enter the warehouse" banner
  (160px tall, 208px from 640px).
- **Studio wall:** a CSS-columns masonry, 1 column → 2 at 640px → 3 at
  1024px, 16px gaps, so each painting keeps its own proportions.
- **Viewer:** full-screen. On phones the painting stage sits above the info
  panel (stage at least 45vh); from 1024px the stage fills the left and a
  420px info panel runs down the right with a sticky action bar.
- **Checkout:** a drawer from the right, full width on phones, 448px max.
- **Sections:** 64px vertical padding, separated by 10% white hairlines.
- **Layers:** grain overlay and warehouse walk `z-60`, viewer `z-65`,
  checkout `z-70`.
- **Breakpoints:** `sm` 640px, `md` 768px, `lg` 1024px.

## Elevation & Depth

Depth comes from light, not from shadow-on-UI. The room is flat and dark; the
lighting presets cast shadow and glow on the painting itself. Interface
surfaces separate with tone (ink-900 → ink-800) and hairlines. Overlays dim
the room with near-opaque ink and a blur.

### Shadow Vocabulary
- **Neon edge** (`box-shadow: 0 0 0 1px rgba(0,229,255,0.6), 0 0 24px rgba(0,229,255,0.25)`):
  the texture-zoom lens and focused inputs.
- **Pink edge** (`box-shadow: 0 0 0 1px rgba(255,45,149,0.6), 0 0 24px rgba(255,45,149,0.25)`):
  defined in the Tailwind config but not used yet.
- **Drawer cast** (`box-shadow: -20px 0 60px rgba(0,0,0,0.6)`): the checkout
  drawer over the page.
- **Art shadows** (from the lighting preset): Spotlight
  `0 40px 80px rgba(0,0,0,0.75)`, Daylight `0 24px 50px rgba(0,0,0,0.35)`,
  UV `0 0 70px rgba(150,60,255,0.5)`.

### Named Rules
**The Light Falls on the Art Rule.** Only paintings are lit. UI elements get
a glow only to show focus or the zoom lens, never as decoration.

## Shapes

Square everything: tiles, buttons, inputs, panels, tags and the warehouse
banner have 0px corners and 1px hairline borders (10–25% white). Primary
actions use a 2px border. Only two shapes are round: the texture-zoom lens
(a circle with a 2px cyan border and the neon-edge glow, like a loupe) and the
small colour dot on each lighting preset. Textures are part of the form language: film grain over the
whole page (6% overlay) and faint scanlines inside panels.

## Components

### Buttons
- **Shape:** square (0px), full width in panels.
- **Buy (card payment):** 2px cyan border, 10% cyan fill, white Archivo Black
  uppercase; hover fills solid cyan with ink text.
- **Inquire / Buy Piece:** 2px pink border, transparent; on hover a pink wash
  slides in from the left over 500ms and it fills solid pink with ink text.
- **Ghost:** 1px white-20% border, Space Mono, ash text; hover turns the border
  and text cyan (or pink for close).
- **Focus:** 2px cyan ring on every interactive element.

### Inputs / Fields
- **Style:** Warehouse Black fill, 1px white-15% border, square, Space Mono
  14px, Soot placeholders, 10px label above in Smoke.
- **Focus:** border turns cyan with the neon-edge glow.
- **Error:** a pink-bordered note (2px left rule, 5% pink wash) below the form.

### Artwork Tile (signature component)
A painting in a Night Panel frame with a 1px hairline, at its natural
proportions in the masonry. A small "01" index tag sits top-left at 40% white.
On hover (desktop only): a slight tilt and lift (−1.2°, 1.5%), a cyan hairline
with an inner glow, an RGB-split glitch, and a caption bar rising from the
bottom with title, year, size and a pink-outlined price. Tiles fade up into
view once as they scroll in.

### Viewer ("context engine")
Full-screen over a 95% Warehouse Black blur. The painting stage takes the
lighting preset (Dim Gallery Spotlight by default, Daylight Studio, UV
Blacklight Look) and the texture zoom (lens on desktop, pinch on touch). The
info panel holds the title, a 2-column spec grid (dimensions, year, medium,
price, status, framing), the artist's notes and the lighting switch, with the
Inquire / Buy Piece action pinned at the bottom.

### Warehouse Banner
A full-width, 1px-bordered panel with the warehouse photo at 70% under a
bottom-up black gradient, a cyan label and "Enter the warehouse →" in
Archivo Black. Hover brings the image up to 90%, scales it slightly and
slides the arrow.

### Navigation
There is no nav bar. The page is one scroll: hero → wall → policies → footer,
with in-page links (Shipping & returns) and a "← back" button in the viewer.

## Do's and Don'ts

### Do:
- **Do** keep the painting the brightest, most saturated thing on any screen
  that shows one.
- **Do** show paintings true in the viewer, texture zoom and warehouse walk.
  The Daylight and Spotlight presets stay close to true; UV Blacklight is an
  opt-in novelty, never the default.
- **Do** use electric cyan as the one interactive accent; keep pink for status
  and inquiry and acid for success.
- **Do** keep corners square and borders 1px (2px for primary actions); the
  zoom lens and lighting dots are the only circles.
- **Do** give facts straight in Space Mono: size, medium, year, framing,
  price, status.
- **Do** keep the background near-black (#0b0b0d), never pure #000.
- **Do** respect `prefers-reduced-motion`; motion stays short (200–700ms).

### Don't:
- **Don't** let neon become a large fill or background next to a painting.
- **Don't** filter, tint or distort a painting outside a grid tile's hover.
  The RGB-split glitch belongs to grid tiles only.
- **Don't** boost a painting's contrast or saturation on hover. The current
  tile hover (contrast 125%, saturate 150%) is known drift, to remove in a
  later pass.
- **Don't** add background music or autoplaying sound.
- **Don't** invent collectors, sales, exhibitions or press.
- **Don't** import three.js or the warehouse walk eagerly; it stays lazy.

### Known drift (to align in a later pass)
- Tile hover boosts contrast/saturation (see above).
- Tile captions show the price in a pink outline; under the Live Wire Rule,
  prices are cyan.
- Policies section headings use all three neons (cyan, pink, acid); under the
  Live Wire Rule they would be white or a single accent.
