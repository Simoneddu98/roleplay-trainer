'use client';

import { useState, useRef, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function ChatInput({
  onSend,
  disabled = false,
  placeholder = 'Scrivi la tua risposta...',
}: ChatInputProps) {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  };

  return (
    <div className="flex items-end gap-3 p-4 border-t border-white/[0.06] bg-white/[0.02]">
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => { setText(e.target.value); handleInput(); }}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        className="flex-1 resize-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white
          placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/30
          disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      />
      <button
        onClick={handleSend}
        disabled={!text.trim() || disabled}
        className="shrink-0 w-11 h-11 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white flex items-center justify-center
          hover:from-violet-500 hover:to-purple-500 shadow-lg shadow-violet-500/25
          disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
          transition-all duration-200 cursor-pointer"
      >
        <Send className="w-4 h-4" />
      </button>
    </div>
  );
}
