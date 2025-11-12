'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const useUserTier = () => {
  const tier = 'Eternal'; // Change to test: 'OG', 'Starter', null

  const isUnlimited = (tier as string) === 'OG' || (tier as string) === 'Eternal';
  const isStarter = (tier as string) === 'Starter';

  return {
    tier,
    tokens: isUnlimited ? Infinity : isStarter ? 50 : 0,
    hasNsfw: tier !== null,
    canTrainLora: isUnlimited || isStarter,
    canBuyTokens: isStarter
  };
};

export default function GeneratePage() {
  const router = useRouter();
  const { tier, tokens, hasNsfw, canTrainLora, canBuyTokens } = useUserTier();

  const [activeTab, setActiveTab] = useState<'generate' | 'lora'>('generate');
  const [mode, setMode] = useState<'txt2img' | 'img2img' | 'txt2vid' | 'img2vid'>('txt2img');
  const [prompt, setPrompt] = useState('');
  const [refImages, setRefImages] = useState<string[]>([]);
  const [loraImages, setLoraImages] = useState<string[]>([]);
  const [vaults, setVaults] = useState<Array<{ title: string; prompt: string; isLora?: boolean }>>([]);
  const [selectedVault, setSelectedVault] = useState('');
  const [outputs, setOutputs] = useState<string[]>([]);
  const [tokenCount, setTokenCount] = useState<number | typeof Infinity>(tokens);
  const [generating, setGenerating] = useState(false);
  const [trainingLora, setTrainingLora] = useState(false);
  const [tokenEstimate, setTokenEstimate] = useState(0);

  const maxRefs = (tier as string) === 'OG' ? 10 : (tier as string) === 'Eternal' ? 5 : (tier as string) === 'Starter' ? 1 : 0;
  const canVid = (tier as string) === 'Eternal' || (tier as string) === 'OG';

  useEffect(() => {
    fetch('/api/vaults')
      .then(r => r.json())
      .then((files: string[]) => {
        const parsed = files.map(f => {
          const title = f.replace('.md', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          return {
            title,
            prompt: `A seductive ${title.toLowerCase()} siren, neon glow, 4K ultra-detailed, cyberpunk fantasy, ethereal lighting, cinematic`,
            isLora: false
          };
        });
        setVaults(parsed.length ? parsed : [{ title: 'Neon Siren', prompt: 'Ethereal cyber-siren, neon waves, 4K', isLora: false }]);
      })
      .catch(() => {
        setVaults([{ title: 'Neon Siren', prompt: 'Ethereal cyber-siren, neon waves, 4K', isLora: false }]);
      });
  }, []);

  useEffect(() => {
    const words = prompt.trim().split(/\s+/).filter(Boolean).length;
    setTokenEstimate(mode.includes('vid') ? words * 5 : words);
  }, [prompt, mode]);

  const handleVaultSelect = (title: string) => {
    const vault = vaults.find(v => v.title === title);
    if (vault && !vault.isLora) {
      setPrompt(vault.prompt);
      setSelectedVault(title);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (refImages.length >= maxRefs) return;
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/')).slice(0, maxRefs - refImages.length);
    files.forEach(f => setRefImages(p => [...p, URL.createObjectURL(f)]));
  };

  const handleLoraDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (loraImages.length >= 20) return;
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/')).slice(0, 20 - loraImages.length);
    files.forEach(f => setLoraImages(p => [...p, URL.createObjectURL(f)]));
  };

  const handleGenerate = async () => {
    if (!tier) return router.push('/pricing');
    if (tokenCount !== Infinity && tokenEstimate > tokenCount) {
      alert(`Need ${tokenEstimate} tokens. Buy pack or upgrade to Eternal.`);
      return;
    }

    setGenerating(true);
    await new Promise(r => setTimeout(r, 1800));
    const mock = `https://via.placeholder.com/512/FF00FF/000000?text=${mode}+Siren`;
    setOutputs(p => [...p, mock]);
    if (tokenCount !== Infinity) setTokenCount(p => (p as number) - tokenEstimate);
    setGenerating(false);
  };

  const handleTrainLora = async () => {
    if (loraImages.length < 10) return alert('Upload 10+ images for LoRA training');
    if (tokenCount !== Infinity && tokenCount < 50) {
      if (confirm('Need 50 tokens. Buy $2.99 pack or upgrade to Eternal?')) {
        router.push('/tokens');
      }
      return;
    }

    setTrainingLora(true);
    if (tokenCount !== Infinity) setTokenCount(p => (p as number) - 50);
    await new Promise(r => setTimeout(r, 30000));
    alert('LoRA Trained! Now in Vaults.');
    setTrainingLora(false);
  };

  if (!tier) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-6 tracking-widest">
            SUMMON LOCKED
          </h1>
          <button onClick={() => router.push('/pricing')} className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-xl font-bold shadow-lg shadow-purple-500/50 hover:scale-105 transition">
            UPGRADE TO UNLEASH NSFW
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      {/* HERO */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-bold uppercase bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent tracking-widest">
          SIRENS FORGE
        </h1>
        <p className="text-xl text-gray-300 mt-2">Generator v3 — NSFW Empire</p>

        {hasNsfw && (
          <div className="mt-6 bg-gradient-to-r from-red-900/50 to-purple-900/50 border border-red-500/50 rounded-2xl p-6 max-w-4xl mx-auto">
            <p className="text-2xl font-bold text-red-400 mb-2">NSFW MODE: FULLY UNLOCKED</p>
            <p className="text-gray-300">No filters. No limits. Generate anything. Private. Yours.</p>
          </div>
        )}

        <div className="mt-6 inline-block px-6 py-2 bg-gray-900/50 rounded-full border border-purple-500/30 shadow-lg">
          <span className={`text-lg font-bold ${tokenCount === Infinity ? 'text-yellow-400' : 'text-white'}`}>
            {tokenCount === Infinity ? '∞ Tokens' : `${tokenCount} Tokens`}
          </span>
        </div>

        {canBuyTokens && tokenCount < 100 && (
          <div className="mt-4 text-center animate-pulse">
            <p className="text-red-400 mb-2">Low tokens? Train a LoRA for 50!</p>
            <button onClick={() => router.push('/tokens')} className="px-6 py-3 bg-gradient-to-r from-green-500 to-cyan-600 rounded-full font-bold text-white shadow-lg hover:scale-105 transition">
              Buy $2.99 → 50 Tokens
            </button>
          </div>
        )}
      </div>

      {/* TABS */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex gap-2 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('generate')}
            className={`px-6 py-3 font-bold text-lg transition-all ${activeTab === 'generate' ? 'text-purple-400 border-b-4 border-purple-400' : 'text-gray-500'}`}
          >
            Generate
          </button>
          {canTrainLora && (
            <button
              onClick={() => setActiveTab('lora')}
              className={`px-6 py-3 font-bold text-lg transition-all ${activeTab === 'lora' ? 'text-yellow-400 border-b-4 border-yellow-400' : 'text-gray-500'}`}
            >
              LoRA Builder
            </button>
          )}
        </div>
      </div>

      {activeTab === 'generate' ? (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-purple-400 mb-3">VAULTS</h3>
              <select
                value={selectedVault}
                onChange={e => handleVaultSelect(e.target.value)}
                className="w-full p-3 bg-gray-900 border border-purple-500 rounded-lg text-white focus:border-pink-500 outline-none"
              >
                <option value="">Select Pre-Built Siren</option>
                {vaults.map(v => (
                  <option key={v.title} value={v.title}>
                    {v.title} {v.isLora && ' (Custom LoRA)'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
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

            <div>
              <textarea
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="Describe your siren: uncensored, explicit, neon cyberpunk..."
                className="w-full h-32 p-4 bg-gray-900 border border-cyan-500 rounded-lg text-white resize-none focus:border-purple-500 outline-none"
              />
              <p className="mt-1 text-sm text-gray-400">Est. Tokens: {tokenEstimate}</p>
            </div>

            {mode.includes('img') && (
              <div
                onDrop={handleDrop}
                onDragOver={e => e.preventDefault()}
                className="border-2 border-dashed border-purple-500 rounded-lg p-8 text-center cursor-pointer hover:border-pink-500 transition"
              >
                <p className="text-purple-400 font-medium">Drop Ref Images ({refImages.length}/{maxRefs})</p>
                <div className="mt-4 grid grid-cols-3 md:grid-cols-5 gap-3">
                  {refImages.map((url, i) => (
                    <div key={i} className="relative group">
                      <Image src={url} alt="Ref" width={80} height={80} className="w-full h-20 object-cover rounded-lg shadow-md group-hover:scale-110 transition" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={generating}
              className={`w-full py-6 rounded-full font-bold text-2xl uppercase tracking-widest transition-all transform ${
                generating
                  ? 'bg-gray-700 cursor-not-allowed'
                  : (tier as string) === 'OG'
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-600 shadow-xl shadow-yellow-500/50 hover:scale-105'
                  : (tier as string) === 'Eternal'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-xl shadow-purple-500/50 hover:scale-105'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 shadow-xl shadow-cyan-500/50 hover:scale-105'
              } ${!generating && 'animate-pulse'}`}
            >
              {generating ? 'SUMMONING...' : `GENERATE ${mode.toUpperCase().replace('2', '→')}`}
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600 mb-4 tracking-widest">
              LoRA BUILDER — 50 TOKENS
            </h2>
            <p className="text-xl text-gray-300">Train your face/body/style. 20–40 min. NSFW allowed.</p>
          </div>

          <div className="mt-8 p-4 bg-gray-900/70 rounded-lg border-l-4 border-yellow-500">
            <p className="text-center font-bold">
              {tokenCount === Infinity ? (
                <span className="text-green-400">FREE (Eternal/OG Unlimited)</span>
              ) : tokenCount >= 50 ? (
                <span className="text-yellow-400">50 Tokens Required (You have {tokenCount})</span>
              ) : (
                <span className="text-red-400">Need 50 Tokens — Buy $2.99 Pack</span>
              )}
            </p>
          </div>

          <div
            onDrop={handleLoraDrop}
            onDragOver={e => e.preventDefault()}
            className="border-2 border-dashed border-yellow-500 rounded-2xl p-10 text-center cursor-pointer hover:border-orange-500 transition mt-6"
          >
            <p className="text-yellow-400 text-xl font-bold mb-4">DROP 10–20 IMAGES ({loraImages.length}/20)</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-6">
              <div className="bg-gray-900/70 p-4 rounded-lg border border-purple-500">
                <p className="font-bold text-purple-400">10× CLOSE-UP</p>
                <p className="text-gray-400">Face only</p>
              </div>
              <div className="bg-gray-900/70 p-4 rounded-lg border border-purple-500">
                <p className="font-bold text-purple-400">5× MID-SHOT</p>
                <p className="text-gray-400">Chest up</p>
              </div>
              <div className="bg-gray-900/70 p-4 rounded-lg border border-purple-500">
                <p className="font-bold text-purple-400">5× FULL-BODY</p>
                <p className="text-gray-400">Pose variety</p>
              </div>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
              {loraImages.map((url, i) => (
                <div key={i} className="relative group">
                  <Image src={url} alt="LoRA" width={100} height={100} className="w-full h-24 object-cover rounded-lg shadow-lg border-2 border-yellow-500/50 group-hover:scale-110 transition" />
                  <button
                    onClick={() => setLoraImages(p => p.filter((_, idx) => idx !== i))}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 text-xs opacity-0 group-hover:opacity-100"
                  >
                    ×
                  </button>
                </div>
              ))}
              {Array.from({ length: 20 - loraImages.length }).map((_, i) => (
                <div key={`empty-${i}`} className="w-full h-24 bg-gray-800 rounded-lg border-2 border-dashed border-gray-600" />
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={handleTrainLora}
              disabled={trainingLora || loraImages.length < 10 || (tokenCount !== Infinity && tokenCount < 50)}
              className={`px-12 py-6 rounded-full font-bold text-2xl uppercase tracking-widest transition-all transform ${
                trainingLora || loraImages.length < 10 || (tokenCount !== Infinity && tokenCount < 50)
                  ? 'bg-gray-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-orange-600 to-yellow-600 shadow-2xl shadow-yellow-500/70 hover:scale-105 animate-pulse'
              }`}
            >
              {trainingLora ? 'TRAINING... (30 mins)' : 'TRAIN LoRA — 50 TOKENS'}
            </button>
          </div>
        </div>
      )}

      {outputs.length > 0 && activeTab === 'generate' && (
        <div className="max-w-7xl mx-auto mt-16">
          <h3 className="text-3xl font-bold text-purple-400 mb-6 text-center">YOUR SIRENS</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {outputs.map((url, i) => (
              <div key={i} className="group relative overflow-hidden rounded-xl shadow-2xl">
                <Image src={url} alt="Generated" width={512} height={512} className="w-full h-80 object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition" />
                {(tier as string) !== 'OG' && (
                  <div className="absolute bottom-3 left-3 bg-black/70 px-3 py-1 rounded text-yellow-400 text-sm font-bold">
                    Enhance to 4K ($4.99)
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

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