// ─── Types ───────────────────────────────────────────────────────────────────

export interface DialogLine {
  speaker: 'A' | 'B';
  text: string;
  startFrame: number;
  durationFrames: number;
}

export interface SimulationCharacter {
  image: string;
  fallbackInitials: string;
  fallbackColor: string;
  label: string;
}

export interface SimulationScenario {
  title: string;
  subtitle: string;
  titleGradient: string;
  characterA: SimulationCharacter;
  characterB: SimulationCharacter;
  dialogue: DialogLine[];
  options: {
    prompt: string;
    A: { label: string; description: string };
    B: { label: string; description: string };
  };
  outcomes: {
    A: DialogLine[];
    B: DialogLine[];
  };
  config: {
    fps: number;
    durationInFrames: number;
    width: number;
    height: number;
    pauseAtFrame: number;
    branchGoToFrame: number;
  };
}

// ─── SCENARI ─────────────────────────────────────────────────────────────────

export const SCENARIOS: Record<string, SimulationScenario> = {
  sales: {
    title: 'Simulazione Vendita',
    subtitle: 'Gestione Obiezioni sul Prezzo',
    titleGradient: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    characterA: {
      image: 'characters/manager-neutral.png',
      fallbackInitials: 'TU',
      fallbackColor: '#4f46e5',
      label: 'Tu (Venditore)',
    },
    characterB: {
      image: 'characters/employee-neutral.png',
      fallbackInitials: 'MB',
      fallbackColor: '#6d28d9',
      label: 'Dott. Bianchi',
    },
    dialogue: [
      {
        speaker: 'A',
        text: 'Buongiorno Dott. Bianchi, grazie per aver accettato questo incontro.',
        startFrame: 30,
        durationFrames: 120,
      },
      {
        speaker: 'B',
        text: 'Buongiorno. Ho visto la vostra proposta, ma devo dirvi che il prezzo mi sembra fuori mercato.',
        startFrame: 160,
        durationFrames: 140,
      },
    ],
    options: {
      prompt: 'Il cliente ha sollevato un\'obiezione sul prezzo. Come rispondi?',
      A: {
        label: 'Risposta Strategica (mostra ROI)',
        description: 'Presenti dati concreti per giustificare il prezzo',
      },
      B: {
        label: 'Risposta Empatica (evidenzia supporto)',
        description: 'Enfatizzi il valore aggiunto e il supporto incluso',
      },
    },
    outcomes: {
      A: [
        {
          speaker: 'A',
          text: 'Capisco la sua preoccupazione. Mi permetta di mostrarle il ROI che i nostri clienti ottengono mediamente in 6 mesi.',
          startFrame: 310,
          durationFrames: 150,
        },
        {
          speaker: 'B',
          text: 'Hmm, interessante. Se i numeri sono questi, potremmo rivalutare. Mi mandi un caso studio dettagliato.',
          startFrame: 470,
          durationFrames: 140,
        },
        {
          speaker: 'A',
          text: 'Certamente! Le invio tutto entro domani. Possiamo fissare un follow-up per giovedì?',
          startFrame: 620,
          durationFrames: 130,
        },
      ],
      B: [
        {
          speaker: 'A',
          text: 'Ha ragione, il prezzo è più alto. Ma consideri che include supporto 24/7 e formazione completa per il suo team.',
          startFrame: 310,
          durationFrames: 150,
        },
        {
          speaker: 'B',
          text: 'Il supporto dedicato è un buon punto. I competitor non lo offrono. Quanto dura la formazione?',
          startFrame: 470,
          durationFrames: 140,
        },
        {
          speaker: 'A',
          text: 'Due settimane on-site, poi supporto continuo. Il suo team sarà autonomo in un mese.',
          startFrame: 620,
          durationFrames: 130,
        },
      ],
    },
    config: {
      fps: 30,
      durationInFrames: 780,
      width: 960,
      height: 540,
      pauseAtFrame: 300,
      branchGoToFrame: 310,
    },
  },

  marketing: {
    title: 'Simulazione Digital Marketing',
    subtitle: 'Ottimizzazione Campagna Facebook',
    titleGradient: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
    characterA: {
      image: 'characters/marketer.png',
      fallbackInitials: 'TU',
      fallbackColor: '#7c3aed',
      label: 'Tu (Specialist)',
    },
    characterB: {
      image: 'characters/client-marketing.png',
      fallbackInitials: 'LC',
      fallbackColor: '#db2777',
      label: 'Laura Conti (Cliente)',
    },
    dialogue: [
      {
        speaker: 'B',
        text: 'Ho appena controllato la dashboard: i costi delle Ads sono raddoppiati rispetto alla settimana scorsa! Cosa sta succedendo?',
        startFrame: 30,
        durationFrames: 140,
      },
      {
        speaker: 'A',
        text: 'Sì, ho notato l\'aumento del CPM. Sto analizzando i dati per capire la causa.',
        startFrame: 180,
        durationFrames: 120,
      },
      {
        speaker: 'B',
        text: 'Il mio capo vuole risposte. Secondo te è un problema di Audience o di Creatività? Dobbiamo agire subito.',
        startFrame: 310,
        durationFrames: 140,
      },
    ],
    options: {
      prompt: 'I costi Ads sono raddoppiati. La cliente vuole una soluzione immediata. Qual è la tua diagnosi?',
      A: {
        label: 'Il pubblico è saturo, cambiamo target',
        description: 'Proponi di rinnovare le audience e testare nuovi segmenti',
      },
      B: {
        label: 'La frequenza è alta, cambiamo le creatività',
        description: 'Proponi nuovi visual e copy per combattere l\'ad fatigue',
      },
    },
    outcomes: {
      A: [
        {
          speaker: 'A',
          text: 'Guardando i dati, la frequenza è stabile ma il CTR del nostro target primario è crollato. L\'audience è satura: vedono le nostre ads da 3 settimane.',
          startFrame: 460,
          durationFrames: 160,
        },
        {
          speaker: 'B',
          text: 'Quindi dobbiamo trovare nuove persone? Ma non voglio perdere la qualità dei lead...',
          startFrame: 630,
          durationFrames: 130,
        },
        {
          speaker: 'A',
          text: 'Possiamo creare un Lookalike Audience basato sui migliori clienti e testare un interesse correlato. Budget invariato, pubblico fresco.',
          startFrame: 770,
          durationFrames: 150,
        },
      ],
      B: [
        {
          speaker: 'A',
          text: 'La frequenza è a 4.8: gli utenti hanno visto le ads quasi 5 volte. È ad fatigue classica. Le creatività non attirano più l\'attenzione.',
          startFrame: 460,
          durationFrames: 160,
        },
        {
          speaker: 'B',
          text: 'Ha senso, in effetti usiamo le stesse grafiche da un mese. Cosa proponi?',
          startFrame: 630,
          durationFrames: 130,
        },
        {
          speaker: 'A',
          text: 'Prepariamo 3 nuove varianti: un video breve, un carosello e una testimonial. Facciamo A/B test e in 48 ore avremo i dati.',
          startFrame: 770,
          durationFrames: 150,
        },
      ],
    },
    config: {
      fps: 30,
      durationInFrames: 950,
      width: 960,
      height: 540,
      pauseAtFrame: 450,
      branchGoToFrame: 460,
    },
  },
};
