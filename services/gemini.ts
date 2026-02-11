
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateValidation(postContent: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate 3-5 high-quality, supportive, and realistic social media comments for the following personal post: "${postContent}". The comments should sound like they are coming from close friends or supportive community members. Keep them reflective and personal.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              authorName: { type: Type.STRING },
              content: { type: Type.STRING }
            },
            required: ["authorName", "content"]
          }
        }
      }
    });

    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Error generating validation:", error);
    return [
      { authorName: "Kind Soul", content: "This is so beautifully expressed. Thank you for sharing." },
      { authorName: "Old Friend", content: "I'm always here for you. You've got this!" }
    ];
  }
}
