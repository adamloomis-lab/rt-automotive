import { Link } from 'wouter'
import { Phone, MapPin, Clock, Facebook, Star } from 'lucide-react'
import Logo from './Logo'
import { company } from '../data/site'

// 4-column footer (adapted from the mvpblocks Footer4Col): next/link -> wouter,
// shadcn tokens -> the R/T dark/red theme, real R/T links + NAP, no email.

const exploreLinks = [
  { text: 'Home', href: '/' },
  { text: 'Services', href: '/services' },
  { text: 'About Us', href: '/about' },
  { text: 'Contact', href: '/contact' },
]

const serviceLinks = [
  { text: 'Transmission Repair', href: '/services' },
  { text: 'Transmission Service', href: '/services' },
  { text: 'Engine Diagnostics', href: '/services' },
  { text: 'Brakes & Suspension', href: '/services' },
]

const helpfulLinks = [
  { text: 'Book Service', href: '/contact', hasIndicator: true },
  { text: 'Read Our Reviews', href: '/#reviews' },
  { text: 'Privacy Policy', href: '/privacy' },
  { text: 'Terms of Service', href: '/terms' },
  { text: 'Accessibility', href: '/accessibility' },
]

const linkCls = 'text-chalk-dim transition-colors hover:text-chalk'
const headingCls = 'font-cond text-headline-sm font-bold uppercase text-gold'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="w-full border-t-2 border-crimson bg-pitch-deep text-chalk-dim">
      <div className="container-x pt-16 pb-6 lg:pt-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <Logo className="h-12" />
            <p className="mt-6 max-w-md text-body-md leading-relaxed">
              {company.tagline} Wadsworth&rsquo;s family-run transmission and auto repair shop, doing
              honest work on all makes and models.
            </p>
            <ul className="mt-7 flex gap-3">
              <li>
                <a
                  href={company.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded border border-line text-chalk transition-colors hover:border-crimson hover:text-crimson-light"
                >
                  <span className="sr-only">R/T Automotive on Facebook</span>
                  <Facebook className="size-5" />
                </a>
              </li>
              <li>
                <a
                  href={company.mapsReviews}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded border border-line text-chalk transition-colors hover:border-crimson hover:text-crimson-light"
                >
                  <span className="sr-only">R/T Automotive reviews on Google</span>
                  <Star className="size-5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-2">
            <div>
              <p className={headingCls}>Explore</p>
              <ul className="mt-6 space-y-3 text-sm">
                {exploreLinks.map(({ text, href }) => (
                  <li key={text}>
                    <Link href={href} className={linkCls}>
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className={headingCls}>Services</p>
              <ul className="mt-6 space-y-3 text-sm">
                {serviceLinks.map(({ text, href }) => (
                  <li key={text}>
                    <Link href={href} className={linkCls}>
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className={headingCls}>Helpful</p>
              <ul className="mt-6 space-y-3 text-sm">
                {helpfulLinks.map(({ text, href, hasIndicator }) => (
                  <li key={text}>
                    <Link href={href} className={`flex items-center gap-1.5 ${linkCls}`}>
                      <span>{text}</span>
                      {hasIndicator && (
                        <span className="relative flex size-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson opacity-75" />
                          <span className="relative inline-flex size-2 rounded-full bg-crimson" />
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className={headingCls}>Contact</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a href={company.phoneHref} className="flex items-start gap-2.5 hover:text-chalk">
                    <Phone className="size-5 shrink-0 text-crimson" />
                    <span className="flex-1">{company.phone}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={company.mapsDir}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2.5 hover:text-chalk"
                  >
                    <MapPin className="size-5 shrink-0 text-crimson" />
                    <address className="flex-1 not-italic">
                      {company.address.street}
                      <br />
                      {company.address.city}, {company.address.state} {company.address.zip}
                    </address>
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock className="size-5 shrink-0 text-crimson" />
                  <span className="flex-1">
                    Mon&ndash;Fri: 9am&ndash;5pm
                    <br />
                    Sat &amp; Sun: Closed
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-line-soft pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-label-sm uppercase tracking-[0.16em] text-chalk-faint sm:flex-row">
            <span className="order-2 sm:order-1">
              © {year} {company.legalName}. All rights reserved.
            </span>
            <span className="order-1 sm:order-2">
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
      </div>
    </footer>
  )
}
