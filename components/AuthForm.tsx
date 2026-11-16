"use client";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

function Inner({ mode }: { mode: "signin" | "signup" }) {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const isUp = mode === "signup";

  useEffect(() => {
    if (params.get("reason") === "login") toast.error("এই পেজ দেখতে আগে সাইন ইন করুন", { id: "login-required" });
  }, [params]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim(), email = String(f.get("email")).trim(), password = String(f.get("password"));
    if (isUp && !name) return fail("নাম লিখুন");
    if (!/^\S+@\S+\.\S+$/.test(email)) return fail("সঠিক ইমেইল দিন");
    if (password.length < 8) return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    setLoading(true);
    const res = isUp ? await authClient.signUp.email({ name, email, password }) : await authClient.signIn.email({ email, password });
    setLoading(false);
    if (res.error) return fail(res.error.message || "কিছু একটা ভুল হয়েছে");
    if (isUp) { toast.success("রেজিস্ট্রেশন সফল! এখন সাইন ইন করুন"); router.push("/signin"); }
    else { toast.success("সফলভাবে সাইন ইন হয়েছে"); router.push(redirect); router.refresh(); }
  }
  function fail(msg: string) { setError(msg); toast.error(msg); }
  async function social(provider: "google" | "github") {
    const { error } = await authClient.signIn.social({ provider, callbackURL: isUp ? "/" : redirect });
    if (error) fail(error.message || "সোশ্যাল লগইন করা যায়নি");
  }

  return (
    <div className="mx-auto my-10 w-full max-w-md rounded-2xl border border-base-300 bg-white p-6 sm:p-8">
      <h1 className="text-2xl font-bold">{isUp ? "নতুন অ্যাকাউন্ট খুলুন" : "সাইন ইন করুন"}</h1>
      <form onSubmit={submit} className="mt-5 space-y-4" noValidate>
        {isUp && <label className="form-control block"><span className="mb-1 block text-sm">নাম</span><input name="name" className="input input-bordered w-full" autoComplete="name" /></label>}
        <label className="form-control block"><span className="mb-1 block text-sm">ইমেইল</span><input name="email" type="email" className="input input-bordered w-full" autoComplete="email" /></label>
        <label className="form-control block"><span className="mb-1 block text-sm">পাসওয়ার্ড</span><input name="password" type="password" className="input input-bordered w-full" autoComplete={isUp ? "new-password" : "current-password"} /></label>
        {error && <p role="alert" className="rounded-lg bg-error/10 px-3 py-2 text-sm text-error">{error}</p>}
        <button className="btn btn-primary w-full" disabled={loading}>{loading ? <span className="loading loading-spinner" /> : isUp ? "রেজিস্টার করুন" : "সাইন ইন"}</button>
      </form>
      <div className="divider text-xs">অথবা</div>
      <div className="grid gap-2 sm:grid-cols-2">
        <button type="button" onClick={() => social("google")} className="btn btn-outline">Google</button>
        <button type="button" onClick={() => social("github")} className="btn btn-outline">GitHub</button>
      </div>
      <p className="mt-5 text-center text-sm text-base-content/70">
        {isUp ? <>আগে থেকেই অ্যাকাউন্ট আছে? <Link className="link link-primary" href="/signin">সাইন ইন</Link></> : <>অ্যাকাউন্ট নেই? <Link className="link link-primary" href="/signup">সাইন আপ</Link></>}
      </p>
    </div>
  );
}
export default function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  return <Suspense fallback={<div className="skeleton mx-auto my-10 h-96 w-full max-w-md" />}><Inner mode={mode} /></Suspense>;
}
