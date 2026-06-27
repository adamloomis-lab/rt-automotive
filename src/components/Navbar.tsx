import { useState } from 'react'
import { Link, useLocation } from 'wouter'
import { Menu, Phone } from 'lucide-react'
import Logo from './Logo'
import MobileMenu from './MobileMenu'
import { company } from '../data/site'
import { useScrolled } from '../hooks/useScrolled'
import { animatedCtaShell, AnimatedCtaInner } from './ui/button'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [location] = useLocation()
  const scrolled = useScrolled(40)

  const linkBase =
    'font-cond text-[13px] font-bold uppercase tracking-[0.14em] px-1 py-2 transition-colors'

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b border-line-soft backdrop-blur-md transition-colors duration-300 ${
        scrolled || open ? 'bg-pitch/95 shadow-[0_4px_24px_rgba(0,0,0,0.5)]' : 'bg-pitch/70'
      }`}
    >
      <nav className="container-x flex h-20 items-center justify-between lg:h-24">
        <Logo className="h-12 lg:h-14" />

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => {
            const active = l.href === location
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`${linkBase} ${
                  active
                    ? 'border-b-2 border-crimson text-crimson-light'
                    : 'text-chalk-dim hover:text-chalk'
                }`}
              >
                {l.label}
              </Link>
            )
          })}
          <a
            href={company.phoneHref}
            className="ml-1 inline-flex items-center gap-2 font-cond text-[13px] font-bold uppercase tracking-[0.1em] text-chalk transition-colors hover:text-crimson-light"
          >
            <Phone size={16} className="text-crimson" /> {company.phone}
          </a>
          <Link href="/contact" className={`${animatedCtaShell} ml-1`}>
            <AnimatedCtaInner>Book Service</AnimatedCtaInner>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-chalk lg:hidden"
          aria-label="Open menu"
          aria-expanded={open}
        >
          <Menu size={32} />
        </button>
      </nav>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  )
}
