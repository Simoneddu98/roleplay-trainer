import { Message } from '@/types';
import { Bot, User } from 'lucide-react';

interface ChatBubbleProps {
  message: Message;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const { role, content } = message;

  if (role === 'system') {
    return (
      <div className="flex justify-center my-4 animate-fade-in-up">
        <p className="text-xs text-slate-400 italic bg-slate-100 px-4 py-2 rounded-full max-w-md text-center">
          {content}
        </p>
      </div>
    );
  }

  const isUser = role === 'user';

  return (
    <div className={`flex gap-3 mb-4 animate-fade-in-up ${isUser ? 'flex-row-reverse' : ''}`}>
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
        {content}
      </div>
    </div>
  );
}
