export interface SecurityTriviaQuestion {
  question: string;
  correct: string;
  wrong: string[];
  certId: string;
}

const allSecurityQuestions: SecurityTriviaQuestion[] = [
  // ─── ISO 9001:2015 - QUALITÀ ──────────────────────────────────────────────
  {
    question: 'Qual è il ciclo alla base del miglioramento continuo nella ISO 9001?',
    correct: 'PDCA (Plan-Do-Check-Act)',
    wrong: ['DMAIC', 'SIPOC', 'FMEA'],
    certId: 'iso-9001',
  },
  {
    question: "Cosa si intende per 'contesto dell'organizzazione' nella ISO 9001:2015?",
    correct: "L'analisi dei fattori interni ed esterni che influenzano il raggiungimento dei risultati attesi",
    wrong: ['La posizione geografica dell\'azienda', 'Il numero di dipendenti', 'Il settore merceologico'],
    certId: 'iso-9001',
  },
  {
    question: "Cosa si intende per 'non conformità' secondo la ISO 9001?",
    correct: 'Il mancato soddisfacimento di un requisito',
    wrong: ['Un errore di produzione non rilevato', 'Un reclamo del cliente', 'Una deviazione dal piano di produzione'],
    certId: 'iso-9001',
  },
  {
    question: 'Quanti requisiti principali (clausole) compongono la ISO 9001:2015?',
    correct: '10 clausole (struttura HLS)',
    wrong: ['7 clausole', '8 clausole', '12 clausole'],
    certId: 'iso-9001',
  },
  {
    question: "Cos'è un 'rischio' nel contesto della ISO 9001:2015?",
    correct: 'Effetto dell\'incertezza sugli obiettivi, positivo o negativo',
    wrong: ['Solo un evento negativo che può accadere', 'Un difetto di prodotto', 'Una non conformità grave'],
    certId: 'iso-9001',
  },
  {
    question: 'Cosa deve contenere obbligatoriamente il Manuale della Qualità?',
    correct: 'La ISO 9001:2015 non richiede un Manuale della Qualità obbligatorio',
    wrong: ['La politica della qualità e gli obiettivi', 'Le procedure operative standard', 'L\'organigramma aziendale'],
    certId: 'iso-9001',
  },
  {
    question: "Cosa si intende per 'parte interessata' secondo la ISO 9001?",
    correct: 'Persona o organizzazione che può influenzare o essere influenzata dalle attività dell\'azienda',
    wrong: ['Solo i clienti diretti', 'I soli azionisti dell\'azienda', 'I dipendenti dell\'organizzazione'],
    certId: 'iso-9001',
  },
  {
    question: "Qual è l'obiettivo principale di un audit interno ISO 9001?",
    correct: 'Verificare la conformità e l\'efficacia del Sistema di Gestione per la Qualità',
    wrong: ['Trovare colpevoli di errori produttivi', 'Valutare le performance dei singoli dipendenti', 'Controllare i conti aziendali'],
    certId: 'iso-9001',
  },
  {
    question: "Cos'è un'azione correttiva nella ISO 9001?",
    correct: 'Azione per eliminare la causa di una non conformità e prevenirne la ricorrenza',
    wrong: ['Una riparazione immediata del difetto', 'Una sanzione disciplinare', 'Una modifica al processo senza analisi della causa'],
    certId: 'iso-9001',
  },
  {
    question: "Qual è la differenza tra 'verifica' e 'validazione' nella ISO 9001?",
    correct: 'La verifica conferma requisiti specificati, la validazione conferma i requisiti per l\'uso previsto',
    wrong: ['Sono sinonimi nella norma', 'La validazione viene prima della verifica', 'La verifica riguarda solo i prodotti fisici'],
    certId: 'iso-9001',
  },

  // ─── ISO 14001:2015 - AMBIENTE ────────────────────────────────────────────
  {
    question: "Cosa si intende per 'aspetto ambientale' secondo la ISO 14001?",
    correct: 'Elemento delle attività, prodotti o servizi di un\'organizzazione che può interagire con l\'ambiente',
    wrong: ['Un impatto negativo sull\'ambiente', 'Una normativa ambientale applicabile', 'Un obiettivo di riduzione delle emissioni'],
    certId: 'iso-14001',
  },
  {
    question: "Cosa si intende per 'impatto ambientale significativo'?",
    correct: 'Un impatto che deve essere considerato prioritario nella gestione ambientale dell\'organizzazione',
    wrong: ['Solo gli impatti che causano danni irreversibili', 'Un impatto già sanzionato dall\'autorità', 'Qualsiasi emissione in atmosfera'],
    certId: 'iso-14001',
  },
  {
    question: 'Cosa richiede la ISO 14001 riguardo agli obblighi di conformità?',
    correct: 'Identificare, accedere e rispettare i requisiti legali e altri requisiti applicabili',
    wrong: ['Solo rispettare le leggi ambientali nazionali', 'Ottenere tutte le autorizzazioni ambientali', 'Superare i controlli delle autorità'],
    certId: 'iso-14001',
  },
  {
    question: "Qual è la struttura comune della ISO 14001:2015 con la ISO 9001:2015?",
    correct: 'La High Level Structure (HLS) con 10 clausole standard',
    wrong: ['Nessuna struttura comune', 'Condividono solo la politica di sistema', 'La struttura Annex SL a 7 clausole'],
    certId: 'iso-14001',
  },
  {
    question: "Cosa deve includere una 'analisi del ciclo di vita' in ambito ISO 14001?",
    correct: 'La valutazione degli impatti ambientali lungo tutte le fasi del ciclo di vita del prodotto/servizio',
    wrong: ['Solo la fase di produzione e smaltimento', 'L\'analisi dei costi di gestione ambientale', 'Il calcolo delle emissioni di CO2 annuali'],
    certId: 'iso-14001',
  },
  {
    question: "In ISO 14001, cosa si intende per 'prospettiva del ciclo di vita'?",
    correct: 'Considerare le fasi del ciclo di vita del prodotto, dall\'estrazione delle materie prime allo smaltimento',
    wrong: ['La durata di validità della certificazione', 'La vita utile degli impianti produttivi', 'Il ciclo di revisione della norma ISO'],
    certId: 'iso-14001',
  },
  {
    question: "Cosa deve prevedere un piano di risposta alle emergenze ambientali?",
    correct: 'Procedure di risposta, risorse necessarie, responsabilità e comunicazione con le autorità',
    wrong: ['Solo le istruzioni di evacuazione', 'Il calcolo dei danni economici potenziali', 'La lista dei fornitori di servizi di bonifica'],
    certId: 'iso-14001',
  },
  {
    question: "Qual è il ruolo dell'Alta Direzione nella ISO 14001?",
    correct: 'Dimostrare leadership e impegno garantendo risorse, definendo politica e integrando il sistema nei processi',
    wrong: ['Firmare i rapporti di audit', 'Gestire operativamente gli aspetti ambientali', 'Approvare le spese di smaltimento rifiuti'],
    certId: 'iso-14001',
  },
  {
    question: "Cosa si intende per 'prestazione ambientale' nella ISO 14001?",
    correct: 'Risultato misurabile della gestione degli aspetti ambientali di un\'organizzazione',
    wrong: ['Il numero di sanzioni ricevute nell\'anno', 'Il costo della gestione ambientale', 'Il totale delle emissioni prodotte'],
    certId: 'iso-14001',
  },
  {
    question: "Cosa deve monitorare un'organizzazione certificata ISO 14001?",
    correct: 'Aspetti ambientali significativi, obblighi di conformità e progressi verso gli obiettivi ambientali',
    wrong: ['Solo i consumi energetici', 'Esclusivamente i rifiuti prodotti', 'I costi del sistema di gestione ambientale'],
    certId: 'iso-14001',
  },

  // ─── ISO 45001:2018 - SALUTE E SICUREZZA ─────────────────────────────────
  {
    question: "Cosa si intende per 'pericolo' secondo la ISO 45001?",
    correct: 'Fonte con potenziale di causare lesioni e malattie',
    wrong: ['Un incidente già avvenuto', 'Una situazione di rischio valutata', 'Un lavoratore esposto a rischio'],
    certId: 'iso-45001',
  },
  {
    question: "Qual è la differenza tra 'pericolo' e 'rischio' nella ISO 45001?",
    correct: 'Il pericolo è la fonte di danno potenziale; il rischio è la combinazione di probabilità e gravità del danno',
    wrong: ['Sono sinonimi nella norma', 'Il rischio è sempre maggiore del pericolo', 'Il pericolo riguarda solo i macchinari'],
    certId: 'iso-45001',
  },
  {
    question: "Cosa sostituisce la ISO 45001 nelle organizzazioni precedentemente certificate?",
    correct: 'OHSAS 18001',
    wrong: ['ISO 9001', 'BS 8800', 'SA 8000'],
    certId: 'iso-45001',
  },
  {
    question: "Cosa si intende per 'consultazione dei lavoratori' nella ISO 45001?",
    correct: 'Coinvolgimento attivo dei lavoratori nei processi decisionali relativi alla salute e sicurezza',
    wrong: ['Informare i lavoratori delle decisioni già prese', 'Raccogliere firme per le procedure di sicurezza', 'Formare i lavoratori sulle normative'],
    certId: 'iso-45001',
  },
  {
    question: "Qual è la gerarchia dei controlli nella ISO 45001?",
    correct: 'Eliminazione, sostituzione, controlli tecnici, controlli amministrativi, DPI',
    wrong: ['DPI, controlli tecnici, eliminazione, sostituzione, formazione', 'Formazione, DPI, segnaletica, procedure', 'Valutazione, prevenzione, protezione, informazione'],
    certId: 'iso-45001',
  },
  {
    question: "Cosa deve fare un'organizzazione dopo un incidente secondo la ISO 45001?",
    correct: 'Indagare l\'incidente, identificare le cause radice e implementare azioni correttive',
    wrong: ['Solo registrare l\'evento e informare l\'INAIL', 'Sostituire immediatamente il lavoratore coinvolto', 'Aggiornare il DVR entro 30 giorni'],
    certId: 'iso-45001',
  },
  {
    question: "Cosa si intende per 'near miss' (mancato incidente)?",
    correct: 'Un evento che avrebbe potuto causare un infortunio o malattia, ma non lo ha causato',
    wrong: ['Un infortunio lieve senza assenza dal lavoro', 'Un rischio identificato ma non ancora valutato', 'Un pericolo segnalato dal lavoratore'],
    certId: 'iso-45001',
  },
  {
    question: "Qual è l'obiettivo della partecipazione dei lavoratori nella ISO 45001?",
    correct: 'Migliorare il sistema SSL attraverso il coinvolgimento di chi è esposto ai rischi quotidianamente',
    wrong: ['Ridurre le responsabilità del datore di lavoro', 'Delegare la gestione SSL ai lavoratori', 'Rispettare un requisito burocratico della norma'],
    certId: 'iso-45001',
  },
  {
    question: "Cosa deve valutare un'organizzazione per identificare i pericoli?",
    correct: 'Attività di routine e non routine, situazioni di emergenza, fattori umani e sociali',
    wrong: ['Solo i macchinari e le attrezzature', 'Esclusivamente le sostanze chimiche pericolose', 'I soli incidenti avvenuti negli ultimi 5 anni'],
    certId: 'iso-45001',
  },
  {
    question: "Come si definisce un 'obiettivo SSL' efficace secondo la ISO 45001?",
    correct: 'Misurabile (o valutabile), coerente con la politica SSL e monitorato nel tempo',
    wrong: ['Un obiettivo fissato solo dall\'Alta Direzione', 'Un obiettivo di riduzione degli infortuni del 50%', 'Qualsiasi impegno scritto nella politica SSL'],
    certId: 'iso-45001',
  },

  // ─── UNI EN 13549:2003 - PULIZIE PROFESSIONALI ───────────────────────────
  {
    question: "Cosa definisce la UNI EN 13549 per i servizi di pulizia?",
    correct: 'Requisiti di base e raccomandazioni per i sistemi di misurazione della qualità',
    wrong: ['I prodotti chimici autorizzati per la pulizia', 'I requisiti di formazione del personale addetto', 'Le frequenze minime di intervento per tipologia di superficie'],
    certId: 'uni-13549',
  },
  {
    question: "Cosa si intende per 'standard di pulizia' nella UNI EN 13549?",
    correct: 'Il livello di pulizia accettabile concordato tra cliente e fornitore',
    wrong: ['Il protocollo di igiene imposto dalla legge', 'Il numero di interventi minimi settimanali', 'La qualifica professionale richiesta agli operatori'],
    certId: 'uni-13549',
  },
  {
    question: "Qual è l'elemento chiave per misurare la qualità del servizio secondo la UNI EN 13549?",
    correct: 'I controlli periodici documentati con ispezioni e schede di valutazione',
    wrong: ['Il numero di reclami ricevuti annualmente', 'Il costo per metro quadro del servizio', 'La soddisfazione del personale addetto'],
    certId: 'uni-13549',
  },
  {
    question: "Come si gestisce un reclamo del cliente in un sistema conforme alla UNI EN 13549?",
    correct: 'Registrazione, analisi, azione correttiva e feedback al cliente entro i tempi concordati',
    wrong: ['Invio di un tecnico entro 24 ore senza documentazione', 'Sostituzione del personale addetto all\'area', 'Rimborso automatico della quota di servizio'],
    certId: 'uni-13549',
  },
  {
    question: "Cosa prevede la norma riguardo alla documentazione delle ispezioni?",
    correct: 'Le ispezioni devono essere registrate con esiti, date, aree controllate e firme',
    wrong: ['Solo un registro mensile delle attività svolte', 'Una sola scheda annuale di valutazione', 'La documentazione è facoltativa se il cliente è soddisfatto'],
    certId: 'uni-13549',
  },
  {
    question: "Cosa si intende per 'griglia di valutazione' nel contesto della UNI EN 13549?",
    correct: 'Uno strumento standardizzato per valutare il livello di pulizia in modo oggettivo',
    wrong: ['Un elenco di prodotti approvati per il servizio', 'Una griglia fisica per pulire le superfici', 'Il contratto di servizio tra cliente e fornitore'],
    certId: 'uni-13549',
  },
  {
    question: "Qual è la frequenza raccomandata per le ispezioni di qualità?",
    correct: 'Dipende dal contratto; la norma indica che devono essere regolari e documentate',
    wrong: ['Obbligatoriamente una volta al mese', 'Solo a seguito di reclamo del cliente', 'Almeno due volte alla settimana per ogni area'],
    certId: 'uni-13549',
  },
  {
    question: "Come si calcola un indice di pulizia secondo la UNI EN 13549?",
    correct: 'Attribuendo punteggi a elementi valutati durante l\'ispezione secondo criteri prestabiliti',
    wrong: ['Contando il numero di reclami ricevuti', 'Misurando la quantità di detergente utilizzato', 'Valutando solo la soddisfazione del cliente con un questionario'],
    certId: 'uni-13549',
  },
  {
    question: "Qual è il ruolo del 'piano di pulizia' nella norma?",
    correct: 'Descrivere le attività, frequenze, metodi e responsabilità per ogni area da pulire',
    wrong: ['È un documento opzionale richiesto solo dai clienti pubblici', 'Definisce solo i prodotti chimici da utilizzare', 'Indica esclusivamente i turni del personale addetto'],
    certId: 'uni-13549',
  },
  {
    question: "Cosa si intende per 'comunicazione cliente-fornitore' nella UNI EN 13549?",
    correct: 'Un sistema strutturato per gestire richieste, reclami, modifiche e feedback in modo documentato',
    wrong: ['Le riunioni mensili obbligatorie con il cliente', 'Solo la reportistica annuale del servizio', 'Il contratto di servizio firmato annualmente'],
    certId: 'uni-13549',
  },

  // ─── ISO 14064-1 - EMISSIONI GHG ─────────────────────────────────────────
  {
    question: "Cosa quantifica la ISO 14064-1?",
    correct: 'Emissioni e rimozioni di gas ad effetto serra a livello di organizzazione',
    wrong: ['La qualità dell\'aria indoor negli edifici', 'Le emissioni di singoli prodotti', 'I limiti legali di emissione per le industrie'],
    certId: 'iso-14064',
  },
  {
    question: "Cosa si intende per 'Scope 1' nelle emissioni GHG?",
    correct: 'Emissioni dirette da sorgenti di proprietà o controllate dall\'organizzazione',
    wrong: ['Emissioni indirette da energia acquistata', 'Emissioni nella catena del valore', 'Emissioni da trasporto dei dipendenti'],
    certId: 'iso-14064',
  },
  {
    question: "Cosa sono le emissioni 'Scope 2'?",
    correct: 'Emissioni indirette associate alla generazione di energia elettrica, calore o vapore acquistati',
    wrong: ['Emissioni dei fornitori dell\'azienda', 'Emissioni dirette dei processi produttivi', 'Emissioni dai prodotti venduti ai clienti'],
    certId: 'iso-14064',
  },
  {
    question: "Cosa include lo 'Scope 3' delle emissioni GHG?",
    correct: 'Altre emissioni indirette nella catena del valore, upstream e downstream',
    wrong: ['Solo le emissioni da trasporto merci', 'Le emissioni dei soli fornitori diretti', 'Le emissioni da smaltimento rifiuti interni'],
    certId: 'iso-14064',
  },
  {
    question: "Qual è l'unità di misura standard per le emissioni GHG?",
    correct: 'Tonnellate di CO2 equivalente (tCO2e)',
    wrong: ['Parti per milione (ppm)', 'Kilogrammi di CO2 (kgCO2)', 'Metri cubi di gas emesso'],
    certId: 'iso-14064',
  },
  {
    question: "Cosa si intende per 'anno base' in un inventario GHG?",
    correct: 'Anno di riferimento rispetto al quale si misurano le variazioni delle emissioni nel tempo',
    wrong: ['L\'anno di prima certificazione ISO 14064', 'Il primo anno di attività dell\'organizzazione', 'L\'anno con le emissioni più basse registrate'],
    certId: 'iso-14064',
  },
  {
    question: "Cos'è un 'fattore di emissione' in ambito GHG?",
    correct: 'Un coefficiente che converte i dati di attività in emissioni di gas serra',
    wrong: ['Il limite massimo di emissioni consentito', 'Il costo per tonnellata di CO2 emessa', 'La percentuale di riduzione delle emissioni raggiunta'],
    certId: 'iso-14064',
  },
  {
    question: "Cosa garantisce la verifica di terza parte in ISO 14064?",
    correct: 'Un\'assurance indipendente sulla correttezza e completezza dell\'inventario GHG',
    wrong: ['La certificazione automatica dell\'organizzazione', 'L\'esenzione dalle tasse sulla CO2', 'La conformità automatica alle normative ambientali'],
    certId: 'iso-14064',
  },
  {
    question: "Quali gas rientrano nel protocollo di Kyoto e nella ISO 14064?",
    correct: 'CO2, CH4, N2O, HFC, PFC, SF6 e NF3',
    wrong: ['Solo CO2 e CH4', 'Tutti i gas atmosferici', 'CO2, SO2 e NOx'],
    certId: 'iso-14064',
  },
  {
    question: "Cosa si intende per 'rimozione GHG' nella ISO 14064?",
    correct: "Assorbimento di CO2 dall'atmosfera (es. tramite rimboschimento o sequestro del carbonio)",
    wrong: ['La riduzione delle emissioni attraverso l\'efficienza energetica', 'L\'acquisto di crediti di carbonio sul mercato', 'La dismissione di impianti produttivi inquinanti'],
    certId: 'iso-14064',
  },

  // ─── UNI EN 16636 - PEST MANAGEMENT ──────────────────────────────────────
  {
    question: "Cosa definisce la UNI EN 16636?",
    correct: 'Requisiti e competenze per i fornitori di servizi professionali di gestione degli infestanti',
    wrong: ['I limiti di pesticidi consentiti negli alimenti', 'Le norme per la produzione di biocidi', 'I requisiti per i laboratori di analisi entomologica'],
    certId: 'uni-16636',
  },
  {
    question: "Cosa si intende per 'IPM' (Integrated Pest Management)?",
    correct: 'Approccio integrato che combina metodi preventivi, fisici, biologici e chimici per gestire gli infestanti',
    wrong: ['L\'uso esclusivo di pesticidi chimici autorizzati', 'Un sistema informatico per monitorare le infestazioni', 'La sola ispezione periodica senza trattamenti'],
    certId: 'uni-16636',
  },
  {
    question: "Qual è la priorità nella gestione integrata degli infestanti (IPM)?",
    correct: 'La prevenzione è prioritaria rispetto all\'intervento chimico',
    wrong: ['Il trattamento chimico preventivo è sempre raccomandato', 'L\'intervento chimico immediato per eliminare il rischio', 'La sostituzione del personale esposto agli infestanti'],
    certId: 'uni-16636',
  },
  {
    question: "Cosa deve documentare un'azienda di pest control certificata UNI EN 16636?",
    correct: 'Ispezioni, trattamenti effettuati, prodotti utilizzati, dosi e risultati',
    wrong: ['Solo i reclami dei clienti e le segnalazioni', 'Esclusivamente le fatture dei prodotti acquistati', 'Il solo certificato di formazione del personale'],
    certId: 'uni-16636',
  },
  {
    question: "Quali competenze deve avere il personale tecnico secondo la UNI EN 16636?",
    correct: 'Conoscenza degli infestanti target, dei metodi di controllo, dei prodotti e delle normative vigenti',
    wrong: ['Solo il patentino per l\'uso dei biocidi', 'Esclusivamente l\'esperienza pratica sul campo', 'La laurea in scienze naturali o biologiche'],
    certId: 'uni-16636',
  },
  {
    question: "Cosa si intende per 'soglia di intervento' nel pest management?",
    correct: 'Il livello di infestazione oltre il quale è necessario intervenire per prevenire danni significativi',
    wrong: ['La dose massima di pesticida applicabile per legge', 'Il numero minimo di ispezioni annuali richieste', 'Il tempo massimo di risposta dopo una segnalazione'],
    certId: 'uni-16636',
  },
  {
    question: "Come si classifica la gravità di un'infestazione in ambito professionale?",
    correct: 'In base alla specie, densità della popolazione, danni potenziali e rischi per la salute',
    wrong: ['Solo in base ai costi del trattamento necessario', 'Esclusivamente per il numero di esemplari avvistati', 'In base al numero di reclami del cliente'],
    certId: 'uni-16636',
  },
  {
    question: "Cosa deve prevedere un piano di pest management efficace?",
    correct: 'Monitoraggio regolare, mappe dei punti di ispezione, protocolli di intervento e comunicazione al cliente',
    wrong: ['Solo i trattamenti chimici programmati mensilmente', 'Un elenco dei prodotti biocidi disponibili', 'La pianificazione dei turni del personale tecnico'],
    certId: 'uni-16636',
  },
  {
    question: "Qual è il ruolo delle schede tecniche dei biocidi nel pest management?",
    correct: 'Fornire informazioni su composizione, modalità d\'uso, precauzioni di sicurezza e smaltimento',
    wrong: ['Garantire l\'efficacia del prodotto per legge', 'Sostituire la formazione del personale tecnico', 'Certificare automaticamente la conformità alla UNI EN 16636'],
    certId: 'uni-16636',
  },
  {
    question: "Cosa si intende per 'monitoraggio' nel contesto del pest management?",
    correct: 'Attività sistematica di rilevazione della presenza e densità degli infestanti tramite trappole e ispezioni',
    wrong: ['La sola osservazione visiva durante i trattamenti', 'Il controllo dei costi mensili del servizio', 'La verifica della soddisfazione del cliente dopo ogni intervento'],
    certId: 'uni-16636',
  },
];

/** Restituisce le domande per una certificazione specifica */
export function getSecurityQuestions(certId: string, count: number = 10): SecurityTriviaQuestion[] {
  const filtered = allSecurityQuestions.filter((q) => q.certId === certId);
  const shuffled = [...filtered];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

/** Restituisce tutte le domande di sicurezza */
export function getAllSecurityQuestions(): SecurityTriviaQuestion[] {
  return allSecurityQuestions;
}
