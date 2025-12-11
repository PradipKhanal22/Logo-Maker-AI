import { GoogleGenAI } from "@google/genai";
import { LogoFormData, LogoStyle } from "../types";

const getSystemPrompt = () => {
  return "You are an expert Senior Brand Identity Designer. Your task is to generate award-winning, professional, vector-style logos. You focus on modern aesthetics, perfect composition, and scalability. Do not produce generic clipart. Output high-definition graphic design.";
};

const getStyleEnhancements = (style: LogoStyle): string => {
  const mapping: Record<string, string> = {
    [LogoStyle.MINIMALIST]: "Ultra-clean, Swiss design, thick bold lines, excessive negative space, Apple-esque, sans-serif, flat colors, less is more.",
    [LogoStyle.MODERN_LUXURY]: "Gold foil texture styling, elegant serif typography, high-end fashion aesthetic, sophisticated, minimalist, black and white or gold.",
    [LogoStyle.GRADIENT_3D]: "Vibrant color mesh gradients, soft shadows, depth, modern tech startup style, glossy finish, app icon aesthetic, glass details.",
    [LogoStyle.GEOMETRIC]: "Sacred geometry, perfect circles and squares, Bauhaus influence, mathematical precision, grid-based design, structural.",
    [LogoStyle.ABSTRACT_FLUID]: "Organic shapes, flowing lines, liquid gradients, contemporary art, motion, dynamic, soft curves, abstract representation.",
    [LogoStyle.MASCOT_MODERN]: "Vector illustration, esports style, bold outlines, flat shading, character design, expressive, sticker art style.",
    [LogoStyle.VINTAGE_RETRO]: "Textured, badge style, 70s typography, faded colors, stamp effect, hipster aesthetic, artisanal.",
    [LogoStyle.CYBERPUNK_NEON]: "Glowing neon lines, dark background, futuristic, glitch elements, high contrast, synthwave aesthetic.",
    [LogoStyle.HAND_DRAWN]: "Artistic sketch, charcoal style, organic imperfections, signature style, doodle aesthetic, personal touch.",
    [LogoStyle.NEGATIVE_SPACE]: "Clever dual meaning, hidden shapes, gestalt principles, smart design, intellectual, optical illusion.",
    [LogoStyle.TECH_FUTURISTIC]: "Circuitry patterns, dots and nodes, data visualization style, sci-fi, sleek, metallic finishes, blue and silver.",
    [LogoStyle.ELEGANT_SERIF]: "Editorial design, high-contrast typography, vogue style, thin lines, refined, classical yet modern.",
    [LogoStyle.ISOMETRIC_3D]: "3D architectural view, blocky, construction feel, sims style, distinct lighting, floating elements.",
    [LogoStyle.LOW_POLY]: "Polygon mesh, faceted crystal look, sharp edges, triangular shapes, digital art.",
    [LogoStyle.GLITCH_ART]: "Digital distortion, chromatic aberration, pixel sorting, data moshing, raw, edgy, modern streetwear style.",
    [LogoStyle.MONOGRAM]: "Intertwined letters, typography-based, custom lettering, corporate, timeless, initials focus.",
    [LogoStyle.NEUROMORPHIC]: "Soft plastic look, inner shadows, embossed effect, tactile, soft UI design, modern interface style.",
    [LogoStyle.POP_ART]: "Halftone dots, comic book style, bold primary colors, warhol influence, outline heavy, punchy."
  };

  return mapping[style] || "Clean, modern, professional vector graphic.";
};

export const generateLogoImages = async (formData: LogoFormData): Promise<string[]> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing from environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const styleDirectives = getStyleEnhancements(formData.style);

  const basePrompt = `
    Create a Modern, Award-Winning Logo Design.
    
    Brand Details:
    - Name: "${formData.brandName}"
    - Industry: ${formData.industry}
    - Primary Visual Style: ${formData.style}
    - Color Palette: ${formData.colors}
    ${formData.icon ? `- Key Icon/Symbol: ${formData.icon}` : ''}

    Art Direction & Style Rules (${formData.style}):
    ${styleDirectives}

    Strict Design Constraints:
    1. VISUAL STYLE: Must look like a high-quality vector graphic (SVG style). Clean edges, perfect composition.
    2. BACKGROUND: Pure white background (Hex #FFFFFF) for easy extraction.
    3. QUALITY: Trending on Dribbble/Behance. Professional studio standard. NO blurry pixels, NO artifacts.
    4. CONTENT: Focus on the LOGO MARK. If text is included, ensure it is legible and uses modern typography.
    5. AVOID: Photorealism, complex shading (unless 3D style), generic clip-art, messy details, holding objects (like hands holding the logo).

    The output must be a singular, striking brand mark.
  `;

  const generateSingleVariation = async (index: number): Promise<string> => {
    // Add specific variation nuances
    const variations = [
      "Focus on a bold, iconic symbol with minimal text.",
      "Focus on a creative combination of the initial letter and the industry symbol.",
      "Focus on an abstract, modern interpretation of the brand concept.",
      "Focus on a balanced composition with strong typography and a unique mark."
    ];

    const nuance = variations[index % variations.length];

    const prompt = `${basePrompt}\n\nVariation ${index + 1} Directive: ${nuance}\nMake this design unique and distinct from the others.`;
    
    const randomSeed = Math.floor(Math.random() * 10000000) + index;

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
        }
      });

      if (!response.candidates || response.candidates.length === 0) {
        throw new Error("No candidates returned from Gemini API");
      }

      const content = response.candidates[0].content;
      if (!content || !content.parts) {
        throw new Error("No content parts returned");
      }

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
    const successfulLogos: string[] = [];
    const errors: string[] = [];

    // Execute sequentially to avoid Rate Limiting (Quota Exceeded)
    for (let i = 0; i < 4; i++) {
      try {
        const logo = await generateSingleVariation(i);
        successfulLogos.push(logo);
      } catch (err: any) {
        console.warn(`Failed to generate variation ${i + 1}:`, err);
        errors.push(err.message || "Unknown error");
        
        // If quota exceeded, stop attempting further requests to prevent account lockout
        if (err.message && (err.message.includes('429') || err.message.toLowerCase().includes('quota'))) {
           break;
        }
      }
    }

    if (successfulLogos.length === 0) {
      // Improve error message for users
      if (errors.some(e => e.includes('429') || e.toLowerCase().includes('quota'))) {
        throw new Error("Service is busy (Quota Exceeded). Please wait a moment and try again.");
      }
      throw new Error(`Failed to generate logos. ${errors[0] || 'Please try again.'}`);
    }

    return successfulLogos;

  } catch (error) {
    console.error("Error generating logo batch:", error);
    throw error;
  }
};