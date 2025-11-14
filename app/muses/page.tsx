'use client';

import Link from 'next/link';

export default function MusesLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black text-white">
      {/* Header */}
      <header className="border-b border-purple-800/50 backdrop-blur-xl bg-black/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              SirensForge.vip
            </span>
          </Link>
          <nav className="hidden md:flex gap-8 text-sm">
            <Link href="/pricing" className="hover:text-purple-400 transition">Pricing</Link>
            <Link href="/muses" className="text-purple-400 font-bold">Muses</Link>
            <Link href="/forge" className="hover:text-purple-400 transition">Forge</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-20 px-4 text-center">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
            MUSE VAULT
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
            Pre-built AI Sirens — Instant Delivery
          </p>

          {/* SFW / NSFW Buttons */}
          <div className="flex justify-center gap-6 mb-12 flex-wrap">
            <Link href="/muses/sfw">
              <button className="px-8 py-4 rounded-full font-bold text-lg uppercase tracking-wider transition-all bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 hover:scale-105">
                SFW MUSES
              </button>
            </Link>
            <Link href="/muses/nsfw">
              <button className="px-8 py-4 rounded-full font-bold text-lg uppercase tracking-wider transition-all bg-gradient-to-r from-pink-500 to-red-600 text-white shadow-lg shadow-pink-500/50 hover:shadow-pink-500/70 hover:scale-105">
                NSFW MUSES
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-800/50 bg-black/50 py-8 text-center text-gray-400 text-sm">
        <p>© 2025 Eleven Sparks LLC. All rights reserved.</p>
      </footer>
    </div>
  );
}