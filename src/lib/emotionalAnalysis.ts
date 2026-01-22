// Emotional Analysis Engine - Multimodal NLP
export interface EmotionalAnalysis {
  primaryEmotion: 'joy' | 'sadness' | 'anger' | 'fear' | 'surprise' | 'fatigue' | 'disgust';
  confidence: number; // 0-100
  secondaryEmotions: Array<{
    emotion: string;
    intensity: number; // 0-100
  }>;
  compositeEmotions: Array<{
    emotion: string;
    components: string[];
    intensity: number;
  }>;
  prosodyFactors?: {
    sentiment: 'positive' | 'negative' | 'neutral';
    subjectivity: number; // 0-1 (0 = objective, 1 = subjective)
    emotionalValence: number; // -1 to 1 (negative to positive)
  };
  keywords: string[]; // detected keywords
  timestamp: Date;
}

// Emotion keywords dictionary (expandable)
const emotionKeywords = {
  joy: ['happy', 'joyful', 'content', 'great', 'excellent', 'wonderful', 'fantastic', 'good', 'better', 'success', 'achievement', 'celebrate'],
  sadness: ['sad', 'lonely', 'melancholy', 'depressed', 'bad', 'worse', 'cry', 'sorrow', 'pain', 'loss', 'absence'],
  anger: ['angry', 'mad', 'furious', 'annoyed', 'irritated', 'rage', 'wrath', 'frustrated', 'hate', 'unfair'],
  fear: ['fear', 'scared', 'dread', 'anxiety', 'nervous', 'worried', 'panic', 'terror', 'insecure'],
  surprise: ['surprised', 'unexpected', 'amazement', 'incredible', 'wow', "didn't expect", 'shocking', 'surprise'],
  fatigue: ['tired', 'exhausted', 'drained', 'fatigued', 'sleepy', 'weak', 'no energy', 'defeated'],
  disgust: ['disgust', 'disgusting', 'unpleasant', 'horrible', 'repulsive', 'nauseating', 'gross']
};

// Intensifiers and negations
const intensifiers = ['very', 'quite', 'extremely', 'super', 'totally', 'really', 'incredibly'];
const negations = ['no', 'never', 'not', 'without', 'no one', 'none', 'neither'];

export function analyzeText(text: string): EmotionalAnalysis {
  const normalizedText = text.toLowerCase();
  const words = normalizedText.split(/\s+/);
  
  // Detect emotions
  const emotionScores: Record<string, number> = {
    joy: 0,
    sadness: 0,
    anger: 0,
    fear: 0,
    surprise: 0,
    fatigue: 0,
    disgust: 0
  };
  
  const detectedKeywords: string[] = [];
  let hasNegation = false;
  let intensifierMultiplier = 1;
  
  words.forEach((word, index) => {
    // Check for negations
    if (negations.includes(word)) {
      hasNegation = true;
    }
    
    // Check for intensifiers
    if (intensifiers.includes(word)) {
      intensifierMultiplier = 1.5;
    }
    
    // Check emotion keywords
    Object.entries(emotionKeywords).forEach(([emotion, keywords]) => {
      keywords.forEach(keyword => {
        if (word.includes(keyword) || keyword.includes(word)) {
          const score = hasNegation ? -1 : 1;
          emotionScores[emotion] += score * intensifierMultiplier;
          detectedKeywords.push(keyword);
          hasNegation = false;
          intensifierMultiplier = 1;
        }
      });
    });
  });
  
  // Find primary emotion
  const sortedEmotions = Object.entries(emotionScores)
    .sort(([, a], [, b]) => b - a);
  
  const primaryEmotion = (sortedEmotions[0][0] || 'joy') as EmotionalAnalysis['primaryEmotion'];
  const primaryScore = sortedEmotions[0][1];
  
  // Calculate confidence (0-100)
  const totalScore = Object.values(emotionScores).reduce((sum, score) => sum + Math.abs(score), 0);
  const confidence = totalScore > 0 
    ? Math.min(100, (Math.abs(primaryScore) / totalScore) * 100) 
    : 50;
  
  // Get secondary emotions
  const secondaryEmotions = sortedEmotions
    .slice(1, 4)
    .filter(([, score]) => score > 0)
    .map(([emotion, score]) => ({
      emotion,
      intensity: Math.min(100, (score / (totalScore || 1)) * 100)
    }));
  
  // Detect composite emotions
  const compositeEmotions = detectCompositeEmotions(emotionScores);
  
  // Calculate sentiment and valence
  const positiveEmotions = emotionScores.joy + emotionScores.surprise;
  const negativeEmotions = emotionScores.sadness + emotionScores.anger + 
                          emotionScores.fear + emotionScores.disgust;
  
  const emotionalValence = totalScore > 0
    ? (positiveEmotions - negativeEmotions) / totalScore
    : 0;
  
  const sentiment = emotionalValence > 0.2 ? 'positive' 
                  : emotionalValence < -0.2 ? 'negative' 
                  : 'neutral';
  
  // Calculate subjectivity (more emotion words = more subjective)
  const subjectivity = Math.min(1, detectedKeywords.length / (words.length * 0.3));
  
  return {
    primaryEmotion,
    confidence: Math.round(confidence),
    secondaryEmotions,
    compositeEmotions,
    prosodyFactors: {
      sentiment,
      subjectivity,
      emotionalValence
    },
    keywords: [...new Set(detectedKeywords)],
    timestamp: new Date()
  };
}

function detectCompositeEmotions(scores: Record<string, number>) {
  const composites = [];
  
  // Nostalgia = sadness + surprise
  if (scores.sadness > 0 && scores.surprise > 0) {
    composites.push({
      emotion: 'nostalgia',
      components: ['sadness', 'surprise'],
      intensity: Math.round((scores.sadness + scores.surprise) / 2)
    });
  }
  
  // Hope = joy + surprise
  if (scores.joy > 0 && scores.surprise > 0) {
    composites.push({
      emotion: 'hope',
      components: ['joy', 'surprise'],
      intensity: Math.round((scores.joy + scores.surprise) / 2)
    });
  }
  
  // Anxiety = fear + surprise
  if (scores.fear > 0 && scores.surprise > 0) {
    composites.push({
      emotion: 'anxiety',
      components: ['fear', 'surprise'],
      intensity: Math.round((scores.fear + scores.surprise) / 2)
    });
  }
  
  return composites;
}

// Extract keywords using simple TF-IDF approach
export function extractKeywords(text: string, maxKeywords: number = 10): string[] {
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3);
  
  // Common English stopwords
  const stopwords = ['this', 'that', 'these', 'those', 'for', 'but', 'because', 
                     'as', 'when', 'where', 'who', 'which', 'about',
                     'also', 'all', 'very', 'more', 'less'];
  
  const filtered = words.filter(word => !stopwords.includes(word));
  
  // Count frequency
  const frequency: Record<string, number> = {};
  filtered.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });
  
  // Sort by frequency and return top N
  return Object.entries(frequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, maxKeywords)
    .map(([word]) => word);
}