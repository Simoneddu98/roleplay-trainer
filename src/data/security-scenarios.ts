import { Scenario } from '@/types';

// ─── ISO 9001:2015 - QUALITÀ ─────────────────────────────────────────────────

export const iso9001Scenarios: Scenario[] = [
  {
    id: 'audit-interno-iso9001',
    areaId: 'iso-9001',
    title: 'Audit Interno ISO 9001',
    description:
      'Sei un auditor interno e devi condurre un audit di processo su un responsabile di reparto difensivo che tende a minimizzare le criticità.',
    category: 'Audit',
    difficulty: 4,
    icon: 'ClipboardCheck',
    xpReward: 200,
    initialMessages: [
      {
        id: 'ai9001-1',
        role: 'system',
        content:
          'Sei un auditor interno qualificato ISO 9001:2015. Stai conducendo un audit di seconda parte sul processo di gestione degli ordini presso il reparto commerciale. Il responsabile del processo, Ing. Franco Mazzini, è noto per essere molto difensivo e per minimizzare le non conformità. Devi verificare la conformità del processo rispetto alla procedura PQ-07 "Gestione Ordini Cliente", controllando in particolare la registrazione degli ordini, la revisione dei requisiti del cliente e la gestione delle modifiche contrattuali. Hai già riscontrato che 3 ordini su 10 campionati non hanno evidenza della revisione dei requisiti del cliente.',
        timestamp: Date.now(),
      },
      {
        id: 'ai9001-2',
        role: 'bot',
        content:
          'Buongiorno, si accomodi. Guardi, ho poco tempo perché abbiamo una consegna urgente da gestire. Comunque il nostro reparto funziona benissimo, i clienti sono soddisfatti e non abbiamo mai avuto reclami gravi. La procedura? Sì, certo che la seguiamo, è solo che a volte con le urgenze non c\'è tempo di compilare ogni singolo modulo. Ma il risultato finale è sempre corretto, questo è quello che conta, no?',
        timestamp: Date.now() + 1000,
      },
    ],
  },
  {
    id: 'gestione-non-conformita-9001',
    areaId: 'iso-9001',
    title: 'Gestione Non Conformità',
    description:
      'Durante un audit è emersa una non conformità maggiore nel processo produttivo. Devi gestirla seguendo il ciclo PDCA e coinvolgendo i responsabili.',
    category: 'Qualità',
    difficulty: 4,
    icon: 'AlertTriangle',
    xpReward: 200,
    initialMessages: [
      {
        id: 'gnc9001-1',
        role: 'system',
        content:
          'Sei il Responsabile Qualità di un\'azienda manifatturiera certificata ISO 9001:2015. Durante l\'audit interno di ieri è stata rilevata una non conformità maggiore: il processo di taratura degli strumenti di misura non è stato eseguito secondo la procedura PQ-12 per gli ultimi 6 mesi. Questo potrebbe aver compromesso l\'affidabilità delle misurazioni su 3 lotti di produzione. Sei in riunione con il Responsabile di Produzione, Dott. Sergio Parenti, per discutere le azioni correttive. Il prossimo audit di certificazione dell\'ente è tra 2 mesi.',
        timestamp: Date.now(),
      },
      {
        id: 'gnc9001-2',
        role: 'bot',
        content:
          'Senta, io capisco che sulla carta la taratura non è stata fatta nei tempi previsti, ma i nostri operatori controllano gli strumenti ogni mattina a occhio e non hanno mai notato nulla di strano. Secondo me è un problema documentale, non reale. E poi adesso con la produzione che abbiamo, non posso fermare le linee per fare le tarature. Possiamo rimandare dopo il picco di ordini di marzo?',
        timestamp: Date.now() + 1000,
      },
    ],
  },
];

// ─── ISO 14001:2015 - AMBIENTE ────────────────────────────────────────────────

