"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabaseAuth";
import { useProtectedUser } from "@/lib/useProtectedUser";

export default function PasswordResetPage() {
  const router = useRouter();
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const { user, loading } = useProtectedUser({ allowReset: true });

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!user) {
      setError("You need to sign in again to reset your password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setSubmitting(true);

    const { error: updateError } = await supabase.auth.updateUser({
      password,
      data: {
        ...user.user_metadata,
        password_reset_required: false,
        first_login: user.user_metadata?.first_login || new Date().toISOString(),
      },
    });

    setSubmitting(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setSuccess("Password updated. Redirecting to the forge…");
    setTimeout(() => {
      router.push("/forge");
    }, 1200);
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900 text-white flex items-center justify-center">
        <p className="text-lg">Preparing your reset session…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900 text-white flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-md w-full bg-black/50 border border-purple-500/40 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Reset required</h1>
          <p className="text-sm text-gray-300 mt-2">OGs must set a new password before continuing.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-200">New password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full bg-zinc-900 border border-purple-500/50 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              placeholder="Enter a strong password"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-200">Confirm password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full bg-zinc-900 border border-purple-500/50 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              placeholder="Re-enter the password"
            />
          </div>

          {error && (
            <p className="text-xs text-red-300 bg-red-900/40 border border-red-700 rounded-xl px-3 py-2">{error}</p>
          )}
          {success && (
            <p className="text-xs text-green-300 bg-green-900/40 border border-green-700 rounded-xl px-3 py-2">{success}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 rounded-xl text-sm transform hover:scale-[1.02] transition-all disabled:opacity-60"
          >
            {submitting ? "Updating…" : "Update password"}
          </button>
        </form>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}
