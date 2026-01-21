// Prosody Analysis Engine - Voice Metrics
export interface ProsodyMetrics {
  pitch: {
    current: number; // Hz (100-400 típico)
    baseline: number; // promedio del usuario
    variation: number; // desv. estándar
    trend: 'rising' | 'falling' | 'stable';
  };
  energy: {
    current: number; // dB (0-100 normalizado)
    baseline: number;
    intensity: 'low' | 'medium' | 'high';
  };
  speechRate: {
    wordsPerMinute: number;
    baseline: number;
    ratio: number; // actual / baseline
    interpretation: 'slow' | 'normal' | 'fast';
  };
  pauseRatio: {
    value: number; // 0-1 (proporción de silencios)
    interpretation: 'thoughtful' | 'natural' | 'rushed';
  };
  voiceQuality: {
    jitter: number; // variación pitch (% de frecuencia fundamental)
    shimmer: number; // variación amplitud (%)
    harmonicRatio: number; // 0-1 (claridad de voz)
  };
}

// Simulate prosody analysis (in production, use Web Audio API + FFT)
export function analyzeProsody(audioData?: AudioBuffer): ProsodyMetrics {
  // Mock data for demonstration - in production, use real audio analysis
  const baseline = {
    pitch: 180, // Hz, typical for mixed voice
    energy: 65,
    speechRate: 150, // words per minute
  };
  
  // Simulate variation
  const pitchCurrent = baseline.pitch + (Math.random() - 0.5) * 60;
  const energyCurrent = baseline.energy + (Math.random() - 0.5) * 30;
  const speechRateCurrent = baseline.speechRate + (Math.random() - 0.5) * 40;
  
  const pitchVariation = Math.abs(pitchCurrent - baseline.pitch);
  const speechRateRatio = speechRateCurrent / baseline.speechRate;
  const pauseRatioValue = Math.random() * 0.4; // 0-40% pauses
  
  return {
    pitch: {
      current: Math.round(pitchCurrent),
      baseline: baseline.pitch,
      variation: Math.round(pitchVariation),
      trend: pitchCurrent > baseline.pitch + 10 ? 'rising' 
           : pitchCurrent < baseline.pitch - 10 ? 'falling' 
           : 'stable'
    },
    energy: {
      current: Math.round(energyCurrent),
      baseline: baseline.energy,
      intensity: energyCurrent > 75 ? 'high' 
               : energyCurrent > 50 ? 'medium' 
               : 'low'
    },
    speechRate: {
      wordsPerMinute: Math.round(speechRateCurrent),
      baseline: baseline.speechRate,
      ratio: Math.round(speechRateRatio * 100) / 100,
      interpretation: speechRateRatio > 1.2 ? 'fast' 
                    : speechRateRatio < 0.8 ? 'slow' 
                    : 'normal'
    },
    pauseRatio: {
      value: Math.round(pauseRatioValue * 100) / 100,
      interpretation: pauseRatioValue > 0.3 ? 'thoughtful' 
                    : pauseRatioValue > 0.15 ? 'natural' 
                    : 'rushed'
    },
    voiceQuality: {
      jitter: Math.round(Math.random() * 2 * 100) / 100, // 0-2%
      shimmer: Math.round(Math.random() * 5 * 100) / 100, // 0-5%
      harmonicRatio: Math.round((0.7 + Math.random() * 0.3) * 100) / 100 // 0.7-1.0
    }
  };
}

// Interpret prosody metrics to emotion
export function interpretProsodyEmotion(metrics: ProsodyMetrics): {
  suggestedEmotion: string;
  confidence: number;
  reasoning: string;
} {
  let suggestedEmotion = 'neutral';
  let confidence = 50;
  let reasoning = '';
  
  // High pitch + high energy = excitement, joy, or anger
  if (metrics.pitch.trend === 'rising' && metrics.energy.intensity === 'high') {
    if (metrics.speechRate.interpretation === 'fast') {
      suggestedEmotion = 'joy';
      confidence = 75;
      reasoning = 'Tono elevado, alta energía y habla rápida sugieren alegría o entusiasmo';
    } else {
      suggestedEmotion = 'anger';
      confidence = 70;
      reasoning = 'Tono elevado con alta energía sugiere enfado o frustración';
    }
  }
  
  // Low pitch + low energy = sadness or fatigue
  else if (metrics.pitch.trend === 'falling' && metrics.energy.intensity === 'low') {
    if (metrics.pauseRatio.interpretation === 'thoughtful') {
      suggestedEmotion = 'sadness';
      confidence = 72;
      reasoning = 'Tono bajo, baja energía y pausas largas sugieren tristeza';
    } else {
      suggestedEmotion = 'fatigue';
      confidence = 68;
      reasoning = 'Tono bajo y baja energía sugieren fatiga o cansancio';
    }
  }
  
  // Fast speech + high pauses = anxiety/fear
  else if (metrics.speechRate.interpretation === 'fast' && metrics.pauseRatio.value > 0.25) {
    suggestedEmotion = 'fear';
    confidence = 65;
    reasoning = 'Habla rápida con pausas frecuentes sugiere nerviosismo o ansiedad';
  }
  
  // Variable pitch + medium energy = surprise
  else if (metrics.pitch.variation > 30 && metrics.energy.intensity === 'medium') {
    suggestedEmotion = 'surprise';
    confidence = 60;
    reasoning = 'Variaciones de tono sugieren sorpresa o asombro';
  }
  
  return {
    suggestedEmotion,
    confidence,
    reasoning
  };
}

// Real-time audio analysis setup (for future Web Audio API integration)
export class AudioAnalyzer {
  private audioContext?: AudioContext;
  private analyser?: AnalyserNode;
  private dataArray?: Uint8Array;
  
  async initialize() {
    // This would use real Web Audio API
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      this.audioContext = new AudioContext();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 2048;
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    }
  }
  
  async startAnalysis(stream: MediaStream): Promise<void> {
    if (!this.audioContext || !this.analyser) {
      await this.initialize();
    }
    
    // Connect microphone stream to analyser
    // const source = this.audioContext!.createMediaStreamSource(stream);
    // source.connect(this.analyser!);
    
    // Real implementation would continuously analyze audio
  }
  
  getCurrentMetrics(): ProsodyMetrics {
    // In production: analyze this.dataArray for real metrics
    return analyzeProsody();
  }
  
  stop() {
    if (this.audioContext) {
      this.audioContext.close();
    }
  }
}
