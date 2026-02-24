# Stage 1: Build
FROM node:20-bookworm-slim AS builder
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --legacy-peer-deps
RUN npm install --os=linux --cpu=x64 sharp --legacy-peer-deps

COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Stage 2: Run (Standalone Modus)
FROM node:20-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

# 1. Wir kopieren den von Next.js generierten, eigenständigen Server
COPY --from=builder /app/.next/standalone ./
# 2. Wir kopieren die statischen Assets (CSS, JS)
COPY --from=builder /app/.next/static ./.next/static
# 3. Wir kopieren den Public-Ordner (Bilder, CVs etc.)
COPY --from=builder /app/public ./public

EXPOSE 3000

# Standalone nutzt "server.js" anstelle des schweren Next-CLI-Befehls
CMD ["node", "server.js"]