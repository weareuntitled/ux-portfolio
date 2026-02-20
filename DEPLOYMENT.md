## Production deployment on KVM (Next.js + Payload + Caddy)

This app runs as a single containerized Next.js + Payload server behind Caddy, with SQLite and uploads persisted via Docker volumes.

### 1. Required env vars

Configure these in `.env.production` on the KVM host (both the app and Caddy read this file):

- `NODE_ENV=production`
- `PORT=3000`
- `EDIT_MODE=false`
- `PAYLOAD_SECRET` – long, random string.
- `PREVIEW_SECRET` – secret used by `/api/preview`.
- `PAYLOAD_PUBLIC_URL=https://<APP_DOMAIN>`
- `PAYLOAD_DB_SQLITE_PATH=/data/payload.db`
- `PAYLOAD_UPLOADS_DIR=/uploads`
- `APP_DOMAIN` – e.g. `portfolio.untitled-ux.de`.
- `EMAIL_FOR_ACME` – email for Let’s Encrypt / ACME.
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` – first admin user (used by seed; log in at `/admin`).
- `ALLOWED_ORIGINS` – set to `https://<APP_DOMAIN>` if you use CORS.

### 2. Volumes and persistence

Docker volumes defined in `docker-compose.yml`:

- `app_data` → mounted at `/data` inside `app` (contains `payload.db`).
- `app_uploads` → mounted at `/uploads` inside `app` (all uploaded media).
- `caddy_data`, `caddy_config` → Caddy TLS state.

These volumes ensure content and uploads survive container rebuilds/redeploys.

### 3. First deployment steps

On the KVM host:

1. Clone the repo and create `.env.production` from the provided template.
2. Set DNS `A` / `AAAA` records for `APP_DOMAIN` to the KVM IP.
3. Build and start the stack:

```bash
docker compose build app
docker compose up -d
```

4. Visit `https://<APP_DOMAIN>` to trigger Caddy’s certificate provisioning.

### 4. Backups

Create a `backups/` directory on the host and run:

```bash
mkdir -p backups
docker run --rm \
  -v app_data:/data \
  -v app_uploads:/uploads \
  -v "$(pwd)/backups:/backup" \
  alpine sh -c 'tar czf /backup/portfolio-$(date +%F).tar.gz /data /uploads'
```

#### Restore

1. Stop the stack:

```bash
docker compose down
```

2. Restore from a backup tar (example file name):

```bash
docker run --rm \
  -v app_data:/data \
  -v app_uploads:/uploads \
  -v "$(pwd)/backups:/backup" \
  alpine sh -c 'cd / && tar xzf /backup/portfolio-2026-02-12.tar.gz'
```

3. Start the stack again:

```bash
docker compose up -d
```

### 5. SSL and subdomain routing

- Ensure DNS for `APP_DOMAIN` points to the KVM IP.
- `Caddyfile` uses:
  - `{$EMAIL_FOR_ACME}` – ACME account email.
  - `{$APP_DOMAIN}` – host to serve and proxy to `app:3000`.
- Caddy will automatically obtain and renew TLS certificates and store them in `caddy_data`.

### 6. Update strategy

- For code updates:

```bash
git pull
docker compose build app   # or docker compose pull app if using a registry
docker compose up -d
```

- For content edits in production:
  - Temporarily set `EDIT_MODE=true` in `.env.production`.
  - Restart `app` (`docker compose up -d app`).
  - Log into `/admin`, edit content.
  - Set `EDIT_MODE=false` again and restart `app`.

