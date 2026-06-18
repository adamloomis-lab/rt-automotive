import { Link } from 'wouter'
import { Phone, MapPin, Facebook, Clock } from 'lucide-react'
import Logo from './Logo'
import { company, hoursCompact } from '../data/site'

const explore = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact & Directions', href: '/contact' },
]

const policies = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Accessibility', href: '/accessibility' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t-2 border-crimson bg-pitch-deep text-chalk-dim">
      <div className="container-x grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo className="h-14" />
          <p className="mt-5 max-w-xs text-body-md">
            {company.tagline} Wadsworth&rsquo;s family-run transmission and auto repair shop, doing
            honest work on all makes and models.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={company.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded border border-line text-chalk transition-colors hover:border-crimson hover:text-crimson-light"
              aria-label="R/T Automotive & Transmission on Facebook"
            >
              <Facebook size={18} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-cond text-headline-sm font-bold uppercase text-gold">Visit</h3>
          <ul className="mt-5 space-y-4 text-body-md">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-crimson" />
              <a href={company.mapsDir} target="_blank" rel="noopener noreferrer" className="hover:text-chalk">
                {company.address.street}
                <br />
                {company.address.city}, {company.address.state} {company.address.zip}
              </a>
            </li>
            <li>
              <a href={company.phoneHref} className="flex items-start gap-3 hover:text-chalk">
                <Phone size={18} className="mt-0.5 shrink-0 text-crimson" />
                <span>{company.phone}</span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-cond text-headline-sm font-bold uppercase text-gold">Hours</h3>
          <ul className="mt-5 space-y-2.5 text-body-md">
            {hoursCompact.map((h) => (
              <li key={h.day} className="flex items-baseline justify-between gap-3">
                <span className="text-chalk-dim">{h.day}</span>
                <span className="whitespace-nowrap text-chalk">{h.time}</span>
              </li>
            ))}
            <li className="flex items-center gap-2 pt-1 text-[12px] uppercase tracking-[0.14em] text-chalk-faint">
              <Clock size={13} className="text-crimson" /> By appointment recommended
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-cond text-headline-sm font-bold uppercase text-gold">Explore</h3>
          <ul className="mt-5 space-y-3 text-body-md">
            {explore.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-chalk">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line-soft">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-label-sm uppercase tracking-[0.16em] text-chalk-faint sm:flex-row">
          <span className="order-2 sm:order-1">
            © {year} {company.legalName}. All rights reserved.
          </span>
          <div className="order-1 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:order-2">
            {policies.map((p) => (
              <Link key={p.href} href={p.href} className="transition-colors hover:text-chalk">
                {p.label}
              </Link>
            ))}
          </div>
          <span className="order-3">
            Website by{' '}
            <a
              href="https://adamloomismarketing.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-chalk-dim transition-colors hover:text-crimson-light"
            >
              Adam Loomis Marketing
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
