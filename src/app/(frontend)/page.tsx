import type { Metadata } from 'next'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import { homePage } from '@/content/homePage'
import { absoluteUrl } from '@/lib/site'
import { ContactForm } from './components/ContactForm'
import { SiteFooter, SiteHeader } from './components/SiteChrome'
import './styles.css'

export const dynamic = 'force-dynamic'

type CmsBlock = {
  blockType: string
  [key: string]: unknown
}

type CmsLandingPage = {
  title?: string
  seo?: {
    title?: string
    description?: string
    ogTitle?: string
    ogDescription?: string
    ogImage?: {
      url?: string
    }
  }
  sections?: CmsBlock[]
}

const fallbackPage: CmsLandingPage = homePage

async function getLandingPage(): Promise<CmsLandingPage> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'landing-pages',
      depth: 1,
      limit: 1,
      where: {
        slug: {
          equals: 'home',
        },
      },
    })

    return (result.docs[0] as CmsLandingPage | undefined) || fallbackPage
  } catch (error) {
    console.warn('Falling back to static homepage content.', error)
    return fallbackPage
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLandingPage()
  const title = page.seo?.title || fallbackPage.seo?.title
  const description = page.seo?.description || fallbackPage.seo?.description
  const ogTitle = page.seo?.ogTitle || title
  const ogDescription = page.seo?.ogDescription || description
  const ogImage = page.seo?.ogImage?.url

  return {
    alternates: {
      canonical: absoluteUrl('/'),
    },
    description,
    openGraph: {
      description: ogDescription,
      images: ogImage ? [{ url: ogImage }] : undefined,
      locale: 'de_DE',
      siteName: 'Chefsache AI',
      title: ogTitle,
      type: 'website',
      url: absoluteUrl('/'),
    },
    title,
  }
}

export default async function HomePage() {
  const page = await getLandingPage()
  const sections = page.sections?.length ? page.sections : fallbackPage.sections || []

  return (
    <>
      <SiteHeader />
      <main>
        {sections.map((block, index) => (
          <BlockRenderer block={block} index={index} key={`${block.blockType}-${index}`} />
        ))}
      </main>
      <SiteFooter />
    </>
  )
}

function BlockRenderer({ block, index }: { block: CmsBlock; index: number }) {
  switch (block.blockType) {
    case 'hero':
      return <HeroBlock block={block} />
    case 'text':
      return <TextBlock block={block} index={index} />
    case 'problem':
      return <ProblemBlock block={block} index={index} />
    case 'pillars':
      return <PillarsBlock block={block} index={index} />
    case 'process':
      return <ProcessBlock block={block} index={index} />
    case 'audience':
      return <AudienceBlock block={block} index={index} />
    case 'experienceImage':
      return <ExperienceImageBlock block={block} index={index} />
    case 'testimonials':
      return <TestimonialsBlock block={block} index={index} />
    case 'articleTeasers':
      return <ArticleTeasersBlock block={block} index={index} />
    case 'faq':
      return <FAQBlock block={block} index={index} />
    case 'cta':
      return <CTABlock block={block} index={index} />
    case 'ctaAccents':
      return <CTAAccentsBlock block={block} index={index} />
    case 'contactForm':
      return <ContactFormBlock block={block} index={index} />
    default:
      return null
  }
}

