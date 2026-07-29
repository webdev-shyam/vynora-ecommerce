export function cleanUrl(val: any): string {
  if (!val) return "";
  let s = String(val).trim();
  // Markdown link [text](url) or [https://...](https://...)
  const mdMatch = s.match(/\[([^\]]+)\]\(([^)]+)\)/);
  if (mdMatch) {
    if (mdMatch[2] && mdMatch[2].startsWith("http")) return mdMatch[2];
    if (mdMatch[1] && mdMatch[1].startsWith("http")) return mdMatch[1];
    return mdMatch[2] || mdMatch[1];
  }
  // Markdown image ![alt](url)
  const imgMatch = s.match(/!\[([^\]]*)\]\(([^)]+)\)/);
  if (imgMatch) {
    return imgMatch[2];
  }
  // Parentheses (url)
  if (s.startsWith("(") && s.endsWith(")")) {
    s = s.slice(1, -1).trim();
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
  const image =
    cleanUrl(rawImage) ||
    "https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg?auto=compress&cs=tinysrgb&w=800";

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
