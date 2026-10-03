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
    year: 2024,
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
    year: 2025,
    dimensions: '24 × 30 in',
    medium: 'Spray Paint, Acrylic, and Mixed Texture',
    framing: 'Unframed',
    price: '$480',
    status: 'Original Available',
    stripeLink: 'https://buy.stripe.com/7sYdRadjS9tUbnrbGY53O06', // live — one sale, then deactivates
    image: asset('artwork/verdigris-web.jpg'),
    hiRes: asset('artwork/verdigris.jpg'),
    canvas: asset('artwork/verdigris-canvas.jpg'),
    notes:
      'Sea-glass teal and moss green dragged in broad, swirling strokes, with stencilled lattice ghosting through and a small cluster of flowers tucked into the bottom corner. Quiet from across the room, busy up close.',
  },
  {
    id: 'nightshade',
    title: 'Nightshade',
    year: 2025,
    dimensions: '24 × 30 in',
    medium: 'Spray Paint, Acrylic, and Mixed Texture',
    framing: 'Unframed',
    price: '$480',
    status: 'Original Available',
    stripeLink: 'https://buy.stripe.com/8x2fZi2FecG64Z3dP653O07', // live — one sale, then deactivates
    image: asset('artwork/nightshade-web.jpg'),
    hiRes: asset('artwork/nightshade.jpg'),
    canvas: asset('artwork/nightshade-canvas.jpg'),
    notes:
      'A near-black field crowded with stencilled blossoms in coral, blush and pale green, peppered with red spatter, with dark drips running down the lower right.',
  },
  {
    id: 'backporch',
    title: 'Backporch',
    year: 2025,
    dimensions: '24 × 30 in',
    medium: 'Spray Paint, Acrylic, and Mixed Texture',
    framing: 'Unframed',
    price: '$480',
    status: 'Original Available',
    stripeLink: 'https://buy.stripe.com/7sY8wQfs00XogHLaCU53O08', // live — one sale, then deactivates
    image: asset('artwork/backporch-web.jpg'),
    hiRes: asset('artwork/backporch.jpg'),
    canvas: asset('artwork/backporch-canvas.jpg'),
    notes:
      'Deep greens layered with stencilled ferns, vines and lattice, then hit with bursts of magenta and lime overspray. A garden at dusk.',
  },
  {
    id: 'understory',
    title: 'Understory',
    year: 2024,
    dimensions: '24 × 30 in',
    medium: 'Spray Paint, Acrylic, and Mixed Texture',
    framing: 'Unframed',
    price: '$480',
    status: 'Original Available',
    stripeLink: 'https://buy.stripe.com/eVqeVe7Zy7lM8bf12k53O09', // live — one sale, then deactivates
    image: asset('artwork/understory-web.jpg'),
    hiRes: asset('artwork/understory.jpg'),
    canvas: asset('artwork/understory-canvas.jpg'),
    notes:
      'Lime and forest greens whipped into dense, swirling brushwork with flashes of rust underneath — the light under a canopy.',
  },
  {
    id: 'rust-signal',
    title: 'Rust Signal',
    year: 2023,
    dimensions: '24 × 30 in',
    medium: 'Spray Paint, Acrylic, and Mixed Texture',
    framing: 'Unframed',
    price: '$480',
    status: 'Original Available',
    stripeLink: 'https://buy.stripe.com/14AfZi1Ba49AezD12k53O0a', // live — one sale, then deactivates
    image: asset('artwork/rust-signal-web.jpg'),
    hiRes: asset('artwork/rust-signal.jpg'),
    canvas: asset('artwork/rust-signal-canvas.jpg'),
    notes:
      'Burnt orange worked over with stencilled chevrons, brick blocks and lace patterns, flecked with pink and red spatter and a run of drips down the left side.',
  },
  {
    id: 'groundwater',
    title: 'Groundwater',
    year: 2023,
    dimensions: '30 × 30 in',
    medium: 'Spray Paint, Acrylic, and Mixed Texture',
    framing: 'Unframed',
    price: '$480',
    status: 'Original Available',
    stripeLink: 'https://buy.stripe.com/4gM3cwdjS7lM2QVh1i53O0b', // live — one sale, then deactivates
    image: asset('artwork/groundwater-web.jpg'),
    hiRes: asset('artwork/groundwater.jpg'),
    canvas: asset('artwork/groundwater-canvas.jpg'),
    notes:
      'Teal, cobalt and sea green built up thick, then combed into rippling circles and spattered with red and orange.',
  },
  {
    id: 'floor-plan',
    title: 'Floor Plan',
    year: 2024,
    dimensions: '24 × 30 in',
    medium: 'Spray Paint, Acrylic, and Mixed Texture',
    framing: 'Unframed',
    price: '$480',
    status: 'Original Available',
    stripeLink: 'https://buy.stripe.com/00w9AUdjS6hI2QV3as53O0c', // live — one sale, then deactivates
    image: asset('artwork/floor-plan-web.jpg'),
    hiRes: asset('artwork/floor-plan.jpg'),
    canvas: asset('artwork/floor-plan-canvas.jpg'),
    notes:
      'A squared spiral of silver-grey bands on a marbled black ground, broken by white blocks and hit with drips of green, blue and violet.',
  },
  {
    id: 'curtain-call',
    title: 'Curtain Call',
    year: 2022,
    dimensions: '48 × 60 in',
    medium: 'Spray Paint, Acrylic, and Mixed Texture',
    framing: 'Unframed',
    price: '$720',
    status: 'Original Available',
    stripeLink: 'https://buy.stripe.com/8x228s93CbC21MR6mE53O0d', // live — one sale, then deactivates
    image: asset('artwork/curtain-call-web.jpg'),
    hiRes: asset('artwork/curtain-call.jpg'),
    canvas: asset('artwork/curtain-call-canvas.jpg'),
    notes:
      'Two heavy black curtains, one glossy and one stamped with pattern, part on a plain white floor where two small stencilled girls hold sculpted red balloons.',
  },
  {
    id: 'open-heart',
    title: 'Open Heart',
    year: 2022,
    dimensions: '24 × 24 in',
    medium: 'Acrylic and Mixed Texture',
    framing: 'Framed (gold frame included)',
    price: '$480',
    status: 'Original Available',
    stripeLink: 'https://buy.stripe.com/4gM9AUbbKdKafDH26o53O0e', // live — one sale, then deactivates
    image: asset('artwork/open-heart-web.jpg'),
    hiRes: asset('artwork/open-heart.jpg'),
    canvas: asset('artwork/open-heart-canvas.jpg'),
    notes:
      'A black-outlined heart packed with red, pink and white impasto and fine spatter, floating in thick swirls of turquoise and navy.',
  },
  {
    id: 'gloves-off',
    title: 'Gloves Off',
    year: 2023,
    dimensions: '24 × 30 in',
    medium: 'Boxing Gloves, Acrylic, and Mixed Texture on Canvas',
    framing: 'Unframed',
    price: '$480',
    status: 'Original Available',
    stripeLink: 'https://buy.stripe.com/5kQ14o4Nm8pQbnr8uM53O0f', // live — one sale, then deactivates
    image: asset('artwork/gloves-off-web.jpg'),
    hiRes: asset('artwork/gloves-off.jpg'),
    canvas: asset('artwork/gloves-off-canvas.jpg'),
    notes:
      'A real pair of red boxing gloves mounted heel-to-heel into a heart, tied off with a painted black string over a scraped white impasto ground.',
  },
  {
    id: 'fault-lines',
    title: 'Fault Lines',
    year: 2022,
    dimensions: '24 × 30 in',
    medium: 'Spray Paint, Acrylic, and Mixed Texture',
    framing: 'Unframed',
    price: '$480',
    status: 'Original Available',
    stripeLink: 'https://buy.stripe.com/5kQcN6bbK8pQbnrdP653O0g', // live — one sale, then deactivates
    image: asset('artwork/fault-lines-web.jpg'),
    hiRes: asset('artwork/fault-lines.jpg'),
    canvas: asset('artwork/fault-lines-canvas.jpg'),
    notes:
      'A black-and-white field split by sprayed bars into panels of checkerboard, honeycomb and dot stencils, with a band of heavy black drips across the top.',
  },
  {
    id: 'mamba',
    title: 'Mamba',
    year: 2022,
    dimensions: '40 × 30 in',
    medium: 'Spray Paint, Acrylic, and Mixed Texture',
    framing: 'Framed (black frame included)',
    price: '$600',
    status: 'Original Available',
    stripeLink: 'https://buy.stripe.com/5kQ5kEcfOeOe6378uM53O0j', // live — one sale, then deactivates
    image: asset('artwork/mamba-web.jpg'),
    hiRes: asset('artwork/mamba.jpg'),
    canvas: asset('artwork/mamba-canvas.jpg'),
    notes:
      'A stencilled portrait in a purple jersey over a textured violet and teal ground, splashed with gold paint.',
  },
  {
    id: 'walk-home',
    title: 'Walk Home',
    year: 2023,
    dimensions: '48 × 60 in',
    medium: 'Spray Paint, Acrylic, and Mixed Texture',
    framing: 'Unframed',
    price: '$720',
    status: 'Original Available',
    stripeLink: 'https://buy.stripe.com/00w14o2FefSi8bf4ew53O0i', // live — one sale, then deactivates
    image: asset('artwork/walk-home-web.jpg'),
    hiRes: asset('artwork/walk-home.jpg'),
    canvas: asset('artwork/walk-home-canvas.jpg'),
    notes:
      'A stencilled parent and two children walking away hand in hand, swallowed by sweeps of cobalt, pink lace stencils, gold pattern and a mossy green ground.',
  },
  {
    id: 'lucky',
    title: 'Lucky',
    year: 2024,
    dimensions: '24 × 30 in',
    medium: 'Spray Paint, Acrylic, and Mixed Texture',
    framing: 'Unframed',
    price: '$480',
    status: 'Original Available',
    stripeLink: 'https://buy.stripe.com/3cIaEY2Fe7lM6374ew53O0k', // live — one sale, then deactivates
    image: asset('artwork/lucky-web.jpg'),
    hiRes: asset('artwork/lucky.jpg'),
    canvas: asset('artwork/lucky-canvas.jpg'),
    notes:
      'A stencilled street corner under a hot blue sky: a neon CLUB LUCKY sign and an old Italian kitchen wall, rendered in glittering pink, rust and electric blue.',
  },
  {
    id: 'wildfire',
    title: 'Wildfire',
    year: 2025,
    dimensions: '24 × 30 in',
    medium: 'Spray Paint, Acrylic, and Mixed Texture',
    framing: 'Unframed',
    price: '$480',
    status: 'Original Available',
    stripeLink: 'https://buy.stripe.com/14A00kgw40Xo3UZ3as53O0l', // live — one sale, then deactivates
    image: asset('artwork/wildfire-web.jpg'),
    hiRes: asset('artwork/wildfire.jpg'),
    canvas: asset('artwork/wildfire-canvas.jpg'),
    notes:
      'Blazing orange and red swept across a white ground, crossed with pale brush marks, threaded with yellow drips and pinned down by a heavy black zigzag.',
  },
  {
    id: 'cold-front',
    title: 'Cold Front',
    year: 2025,
    dimensions: '24 × 30 in',
    medium: 'Spray Paint, Acrylic, and Mixed Texture',
    framing: 'Unframed',
    price: '$480',
    status: 'Original Available',
    stripeLink: 'https://buy.stripe.com/eVqeVe6Vu8pQ2QVeTa53O0m', // live — one sale, then deactivates
    image: asset('artwork/cold-front-web.jpg'),
    hiRes: asset('artwork/cold-front.jpg'),
    canvas: asset('artwork/cold-front-canvas.jpg'),
    notes:
      'Slate grey worked thick with a palette knife, broken open by hot pink and acid yellow, with stencilled flowers, black brush lines and a scrawled black tag.',
  },
  {
    id: 'burnout',
    title: 'Burnout',
    year: 2023,
    dimensions: '20 × 16 in',
    medium: 'Acrylic and Mixed Texture',
    framing: 'Unframed',
    price: '$200',
    status: 'Original Available',
    stripeLink: 'https://buy.stripe.com/8x27sM1Ba49A0IN12k53O0n', // live — one sale, then deactivates
    image: asset('artwork/burnout-web.jpg'),
    hiRes: asset('artwork/burnout.jpg'),
    canvas: asset('artwork/burnout-canvas.jpg'),
    notes:
      'A red muscle car floating in a burst of red, orange and yellow impasto, the paint dragged outward like heat off the tarmac.',
  },
  {
    id: 'riptide',
    title: 'Riptide',
    year: 2025,
    dimensions: '24 × 30 in',
    medium: 'Spray Paint, Acrylic, and Mixed Texture',
    framing: 'Unframed',
    price: '$480',
    status: 'Original Available',
    stripeLink: 'https://buy.stripe.com/8x25kE93CdKacrv7qI53O0o', // live — one sale, then deactivates
    image: asset('artwork/riptide-web.jpg'),
    hiRes: asset('artwork/riptide.jpg'),
    canvas: asset('artwork/riptide-canvas.jpg'),
    notes:
      'Thick white paste combed into looping, overlapping currents, then misted with navy, sky blue and silver spray so the ridges catch the color like light on water.',
  },
]

// A sold piece stays on the wall as portfolio work: no price, no checkout.
export const isSold = (p) => /sold/i.test(p?.status || '')

export default paintings
