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
    name: 'Usuario',
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
      <Header title="Configuración" />
      
      <main className="px-6 py-6 space-y-6">
        {/* Account Section */}
        <div>
          <h3 className="text-slate-400 text-sm mb-4">CUENTA</h3>
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <Input
                  value={settings.name}
                  onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                  placeholder="Tu nombre"
                />
              </div>
            </div>
          </Card>
        </div>
        
        {/* Preferences Section */}
        <div>
          <h3 className="text-slate-400 text-sm mb-4">PREFERENCIAS</h3>
          <Card className="divide-y divide-slate-700/50">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-slate-300">Idioma</p>
                  <p className="text-sm text-slate-500">Español</p>
                </div>
              </div>
              <select
                value={settings.language}
                onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                className="px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
            </div>
            
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-slate-300">Variante regional</p>
                  <p className="text-sm text-slate-500">España</p>
                </div>
              </div>
              <select
                value={settings.variant}
                onChange={(e) => setSettings({ ...settings, variant: e.target.value })}
                className="px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="ES">España (ES)</option>
                <option value="MX">México (MX)</option>
                <option value="AR">Argentina (AR)</option>
                <option value="CO">Colombia (CO)</option>
              </select>
            </div>
            
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="text-slate-300">Modo por defecto</p>
                <p className="text-sm text-slate-500">Interfaz inicial</p>
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
                <p className="text-slate-300">Tema</p>
                <p className="text-sm text-slate-500">Apariencia visual</p>
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
                  Oscuro
                </button>
                <button
                  onClick={() => setSettings({ ...settings, theme: 'light' })}
                  className={`px-3 py-1 rounded text-sm transition-all ${
                    settings.theme === 'light' 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-slate-400'
                  }`}
                >
                  Claro
                </button>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Voice & Audio Section */}
        <div>
          <h3 className="text-slate-400 text-sm mb-4">VOZ Y AUDIO</h3>
          <Card className="p-6 space-y-4">
            <div>
              <label className="text-slate-300 mb-2 block">Voz TTS</label>
              <select
                value={settings.ttsVoice}
                onChange={(e) => setSettings({ ...settings, ttsVoice: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="es-ES-Standard-A">Español (Mujer) - Estándar</option>
                <option value="es-ES-Standard-B">Español (Hombre) - Estándar</option>
                <option value="es-MX-Standard-A">Español MX (Mujer)</option>
              </select>
            </div>
            
            <div>
              <label className="text-slate-300 mb-2 block">
                Velocidad TTS: {settings.ttsSpeed}x
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
              Escuchar prueba
            </Button>
          </Card>
        </div>
        
        {/* Privacy Section */}
        <div>
          <h3 className="text-slate-400 text-sm mb-4">PRIVACIDAD</h3>
          <Card className="divide-y divide-slate-700/50">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-slate-300">Cifrado local</p>
                  <p className="text-sm text-slate-500">AES-256 activado</p>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-400" />
            </div>
            
            <button className="p-4 flex items-center justify-between w-full hover:bg-slate-700/30 transition-colors">
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5 text-slate-400" />
                <p className="text-slate-300">Exportar datos</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-500" />
            </button>
            
            <button className="p-4 flex items-center justify-between w-full hover:bg-slate-700/30 transition-colors">
              <div className="flex items-center gap-3">
                <Upload className="w-5 h-5 text-slate-400" />
                <p className="text-slate-300">Importar datos</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-500" />
            </button>
            
            <div className="p-4">
              <label className="text-slate-300 mb-2 block">
                Bloqueo automático: {settings.autoLock} min
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
          <h3 className="text-slate-400 text-sm mb-4">SOBRE</h3>
          <Card className="divide-y divide-slate-700/50">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-slate-400" />
                <p className="text-slate-300">Versión</p>
              </div>
              <p className="text-slate-500">1.0.0-beta</p>
            </div>
            
            <button className="p-4 flex items-center justify-between w-full hover:bg-slate-700/30 transition-colors">
              <p className="text-slate-300">Política de privacidad</p>
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
          Cerrar sesión
        </Button>
      </main>
      
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
