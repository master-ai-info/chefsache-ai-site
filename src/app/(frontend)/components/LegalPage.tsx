import { getPayload } from 'payload'

import config from '@/payload.config'
import { SiteFooter, SiteHeader } from './SiteChrome'

type LegalPageProps = {
  fallbackHtml: string
  kicker: string
  sourcePageId: number
  sourceUrl: string
  title: string
}

type CmsLegalPage = {
  contentHtml?: string
  intro?: string
  kicker?: string
  seo?: {
    description?: string
    title?: string
  }
  sourceUrl?: string
  title?: string
}

export async function LegalPage({
  fallbackHtml,
  kicker,
  sourcePageId,
  sourceUrl,
  title,
}: LegalPageProps) {
  const page = await getLegalPage(sourcePageId)
  const html = page?.contentHtml || fallbackHtml
  const resolvedTitle = page?.title || title
  const resolvedKicker = page?.kicker || kicker
  const resolvedSourceUrl = page?.sourceUrl || sourceUrl
  const resolvedIntro =
    page?.intro || 'Übernommen von kms-projects.com für den POC. Vor Livegang bitte final juristisch prüfen.'

  return (
    <>
      <SiteHeader />
      <main>
        <section className="legal-hero shell">
          <div className="article-cat">
            <span className="dot" />
            {resolvedKicker}
          </div>
          <h1 className="legal-title">{resolvedTitle}</h1>
          <p className="article-deck">{resolvedIntro}</p>
        </section>
        <section className="legal-shell shell">
          <article className="legal-prose" dangerouslySetInnerHTML={{ __html: normalizeLegalHtml(html) }} />
          <aside className="legal-source">
            <span>Quelle</span>
            <a href={resolvedSourceUrl} rel="noreferrer" target="_blank">
              kms-projects.com
            </a>
          </aside>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}

async function getLegalPage(sourcePageId: number): Promise<CmsLegalPage | null> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'legal-pages',
    depth: 0,
    limit: 1,
    where: {
      and: [
        {
          sourcePageId: {
            equals: sourcePageId,
          },
        },
        {
          status: {
            equals: 'published',
          },
        },
      ],
    },
  })

  return (result.docs[0] as CmsLegalPage | undefined) || null
}

function normalizeLegalHtml(html: string) {
  return html
    .replaceAll('kai@kms-projects.com', 'info@chefsache-ai.com')
    .replaceAll('http://kms-projects.com/datenschutzerklaerung', '/datenschutzerklaerung')
    .replaceAll('https://kms-projects.com/datenschutzerklaerung', '/datenschutzerklaerung')
    .replaceAll('https://kms-projects.com/impressum', '/impressum')
    .replaceAll('http://kms-projects.com/impressum', '/impressum')
}
