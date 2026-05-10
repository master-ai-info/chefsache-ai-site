import type { Metadata } from 'next'

import { absoluteUrl } from '@/lib/site'
import { LegalPage } from '../components/LegalPage'
import { datenschutzFallbackHtml } from '../legalFallbacks'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  alternates: {
    canonical: absoluteUrl('/datenschutzerklaerung'),
  },
  description: 'Datenschutzerklärung von Chefsache AI.',
  title: 'Datenschutzerklärung - Chefsache AI',
}

export default function DatenschutzPage() {
  return (
    <LegalPage
      fallbackHtml={datenschutzFallbackHtml}
      kicker="Datenschutz"
      sourcePageId={1428}
      sourceUrl="https://kms-projects.com/datenschutzerklaerung"
      title="Datenschutzerklärung"
    />
  )
}
