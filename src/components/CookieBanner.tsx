import { useEffect, useState } from 'react'
import { Link } from 'wouter'

// Dismissible cookie-consent notice. Remembers choice in localStorage so it
// shows once. Sits above the mobile call bar.
const KEY = 'cookie-consent'

export default function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) {
        const timer = setTimeout(() => setShow(true), 700)
        return () => clearTimeout(timer)
      }
    } catch {
      /* private mode, just don't show */
    }
  }, [])

  if (!show) return null

  const respond = (value: 'accepted' | 'declined') => {
    try {
      localStorage.setItem(KEY, value)
    } catch {
      /* ignore */
    }
    setShow(false)
  }

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-14 z-50 lg:bottom-0"
    >
      <div className="container-x py-3">
        <div className="panel flex flex-col items-center gap-3 rounded-lg p-4 sm:flex-row sm:gap-4">
          <p className="text-center text-sm text-chalk-dim sm:text-left">
            This site uses cookies to keep things running smoothly. We never sell your data.{' '}
            <Link href="/privacy" className="text-gold underline underline-offset-2 hover:text-gold-dark">
              Privacy Policy
            </Link>
          </p>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => respond('accepted')}
              className="rounded bg-crimson px-5 py-2.5 font-cond text-[12px] font-bold uppercase tracking-[0.16em] text-on-crimson transition-colors hover:bg-crimson-dark"
            >
              Got It
            </button>
            <button
              type="button"
              onClick={() => respond('declined')}
              className="rounded border border-chalk-dim px-5 py-2.5 font-cond text-[12px] font-bold uppercase tracking-[0.16em] text-chalk-dim transition-colors hover:border-chalk hover:text-chalk"
            >
              No Thanks
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
