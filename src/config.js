// ---------------------------------------------------------------------------
// PUBLIC CONFIG  — safe to commit (there are NO secret keys in here)
// ---------------------------------------------------------------------------
// The whole checkout runs with zero backend:
//   • Stripe uses "Payment Links" — a hosted checkout URL per painting. The
//     buyer pays by card on Stripe's own page. Payment Link URLs are public
//     and safe to put in code (see stripeLink on each piece in paintings.js).
//   • Formspree collects inquiries and emails them to you. The form ID below
//     is a public endpoint, also safe to commit.
//
// Until you fill these in, the checkout still opens and explains what to add.
// ---------------------------------------------------------------------------

// ── Formspree ──────────────────────────────────────────────────────────────
// 1. Sign up (free) at https://formspree.io and create a new form.
// 2. It gives you an endpoint like  https://formspree.io/f/mldabcpq
// 3. Paste ONLY the code after /f/  (e.g. 'mldabcpq') between the quotes:
export const FORMSPREE_FORM_ID = '' // e.g. 'mldabcpq'

export const formspreeEndpoint = () =>
  FORMSPREE_FORM_ID ? `https://formspree.io/f/${FORMSPREE_FORM_ID}` : ''

// ── Stripe ─────────────────────────────────────────────────────────────────
// Stripe Payment Links live per-painting on the `stripeLink` field in
// src/data/paintings.js. To create one:
//   Stripe Dashboard → Product catalog → Payment Links → "New" →
//   add the piece + price → copy the link (looks like https://buy.stripe.com/xxx)
//   → paste it into that painting's `stripeLink`.
// Tip: in the Payment Link's options, turn ON "Collect shipping address" so
// Stripe gathers where to ship the original.
