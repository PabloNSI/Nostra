# 📱 NOSTRA - Documentación de Pantallas

## 📋 Índice

1. [Componentes Base](#componentes-base)
2. [Pantallas Implementadas](#pantallas-implementadas)
3. [Sistema de Navegación](#sistema-de-navegación)
4. [Estilos y Variables CSS](#estilos-y-variables-css)
5. [Accesibilidad](#accesibilidad)

---

## 🧩 Componentes Base

Todos los componentes base están en `/components/` y son completamente reutilizables:

### Button (`/components/Button.tsx`)
```tsx
<Button variant="primary" size="lg" loading={false}>
  Click me
</Button>
```

**Props:**
- `variant`: `'primary' | 'secondary' | 'ghost' | 'danger'`
- `size`: `'sm' | 'md' | 'lg'`
- `loading`: `boolean`
- `disabled`: `boolean`

### Input (`/components/Input.tsx`)
```tsx
<Input
  label="Email"
  type="email"
  placeholder="tu@email.com"
  errorText="Campo requerido"
/>
```

**Props:**
- `label`: `string`
- `type`: `string`
- `placeholder`: `string`
- `errorText`: `string`
- `helperText`: `string`
- `icon`: `React.ReactNode`

### Card (`/components/Card.tsx`)
```tsx
<Card variant="elevated" onClick={() => console.log('clicked')}>
  Contenido
</Card>
```

**Props:**
- `variant`: `'default' | 'elevated' | 'outlined'`
- `onClick`: `() => void`
- `className`: `string`

### Badge (`/components/Badge.tsx`)
```tsx
<Badge type="emotion" emotion="joy">
  Alegría 85%
</Badge>
```

**Props:**
- `type`: `'emotion' | 'status' | 'tag'`
- `emotion`: `'joy' | 'sadness' | 'anger' | 'fear' | 'surprise' | 'fatigue' | 'disgust'`
- `status`: `'success' | 'error' | 'warning' | 'info'`

### Header (`/components/Header.tsx`)
```tsx
<Header title="Mi Pantalla" userName="Usuario" />
```

### BottomNav (`/components/BottomNav.tsx`)
```tsx
<BottomNav activeTab="home" onTabChange={(tab) => console.log(tab)} />
```

---

## 📱 Pantallas Implementadas

### 1. LoginScreen
**Ubicación:** `/components/screens/LoginScreen.tsx`

**Características:**
- ✅ Campo de usuario (email)
- ✅ Campo de contraseña con toggle de visibilidad
- ✅ Validación de formulario
- ✅ Opción de biometría
- ✅ Cifrado local AES-256
- ✅ WCAG 2.2 AA compliant

**Navegación:**
```tsx
<LoginScreen onUnlock={() => setScreen('home')} />
```

---

### 2. HomeScreen
**Ubicación:** `/components/screens/HomeScreen.tsx`

**Características:**
- ✅ Emoción dominante del día
- ✅ Accesos rápidos (Nueva entrada, Grafo, Timeline, Importar)
- ✅ Recomendaciones personalizadas con feedback
- ✅ Entradas recientes
- ✅ Insight de correlación hábitos-emociones

**Navegación:**
```tsx
<HomeScreen
  userName="Usuario"
  onNavigate={(screen) => console.log(screen)}
  activeTab="home"
  onTabChange={(tab) => console.log(tab)}
/>
```

---

### 3. QuickWriteScreen
**Ubicación:** `/components/screens/QuickWriteScreen.tsx`

**Características:**
- ✅ Textarea para entrada de texto
- ✅ Límite de caracteres (2000)
- ✅ Opción de análisis emocional
- ✅ Botón de grabación de voz
- ✅ Contador de caracteres

**Navegación:**
```tsx
<QuickWriteScreen
  onClose={() => setScreen('home')}
  onSave={(text, analyze) => console.log(text, analyze)}
  onVoiceClick={() => setScreen('voice-entry')}
/>
```

---

### 4. VoiceEntryScreen
**Ubicación:** `/components/screens/VoiceEntryScreen.tsx`

**Características:**
- ✅ Grabación de audio en tiempo real
- ✅ Visualización de forma de onda
- ✅ Timer de grabación
- ✅ Indicador de nivel de audio
- ✅ Botón de detener grabación

**Navegación:**
```tsx
<VoiceEntryScreen
  onClose={() => setScreen('quick-write')}
  onStop={() => setScreen('entry-detail')}
/>
```

---

### 5. EntryDetailScreen
**Ubicación:** `/components/screens/EntryDetailScreen.tsx`

**Características:**
- ✅ Transcripción de la entrada
- ✅ Análisis emocional (primaria y secundarias)
- ✅ Análisis prosódico (pitch, energía, velocidad, pausas)
- ✅ Nodos ligados del grafo cognitivo
- ✅ Recomendaciones basadas en la entrada
- ✅ Modo Black Box con explicabilidad
- ✅ Botones de editar y eliminar

**Navegación:**
```tsx
<EntryDetailScreen onClose={() => setScreen('home')} />
```

---

### 6. TimelineScreen
**Ubicación:** `/components/screens/TimelineScreen.tsx`

**Características:**
- ✅ Vista de calendario (semana, mes, año)
- ✅ Heatmap emocional
- ✅ Filtros por emoción y tipo de entrada
- ✅ Navegación entre periodos
- ✅ Leyenda de emociones
- ✅ Indicador de intensidad emocional

**Navegación:**
```tsx
<TimelineScreen
  activeTab="timeline"
  onTabChange={(tab) => console.log(tab)}
/>
```

---

### 7. GraphScreen (Cognitive Graph)
**Ubicación:** `/components/screens/GraphScreen.tsx`

**Características:**
- ✅ Visualización de grafo interactivo (SVG)
- ✅ Nodos con tamaño proporcional a frecuencia
- ✅ Colores por tipo (concepto, emoción, persona, actividad)
- ✅ Zoom in/out, ajustar a pantalla
- ✅ Panel de detalle de nodo seleccionado
- ✅ Conexiones entre nodos
- ✅ Exportar grafo

**Navegación:**
```tsx
<GraphScreen
  activeTab="graph"
  onTabChange={(tab) => console.log(tab)}
/>
```

---

### 8. ImportsScreen
**Ubicación:** `/components/screens/ImportsScreen.tsx`

**Características:**
- ✅ Zona de arrastrar y soltar archivos
- ✅ Cola de importación con progreso
- ✅ Soporte para imágenes, audio, documentos
- ✅ Análisis automático opcional
- ✅ Indicadores de estado (pending, processing, success, error)
- ✅ Límite de 50MB por archivo

**Navegación:**
```tsx
<ImportsScreen
  activeTab="home"
  onTabChange={(tab) => console.log(tab)}
/>
```

---

### 9. HabitsScreen
**Ubicación:** `/components/screens/HabitsScreen.tsx`

**Características:**
- ✅ Tracker de sueño (hora dormir/despertar, calidad)
- ✅ Tracker de ejercicio
- ✅ Otros hábitos (meditación, lectura, agua, pantalla)
- ✅ Gráfico de correlación sueño vs emociones
- ✅ Insight basado en datos
- ✅ Guardado de hábitos

**Navegación:**
```tsx
<HabitsScreen
  activeTab="home"
  onTabChange={(tab) => console.log(tab)}
/>
```

---

### 10. ZenModeScreen
**Ubicación:** `/components/screens/ZenModeScreen.tsx`

**Características:**
- ✅ Interfaz minimalista sin distracciones
- ✅ Fondo oscuro (slate-950)
- ✅ Textarea grande para escritura
- ✅ Botón de voz discreto
- ✅ Opción de análisis posterior
- ✅ Guardado silencioso

**Navegación:**
```tsx
<ZenModeScreen
  onSave={(text, analyze) => console.log(text, analyze)}
/>
```

---

### 11. SettingsScreen
**Ubicación:** `/components/screens/SettingsScreen.tsx`

**Características:**
- ✅ Gestión de cuenta (nombre, avatar)
- ✅ Preferencias (idioma, variante regional, modo por defecto, tema)
- ✅ Voz y audio (voz TTS, velocidad)
- ✅ Privacidad (cifrado AES-256, exportar/importar datos, bloqueo automático)
- ✅ Información de versión
- ✅ Cerrar sesión

**Navegación:**
```tsx
<SettingsScreen
  activeTab="settings"
  onTabChange={(tab) => console.log(tab)}
  onLogout={() => console.log('logout')}
/>
```

---

## 🧭 Sistema de Navegación

### App.tsx
El componente principal maneja la navegación entre pantallas:

```tsx
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
```

### BottomNav
La navegación inferior conecta 4 pantallas principales:
- **Home** (🏠): Pantalla principal con dashboard
- **Timeline** (📅): Vista de calendario emocional
- **Grafo** (🧠): Grafo cognitivo
- **Ajustes** (⚙️): Configuración

### Navegación Adicional
- Desde Home se puede acceder a: QuickWrite, VoiceEntry, Imports, Habits
- ZenMode es un modo alternativo que se puede configurar como pantalla por defecto

---

## 🎨 Estilos y Variables CSS

### Variables CSS (`/styles/globals.css`)

```css
:root {
  /* Colores */
  --bg-primary: #0F1419;
  --bg-secondary: #1A202C;
  --bg-card: #1A202C;
  --border-color: #2D3748;
  --text-primary: #E2E8F0;
  --text-secondary: #A0AEC0;
  --accent-primary: #6366F1;
  --accent-secondary: #8B5CF6;
  
  /* Emociones */
  --emotion-joy: #FBBF24;
  --emotion-sadness: #3B82F6;
  --emotion-anger: #EF4444;
  --emotion-fear: #8B5CF6;
  --emotion-surprise: #EC4899;
  --emotion-fatigue: #6B7280;
  --emotion-disgust: #10B981;
  
  /* Espaciado (sistema 8px) */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  
  /* Márgenes */
  --margin-top: 24px;
  --margin-bottom: 24px;
  --margin-left: 16px;
  --margin-right: 16px;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  --radius-full: 50%;
}
```

### Tailwind Classes
El proyecto usa Tailwind CSS v4 con las siguientes clases principales:
- Colores: `bg-slate-900`, `text-slate-200`, `border-slate-700`
- Espaciado: `p-6`, `px-6`, `py-4`, `gap-4`, `space-y-6`
- Radius: `rounded-lg`, `rounded-xl`, `rounded-full`
- Transiciones: `transition-all`, `duration-150`, `ease-in-out`

---

## ♿ Accesibilidad

### WCAG 2.2 AA Compliance

#### Contraste de Color
- ✅ Todos los textos cumplen con ratio 4.5:1 mínimo
- ✅ Textos grandes cumplen con ratio 3:1 mínimo
- ✅ Elementos interactivos tienen contraste adecuado

#### Navegación por Teclado
- ✅ Todos los elementos interactivos son accesibles con Tab
- ✅ Focus visible con outline de 2px
- ✅ Orden lógico de navegación

#### Lectores de Pantalla
- ✅ Atributos ARIA apropiados (`aria-label`, `aria-describedby`, `aria-current`)
- ✅ Roles semánticos (`role="alert"`, `role="button"`)
- ✅ Texto alternativo para iconos

#### Estados de Carga
- ✅ `aria-busy` para botones en carga
- ✅ Animaciones de spinner accesibles
- ✅ Feedback visual y de texto

#### Formularios
- ✅ Labels asociados a inputs
- ✅ Mensajes de error descriptivos
- ✅ Campos requeridos marcados

#### Reducción de Movimiento
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🚀 Próximos Pasos

### Integración con APIs Reales
1. **Web Audio API**: Para grabación y análisis de voz
2. **TensorFlow.js**: Para análisis emocional multimodal
3. **D3.js**: Para visualización avanzada del grafo cognitivo

### Mejoras Futuras
- [ ] Modo offline con service workers
- [ ] Sincronización multi-dispositivo (opcional)
- [ ] Exportar gráficos como PNG/SVG
- [ ] Temas personalizables (más allá de claro/oscuro)
- [ ] Widgets para dashboard personalizado

---

## 📞 Soporte

Para más información sobre la arquitectura técnica:
- `/lib/emotionalAnalysis.ts` - Motor de análisis emocional
- `/lib/prosodyAnalysis.ts` - Análisis prosódico
- `/lib/cognitiveGraph.ts` - Grafo cognitivo
- `/lib/habitCorrelation.ts` - Correlación de hábitos
- `/lib/blackBoxAnalysis.ts` - Explicabilidad
- `/lib/recommendationEngine.ts` - Motor de recomendaciones

---

**NOSTRA v1.0.0-beta**  
*Tu memoria emocional externa* 🧠
