# Site Change Log: Chefsache AI

Dieses Log ist fuer menschliche Orientierung und Agenten-Uebergaben. Es ersetzt kein Git-Log und keine technische Handoff-Datei. Es beantwortet nur schnell: Was wurde zuletzt gemacht, wo liegt die Wahrheit, was ist offen?

## Nutzungsregel

Am Ende jeder relevanten Aufgabe muss ein kurzer Eintrag ergaenzt werden. Wenn kein Eintrag noetig ist, soll der Agent das in der Schlussantwort ausdruecklich sagen.

Relevant sind insbesondere:

- Code-, Layout- oder CMS-Aenderungen
- neue oder geaenderte Artikel, Landingpages, Legal Pages oder Leads-Logik
- Deployments, Seeds, Migrationen oder Env-/Domain-Arbeit
- Fehleranalysen, behobene Bugs oder neue Risiken
- Architekturentscheidungen und Workflow-Aenderungen
- Tests, die fuer die naechste Session wichtig sind

Ein Eintrag darf knapp sein. Er soll dem naechsten Agenten vor allem den aktuellen Zustand und den naechsten sicheren Schritt zeigen.

## 2026-05-11

```text
Status: Production-POC steht.
Arbeitsfokus: Architektur-Realitaetscheck und Stabilisierung des agentischen Workflows.
Letzte Aenderung: Betriebsdokumente fuer Systemzustand, Aenderungsregeln und Change Log angelegt; Abschlussregel fuer Changelog-Pflege ergaenzt.
Quelle der Wahrheit Landingpage-Copy: Production Payload CMS.
Quelle der Wahrheit Layout/Code: Git.
Naechster geplanter Test: Blogartikel-Flow.
```

### Offene Punkte

- Workflow fuer kleine Aenderungen praktisch testen.
- Blogartikel als Draft anlegen, pruefen und Learnings dokumentieren.
- Entscheiden, ob Payload/Next nach Stabilisierung schnell genug wirkt.
- Vor echtem Domain-Livegang Neon-Passwort rotieren.

### Aktuelle Schutzregel

```text
Payload-Schema bleibt eingefroren.
Keine neuen Blocks, Felder oder Collections ohne separaten Strukturauftrag.
```

```text
Status: Neuer Leitartikel lokal als Draft vorbereitet.
Arbeitsfokus: Blogartikel-Flow lokal testen.
Geaendert: Artikel "AI verstehen, bevor man darüber entscheidet." aus Nutzerentwurf in den lokalen Seed uebernommen; zwei Quote-Module, eine Infobox und ein neues generiertes Hero-Bild ergaenzt.
Geaendert in: src/seed.ts, src/app/(frontend)/essays/[slug]/page.tsx, src/app/(frontend)/styles.css, public/images/executive-woman-ai-judgement-window.png.
Quelle der Wahrheit: Lokal vorbereiteter Payload-Draft via Seed; Production-CMS wurde nicht veraendert.
Live gestellt: Nein. Kein Commit, kein Push, kein Deploy.
Geprueft: npm run seed; npm run lint (nur bestehende Migrations-Warnungen); npx tsc --noEmit; npm run build -- --webpack; lokale Browserpruefung mit Chrome/Playwright fuer Desktop und Mobile unter /essays/ai-verstehen-bevor-man-entscheidet.
Offen: Nutzerfreigabe fuer Copy/Bild/Module; danach entscheiden, ob Draft ins Production-CMS uebertragen und spaeter veroeffentlicht wird.
Risiken: Dev-Preview zeigt Draft-Artikel lokal an; Production-Route bleibt auf published beschraenkt.
Naechster Schritt: Nutzer lokal pruefen lassen, dann nach expliziter Freigabe committen/pushen bzw. Production-CMS-Draft anlegen.
```

```text
Status: Leitartikel als Draft im Production-CMS angelegt.
Arbeitsfokus: Blogartikel-Flow Production-Draft ohne Veroeffentlichung.
Geaendert: Artikel "AI verstehen, bevor man darüber entscheidet." im Production Payload CMS als Draft erstellt/aktualisiert; Bild in Vercel Blob hochgeladen und als Media-Datensatz im CMS angelegt.
Geaendert in: Production Payload CMS Articles ID 4; Production Payload CMS Media ID 2.
Quelle der Wahrheit: Production Payload CMS Draft; lokaler Seed bleibt Arbeits-/Versionsvorbereitung.
Live gestellt: Nein. Oeffentliche Route /essays/ai-verstehen-bevor-man-entscheidet liefert weiterhin 404, weil der Artikel Draft ist.
Geprueft: Payload Local API gegen Production mit draft=true; direkte Blob-URL liefert HTTP 200; oeffentliche Essay-Route liefert HTTP 404.
Offen: Nutzer prueft Draft im Admin; nach expliziter Freigabe Status auf published setzen und ggf. Code/Seed-Versionierung committen.
Risiken: Die generische Payload-Media-Route /api/media/file/... liefert auf Production fuer Media-Dateien aktuell 404; der Artikel-Draft nutzt deshalb zusaetzlich die direkte Blob-URL als heroImageSrc. Das Media-Asset ist trotzdem im CMS vorhanden. Bestehende Articles-API hat public read access und kann Draft-Daten ueber /api/articles ausliefern; fuer echte Draft-Vertraulichkeit ist ein Access-Control-Fix plus Deploy noetig.
Naechster Schritt: Im Payload Admin den Draft redaktionell pruefen; bei Freigabe veroeffentlichen.
```

