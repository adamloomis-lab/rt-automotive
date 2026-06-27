import { useEffect, useState } from 'react'
import { Link } from 'wouter'
import { X, Phone, MapPin, Clock, ArrowRight, Facebook } from 'lucide-react'
import Logo from './Logo'
import { company } from '../data/site'

export interface MobileMenuProps {
  readonly open: boolean
  readonly onClose: () => void
}

const links = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

// Full-screen, high-trust mobile navigation. Backdrop-blurred charcoal panel
// that slides in from the right, with a crimson glow, staggered link entrance,
// and prominent contact CTAs. Scroll-locked, aria-modal, Esc to close.
export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
      }
      window.addEventListener('keydown', onKey)
      const id = requestAnimationFrame(() => setShown(true))
      return () => {
        cancelAnimationFrame(id)
        window.removeEventListener('keydown', onKey)
        document.body.style.overflow = ''
      }
    }
    setShown(false)
    document.body.style.overflow = ''
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className={`absolute inset-0 bg-black/55 backdrop-blur-sm transition-opacity duration-300 ${
          shown ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Panel */}
      <div
        className={`relative ml-auto flex h-full w-full max-w-sm flex-col overflow-y-auto border-l border-line bg-pitch-deep text-chalk shadow-[0_0_60px_rgba(227,6,19,0.18)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          shown ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="tech-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="relative flex min-h-full flex-col px-7 pt-6 pb-10">
          <div className="flex items-center justify-between">
            <Logo className="h-11" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-chalk transition-colors hover:bg-pitch-3"
            >
              <X size={24} />
            </button>
          </div>

          <span className="mt-7 inline-flex w-fit items-center gap-2 bg-crimson px-3 py-1.5 font-cond text-[11px] font-bold uppercase tracking-[0.14em] text-on-crimson">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse-soft" /> All Makes &amp; Models · Honest Estimates
          </span>

          <nav className="mt-6 flex flex-col">
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={onClose}
                className={`group flex items-center justify-between border-b border-line-soft py-4 font-display text-headline-md uppercase text-chalk transition-all duration-500 hover:text-crimson-light ${
                  shown ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
                }`}
                style={{ transitionDelay: `${120 + i * 70}ms` }}
              >
                {l.label}
                <ArrowRight
                  size={20}
                  className="text-chalk-faint transition-all group-hover:translate-x-1 group-hover:text-crimson-light"
                />
              </Link>
            ))}
          </nav>

          <div
            className={`mt-8 flex flex-col gap-3 transition-all duration-500 ${
              shown ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: `${120 + links.length * 70 + 60}ms` }}
          >
            <a
              href={company.phoneHref}
              className="flex items-center justify-center gap-2 bg-crimson px-6 py-4 font-cond text-[13px] font-bold uppercase tracking-[0.14em] text-on-crimson shadow-[0_10px_30px_-10px_rgba(227,6,19,0.6)]"
            >
              <Phone size={18} /> Call {company.phone}
            </a>
            <Link
              href="/contact"
              onClick={onClose}
              className="flex items-center justify-center gap-2 border border-chalk/70 px-6 py-4 font-cond text-[13px] font-bold uppercase tracking-[0.14em] text-chalk transition-colors hover:bg-chalk hover:text-ink"
            >
              Book Service
            </Link>
          </div>

          <div className="mt-auto space-y-3 pt-10 font-body text-body-md text-chalk-dim">
            <a
              href={company.mapsDir}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-chalk"
            >
              <MapPin size={18} className="shrink-0 text-crimson" /> {company.addressOneLine}
            </a>
            <p className="flex items-center gap-3">
              <Clock size={18} className="shrink-0 text-crimson" /> Mon to Fri, 9 am to 5 pm
            </p>
            <a
              href={company.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-chalk"
            >
              <Facebook size={18} className="shrink-0 text-crimson" /> R/T Automotive on Facebook
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
