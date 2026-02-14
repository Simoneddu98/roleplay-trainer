import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// Imposta il runtime su edge per velocità massima (opzionale, ma consigliato)
export const runtime = 'edge';

export async function POST(req: Request) {
    try {
        // 1. Leggi il messaggio e i parametri dal frontend
        const { messages, persona, courseId } = await req.json();

        // 2. Definisci il System Prompt in base a chi deve rispondere
        let systemPrompt = "Sei un assistente utile.";

        if (persona === 'efisio') {
            systemPrompt = `Sei Efisio, un amichevole robot assistente originario della Sardegna. 
      Il tuo compito è aiutare gli studenti. Usa un tono caldo, accogliente e saggio. 
      Ogni tanto usa espressioni tipiche sarde (come 'Eja', 'Ajò') ma mantieni l'italiano perfetto. 
      Sii conciso.`;
        } else if (courseId === 'sales') {
            systemPrompt = "Sei un cliente difficile. Fai obiezioni sul prezzo.";
        } else if (courseId === 'marketing') {
            systemPrompt = "Sei un Head of Growth analitico. Chiedi i dati dei KPI.";
        }

        // 3. Chiama Gemini
        const result = await streamText({
            model: google('models/gemini-1.5-flash'), // Assicurati che il modello sia corretto
            system: systemPrompt,
            messages,
        });

        // 4. Restituisci lo stream
        return result.toDataStreamResponse();

    } catch (error) {
        console.error("Errore API Chat:", error);
        return new Response(JSON.stringify({ error: "Errore interno del server" }), { status: 500 });
    }
}
