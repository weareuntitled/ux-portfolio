# Stage 1: Build
FROM node:20-bookworm-slim AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps
RUN npm install --os=linux --cpu=x64 sharp --legacy-peer-deps
RUN npm install @libsql/linux-x64-gnu --legacy-peer-deps

COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Stage 2: Run (Standalone Modus)
FROM node:20-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NEXT_TELEMETRY_DISABLED=1

# Install wget for healthcheck (not included in slim image)
RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*

# 1. Von Next.js generierter, eigenständiger Server
COPY --from=builder /app/.next/standalone ./
# 2. Statische Assets (CSS, JS)
COPY --from=builder /app/.next/static ./.next/static
# 3. Public-Ordner (Bilder, Videos, CVs etc.)
COPY --from=builder /app/public ./public

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/health || exit 1

# Standalone nutzt "server.js" anstelle des schweren Next-CLI-Befehls
CMD ["node", "server.js"]
