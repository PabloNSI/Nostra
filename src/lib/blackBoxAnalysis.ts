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
    ['no', 'never', 'not', 'without', 'none', 'no one', 'nothing'].includes(w)
  );
  
  const intensifiers = words.filter(w => 
    ['very', 'quite', 'extremely', 'super', 'totally', 'really', 'so'].includes(w)
  );
  
  // Contextual factors
  const hour = timestamp.getHours();
  const timeOfDay = hour < 12 ? 'morning' 
                  : hour < 18 ? 'afternoon' 
                  : 'night';
  
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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
    joy: ['happy', 'joyful', 'content', 'great', 'excellent', 'good', 'nice'],
    sadness: ['sad', 'lonely', 'bad', 'cry', 'sorrow', 'unhappy'],
    anger: ['angry', 'mad', 'annoyed', 'irritated', 'rage', 'furious'],
    fear: ['fear', 'scared', 'nervous', 'worried', 'afraid'],
    surprise: ['surprised', 'unexpected', 'wow', 'amazing'],
    fatigue: ['tired', 'exhausted', 'sleepy', 'fatigued'],
    disgust: ['disgust', 'disgusting', 'horrible', 'awful']
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
    rule: 'Analysis of emotional words in text',
    value: emotionalWords.length,
    contribution: textContribution
  });
  
  // Step 2: Negations and intensifiers
  const modifierContribution = 15;
  if (negationCount > 0 || intensifierCount > 0) {
    path.push({
      step: 2,
      rule: `Modifiers detected (${negationCount} negations, ${intensifierCount} intensifiers)`,
      value: negationCount + intensifierCount,
      contribution: modifierContribution
    });
  }
  
  // Step 3: Prosody analysis (if available)
  if (prosodyMetrics) {
    const prosodyContribution = 30;
    path.push({
      step: 3,
      rule: `Prosodic analysis: pitch ${prosodyMetrics.pitch.trend}, energy ${prosodyMetrics.energy.intensity}`,
      value: prosodyMetrics.energy.current,
      contribution: prosodyContribution
    });
  }
  
  // Step 4: Confidence calculation
  path.push({
    step: path.length + 1,
    rule: 'Confidence calculation based on multiple factors',
    value: analysis.confidence,
    contribution: 100 - path.reduce((sum, p) => sum + p.contribution, 0)
  });
  
  return path;
}

function interpretProsody(metrics: ProsodyMetrics): string {
  const parts = [];
  
  if (metrics.pitch.trend === 'rising') {
    parts.push('rising pitch suggests excitement or enthusiasm');
  } else if (metrics.pitch.trend === 'falling') {
    parts.push('falling pitch suggests calmness or sadness');
  }
  
  if (metrics.energy.intensity === 'high') {
    parts.push('high energy indicates intense emotion');
  } else if (metrics.energy.intensity === 'low') {
    parts.push('low energy suggests fatigue or calmness');
  }
  
  if (metrics.speechRate.interpretation === 'fast') {
    parts.push('fast speech may indicate nervousness or enthusiasm');
  } else if (metrics.speechRate.interpretation === 'slow') {
    parts.push('slow speech suggests reflection or sadness');
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