# SOP: Agentischer Website-Workflow

Diese SOP beschreibt den Standardablauf fuer Arbeit an dieser Website.

## Grundprinzip

Standard ist:

```text
lokal umsetzen -> lokal pruefen -> Nutzerfreigabe -> commit/push -> Vercel pruefen
```

Wenn der Nutzer Layout- oder Content-Wuensche aeussert und nichts zu Live sagt, gilt automatisch:

```text
erst lokal, nicht deployen
```

## Arbeitsmodi

### Entwurf

- Nur lokal umsetzen.
- Nicht committen.
- Nicht pushen.
- Nicht gegen Neon seeden.
- Lokal pruefen und dem Nutzer sagen, wo er schauen soll.

### Abnahme

- Lokalen Stand stabilisieren.
- Bei Codeaenderungen mindestens:

```bash
npm run lint
npx tsc --noEmit
```

- Bei groesseren Layout-/CMS-/Routing-Aenderungen zusaetzlich:

```bash
npm run build -- --webpack
```

- Keine Live-Aenderung ohne klare Nutzerfreigabe.

### Live

Nur nach expliziter Freigabe wie `Bitte veroeffentlichen`, `live stellen`, `committen und deployen`.

Dann:

```bash
git status --short --branch
git add ...
git commit -m "..."
git push origin main
```

Danach Vercel Production Deployment und Live-URL pruefen:

```text
https://chefsache-ai-site.vercel.app
```

## Content-Entscheidung

### Admin-only

Gut fuer:

- Tippfehler
- kleine redaktionelle Korrekturen
- schnelle Live-Korrekturen

Nachteil:

- Weniger versioniert.
- Kann durch spaetere Seeds ueberschrieben werden.

### Repo/Seed-versioniert

Gut fuer:

- freigegebene Landingpage-Versionen
- groessere Copy-Updates
- reproduzierbare Baseline-Inhalte
- Artikel-/Content-Pakete

Wichtig:

- Lokaler Seed aktualisiert nur SQLite, nicht Neon.
- Production-Seed gegen Neon nur bewusst und mit Production-Env.

## Aenderungstypen

### Reine Layout-Code-Aenderung

Workflow:

```text
lokal umsetzen -> lokal pruefen -> Nutzerfreigabe -> commit/push -> Vercel pruefen
```

Keine Neon-Migration noetig.

### Copy im bestehenden CMS-Modell

Workflow:

```text
lokal/Seed oder Admin entscheiden -> lokal pruefen -> Nutzerfreigabe -> ggf. commit/push -> ggf. Production-Seed/Admin
```

### Neue CMS-Felder, Blocks oder Collections

Workflow:

```text
Schema aendern -> Types generieren -> Migration erstellen -> lokal bauen -> commit/push -> Production-Migration -> ggf. Production-Seed
```

Pflichtchecks:

```bash
npm run generate:types
npm run lint
npx tsc --noEmit
npm run build -- --webpack
```

## Sicherheitsregeln

- Immer zuerst `git status --short --branch`.
- Keine lokalen uncommitted Aenderungen ueberschreiben.
- Keine Secrets ausgeben, committen oder in Docs schreiben.
- Keine Production-Migration oder Neon-Seed ohne explizite Freigabe.
- Plain `npm run build` vermeiden; stattdessen `npm run build -- --webpack`.
- Bei Unsicherheit kurz stoppen und Risiko benennen.
