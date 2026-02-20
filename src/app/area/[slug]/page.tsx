'use client';

import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import StatsPanel from '@/components/dashboard/StatsPanel';
import ScenarioCard from '@/components/dashboard/ScenarioCard';
import BadgeDisplay from '@/components/ui/BadgeDisplay';
import EfisioAssistant from '@/components/EfisioAssistant';
import { useAppStore } from '@/store/useStore';
import { courseAreas } from '@/data/areas';
import { getScenariosByArea } from '@/data/scenarios';
import { getBadgesByArea } from '@/data/gamification';
import { SCENARIOS } from '@/data/simulation-scenarios';
import { Award, ArrowLeft, Clapperboard, Brain, Zap, ChevronRight } from 'lucide-react';

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

        {/* Simulazioni Video Interattive */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <Clapperboard className="w-5 h-5 text-violet-400" />
            <h2 className="text-lg font-semibold text-white">Simulazioni Video Interattive</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(SCENARIOS).map(([key, scenario]) => (
              <button
                key={key}
                onClick={() => router.push(`/courses/${key}/simulation`)}
                className="group text-left bg-white/[0.03] rounded-2xl border border-white/[0.06] overflow-hidden
                  hover:bg-white/[0.05] hover:border-violet-500/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="px-6 py-6 relative" style={{ background: scenario.titleGradient }}>
                  <div className="absolute top-2 left-2 w-16 h-16 rounded-full bg-white/10" />
                  <div className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-white/10" />
                  <Clapperboard className="w-8 h-8 text-white mb-2 relative z-10" />
                  <h3 className="text-base font-bold text-white relative z-10">{scenario.title}</h3>
                  <p className="text-sm text-white/80 mt-1 relative z-10">{scenario.subtitle}</p>
                </div>
                <div className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm font-semibold text-violet-400">
                    <Zap className="w-4 h-4" />
                    50 XP per simulazione
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center group-hover:bg-violet-500/15 transition-colors">
                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-violet-400 transition-colors" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Trivia Challenge */}
        <section>
          <button
            onClick={() => router.push('/trivia')}
            className="group w-full text-left bg-white/[0.03] rounded-2xl border border-white/[0.06] overflow-hidden
              hover:bg-white/[0.05] hover:border-amber-500/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <div className="flex flex-col sm:flex-row">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 px-6 py-8 sm:py-0 sm:w-40 flex items-center justify-center relative">
                <div className="absolute top-2 left-2 w-16 h-16 rounded-full bg-white/10" />
                <div className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-white/10" />
                <Brain className="w-10 h-10 text-white relative z-10" />
              </div>
              <div className="flex-1 px-6 py-5 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white mb-1">Quiz & Trivia</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Metti alla prova le tue conoscenze con 10 domande a risposta multipla. Guadagna XP per ogni risposta corretta!
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-sm font-semibold text-amber-400">
                    <Zap className="w-4 h-4" />
                    Fino a 100 XP per partita
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/[0.06] flex items-center justify-center group-hover:bg-amber-500/15 transition-colors shrink-0 ml-4">
                  <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-amber-400 transition-colors" />
                </div>
              </div>
            </div>
          </button>
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

      {/* Floating Efisio assistant */}
      <EfisioAssistant />
    </div>
  );
}
