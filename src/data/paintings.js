// ---------------------------------------------------------------------------
// PORTFOLIO DATA
// ---------------------------------------------------------------------------
// These entries are your real uploaded works. The images live in
// /public/artwork and are served straight from the site.
//   - `image`  : the painting on the shared warehouse wall, shown in the
//                grid + modal (*-web.jpg, 1400 px)
//   - `hiRes`  : the same picture at 2600 px for the Macro Texture Zoom lens
//                (*.jpg). Same framing as `image`, or the lens misaligns.
//   - `canvas` : the painting alone, straightened and cropped to its edges
//                (*-canvas.jpg). Hung on the walls of the 3D warehouse walk.
//                Optional: without it the walk falls back to `image`.
//   - `framing`: shown in the modal — say plainly what the buyer gets
//
// Every piece hangs on the same wall at true scale; make the photos with
// scripts/mockup/mockup.py. To add a piece, run it, then copy a block.
// ---------------------------------------------------------------------------

// Prefix files in /public with the app's base path (see `base` in
// vite.config.js).
const asset = (path) => import.meta.env.BASE_URL + path

// `stripeLink`: paste this piece's Stripe Payment Link here (https://buy.stripe.com/…)
// to enable the "Buy Now" card-payment button. Leave '' to show only the
// inquiry option for that piece. See src/config.js for how to create one.

export const paintings = [
  {
    id: 'pleasure-palace',
    title: 'Pleasure Palace',
    year: null, // TODO: year from Scott
    dimensions: '48 × 60 in',
    medium: 'Spray Paint, Acrylic, and Mixed Texture',
    framing: null,
    price: null,
    status: 'Sold',
    stripeLink: '',
    image: asset('artwork/pleasure-palace-web.jpg'),
    hiRes: asset('artwork/pleasure-palace.jpg'),
    canvas: asset('artwork/pleasure-palace-canvas.jpg'),
    notes:
      'Hot pink roses and lace stencils scattered over a dark green ground, spattered with neon green and layered with violet netting. Made for a private collector.',
  },
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
  {
    id: 'curtain-call',
    title: 'Curtain Call',
    year: null, // TODO: year from Scott
    dimensions: '24 × 30 in', // TODO: confirm size with Scott
    medium: 'Spray Paint, Acrylic, and Mixed Texture',
    framing: 'Unframed',
    price: '$480',
    status: 'Original Available',
    stripeLink: '',
    image: asset('artwork/curtain-call-web.jpg'),
    hiRes: asset('artwork/curtain-call.jpg'),
    canvas: asset('artwork/curtain-call-canvas.jpg'),
    notes:
      'Two heavy black curtains, one glossy and one stamped with pattern, part on a plain white floor where two small stencilled girls hold sculpted red balloons.',
  },
  {
    id: 'open-heart',
    title: 'Open Heart',
    year: null, // TODO: year from Scott
    dimensions: '30 × 30 in', // TODO: confirm size with Scott
    medium: 'Acrylic and Mixed Texture',
    framing: 'Framed (gold frame included)',
    price: '$480',
    status: 'Original Available',
    stripeLink: '',
    image: asset('artwork/open-heart-web.jpg'),
    hiRes: asset('artwork/open-heart.jpg'),
    canvas: asset('artwork/open-heart-canvas.jpg'),
    notes:
      'A black-outlined heart packed with red, pink and white impasto and fine spatter, floating in thick swirls of turquoise and navy.',
  },
  {
    id: 'gloves-off',
    title: 'Gloves Off',
    year: null, // TODO: year from Scott
    dimensions: '24 × 30 in', // TODO: confirm size with Scott
    medium: 'Boxing Gloves, Acrylic, and Mixed Texture on Canvas',
    framing: 'Unframed',
    price: '$480',
    status: 'Original Available',
    stripeLink: '',
    image: asset('artwork/gloves-off-web.jpg'),
    hiRes: asset('artwork/gloves-off.jpg'),
    canvas: asset('artwork/gloves-off-canvas.jpg'),
    notes:
      'A real pair of red boxing gloves mounted heel-to-heel into a heart, tied off with a painted black string over a scraped white impasto ground.',
  },
  {
    id: 'fault-lines',
    title: 'Fault Lines',
    year: null, // TODO: year from Scott
    dimensions: '24 × 30 in', // TODO: confirm size with Scott
    medium: 'Spray Paint, Acrylic, and Mixed Texture',
    framing: 'Unframed',
    price: '$480',
    status: 'Original Available',
    stripeLink: '',
    image: asset('artwork/fault-lines-web.jpg'),
    hiRes: asset('artwork/fault-lines.jpg'),
    canvas: asset('artwork/fault-lines-canvas.jpg'),
    notes:
      'A black-and-white field split by sprayed bars into panels of checkerboard, honeycomb and dot stencils, with a band of heavy black drips across the top.',
  },
  {
    id: 'purple-and-gold',
    title: 'Purple & Gold',
    year: null, // TODO: year from Scott
    dimensions: '36 × 24 in', // TODO: confirm size with Scott
    medium: 'Spray Paint, Acrylic, and Mixed Texture',
    framing: 'Framed (black frame included)',
    price: '$480',
    status: 'Original Available',
    stripeLink: '',
    image: asset('artwork/purple-and-gold-web.jpg'),
    hiRes: asset('artwork/purple-and-gold.jpg'),
    canvas: asset('artwork/purple-and-gold-canvas.jpg'),
    notes:
      'A stencilled portrait in a purple jersey over a textured violet and teal ground, splashed with gold paint.',
  },
  {
    id: 'walk-home',
    title: 'Walk Home',
    year: null, // TODO: year from Scott
    dimensions: '24 × 30 in', // TODO: confirm size with Scott
    medium: 'Spray Paint, Acrylic, and Mixed Texture',
    framing: 'Unframed',
    price: '$480',
    status: 'Original Available',
    stripeLink: '',
    image: asset('artwork/walk-home-web.jpg'),
    hiRes: asset('artwork/walk-home.jpg'),
    canvas: asset('artwork/walk-home-canvas.jpg'),
    notes:
      'A stencilled parent and two children walking away hand in hand, swallowed by sweeps of cobalt, pink lace stencils, gold pattern and a mossy green ground.',
  },
]

// A sold piece stays on the wall as portfolio work: no price, no checkout.
export const isSold = (p) => /sold/i.test(p?.status || '')

export default paintings
