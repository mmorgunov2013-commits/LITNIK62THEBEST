# Next.js + Prisma для Render (Docker Web Service)
# В панели Render должны быть заданы DATABASE_URL и ADMIN_JWT_SECRET (для билда нужен DATABASE_URL).

FROM node:20-bookworm-slim AS base
WORKDIR /app

RUN apt-get update -y \
  && apt-get install -y openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
# npm ci часто падает на CI/Docker при мелких рассинхронах lock или peer-deps.
# DevDependencies нужны для next build (TypeScript, tailwind, eslint).
ENV NODE_ENV=development
RUN npm install

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

ENV NODE_ENV=production
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["npm", "start"]
