'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MusesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const tiers = [
    {
      name: 'Vault Starter',
      price: '$299.99',
      priceId: 'price_1SSHrTFjcWRhhOnzO4GoeACt',
      perks: [
        '1 Pre-built Vault Muse',
        '20×4K Images',
        '3 Videos + Voice Pack',
        'R2 Instant Delivery'
      ],
      button: 'Buy Starter',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      name: 'Vault Pro',
      price: '$599.99',
      priceId: 'price_1SSHrwFjcWRhhOnzJWKmeLpz',
      perks: [
        '1 Pre-built Vault Muse',
        '42×4K Images',
        '10 Videos + Voice Pack',
        'Auto-Post to Fansvue',
        'Weekly AI Updates'
      ],
      button: 'Buy Pro',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Vault Elite',
      price: '$999.99',
      priceId: 'price_1SSHtNFjcWRhhOnzoGLxbUDv',
      perks: [
        '1 Pre-built Vault Muse',
        '100×4K Images',
        '20 Videos + Voice Pack',
        'Full Muse Agency (4x/mo)',
        'No Royalties (OG only)'
      ],
      button: 'Buy Elite',
      color: 'from-orange-500 to-yellow-500'
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
        alert('Failed to create checkout session: ' + (data.error || 'Unknown error'));
      }
    } catch (err: any) {
      alert('Network error: ' + err.message);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-bold uppercase bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent tracking-widest">
          MUSE VAULT
        </h1>
        <p className="text-xl text-gray-300 mt-2">Pre-Built AI Sirens — Instant Delivery</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((t, i) => (
          <div
            key={i}
            className="bg-gray-900 rounded-2xl p-8 border-4 border-transparent hover:border-purple-500 transition shadow-2xl transform hover:scale-105"
          >
            <h3 className="text-2xl font-bold text-white mb-4">{t.name}</h3>
            <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6">
              {t.price}
            </p>
            <ul className="space-y-2 mb-6 text-left">
              {t.perks.map((perk, j) => (
                <li key={j} className="text-gray-300 flex items-center">
                  <span className="text-cyan-400 mr-2">✓</span> {perk}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleBuy(t)}
              disabled={loading === t.name}
              className={`w-full py-4 rounded-full font-bold uppercase transition-all transform ${
                loading === t.name
                  ? 'bg-gray-700 cursor-not-allowed'
                  : `bg-gradient-to-r ${t.color} shadow-lg hover:scale-105`
              }`}
            >
              {loading === t.name ? 'Redirecting...' : t.button}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}