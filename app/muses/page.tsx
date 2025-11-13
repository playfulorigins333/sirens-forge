'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MusesPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    niche: [] as string[],
    purpose: '',
    mission: '',
    vision: '',
    values: [] as string[],
    archetype: '',
    backstory: '',
    tone: '',
    ageRange: '',
    gender: '',
    income: '',
    interests: '',
    struggles: '',
    platforms: [] as string[],
    purchaseTriggers: '',
    followedCreators: '',
    vibeWords: '',
    colorPalette: '',
    typography: '',
    filterStyle: '',
    keyOutfits: '',
    files: [] as File[],
    contentPillars: '',
    primaryPlatforms: [] as string[],
    signatureSeries: '',
    postCadence: '',
    captionTone: '',
    ctaStyle: '',
    offers: '',
    leadMagnet: '',
    affiliates: '',
    emailList: false,
    dmResponse: '',
    favoritePhrases: '',
    trendEngagement: '',
    ethicalGuidelines: '',
    relationshipStyle: '',
    audienceFeel: '',
    loveLanguage: '',
  });

  const update = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggle = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value],
    }));
  };

  const next = () => setStep(prev => Math.min(prev + 1, steps.length - 1));
  const back = () => setStep(prev => Math.max(prev - 1, 0));

  const handleBuild = () => {
    alert(`"${formData.name}" is LIVE. Empire unlocked.`);
    router.push('/vault');
  };

  const InfoIcon = ({ text }: { text: string }) => (
    <div className="group relative inline-block">
      <span className="text-purple-400 cursor-help text-xs">ⓘ</span>
      <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 z-10 w-64 -left-32 mt-1">
        {text}
      </div>
    </div>
  );

  const steps = [
    {
      title: "Core Brand Identity",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input placeholder="Influencer Name" value={formData.name} onChange={e => update('name', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
            <InfoIcon text="e.g., Luna Siren, Baddie Bella, Glow Queen" />
          </div>
          <div className="flex items-center gap-2">
            <input placeholder="Tagline" value={formData.tagline} onChange={e => update('tagline', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
            <InfoIcon text="Short, sexy, memorable. e.g., 'Your fantasy, my reality'" />
          </div>
          <div>
            <p className="text-sm text-purple-300 mb-2 flex items-center gap-2">
              Niche (multi-select)
              <InfoIcon text="Pick all that apply. NSFW? Select 'Soft Girl Biz' or 'Wellness' for tease content." />
            </p>
            {['Skincare', 'Finance', 'Soft Girl Biz', 'Fashion', 'Mindset', 'Wellness', 'Tech'].map(n => (
              <label key={n} className="flex items-center space-x-2 text-sm">
                <input type="checkbox" checked={formData.niche.includes(n)} onChange={() => toggle('niche', n)} className="rounded text-purple-500" />
                <span>{n}</span>
              </label>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <textarea placeholder="Purpose (what transformation do you offer?)" value={formData.purpose} onChange={e => update('purpose', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white h-24 placeholder-gray-400" />
            <InfoIcon text="e.g., 'Help women feel desired', 'Turn fantasies into income'" />
          </div>
          <div className="flex items-center gap-2">
            <textarea placeholder="Mission + Vision" value={formData.mission} onChange={e => update('mission', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white h-24 placeholder-gray-400" />
            <InfoIcon text="Mission = daily action. Vision = empire goal." />
          </div>
        </div>
      ),
    },
    // ... (all other steps with InfoIcon)
    {
      title: "Monetization",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <textarea placeholder="What do you sell? (PPV, subscriptions, digital, affiliate)" value={formData.offers} onChange={e => update('offers', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white h-24 placeholder-gray-400" />
            <InfoIcon text="e.g., '$9.99 PPV drops', 'Fanvue VIP', 'Erotic eBooks', 'Affiliate toys'" />
          </div>
          <div className="flex items-center gap-2">
            <input placeholder="Lead Magnet (free tease)" value={formData.leadMagnet} onChange={e => update('leadMagnet', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
            <InfoIcon text="e.g., 'Free SFW teaser pack', '7-day glow challenge'" />
          </div>
          <div className="flex items-center gap-2">
            <input placeholder="Affiliate Links" value={formData.affiliates} onChange={e => update('affiliates', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
            <InfoIcon text="e.g., 'Vibrators, lingerie, crypto'" />
          </div>
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={formData.emailList} onChange={e => update('emailList', e.target.checked)} className="rounded text-purple-500" />
            <span>Email List?</span>
          </label>
        </div>
      ),
    },
    {
      title: "Relationship Style",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <select 
              value={formData.relationshipStyle} 
              onChange={e => update('relationshipStyle', e.target.value)} 
              className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white text-sm appearance-none"
              style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em' }}
            >
              <option value="" disabled>Select relationship style...</option>
              <option value="mentor">Mentor (guides with wisdom)</option>
              <option value="bestie">Bestie (fun, flirty, real)</option>
              <option value="big-sis">Big Sister (protective, teasing)</option>
              <option value="coach">Coach (motivational, direct)</option>
              <option value="muse">Muse (inspiring, mysterious)</option>
            </select>
            <InfoIcon text="How do you show up in their DMs? Pick one." />
          </div>
          <div className="flex items-center gap-2">
            <input placeholder="How should audience feel?" value={formData.audienceFeel} onChange={e => update('audienceFeel', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
            <InfoIcon text="e.g., 'Desired', 'Seen', 'Turned on', 'Empowered'" />
          </div>
          <div className="flex items-center gap-2">
            <input placeholder="Online Love Language" value={formData.loveLanguage} onChange={e => update('loveLanguage', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
            <InfoIcon text="e.g., 'Voice notes', 'Late-night DMs', 'Exclusive stories'" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900 text-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-black text-center mb-4">BUILD YOUR AI SIREN</h1>
        <div className="flex justify-center mb-6">
          {steps.map((_, i) => (
            <div key={i} className={`h-2 w-12 mx-1 rounded-full transition-all ${i === step ? 'bg-purple-500 w-16' : 'bg-gray-700'}`} />
          ))}
        </div>
        <p className="text-center text-lg mb-8">Step {step + 1} of {steps.length}</p>

        <div className="bg-white/5 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">{steps[step].title}</h2>
          {steps[step].content}

          <div className="flex justify-between mt-8">
            <button onClick={back} disabled={step === 0} className="px-8 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl disabled:opacity-50">
              Back
            </button>
            <button onClick={step === steps.length - 1 ? handleBuild : next} className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-bold">
              {step === steps.length - 1 ? 'FORGE MUSE' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}