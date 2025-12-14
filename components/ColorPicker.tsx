
import React, { useState, useEffect } from 'react';
import { Palette, Check, Plus } from 'lucide-react';

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

interface ColorPalette {
  name: string;
  value: string;
  colors: string[];
}

const PRESET_PALETTES: ColorPalette[] = [
  { name: 'Classic Monochrome', value: 'Black (#000000) & White (#FFFFFF)', colors: ['#000000', '#FFFFFF'] },
  { name: 'Tech Blue', value: 'Royal Blue (#2563EB) & Silver', colors: ['#2563EB', '#E2E8F0'] },
  { name: 'Luxury Gold', value: 'Gold (#D4AF37) & Black', colors: ['#000000', '#D4AF37'] },
  { name: 'Eco Nature', value: 'Forest Green (#059669) & Earth Tones', colors: ['#059669', '#78350F'] },
  { name: 'Vibrant Sunset', value: 'Orange (#EA580C) & Purple (#9333EA)', colors: ['#EA580C', '#9333EA'] },
  { name: 'Pastel Dream', value: 'Soft Pink (#F9A8D4) & Lavender', colors: ['#F9A8D4', '#E9D5FF'] },
  { name: 'Cyber Neon', value: 'Neon Cyan (#06B6D4) & Magenta', colors: ['#06B6D4', '#DB2777'] },
  { name: 'Corporate Trust', value: 'Navy (#1E3A8A) & Grey', colors: ['#1E3A8A', '#94A3B8'] },
  // New Palettes
  { name: 'Fiery Passion', value: 'Red (#DC2626) & Charcoal', colors: ['#DC2626', '#1F2937'] },
  { name: 'Oceanic Depth', value: 'Teal (#0F766E) & Aqua', colors: ['#0F766E', '#99F6E4'] },
  { name: 'Royal Majesty', value: 'Deep Purple (#581C87) & Gold', colors: ['#581C87', '#FBBF24'] },
  { name: 'Urban Concrete', value: 'Slate (#475569) & Orange', colors: ['#475569', '#F97316'] },
  { name: 'Midnight Lime', value: 'Midnight (#020617) & Lime', colors: ['#020617', '#84CC16'] },
  { name: 'Sweet Berry', value: 'Raspberry (#BE185D) & Cream', colors: ['#BE185D', '#FDF2F8'] },
  { name: 'Electric Voltage', value: 'High-Vis Yellow (#FACC15) & Black', colors: ['#000000', '#FACC15'] },
  { name: 'Vintage Warmth', value: 'Brown (#78350F) & Beige', colors: ['#78350F', '#FEF3C7'] },
];

export const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange }) => {
  const [customColor, setCustomColor] = useState('#6366f1');
  const [isCustom, setIsCustom] = useState(false);

  // Check if the current value matches a preset or is custom
  useEffect(() => {
    const isPreset = PRESET_PALETTES.some(p => p.value === value);
    if (!isPreset && value) {
      setIsCustom(true);
    }
  }, [value]);

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setCustomColor(newColor);
    onChange(`Custom Hex: ${newColor}`);
    setIsCustom(true);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-slate-300 flex items-center gap-2">
          <Palette className="w-4 h-4" /> Color Palette
        </label>
        <span className="text-xs text-slate-500 truncate max-w-[150px]">{value || 'Select a palette'}</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {PRESET_PALETTES.map((palette) => (
          <button
            key={palette.name}
            type="button"
            onClick={() => {
              onChange(palette.value);
              setIsCustom(false);
            }}
            className={`group relative h-12 w-full rounded-lg overflow-hidden border transition-all ${
              value === palette.value 
                ? 'border-indigo-500 ring-2 ring-indigo-500/50 scale-105 z-10' 
                : 'border-slate-700 hover:border-slate-500 hover:scale-[1.02]'
            }`}
            title={palette.name}
          >
            <div className="absolute inset-0 flex">
              {palette.colors.map((c, i) => (
                <div key={i} style={{ backgroundColor: c }} className="flex-1 h-full" />
              ))}
            </div>
            {value === palette.value && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <Check className="w-5 h-5 text-white drop-shadow-md" />
              </div>
            )}
            {/* Tooltip-like label on hover for desktop */}
            <div className="absolute bottom-0 inset-x-0 bg-black/70 text-white text-[10px] py-0.5 opacity-0 group-hover:opacity-100 transition-opacity truncate px-1">
              {palette.name}
            </div>
          </button>
        ))}
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => {
            onChange(`Custom Hex: ${customColor}`);
            setIsCustom(true);
          }}
          className={`w-full flex items-center justify-center gap-2 py-3 px-3 rounded-lg border text-sm transition-all ${
            isCustom 
              ? 'bg-slate-800 border-indigo-500 text-white' 
              : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600'
          }`}
        >
          <div 
            className="w-5 h-5 rounded-full border border-slate-600 shadow-sm"
            style={{ backgroundColor: customColor }}
          />
          <span>Use Custom Color</span>
          {isCustom && <Check className="w-4 h-4 ml-auto text-indigo-400" />}
        </button>
        
        {/* Invisible native color input overlaid on the button for functionality */}
        <input 
          type="color" 
          value={customColor}
          onChange={handleCustomChange}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />
      </div>
    </div>
  );
};
