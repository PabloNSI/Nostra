// Habit Correlation Engine
export interface HabitEntry {
  id: string;
  habitId: string;
  date: Date;
  value: number | boolean;
  unit?: string;
  notes?: string;
  timestamp: Date;
}

export interface HabitDefinition {
  id: string;
  name: string;
  category: 'sleep' | 'exercise' | 'mindfulness' | 'nutrition' | 'social' | 'custom';
  dataType: 'numeric' | 'boolean' | 'categorical';
  target?: {
    value: number;
    unit: string;
    frequency: 'daily' | 'weekly';
  };
  color: string;
  icon: string;
}

export interface HabitEmotionCorrelation {
  habitId: string;
  emotion: string;
  correlation: number; // -1 to 1
  strength: 'weak' | 'moderate' | 'strong';
  direction: 'positive' | 'negative';
  samples: number;
  pValue?: number;
  interpretation: string;
}

export interface HabitRecommendation {
  id: string;
  priority: 'high' | 'medium' | 'low';
  type: 'boost' | 'avoid' | 'monitor';
  title: string;
  description: string;
  reasoning: HabitEmotionCorrelation;
  action: string;
  impact?: {
    estimatedEmotionChange: number;
    emotion: string;
  };
  evidence: number;
}

// Calculate Pearson correlation coefficient
export function calculateCorrelation(x: number[], y: number[]): number {
  if (x.length !== y.length || x.length === 0) return 0;
  
  const n = x.length;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((acc, xi, i) => acc + xi * y[i], 0);
  const sumX2 = x.reduce((acc, xi) => acc + xi * xi, 0);
  const sumY2 = y.reduce((acc, yi) => acc + yi * yi, 0);
  
  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
  
  if (denominator === 0) return 0;
  
  return numerator / denominator;
}

// Analyze correlation between habit and emotion
export function analyzeHabitEmotionCorrelation(
  habitEntries: HabitEntry[],
  emotionScores: Array<{ date: Date; emotion: string; intensity: number }>,
  habitId: string,
  targetEmotion: string
): HabitEmotionCorrelation | null {
  // Align data by date
  const alignedData: Array<{ habit: number; emotion: number }> = [];
  
  habitEntries.forEach(habitEntry => {
    const sameDay = emotionScores.find(es => 
      es.date.toDateString() === habitEntry.date.toDateString() &&
      es.emotion === targetEmotion
    );
    
    if (sameDay) {
      const habitValue = typeof habitEntry.value === 'boolean' 
        ? (habitEntry.value ? 1 : 0) 
        : habitEntry.value;
      
      alignedData.push({
        habit: habitValue,
        emotion: sameDay.intensity
      });
    }
  });
  
  if (alignedData.length < 3) return null; // Need at least 3 data points
  
  const habitValues = alignedData.map(d => d.habit);
  const emotionValues = alignedData.map(d => d.emotion);
  
  const correlation = calculateCorrelation(habitValues, emotionValues);
  const absCorrelation = Math.abs(correlation);
  
  // Determine strength
  const strength = absCorrelation > 0.6 ? 'strong' 
                 : absCorrelation > 0.3 ? 'moderate' 
                 : 'weak';
  
  const direction = correlation > 0 ? 'positive' : 'negative';
  
  // Generate interpretation
  const habit = habitEntries[0]; // Get habit info
  let interpretation = '';
  
  if (direction === 'positive' && strength !== 'weak') {
    interpretation = `More ${habit.habitId} is associated with higher ${targetEmotion}`;
  } else if (direction === 'negative' && strength !== 'weak') {
    interpretation = `More ${habit.habitId} is associated with lower ${targetEmotion}`;
  } else {
    interpretation = `No significant correlation between ${habit.habitId} and ${targetEmotion}`;
  }
  
  return {
    habitId,
    emotion: targetEmotion,
    correlation: Math.round(correlation * 100) / 100,
    strength,
    direction,
    samples: alignedData.length,
    interpretation
  };
}

// Generate recommendations based on correlations
export function generateRecommendations(
  correlations: HabitEmotionCorrelation[],
  habits: HabitDefinition[]
): HabitRecommendation[] {
  const recommendations: HabitRecommendation[] = [];
  
  // Filter for significant correlations
  const significant = correlations.filter(c => 
    c.strength !== 'weak' && c.samples >= 5
  );
  
  significant.forEach(corr => {
    const habit = habits.find(h => h.id === corr.habitId);
    if (!habit) return;
    
    let priority: HabitRecommendation['priority'] = 'medium';
    let type: HabitRecommendation['type'] = 'monitor';
    let action = '';
    
    // Positive correlation with positive emotion
    if (corr.direction === 'positive' && 
        ['joy', 'hope'].includes(corr.emotion)) {
      priority = corr.strength === 'strong' ? 'high' : 'medium';
      type = 'boost';
      action = `Increase ${habit.name} to improve your ${corr.emotion}`;
    }
    
    // Negative correlation with negative emotion
    else if (corr.direction === 'negative' && 
             ['sadness', 'anger', 'fear'].includes(corr.emotion)) {
      priority = corr.strength === 'strong' ? 'high' : 'medium';
      type = 'boost';
      action = `Increase ${habit.name} to reduce ${corr.emotion}`;
    }
    
    // Positive correlation with negative emotion
    else if (corr.direction === 'positive' && 
             ['sadness', 'anger', 'fear'].includes(corr.emotion)) {
      priority = 'high';
      type = 'avoid';
      action = `Reduce ${habit.name} to improve your emotional state`;
    }
    
    const estimatedChange = Math.abs(corr.correlation) * 30; // Scale to percentage
    
    recommendations.push({
      id: `rec_${corr.habitId}_${corr.emotion}`,
      priority,
      type,
      title: action,
      description: corr.interpretation,
      reasoning: corr,
      action,
      impact: {
        estimatedEmotionChange: Math.round(estimatedChange),
        emotion: corr.emotion
      },
      evidence: corr.samples
    });
  });
  
  // Sort by priority and correlation strength
  return recommendations.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
    if (priorityDiff !== 0) return priorityDiff;
    
    return Math.abs(b.reasoning.correlation) - Math.abs(a.reasoning.correlation);
  });
}

// Detect patterns in habit data
export function detectHabitPatterns(
  entries: HabitEntry[]
): {
  weeklyPattern?: string;
  trend?: 'increasing' | 'decreasing' | 'stable';
  consistency?: number; // 0-100%
} {
  if (entries.length < 7) return {};
  
  // Sort by date
  const sorted = [...entries].sort((a, b) => 
    a.date.getTime() - b.date.getTime()
  );
  
  // Calculate trend
  const values = sorted.map(e => 
    typeof e.value === 'boolean' ? (e.value ? 1 : 0) : e.value
  );
  
  const firstHalf = values.slice(0, Math.floor(values.length / 2));
  const secondHalf = values.slice(Math.floor(values.length / 2));
  
  const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
  const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
  
  const trend = secondAvg > firstAvg * 1.1 ? 'increasing'
              : secondAvg < firstAvg * 0.9 ? 'decreasing'
              : 'stable';
  
  // Calculate consistency (how many days with entries vs total days)
  const daysCovered = new Set(sorted.map(e => e.date.toDateString())).size;
  const totalDays = Math.ceil(
    (sorted[sorted.length - 1].date.getTime() - sorted[0].date.getTime()) / 
    (1000 * 60 * 60 * 24)
  ) + 1;
  
  const consistency = Math.round((daysCovered / totalDays) * 100);
  
  return {
    trend,
    consistency
  };
}