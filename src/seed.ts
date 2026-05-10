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

const seededArticles = [manifestArticle, referenceArticle, fullModuleArticle]

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
