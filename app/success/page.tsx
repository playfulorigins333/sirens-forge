'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [muse, setMuse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      fetch(`/api/fulfill-muse?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          setMuse(data.muse);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  if (!sessionId) {
    return <div className="text-center py-20 text-red-500">Invalid session. Please contact support.</div>;
  }

  if (loading) {
    return <div className="text-center py-20 text-cyan-400">Delivering your Vault Muse...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900 flex flex-col items-center justify-center p-4 text-white">
      <h1 className="text-6xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-8 animate-pulse">
        MUSE DELIVERED!
      </h1>
      <p className="text-xl text-gray-300 mb-4">Your custom siren is now in the Vault.</p>
      {muse && (
        <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 max-w-md">
          <h2 className="text-2xl font-bold text-purple-300 mb-2">{muse.name}</h2>
          <p className="text-gray-400">Style: {muse.style}</p>
          <p className="text-sm text-gray-500 mt-4">Ready for /generate</p>
        </div>
      )}
      <button
        onClick={() => window.location.href = '/generate'}
        className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-purple-500/50"
      >
        Forge with Your Muse
      </button>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Loading your empire...</div>}>
      <SuccessContent />
    </Suspense>
  );
}