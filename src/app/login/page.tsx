"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { MessageSquare, Mail, ArrowRight, Check, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
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
    <div className="min-h-screen bg-[#06060a] flex flex-col items-center justify-center px-4">
      {/* Background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-600/8 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-3 mb-10">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/25">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">Roleplay Trainer</span>
        </Link>

        {/* Card */}
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
                Abbiamo inviato un link di accesso a{" "}
                <span className="text-white font-medium">{email}</span>.
                <br />
                Clicca il link per accedere alla piattaforma.
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-white mb-2">
                  Accedi alla piattaforma
                </h1>
                <p className="text-slate-500 text-sm">
                  Inserisci la tua email per ricevere un link di accesso
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-400 mb-2"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-600" />
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
                      Invia Magic Link
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          Accedendo, accetti i nostri termini di servizio e la privacy policy.
        </p>
      </div>
    </div>
  );
}
