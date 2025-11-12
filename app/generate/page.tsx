'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Upload, Send } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  ready?: boolean;
}

export default function GeneratePage() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('No file chosen');
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
      <div className="w-full max-w-4xl">

        {/* Floating Hint */}
        <div className="fixed top-8 right-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
          show me vault 25
        </div>

        {/* Chat */}
        <div className="bg-gradient-to-b from-gray-900 to-black rounded-3xl p-6 border border-cyan-500/30 shadow-2xl backdrop-blur-xl">
          < ScrollArea className="h-96 pr-4 mb-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-10">
                <p className="text-lg font-bold text-cyan-400">Ask me to build, stack, or reveal vaults...</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`mb-6 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`
                  max-w-2xl p-5 rounded-3xl shadow-lg font-mono text-xs leading-relaxed
                  ${m.role === 'user'
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white'
                    : 'bg-gray-800 text-cyan-100 border border-cyan-500/30'
                  }
                `}>
                  <pre className="whitespace-pre-wrap break-words">{m.content}</pre>
                  {m.ready && (
                    <Badge className="mt-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-bold text-xs">
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
                  Weaving...
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
              className="flex-1 bg-black/50 border-cyan-500/50 text-white placeholder-gray-400 focus:border-cyan-400"
              disabled={loading}
            />
            <Button
              onClick={sendMessage}
              disabled={loading || !prompt.trim()}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500"
            >
              <Send className="w-4 h-4" />
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
      </div>
    </div>
  );
}