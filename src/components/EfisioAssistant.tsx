'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { X, Send, Loader2, MessageCircle } from 'lucide-react';
import Image from 'next/image';

export default function EfisioAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const welcomeMessage = {
    id: 'welcome',
    role: 'assistant' as const,
    content: 'Eja! Ciao, sono Efisio, il tuo tutor personale. Chiedimi qualsiasi cosa su Vendita, Marketing o le simulazioni. Ajò, iniziamo!',
  };

  const { messages: chatMessages, sendMessage, status } = useChat({
    id: 'efisio',
    transport: new DefaultChatTransport({
      api: '/api/chat',
      body: { persona: 'efisio' },
    }),
  });

  // Combine welcome message with chat messages
  const allMessages = [welcomeMessage, ...chatMessages];

  const isLoading = status === 'streaming' || status === 'submitted';

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [allMessages]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    sendMessage({ text: trimmed });
    setInput('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat window */}
      {open && (
        <div className="absolute bottom-20 right-0 w-[360px] h-[480px] bg-[#0c0c14] rounded-2xl border border-white/[0.08] shadow-2xl shadow-violet-500/10 flex flex-col overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-violet-600 to-purple-600 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-white/20 overflow-hidden flex items-center justify-center">
                <Image
                  src="/efisio-avatar.png"
                  alt="Efisio"
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <span className="absolute text-white text-sm font-bold">E</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Efisio</h3>
                <p className="text-[11px] text-white/70">Il tuo Tutor</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 chat-scroll">
            {allMessages.map((msg) => {
              const isUser = msg.role === 'user';
              const textContent = 'content' in msg
                ? (msg as { content: string }).content
                : ('parts' in msg
                    ? (msg.parts as Array<{ type: string; text: string }>)
                        ?.filter((p) => p.type === 'text')
                        .map((p) => p.text)
                        .join('')
                    : '') ?? '';

              if (!textContent) return null;

              return (
                <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 text-[13px] leading-relaxed
                      ${isUser
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-2xl rounded-br-md'
                        : 'bg-white/[0.05] text-slate-200 border border-white/[0.06] rounded-2xl rounded-bl-md'
                      }`}
                  >
                    {textContent}
                  </div>
                </div>
              );
            })}

            {isLoading && allMessages[allMessages.length - 1]?.role === 'user' && (
              <div className="flex justify-start">
                <div className="bg-white/[0.05] border border-white/[0.06] rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-3 py-3 border-t border-white/[0.06] bg-white/[0.02] shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Chiedi a Efisio..."
              disabled={isLoading}
              className="flex-1 bg-white/[0.04] border border-white/[0.06] rounded-xl px-3.5 py-2.5 text-[13px] text-white
                placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/30
                disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white flex items-center justify-center
                hover:from-violet-500 hover:to-purple-500 shadow-lg shadow-violet-500/25
                disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
                transition-all cursor-pointer"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative w-14 h-14 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 text-white
          flex items-center justify-center shadow-xl shadow-violet-500/30
          hover:shadow-violet-500/50 hover:scale-105
          active:scale-95 transition-all duration-200 cursor-pointer overflow-hidden"
      >
        <Image
          src="/efisio-avatar.png"
          alt="Efisio"
          width={56}
          height={56}
          className="w-full h-full object-cover absolute inset-0"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        {/* Fallback icon */}
        <MessageCircle className="w-6 h-6 relative z-10" />

        {/* Notification badge */}
        {!open && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-red-500/30 animate-bounce z-20">
            !
          </span>
        )}
      </button>
    </div>
  );
}