export const iso14001Scenarios: Scenario[] = [
  {
    id: 'audit-ambientale-14001',
    areaId: 'iso-14001',
    title: 'Audit Ambientale',
    description:
      'Conduci un audit ambientale verificando la gestione degli aspetti ambientali significativi e la conformità alle prescrizioni legali applicabili.',
    category: 'Ambiente',
    difficulty: 4,
    icon: 'Leaf',
    xpReward: 200,
    initialMessages: [
      {
        id: 'aa14001-1',
        role: 'system',
        content:
          'Sei un auditor ambientale qualificato ISO 14001:2015. Stai conducendo un audit presso lo stabilimento produttivo di ChemPlast Srl, azienda che produce componenti in plastica. Devi verificare la gestione degli aspetti ambientali significativi, in particolare: emissioni in atmosfera dal reparto stampaggio, gestione dei rifiuti speciali (scarti di lavorazione e solventi), e scarichi idrici dal reparto lavaggio. Il Responsabile HSE, Dott.ssa Maria Conti, ti accompagna nel sopralluogo. Hai notato che il registro di carico/scarico rifiuti presenta alcune lacune e che i filtri dell\'impianto di abbattimento fumi non hanno documentazione di manutenzione recente.',
        timestamp: Date.now(),
      },
      {
        id: 'aa14001-2',
        role: 'bot',
        content:
          'Benvenuto nel nostro stabilimento. Come può vedere, abbiamo investito molto nell\'impianto di abbattimento delle emissioni, è stato installato l\'anno scorso. Per quanto riguarda i rifiuti, abbiamo un\'area di stoccaggio dedicata nel piazzale esterno. Il registro... sì, ammetto che ultimamente il magazziniere che se ne occupa è stato in malattia e qualche registrazione potrebbe non essere aggiornata. Ma stiamo recuperando. Vuole iniziare il giro dal reparto stampaggio?',
        timestamp: Date.now() + 1000,
      },
    ],
  },
  {
    id: 'emergenza-ambientale-14001',
    areaId: 'iso-14001',
    title: 'Piano di Risposta Emergenza Ambientale',
    description:
      'Si è verificato uno sversamento accidentale di sostanze chimiche. Devi attivare il piano di emergenza ambientale e coordinare la risposta.',
    category: 'Ambiente',
    difficulty: 5,
    icon: 'AlertOctagon',
    xpReward: 250,
    initialMessages: [
      {
        id: 'ea14001-1',
        role: 'system',
        content:
          'Sei il Responsabile del Sistema di Gestione Ambientale di un\'azienda chimica certificata ISO 14001:2015. Un operatore ti ha appena chiamato segnalando uno sversamento di circa 200 litri di solvente organico (toluene) da un serbatoio nel reparto miscelazione. Il solvente si sta diffondendo verso il pozzetto di raccolta delle acque meteoriche che scarica nel torrente adiacente. Devi gestire l\'emergenza coordinandoti con il capo reparto, Marco Belli, che è sul posto. Il piano di emergenza ambientale prevede procedure specifiche per questo tipo di evento.',
        timestamp: Date.now(),
      },
      {
        id: 'ea14001-2',
        role: 'bot',
        content:
          'Capo, qui la situazione è seria! Il serbatoio T-04 ha ceduto dalla flangia inferiore e il toluene sta uscendo. Ho già fatto allontanare gli operatori dalla zona, ma il liquido sta scorrendo verso il canale di scolo e non so se le barriere di contenimento reggeranno. Il kit antispandimento è nell\'armadio di emergenza ma non sono sicuro di come usarlo. Cosa faccio? Chiamo i pompieri? E l\'ARPA va avvisata?',
        timestamp: Date.now() + 1000,
      },
    ],
  },
];

// ─── ISO 45001:2018 - SALUTE E SICUREZZA ─────────────────────────────────────

