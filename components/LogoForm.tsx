
import React, { useState } from 'react';
import { LogoFormData, LogoStyle } from '../types';
import { Sparkles, Briefcase, Layers, Type, Info } from 'lucide-react';
import { ColorPicker } from './ColorPicker';

interface LogoFormProps {
  onSubmit: (data: LogoFormData) => void;
  isGenerating: boolean;
}

// Visual configurations for each style to render the preview
const STYLE_PREVIEWS: Record<LogoStyle, { bg: string; text: string; font: string; border?: string; effect?: React.ReactNode }> = {
  [LogoStyle.MINIMALIST]: {
    bg: "bg-white",
    text: "text-slate-900 font-bold tracking-tight",
    font: "sans-serif",
    border: "border-2 border-slate-900",
    effect: <div className="absolute w-8 h-8 rounded-full bg-slate-900 -top-2 -right-2 opacity-10"></div>
  },
  [LogoStyle.MODERN_LUXURY]: {
    bg: "bg-slate-950",
    text: "text-amber-200 tracking-[0.2em] uppercase",
    font: "serif",
    border: "border border-amber-500/30",
    effect: <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-amber-500/10"></div>
  },
  [LogoStyle.GRADIENT_3D]: {
    bg: "bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500",
    text: "text-white font-bold drop-shadow-md",
    font: "sans-serif",
    effect: <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]"></div>
  },
  [LogoStyle.GEOMETRIC]: {
    bg: "bg-slate-100",
    text: "text-slate-900 font-mono font-bold",
    font: "monospace",
    border: "border-2 border-slate-900",
    effect: <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '8px 8px', opacity: 0.2 }}></div>
  },
  [LogoStyle.ABSTRACT_FLUID]: {
    bg: "bg-slate-900",
    text: "text-white font-medium italic",
    font: "sans-serif",
    effect: <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-teal-400 blur-xl opacity-50 rounded-full animate-pulse"></div>
  },
  [LogoStyle.MASCOT_MODERN]: {
    bg: "bg-orange-500",
    text: "text-white font-black uppercase drop-shadow-[0_2px_0_rgba(0,0,0,0.5)]",
    font: "sans-serif",
    border: "border-4 border-white",
    effect: null
  },
  [LogoStyle.VINTAGE_RETRO]: {
    bg: "bg-[#f5e6d3]", // Cream
    text: "text-[#4a3b2a] font-serif uppercase tracking-widest",
    font: "serif",
    border: "border-2 border-dashed border-[#4a3b2a]",
    effect: <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-20"></div>
  },
  [LogoStyle.CYBERPUNK_NEON]: {
    bg: "bg-black",
    text: "text-cyan-400 font-mono font-bold drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]",
    font: "monospace",
    border: "border border-pink-500 box-shadow-[0_0_10px_#ec4899]",
    effect: <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent"></div>
  },
  [LogoStyle.HAND_DRAWN]: {
    bg: "bg-white",
    text: "text-slate-800 italic font-semibold",
    font: "cursive",
    border: "border-2 border-slate-800 rounded-[2rem]", // Simulate rough shape
    effect: null
  },
  [LogoStyle.NEGATIVE_SPACE]: {
    bg: "bg-slate-900",
    text: "text-white font-bold tracking-tighter",
    font: "sans-serif",
    effect: <div className="w-6 h-6 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mix-blend-exclusion"></div>
  },
  [LogoStyle.TECH_FUTURISTIC]: {
    bg: "bg-slate-900",
    text: "text-blue-400 font-mono uppercase tracking-widest",
    font: "monospace",
    border: "border-x-2 border-blue-500",
    effect: <div className="absolute inset-x-0 top-1/2 h-[1px] bg-blue-500/50"></div>
  },
  [LogoStyle.ELEGANT_SERIF]: {
    bg: "bg-[#f8fafc]",
    text: "text-slate-900 font-serif italic text-2xl",
    font: "serif",
    border: "border border-slate-200",
    effect: null
  },
  [LogoStyle.ISOMETRIC_3D]: {
    bg: "bg-indigo-100",
    text: "text-indigo-900 font-bold transform -skew-y-3",
    font: "sans-serif",
    border: "border-b-4 border-r-4 border-indigo-900",
    effect: null
  },
  [LogoStyle.LOW_POLY]: {
    bg: "bg-slate-800",
    text: "text-emerald-400 font-bold uppercase",
    font: "sans-serif",
    effect: <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%,transparent_100%)] bg-[length:10px_10px]"></div>
  },
  [LogoStyle.GLITCH_ART]: {
    bg: "bg-slate-900",
    text: "text-white font-bold uppercase tracking-widest",
    font: "sans-serif",
    effect: (
      <>
        <div className="absolute inset-0 text-red-500 font-bold uppercase tracking-widest flex items-center justify-center translate-x-[2px] opacity-70 mix-blend-screen">GLITCH</div>
        <div className="absolute inset-0 text-cyan-500 font-bold uppercase tracking-widest flex items-center justify-center -translate-x-[2px] opacity-70 mix-blend-screen">GLITCH</div>
      </>
    )
  },
  [LogoStyle.MONOGRAM]: {
    bg: "bg-slate-800",
    text: "text-white font-serif text-3xl font-bold",
    font: "serif",
    border: "border-4 border-double border-slate-600",
    effect: null
  },
  [LogoStyle.NEUROMORPHIC]: {
    bg: "bg-slate-200",
    text: "text-slate-500 font-bold",
    font: "sans-serif",
    border: "shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_2px_2px_5px_rgba(0,0,0,0.1)] rounded-xl",
    effect: null
  },
  [LogoStyle.POP_ART]: {
    bg: "bg-yellow-400",
    text: "text-black font-black italic drop-shadow-[2px_2px_0_white]",
    font: "sans-serif",
    effect: <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(black 1px, transparent 1px)', backgroundSize: '4px 4px', opacity: 0.1 }}></div>
  }
};

