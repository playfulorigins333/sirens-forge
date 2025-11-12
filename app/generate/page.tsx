// app/generate/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Vault {
  id: number;
  name: string;
  content: string;
}

export default function GeneratePage() {
  const [mode, setMode] = useState<'txt2img' | 'img2img' | 'txt2vid' | 'img2vid'>('txt2img');
  const [chat, setChat] = useState<{ role: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [prompt, setPrompt] = useState('');
  const [refImages, setRefImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [vaults, setVaults] = useState<Vault[]>([]);

  useEffect(() => {
    const loadVaults = async () => {
      const files = [
        'combined_Vault #1-10.md',
        'combined_Vault 11-20.md',
        'combined_Vault 20-30.md',
        'Prompt Vaults 11-20.md',
        'Prompt Vaults 21-30.md',
        'Prompt Vaults combined_1-10.md',
        'Prompt Erotique Ultra — Smart System.md',
        'Prompt Erotique — ULTRA Macro Tag Library.md',
        'Example Character DNA_Sarita.md'
      ];
      const loaded: Vault[] = [];

      for (let i = 0; i < files.length; i++) {
        try {
          const res = await fetch(`/vaults/${encodeURIComponent(files[i])}`);
          if (res.ok) {
            const text = await res.text();
            loaded.push({ id: i + 1, name: files[i].replace('.md', ''), content: text });
          }
        } catch (e) {
          console.error(`Failed to load ${files[i]}`);
        }
      }
      setVaults(loaded);
    };
    loadVaults();
  }, []);

  const processCommand = (userInput: string) => {
    const lower = userInput.toLowerCase().trim();

    if (lower.includes('what vaults') || lower.includes('show vaults')) {
      const list = vaults.map(v => `• ${v.name}`).join('\n');
      return `Available Vaults:\n${list}`;
    }

    if (lower.includes('build me') || lower.includes('use vault')) {
      const matches = lower.match(/vault\s*([\d\s\-+]+)\b/i);
      if (matches) {
        const ids = matches[1].split(/[\s\-+]+/).map(Number).filter(n => n > 0 && n <= 30);
        const selected = vaults.filter(v => ids.includes(v.id));
        if (selected.length === 0) return 'No valid vaults found. Try: vault 5-10-25';

        const stacked = selected.map(v => `--- ${v.name} ---\n${v.content}`).join('\n\n');
        setPrompt(stacked);
        return `Stacking ${selected.length} vault(s):\n${selected.map(v => `• ${v.name}`).join('\n')}\n\n[PROMPT READY]`;
      }
    }

    if (lower.includes('only') || lower.includes('use only')) {
      const filter = lower.split(/only\s+/i)[1];
      if (!prompt) return 'Build a prompt first with vaults.';
      const filtered = prompt.split('\n').filter(line => line.toLowerCase().includes(filter)).join('\n');
      setPrompt(filtered || prompt);
      return `Filtered for &quot;${filter}&quot; — Done.`;
    }

    return 'Say: &quot;What vaults do you have?&quot; or &quot;Build me with vault 5-10-25&quot;';
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user' as const, text: input };
    setChat(prev => [...prev, userMsg]);
    const botReply = processCommand(input);
    setChat(prev => [...prev, { role: 'bot' as const, text: botReply }]);
    setInput('');
  };

  const generate = async () => {
    if (!prompt.trim()) return alert('Build your prompt first');
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append('mode', mode);
    formData.append('prompt', `ULTRA EROTIQUE:\n${prompt}`);
    refImages.forEach((img, i) => formData.append(`ref${i}`, img));

    try {
      const res = await fetch('/api/generate', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) setResult(data.url);
      else alert(data.error);
    } catch {
      alert('Generation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-7xl font-black text-center bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-600 animate-pulse">
          SIREN FORGE
        </h1>

        <div className="flex justify-center gap-4 mt-10">
          {(['txt2img', 'img2img', 'txt2vid', 'img2vid'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-6 py-3 rounded-full font-bold ${mode === m ? 'bg-purple-600 text-black' : 'bg-gray-800'}`}
            >
              {m.replace('2', '→').toUpperCase()}
            </button>
          ))}
        </div>

        {/* CHAT UI */}
        <div className="mt-16 bg-gray-900 p-6 rounded-3xl border border-purple-500/30">
          <div className="h-96 overflow-y-auto mb-4 space-y-3">
            {chat.length === 0 && (
              <p className="text-gray-500 text-center">
                Ask: &quot;What vaults do you have?&quot; or &quot;Build me with vault 5-10-25&quot;
              </p>
            )}
            {chat.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-md p-3 rounded-xl ${msg.role === 'user' ? 'bg-purple-600 text-black' : 'bg-gray-800'}`}>
                  <pre className="whitespace-pre-wrap text-sm">{msg.text}</pre>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Talk to your Siren Forge..."
              className="flex-1 bg-black border border-cyan-500/50 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
            />
            <button
              onClick={sendMessage}
              className="px-6 bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-bold rounded-xl"
            >
              SEND
            </button>
          </div>
        </div>

        {/* REF IMAGES */}
        {(mode.includes('img') || mode.includes('vid')) && (
          <div className="mt-8">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setRefImages(Array.from(e.target.files || []))}
              className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-cyan-500 file:to-blue-600 file:text-black"
            />
          </div>
        )}

        {/* PROMPT PREVIEW + GENERATE */}
        {prompt && (
          <div className="mt-8 bg-gray-900 p-6 rounded-3xl border border-cyan-500/30">
            <h3 className="text-lg font-bold text-cyan-400 mb-2">PROMPT PREVIEW</h3>
            <pre className="text-xs text-gray-300 max-h-48 overflow-y-auto whitespace-pre-wrap">{prompt}</pre>
            <button
              onClick={generate}
              disabled={loading}
              className="mt-4 w-full bg-gradient-to-r from-red-500 to-pink-600 text-black font-bold text-xl py-5 rounded-full disabled:opacity-50"
            >
              {loading ? 'FORGING...' : 'GENERATE SIREN'}
            </button>
          </div>
        )}

        {/* RESULT */}
        {result && (
          <div className="mt-16 text-center">
            <h2 className="text-4xl font-bold text-cyan-400">SIREN FORGED</h2>
            <div className="mt-8 relative w-full max-w-3xl mx-auto h-96">
              <Image
                src={result}
                alt="Generated Siren"
                fill
                className="rounded-2xl shadow-2xl object-contain"
              />
            </div>
            <a href={result} download className="mt-6 inline-block bg-gradient-to-r from-cyan-400 to-purple-600 text-black font-bold py-4 px-16 rounded-full">
              DOWNLOAD (R2)
            </a>
          </div>
        )}
      </div>
    </div>
  );
}