export const iso45001Scenarios: Scenario[] = [
  {
    id: 'sopralluogo-sicurezza-45001',
    areaId: 'iso-45001',
    title: 'Sopralluogo Sicurezza',
    description:
      'Conduci un sopralluogo di sicurezza in un cantiere identificando i pericoli e valutando il rispetto delle procedure di lavoro sicuro.',
    category: 'Sicurezza',
    difficulty: 4,
    icon: 'Shield',
    xpReward: 200,
    initialMessages: [
      {
        id: 'ss45001-1',
        role: 'system',
        content:
          'Sei il RSPP (Responsabile del Servizio di Prevenzione e Protezione) di un\'impresa edile certificata ISO 45001:2018. Stai effettuando un sopralluogo programmato in un cantiere per la ristrutturazione di un edificio di 4 piani. Il capocantiere, Sig. Giuseppe Ferro, ti accompagna. Durante il giro hai già notato: un operatore su un ponteggio al secondo piano senza imbracatura, estintori con revisione scaduta, e cavi elettrici scoperti vicino a una pozza d\'acqua. Il cantiere ha 15 operatori attivi oggi.',
        timestamp: Date.now(),
      },
      {
        id: 'ss45001-2',
        role: 'bot',
        content:
          'Ah, bentornato ingegnere. Guardi, sta andando tutto bene qui, siamo in anticipo sulla tabella di marcia. Per il ponteggio, sì, ho visto che Rossi non ha l\'imbracatura ma sta solo dando un\'occhiata veloce, tra cinque minuti scende. Gli estintori... ha ragione, dovevamo farli revisionare il mese scorso ma con tutto il lavoro che c\'è non abbiamo avuto tempo di chiamare la ditta. Per i cavi, il nostro elettricista dice che non c\'è pericolo perché la tensione è bassa. Senta, non facciamo un dramma per queste cose, sono dettagli.',
        timestamp: Date.now() + 1000,
      },
    ],
  },
  {
    id: 'incidente-lavoro-45001',
    areaId: 'iso-45001',
    title: 'Incidente sul Lavoro - Gestione Immediata',
    description:
      'Un operatore è caduto da un\'altezza di 2 metri. Devi gestire l\'emergenza, avviare l\'indagine sull\'incidente e definire le azioni correttive.',
    category: 'Sicurezza',
    difficulty: 5,
    icon: 'AlertTriangle',
    xpReward: 300,
    initialMessages: [
      {
        id: 'il45001-1',
        role: 'system',
        content:
          'Sei il Responsabile della Sicurezza di un\'azienda di logistica certificata ISO 45001:2018. Hai appena ricevuto una chiamata dal magazzino centrale: un operatore, Luca Ferretti (32 anni), è caduto da una scaffalatura alta 2,5 metri mentre stava posizionando un pallet. L\'ambulanza è stata chiamata. L\'operatore è cosciente ma lamenta forte dolore alla schiena e a un braccio. Il suo diretto responsabile, Andrea Morelli (capo magazzino), è con te al telefono. Devi gestire la situazione immediata, preservare la scena per l\'indagine e avviare il processo previsto dalla procedura di gestione degli incidenti.',
        timestamp: Date.now(),
      },
      {
        id: 'il45001-2',
        role: 'bot',
        content:
          'Capo, è successo un casino. Luca stava mettendo un pallet sullo scaffale alto, è salito con il muletto a forche alzate per raggiungere il terzo livello e in qualche modo è scivolato. Per fortuna è caduto sui pallet sotto, altrimenti era peggio. L\'ho fatto stare fermo, non lo faccio muovere, l\'ambulanza dovrebbe arrivare tra poco. Guardi, non so come sia successo, lui di solito è attento... Forse la pedana del muletto era bagnata, stamattina pioveva e le ruote portano dentro l\'acqua. Che faccio, posso mandare gli altri ragazzi a finire il turno? Abbiamo una spedizione urgente da preparare.',
        timestamp: Date.now() + 1000,
      },
    ],
  },
];

// ─── UNI EN 13549:2003 - PULIZIE PROFESSIONALI ───────────────────────────────

