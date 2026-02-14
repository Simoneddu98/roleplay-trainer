import { MessageSquare, Zap } from 'lucide-react';
import Link from 'next/link';

interface NavbarProps {
  totalXp: number;
}

export default function Navbar({ totalXp }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
            Roleplay Trainer
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full text-sm font-semibold">
            <Zap className="w-4 h-4" />
            {totalXp} XP
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
            U
          </div>
        </div>
      </div>
    </nav>
  );
}
