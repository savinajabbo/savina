import { createHash, timingSafeEqual } from "node:crypto";

function sha256Utf8(value: string) {
  return createHash("sha256").update(value, "utf8").digest();
}

/** Constant-time comparison of two secrets without leaking length via timing. */
export function safeCompareSecret(input: string, secret: string) {
  const a = sha256Utf8(input);
  const b = sha256Utf8(secret);
  return timingSafeEqual(a, b);
}
