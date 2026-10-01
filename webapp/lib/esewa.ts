import crypto, { timingSafeEqual } from "node:crypto";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(name + " is not configured");
  return value;
}

function normalizeAmount(amount: number | string): string {
  const numeric = Number(String(amount).replace(/,/g, ""));
  if (!Number.isFinite(numeric) || numeric <= 0) {
    throw new Error("Invalid eSewa amount");
  }
  return numeric.toFixed(2).replace(/\.00$/, "");
}

function getEsewaConfig() {
  return {
    merchantId: requireEnv("ESEWA_MERCHANT_ID"),
    secretKey: requireEnv("ESEWA_SECRET_KEY"),
    paymentUrl: requireEnv("ESEWA_PAYMENT_URL"),
    statusUrl: requireEnv("ESEWA_STATUS_URL"),
  };
}

export function generateEsewaSignature(secretKey: string, message: string) {
  return crypto.createHmac("sha256", secretKey).update(message).digest("base64");
}

export function createEsewaPayload(amount: number, transactionId: string) {
  const { merchantId, secretKey, paymentUrl } = getEsewaConfig();
  const totalAmount = normalizeAmount(amount);
  const message =
    "total_amount=" + totalAmount +
    ",transaction_uuid=" + transactionId +
    ",product_code=" + merchantId;

  return {
    paymentUrl,
    fields: {
      amount: totalAmount,
      tax_amount: "0",
      total_amount: totalAmount,
      transaction_uuid: transactionId,
      product_code: merchantId,
      product_service_charge: "0",
      product_delivery_charge: "0",
      success_url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000") + "/checkout/success?gateway=esewa",
      failure_url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000") + "/checkout/failure",
      signed_field_names: "total_amount,transaction_uuid,product_code",
      signature: generateEsewaSignature(secretKey, message),
    },
  };
}

export function verifyEsewaResponseSignature(data: Record<string, unknown>): boolean {
  const { merchantId, secretKey } = getEsewaConfig();
  const signature = typeof data.signature === "string" ? data.signature : "";
  const signedFieldNames = typeof data.signed_field_names === "string" ? data.signed_field_names : "";

  if (!signature || !signedFieldNames || data.product_code !== merchantId) return false;

  const fields = signedFieldNames.split(",").map((field) => field.trim()).filter(Boolean);
  const required = ["transaction_code", "status", "total_amount", "transaction_uuid", "product_code", "signed_field_names"];
  if (!required.every((field) => fields.includes(field))) return false;

  const message = fields.map((field) => field + "=" + String(data[field] ?? "")).join(",");
  const expected = Buffer.from(generateEsewaSignature(secretKey, message));
  const actual = Buffer.from(signature);

  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export async function verifyEsewaPayment(totalAmount: number, transactionUuid: string) {
  const { merchantId, statusUrl } = getEsewaConfig();
  const url = new URL(statusUrl);
  url.searchParams.set("product_code", merchantId);
  url.searchParams.set("total_amount", normalizeAmount(totalAmount));
  url.searchParams.set("transaction_uuid", transactionUuid);

  const response = await fetch(url, { method: "GET", cache: "no-store" });

  if (!response.ok) {
    const errorData = await response.text();
    console.error("eSewa Verify Error:", errorData);
    throw new Error("Failed to verify eSewa payment");
  }

  return response.json();
}
