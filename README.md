# Chefsache AI POC Site

Next.js + Payload CMS Proof of Concept fuer `chefsache-ai.com`.

## Lokal starten

```bash
npm run dev
```

Danach:

- Frontend: `http://localhost:3000`
- Payload Admin: `http://localhost:3000/admin`

Beim ersten Oeffnen des Admins wird der erste Admin-User angelegt.

## Seed-Content

Die erste Chefsache-AI-Landingpage wird mit diesem Befehl im lokalen SQLite-CMS angelegt oder aktualisiert:

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
