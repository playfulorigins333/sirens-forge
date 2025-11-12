'use client';

import { useState } from 'react';

// FORCE REBUILD — DELETE THIS LINE AFTER DEPLOY
// (This makes Vercel rebuild fresh)

export default function MusesPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const tiers = [
    {
      name: 'Vault Starter',
      price: '$299.99',
      priceId: 'price_1SSHrTFjcWRhhOnzO4GoeACt',
      button: 'BUY STARTER',
      perks: [
        '1 Pre-built Vault Muse',
        '20×4K Images',
        '3 Videos + Voice Pack',
        'R2 Instant Delivery'
      ],
      color: 'from-cyan-400 to-blue-600',
      glow: 'shadow-cyan-500/50'
    },
    {
      name: 'Vault Pro',
      price: '$599.99',
      priceId: 'price_1SSHrwFjcWRhhOnzJWKmeLpz',
      button: 'BUY PRO',
      perks: [
        '1 Pre-built Vault Muse',
        '42×4K Images',
        '10 Videos + Voice Pack',
        'Auto-Post to Fansvue',
        'Weekly AI Updates'
      ],
      color: 'from-purple-400 to-pink-600',
      glow: 'shadow-purple-500/50'
    },
    {
      name: 'Vault Elite',
      price: '$999.99',
      priceId: 'price_1SSHtNFjcWRhhOnzoGLxbUDv',
      button: 'BUY ELITE',
      perks: [
        '1 Pre-built Vault Muse',
        '100×4K Images',
        '20 Videos + Voice Pack',
        'Full Muse Agency (4x/mo)',
        'No Royalties (OG only)'
      ],
      color: 'from-orange-400 to-yellow-600',
      glow: 'shadow-yellow-500/50'
    }
  ];

  const handleBuy = async (tier: any) => {
    setLoading(tier.name);
    try {
      const res = await fetch('/api/stripe/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: tier.priceId })
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Error: ' + (data.error || 'Checkout failed'));
      }
    } catch {
      alert('Network error');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="text-center mb-12">
        <h1 className="text-6xl md:text-8xl font-bold uppercase bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent tracking-widest">
          MUSE VAULT
        </h1>
        <p className="text-xl text-gray-400 mt-2">Pre-Built AI Sirens — Instant Delivery</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((t, i) => (
          <div
            key={i}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-gray-900 rounded-3xl p-8 ring-1 ring-gray-900/5 backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-white mb-4 text-center">{t.name}</h3>
              <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 mb-6 text-center">
                {t.price}
              </p>
              <ul className="space-y-3 mb-8">
                {t.perks.map((perk, j) => (
                  <li key={j} className="flex items-center text-gray-300">
                    <span className="text-cyan-400 mr-3 text-lg">✓</span>
                    {perk}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleBuy(t)}
                disabled={loading === t.name}
                className={`w-full py-4 rounded-full font-bold text-lg uppercase tracking-wider transition-all transform hover:scale-105 ${
                  loading === t.name
                    ? 'bg-gray-700 cursor-not-allowed'
                    : `bg-gradient-to-r ${t.color} text-white shadow-2xl ${t.glow}`
                }`}
              >
                {loading === t.name ? 'LOADING...' : t.button}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <footer className="mt-20 text-center text-sm text-gray-500">
        <p>© 2025 Eleven Sparks LLC. All rights reserved.</p>
        <p className="mt-2">
          By using SirensForge.vip you agree to our{' '}
          <a href="/terms" className="underline hover:text-cyan-400">Terms of Service</a> ·{' '}
          <a href="/privacy" className="underline hover:text-cyan-400">Privacy Policy</a> ·{' '}
          <a href="/faq" className="underline hover:text-cyan-400">FAQ</a> ·{' '}
          <a href="/dmca" className="underline hover:text-cyan-400">DMCA</a>
        </p>
      </footer>
    </div>
  );
}