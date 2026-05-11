import { getPayload } from 'payload'
import 'dotenv/config'

import config from './payload.config'
import { datenschutzFallbackHtml, impressumFallbackHtml } from './app/(frontend)/legalFallbacks'
import { homePage } from './content/homePage'

type RichTextChild = {
  children?: RichTextChild[]
  direction?: 'ltr' | null
  format?: '' | number
  id?: string
  indent?: number
  listType?: 'bullet' | 'number'
  mode?: 'normal'
  quoteType?: 'pullquote'
  start?: number
  style?: string
  tag?: 'h2' | 'h3' | 'ol' | 'ul'
  text?: string
  type: string
  version: number
  value?: number
  eyebrow?: string
}

const articleContent = richText([
  paragraph(
    'Es gibt einen Moment, der sich in fast jedem Vorstand wiederholt, mit dem ich arbeite. Das Thema AI taucht auf der Agenda auf, jemand nennt eine Zahl, jemand anderes nennt einen Anbieter, und nach zwanzig Minuten ist die Entscheidung gefallen, ein Pilotprojekt zu starten - verantwortet von der IT, begleitet durch eine Beratung, mit einem Steering Committee, das in zwei Quartalen Bericht erstattet.',
  ),
  paragraph(
    'So wird AI delegiert, bevor jemand am Tisch wirklich damit gearbeitet hat. Das Ergebnis kennen Sie: Pilotprojekte ohne Wirkung. Roadmaps, die der Realitaet der Werkzeuge nicht standhalten. Und ein Vorstand, der ueber etwas entscheidet, das er nicht selbst beherrscht.',
  ),
  heading(
    'ausgang',
    '§ I - Ausgangspunkt',
    'Der Unterschied zwischen Information und Erfahrung.',
  ),
  paragraph(
    'Sie haben in Ihrer Karriere viele Themen verstanden, ohne sie selbst zu tun. AI gehoert nicht dazu. Der Grund ist nicht technisch - er ist epistemisch. Aktuelle Modelle sind nicht deterministisch. Sie verhalten sich anders, je nachdem, wie Sie mit ihnen sprechen, welche Aufgabe Sie geben, welchen Kontext sie haben. Das laesst sich in Dokumenten beschreiben - aber nicht verstehen, ohne es einmal selbst getan zu haben.',
  ),
  paragraph(
    'Wer AI nur ueber Briefings kennt, entscheidet auf Basis fremder Erfahrung. Wer mit den Modellen arbeitet, sieht innerhalb weniger Stunden, wo sie tragfaehig sind und wo nicht - und welche Rolle die eigene Expertise dabei spielt. Diese beiden Zustaende sind nicht graduell verschieden. Sie sind zwei verschiedene Welten.',
  ),
  quote('Die wichtigste AI-Kompetenz im Unternehmen ist die des Entscheiders selbst.', 'pullquote'),
  heading('fehler', '§ II - Drei Fehler', 'Was ich taeglich sehe.'),
  paragraph(
    'In nahezu jedem Mandat begegnen mir dieselben drei Muster. Sie wiederholen sich unabhaengig von Branche und Unternehmensgroesse:',
  ),
  list('number', [
    listItem([
      strongText('AI wird zu frueh delegiert. '),
      textNode(
        'An die IT, an externe Berater, an Mitarbeiter, die das Unternehmen weniger gut kennen als der Vorstand selbst. Die operative Verantwortung wandert nach unten - und damit das Verstaendnis.',
      ),
    ]),
    listItem([
      strongText('Entscheidungen vor der Erfahrung. '),
      textNode(
        'Tool-Stacks und Roadmaps werden gewaehlt, bevor jemand im Vorstand mit den Werkzeugen wirklich gearbeitet hat. Wer nicht selbst getippt hat, kann nicht beurteilen, was moeglich ist.',
      ),
    ]),
    listItem([
      strongText('Strategie ersetzt keine Praxis. '),
      textNode(
        'Folien ueber AI-Transformation ueberzeugen niemanden, dessen Tag mit der Realitaet der Modelle beginnt. Mitarbeiter spueren sofort, ob ihr CEO die Werkzeuge benutzt - oder nur ueber sie spricht.',
      ),
    ]),
  ]),
  heading(
    'praxis',
    '§ III - Praxis statt Strategie',
    'Was im Coaching tatsaechlich passiert.',
  ),
  paragraph(
    'Wir arbeiten nicht an Beispielen. Wir arbeiten an Ihren echten Mails, Ihren echten Vorlagen, Ihrer echten Vorstandsvorbereitung. In den ersten vier Sitzungen geht es fast ausschliesslich darum, dass Sie die Werkzeuge selbst oeffnen und benutzen - mit mir daneben, der zeigt, was sich lohnt und was nicht. Erst wenn das sitzt, kommen die strategischen Fragen.',
  ),
  subheading('Drei Linien, die wir immer aufbauen.'),
  list('bullet', [
    listItem([
      textNode('Eine '),
      strongText('persoenliche Werkzeug-Praxis'),
      textNode(', die Sie nach drei Wochen ohne Hilfe weiterfuehren.'),
    ]),
    listItem([
      textNode('Eine '),
      strongText('Bewertungssprache'),
      textNode(
        ', mit der Sie eingehende Vorschlaege von Beratern, von der IT und vom Aufsichtsrat selbst einordnen koennen.',
      ),
    ]),
    listItem([
      textNode('Eine '),
      strongText('klare Linie'),
      textNode(', was Sie an Ihre Organisation delegieren - und was Sie nicht delegieren duerfen.'),
    ]),
  ]),
  heading('konsequenz', '§ IV - Konsequenz', 'Warum das nicht jeder will.'),
  paragraph(
    'Coaching dieser Art ist unbequem. Es nimmt drei Stunden pro Woche, es zwingt zur Auseinandersetzung mit Werkzeugen, die sich anfuehlen, als gehoerten sie einer juengeren Generation. Es ersetzt das saubere Format eines Beratungsmandats durch die Muehe der eigenen Praxis.',
  ),
  paragraph(
    'Genau das ist der Punkt. Wenn AI Chefsache wird, kann sie nicht delegiert werden. Wenn sie delegiert wird, ist sie nicht Chefsache. Beides zugleich gibt es nicht.',
  ),
  quote(
    'Wer die wichtigsten Werkzeuge seines Jahrzehnts nicht selbst beherrscht, entscheidet ueber Karten, die andere fuer ihn gezeichnet haben. - Aus dem Manifest, 2026',
  ),
])

