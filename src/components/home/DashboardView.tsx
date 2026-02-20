'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Navbar from '@/components/layout/Navbar';
import StatsPanel from '@/components/dashboard/StatsPanel';
import { useAppStore } from '@/store/useStore';
import { courseAreas } from '@/data/areas';
import { getScenariosByArea } from '@/data/scenarios';
import {
  TrendingUp, Sparkles, ChevronRight, BookOpen, CheckCircle2,
  LogOut, ShieldCheck, Bot, Shield,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp, Sparkles,
};

interface DashboardViewProps {
  userEmail: string;
}

export default function DashboardView({ userEmail }: DashboardViewProps) {
  const router = useRouter();
  const { state } = useAppStore();
  const { userProgress } = state;

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#06060a]">
      <Navbar totalXp={userProgress.totalXp} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10 relative z-10">
        {/* Header con email e logout */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Bentornato
            </h1>
            <p className="text-slate-500 mt-1 text-sm">
              {userEmail}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] rounded-xl px-4 py-2.5 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Stats globali */}
        <StatsPanel userProgress={userProgress} />

        {/* Assistenti AI */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <Bot className="w-5 h-5 text-violet-400" />
            <h2 className="text-lg font-semibold text-white">I tuoi Assistenti AI</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Efisio */}
            <button
              onClick={() => router.push('/chatbot/efisio')}
              className="group text-left bg-white/[0.03] rounded-2xl border border-white/[0.06] overflow-hidden
                hover:bg-white/[0.05] hover:border-violet-500/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-6 relative">
                <div className="absolute top-2 right-2 w-16 h-16 rounded-full bg-white/10" />
                <div className="absolute bottom-2 right-8 w-10 h-10 rounded-full bg-white/10" />
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3 text-white font-bold text-xl relative z-10">
                  E
                </div>
                <h3 className="text-lg font-bold text-white relative z-10">Efisio</h3>
                <p className="text-sm text-white/70 mt-1 relative z-10">Tutor Marketing & Vendita</p>
              </div>
              <div className="px-6 py-4 flex items-center justify-between">
                <p className="text-xs text-slate-500">Strategie, funnel, tecniche di vendita e molto altro. Ajò!</p>
                <div className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center group-hover:bg-violet-500/15 transition-colors shrink-0 ml-3">
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-violet-400 transition-colors" />
                </div>
              </div>
            </button>

            {/* Gavino */}
            <button
              onClick={() => router.push('/chatbot/gavino')}
              className="group text-left bg-white/[0.03] rounded-2xl border border-white/[0.06] overflow-hidden
                hover:bg-white/[0.05] hover:border-amber-500/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-6 relative">
                <div className="absolute top-2 right-2 w-16 h-16 rounded-full bg-white/10" />
                <div className="absolute bottom-2 right-8 w-10 h-10 rounded-full bg-white/10" />
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3 relative z-10">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white relative z-10">Gavino</h3>
                <p className="text-sm text-white/70 mt-1 relative z-10">Esperto Sicurezza & Normative ISO/UNI</p>
              </div>
              <div className="px-6 py-4 flex items-center justify-between">
                <p className="text-xs text-slate-500">ISO 9001, ISO 45001, audit, clausole e compliance normativa.</p>
                <div className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center group-hover:bg-amber-500/15 transition-colors shrink-0 ml-3">
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400 transition-colors" />
                </div>
              </div>
            </button>
          </div>
        </section>

        {/* Aree corso */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <BookOpen className="w-5 h-5 text-violet-400" />
            <h2 className="text-lg font-semibold text-white">I tuoi corsi</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
                  className="group text-left bg-white/[0.03] rounded-2xl border border-white/[0.06] overflow-hidden
                    hover:bg-white/[0.05] hover:border-violet-500/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <div className={`bg-gradient-to-r ${area.gradient} px-6 py-8 relative`}>
                    <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white/10 -mr-4 -mt-4" />
                    <div className="absolute bottom-2 right-8 w-12 h-12 rounded-full bg-white/10" />
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{area.title}</h3>
                  </div>

                  <div className="px-6 py-5">
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">{area.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 text-sm text-slate-400">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          {completedCount}/{totalCount} scenari
                        </div>
                        <div className="w-20 h-2 bg-white/[0.06] rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${area.gradient} rounded-full transition-all duration-500`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center group-hover:bg-violet-500/15 transition-colors">
                        <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-violet-400 transition-colors" />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}

            {/* Sicurezza card */}
            <button
              onClick={() => router.push('/security')}
              className="group text-left bg-white/[0.03] rounded-2xl border border-white/[0.06] overflow-hidden
                hover:bg-white/[0.05] hover:border-amber-500/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-8 relative">
                <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white/10 -mr-4 -mt-4" />
                <div className="absolute bottom-2 right-8 w-12 h-12 rounded-full bg-white/10" />
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white">Sicurezza</h3>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/20 text-white">
                    Nuovo
                  </span>
                </div>
              </div>

              <div className="px-6 py-5">
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  Preparati per le certificazioni ISO 9001, ISO 14001, ISO 45001 e altre norme con quiz e simulazioni di audit.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-sm text-amber-400">
                    <ShieldCheck className="w-4 h-4" />
                    6 certificazioni
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center group-hover:bg-amber-500/15 transition-colors">
                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400 transition-colors" />
                  </div>
                </div>
              </div>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
