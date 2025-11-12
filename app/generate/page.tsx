'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Upload, Send, Sparkles, Download } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  ready?: boolean;
}

export default function GeneratePage() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `I understand vault commands. Try:
• What is in vault 13?
• Build me with vault 5-10-25
• Use only bondage
• Surprise me with 3 NSFW vaults`,
      ready: false
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('No file chosen');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!prompt.trim()) return;

    const userMsg: Message = { role: 'user', content: prompt };
    setMessages(prev => [...prev, userMsg]);
    setPrompt('');
    setLoading(true);

    try {
      const res = await fetch('/api/gpt-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt })
      });
      const data = await res.json();

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.reply,
        ready: data.ready
      }]);

      if (data.ready) {
        setTimeout(() => {
          setGeneratedImage('https://via.placeholder.com/768x1024/1a0033/ffffff?text=SIREN+FORGED');
        }, 1500);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Oracle is resting...' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start p-6 pt-20">
      <div className="w-full max-w-6xl">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-7xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
            SIREN FORGE
          </h1>
          <p className="text-xl text-gray-300 mt-2">AI Siren Generator — Ultra Mode Active</p>
        </div>

        {/* Mode Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <Button className="bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold px-8 py-3 rounded-full hover:scale-105 transition">
            TXT→IMG
          </Button>
          <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10 px-8 py-3 rounded-full">
            IMG→IMG
          </Button>
          <Button variant="outline" className="border-gray-500 text-gray-400 hover:bg-gray-500/10 px-8 py-3 rounded-full">
            TXT→VID
          </Button>
          <Button variant="outline" className="border-gray-500 text-gray-400 hover:bg-gray-500/10 px-8 py-3 rounded-full">
            IMG→VID
          </Button>
        </div>

        {/* Floating Hint */}
        <div className="fixed top-24 right-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-2xl shadow-purple-500/50">
          what is in vault 13
        </div>

        {/* Chat */}
        <div className="bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-2xl rounded-3xl p-8 border border-gradient-to-r from-cyan-500/30 to-pink-500/30 shadow-2xl shadow-purple-600/50">
          <ScrollArea className="h-96 pr-4 mb-8">
            {messages.map((m, i) => (
              <div key={i} className={`mb-6 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`
                  max-w-3xl p-6 rounded-3xl shadow-xl font-mono text-sm leading-relaxed
                  ${m.role === 'user'
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white'
                    : 'bg-gradient-to-r from-gray-800 to-gray-900 text-cyan-100 border border-cyan-500/30'
                  }
                `}>
                  <pre className="whitespace-pre-wrap break-words text-sm">
                    {m.content}
                  </pre>
                  {m.ready && (
                    <Badge className="mt-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-bold text-sm px-4 py-1">
                      READY TO GENERATE
                    </Badge>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 px-6 py-4 rounded-3xl text-cyan-300 flex items-center gap-3">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-200"></div>
                  <span className="font-bold">Forging Siren...</span>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </ScrollArea>

          {/* Input */}
          <div className="flex gap-4">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask your AI Siren Forge..."
              className="flex-1 bg-black/60 border-cyan-500/50 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/30 text-lg py-6"
              disabled={loading}
            />
            <Button
              onClick={sendMessage}
              disabled={loading || !prompt.trim()}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 font-bold text-lg px-8 py-6 rounded-full shadow-lg"
            >
              <Send className="w-6 h-6" />
            </Button>
          </div>

          {/* File */}
          <div className="mt-6 flex items-center gap-4">
            <label>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setFileName(e.target.files?.[0]?.name || 'No file chosen')}
              />
              <Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 font-bold px-6 py-3 rounded-full">
                <Upload className="w-5 h-5 mr-2" /> Choose Files
              </Button>
            </label>
            <span className="text-sm text-gray-400">{fileName}</span>
          </div>
        </div>

        {/* GENERATED IMAGE */}
        {generatedImage && (
          <div className="mt-16 text-center">
            <h2 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-10">
              SIREN FORGED
            </h2>
            <div className="relative inline-block group perspective-1000">
              <div className="relative w-[512px] h-[768px] mx-auto transform-gpu transition-all duration-700 group-hover:rotate-y-12 group-hover:scale-105">
                <img
                  src={generatedImage}
                  alt="Generated Siren"
                  className="w-full h-full object-cover rounded-3xl shadow-2xl border-8 border-gradient-to-r from-cyan-500 to-pink-500"
                />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-purple-900/70 to-transparent pointer-events-none"></div>
              </div>
            </div>
            <a
              href={generatedImage}
              download
              className="mt-10 inline-flex items-center gap-4 bg-gradient-to-r from-cyan-400 to-pink-500 text-black px-10 py-5 rounded-full font-bold text-xl hover:scale-110 transition shadow-2xl"
            >
              <Download className="w-8 h-8" />
              DOWNLOAD (R2)
            </a>
          </div>
        )}
      </div>
    </div>
  );
}