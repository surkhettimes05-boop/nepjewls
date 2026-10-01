export const ADMIN_COOKIE_NAME = "nepjewls_admin";

type AdminSessionPayload = {
  sub: string;
  exp: number;
};

const encoder = new TextEncoder();

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function stringToBase64Url(value: string): string {
  return bytesToBase64Url(encoder.encode(value));
}

function base64UrlToBytes(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(padded);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function base64UrlToString(value: string): string {
  return new TextDecoder().decode(base64UrlToBytes(value));
}

async function getSigningKey() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET must be configured with at least 32 characters");
  }

  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function createAdminSession(email: string): Promise<string> {
  const payload: AdminSessionPayload = {
    sub: email.toLowerCase(),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 8,
  };
  const payloadPart = stringToBase64Url(JSON.stringify(payload));
  const key = await getSigningKey();
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payloadPart));
  return payloadPart + "." + bytesToBase64Url(new Uint8Array(signature));
}

export async function verifyAdminSession(token?: string | null): Promise<boolean> {
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  try {
    const [payloadPart, signaturePart] = parts;
    const key = await getSigningKey();
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      base64UrlToBytes(signaturePart),
      encoder.encode(payloadPart)
    );

    if (!valid) return false;

    const payload = JSON.parse(base64UrlToString(payloadPart)) as AdminSessionPayload;
    const configuredEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();

    return Boolean(
      configuredEmail &&
      payload.sub === configuredEmail &&
      Number.isFinite(payload.exp) &&
      payload.exp > Math.floor(Date.now() / 1000)
    );
  } catch {
    return false;
  }
}
