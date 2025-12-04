'use client'; 

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle } from 'lucide-react';

export default function AgeGate() {
  const router = useRouter();
  const [isEntering, setIsEntering] = useState(false);

  const enter = () => {
    setIsEntering(true);
    localStorage.setItem('ageVerified', 'true');

    setTimeout(() => {
      router.replace('/landing');
    }, 600);
  };

  const exit = () => {
    window.location.href = 'https://www.google.com';
  };

  useEffect(() => {
    if (localStorage.getItem('ageVerified') === 'true') {
      router.replace('/landing');
    }
  }, [router]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !isEntering) enter();
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isEntering]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 sm:p-8 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-black to-purple-900/10" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-purple-900/5 via-transparent to-pink-900/5"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-2xl w-full"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8 inline-block"
        >
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center glow-red">
            <AlertTriangle className="w-12 h-12 text-white" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-red-500 tracking-tight"
        >
          18+ ONLY
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8 space-y-4"
        >
          <p className="text-lg sm:text-xl text-gray-300 max-w-md mx-auto leading-relaxed">
            <span className="font-bold text-white">Sirens Forge</span> contains adult AI-generated content.
          </p>
          <p className="text-base sm:text-lg text-gray-400 max-w-lg mx-auto">
            You must be <span className="text-red-400 font-bold">18 years or older</span> to enter.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            onClick={enter}
            disabled={isEntering}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-base sm:text-lg rounded-full hover:from-purple-700 hover:to-pink-700 transition-all glow-purple disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl"
          >
            {isEntering ? (
              <span className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                ENTERING...
              </span>
            ) : (
              'I AM 18+ — ENTER THE EMPIRE'
            )}
          </motion.button>

          <motion.button
            onClick={exit}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-white/5 backdrop-blur-sm border-2 border-white/20 text-white font-bold text-base sm:text-lg rounded-full hover:bg-white/10 transition-all"
          >
            I AM UNDER 18 — EXIT
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 text-xs sm:text-sm text-gray-500 max-w-xl mx-auto"
        >
          <Shield className="w-4 h-4 inline-block mr-2 text-gray-600" />
          This site uses cookies to remember your age verification.
        </motion.div>
      </motion.div>
    </div>
  );
}

