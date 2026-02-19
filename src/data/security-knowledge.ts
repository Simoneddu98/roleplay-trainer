// ─── Security Knowledge Base ──────────────────────────────────────────────────
// Knowledge base strutturata per le 6 certificazioni. Usata per iniettare
// contesto nel system prompt del Tutor Sicurezza.

export interface CertKnowledge {
  id: string;
  title: string;
  scope: string;
  structure: string;
  keyPrinciples: string[];
  keyTerms: Record<string, string>;
  auditTips: string[];
  commonMistakes: string[];
  quickChips: string[];
}

export const securityKnowledgeBase: Record<string, CertKnowledge> = {

  // ─── ISO 9001:2015 ──────────────────────────────────────────────────────────
  'iso-9001': {
    id: 'iso-9001',
    title: 'ISO 9001:2015 – Sistema di Gestione della Qualità (SGQ)',
    scope:
      'Definisce i requisiti per un SGQ applicabile a organizzazioni di qualsiasi tipo e dimensione che devono dimostrare la capacità di fornire prodotti/servizi conformi e di accrescere la soddisfazione del cliente.',
    structure:
      'Struttura HLS (High Level Structure) con 10 clausole: 1-Scopo, 2-Riferimenti normativi, 3-Termini, 4-Contesto dell\'organizzazione, 5-Leadership, 6-Pianificazione, 7-Supporto, 8-Attività operative, 9-Valutazione delle prestazioni, 10-Miglioramento.',
    keyPrinciples: [
      'Orientamento al cliente: soddisfare i requisiti e superare le aspettative',
      'Leadership: l\'Alta Direzione guida e si impegna nel SGQ',
      'Approccio per processi: gestire attività correlate come processi interconnessi',
      'Miglioramento continuo tramite ciclo PDCA (Plan-Do-Check-Act)',
      'Decisioni basate su evidenze: dati e analisi guidano le decisioni',
      'Gestione delle relazioni con fornitori e parti interessate rilevanti',
      'Coinvolgimento e competenza delle persone a tutti i livelli',
    ],
    keyTerms: {
      'Non conformità': 'Mancato soddisfacimento di un requisito. Maggiore = assenza del processo/sistema. Minore = applicazione incompleta o isolata.',
      'Azione correttiva': 'Elimina la causa radice di una NC per prevenirne la ricorrenza. Diversa dalla correzione (rimedio immediato al solo effetto).',
      'Audit interno': 'Processo sistematico, indipendente e documentato per ottenere evidenze oggettive e valutare la conformità del SGQ.',
      'PDCA': 'Plan (pianifica obiettivi e processi) → Do (implementa) → Check (misura risultati) → Act (migliora). Base del miglioramento continuo.',
      'Riesame della Direzione': 'Riunione periodica dell\'Alta Direzione per valutare adeguatezza, efficacia e allineamento del SGQ agli obiettivi strategici.',
      'Rischio': 'Effetto dell\'incertezza sugli obiettivi: può essere negativo (minaccia) o positivo (opportunità). Deve essere considerato nella pianificazione.',
      'Contesto': 'Analisi dei fattori interni/esterni (SWOT, PESTLE) e delle parti interessate rilevanti che influenzano gli obiettivi dell\'organizzazione.',
      'KPI': 'Indicatori chiave di prestazione per misurare l\'efficacia dei processi e il raggiungimento degli obiettivi della qualità.',
      'Parte interessata': 'Persona o organizzazione che può influenzare o essere influenzata dalle decisioni e attività dell\'organizzazione (clienti, fornitori, enti regolatori...).',
    },
    auditTips: [
      'Campiona sempre i record per verificare l\'applicazione pratica, non solo dichiarazioni verbali',
      'Verifica la coerenza tra politica della qualità e obiettivi misurabili definiti',
      'Controlla le azioni correttive precedenti: sono state efficaci? La NC si è ripresentata?',
      'Chiedi come vengono identificati i rischi e le opportunità nei processi chiave',
      'Verifica che i fornitori critici siano monitorati e valutati sistematicamente',
    ],
    commonMistakes: [
      'Confondere correzione (rimedio immediato) con azione correttiva (elimina la causa): sono due cose diverse!',
      'Pensare che il Manuale della Qualità sia obbligatorio: la ISO 9001:2015 NON lo richiede',
      'Non includere il rischio/opportunità nella pianificazione dei processi (clausola 6.1)',
      'Considerare l\'audit come un evento punitivo invece che uno strumento di miglioramento',
    ],
    quickChips: [
      'Cos\'è il ciclo PDCA?',
      'Spiega le non conformità',
      'Come si conduce un audit interno?',
      'Differenza tra correzione e azione correttiva',
    ],
  },

  // ─── ISO 14001:2015 ─────────────────────────────────────────────────────────
  'iso-14001': {
    id: 'iso-14001',
    title: 'ISO 14001:2015 – Sistema di Gestione Ambientale (SGA)',
    scope:
      'Specifica i requisiti per un SGA che permette all\'organizzazione di migliorare le prestazioni ambientali, adempiere agli obblighi di conformità e raggiungere gli obiettivi ambientali.',
    structure:
      'Stessa struttura HLS della ISO 9001 (10 clausole). Clausola 6.1 aggiunge: identificazione aspetti ambientali, obblighi di conformità e rischi/opportunità ambientali.',
    keyPrinciples: [
      'Identificazione e valutazione degli aspetti ambientali significativi (causa → impatto)',
      'Conformità agli obblighi di legge ambientale e requisiti volontari adottati',
      'Prospettiva del ciclo di vita: dall\'estrazione materie prime allo smaltimento',
      'Pianificazione per situazioni di emergenza ambientale',
      'Miglioramento continuo della prestazione ambientale nel tempo',
      'Leadership e impegno dell\'Alta Direzione nella protezione ambientale',
    ],
    keyTerms: {
      'Aspetto ambientale': 'Elemento delle attività/prodotti/servizi che può interagire con l\'ambiente (CAUSA). Es: utilizzo di solventi, emissione di CO2, scarichi idrici.',
      'Impatto ambientale': 'Qualsiasi modifica all\'ambiente risultante dagli aspetti (EFFETTO). Es: inquinamento dell\'acqua, riduzione ozono.',
      'Aspetto significativo': 'Aspetto con impatto ambientale rilevante secondo i criteri definiti dall\'org. Richiede controllo e obiettivi specifici.',
      'Obblighi di conformità': 'Requisiti legali vincolanti (leggi, autorizzazioni, permessi) più altri requisiti che l\'organizzazione sceglie di adottare.',
      'Ciclo di vita': 'Fasi sequenziali: acquisizione materie prime → progettazione → produzione → distribuzione → uso → fine vita/smaltimento.',
      'Prestazione ambientale': 'Risultato misurabile della gestione degli aspetti ambientali (es: riduzione 20% emissioni CO2 rispetto all\'anno base).',
      'Piano di emergenza ambientale': 'Procedure per rispondere a situazioni di emergenza che possono causare impatti ambientali (sversamenti, incendi, ecc.).',
    },
    auditTips: [
      'Verifica la matrice aspetti/impatti: i criteri di significatività sono chiari e applicati?',
      'Controlla il registro delle prescrizioni legali: è aggiornato? Chi lo gestisce?',
      'Testa la conoscenza dei piani di emergenza ambientale da parte degli operatori a rischio',
      'Verifica il monitoraggio degli aspetti significativi: dati, frequenze, trend',
      'Controlla la gestione dei rifiuti: registri carico/scarico, deposito temporaneo, smaltitori autorizzati',
    ],
    commonMistakes: [
      'Confondere aspetto ambientale (CAUSA: cosa facciamo) con impatto (EFFETTO: cosa succede all\'ambiente)',
      'Non aggiornare la valutazione della significatività quando cambiano attività o legislazione',
      'Dimenticare di considerare le condizioni anomale e di emergenza nell\'analisi degli aspetti',
      'Trattare gli obblighi di conformità solo come requisiti legali, ignorando i requisiti volontari adottati',
    ],
    quickChips: [
      'Differenza aspetto vs impatto ambientale',
      'Cos\'è un aspetto significativo?',
      'Come si gestisce un\'emergenza ambientale?',
      'Requisiti legali e obblighi di conformità',
    ],
  },

  // ─── ISO 45001:2018 ─────────────────────────────────────────────────────────
  'iso-45001': {
    id: 'iso-45001',
    title: 'ISO 45001:2018 – Sistema di Gestione per la Salute e Sicurezza sul Lavoro (SGSSL)',
    scope:
      'Specifica i requisiti per un SGSSL che permette alle organizzazioni di prevenire infortuni e malattie professionali e promuovere luoghi di lavoro sicuri e salutari. Sostituisce la OHSAS 18001.',
    structure:
      'Struttura HLS con 10 clausole. Novità rispetto a OHSAS 18001: forte enfasi su partecipazione e consultazione dei lavoratori (clausola 5.4), approccio risk-based, integrazione nella strategia aziendale.',
    keyPrinciples: [
      'Gerarchia dei controlli: Eliminazione > Sostituzione > Controlli tecnici > Admin > DPI',
      'Identificazione sistematica di pericoli e valutazione dei rischi (HIRA)',
      'Partecipazione attiva e consultazione dei lavoratori in ogni processo decisionale SSL',
      'Gestione strutturata di incidenti, near miss e situazioni pericolose',
      'Obiettivi SSL misurabili con programmi di miglioramento documentati',
      'Audit interni e riesame della Direzione periodici',
    ],
    keyTerms: {
      'Pericolo': 'FONTE con potenziale di causare lesioni e malattie (es: pavimento scivoloso, prodotto chimico, lavoro in quota). Non è ancora il danno.',
      'Rischio SSL': 'Combinazione della PROBABILITÀ di un evento pericoloso e della GRAVITÀ delle lesioni/malattie che può causare.',
      'Near miss': 'Evento che AVREBBE POTUTO causare un infortunio o malattia, ma non l\'ha causato per fortuna. Va segnalato e investigato al pari di un incidente.',
      'Gerarchia dei controlli': 'Ordine di priorità: 1°Eliminazione > 2°Sostituzione > 3°Controlli tecnici > 4°Controlli amministrativi > 5°DPI (ultimo resort).',
      'DPI': 'Dispositivi di Protezione Individuale: ULTIMA misura di controllo, non la prima. Da usare solo quando non sono applicabili misure superiori.',
      'RSPP': 'Responsabile del Servizio di Prevenzione e Protezione: figura tecnica obbligatoria per legge che coordina la gestione della sicurezza.',
      'DVR': 'Documento di Valutazione dei Rischi: documento fondamentale che identifica pericoli, valuta rischi e definisce le misure di controllo adottate.',
      'Partecipazione lavoratori': 'Requisito esplicito ISO 45001: i lavoratori devono essere consultati e coinvolti nelle decisioni SSL, non solo informati.',
    },
    auditTips: [
      'Verifica che l\'identificazione dei pericoli includa attività di routine E non routine E situazioni di emergenza',
      'Controlla la documentazione dei near miss: vengono registrati? Vengono investigati? Si prendono azioni?',
      'Verifica che i lavoratori abbiano effettivamente partecipato alla valutazione dei rischi (non solo firmato)',
      'Controlla che i DPI siano adeguati al rischio, disponibili e in buono stato',
      'Verifica la competenza degli operatori esposti a rischi specifici (es: lavori in quota, sostanze pericolose)',
    ],
    commonMistakes: [
      'Usare i DPI come PRIMA misura di controllo invece che come ultima: la gerarchia va rispettata!',
      'Non distinguere tra pericolo (fonte di danno potenziale) e rischio (probabilità × gravità)',
      'Non coinvolgere i lavoratori nella consultazione: è un requisito esplicito della clausola 5.4, non opzionale',
      'Ignorare i near miss: sono indicatori preziosi di rischi latenti nel sistema',
    ],
    quickChips: [
      'Cos\'è la gerarchia dei controlli?',
      'Differenza pericolo vs rischio',
      'Come si gestisce un near miss?',
      'Partecipazione dei lavoratori: come funziona?',
    ],
  },

  // ─── UNI EN 13549:2003 ──────────────────────────────────────────────────────
  'uni-13549': {
    id: 'uni-13549',
    title: 'UNI EN 13549:2003 – Servizi di Pulizia Professionale: Requisiti di Base',
    scope:
      'Definisce i requisiti di base e le raccomandazioni per i sistemi di misurazione della qualità nei servizi di pulizia professionale. Applicabile a tutte le imprese di pulizia e facility management.',
    structure:
      'Norma europea che disciplina: definizione degli standard di pulizia contrattuali, sistema di ispezione e controllo, griglia di valutazione, gestione dei reclami, documentazione del servizio e competenza del personale.',
    keyPrinciples: [
      'Standard di pulizia definiti contrattualmente e misurabili obiettivamente',
      'Sistema di controllo qualità con ispezioni documentate e periodiche',
      'Griglia di valutazione standardizzata per misurare il livello di pulizia',
      'Gestione strutturata dei reclami con registrazione, analisi e feedback',
      'Piano di pulizia dettagliato con frequenze, metodi, prodotti e responsabilità',
      'Formazione e competenza del personale per ogni tipologia di superficie e area',
    ],
    keyTerms: {
      'Standard di pulizia': 'Il livello di pulizia accettabile concordato contrattualmente tra cliente e fornitore. Deve essere specifico e misurabile.',
      'Griglia di valutazione': 'Strumento standardizzato per valutare obiettivamente il livello di pulizia, assegnando punteggi agli elementi ispezionati in ogni area.',
      'Indice di pulizia': 'Punteggio numerico calcolato dalla griglia che riflette il livello di pulizia raggiunto rispetto allo standard concordato.',
      'Piano di pulizia': 'Documento che descrive attività, frequenze, metodi, prodotti chimici e responsabilità per ogni area/superficie da pulire.',
      'Ispezione di qualità': 'Controllo documentato del livello di pulizia, effettuato regolarmente con schede strutturate, esiti scritti e firme.',
      'Non conformità pulizie': 'Scostamento dal livello di pulizia concordato contrattualmente. Va registrata, analizzata e seguita da azione correttiva.',
    },
    auditTips: [
      'Verifica che il contratto definisca esplicitamente gli standard di pulizia per ogni area (uffici, bagni, aree critiche)',
      'Controlla il registro delle ispezioni: sono periodiche? Hanno esiti documentati e firme?',
      'Verifica la gestione dei reclami: ogni reclamo ha numero, data, analisi e feedback al cliente?',
      'Controlla la formazione del personale sui prodotti specifici e sulle tecniche per le diverse superfici',
    ],
    commonMistakes: [
      'Gestire i reclami verbalmente senza documentazione formale: ogni reclamo deve essere tracciato',
      'Effettuare ispezioni solo a seguito di reclamo invece che preventivamente e con cadenza definita',
      'Non aggiornare il piano di pulizia quando cambiano aree, frequenze o prodotti',
      'Definire standard di pulizia vaghi ("buona pulizia") invece che misurabili',
    ],
    quickChips: [
      'Come si misura la qualità del servizio?',
      'Cos\'è la griglia di valutazione?',
      'Come gestire un reclamo cliente?',
      'Piano di pulizia: cosa deve contenere?',
    ],
  },

  // ─── ISO 14064-1 ────────────────────────────────────────────────────────────
  'iso-14064': {
    id: 'iso-14064',
    title: 'ISO 14064-1:2018 – Quantificazione e Rendicontazione delle Emissioni GHG',
    scope:
      'Specifica i principi e i requisiti per la quantificazione e la rendicontazione delle emissioni e delle rimozioni di gas ad effetto serra (GHG) a livello di organizzazione.',
    structure:
      'Tre parti: ISO 14064-1 (a livello di organizzazione), ISO 14064-2 (a livello di progetto), ISO 14064-3 (verifica/assurance). Complementare al GHG Protocol Corporate Standard.',
    keyPrinciples: [
      'Rilevanza: includere tutte le fonti GHG significative nell\'inventario',
      'Completezza: coprire tutti gli Scope e le categorie di emissioni rilevanti',
      'Coerenza: usare metodologie consistenti nel tempo per confronti attendibili',
      'Accuratezza: minimizzare le incertezze di misurazione e calcolo',
      'Trasparenza: documentare ipotesi, metodologie e fonti dati in modo verificabile',
      'Verifica indipendente di terza parte per l\'assurance dell\'inventario',
    ],
    keyTerms: {
      'Scope 1': 'Emissioni DIRETTE da sorgenti di proprietà o controllate dall\'organizzazione (es: combustione caldaie interne, flotta aziendale, processi produttivi).',
      'Scope 2': 'Emissioni INDIRETTE associate alla generazione di energia elettrica, calore o vapore acquistati e consumati dall\'organizzazione.',
      'Scope 3': 'Altre emissioni INDIRETTE nella catena del valore: upstream (fornitori, trasporti in entrata, viaggi business) e downstream (uso prodotti, smaltimento).',
      'CO2e (tCO2e)': 'Tonnellate di CO2 equivalente: unità di misura standard che converte tutti i GHG in base al loro GWP (Global Warming Potential) su 100 anni.',
      'Fattore di emissione': 'Coefficiente che converte i dati di attività (es: litri di gasolio) in emissioni di GHG (es: kg CO2e). Deve essere aggiornato annualmente.',
      'Anno base': 'Anno di riferimento rispetto al quale si misurano le variazioni delle emissioni nel tempo. Fondamentale per tracking del miglioramento.',
      'Inventario GHG': 'L\'insieme quantificato di tutte le emissioni e rimozioni di GHG per un\'organizzazione in un periodo specifico.',
      'Rimozione GHG': 'Assorbimento di CO2 dall\'atmosfera tramite attività come rimboschimento o sequestro geologico del carbonio.',
    },
    auditTips: [
      'Verifica i confini organizzativi (controllo finanziario vs operativo) e operativi (quali Scope includere)',
      'Controlla la fonte e l\'anno dei fattori di emissione: sono aggiornati? Sono dalla fonte corretta (ISPRA, DEFRA, IEA)?',
      'Verifica la completezza delle categorie Scope 3 incluse: almeno quelle rilevanti per il settore',
      'Controlla la catena di custodia dei dati: da dove vengono? Sono verificabili? Ci sono gap?',
      'Verifica le emissioni fuggitive: refrigeranti, SF6 da impianti elettrici, perdite di metano',
    ],
    commonMistakes: [
      'Omettere le emissioni fuggitive (perdite di refrigerante, SF6): sono spesso significative!',
      'Usare fattori di emissione obsoleti non aggiornati all\'anno corrente della rendicontazione',
      'Confondere riduzione delle emissioni con acquisto di offset: la compensazione NON è riduzione',
      'Non distinguere correttamente le 15 categorie dello Scope 3 del GHG Protocol',
    ],
    quickChips: [
      'Spiega Scope 1, 2 e 3',
      'Come si calcola la carbon footprint?',
      'Cosa sono i fattori di emissione?',
      'Differenza riduzione vs compensazione CO2',
    ],
  },

  // ─── UNI EN 16636 ───────────────────────────────────────────────────────────
  'uni-16636': {
    id: 'uni-16636',
    title: 'UNI EN 16636:2015 – Servizi Professionali di Gestione degli Infestanti (Pest Management)',
    scope:
      'Specifica i requisiti di servizio e le competenze per i fornitori di servizi professionali di gestione degli infestanti (disinfestazione, derattizzazione, deblattizzazione, ecc.).',
    structure:
      'Copre: competenze e formazione del personale tecnico, valutazione del sito, pianificazione degli interventi, gestione integrata (IPM), documentazione completa di ogni attività, sicurezza nell\'uso dei biocidi.',
    keyPrinciples: [
      'IPM (Integrated Pest Management): approccio integrato che privilegia prevenzione e misure non chimiche',
      'Prevenzione sempre prioritaria rispetto al trattamento chimico',
      'Monitoraggio sistematico con trappole e postazioni documentate su mappa',
      'Uso responsabile, documentato e sicuro dei prodotti biocidi',
      'Documentazione completa e tracciabile di ogni ispezione e intervento',
      'Formazione e competenza certificata del personale tecnico (patentino biocidi)',
    ],
    keyTerms: {
      'IPM (Gestione Integrata)': 'Approccio che combina prevenzione strutturale, monitoraggio, metodi fisici/biologici e solo come ultima risorsa metodi chimici. Minimizza i rischi.',
      'Soglia di intervento': 'Il livello di infestazione oltre il quale è necessario intervenire attivamente per prevenire danni significativi alla salute o alle proprietà.',
      'Monitoraggio': 'Attività sistematica e documentata di rilevazione della presenza e densità degli infestanti tramite trappole, esche e ispezioni periodiche.',
      'Piano di gestione infestanti': 'Documento che descrive le strategie preventive adottate, la mappa dei punti di monitoraggio e i protocolli di intervento specifici per il sito.',
      'Biocida': 'Prodotto chimico usato per controllare gli infestanti. Richiede patentino professionale per acquisto e utilizzo. Regolamentato dal Reg. UE 528/2012.',
      'SDS (Scheda dati di sicurezza)': 'Safety Data Sheet: documento obbligatorio con composizione, rischi, modalità d\'uso, DPI necessari e smaltimento del biocida.',
      'Mappa punti di monitoraggio': 'Planimetria aggiornata che indica la posizione esatta di ogni trappola, esca o postazione di controllo nel sito del cliente.',
    },
    auditTips: [
      'Verifica la mappa dei punti di monitoraggio: è aggiornata? Corrisponde alle postazioni reali?',
      'Controlla il registro degli interventi: prodotti usati, dosi, aree trattate, firme tecnico e cliente',
      'Verifica le qualifiche del personale tecnico: hanno il patentino biocidi valido?',
      'Controlla lo stato delle postazioni: sono integre? Non manomesse? Funzionanti?',
      'Verifica che le misure preventive siano state comunicate e implementate prima del trattamento chimico',
    ],
    commonMistakes: [
      'Procedere direttamente al trattamento chimico senza implementare misure preventive: viola il principio IPM',
      'Non documentare le postazioni danneggiate o non funzionanti nella relazione di visita',
      'Non comunicare al cliente le azioni correttive strutturali necessarie (porte da sigillare, ecc.)',
      'Non aggiornare la mappa dei punti di monitoraggio quando cambiano postazioni o layout del sito',
    ],
    quickChips: [
      'Cos\'è l\'approccio IPM?',
      'Come si gestisce un\'infestazione da blatte?',
      'Quali documenti serve per ogni intervento?',
      'Differenza monitoraggio vs trattamento',
    ],
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getKnowledgeForCert(certId: string): CertKnowledge | null {
  return securityKnowledgeBase[certId] ?? null;
}

export function getQuickChips(certId?: string): string[] {
  if (!certId) {
    return [
      'Differenza ISO 9001 vs ISO 45001',
      'Cos\'è un audit interno ISO?',
      'Come prepararsi a una certificazione?',
      'Spiega la struttura HLS',
    ];
  }
  return securityKnowledgeBase[certId]?.quickChips ?? [];
}

/** Costruisce il system prompt del Tutor Sicurezza iniettando la knowledge base */
export function buildSecuritySystemPrompt(certId?: string): string {
  const basePersonality = `Sei SafetyTutor, un esperto di certificazioni e normative di sicurezza aziendale (ISO/UNI). \
Aiuti professionisti e studenti a prepararsi per certificazioni e audit. Il tuo approccio:
- Didattico e chiaro: spieghi concetti complessi con esempi pratici e concreti
- Incoraggiante: celebri i progressi, motivi l'utente, non giudichi gli errori
- Preciso: citi la clausola o il principio specifico della norma quando rilevante
- Interattivo: al termine della spiegazione proponi una domanda di verifica all'utente per consolidare l'apprendimento
- Conciso: risposte ben strutturate con punti elenco, non muri di testo

Rispondi sempre in italiano.`;

  if (!certId) {
    // General security tutor — conosce tutte e 6 le certificazioni
    const normsSummary = Object.values(securityKnowledgeBase)
      .map((k) => `• **${k.title}**: ${k.scope}`)
      .join('\n');
    return `${basePersonality}

## Certificazioni che conosci:
${normsSummary}

Se l'utente chiede di una norma specifica, approfondisci quella. Se chiede un confronto, guida la discussione in modo strutturato.`;
  }

  const k = securityKnowledgeBase[certId];
  if (!k) return basePersonality;

  const termsText = Object.entries(k.keyTerms)
    .map(([term, def]) => `• **${term}**: ${def}`)
    .join('\n');

  const principlesText = k.keyPrinciples.map((p) => `• ${p}`).join('\n');
  const tipsText = k.auditTips.map((t) => `• ${t}`).join('\n');
  const mistakesText = k.commonMistakes.map((m) => `• ${m}`).join('\n');

  return `${basePersonality}

## Tua specializzazione attuale: ${k.title}

### Ambito applicativo
${k.scope}

### Struttura della norma
${k.structure}

### Principi chiave
${principlesText}

### Termini fondamentali
${termsText}

### Consigli per gli audit
${tipsText}

### Errori comuni da evitare
${mistakesText}

Usa questo contesto per rispondere con precisione. Se l'utente chiede qualcosa fuori da questa norma, puoi rispondere con conoscenza generale indicando che non è il contesto attuale del corso.`;
}
