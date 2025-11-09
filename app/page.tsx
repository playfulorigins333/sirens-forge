'use client';

import { motion } from 'framer-motion';
import { Upload, Zap, Sparkles, Shield } from 'lucide-react';
import { useState } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

export default function Home() {
  const [seatsLeft, setSeatsLeft] = useState(18);

  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden relative">
      {/* Siren Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: '#0a0a0a' } },
          fpsLimit: 120,
          particles: {
            number: { value: 35, density: { enable: true, value_area: 800 } },
            color: { value: ['#00ffff', '#ff00ff', '#ff0066'] },
            shape: { type: 'circle' },
            opacity: { value: 0.6, random: true },
            size: { value: 4, random: true },
            move: { enable: true, speed: 0.8, direction: 'none', random: true, out_mode: 'bounce' },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: 'repulse' }, onClick: { enable: true, mode: 'push' } },
            modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } },
          },
          detectRetina: true,
        }}
      />

      {/* Header */}
      <motion.header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            SirensForge.vip
          </h1>
          <div className="bg-gradient-to-r from-pink-600 to-purple-700 px-5 py-2.5 rounded-full animate-pulse font-bold shadow-lg shadow-purple-900/50">
            {seatsLeft}/25 FREE Lifetime VIP Seats Left
          </div>
        </div>
      </motion.header>

      {/* Hero */}
      <section className="pt-40 pb-24 text-center">
        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold leading-tight"
        >
          Forge Your <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Perfect Siren</span>
        </motion.h2>
        <p className="text-xl md:text-2xl text-gray-400 mt-8 max-w-3xl mx-auto font-light">
          Hyper-realistic custom models • 100% private • VIP lifetime seats closing forever
        </p>
      </section>

      {/* Upload Options */}
      <section className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10">
        {/* Individual Images */}
        <motion.div
          whileHover={{ y: -12, scale: 1.02 }}
          className="relative group bg-black/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-purple-900/10 blur-3xl group-hover:blur-xl transition-all" />
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-8 text-cyan-300">Option 1: Individual Images</h3>
            <div className="border-2 border-dashed border-cyan-500/50 rounded-2xl p-20 hover:border-cyan-400 transition-all cursor-pointer group">
              <Upload className="w-24 h-24 mx-auto mb-6 text-cyan-400 animate-bounce" />
              <p className="text-2xl font-medium">Drag & drop or click</p>
            </div>
            <p className="text-gray-400 mt-6">10–25 images • Max 4MB each • 100MB total</p>
          </div>
        </motion.div>

        {/* ZIP – RECOMMENDED */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="relative group bg-black/70 backdrop-blur-3xl border-2 border-purple-600 rounded-3xl p-10 overflow-hidden shadow-2xl shadow-purple-900/50"
        >
          <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-purple-600 px-5 py-2 rounded-full text-sm font-black animate-pulse shadow-lg">
            RECOMMENDED
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-pink-900/40 to-purple-900/40 blur-3xl animate-pulse" />
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-8 text-pink-300">Option 2: ZIP File</h3>
            <div className="border-2 border-dashed border-pink-500 rounded-2xl p-20 hover:scale-105 transition-all cursor-pointer">
              <Zap className="w-28 h-28 mx-auto mb-6 text-pink-500" />
              <p className="text-3xl font-bold">Upload ZIP File</p>
            </div>
            <p className="text-lg text-gray-200 mt-6">10–25 training images • Processes 3× faster</p>
          </div>
        </motion.div>
      </section>

      {/* Train Button */}
      <div className="text-center my-24">
        <motion.button
          whileHover={{ scale: 1.08 }}
          className="relative group px-20 py-10 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-4xl font-black shadow-2xl overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-4">
            <Sparkles className="w-12 h-12" />
            Train Your Siren
            <Sparkles className="w-12 h-12" />
          </span>
          <div className="absolute inset-0 bg-white/30 blur-xl group-hover:blur-2xl transition-all" />
        </motion.button>
        <p className="mt-6 text-xl text-gray-400">Costs 50 tokens • Ready in ~8 minutes</p>
      </div>

      {/* Privacy Shield */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-32">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="bg-black/50 backdrop-blur-xl rounded-3xl p-12 border border-purple-500/30"
        >
          <Shield className="w-20 h-20 mx-auto mb-6 text-cyan-400" />
          <p className="text-2xl md:text-3xl leading-relaxed">
            Your sirens are <span className="text-pink-500 font-black">100% private</span>. Only you can access them.
            <br />
            <span className="block mt-4 text-pink-400">Auto-deleted after 30 days • Never used for training • We burn the evidence. 🔥</span>
          </p>
        </motion.div>
      </div>

      {/* Hidden Sophie Rain Teaser */}
      <div className="hidden">
        <a href="/muses/sophie-rain">Sophie Rain VIP Muse – $349</a>
      </div>
    </div>
  );
}