function HeroBlock({ block }: { block: CmsBlock }) {
  const primary = block.primaryCta as { label?: string; target?: string } | undefined
  const secondary = block.secondaryCta as { label?: string; target?: string } | undefined
  const trustItems = (block.trustItems as { label?: string; value?: string }[] | undefined) || []
  const handwrittenNote = String(
    block.handwrittenNote || 'Auch für kleine Geschäftsführungsteams.',
  )
  const heroImageCaption = String(
    block.heroImageCaption || 'Über etwas entscheiden, das man nicht selbst beherrscht.',
  )

  return (
    <section className="hero shell" id="top">
      <div className="hero-corner-stamp">
        <strong>{String(block.cornerStampLabel || 'Chefsache AI')}</strong>
        <span>{String(block.cornerStampText || 'Executive AI Coaching')}</span>
      </div>
      <div className="eyebrow">{String(block.eyebrow || 'Chefsache AI')}</div>
      <div className="hero-grid">
        <div className="hero-copy">
          <h1>{String(block.headline || '')}</h1>
          <p className="lede">{String(block.subheadline || '')}</p>
          <div className="actions">
            {primary?.label && (
              <a className="btn btn-primary" href={primary.target || '#kontakt'}>
                {primary.label}
              </a>
            )}
            {secondary?.label && (
              <a className="btn btn-ghost" href={secondary.target || '#coaching'}>
                {secondary.label}
              </a>
            )}
          </div>
          <div className="margin-note hero-note">
            <span className="note-line">{handwrittenNote}</span>
            <span />
          </div>
        </div>
        <div className="portrait-wrap">
          <aside className="portrait-frame" aria-label="Executive Portrait">
            <img
              alt="Executive in dunklem Editorial-Portrait"
              className="portrait-img"
              src="/images/executive-businessman-portrait.png"
            />
            <div className="portrait-surface" />
            <div className="portrait-caption portrait-quote">
              <strong>{heroImageCaption}</strong>
            </div>
          </aside>
        </div>
      </div>
      {trustItems.length > 0 && (
        <div className="trust-grid">
          {trustItems.map((item, itemIndex) => (
            <div key={itemIndex}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

function SectionTag({ index, label }: { index: number; label?: unknown }) {
  return (
    <div className="section-tag">
      <span className="num">§{String(index).padStart(2, '0')}</span>
      {label ? String(label) : 'Abschnitt'}
    </div>
  )
}

function TextBlock({ block, index }: { block: CmsBlock; index: number }) {
  const kicker = String(block.kicker || '')

  if (kicker.toLowerCase() === 'manifest') {
    return (
      <section className="manifest-section shell">
        <div className="manifest-label">Manifest</div>
        <blockquote>
          <p>{String(block.body || block.headline || '')}</p>
          <footer>
            <span />
            <strong>{String(block.attribution || 'Kai Michael Schäfer')}</strong>
          </footer>
        </blockquote>
      </section>
    )
  }

  if (kicker.toLowerCase().includes('sparringspartner')) {
    return (
      <section className="section section-statement section-sparring shell">
        <span className="giant-numeral">{String(index).padStart(2, '0')}</span>
        <SectionTag index={index} label={block.kicker} />
        <div className="sparring-layout">
          <figure className="sparring-portrait">
            <img alt="Kai Michael Schaefer" src="/images/kai-michael-schaefer-portrait.jpg" />
            <figcaption>
              <strong>Kai Michael Schaefer</strong>
              <span>Unternehmer · Berater · Venture Builder</span>
            </figcaption>
          </figure>
          <div className={`text-block layout-${String(block.layout || 'narrow')}`}>
            <h2>{String(block.headline || '')}</h2>
            <p>{String(block.body || '')}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      className="section section-statement shell"
      id={kicker.toLowerCase().includes('befund') ? 'ausgangslage' : undefined}
    >
      <span className="giant-numeral">{String(index).padStart(2, '0')}</span>
      <SectionTag index={index} label={block.kicker} />
      <div className={`text-block layout-${String(block.layout || 'narrow')}`}>
        <h2>{String(block.headline || '')}</h2>
        <p>{String(block.body || '')}</p>
      </div>
    </section>
  )
}

function ProblemBlock({ block, index }: { block: CmsBlock; index: number }) {
  const items = (block.problemItems as { title?: string; description?: string }[] | undefined) || []

  return (
    <section className="section section-problem shell">
      <span className="giant-numeral">{String(index).padStart(2, '0')}</span>
      <SectionTag index={index} label={block.kicker || 'Status quo'} />
      <SectionIntro block={block} />
      <div className="card-grid problem-grid">
        {items.map((item, itemIndex) => (
          <article className="panel" key={itemIndex}>
            <span className="panel-index">{String(itemIndex + 1).padStart(2, '0')}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function PillarsBlock({ block, index }: { block: CmsBlock; index: number }) {
  const pillars = (block.pillars as { title?: string; description?: string }[] | undefined) || []

  return (
    <section className="section section-pillars shell" id="coaching">
      <span className="giant-numeral">{String(index).padStart(2, '0')}</span>
      <div className="editorial-rail" aria-hidden="true">
        <span>Erleben</span>
      </div>
      <SectionTag index={index} label="Coaching-Modell" />
      <div className="pillar-editorial-head">
        <SectionIntro block={block} />
        <aside className="experience-seal" aria-hidden="true">
          <span>Coaching</span>
          <strong>so individuell</strong>
          <small>wie Ihre Situation</small>
        </aside>
      </div>
      <div className="card-grid pillar-grid">
        {pillars.map((pillar, pillarIndex) => (
          <article className="panel tall" key={pillarIndex}>
            <div className="pillar-label">
              <span className="number">{pillarIndex + 1}</span>
              <span>Saeule {String(pillarIndex + 1).padStart(2, '0')}</span>
            </div>
            <h3>{pillar.title}</h3>
            <p>{pillar.description}</p>
          </article>
        ))}
      </div>
      {pillars.length > 0 ? (
        <div className="pillar-progress" aria-hidden="true">
          {pillars.map((pillar, pillarIndex) => (
            <span key={`${pillar.title || 'pillar'}-${pillarIndex}`}>
              {String(pillarIndex + 1).padStart(2, '0')}
            </span>
          ))}
        </div>
      ) : null}
    </section>
  )
}

function ProcessBlock({ block, index }: { block: CmsBlock; index: number }) {
  const steps = (block.steps as { title?: string; description?: string }[] | undefined) || []

  return (
    <section className="section section-process shell" id="ablauf">
      <span className="giant-numeral">{String(index).padStart(2, '0')}</span>
      <SectionTag index={index} label="Ablauf" />
      <SectionIntro block={block} />
      <div className="timeline">
        {steps.map((step, stepIndex) => (
          <article key={stepIndex}>
            <span>{String(stepIndex + 1).padStart(2, '0')}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function AudienceBlock({ block, index }: { block: CmsBlock; index: number }) {
  const suitableFor = (block.suitableFor as { item?: string }[] | undefined) || []
  const notSuitableFor = (block.notSuitableFor as { item?: string }[] | undefined) || []

  return (
    <section className="section section-audience shell">
      <span className="giant-numeral">{String(index).padStart(2, '0')}</span>
      <SectionTag index={index} label="Zielgruppe" />
      <h2>{String(block.headline || '')}</h2>
      <div className="split-list">
        <ListPanel items={suitableFor} title="Geeignet fuer" />
        <ListPanel items={notSuitableFor} title="Nicht geeignet fuer" />
      </div>
    </section>
  )
}

function ExperienceImageBlock({ block, index }: { block: CmsBlock; index: number }) {
  const imageSrc = String(block.imageSrc || '/images/private-executive-ai-session.png')
  const imageAlt = String(block.imageAlt || 'Private Executive AI Coaching Session')

  return (
    <section className="section section-experience shell">
      <span className="giant-numeral">{String(index).padStart(2, '0')}</span>
      <SectionTag index={index} label={block.kicker || 'Private Session'} />
      <figure className="experience-figure">
        <img alt={imageAlt} src={imageSrc} />
        <figcaption>
          <span>{String(block.kicker || 'Private Session')}</span>
          <h2>{String(block.headline || '')}</h2>
          {block.text ? <p>{String(block.text)}</p> : null}
        </figcaption>
      </figure>
    </section>
  )
}

function FAQBlock({ block, index }: { block: CmsBlock; index: number }) {
  const faqs = (block.faqs as { question?: string; answer?: string }[] | undefined) || []

  return (
    <section className="section section-faq shell" id="faq">
      <span className="giant-numeral">{String(index).padStart(2, '0')}</span>
      <SectionTag index={index} label="FAQ" />
      <h2>{String(block.headline || '')}</h2>
      <div className="faq-list">
        {faqs.map((faq, faqIndex) => (
          <details key={faqIndex}>
            <summary>
              <span>{String(faqIndex + 1).padStart(2, '0')}</span>
              <span>{faq.question}</span>
            </summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

function TestimonialsBlock({ block, index }: { block: CmsBlock; index: number }) {
  const testimonials =
    (block.testimonials as { quote?: string; person?: string; context?: string }[] | undefined) || []

  return (
    <section className="section section-testimonials shell">
      <span className="giant-numeral">{String(index).padStart(2, '0')}</span>
      <SectionTag index={index} label={block.kicker || 'Stimmen'} />
      <SectionIntro block={block} />
      <div className="testimonial-grid">
        {testimonials.map((testimonial, testimonialIndex) => (
          <figure className="quote-card" key={testimonialIndex}>
            <q>{testimonial.quote}</q>
            <figcaption>
              <strong>{testimonial.person}</strong>
              {testimonial.context ? <span>{testimonial.context}</span> : null}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

function ArticleTeasersBlock({ block, index }: { block: CmsBlock; index: number }) {
  const articles =
    (block.articles as {
      category?: string
      excerpt?: string
      readingTime?: string
      target?: string
      title?: string
    }[] | undefined) || []

  return (
    <section className="section section-articles shell">
      <span className="giant-numeral">{String(index).padStart(2, '0')}</span>
      <SectionTag index={index} label={block.kicker || 'Essays'} />
      <SectionIntro block={block} />
      <div className="related-grid article-teaser-grid">
        {articles.map((article, articleIndex) => {
          const content = (
            <>
              <span className="num">{String(articleIndex + 1).padStart(2, '0')}</span>
              <span className="cat">{article.category || 'Essay'}</span>
              <h3>{article.title}</h3>
              {article.excerpt ? <p>{article.excerpt}</p> : null}
              <div className="meta">
                <span>{article.readingTime || 'Konzept'}</span>
              </div>
            </>
          )

          return article.target ? (
            <a className="rel-card" href={article.target} key={articleIndex}>
              {content}
            </a>
          ) : (
            <article className="rel-card" key={articleIndex}>
              {content}
            </article>
          )
        })}
      </div>
    </section>
  )
}

function CTABlock({ block, index }: { block: CmsBlock; index: number }) {
  const cta = block.cta as { label?: string; target?: string } | undefined

  return (
    <section className="section section-cta shell">
      <span className="giant-numeral">{String(index).padStart(2, '0')}</span>
      <SectionTag index={index} label="Naechster Schritt" />
      <div className="cta-band" data-section-number={String(index).padStart(2, '0')}>
        <div>
          <h2>{String(block.headline || '')}</h2>
          {cta?.label ? (
            <a className="btn btn-primary" href={cta.target || '#kontakt'}>
              {cta.label}
            </a>
          ) : null}
        </div>
        {block.text ? <p>{String(block.text)}</p> : null}
      </div>
    </section>
  )
}

function CTAAccentsBlock({ block, index }: { block: CmsBlock; index: number }) {
  const items =
    (block.items as {
      cta?: { label?: string; target?: string }
      headline?: string
      label?: string
      text?: string
    }[] | undefined) || []

  return (
    <section className="section section-cta-accents shell">
      <span className="giant-numeral">{String(index).padStart(2, '0')}</span>
      <SectionTag index={index} label={block.kicker || 'Anfrage'} />
      {block.headline ? <h2>{String(block.headline)}</h2> : null}
      <div className="cta-accent-grid">
        {items.map((item, itemIndex) => (
          <article className="cta-accent" key={itemIndex}>
            <span className="cta-accent-index">{String(itemIndex + 1).padStart(2, '0')}</span>
            {item.label ? <span className="cta-accent-label">{item.label}</span> : null}
            <h3>{item.headline}</h3>
            {item.text ? <p>{item.text}</p> : null}
            {item.cta?.label ? (
              <a href={item.cta.target || '#kontakt'}>{item.cta.label}</a>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  )
}

function ContactFormBlock({ block, index }: { block: CmsBlock; index: number }) {
  return (
    <section className="section section-contact shell" id="kontakt">
      <span className="giant-numeral">{String(index).padStart(2, '0')}</span>
      <SectionTag index={index} label="Kontakt" />
      <div className="contact-layout">
        <div className="contact-copy">
          <h2>{String(block.headline || '')}</h2>
          {block.intro ? <p className="lede small">{String(block.intro)}</p> : null}
          <div className="contact-mini">
            <span>Direkt</span>
            <strong>Kai Michael Schaefer</strong>
          </div>
        </div>
        <ContactForm
          submitLabel={String(block.submitLabel || 'Erstgespraech anfragen')}
          successMessage={String(block.successMessage || 'Danke. Ihre Anfrage wurde gespeichert.')}
        />
      </div>
    </section>
  )
}

function SectionIntro({ block }: { block: CmsBlock }) {
  return (
    <div className="section-intro">
      <div className="section-kicker">{String(block.kicker || block.eyebrow || 'Einordnung')}</div>
      <h2>{String(block.headline || '')}</h2>
      {block.intro ? <p>{String(block.intro)}</p> : null}
    </div>
  )
}

function ListPanel({ items, title }: { items: { item?: string }[]; title: string }) {
  return (
    <article className="panel">
      <h3>{title}</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <span>{title === 'Geeignet fuer' ? '+' : '-'}</span>
            {item.item}
          </li>
        ))}
      </ul>
    </article>
  )
}
