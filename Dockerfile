FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine AS runner

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/payload.config.ts ./payload.config.ts
COPY --from=builder /app/src ./src

EXPOSE 3000

VOLUME ["/data", "/uploads"]

CMD ["npx", "next", "start", "-H", "0.0.0.0"]

