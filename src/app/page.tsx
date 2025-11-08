'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [ageOk, setAgeOk] = useState(false);

  // KILL GITHUB CAT
  useEffect(() => {
    document.querySelector('.github-corner')?.remove();
  }, []);

  if (!ageOk) return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900 via-purple-900 to-black opacity-80 blur-3xl animate-pulse"></div>
        <div className="relative text-center">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-glow">
            SIRENS FORGE
          </h1>
          <p className="text-2xl md:text-4xl text-cyan-300 mt-8 font-light tracking-widest">EMPIRE OF THE DEEP</p>
          <button onClick={() => setAgeOk(true)} className="mt-16 px-12 py-6 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-2xl font-bold shadow-2xl shadow-purple-900/50 hover:shadow-cyan-500/50 transform hover:scale-110 transition-all duration-500">
            ENTER 18+ TEMPLE
          </button>
        </div>
      </div>
    </div>
  );

  if (!unlocked) return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-purple-400 mb-12 animate-pulse">SEALED BY THE QUEEN</h1>
        <input
          type="password"
          placeholder="Speak the ancient word..."
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="px-8 py-4 bg-gray-900 border-2 border-cyan-500 rounded-lg text-cyan-300 text-xl mb-8"
          onKeyDown={e => e.key === 'Enter' && (password === 'KYLEESCAM2025' ? setUnlocked(true) : alert('THE ABYSS DENIES YOU'))}
        />
        <br />
        <button onClick={() => password === 'KYLEESCAM2025' ? setUnlocked(true) : alert('THE ABYSS DENIES YOU')}
          className="px-16 py-6 bg-gradient-to-b from-purple-600 to-cyan-600 rounded-full text-3xl font-bold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 shadow-2xl shadow-purple-900">
          ASCEND THE THRONE
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-cyan-300 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-cyan-900/20"></div>
      <div className="relative z-10 p-8 text-center">
        <h1 className="text-6xl md:text-9xl font-black bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl">
          PLAYFUL ORIGINS HAS RISEN
        </h1>
        <p className="text-3xl mt-8 text-purple-400">First 25 thrones = ETERNAL VIP</p>
        
        <button onClick={() => alert('MOAN: ahh~ queen deeper daddy yes throne master')}
          className="mt-12 px-20 py-10 bg-gradient-to-r from-pink-600 to-purple-700 rounded-full text-4xl font-bold shadow-2xl shadow-pink-900 hover:shadow-purple-600 transform hover:scale-110 transition-all duration-500">
          GENERATE ROYAL MOAN
        </button>

        <div className="mt-20">
          <h2 className="text-5xl font-bold text-cyan-400 mb-8">AI INFLUENCER BUILDER LIVE</h2>
          <p className="text-2xl mb-8">One click → 500+ sirens forged in the abyss</p>
          <a href="https://huggingface.co/spaces/playfulorigins333/SirensForge-Builder" target="_blank">
            <button className="px-24 py-10 bg-gradient-to-r from-cyan-500 to-teal-600 rounded-full text-4xl font-bold shadow-2xl shadow-cyan-900 hover:shadow-teal-500 transform hover:scale-110 transition-all duration-500">
              LAUNCH FORGE NOW
            </button>
          </a>
        </div>

        <div className="mt-20">
          <h2 className="text-5xl font-bold text-purple-500 mb-8">WHALE WALLET</h2>
          <p className="text-2xl mb-6">Send 0.5 SOL → claim your throne forever</p>
          <input placeholder="Your SOL address" className="w-96 px-8 py-6 bg-gray-900 border-4 border-cyan-500 rounded-xl text-xl text-cyan-300 mb-6" />
          <br />
          <button className="px-24 py-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-4xl font-bold shadow-2xl shadow-pink-900 hover:shadow-purple-600 transform hover:scale-110 transition-all duration-500">
            CLAIM THRONE #1–25
          </button>
        </div>

        <div className="mt-20 text-center">
          <p className="text-2xl font-bold text-cyan-400">Built and run by a power couple whose bond —</p>
          <p className="text-2xl font-bold text-purple-400">like every siren — was forged in the fire of life</p>
          <p className="text-3xl font-black text-pink-500 mt-4">and is coming out smokin’ on the other side.</p>
        </div>
      </div>
    </div>
  );
}
