"use client";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function Profile() {
  const { data, isPending } = authClient.useSession();
  const u = data?.user;
  return (
    <div className="mx-auto my-10 max-w-md px-4">
      <div className="rounded-2xl border border-base-300 bg-white p-6 text-center">
        {isPending || !u ? <div className="space-y-3"><div className="skeleton mx-auto size-20 rounded-full" /><div className="skeleton mx-auto h-5 w-40" /><div className="skeleton mx-auto h-4 w-52" /></div> : (
          <>
            <div className="avatar placeholder"><div className="w-20 rounded-full bg-primary text-3xl text-primary-content">{u.image ? <img src={u.image} alt="" /> : u.name?.[0]?.toUpperCase()}</div></div>
            <h1 className="mt-3 text-2xl font-bold">{u.name}</h1>
            <p className="text-base-content/70">{u.email}</p>
            <Link href="/profile/update" className="btn btn-primary mt-6">তথ্য আপডেট করুন</Link>
          </>
        )}
      </div>
    </div>
  );
}
