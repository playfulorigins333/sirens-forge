'use client';

import { useState } from 'react';

export default function HomePage() {
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  if (!ageConfirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-pink-900 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 text-center max-w-2xl">
          <h1 className="text-8xl font-black text-red-500 mb-6">18+ ONLY</h1>
          <p className="text-2xl text-gray-300 mb-8">
            Sirens Forge contains <strong>adult AI-generated content</strong>.  
            You must be 18 or older to enter.
          </p>
          <button
            onClick={() => setAgeConfirmed(true)}
            className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-16 py-6 rounded-full font-black text-2xl transform hover:scale-110 transition-all"
          >
            I AM 18+ — ENTER THE EMPIRE
          </button>
        </div>

        <style jsx>{`
          @keyframes blob { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(30px,-50px) scale(1.1); } 66% { transform: translate(-20px,20px) scale(0.9); } }
          .animate-blob { animation: blob 7s infinite; }
          .animation-delay-2000 { animation-delay: 2s; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900 text-white p-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center mt-24">
        <h1 className="text-8xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 animate-pulse">
          SIRENS FORGE
        </h1>
        <h2 className="text-5xl font-bold text-white mb-6">AI INFLUENCER EMPIRE</h2>
        <p className="text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Build AI sirens in 60 seconds. Auto-post to <strong>Fanvue, X, Instagram, TikTok</strong>.  
          Earn <strong>80%</strong> of all revenue. We take <strong>20%</strong>.  
          <strong>Zero uploads. Zero code. Zero touch.</strong>
        </p>

        <div className="flex justify-center gap-6 mb-12">
          <a
            href="/auth/signin"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-16 py-6 rounded-full font-black text-2xl transform hover:scale-110 transition-all"
          >
            SIGN IN
          </a>
          <a
            href="/auth/signup"
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-16 py-6 rounded-full font-black text-2xl transform hover:scale-110 transition-all"
          >
            START FREE
          </a>
          <a
            href="/pricing"
            className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-16 py-6 rounded-full font-black text-2xl transform hover:scale-110 transition-all"
          >
            VIEW PRICING
          </a>
        </div>

        <p className="text-lg text-gray-400">
          No credit card. Start free. Upgrade anytime.
        </p>
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