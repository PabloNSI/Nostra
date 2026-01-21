import React, { useState } from 'react';
import { Moon, Activity, BookOpen, Droplet, Smartphone } from 'lucide-react';
import { Header } from '../Header';
import { BottomNav } from '../BottomNav';
import { Card } from '../Card';
import { Input } from '../Input';
import { Button } from '../Button';

interface HabitsScreenProps {
  activeTab: 'home' | 'timeline' | 'graph' | 'settings';
  onTabChange: (tab: 'home' | 'timeline' | 'graph' | 'settings') => void;
}

export function HabitsScreen({ activeTab, onTabChange }: HabitsScreenProps) {
  const [sleepData, setSleepData] = useState({
    bedtime: '23:00',
    wakeup: '07:00',
    quality: '7'
  });
  
  // Mock correlation chart data
  const chartData = Array.from({ length: 28 }, (_, i) => ({
    day: i + 1,
    sleep: 6 + Math.random() * 3,
    joy: 4 + Math.random() * 5,
    sadness: 2 + Math.random() * 4
  }));
  
  const maxSleep = Math.max(...chartData.map(d => d.sleep));
  const maxEmotion = Math.max(...chartData.map(d => Math.max(d.joy, d.sadness)));
  
  return (
    <div className="min-h-screen bg-slate-900 pb-20">
      <Header title="Hábitos y Bienestar" />
      
      <main className="px-6 py-6 space-y-6">
        {/* Sleep Tracker */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
              <Moon className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-slate-300">Sueño</h3>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="time"
                label="Hora de dormir"
                value={sleepData.bedtime}
                onChange={(e) => setSleepData({ ...sleepData, bedtime: e.target.value })}
              />
              <Input
                type="time"
                label="Hora de despertar"
                value={sleepData.wakeup}
                onChange={(e) => setSleepData({ ...sleepData, wakeup: e.target.value })}
              />
            </div>
            
            <div>
              <label className="text-slate-300 mb-2 block">Calidad del sueño</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={sleepData.quality}
                  onChange={(e) => setSleepData({ ...sleepData, quality: e.target.value })}
                  className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <span className="text-slate-200 min-w-[3ch] text-center">{sleepData.quality}/10</span>
              </div>
            </div>
            
            <Button className="w-full">Guardar</Button>
          </div>
        </Card>
        
        {/* Exercise Tracker */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Activity className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-slate-300">Ejercicio</h3>
          </div>
          
          <div className="space-y-4">
            <Input
              type="text"
              label="Tipo de actividad"
              placeholder="Ej: Correr, yoga, gym..."
            />
            <Input
              type="number"
              label="Duración (minutos)"
              placeholder="30"
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="exercise-done"
                className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-green-600 focus:ring-2 focus:ring-green-500"
              />
              <label htmlFor="exercise-done" className="text-slate-300">
                Hecho hoy
              </label>
            </div>
          </div>
        </Card>
        
        {/* Other Habits */}
        <Card className="p-6">
          <h3 className="text-slate-300 mb-4">Otros hábitos</h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-slate-300">Meditación</p>
              </div>
              <input
                type="number"
                placeholder="0"
                className="w-20 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-center"
              />
              <span className="text-sm text-slate-400 min-w-[3ch]">min</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex-1">
                <p className="text-slate-300">Lectura</p>
              </div>
              <input
                type="number"
                placeholder="0"
                className="w-20 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-center"
              />
              <span className="text-sm text-slate-400 min-w-[3ch]">pág</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Droplet className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-slate-300">Agua</p>
              </div>
              <input
                type="number"
                placeholder="0"
                className="w-20 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-center"
              />
              <span className="text-sm text-slate-400 min-w-[3ch]">L</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-red-400" />
              </div>
              <div className="flex-1">
                <p className="text-slate-300">Pantalla</p>
              </div>
              <input
                type="number"
                placeholder="0"
                className="w-20 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-center"
              />
              <span className="text-sm text-slate-400 min-w-[3ch]">hrs</span>
            </div>
          </div>
        </Card>
        
        {/* Correlation Chart */}
        <Card className="p-6">
          <h3 className="text-slate-300 mb-4">Correlación: Sueño vs Emociones</h3>
          
          <div className="h-64 relative">
            <svg className="w-full h-full" viewBox="0 0 700 250">
              {/* Grid lines */}
              <g className="grid" opacity="0.1">
                {[0, 1, 2, 3, 4].map(i => (
                  <line
                    key={i}
                    x1="50"
                    y1={50 + i * 40}
                    x2="680"
                    y2={50 + i * 40}
                    stroke="#E2E8F0"
                    strokeWidth="1"
                  />
                ))}
              </g>
              
              {/* Sleep line */}
              <polyline
                points={chartData.map((d, i) => 
                  `${50 + (i * 630 / 27)},${210 - (d.sleep / maxSleep * 160)}`
                ).join(' ')}
                fill="none"
                stroke="#6366F1"
                strokeWidth="2"
              />
              
              {/* Joy line */}
              <polyline
                points={chartData.map((d, i) => 
                  `${50 + (i * 630 / 27)},${210 - (d.joy / maxEmotion * 160)}`
                ).join(' ')}
                fill="none"
                stroke="#FBBF24"
                strokeWidth="2"
              />
              
              {/* Sadness line */}
              <polyline
                points={chartData.map((d, i) => 
                  `${50 + (i * 630 / 27)},${210 - (d.sadness / maxEmotion * 160)}`
                ).join(' ')}
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            </svg>
            
            {/* Legend */}
            <div className="absolute top-2 right-2 space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-indigo-500" />
                <span className="text-xs text-slate-400">Sueño (hrs)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-amber-400" />
                <span className="text-xs text-slate-400">Alegría</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-blue-500" style={{ borderTop: '2px dashed' }} />
                <span className="text-xs text-slate-400">Tristeza</span>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-slate-400 mt-4">
            Últimas 4 semanas · Actualizado hace 2 horas
          </p>
        </Card>
        
        {/* Recommendation */}
        <Card className="p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 border-green-500/30">
          <h3 className="text-green-300 mb-2">💡 Insight detectado</h3>
          <p className="text-slate-300 text-sm">
            Cuando duermes más de 7 horas, tu nivel de alegría aumenta en promedio un 35%. 
            Intenta mantener este hábito de sueño consistente.
          </p>
        </Card>
      </main>
      
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
