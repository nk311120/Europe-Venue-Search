/**
 * Simple in-memory rate limiter for server actions.
 * In production, replace with a Redis/Upstash solution.
 * Max 5 inquiries per IP per hour.
 */

type Entry = { count: number; resetAt: number }
const store = new Map<string, Entry>()

const MAX_REQUESTS = 5
const WINDOW_MS = 60 * 60 * 1000 // 1 hour

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const existing = store.get(ip)

  if (!existing || now > existing.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true, remaining: MAX_REQUESTS - 1 }
  }

  if (existing.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 }
  }

  existing.count++
  return { allowed: true, remaining: MAX_REQUESTS - existing.count }
}

// Cleanup old entries every 10 minutes to prevent memory leaks
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of store.entries()) {
      if (now > entry.resetAt) store.delete(key)
    }
  }, 10 * 60 * 1000)
}
