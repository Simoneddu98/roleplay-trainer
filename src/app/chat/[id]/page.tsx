'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ChatWindow from '@/components/chat/ChatWindow';
import { useAppStore } from '@/store/useStore';
import { allScenarios } from '@/data/scenarios';
import { gamificationRules } from '@/data/gamification';
import { Message } from '@/types';

const botResponses: Record<string, string[]> = {
  // ─── VENDITA ─────────────────────────────────────────
  'obiezioni-prezzo': [
    'Capisco il vostro punto, ma non siamo sicuri che il valore aggiunto giustifichi questa differenza. Potete darmi qualcosa di più concreto?',
    'Abbiamo un budget limitato per quest\'anno. Se non riuscite ad avvicinarvi al prezzo del competitor, dovrò valutare l\'alternativa.',
    'Interessante... Se inseriste anche la formazione del team e il supporto dedicato, potremmo riconsiderare. Cosa ne pensate?',
    'Ok, devo ammetterlo: la vostra proposta sta diventando più convincente. Fatemi un riepilogo finale e ne parlo con il CFO.',
  ],
  'feedback-correttivo': [
    'Ma scusa, il report era complesso e avevo anche altri compiti da portare avanti. Non è colpa mia se c\'era troppo lavoro.',
    'Ah... non sapevo che ci fossero errori nei dati. Quali dati in particolare? Io li ho controllati...',
    'Ok capisco, forse avrei dovuto chiedere aiuto prima. Come posso migliorare la prossima volta?',
    'Grazie per il feedback, apprezzo che tu sia stato diretto. Possiamo impostare un check settimanale così non si ripete?',
  ],
  'onboarding-nuovo-assunto': [
    'Grazie! Sono un po\' nervoso ma davvero entusiasta. Con chi lavorerò principalmente?',
    'Ah perfetto, sembra un team dinamico! Avete un documento o una wiki dove posso studiare il progetto?',
    'Ottimo, e per quanto riguarda le riunioni? Ci sono stand-up giornalieri o come vi organizzate?',
    'Fantastico, mi sento già più tranquillo. Una cosa: a chi posso rivolgermi se ho un dubbio tecnico urgente?',
  ],
  // ─── DIGITAL MARKETING & AI ──────────────────────────
  'strategia-social-cliente': [
    'Mmh ok, ma io non ho tempo di fare post tutti i giorni... Quanto tempo ci vuole realisticamente? E poi, devo fare le foto professionali o bastano quelle col telefono?',
    'Interessante l\'idea dei contenuti dietro le quinte. Ma cosa pubblico esattamente? I piatti? Le ricette? Non vorrei svelare i miei segreti...',
    'Ok mi convince. E per la pubblicità a pagamento? Ho sentito che con 5 euro al giorno si possono raggiungere migliaia di persone, è vero?',
    'Perfetto, mi piace l\'approccio graduale. Possiamo partire con Instagram e poi vedere. Mi fai un piano per le prime due settimane?',
  ],
  'campagna-ai-ads': [
    'Ma aspetta, quando dici AI intendi che il sistema decide da solo come spendere il budget? Non mi sembra sicuro... E se spende tutto in un giorno?',
    'Ok, il concetto di smart bidding mi è più chiaro ora. Ma come facciamo a sapere se funziona meglio dell\'approccio manuale che usiamo adesso?',
    'Ah, quindi possiamo fare un A/B test tra la gestione manuale e quella con AI? Quanto tempo ci serve per avere dati significativi?',
    'Ottimo, credo di avere abbastanza informazioni per presentarlo al cliente. Puoi preparami una slide con i punti principali e i risultati attesi?',
  ],
  'content-strategy-startup': [
    'Capisco, ma il nostro prodotto è molto tecnico, è un software HR per la gestione delle presenze. Come lo rendiamo interessante sui social? Non è esattamente "sexy" come argomento...',
    'Il concetto di thought leadership mi piace. Ma chi scrive gli articoli? Io non ho tempo e il dev non sa scrivere... Possiamo usare l\'AI per generare i contenuti?',
    'Ok, AI come assistente e non come sostituto, ha senso. E per la newsletter? Come facciamo a raccogliere iscritti partendo da zero? Il competitor ha anni di vantaggio.',
    'Mi piace l\'idea del lead magnet con il template gratuito. Ricapitoliamo: blog SEO-oriented, LinkedIn del CEO, newsletter con lead magnet. Quanto budget serve per partire?',
  ],
};

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const scenarioId = params.id as string;
  const { state, startScenario, addMessage, completeScenario } = useAppStore();

  const scenario = allScenarios.find((s) => s.id === scenarioId);

  useEffect(() => {
    if (!state.currentScenario || state.currentScenario.id !== scenarioId) {
      if (scenario) {
        startScenario(scenario);
      } else {
        router.push('/');
      }
    }
  }, [scenarioId]);

  const handleSendMessage = (content: string) => {
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: Date.now(),
    };
    addMessage(userMsg);

    const userMsgCount = state.chatMessages.filter((m) => m.role === 'user').length;
    const responses = botResponses[scenarioId] || [];

    if (userMsgCount < responses.length) {
      setTimeout(() => {
        const botMsg: Message = {
          id: `bot-${Date.now()}`,
          role: 'bot',
          content: responses[userMsgCount],
          timestamp: Date.now(),
        };
        addMessage(botMsg);

        if (userMsgCount === responses.length - 1 && scenario) {
          setTimeout(() => {
            completeScenario(scenarioId, scenario.xpReward + gamificationRules.xpPerScenarioComplete);
            const sysMsg: Message = {
              id: `sys-${Date.now()}`,
              role: 'system',
              content: `Scenario completato! Hai guadagnato ${scenario.xpReward + gamificationRules.xpPerScenarioComplete} XP. Torna alla dashboard per vedere i tuoi progressi.`,
              timestamp: Date.now(),
            };
            addMessage(sysMsg);
          }, 500);
        }
      }, 1200);
    }
  };

  const backUrl = scenario ? `/area/${scenario.areaId}` : '/';

  if (!state.currentScenario) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500">Caricamento scenario...</p>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <ChatWindow
        messages={state.chatMessages}
        onSendMessage={handleSendMessage}
        scenarioTitle={state.currentScenario.title}
        onBack={() => router.push(backUrl)}
      />
    </div>
  );
}
