import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import type { Article, Media } from '@/payload-types'
import config from '@/payload.config'
import { absoluteUrl } from '@/lib/site'
import { getArticleSections, RichText } from '../../components/RichText'
import { SiteFooter, SiteHeader } from '../../components/SiteChrome'

type ArticleModule = {
  blockType?: string
  [key: string]: unknown
}

type RelatedArticle = {
  category?: string | null
  excerpt?: string
  publishedAt?: string | null
  readingTime?: string | null
  slug: string
  title: string
}

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

async function getArticle(slug: string): Promise<Article | null> {
  const payload = await getPayload({ config })
  const includeDrafts = process.env.NODE_ENV !== 'production'
  const result = await payload.find({
    collection: 'articles',
    draft: includeDrafts,
    depth: 2,
    limit: 1,
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        ...(includeDrafts
          ? []
          : [
              {
                status: {
                  equals: 'published',
                },
              },
            ]),
      ],
    },
  })

  return (result.docs[0] as Article | undefined) || null
}

async function getLatestRelatedArticles(currentSlug: string): Promise<RelatedArticle[]> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'articles',
      depth: 0,
      limit: 4,
      sort: '-publishedAt',
      where: {
        status: {
          equals: 'published',
        },
      },
    })

    return result.docs
      .filter((item) => item.slug !== currentSlug)
      .slice(0, 3)
      .map(toRelatedArticle)
  } catch (error) {
    console.warn('Could not load related articles.', error)
    return []
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    return {
      title: 'Essay nicht gefunden - Chefsache AI',
    }
  }

  const pathname = `/essays/${article.slug}`
  const title = article.seo?.title || `${article.title} - Chefsache AI`
  const description = article.seo?.description || article.excerpt
  const heroImage = getArticleHeroMedia(article.heroImage)

  return {
    alternates: {
      canonical: absoluteUrl(pathname),
    },
    description,
    openGraph: {
      description,
      images: heroImage?.url ? [{ url: heroImage.url }] : undefined,
      locale: 'de_DE',
      siteName: 'Chefsache AI',
      title,
      type: 'article',
      url: absoluteUrl(pathname),
    },
    title,
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const [article, latestRelatedArticles] = await Promise.all([
    getArticle(slug),
    getLatestRelatedArticles(slug),
  ])

  if (!article) {
    notFound()
  }

  const contentModules = (article as Article & { contentModules?: ArticleModule[] }).contentModules
  const sections = [
    ...getArticleSections(article.content),
    ...(contentModules || []).flatMap((module) =>
      module.blockType === 'articleText'
        ? getArticleSections(module.content as Parameters<typeof getArticleSections>[0])
        : [],
    ),
  ]
  const relatedArticles = normalizeRelatedArticles(article.relatedArticles)
  const related = relatedArticles.length ? relatedArticles : latestRelatedArticles

  return (
    <>
      <SiteHeader />
      <main>
        <ArticleHero article={article} />
        <LeadImage article={article} />
        <section className="shell prose-shell">
          <aside className="rail">
            {sections.length ? (
              <div className="rail-sticky">
                <span className="label">Inhalt</span>
                {sections.map((section, index) => (
                  <a href={`#${section.id}`} key={section.id}>
                    {roman(index + 1)} · {section.label}
                  </a>
                ))}
              </div>
            ) : null}
          </aside>
          <article className="prose">
            <RichText content={article.content} />
            <ArticleModules modules={contentModules} />
          </article>
          <aside className="rail" />
        </section>
        <ArticleAuthorBox article={article} />
        <ArticleCTA article={article} />
        <RelatedArticles articles={related} />
      </main>
      <SiteFooter articleLabel="Essay Nr. 01 - 2026" />
    </>
  )
}

function ArticleModules({ modules }: { modules?: ArticleModule[] | null }) {
  if (!modules?.length) {
    return null
  }

  return (
    <div className="article-modules">
      {modules.map((module, index) => (
        <ArticleModuleRenderer key={`${module.blockType || 'module'}-${index}`} module={module} />
      ))}
    </div>
  )
}

function ArticleModuleRenderer({ module }: { module: ArticleModule }) {
  switch (module.blockType) {
    case 'articleText':
      return <ArticleTextModule module={module} />
    case 'articleImage':
      return <ArticleImageModule module={module} />
    case 'articleQuote':
      return <ArticleQuoteModule module={module} />
    case 'articleHandNote':
      return <ArticleHandNoteModule module={module} />
    case 'articleInsightIndex':
      return <ArticleInsightIndexModule module={module} />
    case 'articleComparisonTable':
      return <ArticleComparisonTableModule module={module} />
    case 'articleCallout':
      return <ArticleCalloutModule module={module} />
    case 'articleInlineCta':
      return <ArticleInlineCtaModule module={module} />
    default:
      return null
  }
}

