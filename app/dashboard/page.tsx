'use client';

import { useState, useEffect } from 'react';

export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch('/api/auth/session');
        const data = await res.json();
        setUser(data.user || null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    check();
  }, []);

  const signIn = () => {
    window.location.href = '/api/auth/signin/google'; // Change to your provider
  };

  const signOut = () => {
    window.location.href = '/api/auth/signout';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-black to-pink-900 text-white text-3xl">
        Loading empire...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900 text-white p-6 relative overflow-hidden">
        {/* Animated Blobs */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center mt-24">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-8xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 animate-pulse">
              SIRENS FORGE
            </h1>
            <p className="text-4xl font-bold text-white">AI INFLUENCER EMPIRE</p>
          </div>

          {/* Pitch */}
          <div className="mb-12">
            <h2 className="text-5xl font-bold text-white mb-6">Build. Post. Earn.</h2>
            <p className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Create AI sirens in 60 seconds. Auto-post to <strong>Fanvue, X, Instagram, TikTok</strong>.  
              Earn <strong>80%</strong> of all revenue. We take <strong>20%</strong>.  
              <strong>Zero uploads. Zero code. Zero touch.</strong>
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={signIn}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-20 py-6 rounded-full font-black text-3xl transform hover:scale-110 transition-all shadow-2xl hover:shadow-purple-500/50"
          >
            SIGN IN TO BUILD YOUR EMPIRE
          </button>

          {/* Subtext */}
          <p className="text-lg text-gray-400 mt-10">
            No credit card. No setup. Just empire.
          </p>

          {/* Feature Icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6">
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-2">AI Sirens</h3>
              <p className="text-gray-400">Generate hyper-real AI models in seconds</p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6">
              <div className="text-5xl mb-4">📲</div>
              <h3 className="text-xl font-bold mb-2">Auto-Post</h3>
              <p className="text-gray-400">Fanvue, X, IG, TikTok — all platforms, one click</p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">80% Revenue</h3>
              <p className="text-gray-400">You keep 80%. We handle the rest.</p>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .animate-blob { animation: blob 7s infinite; }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900 text-white p-6 relative overflow-hidden">
      {/* Blobs */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 animate-pulse">
              EMPIRE CONTROL
            </h1>
            <p className="text-xl text-gray-300">Welcome, {user.name || 'Siren Lord'}</p>
          </div>
          <button
            onClick={signOut}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold"
          >
            Sign Out
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 transform hover:scale-105 transition-all">
            <p className="text-gray-400 text-sm">Your Cut (20%)</p>
            <p className="text-4xl font-black text-green-400">$2.4K</p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 transform hover:scale-105 transition-all">
            <p className="text-gray-400 text-sm">Muses</p>
            <p className="text-4xl font-black text-purple-300">1</p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 transform hover:scale-105 transition-all">
            <p className="text-gray-400 text-sm">Queue</p>
            <p className="text-4xl font-black text-cyan-400">0</p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 transform hover:scale-105 transition-all">
            <p className="text-gray-400 text-sm">Platforms</p>
            <p className="text-4xl font-black text-yellow-400">0</p>
          </div>
        </div>

        {/* Muses */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Your Muses</h2>
          <div className="text-center py-12 bg-gray-900/30 rounded-2xl border border-dashed border-purple-500/50">
            <p className="text-xl text-gray-400 mb-4">No muses yet</p>
            <a href="/muses" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-bold">
              Build Your First Muse
            </a>
          </div>
        </div>

        {/* Connect Platforms */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Connect Platforms</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['fanvue', 'x', 'instagram', 'tiktok'].map((platform) => (
              <button
                key={platform}
                onClick={() => window.location.href = `/api/auth/signin/${platform}`}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-xl font-bold text-lg transform hover:scale-105 transition-all"
              >
                Connect {platform.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}