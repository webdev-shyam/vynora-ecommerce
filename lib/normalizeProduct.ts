export function stripTrackingParams(input: string): string {
  if (!input) return input;
  try {
    const u = new URL(input);
    // Remove tracking params that break Next.js Image optimization and Digistore wrappers
    u.searchParams.delete("wsr");
    u.searchParams.delete("aff_id");
    // Keep others intact
    return u.toString();
  } catch {
    // Fallback: manual regex removal for non-standard URLs
    let s = input;
    s = s.replace(/([?&])wsr=[^&]*/gi, "");
    s = s.replace(/([?&])aff_id=[^&]*/gi, "");
    // Clean up dangling ? & separators
    s = s.replace(/\?&/g, "?").replace(/&&/g, "&").replace(/\?$/g, "").replace(/&$/g, "");
    s = s.replace(/\?&/, "?");
    return s;
  }
}

export function cleanImageUrl(val: any): string {
  const fallback =
    "https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg?auto=compress&cs=tinysrgb&w=800";
  if (!val) return fallback;
  let s = String(val).trim();
  if (!s) return fallback;

  // Markdown image ![alt](url)
  const imgMd = s.match(/!\[([^\]]*)\]\(([^)]+)\)/);
  if (imgMd && imgMd[2]) {
    s = imgMd[2].trim();
  } else {
    // Markdown link [text](url) or [url](url)
    const md = s.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (md) {
      const insideParen = md[2] ? md[2].trim() : "";
      const insideBracket = md[1] ? md[1].trim() : "";
      if (insideParen.startsWith("http")) s = insideParen;
      else if (insideBracket.startsWith("http")) s = insideBracket;
      else s = insideParen || insideBracket;
    }
  }

  // Parentheses wrapped (url)
  if (s.startsWith("(") && s.endsWith(")")) {
    s = s.slice(1, -1).trim();
  }

  // Strip tracking params ?wsr, ?aff_id
  s = stripTrackingParams(s);

  // Validate it's a http URL, else fallback
  if (!s.startsWith("http")) {
    // If after cleaning it's still not http, try to extract http substring
    const httpMatch = s.match(/https?:\/\/[^\s\]]+\)?/);
    if (httpMatch) {
      let extracted = httpMatch[0].replace(/\)$/, "");
      extracted = stripTrackingParams(extracted);
      return extracted;
    }
    return fallback;
  }

  return s || fallback;
}

export function cleanUrl(val: any): string {
  if (!val) return "";
  let s = String(val).trim();
  if (!s) return "";

  // Try image markdown first
  const imgMatch = s.match(/!\[([^\]]*)\]\(([^)]+)\)/);
  if (imgMatch && imgMatch[2]) {
    let url = imgMatch[2].trim();
    url = stripTrackingParams(url);
    return url;
  }

  // Markdown link [text](url)
  const mdMatch = s.match(/\[([^\]]+)\]\(([^)]+)\)/);
  if (mdMatch) {
    const text = (mdMatch[1] || "").trim();
    const url = (mdMatch[2] || "").trim();
    if (url.startsWith("http")) {
      return stripTrackingParams(url);
    }
    if (text.startsWith("http")) {
      return stripTrackingParams(text);
    }
    // If neither looks like URL, return url part stripped
    return stripTrackingParams(url || text);
  }

  // Parentheses (url)
  if (s.startsWith("(") && s.endsWith(")")) {
    s = s.slice(1, -1).trim();
  }

  // If contains markdown-like pattern with URL inside, extract first http
  if (s.includes("[") && s.includes("](")) {
    const inner = s.match(/https?:\/\/[^\s\)\]]+/);
    if (inner) return stripTrackingParams(inner[0]);
  }

  // Generic http extraction for strings like "[https://...](https://...)" leftover
  // For non-image URLs we keep tracking except wsr/aff_id cleaned for images?
  // We strip wsr/aff_id here as well as requested for bulk route
  if (s.startsWith("http")) {
    return stripTrackingParams(s);
  }

  return s;
}

export function toNumber(val: any, defaultVal = 0): number {
  if (typeof val === "number") return isNaN(val) ? defaultVal : val;
  if (!val) return defaultVal;
  const s = String(val).trim();
  const cleaned = s.replace(/[^0-9.-]+/g, "");
  const num = parseFloat(cleaned);
  return isNaN(num) ? defaultVal : num;
}

export function normalizeProduct(raw: any) {
  if (!raw || typeof raw !== "object") {
    return {
      title: "Imported Product",
      slug: "imported-product-" + Math.random().toString(36).substring(2, 7),
      description: "Imported product description",
      image: "https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: 47,
      category: "Business & Marketing",
      niche: "AI Tools",
      affiliateUrl: "https://example.com",
      commission: 50,
      rating: 4.5,
      featured: false,
      tags: [],
    };
  }

  const title =
    raw.title ||
    raw.productTitle ||
    raw.name ||
    raw.productID ||
    raw.product_title ||
    raw.id ||
    "Imported Product";

  const rawDesc =
    raw.description ||
    raw.productDescription ||
    raw.product_description ||
    raw.desc ||
    "";
  const cleanedDesc = cleanUrl(rawDesc);
  const description =
    cleanedDesc && !cleanedDesc.startsWith("http")
      ? cleanedDesc
      : typeof title === "string"
      ? `High-quality digital product and toolkit for ${title}.`
      : "Professional digital product.";

  const rawImage =
    raw.image ||
    raw.productImage ||
    raw.product_image ||
    (Array.isArray(raw.galleryImages) ? raw.galleryImages[0] : raw.galleryImages) ||
    raw.img ||
    "";
  const image = cleanImageUrl(rawImage);

  const rawAffUrl =
    raw.affiliateUrl ||
    raw.affiliateURL ||
    raw.originalURL ||
    raw.url ||
    raw.link ||
    raw.affiliate_url ||
    raw.productDescription ||
    "";
  const affiliateUrl = cleanUrl(rawAffUrl) || "https://example.com";

  const price = toNumber(
    raw.price ?? raw.originalPrice ?? raw.cost ?? raw.salePrice,
    47
  );

  const category =
    raw.category ||
    raw.brand ||
    raw.platform ||
    raw.niche ||
    "Business & Marketing";

  const niche =
    raw.niche ||
    raw.category ||
    raw.brand ||
    raw.platform ||
    "AI Tools";

  const rating = toNumber(raw.rating ?? raw.score, 4.6);
  const commission = toNumber(raw.commission, 50);
  const featured = Boolean(raw.featured ?? true);

  let tags = raw.tags;
  if (!Array.isArray(tags)) {
    if (typeof tags === "string") {
      tags = tags.split(",").map((t: string) => t.trim()).filter(Boolean);
    } else {
      tags = [category, niche].filter(Boolean);
    }
  }

  let slug =
    raw.slug ||
    (typeof title === "string" ? title : "product")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  if (!slug || slug.length < 2) {
    slug = "product-" + Math.random().toString(36).substring(2, 7);
  }

  return {
    title: String(title),
    slug: String(slug),
    description: String(description),
    image: String(image),
    price,
    category: String(category),
    niche: String(niche),
    affiliateUrl: String(affiliateUrl),
    commission,
    rating,
    featured,
    tags,
  };
}
