import Button from '../components/Button'

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-5 pt-20 text-center">
      <div className="relative z-10">
        <p className="kicker">404</p>
        <h1 className="mt-3 font-display text-display-lg-mobile text-chalk md:text-display-lg">
          Off The <span className="text-stroke-gold">Map</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-body-lg text-chalk-dim">
          We couldn&rsquo;t find the page you were looking for. Let&rsquo;s get you back on the road.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/">Back Home</Button>
          <Button href="/services" variant="ghost">
            Our Services
          </Button>
        </div>
      </div>
    </section>
  )
}
