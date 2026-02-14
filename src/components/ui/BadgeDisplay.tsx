import {
  Shield, Target, GraduationCap, Heart, Lightbulb, Trophy, Lock,
  Share2, Bot, PenTool, Sparkles,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield, Target, GraduationCap, Heart, Lightbulb, Trophy, Share2, Bot, PenTool, Sparkles,
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
          ? 'bg-white border-indigo-200 ring-2 ring-indigo-500/20 shadow-sm'
          : 'bg-slate-50 border-slate-200 opacity-50 grayscale'
        }`}
    >
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center
          ${unlocked ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-200 text-slate-400'}`}
      >
        {unlocked ? (
          <IconComponent className="w-6 h-6" />
        ) : (
          <Lock className="w-5 h-5" />
        )}
      </div>
      <h4 className="text-sm font-semibold text-slate-900">{name}</h4>
      <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
    </div>
  );
}
