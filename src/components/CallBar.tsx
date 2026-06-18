import { Phone, MapPin } from 'lucide-react'
import { company } from '../data/site'

// Sticky bottom action bar on mobile: one tap to call, one tap for directions.
// Hidden on lg+ where the navbar already carries the phone number.
export default function CallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
      <div className="flex border-t-2 border-gold bg-pitch/97 backdrop-blur-md">
        <a
          href={company.phoneHref}
          className="flex flex-1 items-center justify-center gap-2 bg-crimson py-3.5 font-cond text-[13px] font-bold uppercase tracking-[0.14em] text-on-crimson"
        >
          <Phone size={17} /> Call Now
        </a>
        <a
          href={company.mapsDir}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 py-3.5 font-cond text-[13px] font-bold uppercase tracking-[0.14em] text-chalk"
        >
          <MapPin size={17} className="text-gold" /> Directions
        </a>
      </div>
    </div>
  )
}
