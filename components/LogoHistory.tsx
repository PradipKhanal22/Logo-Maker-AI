
import React, { useState, useEffect } from 'react';
import { HistoryItem } from '../types';
import { Clock, ChevronRight, Heart } from 'lucide-react';

interface LogoHistoryProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  currentId: string | undefined;
}

export const LogoHistory: React.FC<LogoHistoryProps> = ({ history, onSelect, currentId }) => {
  const [favorites, setFavorites] = useState<HistoryItem[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('brandIdentity_favorites');
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load favorites", e);
    }
  }, []);

  const toggleFavorite = (e: React.MouseEvent, item: HistoryItem) => {
    e.stopPropagation();
    
    let newFavorites;
    const isAlreadyFav = favorites.some(f => f.id === item.id);
    
    if (isAlreadyFav) {
      newFavorites = favorites.filter(f => f.id !== item.id);
    } else {
      newFavorites = [item, ...favorites];
    }
    
    setFavorites(newFavorites);
    localStorage.setItem('brandIdentity_favorites', JSON.stringify(newFavorites));
  };

  if (history.length === 0) return null;

  return (
    <div className="mt-8 pt-6 border-t border-slate-700 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-indigo-400" />
          Recent Designs
        </h3>
        <span className="text-xs text-slate-500">Session History</span>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
        {history.map((item) => {
          const isFav = favorites.some(f => f.id === item.id);
          
          return (
            <div
              key={item.id}
              onClick={() => onSelect(item)}
              className={`flex-shrink-0 group relative w-48 bg-slate-800 rounded-xl overflow-hidden border transition-all duration-200 text-left cursor-pointer ${
                currentId === item.id
                  ? 'border-indigo-500 ring-2 ring-indigo-500/30 bg-slate-700/50'
                  : 'border-slate-700 hover:border-slate-500 hover:bg-slate-700'
              }`}
            >
              {/* Thumbnail Preview (First Image) */}
              <div className="h-24 bg-slate-900 w-full overflow-hidden flex items-center justify-center p-2 relative">
                 <div className="absolute inset-0 opacity-10" style={{ 
                       backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', 
                       backgroundSize: '8px 8px' 
                     }}></div>
                
                {/* Favorite Button */}
                <button
                  onClick={(e) => toggleFavorite(e, item)}
                  className={`absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/60 hover:bg-slate-950 text-white z-20 transition-all border border-slate-700/50 backdrop-blur-sm ${
                    isFav ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                  title={isFav ? "Remove from Favorites" : "Save to Favorites"}
                >
                   <Heart className={`w-3.5 h-3.5 transition-colors ${isFav ? 'fill-red-500 text-red-500' : 'text-slate-300'}`} />
                </button>

                {item.images[0] ? (
                  <img 
                    src={item.images[0]} 
                    alt={item.formData.brandName} 
                    className="max-h-full max-w-full object-contain" 
                  />
                ) : (
                  <div className="text-slate-600 text-xs">No preview</div>
                )}
              </div>
              
              <div className="p-3">
                <p className="font-semibold text-sm text-white truncate mb-1" title={item.formData.brandName}>
                  {item.formData.brandName}
                </p>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                    <p className="text-xs text-slate-300 truncate font-medium">{item.formData.style}</p>
                  </div>
                  
                  <p className="text-[10px] text-slate-400 truncate pl-3" title={`Industry: ${item.formData.industry}`}>
                    {item.formData.industry}
                  </p>
                  
                  <p className="text-[10px] text-slate-500 truncate pl-3 opacity-80" title={`Colors: ${item.formData.colors}`}>
                    {item.formData.colors}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-[10px] text-slate-600 border-t border-slate-700/50 mt-2">
                   <span>{new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                   <ChevronRight className="w-3 h-3 group-hover:text-indigo-400 transition-colors" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
