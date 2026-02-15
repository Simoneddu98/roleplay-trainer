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
  {
    id: 'gatekeeper-ostile',
    areaId: 'vendita',
    title: 'Il Gatekeeper Ostile',
    description:
      'Stai cercando di raggiungere il CEO di un\'azienda target per proporre una partnership strategica, ma la segretaria ha il compito di filtrare aggressivamente tutte le chiamate. Devi essere strategico, cortese ma assertivo per superare il blocco senza risultare invadente.',
    category: 'Vendita',
    difficulty: 4,
    icon: 'ShieldAlert',
    xpReward: 200,
    initialMessages: [
      {
        id: 'go-1',
        role: 'system',
        content:
          'Sei un Sales Account Manager di una società di consulenza tecnologica. Stai chiamando la sede di Meridian Group Spa per parlare con l\'Amministratore Delegato, il Dott. Enrico Valenti. La segretaria, Patrizia, è nota per essere estremamente protettiva e filtrare tutte le chiamate con rigore. Non hai un appuntamento e non hai mai parlato direttamente con il Dott. Valenti. Il tuo obiettivo è ottenere almeno un appuntamento telefonico o un incontro.',
        timestamp: Date.now(),
      },
      {
        id: 'go-2',
        role: 'bot',
        content:
          'Meridian Group, buongiorno, sono Patrizia. Mi dica pure. ...Il Dottor Valenti? No, guardi, il Dottore è impegnatissimo, non riceve chiamate senza appuntamento. Di cosa si tratta esattamente? Sa, riceviamo decine di chiamate commerciali al giorno e il Dottore ci ha dato disposizioni molto chiare. Se vuole può inviare una mail a info@meridiangroup.it e valuteremo noi se inoltrare la richiesta. Non le garantisco nulla però.',
        timestamp: Date.now() + 1000,
      },
    ],
  },
  {
    id: 'negoziazione-prezzo',
    areaId: 'vendita',
    title: 'Negoziazione sul Prezzo',
    description:
      'Un cliente storico minaccia di passare alla concorrenza se non ottiene uno sconto del 20% sul rinnovo contrattuale. Devi negoziare con intelligenza, proteggendo i margini aziendali senza perdere un cliente di valore.',
    category: 'Vendita',
    difficulty: 5,
    icon: 'BadgePercent',
    xpReward: 250,
    initialMessages: [
      {
        id: 'np-1',
        role: 'system',
        content:
          'Sei il Key Account Manager di DataFlow Solutions. Sei in riunione con Roberto Marchetti, Direttore Operations di LogiTrans Srl, cliente da 4 anni con un contratto annuale da 85.000€. Il contratto è in scadenza tra 30 giorni e Roberto ha chiesto questo incontro per discutere il rinnovo. Sai che LogiTrans rappresenta il 12% del fatturato della tua divisione e che il margine attuale sul contratto è del 35%. Il tuo responsabile ti ha detto che puoi concedere al massimo il 10% di sconto, ma preferibilmente dovresti difendere il prezzo pieno offrendo valore aggiunto.',
        timestamp: Date.now(),
      },
      {
        id: 'np-2',
        role: 'bot',
        content:
          'Buongiorno. Senta, vado dritto al punto perché non ho molto tempo. Siamo clienti vostri da quattro anni e francamente ci aspettavamo un trattamento migliore. Ho sulla scrivania un\'offerta di NexaCore che ci propone un servizio equivalente al vostro con il 25% in meno. Io vi stimo, abbiamo un buon rapporto, ma alla fine i numeri contano. Se non riuscite a venirmi incontro con almeno un 20% di sconto sul rinnovo, sarò costretto a valutare seriamente la loro proposta. Il mio CFO mi sta addosso sui costi e devo portargli dei risultati concreti. Cosa mi dite?',
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
  {
    id: 'crisi-social-media',
    areaId: 'digital-marketing',
    title: 'Crisi Social Media',
    description:
      'Un influencer con 500K follower ha pubblicato una recensione negativa devastante sul prodotto di punta del brand. Il post sta diventando virale e le menzioni negative stanno esplodendo. Devi elaborare un piano di crisis management immediato e strategico.',
    category: 'Social Media',
    difficulty: 5,
    icon: 'Flame',
    xpReward: 250,
    initialMessages: [
      {
        id: 'csm-1',
        role: 'system',
        content:
          'Sei il Social Media Manager di BellaVita Cosmetics, un brand italiano di cosmetici naturali. Sei stato convocato d\'urgenza in una riunione straordinaria dal CMO, la Dott.ssa Elena Conti. L\'influencer Valentina Ricci (@valericci, 500K follower su Instagram) ha pubblicato un video in cui critica duramente la vostra nuova crema viso "PureGlow", sostenendo che le ha causato una reazione allergica. Il video ha già 200K visualizzazioni in 3 ore e l\'hashtag #PureGlowFail sta entrando in trend. I commenti negativi sotto i vostri post stanno aumentando del 400%.',
        timestamp: Date.now(),
      },
      {
        id: 'csm-2',
        role: 'bot',
        content:
          'Ragazzi, è un disastro. Guardate questi numeri: 200.000 visualizzazioni in tre ore, 3.400 commenti negativi solo sotto il nostro ultimo post, e l\'hashtag #PureGlowFail ha già 8.000 menzioni. Il sentiment negativo è passato dal 5% al 62% in mezza giornata. La Ricci ha 500.000 follower e il video sta venendo ripreso anche da pagine di news. Ho già il CEO che mi chiama ogni dieci minuti. Dobbiamo reagire ADESSO. Cosa facciamo? Rispondiamo pubblicamente? Contattiamo l\'influencer in privato? Tiriamo giù il prodotto? Vi servono massimo trenta minuti per darmi un piano d\'azione concreto. E attenzione: qualsiasi cosa diciamo pubblicamente può peggiorare la situazione se non è calibrata al millimetro.',
        timestamp: Date.now() + 1000,
      },
    ],
  },
  {
    id: 'budget-tagliato',
    areaId: 'digital-marketing',
    title: 'Budget Tagliato',
    description:
      'A metà anno il CFO annuncia un taglio del 40% al budget marketing. Devi riallocare strategicamente i fondi rimanenti tra i diversi canali, giustificando ogni scelta con dati e ragionamento analitico.',
    category: 'Strategy',
    difficulty: 4,
    icon: 'TrendingDown',
    xpReward: 200,
    initialMessages: [
      {
        id: 'bt-1',
        role: 'system',
        content:
          'Sei il Digital Marketing Director di OmniRetail, un e-commerce di elettronica di consumo. Il CFO, Dott. Andrea Ferrara, ha appena annunciato un taglio del 40% al budget marketing per il secondo semestre a causa di un calo imprevisto dei ricavi nel Q1. Il tuo budget attuale è di 300.000€ semestrali, che scenderà a 180.000€. Attualmente lo distribuisci così: Google Ads (35%), Meta Ads (25%), Influencer Marketing (15%), SEO/Content (10%), Email Marketing (8%), TikTok Ads (7%). Sei in riunione con il CFO e la tua team lead, Chiara, per presentare il piano di riallocazione.',
        timestamp: Date.now(),
      },
      {
        id: 'bt-2',
        role: 'bot',
        content:
          'Bene, come sapete la situazione è questa: il board ha deciso un taglio del 40% sul budget marketing per il secondo semestre. Passiamo da 300 a 180 mila euro e non c\'è margine di negoziazione su questo. So che è un colpo duro, ma ho bisogno che mi presentiate un piano di riallocazione realistico entro fine giornata. Voglio capire quali canali mantenete, quali ridimensionate e quali eventualmente eliminate del tutto. E non voglio sentire opinioni: voglio dati. ROAS per canale, costo di acquisizione cliente, tassi di conversione. Se un canale non performa, è il primo a saltare. Ah, e un\'altra cosa: nonostante il taglio, l\'obiettivo di revenue del secondo semestre resta invariato. Quindi dovete fare di più con meno. Da dove cominciamo?',
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
