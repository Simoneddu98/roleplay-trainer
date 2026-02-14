// ─── Types ───────────────────────────────────────────────────────────────────

export interface TriviaQuestion {
  question: string;
  answers: string[];
  correctIndex: number;
}

export interface TriviaGame {
  id: string;
  title: string;
  description: string;
  questions: TriviaQuestion[];
  passingScore: number; // minimum points to pass
}

// ─── Course Quiz Data ────────────────────────────────────────────────────────

const GAMES: Record<string, TriviaGame> = {
  sales: {
    id: 'sales',
    title: 'Assessment: Vendita & Negoziazione',
    description: 'Verifica le tue conoscenze sulle tecniche di vendita prima di accedere alla simulazione.',
    passingScore: 300,
    questions: [
      {
        question: 'Qual è la prima fase del processo di vendita consultiva?',
        answers: ['Chiusura del contratto', 'Analisi dei bisogni del cliente', 'Presentazione del prezzo', 'Invio del preventivo'],
        correctIndex: 1,
      },
      {
        question: 'Cosa significa "gestire un\'obiezione" nella vendita?',
        answers: ['Ignorare le critiche del cliente', 'Abbassare immediatamente il prezzo', 'Comprendere la preoccupazione e rispondere con valore', 'Cambiare argomento'],
        correctIndex: 2,
      },
      {
        question: 'Cos\'è il ROI in un contesto di vendita B2B?',
        answers: ['Il margine di profitto del venditore', 'Il ritorno sull\'investimento per il cliente', 'Il costo del prodotto', 'Lo sconto massimo applicabile'],
        correctIndex: 1,
      },
      {
        question: 'Quale tecnica di chiusura prevede di dare per scontato l\'acquisto?',
        answers: ['Trial Close', 'Assumptive Close', 'Hard Close', 'Summary Close'],
        correctIndex: 1,
      },
      {
        question: 'Cos\'è l\'upselling?',
        answers: ['Vendere a un prezzo più basso', 'Proporre un prodotto di fascia superiore', 'Vendere prodotti complementari', 'Offrire campioni gratuiti'],
        correctIndex: 1,
      },
    ],
  },
  marketing: {
    id: 'marketing',
    title: 'Assessment: Digital Marketing',
    description: 'Testa le tue competenze in digital marketing e advertising prima della simulazione.',
    passingScore: 300,
    questions: [
      {
        question: 'Cosa misura il CTR (Click-Through Rate)?',
        answers: ['Il costo totale della campagna', 'La percentuale di click su impressioni', 'Il numero di conversioni', 'Il tempo medio sulla pagina'],
        correctIndex: 1,
      },
      {
        question: 'Cos\'è il CPM nella pubblicità digitale?',
        answers: ['Costo Per Minuto', 'Costo Per Mille impressioni', 'Click Per Mese', 'Conversioni Per Messaggio'],
        correctIndex: 1,
      },
      {
        question: 'Cos\'è una Lookalike Audience?',
        answers: ['Un pubblico che ha già acquistato', 'Un pubblico con caratteristiche simili ai tuoi clienti', 'Un pubblico che segue i competitor', 'Un pubblico geograficamente vicino'],
        correctIndex: 1,
      },
      {
        question: 'Cosa indica una frequenza di 5 in una campagna Facebook Ads?',
        answers: ['5 conversioni totali', 'Ogni utente ha visto l\'ad mediamente 5 volte', '5% di CTR', 'La campagna è attiva da 5 giorni'],
        correctIndex: 1,
      },
      {
        question: 'Cos\'è l\'A/B Test nel marketing digitale?',
        answers: ['Testare due canali diversi', 'Confrontare due varianti per vedere quale performa meglio', 'Analizzare due competitor', 'Pubblicare contenuti in due lingue'],
        correctIndex: 1,
      },
    ],
  },
};

// ─── API ─────────────────────────────────────────────────────────────────────

export function fetchGame(gameId: string): TriviaGame | null {
  return GAMES[gameId] ?? null;
}
