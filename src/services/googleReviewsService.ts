import { GoogleGenAI } from "@google/genai";
import { Review } from "../../types";

export async function fetchGoogleReviews(): Promise<{ reviews: Review[], mapsUrl?: string }> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
    
    const prompt = "Fetch the latest reviews for 'Hotel Dhruvtaara' located at Goregaon, Maharashtra. Return the reviews in a structured format including user name, rating (out of 5), comment, and date if available. Also provide the official Google Maps link for the place.";
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleMaps: {} }],
      },
    });

    const text = response.text;
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    let mapsUrl = "";
    if (groundingChunks) {
      const mapsChunk = groundingChunks.find(chunk => chunk.maps?.uri);
      if (mapsChunk?.maps?.uri) {
        mapsUrl = mapsChunk.maps.uri;
      }
    }

    // Since the response text might be markdown, we'll ask the model to return JSON in a second pass or parse it.
    // Actually, it's better to use responseSchema if possible, but googleMaps tool doesn't allow it.
    // "DO NOT set responseMimeType. DO NOT set responseSchema." when using googleMaps.
    
    // So we'll do a second call to parse the text into JSON if needed, or just parse the text.
    // Alternatively, we can just parse the text if it's structured well.
    
    // Let's try to parse the text. If it's not JSON, we'll use a second model call (without maps tool) to structure it.
    
    const parserPrompt = `Extract the reviews from the following text into a JSON array of objects with keys: userName, rating, comment, date. 
    Text: ${text}
    
    Return ONLY the JSON array.`;

    const parserResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: parserPrompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const reviewsJson = JSON.parse(parserResponse.text || "[]");
    
    const formattedReviews: Review[] = reviewsJson.map((r: any, index: number) => ({
      id: `google-${index}`,
      userName: r.userName || "Google User",
      rating: Number(r.rating) || 5,
      comment: r.comment || "",
      date: r.date || new Date().toISOString().split('T')[0],
      isGoogleReview: true
    }));

    return { reviews: formattedReviews, mapsUrl };
  } catch (error) {
    console.error("Error fetching Google reviews:", error);
    return { reviews: [] };
  }
}
