// glossary-terms.ts
// Expanded glossary with Oxford Dictionary API integration support.
// This file complements glossary.ts with 34 additional terms.

export interface OxfordGlossaryTerm {
  term: string;
  termIt: string;
  definition: string;
  category: 'Marketing' | 'Vendita' | 'Analytics' | 'Advertising' | 'Digital' | 'Strategy';
  oxfordId: string;
  difficulty: 'base' | 'intermedio' | 'avanzato';
  relatedTerms: string[];
}

export const oxfordGlossary: OxfordGlossaryTerm[] = [
  // ─────────────────────────────────────────────
  //  MARKETING (12 terms)
  // ─────────────────────────────────────────────
  {
    term: 'Brand Awareness',
    termIt: 'Notorieta del marchio',
    definition:
      'Misura il grado di riconoscibilita di un marchio da parte del pubblico target. Un\'elevata brand awareness significa che i consumatori riconoscono e ricordano facilmente il brand, associandolo ai prodotti o servizi che offre. Si costruisce attraverso campagne pubblicitarie, presenza sui social media e strategie di content marketing.',
    category: 'Marketing',
    oxfordId: 'brand-awareness',
    difficulty: 'base',
    relatedTerms: ['Brand Equity', 'Positioning', 'Reach'],
  },
  {
    term: 'Content Marketing',
    termIt: 'Marketing dei contenuti',
    definition:
      'Strategia di marketing focalizzata sulla creazione e distribuzione di contenuti di valore, rilevanti e coerenti, con l\'obiettivo di attrarre e fidelizzare un pubblico definito. Include blog, video, podcast, infografiche e white paper. A differenza della pubblicita tradizionale, il content marketing educa e intrattiene prima di vendere.',
    category: 'Marketing',
    oxfordId: 'content-marketing',
    difficulty: 'base',
    relatedTerms: ['Inbound Marketing', 'Storytelling', 'SEO'],
  },
  {
    term: 'Inbound Marketing',
    termIt: 'Marketing in entrata',
    definition:
      'Metodologia che attrae i clienti attraverso contenuti utili e interazioni personalizzate, anziche interromperli con messaggi pubblicitari non richiesti. Si basa su quattro fasi: attrarre, convertire, chiudere e fidelizzare. Utilizza strumenti come blog, SEO, social media e email marketing per creare un percorso naturale verso l\'acquisto.',
    category: 'Strategy',
    oxfordId: 'inbound-marketing',
    difficulty: 'intermedio',
    relatedTerms: ['Content Marketing', 'Outbound Marketing', 'Lead Qualification'],
  },
  {
    term: 'Outbound Marketing',
    termIt: 'Marketing in uscita',
    definition:
      'Approccio di marketing tradizionale in cui l\'azienda avvia il contatto con il potenziale cliente attraverso canali come pubblicita televisiva, chiamate a freddo, email di massa e fiere. A differenza dell\'inbound, l\'outbound cerca attivamente il cliente piuttosto che attendere che sia lui a farsi avanti.',
    category: 'Strategy',
    oxfordId: 'outbound-marketing',
    difficulty: 'intermedio',
    relatedTerms: ['Inbound Marketing', 'Cold Calling', 'Prospecting'],
  },
  {
    term: 'Buyer Persona',
    termIt: 'Profilo del cliente ideale',
    definition:
      'Rappresentazione semi-fittizia del cliente ideale, basata su dati reali e ricerche di mercato. Include informazioni demografiche, comportamentali, motivazioni, obiettivi e sfide. Creare buyer persona accurate consente di personalizzare messaggi di marketing, contenuti e strategie di vendita per i diversi segmenti di pubblico.',
    category: 'Strategy',
    oxfordId: 'buyer-persona',
    difficulty: 'intermedio',
    relatedTerms: ['Market Segmentation', 'Value Proposition', 'B2C'],
  },
  {
    term: 'Market Segmentation',
    termIt: 'Segmentazione di mercato',
    definition:
      'Processo di suddivisione del mercato in gruppi omogenei di consumatori (segmenti) che condividono caratteristiche simili come eta, reddito, comportamento d\'acquisto o posizione geografica. Permette alle aziende di concentrare le risorse sui segmenti piu redditizi e di creare campagne mirate con maggiore efficacia.',
    category: 'Strategy',
    oxfordId: 'market-segmentation',
    difficulty: 'intermedio',
    relatedTerms: ['Buyer Persona', 'Positioning', 'Value Proposition'],
  },
  {
    term: 'Value Proposition',
    termIt: 'Proposta di valore',
    definition:
      'Dichiarazione chiara che spiega come il prodotto o servizio risolve un problema del cliente, quali benefici offre e perche il cliente dovrebbe sceglierlo rispetto alla concorrenza. Una value proposition efficace e specifica, misurabile e comunica un vantaggio unico in modo immediato.',
    category: 'Strategy',
    oxfordId: 'value-proposition',
    difficulty: 'intermedio',
    relatedTerms: ['Positioning', 'Buyer Persona', 'Sales Pitch'],
  },
  {
    term: 'Positioning',
    termIt: 'Posizionamento',
    definition:
      'Strategia che definisce come un brand o prodotto vuole essere percepito nella mente dei consumatori rispetto ai concorrenti. Il posizionamento si basa su attributi distintivi come qualita, prezzo, innovazione o servizio clienti e guida tutte le decisioni di comunicazione e marketing dell\'azienda.',
    category: 'Strategy',
    oxfordId: 'positioning',
    difficulty: 'avanzato',
    relatedTerms: ['Brand Awareness', 'Value Proposition', 'Brand Equity'],
  },
  {
    term: 'Growth Hacking',
    termIt: 'Crescita rapida con metodi non convenzionali',
    definition:
      'Approccio al marketing focalizzato sulla crescita rapida e scalabile, tipico delle startup. Combina creativita, analisi dei dati e sperimentazione continua per identificare le strategie piu efficaci di acquisizione e fidelizzazione clienti. Utilizza tecniche come programmi referral, loop virali, test A/B intensivi e automazione.',
    category: 'Marketing',
    oxfordId: 'growth-hacking',
    difficulty: 'avanzato',
    relatedTerms: ['Viral Marketing', 'A/B Test', 'Cohort Analysis'],
  },
  {
    term: 'Viral Marketing',
    termIt: 'Marketing virale',
    definition:
      'Strategia che incentiva le persone a condividere un messaggio di marketing con altri, creando una crescita esponenziale della visibilita. Il contenuto virale si diffonde spontaneamente attraverso passaparola, social media e piattaforme digitali. Il successo dipende dall\'impatto emotivo, dalla facilita di condivisione e dal tempismo.',
    category: 'Marketing',
    oxfordId: 'viral-marketing',
    difficulty: 'base',
    relatedTerms: ['Growth Hacking', 'Brand Awareness', 'Storytelling'],
  },
  {
    term: 'Brand Equity',
    termIt: 'Valore del marchio',
    definition:
      'Il valore aggiunto che un marchio conferisce a un prodotto o servizio rispetto a un equivalente senza marchio. Si compone di notorieta, qualita percepita, associazioni di marca e fedelta dei clienti. Un\'elevata brand equity consente di praticare prezzi premium e facilita l\'introduzione di nuovi prodotti sul mercato.',
    category: 'Marketing',
    oxfordId: 'brand-equity',
    difficulty: 'avanzato',
    relatedTerms: ['Brand Awareness', 'Positioning', 'Customer Lifetime Value'],
  },
  {
    term: 'Storytelling',
    termIt: 'Narrazione d\'impresa',
    definition:
      'Tecnica di comunicazione che utilizza la struttura narrativa per trasmettere i valori, la missione e l\'identita di un brand. Attraverso storie autentiche e coinvolgenti, le aziende creano connessioni emotive con il pubblico, rendendo i messaggi piu memorabili e persuasivi rispetto alla comunicazione puramente informativa.',
    category: 'Marketing',
    oxfordId: 'storytelling',
    difficulty: 'base',
    relatedTerms: ['Content Marketing', 'Brand Awareness', 'Viral Marketing'],
  },

  // ─────────────────────────────────────────────
  //  VENDITA (12 terms)
  // ─────────────────────────────────────────────
  {
    term: 'Cold Calling',
    termIt: 'Chiamata a freddo',
    definition:
      'Tecnica di vendita che consiste nel contattare telefonicamente potenziali clienti senza un precedente rapporto o interesse espresso. Richiede capacita di gestione delle obiezioni, una proposta di valore chiara e la capacita di catturare l\'attenzione nei primi secondi della conversazione. Spesso usata nel B2B per generare nuovi contatti.',
    category: 'Vendita',
    oxfordId: 'cold-calling',
    difficulty: 'base',
    relatedTerms: ['Prospecting', 'Gatekeeper', 'Objection Handling'],
  },
  {
    term: 'Lead Qualification',
    termIt: 'Qualificazione del contatto',
    definition:
      'Processo di valutazione di un lead per determinare se possiede le caratteristiche necessarie per diventare un cliente effettivo. Si analizzano criteri come budget disponibile, autorita decisionale, necessita reale del prodotto e tempistiche d\'acquisto (framework BANT). Consente al team di vendita di concentrarsi sui prospect piu promettenti.',
    category: 'Vendita',
    oxfordId: 'lead-qualification',
    difficulty: 'intermedio',
    relatedTerms: ['Prospecting', 'Discovery Call', 'SPIN Selling'],
  },
  {
    term: 'Closing',
    termIt: 'Chiusura della vendita',
    definition:
      'Fase finale del processo di vendita in cui il venditore ottiene l\'impegno formale del cliente all\'acquisto. Esistono diverse tecniche di closing: la chiusura presuntiva, la chiusura per alternativa, la chiusura con urgenza e la chiusura con riepilogo dei benefici. Richiede capacita di leggere i segnali d\'acquisto e gestire le ultime obiezioni.',
    category: 'Vendita',
    oxfordId: 'closing',
    difficulty: 'base',
    relatedTerms: ['Objection Handling', 'Sales Pitch', 'Win Rate'],
  },
  {
    term: 'Gatekeeper',
    termIt: 'Filtro aziendale',
    definition:
      'Persona all\'interno di un\'organizzazione (spesso un assistente, un receptionist o un responsabile) che controlla l\'accesso ai decision maker. Nel contesto delle vendite B2B, superare il gatekeeper e fondamentale per raggiungere chi ha il potere decisionale. Richiede approcci rispettosi, messaggi di valore concisi e la costruzione di un rapporto di fiducia.',
    category: 'Vendita',
    oxfordId: 'gatekeeper',
    difficulty: 'intermedio',
    relatedTerms: ['Cold Calling', 'B2B', 'Prospecting'],
  },
  {
    term: 'SPIN Selling',
    termIt: 'Vendita SPIN',
    definition:
      'Metodologia di vendita sviluppata da Neil Rackham basata su quattro tipologie di domande: Situation (situazione attuale), Problem (problemi riscontrati), Implication (implicazioni dei problemi) e Need-payoff (benefici della soluzione). Particolarmente efficace nelle vendite complesse e di alto valore, dove la comprensione profonda del cliente e determinante.',
    category: 'Vendita',
    oxfordId: 'spin-selling',
    difficulty: 'avanzato',
    relatedTerms: ['Lead Qualification', 'Discovery Call', 'Objection Handling'],
  },
  {
    term: 'Objection Handling',
    termIt: 'Gestione delle obiezioni',
    definition:
      'Competenza fondamentale nella vendita che consiste nel rispondere in modo efficace alle preoccupazioni, ai dubbi e alle resistenze espresse dal potenziale cliente. Le obiezioni piu comuni riguardano prezzo, tempistica, concorrenza e necessita. Un buon venditore accoglie le obiezioni come opportunita per approfondire le esigenze del cliente e rafforzare la proposta di valore.',
    category: 'Vendita',
    oxfordId: 'objection-handling',
    difficulty: 'intermedio',
    relatedTerms: ['Closing', 'SPIN Selling', 'Sales Pitch'],
  },
  {
    term: 'Sales Pitch',
    termIt: 'Presentazione di vendita',
    definition:
      'Presentazione concisa e persuasiva di un prodotto o servizio rivolta a un potenziale cliente. Un sales pitch efficace si concentra sui benefici per il cliente piuttosto che sulle caratteristiche tecniche, racconta una storia convincente e include una call to action chiara. Puo variare dall\'elevator pitch di 30 secondi alla presentazione formale strutturata.',
    category: 'Vendita',
    oxfordId: 'sales-pitch',
    difficulty: 'base',
    relatedTerms: ['Value Proposition', 'Closing', 'Objection Handling'],
  },
  {
    term: 'B2B',
    termIt: 'Business to Business',
    definition:
      'Modello di business in cui un\'azienda vende prodotti o servizi ad altre aziende anziche al consumatore finale. Le vendite B2B si caratterizzano per cicli di vendita piu lunghi, decisioni d\'acquisto razionali, coinvolgimento di piu stakeholder e valori medi degli ordini generalmente superiori rispetto al B2C. Esempi includono software enterprise, consulenza e forniture industriali.',
    category: 'Vendita',
    oxfordId: 'b2b',
    difficulty: 'base',
    relatedTerms: ['B2C', 'Account Management', 'Gatekeeper'],
  },
  {
    term: 'B2C',
    termIt: 'Business to Consumer',
    definition:
      'Modello di business in cui un\'azienda vende direttamente al consumatore finale. Le vendite B2C si distinguono per cicli d\'acquisto piu brevi, decisioni spesso emotive, volumi elevati e importanza dell\'esperienza utente. Le strategie di marketing B2C puntano su brand awareness, pricing competitivo e facilita d\'acquisto attraverso canali fisici e digitali.',
    category: 'Vendita',
    oxfordId: 'b2c',
    difficulty: 'base',
    relatedTerms: ['B2B', 'Buyer Persona', 'Brand Awareness'],
  },
  {
    term: 'Account Management',
    termIt: 'Gestione dei clienti strategici',
    definition:
      'Funzione aziendale dedicata alla cura e allo sviluppo delle relazioni con i clienti esistenti, in particolare quelli di maggior valore. L\'account manager funge da punto di contatto principale, identifica opportunita di upselling e cross-selling, risolve eventuali problemi e lavora per massimizzare la soddisfazione e la retention del cliente nel lungo periodo.',
    category: 'Vendita',
    oxfordId: 'account-management',
    difficulty: 'intermedio',
    relatedTerms: ['Customer Lifetime Value', 'B2B', 'Follow-up'],
  },
  {
    term: 'Prospecting',
    termIt: 'Ricerca di potenziali clienti',
    definition:
      'Attivita sistematica di identificazione e contatto di nuovi potenziali clienti. Include la ricerca su LinkedIn, la partecipazione a eventi di settore, il networking, le referenze e l\'analisi di database aziendali. Un prospecting efficace richiede la definizione del profilo cliente ideale, la personalizzazione dell\'approccio e un follow-up costante.',
    category: 'Vendita',
    oxfordId: 'prospecting',
    difficulty: 'base',
    relatedTerms: ['Cold Calling', 'Lead Qualification', 'Discovery Call'],
  },
  {
    term: 'Discovery Call',
    termIt: 'Chiamata esplorativa',
    definition:
      'Prima conversazione strutturata tra venditore e potenziale cliente, il cui obiettivo principale e comprendere le esigenze, le sfide e gli obiettivi del prospect. Durante la discovery call il venditore raccoglie informazioni cruciali per qualificare il lead e personalizzare la proposta commerciale. Si distingue dalla chiamata a freddo perche il contatto ha gia mostrato un interesse iniziale.',
    category: 'Vendita',
    oxfordId: 'discovery-call',
    difficulty: 'intermedio',
    relatedTerms: ['Lead Qualification', 'SPIN Selling', 'Prospecting'],
  },

  // ─────────────────────────────────────────────
  //  ANALYTICS / DIGITAL (10 terms)
  // ─────────────────────────────────────────────
  {
    term: 'SEO',
    termIt: 'Ottimizzazione per i motori di ricerca',
    definition:
      'Search Engine Optimization. Insieme di tecniche e strategie volte a migliorare la visibilita e il posizionamento di un sito web nei risultati organici (non a pagamento) dei motori di ricerca. Comprende ottimizzazione on-page (contenuti, meta tag, struttura URL), off-page (backlink, autorita di dominio) e tecnica (velocita, mobile-friendliness, indicizzazione).',
    category: 'Digital',
    oxfordId: 'seo',
    difficulty: 'base',
    relatedTerms: ['SEM', 'SERP', 'Backlink', 'Organic Traffic'],
  },
  {
    term: 'SEM',
    termIt: 'Marketing sui motori di ricerca',
    definition:
      'Search Engine Marketing. Strategia di marketing digitale che utilizza la pubblicita a pagamento sui motori di ricerca (come Google Ads) per aumentare la visibilita di un sito web nelle pagine dei risultati. A differenza della SEO, il SEM produce risultati immediati ma richiede un budget continuo. Include campagne PPC, annunci display e remarketing.',
    category: 'Digital',
    oxfordId: 'sem',
    difficulty: 'intermedio',
    relatedTerms: ['SEO', 'PPC', 'SERP'],
  },
  {
    term: 'PPC',
    termIt: 'Pagamento per clic',
    definition:
      'Pay Per Click. Modello pubblicitario in cui l\'inserzionista paga una tariffa ogni volta che un utente clicca sul suo annuncio. E il modello alla base di Google Ads, Meta Ads e altre piattaforme pubblicitarie. Il costo per clic dipende dalla competitivita della keyword, dal quality score dell\'annuncio e dal budget impostato.',
    category: 'Advertising',
    oxfordId: 'ppc',
    difficulty: 'base',
    relatedTerms: ['SEM', 'CTR', 'CPA'],
  },
  {
    term: 'SERP',
    termIt: 'Pagina dei risultati di ricerca',
    definition:
      'Search Engine Results Page. La pagina visualizzata da un motore di ricerca in risposta a una query dell\'utente. Comprende risultati organici, annunci a pagamento, featured snippet, knowledge panel, risultati locali e altri elementi. Comprendere la struttura della SERP e essenziale per ottimizzare sia le strategie SEO che SEM.',
    category: 'Digital',
    oxfordId: 'serp',
    difficulty: 'intermedio',
    relatedTerms: ['SEO', 'SEM', 'Organic Traffic'],
  },
  {
    term: 'Backlink',
    termIt: 'Collegamento in entrata',
    definition:
      'Link proveniente da un sito web esterno che punta verso il tuo sito. I backlink sono uno dei fattori di ranking piu importanti per i motori di ricerca: un numero elevato di backlink di qualita segnala autorita e affidabilita. La link building, ovvero l\'acquisizione strategica di backlink, e una componente fondamentale della SEO off-page.',
    category: 'Digital',
    oxfordId: 'backlink',
    difficulty: 'intermedio',
    relatedTerms: ['SEO', 'Domain Authority', 'Organic Traffic'],
  },
  {
    term: 'Domain Authority',
    termIt: 'Autorita di dominio',
    definition:
      'Punteggio predittivo (da 1 a 100) sviluppato da Moz che stima la probabilita di un sito web di posizionarsi nelle pagine dei risultati dei motori di ricerca. Si basa su fattori come il numero e la qualita dei backlink, l\'eta del dominio e la rilevanza dei contenuti. Un\'elevata domain authority indica un sito web autorevole e affidabile.',
    category: 'Digital',
    oxfordId: 'domain-authority',
    difficulty: 'avanzato',
    relatedTerms: ['Backlink', 'SEO', 'SERP'],
  },
  {
    term: 'Organic Traffic',
    termIt: 'Traffico organico',
    definition:
      'Visitatori che raggiungono un sito web attraverso i risultati non a pagamento dei motori di ricerca. Il traffico organico e considerato di alta qualita perche proviene da utenti che cercano attivamente informazioni, prodotti o servizi correlati. Aumentare il traffico organico richiede una strategia SEO solida, contenuti di valore e un\'esperienza utente ottimale.',
    category: 'Analytics',
    oxfordId: 'organic-traffic',
    difficulty: 'base',
    relatedTerms: ['SEO', 'SERP', 'Impression'],
  },
  {
    term: 'Attribution Model',
    termIt: 'Modello di attribuzione',
    definition:
      'Framework analitico che assegna il merito di una conversione ai diversi touchpoint (punti di contatto) nel percorso del cliente. Esistono modelli come last-click (tutto il merito all\'ultimo clic), first-click (al primo contatto), lineare (distribuito equamente) e basato sulla posizione. La scelta del modello influenza significativamente l\'allocazione del budget marketing.',
    category: 'Analytics',
    oxfordId: 'attribution-model',
    difficulty: 'avanzato',
    relatedTerms: ['Customer Lifetime Value', 'Cohort Analysis', 'Heatmap'],
  },
  {
    term: 'Customer Lifetime Value',
    termIt: 'Valore del ciclo di vita del cliente',
    definition:
      'Metrica che stima il ricavo totale che un\'azienda puo aspettarsi da un singolo cliente durante l\'intera durata della relazione commerciale. Si calcola considerando il valore medio degli acquisti, la frequenza d\'acquisto e la durata media della relazione. Il CLV e fondamentale per determinare quanto investire nell\'acquisizione e nella fidelizzazione dei clienti.',
    category: 'Analytics',
    oxfordId: 'customer-lifetime-value',
    difficulty: 'avanzato',
    relatedTerms: ['Account Management', 'Net Promoter Score', 'Brand Equity'],
  },
  {
    term: 'Net Promoter Score',
    termIt: 'Indice di raccomandazione del cliente',
    definition:
      'Metrica di fidelizzazione che misura la probabilita che i clienti raccomandino un\'azienda, un prodotto o un servizio ad altri. Si basa su una singola domanda: "Su una scala da 0 a 10, quanto e probabile che ci raccomandi?". I rispondenti si classificano in promotori (9-10), passivi (7-8) e detrattori (0-6). Il punteggio NPS varia da -100 a +100.',
    category: 'Analytics',
    oxfordId: 'net-promoter-score',
    difficulty: 'intermedio',
    relatedTerms: ['Customer Lifetime Value', 'Cohort Analysis', 'Account Management'],
  },
];

