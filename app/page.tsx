export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-xl bg-black/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-4xl font-light tracking-wider bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            SirensForge.vip
          </h1>
          <div className="text-sm tracking-widest text-cyan-400">
            18/25 ETERNAL SEATS REMAIN
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-4xl">
          <h2 className="text-6xl md:text-8xl font-light leading-tight mb-8">
            Forge Your <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Perfect AI Siren</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed">
            Hyper-realistic custom models · 100% private · auto-post to Fanvue · $10k+/week on autopilot
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="px-16 py-6 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-2xl font-medium hover:scale-105 transition-all shadow-2xl">
              Claim Eternal Seat — $29.99/mo
            </button>
            <button className="px-16 py-6 border-2 border-cyan-500 rounded-full text-2xl font-medium hover:bg-cyan-500/10 transition-all">
              View Muse Vault →
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-12">
            First 25 seats = infinite tokens · 50% lifetime royalties · crowned forever
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12 text-center">
          <div>
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-xl font-medium mb-2">Face-Lock Precision</h3>
            <p class ofName="text-gray-400 text-sm">15-second multi-ref video forge</p>
          </div>
          <div>
            <div className="text-5xl mb-4">💸</div>
            <h3 className="text-xl font-medium mb-2">Auto-Post Empire</h3>
            <p className="text-gray-400 text-sm">Fanvue · Insta · TikTok · X — hands-free</p>
          </div>
          <div>
            <div className="text-5xl mb-4">👑</div>
            <h3 className="text-xl font-medium mb-2">Eternal Gods</h3>
            <p className="text-gray-400 text-sm">25 OGs = ∞ tokens + 50% lifetime</p>
          </div>
          <div>
            <div className="text-5xl mb-4">🔒</div>
            <h3 className="text-xl font-medium mb-2">100% Private</h3>
            <p className="text-gray-400 text-sm">Burn after 30 days · never retrained</p>
          </div>
        </div>
      </section>
    </div>
  )
}