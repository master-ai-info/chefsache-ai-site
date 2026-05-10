export const homePage = {
  pageTheme: 'dark-editorial' as const,
  publishedAt: new Date().toISOString(),
  sections: [
    {
      blockType: 'hero',
      cornerStampLabel: 'Chefsache AI',
      cornerStampText: 'Privates Executive AI Coaching',
      eyebrow: 'Nr. 01 · Executive AI Coaching',
      headline: 'Über AI entscheiden, ohne sie zu beherrschen, ist keine Strategie.',
      handwrittenNote: 'Auch für kleine Geschäftsführungsteams.',
      heroImageCaption: 'Über etwas entscheiden, das man nicht selbst beherrscht.',
      primaryCta: {
        label: 'Privates Erstgespräch',
        target: '#kontakt',
      },
      secondaryCta: {
        label: 'Wie wir arbeiten',
        target: '#ablauf',
      },
      subheadline:
        'Privates Coaching für Inhaber, Geschäftsführer und Vorstände, die AI für ihre eigene Arbeit erschließen - und auf dieser Grundlage entscheiden, wie weit es im Unternehmen gehen soll.',
      trustItems: [
        {
          label: 'Format',
          value: '1:1 oder kleines Führungsteam',
        },
        {
          label: 'Rahmen',
          value: 'Persönlich. Vertraulich. NDA möglich.',
        },
        {
          label: 'Sparringspartner',
          value: 'Kai Michael Schäfer',
        },
      ],
    },
    {
      attribution: 'Kai Michael Schäfer',
      blockType: 'text',
      body:
        'AI verändert, wie wir arbeiten, wie wir Arbeit bewerten und welche Entscheidungen heute noch tragfähig sind. Wer das nicht selbst erlebt, verliert die Grundlage für gute Entscheidungen.',
      headline: 'Manifest',
      kicker: 'Manifest',
      layout: 'two-column',
    },
    {
      blockType: 'text',
      body:
        'Entscheider hören heute genug über AI. Auf Konferenzen, in Artikeln, von Mitarbeitenden, aus Tool-Demos. Trotzdem entsteht daraus selten ein belastbares Bild für die eigene Rolle, den eigenen Arbeitsalltag und das eigene Unternehmen. Das Problem ist nicht fehlendes Wissen. Das Problem ist fehlende Anwendung.',
      headline: 'Aus Information entsteht noch keine Urteilsfähigkeit.',
      kicker: 'Befund',
      layout: 'two-column',
    },
    {
      blockType: 'problem',
      headline: 'Drei Lücken, die kein Konferenzbesuch schließt.',
      kicker: 'Status quo',
      problemItems: [
        {
          title: 'Zu viele Antworten. Zu wenig Einordnung.',
          description:
            'ChatGPT oder DSGVO-konforme Plattform? Automation oder Assistant? Persönliche Produktivität oder Enablement? Wer nicht täglich im Thema ist, erkennt schwer, was relevant ist und was nur laut klingt.',
        },
        {
          title: 'Delegieren kann man Aufgaben. Urteilskraft nicht.',
          description:
            'Natürlich braucht es IT, Fachbereiche und externe Berater. Nur: Wer AI nicht selbst nutzt, kann deren Empfehlungen nicht prüfen. Und entscheidet damit faktisch nicht mehr selbst.',
        },
        {
          title: 'Ohne eigene Praxis fehlt der Maßstab.',
          description:
            'AI verschiebt die Maßstäbe für Geschwindigkeit, Qualität und Aufwand. Wer diese neuen Maßstäbe nicht aus eigener Praxis kennt, führt nach Werten von gestern.',
        },
      ],
    },
    {
      blockType: 'pillars',
      headline: 'Einordnen. Anwenden. Erleben. Entscheiden.',
      intro:
        'Chefsache AI bringt AI aus der abstrakten Diskussion in Ihre Arbeitsrealität - entlang Ihrer Fragen, Ihrer Aufgaben, Ihrer Verantwortung.',
      pillars: [
        {
          title: 'Einordnung',
          description:
            'Sie entwickeln ein klares Bild davon, was AI für Wirtschaft, Gesellschaft, Ihr Unternehmen und Ihre Rolle bedeutet. Nicht als Zukunftsfolie. Als Entscheidungsgrundlage.',
        },
        {
          title: 'Anwendung',
          description:
            'Wir arbeiten an echten Aufgaben: Recherche, Analyse, Kommunikation, Entscheidungsvorlagen, Sparring. Sie erleben, wo AI Zeit spart, Qualität hebt und Denkprozesse erweitert.',
        },
        {
          title: 'Aha-Momente',
          description:
            'Der entscheidende Punkt ist der Moment, in dem Sie selbst spüren, was mit den richtigen Fragen, dem richtigen Kontext und dem richtigen Workflow möglich wird.',
        },
        {
          title: 'Unternehmensperspektive',
          description:
            'Aus persönlicher Anwendung entsteht eine fundierte Sicht auf Use Cases, Enablement-Wege, Risiken und die nächsten Schritte - bis hin zur Frage, ob ein AI-First-Modell für Sie sinnvoll wäre.',
        },
      ],
    },
    {
      blockType: 'audience',
      headline: 'Für Entscheider, die das Thema nicht weiter aus der Distanz betrachten wollen.',
      notSuitableFor: [
        { item: 'Wer die Verantwortung für das Thema vollständig abgeben will.' },
        { item: 'Organisationen, die direkt nach einem großen Rollout-Projekt suchen.' },
        { item: 'Teilnehmer, die fertige Antworten erwarten, ohne selbst am Werkzeug zu arbeiten.' },
        { item: 'Teams, die ein standardisiertes Gruppenformat für viele Mitarbeitende suchen.' },
      ],
      suitableFor: [
        { item: 'Inhaber und Unternehmer, die AI für sich und ihr Unternehmen einordnen wollen.' },
        { item: 'Geschäftsführer und Vorstände, die eigene Urteilskraft aufbauen wollen.' },
        { item: 'Entscheider mit wenig Zeit, hohem Anspruch und konkreten Fragen.' },
        { item: 'Geschäftsführungs-Tandems, die einen gemeinsamen Ausgangspunkt schaffen wollen.' },
        { item: 'Investoren und Beiräte, die AI für ihre Mandate seriös einschätzen müssen.' },
      ],
    },
    {
      blockType: 'experienceImage',
      headline: 'Ein Raum für Klarheit, Tiefe und neue Perspektiven.',
      imageAlt: 'Ruhige Arbeitsumgebung für eine vertrauliche 1:1-Coaching-Session.',
      imageSrc: '/images/private-executive-ai-session.png',
      kicker: 'Private Session',
      text:
        'Eine private Session - ohne Publikum, ohne Standardfolien, ohne Schaulauf. Ihre Fragen, Ihre Arbeitsrealität, die Entscheidungen, die als Nächstes anstehen.',
    },
    {
      blockType: 'process',
      headline: 'In Ihrer Geschwindigkeit. An Ihrer Realität.',
      intro:
        'Entscheider lernen nicht im Schulungsrhythmus. Termine, Tiefe und Schwerpunkte richten sich nach Ihrer Situation. Zwischen den Sessions entsteht die eigentliche Wirkung - durch Anwendung, Reflexion und die nächsten Fragen.',
      steps: [
        {
          title: 'Erstgespräch',
          description:
            'Wir klären, wo Sie stehen, was Sie erreichen wollen und ob Chefsache AI zu Ihrer Situation passt. Vertraulich, direkt, ohne vorbereitete Verkaufsdramaturgie.',
        },
        {
          title: 'Standortbestimmung',
          description:
            'Wir betrachten Ihre Rolle, Ihre Arbeitsrealität, Ihre bisherigen AI-Erfahrungen und die Entscheidungen, die vor Ihnen liegen.',
        },
        {
          title: 'Coaching-Sessions',
          description:
            'Sie arbeiten mit AI an echten Aufgaben. Wir sortieren Grundlagen, bauen Workflows auf, testen Tools, diskutieren strategische Implikationen und halten fest, was für Sie relevant ist.',
        },
        {
          title: 'Anwendung zwischen den Terminen',
          description:
            'Aus jeder Session entstehen konkrete nächste Schritte: ausprobieren, lesen, testen, reflektieren. So wächst Kompetenz nicht in der Theorie, sondern durch wiederholte Praxis.',
        },
        {
          title: 'Persönliche AI-Roadmap',
          description:
            'Am Ende steht Klarheit: Was verändert sich für Ihre Arbeit? Welche Use Cases sind relevant? Welche Entscheidungen stehen im Unternehmen an - und was sollte als Nächstes passieren?',
        },
      ],
    },
    {
      blockType: 'text',
      body:
        'Unternehmer seit 1997. Mehrere Gründungen, zwei Exits. Seit 2011 begleitet er Unternehmen bei Strategie, Digitalisierung, Sales und Marketing. Heute verbindet er diese Erfahrung mit eigener AI-Praxis: als Co-Founder von AI Transformation Partners in der Umsetzung mit dem Mittelstand und bei kms projects im Maschinenraum neuer AI-first-Geschäftsmodelle. Der Vorteil für Chefsache AI: Er redet nicht über Möglichkeiten. Er testet, baut und sortiert ein, was heute belastbar funktioniert - und was nur gut klingt.',
      headline: 'Kai Michael Schäfer.',
      kicker: 'Ihr Sparringspartner',
      layout: 'two-column',
    },
    {
      blockType: 'testimonials',
      headline: 'Was nach den ersten Aha-Momenten passiert.',
      kicker: 'Testimonials',
      testimonials: [
        {
          context: 'Unternehmer, erstes Coaching',
          person: 'Anonymisiert',
          quote:
            'Die erste Stunde hat mir vier Stunden pro Woche zurückgegeben. Genau diese Zeit investiere ich jetzt in das Thema.',
        },
        {
          context: 'Geschäftsführung, Mittelstand',
          person: 'Anonymisiert',
          quote:
            'Ich habe zum ersten Mal verstanden, was AI für meine eigene Arbeit bedeutet. Danach konnte ich anders über das Unternehmen sprechen.',
        },
        {
          context: 'Inhaber, Strategie und Produktivität',
          person: 'Anonymisiert',
          quote:
            'Vorher hatte ich viele Einzelinformationen. Nach dem Coaching hatte ich ein Bild - und wusste, welche Fragen ich stellen muss.',
        },
      ],
    },
    {
      blockType: 'articleTeasers',
      headline: 'Artikelvorschläge',
      intro:
        'Vertiefende Texte für Entscheider, die den Gedanken hinter Chefsache AI weiter prüfen wollen.',
      kicker: 'Essays',
      articles: [
        {
          category: 'Essay · Urteilsfähigkeit',
          excerpt:
            'Entscheider hören heute mehr über AI als je zuvor. Trotzdem entsteht daraus selten ein belastbares Bild. Warum Information und Urteilsfähigkeit nicht dasselbe sind - und was es stattdessen braucht.',
          readingTime: 'Konzept',
          title: 'Aus Information entsteht noch keine Urteilsfähigkeit',
        },
        {
          category: 'Essay · Management',
          excerpt:
            'AI-Themen wandern schnell zur IT, zu jungen Mitarbeitenden oder externen Beratern. Verständlich - aber strategisch riskant.',
          readingTime: 'Konzept',
          title: 'Die Delegationsfalle - warum AI nicht ohne den Chef funktioniert',
        },
        {
          category: 'Essay · Praxis',
          excerpt:
            'Die meisten Entscheider haben ChatGPT schon aufgemacht. Wenige haben daraus eine eigene Praxis entwickelt.',
          readingTime: 'Konzept',
          title: 'Vom Tool-Test zur persönlichen AI-Praxis',
        },
        {
          category: 'Essay · Enablement',
          excerpt:
            'Unternehmen, die AI ernst nehmen, haben fast immer eines gemeinsam: Der Chef hat es selbst erlebt.',
          readingTime: 'Konzept',
          title: 'Vom Aha-Moment zum AI-Enablement',
        },
      ],
    },
    {
      blockType: 'faq',
      faqs: [
        {
          answer:
            'Für Inhaber, Geschäftsführer, Vorstände, Investoren und Entscheider, die AI persönlich einordnen und anwenden wollen, bevor sie größere Entscheidungen für ihr Unternehmen treffen.',
          question: 'Für wen ist Chefsache AI gedacht?',
        },
        {
          answer:
            'Nein. Entscheidend ist nicht Ihr aktueller Wissensstand, sondern Ihre Bereitschaft, sich ernsthaft mit dem Thema auseinanderzusetzen. Wir starten dort, wo Sie stehen.',
          question: 'Muss ich bereits mit AI gearbeitet haben?',
        },
        {
          answer:
            'Ja. Chefsache AI ist auf 1:1-Arbeit ausgelegt, funktioniert aber auch mit Geschäftsführungs-Tandems, Inhaber-Duos oder einem sehr kleinen Entscheiderkreis.',
          question: 'Geht das auch zu zweit oder im kleinen Kreis?',
        },
        {
          answer:
            'Ein kleines Startpaket ab drei Stunden kann reichen, um Orientierung zu gewinnen. Wer Einordnung, persönliche Anwendung und Unternehmensperspektive ernsthaft verbinden will, sollte mit mindestens zehn Coachingstunden rechnen.',
          question: 'Wie viele Sessions sind sinnvoll?',
        },
        {
          answer:
            'Nicht schneller, als es zu Ihrer Realität passt. Manche Themen lassen sich in einem intensiven Halbtag schärfen. Häufiger ist ein Rhythmus von ein bis zwei Wochen sinnvoller, weil zwischen den Sessions Anwendung und Reflexion stattfinden.',
          question: 'Wie schnell läuft das ab?',
        },
        {
          answer:
            'Ja, aber nicht als Selbstzweck. Tools werden eingesetzt, wenn sie eine konkrete Aufgabe besser lösbar machen. Die wichtigere Frage lautet: Welche Arbeitsweise und welche Fragen führen zu besseren Ergebnissen?',
          question: 'Arbeiten wir mit konkreten Tools?',
        },
        {
          answer:
            'Ja. Vertraulichkeit ist Teil des Formats. Auf Wunsch arbeiten wir auf Basis einer Standard-NDA oder einer individuellen Geheimhaltungsvereinbarung.',
          question: 'Ist das vertraulich?',
        },
        {
          answer:
            'Dann kann der Übergang zu AI Transformation Partners sinnvoll sein. Chefsache AI schafft persönliche Urteilsfähigkeit. AI Transformation Partners begleitet die strukturierte Umsetzung im Unternehmen.',
          question: 'Was passiert, wenn daraus ein Unternehmensprojekt wird?',
        },
        {
          answer:
            'Das hängt von Umfang und Ausgangslage ab. Bereits ein kleines Startpaket bewegt sich im niedrigen vierstelligen Bereich. Die genauen Konditionen besprechen wir im Erstgespräch, sobald klar ist, welches Format zu Ihrer Situation passt.',
          question: 'Was kostet Chefsache AI?',
        },
      ],
      headline: 'Was Entscheider vor dem Erstgespräch wissen wollen.',
    },
    {
      blockType: 'cta',
      cta: {
        label: 'AI Transformation Partners kennenlernen',
        target: '#',
      },
      headline: 'Wenn aus persönlicher Klarheit ein Unternehmensprogramm wird.',
      text:
        'Chefsache AI beginnt beim Entscheider. Manchmal reicht das: bessere persönliche Anwendung, mehr Klarheit, fundiertere Entscheidungen. In vielen Fällen entsteht daraus der nächste Schritt - ein AI Audit, ein Enablement-Programm oder eine strukturierte Transformation im Unternehmen. An diesem Punkt übernimmt AI Transformation Partners.',
    },
    {
      blockType: 'contactForm',
      headline: 'Sprechen wir über Ihre Ausgangslage.',
      intro:
        'Wenn Sie AI für sich einordnen, produktiv nutzen und die nächsten Schritte im Unternehmen fundierter beurteilen wollen, schreiben Sie mir direkt. Ich antworte persönlich.',
      submitLabel: 'Anfrage senden',
      successMessage:
        'Vielen Dank. Ihre Anfrage liegt bei mir. Ich melde mich persönlich - in der Regel innerhalb von zwei Werktagen.',
    },
  ],
  seo: {
    description:
      'Persönliches 1:1 Coaching für Inhaber, Geschäftsführer und Vorstände, die AI für ihre eigene Arbeit erschließen - und auf dieser Grundlage entscheiden, wie weit es im Unternehmen gehen soll.',
    ogDescription:
      'Privates Sparring mit Kai Michael Schäfer. Sie bauen eigene AI-Praxis auf, gewinnen Urteilskraft und entscheiden danach mit Substanz - statt aus dem Bauch.',
    ogTitle: 'Chefsache AI - Executive AI Coaching für Entscheider',
    title: 'Chefsache AI - Privates Executive AI Coaching mit Kai Michael Schäfer',
  },
  slug: 'home',
  status: 'published' as const,
  title: 'Chefsache AI',
}
