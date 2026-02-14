"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { MessageSquare, User, ArrowRight, Loader2 } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Sessione non valida. Effettua di nuovo il login.");
      setLoading(false);
      return;
    }

    const { error: upsertError } = await supabase.from("profiles").upsert({
      id: user.id,
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: user.email,
    });

    setLoading(false);

    if (upsertError) {
      setError(upsertError.message);
    } else {
      router.push("/");
    }
  }

  return (
    <div className="min-h-screen bg-[#06060a] flex flex-col items-center justify-center px-4">
      {/* Background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-purple-600/8 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/25">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">Roleplay Trainer</span>
        </div>

        {/* Card */}
        <div className="bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/[0.06] p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-violet-500/15 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-7 h-7 text-violet-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Completa il tuo profilo
            </h1>
            <p className="text-slate-500 text-sm">
              Dicci come ti chiami per personalizzare la tua esperienza
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-slate-400 mb-2"
              >
                Nome
              </label>
              <input
                id="firstName"
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Mario"
                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white placeholder:text-slate-600 text-sm
                  focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/40 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-slate-400 mb-2"
              >
                Cognome
              </label>
              <input
                id="lastName"
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Rossi"
                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white placeholder:text-slate-600 text-sm
                  focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/40 transition-all"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !firstName.trim() || !lastName.trim()}
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
                  Inizia il training
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
