# 🎪 Apex Pro Commercial Canopy Tent — E-Commerce 3D Storefront & Configurator

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-0284c7?style=for-the-badge&logo=github)](https://prabhav-bot.github.io/3D_2D_tent_production_config/)
[![Tech Stack](https://img.shields.io/badge/React_18-TypeScript_--_Three.js-2563eb?style=for-the-badge&logo=react)](https://react.dev/)
[![Styling](https://img.shields.io/badge/TailwindCSS_3.4-Modern_E--Commerce-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

A high-converting commercial e-commerce storefront and real-time 3D/2D product customization studio built with **React**, **TypeScript**, **TailwindCSS**, **Three.js / React Three Fiber**, and **Zustand**.

---

## 🌟 Storefront Experience

The application is structured as a full commercial e-commerce product page (inspired by premium outdoor gear brands like Yeti, Peak Design, and Apple Studio):

1. **Top Announcement & E-Commerce Header** (`EcommerceHeader.tsx`):
   - Promotional ribbon: Free commercial freight shipping on $500+, 5-year hardware warranty, 24-hour artwork proofing, and direct 1-800 sales specialist hotline.
   - Modern brand identity (**APEX CANOPY PRO**).
   - Smooth navigation menu (3D Customizer, Features & Durability, Presets, Tech Specs, Reviews, FAQ).
   - Shopping cart total with dynamic item counter badge opening the Shopify slide-out drawer.

2. **High-Impact Hero Section** (`HeroSection.tsx`):
   - Full-bleed hero banner featuring high-resolution commercial canopy tent photography (`/hero-tent-bg.jpg`) with multi-stage radial vignette overlays for maximum text legibility.
   - Star rating badge (`4.9 / 5.0 ★★★★★ • 1,240+ Commercial Clients`) and `2026 Pro Series Edition` tag.
   - Value propositions: 600D Oxford waterproof fabric, CPAI-84 fire rating, 35 MPH wind-rated aircraft aluminum, and 60-second setup.
   - Dual CTAs: *"Customize in 3D Below ↓"* (smooth-scroll) and *"Download Production Spec PDF"*.

3. **Interactive 3D Product Detail Page (PDP) Studio** (`#customizer` in `App.tsx`):
   - **Visualizer Modes**: Split View (3D + 2D), 3D Stage Only, and 2D Print Editor.
   - **3D Turntable Tools**: 360° turntable auto-rotation toggle and camera reset.
   - **Step-by-Step Customization Panel**:
     - `1. Specs`: Tent sizing (5x5 ft, 6.5x6.5 ft, 8x8 ft), frame finishes, and **3D Wall Enclosure Options**.
     - `2. Color`: Peak and valance hex color swatches with instant 3D sync.
     - `3. Graphics`: Custom text and vector logo uploads onto peak, valance, and back wall zones.
     - `4. Layers`: Reordering, opacity, scale, and layer management.
     - `Pricing & Cart`: Real-time line item breakdown with instant "Add to Cart" action.

4. **Curated Popular Presets Gallery** (`PresetsShowcase.tsx`):
   - One-click commercial styles (*Festival & Food Pop-Up*, *Trade Show Executive*, *Athletics & Racing Team*, *Artisan & Craft Studio*) that instantly update the live 3D model.

5. **Commercial Features & Durability Grid** (`FeaturesSection.tsx`):
   - 4-column cards detailing 40mm Hexagonal Aircraft Aluminum, Photographic Dye-Sublimation printing, 600D Oxford CPAI-84 fire certification, and the included 1680D heavy-duty roller travel bag.

6. **Technical Specifications & Compliance** (`ProductSpecificationsCard.tsx`):
   - Complete dimension tables, fabric weight, truss thickness, and wind safety guidelines.

7. **Customer Social Proof & Verified Reviews** (`ReviewsSection.tsx`):
   - Real-world buyer reviews from brand directors, festival producers, and motorsport teams with verified purchase tags.

8. **Pre-Purchase FAQ Accordion** (`FaqSection.tsx`):
   - Expandable accordion addressing vector artwork requirements, 4–7 business day turnaround, fire marshal compliance, and replacement canopy tops.

9. **Comprehensive Multi-Column E-Commerce Footer** (`EcommerceFooter.tsx`):
   - Newsletter subscription box with a *"$50 Off Your First Custom Tent Order"* promotional coupon offer.
   - Multi-column site directory, 256-Bit SSL checkout security seal, and accepted payment badges (Visa, Mastercard, Amex, Apple Pay, PayPal).

---

## 🏗️ Architecture & Core Modules

```
src/
├── components/
│   ├── 2d/
│   │   └── Canvas2DEditor.tsx        # Interactive 2D drag-to-position zone editor
│   ├── 3d/
│   │   ├── TentViewer3D.tsx          # R3F Canvas, OrbitControls, studio lighting & view presets
│   │   ├── TentModel.tsx             # GLTF model loader, material binder & dynamic 3D wall meshes
│   │   └── TextureSyncEngine.ts      # Offscreen 2D canvas texture atlas & dedicated wall texture
│   ├── controls/
│   │   ├── ColorPickerPanel.tsx      # Palette swatches & hex customizer
│   │   ├── ImageLayerTool.tsx        # Logo / artwork file uploader & controls
│   │   ├── LayerManagerList.tsx      # Z-index ordering, visibility & deletion
│   │   ├── SectionSelector.tsx       # Zone switcher with automatic wall addon activation
│   │   ├── TextLayerTool.tsx         # Typography, sizing, alignment & fonts
│   │   └── VariantSelector.tsx       # Frame sizes, finishes & wall enclosure addons
│   ├── shopify/
│   │   └── LineItemPropertiesDrawer.tsx # Slide-out cart drawer with serialized line items
│   ├── pdf/
│   │   └── SpecSheetModal.tsx        # Production prepress PDF preview & export modal
│   └── ui/
│       ├── EcommerceHeader.tsx       # Top navigation, promo bar & cart trigger
│       ├── HeroSection.tsx           # Full-bleed product photography hero banner
│       ├── PresetsShowcase.tsx       # 1-Click commercial theme preset gallery
│       ├── FeaturesSection.tsx       # 4-card durability engineering breakdown
│       ├── ReviewsSection.tsx        # Verified customer testimonials & rating breakdown
│       ├── FaqSection.tsx            # Pre-purchase questions accordion
│       ├── EcommerceFooter.tsx       # Multi-column footer, $50 promo capture & payment badges
│       ├── PricingSummary.tsx        # Real-time subtotal, discounts & Add to Cart
│       └── ProductSpecificationsCard.tsx # Detailed technical dimensions & compliance specs
├── schema/
│   └── tentProductSchema.ts          # JSON-serializable schema definition & presets
├── services/
│   ├── pricingService.ts             # Dynamic pricing rules & breakdown calculator
│   ├── shopifyService.ts             # Shopify line-item property payload serializer
│   └── pdfService.ts                 # jsPDF + html2canvas print spec sheet generator
└── store/
    └── useConfiguratorStore.ts       # Zustand store (Single source of truth & undo/redo)
```

---

## 🎯 Key Technical Implementations

### 1. Dynamic 3D Wall Enclosures
* **The Problem**: GLB tent models only contained canopy fabric and frame scissors, leaving wall addon selections (`Back Wall`, `Full Enclosure`) invisible in 3D.
* **The Solution**: In `TentModel.tsx`, we compute exact physical bounds dynamically from the scene. When `wallOption` is set to `'back_wall'` or `'full_enclosure'`, 3D double-sided fabric wall panels with velcro trims are instantiated in local model space.
* **Smart Camera Trigger**: Switching to `Back Wall` automatically pivots the Three.js camera to the rear view (`back`), while `Full Enclosure` rotates to the isometric angle.

### 2. Dual-Engine Canvas Texture Synthesis
* **Canopy Atlas (2048×2048)**: Maps 8 distinct roof slope and valance sub-regions to the GLB mesh UV coordinates with `flipY = false` to guarantee upright, unmirrored text.
* **Dedicated Wall Texture (1024×1024)**: Renders custom logos, text layers, and stitching simulations specifically for the printable back wall panel.

### 3. Pure Material Color Accuracy
* Standard Blender glTF materials often carry pre-baked diffuse tints. We programmatically reset `MeshStandardMaterial.color` to `#FFFFFF` before attaching dynamic canvas textures, ensuring hex colors exactly match Pantone/RGB branding.

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
  "Custom Summary": "[Front Roof Slope]: Text: \"APEX BRAND\" | [Back Wall Panel]: Logo: sponsor.svg",
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

Visit `http://localhost:3000/` (or `http://localhost:3001/` if port 3000 is occupied).

---

## 🚀 Deploying to GitHub Pages

```bash
# Build production bundle and publish dist/ to gh-pages branch
npm run deploy
```

Deployed at: **[https://prabhav-bot.github.io/3D_2D_tent_production_config/](https://prabhav-bot.github.io/3D_2D_tent_production_config/)**
