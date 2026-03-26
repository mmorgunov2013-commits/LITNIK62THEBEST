import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

/**
 * Neon: в `DATABASE_URL` для pooler-хоста добавьте `?sslmode=require&pgbouncer=true`
 * (и при обрывах — `connection_limit=1`). Отдельный non-pooler URL для миграций — в `DIRECT_URL`,
 * если настроите в schema.prisma.
 */
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
