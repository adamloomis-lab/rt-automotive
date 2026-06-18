import {
  company,
  openingHours,
  reviews,
  ratingSummary,
  services,
  faqs as FAQS,
} from '../data/site'

// Production target domain. Staging serves from rt-auto-transmission.netlify.app
// until cutover. Canonicals, sitemap, OG and schema all point here.
export const SITE_URL = 'https://www.rtwadsworth.com'

const OG_IMAGE = '/images/og-image.jpg'

export const abs = (path: string) => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`

// Netlify serves pages with a trailing slash; keep canonical/sitemap URLs aligned.
export const pageUrl = (path: string) =>
  abs(path === '/' ? '/' : path.endsWith('/') ? path : `${path}/`)

function openingHoursSpec() {
  return openingHours.map((o) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: o.days,
    opens: o.opens,
    closes: o.closes,
  }))
}

function aggregateRating() {
  return {
    '@type': 'AggregateRating',
    ratingValue: ratingSummary.value,
    reviewCount: String(ratingSummary.count),
    bestRating: '5',
    worstRating: '1',
  }
}

function reviewNodes() {
  return reviews.map((r) => ({
    '@type': 'Review',
    reviewBody: r.quote,
    author: { '@type': 'Person', name: r.name },
    reviewRating: { '@type': 'Rating', ratingValue: String(r.rating), bestRating: '5' },
  }))
}

function offerCatalog() {
  return {
    '@type': 'OfferCatalog',
    name: 'Automotive & Transmission Services',
    itemListElement: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.title, description: s.blurb },
    })),
  }
}

export function shopSchema() {
  const a = company.address
  return {
    '@context': 'https://schema.org',
    '@type': ['AutoRepair', 'LocalBusiness'],
    '@id': `${SITE_URL}/#shop`,
    name: company.name,
    legalName: company.legalName,
    url: SITE_URL,
    image: abs(OG_IMAGE),
    logo: abs('/images/logo-full.png'),
    telephone: company.phone,
    priceRange: '$$',
    description: company.shortBlurb,
    slogan: company.tagline,
    address: {
      '@type': 'PostalAddress',
      streetAddress: a.street,
      addressLocality: a.city,
      addressRegion: a.state,
      postalCode: a.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: company.geo.lat,
      longitude: company.geo.lng,
    },
    areaServed: [
      { '@type': 'City', name: 'Wadsworth, OH' },
      { '@type': 'AdministrativeArea', name: 'Medina County, OH' },
    ],
    openingHoursSpecification: openingHoursSpec(),
    aggregateRating: aggregateRating(),
    review: reviewNodes(),
    hasOfferCatalog: offerCatalog(),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: company.phone,
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: 'English',
    },
    sameAs: [company.social.facebook],
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: company.name,
    alternateName: 'R/T Automotive Wadsworth',
    description: company.shortBlurb,
    inLanguage: 'en-US',
    publisher: { '@id': `${SITE_URL}/#shop` },
  }
}

function serviceSchema() {
  return services.map((s) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.title,
    description: s.blurb,
    serviceType: s.title,
    provider: { '@id': `${SITE_URL}/#shop` },
    areaServed: { '@type': 'City', name: 'Wadsworth, OH' },
  }))
}

function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

function breadcrumb(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: pageUrl(it.path),
    })),
  }
}

export const faqs = FAQS

export type PageMeta = {
  title: string
  description: string
  canonical: string
  ogImage: string
  jsonLd: object[]
}

export function getPageMeta(rawPath: string): PageMeta {
  const path = rawPath !== '/' ? rawPath.replace(/\/$/, '') : '/'
  const ogImage = abs(OG_IMAGE)

  switch (path) {
    case '/':
      return {
        title: 'R/T Automotive & Transmission | Transmission Repair & Auto Service in Wadsworth, OH',
        description: `${company.shortBlurb} Call ${company.phone}.`,
        canonical: pageUrl('/'),
        ogImage,
        jsonLd: [shopSchema(), websiteSchema(), faqSchema()],
      }
    case '/services':
      return {
        title: 'Services | Transmission, Brakes, Diagnostics & Auto Repair | R/T Automotive, Wadsworth OH',
        description:
          'Transmission rebuilds and service, engine diagnostics, brakes, clutch repair and full auto maintenance on all makes and models. Honest work at a fair price in Wadsworth, OH.',
        canonical: pageUrl('/services'),
        ogImage,
        jsonLd: [
          shopSchema(),
          ...serviceSchema(),
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
          ]),
        ],
      }
    case '/about':
      return {
        title: 'About R/T Automotive & Transmission | Family-Run Shop in Wadsworth, OH',
        description:
          "Meet the team behind R/T Automotive & Transmission, Wadsworth's honest, family-run transmission and auto repair shop known for fair pricing, fast turnaround and plain-language answers.",
        canonical: pageUrl('/about'),
        ogImage,
        jsonLd: [
          shopSchema(),
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ]),
        ],
      }
    case '/contact':
      return {
        title: 'Contact & Hours | R/T Automotive & Transmission, Wadsworth OH',
        description: `Find R/T Automotive & Transmission at ${company.addressOneLine}. Open Mon–Fri 9am–5pm. Request service or call ${company.phone}.`,
        canonical: pageUrl('/contact'),
        ogImage,
        jsonLd: [
          shopSchema(),
          faqSchema(),
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            url: pageUrl('/contact'),
            about: { '@id': `${SITE_URL}/#shop` },
          },
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
        ],
      }
    case '/privacy':
      return {
        title: 'Privacy Policy | R/T Automotive & Transmission',
        description:
          'How R/T Automotive & Transmission collects, uses, and protects information submitted through this website.',
        canonical: pageUrl('/privacy'),
        ogImage,
        jsonLd: [shopSchema(), breadcrumb([{ name: 'Home', path: '/' }, { name: 'Privacy Policy', path: '/privacy' }])],
      }
    case '/terms':
      return {
        title: 'Terms of Service | R/T Automotive & Transmission',
        description: 'The terms that govern your use of the R/T Automotive & Transmission website.',
        canonical: pageUrl('/terms'),
        ogImage,
        jsonLd: [shopSchema(), breadcrumb([{ name: 'Home', path: '/' }, { name: 'Terms of Service', path: '/terms' }])],
      }
    case '/accessibility':
      return {
        title: 'Accessibility Statement | R/T Automotive & Transmission',
        description:
          'Our commitment to making the R/T Automotive & Transmission website accessible to everyone, and how to reach us about accessibility.',
        canonical: pageUrl('/accessibility'),
        ogImage,
        jsonLd: [shopSchema(), breadcrumb([{ name: 'Home', path: '/' }, { name: 'Accessibility', path: '/accessibility' }])],
      }
    default:
      return {
        title: 'Page Not Found | R/T Automotive & Transmission',
        description:
          "Sorry, we couldn't find that page. R/T Automotive & Transmission is Wadsworth's trusted transmission and auto repair shop.",
        canonical: pageUrl(path),
        ogImage,
        jsonLd: [shopSchema()],
      }
  }
}

export const ALL_ROUTES: string[] = [
  '/',
  '/services',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/accessibility',
]
