export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-base-300 bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="skeleton size-12 rounded-xl" />
        <div className="flex-1 space-y-2"><div className="skeleton h-4 w-2/3" /><div className="skeleton h-3 w-1/3" /></div>
      </div>
      <div className="mt-4 flex justify-between border-t border-base-300 pt-3"><div className="skeleton h-6 w-24" /><div className="skeleton h-5 w-14 rounded-full" /></div>
    </div>
  );
}
export function GridSkeleton({ n = 8 }: { n?: number }) {
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-busy="true" aria-label="Loading…">{Array.from({ length: n }, (_, i) => <CardSkeleton key={i} />)}</div>;
}
