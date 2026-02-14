'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  MessageSquare, Mail, ArrowRight, Check, Loader2,
  Sparkles, Brain, Target, Zap,
} from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'Simulazioni Reali',
    description: 'Scenari di vendita, marketing e leadership basati su situazioni reali.',
  },
  {
    icon: Brain,
    title: 'AI Conversazionale',
    description: 'Dialoga con un\'intelligenza artificiale che si adatta alle tue risposte.',
  },
  {
    icon: Sparkles,
    title: 'Glossario Integrato',
    description: 'Passa il mouse sui termini tecnici per scoprire definizioni immediate.',
  },
  {
    icon: Zap,
    title: 'Gamification',
    description: 'Guadagna XP, sblocca badge e monitora i tuoi progressi.',
  },
];

export default function LandingView() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
  }

  return (
    <div className="min-h-screen bg-[#06060a] relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-violet-600/[0.07] rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/[0.05] rounded-full blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-purple-500 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/20">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold text-white">Roleplay Trainer</span>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero + Login */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Hero text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 mb-6">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span className="text-sm font-medium text-violet-400">Formazione AI-Powered</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
                Impara le Soft Skills
                <span className="block bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                  simulando scenari reali.
                </span>
              </h1>

              <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-lg">
                Vendita, leadership, digital marketing: allena le tue competenze con simulazioni interattive guidate dall&apos;intelligenza artificiale.
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-3">
                {['Vendita', 'Marketing', 'Leadership', 'AI'].map((tag) => (
                  <span key={tag} className="text-xs font-medium text-slate-500 bg-white/[0.04] border border-white/[0.06] rounded-full px-3 py-1.5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Login form */}
            <div className="lg:pl-8">
              <div className="bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/[0.06] p-8">
                {sent ? (
                  <div className="text-center py-4">
                    <div className="w-14 h-14 bg-emerald-500/15 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-7 h-7 text-emerald-400" />
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">
                      Controlla la tua email
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Abbiamo inviato un link di accesso a{' '}
                      <span className="text-white font-medium">{email}</span>.
                      <br />
                      Clicca il link per accedere alla piattaforma.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="text-center mb-8">
                      <h2 className="text-xl font-bold text-white mb-2">
                        Inizia gratis
                      </h2>
                      <p className="text-slate-500 text-sm">
                        Inserisci la tua email per ricevere un link di accesso
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">
                          Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                          <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="nome@azienda.it"
                            className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-slate-600 text-sm
                              focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/40 transition-all"
                          />
                        </div>
                      </div>

                      {error && (
                        <p className="text-red-400 text-sm text-center">{error}</p>
                      )}

                      <button
                        type="submit"
                        disabled={loading || !email}
                        className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500
                          text-white font-semibold py-3 px-4 rounded-xl text-sm
                          flex items-center justify-center gap-2
                          disabled:opacity-50 disabled:cursor-not-allowed
                          shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40
                          transition-all duration-200 cursor-pointer"
                      >
                        {loading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            Invia Link di Accesso
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Features grid */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-white/[0.03] rounded-xl border border-white/[0.06] p-6 hover:bg-white/[0.05] hover:border-violet-500/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-violet-500/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-violet-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
