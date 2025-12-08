import React, { useState } from 'react';
import { Download, Share2, Maximize2, X } from 'lucide-react';

interface LogoPreviewProps {
  images: string[];
  isLoading: boolean;
}

export const LogoPreview: React.FC<LogoPreviewProps> = ({ images, isLoading }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleDownload = (url: string, index: number) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `brand-identity-logo-${Date.now()}-${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (images.length === 0 && !isLoading) {
    return (
      <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-slate-800/30 border-2 border-dashed border-slate-700 rounded-2xl p-8 text-center">
        <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-4 shadow-inner">
          <Maximize2 className="w-10 h-10 text-slate-600" />
        </div>
        <h3 className="text-xl font-semibold text-slate-300">No Logos Generated Yet</h3>
        <p className="text-slate-500 mt-2 max-w-sm">
          Fill out the form on the left to start creating your professional brand identity.
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-full flex flex-col">
      {/* Modal for Selected Image */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 rounded-2xl p-2 max-w-3xl w-full relative border border-slate-700 shadow-2xl">
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-4 -right-4 bg-slate-700 text-white rounded-full p-2 hover:bg-slate-600 transition-colors shadow-lg border border-slate-600"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] bg-slate-800 rounded-xl overflow-hidden flex items-center justify-center min-h-[300px] max-h-[80vh]">
              <img src={selectedImage} alt="Full View" className="max-w-full max-h-full object-contain" />
            </div>
            <div className="p-4 flex justify-end gap-3">
              <button 
                onClick={() => handleDownload(selectedImage, 99)}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                <Download className="w-4 h-4" /> Download
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid View */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-500 ${isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        {isLoading 
          ? Array(4).fill(0).map((_, i) => (
              <div key={i} className="aspect-square bg-slate-800/50 rounded-2xl border border-slate-700/50 animate-pulse flex items-center justify-center">
                 <div className="w-12 h-12 rounded-full bg-slate-700/50"></div>
              </div>
            ))
          : images.map((url, index) => (
            <div key={index} className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden shadow-lg transition-all hover:border-indigo-500/50 hover:shadow-indigo-500/10">
              
              {/* Background Grid */}
              <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
                   style={{ 
                     backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', 
                     backgroundSize: '16px 16px' 
                   }}>
              </div>

              {/* Image */}
              <div 
                className="relative z-10 w-full aspect-square flex items-center justify-center p-6 cursor-pointer"
                onClick={() => setSelectedImage(url)}
              >
                <img 
                  src={url} 
                  alt={`Generated Logo ${index + 1}`} 
                  className="max-w-full max-h-full object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Overlay Actions */}
              <div className="absolute top-3 right-3 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button 
                  onClick={() => setSelectedImage(url)}
                  className="p-2 bg-slate-900/80 hover:bg-indigo-600 text-white rounded-lg backdrop-blur-md transition-colors border border-slate-700"
                  title="Maximize"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              <div className="absolute bottom-0 left-0 right-0 z-20 p-3 bg-slate-900/90 backdrop-blur-md border-t border-slate-700 translate-y-full group-hover:translate-y-0 transition-transform duration-200 flex justify-between items-center">
                 <span className="text-xs font-medium text-slate-400">Variation {index + 1}</span>
                 <div className="flex gap-2">
                   <button 
                     onClick={() => handleDownload(url, index)}
                     className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                     title="Download"
                   >
                     <Download className="w-4 h-4" />
                   </button>
                   <button 
                     className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
                     onClick={() => alert("Share functionality would go here!")}
                     title="Share"
                   >
                     <Share2 className="w-4 h-4" />
                   </button>
                 </div>
              </div>
            </div>
          ))
        }
      </div>

      {!isLoading && images.length > 0 && (
         <div className="mt-6 text-center">
           <p className="text-slate-500 text-sm">
             Click on any logo to view details. Hover to download.
           </p>
         </div>
      )}
    </div>
  );
};