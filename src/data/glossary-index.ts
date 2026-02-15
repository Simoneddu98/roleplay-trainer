export type GlossaryCategory = 'sales' | 'marketing' | 'ai';

export interface GlossaryEntry {
  id: string;
  term: string;
  category: GlossaryCategory;
  preview: string;
}

export const GLOSSARY_INDEX: GlossaryEntry[] = [
  // Sales
  {
    id: 'cold-calling',
    term: 'Cold Calling',
    category: 'sales',
    preview: 'Chiamate a potenziali clienti',
  },
  {
    id: 'closing',
    term: 'Closing',
    category: 'sales',
    preview: 'Chiusura della trattativa',
  },
  {
    id: 'upselling',
    term: 'Upselling',
    category: 'sales',
    preview: 'Vendita di versione premium',
  },
  {
    id: 'cross-selling',
    term: 'Cross-selling',
    category: 'sales',
    preview: 'Vendita prodotti complementari',
  },
  {
    id: 'lead-qualification',
    term: 'Lead Qualification',
    category: 'sales',
    preview: 'Valutazione potenziale del contatto',
  },
  {
    id: 'pipeline',
    term: 'Pipeline',
    category: 'sales',
    preview: 'Flusso trattative in corso',
  },
  {
    id: 'gatekeeper',
    term: 'Gatekeeper',
    category: 'sales',
    preview: 'Filtro verso il decisore',
  },

  // Marketing
  {
    id: 'funnel',
    term: 'Funnel',
    category: 'marketing',
    preview: "Percorso dalla scoperta all'acquisto",
  },
  {
    id: 'seo',
    term: 'SEO',
    category: 'marketing',
    preview: 'Ottimizzazione per i motori',
  },
  {
    id: 'content-marketing',
    term: 'Content Marketing',
    category: 'marketing',
    preview: 'Strategia basata sui contenuti',
  },
  {
    id: 'brand-awareness',
    term: 'Brand Awareness',
    category: 'marketing',
    preview: 'Riconoscibilità del marchio',
  },
  {
    id: 'bounce-rate',
    term: 'Bounce Rate',
    category: 'marketing',
    preview: 'Tasso di abbandono pagina',
  },
  {
    id: 'ctr',
    term: 'CTR',
    category: 'marketing',
    preview: 'Percentuale di clic',
  },
  {
    id: 'retargeting',
    term: 'Retargeting',
    category: 'marketing',
    preview: 'Pubblicità verso utenti precedenti',
  },

  // AI
  {
    id: 'llm',
    term: 'LLM',
    category: 'ai',
    preview: 'Modello linguistico di grandi dimensioni',
  },
  {
    id: 'prompt-engineering',
    term: 'Prompt Engineering',
    category: 'ai',
    preview: 'Progettazione istruzioni per AI',
  },
  {
    id: 'fine-tuning',
    term: 'Fine-tuning',
    category: 'ai',
    preview: 'Addestramento specifico del modello',
  },
  {
    id: 'rag',
    term: 'RAG',
    category: 'ai',
    preview: 'Recupero e generazione aumentata',
  },
  {
    id: 'hallucination',
    term: 'Hallucination',
    category: 'ai',
    preview: "Risposte inventate dall'AI",
  },
  {
    id: 'tokenization',
    term: 'Tokenization',
    category: 'ai',
    preview: 'Suddivisione testo in token',
  },
  {
    id: 'embedding',
    term: 'Embedding',
    category: 'ai',
    preview: 'Rappresentazione numerica del testo',
  },
];

export function getEntriesByCategory(category: GlossaryCategory): GlossaryEntry[] {
  return GLOSSARY_INDEX.filter((entry) => entry.category === category);
}

export function searchEntries(query: string): GlossaryEntry[] {
  const lowerQuery = query.toLowerCase();
  return GLOSSARY_INDEX.filter(
    (entry) =>
      entry.term.toLowerCase().includes(lowerQuery) ||
      entry.preview.toLowerCase().includes(lowerQuery)
  );
}

export const CATEGORY_LABELS: Record<GlossaryCategory, string> = {
  sales: 'Vendita',
  marketing: 'Marketing',
  ai: 'AI',
};

export const CATEGORY_COLORS: Record<GlossaryCategory, { bg: string; text: string; border: string }> = {
  sales: { bg: 'bg-blue-500/15', text: 'text-blue-400', border: 'border-blue-500/20' },
  marketing: { bg: 'bg-pink-500/15', text: 'text-pink-400', border: 'border-pink-500/20' },
  ai: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/20' },
};
