import type { ReactNode } from 'react'
import { company } from '../data/site'

// Shared shell for the Privacy / Terms / Accessibility pages: dark header +
// prose column with consistent typography.
export default function LegalLayout({
  title,
  updated,
  children,
}: {
  readonly title: string
  readonly updated: string
  readonly children: ReactNode
}) {
  return (
    <>
      <section className="relative overflow-hidden border-b-2 border-line-soft bg-pitch-deep">
        <div className="container-x relative z-10 pt-36 pb-14 text-center">
          <p className="kicker">{company.name}</p>
          <h1 className="mt-3 font-display text-display-lg-mobile text-chalk md:text-[56px]">
            {title}
          </h1>
          <p className="mt-4 text-label-lg uppercase tracking-[0.18em] text-chalk-faint">
            Last updated {updated}
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container-x max-w-3xl">
          <div className="legal-prose space-y-6 text-body-md text-chalk-dim">{children}</div>
        </div>
      </section>
    </>
  )
}
