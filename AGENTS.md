# Codex Instructions

Before making changes in this repo, read:

- `../docs/technical-live-handoff.md`
- `../docs/handoff-next-chat.md`
- `README.md`

For Landing Page copy work, also read:

- `../docs/copy-agent-cms-format.md`

Always start with:

```bash
git status --short --branch
```

Do not overwrite or revert local uncommitted changes unless the user explicitly asks.

Production facts:

- Vercel project: `chefsache-ai-site`
- Production URL: `https://chefsache-ai-site.vercel.app`
- Production branch: `main`
- Build command: `npm run build -- --webpack`
- Production database: Neon Postgres via `DATABASE_URL`
- Media storage: Vercel Blob via `BLOB_READ_WRITE_TOKEN`
- Payload Admin is the production CMS.

Important workflow notes:

- Local `npm run seed` updates local SQLite unless `DATABASE_URL` explicitly points to Neon.
- Seeds do not run automatically on Vercel.
- For schema/field changes, generate/update types and add a migration before deploying.
- Use `npm run build -- --webpack`; plain `npm run build` may hang locally with Turbopack.
- Never print, commit, or document secret values.
