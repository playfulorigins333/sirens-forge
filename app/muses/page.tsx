'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MusesPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    niche: '',
    mission: '',
    backstory: '',
    ageRange: '',
    interests: '',
    struggles: '',
    hangouts: '',
    creators: '',
    colorPalette: '',
    keyOutfits: '',
    vibe: '',
    postCadence: '',
    signatureSeries: '',
    offers: '',
    leadMagnet: '',
    affiliates: '',
    dmVibe: '',
    phrases: '',
    trends: '',
    audienceFeel: '',
    files: [] as File[],
    nsfwLevel: 'teaser',
  });

  const updateForm = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const next = () => setStep(prev => prev + 1);
  const back = () => setStep(prev => Math.max(prev - 1, 0));

  const handleBuild = async () => {
    // Mock — replace with real LoRA API call
    alert(`Muse "${formData.name}" forged! Empire unlocked.`);
    router.push('/vault');
  };

  const steps = [
    {
      title: "✨ Brand Identity",
      content: (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Influencer Name"
            value={formData.name}
            onChange={(e) => updateForm('name', e.target.value)}
            className="w-full bg-transparent border border-purple-500/50 rounded-xl p-4 text-white focus:outline-none focus:border-purple-400"
          />
          <input
            type="text"
            placeholder="Tagline or Catchphrase"
            value={formData.tagline}
            onChange={(e) => updateForm('tagline', e.target.value)}
            className="w-full bg-transparent border border-purple-500/50 rounded-xl p-4 text-white focus:outline-none focus:border-purple-400"
          />
          <select
            value={formData.niche}
            onChange={(e) => updateForm('niche', e.target.value)}
            className="w-full bg-transparent border border-purple-500/50 rounded-xl p-4 text-white focus:outline-none focus:border-purple-400"
          >
            <option value="">Pick a Niche</option>
            <option value="beauty">Beauty</option>
            <option value="wellness">Wellness</option>
            <option value="biz">Business</option>
            <option value="fashion">Fashion</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="tech">Tech</option>
            <option value="spiritual">Spirituality</option>
          </select>
          <textarea
            placeholder="What’s the mission or purpose of this influencer?"
            value={formData.mission}
            onChange={(e) => updateForm('mission', e.target.value)}
            className="w-full bg-transparent border border-purple-500/50 rounded-xl p-4 text-white focus:outline-none focus:border-purple-400 h-24"
          />
          <textarea
            placeholder="Short backstory (can be fictional or real)"
            value={formData.backstory}
            onChange={(e) => updateForm('backstory', e.target.value)}
            className="w-full bg-transparent border border-purple-500/50 rounded-xl p-4 text-white focus:outline-none focus:border-purple-400 h-24"
          />
        </div>
      ),
    },
    {
      title: "🎯 Dream Audience",
      content: (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Age Range (e.g. 22–27)"
            value={formData.ageRange}
            onChange={(e) => updateForm('ageRange', e.target.value)}
            className="w-full bg-transparent border border-purple-500/50 rounded-xl p-4 text-white focus:outline-none focus:border-purple-400"
          />
          <input
            type="text"
            placeholder="Top Interests (comma-separated)"
            value={formData.interests}
            onChange={(e) => updateForm('interests', e.target.value)}
            className="w-full bg-transparent border border-purple-500/50 rounded-xl p-4 text-white focus:outline-none focus:border-purple-400"
          />
          <textarea
            placeholder="Top 3 struggles your audience has"
            value={formData.struggles}
            onChange={(e) => updateForm('struggles', e.target.value)}
            className="w-full bg-transparent border border-purple-500/50 rounded-xl p-4 text-white focus:outline-none focus:border-purple-400 h-24"
          />
          <input
            type="text"
            placeholder="Where do they hang out online? (IG, TikTok, YouTube)"
            value={formData.hangouts}
            onChange={(e) => updateForm('hangouts', e.target.value)}
            className="w-full bg-transparent border border-purple-500/50 rounded-xl p-4 text-white focus:outline-none focus:border-purple-400"
          />
          <input
            type="text"
            placeholder="What creators do they already follow?"
            value={formData.creators}
            onChange={(e) => updateForm('creators', e.target.value)}
            className="w-full bg-transparent border border-purple-500/50 rounded-xl p-4 text-white focus:outline-none focus:border-purple-400"
          />
        </div>
      ),
    },
    {
      title: "🎨 Visual & Aesthetic Vibe",
      content: (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Color Palette (e.g. Soft pastels, Bold neons)"
            value={formData.colorPalette}
            onChange={(e) => updateForm('colorPalette', e.target.value)}
            className="w-full bg-transparent border border-purple-500/50 rounded-xl p-4 text-white focus:outline-none focus:border-purple-400"
          />
          <input
            type="text"
            placeholder="Key Outfits or Looks"
            value={formData.keyOutfits}
            onChange={(e) => updateForm('keyOutfits', e.target.value)}
            className="w-full bg-transparent border border-purple-500/50 rounded-xl p-4 text-white focus:outline-none focus:border-purple-400"
          />
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => updateForm('files', Array.from(e.target.files || []))}
            className="block w-full text-sm text-gray-400 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
          />
        </div>
      ),
    },
    {
      title: "📝 Content & Tone",
      content: (
        <div className="space-y-4">
          <select
            value={formData.vibe}
            onChange={(e) => updateForm('vibe', e.target.value)}
            className="w-full bg-transparent border border-purple-500/50 rounded-xl p-4 text-white focus:outline-none focus:border-purple-400"
          >
            <option value="">Vibe / Personality</option>
            <option value="empowering">Empowering Coach</option>
            <option value="fun">Fun & Sassy</option>
            <option value="mysterious">Mysterious Siren</option>
            <option value="hype">Hype Girl</option>
            <option value="professional">Professional / Polished</option>
          </select>
          <input
            type="text"
            placeholder="Post cadence (e.g. daily, 3x/week)"
            value={formData.postCadence}
            onChange={(e) => updateForm('postCadence', e.target.value)}
            className="w-full bg-transparent border border-purple-500/50 rounded-xl p-4 text-white focus:outline-none focus:border-purple-400"
          />
          <textarea
            placeholder="Signature Series Ideas (e.g. Money Mondays)"
            value={formData.signatureSeries}
            onChange={(e) => updateForm('signatureSeries', e.target.value)}
            className="w-full bg-transparent border border-purple-500/50 rounded-xl p-4 text-white focus:outline-none focus:border-purple-400 h-24"
          />
        </div>
      ),
    },
    {
      title: "💸 Offers + Promotion Style",
      content: (
        <div className="space-y-4">
          <textarea
            placeholder="What does this AI influencer promote? (Offers, brands, digital products?)"
            value={formData.offers}
            onChange={(e) => updateForm('offers', e.target.value)}
            className="w-full bg-transparent border border-purple-500/50 rounded-xl p-4 text-white focus:outline-none focus:border-purple-400 h-24"
          />
          <input
            type="text"
            placeholder="Lead magnet/freebie (if any)"
            value={formData.leadMagnet}
            onChange={(e) => updateForm('leadMagnet', e.target.value)}
            className="w-full bg-transparent border border-purple-500/50 rounded-xl p-4 text-white focus:outline-none focus:border-purple-400"
          />
          <input
            type="text"
            placeholder="Affiliate links or product shoutouts?"
            value={formData.affiliates}
            onChange={(e) => updateForm('affiliates', e.target.value)}
            className="w-full bg-transparent border border-purple-500/50 rounded-xl p-4 text-white focus:outline-none focus:border-purple-400"
          />
        </div>
      ),
    },
    {
      title: "💁 Relationship & Energy",
      content: (
        <div className="space-y-4">
          <select
            value={formData.dmVibe}
            onChange={(e) => updateForm('dmVibe', e.target.value)}
            className="w-full bg-transparent border border-purple-500/50 rounded-xl p-4 text-white focus:outline-none focus:border-purple-400"
          >
            <option value="">How do they show up in DMs?</option>
            <option value="bestie">Like a bestie</option>
            <option value="coach">Empowering coach</option>
            <option value="bigSister">Big sister vibe</option>
            <option value="inspo">Chill inspo queen</option>
          </select>
          <input
            type="text"
            placeholder="Favorite phrases or emojis they use?"
            value={formData.phrases}
            onChange={(e) => updateForm('phrases', e.target.value)}
            className="w-full bg-transparent border border-purple-500/50 rounded-xl p-4 text-white focus:outline-none focus:border-purple-400"
          />
          <input
            type="text"
            placeholder="Do they follow or lead trends?"
            value={formData.trends}
            onChange={(e) => updateForm('trends', e.target.value)}
            className="w-full bg-transparent border border-purple-500/50 rounded-xl p-4 text-white focus:outline-none focus:border-purple-400"
          />
          <textarea
            placeholder="How should their audience feel after seeing their content?"
            value={formData.audienceFeel}
            onChange={(e) => updateForm('audienceFeel', e.target.value)}
            className="w-full bg-transparent border border-purple-500/50 rounded-xl p-4 text-white focus:outline-none focus:border-purple-400 h-24"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900 text-white p-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-md mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-8">BUILD YOUR AI SIREN</h1>
        <p className="text-center text-gray-300 mb-8">Step {step + 1} of {steps.length}</p>
        <h2 className="text-2xl font-bold mb-4">{steps[step].title}</h2>
        {steps[step].content}

        <div className="flex justify-between mt-6">
          <button
            onClick={back}
            disabled={step === 0}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-xl disabled:opacity-50"
          >
            Back
          </button>
          <button
            onClick={step === steps.length - 1 ? handleBuild : next}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl"
          >
            {step === steps.length - 1 ? "Forge Muse" : "Next"}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(30px,-50px) scale(1.1); } 66% { transform: translate(-20px,20px) scale(0.9); } }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}