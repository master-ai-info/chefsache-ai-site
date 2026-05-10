import type { Metadata } from 'next'

import { absoluteUrl } from '@/lib/site'
import { LegalPage } from '../components/LegalPage'
import { impressumFallbackHtml } from '../legalFallbacks'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  alternates: {
    canonical: absoluteUrl('/impressum'),
  },
  description: 'Impressum von Chefsache AI.',
  title: 'Impressum - Chefsache AI',
}

export default function ImpressumPage() {
  return (
    <LegalPage
      fallbackHtml={impressumFallbackHtml}
      kicker="Kontakt und Anbieter"
      sourcePageId={1423}
      sourceUrl="https://kms-projects.com/impressum"
      title="Impressum"
    />
  )
}
