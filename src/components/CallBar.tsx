import { Phone, MapPin, CalendarCheck } from 'lucide-react'
import { Link } from 'wouter'
import { company } from '../data/site'

// Elevated floating action bar on mobile: a blurred charcoal capsule that
// stands off the edge with a big shadow. Glassy Call + Directions, plus a
// glowing crimson primary (Book Service) with a sheen sweep and active press.
// Hidden on lg+ where the navbar already carries the phone number + CTA.
export default function CallBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 px-3 lg:hidden"
      style={{ paddingBottom: 'calc(0.6rem + env(safe-area-inset-bottom))' }}
    >
      <div className="flex gap-2 rounded-xl border border-white/10 bg-pitch/85 p-2 shadow-[0_14px_40px_rgba(0,0,0,0.55)] backdrop-blur-xl">
        <a
          href={company.phoneHref}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white/10 py-3 font-cond text-[12px] font-bold uppercase tracking-[0.12em] text-chalk transition-all active:scale-95"
        >
          <Phone size={17} className="text-crimson-light" /> Call
        </a>
        <a
          href={company.mapsDir}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white/10 py-3 font-cond text-[12px] font-bold uppercase tracking-[0.12em] text-chalk transition-all active:scale-95"
        >
          <MapPin size={17} className="text-crimson-light" /> Directions
        </a>
        <Link
          href="/contact"
          className="group relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-lg bg-crimson py-3 font-cond text-[12px] font-bold uppercase tracking-[0.12em] text-on-crimson animate-glow-pulse transition-all active:scale-95"
        >
          <span
            className="rt-sheen pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/30 blur-md"
            aria-hidden="true"
          />
          <CalendarCheck size={17} /> Book
        </Link>
      </div>
    </nav>
  )
}