// ─────────────────────────────────────────────
//  Utility functions
// ─────────────────────────────────────────────

type OxfordCategory = OxfordGlossaryTerm['category'];
type OxfordDifficulty = OxfordGlossaryTerm['difficulty'];

/**
 * Returns all terms belonging to the specified category.
 */
export function getTermsByCategory(category: OxfordCategory): OxfordGlossaryTerm[] {
  return oxfordGlossary.filter((t) => t.category === category);
}

/**
 * Returns all terms at the specified difficulty level.
 */
export function getTermsByDifficulty(difficulty: OxfordDifficulty): OxfordGlossaryTerm[] {
  return oxfordGlossary.filter((t) => t.difficulty === difficulty);
}

/**
 * Searches terms by matching the query against `term`, `termIt`, and `definition`
 * (case-insensitive).
 */
export function searchTerms(query: string): OxfordGlossaryTerm[] {
  const q = query.toLowerCase();
  return oxfordGlossary.filter(
    (t) =>
      t.term.toLowerCase().includes(q) ||
      t.termIt.toLowerCase().includes(q) ||
      t.definition.toLowerCase().includes(q),
  );
}

/**
 * Returns the `oxfordId` for a given term string, or `undefined` if not found.
 * Useful for constructing Oxford Dictionary API request URLs.
 */
export function getTermForOxford(term: string): string | undefined {
  const entry = oxfordGlossary.find(
    (t) => t.term.toLowerCase() === term.toLowerCase(),
  );
  return entry?.oxfordId;
}
