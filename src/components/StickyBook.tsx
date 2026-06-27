import { useEffect, useState } from 'react'
import { Link, useLocation } from 'wouter'
import { ArrowRight, CalendarCheck } from 'lucide-react'

// Desktop-only floating "Book Service" pill, revealed once the visitor scrolls
// past the hero. A glowing, sheened crimson capsule that reads as premium.
export default function StickyBook() {
  const [show, setShow] = useState(false)
  const [location] = useLocation()

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById('hero')
      const threshold =
        hero && hero.offsetHeight > 0
          ? hero.offsetTop + hero.offsetHeight - 80
          : window.innerHeight * 0.6
      setShow(window.scrollY > threshold)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [location])

  // Hide on the contact page (the form is already there).
  if (location === '/contact') return null

  return (
    <Link
      href="/contact"
      className={`group fixed bottom-8 right-8 z-40 hidden items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-br from-crimson to-crimson-dark px-7 py-4 font-cond text-[13px] font-bold uppercase tracking-[0.14em] text-on-crimson shadow-[0_16px_44px_-8px_rgba(227,6,19,0.6)] ring-1 ring-white/15 transition-all duration-300 hover:scale-[1.04] lg:flex ${
        show
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-5 opacity-0'
      }`}
    >
      <span
        className="rt-sheen pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/30 blur-md"
        aria-hidden="true"
      />
      <CalendarCheck size={18} /> Book Service
      <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  )
}
