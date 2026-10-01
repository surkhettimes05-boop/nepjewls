const DEFAULT_KHALTI_API_URL =
  process.env.NODE_ENV === "production"
    ? "https://khalti.com/api/v2"
    : "https://dev.khalti.com/api/v2";

function getKhaltiConfig() {
  const secretKey = process.env.KHALTI_SECRET_KEY;
  if (!secretKey) throw new Error("KHALTI_SECRET_KEY is not defined");

  return {
    secretKey,
    apiUrl: (process.env.KHALTI_API_URL || DEFAULT_KHALTI_API_URL).replace(/\/$/, ""),
  };
}

export interface KhaltiInitParams {
  return_url: string;
  website_url: string;
  amount: number;
  purchase_order_id: string;
  purchase_order_name: string;
  customer_info: {
    name: string;
    email: string;
    phone: string;
  };
}

export async function initiateKhaltiPayment(params: KhaltiInitParams) {
  const { secretKey, apiUrl } = getKhaltiConfig();

  const response = await fetch(apiUrl + "/epayment/initiate/", {
    method: "POST",
    headers: {
      Authorization: "Key " + secretKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error("Khalti Init Error:", errorData);
    throw new Error("Failed to initiate Khalti payment");
  }

  return response.json();
}

export async function verifyKhaltiPayment(pidx: string) {
  const { secretKey, apiUrl } = getKhaltiConfig();

  const response = await fetch(apiUrl + "/epayment/lookup/", {
    method: "POST",
    headers: {
      Authorization: "Key " + secretKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pidx }),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error("Khalti Verify Error:", errorData);
    throw new Error("Failed to verify Khalti payment");
  }

  return response.json();
}
