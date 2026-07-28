const DS_API_BASE = "https://www.digistore24.com/api/call";

function getApiKey() {
  const key = process.env.DIGISTORE24_API_KEY;
  if (!key) throw new Error("DIGISTORE24_API_KEY not set in .env");
  return key;
}

async function dsCall(action: string, params: any = {}) {
  const form = new URLSearchParams();
  form.append("action", action);
  for (const [k, v] of Object.entries(params)) {
    if (typeof v === "object") {
      for (const [sk, sv] of Object.entries(v as any)) {
        form.append(`${k}[${sk}]`, String(sv));
      }
    } else {
      form.append(k, String(v));
    }
  }

  const res = await fetch(`${DS_API_BASE}/${action}`, {
    method: "POST",
    headers: {
      "X-DS-API-KEY": getApiKey(),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form.toString(),
  });

  const json = await res.json();
  if (json.result !== "success") {
    throw new Error(
      `Digistore24 API ${action} failed: ${json.message || JSON.stringify(json)}`,
    );
  }
  return json.data;
}

export async function getDigistoreProduct(productId: number | string) {
  const data = await dsCall("getProduct", { product_id: productId });
  return data;
}

export async function createAffiliateBuyUrl(
  productId: number | string,
  affiliateId: string = "ganeshyam_verma",
) {
  const data = await dsCall("createBuyUrl", {
    product_id: productId,
    tracking: { affiliate: affiliateId },
  });
  // API returns buy_url or url
  return data.buy_url || data.url || data;
}

export async function listDigistoreProducts() {
  const data = await dsCall("listProducts");
  return data;
}
