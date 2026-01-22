import React, { useState } from 'react';
import { User, Globe, Volume2, Lock, Info, LogOut, Download, Upload, ChevronRight } from 'lucide-react';
import { Header } from '../Header';
import { BottomNav } from '../BottomNav';
import { Card } from '../Card';
import { Input } from '../Input';
import { Button } from '../Button';

interface SettingsScreenProps {
  activeTab: 'home' | 'timeline' | 'graph' | 'settings';
  onTabChange: (tab: 'home' | 'timeline' | 'graph' | 'settings') => void;
  onLogout: () => void;
}

export function SettingsScreen({ activeTab, onTabChange, onLogout }: SettingsScreenProps) {
  const [settings, setSettings] = useState({
    name: 'User',
    language: 'es',
    variant: 'ES',
    defaultMode: 'full',
    theme: 'dark',
    ttsVoice: 'es-ES-Standard-A',
    ttsSpeed: 1.0,
    autoLock: 5
  });
  
  return (
    <div className="min-h-screen bg-slate-900 pb-20">
      <Header title="Settings" />
      
      <main className="px-6 py-6 space-y-6">
        {/* Account Section */}
        <div>
          <h3 className="text-slate-400 text-sm mb-4">ACCOUNT</h3>
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <Input
                  value={settings.name}
                  onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                  placeholder="Your name"
                />
              </div>
            </div>
          </Card>
        </div>
        
        {/* Preferences Section */}
        <div>
          <h3 className="text-slate-400 text-sm mb-4">PREFERENCES</h3>
          <Card className="divide-y divide-slate-700/50">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-slate-300">Language</p>
                  <p className="text-sm text-slate-500">Spanish</p>
                </div>
              </div>
              <select
                value={settings.language}
                onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                className="px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="es">Spanish</option>
                <option value="en">English</option>
                <option value="fr">French</option>
              </select>
            </div>
            
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-slate-300">Regional variant</p>
                  <p className="text-sm text-slate-500">Spain</p>
                </div>
              </div>
              <select
                value={settings.variant}
                onChange={(e) => setSettings({ ...settings, variant: e.target.value })}
                className="px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="ES">Spain (ES)</option>
                <option value="MX">Mexico (MX)</option>
                <option value="AR">Argentina (AR)</option>
                <option value="CO">Colombia (CO)</option>
              </select>
            </div>
            
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="text-slate-300">Default mode</p>
                <p className="text-sm text-slate-500">Initial interface</p>
              </div>
              <div className="flex gap-2 bg-slate-700 p-1 rounded-lg">
                <button
                  onClick={() => setSettings({ ...settings, defaultMode: 'zen' })}
                  className={`px-3 py-1 rounded text-sm transition-all ${
                    settings.defaultMode === 'zen' 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-slate-400'
                  }`}
                >
                  Zen
                </button>
                <button
                  onClick={() => setSettings({ ...settings, defaultMode: 'full' })}
                  className={`px-3 py-1 rounded text-sm transition-all ${
                    settings.defaultMode === 'full' 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-slate-400'
                  }`}
                >
                  Full
                </button>
              </div>
            </div>
            
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="text-slate-300">Theme</p>
                <p className="text-sm text-slate-500">Visual appearance</p>
              </div>
              <div className="flex gap-2 bg-slate-700 p-1 rounded-lg">
                <button
                  onClick={() => setSettings({ ...settings, theme: 'dark' })}
                  className={`px-3 py-1 rounded text-sm transition-all ${
                    settings.theme === 'dark' 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-slate-400'
                  }`}
                >
                  Dark
                </button>
                <button
                  onClick={() => setSettings({ ...settings, theme: 'light' })}
                  className={`px-3 py-1 rounded text-sm transition-all ${
                    settings.theme === 'light' 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-slate-400'
                  }`}
                >
                  Light
                </button>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Voice & Audio Section */}
        <div>
          <h3 className="text-slate-400 text-sm mb-4">VOICE & AUDIO</h3>
          <Card className="p-6 space-y-4">
            <div>
              <label className="text-slate-300 mb-2 block">TTS Voice</label>
              <select
                value={settings.ttsVoice}
                onChange={(e) => setSettings({ ...settings, ttsVoice: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="es-ES-Standard-A">Spanish (Female) - Standard</option>
                <option value="es-ES-Standard-B">Spanish (Male) - Standard</option>
                <option value="es-MX-Standard-A">Spanish MX (Female)</option>
              </select>
            </div>
            
            <div>
              <label className="text-slate-300 mb-2 block">
                TTS Speed: {settings.ttsSpeed}x
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={settings.ttsSpeed}
                onChange={(e) => setSettings({ ...settings, ttsSpeed: parseFloat(e.target.value) })}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
            
            <Button variant="ghost" className="w-full">
              <Volume2 className="w-4 h-4 mr-2" />
              Listen to test
            </Button>
          </Card>
        </div>
        
        {/* Privacy Section */}
        <div>
          <h3 className="text-slate-400 text-sm mb-4">PRIVACY</h3>
          <Card className="divide-y divide-slate-700/50">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-slate-300">Local encryption</p>
                  <p className="text-sm text-slate-500">AES-256 enabled</p>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-400" />
            </div>
            
            <button className="p-4 flex items-center justify-between w-full hover:bg-slate-700/30 transition-colors">
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5 text-slate-400" />
                <p className="text-slate-300">Export data</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-500" />
            </button>
            
            <button className="p-4 flex items-center justify-between w-full hover:bg-slate-700/30 transition-colors">
              <div className="flex items-center gap-3">
                <Upload className="w-5 h-5 text-slate-400" />
                <p className="text-slate-300">Import data</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-500" />
            </button>
            
            <div className="p-4">
              <label className="text-slate-300 mb-2 block">
                Auto-lock: {settings.autoLock} min
              </label>
              <input
                type="range"
                min="1"
                max="60"
                value={settings.autoLock}
                onChange={(e) => setSettings({ ...settings, autoLock: parseInt(e.target.value) })}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
          </Card>
        </div>
        
        {/* About Section */}
        <div>
          <h3 className="text-slate-400 text-sm mb-4">ABOUT</h3>
          <Card className="divide-y divide-slate-700/50">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-slate-400" />
                <p className="text-slate-300">Version</p>
              </div>
              <p className="text-slate-500">1.0.0-beta</p>
            </div>
            
            <button className="p-4 flex items-center justify-between w-full hover:bg-slate-700/30 transition-colors">
              <p className="text-slate-300">Privacy policy</p>
              <ChevronRight className="w-5 h-5 text-slate-500" />
            </button>
          </Card>
        </div>
        
        {/* Logout */}
        <Button
          variant="danger"
          className="w-full"
          onClick={onLogout}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Log out
        </Button>
      </main>
      
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}