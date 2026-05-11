# Agentic Operating Rules: Chefsache AI

Stand: 2026-05-11

Dieses Dokument ist die kurze Betriebsanleitung fuer kleine Aenderungen. Ziel ist weniger Fragilitaet, kuerzere Wartezeiten und klare Grenzen zwischen Redaktion, Design und Struktur.

## Grundsatz

Vor jeder Aenderung zuerst einordnen:

```text
CONTENT   = Text, SEO, FAQ, Artikel, Copy
DESIGN    = Layout, CSS, Bilder, Responsive-Verhalten
STRUCTURE = Payload-Felder, Blocks, Collections, Datenmodell
LIVE OPS  = Deploy, Migration, Seed, Domain, Secrets
```

Ein Arbeitslauf soll moeglichst nur eine Kategorie anfassen.

## Abschlussregel

Am Ende jeder relevanten Aufgabe muss der Agent eine von zwei Sachen tun:

- `docs/site-change-log.md` aktualisieren.
- In der Schlussantwort ausdruecklich sagen, warum kein Changelog-Eintrag noetig war.

Relevant ist jede Aufgabe, die Code, CMS-Inhalte, Produktionsverhalten, lokale Arbeitsablaeufe, Architekturentscheidungen, Bugs, Tests, Deployments, Seeds, Migrationen oder offene Risiken betrifft.

Nicht zwingend relevant sind reine Erklaerungen ohne neue Entscheidung, kurze Rueckfragen oder Chat-Antworten ohne Aenderung am System.

Der Changelog-Eintrag soll kurz sein. Wichtiger als Vollstaendigkeit ist, dass der naechste Agent sofort weiss:

- Was wurde gemacht?
- Wo liegt die Quelle der Wahrheit?
- Was wurde geprueft?
- Was ist offen?
- Was ist der naechste sichere Schritt?

## CONTENT

Beispiele:

- Hero-Text aendern
- FAQ umformulieren
- Artikel-Draft anlegen
- SEO-Titel oder Description pflegen

Regeln:

- Production Payload CMS ist die Quelle der Wahrheit.
- Neue Artikel und neue Landingpages bleiben zuerst Draft.
- Keine Codeaenderung fuer reine Copy.
- Kein Seed fuer normale Copy.
- Kein Deploy fuer normale Copy.
- Git-Sync erst nach bewusst freigegebener Copy-Version.

Sicherer Ablauf:

```text
1. Betroffene CMS-Seite oder Artikel identifizieren.
2. Copy im CMS aendern oder als Draft anlegen.
3. Im Frontend pruefen.
4. Learnings im site-change-log dokumentieren.
5. Optional nach Freigabe: CMS-Stand ins Repo synchronisieren.
```

## DESIGN

Beispiele:

- Abstand oder Typografie korrigieren
- Bildposition aendern
- Button-Stil anpassen
- Mobile Layout reparieren

Regeln:

- Git ist die Quelle der Wahrheit.
- Immer lokal zuerst.
- Keine gleichzeitigen CMS-Copy-Aenderungen im selben Arbeitslauf.
- Erst nach lokaler Pruefung committen/pushen.

Sicherer Ablauf:

```text
1. git status --short --branch in site/ pruefen.
2. Lokal aendern.
3. Lokal im Browser pruefen.
4. npm run lint und npx tsc --noEmit ausfuehren.
5. Bei groesseren Layoutaenderungen npm run build -- --webpack.
6. Nutzerfreigabe abwarten.
7. Commit, Push, Vercel pruefen.
8. site-change-log aktualisieren.
```

## STRUCTURE

Beispiele:

- Neuer Payload-Block
- Neues Feld in einer Collection
- Neues Upload-Feld
- Neue Collection
- Feld umbenennen oder loeschen

Regeln:

- Das ist Datenmodell-Arbeit, keine kleine redaktionelle Aenderung.
- Nur nach ausdruecklicher Freigabe.
- Vorher kurz begruenden, warum bestehende Felder/Blocks nicht reichen.
- Production-Code und Neon-Schema muessen zusammenpassen.

Sicherer Ablauf:

