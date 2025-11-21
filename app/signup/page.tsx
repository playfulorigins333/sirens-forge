"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabaseAuth";

export default function SignupPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess(true);

    if (data.session) {
      router.push("/forge");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md rounded-xl border border-zinc-700 bg-zinc-950/90 p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Create your Sirens Forge account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md bg-zinc-900 border border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md bg-zinc-900 border border-zinc-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 bg-red-950/40 border border-red-700 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          {success && (
            <p className="text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-700 rounded-md px-3 py-2">
              Account created. Check your email for any confirmation steps, or
              you&apos;ll be redirected shortly.
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-fuchsia-600 hover:bg-fuchsia-500 disabled:opacity-60 py-2 text-sm font-semibold"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>
      </div>
    </main>
  );
}
