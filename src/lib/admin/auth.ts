import crypto from 'node:crypto';

const encoder = new TextEncoder();

export async function hashPassword(password: string, salt?: string) {
  const resolvedSalt = salt || crypto.randomUUID();
  const data = encoder.encode(`${resolvedSalt}:${password}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  const hash = Buffer.from(digest).toString('hex');
  return `${resolvedSalt}:${hash}`;
}

export async function verifyPassword(password: string, storedHash: string) {
  const [salt] = storedHash.split(':');
  const recalculated = await hashPassword(password, salt);
  return crypto.timingSafeEqual(Buffer.from(recalculated), Buffer.from(storedHash));
}

export async function signSession(value: string, secret: string) {
  const hmac = crypto.createHmac('sha256', secret).update(value).digest('hex');
  return `${value}.${hmac}`;
}

export async function verifySession(token: string, secret: string) {
  const [value, signature] = token.split('.');
  if (!value || !signature) return false;
  const expected = crypto.createHmac('sha256', secret).update(value).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}
