import { Check, Cog, Droplets, Gauge, Disc3, Settings2, Wrench, Phone } from 'lucide-react'
import Button from '../components/Button'
import { company, services } from '../data/site'

const iconMap: Record<string, typeof Cog> = { Cog, Droplets, Gauge, Disc3, Settings2, Wrench }

export default function Services() {
  return (
    <>
      {/* ---------- HEADER ---------- */}
      <section className="relative overflow-hidden border-b border-line-soft">
        <img
          src="/images/shop-bay.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="smoke-overlay absolute inset-0" aria-hidden="true" />
        <div className="container-x relative z-10 pt-44 pb-16 text-center">
          <p className="kicker">Wadsworth, OH</p>
          <h1 className="mt-3 font-display text-display-lg-mobile text-chalk md:text-[56px]">
            Our Services
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-body-lg text-chalk-dim">
            Transmission rebuilds are our specialty, but R/T is a full-service shop. One trusted
            team for everything your vehicle needs, foreign and domestic, cars and trucks.
          </p>
        </div>
      </section>

      {/* ---------- SERVICES GRID ---------- */}
      <section className="py-20 md:py-24">
        <div className="container-x reveal-group grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = iconMap[s.icon] ?? Cog
            return (
              <article
                key={s.title}
                className={`machined flex flex-col p-8 ${s.feature ? 'lg:col-span-1' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={30} className="text-crimson" aria-hidden="true" />
                  {s.feature && (
                    <span className="font-cond text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                      Specialty
                    </span>
                  )}
                </div>
                <h2 className="mt-5 font-display text-headline-md text-chalk">{s.title}</h2>
                <p className="mt-3 flex-1 text-body-md text-chalk-dim">{s.blurb}</p>
                <ul className="mt-5 space-y-2">
                  {s.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2 text-[14px] text-chalk">
                      <Check size={15} className="shrink-0 text-crimson" aria-hidden="true" /> {pt}
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </section>

      {/* ---------- ALL MAKES BAND ---------- */}
      <section className="border-y border-line-soft bg-pitch-2 py-16 md:py-20">
        <div className="container-x reveal text-center">
          <p className="kicker">No Job Too Big or Small</p>
          <h2 className="mt-3 font-display text-headline-lg text-chalk md:text-[40px]">
            All Makes &amp; Models, Foreign &amp; Domestic
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-body-md text-chalk-dim">
            Don&rsquo;t see your exact issue listed? Chances are we handle it. If we ever aren&rsquo;t
            the right shop for the job, we&rsquo;ll tell you straight, that&rsquo;s how we&rsquo;ve
            earned our reputation in Wadsworth.
          </p>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="py-20 md:py-24">
        <div className="container-x reveal mx-auto max-w-3xl border border-crimson bg-pitch-2 p-10 text-center md:p-14">
          <h2 className="font-display text-headline-lg text-chalk md:text-[40px]">
            Get a Straight, Fair Estimate
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-body-md text-chalk-dim">
            Tell us what&rsquo;s going on and we&rsquo;ll diagnose it honestly, then quote it before
            any work begins. No surprises.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={company.phoneHref} variant="crimson" className="px-10 py-5" skew>
              <Phone size={18} /> {company.phone}
            </Button>
            <Button href="/contact" variant="outline" className="px-10 py-5">
              Request Service Online
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
