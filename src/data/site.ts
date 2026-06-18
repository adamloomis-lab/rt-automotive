// All site content for R/T Automotive & Transmission. Single source of truth
// consumed by pages, components, and the SEO/JSON-LD layer.

export const company = {
  name: 'R/T Automotive & Transmission',
  shortName: 'R/T Automotive',
  legalName: 'R/T Automotive & Transmission LLC',
  tagline: 'Honest Repairs. Precision Work. Wadsworth Strong.',
  // One-liner used in hero / meta.
  shortBlurb:
    "Wadsworth's trusted transmission and auto repair shop. Family-run, expert work on all makes and models, from transmission rebuilds to brakes, diagnostics and everyday maintenance, done right the first time at a fair, honest price.",
  phone: '(330) 334-4227',
  phoneHref: 'tel:+13303344227',
  address: {
    street: '349 Main St',
    city: 'Wadsworth',
    state: 'OH',
    zip: '44281',
  },
  addressOneLine: '349 Main St, Wadsworth, OH 44281',
  geo: { lat: 41.0184956, lng: -81.7294407 },
  // Google Places id, powers the live reviews function + maps deep links.
  placeId: 'ChIJy3a79wPNMIgR3QNCWqJ3FEQ',
  mapsDir:
    'https://www.google.com/maps/dir/?api=1&destination=R%2FT+Automotive+%26+Transmission+349+Main+St+Wadsworth+OH+44281',
  mapsEmbed:
    'https://www.google.com/maps?q=349+Main+St+Wadsworth+OH+44281&output=embed',
  mapsReviews: 'https://maps.google.com/?cid=4905677433295995869',
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=100057230688756',
  },
} as const

// ---------------------------------------------------------------------------
// Hours. Mon–Fri 9–5, closed weekends (from the live Google listing).
// dow matches Date.getDay() (0 = Sun).
// ---------------------------------------------------------------------------
export const hours = [
  { day: 'Sunday', short: 'Sun', dow: 0, time: 'Closed' },
  { day: 'Monday', short: 'Mon', dow: 1, time: '9:00 am - 5:00 pm' },
  { day: 'Tuesday', short: 'Tue', dow: 2, time: '9:00 am - 5:00 pm' },
  { day: 'Wednesday', short: 'Wed', dow: 3, time: '9:00 am - 5:00 pm' },
  { day: 'Thursday', short: 'Thu', dow: 4, time: '9:00 am - 5:00 pm' },
  { day: 'Friday', short: 'Fri', dow: 5, time: '9:00 am - 5:00 pm' },
  { day: 'Saturday', short: 'Sat', dow: 6, time: 'Closed' },
]

export const hoursCompact = [
  { day: 'Mon - Fri', time: '9 am - 5 pm' },
  { day: 'Sat - Sun', time: 'Closed' },
]

// Schema.org openingHoursSpecification.
export const openingHours = [
  {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '17:00',
  },
]

// ---------------------------------------------------------------------------
// Why R/T — trust pillars.
// ---------------------------------------------------------------------------
export const whyPillars = [
  {
    title: 'Honest & Upfront',
    blurb:
      "No upselling, no surprises. We explain the problem in plain language, show you what needs fixing and what can wait, then give you a fair, straight price before any work starts.",
  },
  {
    title: 'Transmission Specialists',
    blurb:
      'Transmissions are in our name for a reason. Rebuilds, hard-shift diagnosis, fluid service and clutch work, the complex jobs other shops send away, we handle in-house.',
  },
  {
    title: 'Fast, Reliable Turnaround',
    blurb:
      'We know you need your vehicle back. Smart scheduling and direct parts sourcing get the job done right and get you back on the road faster than you expect.',
  },
]

// ---------------------------------------------------------------------------
// SERVICES. `icon` keys map to lucide-react icons in the Services page.
// ---------------------------------------------------------------------------
export type Service = {
  title: string
  icon: string
  blurb: string
  points: string[]
  feature?: boolean
}