const manifestArticle = {
  articleCta: {
    headline: 'Sprechen Sie mit mir, bevor Sie die naechste AI-Roadmap unterschreiben.',
    label: 'Erstgespraech vereinbaren',
    target: '/#kontakt',
    text:
      'Im Erstgespraech klaeren wir in 30 Minuten, ob persoenliches Coaching zu Ihrer Situation passt - und wo der erste Hebel liegt. Kostenfrei, vertraulich, ohne Verkaufsgespraech.',
  },
  authorName: 'Kai Michael Schaefer',
  authorBio:
    'Kai Michael Schaefer ist Unternehmer, Berater und Venture Builder. Seit 1997 baut und begleitet er digitale Unternehmen. Mit Chefsache AI arbeitet er mit Entscheidern daran, kuenstliche Intelligenz persoenlich zu verstehen, praktisch anzuwenden und fundierter ueber Unternehmensfragen zu entscheiden.',
  authorImageSrc: '/images/kai-michael-schaefer-portrait.jpg',
  authorRole: 'Executive Coach',
  category: 'Essay · Manifest',
  content: articleContent,
  excerpt:
    'Die meisten Vorstaende delegieren AI, bevor sie selbst verstanden haben, worueber sie entscheiden. Ein Plaedoyer fuer persoenliche Praxis statt delegierter Strategie.',
  heroImageCaption: 'Platzhalter · Coaching-Sitzung, Frankfurt am Main',
  heroImageSrc: '/images/private-executive-ai-session.png',
  publishedAt: '2026-03-14T00:00:00.000Z',
  readingTime: '9 Minuten',
  seo: {
    description:
      'Essay von Kai Michael Schaefer. Warum die wichtigste AI-Kompetenz im Unternehmen die des Entscheiders selbst ist.',
    title: 'Warum AI Chefsache ist - Chefsache AI',
  },
  slug: 'warum-ai-chefsache-ist',
  status: 'published' as const,
  title: 'Warum AI Chefsache ist - und keine IT-Aufgabe.',
  _status: 'published' as const,
}

const referenceArticleContent = richText([
  paragraph(
    'Dieser Beitrag ist ein Musterartikel fuer das spaetere Live-System. Er soll nicht finale Marken-Copy sein, sondern zeigen, welche redaktionellen Module ein Chefsache-AI-Essay tragen kann: Text, Bild, Grafik, Zitat, handschriftliche Notiz, Tabelle und CTA.',
  ),
  heading('ausgangslage', '§ I - Ausgangslage', 'Ein Artikel darf mehr koennen als Fliesstext.'),
  paragraph(
    'Viele Executive-Themen brauchen Ruhe im Text, aber auch optische Orientierung. Ein gutes Artikellayout laesst Leser schnell erfassen, wo sie stehen, ohne aus der Konzentration zu fallen.',
  ),
  paragraph(
    'Die folgenden Module sind bewusst als Referenz gesetzt. Im Live-System koennen sie durch agentische Pflege mit echten Inhalten, Bildern und freigegebenen Aussagen ersetzt werden.',
  ),
  heading('module', '§ II - Module', 'Welche Bausteine im Artikel Sinn machen.'),
  paragraph(
    'Nicht jedes Landingpage-Modul gehoert in einen Artikel. Sinnvoll sind Bausteine, die Argumente rhythmisieren: ein Bild fuer Kontext, ein Zitat fuer Haltung, eine kurze Notiz fuer redaktionelle Naehe und eine Tabelle fuer Unterschiede.',
  ),
])

