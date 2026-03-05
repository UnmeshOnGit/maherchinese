
import { GoogleGenAI, Type } from "@google/genai";
import { MAHER_MENU } from "../constants";

export const getAIRecommendations = async (userPrompt: string) => {
  try {
    // Create a new instance right before making the API call to ensure current API key is used.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Correcting the prompt to include dish IDs so the model can actually reference them.
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a culinary assistant for 'Hotel Maher'. 
      Based on the user's request: "${userPrompt}", suggest the best items from our menu.
      
      Our Menu: ${JSON.stringify(MAHER_MENU.map(d => ({ id: d.id, name: d.name, category: d.category, desc: d.description })))}
      
      Respond in JSON format with a friendly message and a list of dish IDs that match.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            message: { type: Type.STRING, description: "Friendly recommendation message" },
            recommendedDishIds: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Numeric IDs of dishes from the provided menu list (e.g. '1', '12')"
            }
          },
          required: ["message", "recommendedDishIds"]
        }
      }
    });

    // The `GenerateContentResponse` object has a `text` property (not a method).
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      message: "I'm having a little trouble connecting to the kitchen right now, but I'd suggest our Maher Special!",
      recommendedDishIds: ['40']
    };
  }
};
