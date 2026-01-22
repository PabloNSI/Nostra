# 🧠 NOSTRA - Tu Memoria Emocional Externa

![Version](https://img.shields.io/badge/version-1.0.0--beta-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61DAFB.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38B2AC.svg)
![WCAG](https://img.shields.io/badge/WCAG-2.2%20AA-green.svg)

NOSTRA es una aplicación desktop/móvil de memoria emocional externa que permite entradas de texto y voz (local, sin datos en la nube), detecta emociones de forma multimodal, construye un grafo cognitivo evolutivo, y ofrece herramientas de bienestar con correlación hábitos-emociones.

## ✨ Características Principales

### 🎯 Funcionalidades Core
- ✅ **Entradas multimodales**: Texto y voz con análisis en tiempo real
- ✅ **Análisis emocional avanzado**: Detección multimodal (texto + prosodia)
- ✅ **Grafo cognitivo dinámico**: Visualización de conceptos, personas, emociones y actividades
- ✅ **Timeline emocional**: Calendario heatmap con filtros avanzados
- ✅ **Correlación hábitos-emociones**: Análisis de sueño, ejercicio y otros hábitos
- ✅ **Recomendaciones personalizadas**: Motor de sugerencias con feedback del usuario
- ✅ **Black Box explicabilidad**: Transparencia total del análisis emocional
- ✅ **Modo Zen**: Interfaz minimalista sin distracciones

### 🔒 Privacidad y Seguridad
- ✅ **Cifrado local AES-256**: Todos los datos cifrados en el dispositivo
- ✅ **Sin datos en la nube**: Procesamiento 100% local
- ✅ **Exportar/Importar**: Control total de tus datos
- ✅ **Bloqueo automático**: Protección por inactividad

### ♿ Accesibilidad
- ✅ **WCAG 2.2 AA compliant**: Cumplimiento total
- ✅ **Navegación por teclado**: Todos los elementos accesibles
- ✅ **Lectores de pantalla**: ARIA labels y roles semánticos
- ✅ **Alto contraste**: Colores verificados para accesibilidad
- ✅ **Reducción de movimiento**: Respeta preferencias del sistema

## 📱 Pantallas Implementadas

### 1. Login/Unlock
- Autenticación con usuario y contraseña
- Toggle de visibilidad de contraseña
- Opción de biometría
- Validación en tiempo real
- Indicador de cifrado local

### 2. Home Dashboard
- Emoción dominante del día con medidor
- Accesos rápidos a todas las funciones
- Recomendaciones personalizadas con feedback
- Entradas recientes
- Insights de correlación

### 3. Quick Write
- Entrada rápida de texto
- Contador de caracteres (máx 2000)
- Opción de análisis emocional
- Botón de voz central
- Guardado rápido

### 4. Voice Entry
- Grabación de audio en tiempo real
- Visualización de forma de onda
- Timer de grabación
- Indicador de nivel de micrófono
- Botón de detener

### 5. Entry Detail
- Transcripción completa
- Análisis emocional (primaria + secundarias)
- Análisis prosódico (pitch, energía, velocidad, pausas)
- Nodos ligados del grafo
- Recomendaciones específicas
- Modo Black Box con explicabilidad
- Editar y eliminar

### 6. Timeline Emocional
- Vista calendario (semana/mes/año)
- Heatmap de emociones
- Filtros por emoción y tipo
- Navegación entre periodos
- Leyenda de intensidad

### 7. Grafo Cognitivo
- Visualización interactiva SVG
- Nodos por tipo (concepto, emoción, persona, actividad)
- Tamaño proporcional a frecuencia
- Conexiones entre nodos
- Panel de detalle
- Zoom y exportar

### 8. Imports Manager
- Drag & drop de archivos
- Cola de importación con progreso
- Soporte: JPG, PNG, MP3, WAV, PDF, TXT
- Análisis automático opcional
- Límite 50MB por archivo

### 9. Habits & Sleep
- Tracker de sueño (horarios + calidad)
- Tracker de ejercicio
- Otros hábitos (meditación, lectura, agua, pantalla)
- Gráfico de correlación sueño vs emociones
- Insights basados en datos

### 10. Zen Mode
- Interfaz minimalista
- Fondo oscuro sin distracciones
- Textarea grande
- Botón de voz discreto
- Análisis posterior opcional

### 11. Settings
- Gestión de cuenta
- Idioma y variante regional
- Modo por defecto (Zen/Full)
- Tema (Oscuro/Claro)
- Voz TTS y velocidad
- Cifrado y privacidad
- Exportar/Importar datos
- Bloqueo automático
- Cerrar sesión

## 🏗️ Arquitectura Técnica

### Stack Tecnológico
- **Frontend**: React 18 + TypeScript
- **Estilos**: Tailwind CSS v4
- **Iconos**: Lucide React
- **Estado**: React Hooks (useState, useEffect)
- **Navegación**: Router personalizado

### Estructura de Carpetas
```
src/
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Header.tsx
│   │   ├── BottomNav.tsx
│   │   └── Toast.tsx
│   └── screens/
│       ├── LoginScreen.tsx
│       ├── HomeScreen.tsx
│       ├── QuickWriteScreen.tsx
│       ├── VoiceEntryScreen.tsx
│       ├── EntryDetailScreen.tsx
│       ├── TimelineScreen.tsx
│       ├── GraphScreen.tsx
│       ├── ImportsScreen.tsx
│       ├── HabitsScreen.tsx
│       ├── ZenModeScreen.tsx
│       ├── SettingsScreen.tsx
│       └── index.ts
├── lib/
│   ├── emotionalAnalysis.ts
│   ├── prosodyAnalysis.ts
│   ├── cognitiveGraph.ts
│   ├── habitCorrelation.ts
│   ├── blackBoxAnalysis.ts
│   └── recommendationEngine.ts
├── styles/
│   └── globals.css
└── App.tsx
```

### Componentes Reutilizables

#### Button
```tsx
<Button variant="primary" size="lg" loading={false}>
  Click me
</Button>
```

#### Input
```tsx
<Input
  label="Email"
  type="email"
  errorText="Campo requerido"
/>
```

#### Card
```tsx
<Card variant="elevated" onClick={() => {}}>
  Contenido
</Card>
```

#### Badge
```tsx
<Badge type="emotion" emotion="joy">
  Alegría 85%
</Badge>
```

## 🎨 Sistema de Diseño

### Paleta de Colores
```css
/* Fondos */
--bg-primary: #0F1419
--bg-secondary: #1A202C
--bg-card: #1A202C
--border-color: #2D3748

/* Textos */
--text-primary: #E2E8F0
--text-secondary: #A0AEC0

/* Acentos */
--accent-primary: #6366F1 (Indigo)
--accent-secondary: #8B5CF6 (Purple)

/* Emociones */
--emotion-joy: #FBBF24 (Amber)
--emotion-sadness: #3B82F6 (Blue)
--emotion-anger: #EF4444 (Red)
--emotion-fear: #8B5CF6 (Purple)
--emotion-surprise: #EC4899 (Pink)
--emotion-fatigue: #6B7280 (Gray)
--emotion-disgust: #10B981 (Green)
```

### Sistema de Espaciado (8px base)
```css
--space-xs: 4px
--space-sm: 8px
--space-md: 16px
--space-lg: 24px
--space-xl: 32px
--space-2xl: 48px
```

### Tipografía
- **Font Family**: Inter, -apple-system, BlinkMacSystemFont
- **H1**: 32px / 700
- **H2**: 24px / 600
- **H3**: 18px / 600
- **Body**: 16px / 400
- **Small**: 14px / 400

### Border Radius
```css
--radius-sm: 4px
--radius-md: 6px
--radius-lg: 8px
--radius-xl: 12px
--radius-full: 50%
```

## 🚀 Instalación y Desarrollo

### Requisitos
- Node.js 18+
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/yourusername/nostra.git

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Build para Producción
```bash
npm run build
```

## 📚 Documentación Adicional

- [SCREENS_DOCUMENTATION.md](./SCREENS_DOCUMENTATION.md) - Documentación detallada de todas las pantallas
- [FEATURES.md](./FEATURES.md) - Lista completa de funcionalidades avanzadas
- [LOGIN_README.md](./LOGIN_README.md) - Documentación específica del Login
- [Attributions.md](./Attributions.md) - Atribuciones y licencias

## 🔮 Próximos Pasos

### Integración con APIs Reales
- [ ] Web Audio API para grabación y análisis de voz
- [ ] TensorFlow.js para análisis emocional multimodal
- [ ] D3.js para visualización avanzada del grafo

### Mejoras Futuras
- [ ] Modo offline con service workers
- [ ] Sincronización multi-dispositivo (opcional)
- [ ] Exportar gráficos como PNG/SVG
- [ ] Temas personalizables
- [ ] Widgets para dashboard personalizado
- [ ] Notificaciones push para recordatorios
- [ ] Integración con wearables (opcional)

## 🤝 Contribuciones

Las contribuciones son bienvenidas! Por favor:
1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 📧 Contacto

Tu Nombre - [@tutwitter](https://twitter.com/tutwitter) - tu@email.com

Project Link: [https://github.com/yourusername/nostra](https://github.com/yourusername/nostra)

---

**NOSTRA v1.0.0-beta**  
*Tu memoria emocional externa* 🧠

Hecho con ❤️ y cuidado por la privacidad
