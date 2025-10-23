# pix.immo – Figma Full Design Brief

> Ziel: Ein modernes, ruhiges und professionelles Design, das technisch versierte wie nicht-technische Nutzer gleichermaßen anspricht.  
> **Design-Freigabe** ist die verbindliche Startfreigabe für die Implementierung auf Replit (MCP → Replit).
> **Orientierung**: Die iPhone App ist primär für **Hochformat (Portrait)** optimiert - ideal für Galerie-Navigation und professionelle Fotografie.

---

## ✅ DESIGN-APPROVED (iPhone App v2.1 - PORTRAIT + HDR)
**Status:** FREIGEGEBEN ✓  
**Datum:** 23. Oktober 2025  
**Orientierung:** **Hochformat (Portrait)** 393 × 852 pt  
**Umfang:** Alle 4 iPhone-Screens (Splash, Camera, Gallery, Upload)  
**Features:** Live-Kamera, Haptic Feedback, Swipe-Navigation, iPhone 15 Pro Frame, Histogramm, Bottom Navigation, **Apple Photos Design**, **HDR Bracketing**

**Redesign:** Galerie im **Apple Fotos Stil** - 3-Spalten Grid, Floating Action Button, Selection Mode, Bottom Sheet  
**Neu:** **HDR-Belichtungsreihen** - Badge in Galerie (🟦 3×/5×) und Kamera (Toggle-Badge)

**Nächster Schritt:** Export zu Replit für Production-Build  

## ✅ DESIGN-APPROVED (Web Portal v1.0)
**Status:** FREIGEGEBEN ✓  
**Datum:** 23. Oktober 2025  
**Umfang:** Alle 6 Web-Portal Screens implementiert  
**Features:** Responsive Design, Live-Preis-Kalkulation, Stripe-Integration (Mock), Status-Timeline

**Implementierte Screens:**
1. ✅ **Uploads-Übersicht** – Dashboard mit Status-Filtern, Projekt-Karten, Thumbnails
2. ✅ **Galerie/Auswahl** – Raster-Grid, Stil-Auswahl, Live-Preis-Panel (Sticky Sidebar)
3. ✅ **Zahlung** – Stripe Checkout + Rechnungs-Option, Order Summary, Trust Badges
4. ✅ **Status-Timeline** – Visuelle Timeline mit Icons (Upload → Editing → Delivery)
5. ✅ **Lieferung** – Download-Bereich mit Auswahl, Alt-Text-Export, Rechnung, Rating
6.  **Revision** – Foto-Auswahl, Revision-Optionen (6 Kategorien), Kommentare, kostenlos innerhalb 7 Tagen

---

## 1. Branding & Stil
- Minimalistisch, hell, mit hohem Weißanteil.  
- Typografie: Inter oder SF Pro, 14–16 pt Text, 22–28 pt Titel.  
- Farben: neutral (Weiß, Hellgrau, Schwarz) mit Akzentfarbe Pix‑Blau (#3B82F6).  
- Icons: klar, dünn (strokeWidth 1.5), kompakt (w-4 h-4 standard), Material‑ähnlich.  

---

## 2. iPhone‑App Screens ✅ IMPLEMENTIERT

### A. Splash / Start ✅
- Hero‑Logo + Schriftzug *pix.immo Capture*.
- Animation (Fade‑in, 1.5 s).  
- Option: „Projekt fortsetzen" oder „Neues Projekt".  

### B. Kamera ✅
- Live‑Vorschau mit Gitter, Horizont‑Linie, Zoom‑Overlay (0.5×–2×).  
- Unten: großer Auslöser, Galerie‑Button, Timer (0 / 3 / 10 s).  
- Rechts: Format‑Badge (DNG / HEIC).  
- **Histogramm**: Toggle-Button (unten rechts), Live-Anzeige oben links mit Luminanz-Verteilung (Shadows/Midtones/Highlights)
- **HDR Bracketing**: Toggle-Badge (unten rechts), Optionen 3×/5× HDR-Belichtungsreihen

### C. Galerie ✅
- Rasterdarstellung, Thumbnails mit Status‑Badges (✅ ⚠️).  
- Auswahl / Ausschluss, Raumtyp‑Dropdown, Upload‑Button.  
- Filterleiste: Unzugeordnet, Ausgewählt.  
- **HDR Bracketing**: Badge (🟦 3×/5×) für HDR-Belichtungsreihen

### D. Upload ✅
- Sheet mit Dateizahl, Gesamtgröße, Umschalter „Nur WLAN / Mobil erlaubt".  
- Fortschrittsbalken (Einzel + Gesamt).  
- Banner für Offline, Fehler, Speicher knapp.  

---

## 3. Web‑Portal Screens ✅ IMPLEMENTIERT

1. **Uploads‑Übersicht** ✅ – Dashboard mit Status-Filtern, Projekt-Karten, Thumbnails
2. **Galerie / Auswahl** ✅ – Raster-Grid, Stil-Auswahl, Live-Preis-Panel (Sticky Sidebar)
3. **Zahlung** ✅ – Stripe-Checkout + Rechnungs-Option, Order Summary, Trust Badges
4. **Status‑Timeline** ✅ – Visuelle Timeline mit Icons (Upload → Editing → Delivery)
5. **Lieferung** ✅ – Download-Bereich mit Auswahl, Alt-Text-Export, Rechnung, Rating
6. **Revision** ✅ – Foto-Auswahl, Revision-Optionen (6 Kategorien), Kommentare, kostenlos innerhalb 7 Tagen

---

## 4. Komponenten
Buttons, Chips, Status‑Badges, Progressbars, Form‑Dropdowns, Snackbars, Modals.  
Responsives Verhalten (Mobil / Tablet / Desktop).  

---

## 5. Export‑Regeln (MCP → Replit)
- Exportiert werden:  
  - Screens (Page „iOS Capture", „Portal Web")  
  - Komponenten‑Bibliothek (JSON / SVG)  
  - Typografie‑ und Farb‑Tokens  
- Nach Freigabe wird ein **Design‑Approved‑Flag** gesetzt.  
  Erst dann darf Replit mit dem Build beginnen.

---

## 6. Technische Implementierung ✅

### Fertiggestellt:
- ✅ React 18.3 + TypeScript 5.6
- ✅ Tailwind CSS 4.0 mit Design-Tokens
- ✅ Motion (Framer Motion) für Animationen
- ✅ shadcn/ui Komponenten-Library
- ✅ MediaDevices API (Live-Kamera)
- ✅ Vibration API (Haptic Feedback)
- ✅ Swipe-Gesten (Motion Drag)
- ✅ iPhone 15 Pro Frame mit Dynamic Island
- ✅ Responsive Design (Desktop + Mobile)
- ✅ Web-Portal (alle 6 Screens)
- ✅ Mode-Switcher (iPhone ↔ Web)

### Bereit für:
- 🚀 Replit Deployment (HTTPS für Live-Kamera)
- 🚀 GitHub Repository Upload
- 🚀 Production Build
- 🚀 Beide Plattformen (iPhone + Web) vollständig

### Nächste Phase:
- ⏳ Backend Integration (Upload, Stripe API)
- ⏳ Authentifizierung (User Accounts)
- ⏳ PWA Features (Offline, Push)