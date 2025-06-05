# Base image
FROM node:18-alpine AS base

WORKDIR /app

RUN apk add --no-cache libc6-compat


# Install dependencies
FROM base AS deps

WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma

RUN npm install --frozen-lockfile


# Build the app
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN npm run build


# Production image
FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]
