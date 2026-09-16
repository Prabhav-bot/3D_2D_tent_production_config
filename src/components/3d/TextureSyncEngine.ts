import * as THREE from 'three';
import { ConfigurationState, GraphicLayer, SectionZoneId } from '../../types/configurator';

export class TextureSyncEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private texture: THREE.CanvasTexture;
  private imageCache: Map<string, HTMLImageElement> = new Map();

  // Standard high-res texture atlas size (2048 x 2048) for canopy
  private readonly width = 2048;
  private readonly height = 2048;

  // Dedicated wall texture canvas (1024 x 1024)
  private wallCanvas: HTMLCanvasElement;
  private wallCtx: CanvasRenderingContext2D;
  private wallTexture: THREE.CanvasTexture;
  private readonly wallWidth = 1024;
  private readonly wallHeight = 1024;

  constructor() {
    // 1. Canopy Texture Atlas Canvas
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    
    const context = this.canvas.getContext('2d');
    if (!context) throw new Error('2D Context unavailable');
    this.ctx = context;

    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.flipY = false;
    this.texture.colorSpace = THREE.SRGBColorSpace;

    // 2. Dedicated Wall Texture Canvas
    this.wallCanvas = document.createElement('canvas');
    this.wallCanvas.width = this.wallWidth;
    this.wallCanvas.height = this.wallHeight;

    const wallContext = this.wallCanvas.getContext('2d');
    if (!wallContext) throw new Error('Wall 2D Context unavailable');
    this.wallCtx = wallContext;

    this.wallTexture = new THREE.CanvasTexture(this.wallCanvas);
    this.wallTexture.flipY = false;
    this.wallTexture.colorSpace = THREE.SRGBColorSpace;
  }

  public getTexture(): THREE.CanvasTexture {
    return this.texture;
  }

  public getWallTexture(): THREE.CanvasTexture {
    return this.wallTexture;
  }

  public getCanvasElement(): HTMLCanvasElement {
    return this.canvas;
  }

  public getWallCanvasElement(): HTMLCanvasElement {
    return this.wallCanvas;
  }

  /**
   * Main render function that draws all sections onto the composite 2D texture skin atlas,
   * and also renders the dedicated wall panel texture.
   */
  public async renderTextureAtlas(config: ConfigurationState): Promise<void> {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // 1. Fill base canopy color across the entire UV skin
    ctx.fillStyle = config.globalCanopyColor || '#1E293B';
    ctx.fillRect(0, 0, this.width, this.height);

    // 2. Define UV Layout Sub-Regions for the Tent Canopy Atlas based on GLB UV mapping
    const secBounds: Record<SectionZoneId, { x: number; y: number; w: number; h: number }> = {
      roof_front: { x: 0, y: 1275, w: 2048, h: 773 },
      roof_back: { x: 0, y: 0, w: 2048, h: 772 },
      roof_left: { x: 0, y: 778, w: 565, h: 491 },
      roof_right: { x: 1484, y: 778, w: 564, h: 491 },
      valance_front: { x: 0, y: 1800, w: 2048, h: 248 },
      valance_back: { x: 0, y: 0, w: 2048, h: 248 },
      valance_left: { x: 0, y: 778, w: 565, h: 180 },
      valance_right: { x: 1484, y: 778, w: 564, h: 180 },
      back_wall: { x: 0, y: 0, w: 2048, h: 772 },
    };

    // Render each canopy section onto its sub-region
    for (const [secId, section] of Object.entries(config.sections)) {
      if (secId === 'back_wall') continue; // Handled separately on dedicated wall texture

      const bounds = secBounds[secId as SectionZoneId];
      if (!bounds) continue;

      ctx.save();

      // If section has an explicit custom background color override, fill sub-region
      if (
        section.backgroundColor &&
        section.backgroundColor.trim() !== '' &&
        section.backgroundColor.toLowerCase() !== config.globalCanopyColor.toLowerCase()
      ) {
        ctx.fillStyle = section.backgroundColor;
        ctx.fillRect(bounds.x, bounds.y, bounds.w, bounds.h);
      }

      // Draw section boundary accent outline subtle
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.strokeRect(bounds.x, bounds.y, bounds.w, bounds.h);

      // Render graphics layers for this section
      for (const layer of section.layers) {
        if (!layer.visible) continue;
        if (layer.type === 'text') {
          this.renderTextLayer(ctx, layer, bounds);
        } else if (layer.type === 'image') {
          await this.renderImageLayer(ctx, layer, bounds);
        }
      }

      ctx.restore();
    }

    // Flag canopy texture for Three.js GPU upload update
    this.texture.needsUpdate = true;

    // 3. Render Dedicated Wall Texture (for Back Wall Panel & Wall Addons)
    await this.renderWallPanelTexture(config);
  }

  private async renderWallPanelTexture(config: ConfigurationState): Promise<void> {
    const wCtx = this.wallCtx;
    const w = this.wallWidth;
    const h = this.wallHeight;

    wCtx.clearRect(0, 0, w, h);

    const backWallSection = config.sections.back_wall;
    const wallColor =
      backWallSection?.backgroundColor && backWallSection.backgroundColor.trim() !== ''
        ? backWallSection.backgroundColor
        : config.globalCanopyColor || '#1E293B';

    // Base fill
    wCtx.fillStyle = wallColor;
    wCtx.fillRect(0, 0, w, h);

    // Subtle fabric hem and seam stitching simulation
    wCtx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    wCtx.lineWidth = 14;
    wCtx.strokeRect(0, 0, w, h);

    wCtx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    wCtx.lineWidth = 4;
    wCtx.setLineDash([12, 10]);
    wCtx.strokeRect(16, 16, w - 32, h - 32);
    wCtx.setLineDash([]);

    // Render layers on wall panel
    if (backWallSection && backWallSection.layers) {
      const bounds = { x: 30, y: 30, w: w - 60, h: h - 60 };
      for (const layer of backWallSection.layers) {
        if (!layer.visible) continue;
        if (layer.type === 'text') {
          this.renderTextLayer(wCtx, layer, bounds);
        } else if (layer.type === 'image') {
          await this.renderImageLayer(wCtx, layer, bounds);
        }
      }
    }

    this.wallTexture.needsUpdate = true;
  }

  private renderTextLayer(
    ctx: CanvasRenderingContext2D,
    layer: any,
    bounds: { x: number; y: number; w: number; h: number }
  ) {
    ctx.save();

    // Map % coordinates to actual pixel position inside section sub-region
    const posX = bounds.x + (layer.x / 100) * bounds.w;
    const posY = bounds.y + (layer.y / 100) * bounds.h;

    // Scale font size proportionally for high-res canvas
    const fontPx = Math.round(layer.fontSize * (bounds.w / 500));
    const fontStyle = layer.fontStyle === 'italic' ? 'italic' : '';
    const fontWeight = layer.fontWeight === 'bold' ? 'bold' : 'normal';
    ctx.font = `${fontStyle} ${fontWeight} ${fontPx}px "${layer.fontFamily}", sans-serif`.trim();
    ctx.fillStyle = layer.fill || '#FFFFFF';
    ctx.textAlign = layer.textAlign || 'center';
    ctx.textBaseline = 'middle';

    ctx.translate(posX, posY);
    if (layer.rotation) {
      ctx.rotate((layer.rotation * Math.PI) / 180);
    }

    // Optional text stroke shadow for legibility
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    ctx.fillText(layer.text, 0, 0);

    ctx.restore();
  }

  private async renderImageLayer(
    ctx: CanvasRenderingContext2D,
    layer: any,
    bounds: { x: number; y: number; w: number; h: number }
  ): Promise<void> {
    const img = await this.loadImage(layer.src);
    if (!img) return;

    ctx.save();

    const posX = bounds.x + (layer.x / 100) * bounds.w;
    const posY = bounds.y + (layer.y / 100) * bounds.h;

    const baseWidth = (bounds.w * 0.35) * (layer.scale || 1);
    const baseHeight = baseWidth / (layer.aspectRatio || 1);

    ctx.translate(posX, posY);
    if (layer.rotation) {
      ctx.rotate((layer.rotation * Math.PI) / 180);
    }

    ctx.globalAlpha = layer.opacity !== undefined ? layer.opacity : 1;

    ctx.drawImage(
      img,
      -baseWidth / 2,
      -baseHeight / 2,
      baseWidth,
      baseHeight
    );

    ctx.restore();
  }

  private loadImage(src: string): Promise<HTMLImageElement | null> {
    if (this.imageCache.has(src)) {
      return Promise.resolve(this.imageCache.get(src)!);
    }

    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        this.imageCache.set(src, img);
        resolve(img);
      };
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }
}
