import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'

import { absoluteUrl } from '@/lib/site'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  try {
    const payload = await getPayload({ config })
    const [articles, legalPages] = await Promise.all([
      payload.find({
        collection: 'articles',
        depth: 0,
        limit: 100,
        where: {
          status: {
            equals: 'published',
          },
        },
      }),
      payload.find({
        collection: 'legal-pages',
        depth: 0,
        limit: 20,
        where: {
          status: {
            equals: 'published',
          },
        },
      }),
    ])

    const articleRoutes = articles.docs.map((article) => ({
      changeFrequency: 'monthly' as const,
      lastModified: article.updatedAt ? new Date(article.updatedAt) : now,
      priority: 0.7,
      url: absoluteUrl(`/essays/${article.slug}`),
    }))
    const legalRoutes = legalPages.docs.map((page) => ({
      changeFrequency: 'yearly' as const,
      lastModified: page.updatedAt ? new Date(page.updatedAt) : now,
      priority: 0.2,
      url: absoluteUrl(
        page.slug === 'datenschutzerklaerung' ? '/datenschutzerklaerung' : `/${page.slug}`,
      ),
    }))

    return [
      {
        changeFrequency: 'weekly',
        lastModified: now,
        priority: 1,
        url: absoluteUrl('/'),
      },
      ...articleRoutes,
      ...legalRoutes,
    ]
  } catch (error) {
    console.warn('Falling back to minimal sitemap.', error)

    return [
      {
        changeFrequency: 'weekly',
        lastModified: now,
        priority: 1,
        url: absoluteUrl('/'),
      },
    ]
  }
}
