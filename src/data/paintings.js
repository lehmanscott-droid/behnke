// ---------------------------------------------------------------------------
// PORTFOLIO DATA
// ---------------------------------------------------------------------------
// These entries are your real uploaded works. The images live in
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
  {
    id: 'verdigris',
    title: 'Verdigris',
    year: null, // TODO: year from Scott
    dimensions: '24 × 30 in',
    medium: 'Spray Paint, Acrylic, and Mixed Texture',
    framing: 'Unframed',
    price: '$480',
    status: 'Original Available',
    stripeLink: '',
    image: asset('artwork/verdigris-web.jpg'),
    hiRes: asset('artwork/verdigris.jpg'),
    canvas: asset('artwork/verdigris-canvas.jpg'),
    notes:
      'Sea-glass teal and moss green dragged in broad, swirling strokes, with stencilled lattice ghosting through and a small cluster of flowers tucked into the bottom corner. Quiet from across the room, busy up close.',
  },
  {
    id: 'nightshade',
    title: 'Nightshade',
    year: null, // TODO: year from Scott
    dimensions: '24 × 30 in',
    medium: 'Spray Paint, Acrylic, and Mixed Texture',
    framing: 'Unframed',
    price: '$480',
    status: 'Original Available',
    stripeLink: '',
    image: asset('artwork/nightshade-web.jpg'),
    hiRes: asset('artwork/nightshade.jpg'),
    canvas: asset('artwork/nightshade-canvas.jpg'),
    notes:
      'A near-black field crowded with stencilled blossoms in coral, blush and pale green, peppered with red spatter, with dark drips running down the lower right.',
  },
  {
    id: 'backporch',
    title: 'Backporch',
    year: null, // TODO: year from Scott
    dimensions: '24 × 30 in',
    medium: 'Spray Paint, Acrylic, and Mixed Texture',
    framing: 'Unframed',
    price: '$480',
    status: 'Original Available',
    stripeLink: '',
    image: asset('artwork/backporch-web.jpg'),
    hiRes: asset('artwork/backporch.jpg'),
    canvas: asset('artwork/backporch-canvas.jpg'),
    notes:
      'Deep greens layered with stencilled ferns, vines and lattice, then hit with bursts of magenta and lime overspray. A garden at dusk.',
  },
  {
    id: 'understory',
    title: 'Understory',
    year: null, // TODO: year from Scott
    dimensions: '24 × 30 in',
    medium: 'Spray Paint, Acrylic, and Mixed Texture',
    framing: 'Unframed',
    price: '$480',
    status: 'Original Available',
    stripeLink: '',
    image: asset('artwork/understory-web.jpg'),
    hiRes: asset('artwork/understory.jpg'),
    canvas: asset('artwork/understory-canvas.jpg'),
    notes:
      'Lime and forest greens whipped into dense, swirling brushwork with flashes of rust underneath — the light under a canopy.',
  },
  {
    id: 'rust-signal',
    title: 'Rust Signal',
    year: null, // TODO: year from Scott
    dimensions: '24 × 30 in',
    medium: 'Spray Paint, Acrylic, and Mixed Texture',
    framing: 'Unframed',
    price: '$480',
    status: 'Original Available',
    stripeLink: '',
    image: asset('artwork/rust-signal-web.jpg'),
    hiRes: asset('artwork/rust-signal.jpg'),
    canvas: asset('artwork/rust-signal-canvas.jpg'),
    notes:
      'Burnt orange worked over with stencilled chevrons, brick blocks and lace patterns, flecked with pink and red spatter and a run of drips down the left side.',
  },
  {
    id: 'groundwater',
    title: 'Groundwater',
    year: null, // TODO: year from Scott
    dimensions: '30 × 30 in',
    medium: 'Spray Paint, Acrylic, and Mixed Texture',
    framing: 'Unframed',
    price: '$480',
    status: 'Original Available',
    stripeLink: '',
    image: asset('artwork/groundwater-web.jpg'),
    hiRes: asset('artwork/groundwater.jpg'),
    canvas: asset('artwork/groundwater-canvas.jpg'),
    notes:
      'Teal, cobalt and sea green built up thick, then combed into rippling circles and spattered with red and orange.',
  },
  {
    id: 'floor-plan',
    title: 'Floor Plan',
    year: null, // TODO: year from Scott
    dimensions: '24 × 30 in',
    medium: 'Spray Paint, Acrylic, and Mixed Texture',
    framing: 'Unframed',
    price: '$480',
    status: 'Original Available',
    stripeLink: '',
    image: asset('artwork/floor-plan-web.jpg'),
    hiRes: asset('artwork/floor-plan.jpg'),
    canvas: asset('artwork/floor-plan-canvas.jpg'),
    notes:
      'A squared spiral of silver-grey bands on a marbled black ground, broken by white blocks and hit with drips of green, blue and violet.',
  },
]

export default paintings
