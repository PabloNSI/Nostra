import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Maximize2, Download, Filter } from 'lucide-react';
import { Header } from '../Header';
import { BottomNav } from '../BottomNav';
import { Card } from '../Card';
import { Badge } from '../Badge';
import { Button } from '../Button';

interface GraphScreenProps {
  activeTab: 'home' | 'timeline' | 'graph' | 'settings';
  onTabChange: (tab: 'home' | 'timeline' | 'graph' | 'settings') => void;
}

export function GraphScreen({ activeTab, onTabChange }: GraphScreenProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  
  // Mock graph nodes
  const nodes = [
    { id: 'trabajo', label: 'Trabajo', type: 'concept', size: 80, x: 200, y: 150, color: 'bg-indigo-500', frequency: 45 },
    { id: 'familia', label: 'Familia', type: 'person', size: 70, x: 400, y: 120, color: 'bg-pink-500', frequency: 38 },
    { id: 'alegria', label: 'Alegría', type: 'emotion', size: 90, x: 300, y: 300, color: 'bg-amber-400', frequency: 52 },
    { id: 'proyecto', label: 'Proyecto', type: 'concept', size: 60, x: 150, y: 280, color: 'bg-purple-500', frequency: 28 },
    { id: 'ejercicio', label: 'Ejercicio', type: 'activity', size: 55, x: 450, y: 250, color: 'bg-green-500', frequency: 22 },
    { id: 'amigos', label: 'Amigos', type: 'person', size: 65, x: 350, y: 180, color: 'bg-pink-500', frequency: 31 }
  ];
  
  const edges = [
    { from: 'trabajo', to: 'proyecto' },
    { from: 'trabajo', to: 'alegria' },
    { from: 'familia', to: 'alegria' },
    { from: 'amigos', to: 'alegria' },
    { from: 'ejercicio', to: 'alegria' }
  ];
  
  return (
    <div className="min-h-screen bg-slate-900 pb-20">
      <Header title="Grafo Cognitivo" />
      
      <main className="px-6 py-6 space-y-6">
        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors" aria-label="Acercar">
              <ZoomIn className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors" aria-label="Alejar">
              <ZoomOut className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors" aria-label="Ajustar a pantalla">
              <Maximize2 className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors" aria-label="Exportar">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Graph Visualization */}
        <Card className="p-6 min-h-[500px] relative overflow-hidden">
          <svg className="w-full h-[500px]" viewBox="0 0 600 400">
            {/* Draw edges first */}
            <g className="edges">
              {edges.map((edge, i) => {
                const fromNode = nodes.find(n => n.id === edge.from);
                const toNode = nodes.find(n => n.id === edge.to);
                if (!fromNode || !toNode) return null;
                
                return (
                  <line
                    key={i}
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke="#475569"
                    strokeWidth="2"
                    opacity="0.4"
                  />
                );
              })}
            </g>
            
            {/* Draw nodes */}
            <g className="nodes">
              {nodes.map(node => (
                <g 
                  key={node.id} 
                  onClick={() => setSelectedNode(node.id)}
                  className="cursor-pointer"
                >
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.size / 2}
                    className={`${node.color} ${selectedNode === node.id ? 'opacity-100' : 'opacity-70'} hover:opacity-100 transition-opacity`}
                    stroke={selectedNode === node.id ? '#6366F1' : 'transparent'}
                    strokeWidth="3"
                  />
                  <text
                    x={node.x}
                    y={node.y + node.size / 2 + 20}
                    textAnchor="middle"
                    className="text-xs fill-slate-300 select-none"
                  >
                    {node.label}
                  </text>
                </g>
              ))}
            </g>
          </svg>
          
          {/* Hint */}
          {!selectedNode && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p className="text-slate-500 text-sm">Haz clic en un nodo para ver detalles</p>
            </div>
          )}
        </Card>
        
        {/* Node Detail Panel */}
        {selectedNode && (
          <Card className="p-6">
            {(() => {
              const node = nodes.find(n => n.id === selectedNode);
              if (!node) return null;
              
              return (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full ${node.color}`} />
                      <div>
                        <h3 className="text-slate-200">{node.label}</h3>
                        <p className="text-sm text-slate-400 capitalize">{node.type}</p>
                      </div>
                    </div>
                    <Badge>Frecuencia: {node.frequency}</Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-slate-400 mb-2">Conexiones</p>
                      <div className="flex flex-wrap gap-2">
                        {edges
                          .filter(e => e.from === selectedNode || e.to === selectedNode)
                          .map((edge, i) => {
                            const connectedId = edge.from === selectedNode ? edge.to : edge.from;
                            const connectedNode = nodes.find(n => n.id === connectedId);
                            return connectedNode ? (
                              <Badge key={i}>{connectedNode.label}</Badge>
                            ) : null;
                          })}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-slate-400 mb-2">Entradas relacionadas</p>
                      <p className="text-sm text-slate-300">
                        Este concepto aparece en {node.frequency} entradas desde el último mes.
                      </p>
                    </div>
                  </div>
                </>
              );
            })()}
          </Card>
        )}
        
        {/* Legend */}
        <Card className="p-6">
          <h3 className="text-slate-300 mb-4">Tipos de nodos</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-indigo-500" />
              <span className="text-sm text-slate-400">Concepto</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-amber-400" />
              <span className="text-sm text-slate-400">Emoción</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-pink-500" />
              <span className="text-sm text-slate-400">Persona</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500" />
              <span className="text-sm text-slate-400">Actividad</span>
            </div>
          </div>
          <p className="text-sm text-slate-400 mt-4">
            El tamaño de los nodos representa la frecuencia de aparición
          </p>
        </Card>
      </main>
      
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
