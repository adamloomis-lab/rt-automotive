import { useState, type ChangeEvent, type FormEvent } from 'react'
import {
  MapPin,
  Phone,
  Facebook,
  Plus,
  Clock,
  Cog,
  Droplets,
  Gauge,
  Disc3,
  Settings2,
  Wrench,
  MoreHorizontal,
} from 'lucide-react'
import { company } from '../data/site'
import { faqs } from '../lib/seo'
import HoursList from '../components/HoursList'
import { FloatField, SuccessCheck } from '../components/FluidField'
import { AnimatedLayerButton } from '../components/ui/button'

// Single-select icon cards. `value` is identical to the prior <select> options
// so the Netlify "service" field payload is unchanged. Icons are literal.
const serviceCards = [
  { value: 'Transmission Repair / Rebuild', label: 'Transmission Repair', Icon: Cog },
  { value: 'Transmission Service / Fluid', label: 'Service & Fluid', Icon: Droplets },
  { value: 'Engine Diagnostics / Check Engine Light', label: 'Engine Diagnostics', Icon: Gauge },
  { value: 'Brakes & Suspension', label: 'Brakes & Suspension', Icon: Disc3 },
  { value: 'Clutch Repair', label: 'Clutch Repair', Icon: Settings2 },
  { value: 'General Repair / Maintenance', label: 'General Repair', Icon: Wrench },
  { value: 'Other / Not Sure', label: 'Other / Not Sure', Icon: MoreHorizontal },
]

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join('&')

