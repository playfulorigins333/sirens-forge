import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

function LiveCounter() {
  const { data } = useSWR('/api/counters', fetcher, { refreshInterval: 3000 });
  
  const earlyMonthly = data?.early_monthly_sold || 0;
  const earlyLifetime = data?.early_lifetime_sold || 0;
  const ogThrone = data?.og_throne_sold || 0;

  return (
    <div className="text-sm tracking-widest text-cyan-400 animate-pulse font-medium">
      EARLY BIRDS: {120 - earlyMonthly}/120 | LIFETIMES: {50 - earlyLifetime}/50 | THRONES: {10 - ogThrone}/10
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-xl bg-black/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-4xl font-bold tracking-widest bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            SirensForge<span className="font-extrabold text-white">.vip</span>
          </h1>
          <LiveCounter />
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-5xl">
          <h1 className="text-7xl md:text-9xl font-extralight leading-tight mb-6">
            SIRENSFORGE
            <span className="font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              .VIP
            </span>
          </h1>
          <h2 className="text-5xl md:text-7xl font-light text-gray-300 mb-10">
            Forge Your Perfect AI Siren
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 mb-16 leading-relaxed max-w-3xl mx-auto">
            Hyper-realistic custom models · 100% private · auto-post to Fanvue · $10k+/week on autopilot
          </p>

          {/* FINAL LURE BUTTON — FULL LEMON CHECKOUT MENU — ALL 11 TIERS — ZERO 404 */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <a
              href="https://sirensforge.lemonsqueezy.com/checkout"
              target="_blank"
              rel="noopener noreferrer"
              className="px-24 py-8 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-3xl font-semibold hover:scale-105 transition-all shadow-2xl cursor-pointer"
            >
              Claim Eternal Seat — $29.99/mo
            </a>

            <button className="px-24 py-8 border-2 border-cyan-500 rounded-full text-3xl font-semibold hover:bg-cyan-500/10 transition-all cursor-pointer">
              View Muse Vault →
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-16">
            First 25 seats = infinite tokens · 50% lifetime royalties · crowned forever
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-32 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16 text-center">
          <div className="hover:scale-105 transition-all">
            <svg className="w-20 h-20 mx-auto mb-6 stroke-cyan-400 fill-none stroke-2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/>
              <circle cx="12" cy="12" r="4" fill="currentColor"/>
            </svg>
            <h3 className="text-2xl font-medium mb-3">Face-Lock Precision</h3>
            <p className="text-gray-400 text-sm leading-relaxed">15-second multi-ref video forge</p>
          </div>
          <div className="hover:scale-105 transition-all">
            <svg className="w-20 h-20 '{}' mx-auto mb-6 stroke-purple-400 fill-none stroke-2" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            <h3 className="text-2xl font-medium mb-3">Auto-Post Empire</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Fanvue · Insta · TikTok · X — hands-free</p>
          </div>
          <div className="hover:scale-105 transition-all">
            <svg className="w-20 h-20 mx-auto mb-6 stroke-pink-400 fill-none stroke-2" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <h3 className="text-2xl font-medium mb-3">Eternal Gods</h3>
            <p className="text-gray-400 text-sm leading-relaxed">25 OGs = ∞ tokens + 50% lifetime</p>
          </div>
          <div className="hover:scale-105 transition-all">
            <svg className="w-20 h-20 mx-auto mb-6 stroke-cyan-400 fill-none stroke-2" viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <h3 className="text-2xl font-medium mb-3">Fortress Privacy</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Burn after 30 days · never retrained</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6 text-center">
        <p className="text-xs text-gray-500 leading-relaxed">
          © 2025 Eleven Sparks LLC. All rights reserved. <br />
          By using SirensForge.vip you agree to our{' '}
          <a href="/tos" className="underline hover:text-cyan-400">Terms of Service</a> ·{' '}
          <a href="/privacy" className="underline hover:text-cyan-400">Privacy Policy</a> ·{' '}
          <a href="/faq" className="underline hover:text-cyan-400">FAQ</a> ·{' '}
          <a href="/dmca" className="underline hover:text-cyan-400">DMCA</a>
        </p>
      </footer>
    </div>
  )
}
