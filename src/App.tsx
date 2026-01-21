import React, { useState } from 'react';
import { LoginScreen } from './components/screens/LoginScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { QuickWriteScreen } from './components/screens/QuickWriteScreen';
import { VoiceEntryScreen } from './components/screens/VoiceEntryScreen';
import { EntryDetailScreen } from './components/screens/EntryDetailScreen';
import { TimelineScreen } from './components/screens/TimelineScreen';
import { GraphScreen } from './components/screens/GraphScreen';
import { ImportsScreen } from './components/screens/ImportsScreen';
import { HabitsScreen } from './components/screens/HabitsScreen';
import { ZenModeScreen } from './components/screens/ZenModeScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { Toast } from './components/Toast';

type Screen = 
  | 'login' 
  | 'home' 
  | 'quick-write' 
  | 'voice-entry' 
  | 'entry-detail'
  | 'timeline'
  | 'graph'
  | 'imports'
  | 'habits'
  | 'zen'
  | 'settings';

type Tab = 'home' | 'timeline' | 'graph' | 'settings';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({
    show: false,
    message: '',
    type: 'success'
  });

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ show: true, message, type });
  };

  const handleUnlock = () => {
    setCurrentScreen('home');
    showToast('Bienvenido a NOSTRA', 'success');
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    
    // Navigate to corresponding screen
    switch (tab) {
      case 'home':
        setCurrentScreen('home');
        break;
      case 'timeline':
        setCurrentScreen('timeline');
        break;
      case 'graph':
        setCurrentScreen('graph');
        break;
      case 'settings':
        setCurrentScreen('settings');
        break;
    }
  };

  const handleSaveEntry = (text: string, analyze: boolean) => {
    setCurrentScreen('entry-detail');
    showToast('Entrada guardada correctamente', 'success');
  };

  const handleStopRecording = () => {
    setCurrentScreen('entry-detail');
    showToast('Audio procesado correctamente', 'success');
  };

  const handleLogout = () => {
    setCurrentScreen('login');
    setActiveTab('home');
    showToast('Sesión cerrada', 'info');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onUnlock={handleUnlock} />;
      
      case 'home':
        return (
          <HomeScreen
            userName="Usuario"
            onNavigate={handleNavigate}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        );
      
      case 'quick-write':
        return (
          <QuickWriteScreen
            onClose={() => setCurrentScreen('home')}
            onSave={handleSaveEntry}
            onVoiceClick={() => setCurrentScreen('voice-entry')}
          />
        );
      
      case 'voice-entry':
        return (
          <VoiceEntryScreen
            onClose={() => setCurrentScreen('quick-write')}
            onStop={handleStopRecording}
          />
        );
      
      case 'entry-detail':
        return (
          <EntryDetailScreen
            onClose={() => setCurrentScreen('home')}
          />
        );
      
      case 'timeline':
        return (
          <TimelineScreen
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        );
      
      case 'graph':
        return (
          <GraphScreen
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        );
      
      case 'imports':
        return (
          <ImportsScreen
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        );
      
      case 'habits':
        return (
          <HabitsScreen
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        );
      
      case 'zen':
        return (
          <ZenModeScreen
            onSave={handleSaveEntry}
          />
        );
      
      case 'settings':
        return (
          <SettingsScreen
            activeTab={activeTab}
            onTabChange={handleTabChange}
            onLogout={handleLogout}
          />
        );
      
      default:
        return <HomeScreen userName="Usuario" onNavigate={handleNavigate} activeTab={activeTab} onTabChange={handleTabChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {renderScreen()}
      
      {/* Toast Notifications */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    </div>
  );
}

export default App;
