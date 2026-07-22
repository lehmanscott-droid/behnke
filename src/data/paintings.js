// ---------------------------------------------------------------------------
// PORTFOLIO DATA
// ---------------------------------------------------------------------------
// These three entries are your real uploaded works. The images live in
// /public/artwork and are served straight from the site.
//   - `image`  : lighter version shown in the grid + modal (*-web.jpg)
//   - `hiRes`  : sharper version fed to the Macro Texture Zoom lens (*.jpg)
//
// The TITLES, PRICES, DIMENSIONS and NOTES below are placeholders I chose so
// the site reads well — edit any of them freely. To add more pieces later,
// upload the image to /public/artwork and copy one of these blocks.
// ---------------------------------------------------------------------------

// Prefix files in /public with the app's base path so they resolve both in
// local dev (served at "/") and on GitHub Pages (served at "/behnke/").
const asset = (path) => import.meta.env.BASE_URL + path

// `stripeLink`: paste this piece's Stripe Payment Link here (https://buy.stripe.com/…)
// to enable the "Buy Now" card-payment button. Leave '' to show only the
// inquiry option for that piece. See src/config.js for how to create one.

export const paintings = [
  {
    id: 'pink-static',
    title: 'Pink Static', // placeholder title — rename freely
    year: 2024,
    dimensions: '30 × 40 in', // placeholder — set your real size
    medium: 'Spray-paint, Acrylic, and Mixed Texture',
    price: '$3,400', // placeholder
    status: 'Original Available',
    stripeLink: '', // paste this piece's Stripe Payment Link
    image: asset('artwork/pink-static-web.jpg'),
    hiRes: asset('artwork/pink-static.jpg'),
    notes:
      'Hot magenta bleeds into a scratched black field, the lower half worked back with dry pigment until the weave shows through. Raw and loud up close.',
  },
  {
    id: 'tidewrack',
    title: 'Tidewrack', // placeholder title — rename freely
    year: 2024,
    dimensions: '24 × 30 in', // placeholder — set your real size
    medium: 'Spray-paint, Acrylic, and Mixed Texture',
    price: '$2,800', // placeholder
    status: 'Original Available',
    stripeLink: '', // paste this piece's Stripe Payment Link
    image: asset('artwork/tidewrack-web.jpg'),
    hiRes: asset('artwork/tidewrack.jpg'),
    notes:
      'Electric blue collapses into a green-gold bed of coral-like tangles and silver flecks. Layered wet-on-wet, then flooded with metallic leaf.',
  },
  {
    id: 'bleeding-standard',
    title: 'Bleeding Standard', // placeholder title — rename freely
    year: 2023,
    dimensions: '40 × 30 in', // placeholder — set your real size
    medium: 'Spray-paint, Acrylic, and Mixed Texture',
    price: '$4,200', // placeholder
    status: 'Original Available',
    stripeLink: '', // paste this piece's Stripe Payment Link
    image: asset('artwork/bleeding-standard-web.jpg'),
    hiRes: asset('artwork/bleeding-standard.jpg'),
    notes:
      'A flag dissolving under its own weight — spray-hazed stripes, hand-cut stars, and heavy dripped reds running off the field. Political and physical.',
  },
]

export default paintings
