# 🚀 Quick Export - Minimale Dateiliste

## Kritische Dateien (Diese 25 Dateien = funktionierende App!)

### 1️⃣ Root Config (9 Dateien)
```
✅ package.json.example → umbenennen zu package.json
✅ index.html
✅ main.tsx
✅ App.tsx
✅ vite.config.ts
✅ tsconfig.json
✅ tailwind.config.js
✅ postcss.config.js
✅ .gitignore (von dir bearbeitet)
```

### 2️⃣ Styles & Hooks (2 Dateien)
```
✅ styles/globals.css
✅ hooks/useHaptic.ts
```

### 3️⃣ Core Components (4 Dateien)
```
✅ components/HapticButton.tsx
✅ components/PhoneFrame.tsx
✅ components/StatusBar.tsx
✅ components/figma/ImageWithFallback.tsx
```

### 4️⃣ Screens (4 Dateien)
```
✅ components/screens/SplashScreen.tsx
✅ components/screens/CameraScreen.tsx
✅ components/screens/GalleryScreen.tsx
✅ components/screens/UploadScreen.tsx
```

### 5️⃣ Essential UI Components (6 Dateien)
```
✅ components/ui/button.tsx
✅ components/ui/badge.tsx
✅ components/ui/progress.tsx
✅ components/ui/select.tsx
✅ components/ui/switch.tsx
✅ components/ui/label.tsx
✅ components/ui/alert.tsx
✅ components/ui/utils.ts
```

---

## Copy-Paste Workflow (15 Min)

### Schritt 1: Lokaler Ordner
```bash
mkdir pix-immo-capture
cd pix-immo-capture
```

### Schritt 2: Öffne in Figma Make & Kopiere

Für jede Datei:
1. Klicke auf Datei in Figma Make
2. Strg+A (alles markieren)
3. Strg+C (kopieren)
4. Erstelle lokale Datei
5. Strg+V (einfügen)

### Schritt 3: Installation
```bash
# package.json.example umbenennen
mv package.json.example package.json

# Dependencies installieren
npm install

# Starten
npm run dev
```

---

## Alternative: Batch-Copy via VS Code

1. Öffne VS Code
2. Neue Dateien mit gleichem Namen erstellen
3. Copy-Paste von Figma Make
4. Ordner-Struktur wird automatisch erstellt

---

## GitHub Upload (danach)

```bash
git init
git add .
git commit -m "feat: Initial pix.immo Capture v1.0"
git remote add origin https://github.com/YOUR_USERNAME/pix-immo-capture.git
git push -u origin main
```

Dann in Replit: **Import from GitHub** ✅

---

## Optional: Vollständige Kopie

Wenn du später die **komplette shadcn/ui Library** brauchst:

```
components/ui/ (alle 55 Komponenten)
├── accordion.tsx
├── alert-dialog.tsx
... (alle anderen)
```

Aber für die **funktionierende App** reichen die 25 Dateien oben!

---

**Zeitaufwand:**
- ⏱️ Nur essentials (25 Dateien): **~15 Minuten**
- ⏱️ Vollständig (71 Dateien): **~30 Minuten**
- ⏱️ Via GitHub → Replit: **~5 Minuten**
