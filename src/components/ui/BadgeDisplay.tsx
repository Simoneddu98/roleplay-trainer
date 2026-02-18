import {
  Shield, Target, GraduationCap, Heart, Lightbulb, Trophy, Lock,
  Share2, Bot, PenTool, Sparkles, Award, CheckCircle2, ClipboardCheck, Medal, Star,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield, Target, GraduationCap, Heart, Lightbulb, Trophy, Share2, Bot, PenTool, Sparkles,
  Award, CheckCircle2, ClipboardCheck, Medal, Star,
};

interface BadgeDisplayProps {
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export default function BadgeDisplay({ name, description, icon, unlocked }: BadgeDisplayProps) {
  const IconComponent = iconMap[icon] || Trophy;

  return (
    <div
      className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border text-center transition-all duration-200
        ${unlocked
          ? 'bg-white/[0.04] border-violet-500/30 ring-1 ring-violet-500/20 shadow-lg shadow-violet-500/5'
          : 'bg-white/[0.02] border-white/[0.06] opacity-40 grayscale'
        }`}
    >
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center
          ${unlocked ? 'bg-violet-500/15 text-violet-400' : 'bg-white/[0.06] text-slate-500'}`}
      >
        {unlocked ? (
          <IconComponent className="w-6 h-6" />
        ) : (
          <Lock className="w-5 h-5" />
        )}
      </div>
      <h4 className="text-sm font-semibold text-slate-200">{name}</h4>
      <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
    </div>
  );
}