const referenceArticle = {
  articleCta: {
    headline: 'Der naechste Schritt ist ein echtes Gespraech, kein weiterer Musterartikel.',
    label: 'Erstgespraech anfragen',
    target: '/#kontakt',
    text:
      'Wenn Sie AI fuer sich selbst greifbar machen wollen, klaeren wir im Erstgespraech, welches Format zu Ihrer Situation passt.',
  },
  authorName: 'Kai Michael Schaefer',
  authorBio:
    'Kai Michael Schaefer ist Unternehmer, Berater und Venture Builder. In Chefsache AI verbindet er langjaehrige Digital-, Strategie- und Umsetzungserfahrung mit eigener AI-Praxis fuer Entscheider.',
  authorImageSrc: '/images/kai-michael-schaefer-portrait.jpg',
  authorRole: 'Executive AI Coach',
  category: 'Referenz · Module',
  content: referenceArticleContent,
  contentModules: [
    {
      blockType: 'articleImage',
      caption: 'Referenzmodul · Bildintegration im Essay',
      headline: 'Ein Bildmoment, der den Artikel atmen laesst.',
      imageAlt:
        'Dunkler Executive-Arbeitsraum mit Laptop, Notizbuch und Glas Wasser als Symbol fuer private AI Coaching Sessions',
      imageSrc: '/images/private-executive-ai-session.png',
      kicker: 'Bildmodul',
      layout: 'wide',
      text:
        'Breite Bildmodule funktionieren gut, wenn ein Essay nach mehreren Textabschnitten einen ruhigen visuellen Anker braucht.',
    },
    {
      attribution: 'Redaktionelle Haltung · Chefsache AI',
      blockType: 'articleQuote',
      quote:
        'Ein guter Executive-Artikel erklaert nicht nur. Er gibt dem Leser einen Moment, in dem die eigene Entscheidungssituation sichtbar wird.',
      variant: 'pull',
    },
    {
      blockType: 'articleHandNote',
      label: 'Randnotiz',
      text:
        'Hier darf spaeter eine persoenliche Beobachtung stehen - kurz, handschriftlich, nicht zu sauber.',
    },
    {
      blockType: 'articleInsightIndex',
      headline: 'Drei Fragen, die ein Artikel sichtbar machen kann.',
      items: [
        {
          label: 'Worum geht es wirklich?',
          text:
            'Die zentrale Spannung des Beitrags muss schnell greifbar werden.',
        },
        {
          label: 'Was veraendert sich fuer Entscheider?',
          text:
            'Der Bezug zur Rolle sollte konkreter sein als ein allgemeiner Trendtext.',
        },
        {
          label: 'Was ist der naechste sinnvolle Schritt?',
          text:
            'Ein Essay darf Orientierung geben, ohne sofort beratungsrhetorisch zu werden.',
        },
      ],
      kicker: 'Insight Index',
    },
    {
      blockType: 'articleComparisonTable',
      headline: 'Tabelle im Editorial-Look.',
      kicker: 'Vergleich',
      leftHeader: 'Normaler Blog',
      rightHeader: 'Chefsache AI Essay',
      rows: [
        {
          label: 'Funktion',
          left: 'Information vermitteln und Suchintention bedienen.',
          right: 'Einordnung, Haltung und Entscheidungsklarheit herstellen.',
        },
        {
          label: 'Rhythmus',
          left: 'Absatz folgt auf Absatz, visuelle Pausen entstehen selten.',
          right: 'Text, Zitat, Bild, Notiz und Tabelle wechseln kontrolliert.',
        },
        {
          label: 'CTA',
          left: 'Am Ende steht ein generischer Kontaktverweis.',
          right: 'Der naechste Schritt wird passend zur Argumentation platziert.',
        },
      ],
    },
    {
      blockType: 'articleCallout',
      headline: 'Ein Infokasten fuer Dinge, die nicht in den Hauptfluss gehoeren.',
      kicker: 'Executive Note',
      text:
        'Callouts eignen sich fuer Definitionen, methodische Hinweise oder kurze Kontextwechsel. Sie sollten selten sein und eine klare Funktion haben.',
    },
    {
      blockType: 'articleImage',
      caption: 'Referenzmodul · vertraulicher Rahmen',
      headline: 'Auch vertrauliche Themen koennen visuell gesetzt werden.',
      imageAlt:
        'Dunkler Executive-Arbeitstisch mit geschlossener Mappe, Laptop und vertraulichen Unterlagen als Symbol fuer geschuetztes AI Coaching',
      imageSrc: '/images/confidential-executive-ai-session.png',
      kicker: 'Vertraulichkeit',
      layout: 'inline',
      text:
        'Inline-Bilder sind kompakter und eignen sich fuer thematische Vertiefungen innerhalb eines laengeren Beitrags.',
    },
    {
      blockType: 'articleInlineCta',
      headline: 'Wenn der Artikel einen Punkt trifft, darf der CTA nah dran sein.',
      label: 'Anfrage starten',
      target: '/#kontakt',
      text:
        'Dieser Inline-CTA zeigt, wie eine konkrete Handlungsoption mitten im Beitrag aussehen kann.',
    },
  ],
  excerpt:
    'Ein Musterartikel fuer das spaetere Live-System: Bildmodule, Zitate, handschriftliche Notizen, Index, Tabelle, Callout und CTA im Chefsache-AI-Look.',
  heroImageCaption: 'Referenzartikel · Module fuer Essays und Blogbeitraege',
  heroImageSrc: '/images/confidential-executive-ai-session.png',
  publishedAt: '2026-05-10T00:00:00.000Z',
  readingTime: '8 Minuten',
  seo: {
    description:
      'Referenzartikel fuer Chefsache AI mit allen wichtigen visuellen Essay-Modulen im CMS.',
    title: 'Referenzartikel fuer Essay-Module - Chefsache AI',
  },
  slug: 'referenzartikel-fuer-essay-module',
  status: 'draft' as const,
  title: 'Referenzartikel fuer Essay-Module.',
  _status: 'draft' as const,
}

