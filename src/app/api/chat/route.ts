import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

const systemPrompts: Record<string, string> = {
  vendita:
    "Sei Marco, un potenziale cliente scettico. L'utente è un venditore. Non accettare subito la proposta. Fai obiezioni sul prezzo e sulla concorrenza. Sii breve e diretto. Rispondi sempre in italiano.",
  'digital-marketing':
    "Sei Giulia, Head of Growth. L'utente è un Junior Marketer. Stiamo analizzando una campagna andata male. Chiedi spiegazioni sui dati (CTR, CPA). Sii analitica e professionale. Rispondi sempre in italiano.",
};

const defaultSystemPrompt =
  'Sei un assistente tutor generico per la formazione professionale. Rispondi sempre in italiano, sii cordiale e professionale.';

export async function POST(req: Request) {
  const { messages, courseId } = await req.json();

  const system = systemPrompts[courseId] ?? defaultSystemPrompt;

  const result = streamText({
    model: google('models/gemini-2.0-flash'),
    system,
    messages,
  });

  return result.toUIMessageStreamResponse();
}
