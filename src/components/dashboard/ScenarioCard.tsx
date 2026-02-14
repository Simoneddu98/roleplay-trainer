import {
  HandCoins, MessageSquareWarning, UserPlus, Star, ChevronRight, CheckCircle, Zap,
  Share2, Bot, PenTool,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  HandCoins, MessageSquareWarning, UserPlus, Share2, Bot, PenTool,
};

const categoryColors: Record<string, string> = {
  Vendita: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  Leadership: 'bg-purple-500/15 text-purple-400 border-purple-500/20',
  HR: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  'Digital Marketing': 'bg-pink-500/15 text-pink-400 border-pink-500/20',
  AI: 'bg-violet-500/15 text-violet-400 border-violet-500/20',
  'Social Media': 'bg-sky-500/15 text-sky-400 border-sky-500/20',
  'Content Strategy': 'bg-amber-500/15 text-amber-400 border-amber-500/20',
};

interface ScenarioCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: number;
  icon: string;
  xpReward: number;
  isCompleted: boolean;
  onClick: () => void;
}

export default function ScenarioCard({
  title, description, category, difficulty, icon, xpReward, isCompleted, onClick,
}: ScenarioCardProps) {
  const IconComponent = iconMap[icon] || HandCoins;

  return (
    <button
      onClick={onClick}
      className={`group w-full text-left p-6 rounded-xl border bg-white/[0.03] transition-all duration-200 cursor-pointer
        hover:bg-white/[0.06] hover:-translate-y-0.5
        ${isCompleted
          ? 'border-emerald-500/30 ring-1 ring-emerald-500/20'
          : 'border-white/[0.06] hover:border-violet-500/30'
        }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-11 h-11 rounded-lg flex items-center justify-center
            ${isCompleted ? 'bg-emerald-500/15 text-emerald-400' : 'bg-violet-500/15 text-violet-400'}`}
        >
          {isCompleted ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <IconComponent className="w-5 h-5" />
          )}
        </div>
        <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-violet-400 transition-colors" />
      </div>

      <h3 className="text-base font-semibold text-white mb-1.5">{title}</h3>
      <p className="text-sm text-slate-500 mb-4 line-clamp-2 leading-relaxed">{description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${categoryColors[category] || 'bg-white/[0.06] text-slate-400 border-white/[0.06]'}`}>
            {category}
          </span>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < difficulty ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm font-semibold text-violet-400">
          <Zap className="w-3.5 h-3.5" />
          {xpReward} XP
        </div>
      </div>
    </button>
  );
}
