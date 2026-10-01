import { scryptSync, timingSafeEqual } from "node:crypto";

export function verifyAdminCredentials(email: string, password: string): boolean {
  const expectedEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const encodedHash = process.env.ADMIN_PASSWORD_HASH?.trim();

  if (!expectedEmail || !encodedHash || !email || !password) return false;
  if (email.trim().toLowerCase() !== expectedEmail) return false;

  const [salt, expectedHex] = encodedHash.split(":");
  if (!salt || !expectedHex || !/^[a-f0-9]+$/i.test(expectedHex)) return false;

  try {
    const expected = Buffer.from(expectedHex, "hex");
    const actual = scryptSync(password, salt, expected.length);
    return expected.length === actual.length && timingSafeEqual(expected, actual);
  } catch {
    return false;
  }
}