const fullModuleArticle = {
  articleCta: {
    headline: 'Wenn Sie Ihre eigene AI-Woche ernsthaft beginnen wollen.',
    label: 'Erstgespräch anfragen',
    target: '/#kontakt',
    text:
      'Im Erstgespräch klären wir, welche Aufgaben, Fragen und Entscheidungen sich für ein persönliches Executive AI Coaching eignen.',
  },
  authorName: 'Kai Michael Schaefer',
  authorBio:
    'Kai Michael Schaefer ist Unternehmer, Berater und Venture Builder. In Chefsache AI arbeitet er mit Entscheidern an persönlicher AI-Praxis, Urteilsfähigkeit und dem Transfer in die Organisation.',
  authorImageSrc: '/images/kai-michael-schaefer-portrait.jpg',
  authorRole: 'Executive AI Coach',
  category: 'Praxis · Fiktiver Bericht',
  content: richText([
    paragraph(
      'Der folgende Artikel ist ein fiktiver Praxisbericht. Er zeigt, wie ein längerer Chefsache-AI-Essay mit echtem Fließtext, Bildern, Notizen, Tabellen, Callouts und CTAs wirken kann.',
    ),
    paragraph(
      'Die Handlung ist erfunden, aber die Situationen sind bewusst nah an typischen Executive-Fragen gebaut: wenig Zeit, viele Stimmen, ein Thema, das strategisch groß wirkt und im eigenen Alltag noch erstaunlich unfassbar bleibt.',
    ),
  ]),
  contentModules: [
    {
      blockType: 'articleText',
      content: richText([
        heading('montag', '§ I - Montag', 'Der Moment, in dem Delegation nicht mehr reicht.'),
        paragraph(
          'Montagmorgen, 7:42 Uhr. Der CEO eines mittelständischen Industrieunternehmens sitzt vor einer Entscheidungsvorlage zur AI-Roadmap. Drei Pilotprojekte, zwei Anbieter, ein Budgetrahmen, neun Seiten Risikoanalyse. Alles wirkt ordentlich. Und trotzdem bleibt ein störendes Gefühl: Er entscheidet über ein Thema, das er selbst noch nicht wirklich benutzt.',
        ),
        paragraph(
          'Das ist der eigentliche Anfang der Woche. Nicht ein Tool, nicht ein Prompt, nicht eine neue Plattform. Sondern die Erkenntnis, dass AI als Führungsthema nicht verstanden wird, solange sie ausschließlich durch fremde Zusammenfassungen erscheint.',
        ),
      ]),
      kicker: 'Fließtext',
    },
    {
      blockType: 'articleImage',
      caption: 'Fiktiver Praxisbericht · private Executive Session',
      headline: 'Ein ruhiger Arbeitsraum verändert die Qualität der Fragen.',
      imageAlt:
        'Dunkler Executive-Arbeitsraum mit Laptop, Notizbuch und Glas Wasser als Symbol fuer private AI Coaching Sessions',
      imageSrc: '/images/private-executive-ai-session.png',
      kicker: 'Session',
      layout: 'wide',
      text:
        'Das Bildmodul unterbricht den Text nicht dekorativ, sondern setzt eine Szene: konzentriert, privat, ohne Bühnenlogik.',
    },
    {
      blockType: 'articleText',
      content: richText([
        heading('dienstag', '§ II - Dienstag', 'Die erste eigene Aufgabe statt der nächsten Demo.'),
        paragraph(
          'Am zweiten Tag geht es nicht um eine Tool-Demo. Der CEO bringt ein echtes Dokument mit: eine unklare strategische Notiz, halb Vorstandsvorlage, halb Gedankenprotokoll. Genau daran beginnt die Arbeit. Nicht weil das Dokument besonders kompliziert wäre, sondern weil es seine Arbeitsweise sichtbar macht.',
        ),
        paragraph(
          'Das Modell wird nicht als Antwortmaschine benutzt. Es wird zum Gesprächspartner, zum Strukturierer, zum Gegenleser. Nach zwanzig Minuten ist nicht alles gelöst, aber etwas anderes passiert: Der Entscheider erkennt, welche Teile seiner eigenen Expertise für gute Ergebnisse unverzichtbar sind.',
        ),
      ]),
      kicker: 'Praxis',
    },
    {
      blockType: 'articleHandNote',
      label: 'Randnotiz',
      text:
        'Der Aha-Moment entsteht selten beim Tool. Er entsteht, wenn die eigene Arbeit plötzlich anders sichtbar wird.',
    },
    {
      blockType: 'articleInsightIndex',
      headline: 'Drei Verschiebungen nach den ersten Stunden.',
      items: [
        {
          label: 'Vom Tool zur Arbeitsweise',
          text:
            'Die Frage lautet nicht mehr, welches Tool am meisten kann, sondern welche Aufgabe anders bearbeitet werden sollte.',
        },
        {
          label: 'Von Kontrolle zu Urteilskraft',
          text:
            'Der Entscheider muss nicht jeden Prompt selbst schreiben, aber er muss Qualität und Richtung beurteilen können.',
        },
        {
          label: 'Von Strategie zu Praxis',
          text:
            'Die Roadmap wird belastbarer, wenn sie aus eigener Anwendung heraus gelesen wird.',
        },
      ],
      kicker: 'Index',
    },
    {
      blockType: 'articleText',
      content: richText([
        heading('mittwoch', '§ III - Mittwoch', 'Warum die Organisation erst später kommt.'),
        paragraph(
          'Zur Wochenmitte taucht die naheliegende Frage auf: Wann holen wir die Organisation dazu? Die Antwort ist unbequem: noch nicht sofort. Nicht aus Geheimhaltung, sondern aus Präzision. Wer zu früh skaliert, skaliert oft Unklarheit.',
        ),
        paragraph(
          'In dieser Phase ist das Coaching ein geschützter Raum. Dort dürfen Fragen stehen bleiben, die in einem größeren Kreis sofort politisch würden: Was kann mein Führungsteam wirklich? Welche Routinen werden überflüssig? Wo überschätzen wir unsere Datenlage? Was verstehe ich selbst noch nicht?',
        ),
      ]),
      kicker: 'Einordnung',
    },
    {
      blockType: 'articleComparisonTable',
      headline: 'Was sich im Verlauf der Woche verschiebt.',
      kicker: 'Tabelle',
      leftHeader: 'Vor der eigenen Praxis',
      rightHeader: 'Nach den ersten Sessions',
      rows: [
        {
          label: 'Roadmap',
          left: 'Eine Sammlung plausibler Initiativen und Anbieteroptionen.',
          right: 'Eine priorisierte Sicht darauf, wo AI im eigenen Kontext zuerst Wirkung erzeugt.',
        },
        {
          label: 'Führung',
          left: 'Delegation an IT, Projektteam oder externe Beratung.',
          right: 'Bessere Fragen, klarere Qualitätskriterien und bewusstere Delegation.',
        },
        {
          label: 'Produktivität',
          left: 'Ein abstraktes Versprechen, das schwer messbar bleibt.',
          right: 'Konkrete Beispiele aus eigener Arbeit, die Zeit, Tiefe oder Qualität verändern.',
        },
      ],
    },
    {
      blockType: 'articleCallout',
      headline: 'Vertraulichkeit ist kein Randdetail.',
      kicker: 'Executive Note',
      text:
        'Gerade in frühen AI-Fragen geht es oft um unfertige Gedanken, interne Spannungen und persönliche Unsicherheiten. Ein geschützter Rahmen macht diese Themen bearbeitbar, bevor daraus ein Organisationsprogramm wird.',
    },
    {
      blockType: 'articleImage',
      caption: 'Fiktiver Praxisbericht · vertraulicher Rahmen',
      headline: 'Manche Fragen brauchen erst einen kleinen Kreis.',
      imageAlt:
        'Dunkler Executive-Arbeitstisch mit geschlossener Mappe, Laptop und vertraulichen Unterlagen als Symbol fuer geschuetztes AI Coaching',
      imageSrc: '/images/confidential-executive-ai-session.png',
      kicker: 'Vertraulich',
      layout: 'inline',
      text:
        'Das kompaktere Bildmodul bleibt näher am Text und eignet sich für thematische Vertiefungen.',
    },
    {
      attribution: 'Fiktiver Mandatsmoment',
      blockType: 'articleQuote',
      quote:
        'Ich habe in dieser Woche nicht gelernt, AI zu kontrollieren. Ich habe gelernt, bessere Fragen an Arbeit zu stellen.',
      variant: 'compact',
    },
    {
      blockType: 'articleText',
      content: richText([
        heading('freitag', '§ IV - Freitag', 'Aus Erfahrung wird eine andere Entscheidung.'),
        paragraph(
          'Am Freitag liegt dieselbe Roadmap wieder auf dem Tisch. Sie ist nicht falsch geworden. Aber sie wird anders gelesen. Einzelne Projekte wirken plötzlich zu groß, andere zu zögerlich. Ein Anbieter, der am Montag überzeugend klang, beantwortet eine entscheidende Frage nicht. Ein interner Use Case, der unscheinbar wirkte, bekommt Priorität.',
        ),
        paragraph(
          'Das ist kein magischer Effekt. Es ist der Unterschied zwischen Information und Erfahrung. Wer selbst mit AI gearbeitet hat, liest Vorschläge anders. Er hört in Meetings andere Lücken. Er erkennt schneller, wann ein Team wirklich gelernt hat und wann nur neue Begriffe benutzt werden.',
        ),
      ]),
      kicker: 'Konsequenz',
    },
    {
      blockType: 'articleInlineCta',
      headline: 'Ihre erste AI-Woche muss nicht öffentlich beginnen.',
      label: 'Vertraulich anfragen',
      target: '/#kontakt',
      text:
        'Wenn Sie herausfinden möchten, welche Fragen in Ihrem Kontext zuerst bearbeitet werden sollten, beginnt der nächste Schritt mit einem kurzen vertraulichen Gespräch.',
    },
  ],
  excerpt:
    'Ein fiktiver Praxisbericht mit vollem Artikel-Rüstzeug: echter Fließtext, Bildmodule, Notiz, Index, Tabelle, Callout, Quote und CTA im Chefsache-AI-Look.',
  heroImageCaption: 'Fiktiver Praxisbericht · Eine Woche Executive AI Coaching',
  heroImageSrc: '/images/private-executive-ai-session.png',
  publishedAt: '2026-05-10T00:00:00.000Z',
  readingTime: '11 Minuten',
  seo: {
    description:
      'Fiktiver Chefsache-AI-Praxisbericht mit allen wichtigen Artikelmodulen und Fließtext.',
    title: 'Eine fiktive AI-Coaching-Woche - Chefsache AI',
  },
  slug: 'eine-fiktive-ai-coaching-woche',
  status: 'draft' as const,
  title: 'Eine fiktive AI-Coaching-Woche.',
  _status: 'draft' as const,
}

