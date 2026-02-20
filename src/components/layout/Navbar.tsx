import { MessageSquare, Zap, BookOpen, Bot, Shield } from 'lucide-react';
import Link from 'next/link';

interface NavbarProps {
  totalXp: number;
}

export default function Navbar({ totalXp }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-[#06060a]/80 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-purple-500 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/20">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-white group-hover:text-violet-400 transition-colors">
            Roleplay Trainer
          </span>
        </Link>

        <div className="flex items-center gap-5">
          <Link href="/glossary" className="text-sm text-slate-400 hover:text-violet-400 transition-colors flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            Glossario
          </Link>
          <Link href="/chatbot/efisio" className="text-sm text-slate-400 hover:text-violet-400 transition-colors flex items-center gap-1.5">
            <Bot className="w-4 h-4" />
            Efisio
          </Link>
          <Link href="/chatbot/gavino" className="text-sm text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1.5">
            <Shield className="w-4 h-4" />
            Gavino
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-violet-500/10 text-violet-400 px-3 py-1.5 rounded-full text-sm font-semibold border border-violet-500/20">
            <Zap className="w-4 h-4" />
            {totalXp} XP
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white text-sm font-semibold shadow-lg shadow-violet-500/20">
            U
          </div>
        </div>
      </div>
    </nav>
  );
}
