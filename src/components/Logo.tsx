import { Link } from 'wouter'

// The R/T artwork sits on a clean white badge plate so the red/black/silver
// lettering reads at full fidelity against the dark site chrome.
export default function Logo({
  className = 'h-12',
}: {
  readonly className?: string
}) {
  return (
    <Link href="/" aria-label="R/T Automotive & Transmission, home" className={`inline-flex ${className}`}>
      <span className="inline-flex h-full items-center rounded-sm bg-paper px-3 py-2 shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
        <img
          src="/images/logo-full.png"
          alt="R/T Automotive & Transmission"
          width={1334}
          height={523}
          className="h-full w-auto"
        />
      </span>
    </Link>
  )
}
