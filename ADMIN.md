# Admin panel

Edit block texts, images, and projects at **/admin**.

## First-time setup (create login)

If you see a login screen and have no account yet, run the seed API to create the first admin user:

```bash
# From project root (ux-portfolio/)
curl -X POST "http://localhost:3000/api/seed?secret=dev-preview-secret"
```

(Use your real `PREVIEW_SECRET` from `.env` if you changed it.)

Then log in at **http://localhost:3000/admin** with:

- **Email:** `admin@localhost` (or set `ADMIN_EMAIL` in `.env`)
- **Password:** `admin123` (or set `ADMIN_PASSWORD` in `.env`)

Change the password after first login in production.

## What you can edit

- **Projects** – title, slug, one-liner, context, problem, solution, outcomes, roles, tags, links, prototype, mood image, gallery, impact, workflow, notes.
- **Media** – upload images (card/hero sizes) and link them to projects as cover or gallery.
- **Project defaults** – global defaults for tags, tools, methods, section titles.

## Design

The admin UI uses Payload’s own layout and styles. Portfolio styles (dark theme, mesh background) are not applied on `/admin`, so the panel looks correct.
