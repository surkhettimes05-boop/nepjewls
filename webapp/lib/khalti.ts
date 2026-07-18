export const KHALTI_API_URL = "https://a.khalti.com/api/v2";

export interface KhaltiInitParams {
  return_url: string;
  website_url: string;
  amount: number; // in paisa (Rs * 100)
  purchase_order_id: string;
  purchase_order_name: string;
  customer_info: {
    name: string;
    email: string;
    phone: string;
  };
}

export async function initiateKhaltiPayment(params: KhaltiInitParams) {
  const secretKey = process.env.KHALTI_SECRET_KEY;
  if (!secretKey) throw new Error("KHALTI_SECRET_KEY is not defined");

  const response = await fetch(`${KHALTI_API_URL}/epayment/initiate/`, {
    method: "POST",
    headers: {
      "Authorization": `key ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error("Khalti Init Error:", errorData);
    throw new Error("Failed to initiate Khalti payment");
  }

  return response.json(); // { pidx, payment_url, expires_at, expires_in }
}

export async function verifyKhaltiPayment(pidx: string) {
  const secretKey = process.env.KHALTI_SECRET_KEY;
  if (!secretKey) throw new Error("KHALTI_SECRET_KEY is not defined");

  const response = await fetch(`${KHALTI_API_URL}/epayment/lookup/`, {
    method: "POST",
    headers: {
      "Authorization": `key ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pidx }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error("Khalti Verify Error:", errorData);
    throw new Error("Failed to verify Khalti payment");
  }

  return response.json(); // { status, transaction_id, total_amount, ... }
}
