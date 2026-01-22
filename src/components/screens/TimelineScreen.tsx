import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { Header } from '../Header';
import { BottomNav } from '../BottomNav';
import { Badge } from '../Badge';
import { Card } from '../Card';

interface TimelineScreenProps {
  activeTab: 'home' | 'timeline' | 'graph' | 'settings';
  onTabChange: (tab: 'home' | 'timeline' | 'graph' | 'settings') => void;
}

export function TimelineScreen({ activeTab, onTabChange }: TimelineScreenProps) {
  const [viewMode, setViewMode] = useState<'week' | 'month' | 'year'>('month');
  
  const emotionColors: Record<string, string> = {
    joy: 'bg-amber-400',
    sadness: 'bg-blue-500',
    anger: 'bg-red-500',
    fear: 'bg-purple-500',
    surprise: 'bg-pink-500',
    fatigue: 'bg-gray-500',
    neutral: 'bg-slate-600'
  };
  
  // Mock calendar data
  const calendarDays = Array.from({ length: 35 }, (_, i) => {
    const emotions = ['joy', 'sadness', 'anger', 'fear', 'surprise', 'fatigue', 'neutral'];
    const hasEntry = i > 5 && i < 32;
    return {
      day: i - 5,
      emotion: hasEntry ? emotions[Math.floor(Math.random() * emotions.length)] : null,
      intensity: hasEntry ? Math.floor(Math.random() * 10) + 1 : 0,
      entries: hasEntry ? Math.floor(Math.random() * 3) + 1 : 0
    };
  });
  
  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  
  return (
    <div className="min-h-screen bg-slate-900 pb-20">
      <Header title="Emotional Timeline" />
      
      <main style={{ 
  marginLeft: '16px', 
  marginRight: '16px',
  paddingTop: '24px',
  paddingBottom: '24px'
}}>
        {/* View Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="text-slate-200 min-w-[140px] text-center">December 2025</h3>
            <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
        
        {/* View Mode Selector */}
        <div className="flex gap-2 bg-slate-800 p-1 rounded-lg">
          {(['week', 'month', 'year'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`flex-1 px-4 py-2 rounded-md transition-all ${
                viewMode === mode 
                  ? 'bg-indigo-600 text-white' 
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              {mode === 'week' ? 'Week' : mode === 'month' ? 'Month' : 'Year'}
            </button>
          ))}
        </div>
        
        {/* Calendar Heatmap */}
        <Card className="p-6">
          {/* Week day headers */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {weekDays.map(day => (
              <div key={day} className="text-center text-sm text-slate-400">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, index) => {
              if (day.day < 1 || day.day > 31) {
                return <div key={index} className="aspect-square" />;
              }
              
              const bgColor = day.emotion ? emotionColors[day.emotion] : 'bg-slate-800';
              const opacity = day.intensity ? `opacity-${Math.min(Math.round(day.intensity / 2) * 20, 100)}` : 'opacity-20';
              
              return (
                <button
                  key={index}
                  className={`
                    aspect-square rounded-lg ${bgColor} ${opacity}
                    hover:ring-2 hover:ring-indigo-500 transition-all
                    flex items-center justify-center
                    text-sm text-white
                    group relative
                  `}
                  aria-label={`Day ${day.day}`}
                >
                  <span className="opacity-70 group-hover:opacity-100">{day.day}</span>
                  {day.entries > 0 && (
                    <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-white rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </Card>
        
        {/* Legend */}
        <Card className="p-6">
          <h3 className="text-slate-300 mb-4">Legend</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-amber-400" />
              <span className="text-sm text-slate-400">Joy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-500" />
              <span className="text-sm text-slate-400">Sadness</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-500" />
              <span className="text-sm text-slate-400">Anger</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-purple-500" />
              <span className="text-sm text-slate-400">Fear</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-pink-500" />
              <span className="text-sm text-slate-400">Surprise</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gray-500" />
              <span className="text-sm text-slate-400">Fatigue</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-700">
            <p className="text-sm text-slate-400">
              Color intensity represents emotional intensity (1-10)
            </p>
          </div>
        </Card>
      </main>
      
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}