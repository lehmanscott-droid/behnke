import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// ---------------------------------------------------------------------------
// CheckoutCart — "Secure the Piece"
// ---------------------------------------------------------------------------
// A slide-out panel from the right. Shows the piece thumbnail, price and status,
// collects Name / Shipping Address / Email, then hands off to your payment
// provider. The handoff is stubbed below — wire up Stripe or Formspree there.
// ---------------------------------------------------------------------------

const EMPTY = { name: '', address: '', email: '' }

export default function CheckoutCart({ painting, onClose }) {
  const [form, setForm] = useState(EMPTY)
  const [submitting, setSubmitting] = useState(false)

  const open = Boolean(painting)

  const setField = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const valid =
    form.name.trim() && form.address.trim() && /\S+@\S+\.\S+/.test(form.email)

  // -------------------------------------------------------------------------
  // Payment handoff placeholder.
  // -------------------------------------------------------------------------
  // Replace the body with your real integration. Two common options:
  //
  // (A) Stripe Checkout redirect (needs a tiny backend endpoint that creates a
  //     Checkout Session and returns its URL, or a publishable-key redirect):
  //
  //   import { loadStripe } from '@stripe/stripe-js'
  //   const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK)
  //   const res = await fetch('/api/create-checkout-session', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ pieceId: painting.id, buyer: form }),
  //   })
  //   const { sessionId } = await res.json()
  //   await stripe.redirectToCheckout({ sessionId })
  //
  // (B) Formspree (or any webhook) for a simple inquiry/order email:
  //
  //   await fetch('https://formspree.io/f/XXXXXXXX', {
  //     method: 'POST',
  //     headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ piece: painting.title, price: painting.price, ...form }),
  //   })
  // -------------------------------------------------------------------------
  const handlePayment = async (e) => {
    e.preventDefault()
    if (!valid || !painting) return
    setSubmitting(true)

    // --- BEGIN PLACEHOLDER: swap this block for Stripe / Formspree above ----
    await new Promise((r) => setTimeout(r, 700)) // simulate network
    // eslint-disable-next-line no-console
    console.log('[checkout] order intent', {
      piece: painting.id,
      title: painting.title,
      price: painting.price,
      status: painting.status,
      buyer: form,
    })
    alert(
      `Thanks, ${form.name.split(' ')[0] || 'friend'}. This is a demo checkout — ` +
        `plug in Stripe or Formspree in CheckoutCart.jsx (handlePayment) to take real payment.`
    )
    // --- END PLACEHOLDER ----------------------------------------------------

    setSubmitting(false)
  }

  const handleClose = () => {
    setForm(EMPTY)
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Scrim */}
          <motion.div
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Panel */}
          <motion.aside
            className="scanlines fixed right-0 top-0 z-[71] flex h-full w-full max-w-md flex-col border-l border-white/15 bg-ink-800 shadow-[-20px_0_60px_rgba(0,0,0,0.6)]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            role="dialog"
            aria-label="Secure the piece"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <h2 className="font-display text-xl uppercase tracking-tight text-white">
                Secure the Piece
              </h2>
              <button
                onClick={handleClose}
                aria-label="Close checkout"
                className="border border-white/15 px-2 py-1 font-mono text-xs text-neutral-400 hover:border-hotpink hover:text-hotpink"
              >
                ✕
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-5 py-5">
              {/* Piece summary */}
              <div className="flex gap-4 border border-white/10 bg-ink-700 p-3">
                <img
                  src={painting.image}
                  alt={painting.title}
                  className="h-24 w-20 shrink-0 object-cover"
                />
                <div className="min-w-0">
                  <h3 className="font-display text-lg leading-tight text-white">
                    {painting.title}
                  </h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                    {painting.year} · {painting.dimensions}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="font-mono text-base text-electric">
                      {painting.price}
                    </span>
                    <span
                      className={`border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${
                        painting.status === 'Original Available'
                          ? 'border-acid/60 text-acid'
                          : 'border-hotpink/60 text-hotpink'
                      }`}
                    >
                      {painting.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handlePayment} className="mt-6 space-y-4">
                <Field
                  label="Name"
                  id="co-name"
                  value={form.name}
                  onChange={setField('name')}
                  placeholder="Your full name"
                  autoComplete="name"
                />
                <Field
                  label="Shipping Address"
                  id="co-address"
                  value={form.address}
                  onChange={setField('address')}
                  placeholder="Street, city, postal code, country"
                  autoComplete="street-address"
                  textarea
                />
                <Field
                  label="Email"
                  id="co-email"
                  type="email"
                  value={form.email}
                  onChange={setField('email')}
                  placeholder="you@studio.com"
                  autoComplete="email"
                />

                <button
                  type="submit"
                  disabled={!valid || submitting}
                  className="mt-2 w-full border-2 border-electric bg-electric/10 px-4 py-3 font-display text-base uppercase tracking-wide text-white transition-all hover:bg-electric hover:text-ink-900 disabled:cursor-not-allowed disabled:border-white/15 disabled:bg-transparent disabled:text-neutral-600"
                >
                  {submitting ? 'Processing…' : 'Proceed to Payment'}
                </button>

                <p className="text-center font-mono text-[10px] leading-relaxed text-neutral-500">
                  Secure handoff. No card details are stored on this site — payment
                  runs through your Stripe / Formspree integration.
                </p>
              </form>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

function Field({ label, id, textarea, ...props }) {
  const base =
    'w-full border border-white/15 bg-ink-900 px-3 py-2.5 font-mono text-sm text-neutral-100 placeholder:text-neutral-600 outline-none focus:border-electric focus:shadow-neon'
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
        {label}
      </span>
      {textarea ? (
        <textarea id={id} rows={3} className={base + ' resize-none'} {...props} />
      ) : (
        <input id={id} className={base} {...props} />
      )}
    </label>
  )
}
