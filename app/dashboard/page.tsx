'use client';

import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const dynamic = 'force-dynamic';   // prevents static prerender

interface Muse {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  platforms: ('fanvue' | 'x' | 'instagram' | 'tiktok')[];
  connected: boolean;
}
interface PostQueue {
  id: string;
  content: string;
  media: string[];
  platforms: string[];
  status: 'queued' | 'posted' | 'failed';
}

/* ------------------------------------------------------------------ */
/*  PAGE COMPONENT                                                    */
/* ------------------------------------------------------------------ */
export default function DashboardPage() {
  const { data: session, status } = useSession();

  const [muses, setMuses] = useState<Muse[]>([]);
  const [queue, setQueue] = useState<PostQueue[]>([]);
  const [analytics, setAnalytics] = useState<any[]>([]);
  const [showOAuth, setShowOAuth] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<'fanvue' | 'x' | 'instagram' | 'tiktok'>('fanvue');

  /* -------------------------------------------------------------- */
  /*  Load data only after client-side auth is ready                */
  /* -------------------------------------------------------------- */
  useEffect(() => {
    if (status === 'authenticated') {
      // ---- mock data (replace with real API later) ----
      setMuses([
        {
          id: '1',
          name: 'Luna Siren',
          avatar: '/vaults/luna.jpg',
          bio: 'Eternal siren of the deep',
          platforms: ['fanvue', 'x'],
          connected: true,
        },
      ]);
      setQueue([
        {
          id: '1',
          content: 'New drop from Luna',
          media: ['/gen/luna1.jpg'],
          platforms: ['fanvue', 'x'],
          status: 'queued',
        },
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
    }
  }, [status]);

  /* -------------------------------------------------------------- */
  /*  Platform connect (OAuth)                                      */
  /* -------------------------------------------------------------- */
  const connectPlatform = (platform: typeof selectedPlatform) => {
    setSelectedPlatform(platform);
    setShowOAuth(true);
    signIn(platform);
  };

  /* -------------------------------------------------------------- */
  /*  Queue a post                                                  */
  /* -------------------------------------------------------------- */
  const queuePost = (muse: Muse) => {
    const post: PostQueue = {
      id: Date.now().toString(),
      content: `${muse.name} just dropped. Link in bio. #SirensForge`,
      media: [muse.avatar],
      platforms: muse.platforms,
      status: 'queued',
    };
    setQueue((prev) => [post, ...prev]);
  };

  /* -------------------------------------------------------------- */
  /*  Render states                                                 */
  /* -------------------------------------------------------------- */
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-black to-pink-900 text-white text-2xl">
        Loading empire...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-black to-pink-900">
        <button
          onClick={() => signIn()}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-xl transform hover:scale-105 transition-all"
        >
          Sign In to Automate
        </button>
      </div>
    );
  }

  /* -------------------------------------------------------------- */
  /*  MAIN UI (same luxury style as the rest of the site)           */
  /* -------------------------------------------------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900 text-white p-6 relative overflow-hidden">
      {/* animated blobs */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 animate-pulse">
          EMPIRE CONTROL
        </h1>
        <p className="text-xl text-gray-300 mb-12">Auto-post. Earn. Scale. Zero touch.</p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 transform hover:scale-105 transition-all">
            <p className="text-gray-400 text-sm">Your Cut (20%)</p>
            <p className="text-4xl font-black text-green-400">$2.4K</p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 transform hover:scale-105 transition-all">
            <p className="text-gray-400 text-sm">Muses</p>
            <p className="text-4xl font-black text-purple-300">{muses.length}</p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 transform hover:scale-105 transition-all">
            <p className="text-gray-400 text-sm">Queue</p>
            <p className="text-4xl font-black text-cyan-400">{queue.filter((p) => p.status === 'queued').length}</p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 transform hover:scale-105 transition-all">
            <p className="text-gray-400 text-sm">Platforms</p>
            <p className="text-4xl font-black text-yellow-400">4</p>
          </div>
        </div>

        {/* Muses */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Your Muses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {muses.map((muse) => (
              <div key={muse.id} className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 hover:shadow-purple-500/25 transition-all">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gray-700 rounded-full mr-4" />
                  <div>
                    <h3 className="font-bold text-xl">{muse.name}</h3>
                    <p className="text-sm text-gray-400">{muse.platforms.join(' · ')}</p>
                  </div>
                </div>
                <button
                  onClick={() => queuePost(muse)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 rounded-xl transform hover:scale-105 transition-all"
                >
                  Queue Post
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Queue */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Auto-Post Queue</h2>
          <div className="space-y-4">
            {queue.map((post) => (
              <div key={post.id} className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">{post.content}</p>
                  <p className="text-sm text-gray-400">
                    To: {post.platforms.join(', ')} | {post.status}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    post.status === 'posted' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}
                >
                  {post.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Connect Platforms */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['fanvue', 'x', 'instagram', 'tiktok'].map((platform) => (
            <button
              key={platform}
              onClick={() => connectPlatform(platform as any)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-xl font-bold text-lg transform hover:scale-105 transition-all"
            >
              Connect {platform.toUpperCase()}
            </button>
          ))}
        </div>

        {/* OAuth Modal */}
        {showOAuth && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-8 rounded-2xl max-w-md w-full">
              <h3 className="text-2xl font-bold mb-4">Connect {selectedPlatform.toUpperCase()}</h3>
              <p className="text-gray-400 mb-6">One-time consent. Auto-posts forever.</p>
              <button
                onClick={() => connectPlatform(selectedPlatform)}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-bold mb-2"
              >
                Authorize
              </button>
              <button onClick={() => setShowOAuth(false)} className="w-full text-gray-400">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Blob animation keyframes */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}