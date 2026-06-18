import { useEffect, useState } from 'react'
import { hours } from '../data/site'

// Hours list that highlights the current day. "Today" is resolved client-side
// after mount, so the prerendered HTML carries no highlight (no hydration
// mismatch) and always reflects the visitor's real day.
export default function HoursList({
  short = false,
  className = '',
}: {
  readonly short?: boolean
  readonly className?: string
}) {
  const [todayDow, setTodayDow] = useState<number | null>(null)

  useEffect(() => {
    setTodayDow(new Date().getDay())
  }, [])

  return (
    <ul className={`text-sm ${className}`}>
      {hours.map((h) => {
        const isToday = h.dow === todayDow
        return (
          <li
            key={h.day}
            aria-current={isToday ? 'date' : undefined}
            className={`flex items-center justify-between gap-3 rounded px-3 py-2 transition-colors ${
              isToday ? 'bg-gold/12 ring-1 ring-inset ring-gold/40' : ''
            }`}
          >
            <span
              className={`flex min-w-0 items-center gap-2 ${
                isToday ? 'font-semibold text-gold' : 'text-chalk-dim'
              }`}
            >
              {isToday && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />}
              {short ? h.short : h.day}
              {isToday && !short && (
                <span className="rounded-full bg-gold/18 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-gold">
                  Today
                </span>
              )}
            </span>
            <span className={`shrink-0 whitespace-nowrap tabular-nums ${isToday ? 'text-chalk' : 'text-chalk-dim'}`}>
              {h.time}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
