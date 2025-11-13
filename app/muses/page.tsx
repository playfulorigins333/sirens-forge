'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function MusesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [building, setBuilding] = useState(false);

  if (status === 'loading') return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  if (!session) router.push('/');

  const handleBuild = async () => {
    if (!name || files.length < 3) return alert('Need name + 3+ images');
    setBuilding(true);

    const form = new FormData();
    form.append('name', name);
    form.append('bio', bio);
    files.forEach((f, i) => form.append(`file${i}`, f));

    try {
      const res = await fetch('/api/build-muse', {
        method: 'POST',
        body: form,
      });
      const data = await res.json();
      alert(`Muse "${data.name}" built! Check /vault`);
      router.push('/vault');
    } catch {
      alert('Build failed — try again');
    }
    setBuilding(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900 text-white p-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 animate-pulse">
          BUILD YOUR AI SIREN
        </h1>
        <p className="text-xl text-gray-300 mb-12">3–10 photos. 60 seconds. Empire begins.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <input
            type="text"
            placeholder="Muse Name (e.g., Luna Siren)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent border border-purple-500/50 rounded-xl p-4 text-lg focus:outline-none focus:border-purple-400"
          />
          <input
            type="text"
            placeholder="Bio (e.g., Eternal siren of the deep)"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="bg-transparent border border-purple-500/50 rounded-xl p-4 text-lg focus:outline-none focus:border-purple-400"
          />
        </div>

        <div className="mb-8">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
            className="block w-full text-sm text-gray-400 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
          />
          <p className="text-sm text-gray-400 mt-2">Uploaded: {files.length} / 10</p>
        </div>

        <button
          onClick={handleBuild}
          disabled={building || files.length < 3 || !name}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-6 rounded-xl text-2xl disabled:opacity-50 transform hover:scale-105 transition-all"
        >
          {building ? 'FORGING MUSE...' : 'BUILD MUSE'}
        </button>

        <p className="text-center text-gray-400 mt-6">
          Free tier: 1 muse. Upgrade for unlimited.
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