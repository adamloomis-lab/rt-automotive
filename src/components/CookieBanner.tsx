import { useEffect, useState } from 'react'
import { Link } from 'wouter'

// Dismissible cookie-consent notice. Remembers dismissal in localStorage so it
// shows once. Sits above the mobile call bar.
const KEY = 'rt-cookie-ok'

export default function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true)
    } catch {
      /* private mode, just don't show */
    }
  }, [])

  if (!show) return null

  const dismiss = () => {
    try {
      localStorage.setItem(KEY, '1')
    } catch {
      /* ignore */
    }
    setShow(false)
  }

  return (
    <div className="fixed inset-x-0 bottom-14 z-50 lg:bottom-0">
      <div className="container-x py-3">
        <div className="panel flex flex-col items-center gap-3 rounded-lg p-4 sm:flex-row sm:gap-4">
          <p className="text-center text-sm text-chalk-dim sm:text-left">
            We use cookies to improve your experience on our site. By using this website you accept
            our{' '}
            <Link href="/privacy" className="text-gold underline underline-offset-2 hover:text-gold-dark">
              Privacy Policy
            </Link>
            .
          </p>
          <button
            type="button"
            onClick={dismiss}
            className="shrink-0 rounded bg-crimson px-5 py-2.5 font-cond text-[12px] font-bold uppercase tracking-[0.16em] text-on-crimson transition-colors hover:bg-crimson-dark"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  )
}
