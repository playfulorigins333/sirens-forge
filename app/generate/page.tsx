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
  prompt?: string;
}

export default function GeneratePage() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
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

      const cleanReply = data.reply
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#39;/g, "'");

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: cleanReply,
        ready: data.ready,
        prompt: data.prompt
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
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-5xl">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
            SIREN FORGE
          </h1>
          <p className="text-gray-400 mt-2">AI Siren Generator — Ultra Mode Active</p>
        </div>

        {/* Floating Hint */}
        <div className="fixed top-8 right-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg">
          what is in vault 13
        </div>

        {/* Chat */}
        <div className="bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-xl rounded-3xl p-6 border border-gradient-to-r from-cyan-500/30 to-pink-500/30 shadow-2xl">
          <ScrollArea className="h-96 pr-4 mb-6">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-12">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-cyan-400 animate-pulse" />
                <p className="text-lg font-bold text-cyan-300">Ask me to build, stack, or reveal vaults...</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`mb-6 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`
                  max-w-2xl p-5 rounded-3xl shadow-lg font-mono text-sm leading-relaxed
                  ${m.role === 'user'
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white'
                    : 'bg-gradient-to-r from-gray-800 to-gray-900 text-cyan-100 border border-cyan-500/30'
                  }
                `}>
                  <pre className="whitespace-pre-wrap break-words text-sm">
                    {m.content}
                  </pre>
                  {m.ready && (
                    <Badge className="mt-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-bold">
                      READY TO GENERATE
                    </Badge>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 px-5 py-3 rounded-3xl text-cyan-300 flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></div>
                  Forging Siren...
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </ScrollArea>

          {/* Input */}
          <div className="flex gap-3">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask your AI Siren Forge..."
              className="flex-1 bg-black/50 border-cyan-500/50 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400"
              disabled={loading}
            />
            <Button
              onClick={sendMessage}
              disabled={loading || !prompt.trim()}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 font-bold"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>

          {/* File */}
          <div className="mt-6 flex items-center gap-3">
            <label>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setFileName(e.target.files?.[0]?.name || 'No file chosen')}
              />
              <Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10">
                <Upload className="w-4 h-4 mr-2" /> Choose Files
              </Button>
            </label>
            <span className="text-sm text-gray-400">{fileName}</span>
          </div>
        </div>

        {/* GENERATED IMAGE */}
        {generatedImage && (
          <div className="mt-12 text-center">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-8">
              SIREN FORGED
            </h2>
            <div className="relative inline-block group perspective-1000">
              <div className="relative w-96 h-[512px] mx-auto transform-gpu transition-all duration-500 group-hover:rotate-y-12 group-hover:scale-105">
                <img
                  src={generatedImage}
                  alt="Generated Siren"
                  className="w-full h-full object-cover rounded-3xl shadow-2xl border-4 border-cyan-500/50"
                />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-purple-900/50 to-transparent pointer-events-none"></div>
              </div>
            </div>
            <a
              href={generatedImage}
              download
              className="mt-8 inline-flex items-center gap-3 bg-gradient-to-r from-cyan-400 to-pink-500 text-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition"
            >
              <Download className="w-6 h-6" />
              DOWNLOAD (R2)
            </a>
          </div>
        )}
      </div>
    </div>
  );
}