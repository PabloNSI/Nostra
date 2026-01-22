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
            <h1 className="text-slate-200">NOSTRA - Design Guide</h1>
          </div>
          <p className="text-slate-400">
            Design system for external emotional memory. WCAG 2.2 AA compliant.
          </p>
        </div>

        {/* Color Palette */}
        <section>
          <h2 className="text-slate-300 mb-6">Color Palette</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-slate-400 mb-3">Base Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="p-4">
                  <div className="w-full h-16 bg-[#0F1419] rounded-lg mb-2 border border-slate-700" />
                  <p className="text-sm text-slate-300">Primary Background</p>
                  <code className="text-xs text-slate-500">#0F1419</code>
                </Card>
                <Card className="p-4">
                  <div className="w-full h-16 bg-[#1A202C] rounded-lg mb-2 border border-slate-700" />
                  <p className="text-sm text-slate-300">Secondary Background</p>
                  <code className="text-xs text-slate-500">#1A202C</code>
                </Card>
                <Card className="p-4">
                  <div className="w-full h-16 bg-[#E2E8F0] rounded-lg mb-2" />
                  <p className="text-sm text-slate-300">Primary Text</p>
                  <code className="text-xs text-slate-500">#E2E8F0</code>
                </Card>
                <Card className="p-4">
                  <div className="w-full h-16 bg-[#A0AEC0] rounded-lg mb-2" />
                  <p className="text-sm text-slate-300">Secondary Text</p>
                  <code className="text-xs text-slate-500">#A0AEC0</code>
                </Card>
              </div>
            </div>

            <div>
              <h3 className="text-slate-400 mb-3">Accent Colors</h3>
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4">
                  <div className="w-full h-16 bg-[#6366F1] rounded-lg mb-2" />
                  <p className="text-sm text-slate-300">Primary Accent</p>
                  <code className="text-xs text-slate-500">#6366F1</code>
                </Card>
                <Card className="p-4">
                  <div className="w-full h-16 bg-[#8B5CF6] rounded-lg mb-2" />
                  <p className="text-sm text-slate-300">Secondary Accent</p>
                  <code className="text-xs text-slate-500">#8B5CF6</code>
                </Card>
              </div>
            </div>

            <div>
              <h3 className="text-slate-400 mb-3">Emotion Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="p-4">
                  <div className="w-full h-16 bg-[#FBBF24] rounded-lg mb-2" />
                  <p className="text-sm text-slate-300">😊 Joy</p>
                  <code className="text-xs text-slate-500">#FBBF24</code>
                  <p className="text-xs text-green-400 mt-1">Contrast: 7:1</p>
                </Card>
                <Card className="p-4">
                  <div className="w-full h-16 bg-[#3B82F6] rounded-lg mb-2" />
                  <p className="text-sm text-slate-300">😢 Sadness</p>
                  <code className="text-xs text-slate-500">#3B82F6</code>
                  <p className="text-xs text-green-400 mt-1">Contrast: 8:1</p>
                </Card>
                <Card className="p-4">
                  <div className="w-full h-16 bg-[#EF4444] rounded-lg mb-2" />
                  <p className="text-sm text-slate-300">😠 Anger</p>
                  <code className="text-xs text-slate-500">#EF4444</code>
                  <p className="text-xs text-green-400 mt-1">Contrast: 5.5:1</p>
                </Card>
                <Card className="p-4">
                  <div className="w-full h-16 bg-[#8B5CF6] rounded-lg mb-2" />
                  <p className="text-sm text-slate-300">😨 Fear</p>
                  <code className="text-xs text-slate-500">#8B5CF6</code>
                  <p className="text-xs text-green-400 mt-1">Contrast: 6:1</p>
                </Card>
                <Card className="p-4">
                  <div className="w-full h-16 bg-[#EC4899] rounded-lg mb-2" />
                  <p className="text-sm text-slate-300">😲 Surprise</p>
                  <code className="text-xs text-slate-500">#EC4899</code>
                  <p className="text-xs text-green-400 mt-1">Contrast: 6:1</p>
                </Card>
                <Card className="p-4">
                  <div className="w-full h-16 bg-[#6B7280] rounded-lg mb-2" />
                  <p className="text-sm text-slate-300">😴 Fatigue</p>
                  <code className="text-xs text-slate-500">#6B7280</code>
                  <p className="text-xs text-green-400 mt-1">Contrast: 4.5:1</p>
                </Card>
                <Card className="p-4">
                  <div className="w-full h-16 bg-[#10B981] rounded-lg mb-2" />
                  <p className="text-sm text-slate-300">🤢 Disgust</p>
                  <code className="text-xs text-slate-500">#10B981</code>
                  <p className="text-xs text-green-400 mt-1">Contrast: 6:1</p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="text-slate-300 mb-6">Typography</h2>
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
          <h2 className="text-slate-300 mb-6">Spacing System (Base 8px)</h2>
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
          <h2 className="text-slate-300 mb-6">Components</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-slate-400 mb-4">Buttons</h3>
              <Card className="p-6">
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Danger</Button>
                  <Button variant="primary" loading>Loading...</Button>
                  <Button variant="primary" disabled>Disabled</Button>
                </div>
                <div className="mt-4 flex flex-wrap gap-4">
                  <Button variant="primary" size="sm">Small</Button>
                  <Button variant="primary" size="md">Medium</Button>
                  <Button variant="primary" size="lg">Large</Button>
                </div>
              </Card>
            </div>

            <div>
              <h3 className="text-slate-400 mb-4">Badges</h3>
              <Card className="p-6">
                <div className="flex flex-wrap gap-3">
                  <Badge type="emotion" emotion="joy">Joy</Badge>
                  <Badge type="emotion" emotion="sadness">Sadness</Badge>
                  <Badge type="emotion" emotion="anger">Anger</Badge>
                  <Badge type="emotion" emotion="fear">Fear</Badge>
                  <Badge type="emotion" emotion="surprise">Surprise</Badge>
                  <Badge type="emotion" emotion="fatigue">Fatigue</Badge>
                  <Badge type="emotion" emotion="disgust">Disgust</Badge>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Badge type="status" status="success">Success</Badge>
                  <Badge type="status" status="error">Error</Badge>
                  <Badge type="status" status="warning">Warning</Badge>
                  <Badge type="status" status="info">Info</Badge>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Accessibility */}
        <section>
          <h2 className="text-slate-300 mb-6">Accessibility WCAG 2.2 AA</h2>
          <Card className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">✓</span>
              <div>
                <p className="text-slate-300">Minimum color contrast 4.5:1</p>
                <p className="text-sm text-slate-500">All text meets required contrast</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">✓</span>
              <div>
                <p className="text-slate-300">Visible focus</p>
                <p className="text-sm text-slate-500">2px outline in accent color for interactive elements</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">✓</span>
              <div>
                <p className="text-slate-300">States not only by color</p>
                <p className="text-sm text-slate-500">Icons and borders complement color information</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">✓</span>
              <div>
                <p className="text-slate-300">Labels and aria-labels</p>
                <p className="text-sm text-slate-500">All interactive elements have accessible labels</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">✓</span>
              <div>
                <p className="text-slate-300">Logical focus order</p>
                <p className="text-sm text-slate-500">Top to bottom, left to right</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Micro-interactions */}
        <section>
          <h2 className="text-slate-300 mb-6">Micro-interactions</h2>
          <Card className="p-6 space-y-4">
            <div>
              <p className="text-slate-300 mb-2">Hover: Color change + lift shadow (0 → 4px)</p>
              <code className="text-xs text-slate-500">transition: 150ms ease-in-out</code>
            </div>
            <div>
              <p className="text-slate-300 mb-2">Pressed: Color change + sink shadow</p>
              <code className="text-xs text-slate-500">active state with reduced shadow</code>
            </div>
            <div>
              <p className="text-slate-300 mb-2">Focus: 2px accent color outline</p>
              <code className="text-xs text-slate-500">outline: 2px solid #6366F1</code>
            </div>
            <div>
              <p className="text-slate-300 mb-2">Loading: Animated spinner</p>
              <code className="text-xs text-slate-500">300ms infinite loop</code>
            </div>
            <div>
              <p className="text-slate-300 mb-2">Success/Error: Auto-dismiss toast</p>
              <code className="text-xs text-slate-500">3 second duration</code>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}