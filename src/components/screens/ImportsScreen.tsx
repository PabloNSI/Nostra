import React, { useState } from 'react';
import { Upload, File, Image, Music, FileText, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Header } from '../Header';
import { BottomNav } from '../BottomNav';
import { Card } from '../Card';
import { Button } from '../Button';
import { Badge } from '../Badge';
import '../../styles/screens/imports.css';

interface ImportsScreenProps {
  activeTab: 'home' | 'timeline' | 'graph' | 'settings';
  onTabChange: (tab: 'home' | 'timeline' | 'graph' | 'settings') => void;
}

interface ImportFile {
  id: string;
  name: string;
  type: 'image' | 'audio' | 'document';
  status: 'pending' | 'processing' | 'success' | 'error';
  progress: number;
}

export function ImportsScreen({ activeTab, onTabChange }: ImportsScreenProps) {
  const [files, setFiles] = useState<ImportFile[]>([
    { id: '1', name: 'foto_playa_2024.jpg', type: 'image', status: 'success', progress: 100 },
    { id: '2', name: 'nota_voz_trabajo.mp3', type: 'audio', status: 'processing', progress: 65 },
    { id: '3', name: 'documento_importante.pdf', type: 'document', status: 'pending', progress: 0 }
  ]);

  const [autoAnalyze, setAutoAnalyze] = useState(true);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="w-5 h-5" />;
      case 'audio': return <Music className="w-5 h-5" />;
      case 'document': return <FileText className="w-5 h-5" />;
      default: return <File className="w-5 h-5" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-400" />;
      case 'processing': return <Clock className="w-5 h-5 text-blue-400 animate-spin" />;
      default: return <Clock className="w-5 h-5 text-slate-400" />;
    }
  };

  const totalProgress = files.length > 0
    ? Math.round(files.reduce((sum, f) => sum + f.progress, 0) / files.length)
    : 0;

  return (
    <div className="app-container">
      <Header title="Importar recuerdos" />

      <main className="app-content screen-imports">
        {/* Header area inside screen */}
        <section className="imports-header">
          <h1>Importar recuerdos</h1>
          <p className="subtitle">Carga fotos, audios y documentos. Todo se mantiene local.</p>
        </section>

        {/* Dropzone always visible */}
        <section className="imports-dropzone-container">
          <Card className="dropzone-card">
            <div className="dropzone" role="button" tabIndex={0}>
              <Upload className="dropzone-icon" />
              <h3>Arrastra archivos aquí</h3>
              <p className="text-sm">o</p>
              <Button variant="ghost" size="sm">Explorar archivos</Button>
              <p className="file-types">Soportados: JPG, PNG, MP3, WAV, PDF. Máx: 50MB</p>
            </div>
          </Card>
        </section>

        {/* Queue (scrollable internally) */}
        {files.length > 0 ? (
          <section className="imports-queue-container">
            <div className="queue-top">
              <h2>Cola de importación</h2>
              <span className="text-sm">{files.filter(f => f.status === 'success').length} / {files.length} completados</span>
            </div>

            <div className="queue-items" aria-live="polite">
              {files.map(file => (
                <div key={file.id} className="queue-item">
                  <div className="item-info">
                    <div className="item-icon">{getFileIcon(file.type)}</div>
                    <div className="item-details">
                      <p className="item-name">{file.name}</p>
                      <p className="item-size">{(file.name.length > 0) ? `${(Math.min(50, file.name.length))} chars` : ''}</p>
                      {file.status === 'processing' && (
                        <div className="mt-1 h-1 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${file.progress}%` }} />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="item-type">
                    <Badge>{file.type.toUpperCase()}</Badge>
                  </div>

                  <div className="item-status">
                    {getStatusIcon(file.status)}
                  </div>

                  <div className="item-actions">
                    {file.status === 'pending' && <button className="text-sm text-red-400 hover:text-red-300">Excluir</button>}
                  </div>
                </div>
              ))}
            </div>

            {/* Global progress */}
            <div className="import-progress" aria-hidden={files.length === 0}>
              <div className="progress-info">
                <span>{files.filter(f => f.status === 'success').length} de {files.length} completados</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${totalProgress}%` }} />
              </div>
            </div>
          </section>
        ) : (
          <Card className="p-12 text-center">
            <File className="w-16 h-16 mx-auto mb-4 text-slate-600" />
            <p className="text-slate-400">No hay archivos en la cola de importación</p>
          </Card>
        )}

        {/* Footer options inside main */}
        <footer className="imports-footer">
          <label className="checkbox-option">
            <input
              type="checkbox"
              checked={autoAnalyze}
              onChange={(e) => setAutoAnalyze(e.target.checked)}
            />
            <span>Analizar automáticamente al importar</span>
          </label>

          <div className="imports-actions">
            <Button className="w-full" variant="secondary" disabled={files.length === 0}>Cancelar</Button>
            <Button className="w-full" variant="primary" disabled={files.length === 0}>Comenzar importación</Button>
          </div>
        </footer>
      </main>

      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}