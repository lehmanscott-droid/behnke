# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **First-time art buyers** drawn in by the energy of the work and a reachable
  price for an original.
- **Street-art and graffiti fans** who love spray paint, urban texture and
  the underground look.
- **Interior and home buyers** looking for a statement piece for a specific
  wall or room.
- **Friends and followers** who know Scott Lehman or follow the work and buy
  because he made it.
- **Coming next: curators, galleries and press** evaluating the work for
  shows and representation. The site should hold up as a portfolio for them.

Many arrive on a phone from a shared link; the link preview
(`public/og-image.jpg`) is often their first sight of the work.

## Product Purpose

Scott Lehman Art (scottlehmanart.com) shows and sells original abstract
paintings in spray paint, acrylic and mixed texture. Visitors look closely at
each piece, then buy it outright or send an inquiry. It also opens the door to
commissions and, increasingly, to shows and galleries.

Success: originals sell, commission and gallery inquiries come in, and the
work reads as serious art, not decor.

## Positioning

- **Texture you have to see close.** Spray haze, dry pigment worked back to
  the weave, metallic leaf, scratched fields, drips. The surface is the point,
  which is why the site has a macro texture zoom.
- **Raw, loud, physical process.** Paintings are made fast and physically:
  layering, flooding, dripping, scraping. Energy over polish.
- **Originals only, one of one.** Every painting exists once and ships with a
  signed certificate of authenticity. There are no prints.

## Operating Context

- The studio wall (grid) shows every piece; tapping one opens a full-screen
  viewer with a texture zoom (lens on desktop, pinch on touch), lighting
  presets and the painting's notes.
- "Enter the warehouse" opens an optional 3D walk where the paintings hang on
  brick walls; tapping one opens the same viewer and checkout.
- Buying: a slide-out checkout with a hosted Stripe Payment Link per painting
  (one sale, then it deactivates), or an inquiry sent through Formspree.
- Commissions are requested by email or through an inquiry on any painting.

## Capabilities and Constraints

- Single-page React 18 + Vite + Tailwind + Framer Motion site on Vercel. No
  backend; everything in `src/config.js` and `src/data/paintings.js` is public.
- The 3D warehouse walk (React Three Fiber) must stay lazy-loaded so three.js
  never ships in the main bundle. All its textures are drawn procedurally.
- No background music. The old audio player was removed on purpose; don't add
  sound without asking.
- Shipping: from Chicago within 5 business days, US flat $50 (packing and
  insurance included), international quoted on inquiry. Paintings ship
  unframed and wired; frames in photos are for display only.
- Returns: within 14 days of delivery in original condition and packaging;
  buyer pays insured return shipping; the painting price is refunded, shipping
  is not. Damage reported within 7 days is repaired or refunded. Copy lives in
  `src/components/Policies.jsx`.
- Each painting needs three images in `public/artwork/`: `<id>-web.jpg`
  (grid/viewer), `<id>.jpg` (zoom) and `<id>-canvas.jpg` (warehouse walls).
- Planned: more originals, more commissions, shows and galleries.
  Not planned: prints or editions.

## Brand Commitments

- Name: **Scott Lehman Art**. Studio line: "Underground Studio · Est. MMXXV".
- Voice: short, sensory and direct about materials ("Raw and loud up close.",
  "Political and physical."); plain-language policies.
- Each painting has a title, year, size, medium, framing, price and a short
  note describing its surface.
- Public contact: lehman.scott@gmail.com (`CONTACT_EMAIL` in `src/config.js`).

## Evidence on Hand

- Three originals (2026, 24 × 30 in, $480 each): Pink Static, Tidewrack,
  Bleeding Standard. Images in `public/artwork/`, details in
  `src/data/paintings.js`.
- Link preview `public/og-image.jpg`; warehouse banner
  `public/warehouse-teaser.jpg`.
- Signed certificate of authenticity with every painting.
- No collector testimonials, sales history, exhibitions, press or gallery
  representation yet. Do not invent any.

## Product Principles

1. The painting leads. Every screen exists to get the work seen, up close; the
   interface steps back whenever a painting is on screen.
2. Show the surface. Texture is the work's difference, so zoom, light and
   image quality come before decoration.
3. One of one, stated plainly. Originality, size, medium and price are facts
   given straight; never fake scarcity or social proof.
4. Make buying an original feel reachable. Clear price, clear shipping and
   returns, and an easy way to ask a question, for first-time buyers as much
   as for collectors.
5. Portfolio-grade. As shows and galleries come into view, every page should
   hold up to a curator's look.
