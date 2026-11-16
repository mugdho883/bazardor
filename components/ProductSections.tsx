import { getProducts } from "@/lib/api";
import ProductCard from "./ProductCard";
import EmptyState from "./EmptyState";

const grid = "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

export default async function ProductSections() {
  const all = await getProducts();
  if (!all.length) return <EmptyState title="পণ্যের তালিকা লোড করা যায়নি" text="একটু পরে আবার চেষ্টা করুন।" />;
  const risers = [...all].filter((p) => p.change > 0).sort((a, b) => b.change - a.change).slice(0, 6);
  const fallers = [...all].filter((p) => p.change < 0).sort((a, b) => a.change - b.change).slice(0, 6);
  return (
    <>
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold text-success">আজ দাম বেড়েছে ▲</h2>
        <div className={grid}>{risers.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      </section>
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold text-error">আজ দাম কমেছে ▼</h2>
        <div className={grid}>{fallers.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      </section>
      <section id="সব-পণ্য" className="scroll-mt-4">
        <h2 className="text-2xl font-bold">সব পণ্য</h2>
        <p className="mb-4 text-base-content/60">আজকের বাজারে পাওয়া সব পণ্যের দাম ও পরিবর্তন।</p>
        <div className={grid}>{all.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      </section>
    </>
  );
}
