import { Link } from 'wouter'
import { ArrowRight, Phone, MapPin, Clock, Star, Cog, Droplets, Gauge, Disc3, ShieldCheck } from 'lucide-react'
import Button from '../components/Button'
import Reviews from '../components/Reviews'
import { company, whyPillars, services, ratingSummary } from '../data/site'

// Scrolling trust strip.
const tickerItems = [
  'Transmission Rebuilds',
  'Honest, Up-Front Pricing',
  'All Makes & Models',
  'Fast Turnaround',
  'Family-Run in Wadsworth',
  'Diagnostics Done Right',
]

function TickerRow() {
  return (
    <>
      {tickerItems.map((t) => (
        <div key={t} className="flex shrink-0 items-center gap-4">
          <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-white/70" aria-hidden="true" />
          <span className="font-cond text-[13px] font-bold uppercase tracking-[0.16em] text-white">
            {t}
          </span>
        </div>
      ))}
    </>
  )
}

const homeServices = services.slice(0, 6)
const homeIcons: Record<string, typeof Cog> = { Cog, Droplets, Gauge, Disc3 }

export default function Home() {
  return (
    <>
      {/* ------------------------------------------------ Hero */}
      <section id="hero" className="hero-clip tech-grid relative flex min-h-[92vh] items-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            className="h-full w-full object-cover"
            src="/videos/hero.mp4"
            poster="/images/engine.jpg"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
          <div className="hero-overlay absolute inset-0" aria-hidden="true" />
        </div>

        <div className="container-x relative z-10 max-w-4xl pt-32 pb-24">
          <span className="badge-chip rise rise-1">
            <ShieldCheck size={15} /> Trusted Local Shop • All Makes & Models
          </span>
          <h1 className="rise rise-2 mt-6 font-display text-[32px] leading-[1.04] text-white sm:text-[58px] lg:text-display-xl">
            Precision <span className="gold-word">Transmission</span>
            <br />& Auto Repair
          </h1>
          <p className="rise rise-3 mt-7 max-w-xl text-body-lg text-chalk-dim">
            Wadsworth&rsquo;s family-run transmission specialists. Honest answers, fair pricing and
            quality work on everything you drive, done right the first time.
          </p>
          <div className="rise rise-4 mt-9 flex flex-wrap gap-4">
            <Button href="/contact" variant="crimson" skew>
              Book Service <ArrowRight size={16} />
            </Button>
            <Button href={company.phoneHref} variant="outline">
              <Phone size={16} /> {company.phone}
            </Button>
          </div>
          <p className="rise rise-5 mt-9 inline-flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-chalk-faint">
            <span className="inline-flex items-center gap-2">
              <Star size={15} className="fill-crimson text-crimson" /> {ratingSummary.value} rating ·{' '}
              {ratingSummary.count} Google reviews
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock size={15} className="text-crimson" /> Mon-Fri 9am-5pm
            </span>
            <a
              href={company.mapsDir}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-chalk"
            >
              <MapPin size={15} className="text-crimson" /> {company.addressOneLine}
            </a>
          </p>
        </div>
      </section>

      {/* ------------------------------------------------ Trust ticker */}
      <div className="overflow-hidden border-y border-crimson-dark bg-crimson py-3" aria-label="Why R/T">
        <div className="ticker flex w-max items-center gap-10 pr-10">
          <TickerRow />
          <TickerRow />
        </div>
      </div>

      {/* ------------------------------------------------ Services bento */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <div className="reveal flex flex-col items-end justify-between gap-6 md:flex-row">
            <div>
              <p className="kicker">01 // What We Do</p>
              <h2 className="mt-3 font-display text-headline-lg text-chalk md:text-[44px]">
                Built For <span className="gold-word">Performance</span>
              </h2>
              <p className="mt-3 max-w-xl text-body-md text-chalk-dim">
                From complete transmission rebuilds to brakes, diagnostics and routine maintenance,
                one shop you can trust with everything you drive.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex shrink-0 items-center gap-2 font-cond text-[13px] font-bold uppercase tracking-[0.16em] text-crimson-light hover:gap-3"
            >
              All Services <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="reveal-group mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {homeServices.map((s) => {
              const Icon = homeIcons[s.icon] ?? Cog
              return (
                <Link
                  key={s.title}
                  href="/services"
                  className="machined group block p-7"
                >
                  <Icon size={30} className="text-crimson" aria-hidden="true" />
                  <h3 className="mt-5 font-display text-headline-md text-chalk">{s.title}</h3>
                  <p className="mt-3 text-body-md text-chalk-dim">{s.blurb}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-cond text-[12px] font-bold uppercase tracking-[0.16em] text-gold transition-all group-hover:gap-3 group-hover:text-crimson-light">
                    Learn More <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Transmission feature */}
      <section className="border-y border-line-soft bg-pitch-2">
        <div className="container-x grid items-stretch gap-0 lg:grid-cols-2">
          <div className="relative min-h-[340px] overflow-hidden border-line-soft lg:min-h-[480px] lg:border-r">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src="/videos/transmission.mp4"
              poster="/images/parts.jpg"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pitch-2 via-transparent to-transparent" aria-hidden="true" />
          </div>
          <div className="reveal flex flex-col justify-center py-14 lg:py-20 lg:pl-14">
            <p className="kicker">It&rsquo;s in our name</p>
            <h2 className="mt-3 font-display text-headline-lg text-chalk md:text-[40px]">
              Transmission Specialists
            </h2>
            <span className="gold-rule mt-5 block" />
            <p className="mt-6 max-w-lg text-body-md text-chalk-dim">
              Slipping, hard shifts, a check-engine light or fluid on the driveway? Most shops send
              transmission work out. We do it in-house, automatic, manual and CVT, with an honest
              diagnosis first so you only pay for what your vehicle actually needs.
            </p>
            <ul className="check-list mt-7 space-y-3 text-body-md text-chalk">
              <li>Complete rebuilds &amp; repairs</li>
              <li>Slipping &amp; hard-shift diagnosis</li>
              <li>Fluid &amp; filter service</li>
              <li>Clutch &amp; drivetrain work</li>
            </ul>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href="/contact" variant="crimson" skew>
                Request an Estimate
              </Button>
              <Button href="/services" variant="ghost">
                See All Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Why R/T */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <div className="reveal mx-auto max-w-2xl text-center">
            <p className="kicker">Why Drivers Choose R/T</p>
            <h2 className="mt-3 font-display text-headline-lg text-chalk md:text-[44px]">
              Repairs You Can <span className="gold-word">Trust</span>
            </h2>
            <span className="gold-rule mx-auto mt-5 block" />
          </div>
          <div className="reveal-group mt-12 grid gap-5 md:grid-cols-3">
            {whyPillars.map((p, i) => (
              <div key={p.title} className="machined p-8">
                <span className="font-cond text-[12px] font-bold uppercase tracking-[0.2em] text-crimson">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-display text-headline-md text-chalk">{p.title}</h3>
                <p className="mt-4 text-body-md text-chalk-dim">{p.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Reviews */}
      <Reviews />

      {/* ------------------------------------------------ CTA */}
      <section className="relative overflow-hidden py-24 text-center md:py-32">
        <div className="absolute inset-0">
          <video
            className="h-full w-full object-cover opacity-25"
            src="/videos/repair.mp4"
            poster="/images/under-car.jpg"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
          <div className="smoke-overlay absolute inset-0" aria-hidden="true" />
        </div>
        <div className="container-x relative z-10">
          <h2 className="reveal font-display text-display-lg-mobile text-white md:text-display-lg">
            Ready When <span className="gold-word">You Are</span>
          </h2>
          <p className="reveal mx-auto mt-5 max-w-xl text-body-lg text-chalk-dim">
            Tell us what your vehicle is doing and we&rsquo;ll get you a straight, fair estimate.
          </p>
          <div className="reveal mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Button href={company.phoneHref} variant="crimson" className="px-12 py-6" skew>
              <Phone size={18} /> {company.phone}
            </Button>
            <Button href="/contact" variant="outline" className="px-10 py-6">
              Request Service Online
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
