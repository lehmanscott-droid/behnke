// ---------------------------------------------------------------------------
// PLACEHOLDER DATA
// ---------------------------------------------------------------------------
// Swap `image` / `hiRes` for your own high-resolution URLs, and edit the copy.
//   - `image`  : grid + modal display source
//   - `hiRes`  : high-detail source fed to the Macro Texture Zoom lens.
//               Point this at the largest file you have so the lens stays crisp.
//   - `status` : shown in the checkout panel ("Original Available", etc.)
//   - `price`  : plain string — formatting is up to you.
//
// The placeholder images use picsum.photos seeds so the app renders out of the
// box. Replace them with your studio scans whenever you're ready.
// ---------------------------------------------------------------------------

const img = (seed, w = 900, h = 1200) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`

export const paintings = [
  {
    id: 'concrete-hymn',
    title: 'Concrete Hymn',
    year: 2024,
    dimensions: '48 × 60 in',
    medium: 'Spray-paint, Acrylic, and Mixed Texture',
    price: '$4,800',
    status: 'Original Available',
    image: img('behnke-01', 900, 1200),
    hiRes: img('behnke-01', 2000, 2667),
    notes:
      'Built up over six weeks of night sessions. Layers of rattle-can black bleed into raw acrylic drag marks — the surface still smells faintly of solvent.',
  },
  {
    id: 'static-bloom',
    title: 'Static Bloom',
    year: 2023,
    dimensions: '36 × 36 in',
    medium: 'Spray-paint, Acrylic, and Mixed Texture',
    price: '$3,200',
    status: 'Limited Edition Print',
    image: img('behnke-02', 1000, 1000),
    hiRes: img('behnke-02', 2400, 2400),
    notes:
      'A square study in controlled decay. Hot-pink overspray fights a bed of cracked matte medium. Best viewed under raking light.',
  },
  {
    id: 'dead-channel',
    title: 'Dead Channel',
    year: 2024,
    dimensions: '60 × 40 in',
    medium: 'Spray-paint, Acrylic, and Mixed Texture',
    price: '$5,600',
    status: 'Original Available',
    image: img('behnke-03', 900, 1350),
    hiRes: img('behnke-03', 2000, 3000),
    notes:
      'Named for the TV-snow palette. Aluminium leaf sits under three passes of frosted grey, scratched back with a wire brush.',
  },
  {
    id: 'gutter-gold',
    title: 'Gutter Gold',
    year: 2022,
    dimensions: '24 × 30 in',
    medium: 'Spray-paint, Acrylic, and Mixed Texture',
    price: '$2,400',
    status: 'Limited Edition Print',
    image: img('behnke-04', 900, 1100),
    hiRes: img('behnke-04', 2000, 2444),
    notes:
      'Found-cardboard substrate, sealed and gilded. The gold is real leaf; everything around it is deliberately cheap.',
  },
  {
    id: 'ultraviolet-saint',
    title: 'Ultraviolet Saint',
    year: 2025,
    dimensions: '48 × 48 in',
    medium: 'Spray-paint, Acrylic, and Mixed Texture',
    price: '$6,100',
    status: 'Original Available',
    image: img('behnke-05', 1000, 1000),
    hiRes: img('behnke-05', 2400, 2400),
    notes:
      'Painted with UV-reactive pigment. Reads as a muted icon in daylight and detonates under blacklight — try the light switch.',
  },
  {
    id: 'rust-liturgy',
    title: 'Rust Liturgy',
    year: 2023,
    dimensions: '40 × 50 in',
    medium: 'Spray-paint, Acrylic, and Mixed Texture',
    price: '$4,100',
    status: 'Original Available',
    image: img('behnke-06', 900, 1200),
    hiRes: img('behnke-06', 2000, 2667),
    notes:
      'Iron paint left to oxidise on the canvas for a month before sealing. Every bloom of rust is a chemical accident I chose to keep.',
  },
  {
    id: 'noise-floor',
    title: 'Noise Floor',
    year: 2024,
    dimensions: '30 × 30 in',
    medium: 'Spray-paint, Acrylic, and Mixed Texture',
    price: '$2,900',
    status: 'Limited Edition Print',
    image: img('behnke-07', 1000, 1000),
    hiRes: img('behnke-07', 2400, 2400),
    notes:
      'Minimal at a distance, chaos up close. Thousands of fine spatter points laid down with a toothbrush over a bruised violet ground.',
  },
  {
    id: 'concrete-saints',
    title: 'Concrete Saints',
    year: 2025,
    dimensions: '54 × 72 in',
    medium: 'Spray-paint, Acrylic, and Mixed Texture',
    price: '$7,800',
    status: 'Original Available',
    image: img('behnke-08', 900, 1300),
    hiRes: img('behnke-08', 2000, 2889),
    notes:
      'The largest piece in the current body of work. Stencil fragments, plaster, and electric-blue drips over a wall-grey field.',
  },
  {
    id: 'analog-ghost',
    title: 'Analog Ghost',
    year: 2022,
    dimensions: '36 × 48 in',
    medium: 'Spray-paint, Acrylic, and Mixed Texture',
    price: '$3,600',
    status: 'Limited Edition Print',
    image: img('behnke-09', 900, 1150),
    hiRes: img('behnke-09', 2000, 2556),
    notes:
      'A portrait dissolved into scan-lines and tape hiss. Built from photocopied transfers sealed under gloss gel.',
  },
]

export default paintings
