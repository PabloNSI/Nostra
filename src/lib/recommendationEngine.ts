// Recommendation Engine - Personalized AI Recommendations
export interface Recommendation {
  id: string;
  category: 'activity' | 'reflection' | 'habit' | 'meditation' | 'social' | 'self-care';
  title: string;
  description: string;
  icon: string;
  targetEmotion: string;
  confidence: number; // 0-100
  reason: string;
  actions: Array<{
    label: string;
    type: 'internal' | 'external';
    data?: any;
  }>;
  priority: 'low' | 'medium' | 'high';
  bestTime?: string;
}

interface EmotionalContext {
  currentEmotion: string;
  intensity: number;
  recentTrend: 'improving' | 'declining' | 'stable';
  patterns: {
    timeOfDay?: string;
    dayOfWeek?: string;
    correlatedHabits?: string[];
  };
}

export function generateRecommendations(
  context: EmotionalContext,
  userPreferences?: {
    favoriteActivities?: string[];
    dislikedSuggestions?: string[];
  }
): Recommendation[] {
  const recommendations: Recommendation[] = [];
  
  // Rule-based recommendation system
  
  // Handle sadness/negative emotions
  if (['sadness', 'anger', 'fear'].includes(context.currentEmotion) && 
      context.intensity > 6) {
    
    // High priority: immediate support
    recommendations.push({
      id: 'rec_social_support',
      category: 'social',
      title: 'Connect with someone close',
      description: `We detected elevated ${context.currentEmotion}. Talking to someone you trust can help.`,
      icon: '👥',
      targetEmotion: context.currentEmotion,
      confidence: 85,
      reason: `Because ${context.currentEmotion} has increased in recent days`,
      actions: [
        { label: 'Call a friend', type: 'external' },
        { label: 'Write a message', type: 'external' }
      ],
      priority: 'high',
      bestTime: 'now'
    });
    
    // Physical activity
    recommendations.push({
      id: 'rec_exercise',
      category: 'activity',
      title: 'Go for a 15-minute walk',
      description: 'Light exercise can significantly improve your mood.',
      icon: '🚶',
      targetEmotion: context.currentEmotion,
      confidence: 78,
      reason: 'Exercise naturally increases endorphins',
      actions: [
        { label: 'Start walk', type: 'internal', data: { activity: 'walk' } }
      ],
      priority: 'high'
    });
  }
  
  // Handle fatigue
  if (context.currentEmotion === 'fatigue' && context.intensity > 7) {
    recommendations.push({
      id: 'rec_rest',
      category: 'self-care',
      title: 'Take a break',
      description: 'Your body needs to recover. Consider resting or taking a short nap.',
      icon: '😴',
      targetEmotion: 'fatigue',
      confidence: 90,
      reason: 'High fatigue levels detected',
      actions: [
        { label: 'Schedule rest', type: 'internal' },
        { label: 'Meditate 5 min', type: 'internal', data: { activity: 'meditation', duration: 5 } }
      ],
      priority: 'high',
      bestTime: 'now'
    });
  }
  
  // Handle positive emotions - reinforce
  if (['joy', 'surprise'].includes(context.currentEmotion) && context.intensity > 7) {
    recommendations.push({
      id: 'rec_journal_gratitude',
      category: 'reflection',
      title: 'Document this moment',
      description: 'You are experiencing positive emotions. Writing about them reinforces well-being.',
      icon: '📝',
      targetEmotion: 'joy',
      confidence: 75,
      reason: 'Recording positive moments improves emotional memory',
      actions: [
        { label: 'New quick entry', type: 'internal', data: { screen: 'quick-write' } }
      ],
      priority: 'medium'
    });
    
    recommendations.push({
      id: 'rec_share_joy',
      category: 'social',
      title: 'Share your joy',
      description: 'Consider sharing this positive moment with someone close.',
      icon: '🌟',
      targetEmotion: 'joy',
      confidence: 70,
      reason: 'Sharing positive emotions amplifies them',
      actions: [
        { label: 'Call friend/family', type: 'external' }
      ],
      priority: 'medium'
    });
  }
  
  // Pattern-based recommendations
  if (context.recentTrend === 'declining') {
    recommendations.push({
      id: 'rec_habit_check',
      category: 'habit',
      title: 'Check your habits',
      description: 'Your emotional state has declined recently. Checking sleep, exercise, and nutrition can help.',
      icon: '📊',
      targetEmotion: context.currentEmotion,
      confidence: 68,
      reason: 'Downward trend in emotional state',
      actions: [
        { label: 'View habits dashboard', type: 'internal', data: { screen: 'habits' } },
        { label: 'Update records', type: 'internal' }
      ],
      priority: 'medium'
    });
  }
  
  // Time-based recommendations
  if (context.patterns.timeOfDay === 'night' && 
      ['fear', 'anxiety'].includes(context.currentEmotion)) {
    recommendations.push({
      id: 'rec_sleep_routine',
      category: 'self-care',
      title: 'Prepare your sleep routine',
      description: 'Nighttime anxiety can interfere with rest. A relaxing routine helps.',
      icon: '🌙',
      targetEmotion: context.currentEmotion,
      confidence: 82,
      reason: 'Anxiety detected during nighttime hours',
      actions: [
        { label: 'Guided meditation', type: 'internal', data: { activity: 'meditation' } },
        { label: 'Reduce screen time', type: 'external' }
      ],
      priority: 'high',
      bestTime: 'before sleeping'
    });
  }
  
  // General wellness
  if (Math.random() > 0.5) { // Periodic suggestion
    recommendations.push({
      id: 'rec_mindfulness',
      category: 'meditation',
      title: 'Mindfulness practice',
      description: 'Taking a few minutes to center yourself can improve your mental clarity.',
      icon: '🧘',
      targetEmotion: 'neutral',
      confidence: 65,
      reason: 'Regular mindfulness practice improves overall well-being',
      actions: [
        { label: '3-minute breathing', type: 'internal', data: { activity: 'breathing', duration: 3 } },
        { label: 'Zen Mode', type: 'internal', data: { screen: 'zen' } }
      ],
      priority: 'low'
    });
  }
  
  // Filter out disliked suggestions
  const filtered = recommendations.filter(rec => 
    !userPreferences?.dislikedSuggestions?.includes(rec.id)
  );
  
  // Sort by priority and confidence
  return filtered.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
    if (priorityDiff !== 0) return priorityDiff;
    
    return b.confidence - a.confidence;
  });
}

