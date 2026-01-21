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
      title: 'Conecta con alguien cercano',
      description: `Detectamos ${context.currentEmotion} elevada. Hablar con alguien de confianza puede ayudar.`,
      icon: '👥',
      targetEmotion: context.currentEmotion,
      confidence: 85,
      reason: `Porque ${context.currentEmotion} ha aumentado en los últimos días`,
      actions: [
        { label: 'Llamar a un amigo', type: 'external' },
        { label: 'Escribir mensaje', type: 'external' }
      ],
      priority: 'high',
      bestTime: 'ahora'
    });
    
    // Physical activity
    recommendations.push({
      id: 'rec_exercise',
      category: 'activity',
      title: 'Sal a caminar 15 minutos',
      description: 'El ejercicio ligero puede mejorar tu estado de ánimo significativamente.',
      icon: '🚶',
      targetEmotion: context.currentEmotion,
      confidence: 78,
      reason: 'El ejercicio aumenta endorfinas naturalmente',
      actions: [
        { label: 'Comenzar caminata', type: 'internal', data: { activity: 'walk' } }
      ],
      priority: 'high'
    });
  }
  
  // Handle fatigue
  if (context.currentEmotion === 'fatigue' && context.intensity > 7) {
    recommendations.push({
      id: 'rec_rest',
      category: 'self-care',
      title: 'Toma un descanso',
      description: 'Tu cuerpo necesita recuperarse. Considera descansar o dormir una siesta corta.',
      icon: '😴',
      targetEmotion: 'fatigue',
      confidence: 90,
      reason: 'Niveles altos de fatiga detectados',
      actions: [
        { label: 'Programar descanso', type: 'internal' },
        { label: 'Meditar 5 min', type: 'internal', data: { activity: 'meditation', duration: 5 } }
      ],
      priority: 'high',
      bestTime: 'ahora'
    });
  }
  
  // Handle positive emotions - reinforce
  if (['joy', 'surprise'].includes(context.currentEmotion) && context.intensity > 7) {
    recommendations.push({
      id: 'rec_journal_gratitude',
      category: 'reflection',
      title: 'Documenta este momento',
      description: 'Estás experimentando emociones positivas. Escribir sobre ellas refuerza el bienestar.',
      icon: '📝',
      targetEmotion: 'joy',
      confidence: 75,
      reason: 'Registrar momentos positivos mejora la memoria emocional',
      actions: [
        { label: 'Nueva entrada rápida', type: 'internal', data: { screen: 'quick-write' } }
      ],
      priority: 'medium'
    });
    
    recommendations.push({
      id: 'rec_share_joy',
      category: 'social',
      title: 'Comparte tu alegría',
      description: 'Considera compartir este momento positivo con alguien cercano.',
      icon: '🌟',
      targetEmotion: 'joy',
      confidence: 70,
      reason: 'Compartir emociones positivas las amplifica',
      actions: [
        { label: 'Llamar amigo/familia', type: 'external' }
      ],
      priority: 'medium'
    });
  }
  
  // Pattern-based recommendations
  if (context.recentTrend === 'declining') {
    recommendations.push({
      id: 'rec_habit_check',
      category: 'habit',
      title: 'Revisa tus hábitos',
      description: 'Tu estado emocional ha disminuido últimamente. Verificar sueño, ejercicio y alimentación puede ayudar.',
      icon: '📊',
      targetEmotion: context.currentEmotion,
      confidence: 68,
      reason: 'Tendencia a la baja en estado emocional',
      actions: [
        { label: 'Ver dashboard hábitos', type: 'internal', data: { screen: 'habits' } },
        { label: 'Actualizar registros', type: 'internal' }
      ],
      priority: 'medium'
    });
  }
  
  // Time-based recommendations
  if (context.patterns.timeOfDay === 'noche' && 
      ['fear', 'ansiedad'].includes(context.currentEmotion)) {
    recommendations.push({
      id: 'rec_sleep_routine',
      category: 'self-care',
      title: 'Prepara tu rutina de sueño',
      description: 'La ansiedad nocturna puede interferir con el descanso. Una rutina relajante ayuda.',
      icon: '🌙',
      targetEmotion: context.currentEmotion,
      confidence: 82,
      reason: 'Ansiedad detectada en horas nocturnas',
      actions: [
        { label: 'Meditación guiada', type: 'internal', data: { activity: 'meditation' } },
        { label: 'Reducir pantallas', type: 'external' }
      ],
      priority: 'high',
      bestTime: 'antes de dormir'
    });
  }
  
  // General wellness
  if (Math.random() > 0.5) { // Periodic suggestion
    recommendations.push({
      id: 'rec_mindfulness',
      category: 'meditation',
      title: 'Práctica de mindfulness',
      description: 'Tomar unos minutos para centrarte puede mejorar tu claridad mental.',
      icon: '🧘',
      targetEmotion: 'neutral',
      confidence: 65,
      reason: 'Práctica regular de mindfulness mejora bienestar general',
      actions: [
        { label: 'Respiración 3 minutos', type: 'internal', data: { activity: 'breathing', duration: 3 } },
        { label: 'Modo Zen', type: 'internal', data: { screen: 'zen' } }
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
    sadness: ['Salir a caminar', 'Llamar a un amigo', 'Escuchar música', 'Ver fotos felices'],
    anger: ['Ejercicio intenso', 'Escribir libremente', 'Respiración profunda', 'Duchate con agua fría'],
    fear: ['Hablar con alguien', 'Lista de preocupaciones', 'Técnica 5-4-3-2-1', 'Meditar'],
    joy: ['Compartir con otros', 'Crear algo', 'Ayudar a alguien', 'Documentar el momento'],
    fatigue: ['Descansar', 'Siesta corta (20min)', 'Hidratarte', 'Estiramientos suaves']
  };
  
  return suggestions[emotion] || ['Tomar agua', 'Respirar profundo', 'Estirarse'];
}
