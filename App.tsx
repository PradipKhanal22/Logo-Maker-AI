import React, { useState } from 'react';
import { LogoForm } from './components/LogoForm';
import { LogoPreview } from './components/LogoPreview';
import { LoadingSpinner } from './components/LoadingSpinner';
import { generateLogoImages } from './services/geminiService';
import { LogoFormData } from './types';
import { Hexagon, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (data: LogoFormData) => {
    setIsGenerating(true);
    setError(null);
    setGeneratedImages([]); // Clear previous images during generation

    try {
      const images = await generateLogoImages(data);
      setGeneratedImages(images);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to generate logos. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Hexagon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                BrandIdentity AI
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium text-slate-400">
            <span className="hidden sm:inline-flex items-center gap-1">
              <Zap className="w-4 h-4 text-yellow-500" /> Powered by Gemini
            </span>
            <a href="#" className="hover:text-white transition-colors">Docs</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Header Section */}
          <div className="lg:col-span-12 text-center mb-4">
             <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
               Design Your <span className="text-indigo-400">Brand Identity</span>
             </h2>
             <p className="text-lg text-slate-400 max-w-2xl mx-auto">
               Generate 4 unique, professional vector-style logos instantly using advanced AI. 
               Simply describe your brand and let our engine do the creative work.
             </p>
          </div>

          {/* Left Column: Form */}
          <div className="lg:col-span-5 xl:col-span-4 order-2 lg:order-1">
            <LogoForm onSubmit={handleGenerate} isGenerating={isGenerating} />
            
            {error && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-200 text-sm">
                <strong>Error:</strong> {error}
              </div>
            )}
          </div>

          {/* Right Column: Preview */}
          <div className="lg:col-span-7 xl:col-span-8 order-1 lg:order-2 flex flex-col">
            {isGenerating ? (
               <div className="h-[500px] flex items-center justify-center bg-slate-800/30 border border-slate-700 rounded-2xl">
                 <LoadingSpinner />
               </div>
            ) : (
              <LogoPreview images={generatedImages} isLoading={isGenerating} />
            )}
            
            {!isGenerating && generatedImages.length > 0 && (
               <div className="mt-6 bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                  <h4 className="text-sm font-semibold text-slate-300 mb-2">Pro Tip</h4>
                  <p className="text-xs text-slate-400">
                    For best results, download the image and use a vectorizer tool (like Adobe Illustrator or online SVG converters) to get a fully scalable SVG file for print production.
                  </p>
               </div>
            )}
          </div>

        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-slate-800 mt-12 py-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} BrandIdentity AI. All rights reserved. Built with React & Tailwind.
        </div>
      </footer>
    </div>
  );
};

export default App;