```text
1. Mini-Plan schreiben.
2. Schema lokal aendern.
3. Types generieren.
4. Migration erstellen.
5. Lokal testen.
6. Nutzerfreigabe einholen.
7. Commit und Push.
8. Production-Migration gegen Neon.
9. Production-CMS-Health-Check.
10. site-change-log aktualisieren.
```

## LIVE OPS

Beispiele:

- Production-Seed
- Production-Migration
- Domain verbinden
- Env Vars aendern
- Vercel Deployment bewusst ausloesen

Regeln:

- Immer explizite Nutzerfreigabe.
- Keine Secrets anzeigen.
- Nach Live-Arbeit immer Health-Check.
- Bei Fehlern zuerst Fehlerklasse bestimmen: Content, Code, Schema oder Env/Deployment.

## Niemals Mischen

Diese Kombinationen erzeugen besonders schnell Unsicherheit:

- CMS-Copy live aendern und gleichzeitig CSS/React umbauen.
- Payload-Struktur aendern und gleichzeitig Copy finalisieren.
- Seed laufen lassen, waehrend Production-CMS als Copy-Quelle genutzt wird.
- Lokale SQLite-Ergebnisse als Beweis nehmen, dass Neon Production sicher ist.

## Blogartikel-Flow Test

Der naechste Test soll nicht perfekt sein, sondern zeigen, ob der Workflow schnell und stabil genug ist.

### Ziel

```text
Einen Artikel als Draft erstellen, im Frontend pruefen, Korrekturen einarbeiten und den Aufwand bewerten.
```

### Ablauf

1. Artikelidee oder Rohtext festlegen.
2. Artikel im Payload CMS als Draft anlegen.
3. Pflichtfelder aus `../docs/editorial-agent-workflow.md` ausfuellen.
4. SEO-Titel und Description setzen.
5. Hero-Bild oder Platzhalter bewusst entscheiden.
6. Frontend-Route `/essays/[slug]` lokal oder live pruefen.
7. Mobile Darstellung pruefen.
8. Korrekturen im CMS einarbeiten.
9. Status erst nach ausdruecklicher Freigabe auf Published setzen.
10. Learnings im `docs/site-change-log.md` dokumentieren.

### Bewertungsfragen

- Wie lange dauert ein neuer Draft bis zur sichtbaren Vorschau?
- Musste Code angefasst werden?
- War klar, wo der Fehler lag, falls etwas nicht funktionierte?
- War der CMS-Editor angenehm genug fuer echte redaktionelle Arbeit?
- War die Vorschau schnell genug?
- Sind SEO, Bild, Autor und CTA ohne Entwicklerhilfe pflegbar?
- Fuehlt sich der Prozess nach 30 Minuten stabiler oder fragiler an?

### Learning aus dem ersten Leitartikel

Der erste echte Artikel hat gezeigt:

- Wenn ein Artikel lokal in der echten Frontend-Route geprueft wurde, bringt ein Production-CMS-Draft ohne Frontend-Preview nur begrenzten Zusatznutzen.
- Bis eine geschuetzte Production-Draft-Preview existiert, ist der pragmatische Ablauf: lokal rendern und abnehmen, dann nach klarer Nutzerfreigabe direkt im Production-CMS veroeffentlichen.
- Ein Production-CMS-Draft ist weiter sinnvoll als Zwischenspeicher fuer Daten und Media-Uploads, aber nicht als visuelle Abnahmeansicht.
- Eine Nutzerformulierung wie `Bitte veroeffentlichen` oder `Bitte den Artikel live stellen` reicht als Freigabe, um einen bereits lokal geprueften Artikel im CMS von Draft auf Published zu setzen.
- Fuer neue Artikel keine Payload-Struktur aendern. Vorhandene Article-Module nutzen: Text, Quote, Callout, Image, Insight Index, CTA.
- Wenn Media ueber `/api/media/file/...` in Production nicht ausliefert, direkte Vercel-Blob-URL als `heroImageSrc` nutzen und den Media-Datensatz trotzdem im CMS dokumentieren.

## Stop-Regel

Wenn eine kleine Aenderung laenger als 30 Minuten technische Fehlersuche ausloest:

```text
Stoppen.
Fehlerklasse benennen.
Keine weiteren Aenderungen mischen.
Status im site-change-log notieren.
Dann gezielt entscheiden: reparieren, zurueckstellen oder Architekturfrage neu bewerten.
```
