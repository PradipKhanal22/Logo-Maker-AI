export interface LogoFormData {
  brandName: string;
  industry: string;
  style: LogoStyle;
  colors: string;
  icon?: string;
}

export enum LogoStyle {
  MINIMALIST = 'Minimalist',
  GRADIENT_3D = '3D Gradient',
  GEOMETRIC = 'Geometric',
  ABSTRACT = 'Abstract',
  MASCOT = 'Mascot',
  VINTAGE = 'Vintage',
  CYBERPUNK = 'Cyberpunk',
  HAND_DRAWN = 'Hand-drawn',
  NEGATIVE_SPACE = 'Negative Space',
  TECH = 'Tech Circuitry',
  ELEGANT = 'Elegant',
  ISOMETRIC = 'Isometric',
  POLYGONAL = 'Low Poly',
  GLITCH = 'Glitch Art'
}

export interface GeneratedLogo {
  imageUrl: string;
  promptUsed: string;
}