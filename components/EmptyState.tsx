import Link from "next/link";
export default function EmptyState({ title = "কিছু পাওয়া যায়নি", text = "আপনি যে পেজটি খুঁজছেন সেটি নেই বা সরানো হয়েছে।" }: { title?: string; text?: string }) {
  return (
    <div className="mx-auto max-w-md py-20 text-center">
      <p className="text-7xl font-bold text-primary">৪০৪</p>
      <h2 className="mt-4 text-2xl font-bold">{title}</h2>
      <p className="mt-2 text-base-content/60">{text}</p>
      <Link href="/" className="btn btn-primary mt-6">হোম পেজে ফিরে যান</Link>
    </div>
  );
}
