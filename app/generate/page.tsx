'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type Tier = 'OG' | 'Eternal' | 'Starter' | null;

const useUserTier = (): {
  tier: Tier;
  tokens: number | typeof Infinity;
  museVault: string | null;
} => {
  // TODO: Replace with real auth (Stripe session, Clerk, Supabase, etc.)
  return { tier: 'OG', tokens: Infinity, museVault: 'Elite' };
};

export default function GeneratePage() {
  const router = useRouter();
  const { tier, tokens, museVault } = useUserTier();

  const [mode, setMode] = useState<'txt2img' | 'img2img' | 'txt2vid' | 'img2vid'>('txt2img');
  const [prompt, setPrompt] = useState('');
  const [refImages, setRefImages] = useState<string[]>([]);
  const [vaults, setVaults] = useState<Array<{ title: string; prompt: string }>>([]);
  const [selectedVault, setSelectedVault] = useState('');
  const [outputs, setOutputs] = useState<string[]>([]);
  const [tokenCount, setTokenCount] = useState<number | typeof Infinity>(tokens);
  const [generating, setGenerating] = useState(false);
  const [tokenEstimate, setTokenEstimate] = useState(0);

  // Load vaults from /api/vaults
  useEffect(() => {
    fetch('/api/vaults')
      .then(r => r.json())
      .then((files: string[]) => {
        const parsed = files.map(f => {
          const title = f.replace('.md', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          return {
            title,
            prompt: `A seductive ${title.toLowerCase()} siren, neon glow, 4K ultra-detailed, cyberpunk fantasy, ethereal lighting, cinematic`
          };
        });
        setVaults(parsed.length ? parsed : [{ title: 'Neon Siren', prompt: 'Ethereal cyber-siren, neon waves, 4K' }]);
      })
      .catch(() => {
        setVaults([{ title: 'Neon Siren', prompt: 'Ethereal cyber-siren, neon waves, 4K' }]);
      });
  }, []);

  // Token estimate
  useEffect(() => {
    const words = prompt.trim().split(/\s+/).filter(Boolean).length;
    setTokenEstimate(mode.includes('vid') ? words * 2 : words);
  }, [prompt, mode]);

  const handleVaultSelect = (title: string) => {
    const vault = vaults.find(v => v.title === title);
    if (vault) {
      setPrompt(vault.prompt);
      setSelectedVault(title);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const max = tier === 'OG' ? 10 : tier === 'Eternal' ? 5 : tier === 'Starter' ? 1 : 0;
    if (refImages.length >= max) return;

    const files = Array.from(e.dataTransfer.files)
      .filter(f => f.type.startsWith('image/'))
      .slice(0, max - refImages.length);

    files.forEach(file => {
      const url = URL.createObjectURL(file);
      setRefImages(prev => [...prev, url]);
    });
  };

  const handleGenerate = async () => {
    if (!tier) return router.push('/pricing');
    if (tokenCount !== Infinity && tokenEstimate > tokenCount) {
      alert('Low tokens! Refill for $9.99');
      return;
    }

    setGenerating(true);
    await new Promise(r => setTimeout(r, 1800)); // Mock AI delay

    // MOCK R2 OUTPUT
    const mock = `https://via.placeholder.com/512/FF00FF/000000?text=${encodeURIComponent(mode + ' Siren')}`;
    setOutputs(prev => [...prev, mock]);

    if (tokenCount !== Infinity) {
      setTokenCount(prev => (prev as number) - tokenEstimate);
    }

    setGenerating(false);
  };

  const maxRefs = tier === 'OG' ? 10 : tier === 'Eternal' ? 5 : tier === 'Starter' ? 1 : 0;
  const canVid = tier === 'Eternal' || tier === 'OG';

  if (!tier) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-6 tracking-widest">
            SUMMON LOCKED
          </h1>
          <button
            onClick={() => router.push('/pricing')}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-xl font-bold shadow-lg shadow-purple-500/50 hover:scale-105 transition"
          >
            UPGRADE TO SUMMON
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      {/* Hero Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-bold uppercase bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent tracking-widest">
          SIRENS FORGE
        </h1>
        <p className="text-xl text-gray-300 mt-2">Generator v3 — Summon Your Digital Empire</p>

        {/* Token Counter */}
        <div className="mt-6 inline-block px-6 py-2 bg-gray-900/50 rounded-full border border-purple-500/30 shadow-lg">
          <span className={`text-lg font-bold ${tokenCount === Infinity ? 'text-yellow-400' : 'text-white'}`}>
            {tokenCount === Infinity ? '∞ Tokens (OG Throne)' : `${tokenCount} Tokens Remaining`}
          </span>
        </div>

        {/* FOMO */}
        {tier !== 'OG' && (
          <p className="mt-3 text-sm text-red-400 animate-pulse">
            Only 10/35 Eternal Seats Left — Lock In Before 0/120
          </p>
        )}
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Vault Sidebar */}
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-purple-400 mb-3">VAULTS</h3>
            {museVault && (
              <p className="text-sm text-green-400 mb-2">Elite Muse Vault Active</p>
            )}
            <select
              value={selectedVault}
              onChange={e => handleVaultSelect(e.target.value)}
              className="w-full p-3 bg-gray-900 border border-purple-500 rounded-lg text-white focus:border-pink-500 outline-none"
            >
              <option value="">Select Pre-Built Siren</option>
              {vaults.map(v => (
                <option key={v.title} value={v.title}>
                  {v.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Main Generator */}
        <div className="lg:col-span-3 space-y-6">
          {/* Mode Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-gray-700 pb-3">
            {['txt2img', 'img2img', ...(canVid ? ['txt2vid', 'img2vid'] : [])].map(m => (
              <button
                key={m}
                onClick={() => setMode(m as any)}
                className={`px-5 py-2 rounded-t-lg font-bold text-sm uppercase transition-all ${
                  mode === m
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                    : 'text-gray-400 hover:text-purple-300'
                }`}
              >
                {m.replace('2', '→')}
              </button>
            ))}
          </div>

          {/* Prompt */}
          <div>
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Describe your siren: neon cyberpunk goddess, floating in void, glowing runes..."
              className="w-full h-32 p-4 bg-gray-900 border border-cyan-500 rounded-lg text-white resize-none focus:border-purple-500 outline-none"
            />
            <p className="mt-1 text-sm text-gray-400">Est. Tokens: {tokenEstimate}</p>
          </div>

          {/* Ref Images */}
          {mode.includes('img') && (
            <div
              onDrop={handleDrop}
              onDragOver={e => e.preventDefault()}
              className="border-2 border-dashed border-purple-500 rounded-lg p-8 text-center cursor-pointer hover:border-pink-500 transition"
            >
              <p className="text-purple-400 font-medium">
                Drop Ref Images ({refImages.length}/{maxRefs})
              </p>
              <div className="mt-4 grid grid-cols-3 md:grid-cols-5 gap-3">
                {refImages.map((url, i) => (
                  <div key={i} className="relative group">
                    <Image
                      src={url}
                      alt="Ref"
                      width={80}
                      height={80}
                      className="w-full h-20 object-cover rounded-lg shadow-md group-hover:scale-110 transition"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={generating}
            className={`w-full py-6 rounded-full font-bold text-2xl uppercase tracking-wider transition-all transform ${
              generating
                ? 'bg-gray-700 cursor-not-allowed'
                : tier === 'OG'
                ? 'bg-gradient-to-r from-yellow-500 to-orange-600 shadow-xl shadow-yellow-500/50 hover:scale-105'
                : tier === 'Eternal'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-xl shadow-purple-500/50 hover:scale-105'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 shadow-xl shadow-cyan-500/50 hover:scale-105'
            } ${!generating && 'animate-pulse'}`}
          >
            {generating ? 'SUMMONING SIREN...' : `GENERATE ${mode.toUpperCase().replace('2', '→')}`}
          </button>
        </div>
      </div>

      {/* Output Gallery */}
      {outputs.length > 0 && (
        <div className="max-w-7xl mx-auto mt-16">
          <h3 className="text-3xl font-bold text-purple-400 mb-6 text-center">YOUR SIRENS</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {outputs.map((url, i) => (
              <div key={i} className="group relative overflow-hidden rounded-xl shadow-2xl">
                <Image
                  src={url}
                  alt="Generated Siren"
                  width={512}
                  height={512}
                  className="w-full h-80 object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition" />
                {tier !== 'OG' && (
                  <div className="absolute bottom-3 left-3 bg-black/70 px-3 py-1 rounded text-yellow-400 text-sm font-bold">
                    Enhance to 4K ($4.99)
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}