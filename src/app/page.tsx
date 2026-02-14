'use client';

import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import StatsPanel from '@/components/dashboard/StatsPanel';
import ScenarioCard from '@/components/dashboard/ScenarioCard';
import BadgeDisplay from '@/components/ui/BadgeDisplay';
import { useAppStore } from '@/store/useStore';
import { scenarios } from '@/data/scenarios';
import { badges } from '@/data/gamification';
import { Award } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { state, startScenario } = useAppStore();
  const { userProgress } = state;

  const handleScenarioClick = (scenarioId: string) => {
    const scenario = scenarios.find((s) => s.id === scenarioId);
    if (scenario) {
      startScenario(scenario);
      router.push(`/chat/${scenarioId}`);
    }
  };

  const unlockedBadgeIds = userProgress.badges.map((b) => b.id);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar totalXp={userProgress.totalXp} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Benvenuto nella tua area di training
          </h1>
          <p className="text-slate-500 mt-2 text-base">
            Scegli uno scenario e metti alla prova le tue competenze comunicative.
          </p>
        </div>

        {/* Stats */}
        <StatsPanel userProgress={userProgress} />

        {/* Scenari */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Scenari disponibili
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scenarios.map((scenario) => (
              <ScenarioCard
                key={scenario.id}
                id={scenario.id}
                title={scenario.title}
                description={scenario.description}
                category={scenario.category}
                difficulty={scenario.difficulty}
                icon={scenario.icon}
                xpReward={scenario.xpReward}
                isCompleted={userProgress.completedScenarios.includes(scenario.id)}
                onClick={() => handleScenarioClick(scenario.id)}
              />
            ))}
          </div>
        </section>

        {/* Badges */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-slate-900">
              Badge & Riconoscimenti
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {badges.map((badge) => (
              <BadgeDisplay
                key={badge.id}
                name={badge.name}
                description={badge.description}
                icon={badge.icon}
                unlocked={unlockedBadgeIds.includes(badge.id)}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
