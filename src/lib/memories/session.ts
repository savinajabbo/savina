import { SignJWT, jwtVerify } from "jose";

const COOKIE = "memories_session";

function getSecretKey() {
  const secret = process.env.MEMORIES_ADMIN_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "MEMORIES_ADMIN_SECRET must be set to a long random string (16+ characters)."
    );
  }
  return new TextEncoder().encode(secret);
}

export async function createMemoriesSessionToken() {
  return new SignJWT({ sub: "memories-admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecretKey());
}

export async function verifyMemoriesSessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload.sub === "memories-admin";
  } catch {
    return false;
  }
}

export const MEMORIES_SESSION_COOKIE = COOKIE;
