import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'elevated' | 'outlined';
}

export function Card({ children, className = '', onClick, variant = 'default' }: CardProps) {
  const baseStyles = 'rounded-xl transition-all duration-150';
  
  const variantStyles = {
    default: 'bg-slate-800/50 border border-slate-700/50',
    elevated: 'bg-slate-800 shadow-lg hover:shadow-xl',
    outlined: 'bg-transparent border-2 border-slate-700'
  };
  
  const interactiveStyles = onClick 
    ? 'cursor-pointer hover:bg-slate-700/50 active:bg-slate-700/70 hover:shadow-md active:shadow-sm' 
    : '';
  
  return (
    <div 
      className={`${baseStyles} ${variantStyles[variant]} ${interactiveStyles} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      {children}
    </div>
  );
}
