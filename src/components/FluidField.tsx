import type { ChangeEvent } from 'react'

// Shared "fluid" form controls for R/T Automotive, tuned for the charcoal
// machine-shop surface: floating-label fields (crimson center-out underline +
// focus glow) and the drawn thank-you checkmark. Used by the service form.

interface FloatFieldProps {
  name: string
  label: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  type?: string
  required?: boolean
  textarea?: boolean
  rows?: number
  autoComplete?: string
  placeholderHint?: string
  idPrefix?: string
}

export function FloatField({
  name,
  label,
  value,
  onChange,
  type = 'text',
  required,
  textarea,
  rows = 4,
  autoComplete,
  placeholderHint,
  idPrefix = 'f',
}: FloatFieldProps) {
  const id = `${idPrefix}-${name}`
  const input =
    'peer w-full bg-transparent px-4 pt-6 pb-2 font-body text-body-md text-chalk placeholder-transparent outline-none'
  const labelCls =
    'pointer-events-none absolute left-4 top-4 origin-left font-cond text-[14px] text-chalk-faint transition-all duration-200 ' +
    'peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-[0.18em] peer-focus:text-crimson-light ' +
    'peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.18em] peer-[:not(:placeholder-shown)]:text-chalk-dim'
  return (
    <div className="group relative rounded-sm border border-line bg-pitch transition-all duration-300 focus-within:border-crimson focus-within:bg-pitch-2 focus-within:shadow-[0_10px_30px_-14px_rgba(227,6,19,0.55)]">
      {textarea ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          required={required}
          placeholder={placeholderHint ?? ' '}
          value={value}
          onChange={onChange}
          className={`${input} resize-y`}
        />
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholderHint ?? ' '}
          value={value}
          onChange={onChange}
          className={input}
        />
      )}
      <label htmlFor={id} className={labelCls}>
        {label}
        {required && <span className="ml-1 text-crimson">*</span>}
      </label>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-0.5 w-[calc(100%-2rem)] -translate-x-1/2 scale-x-0 bg-crimson transition-transform duration-300 peer-focus:scale-x-100"
      />
    </div>
  )
}

// Drawn checkmark for the personalized thank-you state.
export function SuccessCheck() {
  return (
    <svg viewBox="0 0 52 52" className="mx-auto h-16 w-16" aria-hidden="true">
      <circle
        cx="26"
        cy="26"
        r="24"
        fill="none"
        stroke="#e30613"
        strokeWidth="3"
        strokeDasharray="151"
        strokeDashoffset="151"
        style={{ animation: 'draw-check 0.6s ease forwards' }}
      />
      <path
        d="M15 27 l7 7 l15 -16"
        fill="none"
        stroke="#e30613"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="40"
        strokeDashoffset="40"
        style={{ animation: 'draw-check 0.4s 0.5s ease forwards' }}
      />
    </svg>
  )
}
