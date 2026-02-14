'use client';

import { useEffect, useRef } from 'react';
import { Message } from '@/types';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import { ArrowLeft } from 'lucide-react';

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  scenarioTitle: string;
  onBack: () => void;
}

export default function ChatWindow({
  messages,
  onSendMessage,
  scenarioTitle,
  onBack,
}: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-slate-200 shrink-0">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-sm font-semibold text-slate-900">{scenarioTitle}</h2>
          <p className="text-xs text-slate-500">Simulazione in corso</p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto chat-scroll px-4 py-6">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
      </div>

      {/* Input */}
      <div className="shrink-0">
        <ChatInput onSend={onSendMessage} />
      </div>
    </div>
  );
}
