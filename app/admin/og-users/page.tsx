"use client";

import { useEffect, useState } from "react";
import { useProtectedUser } from "@/lib/useProtectedUser";

interface OgUser {
  id: string;
  email: string | null;
  created_at: string | null;
  first_login: string | null;
  password_reset_required: boolean;
  referral_code: string | null;
  tier: string | null;
}

export default function OgUsersPage() {
  const { user, loading } = useProtectedUser();
  const [ogUsers, setOgUsers] = useState<OgUser[]>([]);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setFetching(true);
      setError(null);
      const res = await fetch("/api/admin/og-users");
      if (!res.ok) {
        setError("Unable to load OG roster.");
        setFetching(false);
        return;
      }
      const data = await res.json();
      setOgUsers(data.users || []);
      setFetching(false);
    };

    if (user) {
      load();
    }
  }, [user]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Checking admin access…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Admin</p>
          <h1 className="text-4xl font-bold">OG user registry</h1>
          <p className="text-sm text-gray-400">Email confirmations are pre-verified. Track password reset enforcement and referral codes here.</p>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-zinc-950/70 shadow-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-zinc-900 text-gray-300">
              <tr>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Created</th>
                <th className="px-4 py-3 text-left">First login</th>
                <th className="px-4 py-3 text-left">Reset required</th>
                <th className="px-4 py-3 text-left">Referral code</th>
                <th className="px-4 py-3 text-left">Tier</th>
              </tr>
            </thead>
            <tbody>
              {fetching && (
                <tr>
                  <td colSpan={6} className="px-4 py-4 text-center text-gray-400">
                    Loading OG users…
                  </td>
                </tr>
              )}
              {!fetching && ogUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-4 text-center text-gray-500">
                    No OG users found.
                  </td>
                </tr>
              )}
              {ogUsers.map((og) => (
                <tr key={og.id} className="border-t border-gray-800">
                  <td className="px-4 py-3 font-medium">{og.email}</td>
                  <td className="px-4 py-3 text-gray-400">{og.created_at ? new Date(og.created_at).toLocaleString() : "—"}</td>
                  <td className="px-4 py-3 text-gray-400">{og.first_login ? new Date(og.first_login).toLocaleString() : "Not yet"}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${og.password_reset_required ? "bg-red-500/20 text-red-300" : "bg-green-500/20 text-green-300"}`}>
                      {og.password_reset_required ? "Required" : "Cleared"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 font-mono">{og.referral_code || "—"}</td>
                  <td className="px-4 py-3 text-gray-300">{og.tier || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
