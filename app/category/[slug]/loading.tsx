import { GridSkeleton } from "@/components/Skeletons";
export default function Loading() {
  return <div className="mx-auto max-w-6xl px-4 py-10"><div className="skeleton mb-6 h-9 w-48" /><GridSkeleton n={8} /></div>;
}
