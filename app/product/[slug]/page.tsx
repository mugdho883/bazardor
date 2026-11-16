import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct } from "@/lib/api";
import { bn } from "@/lib/bn";
import ChangeBadge from "@/components/ChangeBadge";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) notFound();
  const stats = [["সর্বনিম্ন দাম", p.min], ["সর্বোচ্চ দাম", p.max], ["গড় দাম", p.avg]] as const;
  const top = Math.max(...p.markets.map((m) => m.price), 1);
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link href="/" className="text-sm text-primary hover:underline">← সব পণ্য</Link>
      <section className="mt-4 rounded-2xl border border-base-300 bg-white p-6">
        <div className="flex flex-wrap items-center gap-4">
          <span className="grid size-16 place-items-center rounded-2xl bg-base-200 text-4xl">{p.emoji}</span>
          <div>
            <h1 className="text-3xl font-bold">{p.name}</h1>
            {p.description && <p className="mt-1 text-base-content/70">{p.description}</p>}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          {[p.categoryName, ...p.tags].filter(Boolean).map((t) => <span key={t} className="badge badge-outline badge-primary">{t}</span>)}
          <span className="badge badge-ghost">{p.unit}</span>
          <ChangeBadge change={p.change} />
        </div>
      </section>
      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(([l, v]) => (
          <div key={l} className="rounded-2xl border border-base-300 bg-white p-4"><p className="text-sm text-base-content/60">{l}</p><p className="mt-1 text-2xl font-bold">{bn(v)} টাকা</p></div>
        ))}
        <div className="rounded-2xl bg-primary p-4 text-primary-content"><p className="text-sm opacity-80">আজকের দাম</p><p className="mt-1 text-2xl font-bold">{bn(p.price)} টাকা</p></div>
      </section>
      {p.markets.length > 0 && (
        <section className="mt-6 rounded-2xl border border-base-300 bg-white p-6">
          <h2 className="mb-4 text-xl font-bold">বাজারভিত্তিক আজকের দাম</h2>
          <ul className="space-y-3">
            {p.markets.map((m) => (
              <li key={m.name} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 sm:grid-cols-[10rem_1fr_6rem]">
                <span className="font-medium">{m.name}</span>
                <span className="text-right font-semibold sm:order-3">{bn(m.price)} টাকা</span>
                <span className="col-span-2 h-2 overflow-hidden rounded-full bg-base-200 sm:order-2 sm:col-span-1"><span className="block h-full rounded-full bg-primary" style={{ width: `${(m.price / top) * 100}%` }} /></span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
