import {
  HandCoins, MessageSquareWarning, UserPlus, Star, ChevronRight, CheckCircle, Zap,
  Share2, Bot, PenTool,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  HandCoins, MessageSquareWarning, UserPlus, Share2, Bot, PenTool,
};

const categoryColors: Record<string, string> = {
  Vendita: 'bg-blue-100 text-blue-700',
  Leadership: 'bg-purple-100 text-purple-700',
  HR: 'bg-emerald-100 text-emerald-700',
  'Digital Marketing': 'bg-pink-100 text-pink-700',
  AI: 'bg-violet-100 text-violet-700',
  'Social Media': 'bg-sky-100 text-sky-700',
  'Content Strategy': 'bg-amber-100 text-amber-700',
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
      className={`group w-full text-left p-6 rounded-xl border bg-white transition-all duration-200 cursor-pointer
        hover:shadow-md hover:-translate-y-0.5
        ${isCompleted ? 'border-emerald-300 ring-1 ring-emerald-200' : 'border-slate-200 hover:border-indigo-300'}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-11 h-11 rounded-lg flex items-center justify-center
            ${isCompleted ? 'bg-emerald-100 text-emerald-600' : 'bg-indigo-100 text-indigo-600'}`}
        >
          {isCompleted ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <IconComponent className="w-5 h-5" />
          )}
        </div>
        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
      </div>

      <h3 className="text-base font-semibold text-slate-900 mb-1.5">{title}</h3>
      <p className="text-sm text-slate-500 mb-4 line-clamp-2 leading-relaxed">{description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[category] || 'bg-slate-100 text-slate-600'}`}>
            {category}
          </span>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < difficulty ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm font-semibold text-indigo-600">
          <Zap className="w-3.5 h-3.5" />
          {xpReward} XP
        </div>
      </div>
    </button>
  );
}
