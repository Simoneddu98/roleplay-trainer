'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useRouter } from 'next/navigation';
import { Send, User, ArrowLeft, Loader2, Shield, Bot } from 'lucide-react';
import Link from 'next/link';

const GAVINO_CHIPS = [
  'Cos\'è la ISO 9001?',
  'Differenza ISO 14001 vs 45001',
  'Cos\'è un audit interno?',
  'PDCA spiegato',
];

export default function GavinoChatbotPage() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');

  const { messages, sendMessage, status } = useChat({
    id: 'chatbot-gavino',
    transport: new DefaultChatTransport({
      api: '/api/chat',
      body: { persona: 'gavino' },
    }),
  });

  const isStreaming = status === 'streaming' || status === 'submitted';

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (text?: string) => {
    const trimmed = (text ?? input).trim();
    if (!trimmed || isStreaming) return;
    sendMessage({ text: trimmed });
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen bg-[#06060a]">
      {/* Header */}
      <div className="shrink-0 border-b border-white/[0.06] bg-white/[0.02] backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => router.push('/security')}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-white/[0.06] hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="w-9 h-9 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Shield className="w-5 h-5 text-white" />
          </div>

          <div className="flex-1">
            <h1 className="text-sm font-semibold text-white">Gavino</h1>
            <p className="text-xs text-slate-500">
              {isStreaming ? 'Sta scrivendo...' : 'Esperto Sicurezza & Normative ISO/UNI'}
            </p>
          </div>

          <Link
            href="/chatbot/efisio"
            className="flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 bg-violet-500/10 hover:bg-violet-500/15 border border-violet-500/20 rounded-full px-3 py-1.5 transition-all"
          >
            <Bot className="w-3.5 h-3.5" />
            Vai da Efisio
          </Link>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-600/20 border border-amber-500/10 flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-amber-400" />
              </div>
              <h2 className="text-lg font-semibold text-white mb-2">Sono Gavino</h2>
              <p className="text-sm text-slate-500 max-w-sm mb-6">
                Il tuo esperto di normative ISO/UNI. Chiedimi di clausole, audit, certificazioni e compliance. Rispondo sempre con precisione e rigore.
              </p>
              <div className="flex flex-wrap justify-center gap-2 max-w-sm">
                {GAVINO_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleSend(chip)}
                    className="text-xs px-3.5 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300
                      hover:bg-amber-500/20 transition-all cursor-pointer font-medium"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            const textContent = msg.parts
              .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
              .map((p) => p.text)
              .join('');

            if (!textContent) return null;

            return (
              <div
                key={msg.id}
                className={`flex gap-3 animate-fade-in-up ${isUser ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1
                    ${isUser
                      ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/20'
                      : 'bg-white/[0.06] text-slate-400'
                    }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                </div>
                <div
                  className={`max-w-[75%] px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap
                    ${isUser
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl rounded-br-md shadow-lg shadow-amber-500/15'
                      : 'bg-white/[0.04] text-slate-200 border border-white/[0.06] rounded-2xl rounded-bl-md'
                    }`}
                >
                  {textContent}
                </div>
              </div>
            );
          })}

          {isStreaming && messages[messages.length - 1]?.role !== 'assistant' && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center shrink-0">
                <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
              </div>
              <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-white/[0.06] bg-white/[0.02]">
        <div className="max-w-3xl mx-auto flex items-end gap-3 p-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Chiedi a Gavino sulla norma..."
            disabled={isStreaming}
            rows={1}
            className="flex-1 resize-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white
              placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/30
              disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isStreaming}
            className="shrink-0 w-11 h-11 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white flex items-center justify-center
              hover:from-amber-400 hover:to-orange-500 shadow-lg shadow-amber-500/25
              disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
              transition-all duration-200 cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