const aiJudgementArticle = {
  articleCta: {
    headline: 'Weiterlesen: Chefsache AI',
    label: 'Zur Chefsache AI Übersicht',
    target: '/#coaching',
    text:
      'Wenn dieser Artikel den richtigen Nerv getroffen hat, lohnt der Blick auf das Format dahinter — ein 1:1-Coaching für Inhaber, Geschäftsführer und Vorstände, die AI für ihre eigene Arbeit erschließen wollen.',
  },
  authorName: 'Kai Michael Schäfer',
  authorBio:
    'Kai Michael Schäfer ist Unternehmer seit 1997, mit zwei Exits und seit 2011 Strategieberater für Digitalisierung. Heute verbindet er diese Erfahrung mit eigener AI-Praxis — als Co-Founder von AI Transformation Partners und im Maschinenraum neuer AI-first-Geschäftsmodelle bei kms projects.',
  authorImageSrc: '/images/kai-michael-schaefer-portrait.jpg',
  authorRole: 'Executive AI Coach',
  category: 'Essay · Führung & AI',
  content: richText([
    paragraph(
      'Es gibt einen Moment in vielen Geschäftsführungsgesprächen, der sich inzwischen wiederholt. Irgendjemand bringt das Thema AI auf, der Tisch nickt, jemand referiert eine Konferenz oder zitiert eine McKinsey-Studie, und am Ende sind alle bestens informiert — ohne dass ein Einziger im Raum die Technologie ernsthaft selbst genutzt hätte.',
    ),
    paragraph('Das ist keine Boshaftigkeit. Das ist Alltag. Und es ist ein Problem.'),
    paragraph(
      'Über AI ist in den letzten zwei Jahren mehr gesagt, geschrieben und prognostiziert worden als über fast jede andere Technologie der Gegenwart. Wer wollte, hätte längst eine Meinung haben können. Viele haben auch eine. Nur: Eine Meinung ist nicht dasselbe wie ein Urteil. Und ein Urteil, das ausschließlich auf Konferenzbesuchen, Beraterfolien und den Erzählungen anderer beruht, trägt nicht so weit, wie es müsste — schon gar nicht bei einer Technologie, die gerade die Spielregeln umschreibt.',
    ),
    paragraph(
      'Dieser Text ist kein Plädoyer für Begeisterung. Er ist ein Plädoyer für Erfahrung. Aus einem Grund, der für Inhaber und Geschäftsführer unangenehmer ist, als er auf den ersten Blick wirkt.',
    ),
  ]),
  contentModules: [
    {
      attribution: 'Chefsache AI',
      blockType: 'articleQuote',
      quote:
        'Eine Meinung ist nicht dasselbe wie ein Urteil.',
      variant: 'compact',
    },
    {
      blockType: 'articleText',
      content: richText([
        heading('briefen', '§ I - Trugschluss', 'Der erste Trugschluss: „Ich lasse mir das briefen.“'),
        paragraph(
          'Ein Geschäftsführer, der nie eine Bilanz gelesen hat, würde im Zweifel nicht über Investitionsentscheidungen abstimmen. Bei AI gilt diese Regel auf einmal nicht mehr. Hier wird gebrieft, präsentiert, eingeschätzt und entschieden — auf Basis fremder Hände, fremder Erfahrung, fremder Begeisterung. Das funktioniert eine Weile. Bei Steuerrecht funktioniert es sogar dauerhaft. Bei AI nicht.',
        ),
        paragraph(
          'Der Unterschied liegt im Charakter der Technologie. AI ist kein abgegrenztes Fachgebiet, das sich delegieren lässt wie Compliance oder Lohnbuchhaltung. AI ist ein Werkzeug, das die Art verändert, wie Wissensarbeit entsteht — von der Recherche über die Analyse bis zur Kommunikation. Wer nicht selbst erlebt hat, wie sich diese Arbeit verändert, kennt die neuen Maßstäbe nicht. Und wer die Maßstäbe nicht kennt, kann den Output seines Unternehmens schlicht nicht mehr einordnen.',
        ),
        paragraph(
          'Es gibt einen Satz, der das auf den Punkt bringt — und der vielen Entscheidern beim ersten Hören nicht gefällt: Wer AI nicht selbst nutzt, kann auf Dauer auch die Empfehlungen derer nicht mehr beurteilen, die es tun. Im Zweifel auch nicht die der eigenen Mitarbeitenden.',
        ),
        paragraph(
          'Das ist nicht polemisch gemeint. Es ist die nüchterne Konsequenz daraus, dass eine Technologie an Reichweite gewinnt, die Standards verschiebt, ohne dass die Verschiebung in den klassischen Reportings auftaucht. Wer hier nichts tut, fällt nicht heute zurück. Er fällt zurück, ohne es zu merken.',
        ),
      ]),
      kicker: 'Einordnung',
    },
    {
      blockType: 'articleText',
      content: richText([
        heading('veraenderung', '§ II - Maßstab', 'Was sich wirklich verändert'),
        paragraph(
          'Die meisten Diskussionen über AI drehen sich um Tools, Anbieter und Use Cases. Das ist verständlich, aber es verfehlt den Kern. Die eigentliche Veränderung findet nicht auf der Tool-Ebene statt, sondern auf der Maßstabs-Ebene.',
        ),
        paragraph(
          'Ein paar Beispiele aus der Praxis — ohne Anekdoten-Charakter, weil sie sich in nahezu jedem Unternehmen reproduzieren lassen:',
        ),
        paragraph(
          'Eine fundierte Wettbewerbsanalyse, die früher zwei Tage Recherche brauchte, ist heute in 90 Minuten möglich — mit einer Qualität, die für 80 Prozent aller Geschäftsentscheidungen ausreicht. Eine Entscheidungsvorlage, deren Erstellung typischerweise eine halbe Woche kostet, lässt sich in einem strukturierten Vormittag aufsetzen, ohne dass die Tiefe leidet. Texte, Auswertungen, erste Versionen von Konzepten entstehen in Zeiträumen, die vor zwei Jahren als unrealistisch galten.',
        ),
        paragraph(
          'Wer das selbst erlebt hat, sieht den eigenen Betrieb mit anderen Augen. Plötzlich wird sichtbar, wo Aufwand entsteht, der nicht mehr entstehen müsste. Wo Geschwindigkeit möglich wäre, wo heute auf Routine vertraut wird. Wo Mitarbeitende längst mit AI arbeiten — und wo sie es noch nicht tun.',
        ),
        paragraph(
          'Wer es nicht selbst erlebt hat, sieht das alles nicht. Und führt das Unternehmen nach Maßstäben, die in Teilen schon nicht mehr gelten. Das ist keine Schande. Aber es ist auch nichts, womit man sich auf Dauer komfortabel einrichten sollte.',
        ),
      ]),
      kicker: 'Praxis',
    },
    {
      attribution: 'Kai Michael Schäfer',
      blockType: 'articleQuote',
      quote:
        'Wer den Output seiner eigenen Organisation nicht mehr einschätzen kann, hat kein AI-Problem. Er hat ein Führungsproblem.',
      variant: 'pull',
    },
    {
      blockType: 'articleText',
      content: richText([
        heading('einwaende', '§ III - Einwände', 'Drei Einwände — und warum sie nicht tragen'),
        paragraph(
          'An dieser Stelle melden sich erfahrungsgemäß drei Einwände, die jede ernsthafte Auseinandersetzung mit dem Thema kennt. Sie sind nachvollziehbar. Sie tragen trotzdem nicht.',
        ),
        paragraph(
          'Der erste lautet: „Dafür habe ich Mitarbeiter.“ — Stimmt. Die Frage ist nur, wer die Mitarbeiter führt, die mit AI arbeiten, wenn die Führung selbst nicht weiß, wozu AI in der Lage ist. Empfehlungen lassen sich nur dort prüfen, wo eigene Erfahrung existiert. Sonst entscheidet, wer am überzeugendsten präsentiert. Das ist selten dieselbe Person, die am klügsten geurteilt hätte.',
        ),
        paragraph(
          'Der zweite lautet: „Ich habe keine Zeit.“ — Auch das stimmt. Die Frage ist nur, wofür die Zeit gerade nicht reicht. AI verändert in den ersten Wochen vor allem eines: Sie schenkt Zeit zurück. Wer drei Stunden pro Woche in eigene Praxis investiert, gewinnt nach kurzer Zeit deutlich mehr Stunden, als er hineingibt. Das ist keine Marketingaussage, sondern eine schlichte Beobachtung aus zahlreichen Coaching-Verläufen. „Keine Zeit“ ist in den meisten Fällen ein anderes Wort für „falsche Priorität“.',
        ),
        paragraph(
          'Der dritte lautet: „Ich verstehe das Technische nicht.“ — Das ist der ehrlichste Einwand und gleichzeitig der irrelevanteste. Niemand verlangt, dass ein Geschäftsführer ein Sprachmodell programmiert. Verlangt wird, dass er den eigenen Arbeitsalltag mit AI durchläuft, oft genug, um ein Gefühl dafür zu entwickeln, was funktioniert, was scheitert und was nur gut klingt. Das ist keine technische, sondern eine handwerkliche Aufgabe. Und sie ist deutlich näher an dem, was Inhaber ohnehin den ganzen Tag tun, als an irgendeiner Form von IT.',
        ),
      ]),
      kicker: 'Widerstand',
    },
    {
      blockType: 'articleCallout',
      headline: 'Was AI-Anwender-Kompetenz für Entscheider wirklich heißt',
      kicker: 'Infobox',
      text: [
        '- Eigene wiederkehrende Aufgaben mit AI durchspielen — und zwar diejenigen, die Verantwortung tragen, nicht die nebensächlichen.',
        '- Den Unterschied zwischen einer guten und einer schlechten AI-Antwort selbst erkennen können — was nur entsteht, wenn man oft genug beides gesehen hat.',
        '- Eine eigene Vorstellung davon entwickeln, was im eigenen Unternehmen heute schon möglich wäre — unabhängig davon, was Berater oder Tool-Anbieter behaupten.',
        '- Beurteilen können, ob die eigene Organisation mit AI an den richtigen Stellen schneller wird — oder nur an den sichtbaren.',
      ].join('\n'),
    },
    {
      blockType: 'articleText',
      content: richText([
        heading('huerde', '§ IV - Hürde', 'Was es nicht braucht'),
        paragraph(
          'Die Hürde, AI persönlich zu erschließen, wird in den Köpfen oft höher gebaut, als sie ist. Es braucht kein Informatikverständnis. Kein Bootcamp. Keine Sammlung von zwanzig Tools. Keine Selbsterklärung zum Tech-Enthusiasten.',
        ),
        paragraph(
          'Was es braucht, ist deutlich kleiner und gleichzeitig deutlich anspruchsvoller: die Bereitschaft, sich regelmäßig — nicht täglich, aber regelmäßig — an eigenen Aufgaben mit AI auseinanderzusetzen. Nicht zur Selbstoptimierung, sondern zur Urteilsbildung.',
        ),
        paragraph(
          'Die meisten Entscheider, die diesen Schritt gehen, berichten von einem ähnlichen Verlauf. Die ersten Wochen sind ungewohnt. Manches funktioniert sofort, manches enttäuscht. Dann kommt der Moment, in dem eine konkrete Aufgabe — ein Vorstandspapier, eine Kundenkommunikation, eine Auswertung — sichtbar besser oder sichtbar schneller wird. Ab diesem Punkt verändert sich nicht nur die Arbeitsweise. Es verändert sich die Sicht auf das eigene Unternehmen.',
        ),
        paragraph(
          'Dass dieser Moment in einem geschützten 1:1-Format leichter eintritt als im Selbststudium, liegt weniger an der Technologie als am Charakter der Aufgabe. Wer Verantwortung trägt, will keine Fingerübungen machen. Er will an realen Themen arbeiten. Mit jemandem, der den Weg kennt, der den Markt im Blick hat und der mit Zeit, Vertraulichkeit und Substanz arbeitet — nicht mit Folien.',
        ),
      ]),
      kicker: 'Schritt',
    },
    {
      blockType: 'articleText',
      content: richText([
        heading('weiterdenken', '§ V - Einladung', 'Eine Einladung zum Weiterdenken'),
        paragraph(
          'Dieser Text ist absichtlich kein Plädoyer für ein bestimmtes Produkt, kein Aufruf zum schnellen Handeln, keine Beschwörung exponentieller Risiken. Er ist eine Einladung, eine unbequeme Frage einmal in Ruhe zu betrachten:',
        ),
        paragraph(
          'Wenn AI in den nächsten Jahren so viele Entscheidungen beeinflusst, wie es absehbar ist — können die eigenen Entscheidungen darüber wirklich auf zweiter Hand bleiben? Auf Konferenz-Eindrücken, Berater-Folien, Mitarbeitenden-Erzählungen?',
        ),
        paragraph(
          'Die meisten Inhaber und Geschäftsführer, mit denen ich darüber spreche, kommen unabhängig voneinander zum gleichen Ergebnis: Ein paar Stunden eigene, geführte Auseinandersetzung mit AI verändern die Sicht auf das eigene Unternehmen mehr als zehn weitere Konferenzen. Nicht weil die Technologie magisch wäre. Sondern weil persönliche Erfahrung etwas ermöglicht, das Information nicht leisten kann: ein eigenes Urteil.',
        ),
        paragraph(
          'Wer diesen Schritt nicht allein gehen will, findet bei Chefsache AI ein Format, das genau dafür gebaut ist. Privat, vertraulich, ohne Schaulauf. An Ihren Aufgaben. In Ihrer Geschwindigkeit.',
        ),
        paragraph(
          'Aber das ist die zweite Frage. Die erste lautet: Will ich mir diese Urteilsfähigkeit erschließen? Wenn die Antwort ja ist, ist die Form fast nebensächlich. Wenn die Antwort nein ist, hilft auch kein Coaching der Welt.',
        ),
      ]),
      kicker: 'Fazit',
    },
  ],
  excerpt:
    'Warum Inhaber, Geschäftsführer und Vorstände um eine Aufgabe nicht herumkommen, die sich erstmal nach „nicht meine Baustelle“ anfühlt — und warum genau diese Aufgabe heute zu den wichtigsten gehört.',
  heroImageCaption:
    'Chefsache AI · Eigene Urteilsfähigkeit entsteht nicht im Briefing, sondern in der Anwendung.',
  heroImageSrc: '/images/executive-woman-ai-judgement-window.png',
  publishedAt: '2026-05-11T00:00:00.000Z',
  readingTime: '9 min',
  seo: {
    description:
      'Warum Geschäftsführer und Inhaber AI nicht delegieren können — und was es wirklich heißt, sich diese Technologie persönlich zu erschließen.',
    title: 'AI verstehen, bevor man darüber entscheidet. - Chefsache AI',
  },
  slug: 'ai-verstehen-bevor-man-entscheidet',
  status: 'published' as const,
  title: 'AI verstehen, bevor man darüber entscheidet.',
  _status: 'published' as const,
}

