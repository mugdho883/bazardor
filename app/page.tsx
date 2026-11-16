import { Suspense } from "react";
import Hero from "@/components/Hero";
import ProductSections from "@/components/ProductSections";
import { GridSkeleton } from "@/components/Skeletons";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="mx-auto max-w-6xl px-4 pt-10">
        <Suspense fallback={<GridSkeleton n={8} />}><ProductSections /></Suspense>
      </div>
    </>
  );
}
