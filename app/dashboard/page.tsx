'use client';

import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

// Force dynamic — NO PRERENDER
export const dynamic = 'force-dynamic';

interface Muse {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  lora: string;
  platforms: ('fanvue' | 'x' | 'instagram' | 'tiktok')[];
  connected: boolean;
}

interface PostQueue {
  id: string;
  museId: string;
  content: string;
  media: string[];
  platforms: ('fanvue' | 'x' | 'instagram' | 'tiktok')[];
  scheduled: string;
  status: 'queued' | 'posted' | 'failed';
  earnings?: number;
}

export default function DashboardPage() {
  const [session, setSession] = useState<any>(null);
  const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');
  const [muses, setMuses] = useState<Muse[]>([]);
  const [queue, setQueue] = useState<PostQueue[]>([]);
  const [analytics, setAnalytics] = useState<any[]>([]);
  const [building, setBuilding] = useState(false);
  const [refImages, setRefImages] = useState<File[]>([]);
  const [museName, setMuseName] = useState('');
  const [museBio, setMuseBio] = useState('');
  const [showOAuth, setShowOAuth] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<'fanvue' | 'x' | 'instagram' | 'tiktok'>('fanvue');

  // Client-only auth check
  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch('/api/auth/session');
      const data = await res.json();
      if (data.user) {
        setSession(data);
        setStatus('authenticated');
        fetchDashboard();
      } else {
        setStatus('unauthenticated');
      }
    };
    checkAuth();
  }, []);

  const fetchDashboard = async () => {
    setMuses([
      { id: '1', name: 'Luna Siren', avatar: '/vaults/luna.jpg', bio: 'Eternal siren of the deep', lora: 'luna-lora.safetensors', platforms: ['fanvue', 'x'], connected: true }
    ]);
    setQueue([
      { id: '1', museId: '1', content: 'New drop from Luna', media: ['/gen/luna1.jpg'], platforms: ['fanvue', 'x'], scheduled: 'Now', status: 'queued' }
    ]);
    setAnalytics([
      { day: 'Mon', earnings: 100 },
      { day: 'Tue', earnings: 150 },
      { day: 'Wed', earnings: 120 },
      { day: 'Thu', earnings: 200 },
      { day: 'Fri', earnings: 180 },
      { day: 'Sat', earnings: 220 },
      { day: 'Sun', earnings: 140 },
    ]);
  };

  const buildMuse = async () => {
    if (!museName || refImages.length < 3) return alert('Need name + 3+ refs');
    setBuilding(true);

    const formData = new FormData();
    formData.append('name', museName);
    formData.append('bio', museBio);
    refImages.forEach((file, i) => formData.append(`ref${i}`, file));

    try {
      const res = await axios.post('/api/build-muse', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const newMuse = res.data.muse;
      setMuses(prev => [...prev, newMuse]);
      alert(`Muse "${newMuse.name}" built! Queued first post.`);
      setMuseName(''); setMuseBio(''); setRefImages([]);
    } catch (err) {
      alert('Build failed — try again.');
    }
    setBuilding(false);
  };

  const connectPlatform = (platform: typeof selectedPlatform) => {
    setSelectedPlatform(platform);
    setShowOAuth(true);
    signIn(platform);
  };

  const queuePost = async (museId: string) => {
    const muse = muses.find(m => m.id === museId);
    if (!muse) return;

    const post: PostQueue = {
      id: Date.now().toString(),
      museId,
      content: `${muse.name} drops new siren. Link in bio. #SirensForge`,
      media: [muse.avatar],
      platforms: muse.platforms,
      scheduled: new Date(Date.now() + 3600000).toISOString(),
      status: 'queued',
    };

    await axios.post('/api/queue-post', post);
    setQueue(prev => [post, ...prev]);
  };

  if (status === 'loading') return <div className="min-h-screen flex items-center justify-center text-white">Loading empire...</div>;
  if (status === 'unauthenticated') return <div className="min-h-screen flex items-center justify-center"><button onClick={() => signIn()} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl">Sign In to Automate</button></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          AI INFLUENCER EMPIRE
        </h1>
        <p className="text-gray-300 mb-8">Build muses. Auto-post forever. Collect 20%.</p>

        {/* AI BUILDER */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-white mb-6">Build AI Influencer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <input
              type="text"
              placeholder="Muse Name"
              value={museName}
              onChange={(e) => setMuseName(e.target.value)}
              className="bg-transparent border border-purple-500/50 rounded-xl p-3"
            />
            <input
              type="text"
              placeholder="Bio"
              value={museBio}
              onChange={(e) => setMuseBio(e.target.value)}
              className="bg-transparent border border-purple-500/50 rounded-xl p-3"
            />
          </div>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setRefImages(Array.from(e.target.files || []))}
            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 mb-4"
          />
          <button
            onClick={buildMuse}
            disabled={building || !museName || refImages.length < 3}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 rounded-xl disabled:opacity-50"
          >
            {building ? 'Forging...' : `Build Muse (${refImages.length}/10)`}
          </button>
        </div>

        {/* MUSES & QUEUE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4">Your Muses</h2>
            {muses.map((muse) => (
              <div key={muse.id} className="flex items-center justify-between mb-4 p-4 bg-gray-800 rounded-xl">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-700 rounded-full mr-3" />
                  <div>
                    <p className="font-bold">{muse.name}</p>
                    <p className="text-sm text-gray-400">{muse.platforms.join(', ')}</p>
                  </div>
                </div>
                <button
                  onClick={() => queuePost(muse.id)}
                  className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
                >
                  Queue Post
                </button>
              </div>
            ))}
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4">Auto-Post Queue</h2>
            {queue.map((post) => (
              <div key={post.id} className="mb-3 p-3 bg-gray-800 rounded">
                <p className="text-sm">{post.content}</p>
                <p className="text-xs text-gray-400">To: {post.platforms.join(', ')} | {post.status}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CONNECT PLATFORMS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['fanvue', 'x', 'instagram', 'tiktok'].map((platform) => (
            <button
              key={platform}
              onClick={() => connectPlatform(platform as any)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-xl font-bold"
            >
              Connect {platform.toUpperCase()}
            </button>
          ))}
        </div>

        {/* OAUTH MODAL */}
        {showOAuth && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-8 rounded-xl max-w-md">
              <h3 className="text-xl mb-4">Connect {selectedPlatform.toUpperCase()}</h3>
              <p className="text-gray-400 mb-6">One-time consent. Auto-posts forever.</p>
              <button
                onClick={() => connectPlatform(selectedPlatform)}
                className="w-full bg-green-600 text-white py-3 rounded mb-2"
              >
                Authorize
              </button>
              <button onClick={() => setShowOAuth(false)} className="w-full text-gray-400">Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}