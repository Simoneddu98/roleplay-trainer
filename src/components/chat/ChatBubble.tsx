import { Message } from '@/types';
import { Bot, User } from 'lucide-react';
import TermTooltip from '@/components/ui/TermTooltip';
import { glossary, GlossaryTerm } from '@/data/glossary';

interface ChatBubbleProps {
  message: Message;
}

// Build a case-insensitive regex matching all glossary terms (longest first to avoid partial matches)
const sortedTerms = [...glossary].sort(
  (a, b) => b.term.length - a.term.length
);
const termPattern = new RegExp(
  `\\b(${sortedTerms.map((t) => t.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`,
  'gi'
);
const termMap = new Map<string, GlossaryTerm>(
  glossary.map((t) => [t.term.toLowerCase(), t])
);

function highlightTerms(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  // Reset regex state
  termPattern.lastIndex = 0;

  while ((match = termPattern.exec(text)) !== null) {
    // Push text before the match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const matched = match[1];
    const entry = termMap.get(matched.toLowerCase());
    if (entry) {
      parts.push(
        <TermTooltip key={`${match.index}-${matched}`} term={entry}>
          {matched}
        </TermTooltip>
      );
    } else {
      parts.push(matched);
    }

    lastIndex = match.index + match[0].length;
  }

  // Remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const { role, content } = message;

  if (role === 'system') {
    return (
      <div className="flex justify-center my-4 animate-fade-in-up">
        <p className="text-xs text-slate-500 italic bg-white/[0.04] border border-white/[0.06] px-4 py-2 rounded-full max-w-md text-center">
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
          ${isUser
            ? 'bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/20'
            : 'bg-white/[0.06] text-slate-400'
          }`}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>
      <div
        className={`max-w-[75%] px-4 py-3 text-sm leading-relaxed
          ${isUser
            ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-2xl rounded-br-md shadow-lg shadow-violet-500/15'
            : 'bg-white/[0.04] text-slate-200 border border-white/[0.06] rounded-2xl rounded-bl-md'
          }`}
      >
        {highlightTerms(content)}
      </div>
    </div>
  );
}
