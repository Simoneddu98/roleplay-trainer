import { createOpenAI } from '@ai-sdk/openai';
import { streamText, convertToModelMessages, type UIMessage } from 'ai';
import { getPersonaById } from '@/data/personas';

// IMPORTANTE: Usa 'nodejs' invece di 'edge' per evitare problemi con localhost
export const runtime = 'nodejs';
export const maxDuration = 30;

// Ollama espone un endpoint OpenAI-compatibile su /v1
const ollama = createOpenAI({
  baseURL: 'http://127.0.0.1:11434/v1',
  apiKey: 'ollama', // Ollama non richiede API key, ma il campo è obbligatorio
});

// System prompts per area o persona
function resolveSystemPrompt(persona?: string, courseId?: string): string {
  // Se c'è una persona specifica, usa il suo prompt
  if (persona) {
    if (persona === 'efisio') {
      return "Sei Efisio, un tutor AI amichevole e competente dalla Sardegna. Aiuti gli studenti a imparare Vendita e Digital Marketing. Sei caloroso, incoraggiante e usi espressioni sarde come 'Ajò' e 'Eja'. Rispondi sempre in italiano. Spiega i concetti in modo chiaro e pratico, con esempi concreti.";
    }
    const found = getPersonaById(persona);
    if (found) return found.systemPrompt;
  }

  // Se c'è un courseId, usa il prompt dell'area
  if (courseId === 'vendita') {
    return "Sei Marco, un cliente aziendale scettico ma aperto al dialogo. Stai valutando se acquistare un servizio/prodotto. Fai obiezioni realistiche, chiedi dettagli concreti e metti alla prova il venditore. Rispondi sempre in italiano.";
  }
  if (courseId === 'digital-marketing') {
    return "Sei Giulia, Head of Growth di una startup. Parli di strategie digitali con competenza, usi terminologia tecnica (SEO, CRO, funnel, ROAS) e ti aspetti risposte data-driven. Rispondi sempre in italiano.";
  }

  // Prompts fallback per le aree security (usati solo se il frontend non passa systemPrompt)
  if (courseId === 'iso-9001') {
    return "Sei un personaggio in una simulazione di formazione ISO 9001:2015. Interpreti il ruolo assegnato nel contesto dello scenario (responsabile di reparto, auditor, ecc.). Rispondi in italiano in modo realistico e professionale, mantenendo il tuo personaggio con le sue caratteristiche (difensivo, scettico, collaborativo, ecc.) come descritto nello scenario. Non uscire dal personaggio.";
  }
  if (courseId === 'iso-14001') {
    return "Sei un personaggio in una simulazione di formazione ISO 14001:2015 gestione ambientale. Interpreti il ruolo assegnato (responsabile HSE, capo reparto, ecc.). Rispondi in italiano in modo realistico, mantenendo le caratteristiche del tuo personaggio. Non uscire dal personaggio.";
  }
  if (courseId === 'iso-45001') {
    return "Sei un personaggio in una simulazione di formazione ISO 45001:2018 salute e sicurezza sul lavoro. Interpreti il ruolo assegnato (capocantiere, capo magazzino, ecc.). Rispondi in italiano in modo realistico, mantenendo le caratteristiche del tuo personaggio. Non uscire dal personaggio.";
  }
  if (courseId === 'uni-13549') {
    return "Sei un personaggio in una simulazione di formazione UNI EN 13549:2003 servizi di pulizia. Interpreti il ruolo assegnato (referente cliente, responsabile qualità, ecc.). Rispondi in italiano in modo realistico, mantenendo le caratteristiche del tuo personaggio. Non uscire dal personaggio.";
  }
  if (courseId === 'iso-14064') {
    return "Sei un personaggio in una simulazione di formazione ISO 14064-1 emissioni GHG. Interpreti il ruolo assegnato (CFO, responsabile ambiente, ecc.). Rispondi in italiano in modo realistico, mantenendo le caratteristiche del tuo personaggio. Non uscire dal personaggio.";
  }
  if (courseId === 'uni-16636') {
    return "Sei un personaggio in una simulazione di formazione UNI EN 16636 pest management. Interpreti il ruolo assegnato (responsabile qualità, direttore hotel, ecc.). Rispondi in italiano in modo realistico, mantenendo le caratteristiche del tuo personaggio. Non uscire dal personaggio.";
  }

  // Fallback generico
  return "Sei un tutor AI per la formazione professionale. Rispondi in italiano in modo chiaro, pratico e professionale.";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, persona, courseId, systemPrompt: bodySystemPrompt } = body as {
      messages: UIMessage[];
      persona?: string;
      courseId?: string;
      // ✅ FIX: il frontend può passare il system prompt dello scenario direttamente
      systemPrompt?: string;
    };

    // Il systemPrompt del body (estratto dallo scenario) ha precedenza sul fallback
    const systemPrompt = bodySystemPrompt || resolveSystemPrompt(persona, courseId);

    // Converte UIMessages (formato frontend con parts) in ModelMessages (formato LLM)
    const modelMessages = await convertToModelMessages(messages);

    const result = await streamText({
      model: ollama('efisio-custom'),
      system: systemPrompt,
      messages: modelMessages,
    });

    return result.toUIMessageStreamResponse();

  } catch (error) {
    console.error("ERRORE OLLAMA:", error);
    return new Response(
      JSON.stringify({ error: "Errore di connessione al modello locale" }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
