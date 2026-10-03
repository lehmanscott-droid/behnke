import { CONTACT_EMAIL } from '../config.js'

// ---------------------------------------------------------------------------
// Policies — shipping, returns and commissions
// ---------------------------------------------------------------------------
// Plain-language terms for one-of-one originals: ships from Chicago within
// 5 business days, US only at a flat $50 (insured), 14-day returns, damage
// reported within 7 days. Edit the copy here when the policy changes, and
// keep it in step with the $50 shipping rate on the Stripe Payment Links.

const email = (
  <a
    href={`mailto:${CONTACT_EMAIL}`}
    className="text-electric underline underline-offset-4 hover:text-white"
  >
    {CONTACT_EMAIL}
  </a>
)

const sections = [
  {
    title: 'Shipping',
    items: [
      <>Every painting is an original, one of one. It ships from Chicago within 5 business days of your purchase.</>,
      <>We ship within the United States for a flat $50, which covers packing and insurance for the full purchase price. Outside the US? Send an inquiry from any painting and we'll quote shipping to you.</>,
      <>Each painting is wrapped, protected at the corners and boxed for the trip.</>,
      <>Paintings ship unframed and wired, ready to hang, unless the listing says a frame is included.</>,
      <>Each painting comes with a signed certificate of authenticity.</>,
      <>We'll email you tracking once it ships. Please double-check your shipping address at checkout. Need to change it? Email {email} before it ships.</>,
    ],
  },
  {
    title: 'Returns & refunds',
    items: [
      <>You can return a painting within 14 days of delivery. Email {email} first, before sending anything back.</>,
      <>The painting must come back in the same condition, in its original packaging, with its certificate of authenticity. You pay return shipping and must insure it for the full purchase price.</>,
      <>Once it arrives back in the same condition, we refund the $480 painting price. The original $50 shipping isn't refunded.</>,
      <>If your painting arrives damaged, email {email} within 7 days of delivery with photos of the painting and the box, and keep all the packaging (the carrier needs it for the insurance claim). We'll arrange a repair or a full refund, shipping included.</>,
      <>Approved refunds go back to your original payment method.</>,
    ],
  },
  {
    title: 'Commissions',
    items: [
      <>Want a painting made for you, in your colors or a specific size? Commissions are open. Email {email} or send an inquiry from any painting and tell us what you have in mind.</>,
    ],
  },
]

export default function Policies() {
  return (
    <section id="policies" className="scroll-mt-8 border-t border-white/10 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <p className="mb-8 inline-block border border-white/15 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.35em] text-neutral-400">
          Shipping · Returns · Commissions
        </p>
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-10">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-display text-2xl uppercase leading-none text-white">
                {s.title}
              </h2>
              <ul className="mt-6 space-y-4 font-mono text-xs leading-relaxed text-neutral-300">
                {s.items.map((item, i) => (
                  <li key={i} className="border-l border-white/10 pl-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
