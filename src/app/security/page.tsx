'use client';

import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { useAppStore } from '@/store/useStore';
import { securityAreas } from '@/data/security-areas';
import { Shield, ChevronRight, Award } from 'lucide-react';

export default function SecurityPage() {
  const { state } = useAppStore();
  const { userProgress } = state;

  return (
    <div className="min-h-screen bg-[#06060a]">
      <Navbar totalXp={userProgress.totalXp} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10 relative z-10">
        {/* Header */}
        <div>
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl px-6 sm:px-8 py-8 text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Corsi sulla Sicurezza</h1>
                <p className="text-white/80 text-sm mt-0.5">
                  Percorsi di formazione per certificazioni professionali
                </p>
              </div>
            </div>
            <div className="mt-4 inline-flex items-center gap-1.5 bg-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20">
              <Award className="w-3.5 h-3.5" />
              Certificazioni ISO / UNI
            </div>
          </div>
        </div>

        {/* Grid certificazioni */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-4">
            Percorsi disponibili
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {securityAreas.map((area) => (
              <Link
                key={area.id}
                href={`/security/${area.id}`}
                className="group w-full text-left p-6 rounded-xl border bg-white/[0.03] border-white/[0.06]
                  hover:border-amber-500/30 hover:bg-white/[0.06] hover:-translate-y-0.5
                  transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 rounded-lg flex items-center justify-center bg-gradient-to-br ${area.gradient} shadow-lg`}>
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-amber-400 transition-colors" />
                </div>

                <h3 className="text-base font-semibold text-white mb-1.5">{area.title}</h3>
                <p className="text-sm text-slate-500 mb-4 line-clamp-2 leading-relaxed">
                  {area.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full border bg-amber-500/15 text-amber-400 border-amber-500/20">
                    Certificazione Professionale
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer info */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-6 py-4 flex items-center gap-3">
          <Award className="w-5 h-5 text-amber-400 shrink-0" />
          <p className="text-sm text-slate-400">
            Preparati per le certificazioni professionali con quiz teorici e simulazioni pratiche di roleplay.
          </p>
        </div>
      </main>
    </div>
  );
}
