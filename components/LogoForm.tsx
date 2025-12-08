import React, { useState } from 'react';
import { LogoFormData, LogoStyle } from '../types';
import { Sparkles, Briefcase, Palette, Layers, Type } from 'lucide-react';

interface LogoFormProps {
  onSubmit: (data: LogoFormData) => void;
  isGenerating: boolean;
}

export const LogoForm: React.FC<LogoFormProps> = ({ onSubmit, isGenerating }) => {
  const [formData, setFormData] = useState<LogoFormData>({
    brandName: '',
    industry: '',
    style: LogoStyle.MINIMALIST,
    colors: '',
    icon: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

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
        <div className="space-y-2">
          <label htmlFor="style" className="block text-sm font-medium text-slate-300 flex items-center gap-2">
            <Layers className="w-4 h-4" /> Visual Style
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.values(LogoStyle).map((style) => (
              <button
                key={style}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, style }))}
                className={`text-xs sm:text-sm py-2 px-3 rounded-lg border transition-all duration-200 ${
                  formData.style === style
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className="space-y-2">
          <label htmlFor="colors" className="block text-sm font-medium text-slate-300 flex items-center gap-2">
            <Palette className="w-4 h-4" /> Color Palette
          </label>
          <input
            type="text"
            id="colors"
            name="colors"
            required
            placeholder="e.g. Navy Blue & Gold, Pastel Green"
            value={formData.colors}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none placeholder-slate-600"
          />
        </div>

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
