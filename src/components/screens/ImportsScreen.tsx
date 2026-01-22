import React, { useState } from 'react';
import { Upload, File, Image, Music, FileText, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Header } from '../Header';
import { BottomNav } from '../BottomNav';
import { Card } from '../Card';
import { Button } from '../Button';
import { Badge } from '../Badge';

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
    { id: '1', name: 'beach_photo_2024.jpg', type: 'image', status: 'success', progress: 100 },
    { id: '2', name: 'work_voice_note.mp3', type: 'audio', status: 'processing', progress: 65 },
    { id: '3', name: 'important_document.pdf', type: 'document', status: 'pending', progress: 0 }
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
    <div className="min-h-screen bg-slate-900 pb-20">
      <Header title="Import memories" />
      
      <main style={{ 
  marginLeft: '16px', 
  marginRight: '16px',
  paddingTop: '24px',
  paddingBottom: '24px'
}}>
        {/* Upload Zone */}
        <Card className="p-8">
          <div className="border-2 border-dashed border-slate-600 rounded-xl p-12 text-center hover:border-indigo-500 transition-colors cursor-pointer">
            <Upload className="w-12 h-12 mx-auto mb-4 text-slate-400" />
            <h3 className="text-slate-300 mb-2">Drag files here</h3>
            <p className="text-sm text-slate-400 mb-4">
              or click to select
            </p>
            <Button variant="ghost" size="sm">
              Browse files
            </Button>
          </div>
          
          <div className="mt-4 space-y-2">
            <p className="text-sm text-slate-400">Supported formats:</p>
            <div className="flex flex-wrap gap-2">
              <Badge>JPG</Badge>
              <Badge>PNG</Badge>
              <Badge>MP3</Badge>
              <Badge>WAV</Badge>
              <Badge>PDF</Badge>
              <Badge>TXT</Badge>
            </div>
            <p className="text-xs text-slate-500">Maximum size: 50MB per file</p>
          </div>
        </Card>
        
        {/* Import Queue */}
        {files.length > 0 && (
          <>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-300">Import queue</h3>
                <span className="text-sm text-slate-400">
                  {files.filter(f => f.status === 'success').length} / {files.length} completed
                </span>
              </div>
              
              {/* Global Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
                  <span>Total progress</span>
                  <span>{totalProgress}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                    style={{ width: `${totalProgress}%` }}
                  />
                </div>
              </div>
              
              {/* File List */}
              <div className="space-y-3">
                {files.map(file => (
                  <div 
                    key={file.id}
                    className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg"
                  >
                    <div className="text-slate-400">
                      {getFileIcon(file.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-300 truncate">{file.name}</p>
                      {file.status === 'processing' && (
                        <div className="mt-1 h-1 bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full transition-all duration-300"
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      {getStatusIcon(file.status)}
                    </div>
                    {file.status === 'pending' && (
                      <button className="text-sm text-red-400 hover:text-red-300">
                        Exclude
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </Card>
            
            {/* Options */}
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-slate-300 mb-1">Automatic analysis</h3>
                  <p className="text-sm text-slate-400">
                    Detect emotions and extract concepts from imported files
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={autoAnalyze}
                  onChange={(e) => setAutoAnalyze(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-indigo-600 focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </Card>
            
            {/* Action Button */}
            <Button className="w-full" size="lg">
              Start import
            </Button>
          </>
        )}
        
        {/* Empty State */}
        {files.length === 0 && (
          <Card className="p-12 text-center">
            <File className="w-16 h-16 mx-auto mb-4 text-slate-600" />
            <p className="text-slate-400">
              No files in the import queue
            </p>
          </Card>
        )}
      </main>
      
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}