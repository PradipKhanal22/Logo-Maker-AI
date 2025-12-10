import { GoogleGenAI } from "@google/genai";
import { LogoFormData } from "../types";

const getSystemPrompt = () => {
  return "You are an expert graphic designer specializing in logo creation. Your task is to generate a professional, high-quality, vector-style logo based on the user's requirements. The output must be a single, clear image suitable for a brand identity.";
};

export const generateLogoImages = async (formData: LogoFormData): Promise<string[]> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing from environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const basePrompt = `
    Design a professional, creative logo for a brand.
    Brand Name: ${formData.brandName}
    Industry/Niche: ${formData.industry}
    Style: ${formData.style}
    Color Palette: ${formData.colors}
    ${formData.icon ? `Optional Icon/Symbol: ${formData.icon}` : ''}
    
    Focus on simplicity, memorability, and clear visual identity.
    Requirements:
    - Clean vector-style graphic or high-quality illustration.
    - Flat design, 2D, minimalist (unless style specifies 3D, Gradient, Isometric, or complex effects).
    - White or solid color background for easy extraction.
    - Visually balanced and instantly recognizable.
    - High contrast and professional typography if text is included.
    - Do not include realistic photos; focus on graphic design.
    - Provide the logo in a clean format suitable for web, print, and social media.
  `;

  const generateSingleVariation = async (index: number): Promise<string> => {
    // Add variation instruction to ensure diversity
    const prompt = `${basePrompt}\n\nCreate variation #${index + 1} with a unique creative approach within the specified style. Make it visually striking and scalable.`;
    
    // Generate a random seed for this specific request
    const randomSeed = Math.floor(Math.random() * 1000000) + index;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { text: prompt }
          ]
        },
        config: {
          systemInstruction: getSystemPrompt(),
          seed: randomSeed,
          // Explicitly ask for 1 image per request (default, but good for clarity)
        }
      });

      if (!response.candidates || response.candidates.length === 0) {
        throw new Error("No candidates returned from Gemini API");
      }

      const content = response.candidates[0].content;
      if (!content || !content.parts) {
        throw new Error("No content parts returned");
      }

      // Iterate through parts to find the image
      for (const part of content.parts) {
        if (part.inlineData && part.inlineData.data) {
          const mimeType = part.inlineData.mimeType || 'image/png';
          return `data:${mimeType};base64,${part.inlineData.data}`;
        }
      }

      throw new Error("No image data found in the response");
    } catch (error) {
      console.error(`Error generating variation ${index}:`, error);
      throw error;
    }
  };

  try {
    // Generate 4 variations in parallel using allSettled to be robust against single failures
    const results = await Promise.allSettled([
      generateSingleVariation(1),
      generateSingleVariation(2),
      generateSingleVariation(3),
      generateSingleVariation(4)
    ]);
    
    // Filter out failed requests and return only successful image strings
    const successfulLogos = results
      .filter((result): result is PromiseFulfilledResult<string> => result.status === 'fulfilled')
      .map(result => result.value);

    // If all failed, throw an error
    if (successfulLogos.length === 0) {
      // Check if we have any specific error messages from the rejected promises
      const errors = results
        .filter((result): result is PromiseRejectedResult => result.status === 'rejected')
        .map(result => result.reason?.message || "Unknown error");
      
      throw new Error(`Failed to generate logos. Errors: ${errors.join(', ')}`);
    }

    return successfulLogos;

  } catch (error) {
    console.error("Error generating logo batch:", error);
    throw error;
  }
};