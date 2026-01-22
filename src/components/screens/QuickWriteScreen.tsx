import React, { useState } from 'react';
import { X, Mic, Save } from 'lucide-react';
import { Button } from '../Button';

interface QuickWriteScreenProps {
  onClose: () => void;
  onSave: (text: string, analyze: boolean) => void;
  onVoiceClick: () => void;
}

export function QuickWriteScreen({ onClose, onSave, onVoiceClick }: QuickWriteScreenProps) {
  const [text, setText] = useState('');
  const [analyze, setAnalyze] = useState(true);
  const maxChars = 2000;
  
  const handleSave = () => {
    if (text.trim()) {
      onSave(text, analyze);
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50">
        <h2 className="text-slate-200">New entry</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col px-6 py-6">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What are you thinking today?"
          className="flex-1 bg-transparent text-slate-200 placeholder-slate-500 resize-none focus:outline-none text-lg"
          maxLength={maxChars}
          autoFocus
        />
        
        <div className="flex items-center justify-between mt-4 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="analyze-checkbox"
              checked={analyze}
              onChange={(e) => setAnalyze(e.target.checked)}
              className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-indigo-600 focus:ring-2 focus:ring-indigo-500"
            />
            <label htmlFor="analyze-checkbox">Analyze emotions</label>
          </div>
          <span className={text.length > maxChars * 0.9 ? 'text-amber-400' : ''}>
            {text.length} / {maxChars}
          </span>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="px-6 py-6 border-t border-slate-700/50 space-y-3">
        <button
          onClick={onVoiceClick}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transition-colors group"
          aria-label="Record audio"
        >
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Mic className="w-8 h-8" />
          </div>
        </button>
        
        <Button
          onClick={handleSave}
          disabled={!text.trim()}
          className="w-full"
          size="lg"
        >
          <Save className="w-5 h-5 mr-2" />
          Save entry
        </Button>
      </div>
    </div>
  );
}