const seededArticles = [manifestArticle, referenceArticle, fullModuleArticle, aiJudgementArticle]

const legalPages = [
  {
    fallbackHtml: impressumFallbackHtml,
    kicker: 'Kontakt und Anbieter',
    legalType: 'impressum' as const,
    seo: {
      description: 'Impressum von Chefsache AI.',
      title: 'Impressum - Chefsache AI',
    },
    slug: 'impressum',
    sourcePageId: 1423,
    sourceUrl: 'https://kms-projects.com/impressum',
    title: 'Impressum',
  },
  {
    fallbackHtml: datenschutzFallbackHtml,
    kicker: 'Datenschutz',
    legalType: 'datenschutz' as const,
    seo: {
      description: 'Datenschutzerklärung von Chefsache AI.',
      title: 'Datenschutzerklärung - Chefsache AI',
    },
    slug: 'datenschutzerklaerung',
    sourcePageId: 1428,
    sourceUrl: 'https://kms-projects.com/datenschutzerklaerung',
    title: 'Datenschutzerklärung',
  },
]

type SourcePage = {
  content?: {
    rendered?: string
  }
}

async function seed() {
  const payload = await getPayload({ config })
  const existing = await payload.find({
    collection: 'landing-pages',
    limit: 1,
    where: {
      slug: {
        equals: homePage.slug,
      },
    },
  })

  if (existing.docs[0]) {
    await payload.update({
      collection: 'landing-pages',
      data: homePage as never,
      id: existing.docs[0].id,
    })
    payload.logger.info('Updated Chefsache AI landing page seed.')
  } else {
    await payload.create({
      collection: 'landing-pages',
      data: homePage as never,
    })
    payload.logger.info('Created Chefsache AI landing page seed.')
  }

  for (const article of seededArticles) {
    const existingArticle = await payload.find({
      collection: 'articles',
      limit: 1,
      where: {
        slug: {
          equals: article.slug,
        },
      },
    })

    if (existingArticle.docs[0]) {
      await payload.update({
        collection: 'articles',
        data: article as never,
        id: existingArticle.docs[0].id,
      })
      payload.logger.info(`Updated article seed: ${article.slug}.`)
    } else {
      await payload.create({
        collection: 'articles',
        data: article as never,
      })
      payload.logger.info(`Created article seed: ${article.slug}.`)
    }
  }

  for (const legalPage of legalPages) {
    const contentHtml = await getSourceHtml(legalPage.sourcePageId, legalPage.fallbackHtml)
    const data = {
      contentHtml,
      intro:
        'Übernommen von kms-projects.com für den POC. Vor Livegang bitte final juristisch prüfen.',
      kicker: legalPage.kicker,
      legalType: legalPage.legalType,
      seo: legalPage.seo,
      slug: legalPage.slug,
      sourcePageId: legalPage.sourcePageId,
      sourceUrl: legalPage.sourceUrl,
      status: 'published' as const,
      title: legalPage.title,
      _status: 'published' as const,
    }
    const existingLegalPage = await payload.find({
      collection: 'legal-pages',
      limit: 1,
      where: {
        slug: {
          equals: legalPage.slug,
        },
      },
    })

    if (existingLegalPage.docs[0]) {
      await payload.update({
        collection: 'legal-pages',
        data: data as never,
        id: existingLegalPage.docs[0].id,
      })
      payload.logger.info(`Updated legal page seed: ${legalPage.slug}.`)
    } else {
      await payload.create({
        collection: 'legal-pages',
        data: data as never,
      })
      payload.logger.info(`Created legal page seed: ${legalPage.slug}.`)
    }
  }
}

