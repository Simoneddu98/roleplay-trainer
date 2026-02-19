import { createOpenAI } from '@ai-sdk/openai';
import { streamText, convertToModelMessages, type UIMessage } from 'ai';
import { getPersonaById } from '@/data/personas';
import { buildSecuritySystemPrompt } from '@/data/security-knowledge';

const SECURITY_AREA_IDS = new Set([
  'iso-9001', 'iso-14001', 'iso-45001', 'uni-13549', 'iso-14064', 'uni-16636',
]);

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
  // ✅ Security Tutor: usa knowledge base completa
  if (persona === 'security-tutor') {
    return buildSecuritySystemPrompt(courseId);
  }

  // Se c'è una persona specifica, usa il suo prompt
  if (persona) {
    if (persona === 'efisio') {
      return "Sei Efisio, un tutor AI amichevole e competente dalla Sardegna. Aiuti gli studenti a imparare Vendita e Digital Marketing. Sei caloroso, incoraggiante e usi espressioni sarde come 'Ajò' e 'Eja'. Rispondi sempre in italiano. Spiega i concetti in modo chiaro e pratico, con esempi concreti.";
    }
    const found = getPersonaById(persona);
    if (found) return found.systemPrompt;
  }

  // Se c'è un courseId per area standard
  if (courseId === 'vendita') {
    return "Sei Marco, un cliente aziendale scettico ma aperto al dialogo. Stai valutando se acquistare un servizio/prodotto. Fai obiezioni realistiche, chiedi dettagli concreti e metti alla prova il venditore. Rispondi sempre in italiano.";
  }
  if (courseId === 'digital-marketing') {
    return "Sei Giulia, Head of Growth di una startup. Parli di strategie digitali con competenza, usi terminologia tecnica (SEO, CRO, funnel, ROAS) e ti aspetti risposte data-driven. Rispondi sempre in italiano.";
  }

  // ✅ Scenari security roleplay: prompt già passato dal frontend nel body.systemPrompt
  // Questo fallback è usato solo se per qualche motivo non arriva dal frontend.
  if (courseId && SECURITY_AREA_IDS.has(courseId)) {
    return buildSecuritySystemPrompt(courseId);
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
