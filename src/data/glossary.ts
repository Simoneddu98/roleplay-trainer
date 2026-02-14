export interface GlossaryTerm {
  term: string;
  definition: string;
  category: 'Marketing' | 'Vendita' | 'Analytics' | 'Advertising';
}

export const glossary: GlossaryTerm[] = [
  {
    term: 'Funnel',
    definition:
      'Percorso a imbuto che guida il potenziale cliente dalla scoperta del prodotto fino all\'acquisto.',
    category: 'Marketing',
  },
  {
    term: 'Churn',
    definition:
      'Tasso di abbandono: la percentuale di clienti che smettono di usare un prodotto o servizio in un dato periodo.',
    category: 'Analytics',
  },
  {
    term: 'ROI',
    definition:
      'Return on Investment. Misura il rendimento di un investimento rispetto al suo costo.',
    category: 'Analytics',
  },
  {
    term: 'Lead',
    definition:
      'Un potenziale cliente che ha mostrato interesse per il tuo prodotto o servizio lasciando i propri contatti.',
    category: 'Vendita',
  },
  {
    term: 'CTA',
    definition:
      'Call to Action. Un invito esplicito all\'utente a compiere un\'azione, come "Acquista ora" o "Iscriviti".',
    category: 'Marketing',
  },
  {
    term: 'CPM',
    definition:
      'Cost Per Mille. Il costo per mille impressioni di un annuncio pubblicitario.',
    category: 'Advertising',
  },
  {
    term: 'CTR',
    definition:
      'Click-Through Rate. La percentuale di persone che cliccano su un link o annuncio rispetto a quante lo vedono.',
    category: 'Analytics',
  },
  {
    term: 'Engagement',
    definition:
      'Il livello di interazione degli utenti con i contenuti: like, commenti, condivisioni e tempo di permanenza.',
    category: 'Marketing',
  },
  {
    term: 'Conversion',
    definition:
      'Il momento in cui un utente compie l\'azione desiderata, ad esempio un acquisto o un\'iscrizione.',
    category: 'Analytics',
  },
  {
    term: 'Bounce Rate',
    definition:
      'Frequenza di rimbalzo. Percentuale di visitatori che abbandonano il sito dopo aver visto una sola pagina.',
    category: 'Analytics',
  },
  {
    term: 'KPI',
    definition:
      'Key Performance Indicator. Metrica chiave usata per misurare il successo di un\'attivita o campagna.',
    category: 'Analytics',
  },
  {
    term: 'A/B Test',
    definition:
      'Esperimento in cui si confrontano due varianti (A e B) per determinare quale performa meglio.',
    category: 'Marketing',
  },
  {
    term: 'Retargeting',
    definition:
      'Strategia pubblicitaria che mostra annunci a utenti che hanno gia interagito con il tuo sito o prodotto.',
    category: 'Advertising',
  },
  {
    term: 'Audience',
    definition:
      'Il pubblico target di una campagna, definito da caratteristiche demografiche, interessi e comportamenti.',
    category: 'Advertising',
  },
  {
    term: 'Lookalike',
    definition:
      'Pubblico simile. Gruppo di utenti con caratteristiche affini ai tuoi clienti esistenti, usato per espandere il target.',
    category: 'Advertising',
  },
  {
    term: 'CPA',
    definition:
      'Cost Per Acquisition. Il costo medio sostenuto per acquisire un singolo cliente o conversione.',
    category: 'Advertising',
  },
  {
    term: 'Upselling',
    definition:
      'Tecnica di vendita che propone al cliente un prodotto di fascia superiore rispetto a quello scelto.',
    category: 'Vendita',
  },
  {
    term: 'Cross-selling',
    definition:
      'Tecnica di vendita che suggerisce prodotti complementari a quello che il cliente sta acquistando.',
    category: 'Vendita',
  },
  {
    term: 'Pipeline',
    definition:
      'L\'insieme delle trattative commerciali in corso, organizzate per fase del processo di vendita.',
    category: 'Vendita',
  },
  {
    term: 'Onboarding',
    definition:
      'Il processo di accoglienza e formazione di un nuovo cliente o dipendente per garantire un avvio efficace.',
    category: 'Marketing',
  },
];

const termLookup = new Map(
  glossary.map((entry) => [entry.term.toLowerCase(), entry])
);

export function findTerm(term: string): GlossaryTerm | undefined {
  return termLookup.get(term.toLowerCase());
}

export function getKnownTerms(): string[] {
  return glossary.map((entry) => entry.term);
}
