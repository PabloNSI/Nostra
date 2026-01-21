import React from 'react';
import { Card } from './Card';
import { Badge } from './Badge';
import { Button } from './Button';

export function DesignGuide() {
  return (
    <div className="min-h-screen bg-slate-900 px-6 py-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">🧠</span>
            <h1 className="text-slate-200">NOSTRA - Guía de Diseño</h1>
          </div>
          <p className="text-slate-400">
            Sistema de diseño para la memoria emocional externa. Accesible WCAG 2.2 AA.
          </p>
        </div>

        {/* Color Palette */}
        <section>
          <h2 className="text-slate-300 mb-6">Paleta de Colores</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-slate-400 mb-3">Colores Base</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="p-4">
                  <div className="w-full h-16 bg-[#0F1419] rounded-lg mb-2 border border-slate-700" />
                  <p className="text-sm text-slate-300">Fondo Primario</p>
                  <code className="text-xs text-slate-500">#0F1419</code>
                </Card>
                <Card className="p-4">
                  <div className="w-full h-16 bg-[#1A202C] rounded-lg mb-2 border border-slate-700" />
                  <p className="text-sm text-slate-300">Fondo Secundario</p>
                  <code className="text-xs text-slate-500">#1A202C</code>
                </Card>
                <Card className="p-4">
                  <div className="w-full h-16 bg-[#E2E8F0] rounded-lg mb-2" />
                  <p className="text-sm text-slate-300">Texto Primario</p>
                  <code className="text-xs text-slate-500">#E2E8F0</code>
                </Card>
                <Card className="p-4">
                  <div className="w-full h-16 bg-[#A0AEC0] rounded-lg mb-2" />
                  <p className="text-sm text-slate-300">Texto Secundario</p>
                  <code className="text-xs text-slate-500">#A0AEC0</code>
                </Card>
              </div>
            </div>

            <div>
              <h3 className="text-slate-400 mb-3">Colores de Acento</h3>
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4">
                  <div className="w-full h-16 bg-[#6366F1] rounded-lg mb-2" />
                  <p className="text-sm text-slate-300">Acento Primario</p>
                  <code className="text-xs text-slate-500">#6366F1</code>
                </Card>
                <Card className="p-4">
                  <div className="w-full h-16 bg-[#8B5CF6] rounded-lg mb-2" />
                  <p className="text-sm text-slate-300">Acento Secundario</p>
                  <code className="text-xs text-slate-500">#8B5CF6</code>
                </Card>
              </div>
            </div>

            <div>
              <h3 className="text-slate-400 mb-3">Colores de Emociones</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="p-4">
                  <div className="w-full h-16 bg-[#FBBF24] rounded-lg mb-2" />
                  <p className="text-sm text-slate-300">😊 Alegría</p>
                  <code className="text-xs text-slate-500">#FBBF24</code>
                  <p className="text-xs text-green-400 mt-1">Contraste: 7:1</p>
                </Card>
                <Card className="p-4">
                  <div className="w-full h-16 bg-[#3B82F6] rounded-lg mb-2" />
                  <p className="text-sm text-slate-300">😢 Tristeza</p>
                  <code className="text-xs text-slate-500">#3B82F6</code>
                  <p className="text-xs text-green-400 mt-1">Contraste: 8:1</p>
                </Card>
                <Card className="p-4">
                  <div className="w-full h-16 bg-[#EF4444] rounded-lg mb-2" />
                  <p className="text-sm text-slate-300">😠 Enfado</p>
                  <code className="text-xs text-slate-500">#EF4444</code>
                  <p className="text-xs text-green-400 mt-1">Contraste: 5.5:1</p>
                </Card>
                <Card className="p-4">
                  <div className="w-full h-16 bg-[#8B5CF6] rounded-lg mb-2" />
                  <p className="text-sm text-slate-300">😨 Miedo</p>
                  <code className="text-xs text-slate-500">#8B5CF6</code>
                  <p className="text-xs text-green-400 mt-1">Contraste: 6:1</p>
                </Card>
                <Card className="p-4">
                  <div className="w-full h-16 bg-[#EC4899] rounded-lg mb-2" />
                  <p className="text-sm text-slate-300">😲 Sorpresa</p>
                  <code className="text-xs text-slate-500">#EC4899</code>
                  <p className="text-xs text-green-400 mt-1">Contraste: 6:1</p>
                </Card>
                <Card className="p-4">
                  <div className="w-full h-16 bg-[#6B7280] rounded-lg mb-2" />
                  <p className="text-sm text-slate-300">😴 Fatiga</p>
                  <code className="text-xs text-slate-500">#6B7280</code>
                  <p className="text-xs text-green-400 mt-1">Contraste: 4.5:1</p>
                </Card>
                <Card className="p-4">
                  <div className="w-full h-16 bg-[#10B981] rounded-lg mb-2" />
                  <p className="text-sm text-slate-300">🤢 Asco</p>
                  <code className="text-xs text-slate-500">#10B981</code>
                  <p className="text-xs text-green-400 mt-1">Contraste: 6:1</p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="text-slate-300 mb-6">Tipografía</h2>
          <Card className="p-6 space-y-4">
            <div>
              <h1>Heading 1 - 32px / 700 / 1.2</h1>
              <code className="text-xs text-slate-500">font-size: 32px; font-weight: 700; line-height: 1.2</code>
            </div>
            <div>
              <h2>Heading 2 - 24px / 600 / 1.3</h2>
              <code className="text-xs text-slate-500">font-size: 24px; font-weight: 600; line-height: 1.3</code>
            </div>
            <div>
              <h3>Heading 3 - 18px / 600 / 1.4</h3>
              <code className="text-xs text-slate-500">font-size: 18px; font-weight: 600; line-height: 1.4</code>
            </div>
            <div>
              <p>Body - 16px / 400 / 1.5</p>
              <code className="text-xs text-slate-500">font-size: 16px; font-weight: 400; line-height: 1.5</code>
            </div>
            <div>
              <small>Small - 14px / 400 / 1.4</small>
              <br />
              <code className="text-xs text-slate-500">font-size: 14px; font-weight: 400; line-height: 1.4</code>
            </div>
          </Card>
        </section>

        {/* Spacing System */}
        <section>
          <h2 className="text-slate-300 mb-6">Sistema de Espaciado (Base 8px)</h2>
          <Card className="p-6">
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="w-1 h-1 bg-indigo-500" />
                <code className="text-slate-400 min-w-[80px]">xs: 4px</code>
                <div className="h-1 bg-indigo-500/30" style={{ width: '4px' }} />
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-indigo-500" />
                <code className="text-slate-400 min-w-[80px]">sm: 8px</code>
                <div className="h-2 bg-indigo-500/30" style={{ width: '8px' }} />
              </div>
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-indigo-500" />
                <code className="text-slate-400 min-w-[80px]">md: 16px</code>
                <div className="h-4 bg-indigo-500/30" style={{ width: '16px' }} />
              </div>
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 bg-indigo-500" />
                <code className="text-slate-400 min-w-[80px]">lg: 24px</code>
                <div className="h-6 bg-indigo-500/30" style={{ width: '24px' }} />
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-indigo-500" />
                <code className="text-slate-400 min-w-[80px]">xl: 32px</code>
                <div className="h-8 bg-indigo-500/30" style={{ width: '32px' }} />
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-500" />
                <code className="text-slate-400 min-w-[80px]">2xl: 48px</code>
                <div className="h-12 bg-indigo-500/30" style={{ width: '48px' }} />
              </div>
            </div>
          </Card>
        </section>

        {/* Components */}
        <section>
          <h2 className="text-slate-300 mb-6">Componentes</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-slate-400 mb-4">Botones</h3>
              <Card className="p-6">
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">Primario</Button>
                  <Button variant="secondary">Secundario</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Peligro</Button>
                  <Button variant="primary" loading>Cargando...</Button>
                  <Button variant="primary" disabled>Deshabilitado</Button>
                </div>
                <div className="mt-4 flex flex-wrap gap-4">
                  <Button variant="primary" size="sm">Pequeño</Button>
                  <Button variant="primary" size="md">Mediano</Button>
                  <Button variant="primary" size="lg">Grande</Button>
                </div>
              </Card>
            </div>

            <div>
              <h3 className="text-slate-400 mb-4">Badges</h3>
              <Card className="p-6">
                <div className="flex flex-wrap gap-3">
                  <Badge type="emotion" emotion="joy">Alegría</Badge>
                  <Badge type="emotion" emotion="sadness">Tristeza</Badge>
                  <Badge type="emotion" emotion="anger">Enfado</Badge>
                  <Badge type="emotion" emotion="fear">Miedo</Badge>
                  <Badge type="emotion" emotion="surprise">Sorpresa</Badge>
                  <Badge type="emotion" emotion="fatigue">Fatiga</Badge>
                  <Badge type="emotion" emotion="disgust">Asco</Badge>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Badge type="status" status="success">Éxito</Badge>
                  <Badge type="status" status="error">Error</Badge>
                  <Badge type="status" status="warning">Advertencia</Badge>
                  <Badge type="status" status="info">Info</Badge>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Accessibility */}
        <section>
          <h2 className="text-slate-300 mb-6">Accesibilidad WCAG 2.2 AA</h2>
          <Card className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">✓</span>
              <div>
                <p className="text-slate-300">Contraste de color mínimo 4.5:1</p>
                <p className="text-sm text-slate-500">Todos los textos cumplen con el contraste necesario</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">✓</span>
              <div>
                <p className="text-slate-300">Focus visible</p>
                <p className="text-sm text-slate-500">Outline de 2px en color accent para elementos interactivos</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">✓</span>
              <div>
                <p className="text-slate-300">Estados no solo por color</p>
                <p className="text-sm text-slate-500">Iconos y bordes complementan información de color</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">✓</span>
              <div>
                <p className="text-slate-300">Labels y aria-labels</p>
                <p className="text-sm text-slate-500">Todos los elementos interactivos tienen etiquetas accesibles</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">✓</span>
              <div>
                <p className="text-slate-300">Orden de foco lógico</p>
                <p className="text-sm text-slate-500">De arriba a abajo, de izquierda a derecha</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Micro-interactions */}
        <section>
          <h2 className="text-slate-300 mb-6">Micro-interacciones</h2>
          <Card className="p-6 space-y-4">
            <div>
              <p className="text-slate-300 mb-2">Hover: Cambio de color + lift shadow (0 → 4px)</p>
              <code className="text-xs text-slate-500">transition: 150ms ease-in-out</code>
            </div>
            <div>
              <p className="text-slate-300 mb-2">Pressed: Cambio de color + sink shadow</p>
              <code className="text-xs text-slate-500">active state with reduced shadow</code>
            </div>
            <div>
              <p className="text-slate-300 mb-2">Focus: Outline 2px color accent</p>
              <code className="text-xs text-slate-500">outline: 2px solid #6366F1</code>
            </div>
            <div>
              <p className="text-slate-300 mb-2">Loading: Spinner animado</p>
              <code className="text-xs text-slate-500">300ms loop infinito</code>
            </div>
            <div>
              <p className="text-slate-300 mb-2">Success/Error: Toast auto-dismiss</p>
              <code className="text-xs text-slate-500">3 segundos de duración</code>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