function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="space-y-4">
      {faqs.map((f, i) => {
        const isOpen = open === i
        return (
          <div key={f.q} className="panel overflow-hidden">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-pitch-4 sm:p-6"
            >
              <span className="font-display text-headline-sm uppercase text-chalk">{f.q}</span>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-crimson text-on-crimson transition-transform duration-300 ${
                  isOpen ? 'rotate-45' : ''
                }`}
                aria-hidden="true"
              >
                <Plus size={20} />
              </span>
            </button>
            <div className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">
                <p className="border-t border-line-soft px-5 py-5 text-body-md text-chalk-dim sm:px-6">
                  {f.a}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const initialValues = {
  name: '',
  phone: '',
  email: '',
  vehicle: '',
  message: '',
}

function ServiceForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'ok' | 'error'>('idle')
  const [values, setValues] = useState(initialValues)
  const [service, setService] = useState('')
  const [firstName, setFirstName] = useState('')

  const onField = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }))

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form) as unknown as Iterable<[string, string]>)
    // Capture the submitter's first name before any reset, for the thank-you.
    setFirstName((values.name.trim().split(/\s+/)[0] || '').slice(0, 24))
    setStatus('submitting')
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'service-request', ...data }),
      })
      setStatus(res.ok ? 'ok' : 'error')
      if (res.ok) {
        form.reset()
        setValues(initialValues)
        setService('')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'ok') {
    return (
      <div className="machined p-10 text-center">
        <SuccessCheck />
        <h3 className="mt-5 font-display text-headline-md text-chalk">
          Thank You{firstName ? `, ${firstName}` : ''}!
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-body-md text-chalk-dim">
          Your request is in. We&rsquo;ll get back to you shortly with a straight, fair estimate.
          Need a faster answer?
        </p>
        <a
          href={company.phoneHref}
          className="mt-6 inline-flex items-center gap-2 bg-crimson px-6 py-3 font-cond text-[13px] font-bold uppercase tracking-[0.14em] text-on-crimson transition-colors hover:bg-crimson-dark"
        >
          <Phone size={17} /> Call {company.phone}
        </a>
      </div>
    )
  }

  return (
    <form
      name="service-request"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* Netlify form plumbing */}
      <input type="hidden" name="form-name" value="service-request" />
      <p className="hidden">
        <label>
          Don&rsquo;t fill this out if you&rsquo;re human: <input name="bot-field" />
        </label>
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <FloatField name="name" label="Name" value={values.name} onChange={onField} required autoComplete="name" />
        <FloatField name="phone" label="Phone" type="tel" value={values.phone} onChange={onField} required autoComplete="tel" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FloatField name="email" label="Email" type="email" value={values.email} onChange={onField} autoComplete="email" />
        <FloatField name="vehicle" label="Vehicle (Year / Make / Model)" value={values.vehicle} onChange={onField} />
      </div>

      {/* Single-select service icon cards. Hidden input carries the value. */}
      <fieldset>
        <legend className="mb-3 block font-cond text-[12px] font-bold uppercase tracking-[0.14em] text-chalk-dim">
          What do you need? <span className="text-crimson">*</span>
        </legend>
        <input type="hidden" name="service" value={service} required />
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {serviceCards.map(({ value, label, Icon }) => {
            const active = service === value
            return (
              <button
                key={value}
                type="button"
                onClick={() => setService(value)}
                aria-pressed={active}
                className={`group flex flex-col items-center gap-2 rounded-sm border p-3 text-center transition-all duration-200 ${
                  active
                    ? 'border-crimson bg-crimson text-on-crimson shadow-[0_8px_22px_-10px_rgba(227,6,19,0.7)]'
                    : 'border-line bg-pitch text-chalk-dim hover:border-crimson hover:text-chalk'
                }`}
              >
                <Icon
                  size={24}
                  className={active ? 'text-on-crimson' : 'text-crimson'}
                  aria-hidden="true"
                />
                <span className="font-cond text-[11px] font-bold uppercase leading-tight tracking-[0.08em]">
                  {label}
                </span>
              </button>
            )
          })}
        </div>
      </fieldset>

      <FloatField
        name="message"
        label="What's going on? Symptoms, noises, warning lights"
        value={values.message}
        onChange={onField}
        required
        textarea
        rows={4}
      />

      {status === 'error' && (
        <p className="text-sm text-error">
          Something went wrong sending your request. Please call us at {company.phone}.
        </p>
      )}

      <AnimatedLayerButton type="submit" disabled={status === 'submitting'} className="w-full">
        {status === 'submitting' ? 'Sending…' : 'Request Service'}
      </AnimatedLayerButton>
      <p className="text-center text-[12px] text-chalk-faint">
        We&rsquo;ll never share your information. Prefer to talk? Call {company.phone}.
      </p>
    </form>
  )
}

export default function Contact() {
  return (
    <>
      {/* ---------- HEADER ---------- */}
      <section className="relative overflow-hidden border-b border-line-soft bg-pitch-deep">
        <div className="container-x relative z-10 pt-44 pb-16 text-center">
          <p className="kicker">On Main Street, Wadsworth</p>
          <h1 className="mt-3 font-display text-display-lg-mobile text-chalk md:text-[56px]">
            Contact &amp; Service Requests
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-body-lg text-chalk-dim">
            Request service below or give us a call. Tell us what your vehicle is doing and
            we&rsquo;ll get you scheduled with a straight, fair estimate.
          </p>
        </div>
      </section>

      {/* ---------- STOREFRONT PHOTO ---------- */}
      <section className="container-x pt-12 md:pt-16">
        <figure className="reveal mx-auto max-w-4xl overflow-hidden rounded-xl border border-line">
          <img
            src="/images/storefront.jpg"
            alt="R/T Automotive & Transmission storefront on Main Street in Wadsworth, Ohio, Wadsworth's first choice for transmission and automotive repair"
            width={960}
            height={589}
            loading="lazy"
            className="w-full object-cover"
          />
          <figcaption className="border-t border-line bg-pitch-2 px-5 py-3 text-center font-cond text-[12px] font-bold uppercase tracking-[0.16em] text-chalk-faint">
            Wadsworth&rsquo;s First Choice for Transmission &amp; Automotive Repair · 349 Main St
          </figcaption>
        </figure>
      </section>

      {/* ---------- FORM + DETAILS ---------- */}
      <section className="py-16 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-5">
          {/* Form */}
          <div className="reveal lg:col-span-3">
            <p className="kicker">Request Service</p>
            <h2 className="mt-3 font-display text-headline-lg text-chalk">Tell Us What You Need</h2>
            <span className="gold-rule mt-5 mb-8 block" />
            <ServiceForm />
          </div>

          {/* Details + hours */}
          <div className="reveal space-y-8 lg:col-span-2">
            <div>
              <p className="kicker">Our Shop</p>
              <h2 className="mt-3 font-display text-headline-lg text-chalk">{company.address.street}</h2>
              <span className="gold-rule mt-5 block" />
              <ul className="mt-7 space-y-5 text-body-md">
                <li className="flex items-start gap-4">
                  <MapPin size={22} className="mt-0.5 shrink-0 text-crimson" />
                  <a href={company.mapsDir} target="_blank" rel="noopener noreferrer" className="text-chalk-dim hover:text-chalk">
                    {company.addressOneLine}
                  </a>
                </li>
                <li className="flex items-start gap-4">
                  <Phone size={22} className="mt-0.5 shrink-0 text-crimson" />
                  <a href={company.phoneHref} className="text-chalk-dim hover:text-chalk">
                    {company.phone}
                  </a>
                </li>
                <li className="flex items-start gap-4">
                  <Facebook size={22} className="mt-0.5 shrink-0 text-crimson" />
                  <a href={company.social.facebook} target="_blank" rel="noopener noreferrer" className="text-chalk-dim hover:text-chalk">
                    R/T Automotive on Facebook
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div className="mb-3 flex items-center gap-2">
                <Clock size={18} className="text-crimson" />
                <h3 className="font-cond text-headline-sm font-bold uppercase text-gold">Hours</h3>
              </div>
              <div className="panel p-4">
                <HoursList />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- MAP ---------- */}
      <section className="border-y border-line-soft">
        <iframe
          title="Map to R/T Automotive & Transmission, 349 Main St, Wadsworth OH"
          src={company.mapsEmbed}
          className="h-[440px] w-full grayscale-[0.3]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="py-20 md:py-24">
        <div className="container-x max-w-3xl">
          <div className="reveal text-center">
            <p className="kicker">Good to know</p>
            <h2 className="mt-3 font-display text-headline-lg text-chalk md:text-[40px]">
              Questions, Answered
            </h2>
            <span className="gold-rule mx-auto mt-5 block" />
          </div>
          <div className="reveal mt-10">
            <FaqAccordion />
          </div>
        </div>
      </section>
    </>
  )
}
