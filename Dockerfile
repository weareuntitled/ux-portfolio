# Stage 1: Build
FROM node:20-bookworm-slim AS builder
WORKDIR /app

# Copy only dependency manifests before install for deterministic layer caching.
COPY package.json package-lock.json* ./
RUN npm ci --legacy-peer-deps

# Force install the standard Linux sharp binary WITH legacy-peer-deps
RUN npm install --os=linux --cpu=x64 sharp --legacy-peer-deps

COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Stage 2: Run
FROM node:20-bookworm-slim AS runner
ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev --legacy-peer-deps

# Force install sharp for runtime image optimization WITH legacy-peer-deps
RUN npm install --os=linux --cpu=x64 sharp --legacy-peer-deps

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "node_modules/next/dist/bin/next", "start", "-H", "0.0.0.0", "-p", "3000"]