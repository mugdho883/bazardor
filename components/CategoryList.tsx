"use client";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/api";
import ProductCard from "./ProductCard";

export default function CategoryList({ products }: { products: Product[] }) {
  const [sort, setSort] = useState("default");
  const list = useMemo(() => {
    const l = [...products]; // prices are numbers (Bengali digits already converted), so numeric sort is safe
    if (sort === "asc") l.sort((a, b) => a.price - b.price);
    if (sort === "desc") l.sort((a, b) => b.price - a.price);
    return l;
  }, [products, sort]);
  return (
    <>
      <label className="mb-4 flex items-center justify-end gap-2 text-sm">
        <span className="font-medium">সাজান:</span>
        <select className="select select-bordered select-sm sm:select-md w-auto" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </label>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>
    </>
  );
}
