// Cognitive Graph Engine - NER and Knowledge Graph
export interface CognitiveGraphNode {
  id: string;
  type: 'concept' | 'emotion' | 'person' | 'activity' | 'location' | 'event';
  label: string;
  emoji?: string;
  color: string; // mapeo automático por tipo
  frequency: number; // veces mencionado
  firstAppearance: Date;
  lastAppearance: Date;
  emotionalWeight: number; // -1 (negativo) a 1 (positivo)
  metadata: {
    sentiment?: number; // -1 a 1
    relatedEmotions?: string[];
    intensity?: number;
  };
}

export interface CognitiveGraphEdge {
  id: string;
  source: string;
  target: string;
  weight: number; // 0-1, fuerza de relación
  cooccurrences: number; // veces aparecen juntas
  temporalDistance: number; // días entre apariciones
  emotionalConsistency: number; // -1 a 1
  type: 'correlation' | 'causation' | 'association';
}

// Named Entity Recognition (simple version)
export function extractEntities(text: string): {
  persons: string[];
  locations: string[];
  activities: string[];
  concepts: string[];
} {
  const normalizedText = text.toLowerCase();
  
  // Simple pattern matching (in production, use NER library like compromise)
  const patterns = {
    activities: ['correr', 'nadar', 'caminar', 'trabajar', 'estudiar', 'leer', 
                 'cocinar', 'ejercicio', 'yoga', 'meditar', 'reunión', 'proyecto'],
    locations: ['casa', 'oficina', 'café', 'parque', 'gym', 'playa', 
                'ciudad', 'campo', 'montaña'],
    concepts: ['trabajo', 'familia', 'salud', 'dinero', 'tiempo', 'libertad',
               'amor', 'éxito', 'fracaso', 'meta', 'sueño', 'esperanza']
  };
  
  const detected = {
    persons: [] as string[],
    locations: [] as string[],
    activities: [] as string[],
    concepts: [] as string[]
  };
  
  // Detect capitalized words as potential person names
  const words = text.split(/\s+/);
  words.forEach(word => {
    if (word.length > 2 && word[0] === word[0].toUpperCase() && 
        word.slice(1) === word.slice(1).toLowerCase()) {
      // Likely a proper name
      detected.persons.push(word);
    }
  });
  
  // Detect patterns
  Object.entries(patterns).forEach(([category, keywords]) => {
    keywords.forEach(keyword => {
      if (normalizedText.includes(keyword)) {
        detected[category as keyof typeof detected].push(keyword);
      }
    });
  });
  
  return detected;
}

// Create nodes from entities and emotions
export function createNodesFromAnalysis(
  entities: ReturnType<typeof extractEntities>,
  emotions: string[],
  entryDate: Date
): CognitiveGraphNode[] {
  const nodes: CognitiveGraphNode[] = [];
  const nodeColors = {
    concept: '#6366F1',
    emotion: '#FBBF24',
    person: '#EC4899',
    activity: '#10B981',
    location: '#8B5CF6',
    event: '#3B82F6'
  };
  
  // Add person nodes
  entities.persons.forEach(person => {
    nodes.push({
      id: `person_${person.toLowerCase()}`,
      type: 'person',
      label: person,
      emoji: '👤',
      color: nodeColors.person,
      frequency: 1,
      firstAppearance: entryDate,
      lastAppearance: entryDate,
      emotionalWeight: 0,
      metadata: {}
    });
  });
  
  // Add activity nodes
  entities.activities.forEach(activity => {
    nodes.push({
      id: `activity_${activity}`,
      type: 'activity',
      label: activity,
      emoji: '🎯',
      color: nodeColors.activity,
      frequency: 1,
      firstAppearance: entryDate,
      lastAppearance: entryDate,
      emotionalWeight: 0,
      metadata: {}
    });
  });
  
  // Add location nodes
  entities.locations.forEach(location => {
    nodes.push({
      id: `location_${location}`,
      type: 'location',
      label: location,
      emoji: '📍',
      color: nodeColors.location,
      frequency: 1,
      firstAppearance: entryDate,
      lastAppearance: entryDate,
      emotionalWeight: 0,
      metadata: {}
    });
  });
  
  // Add concept nodes
  entities.concepts.forEach(concept => {
    nodes.push({
      id: `concept_${concept}`,
      type: 'concept',
      label: concept,
      emoji: '💡',
      color: nodeColors.concept,
      frequency: 1,
      firstAppearance: entryDate,
      lastAppearance: entryDate,
      emotionalWeight: 0,
      metadata: {}
    });
  });
  
  // Add emotion nodes
  emotions.forEach(emotion => {
    nodes.push({
      id: `emotion_${emotion}`,
      type: 'emotion',
      label: emotion,
      emoji: getEmotionEmoji(emotion),
      color: nodeColors.emotion,
      frequency: 1,
      firstAppearance: entryDate,
      lastAppearance: entryDate,
      emotionalWeight: getEmotionValence(emotion),
      metadata: {
        relatedEmotions: [emotion]
      }
    });
  });
  
  return nodes;
}

