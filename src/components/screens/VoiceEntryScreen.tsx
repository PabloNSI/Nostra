import React, { useState, useEffect } from 'react';
import { X, Square } from 'lucide-react';
import { Button } from '../Button';

interface VoiceEntryScreenProps {
  onClose: () => void;
  onStop: () => void;
}

export function VoiceEntryScreen({ onClose, onStop }: VoiceEntryScreenProps) {
  const [seconds, setSeconds] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(s => s + 1);
      // Simulate audio level
      setAudioLevel(Math.random() * 100);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(remainingSecs).padStart(2, '0')}`;
  };
  
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50">
        <h2 className="text-slate-200">Grabando</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400"
          aria-label="Cancelar"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <p className="text-slate-400 mb-8">Escuchamos...</p>
        
        {/* Timer */}
        <div className="text-6xl mb-12 text-slate-200 font-mono">
          {formatTime(seconds)}
        </div>
        
        {/* Audio Visualizer */}
        <div className="w-full max-w-md mb-12">
          <div className="flex items-center justify-center gap-1 h-32">
            {Array.from({ length: 40 }).map((_, i) => {
              const height = Math.random() * 100;
              const delay = i * 0.05;
              return (
                <div
                  key={i}
                  className="flex-1 bg-indigo-500 rounded-full transition-all duration-300"
                  style={{
                    height: `${height}%`,
                    opacity: 0.3 + (height / 200),
                    transitionDelay: `${delay}s`
                  }}
                />
              );
            })}
          </div>
        </div>
        
        {/* Audio Level Indicator */}
        <div className="w-full max-w-md">
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-400">Nivel:</span>
            <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-indigo-500 transition-all duration-150"
                style={{ width: `${audioLevel}%` }}
              />
            </div>
            <span className="text-sm text-slate-300">{Math.round(audioLevel)}%</span>
          </div>
        </div>
      </div>
      
      {/* Stop Button */}
      <div className="px-6 py-6 border-t border-slate-700/50">
        <Button
          onClick={onStop}
          variant="danger"
          className="w-full"
          size="lg"
        >
          <Square className="w-5 h-5 mr-2" />
          Detener grabación
        </Button>
      </div>
    </div>
  );
}
