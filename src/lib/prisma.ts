import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

/**
 * Single PrismaClient per runtime instance. Cached on globalThis in every
 * environment: in dev it survives HMR, in production it prevents a new client
 * (and connection pool) per call.
 */
export function getPrisma() {
  globalForPrisma.prisma ??= new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

  return globalForPrisma.prisma;
}
