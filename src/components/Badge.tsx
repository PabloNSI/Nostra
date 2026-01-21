import React from 'react';

interface BadgeProps {
  type?: 'emotion' | 'status' | 'tag';
  emotion?: 'joy' | 'sadness' | 'anger' | 'fear' | 'surprise' | 'fatigue' | 'disgust';
  status?: 'success' | 'error' | 'warning' | 'info';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ type = 'tag', emotion, status, children, className = '' }: BadgeProps) {
  const baseStyles = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm';
  
  const emotionStyles = {
    joy: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    sadness: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    anger: 'bg-red-500/20 text-red-400 border border-red-500/30',
    fear: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
    surprise: 'bg-pink-500/20 text-pink-400 border border-pink-500/30',
    fatigue: 'bg-gray-500/20 text-gray-400 border border-gray-500/30',
    disgust: 'bg-green-500/20 text-green-400 border border-green-500/30'
  };
  
  const statusStyles = {
    success: 'bg-green-500/20 text-green-400 border border-green-500/30',
    error: 'bg-red-500/20 text-red-400 border border-red-500/30',
    warning: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    info: 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
  };
  
  const emotionIcons = {
    joy: '😊',
    sadness: '😢',
    anger: '😠',
    fear: '😨',
    surprise: '😲',
    fatigue: '😴',
    disgust: '🤢'
  };
  
  let appliedStyles = 'bg-slate-700/50 text-slate-300 border border-slate-600';
  let icon = null;
  
  if (type === 'emotion' && emotion) {
    appliedStyles = emotionStyles[emotion];
    icon = emotionIcons[emotion];
  } else if (type === 'status' && status) {
    appliedStyles = statusStyles[status];
  }
  
  return (
    <span className={`${baseStyles} ${appliedStyles} ${className}`}>
      {icon && <span>{icon}</span>}
      {children}
    </span>
  );
}
