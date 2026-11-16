import Link from "next/link";
import { bn } from "@/lib/bn";
import type { Product } from "@/lib/api";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link href={`/product/${p.slug}`} className="group block rounded-2xl border border-base-300 bg-white p-4 transition hover:border-primary hover:shadow-md focus-visible:outline-2 focus-visible:outline-primary">
      <div className="flex items-center gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-base-200 text-2xl">{p.emoji}</span>
        <div className="min-w-0">
          <h3 className="truncate font-semibold">{p.name}</h3>
          <p className="text-sm text-base-content/60">{p.unit}</p>
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between border-t border-base-300 pt-3">
        <div>
          <p className="text-xs text-base-content/60">আজকের দাম</p>
          <p className="text-lg font-bold text-primary">{bn(p.price)} টাকা</p>
        </div>
        <ChangeBadge change={p.change} />
      </div>
    </Link>
  );
}
