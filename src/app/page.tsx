'use client';

import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import StatsPanel from '@/components/dashboard/StatsPanel';
import { useAppStore } from '@/store/useStore';
import { courseAreas } from '@/data/areas';
import { getScenariosByArea } from '@/data/scenarios';
import {
  TrendingUp, Sparkles, ChevronRight, BookOpen, CheckCircle2,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp, Sparkles,
};

export default function HomePage() {
  const router = useRouter();
  const { state } = useAppStore();
  const { userProgress } = state;

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
            Scegli un corso e metti alla prova le tue competenze con simulazioni interattive.
          </p>
        </div>

        {/* Stats globali */}
        <StatsPanel userProgress={userProgress} />

        {/* Aree corso */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-slate-900">I tuoi corsi</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courseAreas.map((area) => {
              const Icon = iconMap[area.icon] || TrendingUp;
              const areaScenarios = getScenariosByArea(area.id);
              const completedCount = areaScenarios.filter((s) =>
                userProgress.completedScenarios.includes(s.id)
              ).length;
              const totalCount = areaScenarios.length;
              const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

              return (
                <button
                  key={area.id}
                  onClick={() => router.push(`/area/${area.slug}`)}
                  className="group text-left bg-white rounded-2xl border border-slate-200 overflow-hidden
                    hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  {/* Gradient header */}
                  <div className={`bg-gradient-to-r ${area.gradient} px-6 py-8 relative`}>
                    <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white/10 -mr-4 -mt-4" />
                    <div className="absolute bottom-2 right-8 w-12 h-12 rounded-full bg-white/10" />
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{area.title}</h3>
                  </div>

                  {/* Body */}
                  <div className="px-6 py-5">
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">
                      {area.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 text-sm text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          {completedCount}/{totalCount} scenari
                        </div>
                        {/* Mini progress bar */}
                        <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${area.gradient} rounded-full transition-all duration-500`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
