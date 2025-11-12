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
