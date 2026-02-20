# Stage 1: Build the app
FROM node:20-alpine AS builder

# Notwendige Build-Tools für native Module (wie sharp) hinzufügen
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --legacy-peer-deps

# WICHTIG: Sharp explizit für Linux-Musl installieren
RUN npm install --os=linux --libc=musl --cpu=x64 sharp

COPY . .
# Payload braucht oft diese Env während des Builds
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Stage 2: Run the app
FROM node:20-alpine AS runner

ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

# System-Abhängigkeiten für Sharp auch im Runner bereitstellen
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json* ./
RUN npm install --omit=dev --legacy-peer-deps
# Auch im Runner die richtige Sharp-Version sicherstellen
RUN npm install --os=linux --libc=musl --cpu=x64 sharp

# Kopiere die gebauten Dateien
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
# Payload spezifische Dateien
COPY --from=builder /app/payload.config.ts ./payload.config.ts
COPY --from=builder /app/src ./src
# Falls vorhanden, kopiere die dist/build Ordner von Payload
COPY --from=builder /app/dist ./dist 

EXPOSE 3000

VOLUME ["/data", "/uploads"]

CMD ["npx", "next", "start", "-H", "0.0.0.0"]