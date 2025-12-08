export interface LogoFormData {
  brandName: string;
  industry: string;
  style: LogoStyle;
  colors: string;
  icon?: string;
}

export enum LogoStyle {
  MINIMALIST = 'Minimalist',
  VINTAGE = 'Vintage',
  CARTOONISH = 'Cartoonish',
  FUTURISTIC = 'Futuristic',
  ELEGANT = 'Elegant',
  GEOMETRIC = 'Geometric',
  ABSTRACT = 'Abstract',
  MONOGRAM = 'Monogram'
}

export interface GeneratedLogo {
  imageUrl: string;
  promptUsed: string;
}