function ArticleTextModule({ module }: { module: ArticleModule }) {
  return (
    <section className="article-module article-module-text">
      {module.kicker ? <div className="article-text-kicker">{String(module.kicker)}</div> : null}
      <RichText content={module.content as Parameters<typeof RichText>[0]['content']} />
    </section>
  )
}

function ArticleImageModule({ module }: { module: ArticleModule }) {
  const layout = module.layout === 'inline' ? 'inline' : 'wide'

  return (
    <figure className={`article-module article-module-image article-module-${layout}`}>
      <img alt={String(module.imageAlt || '')} src={String(module.imageSrc || '')} />
      <figcaption>
        {module.kicker ? <span>{String(module.kicker)}</span> : null}
        {module.headline ? <h2>{String(module.headline)}</h2> : null}
        {module.text ? <p>{String(module.text)}</p> : null}
        {module.caption ? <small>{String(module.caption)}</small> : null}
      </figcaption>
    </figure>
  )
}

function getArticleHeroMedia(media?: number | Media | null) {
  return typeof media === 'object' && media?.url ? media : null
}

function ArticleQuoteModule({ module }: { module: ArticleModule }) {
  const variant = module.variant === 'compact' ? 'compact' : 'pull'

  return (
    <blockquote className={`article-module article-module-quote article-module-quote-${variant}`}>
      <q>{String(module.quote || '')}</q>
      {module.attribution ? <cite>{String(module.attribution)}</cite> : null}
    </blockquote>
  )
}

function ArticleHandNoteModule({ module }: { module: ArticleModule }) {
  return (
    <aside className="article-module article-module-handnote">
      {module.label ? <span>{String(module.label)}</span> : null}
      <p>{String(module.text || '')}</p>
    </aside>
  )
}

function ArticleInsightIndexModule({ module }: { module: ArticleModule }) {
  const items = (module.items as { label?: string; text?: string }[] | undefined) || []

  return (
    <section className="article-module article-module-index">
      <div className="article-module-head">
        {module.kicker ? <span>{String(module.kicker)}</span> : null}
        {module.headline ? <h2>{String(module.headline)}</h2> : null}
      </div>
      <div className="article-index-grid">
        {items.map((item, itemIndex) => (
          <article key={itemIndex}>
            <span>{String(itemIndex + 1).padStart(2, '0')}</span>
            <h3>{item.label}</h3>
            {item.text ? <p>{item.text}</p> : null}
          </article>
        ))}
      </div>
    </section>
  )
}