// Learn from user feedback
export function updateRecommendationModel(
  recommendationId: string,
  wasHelpful: boolean
): void {
  // Store feedback in local storage or IndexedDB
  const feedback = {
    recommendationId,
    wasHelpful,
    timestamp: new Date()
  };
  
  // In production: adjust confidence scores based on feedback
  // Could use simple counters or TensorFlow.js for more sophisticated learning
  
  if (typeof localStorage !== 'undefined') {
    const existing = localStorage.getItem('recommendation_feedback');
    const feedbackList = existing ? JSON.parse(existing) : [];
    feedbackList.push(feedback);
    localStorage.setItem('recommendation_feedback', JSON.stringify(feedbackList));
  }
}

// Get personalized activity suggestions based on time and emotion
export function getActivitySuggestions(
  emotion: string,
  timeOfDay: string
): string[] {
  const suggestions: Record<string, string[]> = {
    sadness: ['Go for a walk', 'Call a friend', 'Listen to music', 'Look at happy photos'],
    anger: ['Intense exercise', 'Free writing', 'Deep breathing', 'Take a cold shower'],
    fear: ['Talk to someone', 'List your worries', '5-4-3-2-1 technique', 'Meditate'],
    joy: ['Share with others', 'Create something', 'Help someone', 'Document the moment'],
    fatigue: ['Rest', 'Short nap (20min)', 'Hydrate', 'Gentle stretches']
  };
  
  return suggestions[emotion] || ['Drink water', 'Take deep breaths', 'Stretch'];
}