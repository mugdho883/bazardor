import { bn } from "@/lib/bn";
export default function ChangeBadge({ change }: { change: number }) {
  const up = change > 0, down = change < 0;
  const cls = up ? "bg-success/10 text-success" : down ? "bg-error/10 text-error" : "bg-base-300 text-base-content/60";
  const sym = up ? "▲" : down ? "▼" : "—";
  return <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${cls}`}>{sym} {bn(Math.abs(change), 1)}%</span>;
}
