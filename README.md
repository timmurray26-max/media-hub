# Media Hub

Personal studio library for images, videos, GIFs, PDFs, docs, spreadsheets, and project links.
Each item gets a stable public share URL like /i/your-slug so you can link it from X posts.

Visitors browse freely. Only the owner (password login) can upload or delete.

## Quick start

1. Install Node.js 22.5+ from https://nodejs.org (Node 24 recommended)
2. Open a terminal in this project folder
3. Copy env example: cp .env.example .env.local
4. Edit .env.local and set ADMIN_PASSWORD and SESSION_SECRET
5. Install packages, then start the dev server (see package.json scripts: install / dev / build / start)
6. Open http://localhost:3000

Useful URLs:
- / — library home (search + type/tag filters)
- /login — owner login
- /admin — upload files and add projects
- /i/studio-still-demo — example share page

## Environment variables

- ADMIN_PASSWORD (required) — password for the Login page
- SESSION_SECRET (required) — long random string that signs the session cookie
- NEXT_PUBLIC_SITE_NAME (optional) — title shown in the header

Do not commit .env.local (it is gitignored).

## Where data lives

- data/media.db — titles, tags, slugs, metadata
- data/uploads/ — the actual files (gitignored)

Comments in src/lib/storage.ts explain how to later swap local disk for S3, Cloudflare R2, or Vercel Blob.

## Free deploy notes (Vercel)

This is a Next.js app, so Vercel can host the code. Caveat: SQLite and local uploads do not persist on typical serverless hosts. For a lasting public site, plan on a hosted database (for example Turso) plus object storage (R2/S3/Blob), or run the app on a small always-on machine / VPS. If you deploy a short demo, set ADMIN_PASSWORD and SESSION_SECRET in the host environment settings.

## Main routes

- / — public library
- /i/[slug] — public item detail (preview, download, copy link)
- /login — owner password form
- /admin — owner upload UI
- /api/files/[filename] — serves uploaded files
- /api/upload — owner file upload
- /api/items — library API

## Stack

Next.js App Router, TypeScript, Tailwind CSS, node:sqlite (DatabaseSync), HMAC-signed session cookie.

## Troubleshooting

- Wrong password: fix ADMIN_PASSWORD in .env.local and restart the server
- Empty library: delete data/media.db and restart; demo items seed when the DB is empty
- node:sqlite missing: use Node.js 22.5+. No Visual Studio Build Tools needed on Windows.

## Exact commands

```
npm install
npm run dev
```

Build for production:

```
npm run build
npm start
```