export const services: Service[] = [
  {
    title: 'Transmission Repair & Rebuilds',
    icon: 'Cog',
    feature: true,
    blurb:
      'Our specialty. Complete rebuilds, hard-shift and slipping diagnosis, and repairs for automatic, manual and CVT transmissions, built to last on domestic and import vehicles.',
    points: ['Full rebuilds', 'Slipping & hard-shift diagnosis', 'Automatic, manual & CVT'],
  },
  {
    title: 'Transmission Service & Fluid Exchange',
    icon: 'Droplets',
    feature: true,
    blurb:
      'Keep your transmission running smooth and extend its life. Fluid exchanges, filter service and preventative inspections that catch small problems before they become big ones.',
    points: ['Fluid & filter service', 'Leak inspection', 'Preventative maintenance'],
  },
  {
    title: 'Engine Diagnostics',
    icon: 'Gauge',
    blurb:
      'Check engine light on? We use modern scan tools to pinpoint the real cause, electrical, sensor or mechanical, instead of throwing parts at it.',
    points: ['Check engine light', 'Computer scan & code analysis', 'Drivability issues'],
  },
  {
    title: 'Brakes & Suspension',
    icon: 'Disc3',
    blurb:
      'Stop confidently and ride smooth. Pads, rotors, lines and full brake jobs, plus suspension and steering repairs to keep your vehicle safe and controlled.',
    points: ['Pads & rotors', 'Brake lines & fluid', 'Steering & suspension'],
  },
  {
    title: 'Clutch Repair & Replacement',
    icon: 'Settings2',
    blurb:
      'Slipping, chattering or hard-to-press clutch? We diagnose and replace clutches and related drivetrain components on manual vehicles of all makes.',
    points: ['Clutch replacement', 'Flywheel service', 'Drivetrain repair'],
  },
  {
    title: 'General Auto Repair & Maintenance',
    icon: 'Wrench',
    blurb:
      'A full-service shop for everything else, oil changes, fluids, tune-ups, belts, batteries and multi-point inspections to keep your vehicle dependable mile after mile.',
    points: ['Oil & fluid changes', 'Tune-ups & batteries', 'Multi-point inspections'],
  },
]

// ---------------------------------------------------------------------------
// FAQ (also feeds FAQPage schema).
// ---------------------------------------------------------------------------
export const faqs = [
  {
    q: 'Do you rebuild transmissions in-house?',
    a: 'Yes. Transmission rebuilds and repairs are our specialty, automatic, manual and CVT, on both domestic and import vehicles. We diagnose the real problem before recommending a rebuild.',
  },
  {
    q: 'Do you work on all makes and models?',
    a: 'We do. From daily drivers to trucks and performance vehicles, our team services all makes and models, foreign and domestic.',
  },
  {
    q: 'How do I get a quote or schedule service?',
    a: 'Call us at (330) 334-4227 or send a request through our website. Tell us what your vehicle is doing and we will get you scheduled and give you a straight, fair estimate.',
  },
  {
    q: 'What are your hours?',
    a: 'We are open Monday through Friday, 9:00 am to 5:00 pm, and closed Saturday and Sunday.',
  },
  {
    q: 'Where are you located?',
    a: 'Right on Main Street in Wadsworth at 349 Main St, Wadsworth, OH 44281, serving Wadsworth and all of Medina County.',
  },
]

// ---------------------------------------------------------------------------
// Reviews, real Google reviews (curated positive set for SEO + fallback).
// The live Reviews component refreshes these from the Places API at runtime;
// the header always shows the real overall rating and count.
// ---------------------------------------------------------------------------
export const ratingSummary = { value: '4.7', count: 66 }

export const reviews = [
  {
    name: 'Alex Spoerndle',
    rating: 5,
    quote:
      "Reed and R/T Auto-Transmission are amazing! Quick, friendly, and HONEST! I had multiple quotes and diagnostics on my vehicle, all incorrect and unnecessary fixes. Reed correctly pinpointed the real issue and saved me thousands. Will recommend to anyone!",
  },
  {
    name: 'al m',
    rating: 5,
    quote:
      'Could not recommend a place more for your car fixes! The owner is incredibly personable, honest, and puts intimidating car language into words everyone can understand. Prices are fair and turnaround is quick.',
  },
  {
    name: 'alba yoder',
    rating: 5,
    quote:
      "I cannot recommend this place highly enough. Reed was incredibly knowledgeable and explained everything clearly. He didn't try to upsell me, just a detailed breakdown and fair options. Quality work, fast turnaround, and transparent pricing. Five stars all the way!",
  },
  {
    name: 'Jeremy Payn',
    rating: 5,
    quote: 'Great work, reliable, good crew, fast turn. Good looking out, R/T crew!',
  },
]
