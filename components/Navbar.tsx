"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { bnDate } from "@/lib/bn";
import type { Category } from "@/lib/api";

export default function Navbar({ categories }: { categories: Category[] }) {
  const path = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  async function signOut() {
    await authClient.signOut({ fetchOptions: { onSuccess: () => { toast.success("সফলভাবে সাইন আউট হয়েছে"); router.push("/"); router.refresh(); } } });
  }

  return (
    <header className="border-b border-base-300 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-icon.png" alt="" width={22} height={22} />
          <span className="leading-tight">
            <span className="block text-lg font-bold text-primary">বাজার দর</span>
            <span className="block text-[11px] text-base-content/60" suppressHydrationWarning>{bnDate()}</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          {isPending ? <div className="skeleton h-8 w-24" /> : session ? (
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="btn btn-ghost btn-sm sm:btn-md gap-2">
                <span className="avatar placeholder"><span className="w-7 rounded-full bg-primary text-primary-content">{session.user.name?.[0]?.toUpperCase()}</span></span>
                <span className="hidden sm:inline">{session.user.name}</span> ▾
              </button>
              <ul tabIndex={0} className="menu dropdown-content z-10 mt-2 w-48 rounded-box border border-base-300 bg-white p-2 shadow">
                <li><Link href="/profile">আমার প্রোফাইল</Link></li>
                <li><button onClick={signOut}>সাইন আউট</button></li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">সাইন ইন</Link>
              <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md">সাইন আপ</Link>
            </>
          )}
        </div>
      </div>
      <nav className="mx-auto max-w-6xl overflow-x-auto px-4 pb-2" aria-label="ক্যাটাগরি">
        <ul className="flex min-w-max gap-1 sm:justify-center">
          {categories.map((c) => {
            const active = path === `/category/${c.slug}`;
            return (
              <li key={c.slug}>
                <Link href={`/category/${c.slug}`} aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition ${active ? "bg-primary text-primary-content font-semibold" : "hover:bg-base-200"}`}>
                  <span>{c.emoji}</span>{c.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
