import { bn } from "@/lib/bn";
import type { Product } from "@/lib/api";

export default function Ticker({ products }: { products: Product[] }) {
  if (!products.length) return null;
  const items = products.slice(0, 20);
  const row = (key: string) => items.map((p) => {
    const c = p.change > 0 ? "text-green-300" : p.change < 0 ? "text-red-300" : "text-white/60";
    return (
      <span key={key + p.id} className="flex items-center gap-2 whitespace-nowrap px-5 text-sm">
        <span>{p.emoji}</span><span className="font-medium">{p.name}</span>
        <span className="text-white/80">{bn(p.price)} টাকা/{p.unit.replace("প্রতি ", "")}</span>
        <span className={c}>{p.change > 0 ? "▲" : p.change < 0 ? "▼" : "—"} {bn(Math.abs(p.change), 1)}%</span>
      </span>
    );
  });
  return (
    <div className="marquee overflow-hidden bg-secondary py-2 text-secondary-content" aria-label="আজকের দামের তালিকা">
      <div className="marquee-track flex">{row("a")}{row("b")}</div>
    </div>
  );
}
