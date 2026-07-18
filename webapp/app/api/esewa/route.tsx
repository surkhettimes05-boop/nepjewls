import crypto from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { total_amount, transaction_uuid } = body;

    if (!total_amount || !transaction_uuid) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // eSewa specific variables (should be in .env, using test credentials as fallback)
    const ESEWA_MERCHANT_CODE = process.env.ESEWA_MERCHANT_CODE || "EPAYTEST";
    const ESEWA_SECRET_KEY = process.env.ESEWA_SECRET_KEY || "8gBm/:&EnhH.1/q";

    // eSewa signature format: total_amount,transaction_uuid,product_code
    const signatureString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${ESEWA_MERCHANT_CODE}`;
    
    // Generate HMAC SHA256 Signature
    const hash = crypto.createHmac('sha256', ESEWA_SECRET_KEY)
                       .update(signatureString)
                       .digest('base64');

    return NextResponse.json({ 
      signature: hash, 
      signed_field_names: "total_amount,transaction_uuid,product_code",
      merchant_code: ESEWA_MERCHANT_CODE
    });

  } catch (error) {
    console.error("eSewa Signature Generation Error:", error);
    return NextResponse.json({ error: "Failed to generate signature" }, { status: 500 });
  }
}
