import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("VITE_GEMINI_API_KEY tidak diatur dalam file .env. Silakan tambahkan.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

const generationConfig = {
  temperature: 0.7,
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 2048,
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

export interface GeminiRequest {
  prompt: string;
  systemInstruction?: string;
}

export const generateContent = async ({ prompt, systemInstruction }: GeminiRequest): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash-latest",
      // systemInstruction dihapus dari sini untuk menghindari pemaksaan API v1beta
      generationConfig,
      safetySettings
    });

    // Gabungkan systemInstruction ke dalam prompt utama
    const fullPrompt = systemInstruction ? `${systemInstruction}\n\n---\n\n${prompt}` : prompt;

    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    
    if (response.promptFeedback?.blockReason) {
      return `Konten diblokir karena: ${response.promptFeedback.blockReason}. Coba dengan prompt yang berbeda.`;
    }
    
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    if (error instanceof Error) {
      if (error.message.includes('API key not valid')) {
        return "Error: Kunci API Gemini tidak valid. Silakan periksa file .env Anda.";
      }
      return `Error saat berkomunikasi dengan Gemini API: ${error.message}`;
    }
    return "Terjadi kesalahan yang tidak diketahui saat berkomunikasi dengan Gemini API.";
  }
};
