'use client'

import React, { useEffect, useState } from 'react'

type ContactFormProps = {
  submitLabel?: string
  successMessage?: string
}

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm({
  submitLabel = 'Erstgespraech anfragen',
  successMessage = 'Danke. Ihre Anfrage wurde gespeichert.',
}: ContactFormProps) {
  const [mounted, setMounted] = useState(false)
  const [state, setState] = useState<FormState>('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState('submitting')
    setError('')

    const form = event.currentTarget
    const formData = new FormData(form)

    const response = await fetch('/submit-lead', {
      body: JSON.stringify(Object.fromEntries(formData.entries())),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    if (!response.ok) {
      const payload = await response.json().catch(() => null)
      setError(payload?.error || 'Die Anfrage konnte gerade nicht gespeichert werden.')
      setState('error')
      return
    }

    form.reset()
    setState('success')
  }

  if (!mounted) {
    return <div aria-hidden="true" className="contact-form contact-form-pending" />
  }

  return (
    <form autoComplete="on" className="contact-form" data-lpignore="true" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Name *
          <input autoComplete="name" data-lpignore="true" name="name" required type="text" />
        </label>
        <label>
          E-Mail *
          <input autoComplete="email" data-lpignore="true" name="email" required type="email" />
        </label>
        <label>
          Unternehmen
          <input autoComplete="organization" data-lpignore="true" name="company" type="text" />
        </label>
        <label>
          Rolle / Funktion
          <input autoComplete="organization-title" data-lpignore="true" name="role" type="text" />
        </label>
        <label>
          Website
          <input autoComplete="url" data-lpignore="true" name="website" type="url" />
        </label>
        <label>
          AI-Erfahrung
          <select autoComplete="off" data-lpignore="true" name="aiExperience">
            <option value="">Bitte waehlen</option>
            <option value="none">Kaum Erfahrung</option>
            <option value="first-tests">Erste Tests</option>
            <option value="regular-use">Regelmaessige Nutzung</option>
            <option value="company-use">Schon im Unternehmen im Einsatz</option>
          </select>
        </label>
      </div>
      <label>
        Haben Sie Wünschen oder Anmerkungen? *
        <textarea autoComplete="off" data-lpignore="true" name="currentSituation" required rows={5} />
      </label>
      <label>
        Gewuenschter Kontaktweg
        <select autoComplete="off" data-lpignore="true" name="preferredContact">
          <option value="">Bitte waehlen</option>
          <option value="email">E-Mail</option>
          <option value="phone">Telefon</option>
          <option value="linkedin">LinkedIn</option>
        </select>
      </label>
      <input name="sourcePage" type="hidden" value="chefsache-ai-home" />
      <button className="btn btn-primary" disabled={state === 'submitting'} type="submit">
        {state === 'submitting' ? 'Wird gespeichert ...' : submitLabel}
      </button>
      {state === 'success' && <p className="form-message success">{successMessage}</p>}
      {state === 'error' && <p className="form-message error">{error}</p>}
      <p className="form-note">
        Spam-Schutz und E-Mail-Benachrichtigung werden vor Produktivnahme ergaenzt.
      </p>
    </form>
  )
}
