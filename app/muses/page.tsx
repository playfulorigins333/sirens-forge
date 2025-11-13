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
    files: [] as File[],
  });

  const updateForm = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleMulti = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v: string) => v !== value)
        : [...prev[field], value],
    }));
  };

  const next = () => setStep(prev => Math.min(prev + 1, steps.length - 1));
  const back = () => setStep(prev => Math.max(prev - 1, 0));

  const handleBuild = () => {
    alert(`Muse "${formData.name}" forged! Empire unlocked.`);
    router.push('/vault');
  };

  const steps = [
    {
      title: "🧬 Core Brand Identity",
      content: (
        <div className="space-y-4">
          <input placeholder="Influencer Name" value={formData.name} onChange={e => updateForm('name', e.target.value)} className="w-full bg-transparent border border-purple-500/50 rounded-xl p-4 text-white" />
          <input placeholder="Tagline" value={formData.tagline} onChange={e => updateForm('tagline', e.target.value)} className="w-full bg-transparent border border-purple-500/50 rounded-xl p-4 text-white" />
          <div>
            <p className="text-sm text-gray-400 mb-2">Niche (select all)</p>
            {['Beauty', 'Wellness', 'Business', 'Fashion', 'Lifestyle', 'Tech', 'Spirituality'].map(n => (
              <label key={n} className="flex items-center space-x-2">
                <input type="checkbox" checked={formData.niche.includes(n)} onChange={() => toggleMulti('niche', n)} className="rounded" />
                <span>{n}</span>
              </label>
            ))}
          </div>
          <textarea placeholder="Mission" value={formData.mission} onChange={e => updateForm('mission', e.target.value)} className="w-full bg-transparent border border-purple-500/50 rounded-xl p-4 text-white h-24" />
          <textarea placeholder="Vision" value={formData.vision} onChange={e => updateForm('vision', e.target.value)} className="w-full bg-transparent border border-purple-500/50 rounded-xl p-4 text-white h-24" />
        </div>
      ),
    },
    // ... (we'll add all 7 steps — full code below)
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900 text-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-black text-center mb-4">BUILD YOUR AI SIREN</h1>
        <div className="flex justify-center mb-8">
          {steps.map((_, i) => (
            <div key={i} className={`h-2 w-12 mx-1 rounded-full ${i === step ? 'bg-purple-500' : 'bg-gray-700'}`} />
          ))}
        </div>
        <p className="text-center text-xl mb-8">Step {step + 1} of {steps.length}</p>

        <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6">{steps[step].title}</h2>
          {steps[step].content}

          <div className="flex justify-between mt-8">
            <button onClick={back} disabled={step === 0} className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl disabled:opacity-50">
              Back
            </button>
            <button onClick={step === steps.length - 1 ? handleBuild : next} className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl">
              {step === steps.length - 1 ? 'FORGE MUSE' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}