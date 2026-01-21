// Black Box Analysis - Explainable AI
import type { EmotionalAnalysis } from './emotionalAnalysis';
import type { ProsodyMetrics } from './prosodyAnalysis';

export interface BlackBoxAnalysis {
  enabled: boolean;
  components: {
    textAnalysis: {
      keywords: string[];
      sentiment: string;
      emotionalWords: Array<{
        word: string;
        emotion: string;
        weight: number;
      }>;
      negations: string[];
      intensifiers: string[];
    };
    prosodyAnalysis?: {
      features: ProsodyMetrics;
      interpretation: string;
      confidence: number;
    };
    contextualFactors: {
      timeOfDay: string;
      dayOfWeek: string;
      relatedEntries?: number;
      habitCorrelations?: Array<{
        habit: string;
        correlation: number;
      }>;
    };
    decisionPath: Array<{
      step: number;
      rule: string;
      value: number;
      contribution: number; // % to final emotion
    }>;
  };
  overallConfidence: number;
  userFeedback?: {
    accurate: boolean;
    correctedEmotion?: string;
    timestamp: Date;
  };
}

export function generateBlackBoxAnalysis(
  text: string,
  emotionalAnalysis: EmotionalAnalysis,
  prosodyMetrics?: ProsodyMetrics,
  timestamp: Date = new Date()
): BlackBoxAnalysis {
  const words = text.toLowerCase().split(/\s+/);
  
  // Detect emotional words
  const emotionalWords = detectEmotionalWords(text);
  
  // Detect negations and intensifiers
  const negations = words.filter(w => 
    ['no', 'nunca', 'jamás', 'sin', 'ningún'].includes(w)
  );
  
  const intensifiers = words.filter(w => 
    ['muy', 'bastante', 'extremadamente', 'súper', 'totalmente'].includes(w)
  );
  
  // Contextual factors
  const hour = timestamp.getHours();
  const timeOfDay = hour < 12 ? 'mañana' 
                  : hour < 18 ? 'tarde' 
                  : 'noche';
  
  const dayNames = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const dayOfWeek = dayNames[timestamp.getDay()];
  
  // Build decision path
  const decisionPath = buildDecisionPath(
    emotionalAnalysis,
    emotionalWords,
    negations.length,
    intensifiers.length,
    prosodyMetrics
  );
  
  // Calculate overall confidence
  const overallConfidence = emotionalAnalysis.confidence;
  
  return {
    enabled: false, // User toggles this
    components: {
      textAnalysis: {
        keywords: emotionalAnalysis.keywords,
        sentiment: emotionalAnalysis.prosodyFactors?.sentiment || 'neutral',
        emotionalWords,
        negations,
        intensifiers
      },
      prosodyAnalysis: prosodyMetrics ? {
        features: prosodyMetrics,
        interpretation: interpretProsody(prosodyMetrics),
        confidence: 75
      } : undefined,
      contextualFactors: {
        timeOfDay,
        dayOfWeek
      },
      decisionPath
    },
    overallConfidence
  };
}

function detectEmotionalWords(text: string): Array<{
  word: string;
  emotion: string;
  weight: number;
}> {
  const emotionKeywords = {
    joy: ['feliz', 'alegre', 'contento', 'genial', 'excelente', 'bien'],
    sadness: ['triste', 'solo', 'mal', 'llorar', 'pena'],
    anger: ['enfado', 'enojado', 'molesto', 'irritado', 'rabia'],
    fear: ['miedo', 'asustado', 'nervioso', 'preocupado'],
    surprise: ['sorprendido', 'inesperado', 'wow'],
    fatigue: ['cansado', 'agotado', 'sueño'],
    disgust: ['asco', 'repugnante', 'horrible']
  };
  
  const words = text.toLowerCase().split(/\s+/);
  const detected: Array<{ word: string; emotion: string; weight: number }> = [];
  
  words.forEach(word => {
    Object.entries(emotionKeywords).forEach(([emotion, keywords]) => {
      keywords.forEach(keyword => {
        if (word.includes(keyword)) {
          detected.push({
            word: keyword,
            emotion,
            weight: 1.0
          });
        }
      });
    });
  });
  
  return detected;
}

function buildDecisionPath(
  analysis: EmotionalAnalysis,
  emotionalWords: Array<{ word: string; emotion: string; weight: number }>,
  negationCount: number,
  intensifierCount: number,
  prosodyMetrics?: ProsodyMetrics
): Array<{ step: number; rule: string; value: number; contribution: number }> {
  const path = [];
  
  // Step 1: Text sentiment analysis
  const textContribution = 40;
  path.push({
    step: 1,
    rule: 'Análisis de palabras emocionales en el texto',
    value: emotionalWords.length,
    contribution: textContribution
  });
  
  // Step 2: Negations and intensifiers
  const modifierContribution = 15;
  if (negationCount > 0 || intensifierCount > 0) {
    path.push({
      step: 2,
      rule: `Modificadores detectados (${negationCount} negaciones, ${intensifierCount} intensificadores)`,
      value: negationCount + intensifierCount,
      contribution: modifierContribution
    });
  }
  
  // Step 3: Prosody analysis (if available)
  if (prosodyMetrics) {
    const prosodyContribution = 30;
    path.push({
      step: 3,
      rule: `Análisis prosódico: pitch ${prosodyMetrics.pitch.trend}, energía ${prosodyMetrics.energy.intensity}`,
      value: prosodyMetrics.energy.current,
      contribution: prosodyContribution
    });
  }
  
  // Step 4: Confidence calculation
  path.push({
    step: path.length + 1,
    rule: 'Cálculo de confianza basado en múltiples factores',
    value: analysis.confidence,
    contribution: 100 - path.reduce((sum, p) => sum + p.contribution, 0)
  });
  
  return path;
}

function interpretProsody(metrics: ProsodyMetrics): string {
  const parts = [];
  
  if (metrics.pitch.trend === 'rising') {
    parts.push('tono ascendente sugiere excitación o entusiasmo');
  } else if (metrics.pitch.trend === 'falling') {
    parts.push('tono descendente sugiere calma o tristeza');
  }
  
  if (metrics.energy.intensity === 'high') {
    parts.push('alta energía indica emoción intensa');
  } else if (metrics.energy.intensity === 'low') {
    parts.push('baja energía sugiere fatiga o calma');
  }
  
  if (metrics.speechRate.interpretation === 'fast') {
    parts.push('habla rápida puede indicar nerviosismo o entusiasmo');
  } else if (metrics.speechRate.interpretation === 'slow') {
    parts.push('habla lenta sugiere reflexión o tristeza');
  }
  
  return parts.join(', ');
}

// Store user feedback to improve future analysis
export function submitFeedback(
  analysisId: string,
  accurate: boolean,
  correctedEmotion?: string
): void {
  // In production: store this in IndexedDB to train local model
  const feedback = {
    analysisId,
    accurate,
    correctedEmotion,
    timestamp: new Date()
  };
  
  // This would be used to adjust weights in future analyses
  console.log('Feedback received:', feedback);
  
  // Could use TensorFlow.js to adjust model weights locally
}
