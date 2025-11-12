'use client';

import { Button } from '@/components/ui/button';
import { Upload, Download } from 'lucide-react';

export default function GeneratePage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-4xl">

        <h1 className="text-7xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent mb-8">
          SIREN FORGE
        </h1>

        <div className="bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-2xl rounded-3xl p-12 border border-cyan-500/30 shadow-2xl">
          <h2 className="text-4xl font-bold mb-6">Image Generator</h2>
          
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-xl">
              <p className="text-lg mb-4">Prompt Oracle — <span className="text-cyan-400 font-bold">Coming Soon (Pro Upgrade)</span></p>
              <p className="text-sm text-gray-400">Full vault system, DNA mixing, and AI prompt builder.</p>
            </div>

            <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-lg py-6">
              <Upload className="w-6 h-6 mr-2" /> Upload Image (Coming Soon)
            </Button>

            <div className="bg-gray-900 p-8 rounded-xl border-2 border-dashed border-gray-700">
              <p className="text-gray-500">Generated Image Preview</p>
            </div>

            <Button disabled className="w-full opacity-50">
              <Download className="w-6 h-6 mr-2" /> Download (R2)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}