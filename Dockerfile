# Next.js + Prisma для Render (Docker Web Service)
# В панели Render: DATABASE_URL, ADMIN_JWT_SECRET (для prisma migrate в build).

FROM node:20-bookworm-slim AS base
WORKDIR /app

# python3/make/g++ — если какой-то пакет тянет нативную сборку; openssl — для Prisma
RUN apt-get update -y \
  && apt-get install -y openssl ca-certificates python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
ENV NODE_ENV=development
# postinstall (prisma generate) в Docker иногда падает до полного COPY — отключаем скрипты
RUN npm install --ignore-scripts --legacy-peer-deps --no-audit --no-fund

COPY . .

# Сборка без migrate: в Docker build нет DATABASE_URL (P1012). Миграции — при старте.
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS=--max-old-space-size=4096
RUN npm run build:docker

ENV NODE_ENV=production
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Runtime: Render подставляет DATABASE_URL; затем next start
CMD ["sh", "-c", "npx prisma migrate deploy && exec npm start"]
