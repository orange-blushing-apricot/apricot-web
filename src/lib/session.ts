import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE = "apricot-session";
export const SESSION_TTL_SECONDS = 60 * 60 * 8;

const USERNAME = "admin";
const PASSWORD = "admin";

function secret(): string {
  const value = process.env.SESSION_SECRET;
  if (!value) throw new Error("SESSION_SECRET is not set");
  return value;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function checkCredentials(username: string, password: string): boolean {
  return username === USERNAME && password === PASSWORD;
}

export function createSessionToken(): string {
  const id = randomBytes(32).toString("base64url");
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = `${id}.${expiresAt}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  const parts = token?.split(".");
  if (parts?.length !== 3) return false;
  const [id, expiresAt, signature] = parts;
  const expected = Buffer.from(sign(`${id}.${expiresAt}`));
  const actual = Buffer.from(signature);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return false;
  return Number(expiresAt) > Date.now() / 1000;
}

export function safeRedirectPath(path: string | undefined): string {
  if (!path || !path.startsWith("/") || /[\\\x00-\x1f]/.test(path)) return "/";
  try {
    const url = new URL(path, "http://localhost");
    return url.origin === "http://localhost" ? url.pathname + url.search : "/";
  } catch {
    return "/";
  }
}
