import React, { useState } from 'react';
import { Mic } from 'lucide-react';

interface ZenModeScreenProps {
  onSave: (text: string, analyze: boolean) => void;
}

export function ZenModeScreen({ onSave }: ZenModeScreenProps) {
  const [text, setText] = useState('');
  const [analyze, setAnalyze] = useState(false);
  
  const handleSave = () => {
    if (text.trim()) {
      onSave(text, analyze);
      setText('');
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8">
      {/* Minimalist Interface */}
      <div className="w-full max-w-3xl space-y-8">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe tus pensamientos..."
          className="w-full min-h-[400px] bg-transparent text-slate-200 text-xl placeholder-slate-700 resize-none focus:outline-none border-none"
          autoFocus
        />
        
        {/* Minimal Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleSave}
            className="text-sm text-slate-500 hover:text-slate-400 transition-colors"
          >
            {text.length > 0 ? 'Guardar' : ''}
          </button>
          
          <div className="flex items-center gap-6">
            <button
              className="w-12 h-12 rounded-full bg-slate-800/50 hover:bg-slate-700/50 flex items-center justify-center transition-colors group"
              aria-label="Grabar voz"
            >
              <Mic className="w-5 h-5 text-slate-500 group-hover:text-slate-400" />
            </button>
            
            <button
              onClick={() => setAnalyze(!analyze)}
              className="text-xs text-slate-600 hover:text-slate-500 transition-colors"
            >
              {analyze ? 'Analizar después' : 'Analizar ahora?'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Subtle hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <p className="text-xs text-slate-700">
          Modo Zen · Sin distracciones
        </p>
      </div>
    </div>
  );
}
