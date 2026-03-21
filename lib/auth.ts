import { cookies } from "next/headers";
import * as jose from "jose";

const COOKIE = "litnik_admin";

export async function createAdminToken(adminId: string): Promise<string> {
  const secret = new TextEncoder().encode(
    process.env.ADMIN_JWT_SECRET ?? "dev-insecure-secret",
  );
  return new jose.SignJWT({ sub: adminId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyAdminToken(token: string): Promise<string | null> {
  try {
    const secret = new TextEncoder().encode(
      process.env.ADMIN_JWT_SECRET ?? "dev-insecure-secret",
    );
    const { payload } = await jose.jwtVerify(token, secret);
    return typeof payload.sub === "string" ? payload.sub : null;
  } catch {
    return null;
  }
}

export async function getAdminIdFromCookies(): Promise<string | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

export async function setAdminCookie(token: string) {
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminCookie() {
  const jar = await cookies();
  jar.delete(COOKIE);
}
