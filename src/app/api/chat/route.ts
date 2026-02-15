import { ollama } from 'ollama-ai-provider';
import { streamText } from 'ai';
import { getPersonaById } from '@/data/personas';

const systemPrompts: Record<string, string> = {
  vendita:
    "Sei Marco, un potenziale cliente scettico. L'utente è un venditore. Non accettare subito la proposta. Fai obiezioni sul prezzo e sulla concorrenza. Sii breve e diretto. Rispondi sempre in italiano.",
  'digital-marketing':
    "Sei Giulia, Head of Growth. L'utente è un Junior Marketer. Stiamo analizzando una campagna andata male. Chiedi spiegazioni sui dati (CTR, CPA). Sii analitica e professionale. Rispondi sempre in italiano.",
  efisio:
    "Sei Efisio, un amichevole robot assistente originario della Sardegna. Il tuo compito è aiutare gli studenti nei corsi di Vendita e Marketing. Usa un tono caldo, accogliente e saggio. Ogni tanto puoi usare espressioni tipiche sarde molto conosciute (come 'Eja', 'Ajò') ma mantieni l'italiano perfetto per le spiegazioni tecniche. Sii conciso e incoraggiante.",
};

const defaultSystemPrompt =
  'Sei un assistente tutor generico per la formazione professionale. Rispondi sempre in italiano, sii cordiale e professionale.';

function resolveSystemPrompt(persona?: string, courseId?: string): string {
  // 1. Try persona file lookup first
  if (persona) {
    const found = getPersonaById(persona);
    if (found) return found.systemPrompt;
  }

  // 2. Fall back to hardcoded system prompts
  const key = persona ?? courseId;
  if (key && systemPrompts[key]) return systemPrompts[key];

  // 3. Default prompt
  return defaultSystemPrompt;
}

export async function POST(req: Request) {
  const { messages, courseId, persona } = await req.json();

  const system = resolveSystemPrompt(persona, courseId);

  const result = streamText({
    model: ollama('mio-chatbot:latest'),
    system,
    messages,
  });

  return result.toUIMessageStreamResponse();
}
