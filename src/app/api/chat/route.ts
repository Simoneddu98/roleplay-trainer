import { createOllama } from 'ollama-ai-provider';
import { streamText } from 'ai';

// IMPORTANTE: Usa 'nodejs' invece di 'edge' per evitare problemi con localhost
export const runtime = 'nodejs';

// Configurazione esplicita dell'indirizzo
const ollama = createOllama({
  baseURL: 'http://127.0.0.1:11434/api',
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    console.log("Tentativo connessione a Ollama con modello: efisio-custom");

    // Chiamata a Ollama
    const result = await streamText({
      model: ollama('efisio-custom'), // Il tuo modello fine-tunato
      messages,
      // NOTA: Non mettiamo 'system' qui se vuoi usare quello del Modelfile.
      // Se invece vuoi forzare Efisio Sardo sopra il modello base, decommenta sotto:
      // system: "Sei Efisio, rispondi in modo breve e sardo.",
    });

    return result.toDataStreamResponse();

  } catch (error) {
    console.error("ERRORE OLLAMA:", error);
    return new Response(JSON.stringify({ error: "Errore di connessione al modello locale" }), { status: 500 });
  }
}
