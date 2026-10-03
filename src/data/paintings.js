// ---------------------------------------------------------------------------
// PORTFOLIO DATA
// ---------------------------------------------------------------------------
// These three entries are your real uploaded works. The images live in
// /public/artwork and are served straight from the site.
//   - `image`  : lighter version shown in the grid + modal (*-web.jpg)
//   - `hiRes`  : sharper version fed to the Macro Texture Zoom lens (*.jpg)
//   - `canvas` : the painting alone, cropped out of the room photo, no frame
//                (*-canvas.jpg). Hung on the walls of the 3D warehouse walk.
//                Optional: without it the walk falls back to `image`.
//   - `framing`: shown in the modal (the wall photos are framed mockups, so
//                say plainly what the buyer actually gets)
//
// All details below are real. To add a piece, upload its image to
// /public/artwork and copy one of these blocks.
// ---------------------------------------------------------------------------

// Prefix files in /public with the app's base path (see `base` in
// vite.config.js).
const asset = (path) => import.meta.env.BASE_URL + path

// `stripeLink`: paste this piece's Stripe Payment Link here (https://buy.stripe.com/…)
// to enable the "Buy Now" card-payment button. Leave '' to show only the
// inquiry option for that piece. See src/config.js for how to create one.

export const paintings = [
  {
    id: 'pink-static',
    title: 'Pink Static',
    year: 2026,
    dimensions: '24 × 30 in',
    medium: 'Spray Paint, Acrylic, and Mixed Texture',
    framing: 'Unframed',
    price: '$480',
    status: 'Original Available',
    stripeLink: 'https://buy.stripe.com/fZueVea7G49Advz26o53O03', // live — one sale, then deactivates
    image: asset('artwork/pink-static-web.jpg'),
    hiRes: asset('artwork/pink-static.jpg'),
    canvas: asset('artwork/pink-static-canvas.jpg'),
    notes:
      'Hot magenta bleeds into a scratched black field, the lower half worked back with dry pigment until the weave shows through. Raw and loud up close.',
  },
  {
    id: 'tidewrack',
    title: 'Tidewrack',
    year: 2026,
    dimensions: '24 × 30 in',
    medium: 'Spray Paint, Acrylic, and Mixed Texture',
    framing: 'Unframed',
    price: '$480',
    status: 'Original Available',
    stripeLink: 'https://buy.stripe.com/5kQ3cw7Zy8pQdvzeTa53O04', // live — one sale, then deactivates
    image: asset('artwork/tidewrack-web.jpg'),
    hiRes: asset('artwork/tidewrack.jpg'),
    canvas: asset('artwork/tidewrack-canvas.jpg'),
    notes:
      'Electric blue collapses into a green-gold bed of coral-like tangles and silver flecks. Layered wet-on-wet, then flooded with metallic leaf.',
  },
  {
    id: 'bleeding-standard',
    title: 'Bleeding Standard',
    year: 2026,
    dimensions: '24 × 30 in',
    medium: 'Spray Paint, Acrylic, and Mixed Texture',
    framing: 'Unframed',
    price: '$480',
    status: 'Original Available',
    stripeLink: 'https://buy.stripe.com/eVq6oIenWgWmezD6mE53O05', // live — one sale, then deactivates
    image: asset('artwork/bleeding-standard-web.jpg'),
    hiRes: asset('artwork/bleeding-standard.jpg'),
    canvas: asset('artwork/bleeding-standard-canvas.jpg'),
    notes:
      'A flag dissolving under its own weight — spray-hazed stripes, hand-cut stars, and heavy dripped reds running off the field. Political and physical.',
  },
]

export default paintings
