import { createHmac, timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE = "apricot-session";

const USERNAME = "admin";
const PASSWORD = "admin";

function secret(): string {
  const value = process.env.SESSION_SECRET;
  if (!value) throw new Error("SESSION_SECRET is not set");
  return value;
}

function sign(username: string): string {
  return createHmac("sha256", secret()).update(username).digest("base64url");
}

export function checkCredentials(username: string, password: string): boolean {
  return username === USERNAME && password === PASSWORD;
}

export function createSessionToken(username: string): string {
  return `${username}.${sign(username)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const [username, signature] = token.split(".");
  if (!username || !signature) return false;
  const expected = Buffer.from(sign(username));
  const actual = Buffer.from(signature);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export function safeRedirectPath(path: string | undefined): string {
  return path?.startsWith("/") && !path.startsWith("//") ? path : "/";
}
