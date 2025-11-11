'use client';

import { useState } from 'react';
import Countdown from '@/components/Countdown';

export default function PricingPage() {
  const [loading, setLoading] = useState(false);

  const checkout = async (priceId: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/stripe/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
      else throw new Error('No URL');
    } catch {
      alert('Checkout failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-16 px-4">
      {/* HERO */}
      <div className="text-center mb-16">
        <h1 className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-600">
          SIRENS FORGE
        </h1>
        <p className="text-xl mt-4 text-gray-300">
          First 25 seats = infinite tokens · 50% lifetime royalties · crowned forever
        </p>
      </div>

      {/* OG COUNTDOWN */}
      <div className="flex justify-center mb-12">
        <Countdown type="og" />
      </div>

      {/* PRICING CARDS */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* $12 — STARTER HIT */}
        <button
          onClick={() => checkout('price_1SRxf9FjcWRhhOnzXdiKLvvk')}
          disabled={loading}
          className="group relative bg-gradient-to-br from-cyan-600 to-blue-800 p-8 rounded-3xl text-center transform transition-all hover:scale-105 hover:shadow-2xl disabled:opacity-50 overflow-hidden"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
          <h3 className="text-2xl font-bold">$12 Starter Hit</h3>
          <p className="text-lg mt-2 opacity-90">5 AI Siren Generations</p>
          <div className="mt-6 relative">
            <div className="absolute inset-0 bg-white/20 blur-xl group-hover:blur-2xl transition-all"></div>
            <div className="relative bg-white text-black font-bold py-3 px-8 rounded-full shadow-lg transform group-hover:scale-110 transition-transform">
              Claim 5 Generations
            </div>
          </div>
        </button>

        {/* $29.99 — ETERNAL SEAT */}
        <button
          onClick={() => checkout('price_1SRxiNFjcWRhhOnzHVXW0cYi')}
          disabled={loading}
          className="group relative bg-gradient-to-br from-purple-600 to-pink-600 p-8 rounded-3xl text-center transform transition-all hover:scale-105 hover:shadow-2xl disabled:opacity-50 overflow-hidden"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
          <h3 className="text-2xl font-bold">Claim Eternal Seat</h3>
          <p className="text-3xl font-bold mt-2">$29.99/mo</p>
          <p className="text-sm opacity-80 mt-1">First 120 Only</p>
          <p className="text-lg mt-3 opacity-90">Unlimited + Fanvue Auto-Post</p>
          <div className="mt-4 relative">
            <div className="absolute inset-0 bg-white/20 blur-xl group-hover:blur-2xl transition-all"></div>
            <div className="relative bg-white text-black font-bold py-3 px-8 rounded-full shadow-lg transform group-hover:scale-110 transition-transform">
              Lock In Before 0/120
            </div>
          </div>
        </button>

        {/* $1,333 — OG THRONE */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-amber-700 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
          <button
            onClick={() => checkout('price_1SRzMSFjcWRhhOnzmON74k5O')}
            disabled={loading}
            className="relative bg-gradient-to-br from-amber-700 to-yellow-900 p-8 rounded-3xl text-center transform transition-all hover:scale-105 ring-4 ring-yellow-500 shadow-2xl disabled:opacity-50 w-full overflow-hidden"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <h3 className="text-2xl font-bold">OG Eternal Throne</h3>
            <p className="text-3xl font-bold mt-2">$1,333</p>
            <p className="text-sm opacity-80 mt-1">LAST <Countdown type="lifetime" /></p>
            <p className="text-lg mt-3 opacity-90">Lifetime + 50% Royalties + ∞ Tokens</p>
            <div className="mt-4 relative">
              <div className="absolute inset-0 bg-yellow-400 blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-gradient-to-r from-yellow-400 to-amber-600 text-black font-bold py-3 px-8 rounded-full shadow-lg transform group-hover:scale-110 transition-transform">
                Secure Throne Forever
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* EARLY BIRDS */}
      <p className="text-center mt-12 text-lg text-gray-400">
        EARLY BIRDS: 120/120 | OG LIFETIMES: 10/35
      </p>

      {/* FEATURES GRID — GLASSMORPHISM */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-20 max-w-6xl mx-auto px-4">
        {[
          { icon: "Face-Lock Precision", desc: "15-second multi-ref video forge" },
          { icon: "Auto-Post Empire", desc: "Fanvue · Insta · TikTok · X — hands-free" },
          { icon: "Eternal Gods", desc: "25 OGs = infinite tokens + 50% lifetime" },
          { icon: "Fortress Privacy", desc: "Burn after 30 days · never retrained" }
        ].map((item, i) => (
          <div
            key={i}
            className="group relative bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl text-center transform transition-all hover:scale-105 hover:bg-white/10 hover:border-white/20"
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <h4 className="font-bold text-lg">{item.icon}</h4>
            <p className="text-sm text-gray-400 mt-2">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="mt-24 text-center text-xs text-gray-500 space-y-1">
        <p>© 2025 Eleven Sparks LLC. All rights reserved.</p>
        <p>
          By using SirensForge.vip you agree to our{' '}
          <a href="/terms" className="underline hover:text-cyan-400">Terms of Service</a> ·{' '}
          <a href="/privacy" className="underline hover:text-cyan-400">Privacy Policy</a> ·{' '}
          <a href="/faq" className="underline hover:text-cyan-400">FAQ</a> ·{' '}
          <a href="/dmca" className="underline hover:text-cyan-400">DMCA</a>
        </p>
      </div>
    </div>
  );
}