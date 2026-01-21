import React from 'react';
import { Home, Calendar, Network, Settings } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'home' | 'timeline' | 'graph' | 'settings';
  onTabChange: (tab: 'home' | 'timeline' | 'graph' | 'settings') => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'home' as const, label: 'Inicio', icon: Home },
    { id: 'timeline' as const, label: 'Timeline', icon: Calendar },
    { id: 'graph' as const, label: 'Grafo', icon: Network },
    { id: 'settings' as const, label: 'Ajustes', icon: Settings }
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/95 border-t border-slate-700/50 backdrop-blur-sm">
      <div className="flex items-center justify-around px-4 py-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex flex-col items-center gap-1 px-4 py-2 rounded-lg
                transition-all duration-150
                ${isActive 
                  ? 'text-indigo-400 bg-indigo-500/10' 
                  : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800'
                }
              `}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''} transition-transform`} />
              <span className="text-xs">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
