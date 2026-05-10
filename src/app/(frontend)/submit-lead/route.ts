import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

import config from '@/payload.config'

const requiredFields = ['name', 'email', 'currentSituation']

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Ungueltige Anfrage.' }, { status: 400 })
  }

  for (const field of requiredFields) {
    if (!body[field] || typeof body[field] !== 'string') {
      return NextResponse.json({ error: 'Bitte fuellen Sie alle Pflichtfelder aus.' }, { status: 400 })
    }
  }

  const payload = await getPayload({ config })

  await payload.create({
    collection: 'leads',
    data: {
      aiExperience: body.aiExperience || undefined,
      company: body.company || undefined,
      currentSituation: body.currentSituation,
      email: body.email,
      name: body.name,
      preferredContact: body.preferredContact || undefined,
      role: body.role || undefined,
      sourcePage: body.sourcePage || 'chefsache-ai-home',
      status: 'new',
      website: body.website || undefined,
    },
  })

  return NextResponse.json({ ok: true })
}
