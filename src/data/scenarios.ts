import { Scenario } from '@/types';

// ─── AREA VENDITA ────────────────────────────────────────────────────────────

export const venditaScenarios: Scenario[] = [
  {
    id: 'obiezioni-prezzo',
    areaId: 'vendita',
    title: 'Gestione Obiezioni sul Prezzo',
    description:
      'Un cliente importante mette in discussione il costo della tua proposta. Devi difendere il valore del servizio senza compromettere la relazione commerciale.',
    category: 'Vendita',
    difficulty: 3,
    icon: 'HandCoins',
    xpReward: 150,
    initialMessages: [
      {
        id: 'op-1',
        role: 'system',
        content:
          'Sei in una call con Marco Bianchi, Direttore Acquisti di TechVision Srl. Hai appena presentato la proposta commerciale per il nuovo software gestionale.',
        timestamp: Date.now(),
      },
      {
        id: 'op-2',
        role: 'bot',
        content:
          'Grazie per la presentazione, devo essere onesto: il prezzo è decisamente più alto rispetto alla concorrenza. Ho ricevuto un\'offerta da un vostro competitor che è quasi il 30% in meno. Mi spiegate perché dovrei scegliere voi?',
        timestamp: Date.now() + 1000,
      },
    ],
  },
  {
    id: 'feedback-correttivo',
    areaId: 'vendita',
    title: 'Feedback Correttivo a un Collaboratore',
    description:
      'Un membro del tuo team ha consegnato un progetto in ritardo e con errori significativi. Devi fornire un feedback costruttivo senza demotivarlo.',
    category: 'Leadership',
    difficulty: 4,
    icon: 'MessageSquareWarning',
    xpReward: 200,
    initialMessages: [
      {
        id: 'fc-1',
        role: 'system',
        content:
          'Sei il Team Lead del reparto Marketing. Hai convocato Giulia Rossi, Junior Marketing Specialist, per discutere del report trimestrale consegnato con 5 giorni di ritardo e con dati inesatti.',
        timestamp: Date.now(),
      },
      {
        id: 'fc-2',
        role: 'bot',
        content:
          'Ciao, mi hai chiesto di passare... volevo dirti che mi dispiace per il ritardo del report, è stato un periodo complicato. Comunque pensavo fosse andato bene, no? Ho lavorato fino a tardi per finirlo.',
        timestamp: Date.now() + 1000,
      },
    ],
  },
  {
    id: 'onboarding-nuovo-assunto',
    areaId: 'vendita',
    title: 'Onboarding Nuovo Assunto',
    description:
      'È il primo giorno di un nuovo collega nel tuo team. Devi farlo sentire accolto, spiegargli la cultura aziendale e impostare le prime settimane di lavoro.',
    category: 'HR',
    difficulty: 2,
    icon: 'UserPlus',
    xpReward: 100,
    initialMessages: [
      {
        id: 'on-1',
        role: 'system',
        content:
          'Sei il Responsabile del team Sviluppo. Oggi è il primo giorno di Alessandro Verdi, neolaureato in Informatica. Lo incontri nella sala riunioni per il welcome meeting.',
        timestamp: Date.now(),
      },
      {
        id: 'on-2',
        role: 'bot',
        content:
          'Buongiorno! Sono Alessandro, oggi è il mio primo giorno e sono un po\' emozionato a dire il vero. Non so bene da dove iniziare... come funziona qui? Devo installare qualcosa sul PC?',
        timestamp: Date.now() + 1000,
      },
    ],
  },
];

// ─── AREA DIGITAL MARKETING & AI ────────────────────────────────────────────

export const digitalMarketingScenarios: Scenario[] = [
  {
    id: 'strategia-social-cliente',
    areaId: 'digital-marketing',
    title: 'Strategia Social per un Cliente',
    description:
      'Un imprenditore locale ti chiede di impostare la strategia social media per il suo ristorante. Devi capire i suoi obiettivi e proporre un piano editoriale realistico.',
    category: 'Social Media',
    difficulty: 2,
    icon: 'Share2',
    xpReward: 120,
    initialMessages: [
      {
        id: 'ss-1',
        role: 'system',
        content:
          'Sei un consulente di digital marketing. Il tuo cliente, Luca Ferretti, possiede la trattoria "Da Luca" a Milano. Vi incontrate per definire la strategia social.',
        timestamp: Date.now(),
      },
      {
        id: 'ss-2',
        role: 'bot',
        content:
          'Buongiorno! Allora, io ho Instagram ma lo uso poco, e Facebook credo sia morto, no? Un mio amico dice che dovrei fare TikTok... Ma non so nemmeno da dove cominciare. Cosa mi consigliate? Ho un budget di circa 500 euro al mese.',
        timestamp: Date.now() + 1000,
      },
    ],
  },
  {
    id: 'campagna-ai-ads',
    areaId: 'digital-marketing',
    title: 'Campagna Ads con AI',
    description:
      'Il tuo responsabile ti chiede di presentare come l\'AI può ottimizzare le campagne pubblicitarie online. Devi spiegarlo a un team con poca esperienza tecnica.',
    category: 'AI',
    difficulty: 3,
    icon: 'Bot',
    xpReward: 180,
    initialMessages: [
      {
        id: 'ca-1',
        role: 'system',
        content:
          'Sei il Digital Marketing Manager di un\'agenzia. Durante il meeting settimanale, la tua collega Sara, Account Manager, ti chiede di spiegare al team come usare l\'AI per le campagne.',
        timestamp: Date.now(),
      },
      {
        id: 'ca-2',
        role: 'bot',
        content:
          'Senti, il cliente GreenwayTech vuole migliorare le performance delle campagne Google Ads ma non vuole spendere di più. Mi hanno detto che con l\'intelligenza artificiale si possono ottimizzare i risultati... Ma concretamente come funziona? Puoi spiegarmelo così lo presento al cliente domani?',
        timestamp: Date.now() + 1000,
      },
    ],
  },
  {
    id: 'content-strategy-startup',
    areaId: 'digital-marketing',
    title: 'Content Strategy per una Startup',
    description:
      'Una startup tech ti chiede di creare una strategia di contenuti per aumentare la brand awareness. Devi bilanciare creatività, SEO e risorse limitate.',
    category: 'Content Strategy',
    difficulty: 4,
    icon: 'PenTool',
    xpReward: 200,
    initialMessages: [
      {
        id: 'cs-1',
        role: 'system',
        content:
          'Sei un Content Strategist freelance. La CEO di NovaTech, una startup SaaS B2B per la gestione HR, ti ha contattato per definire la content strategy del prossimo trimestre.',
        timestamp: Date.now(),
      },
      {
        id: 'cs-2',
        role: 'bot',
        content:
          'Ciao! Noi abbiamo un blog ma nessuno lo legge, e il nostro LinkedIn ha 200 follower. Il nostro competitor principale ha una newsletter con 10.000 iscritti. Come facciamo a recuperare? Il team è piccolo: io, un dev e un designer part-time. Abbiamo bisogno di risultati entro 3 mesi.',
        timestamp: Date.now() + 1000,
      },
    ],
  },
];

// ─── ALL SCENARIOS (per lookup globale) ──────────────────────────────────────

export const allScenarios: Scenario[] = [
  ...venditaScenarios,
  ...digitalMarketingScenarios,
];

export function getScenariosByArea(areaId: string): Scenario[] {
  return allScenarios.filter((s) => s.areaId === areaId);
}
