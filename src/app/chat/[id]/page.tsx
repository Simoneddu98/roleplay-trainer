'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { allScenarios } from '@/data/scenarios';
import { allSecurityScenarios } from '@/data/security-scenarios';
import { ArrowLeft, Send, Bot, User, Loader2 } from 'lucide-react';

// Security area ids per rilevare il back URL corretto
const SECURITY_AREA_IDS = new Set([
  'iso-9001', 'iso-14001', 'iso-45001', 'uni-13549', 'iso-14064', 'uni-16636',
]);

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const scenarioId = params.id as string;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');

  // ✅ FIX: include scenari security nel lookup
  const scenario =
    allScenarios.find((s) => s.id === scenarioId) ??
    allSecurityScenarios.find((s) => s.id === scenarioId);

  const courseId = scenario?.areaId ?? '';

  // ✅ FIX: estrae il system prompt dall'initialMessage per passarlo all'API
  const systemPrompt = scenario?.initialMessages.find((m) => m.role === 'system')?.content;

  const { messages, sendMessage, status } = useChat({
    id: scenarioId,
    transport: new DefaultChatTransport({
      api: '/api/chat',
      // ✅ FIX: passa systemPrompt estratto dallo scenario per prompt corretti
      body: { courseId, ...(systemPrompt ? { systemPrompt } : {}) },
    }),
    messages: scenario
      ? scenario.initialMessages
          .filter((m) => m.role !== 'system')
          .map((m) => ({
            id: m.id,
            role: (m.role === 'bot' ? 'assistant' : 'user') as 'assistant' | 'user',
            parts: [{ type: 'text' as const, text: m.content }],
          }))
      : [],
  });

  const isStreaming = status === 'streaming' || status === 'submitted';

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Redirect if scenario not found
  useEffect(() => {
    if (!scenario) {
      router.push('/');
    }
  }, [scenario, router]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;
    sendMessage({ text: trimmed });
    setInput('');
  };

  if (!scenario) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500">Caricamento scenario...</p>
      </div>
    );
  }

  // ✅ FIX: back URL corretto per scenari security vs corsi standard
  const backUrl = SECURITY_AREA_IDS.has(scenario.areaId)
    ? `/security/${scenario.areaId}`
    : `/area/${scenario.areaId}`;

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-slate-200 shrink-0">
        <button
          onClick={() => router.push(backUrl)}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-sm font-semibold text-slate-900">{scenario.title}</h2>
          <p className="text-xs text-slate-500">
            {isStreaming ? 'Sta scrivendo...' : 'Simulazione in corso'}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto chat-scroll px-4 py-6">
        {/* System context message */}
        {scenario.initialMessages
          .filter((m) => m.role === 'system')
          .map((m) => (
            <div key={m.id} className="flex justify-center my-4 animate-fade-in-up">
              <p className="text-xs text-slate-400 italic bg-slate-100 px-4 py-2 rounded-full max-w-md text-center">
                {m.content}
              </p>
            </div>
          ))}

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
              className={`flex gap-3 mb-4 animate-fade-in-up ${isUser ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1
                  ${isUser ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'}`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div
                className={`max-w-[75%] px-4 py-3 text-sm leading-relaxed
                  ${isUser
                    ? 'bg-indigo-600 text-white rounded-2xl rounded-br-md'
                    : 'bg-white text-slate-900 border border-slate-200 rounded-2xl rounded-bl-md'
                  }`}
              >
                {textContent}
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isStreaming && messages[messages.length - 1]?.role !== 'assistant' && (
          <div className="flex gap-3 mb-4 animate-fade-in-up">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
              <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="shrink-0 flex items-end gap-3 p-4 border-t border-slate-200 bg-white">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Scrivi la tua risposta..."
          disabled={isStreaming}
          rows={1}
          className="flex-1 resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900
            placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
            disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isStreaming}
          className="shrink-0 w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center
            hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-40 disabled:cursor-not-allowed
            transition-all duration-200 cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