export const uni13549Scenarios: Scenario[] = [
  {
    id: 'verifica-qualita-pulizie',
    areaId: 'uni-13549',
    title: 'Verifica Qualità Pulizie',
    description:
      'Conduci una verifica di qualità del servizio di pulizia presso un cliente ospedaliero, utilizzando i criteri della UNI EN 13549.',
    category: 'Qualità',
    difficulty: 3,
    icon: 'Sparkles',
    xpReward: 150,
    initialMessages: [
      {
        id: 'vqp-1',
        role: 'system',
        content:
          'Sei il Responsabile Qualità di un\'impresa di pulizie certificata UNI EN 13549:2003. Stai effettuando la verifica mensile della qualità del servizio presso l\'Ospedale San Carlo, uno dei vostri clienti più importanti. Devi verificare la conformità rispetto al capitolato d\'appalto e agli standard di pulizia previsti dalla norma. Hai con te la checklist di controllo e il piano di campionamento. Il referente dell\'ospedale, Dott. Paolo Gentile (Responsabile Servizi Generali), ti ha segnalato alcune lamentele dal reparto di chirurgia sulla qualità delle pulizie nei blocchi operatori.',
        timestamp: Date.now(),
      },
      {
        id: 'vqp-2',
        role: 'bot',
        content:
          'Buongiorno, la aspettavo. Guardi, devo essere diretto: abbiamo ricevuto tre segnalazioni dal primario di chirurgia nell\'ultima settimana. Si lamenta che i pavimenti dei blocchi operatori non vengono sanificati adeguatamente e che ha trovato residui di disinfettante non risciacquato sulle superfici di lavoro. Il nostro protocollo di igiene è molto rigido e non possiamo permetterci criticità in area critica. Vorrei capire con lei come stanno le cose e cosa intendete fare. Abbiamo anche il rinnovo del contratto tra tre mesi.',
        timestamp: Date.now() + 1000,
      },
    ],
  },
  {
    id: 'reclamo-cliente-pulizie',
    areaId: 'uni-13549',
    title: 'Reclamo Cliente',
    description:
      'Un cliente importante presenta un reclamo formale sulla qualità del servizio di pulizia. Devi gestirlo professionalmente e proporre azioni correttive.',
    category: 'Qualità',
    difficulty: 3,
    icon: 'MessageSquareWarning',
    xpReward: 150,
    initialMessages: [
      {
        id: 'rcp-1',
        role: 'system',
        content:
          'Sei il Direttore Operativo di una società di facility management certificata UNI EN 13549:2003. La Dott.ssa Elisa Martini, Facility Manager di BancaItalia Spa (uno dei vostri 5 clienti principali, contratto da 180.000 euro/anno), ha chiesto un incontro urgente per formalizzare un reclamo. Le criticità segnalate riguardano: pulizia insufficiente delle sale riunioni del piano dirigenziale, ritardi nella fornitura dei materiali di consumo nei bagni, e due episodi di personale non in divisa. Il contratto prevede un sistema di penali e siete già alla seconda segnalazione formale nel trimestre.',
        timestamp: Date.now(),
      },
      {
        id: 'rcp-2',
        role: 'bot',
        content:
          'Buongiorno. Le dico subito che questa volta ho portato anche la lettera formale di contestazione, perché la situazione non è più sostenibile. La settimana scorsa il nostro AD ha avuto una riunione con investitori esteri e la sala riunioni al quinto piano aveva ancora i cestini pieni del giorno prima e la moquette non aspirata. Si immagini la figura. Poi i distributori di sapone nei bagni del piano clienti sono rimasti vuoti per due giorni. E venerdì ho trovato due vostre operatrici senza divisa aziendale. Siamo alla seconda contestazione formale: sa cosa prevede il contratto alla terza, vero?',
        timestamp: Date.now() + 1000,
      },
    ],
  },
];

// ─── ISO 14064-1 - EMISSIONI GHG ─────────────────────────────────────────────

