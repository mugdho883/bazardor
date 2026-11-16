import { getCategories, getProducts } from "@/lib/api";
import CategoryList from "@/components/CategoryList";
import EmptyState from "@/components/EmptyState";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [cats, products] = await Promise.all([getCategories(), getProducts(slug)]);
  const cat = cats.find((c) => c.slug === slug);
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {!cat || !products.length ? <EmptyState title="এই ক্যাটাগরিতে কোনো পণ্য নেই" text="ক্যাটাগরিটি সঠিক নয় বা এখানে এখনো কোনো পণ্য যোগ হয়নি।" /> : (
        <>
          <h1 className="mb-6 flex items-center gap-3 text-3xl font-bold"><span>{cat.emoji}</span>{cat.name}</h1>
          <CategoryList products={products} />
        </>
      )}
    </div>
  );
}