export const LogoForm: React.FC<LogoFormProps> = ({ onSubmit, isGenerating }) => {
  const [formData, setFormData] = useState<LogoFormData>({
    brandName: '',
    industry: '',
    style: LogoStyle.MINIMALIST,
    colors: 'Black (#000000) & White (#FFFFFF)',
    icon: ''
  });

  const [hoveredStyle, setHoveredStyle] = useState<LogoStyle | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (colorValue: string) => {
    setFormData(prev => ({ ...prev, colors: colorValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Determine which style to show in preview (hovered > selected)
  const activeStyle = hoveredStyle || formData.style;
  const previewConfig = STYLE_PREVIEWS[activeStyle];

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 shadow-xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          Start Your Design
        </h2>
        <p className="text-slate-400 text-sm mt-1">Fill in the details to generate your unique logo.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Brand Name */}
        <div className="space-y-2">
          <label htmlFor="brandName" className="block text-sm font-medium text-slate-300 flex items-center gap-2">
            <Type className="w-4 h-4" /> Brand Name
          </label>
          <input
            type="text"
            id="brandName"
            name="brandName"
            required
            placeholder="e.g. Apex Innovations"
            value={formData.brandName}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none placeholder-slate-600"
          />
        </div>

        {/* Industry */}
        <div className="space-y-2">
          <label htmlFor="industry" className="block text-sm font-medium text-slate-300 flex items-center gap-2">
            <Briefcase className="w-4 h-4" /> Industry / Niche
          </label>
          <input
            type="text"
            id="industry"
            name="industry"
            required
            placeholder="e.g. Tech, Bakery, Real Estate"
            value={formData.industry}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none placeholder-slate-600"
          />
        </div>

        {/* Style Selection */}
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <label htmlFor="style" className="block text-sm font-medium text-slate-300 flex items-center gap-2">
              <Layers className="w-4 h-4" /> Visual Style
            </label>
            <span className="text-xs text-indigo-400 font-medium">{activeStyle}</span>
          </div>
          
          {/* Dynamic Style Preview Box */}
          <div 
            className={`h-24 w-full rounded-xl flex items-center justify-center overflow-hidden relative transition-all duration-300 shadow-inner ${previewConfig.bg} ${previewConfig.border || 'border border-slate-700'}`}
          >
             {previewConfig.effect}
             <span className={`relative z-10 text-xl md:text-2xl ${previewConfig.text}`}>
               {activeStyle === LogoStyle.GLITCH_ART ? 'GLITCH' : (formData.brandName || 'BRAND')}
             </span>
             <div className="absolute bottom-2 right-2 opacity-50">
                <Info className="w-4 h-4 text-current mix-blend-difference" />
             </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
            {Object.values(LogoStyle).map((style) => (
              <button
                key={style}
                type="button"
                onMouseEnter={() => setHoveredStyle(style)}
                onMouseLeave={() => setHoveredStyle(null)}
                onClick={() => setFormData(prev => ({ ...prev, style }))}
                className={`text-xs py-2 px-2 rounded-lg border transition-all duration-200 truncate ${
                  formData.style === style
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200'
                }`}
                title={style}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Colors (New Component) */}
        <ColorPicker 
          value={formData.colors} 
          onChange={handleColorChange} 
        />

        {/* Optional Icon */}
        <div className="space-y-2">
          <label htmlFor="icon" className="block text-sm font-medium text-slate-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Optional Symbol/Icon
          </label>
          <input
            type="text"
            id="icon"
            name="icon"
            placeholder="e.g. Mountain peak, Coffee bean, Abstract wave"
            value={formData.icon}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none placeholder-slate-600"
          />
        </div>

        <button
          type="submit"
          disabled={isGenerating}
          className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-[1.02] ${
            isGenerating
              ? 'bg-slate-700 cursor-not-allowed text-slate-400'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-indigo-500/30'
          }`}
        >
          {isGenerating ? 'Designing...' : 'Generate Logo'}
        </button>
      </form>
    </div>
  );
};
