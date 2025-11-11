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
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* HERO */}
      <div className="relative text-center py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent pointer-events-none"></div>
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-pulse">
          SIRENS FORGE
        </h1>
        <p className="text-2xl md:text-3xl mt-6 font-light text-gray-300">
          First 25 seats = infinite tokens · 50% lifetime royalties · crowned forever
        </p>
      </div>

      {/* OG COUNTDOWN */}
      <div className="flex justify-center mb-16">
        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-red-600 to-pink-600 rounded-full blur-xl opacity-75 animate-pulse"></div>
          <Countdown type="og" />
        </div>
      </div>

      {/* PRICING CARDS */}
      <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto px-6">
        {/* $12 */}
        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <button
            onClick={() => checkout('price_1SRxf9FjcWRhhOnzXdiKLvvk')}
            disabled={loading}
            className="relative bg-black border border-cyan-500/50 p-10 rounded-3xl text-center transform transition-all hover:scale-105 hover:border-cyan-400 shadow-2xl"
          >
            <h3 className="text-3xl font-bold text-cyan-400">$12 Starter Hit</h3>
            <p className="text-xl mt-3 text-gray-300">5 AI Siren Generations</p>
            <div className="mt-8 inline-block">
              <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold text-lg py-4 px-12 rounded-full shadow-lg transform transition hover:scale-110">
                Claim 5 Generations
              </div>
            </div>
          </button>
        </div>

        {/* $29.99 */}
        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <button
            onClick={() => checkout('price_1SRxiNFjcWRhhOnzHVXW0cYi')}
            disabled={loading}
            className="relative bg-black border border-purple-500/50 p-10 rounded-3xl text-center transform transition-all hover:scale-105 hover:border-purple-400 shadow-2xl"
          >
            <h3 className="text-3xl font-bold text-purple-400">Claim Eternal Seat</h3>
            <p className="text-4xl font-bold mt-3 text-white">$29.99<span className="text-lg">/mo</span></p>
            <p className="text-sm text-pink-400 mt-1">First 120 Only</p>
            <p className="text-xl mt-4 text-gray-300">Unlimited + Fanvue Auto-Post</p>
            <div className="mt-8 inline-block">
              <div className="bg-gradient-to-r from-purple-400 to-pink-500 text-black font-bold text-lg py-4 px-12 rounded-full shadow-lg transform transition hover:scale-110">
                Lock In Before 0/120
              </div>
            </div>
          </button>
        </div>

        {/* $1,333 — OG THRONE */}
        <div className="group relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-700 rounded-3xl blur-xl opacity-90 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
          <button
            onClick={() => checkout('price_1SRzMSFjcWRhhOnzmON74k5O')}
            disabled={loading}
            className="relative bg-gradient-to-br from-amber-900/90 to-black p-10 rounded-3xl text-center transform transition-all hover:scale-105 ring-4 ring-yellow-500/50 shadow-2xl border border-yellow-600/30"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/50 to-transparent rounded-3xl"></div>
            <h3 className="text-3xl font-bold text-yellow-400 drop-shadow-lg">OG Eternal Throne</h3>
            <p className="text-5xl font-black mt-3 text-white drop-shadow-2xl">$1,333</p>
            <p className="text-lg text-amber-300 mt-2">LAST <Countdown type="lifetime" /></p>
            <p className="text-xl mt-4 text-gray-200">Lifetime + 50% Royalties + ∞ Tokens</p>
            <div className="mt-8 inline-block">
              <div className="bg-gradient-to-r from-yellow-400 to-amber-600 text-black font-bold text-xl py-5 px-16 rounded-full shadow-2xl transform transition hover:scale-110 hover:shadow-yellow-500/50">
                Secure Throne Forever
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* EARLY BIRDS */}
      <p className="text-center mt-16 text-xl text-gray-400 font-medium">
        EARLY BIRDS: 120/120 | OG LIFETIMES: 10/35
      </p>

      {/* FEATURES GRID — 3D ICONS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-24 max-w-7xl mx-auto px-6">
        {[
          { icon: "Face-Lock Precision", desc: "15-second multi-ref video forge" },
          { icon: "Auto-Post Empire", desc: "Fanvue · Insta · TikTok · X — hands-free" },
          { icon: "Eternal Gods", desc: "25 OGs = infinite tokens + 50% lifetime" },
          { icon: "Fortress Privacy", desc: "Burn after 30 days · never retrained" }
        ].map((item, i) => (
          <div key={i} className="group text-center">
            <div className="relative inline-block mb-6">
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
              <div className="relative text-6xl transform group-hover:scale-125 transition-transform duration-300">
                {item.icon}
              </div>
            </div>
            <h4 className="text-2xl font-bold text-white drop-shadow-md">{item.icon}</h4>
            <p className="text-gray-400 mt-2">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="mt-32 text-center text-sm text-gray-500 space-y-2 pb-10">
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