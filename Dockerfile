# Stage 1: Build the app
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
# Der Flag ignoriert die strengen Versionsprüfungen von Payload/Next.js
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build

# Stage 2: Run the app
FROM node:20-alpine AS runner

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app

COPY package.json package-lock.json* ./
# Hier installieren wir nur die Produktions-Abhängigkeiten
RUN npm install --omit=dev --legacy-peer-deps

# Kopiere die gebauten Dateien vom Builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/payload.config.ts ./payload.config.ts
COPY --from=builder /app/src ./src

EXPOSE 3000

VOLUME ["/data", "/uploads"]

# Startet Next.js und bindet es an alle Netzwerk-Interfaces (wichtig für Docker)
CMD ["npx", "next", "start", "-H", "0.0.0.0"]