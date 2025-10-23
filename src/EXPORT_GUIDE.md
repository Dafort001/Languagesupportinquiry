# 📦 Export Guide - pix.immo Capture

## Schnell-Export in 3 Schritten

### Schritt 1: Projekt-Ordner erstellen
Erstelle lokal einen Ordner `pix-immo-capture/` mit dieser Struktur:

```
pix-immo-capture/
├── components/
│   ├── screens/
│   ├── ui/
│   └── figma/
├── hooks/
├── styles/
├── guidelines/
└── (root files)
```

---

## Schritt 2: Dateien kopieren (Reihenfolge)

### 🔹 Block 1: Root Configuration (Start hier!)
Kopiere diese Dateien zuerst:

1. **package.json** ← Benenne `package.json.example` um!
2. `.gitignore`
3. `index.html`
4. `main.tsx`
5. `App.tsx`
6. `vite.config.ts`
7. `tsconfig.json`
8. `tailwind.config.js`
9. `postcss.config.js`
10. `.replit` (optional, nur für Replit)

**Kopier-Methode:**
- Öffne jede Datei in Figma Make
- Strg+A → Strg+C (alles kopieren)
- Füge in lokale Datei ein

---

### 🔹 Block 2: Dokumentation
11. `README.md`
12. `GITHUB_SETUP.md`
13. `TRANSFER_TO_REPLIT.md`
14. `Attributions.md`
15. `guidelines/Guidelines.md`

---

### 🔹 Block 3: Core Styles & Hooks
16. `styles/globals.css`
17. `hooks/useHaptic.ts`

---

### 🔹 Block 4: Components (Basis)
18. `components/HapticButton.tsx`
19. `components/PhoneFrame.tsx`
20. `components/StatusBar.tsx`
21. `components/figma/ImageWithFallback.tsx`

---

### 🔹 Block 5: Screen Components
22. `components/screens/SplashScreen.tsx`
23. `components/screens/CameraScreen.tsx`
24. `components/screens/GalleryScreen.tsx`
25. `components/screens/UploadScreen.tsx`

---

### 🔹 Block 6: UI Components (shadcn)
Kopiere **alle Dateien** aus `components/ui/`:

```
components/ui/
├── button.tsx          ⭐ Wichtig
├── badge.tsx           ⭐ Wichtig
├── progress.tsx        ⭐ Wichtig
├── select.tsx          ⭐ Wichtig
├── switch.tsx          ⭐ Wichtig
├── label.tsx           ⭐ Wichtig
├── alert.tsx           ⭐ Wichtig
├── card.tsx
├── dialog.tsx
├── sheet.tsx
├── tabs.tsx
├── ... (alle anderen)
└── utils.ts            ⭐ Wichtig
```

**Tipp:** Die mit ⭐ markierten sind für die aktuelle App essentiell.

---

## Schritt 3: Installation & Start

### In deinem Terminal:

```bash
cd pix-immo-capture

# 1. Dependencies installieren
npm install

# 2. Development Server starten
npm run dev

# 3. Browser öffnen
# Vite zeigt dir die URL (meist http://localhost:5173)
```

---

## ✅ Verifizierung

Nach dem Start solltest du sehen:
- ✅ iPhone 15 Pro Frame
- ✅ Splash Screen mit pix.immo Logo
- ✅ Funktionierender Button "Neues Projekt"
- ✅ Alle 4 Screens navigierbar
- ✅ Swipe-Gesten funktionieren

**Fehler?** → Siehe Troubleshooting unten.

---

## 📋 Datei-Checkliste

### Must-Have (App funktioniert nicht ohne):
- [x] package.json (umbenannt von .example)
- [x] index.html
- [x] main.tsx
- [x] App.tsx
- [x] vite.config.ts
- [x] tsconfig.json
- [x] tailwind.config.js
- [x] postcss.config.js
- [x] styles/globals.css
- [x] Alle 4 Screen-Komponenten
- [x] HapticButton.tsx
- [x] PhoneFrame.tsx
- [x] StatusBar.tsx
- [x] hooks/useHaptic.ts
- [x] components/ui/button.tsx
- [x] components/ui/badge.tsx
- [x] components/ui/progress.tsx
- [x] components/ui/select.tsx
- [x] components/ui/utils.ts

### Nice-to-Have (für Vollständigkeit):
- [ ] README.md (Dokumentation)
- [ ] .gitignore (für Git)
- [ ] Alle anderen UI-Komponenten
- [ ] guidelines/Guidelines.md

---

## 🚀 Alternative: GitHub Import

**Schneller Weg:**

1. **Kopiere alle Dateien** wie oben beschrieben
2. **Erstelle GitHub Repo** (siehe GITHUB_SETUP.md)
3. **Pushe alles zu GitHub**
4. **Import in Replit:** `Import from GitHub`

→ Replit erkennt automatisch die Konfiguration!

---

## 🆘 Troubleshooting

### Problem: "Cannot find module 'motion'"
```bash
npm install motion
```

### Problem: "Tailwind not working"
Stelle sicher:
- `globals.css` wird in `main.tsx` importiert
- `tailwind.config.js` existiert
- `postcss.config.js` existiert

### Problem: "TypeScript errors"
```bash
npm install -D @types/react @types/react-dom @types/node
```

### Problem: Komponenten nicht gefunden
Prüfe Import-Pfade:
```typescript
// Richtig:
import { Button } from './components/ui/button'

// Falsch:
import { Button } from '@/components/ui/button'
```

---

## 📊 Geschätzte Zeit

- ⏱️ Manuelles Kopieren: **15-25 Minuten**
- ⏱️ Via GitHub: **5-10 Minuten** (+ Upload-Zeit)

---

## 💡 Pro-Tipp

**Schnellste Methode:**

1. Erstelle Repo auf GitHub (siehe GITHUB_SETUP.md)
2. Nutze **GitHub Web-Upload** (Drag & Drop möglich!)
3. Import in Replit: `Import from GitHub`
4. Fertig! ✅

---

## ✨ Next Steps nach Export

1. `npm install` ausführen
2. `npm run dev` starten
3. App im Browser testen
4. Bei Replit deployen (automatisches HTTPS)
5. iPhone-Kamera-Test durchführen
6. **Design-Approved-Flag** in Guidelines.md setzen
7. Web-Portal entwickeln

---

**Viel Erfolg! Falls Probleme auftreten, melde dich!** 🚀