export const iso14064Scenarios: Scenario[] = [
  {
    id: 'calcolo-carbon-footprint',
    areaId: 'iso-14064',
    title: 'Calcolo Carbon Footprint',
    description:
      'Devi guidare un\'azienda nel calcolo della propria carbon footprint secondo la ISO 14064-1, spiegando Scope 1, 2 e 3 al management.',
    category: 'Ambiente',
    difficulty: 4,
    icon: 'Wind',
    xpReward: 200,
    initialMessages: [
      {
        id: 'ccf-1',
        role: 'system',
        content:
          'Sei un consulente specializzato in carbon footprint e certificazione ISO 14064-1. Sei in riunione con il CFO di GreenTech Manufacturing Srl, Dott. Alberto Ricci, per presentare i risultati preliminari dell\'inventario delle emissioni GHG dell\'azienda. L\'azienda produce componenti elettronici e ha 3 stabilimenti in Italia. Il CFO ha una formazione finanziaria e non conosce bene la materia ambientale, ma il CDA ha chiesto di pubblicare il primo report di sostenibilità entro 6 mesi. Devi spiegare i concetti di Scope 1, 2 e 3 in modo chiaro e proporre il piano di lavoro.',
        timestamp: Date.now(),
      },
      {
        id: 'ccf-2',
        role: 'bot',
        content:
          'Buongiorno. Allora, il CDA vuole questo report di sostenibilità perché i nostri clienti principali, soprattutto quelli tedeschi, lo stanno richiedendo come requisito per restare nella catena di fornitura. Io onestamente di emissioni e carbon footprint non ci capisco molto, vengo dal mondo finanziario. Mi hanno parlato di Scope 1, 2, 3... ma cosa significa concretamente per noi? Quanto ci costa questo processo? E soprattutto, quanto tempo ci vuole? Il CDA vuole tutto pronto per settembre.',
        timestamp: Date.now() + 1000,
      },
    ],
  },
  {
    id: 'verifica-inventario-ghg',
    areaId: 'iso-14064',
    title: 'Verifica Inventario GHG',
    description:
      'Devi condurre la verifica di un inventario GHG aziendale, analizzando la completezza dei dati e la correttezza dei fattori di emissione utilizzati.',
    category: 'Compliance',
    difficulty: 5,
    icon: 'FileSearch',
    xpReward: 250,
    initialMessages: [
      {
        id: 'vig-1',
        role: 'system',
        content:
          'Sei un verificatore accreditato ISO 14064-1. Stai conducendo la verifica di terza parte dell\'inventario GHG di EcoSteel Spa, un\'acciaieria con emissioni significative. Il Responsabile Ambiente, Ing. Laura Bianchi, ti ha fornito la documentazione. Hai riscontrato alcune criticità: i fattori di emissione per il gas naturale non sono aggiornati all\'ultimo anno disponibile, mancano le emissioni fuggitive di SF6 dagli impianti elettrici, e il calcolo dello Scope 3 include solo i trasporti dipendenti escludendo la logistica dei materiali in ingresso. Devi discutere queste osservazioni con l\'Ing. Bianchi.',
        timestamp: Date.now(),
      },
      {
        id: 'vig-2',
        role: 'bot',
        content:
          'Buongiorno, ho preparato tutta la documentazione che ci ha richiesto. Sono convinta che il nostro inventario sia completo e accurato, ci abbiamo lavorato tre mesi. I fattori di emissione li abbiamo presi dal database ISPRA, che è la fonte ufficiale italiana. Per lo Scope 3 abbiamo incluso tutto quello che riuscivamo a quantificare con dati affidabili. Sa, per un\'acciaieria non è semplice tracciare tutta la catena di fornitura. Ci sono delle criticità secondo lei?',
        timestamp: Date.now() + 1000,
      },
    ],
  },
];

// ─── UNI EN 16636 - PEST MANAGEMENT ──────────────────────────────────────────

