'use client';

import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import ScenarioCard from '@/components/dashboard/ScenarioCard';
import { useAppStore } from '@/store/useStore';
import { securityAreas } from '@/data/security-areas';
import { getSecurityScenariosByArea } from '@/data/security-scenarios';
import { ArrowLeft, Brain, Award, Shield } from 'lucide-react';

export default function SecurityCertPage() {
  const params = useParams();
  const router = useRouter();
  const certId = params.certId as string;
  const { state, startScenario } = useAppStore();
  const { userProgress } = state;

  const area = securityAreas.find((a) => a.id === certId);
  if (!area) {
    router.push('/security');
    return null;
  }

  const scenarios = getSecurityScenariosByArea(certId);

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
            onClick={() => router.push('/security')}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-400 mb-4 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Tutti i corsi sicurezza
          </button>
          <div className={`bg-gradient-to-r ${area.gradient} rounded-2xl px-6 sm:px-8 py-8 text-white`}>
            <h1 className="text-2xl sm:text-3xl font-bold">{area.title}</h1>
            <p className="text-white/80 mt-2 text-base max-w-2xl">{area.description}</p>
          </div>
        </div>

        {/* Quiz Teorico */}
        <section>
          <div
            onClick={() => router.push(`/security/${certId}/quiz`)}
            className="group bg-white/[0.03] border border-white/[0.06] rounded-xl p-6
              hover:border-amber-500/30 hover:bg-white/[0.06] transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/25 shrink-0">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">Quiz Teorico</h3>
                <p className="text-sm text-slate-500 mt-0.5">
                  Metti alla prova le tue conoscenze su {area.title}
                </p>
              </div>
              <button className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl text-sm font-medium hover:from-amber-500 hover:to-orange-500 shadow-lg shadow-amber-500/25 transition-all cursor-pointer">
                Inizia Quiz
              </button>
            </div>
          </div>
        </section>

        {/* Simulazioni RolePlay */}
        {scenarios.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-semibold text-white">
                Simulazioni RolePlay
              </h2>
            </div>
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
        )}

        {/* Badge */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-semibold text-white">
              Badge & Riconoscimenti
            </h2>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 text-center">
            <p className="text-sm text-slate-500">
              Completa quiz e simulazioni per sbloccare i badge di questa certificazione.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
