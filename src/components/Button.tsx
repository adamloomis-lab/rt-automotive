import { Link } from 'wouter'
import type { ReactNode } from 'react'

type Variant = 'crimson' | 'steel' | 'outline' | 'ghost'

const base =
  'inline-flex items-center justify-center gap-2 font-cond font-bold uppercase tracking-[0.14em] text-[13px] px-8 py-4 transition-all'

const variants: Record<Variant, string> = {
  // Primary CTA, R/T red with a red glow on hover
  crimson: 'bg-crimson text-on-crimson varsity-cta hover:bg-crimson-dark',
  // Brushed-steel solid
  steel: 'bg-gold text-on-gold hover:bg-gold-dark',
  // Steel outline that fills on hover
  outline: 'border border-gold/60 text-chalk hover:border-crimson hover:text-crimson-light',
  // Subtle light outline
  ghost: 'border border-chalk/30 text-chalk hover:border-chalk/70 hover:bg-chalk/8',
}

interface Props {
  readonly href: string
  readonly variant?: Variant
  readonly children: ReactNode
  readonly className?: string
  readonly external?: boolean
  readonly skew?: boolean
}

export default function Button({
  href,
  variant = 'crimson',
  children,
  className = '',
  external,
  skew,
}: Props) {
  const cls = `${base} ${variants[variant]} ${skew ? 'skew-cta' : ''} ${className}`
  const inner = skew ? <span>{children}</span> : children
  if (href.startsWith('/') && !external) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    )
  }
  return (
    <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {inner}
    </a>
  )
}
