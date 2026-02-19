'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, Home, RotateCcw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[GlobalError]', error);
  }, [error]);

  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#06060a] flex items-center justify-center px-4">
      <div className="bg-white/[0.03] rounded-2xl border border-red-500/20 shadow-2xl shadow-red-500/5 p-8 text-center max-w-md w-full space-y-6">
        <div className="w-16 h-16 bg-red-500/15 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Oops! Errore inaspettato</h2>
          <p className="text-slate-500 mt-2 text-sm leading-relaxed">
            L&apos;applicazione ha riscontrato un problema. Riprova o torna alla home.
          </p>
          {error.digest && (
            <p className="mt-2 text-xs text-slate-700 font-mono">{error.digest}</p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={reset}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3
              bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-medium
              hover:from-violet-500 hover:to-purple-500 shadow-lg shadow-violet-500/25
              transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Riprova
          </button>
          <button
            onClick={() => router.push('/')}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3
              border border-white/[0.08] text-slate-300 bg-white/[0.03] rounded-xl font-medium
              hover:bg-white/[0.06] hover:text-white transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            Torna alla Home
          </button>
        </div>
      </div>
    </div>
  );
}
