export interface TriviaQuestion {
  question: string;
  correct: string;
  wrong: string[];
}

const allQuestions: TriviaQuestion[] = [
  // ─── INFORMATICA ─────────────────────────────────────────────────────────
  {
    question: 'Quale linguaggio di programmazione è stato creato da Guido van Rossum nel 1991?',
    correct: 'Python',
    wrong: ['Java', 'Ruby', 'C++'],
  },
  {
    question: 'Cosa significa l\'acronimo HTML?',
    correct: 'HyperText Markup Language',
    wrong: ['High Tech Modern Language', 'Home Tool Markup Language', 'Hyper Transfer Markup Logic'],
  },
  {
    question: 'Qual è la funzione principale di un sistema operativo?',
    correct: 'Gestire le risorse hardware e software del computer',
    wrong: ['Navigare su Internet', 'Creare documenti di testo', 'Proteggere dai virus'],
  },
  {
    question: 'In informatica, cosa rappresenta il sistema binario?',
    correct: 'Un sistema numerico a base 2 (0 e 1)',
    wrong: ['Un sistema a base 10', 'Un tipo di crittografia', 'Un linguaggio di programmazione'],
  },
  {
    question: 'Cosa significa CPU?',
    correct: 'Central Processing Unit',
    wrong: ['Computer Personal Unit', 'Central Program Utility', 'Core Processing Upload'],
  },
  {
    question: 'Quale protocollo viene utilizzato per il trasferimento sicuro di dati sul web?',
    correct: 'HTTPS',
    wrong: ['FTP', 'SMTP', 'TCP'],
  },
  {
    question: 'Cos\'è un algoritmo?',
    correct: 'Una sequenza finita di istruzioni per risolvere un problema',
    wrong: ['Un tipo di virus informatico', 'Un componente hardware', 'Un linguaggio di programmazione'],
  },
  {
    question: 'Quale azienda ha sviluppato il sistema operativo Android?',
    correct: 'Google',
    wrong: ['Apple', 'Microsoft', 'Samsung'],
  },
  {
    question: 'Cosa si intende per "cloud computing"?',
    correct: 'L\'erogazione di servizi informatici tramite Internet',
    wrong: ['Un tipo di previsione meteo digitale', 'Un software per il fotoritocco', 'Un sistema di backup locale'],
  },
  {
    question: 'Qual è la differenza principale tra RAM e ROM?',
    correct: 'La RAM è volatile e riscrivibile, la ROM è permanente',
    wrong: ['La RAM è più lenta della ROM', 'La ROM ha più capacità della RAM', 'Non c\'è differenza'],
  },
  // ─── DIGITAL MARKETING ───────────────────────────────────────────────────
  {
    question: 'Cosa significa SEO nel marketing digitale?',
    correct: 'Search Engine Optimization',
    wrong: ['Social Engagement Online', 'Secure Email Operation', 'System Export Output'],
  },
  {
    question: 'Qual è la metrica che indica la percentuale di utenti che abbandonano un sito dopo aver visto una sola pagina?',
    correct: 'Bounce Rate (Frequenza di rimbalzo)',
    wrong: ['Click-Through Rate', 'Conversion Rate', 'Impression Rate'],
  },
  {
    question: 'Cosa si intende per "funnel di vendita" nel marketing digitale?',
    correct: 'Il percorso che un utente compie da visitatore a cliente',
    wrong: ['Un tipo di pubblicità online', 'Un software per email marketing', 'Un metodo di pagamento digitale'],
  },
  {
    question: 'Quale piattaforma è più indicata per il marketing B2B?',
    correct: 'LinkedIn',
    wrong: ['TikTok', 'Snapchat', 'Pinterest'],
  },
  {
    question: 'Cos\'è il CTA (Call To Action) nel web marketing?',
    correct: 'Un invito esplicito all\'utente a compiere un\'azione specifica',
    wrong: ['Un tipo di annuncio pubblicitario', 'Un sistema di analisi del traffico', 'Un formato di contenuto video'],
  },
  {
    question: 'Cos\'è il "remarketing" (o retargeting)?',
    correct: 'Mostrare annunci a utenti che hanno già visitato il tuo sito',
    wrong: ['Inviare email a nuovi clienti', 'Pubblicare contenuti sui social media', 'Cambiare il nome del brand'],
  },
  {
    question: 'Quale metrica misura il costo per ogni clic su un annuncio pubblicitario?',
    correct: 'CPC (Cost Per Click)',
    wrong: ['CPM (Cost Per Mille)', 'ROI (Return On Investment)', 'CTR (Click-Through Rate)'],
  },
  {
    question: 'Cosa si intende per "content marketing"?',
    correct: 'Creare e distribuire contenuti di valore per attrarre un pubblico definito',
    wrong: ['Vendere contenuti digitali a pagamento', 'Copiare i contenuti dei competitor', 'Pubblicare solo annunci pubblicitari'],
  },
  // ─── INTELLIGENZA ARTIFICIALE ────────────────────────────────────────────
  {
    question: 'Cosa si intende per "Machine Learning"?',
    correct: 'Un sottoinsieme dell\'AI in cui i sistemi imparano dai dati senza essere programmati esplicitamente',
    wrong: ['Un corso online per programmatori', 'Un tipo di hardware per computer', 'Un linguaggio di programmazione'],
  },
  {
    question: 'Cos\'è un "Large Language Model" (LLM)?',
    correct: 'Un modello di AI addestrato su grandi quantità di testo per generare e comprendere il linguaggio',
    wrong: ['Un database di grandi dimensioni', 'Un motore di ricerca avanzato', 'Un sistema operativo per server'],
  },
  {
    question: 'Quale di questi è un esempio di AI generativa?',
    correct: 'ChatGPT',
    wrong: ['Google Maps', 'Microsoft Excel', 'Spotify'],
  },
  {
    question: 'Cosa significa "prompt" nel contesto dell\'intelligenza artificiale?',
    correct: 'L\'istruzione o domanda fornita a un modello AI per ottenere una risposta',
    wrong: ['Un errore del sistema', 'La velocità di elaborazione dell\'AI', 'Un tipo di rete neurale'],
  },
  {
    question: 'Cos\'è il "Natural Language Processing" (NLP)?',
    correct: 'La capacità dell\'AI di comprendere e generare linguaggio umano',
    wrong: ['Un nuovo linguaggio di programmazione', 'Un protocollo di rete', 'Un sistema di crittografia'],
  },
  {
    question: 'Quale rischio è associato all\'uso dell\'AI nella creazione di contenuti?',
    correct: 'La generazione di informazioni false o "allucinazioni"',
    wrong: ['Il consumo eccessivo di batteria', 'L\'incompatibilità con i browser', 'La perdita della connessione WiFi'],
  },
  {
    question: 'Cos\'è una "rete neurale artificiale"?',
    correct: 'Un modello computazionale ispirato al funzionamento del cervello umano',
    wrong: ['Una rete WiFi molto veloce', 'Un social network per scienziati', 'Un cavo in fibra ottica'],
  },
  {
    question: 'Nel contesto AI, cosa significa "fine-tuning"?',
    correct: 'Addestrare ulteriormente un modello pre-esistente su dati specifici per migliorarne le prestazioni',
    wrong: ['Regolare il volume dell\'audio', 'Ottimizzare la velocità di Internet', 'Aggiornare il sistema operativo'],
  },
  {
    question: 'Quale di queste applicazioni NON utilizza tipicamente l\'intelligenza artificiale?',
    correct: 'Una calcolatrice tradizionale',
    wrong: ['Un assistente vocale come Siri', 'Il riconoscimento facciale', 'I suggerimenti di Netflix'],
  },
  {
    question: 'Cos\'è il "deep learning"?',
    correct: 'Una tecnica di Machine Learning basata su reti neurali con molti strati',
    wrong: ['Studiare in modo approfondito', 'Un metodo di backup dei dati', 'Un tipo di connessione Internet'],
  },
];

/** Restituisce 10 domande casuali shufflate dal pool */
export function getRandomQuestions(count: number = 10): TriviaQuestion[] {
  const shuffled = [...allQuestions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}
