export function SiteHeader() {
  return (
    <header className="site-nav">
      <div className="shell nav-inner">
        <a aria-label="Chefsache AI" className="wordmark" href="/">
          <span>Chefsache</span>
          <strong>AI</strong>
        </a>
        <nav aria-label="Hauptnavigation">
          <a href="/#coaching">Coaching</a>
          <a href="/#ablauf">Ablauf</a>
          <a href="/essays/warum-ai-chefsache-ist">Essays</a>
          <a href="/#faq">FAQ</a>
        </nav>
        <a className="btn btn-ghost" href="/#kontakt">
          Erstgespraech
        </a>
      </div>
    </header>
  )
}

export function SiteFooter({ articleLabel }: { articleLabel?: string }) {
  return (
    <footer className="site-footer shell">
      <div>
        <div className="wordmark">
          <span>Chefsache</span>
          <strong>AI</strong>
        </div>
        <p>
          Executive AI Coaching von Kai Michael Schaefer. AI Transformation Partners als
          naechster Schritt, wenn aus persoenlicher Praxis Unternehmensfaehigkeit wird.
        </p>
      </div>
      <div className="footer-links">
        <a href="/#kontakt">Kontakt</a>
        <a href="/impressum">Impressum</a>
        <a href="/datenschutzerklaerung">Datenschutz</a>
        <a href="mailto:info@chefsache-ai.com">info@chefsache-ai.com</a>
        {articleLabel ? <span>{articleLabel}</span> : null}
      </div>
    </footer>
  )
}
