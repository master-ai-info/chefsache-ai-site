# Chefsache AI POC Site

Next.js + Payload CMS Proof of Concept fuer `chefsache-ai.com`.

## Erst lesen

Vor Production-, Vercel-, Neon-, Blob-, Migration-, Seed- oder CMS-Strukturaenderungen zuerst lesen:

```text
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

## Vercel-Konfiguration

- Root Directory: dieses Verzeichnis
- Build Command: `npm run build -- --webpack`
- Production Env Vars: `DATABASE_URL`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SITE_URL`, `BLOB_READ_WRITE_TOKEN`
- Domain erst verbinden, wenn die Production-URL, Admin, Lead-Speicherung, Media Upload, `/sitemap.xml` und `/robots.txt` sauber getestet sind.
