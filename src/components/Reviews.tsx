import { useEffect, useState } from 'react'
import { Star, ExternalLink } from 'lucide-react'
import { reviews as staticReviews, ratingSummary, company } from '../data/site'
import { useReducedMotion } from '../hooks/useReducedMotion'
import {
  CardTransformed,
  CardsContainer,
  ContainerScroll,
  ReviewStars,
} from './ui/animated-cards-stack'

// "What Wadsworth drivers say" — real Google reviews.
//
// The static reviews from site.ts are server-rendered into the HTML (good for
// SEO and a guaranteed render), then on mount we hit /api/reviews (Places API)
// and swap in the freshest live reviews when available. The cards animate as a
// scroll-driven stack; visitors who prefer reduced motion get a plain grid.
interface LiveReview {
  author: string
  photo: string
  profileUrl: string
  rating: number | null
  text: string
  when: string
}
interface ReviewsResponse {
  configured?: boolean
  found?: boolean
  rating?: number | null
  total?: number | null
  mapsUri?: string
  reviews?: LiveReview[]
}

type Card = { author: string; rating: number | null; text: string; when?: string }

const initialCards: Card[] = staticReviews.map((r) => ({
  author: r.name,
  rating: r.rating,
  text: r.quote,
}))

function initials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function HeaderStars({ n, size = 18 }: { n: number; size?: number }) {
  return (
    <span className="inline-flex" aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= Math.round(n) ? 'fill-crimson text-crimson' : 'text-line'}
          aria-hidden="true"
        />
      ))}
    </span>
  )
}

function Avatar({ name }: { name: string }) {
  return (
    <span className="grid size-12 shrink-0 place-items-center rounded-full border border-line bg-crimson/15 font-cond text-sm font-bold uppercase tracking-wide text-crimson-light">
      {initials(name)}
    </span>
  )
}

function ReviewCardBody({ r }: { r: Card }) {
  return (
    <>
      <ReviewStars rating={r.rating ?? 5} className="text-crimson" />
      <blockquote className="line-clamp-[7] max-w-md text-center text-body-md leading-relaxed text-chalk">
        “{r.text}”
      </blockquote>
      <div className="flex items-center gap-4">
        <Avatar name={r.author} />
        <div className="text-left">
          <span className="block font-cond text-base font-bold uppercase tracking-[0.06em] text-chalk">
            {r.author}
          </span>
          <span className="block text-sm text-chalk-faint">
            Google review{r.when ? ` · ${r.when}` : ''}
          </span>
        </div>
      </div>
    </>
  )
}

export default function Reviews() {
  const reduced = useReducedMotion()
  const [cards, setCards] = useState<Card[]>(initialCards)
  const [rating, setRating] = useState<number>(Number(ratingSummary.value))
  const [total, setTotal] = useState<number>(ratingSummary.count)
  const [mapsUri, setMapsUri] = useState<string>(company.mapsReviews)

  useEffect(() => {
    let cancelled = false
    fetch(`/api/reviews?id=${encodeURIComponent(company.placeId)}`)
      .then((r) => r.json())
      .then((d: ReviewsResponse) => {
        if (cancelled || !d || d.configured === false || !d.found) return
        if (d.reviews && d.reviews.length) {
          const live: Card[] = d.reviews
            .filter((r) => (r.rating ?? 0) >= 4 && r.text)
            .map((r) => ({
              author: r.author,
              rating: r.rating,
              text: r.text.length > 300 ? `${r.text.slice(0, 297).trimEnd()}…` : r.text,
              when: r.when,
            }))
          const seen = new Set(live.map((c) => c.author.toLowerCase()))
          const merged = [...live]
          for (const c of initialCards) {
            if (merged.length >= 5) break
            if (!seen.has(c.author.toLowerCase())) merged.push(c)
          }
          if (merged.length) setCards(merged.slice(0, 5))
        }
        if (typeof d.rating === 'number') setRating(d.rating)
        if (typeof d.total === 'number') setTotal(d.total)
        if (d.mapsUri) setMapsUri(d.mapsUri)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  const header = (
    <div className="reveal mx-auto max-w-2xl text-center">
      <p className="kicker">Don&rsquo;t take our word for it</p>
      <h2 className="mt-3 font-display text-headline-lg text-chalk md:text-[44px]">
        What Wadsworth Drivers Say
      </h2>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <span className="font-display text-3xl text-chalk">{rating.toFixed(1)}</span>
        <HeaderStars n={rating} />
        <span className="text-chalk-dim">{total.toLocaleString()} Google reviews</span>
      </div>
    </div>
  )

  const googleLink = (
    <div className="mt-10 text-center">
      <a
        href={mapsUri}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 font-cond text-sm font-bold uppercase tracking-[0.14em] text-gold hover:text-gold-dark"
      >
        Read all reviews on Google <ExternalLink size={14} aria-hidden="true" />
      </a>
    </div>
  )

  // Reduced-motion / fallback: a simple readable grid.
  if (reduced) {
    return (
      <section id="reviews" className="border-y border-line-soft bg-pitch-deep py-20 md:py-28">
        <div className="container-x">
          {header}
          <div className="reveal-group mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cards.slice(0, 6).map((r, i) => (
              <figure key={i} className="machined flex flex-col p-7">
                <ReviewStars rating={r.rating ?? 5} className="mb-4 text-crimson" />
                <blockquote className="flex-1 text-body-md leading-relaxed text-chalk-dim">
                  “{r.text}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <Avatar name={r.author} />
                  <span className="font-cond text-sm font-bold uppercase tracking-[0.08em] text-chalk">
                    {r.author}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
          {googleLink}
        </div>
      </section>
    )
  }

  return (
    <section id="reviews" className="border-y border-line-soft bg-pitch-deep">
      <div className="container-x pt-20 md:pt-28">{header}</div>
      <ContainerScroll className="h-[280vh]">
        <div className="sticky top-0 flex h-svh w-full flex-col items-center justify-center">
          <CardsContainer className="mx-auto h-[460px] w-[min(360px,86vw)]">
            {cards.map((r, index) => (
              <CardTransformed
                key={`${r.author}-${index}`}
                arrayLength={cards.length}
                index={index + 2}
                variant="dark"
                role="article"
              >
                <ReviewCardBody r={r} />
              </CardTransformed>
            ))}
          </CardsContainer>
        </div>
      </ContainerScroll>
      <div className="container-x pb-20 md:pb-24">{googleLink}</div>
    </section>
  )
}
