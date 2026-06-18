import * as React from 'react'
import { Cog } from 'lucide-react'
import { cn } from '../../lib/utils'

// Animated layered CTA button, recolored for the R/T dark performance theme:
// red pill with a tactile "pressed" hard shadow, and on hover a darker-red
// layer fades in with a spinning gear (on-brand for a transmission shop) while
// the label fades out. Pure CSS + a lucide gear, no extra runtime deps.
export const animatedCtaShell = cn(
  'group relative inline-flex h-[52px] min-w-[176px] items-center justify-center overflow-hidden rounded-full',
  'cursor-pointer bg-crimson text-on-crimson px-7 shadow-[0_6px_0_0_#7a0309]',
  'transition-[transform,box-shadow] duration-300 ease-out',
  'hover:translate-y-[4px] hover:shadow-[0_2px_0_0_#7a0309,0_10px_24px_-8px_rgba(227,6,19,0.55)]',
  'active:translate-y-[5px] active:shadow-[0_1px_0_0_#7a0309]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-light focus-visible:ring-offset-2 focus-visible:ring-offset-pitch',
  'disabled:pointer-events-none disabled:opacity-50'
)

// The inner layers (gear fill + label). Shared by the link/button CTAs.
export function AnimatedCtaInner({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-0 grid place-items-center bg-crimson-dark opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
      >
        <Cog className="size-9 animate-spin-slow text-on-crimson" strokeWidth={2.25} aria-hidden="true" />
      </span>
      <span className="relative z-10 inline-flex items-center gap-2 font-cond text-[13px] font-bold uppercase tracking-[0.14em] transition-opacity duration-300 group-hover:opacity-0">
        {children}
      </span>
    </>
  )
}

export interface AnimatedLayerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export const AnimatedLayerButton = React.forwardRef<HTMLButtonElement, AnimatedLayerButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button className={cn(animatedCtaShell, className)} ref={ref} {...props}>
        <AnimatedCtaInner>{children}</AnimatedCtaInner>
      </button>
    )
  }
)
AnimatedLayerButton.displayName = 'AnimatedLayerButton'
