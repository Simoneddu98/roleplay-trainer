import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

// IMPORTANTE: Usa 'nodejs' invece di 'edge' per evitare problemi con localhost
export const runtime = 'nodejs';

// Ollama espone un endpoint OpenAI-compatibile su /v1
const ollama = createOpenAI({
  baseURL: 'http://127.0.0.1:11434/v1',
  apiKey: 'ollama', // Ollama non richiede API key, ma il campo è obbligatorio
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    console.log("Tentativo connessione a Ollama con modello: efisio-custom");

    const result = await streamText({
      model: ollama('efisio-custom'),
      messages,
    });

    return result.toUIMessageStreamResponse();

  } catch (error) {
    console.error("ERRORE OLLAMA:", error);
    return new Response(JSON.stringify({ error: "Errore di connessione al modello locale" }), { status: 500 });
  }
}
