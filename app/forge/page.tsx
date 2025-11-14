'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ForgePage() {
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
    colorPalette: '',  // ← FIXED: was 'семь'
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
    <div className="group relative inline-block ml-2">
      <span className="text-purple-400 cursor-help text-xs">i</span>
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
            <InfoIcon text="e.g., Luna Siren, King Kai, Trans Titan, Non-Binary Nova" />
          </div>
          <div className="flex items-center gap-2">
            <input placeholder="Tagline" value={formData.tagline} onChange={e => update('tagline', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
            <InfoIcon text="e.g., 'Your fantasy, my reality', 'Born to dominate', 'Unapologetically me'" />
          </div>
          <div>
            <p className="text-sm text-purple-300 mb-2 flex items-center gap-2">
              Niche (multi-select)
              <InfoIcon text="All genders & styles: Skincare, Finance, Fashion, Fitness, Gaming, Wellness, Tech" />
            </p>
            {['Skincare', 'Finance', 'Fashion', 'Mindset', 'Wellness', 'Tech', 'Fitness', 'Gaming'].map(n => (
              <label key={n} className="flex items-center space-x-2 text-sm">
                <input type="checkbox" checked={formData.niche.includes(n)} onChange={() => toggle('niche', n)} className="rounded text-purple-500" />
                <span>{n}</span>
              </label>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <textarea placeholder="Purpose" value={formData.purpose} onChange={e => update('purpose', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white h-24 placeholder-gray-400" />
            <InfoIcon text="e.g., 'Help people feel desired', 'Build confidence', 'Inspire financial freedom'" />
          </div>
          <div className="flex items-center gap-2">
            <textarea placeholder="Mission + Vision" value={formData.mission} onChange={e => update('mission', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white h-24 placeholder-gray-400" />
            <InfoIcon text="Mission = daily action. Vision = empire goal." />
          </div>
        </div>
      ),
    },
    {
      title: "Audience DNA",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input placeholder="Age Range" value={formData.ageRange} onChange={e => update('ageRange', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
            <InfoIcon text="e.g., 18-24, 25-34" />
          </div>
          <div className="flex items-center gap-2">
            <input placeholder="Gender" value={formData.gender} onChange={e => update('gender', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
            <InfoIcon text="e.g., Female, Male, Non-Binary" />
          </div>
          <div className="flex items-center gap-2">
            <input placeholder="Income Level" value={formData.income} onChange={e => update('income', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
            <InfoIcon text="e.g., $50K+, $100K+, $250K+" />
          </div>
          <div className="flex items-center gap-2">
            <textarea placeholder="Interests" value={formData.interests} onChange={e => update('interests', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white h-24 placeholder-gray-400" />
            <InfoIcon text="e.g., Yoga, Crypto, Luxury Fashion" />
          </div>
          <div className="flex items-center gap-2">
            <textarea placeholder="Struggles" value={formData.struggles} onChange={e => update('struggles', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white h-24 placeholder-gray-400" />
            <InfoIcon text="e.g., 'Feeling invisible', 'No time for self-care'" />
          </div>
        </div>
      ),
    },
    {
      title: "Content Strategy",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <textarea placeholder="Content Pillars" value={formData.contentPillars} onChange={e => update('contentPillars', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white h-24 placeholder-gray-400" />
            <InfoIcon text="e.g., 'Morning Routine', 'Behind the Scenes', 'Q&A'" />
          </div>
          <div>
            <p className="text-sm text-purple-300 mb-2 flex items-center gap-2">
              Primary Platforms
              <InfoIcon text="Where do they live? TikTok, IG, X, YouTube?" />
            </p>
            {['TikTok', 'Instagram', 'X', 'YouTube', 'Fansly', 'OnlyFans'].map(p => (
              <label key={p} className="flex items-center space-x-2 text-sm">
                <input type="checkbox" checked={formData.primaryPlatforms.includes(p)} onChange={() => toggle('primaryPlatforms', p)} className="rounded text-purple-500" />
                <span>{p}</span>
              </label>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input placeholder="Signature Series" value={formData.signatureSeries} onChange={e => update('signatureSeries', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
            <InfoIcon text="e.g., 'Siren Sundays', 'Midnight Confessions'" />
          </div>
          <div className="flex items-center gap-2">
            <input placeholder="Post Cadence" value={formData.postCadence} onChange={e => update('postCadence', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
            <InfoIcon text="e.g., '3x/week', 'Daily'" />
          </div>
        </div>
      ),
    },
    {
      title: "Voice & Style",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <textarea placeholder="Caption Tone" value={formData.captionTone} onChange={e => update('captionTone', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white h-24 placeholder-gray-400" />
            <InfoIcon text="e.g., 'Flirty & teasing', 'Direct & dominant'" />
          </div>
          <div className="flex items-center gap-2">
            <input placeholder="CTA Style" value={formData.ctaStyle} onChange={e => update('ctaStyle', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
            <InfoIcon text="e.g., 'DM me', 'Link in bio', 'Tap to unlock'" />
          </div>
          <div className="flex items-center gap-2">
            <textarea placeholder="Favorite Phrases" value={formData.favoritePhrases} onChange={e => update('favoritePhrases', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white h-24 placeholder-gray-400" />
            <InfoIcon text="e.g., 'Your wish is my command', 'Let me show you'" />
          </div>
        </div>
      ),
    },
    {
      title: "Visual Identity",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input placeholder="Color Palette" value={formData.colorPalette} onChange={e => update('colorPalette', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
            <InfoIcon text="e.g., 'Neon Pink + Black', 'Gold + Ivory'" />
          </div>
          <div className="flex items-center gap-2">
            <input placeholder="Typography" value={formData.typography} onChange={e => update('typography', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
            <InfoIcon text="e.g., 'Playful script', 'Bold sans-serif'" />
          </div>
          <div className="flex items-center gap-2">
            <input placeholder="Filter Style" value={formData.filterStyle} onChange={e => update('filterStyle', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
            <InfoIcon text="e.g., 'Vintage', 'Cinematic', 'High-contrast'" />
          </div>
          <div className="flex items-center gap-2">
            <textarea placeholder="Key Outfits" value={formData.keyOutfits} onChange={e => update('keyOutfits', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white h-24 placeholder-gray-400" />
            <InfoIcon text="e.g., 'Lace lingerie', 'Silk robe', 'Leather harness'" />
          </div>
        </div>
      ),
    },
    {
      title: "Monetization",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <textarea placeholder="What do you sell?" value={formData.offers} onChange={e => update('offers', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white h-24 placeholder-gray-400" />
            <InfoIcon text="e.g., '$9.99 PPV', 'VIP Fanvue', 'Erotic eBooks'" />
          </div>
          <div className="flex items-center gap-2">
            <input placeholder="Lead Magnet" value={formData.leadMagnet} onChange={e => update('leadMagnet', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
            <InfoIcon text="e.g., 'Free teaser pack', '7-day glow challenge'" />
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