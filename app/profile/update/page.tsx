"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfile() {
  const router = useRouter();
  const { data } = authClient.useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => { if (data?.user.name) setName(data.user.name); }, [data]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return toast.error("নাম খালি রাখা যাবে না");
    setLoading(true);
    const { error } = await authClient.updateUser({ name: name.trim() });
    setLoading(false);
    if (error) return toast.error(error.message || "আপডেট করা যায়নি");
    toast.success("তথ্য আপডেট হয়েছে");
    router.push("/profile"); router.refresh();
  }
  return (
    <div className="mx-auto my-10 max-w-md px-4">
      <form onSubmit={submit} className="space-y-4 rounded-2xl border border-base-300 bg-white p-6">
        <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
        <label className="block"><span className="mb-1 block text-sm">নাম</span><input className="input input-bordered w-full" value={name} onChange={(e) => setName(e.target.value)} /></label>
        <button className="btn btn-primary w-full" disabled={loading}>{loading ? <span className="loading loading-spinner" /> : "তথ্য আপডেট করুন"}</button>
      </form>
    </div>
  );
}
