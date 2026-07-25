// Safe Prisma client wrapper - works in mock mode without DATABASE_URL or engine binary
let prismaClient: any = null;
let prismaError: any = null;

function createClient() {
  if (prismaClient) return prismaClient;
  if (prismaError) return null;

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    // No DB configured - use mock mode
    return null;
  }

  try {
    // Lazy require to avoid build-time failure when engine missing
    const { PrismaClient } = require('@prisma/client');
    prismaClient = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    });

    // Cache globally in dev to avoid hot-reload multiple clients
    if (process.env.NODE_ENV !== 'production') {
      const g = globalThis as any;
      if (!g.__prisma) g.__prisma = prismaClient;
      else prismaClient = g.__prisma;
    }

    return prismaClient;
  } catch (e) {
    console.warn('Prisma Client initialization failed, falling back to mock mode:', (e as any).message);
    prismaError = e;
    return null;
  }
}

// Export a proxy that lazily creates client
export const prisma = new Proxy({} as any, {
  get(_target, prop) {
    const client = createClient();
    if (!client) {
      // Return a function that throws or returns mock behavior
      // For build time collection, we return a dummy that would fail gracefully in tryDb
      return (..._args: any[]) => {
        throw new Error('Prisma client not available - using mock fallback');
      };
    }
    const value = client[prop];
    if (typeof value === 'function') {
      return value.bind(client);
    }
    return value;
  },
});

// Helper to safely get client or null
export function getPrismaClient() {
  return createClient();
}

export default prisma;
