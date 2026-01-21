import React from 'react';
import { X, Play, Edit2, Trash2, Eye, EyeOff, ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '../Card';
import { Badge } from '../Badge';
import { Button } from '../Button';

interface EntryDetailScreenProps {
  onClose: () => void;
}

export function EntryDetailScreen({ onClose }: EntryDetailScreenProps) {
  const [blackBoxMode, setBlackBoxMode] = React.useState(false);
  const [showBlackBoxDetails, setShowBlackBoxDetails] = React.useState(false);
  const [userFeedback, setUserFeedback] = React.useState<boolean | null>(null);
  
  const prosodyMetrics = [
    { label: 'Pitch', value: '142 Hz', percentage: 65, icon: '🎵' },
    { label: 'Energía', value: '0.72', percentage: 72, icon: '⚡' },
    { label: 'Velocidad', value: '3.5 syl/s', percentage: 58, icon: '⏱️' },
    { label: 'Pausas', value: '0.28', percentage: 45, icon: '⏸️' }
  ];
  
  const linkedNodes = ['Trabajo', 'Equipo', 'Proyecto', 'Reunión', 'Éxito'];
  
  const recommendations = [
    {
      icon: '🎯',
      text: 'Continúa fomentando este tipo de interacciones positivas con tu equipo'
    },
    {
      icon: '📝',
      text: 'Documenta estos momentos de alegría para futuras referencias'
    },
    {
      icon: '🌟',
      text: 'Comparte este logro con personas cercanas'
    }
  ];
  
  // Black Box Analysis Data
  const blackBoxAnalysis = {
    textAnalysis: {
      keywords: ['reunión', 'equipo', 'proyecto', 'motivados'],
      sentiment: 'positive',
      emotionalWords: [
        { word: 'feliz', emotion: 'joy', weight: 1.0 },
        { word: 'gran', emotion: 'joy', weight: 0.8 },
        { word: 'mejor', emotion: 'joy', weight: 0.9 }
      ],
      negations: [],
      intensifiers: ['muy', 'realmente']
    },
    prosodyAnalysis: {
      interpretation: 'Tono ascendente sugiere entusiasmo, alta energía indica emoción intensa',
      confidence: 78
    },
    contextualFactors: {
      timeOfDay: 'tarde',
      dayOfWeek: 'miércoles',
      relatedEntries: 3
    },
    decisionPath: [
      { step: 1, rule: 'Análisis de palabras emocionales en el texto', value: 3, contribution: 40 },
      { step: 2, rule: 'Modificadores detectados (0 negaciones, 2 intensificadores)', value: 2, contribution: 15 },
      { step: 3, rule: 'Análisis prosódico: pitch rising, energía high', value: 72, contribution: 30 },
      { step: 4, rule: 'Cálculo de confianza basado en múltiples factores', value: 85, contribution: 15 }
    ],
    overallConfidence: 85
  };
  
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">11 Dic 2025, 14:30</p>
          <h2 className="text-slate-200">Detalle de entrada</h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      
      <div className="px-6 py-6 space-y-6 pb-24">
        {/* Transcription */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-300">Transcripción</h3>
            <Button variant="ghost" size="sm">
              <Play className="w-4 h-4 mr-2" />
              Reproducir
            </Button>
          </div>
          <p className="text-slate-200 leading-relaxed">
            Hoy tuvimos una gran reunión con el equipo. Todo salió mejor de lo que esperaba. 
            El proyecto está avanzando muy bien y todos están muy motivados. Me siento realmente 
            feliz de trabajar con estas personas.
          </p>
        </Card>
        
        {/* Emotional Analysis */}
        {!blackBoxMode && (
          <>
            <Card className="p-6">
              <h3 className="text-slate-300 mb-4">Análisis emocional</h3>
              
              {/* Primary Emotion */}
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-5xl">😊</span>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-2">
                      <h2 className="text-amber-400">Alegría</h2>
                      <span className="text-slate-400">Primaria</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-3 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <span className="text-slate-300">8.5/10</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Secondary Emotions */}
              <div>
                <p className="text-sm text-slate-400 mb-3">Emociones secundarias</p>
                <div className="flex flex-wrap gap-2">
                  <Badge type="emotion" emotion="surprise">Sorpresa (32%)</Badge>
                  <Badge type="emotion" emotion="fear">Nervios (15%)</Badge>
                </div>
              </div>
            </Card>
            
            {/* Prosody Analysis */}
            <Card className="p-6">
              <h3 className="text-slate-300 mb-4">Análisis de voz</h3>
              <div className="grid grid-cols-2 gap-4">
                {prosodyMetrics.map(metric => (
                  <div key={metric.label} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{metric.icon}</span>
                      <span className="text-sm text-slate-400">{metric.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-200">{metric.value}</span>
                    </div>
                    <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-500 rounded-full"
                        style={{ width: `${metric.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            
            {/* Linked Nodes */}
            <Card className="p-6">
              <h3 className="text-slate-300 mb-4">Nodos ligados</h3>
              <div className="flex flex-wrap gap-2">
                {linkedNodes.map(node => (
                  <Badge key={node}>{node}</Badge>
                ))}
              </div>
            </Card>
            
            {/* Recommendations */}
            <Card className="p-6">
              <h3 className="text-slate-300 mb-4">Recomendaciones</h3>
              <div className="space-y-3">
                {recommendations.map((rec, index) => (
                  <div key={index} className="flex gap-3 p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-2xl flex-shrink-0">{rec.icon}</span>
                    <p className="text-slate-300 text-sm">{rec.text}</p>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}
        
        {blackBoxMode && (
          <Card className="p-8 text-center">
            <EyeOff className="w-12 h-12 mx-auto mb-4 text-slate-500" />
            <p className="text-slate-400">
              Modo Black Box activado. El análisis está oculto.
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBlackBoxDetails(!showBlackBoxDetails)}
            >
              {showBlackBoxDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              {showBlackBoxDetails ? 'Ocultar detalles' : 'Mostrar detalles'}
            </Button>
            {showBlackBoxDetails && (
              <div className="mt-4">
                <h4 className="text-slate-300 mb-2">Análisis de texto</h4>
                <p className="text-sm text-slate-400">
                  Palabras clave: {blackBoxAnalysis.textAnalysis.keywords.join(', ')}
                </p>
                <p className="text-sm text-slate-400">
                  Sentimiento: {blackBoxAnalysis.textAnalysis.sentiment}
                </p>
                <p className="text-sm text-slate-400">
                  Palabras emocionales: {blackBoxAnalysis.textAnalysis.emotionalWords.map(word => `${word.word} (${word.emotion})`).join(', ')}
                </p>
                <p className="text-sm text-slate-400">
                  Modificadores: {blackBoxAnalysis.textAnalysis.intensifiers.join(', ')}
                </p>
                
                <h4 className="text-slate-300 mb-2 mt-4">Análisis prosódico</h4>
                <p className="text-sm text-slate-400">
                  Interpretación: {blackBoxAnalysis.prosodyAnalysis.interpretation}
                </p>
                <p className="text-sm text-slate-400">
                  Confianza: {blackBoxAnalysis.prosodyAnalysis.confidence}%
                </p>
                
                <h4 className="text-slate-300 mb-2 mt-4">Factores contextuales</h4>
                <p className="text-sm text-slate-400">
                  Hora del día: {blackBoxAnalysis.contextualFactors.timeOfDay}
                </p>
                <p className="text-sm text-slate-400">
                  Día de la semana: {blackBoxAnalysis.contextualFactors.dayOfWeek}
                </p>
                <p className="text-sm text-slate-400">
                  Entradas relacionadas: {blackBoxAnalysis.contextualFactors.relatedEntries}
                </p>
                
                <h4 className="text-slate-300 mb-2 mt-4">Ruta de decisión</h4>
                <ul className="list-disc list-inside text-sm text-slate-400">
                  {blackBoxAnalysis.decisionPath.map(step => (
                    <li key={step.step}>
                      Paso {step.step}: {step.rule} - Valor: {step.value}, Contribución: {step.contribution}%
                    </li>
                  ))}
                </ul>
                
                <h4 className="text-slate-300 mb-2 mt-4">Confianza general</h4>
                <p className="text-sm text-slate-400">
                  Confianza general: {blackBoxAnalysis.overallConfidence}%
                </p>
              </div>
            )}
          </Card>
        )}
      </div>
      
      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-700/50 px-6 py-4">
        <div className="flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            onClick={() => setBlackBoxMode(!blackBoxMode)}
          >
            {blackBoxMode ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
            {blackBoxMode ? 'Mostrar' : 'Black Box'}
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost">
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button variant="danger">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}