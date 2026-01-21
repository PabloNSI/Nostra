import React from 'react';
import { Menu, User } from 'lucide-react';

interface HeaderProps {
  title?: string;
  userName?: string;
  onMenuClick?: () => void;
  showAvatar?: boolean;
}

export function Header({ title, userName, onMenuClick, showAvatar = true }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-slate-800/30 border-b border-slate-700/50">
      <div className="flex items-center gap-4">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            aria-label="Abrir menú"
          >
            <Menu className="w-6 h-6" />
          </button>
        )}
        {title && <h2 className="text-slate-200">{title}</h2>}
        {userName && !title && (
          <div>
            <h2>Hola, {userName}</h2>
          </div>
        )}
      </div>
      
      {showAvatar && (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
        </div>
      )}
    </header>
  );
}
