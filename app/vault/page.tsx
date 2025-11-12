// app/muses/page.tsx
'use client';

import { useState } from 'react';

export default function MusesPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const checkout = async (priceId: string, name: string) => {
    setLoading(priceId);
    try {
      const res = await fetch('/api/stripe/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });

      if (!res.ok) throw new Error(`Error: ${res.status}`);

      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch (error: any) {
      alert(`Checkout failed for ${name}: ${error.message}`);
      setLoading(null);
    }
  }; // ← THIS WAS MISSING

  return (
    <div className="min-h-screen bg-black text-white py-20 px-6">
      <div className="text-center mb-16">
        <h1 className="text-6xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          MUSE VAULT
        </h1>
        <p className="text-xl mt-4 text-gray-300">Pre-Built AI Sirens — Instant Delivery</p>
      </div>

      <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
        {/* VAULT STARTER — $299.99 */}
        <div className="group relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition"></div>
          <div className="relative bg-black border border-cyan-500/50 p-10 rounded-3xl text-center">
            <h3 className="text-3xl font-bold text-cyan-400">Vault Starter</h3>
            <p className="text-5xl font-black mt-4">$299.99</p>
            <ul className="mt-6 text-left text-gray-300 space-y-2 text-sm">
              <li>1 Pre-Built Vault Muse</li>
              <li>20×4K Images</li>
              <li>6 Teasers</li>
              <li>3 Videos + Voice Pack</li>
              <li>R2 Instant Delivery</li>
            </ul>
            <button
              onClick={() => checkout('price_1SSHrTFjcWRhhOnzO4GoeACt', 'Vault Starter')}
              disabled={loading === 'price_1SSHrTFjcWRhhOnzO4GoeACt'}
              className="mt-8 w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold py-4 rounded-full disabled:opacity-50"
            >
              {loading === 'price_1SSHrTFjcWRhhOnzO4GoeACt' ? 'Loading...' : 'Buy Starter'}
            </button>
          </div>
        </div>

        {/* VAULT PRO — $599.99 */}
        <div className="group relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition"></div>
          <div className="relative bg-black border border-purple-500/50 p-10 rounded-3xl text-center">
            <h3 className="text-3xl font-bold text-purple-400">Vault Pro</h3>
            <p className="text-5xl font-black mt-4">$599.99</p>
            <ul className="mt-6 text-left text-gray-300 space-y-2 text-sm">
              <li>1 Pre-Built Vault Muse</li>
              <li>42×4K Images</li>
              <li>12 Teasers</li>
              <li>10 Videos + Voice Pack</li>
              <li>Auto-Post to Fanvue</li>
              <li>Weekly AI Updates</li>
            </ul>
            <button
              onClick={() => checkout('price_1SSHrwFjcWRhhOnzJWKmeLpz', 'Vault Pro')}
              disabled={loading === 'price_1SSHrwFjcWRhhOnzJWKmeLpz'}
              className="mt-8 w-full bg-gradient-to-r from-purple-400 to-pink-500 text-black font-bold py-4 rounded-full disabled:opacity-50"
            >
              {loading === 'price_1SSHrwFjcWRhhOnzJWKmeLpz' ? 'Loading...' : 'Buy Pro'}
            </button>
          </div>
        </div>

        {/* VAULT ELITE — $999.99 */}
        <div className="group relative">
          <div className="absolute -inset-3 bg-gradient-to-r from-yellow-600 to-amber-700 rounded-3xl blur-2xl opacity-90 group-hover:opacity-100 transition animate-pulse"></div>
          <div className="relative bg-gradient-to-br from-amber-900/90 to-black p-10 rounded-3xl text-center ring-4 ring-yellow-500/50">
            <h3 className="text-3xl font-bold text-yellow-400">Vault Elite</h3>
            <p className="text-5xl font-black mt-4">$999.99</p>
            <ul className="mt-6 text-left text-gray-200 space-y-2 text-sm">
              <li>1 Pre-Built Vault Muse</li>
              <li>100×4K Images</li>
              <li>20 Teasers</li>
              <li>20 Videos + Voice Pack</li>
              <li>Full Muse Agency (4x/mo)</li>
            </ul>
            <button
              onClick={() => checkout('price_1SSHtNFjcWRhhOnzoGLxbUDv', 'Vault Elite')}
              disabled={loading === 'price_1SSHtNFjcWRhhOnzoGLxbUDv'}
              className="mt-8 w-full bg-gradient-to-r from-yellow-400 to-amber-600 text-black font-bold py-5 rounded-full disabled:opacity-50"
            >
              {loading === 'price_1SSHtNFjcWRhhOnzoGLxbUDv' ? 'Loading...' : 'Buy Elite'}
            </button>
          </div>
        </div>
      </div>

      <p className="text-center mt-16 text-sm text-gray-500">
        All muses are pre-built from the Sirens Forge Vault. Difference = content volume and management.
      </p>
    </div>
  );
}