await seed()
process.exit(0)

async function getSourceHtml(sourcePageId: number, fallbackHtml: string) {
  try {
    const response = await fetch(`https://kms-projects.com/wp-json/wp/v2/pages/${sourcePageId}`)

    if (!response.ok) {
      return fallbackHtml
    }

    const sourcePage = (await response.json()) as SourcePage
    return normalizeLegalSourceHtml(sourcePage.content?.rendered || fallbackHtml)
  } catch {
    return normalizeLegalSourceHtml(fallbackHtml)
  }
}

function normalizeLegalSourceHtml(html: string) {
  return html.replaceAll('kai@kms-projects.com', 'info@chefsache-ai.com')
}

function richText(children: RichTextChild[]) {
  return {
    root: {
      children,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      type: 'root',
      version: 1,
    },
  }
}

function paragraph(value: string): RichTextChild {
  return element('paragraph', [textNode(value)])
}

function heading(id: string, eyebrow: string, value: string): RichTextChild {
  return {
    ...element('heading', [textNode(value)]),
    eyebrow,
    id,
    tag: 'h2',
  }
}

function subheading(value: string): RichTextChild {
  return {
    ...element('heading', [textNode(value)]),
    tag: 'h3',
  }
}

function quote(value: string, quoteType?: 'pullquote'): RichTextChild {
  return {
    ...element('quote', [textNode(value)]),
    quoteType,
  }
}

function list(listType: 'bullet' | 'number', children: RichTextChild[]): RichTextChild {
  return {
    ...element('list', children),
    listType,
    start: 1,
    tag: listType === 'number' ? 'ol' : 'ul',
  }
}

function listItem(children: RichTextChild[]): RichTextChild {
  return {
    ...element('listitem', children),
    value: 1,
  }
}

function element(type: string, children: RichTextChild[]): RichTextChild {
  return {
    children,
    direction: 'ltr',
    format: '',
    indent: 0,
    type,
    version: 1,
  }
}

function textNode(text: string): RichTextChild {
  return {
    detail: 0,
    format: 0,
    mode: 'normal',
    style: '',
    text,
    type: 'text',
    version: 1,
  } as RichTextChild
}

function strongText(text: string): RichTextChild {
  return {
    ...textNode(text),
    format: 1,
  }
}
