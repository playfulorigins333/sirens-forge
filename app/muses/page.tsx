'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MusesPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    // 1. Brand Identity
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
    // 2. Audience
    ageRange: '',
    gender: '',
    income: '',
    interests: '',
    struggles: '',
    platforms: [] as string[],
    purchaseTriggers: '',
    followedCreators: '',
    // 3. Visual
    vibeWords: '',
    colorPalette: '',
    typography: '',
    filterStyle: '',
    keyOutfits: '',
    files: [] as File[],
    // 4. Content
    contentPillars: '',
    primaryPlatforms: [] as string[],
    signatureSeries: '',
    postCadence: '',
    captionTone: '',
    ctaStyle: '',
    // 5. Offers
    offers: '',
    leadMagnet: '',
    affiliates: '',
    emailList: false,
    // 6. Behavior
    dmResponse: '',
    favoritePhrases: '',
    trendEngagement: '',
    ethicalGuidelines: '',
    // 7. Relationship
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

  const steps = [
    {
      title: "Core Brand Identity",
      content: (
        <div className="space-y-4">
          <input placeholder="Influencer Name" value={formData.name} onChange={e => update('name', e.target.value)} className="w-full bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
          <input placeholder="Tagline" value={formData.tagline} onChange={e => update('tagline', e.target.value)} className="w-full bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
          <div>
            <p className="text-sm text-purple-300 mb-2">Niche (multi-select)</p>
            {['Skincare', 'Finance', 'Soft Girl Biz', 'Fashion', 'Mindset', 'Wellness', 'Tech'].map(n => (
              <label key={n} className="flex items-center space-x-2 text-sm">
                <input type="checkbox" checked={formData.niche.includes(n)} onChange={() => toggle('niche', n)} className="rounded text-purple-500" />
                <span>{n}</span>
              </label>
            ))}
          </div>
          <textarea placeholder="Purpose (transformation you offer)" value={formData.purpose} onChange={e => update('purpose', e.target.value)} className="w-full bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white h-24 placeholder-gray-400" />
          <textarea placeholder="Mission + Vision" value={formData.mission} onChange={e => update('mission', e.target.value)} className="w-full bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white h-24 placeholder-gray-400" />
        </div>
      ),
    },
    {
      title: "Dream Audience",
      content: (
        <div className="space-y-4">
          <input placeholder="Age Range (e.g. 22–27)" value={formData.ageRange} onChange={e => update('ageRange', e.target.value)} className="w-full bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
          <input placeholder="Gender Identity" value={formData.gender} onChange={e => update('gender', e.target.value)} className="w-full bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
          <input placeholder="Income Level" value={formData.income} onChange={e => update('income', e.target.value)} className="w-full bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
          <textarea placeholder="Hobbies, Interests & Aspirations" value={formData.interests} onChange={e => update('interests', e.target.value)} className="w-full bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white h-24 placeholder-gray-400" />
          <textarea placeholder="Top 3 Struggles" value={formData.struggles} onChange={e => update('struggles', e.target.value)} className="w-full bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white h-24 placeholder-gray-400" />
        </div>
      ),
    },
    {
      title: "Visual Aesthetic",
      content: (
        <div className="space-y-4">
          <input placeholder="Vibe Words (soft glam, Y2K, etc.)" value={formData.vibeWords} onChange={e => update('vibeWords', e.target.value)} className="w-full bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
          <input placeholder="Color Palette (2–5)" value={formData.colorPalette} onChange={e => update('colorPalette', e.target.value)} className="w-full bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
          <input placeholder="Typography Style" value={formData.typography} onChange={e => update('typography', e.target.value)} className="w-full bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
          <input placeholder="Filter/Preset" value={formData.filterStyle} onChange={e => update('filterStyle', e.target.value)} className="w-full bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
          <input placeholder="Key Outfits" value={formData.keyOutfits} onChange={e => update('keyOutfits', e.target.value)} className="w-full bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
          <input type="file" multiple onChange={e => update('files', Array.from(e.target.files || []))} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white" />
        </div>
      ),
    },
    {
      title: "Content Strategy",
      content: (
        <div className="space-y-4">
          <textarea placeholder="3–5 Content Pillars" value={formData.contentPillars} onChange={e => update('contentPillars', e.target.value)} className="w-full bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white h-24 placeholder-gray-400" />
          <div>
            <p className="text-sm text-purple-300 mb-2">Primary Platforms</p>
            {['IG', 'TikTok', 'YouTube Shorts', 'LinkedIn'].map(p => (
              <label key={p} className="flex items-center space-x-2 text-sm">
                <input type="checkbox" checked={formData.primaryPlatforms.includes(p)} onChange={() => toggle('primaryPlatforms', p)} className="rounded text-purple-500" />
                <span>{p}</span>
              </label>
            ))}
          </div>
          <input placeholder="Signature Series (e.g. Money Monday)" value={formData.signatureSeries} onChange={e => update('signatureSeries', e.target.value)} className="w-full bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
          <input placeholder="Post Cadence" value={formData.postCadence} onChange={e => update('postCadence', e.target.value)} className="w-full bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
          <input placeholder="Caption Tone" value={formData.captionTone} onChange={e => update('captionTone', e.target.value)} className="w-full bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
          <input placeholder="CTA Style" value={formData.ctaStyle} onChange={e => update('ctaStyle', e.target.value)} className="w-full bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
        </div>
      ),
    },
    {
      title: "Monetization",
      content: (
        <div className="space-y-4">
          <textarea placeholder="What do they sell?" value={formData.offers} onChange={e => update('offers', e.target.value)} className="w-full bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white h-24 placeholder-gray-400" />
          <input placeholder="Lead Magnet" value={formData.leadMagnet} onChange={e => update('leadMagnet', e.target.value)} className="w-full bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
          <input placeholder="Affiliate Links" value={formData.affiliates} onChange={e => update('affiliates', e.target.value)} className="w-full bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={formData.emailList} onChange={e => update('emailList', e.target.checked)} className="rounded text-purple-500" />
            <span>Email List?</span>
          </label>
        </div>
      ),
    },
    {
      title: "AI Behavior",
      content: (
        <div className="space-y-4">
          <input placeholder="DM/Comment Response Style" value={formData.dmResponse} onChange={e => update('dmResponse', e.target.value)} className="w-full bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
          <input placeholder="Favorite Phrases/Emojis" value={formData.favoritePhrases} onChange={e => update('favoritePhrases', e.target.value)} className="w-full bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
          <input placeholder="Trend Engagement" value={formData.trendEngagement} onChange={e => update('trendEngagement', e.target.value)} className="w-full bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
          <textarea placeholder="Ethical Guidelines" value={formData.ethicalGuidelines} onChange={e => update('ethicalGuidelines', e.target.value)} className="w-full bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white h-24 placeholder-gray-400" />
        </div>
      ),
    },
    {
      title: "Relationship Style",
      content: (
        <div className="space-y-4">
          <select value={formData.relationshipStyle} onChange={e => update('relationshipStyle', e.target.value)} className="w-full bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white">
            <option value="">Relationship Style</option>
            <option>Mentor</option>
            <option>Bestie</option>
            <option>Big Sis</option>
            <option>Coach</option>
            <option>Muse</option>
          </select>
          <input placeholder="How should audience feel?" value={formData.audienceFeel} onChange={e => update('audienceFeel', e.target.value)} className="w-full bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
          <input placeholder="Online Love Language" value={formData.loveLanguage} onChange={e => update('loveLanguage', e.target.value)} className="w-full bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
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