const siteUrl = (process.env.CMS_SYNC_SITE_URL || 'https://chefsache-ai-site.vercel.app').replace(
  /\/$/,
  '',
)
const apiUrl = `${siteUrl}/api/landing-pages?where[slug][equals]=home&limit=1&depth=1&_cb=${Date.now()}`
const outputPath = new URL('../src/content/homePage.ts', import.meta.url)

const technicalKeys = new Set(['id', 'blockName', 'createdAt', 'updatedAt', '_status'])

function stripPayloadFields(value) {
  if (Array.isArray(value)) {
    return value.map(stripPayloadFields)
  }

  if (!value || typeof value !== 'object') {
    return value
  }

  return Object.fromEntries(
    Object.entries(value)
      .filter(([key, item]) => !technicalKeys.has(key) && item !== null)
      .map(([key, item]) => [key, stripPayloadFields(item)]),
  )
}

const response = await fetch(apiUrl, { cache: 'no-store' })

if (!response.ok) {
  throw new Error(`CMS request failed with ${response.status} ${response.statusText}`)
}

const data = await response.json()
const page = data.docs?.[0]

if (!page) {
  throw new Error('No landing page with slug "home" found in CMS.')
}

const syncedPage = stripPayloadFields(page)
const file = `// Generated from Payload CMS by npm run sync:homepage-from-cms.
// Edit copy in Payload first, then run the sync command to version the approved CMS state.

export const homePage = ${JSON.stringify(syncedPage, null, 2)} as const
`

await import('node:fs/promises').then(({ writeFile }) => writeFile(outputPath, file))

console.log(
  JSON.stringify(
    {
      source: siteUrl,
      title: syncedPage.title,
      slug: syncedPage.slug,
      sections: syncedPage.sections?.length,
      hero: syncedPage.sections?.[0]?.headline,
      output: outputPath.pathname,
    },
    null,
    2,
  ),
)
