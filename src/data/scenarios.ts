import { Scenario } from '@/types';

export const scenarios: Scenario[] = [
  {
    id: 'obiezioni-prezzo',
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
