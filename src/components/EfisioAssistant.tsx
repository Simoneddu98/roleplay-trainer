'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { X, Send, Loader2, MessageCircle, Shield, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { getQuickChips, buildSecuritySystemPrompt } from '@/data/security-knowledge';

interface EfisioAssistantProps {
  /** Se passato, il widget entra in modalità "Security Tutor" per la cert specificata */
  certId?: string;
  /** Titolo del corso attivo (usato nel welcome message) */
  certTitle?: string;
}

export default function EfisioAssistant({ certId, certTitle }: EfisioAssistantProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const isSecurityMode = Boolean(certId);

  // ─── Chip suggerimenti contestuali ──────────────────────────────────────────
  const chips = getQuickChips(certId);

  // ─── Welcome message adattivo ───────────────────────────────────────────────
  const welcomeText = isSecurityMode
    ? `Ciao! Sono SafetyTutor, il tuo esperto di ${certTitle ?? 'certificazioni ISO/UNI'}. Chiedimi definizioni, differenze tra clausole, consigli per l'audit o preparati al quiz!`
    : 'Eja! Ciao, sono Efisio, il tuo tutor personale. Chiedimi qualsiasi cosa su Vendita, Marketing o le simulazioni. Ajò, iniziamo!';

  const welcomeMessage = {
    id: 'welcome',
    role: 'assistant' as const,
    content: welcomeText,
  };

  // ─── Chat hook ───────────────────────────────────────────────────────────────
  // In security mode usa security-tutor persona + system prompt dalla knowledge base
  const securitySystemPrompt = isSecurityMode ? buildSecuritySystemPrompt(certId) : undefined;

  const { messages: chatMessages, sendMessage, status } = useChat({
    id: isSecurityMode ? `security-tutor-${certId ?? 'general'}` : 'efisio',
    transport: new DefaultChatTransport({
      api: '/api/chat',
      body: isSecurityMode
        ? { persona: 'security-tutor', courseId: certId, systemPrompt: securitySystemPrompt }
        : { persona: 'efisio' },
    }),
  });

  const allMessages = [welcomeMessage, ...chatMessages];
  const isLoading = status === 'streaming' || status === 'submitted';

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [allMessages]);

  const handleSend = (text?: string) => {
    const trimmed = (text ?? input).trim();
    if (!trimmed || isLoading) return;
    sendMessage({ text: trimmed });
    setInput('');
  };

  // ─── Colori adattivi: amber per security, violet per standard ────────────────
  const headerGradient = isSecurityMode
    ? 'from-amber-500 to-orange-600'
    : 'from-violet-600 to-purple-600';
  const chipActiveClass = isSecurityMode
    ? 'bg-amber-500/15 text-amber-300 border-amber-500/30 hover:bg-amber-500/25'
    : 'bg-violet-500/15 text-violet-300 border-violet-500/30 hover:bg-violet-500/25';
  const sendBtnClass = isSecurityMode
    ? 'from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 shadow-amber-500/25'
    : 'from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 shadow-violet-500/25';
  const fabClass = isSecurityMode
    ? 'from-amber-500 to-orange-600 shadow-amber-500/30 hover:shadow-amber-500/50'
    : 'from-violet-600 to-purple-600 shadow-violet-500/30 hover:shadow-violet-500/50';

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* ── Chat window ── */}
      {open && (
        <div className="absolute bottom-20 right-0 w-[380px] max-h-[520px] bg-[#0c0c14] rounded-2xl border border-white/[0.08] shadow-2xl shadow-black/50 flex flex-col overflow-hidden animate-fade-in-up">

          {/* Header */}
          <div className={`flex items-center justify-between px-4 py-3 bg-gradient-to-r ${headerGradient} shrink-0`}>
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-white/20 overflow-hidden flex items-center justify-center shrink-0">
                {isSecurityMode ? (
                  <Shield className="w-5 h-5 text-white" />
                ) : (
                  <>
                    <Image
                      src="/efisio-avatar.png"
                      alt="Efisio"
                      width={36}
                      height={36}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    <span className="absolute text-white text-sm font-bold">E</span>
                  </>
                )}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">
                  {isSecurityMode ? 'SafetyTutor' : 'Efisio'}
                </h3>
                <p className="text-[11px] text-white/70">
                  {isSecurityMode ? 'Tutor Certificazioni ISO/UNI' : 'Il tuo Tutor'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* ── Chip suggerimenti contestuali ── */}
          {chips.length > 0 && chatMessages.length === 0 && (
            <div className="shrink-0 px-3 pt-3 pb-1 flex flex-wrap gap-1.5">
              {chips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleSend(chip)}
                  disabled={isLoading}
                  className={`text-[11px] px-3 py-1.5 rounded-full border font-medium transition-all cursor-pointer disabled:opacity-40 ${chipActiveClass}`}
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 chat-scroll min-h-0">
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
                    className={`max-w-[85%] px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-wrap
                      ${isUser
                        ? `bg-gradient-to-r ${isSecurityMode ? 'from-amber-500 to-orange-600' : 'from-violet-600 to-purple-600'} text-white rounded-2xl rounded-br-md`
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
                    <div className={`w-2 h-2 rounded-full animate-bounce ${isSecurityMode ? 'bg-amber-400' : 'bg-violet-400'}`} style={{ animationDelay: '0ms' }} />
                    <div className={`w-2 h-2 rounded-full animate-bounce ${isSecurityMode ? 'bg-amber-400' : 'bg-violet-400'}`} style={{ animationDelay: '150ms' }} />
                    <div className={`w-2 h-2 rounded-full animate-bounce ${isSecurityMode ? 'bg-amber-400' : 'bg-violet-400'}`} style={{ animationDelay: '300ms' }} />
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
                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
              }}
              placeholder={isSecurityMode ? 'Chiedi sulla norma...' : 'Chiedi a Efisio...'}
              disabled={isLoading}
              className="flex-1 bg-white/[0.04] border border-white/[0.06] rounded-xl px-3.5 py-2.5 text-[13px] text-white
                placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/30
                disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className={`shrink-0 w-10 h-10 rounded-xl bg-gradient-to-r ${sendBtnClass} text-white flex items-center justify-center
                shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
                transition-all cursor-pointer`}
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      )}

      {/* ── FAB ── */}
      <button
        onClick={() => setOpen(!open)}
        className={`relative w-14 h-14 rounded-full bg-gradient-to-br ${fabClass} text-white
          flex items-center justify-center shadow-xl
          hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer overflow-hidden`}
      >
        {isSecurityMode ? (
          <Shield className="w-6 h-6 relative z-10" />
        ) : (
          <>
            <Image
              src="/efisio-avatar.png"
              alt="Efisio"
              width={56}
              height={56}
              className="w-full h-full object-cover absolute inset-0"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <MessageCircle className="w-6 h-6 relative z-10" />
          </>
        )}

        {!open && (
          <span className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-lg animate-bounce z-20
            ${isSecurityMode ? 'bg-amber-500 shadow-amber-500/30' : 'bg-red-500 shadow-red-500/30'}`}>
            {isSecurityMode ? <Sparkles className="w-2.5 h-2.5" /> : '!'}
          </span>
        )}
      </button>
    </div>
  );
}
