'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ChatWindow from '@/components/chat/ChatWindow';
import { useAppStore } from '@/store/useStore';
import { scenarios } from '@/data/scenarios';
import { gamificationRules } from '@/data/gamification';
import { Message } from '@/types';

const botResponses: Record<string, string[]> = {
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
};

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const scenarioId = params.id as string;
  const { state, startScenario, addMessage, completeScenario } = useAppStore();

  useEffect(() => {
    if (!state.currentScenario || state.currentScenario.id !== scenarioId) {
      const scenario = scenarios.find((s) => s.id === scenarioId);
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

        if (userMsgCount === responses.length - 1) {
          const scenario = scenarios.find((s) => s.id === scenarioId);
          if (scenario) {
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
        }
      }, 1200);
    }
  };

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
        onBack={() => router.push('/')}
      />
    </div>
  );
}
