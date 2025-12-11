
export interface LogoFormData {
  brandName: string;
  industry: string;
  style: LogoStyle;
  colors: string;
  icon?: string;
}

export enum LogoStyle {
  MINIMALIST = 'Minimalist',
  MODERN_LUXURY = 'Modern Luxury',
  GRADIENT_3D = '3D Gradient',
  GEOMETRIC = 'Geometric',
  ABSTRACT_FLUID = 'Abstract Fluid',
  MASCOT_MODERN = 'Modern Mascot',
  VINTAGE_RETRO = 'Vintage Retro',
  CYBERPUNK_NEON = 'Cyberpunk Neon',
  HAND_DRAWN = 'Hand-drawn',
  NEGATIVE_SPACE = 'Negative Space',
  TECH_FUTURISTIC = 'Tech Futuristic',
  ELEGANT_SERIF = 'Elegant Serif',
  ISOMETRIC_3D = 'Isometric 3D',
  LOW_POLY = 'Low Poly',
  GLITCH_ART = 'Glitch Art',
  MONOGRAM = 'Monogram',
  NEUROMORPHIC = 'Neuromorphic',
  POP_ART = 'Pop Art'
}

export interface GeneratedLogo {
  imageUrl: string;
  promptUsed: string;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  formData: LogoFormData;
  images: string[];
}
