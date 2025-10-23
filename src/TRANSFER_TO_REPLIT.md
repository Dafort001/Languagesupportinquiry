# Transfer zu Replit - Anleitung

## 🚀 Schnell-Transfer in 3 Schritten

### 1. Replit-Projekt erstellen
1. Gehe zu [replit.com](https://replit.com)
2. Erstelle ein neues **Vite React** Projekt
3. Projekt-Name: `pix-immo-capture`

### 2. Dependencies installieren

In der Replit Shell ausführen:
```bash
npm install motion lucide-react sonner@2.0.3
```

Für TypeScript (falls noch nicht vorhanden):
```bash
npm install -D @types/node
```

### 3. Dateien übertragen

#### A. Ersetze bestehende Dateien:
- `App.tsx` → Root-Level
- `styles/globals.css` → Erstelle Ordner, dann kopiere

#### B. Erstelle neue Ordner & Dateien:
```
/components
  /screens
    - CameraScreen.tsx
    - GalleryScreen.tsx  
    - SplashScreen.tsx
    - UploadScreen.tsx
  /ui (alle ShadCN Komponenten)
  /figma
    - ImageWithFallback.tsx
  - HapticButton.tsx
  - PhoneFrame.tsx
  - StatusBar.tsx

/hooks
  - useHaptic.ts

/guidelines
  - Guidelines.md
```

---

## 📋 Datei-Liste zum Kopieren

### Core Files (Pflicht)
- [x] `/App.tsx`
- [x] `/styles/globals.css`
- [x] `/components/HapticButton.tsx`
- [x] `/components/PhoneFrame.tsx`
- [x] `/components/StatusBar.tsx`
- [x] `/hooks/useHaptic.ts`

### Screen Components
- [x] `/components/screens/CameraScreen.tsx`
- [x] `/components/screens/GalleryScreen.tsx`
- [x] `/components/screens/SplashScreen.tsx`
- [x] `/components/screens/UploadScreen.tsx`

### UI Components (ShadCN)
Die folgenden Komponenten aus `/components/ui/` werden benötigt:
- [x] button.tsx
- [x] badge.tsx
- [x] progress.tsx
- [x] select.tsx
- [x] switch.tsx
- [x] label.tsx
- [x] alert.tsx
- [x] card.tsx

**Optional:** Kopiere alle anderen UI-Komponenten für zukünftige Features.

### Protected Files
- [x] `/components/figma/ImageWithFallback.tsx` (Nicht ändern!)

---

## ⚙️ Konfiguration

### 1. Vite Config (`vite.config.ts`)
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### 2. TypeScript Config (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 3. Tailwind Config (`tailwind.config.js`)
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pix-blue': '#3B82F6',
      },
    },
  },
  plugins: [],
}
```

### 4. PostCSS Config (`postcss.config.js`)
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

## 🧪 Testen auf Replit

1. **Build starten:**
   ```bash
   npm run dev
   ```

2. **Live-URL öffnen** (Replit generiert automatisch eine HTTPS-URL)

3. **iPhone-Kamera testen:**
   - Öffne die Replit-URL auf deinem iPhone
   - Erlaube Kamera-Zugriff
   - Die MediaDevices API funktioniert über HTTPS!

---

## 🎯 Nächste Schritte (Web-Portal)

Laut Guidelines fehlen noch:
- [ ] Uploads-Übersicht (Web)
- [ ] Galerie/Auswahl (Web)
- [ ] Zahlung (Stripe)
- [ ] Status-Timeline
- [ ] Lieferung
- [ ] Revision

Diese werden als separate Screens implementiert, sobald die iPhone-App auf Replit läuft.

---

## 🆘 Troubleshooting

### Problem: Module not found
```bash
npm install
```

### Problem: Tailwind funktioniert nicht
Stelle sicher, dass `globals.css` in `main.tsx` importiert ist:
```typescript
import './styles/globals.css'
```

### Problem: Motion/Framer Motion Error
```bash
npm uninstall framer-motion
npm install motion
```

---

## ✅ Transfer-Checkliste

- [ ] Replit-Projekt erstellt (Vite React)
- [ ] Dependencies installiert
- [ ] Alle Core-Files kopiert
- [ ] Alle Screen-Components kopiert
- [ ] UI-Components kopiert
- [ ] Config-Files erstellt
- [ ] `npm run dev` erfolgreich
- [ ] App läuft im Browser
- [ ] iPhone-Test durchgeführt
- [ ] Design-Approved-Flag gesetzt 🚀

---

**Hinweis:** Nach erfolgreichem Transfer kann die Web-Portal-Entwicklung beginnen!
