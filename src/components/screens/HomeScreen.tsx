import React from 'react';
import { Plus, Network, Calendar, Upload, TrendingUp, Lightbulb, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Header } from '../Header';
import { BottomNav } from '../BottomNav';
import { Card } from '../Card';
import { Badge } from '../Badge';

interface HomeScreenProps {
  userName: string;
  onNavigate: (screen: string) => void;
  activeTab: 'home' | 'timeline' | 'graph' | 'settings';
  onTabChange: (tab: 'home' | 'timeline' | 'graph' | 'settings') => void;
}

export function HomeScreen({ userName, onNavigate, activeTab, onTabChange }: HomeScreenProps) {
  const [feedbackGiven, setFeedbackGiven] = React.useState<Record<string, boolean>>({});
  
  const recentEntries = [
    { id: 1, date: 'Hoy, 14:30', emotion: 'joy' as const, snippet: 'Gran reunión con el equipo, todo salió mejor de lo esperado...' },
    { id: 2, date: 'Ayer, 20:15', emotion: 'sadness' as const, snippet: 'Me siento un poco abrumado con todo el trabajo...' },
    { id: 3, date: 'Hace 2 días', emotion: 'surprise' as const, snippet: 'No esperaba esa llamada de mi amigo de la universidad...' }
  ];
  
  // Personalized recommendations
  const recommendations = [
    {
      id: 'rec_1',
      icon: '🚶',
      title: 'Sal a caminar 15 minutos',
      description: 'El ejercicio ligero puede mejorar tu estado de ánimo',
      priority: 'high' as const,
      category: 'activity'
    },
    {
      id: 'rec_2',
      icon: '😴',
      title: 'Mejora tu rutina de sueño',
      description: 'Has dormido menos esta semana. Intenta acostarte 30 min antes',
      priority: 'high' as const,
      category: 'habit'
    },
    {
      id: 'rec_3',
      icon: '📝',
      title: 'Documenta este momento positivo',
      description: 'Escribir sobre momentos felices refuerza el bienestar',
      priority: 'medium' as const,
      category: 'reflection'
    }
  ];
  
  const handleFeedback = (recId: string, helpful: boolean) => {
    setFeedbackGiven({ ...feedbackGiven, [recId]: helpful });
  };
  
  return (
    <div className="min-h-screen bg-slate-900 pb-20">
      <Header userName={userName} />
      
      <main className="px-6 py-6 space-y-6">
        {/* Today's Emotion Card */}
        <Card variant="elevated" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-300">Hoy</h3>
            <span className="text-sm text-slate-400">11 Dic 2025</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-6xl">😊</div>
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <h2 className="text-amber-400">Alegría</h2>
                <span className="text-slate-400">Emoción dominante</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <span className="text-sm text-slate-300">7.5/10</span>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card 
            onClick={() => onNavigate('quick-write')}
            className="p-6 flex flex-col items-center justify-center gap-3 min-h-[140px]"
          >
            <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center">
              <Plus className="w-6 h-6 text-indigo-400" />
            </div>
            <span className="text-slate-300 text-center">Nueva entrada</span>
          </Card>
          
          <Card 
            onClick={() => onNavigate('graph')}
            className="p-6 flex flex-col items-center justify-center gap-3 min-h-[140px]"
          >
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Network className="w-6 h-6 text-purple-400" />
            </div>
            <span className="text-slate-300 text-center">Grafo</span>
          </Card>
          
          <Card 
            onClick={() => onNavigate('timeline')}
            className="p-6 flex flex-col items-center justify-center gap-3 min-h-[140px]"
          >
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-slate-300 text-center">Timeline</span>
          </Card>
          
          <Card 
            onClick={() => onNavigate('imports')}
            className="p-6 flex flex-col items-center justify-center gap-3 min-h-[140px]"
          >
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
              <Upload className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-slate-300 text-center">Importar</span>
          </Card>
        </div>
        
        {/* Personalized Recommendations */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            <h3 className="text-slate-300">Recomendaciones para ti</h3>
          </div>
          <div className="space-y-3">
            {recommendations.map(rec => (
              <Card 
                key={rec.id}
                className="p-4"
              >
                <div className="flex gap-3">
                  <span className="text-3xl flex-shrink-0">{rec.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-slate-200">{rec.title}</h4>
                      {rec.priority === 'high' && (
                        <Badge type="status" status="warning">Alta</Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-400 mb-3">{rec.description}</p>
                    
                    {!feedbackGiven[rec.id] ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleFeedback(rec.id, true)}
                          className="flex items-center gap-1 px-2 py-1 text-xs text-green-400 hover:bg-green-500/10 rounded transition-colors"
                        >
                          <ThumbsUp className="w-3 h-3" />
                          Útil
                        </button>
                        <button
                          onClick={() => handleFeedback(rec.id, false)}
                          className="flex items-center gap-1 px-2 py-1 text-xs text-slate-500 hover:bg-slate-700 rounded transition-colors"
                        >
                          <ThumbsDown className="w-3 h-3" />
                          No útil
                        </button>
                      </div>
                    ) : (
                      <p className="text-xs text-green-400">
                        ✓ Gracias por tu feedback
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Recent Entries */}
        <div>
          <h3 className="text-slate-300 mb-4">Recientes</h3>
          <div className="space-y-3">
            {recentEntries.map(entry => (
              <Card 
                key={entry.id}
                onClick={() => onNavigate('entry-detail')}
                className="p-4"
              >
                <div className="flex gap-3">
                  <Badge type="emotion" emotion={entry.emotion} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-400 mb-1">{entry.date}</p>
                    <p className="text-slate-300 truncate">{entry.snippet}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Correlation Insight Card */}
        <Card className="p-6 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/30">
          <div className="flex gap-3">
            <TrendingUp className="w-6 h-6 text-indigo-400 flex-shrink-0" />
            <div>
              <h3 className="text-indigo-300 mb-2">Insight detectado</h3>
              <p className="text-slate-300 text-sm">
                Cuando duermes más de 7 horas, tu nivel de alegría aumenta en promedio un 35%. 
                Intenta mantener este hábito de sueño consistente.
              </p>
            </div>
          </div>
        </Card>
      </main>
      
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}