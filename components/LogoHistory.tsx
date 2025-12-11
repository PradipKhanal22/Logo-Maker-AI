import React from 'react';
import { HistoryItem } from '../types';
import { Clock, ChevronRight } from 'lucide-react';

interface LogoHistoryProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  currentId: string | undefined;
}

export const LogoHistory: React.FC<LogoHistoryProps> = ({ history, onSelect, currentId }) => {
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
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className={`flex-shrink-0 group relative w-48 bg-slate-800 rounded-xl overflow-hidden border transition-all duration-200 text-left ${
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
          </button>
        ))}
      </div>
    </div>
  );
};