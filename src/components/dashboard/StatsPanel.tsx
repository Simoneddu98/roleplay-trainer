import { Trophy, Zap, Target, Flame } from 'lucide-react';
import { UserProgress } from '@/types';
import ProgressBar from '@/components/ui/ProgressBar';
import { getProgressToNextLevel, getNextLevelXp } from '@/data/gamification';

interface StatsPanelProps {
  userProgress: UserProgress;
}

export default function StatsPanel({ userProgress }: StatsPanelProps) {
  const { totalXp, level, completedScenarios, streakDays } = userProgress;
  const progressPercent = getProgressToNextLevel(totalXp);
  const nextLevelXp = getNextLevelXp(totalXp);

  const stats = [
    {
      label: 'Livello',
      value: level,
      icon: Trophy,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
    },
    {
      label: 'XP Totali',
      value: totalXp,
      icon: Zap,
      color: 'text-violet-400',
      bg: 'bg-violet-500/10',
    },
    {
      label: 'Scenari',
      value: completedScenarios.length,
      icon: Target,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
    {
      label: 'Streak',
      value: `${streakDays}g`,
      icon: Flame,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white/[0.03] rounded-xl border border-white/[0.06] p-4 flex items-center gap-3 hover:bg-white/[0.05] transition-colors"
            >
              <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-slate-500">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white/[0.03] rounded-xl border border-white/[0.06] p-5">
        <ProgressBar
          value={progressPercent}
          label={`Livello ${level} → ${level + 1}  (${totalXp}/${nextLevelXp} XP)`}
          size="md"
        />
      </div>
    </div>
  );
}
