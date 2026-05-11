# Chefsache AI POC Site

Next.js + Payload CMS Proof of Concept fuer `chefsache-ai.com`.

## Erst lesen

Vor Production-, Vercel-, Neon-, Blob-, Migration-, Seed- oder CMS-Strukturaenderungen zuerst lesen:

```text
docs/agentic-website-workflow-sop.md
../docs/technical-live-handoff.md
```

Dort steht der aktuelle Live-Stand mit Vercel-Projekt, GitHub-Repo, Build Command, Environment Variables, Neon-/Payload-Zugriff, sicheren Content-Update-Wegen und bekannten Stolperfallen.

Fuer Copy-Arbeit mit Agenten:

```text
../docs/copy-agent-cms-format.md
```

## Production-Ziel

Der POC ist fuer Vercel vorbereitet:

- Hosting: Vercel
- Datenbank: Neon Postgres ueber `DATABASE_URL`
- Media Uploads: Vercel Blob ueber `BLOB_READ_WRITE_TOKEN`
- Canonical/OG/Sitemap: ueber `NEXT_PUBLIC_SITE_URL`

## Lokal starten

```bash
npm run dev
```

Danach:

- Frontend: `http://localhost:3000`
- Payload Admin: `http://localhost:3000/admin`

Beim ersten Oeffnen des Admins wird der erste Admin-User angelegt.

Lokal kann weiter SQLite genutzt werden, wenn `DATABASE_URL=file:./site.db` gesetzt ist. Sobald `DATABASE_URL` mit `postgres://` oder `postgresql://` beginnt, nutzt Payload den Postgres-Adapter.

## Seed-Content

Die erste Chefsache-AI-Landingpage wird mit diesem Befehl im CMS angelegt oder aktualisiert:

```bash
npm run seed
```

Der Seed legt eine Landing Page mit dem Slug `home` an.

## CMS-Copy versionieren

Natuerlicher Arbeitsauftrag fuer Codex:

```text
Ich habe im CMS Texte geaendert, bitte syncen.
```

Codex soll diesen Satz als Auftrag verstehen, den aktuellen Production-CMS-Stand der Landingpage zu versionieren. Der Nutzer muss den technischen Befehl nicht kennen.

Wenn Landingpage-Texte im Production-CMS angepasst und veroeffentlicht wurden, den aktuellen CMS-Stand zurueck ins Repo synchronisieren:

```bash
npm run sync:homepage-from-cms
```

Der Befehl liest `landing-pages/home` von der Production-URL, entfernt technische Payload-Felder und schreibt die versionierte Baseline nach:

```text
src/content/homePage.ts
```

Danach Diff pruefen, `npm run lint`, `npx tsc --noEmit` und bei Bedarf `npm run build -- --webpack` ausfuehren, dann committen und pushen. So bleibt Payload die schnelle Schreiboberflaeche, Git aber die belastbare Copy-Versionierung.

## Wichtige Befehle

```bash
npm run generate:types
npm run lint
npx tsc --noEmit
npm run build -- --webpack
```

Hinweis: Der normale `npm run build` nutzt in dieser Next-Version Turbopack und hing in der lokalen Codex-Umgebung. Der Webpack-Build wurde erfolgreich geprueft.

## CMS-Struktur

Collections:

- `Landing Pages`
- `Articles`
- `Legal Pages`
- `Leads`
- `Media`
- `Users`

Die Landingpage wird ueber sortierbare Payload-Blocks gepflegt. Inhalte aus dem Claude-Design-Export sind nicht uebernommen; der Export dient nur als visuelle Referenz.

## Kontaktformular

Das Formular speichert Leads lokal in der `Leads` Collection.

Noch nicht Teil des POC:

- E-Mail-Benachrichtigung
- Spam-Schutz
- Calendly/Buchungstool

Diese Punkte werden erst vor Produktivnahme umgesetzt.

## Environment Variables

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require
PAYLOAD_SECRET=replace-with-a-long-random-secret
NEXT_PUBLIC_SITE_URL=https://chefsache-ai.com
BLOB_READ_WRITE_TOKEN=vercel-blob-read-write-token
```

Fuer lokale SQLite-Entwicklung:

```env
DATABASE_URL=file:./site.db
PAYLOAD_SECRET=replace-with-a-long-random-secret
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Production-Credentials lokal

Fuer Production-Migrationen gegen Neon braucht Codex lokal echte Production-Env-Werte. Vercel hat diese Werte fuer Deployments, stellt sie lokalen Shell-Prozessen aber nicht automatisch bereit.

Lokaler Standardort:

```text
.env.production.local
```

Diese Datei ist durch `.gitignore` abgedeckt und darf nicht committed werden. Sie muss fuer Production-Arbeit echte Werte enthalten:

```env
DATABASE_URL=postgresql://...
PAYLOAD_SECRET=...
NEXT_PUBLIC_SITE_URL=https://chefsache-ai-site.vercel.app
BLOB_READ_WRITE_TOKEN=...
```

Presence-Check ohne Secret-Ausgabe:

```bash
node --input-type=module -e "import { config } from 'dotenv'; config({ path: '.env.production.local', override: true }); console.log({ hasDatabase: Boolean(process.env.DATABASE_URL), hasSecret: Boolean(process.env.PAYLOAD_SECRET), hasBlob: Boolean(process.env.BLOB_READ_WRITE_TOKEN) })"
```

Production-Migration ohne Secret-Ausgabe:

```bash
node --input-type=module -e "import { config } from 'dotenv'; import { spawnSync } from 'node:child_process'; config({ path: '.env.production.local', override: true }); const result = spawnSync('npm', ['run', 'payload', '--', 'migrate'], { stdio: 'inherit', env: process.env }); process.exit(result.status ?? 1)"
```

Wichtig: Vercel deployt Code, fuehrt aber keine Payload-Migration gegen Neon aus. Wenn Blocks, Collections, Migrations oder Payload-Typen geaendert wurden, muss Neon aktiv migriert werden.

## Vercel-Konfiguration

- Root Directory: dieses Verzeichnis
- Build Command: `npm run build -- --webpack`
- Production Env Vars: `DATABASE_URL`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SITE_URL`, `BLOB_READ_WRITE_TOKEN`
- Domain erst verbinden, wenn die Production-URL, Admin, Lead-Speicherung, Media Upload, `/sitemap.xml` und `/robots.txt` sauber getestet sind.

## Production-CMS-Health-Check

Nach jedem Live-Deploy mit CMS-Bezug pruefen:

```bash
curl -s 'https://chefsache-ai-site.vercel.app/api/articles?limit=1'
curl -s 'https://chefsache-ai-site.vercel.app/api/landing-pages?select%5Btitle%5D=true&select%5Bslug%5D=true&limit=1'
curl -s 'https://chefsache-ai-site.vercel.app/api/landing-pages?limit=1'
```

Wenn der selektive Landingpage-Check funktioniert, aber der vollstaendige Check `Something went wrong` liefert, ist die Landingpage wahrscheinlich nicht geloescht. Dann crasht meist das `sections`-Blockfeld wegen Code/Neon-Schema-Drift. In diesem Fall zuerst Production-Migrationen gegen Neon pruefen und ausfuehren, nicht sofort seeden.