export const uni16636Scenarios: Scenario[] = [
  {
    id: 'ispezione-pest-control',
    areaId: 'uni-16636',
    title: 'Ispezione Pest Control',
    description:
      'Conduci un\'ispezione di pest control presso un\'industria alimentare, verificando il sistema di monitoraggio e le azioni preventive.',
    category: 'Compliance',
    difficulty: 3,
    icon: 'Bug',
    xpReward: 150,
    initialMessages: [
      {
        id: 'ipc-1',
        role: 'system',
        content:
          'Sei un tecnico certificato UNI EN 16636 di una società di pest management. Stai effettuando il sopralluogo trimestrale presso PastaOro Srl, un pastificio industriale. Devi verificare lo stato delle postazioni di monitoraggio (esche rodenticide, trappole a cattura, lampade UV per insetti volanti), controllare i registri delle attività e valutare eventuali nuove criticità strutturali. Il Responsabile Qualità del pastificio, Dott. Nicola Ferretti, ti accompagna nel giro. Hai già notato che 2 postazioni esterne su 12 sono danneggiate e che una porta del magazzino materie prime non chiude completamente.',
        timestamp: Date.now(),
      },
      {
        id: 'ipc-2',
        role: 'bot',
        content:
          'Buongiorno, ben arrivato. Guardi, dalla sua ultima visita non abbiamo avuto problemi particolari, almeno a quanto ne so io. Le postazioni esterne... sì, due le ha danneggiate il muletto durante le operazioni di scarico, non abbiamo ancora avuto tempo di segnalarlo. Per la porta del magazzino, lo sappiamo, la guarnizione inferiore è da sostituire, è in ordine dal fornitore ma ci vogliono 3 settimane. Nel frattempo abbiamo messo una striscia di gomma provvisoria. Vuole iniziare il giro dalle postazioni esterne?',
        timestamp: Date.now() + 1000,
      },
    ],
  },
  {
    id: 'gestione-infestazione',
    areaId: 'uni-16636',
    title: 'Gestione Infestazione',
    description:
      'Un cliente segnala un\'infestazione di blatte in un hotel 4 stelle. Devi gestire l\'emergenza con intervento rapido e piano di bonifica secondo la UNI EN 16636.',
    category: 'Compliance',
    difficulty: 4,
    icon: 'AlertTriangle',
    xpReward: 200,
    initialMessages: [
      {
        id: 'gi-1',
        role: 'system',
        content:
          'Sei il Responsabile Tecnico di una società di pest management certificata UNI EN 16636. Hai ricevuto una chiamata urgente dal Grand Hotel Belvedere, un hotel 4 stelle con 120 camere nel centro di Firenze. Il Direttore, Sig. Vittorio Colombo, segnala che due ospiti hanno trovato blatte (Blattella germanica) nelle camere al terzo piano e uno di loro ha pubblicato una recensione negativa su TripAdvisor con foto. L\'hotel ha un tasso di occupazione dell\'85% e un evento aziendale importante tra 48 ore. Devi proporre un piano di intervento immediato e una strategia di bonifica completa.',
        timestamp: Date.now(),
      },
      {
        id: 'gi-2',
        role: 'bot',
        content:
          'La ringrazio per essere venuto così rapidamente. La situazione è gravissima: due ospiti al terzo piano hanno trovato blatte nelle camere, uno stamattina nel bagno e l\'altro ieri sera vicino al minibar. Il signore di stamattina era furioso, ha fatto le foto e le ha messe su TripAdvisor con una stella e un commento devastante. Abbiamo già 3 cancellazioni da quando è apparsa la recensione. E il problema più grosso è che venerdì abbiamo il congresso annuale di FarmaItalia, 200 persone, tutte le camere del terzo e quarto piano sono prenotate. Se salta questo evento è un disastro economico e di immagine. Cosa possiamo fare? Dobbiamo chiudere il piano?',
        timestamp: Date.now() + 1000,
      },
    ],
  },
];

// ─── ALL SECURITY SCENARIOS ───────────────────────────────────────────────────

export const allSecurityScenarios: Scenario[] = [
  ...iso9001Scenarios,
  ...iso14001Scenarios,
  ...iso45001Scenarios,
  ...uni13549Scenarios,
  ...iso14064Scenarios,
  ...uni16636Scenarios,
];

export function getSecurityScenariosByArea(areaId: string): Scenario[] {
  return allSecurityScenarios.filter((s) => s.areaId === areaId);
}
