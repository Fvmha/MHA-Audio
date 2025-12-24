
import { GoogleGenAI, Modality } from "@google/genai";
import { Speaker } from "../types";
import { decode, decodeAudioData, audioBufferToWav } from "../utils/audioUtils";

const API_KEY = process.env.API_KEY || '';

export const generatePodcast = async (htmlContent: string): Promise<{ audioUrl: string; transcript: string; fileName: string }> => {
  if (!API_KEY) throw new Error("API Key no configurada.");

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  // 1. Convert HTML to a conversational script via text generation first (optional but better for quality)
  // For this implementation, we will use the prompt directly in the TTS model to generate content and audio.
  
  const prompt = `
    Eres un guionista experto para MasterHairAcademy. 
    Transforma el siguiente contenido HTML de una landing page en un diálogo natural y dinámico entre dos expertos: Carlos (voz masculina, tono profesional y entusiasta) y Elena (voz femenina, tono cálido y detallista).
    
    Contexto: MasterHairAcademy es la academia líder en formación de peluquería de alto nivel.
    Objetivo: Que alguien que no tiene tiempo de leer la landing se entere de los beneficios, cursos y la propuesta de valor.
    Dialecto: Español de España (Castellano puro).
    
    Contenido HTML a procesar:
    ${htmlContent.substring(0, 10000)} // Truncate to avoid token limits if necessary

    Estructura del diálogo:
    Carlos: [Saluda e introduce el tema]
    Elena: [Complementa con detalles del curso]
    Carlos: [Resalta beneficios específicos]
    Elena: [Explica la metodología]
    Carlos: [Cierre con llamada a la acción]
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        multiSpeakerVoiceConfig: {
          speakerVoiceConfigs: [
            {
              speaker: Speaker.Male,
              voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
            },
            {
              speaker: Speaker.Female,
              voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } }
            }
          ]
        }
      }
    }
  });

  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!base64Audio) {
    throw new Error("No se pudo generar el audio del podcast.");
  }

  // Handle audio context for decoding
  const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
  const decodedData = decode(base64Audio);
  const audioBuffer = await decodeAudioData(decodedData, audioCtx, 24000, 1);
  
  // Convert to WAV for easy distribution
  const wavBlob = audioBufferToWav(audioBuffer);
  const audioUrl = URL.createObjectURL(wavBlob);
  const fileName = `MHA-Podcast-${Date.now()}.wav`;

  return {
    audioUrl,
    transcript: "Transcripción generada automáticamente basada en la landing de MasterHairAcademy.",
    fileName
  };
};

// Simulation of WordPress REST API Upload
export const uploadToWordPress = async (audioUrl: string, fileName: string): Promise<boolean> => {
  console.log(`Simulando subida de ${fileName} a WordPress REST API...`);
  // En un escenario real aquí haríamos el fetch con autenticación JWT o Application Passwords
  // const response = await fetch('https://your-wp-site.com/wp-json/wp/v2/media', { ... });
  await new Promise(resolve => setTimeout(resolve, 2000));
  return true;
};
