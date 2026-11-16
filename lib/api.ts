import { toEn } from "./bn";

const BASES = [
  process.env.NEXT_PUBLIC_API_URL || "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

export type Market = { name: string; price: number };
export type Product = {
  id: string; slug: string; name: string; emoji: string; unit: string; category: string;
  categoryName: string; price: number; change: number; description: string;
  min: number; max: number; avg: number; markets: Market[]; tags: string[];
};
export type Category = { slug: string; name: string; emoji: string };

export const FALLBACK_CATEGORIES: Category[] = [
  { slug: "chal", name: "চাল", emoji: "🍚" }, { slug: "dal", name: "ডাল", emoji: "🫘" },
  { slug: "tel", name: "তেল", emoji: "🛢️" }, { slug: "sobji", name: "সবজি", emoji: "🥬" },
  { slug: "mach", name: "মাছ", emoji: "🐟" }, { slug: "mangsho", name: "মাংস", emoji: "🍗" },
  { slug: "dim-dudh", name: "ডিম-দুধ", emoji: "🥛" }, { slug: "moshla", name: "মসলা", emoji: "🌶️" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Raw = Record<string, any>;
const pick = (o: Raw, keys: string[]) => { for (const k of keys) if (o?.[k] !== undefined && o[k] !== null) return o[k]; };
const num = (v: unknown): number => {
  if (typeof v === "number") return v;
  if (typeof v === "string") { const n = parseFloat(toEn(v).replace(/[^\d.\-]/g, "")); return isNaN(n) ? 0 : n; }
  return 0;
};
const unwrap = (j: Raw | Raw[]): Raw[] => {
  if (Array.isArray(j)) return j;
  for (const k of ["data", "products", "categories", "items", "result"]) if (Array.isArray(j?.[k])) return j[k];
  return [];
};

export function normalizeProduct(r: Raw): Product {
  const id = String(pick(r, ["id", "_id", "productId"]) ?? "");
  const cat = pick(r, ["category", "categorySlug", "category_slug"]);
  const catSlug = typeof cat === "object" ? String(cat?.slug ?? cat?.id ?? "") : String(cat ?? "");
  const catName = typeof cat === "object" ? String(cat?.name ?? "") : String(pick(r, ["categoryName", "category_name"]) ?? "");
  const rawMarkets = pick(r, ["markets", "bazars", "bazaars", "marketPrices", "market_prices", "prices"]);
  const markets: Market[] = Array.isArray(rawMarkets)
    ? rawMarkets.map((m: Raw) => ({ name: String(pick(m, ["name", "market", "bazar", "bazaar", "marketName"]) ?? ""), price: num(pick(m, ["price", "value", "todayPrice"])) }))
    : rawMarkets && typeof rawMarkets === "object"
      ? Object.entries(rawMarkets).map(([name, p]) => ({ name, price: num(p) }))
      : [];
  const price = num(pick(r, ["price", "todayPrice", "today_price", "currentPrice", "current_price", "avgPrice", "average"]));
  const prices = markets.map((m) => m.price).filter(Boolean);
  const tags = pick(r, ["tags", "categories"]);
  return {
    id, slug: String(pick(r, ["slug"]) ?? id),
    name: String(pick(r, ["name", "title", "nameBn", "name_bn"]) ?? ""),
    emoji: String(pick(r, ["emoji", "icon", "image", "thumbnail"]) ?? "🛒"),
    unit: String(pick(r, ["unit", "perUnit"]) ?? ""),
    category: catSlug, categoryName: catName,
    price: price || (prices.length ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0),
    change: num(pick(r, ["change", "changePercent", "change_percent", "percent", "percentage", "priceChange", "price_change"])),
    description: String(pick(r, ["description", "summary", "subtitle"]) ?? ""),
    min: num(pick(r, ["minPrice", "min_price", "min"])) || (prices.length ? Math.min(...prices) : 0),
    max: num(pick(r, ["maxPrice", "max_price", "max"])) || (prices.length ? Math.max(...prices) : 0),
    avg: num(pick(r, ["avgPrice", "avg_price", "average", "averagePrice"])) || (prices.length ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : price),
    markets,
    tags: Array.isArray(tags) ? tags.map((t: unknown) => (typeof t === "string" ? t : String((t as Raw)?.name ?? ""))).filter(Boolean) : [],
  };
}

async function get(path: string): Promise<Raw | Raw[] | null> {
  for (const base of BASES) {
    try {
      const res = await fetch(base + path, { next: { revalidate: 120 } });
      if (res.ok) return await res.json();
    } catch { /* try next base */ }
  }
  return null;
}

export async function getProducts(category?: string): Promise<Product[]> {
  const j = await get(category ? `/products?category=${encodeURIComponent(category)}` : "/products");
  return j ? unwrap(j).map(normalizeProduct) : [];
}
export async function getProduct(id: string): Promise<Product | null> {
  const j = await get(`/products/${encodeURIComponent(id)}`);
  if (!j) return null;
  const r = Array.isArray(j) ? j[0] : (j.data && !Array.isArray(j.data) ? j.data : j.product ?? j);
  return r && (r.name || r.title || r.id) ? normalizeProduct(r) : null;
}
export async function getCategories(): Promise<Category[]> {
  const j = await get("/categories");
  const list = j ? unwrap(j).map((c) => ({
    slug: String(pick(c, ["slug", "id", "_id"]) ?? ""), name: String(pick(c, ["name", "title"]) ?? ""),
    emoji: String(pick(c, ["emoji", "icon"]) ?? "🛒"),
  })).filter((c) => c.slug && c.name) : [];
  return list.length ? list : FALLBACK_CATEGORIES;
}
