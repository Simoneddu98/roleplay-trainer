'use client';

import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import StatsPanel from '@/components/dashboard/StatsPanel';
import ScenarioCard from '@/components/dashboard/ScenarioCard';
import BadgeDisplay from '@/components/ui/BadgeDisplay';
import { useAppStore } from '@/store/useStore';
import { courseAreas } from '@/data/areas';
import { getScenariosByArea } from '@/data/scenarios';
import { getBadgesByArea } from '@/data/gamification';
import { Award, ArrowLeft } from 'lucide-react';

export default function AreaPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { state, startScenario } = useAppStore();
  const { userProgress } = state;

  const area = courseAreas.find((a) => a.slug === slug);
  if (!area) {
    router.push('/');
    return null;
  }

  const scenarios = getScenariosByArea(area.id);
  const badges = getBadgesByArea(area.id);
  const unlockedBadgeIds = userProgress.badges.map((b) => b.id);

  const handleScenarioClick = (scenarioId: string) => {
    const scenario = scenarios.find((s) => s.id === scenarioId);
    if (scenario) {
      startScenario(scenario);
      router.push(`/chat/${scenarioId}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#06060a]">
      <Navbar totalXp={userProgress.totalXp} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10 relative z-10">
        {/* Back + Header */}
        <div>
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet-400 mb-4 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Tutti i corsi
          </button>
          <div className={`bg-gradient-to-r ${area.gradient} rounded-2xl px-6 sm:px-8 py-8 text-white`}>
            <h1 className="text-2xl sm:text-3xl font-bold">{area.title}</h1>
            <p className="text-white/80 mt-2 text-base max-w-2xl">{area.description}</p>
          </div>
        </div>

        {/* Stats */}
        <StatsPanel userProgress={userProgress} />

        {/* Scenari */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-4">
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
            <Award className="w-5 h-5 text-violet-400" />
            <h2 className="text-lg font-semibold text-white">
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
