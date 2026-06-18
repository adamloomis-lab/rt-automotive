import { Phone, HeartHandshake, MessageSquareText, Timer, BadgeDollarSign } from 'lucide-react'
import Button from '../components/Button'
import { company, ratingSummary } from '../data/site'

const promises = [
  {
    icon: MessageSquareText,
    title: 'Plain-Language Answers',
    blurb:
      'We turn intimidating car problems into words anyone can understand, so you always know what’s wrong and why.',
  },
  {
    icon: BadgeDollarSign,
    title: 'Fair, Up-Front Pricing',
    blurb:
      'You get a straight estimate before work begins. No upselling, no padded invoices, no surprises at pickup.',
  },
  {
    icon: HeartHandshake,
    title: 'Honest Recommendations',
    blurb:
      'We tell you what needs fixing now and what can wait, and we’ll be straight if a repair isn’t worth it.',
  },
  {
    icon: Timer,
    title: 'Quick Turnaround',
    blurb:
      'We know you need your vehicle back. We work efficiently and keep you posted every step of the way.',
  },
]

export default function About() {
  return (
    <>
      {/* ---------- HEADER ---------- */}
      <section className="relative overflow-hidden border-b border-line-soft">
        <img
          src="/images/under-car.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="smoke-overlay absolute inset-0" aria-hidden="true" />
        <div className="container-x relative z-10 pt-44 pb-16 text-center">
          <p className="kicker">Family-Run on Main Street</p>
          <h1 className="mt-3 font-display text-display-lg-mobile text-chalk md:text-[56px]">
            About R/T Automotive
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-body-lg text-chalk-dim">
            A Wadsworth transmission and repair shop built on a simple idea, treat people honestly
            and do the work right.
          </p>
        </div>
      </section>

      {/* ---------- STORY ---------- */}
      <section className="py-20 md:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div className="reveal relative overflow-hidden border border-line">
            <img src="/images/diagnostics.jpg" alt="A technician working under the hood at R/T Automotive" className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="reveal">
            <p className="kicker">Who We Are</p>
            <h2 className="mt-3 font-display text-headline-lg text-chalk md:text-[40px]">
              The Shop Wadsworth Trusts
            </h2>
            <span className="gold-rule mt-5 block" />
            <div className="mt-6 space-y-5 text-body-md text-chalk-dim">
              <p>
                R/T Automotive &amp; Transmission is a family-run shop right on Main Street in
                Wadsworth. Transmissions are our specialty, the complex rebuilds and diagnostics a
                lot of shops won&rsquo;t touch, but we&rsquo;re a full-service garage for everything
                you drive.
              </p>
              <p>
                Led by owner Reed, our team has built its reputation one honest repair at a time.
                We&rsquo;ll explain exactly what&rsquo;s going on with your vehicle, show you your
                options, and never push work you don&rsquo;t need. More than once, drivers have come
                to us after another shop quoted an expensive, unnecessary fix, and left having saved
                hundreds or thousands.
              </p>
              <p>
                That&rsquo;s the difference at R/T: real diagnosis, fair pricing and quality work
                that gets you safely back on the road.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-6">
              <div>
                <div className="font-display text-4xl text-crimson">{ratingSummary.value}</div>
                <div className="font-cond text-[11px] uppercase tracking-[0.16em] text-chalk-faint">
                  Google rating
                </div>
              </div>
              <div className="h-10 w-px bg-line" />
              <div>
                <div className="font-display text-4xl text-chalk">{ratingSummary.count}+</div>
                <div className="font-cond text-[11px] uppercase tracking-[0.16em] text-chalk-faint">
                  Happy customers
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- THE R/T PROMISE ---------- */}
      <section className="border-y border-line-soft bg-pitch-2 py-20 md:py-24">
        <div className="container-x">
          <div className="reveal mx-auto max-w-2xl text-center">
            <p className="kicker">The R/T Promise</p>
            <h2 className="mt-3 font-display text-headline-lg text-chalk md:text-[40px]">
              Honest Work, Every Time
            </h2>
            <span className="gold-rule mx-auto mt-5 block" />
          </div>
          <div className="reveal-group mt-12 grid gap-5 sm:grid-cols-2">
            {promises.map((p) => (
              <div key={p.title} className="machined flex gap-5 p-7">
                <p.icon size={26} className="mt-1 shrink-0 text-crimson" aria-hidden="true" />
                <div>
                  <h3 className="font-display text-headline-sm text-chalk">{p.title}</h3>
                  <p className="mt-2 text-body-md text-chalk-dim">{p.blurb}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="py-20 md:py-24">
        <div className="container-x reveal text-center">
          <h2 className="font-display text-display-lg-mobile text-chalk md:text-[44px]">
            Experience the Difference
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-body-lg text-chalk-dim">
            Stop by the shop on Main Street or reach out, we&rsquo;d be glad to help.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={company.phoneHref} variant="crimson" className="px-10 py-5" skew>
              <Phone size={18} /> {company.phone}
            </Button>
            <Button href="/contact" variant="outline" className="px-10 py-5">
              Request Service
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
