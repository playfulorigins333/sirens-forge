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
    gender: [] as string[],
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
    influencerVibe: [] as string[],
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
      title: "Dream Audience",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input placeholder="Age Range" value={formData.ageRange} onChange={e => update('ageRange', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
            <InfoIcon text="e.g., 18–24, 25–34, 35–44, 45+" />
          </div>
          <div>
            <p className="text-sm text-purple-300 mb-2 flex items-center gap-2">
              Gender Identity
              <InfoIcon text="Select all that apply: Male, Female, Trans, Non-Binary, Other" />
            </p>
            {['Male', 'Female', 'Trans', 'Non-Binary', 'Other'].map(g => (
              <label key={g} className="flex items-center space-x-2 text-sm">
                <input type="checkbox" checked={formData.gender.includes(g)} onChange={() => toggle('gender', g)} className="rounded text-purple-500" />
                <span>{g}</span>
              </label>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input placeholder="Income Level" value={formData.income} onChange={e => update('income', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
            <InfoIcon text="e.g., $50k+, $100k+, Luxury, Budget-conscious" />
          </div>
          <div className="flex items-center gap-2">
            <textarea placeholder="Interests" value={formData.interests} onChange={e => update('interests', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white h-24 placeholder-gray-400" />
            <InfoIcon text="e.g., Gaming, fitness, crypto, fashion, self-growth, art" />
          </div>
          <div className="flex items-center gap-2">
            <textarea placeholder="Top 3 Struggles" value={formData.struggles} onChange={e => update('struggles', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white h-24 placeholder-gray-400" />
            <InfoIcon text="e.g., 'Feels invisible', 'Wants more income', 'Craves confidence'" />
          </div>
        </div>
      ),
    },
    {
      title: "Visual Aesthetic",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input placeholder="Vibe Words" value={formData.vibeWords} onChange={e => update('vibeWords', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
            <InfoIcon text="e.g., soft glam, cyberpunk, boudoir, clean girl, streetwear, corporate" />
          </div>
          <div className="flex items-center gap-2">
            <input placeholder="Color Palette" value={formData.colorPalette} onChange={e => update('colorPalette', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
            <InfoIcon text="e.g., blush pink, midnight black, gold, neon green" />
          </div>
          <div className="flex items-center gap-2">
            <input placeholder="Typography" value={formData.typography} onChange={e => update('typography', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
            <InfoIcon text="e.g., elegant serif, bold sans, handwritten, futuristic" />
          </div>
          <div className="flex items-center gap-2">
            <input placeholder="Filter/Preset" value={formData.filterStyle} onChange={e => update('filterStyle', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
            <InfoIcon text="e.g., warm, moody, high contrast, vintage, clean" />
          </div>
          <div className="flex items-center gap-2">
            <input placeholder="Key Outfits" value={formData.keyOutfits} onChange={e => update('keyOutfits', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
            <InfoIcon text="e.g., lingerie, suit, streetwear, gym, cosplay, business casual" />
          </div>
          <div className="flex items-center gap-2">
            <input type="file" multiple onChange={e => update('files', Array.from(e.target.files || []))} className="flex-1 block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white" />
            <InfoIcon text="3–10 reference images — any gender, style, or vibe" />
          </div>
        </div>
      ),
    },
    {
      title: "Content Strategy",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <textarea placeholder="3–5 Content Pillars" value={formData.contentPillars} onChange={e => update('contentPillars', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white h-24 placeholder-gray-400" />
            <InfoIcon text="e.g., Tease, Tips, Behind Scenes, Promo, Motivation" />
          </div>
          <div>
            <p className="text-sm text-purple-300 mb-2 flex items-center gap-2">
              Auto-Post Platforms
              <InfoIcon text="We auto-post here. Fanvue = PPV. X = Teasers." />
            </p>
            {['Fanvue', 'X (Twitter)', 'Instagram', 'TikTok'].map(p => (
              <label key={p} className="flex items-center space-x-2 text-sm">
                <input type="checkbox" checked={formData.primaryPlatforms.includes(p)} onChange={() => toggle('primaryPlatforms', p)} className="rounded text-purple-500" />
                <span>{p}</span>
              </label>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input placeholder="Signature Series" value={formData.signatureSeries} onChange={e => update('signatureSeries', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
            <InfoIcon text="e.g., 'Tease Tuesday', 'Money Monday', 'Fit Friday'" />
          </div>
          <div className="flex items-center gap-2">
            <input placeholder="Post Cadence" value={formData.postCadence} onChange={e => update('postCadence', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
            <InfoIcon text="e.g., Daily, 3x/week, 1x/day" />
          </div>
          <div className="flex items-center gap-2">
            <input placeholder="Caption Tone" value={formData.captionTone} onChange={e => update('captionTone', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
            <InfoIcon text="e.g., flirty, empowering, sassy, motivational, mysterious" />
          </div>
          <div className="flex items-center gap-2">
            <input placeholder="CTA Style" value={formData.ctaStyle} onChange={e => update('ctaStyle', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
            <InfoIcon text="e.g., 'DM me', 'Link in bio', 'Unlock now', 'Join VIP'" />
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
            <InfoIcon text="e.g., '$9.99 PPV', 'Fanvue VIP', 'Erotic eBooks', 'Workout Plans', 'Crypto Course'" />
          </div>
          <div className="flex items-center gap-2">
            <input placeholder="Lead Magnet" value={formData.leadMagnet} onChange={e => update('leadMagnet', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
            <InfoIcon text="e.g., 'Free SFW teaser', '7-day glow challenge', 'Crypto starter guide'" />
          </div>
          <div className="flex items-center gap-2">
            <input placeholder="Affiliate Links" value={formData.affiliates} onChange={e => update('affiliates', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
            <InfoIcon text="e.g., 'Vibrators', 'Protein', 'Crypto exchange', 'Fashion brands'" />
          </div>
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
          <div className="flex items-center gap-2">
            <input placeholder="DM/Comment Style" value={formData.dmResponse} onChange={e => update('dmResponse', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
            <InfoIcon text="e.g., 'flirty', 'expert', 'bestie', 'coach', 'mysterious'" />
          </div>
          <div className="flex items-center gap-2">
            <input placeholder="Phrases/Emojis" value={formData.favoritePhrases} onChange={e => update('favoritePhrases', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
            <InfoIcon text="e.g., 'Hey gorgeous', 'fire', 'DM me', 'Let's grow'" />
          </div>
          <div className="flex items-center gap-2">
            <input placeholder="Trend Engagement" value={formData.trendEngagement} onChange={e => update('trendEngagement', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
            <InfoIcon text="e.g., 'Follows fast', 'Leads trends', 'Ignores trends'" />
          </div>
          <div className="flex items-center gap-2">
            <textarea placeholder="Ethical Guidelines" value={formData.ethicalGuidelines} onChange={e => update('ethicalGuidelines', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white h-24 placeholder-gray-400" />
            <InfoIcon text="e.g., 'No minors', 'No hate', 'All content consensual'" />
          </div>
        </div>
      ),
    },
    {
      title: "INFLUENCER VIBE",
      content: (
        <div className="space-y-6">
          <div>
            <p className="text-sm text-purple-300 mb-3 flex items-center gap-2">
              Pick 1–3 vibes to blend
              <InfoIcon text="We combine them to create your unique AI persona." />
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'alpha', label: 'Alpha King' },
                { value: 'baddie', label: 'Baddie Energy' },
                { value: 'goddess', label: 'Goddess Worship' },
                { value: 'dom', label: 'Dominant Force' },
                { value: 'sweet', label: 'Sweet & Seductive' },
                { value: 'trans', label: 'Trans Icon' },
                { value: 'non-binary', label: 'Non-Binary Visionary' },
                { value: 'mentor', label: 'Mentor' },
                { value: 'bestie', label: 'Bestie' },
                { value: 'coach', label: 'Coach' },
              ].map(v => (
                <label key={v.value} className="flex items-center space-x-2 text-sm p-2 bg-white/5 rounded-lg hover:bg-white/10 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.influencerVibe.includes(v.value)}
                    onChange={() => toggle('influencerVibe', v.value)}
                    className="rounded text-purple-500"
                  />
                  <span>{v.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input placeholder="How should audience feel?" value={formData.audienceFeel} onChange={e => update('audienceFeel', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
            <InfoIcon text="e.g., 'Powerful', 'Desired', 'Seen', 'Motivated'" />
          </div>
          <div className="flex items-center gap-2">
            <input placeholder="Online Love Language" value={formData.loveLanguage} onChange={e => update('loveLanguage', e.target.value)} className="flex-1 bg-white/10 border border-purple-500/50 rounded-xl p-4 text-white placeholder-gray-400" />
            <InfoIcon text="e.g., 'PPV drops', 'Voice DMs', 'Exclusive content', 'Live Q&A'" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900 text-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-black text-center mb-4">BUILD YOUR AI INFLUENCER</h1>
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
              {step === steps.length - 1 ? 'FORGE INFLUENCER' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}