```text
Status: Leitartikel veroeffentlicht.
Arbeitsfokus: Ersten echten Blogartikel live stellen und Prozess-Learnings sichern.
Geaendert: Artikel "AI verstehen, bevor man darüber entscheidet." im Production Payload CMS von Draft auf Published gesetzt; agentic-operating-rules um Learning fuer kuenftige Artikelablaeufe ergaenzt.
Geaendert in: Production Payload CMS Articles ID 4; docs/agentic-operating-rules.md.
Quelle der Wahrheit: Production Payload CMS fuer den veroeffentlichten Artikel; Git fuer Layout/Workflow-Dokumentation.
Live gestellt: Ja, unter /essays/ai-verstehen-bevor-man-entscheidet.
Geprueft: Live-Route liefert HTTP 200; direkte Blob-Bild-URL liefert HTTP 200; Chrome/Playwright Screenshots Desktop und Mobile; zwei Quote-Module, ein Callout, kein horizontaler Overflow.
Offen: Optional spaeter echte geschuetzte Production-Draft-Preview bauen; Article-Access-Regel fuer API-Drafts haerten; Media-Route /api/media/file/... klaeren.
Risiken: Canonical zeigt aktuell auf chefsache-ai.com, obwohl Domain noch nicht verbunden ist; das kommt aus Production NEXT_PUBLIC_SITE_URL und sollte vor Domain-Livegang bewusst geprueft werden.
Naechster Schritt: Nutzer Live-Artikel pruefen lassen; bei Freigabe lokale Code-/Seed-/Doku-Aenderungen versionieren.
```

```text
Status: Landingpage-Artikelteaser veroeffentlicht.
Arbeitsfokus: Neueste Artikel automatisch auf der Landingpage anzeigen.
Geaendert: Homepage laedt serverseitig bis zu vier neueste published Articles aus Payload und rendert sie im ArticleTeasers-Abschnitt; falls der CMS-Block fehlt, wird ein virtueller Abschnitt vor dem FAQ eingefuegt. Lokaler Seed des Leitartikels auf published nachgezogen.
Geaendert in: src/app/(frontend)/page.tsx, src/content/homePage.ts, src/seed.ts.
Quelle der Wahrheit: Git fuer Homepage-Rendering; Production Payload CMS fuer Artikelinhalte.
Live gestellt: Ja. Commit 73ebc2c wurde auf main gepusht und per Vercel Auto-Deploy auf Production veroeffentlicht.
Geprueft: npm run seed; npm run lint (nur bestehende Migrations-Warnungen); npx tsc --noEmit; npm run build -- --webpack; lokale Chrome/Playwright-Pruefung der Homepage mit Artikelkarten und Links; Production-HTML enthaelt Neueste Artikel und den Leitartikel-Link; Browserklick von der Live-Landingpage auf den Artikel; Production Articles-API und Landingpages-API liefern HTTP 200.
Offen: Keine akute Aufgabe fuer diese Aenderung.
Risiken: Der Artikelinhalt kommt aus dem Production-CMS; die Landingpage-Teaser reagieren deshalb auf kuenftige published Articles im CMS.
Naechster Schritt: Optional spaeter echte geschuetzte Production-Draft-Preview und Media-Route /api/media/file/... klaeren.
```

```text
Status: Related Articles im Artikeltemplate lokal dynamisiert.
Arbeitsfokus: Statische Platzhalter unter Essays entfernen.
Geaendert: Der Related-Block unter Artikeln nutzt zuerst gepflegte relatedArticles und faellt sonst auf die neuesten published Articles aus Payload zurueck; der aktuelle Artikel wird ausgeschlossen; bei fehlenden echten Artikeln wird der Block ausgeblendet statt Platzhalter zu zeigen.
Geaendert in: src/app/(frontend)/essays/[slug]/page.tsx.
Quelle der Wahrheit: Git fuer Rendering-Logik; Production Payload CMS fuer Article-Daten.
Live gestellt: Nein. Codefix ist lokal geprueft, aber noch nicht committed/gepusht/deployed.
Geprueft: npm run lint (nur bestehende Migrations-Warnungen); npx tsc --noEmit; npm run build -- --webpack; lokale Browserpruefung unter /essays/ai-verstehen-bevor-man-entscheidet mit dynamischer Related-Headline, echtem Article-Link und ohne alte Platzhalter.
Offen: Nutzerfreigabe fuer Commit/Push/Deploy.
Risiken: Bis zum Deploy zeigt Production unter Artikeln weiter den statischen Platzhalterblock.
Naechster Schritt: Nach Freigabe sauber veroeffentlichen.
```

## Vorlage fuer neue Eintraege

```md
## YYYY-MM-DD

Status:
Arbeitsfokus:
Geaendert:
Geaendert in:
Quelle der Wahrheit:
Live gestellt:
Geprueft:
Offen:
Risiken:
Naechster Schritt:
```
