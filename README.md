# 🎪 Interactive 3D/2D Canopy Tent Product Configurator

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-0284c7?style=for-the-badge&logo=github)](https://prabhav-bot.github.io/3D_2D_tent_production_config/)
[![Tech Stack](https://img.shields.io/badge/React_18-TypeScript_--_Three.js-2563eb?style=for-the-badge&logo=react)](https://react.dev/)

An engineering-ready, real-time 3D/2D product customization studio built with **React**, **TypeScript**, **TailwindCSS**, **Three.js / React Three Fiber**, and **Zustand**.

---

## 💡 Overview

This project lets customers design custom commercial canopy tents (5x5 ft, 6.5x6.5 ft, 8x8 ft) in an interactive 2D flat section editor while previewing adjustments live on an interactive 3D model. It features a dynamic mocked pricing API, Shopify line-item integration schema, and print-ready production PDF spec sheet generation.

---

## 🏗️ Architecture & Core Modules

```
src/
├── components/
│   ├── 2d/
│   │   └── Canvas2DEditor.tsx        # Interactive 2D drag-to-position zone editor
│   ├── 3d/
│   │   ├── TentViewer3D.tsx          # R3F Canvas, OrbitControls, studio lighting & view presets
│   │   ├── TentModel.tsx             # GLTF model loader & material binder (5x5, 6.5x6.5, 8x8)
│   │   └── TextureSyncEngine.ts      # Offscreen 2D canvas texture atlas generator for Three.js
│   ├── controls/                     # Control toolkit (Zones, Typography, Logo Uploader, Colors)
│   ├── shopify/                      # Shopify Line Item Properties drawer & embed wrapper
│   └── pdf/                          # Production spec sheet PDF preview & download modal
├── schema/
│   └── tentProductSchema.ts          # JSON-serializable schema definition & presets
├── services/
│   ├── pricingService.ts             # Simulated /api/calculate-price endpoint with cost rules
│   ├── shopifyService.ts             # Shopify line-item property payload serializer
│   └── pdfService.ts                 # jsPDF + html2canvas print spec sheet generator
└── store/
    └── useConfiguratorStore.ts       # Zustand store (Single source of truth & undo/redo)
```

---

## 🎯 Key Technical Decisions

### 1. Offscreen 2D-to-3D Texture Sync Engine
* **The Problem**: Updating 3D Three.js textures on every slider tweak or mouse drag can freeze the main thread if React re-renders heavy 3D components.
* **The Solution**: We decoupled texture generation into an offscreen 2048x2048 HTML5 canvas (`TextureSyncEngine`). Graphic layers across all 9 section zones are composite-drawn onto the offscreen canvas atlas, updating a single `THREE.CanvasTexture` mapped to the model's `fabric_Mat` material in place.

### 2. Precise GLB UV Mapping & Orientation Alignment
* **The Problem**: In Blender GLB exports, UV islands for canopy slopes are often unwrapped in inverted coordinate spaces ($V \in [0.62, 1.00]$). Standard texture mapping caused text to appear upside-down or mirrored.
* **The Solution**: We inspected exact vertex UV coordinates directly from GLB binary buffers (`TEXCOORD_0`). Sub-regions on the 2048x2048 atlas were mapped to match GLB UV space with `flipY = false`, ensuring text reads right-side up, centered, and unmirrored on the 3D model.

### 3. Pure Material Base Color Reset
* **The Problem**: Default glTF materials exported from Blender contain gray/blue base tints, causing custom hex colors to appear muddy or dark.
* **The Solution**: In `TentModel.tsx`, we reset `MeshStandardMaterial.color` to `#FFFFFF` for fabric materials before applying the canvas texture. This guarantees 100% color accuracy for canopy color swatches.

### 4. Smart Placeholder Replacement
* **The Problem**: Stacking new text or logo uploads directly on top of default placeholder text (`"YOUR BRAND HERE"`) creates cluttered overlays.
* **The Solution**: The Zustand store automatically detects and strips default placeholder layers whenever a user adds new custom text or uploads a logo asset.

---

## 🛍️ Shopify Integration Schema

The configurator serializes the active state into standard **Shopify Line Item Properties**:

```json
{
  "_config_id": "CFG-M1X8B9K2",
  "Size": "6.5x6.5 ft Heavy Duty Canopy",
  "Frame Finish": "BLACK ANODIZED METAL",
  "Wall Addon": "BACK WALL",
  "Base Color": "#1E293B",
  "Print Technique": "DYE SUBLIMATION",
  "Total Custom Layers": "1 Text, 1 Logos",
  "Custom Summary": "[Front Roof Slope]: Text: \"ACME CORP\" | [Front Valance]: Logo: logo.svg",
  "_production_pdf_metadata": "..."
}
```

---

## 📄 Production PDF Specification Sheet

Clicking **"Production Spec PDF"** compiles a print-ready manufacturing spec sheet (`jspdf` + `html2canvas`):
* Order Metadata & SKU identifiers.
* Side-by-side 3D render snapshot & 2D flat texture atlas view.
* Vector placement matrix table ($(X, Y)$ %, scale, font family, color hex).
* Itemized pricing breakdown & Shopify order barcodes.

---

## ⚡ Getting Started Locally

```bash
# 1. Clone the repository
git clone https://github.com/Prabhav-bot/3D_2D_tent_production_config.git
cd 3D_2D_tent_production_config

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Visit `http://localhost:3000/` in your browser.

---

## 🚀 Deploying to GitHub Pages

```bash
# Build and publish dist/ to gh-pages branch
npm run deploy
```
