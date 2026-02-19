'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, ArrowLeft, RotateCcw } from 'lucide-react';

export default function SecurityError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[SecurityError]', error);
  }, [error]);

  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#06060a] flex items-center justify-center px-4">
      <div className="bg-white/[0.03] rounded-2xl border border-amber-500/20 shadow-2xl shadow-amber-500/5 p-8 text-center max-w-md w-full space-y-6">
        <div className="w-16 h-16 bg-amber-500/15 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8 text-amber-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Errore nel corso</h2>
          <p className="text-slate-500 mt-2 text-sm leading-relaxed">
            Si è verificato un problema nel caricamento di questa sezione.
            I tuoi progressi sono al sicuro.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={reset}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3
              bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-medium
              hover:from-amber-500 hover:to-orange-500 shadow-lg shadow-amber-500/25
              transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Riprova
          </button>
          <button
            onClick={() => router.push('/security')}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3
              border border-white/[0.08] text-slate-300 bg-white/[0.03] rounded-xl font-medium
              hover:bg-white/[0.06] hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Torna ai corsi
          </button>
        </div>
      </div>
    </div>
  );
}
