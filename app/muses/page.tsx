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
  };

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
          <div className="absolute -inset-2 bg-gradient