// Create edges between nodes that appear together
export function createEdges(nodes: CognitiveGraphNode[]): CognitiveGraphEdge[] {
  const edges: CognitiveGraphEdge[] = [];
  
  // Connect all nodes that appear in the same entry
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      edges.push({
        id: `${nodes[i].id}_${nodes[j].id}`,
        source: nodes[i].id,
        target: nodes[j].id,
        weight: 0.5,
        cooccurrences: 1,
        temporalDistance: 0,
        emotionalConsistency: 0,
        type: 'association'
      });
    }
  }
  
  return edges;
}

// Update existing graph with new entry
export function updateGraph(
  existingNodes: CognitiveGraphNode[],
  existingEdges: CognitiveGraphEdge[],
  newNodes: CognitiveGraphNode[],
  newEdges: CognitiveGraphEdge[]
): { nodes: CognitiveGraphNode[]; edges: CognitiveGraphEdge[] } {
  const nodeMap = new Map<string, CognitiveGraphNode>();
  const edgeMap = new Map<string, CognitiveGraphEdge>();
  
  // Add existing nodes
  existingNodes.forEach(node => nodeMap.set(node.id, { ...node }));
  
  // Update or add new nodes
  newNodes.forEach(newNode => {
    const existing = nodeMap.get(newNode.id);
    if (existing) {
      existing.frequency += 1;
      existing.lastAppearance = newNode.lastAppearance;
      existing.emotionalWeight = (existing.emotionalWeight + newNode.emotionalWeight) / 2;
    } else {
      nodeMap.set(newNode.id, newNode);
    }
  });
  
  // Add existing edges
  existingEdges.forEach(edge => edgeMap.set(edge.id, { ...edge }));
  
  // Update or add new edges
  newEdges.forEach(newEdge => {
    const existing = edgeMap.get(newEdge.id);
    if (existing) {
      existing.cooccurrences += 1;
      existing.weight = Math.min(1, existing.weight + 0.1);
    } else {
      edgeMap.set(newEdge.id, newEdge);
    }
  });
  
  return {
    nodes: Array.from(nodeMap.values()),
    edges: Array.from(edgeMap.values())
  };
}

function getEmotionEmoji(emotion: string): string {
  const emojiMap: Record<string, string> = {
    joy: '😊',
    sadness: '😢',
    anger: '😠',
    fear: '😨',
    surprise: '😲',
    fatigue: '😴',
    disgust: '🤢',
    nostalgia: '🥺',
    esperanza: '🌟',
    ansiedad: '😰'
  };
  return emojiMap[emotion.toLowerCase()] || '❓';
}

function getEmotionValence(emotion: string): number {
  const valenceMap: Record<string, number> = {
    joy: 1,
    sadness: -0.8,
    anger: -0.6,
    fear: -0.7,
    surprise: 0.3,
    fatigue: -0.4,
    disgust: -0.5,
    nostalgia: 0,
    esperanza: 0.8,
    ansiedad: -0.6
  };
  return valenceMap[emotion.toLowerCase()] || 0;
}
