// app/success/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [muse, setMuse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      fetch(`/api/fulfill-muse?session_id=${sessionId}`)
        .then(res => res.json())
        .then(data => {
          setMuse(data.muse);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [sessionId]);

  if (!sessionId) {
    return <div className="text-center py-20 text-red-500">Invalid session. Please contact support.</div>;
  }

  if (loading) {
    return <div className="text-center py-20 text-cyan-400">Delivering your Vault Muse...</div>;
  }

  if (!muse) {
    return <div className="text-center py-20 text-red-500">Muse not found. Contact support.</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white py-20 px-6">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
          MUSE DELIVERED
        </h1>
        <p className="text-xl mt-4 text-gray-300">Your AI Siren is ready — R2 instant access</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-purple-900/50 to-black border border-purple-500/50 rounded-3xl p-10 text-center">
          <h2 className="text-4xl font-bold text-purple-400">{muse.name}</h2>
          <p className="text-lg text-gray-300 mt-2">{muse.tier} Tier</p>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-black/50 p-6 rounded-xl border border-cyan-500/30">
              <p className="text-3xl font-bold text-cyan-400">{muse.images}</p>
              <p className="text-sm text-gray-400">4K Images</p>
            </div>
            <div className="bg-black/50 p-6 rounded-xl border border-purple-500/30">
              <p className="text-3xl font-bold text-purple-400">{muse.teasers}</p>
              <p className="text-sm text-gray-400">Teasers</p>
            </div>
            <div className="bg-black/50 p-6 rounded-xl border border-pink-500/30">
              <p className="text-3xl font-bold text-pink-400">{muse.videos}</p>
              <p className="text-sm text-gray-400">Videos</p>
            </div>
            <div className="bg-black/50 p-6 rounded-xl border border-yellow-500/30">
              <p className="text-3xl font-bold text-yellow-400">1</p>
              <p className="text-sm text-gray-400">Voice Pack</p>
            </div>
          </div>

          <div className="mt-10">
            <a
              href={muse.downloadUrl}
              className="inline-block bg-gradient-to-r from-cyan-400 to-purple-600 text-black font-bold text-xl py-4 px-16 rounded-full shadow-lg hover:scale-105 transition"
            >
              DOWNLOAD ALL ASSETS (R2)
            </a>
          </div>

          <p className="mt-8 text-sm text-gray-500">
            Files expire in 7 days · Re-download anytime from your dashboard
          </p>
        </div>
      </div>
    </div>
  );
}