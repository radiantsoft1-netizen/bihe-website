/**
 * Edge login throttling for proxied /admin/login POST requests.
 * Laravel also enforces AUTH_LOGIN_THROTTLE — this is defense-in-depth at the Next.js edge.
 *
 * Note: in-memory buckets are per serverless isolate. For multi-region production,
 * configure UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN (future step).
 */

const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000;

type Bucket = {
  attempts: number;
  lockedUntil: number;
};

const buckets = new Map<string, Bucket>();

function pruneExpired(now: number): void {
  if (buckets.size < 500) {
    return;
  }

  for (const [key, bucket] of buckets) {
    if (bucket.lockedUntil > 0 && bucket.lockedUntil <= now && bucket.attempts === 0) {
      buckets.delete(key);
    }
  }
}

export type AdminLoginRateLimitResult = {
  allowed: boolean;
  retryAfterSeconds?: number;
};

export function checkAdminLoginRateLimit(clientIp: string): AdminLoginRateLimitResult {
  const now = Date.now();
  pruneExpired(now);

  const bucket = buckets.get(clientIp) ?? { attempts: 0, lockedUntil: 0 };

  if (bucket.lockedUntil > now) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((bucket.lockedUntil - now) / 1000),
    };
  }

  if (bucket.lockedUntil > 0 && bucket.lockedUntil <= now) {
    bucket.attempts = 0;
    bucket.lockedUntil = 0;
  }

  bucket.attempts += 1;

  if (bucket.attempts > MAX_ATTEMPTS) {
    bucket.lockedUntil = now + LOCKOUT_MS;
    buckets.set(clientIp, bucket);

    return {
      allowed: false,
      retryAfterSeconds: Math.ceil(LOCKOUT_MS / 1000),
    };
  }

  buckets.set(clientIp, bucket);
  return { allowed: true };
}
