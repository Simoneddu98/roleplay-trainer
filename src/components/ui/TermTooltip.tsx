'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { GlossaryTerm } from '@/data/glossary';

interface TermTooltipProps {
  term: GlossaryTerm;
  children: React.ReactNode;
}

const categoryColors: Record<string, string> = {
  Marketing: 'bg-violet-500/20 text-violet-300',
  Vendita: 'bg-emerald-500/20 text-emerald-300',
  Analytics: 'bg-sky-500/20 text-sky-300',
  Advertising: 'bg-amber-500/20 text-amber-300',
};

export default function TermTooltip({ term, children }: TermTooltipProps) {
  const [open, setOpen] = useState(false);
  const [above, setAbove] = useState(true);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setAbove(rect.top > 180);
    }
    setOpen(true);
  }, []);

  const hide = useCallback(() => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <span
      ref={triggerRef}
      className="relative inline"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      tabIndex={0}
    >
      <span className="border-b border-dashed border-violet-400/50 text-violet-300 cursor-help">
        {children}
      </span>

      {open && (
        <span
          role="tooltip"
          onMouseEnter={show}
          onMouseLeave={hide}
          className={`absolute z-50 left-1/2 -translate-x-1/2 w-64 p-3 rounded-xl
            bg-[#12121a]/95 backdrop-blur-xl border border-white/[0.08]
            shadow-xl shadow-black/40 text-left
            animate-fade-in-up
            ${above ? 'bottom-full mb-2' : 'top-full mt-2'}`}
        >
          <span className="flex items-center gap-2 mb-1.5">
            <span className="text-sm font-semibold text-white">
              {term.term}
            </span>
            <span
              className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${categoryColors[term.category] || 'bg-white/10 text-slate-400'}`}
            >
              {term.category}
            </span>
          </span>
          <span className="block text-xs text-slate-400 leading-relaxed">
            {term.definition}
          </span>
        </span>
      )}
    </span>
  );
}
