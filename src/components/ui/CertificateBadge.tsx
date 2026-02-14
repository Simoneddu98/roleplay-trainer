'use client';

import { useRef, useState, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { Award, Download, Loader2 } from 'lucide-react';

interface CertificateBadgeProps {
  userName: string;
  courseName: string;
  date?: string;
}

export default function CertificateBadge({
  userName,
  courseName,
  date,
}: CertificateBadgeProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const formattedDate =
    date ||
    new Date().toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  const handleDownload = useCallback(async () => {
    if (!cardRef.current || downloading) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        backgroundColor: '#06060a',
      });
      const link = document.createElement('a');
      link.download = `certificato-${courseName.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download failed:', err);
    } finally {
      setDownloading(false);
    }
  }, [courseName, downloading]);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Certificate card */}
      <div
        ref={cardRef}
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0c14] p-8 sm:p-10"
      >
        {/* Decorative gradient blobs */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-56 w-56 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-purple-600/20 blur-3xl" />

        <div className="relative flex flex-col items-center text-center gap-5">
          {/* Icon */}
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-purple-600 shadow-lg shadow-violet-500/25">
            <Award className="h-8 w-8 text-white" />
          </div>

          {/* Title */}
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-violet-400">
              Certificato di completamento
            </p>
            <h2 className="mt-1 text-2xl font-bold text-white">
              {courseName}
            </h2>
          </div>

          {/* Divider */}
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

          {/* User name */}
          <div>
            <p className="text-xs text-slate-500">Rilasciato a</p>
            <p className="mt-0.5 text-lg font-semibold text-slate-200">
              {userName}
            </p>
          </div>

          {/* Date & issuer */}
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>{formattedDate}</span>
            <span className="h-3 w-px bg-white/[0.1]" />
            <span>Roleplay Trainer</span>
          </div>
        </div>
      </div>

      {/* Download button */}
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600
          px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-500/20
          transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {downloading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Download className="h-4 w-4" />
        )}
        {downloading ? 'Generazione...' : 'Scarica PNG'}
      </button>
    </div>
  );
}
