'use client';

import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { BookOpen, Search, SearchX, X, Volume2, Loader2 } from 'lucide-react';
import {
  GLOSSARY_INDEX,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  searchEntries,
  getEntriesByCategory,
  type GlossaryCategory,
  type GlossaryEntry,
} from '@/data/glossary-index';

type FilterValue = 'all' | GlossaryCategory;

interface TermDetail {
  term: string;
  definition: string;
  category: string;
}

const FILTER_OPTIONS: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'Tutti' },
  { value: 'sales', label: 'Vendita' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'ai', label: 'AI' },
];

export default function GlossaryBrowser() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterValue>('all');
  const [selectedTerm, setSelectedTerm] = useState<GlossaryEntry | null>(null);
  const [termDetail, setTermDetail] = useState<TermDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // ---------- Filtered results ----------
  const filteredEntries = useMemo(() => {
    let entries: GlossaryEntry[];

    if (activeFilter !== 'all') {
      entries = getEntriesByCategory(activeFilter);
    } else {
      entries = GLOSSARY_INDEX;
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      entries = entries.filter(
        (e) =>
          e.term.toLowerCase().includes(query) ||
          e.preview.toLowerCase().includes(query)
      );
    }

    return entries;
  }, [activeFilter, searchQuery]);

  // ---------- Modal open / close ----------
  const openModal = useCallback(async (entry: GlossaryEntry) => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    setSelectedTerm(entry);
    setTermDetail(null);
    setModalOpen(true);
    setLoading(true);

    try {
      const res = await fetch(
        `/api/dictionary?term=${encodeURIComponent(entry.term)}`
      );
      if (res.ok) {
        const data: TermDetail = await res.json();
        setTermDetail(data);
      } else {
        setTermDetail(null);
      }
    } catch {
      setTermDetail(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setSelectedTerm(null);
    setTermDetail(null);
    setLoading(false);

    // Restore focus to the element that triggered the modal
    requestAnimationFrame(() => {
      previousFocusRef.current?.focus();
    });
  }, []);

  // Focus the close button when modal opens
  useEffect(() => {
    if (modalOpen) {
      requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });
    }
  }, [modalOpen]);

  // Escape key handler
  useEffect(() => {
    if (!modalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }

      // Basic focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen, closeModal]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalOpen]);

  // ---------- Speech ----------
  const pronounce = useCallback((term: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(term);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  }, []);

  // ---------- Render ----------
  return (
    <section aria-label="Glossario Intelligente" className="w-full">
      {/* ===== Sticky Header ===== */}
      <header className="sticky top-0 z-30 bg-[#06060a]/80 backdrop-blur-xl pb-4">
        {/* Title row */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-purple-600">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              Glossario Intelligente
            </h2>
            <p className="text-sm text-slate-500">
              {filteredEntries.length}{' '}
              {filteredEntries.length === 1 ? 'termine' : 'termini'}
            </p>
          </div>
        </div>

        {/* Search input */}
        <div className="relative mb-3">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cerca un termine..."
            aria-label="Cerca un termine nel glossario"
            className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-shadow focus:ring-2 focus:ring-violet-500/40"
          />
        </div>

        {/* Filter pills */}
        <div className="flex gap-2" role="radiogroup" aria-label="Filtra per categoria">
          {FILTER_OPTIONS.map((opt) => {
            const isActive = activeFilter === opt.value;
            return (
              <button
                key={opt.value}
                role="radio"
                aria-checked={isActive}
                onClick={() => setActiveFilter(opt.value)}
                className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-violet-600 text-white'
                    : 'bg-white/[0.06] text-slate-400 hover:bg-white/[0.08]'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* ===== Grid ===== */}
      {filteredEntries.length > 0 ? (
        <ul
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3"
          role="list"
        >
          {filteredEntries.map((entry, index) => {
            const colors = CATEGORY_COLORS[entry.category];
            return (
              <li
                key={entry.id}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <button
                  onClick={() => openModal(entry)}
                  aria-label={`Apri dettaglio per ${entry.term}`}
                  className="flex w-full flex-col items-start gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 text-left transition-all hover:-translate-y-0.5 hover:border-violet-500/20 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40 cursor-pointer"
                >
                  <div className="flex w-full items-start justify-between gap-2">
                    <span className="font-semibold text-white">
                      {entry.term}
                    </span>
                    <span
                      className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-medium ${colors.bg} ${colors.text} ${colors.border}`}
                    >
                      {CATEGORY_LABELS[entry.category]}
                    </span>
                  </div>
                  <span className="text-sm text-slate-500">
                    {entry.preview}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        /* ===== Empty state ===== */
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <SearchX className="mb-3 h-10 w-10 text-slate-600" aria-hidden="true" />
          <p className="text-lg font-medium text-slate-400">
            Nessun termine trovato
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Prova con una ricerca diversa o cambia filtro.
          </p>
        </div>
      )}

      {/* ===== Detail Modal ===== */}
      {modalOpen && selectedTerm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Dettaglio: ${selectedTerm.term}`}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"
            onClick={closeModal}
            aria-hidden="true"
          />

          {/* Modal panel */}
          <div
            ref={modalRef}
            className="relative z-10 w-full max-w-lg rounded-2xl border border-white/[0.08] bg-[#0d0d14] p-6 shadow-2xl animate-modalIn"
          >
            {/* Close button */}
            <button
              ref={closeButtonRef}
              onClick={closeModal}
              aria-label="Chiudi dettaglio"
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Term heading */}
            <h3 className="mb-2 pr-8 text-2xl font-bold text-white">
              {selectedTerm.term}
            </h3>

            {/* Category badge */}
            {(() => {
              const colors = CATEGORY_COLORS[selectedTerm.category];
              return (
                <span
                  className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${colors.bg} ${colors.text} ${colors.border}`}
                >
                  {CATEGORY_LABELS[selectedTerm.category]}
                </span>
              );
            })()}

            {/* Content */}
            <div className="mt-5 min-h-[80px]">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2
                    className="h-6 w-6 animate-spin text-violet-400"
                    aria-label="Caricamento definizione"
                  />
                </div>
              ) : termDetail?.definition ? (
                <p className="text-slate-300 leading-relaxed">
                  {termDetail.definition}
                </p>
              ) : (
                <p className="text-slate-500 italic">
                  Definizione non ancora disponibile.
                </p>
              )}
            </div>

            {/* Pronunciation button */}
            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => pronounce(selectedTerm.term)}
                aria-label={`Pronuncia ${selectedTerm.term}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.03] px-3.5 py-1.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40"
              >
                <Volume2 className="h-4 w-4" />
                Pronuncia
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== Keyframe styles ===== */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out both;
        }
        .animate-modalIn {
          animation: modalIn 0.25s ease-out both;
        }
      `}</style>
    </section>
  );
}
