import { Link } from 'wouter'
import type { ReactNode } from 'react'
import { animatedCtaShell, AnimatedCtaInner } from './ui/button'

type Variant = 'crimson' | 'steel' | 'outline' | 'ghost'

const base =
  'inline-flex items-center justify-center gap-2 font-cond font-bold uppercase tracking-[0.14em] text-[13px] px-8 py-4 transition-all'

const variants: Record<Exclude<Variant, 'crimson'>, string> = {
  // Brushed-steel solid
  steel: 'bg-gold text-on-gold hover:bg-gold-dark rounded',
  // Steel outline that fills on hover
  outline: 'border border-gold/60 text-chalk hover:border-crimson hover:text-crimson-light rounded',
  // Subtle light outline
  ghost: 'border border-chalk/30 text-chalk hover:border-chalk/70 hover:bg-chalk/8 rounded',
}

interface Props {
  readonly href: string
  readonly variant?: Variant
  readonly children: ReactNode
  readonly className?: string
  readonly external?: boolean
  /** kept for call-site compatibility; the primary CTA has its own treatment */
  readonly skew?: boolean
}

// Primary (crimson) CTAs render the animated layered button; secondary variants
// stay flat so the primary still pops.
export default function Button({ href, variant = 'crimson', children, className = '', external }: Props) {
  const isPrimary = variant === 'crimson'
  const cls = isPrimary
    ? `${animatedCtaShell} ${className}`
    : `${base} ${variants[variant]} ${className}`
  const inner = isPrimary ? <AnimatedCtaInner>{children}</AnimatedCtaInner> : children

  if (href.startsWith('/') && !external) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    )
  }
  return (
    <a className={cls} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {inner}
    </a>
  )
}
