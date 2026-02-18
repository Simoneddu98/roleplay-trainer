'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Navbar from '@/components/layout/Navbar';
import StatsPanel from '@/components/dashboard/StatsPanel';
import EfisioAssistant from '@/components/EfisioAssistant';
import { useAppStore } from '@/store/useStore';
import { courseAreas } from '@/data/areas';
import { getScenariosByArea } from '@/data/scenarios';
import { SCENARIOS } from '@/data/simulation-scenarios';
import { GlossaryTerm } from '@/data/glossary';
import {
  TrendingUp, Sparkles, ChevronRight, BookOpen, CheckCircle2,
  Brain, Zap, Clapperboard, LogOut, Search, Loader2, X, ShieldCheck,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp, Sparkles,
};

const categoryStyle: Record<string, string> = {
  Marketing: 'bg-pink-500/15 text-pink-400',
  Vendita: 'bg-blue-500/15 text-blue-400',
  Analytics: 'bg-emerald-500/15 text-emerald-400',
  Advertising: 'bg-amber-500/15 text-amber-400',
};

interface DashboardViewProps {
  userEmail: string;
}

export default function DashboardView({ userEmail }: DashboardViewProps) {
  const router = useRouter();
  const { state } = useAppStore();
  const { userProgress } = state;

  // Dictionary search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<GlossaryTerm | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearching(true);
    setSearchError(null);
    setSearchResult(null);

    try {
      const res = await fetch(`/api/dictionary?term=${encodeURIComponent(searchQuery.trim())}`);
      if (res.ok) {
        const data = await res.json();
        setSearchResult(data);
      } else {
        setSearchError('Termine non trovato. Prova con: Funnel, ROI, Churn, Lead, CTA...');
      }
    } catch {
      setSearchError('Errore di connessione. Riprova.');
    } finally {
      setSearching(false);
    }
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

        {/* Quick Dictionary */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <Search className="w-5 h-5 text-violet-400" />
            <h2 className="text-lg font-semibold text-white">Quick Dictionary</h2>
          </div>

          <div className="bg-white/[0.03] rounded-2xl border border-white/[0.06] p-6">
            <form onSubmit={handleSearch} className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cerca un termine (es. Funnel, Churn, ROI)..."
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-slate-600 text-sm
                    focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/40 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={searching || !searchQuery.trim()}
                className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500
                  text-white font-medium rounded-xl text-sm shadow-lg shadow-violet-500/25
                  disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                {searching ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Cerca'}
              </button>
            </form>

            {/* Search result */}
            {searchResult && (
              <div className="mt-4 bg-white/[0.03] rounded-xl border border-white/[0.06] p-5 animate-fade-in-up">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-white">{searchResult.term}</h3>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryStyle[searchResult.category] || 'bg-white/[0.06] text-slate-400'}`}>
                      {searchResult.category}
                    </span>
                  </div>
                  <button
                    onClick={() => { setSearchResult(null); setSearchQuery(''); }}
                    className="text-slate-600 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{searchResult.definition}</p>
              </div>
            )}

            {searchError && (
              <p className="mt-4 text-sm text-slate-500 text-center">{searchError}</p>
            )}
          </div>
        </section>

        {/* Glossario Intelligente */}
        <section>
          <button
            onClick={() => router.push('/glossary')}
            className="group w-full text-left bg-white/[0.03] rounded-2xl border border-white/[0.06] overflow-hidden
              hover:bg-white/[0.05] hover:border-violet-500/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <div className="flex flex-col sm:flex-row">
              <div className="bg-gradient-to-br from-violet-500 to-indigo-600 px-6 py-8 sm:py-0 sm:w-48 flex items-center justify-center relative">
                <div className="absolute top-2 left-2 w-16 h-16 rounded-full bg-white/10" />
                <div className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-white/10" />
                <BookOpen className="w-12 h-12 text-white relative z-10" />
              </div>
              <div className="flex-1 px-6 py-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Glossario Intelligente</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Esplora oltre 20 termini tecnici di Vendita, Marketing e AI. Filtra per categoria, cerca e ascolta la pronuncia.
                  </p>
                  <div className="flex items-center gap-1 mt-3 text-sm font-semibold text-violet-400">
                    <Sparkles className="w-4 h-4" />
                    Ricerca e filtri avanzati
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/[0.06] flex items-center justify-center group-hover:bg-violet-500/15 transition-colors shrink-0 ml-4">
                  <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-violet-400 transition-colors" />
                </div>
              </div>
            </div>
          </button>
        </section>

        {/* Aree corso */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <BookOpen className="w-5 h-5 text-violet-400" />
            <h2 className="text-lg font-semibold text-white">I tuoi corsi</h2>
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
          </div>
        </section>

        {/* Corsi sulla Sicurezza */}
        <section>
          <button
            onClick={() => router.push('/security')}
            className="group w-full text-left bg-white/[0.03] rounded-2xl border border-white/[0.06] overflow-hidden
              hover:bg-white/[0.05] hover:border-amber-500/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <div className="flex flex-col sm:flex-row">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 px-6 py-8 sm:py-0 sm:w-48 flex items-center justify-center relative">
                <div className="absolute top-2 left-2 w-16 h-16 rounded-full bg-white/10" />
                <div className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-white/10" />
                <ShieldCheck className="w-12 h-12 text-white relative z-10" />
              </div>
              <div className="flex-1 px-6 py-6 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-white">Corsi sulla Sicurezza</h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20">
                      Nuovo
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Preparati per le certificazioni ISO 9001, ISO 14001, ISO 45001 e altre norme professionali con quiz e simulazioni di audit.
                  </p>
                  <div className="flex items-center gap-1 mt-3 text-sm font-semibold text-amber-400">
                    <ShieldCheck className="w-4 h-4" />
                    6 certificazioni disponibili
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/[0.06] flex items-center justify-center group-hover:bg-amber-500/15 transition-colors shrink-0 ml-4">
                  <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-amber-400 transition-colors" />
                </div>
              </div>
            </div>
          </button>
        </section>

        {/* Simulazioni Interattive */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <Clapperboard className="w-5 h-5 text-violet-400" />
            <h2 className="text-lg font-semibold text-white">Simulazioni Video Interattive</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(SCENARIOS).map(([key, scenario]) => (
              <button
                key={key}
                onClick={() => router.push(`/courses/${key}/simulation`)}
                className="group text-left bg-white/[0.03] rounded-2xl border border-white/[0.06] overflow-hidden
                  hover:bg-white/[0.05] hover:border-violet-500/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="px-6 py-8 relative" style={{ background: scenario.titleGradient }}>
                  <div className="absolute top-2 left-2 w-16 h-16 rounded-full bg-white/10" />
                  <div className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-white/10" />
                  <Clapperboard className="w-10 h-10 text-white mb-3 relative z-10" />
                  <h3 className="text-lg font-bold text-white">{scenario.title}</h3>
                  <p className="text-sm text-white/80 mt-1">{scenario.subtitle}</p>
                </div>
                <div className="px-6 py-5 flex items-center justify-between">
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
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 px-6 py-8 sm:py-0 sm:w-48 flex items-center justify-center relative">
                <div className="absolute top-2 left-2 w-16 h-16 rounded-full bg-white/10" />
                <div className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-white/10" />
                <Brain className="w-12 h-12 text-white relative z-10" />
              </div>
              <div className="flex-1 px-6 py-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Trivia Challenge</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Metti alla prova le tue conoscenze informatiche con 10 domande a risposta multipla. Guadagna XP per ogni risposta corretta!
                  </p>
                  <div className="flex items-center gap-1 mt-3 text-sm font-semibold text-amber-400">
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
      </main>

      <EfisioAssistant />
    </div>
  );
}
