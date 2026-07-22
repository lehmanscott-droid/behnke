import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { formspreeEndpoint } from '../config.js'

// ---------------------------------------------------------------------------
// CheckoutCart — "Secure the Piece"
// ---------------------------------------------------------------------------
// A slide-out panel from the right offering two zero-backend paths:
//
//   1. BUY NOW  → redirects to this piece's Stripe Payment Link
//      (painting.stripeLink). The buyer pays by card on Stripe's hosted page.
//
//   2. MAKE AN INQUIRY → POSTs the Name / Shipping Address / Email / message
//      form to Formspree (config.js FORMSPREE_FORM_ID), which emails it to you.
//
// Both degrade gracefully: if a link / form ID isn't set yet, the relevant
// action shows a short "how to enable" hint instead of breaking.
// ---------------------------------------------------------------------------

const EMPTY = { name: '', address: '', email: '', message: '' }

export default function CheckoutCart({ painting, onClose }) {
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('')

  const open = Boolean(painting)
  const setField = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const emailValid = /\S+@\S+\.\S+/.test(form.email)
  const inquiryValid = form.name.trim() && emailValid && form.address.trim()

  const stripeLink = painting?.stripeLink?.trim()
  const hasStripe = Boolean(stripeLink)
  const endpoint = formspreeEndpoint()
  const hasFormspree = Boolean(endpoint)

  // ── Stripe: hand off to the hosted Payment Link ──────────────────────────
  const handleBuyNow = () => {
    if (!hasStripe) return
    // Optionally tag the redirect with the piece for your own reference.
    // Stripe collects card + (if enabled) shipping on its own secure page.
    window.location.href = stripeLink
  }

  // ── Formspree: email the inquiry ─────────────────────────────────────────
  const handleInquiry = async (e) => {
    e.preventDefault()
    if (!inquiryValid || status === 'sending') return

    if (!hasFormspree) {
      setStatus('error')
      setErrorMsg(
        'Inquiries need a Formspree form ID — add one in src/config.js to enable this.'
      )
      return
    }

    setStatus('sending')
    setErrorMsg('')
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _subject: `Inquiry: ${painting.title} (${painting.price})`,
          piece: painting.title,
          pieceId: painting.id,
          price: painting.price,
          status: painting.status,
          name: form.name,
          email: form.email,
          shippingAddress: form.address,
          message: form.message,
        }),
      })
      if (res.ok) {
        setStatus('sent')
      } else {
        const data = await res.json().catch(() => ({}))
        setStatus('error')
        setErrorMsg(data?.errors?.[0]?.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error — please try again.')
    }
  }

  const handleClose = () => {
    setForm(EMPTY)
    setStatus('idle')
    setErrorMsg('')
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

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
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="font-mono text-base text-electric">{painting.price}</span>
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

              {status === 'sent' ? (
                // ── Inquiry success state ──────────────────────────────────
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 border border-acid/50 bg-acid/5 p-5 text-center"
                >
                  <p className="font-display text-2xl uppercase text-acid">Inquiry sent</p>
                  <p className="mt-2 font-mono text-xs leading-relaxed text-neutral-300">
                    Thanks, {form.name.split(' ')[0] || 'friend'}. Your inquiry about{' '}
                    <span className="text-white">{painting.title}</span> is on its way. You'll
                    hear back at {form.email}.
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-5 w-full border border-white/20 px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-neutral-300 hover:border-electric hover:text-electric"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <>
                  {/* ── BUY NOW (Stripe) ─────────────────────────────────── */}
                  <div className="mt-6">
                    <button
                      onClick={handleBuyNow}
                      disabled={!hasStripe}
                      className="group relative w-full overflow-hidden border-2 border-electric bg-electric/10 px-4 py-4 font-display text-lg uppercase tracking-wide text-white transition-all enabled:hover:bg-electric enabled:hover:text-ink-900 disabled:cursor-not-allowed disabled:border-white/15 disabled:bg-transparent disabled:text-neutral-600"
                    >
                      Buy Now — Card
                    </button>
                    <p className="mt-1.5 flex items-center gap-1.5 font-mono text-[10px] leading-relaxed text-neutral-500">
                      {hasStripe ? (
                        <>🔒 Secure card payment via Stripe. Opens Stripe's checkout.</>
                      ) : (
                        <>Add this piece's Stripe Payment Link in paintings.js to enable.</>
                      )}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="my-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-600">
                    <span className="h-px flex-1 bg-white/10" />
                    or make an inquiry
                    <span className="h-px flex-1 bg-white/10" />
                  </div>

                  {/* ── INQUIRY (Formspree) ──────────────────────────────── */}
                  <form onSubmit={handleInquiry} className="space-y-4">
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
                    <Field
                      label="Message (optional)"
                      id="co-message"
                      value={form.message}
                      onChange={setField('message')}
                      placeholder="Anything you'd like to ask about the piece…"
                      textarea
                    />

                    {status === 'error' && (
                      <p className="border-l-2 border-hotpink bg-hotpink/5 px-3 py-2 font-mono text-[11px] leading-relaxed text-hotpink">
                        {errorMsg}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={!inquiryValid || status === 'sending'}
                      className="w-full border-2 border-hotpink px-4 py-3 font-display text-base uppercase tracking-wide text-white transition-colors enabled:hover:bg-hotpink enabled:hover:text-ink-900 disabled:cursor-not-allowed disabled:border-white/15 disabled:text-neutral-600"
                    >
                      {status === 'sending' ? 'Sending…' : 'Send Inquiry'}
                    </button>

                    <p className="text-center font-mono text-[10px] leading-relaxed text-neutral-500">
                      No card details are stored on this site — payment runs through Stripe,
                      inquiries through Formspree.
                    </p>
                  </form>
                </>
              )}
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
