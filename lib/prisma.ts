import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function getPrismaClient(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma
  try {
    const client = new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
    })
    if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client
    return client
  } catch (err) {
    console.warn("Prisma client instantiation fallback:", err)
    return new Proxy({} as any, {
      get(_target, prop) {
        if (prop === "$connect" || prop === "$disconnect") return () => Promise.resolve()
        return new Proxy({}, {
          get() {
            return () => Promise.reject(new Error("Banco de dados não disponível no momento."))
          }
        })
      },
    })
  }
}

export const prisma = getPrismaClient()

