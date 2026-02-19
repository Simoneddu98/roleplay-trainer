'use client';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useRouter } from 'next/navigation';
import { Send, Bot, User, ArrowLeft, Loader2, MessageSquare, Shield } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { personas, securityTutorPersona, type Persona } from '@/data/personas';
import { getQuickChips, buildSecuritySystemPrompt } from '@/data/security-knowledge';

export default function ChatbotPage() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedPersona, setSelectedPersona] = useState<string>('efisio');

  const isSecurityTutor = selectedPersona === 'security-tutor';
  const securitySystemPrompt = isSecurityTutor ? buildSecuritySystemPrompt() : undefined;

  const { messages, sendMessage, status, setMessages } = useChat({
    id: `chatbot-${selectedPersona}`,
    transport: new DefaultChatTransport({
      api: '/api/chat',
      body: isSecurityTutor
        ? { persona: 'security-tutor', systemPrompt: securitySystemPrompt }
        : { persona: selectedPersona },
    }),
  });

  const isStreaming = status === 'streaming' || status === 'submitted';
  const [input, setInput] = useState('');

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

  const handlePersonaChange = (personaId: string) => {
    setSelectedPersona(personaId);
    setMessages([]);
  };

  const currentPersona = personas.find((p) => p.id === selectedPersona);

  const personaOptions: { id: string; name: string; icon: string; isSecurity?: boolean }[] = [
    { id: 'efisio', name: 'Efisio (Tutor)', icon: '🤖' },
    { id: 'security-tutor', name: 'SafetyTutor', icon: '🛡️', isSecurity: true },
    ...personas.map((p) => ({
      id: p.id,
      name: p.name,
      icon: p.difficulty === 'difficile' ? '🔴' : p.difficulty === 'medio' ? '🟡' : '🟢',
    })),
  ];

  // Chip suggerimento per SafetyTutor
  const securityChips = isSecurityTutor ? getQuickChips() : [];

  return (
    <div className="flex flex-col h-screen bg-[#06060a]">
      {/* Header */}
      <div className="shrink-0 border-b border-white/[0.06] bg-white/[0.02] backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => router.push('/')}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-white/[0.06] hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-9 h-9 bg-gradient-to-br from-violet-600 to-purple-500 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/20">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-sm font-semibold text-white">Chatbot AI</h1>
            <p className="text-xs text-slate-500">
              {isStreaming
                ? 'Sta scrivendo...'
                : selectedPersona === 'efisio'
                  ? 'Efisio - Tutor AI'
                  : currentPersona?.name ?? 'Pronto'}
            </p>
          </div>
        </div>

        {/* Persona selector */}
        <div className="max-w-3xl mx-auto px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {personaOptions.map((p) => (
            <button
              key={p.id}
              onClick={() => handlePersonaChange(p.id)}
              className={`shrink-0 text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer
                ${selectedPersona === p.id
                  ? p.isSecurity
                    ? 'bg-amber-600 text-white border-amber-500'
                    : 'bg-violet-600 text-white border-violet-500'
                  : 'bg-white/[0.03] text-slate-400 border-white/[0.06] hover:bg-white/[0.06] hover:text-white'
                }`}
            >
              {p.icon} {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border
                ${isSecurityTutor
                  ? 'bg-gradient-to-br from-amber-500/20 to-orange-600/20 border-amber-500/10'
                  : 'bg-gradient-to-br from-violet-600/20 to-purple-600/20 border-violet-500/10'
                }`}>
                {isSecurityTutor
                  ? <Shield className="w-8 h-8 text-amber-400" />
                  : <Bot className="w-8 h-8 text-violet-400" />
                }
              </div>
              <h2 className="text-lg font-semibold text-white mb-2">
                {isSecurityTutor ? 'SafetyTutor' : selectedPersona === 'efisio' ? 'Ciao! Sono Efisio' : currentPersona?.name}
              </h2>
              <p className="text-sm text-slate-500 max-w-sm mb-6">
                {isSecurityTutor
                  ? 'Il tuo esperto di certificazioni ISO/UNI. Chiedimi delle normative, preparati all\'audit o fai un ripasso!'
                  : selectedPersona === 'efisio'
                    ? 'Il tuo tutor AI per Vendita e Marketing. Scrivimi qualsiasi domanda!'
                    : currentPersona?.description}
              </p>

              {/* Chip suggerimento SafetyTutor */}
              {securityChips.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 max-w-sm">
                  {securityChips.map((chip) => (
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
              )}
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
                      ? 'bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/20'
                      : 'bg-white/[0.06] text-slate-400'
                    }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div
                  className={`max-w-[75%] px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap
                    ${isUser
                      ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-2xl rounded-br-md shadow-lg shadow-violet-500/15'
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
                <Loader2 className="w-4 h-4 text-violet-400 animate-spin" />
              </div>
              <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
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
            placeholder="Scrivi un messaggio..."
            disabled={isStreaming}
            rows={1}
            className="flex-1 resize-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white
              placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/30
              disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isStreaming}
            className="shrink-0 w-11 h-11 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white flex items-center justify-center
              hover:from-violet-500 hover:to-purple-500 shadow-lg shadow-violet-500/25
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
