import crypto from 'crypto';

export const ESEWA_API_URL = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
export const ESEWA_STATUS_URL = "https://rc-epay.esewa.com.np/api/epay/transaction/status/";

export function generateEsewaSignature(secretKey: string, message: string) {
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(message);
  return hmac.digest('base64');
}

export function createEsewaPayload(amount: number, transactionId: string) {
  // Test merchant ID is usually EPAYTEST for testing environments
  const merchantId = process.env.ESEWA_MERCHANT_ID || 'EPAYTEST';
  // Use a hardcoded test secret key for EPAYTEST if not provided
  const secretKey = process.env.ESEWA_SECRET_KEY || '8gBm/:&EnhH.1/q'; 

  // The signature message is usually: total_amount,transaction_uuid,product_code
  const message = `${amount},${transactionId},${merchantId}`;
  const signature = generateEsewaSignature(secretKey, message);

  return {
    amount: amount,
    tax_amount: 0,
    total_amount: amount,
    transaction_uuid: transactionId,
    product_code: merchantId,
    product_service_charge: 0,
    product_delivery_charge: 0,
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout/success?gateway=esewa`,
    failure_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout/failure`,
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature: signature,
  };
}

export async function verifyEsewaPayment(product_code: string, total_amount: number, transaction_uuid: string) {
  // eSewa verifies by hitting their status API
  const url = `${ESEWA_STATUS_URL}?product_code=${product_code}&total_amount=${total_amount}&transaction_uuid=${transaction_uuid}`;
  
  const response = await fetch(url, {
    method: 'GET',
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error("eSewa Verify Error:", errorData);
    throw new Error("Failed to verify eSewa payment");
  }

  return response.json();
}
