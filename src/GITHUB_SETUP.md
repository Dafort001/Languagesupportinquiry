# 🚀 GitHub Setup & Upload Guide

## Schritt-für-Schritt Anleitung zum GitHub-Upload

### Voraussetzungen
- GitHub Account ([github.com](https://github.com))
- Git installiert (optional, kann über GitHub Web gemacht werden)

---

## Option 1: GitHub Web Interface (Einfach, ohne Git)

### 1. Neues Repository erstellen
1. Gehe zu [github.com/new](https://github.com/new)
2. Repository Name: `pix-immo-capture`
3. Description: `Professional iPhone Camera App for Real Estate Photography`
4. **Private** oder Public (je nach Wunsch)
5. ❌ **NICHT** "Initialize with README" ankreuzen
6. Klicke **Create repository**

### 2. Dateien hochladen
GitHub zeigt nun eine leere Repo-Seite. Wähle **"uploading an existing file"**:

#### Upload-Reihenfolge (wichtig!):

**Erste Upload-Session:**
```
- .gitignore
- README.md
- package.json.example
- index.html
- main.tsx
- App.tsx
- vite.config.ts
- tsconfig.json
- tailwind.config.js
- postcss.config.js
```

**Zweite Upload-Session (Ordner-Struktur):**
```
- styles/globals.css
- guidelines/Guidelines.md
- hooks/useHaptic.ts
```

**Dritte Upload-Session (Components):**
```
- components/HapticButton.tsx
- components/PhoneFrame.tsx
- components/StatusBar.tsx
- components/figma/ImageWithFallback.tsx
```

**Vierte Upload-Session (Screens):**
```
- components/screens/SplashScreen.tsx
- components/screens/CameraScreen.tsx
- components/screens/GalleryScreen.tsx
- components/screens/UploadScreen.tsx
```

**Fünfte Upload-Session (UI Components):**
```
- components/ui/*.tsx (alle auf einmal)
```

**Commit Message für jeden Upload:**
```
feat: Initial project setup - [Session-Name]
```

---

## Option 2: Git Command Line (Professionell)

### 1. Lokale Vorbereitung

Erstelle einen lokalen Ordner mit allen Dateien aus Figma Make:

```bash
# Neuen Ordner erstellen
mkdir pix-immo-capture
cd pix-immo-capture

# Hier alle Dateien aus Figma Make reinkopieren
# (Struktur wie in README.md beschrieben)
```

### 2. Git initialisieren

```bash
# Git Repository initialisieren
git init

# Alle Dateien stagen
git add .

# Ersten Commit erstellen
git commit -m "feat: Initial project setup - pix.immo Capture v1.0"
```

### 3. GitHub Repository verbinden

```bash
# GitHub als Remote hinzufügen
git remote add origin https://github.com/YOUR_USERNAME/pix-immo-capture.git

# Branch umbenennen (optional, falls noch master)
git branch -M main

# Hochladen
git push -u origin main
```

**Ersetze `YOUR_USERNAME`** mit deinem GitHub-Benutzernamen!

---

## Option 3: GitHub Desktop (Visuell)

### 1. GitHub Desktop installieren
Download: [desktop.github.com](https://desktop.github.com)

### 2. Neues Repository erstellen
1. **File** → **New Repository**
2. Name: `pix-immo-capture`
3. Local Path: Wähle Ordner mit allen Dateien
4. Klicke **Create Repository**

### 3. Hochladen
1. Alle Dateien sollten im **Changes** Tab erscheinen
2. Commit Message: `feat: Initial project setup`
3. Klicke **Commit to main**
4. Klicke **Publish repository**
5. Wähle **Private** oder Public
6. Klicke **Publish**

---

## ✅ Verifizierung

Nach dem Upload sollte dein GitHub Repository folgende Struktur haben:

```
pix-immo-capture/
├── .gitignore
├── README.md
├── package.json.example
├── index.html
├── main.tsx
├── App.tsx
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── TRANSFER_TO_REPLIT.md
├── GITHUB_SETUP.md
├── Attributions.md
├── components/
│   ├── screens/
│   ├── ui/
│   ├── figma/
│   ├── HapticButton.tsx
│   ├── PhoneFrame.tsx
│   └── StatusBar.tsx
├── hooks/
│   └── useHaptic.ts
├── styles/
│   └── globals.css
└── guidelines/
    └── Guidelines.md
```

---

## 🔗 Import zu Replit

### Nach erfolgreichem GitHub-Upload:

1. Gehe zu [replit.com](https://replit.com)
2. Klicke **+ Create Repl**
3. Wähle **Import from GitHub**
4. Authentifiziere GitHub (falls noch nicht)
5. Wähle Repository: `YOUR_USERNAME/pix-immo-capture`
6. Klicke **Import from GitHub**

Replit erkennt automatisch:
- ✅ Vite-Konfiguration
- ✅ Package.json
- ✅ TypeScript
- ✅ React

### Nach Import in Replit:

```bash
# Dependencies installieren
npm install

# Server starten
npm run dev
```

Die App läuft nun auf Replit mit **automatischem HTTPS** → Live-Kamera funktioniert! 📸

---

## 🎯 Repository-Settings (Optional)

### Branch Protection (für Teams)
1. **Settings** → **Branches**
2. **Add rule** für `main`
3. Enable: "Require pull request reviews before merging"

### Secrets (für API-Keys)
1. **Settings** → **Secrets and variables** → **Actions**
2. Füge `VITE_API_URL` hinzu (falls benötigt)

### GitHub Pages (für Demo)
1. **Settings** → **Pages**
2. Source: `main` branch, `/dist` folder
3. Deploy mit: `npm run build`

---

## 📝 Nächste Schritte

Nach GitHub-Upload:

- [ ] Repository-URL teilen
- [ ] In Replit importieren
- [ ] `npm install` ausführen
- [ ] iPhone-Test über HTTPS
- [ ] **Design-Approved-Flag** setzen (siehe Guidelines.md)
- [ ] Web-Portal entwickeln

---

## 🆘 Troubleshooting

### Problem: "Repository already exists"
→ Wähle einen anderen Namen oder lösche das alte Repository

### Problem: Upload-Limit (100MB+)
→ Nutze Git LFS für große Dateien oder splitte in mehrere Commits

### Problem: .gitignore funktioniert nicht
→ Stelle sicher, dass `.gitignore` **vor** dem ersten Commit existiert

---

**Viel Erfolg mit dem Upload! 🚀**