function ArticleComparisonTableModule({ module }: { module: ArticleModule }) {
  const rows =
    (module.rows as { label?: string; left?: string; right?: string }[] | undefined) || []

  return (
    <section className="article-module article-module-table">
      <div className="article-module-head">
        {module.kicker ? <span>{String(module.kicker)}</span> : null}
        <h2>{String(module.headline || '')}</h2>
      </div>
      <div className="article-table" role="table">
        <div className="article-table-row article-table-header" role="row">
          <div role="columnheader">Thema</div>
          <div role="columnheader">{String(module.leftHeader || 'Ohne eigene Praxis')}</div>
          <div role="columnheader">{String(module.rightHeader || 'Im Coaching')}</div>
        </div>
        {rows.map((row, rowIndex) => (
          <div className="article-table-row" key={rowIndex} role="row">
            <div role="cell">{row.label}</div>
            <div role="cell">{row.left}</div>
            <div role="cell">{row.right}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ArticleCalloutModule({ module }: { module: ArticleModule }) {
  return (
    <aside className="article-module article-module-callout">
      {module.kicker ? <span>{String(module.kicker)}</span> : null}
      <h2>{String(module.headline || '')}</h2>
      {module.text ? <p>{String(module.text)}</p> : null}
    </aside>
  )
}

function ArticleInlineCtaModule({ module }: { module: ArticleModule }) {
  return (
    <aside className="article-module article-module-inline-cta">
      <div>
        <h2>{String(module.headline || '')}</h2>
        {module.text ? <p>{String(module.text)}</p> : null}
      </div>
      <a className="btn btn-primary" href={String(module.target || '/#kontakt')}>
        {String(module.label || 'Anfragen')}
      </a>
    </aside>
  )
}

function ArticleHero({ article }: { article: Article }) {
  return (
    <section className="article-hero shell">
      <div className="crumbs">
        <a href="/">Chefsache AI</a>
        <span className="sep">/</span>
        <span>Essays</span>
        <span className="sep">/</span>
        <span className="here">{article.category || 'Essay'}</span>
      </div>

      <div className="article-cat">
        <span className="dot" />
        {article.category || 'Essay'} · Manifest Nr. 01
      </div>

      <h1 className="article-title">{article.title}</h1>
      <p className="article-deck">{article.excerpt}</p>

      <div className="article-meta">
        <div className="author">
          {article.authorImageSrc ? (
            <img alt={article.authorName || 'Kai Michael Schaefer'} src={article.authorImageSrc} />
          ) : (
            <span className="author-mark">AI</span>
          )}
          <div>
            <div className="name">{article.authorName || 'Kai Michael Schaefer'}</div>
            <span className="role">{article.authorRole || 'Executive AI Coach'}</span>
          </div>
        </div>
        <div />
        <div className="meta-item">
          Erschienen
          <strong>{formatDate(article.publishedAt)}</strong>
        </div>
        <div className="meta-item">
          Lesedauer
          <strong>{article.readingTime || '9 Minuten'}</strong>
        </div>
      </div>
    </section>
  )
}

function LeadImage({ article }: { article: Article }) {
  const image = typeof article.heroImage === 'object' ? (article.heroImage as Media) : null
  const imageUrl = image?.url || article.heroImageSrc || ''

  return (
    <section className="shell article-lead-section">
      <figure className="article-lead-img">
        <div className="article-image-surface" style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined} />
        <div className="tint" />
        <figcaption>
          <span className="rule" />
          {article.heroImageCaption || 'Platzhalter · Coaching-Sitzung, Frankfurt am Main'}
        </figcaption>
      </figure>
    </section>
  )
}

function ArticleAuthorBox({ article }: { article: Article }) {
  const authorBio =
    article.authorBio ||
    'Kai Michael Schaefer ist Unternehmer, Berater und Venture Builder. Mit Chefsache AI begleitet er Entscheider dabei, kuenstliche Intelligenz persoenlich zu verstehen, praktisch anzuwenden und fundierter ueber die naechsten Schritte im Unternehmen zu entscheiden.'

  return (
    <section className="shell article-author-section">
      <aside className="article-author-box">
        {article.authorImageSrc ? (
          <img alt={article.authorName || 'Kai Michael Schaefer'} src={article.authorImageSrc} />
        ) : (
          <span className="author-mark">AI</span>
        )}
        <div>
          <span>Autor</span>
          <h2>{article.authorName || 'Kai Michael Schaefer'}</h2>
          <p>{authorBio}</p>
          {article.authorRole ? <strong>{article.authorRole}</strong> : null}
        </div>
      </aside>
    </section>
  )
}

function ArticleCTA({ article }: { article: Article }) {
  const cta = article.articleCta

  if (!cta?.headline && !cta?.text) {
    return null
  }

  return (
    <section className="shell article-cta-section">
      <div className="article-cta">
        <div className="seal-bg">AI</div>
        <div className="article-cta-content">
          <div className="eyebrow">
            <span className="dot" />
            Wenn dieser Essay Sie betrifft
          </div>
          {cta.headline ? <h2>{cta.headline}</h2> : null}
          {cta.text ? <p>{cta.text}</p> : null}
          <div className="article-cta-actions">
            {cta.label ? (
              <a className="btn btn-primary" href={cta.target || '/#kontakt'}>
                {cta.label}
              </a>
            ) : null}
            <a className="btn btn-ghost" href="/#coaching">
              Wie ich arbeite
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function RelatedArticles({
  articles,
}: {
  articles: RelatedArticle[]
}) {
  if (articles.length === 0) {
    return null
  }

  return (
    <section className="shell related">
      <div className="section-tag">
        <span className="num">§ Weiter</span>
        Verwandte Essays
      </div>
      <div className="related-intro">
        <div className="eyebrow">Aus derselben Linie</div>
        <h2>Weitere Essays, die denselben Faden ziehen.</h2>
      </div>
      <div className="related-grid">
        {articles.map((item, index) => (
          <a className="rel-card" href={`/essays/${item.slug}`} key={`${item.slug}-${index}`}>
            <span className="num">{String(index + 1).padStart(2, '0')}</span>
            <span className="cat">{item.category || 'Essay'}</span>
            <h3>{item.title}</h3>
            {item.excerpt ? <p>{item.excerpt}</p> : null}
            <div className="meta">
              <span>{formatDate(item.publishedAt)}</span>
              <span className="sep">·</span>
              <span>{item.readingTime || '5 Minuten'}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

function normalizeRelatedArticles(related?: (number | Article)[] | null) {
  return (related || [])
    .filter(
      (item): item is Article =>
        typeof item === 'object' && (process.env.NODE_ENV !== 'production' || item.status === 'published'),
    )
    .map(toRelatedArticle)
}

function toRelatedArticle(article: Article): RelatedArticle {
  return {
    category: article.category,
    excerpt: article.excerpt,
    publishedAt: article.publishedAt,
    readingTime: article.readingTime,
    slug: article.slug,
    title: article.title,
  }
}

function formatDate(value?: string | null) {
  if (!value) {
    return 'Aktuell'
  }

  return new Intl.DateTimeFormat('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value))
}

function roman(value: number) {
  return ['I', 'II', 'III', 'IV', 'V', 'VI'][value - 1] || String(value)
}
