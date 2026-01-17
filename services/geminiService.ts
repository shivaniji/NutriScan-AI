import { GoogleGenAI, Type } from "@google/genai";
import { NutritionData } from "../types";

// Initialize Gemini Client
// API_KEY is injected by the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchNutritionData = async (foodQuery: string): Promise<NutritionData> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the nutritional content of the following food item: "${foodQuery}". 
      Provide a standard serving size estimate if not specified. 
      Return the data strictly in JSON format according to the schema.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            foodName: { type: Type.STRING, description: "Capitalized common name of the food" },
            servingSize: { type: Type.STRING, description: "e.g., '1 cup (200g)' or '1 medium apple'" },
            calories: { type: Type.NUMBER, description: "Total calories in kcal" },
            protein: { type: Type.NUMBER, description: "Protein in grams" },
            carbs: { type: Type.NUMBER, description: "Total carbohydrates in grams" },
            fat: { type: Type.NUMBER, description: "Total fat in grams" },
            fiber: { type: Type.NUMBER, description: "Dietary fiber in grams" },
            sugar: { type: Type.NUMBER, description: "Total sugars in grams" },
            healthTip: { type: Type.STRING, description: "A brief, one-sentence interesting health fact or tip about this food." },
          },
          required: ["foodName", "servingSize", "calories", "protein", "carbs", "fat", "fiber", "sugar", "healthTip"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No data returned from AI service.");
    }

    const data: NutritionData = JSON.parse(text);
    return data;
  } catch (error) {
    console.error("Error fetching nutrition data:", error);
    throw error;
  }
};