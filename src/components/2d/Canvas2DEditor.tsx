import React, { useRef, useState, useEffect } from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { SECTION_DEFINITIONS } from '../../schema/tentProductSchema';
import { GraphicLayer } from '../../types/configurator';
import { Move, Layers, Grid, RefreshCw, ZoomIn } from 'lucide-react';

export const Canvas2DEditor: React.FC = () => {
  const config = useConfiguratorStore((state) => state.config);
  const activeSectionId = config.activeSectionId;
  const activeSection = config.sections[activeSectionId];
  const selectedLayerId = config.selectedLayerId;
  
  const setSelectedLayer = useConfiguratorStore((state) => state.setSelectedLayer);
  const updateLayer = useConfiguratorStore((state) => state.updateLayer);

  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number; layerX: number; layerY: number } | null>(null);

  const activeLayer = activeSection?.layers.find((l) => l.id === selectedLayerId);

  // Handle Layer Selection & Dragging
  const handleMouseDownOnLayer = (e: React.MouseEvent, layer: GraphicLayer) => {
    e.stopPropagation();
    setSelectedLayer(layer.id);
    setIsDragging(true);

    if (canvasContainerRef.current) {
      const rect = canvasContainerRef.current.getBoundingClientRect();
      setDragStart({
        x: e.clientX,
        y: e.clientY,
        layerX: layer.x,
        layerY: layer.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !dragStart || !selectedLayerId || !canvasContainerRef.current) return;

    const rect = canvasContainerRef.current.getBoundingClientRect();
    const deltaXPixels = e.clientX - dragStart.x;
    const deltaYPixels = e.clientY - dragStart.y;

    // Convert pixel delta into percentage relative to section container
    const deltaXPercent = (deltaXPixels / rect.width) * 100;
    const deltaYPercent = (deltaYPixels / rect.height) * 100;

    let newX = Math.round(dragStart.layerX + deltaXPercent);
    let newY = Math.round(dragStart.layerY + deltaYPercent);

    // Constrain to 0-100% bounds
    newX = Math.max(5, Math.min(95, newX));
    newY = Math.max(5, Math.min(95, newY));

    updateLayer(activeSectionId, selectedLayerId, { x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragStart(null);
  };

  const sectionMeta = SECTION_DEFINITIONS[activeSectionId] || {
    label: activeSectionId,
    description: 'Custom Section',
  };

  // Determine section aspect ratio (valance is wider/shorter)
  const isValance = activeSectionId.includes('valance');
  const aspectRatioClass = isValance ? 'aspect-[4/1]' : 'aspect-[4/3]';

  return (
    <div className="flex flex-col h-full bg-slate-900/90 rounded-2xl border border-slate-800 p-4 shadow-xl select-none">
      {/* 2D Canvas Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-sky-400 animate-pulse" />
          <h3 className="font-semibold text-slate-100 text-sm">
            2D Flat Zone Editor — <span className="text-sky-400">{sectionMeta.label}</span>
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded">
            <Grid className="w-3 h-3 text-slate-400" /> Interactive Canvas
          </span>
        </div>
      </div>

      {/* Main 2D Canvas Workspace Container */}
      <div
        className="relative flex-1 flex items-center justify-center bg-slate-950/80 rounded-xl p-4 overflow-hidden border border-slate-800/80"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={() => setSelectedLayer(null)}
      >
        {/* Background Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30 pointer-events-none" />

        {/* 2D Section Boundary Canvas Box */}
        <div
          ref={canvasContainerRef}
          className={`relative w-full max-w-xl ${aspectRatioClass} rounded-lg border-2 border-dashed border-sky-500/40 shadow-2xl transition-all overflow-hidden cursor-crosshair`}
          style={{
            backgroundColor: activeSection?.backgroundColor || config.globalCanopyColor || '#1E293B',
          }}
        >
          {/* Center Snap Guides */}
          <div className="absolute inset-x-0 top-1/2 border-t border-sky-500/20 pointer-events-none" />
          <div className="absolute inset-y-0 left-1/2 border-l border-sky-500/20 pointer-events-none" />

          {/* Section Watermark Label */}
          <div className="absolute bottom-2 right-3 text-[10px] font-mono tracking-widest text-white/30 uppercase pointer-events-none">
            {sectionMeta.label} ({config.variantSize} FT)
          </div>

          {/* Render Layers on 2D Canvas */}
          {activeSection?.layers.map((layer) => {
            if (!layer.visible) return null;
            const isSelected = selectedLayerId === layer.id;

            return (
              <div
                key={layer.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedLayer(layer.id);
                }}
                onMouseDown={(e) => handleMouseDownOnLayer(e, layer)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing transition-shadow ${
                  isSelected ? 'ring-2 ring-sky-400 ring-offset-2 ring-offset-slate-900 rounded p-1 z-20' : 'hover:outline hover:outline-1 hover:outline-sky-400/60 z-10'
                }`}
                style={{
                  left: `${layer.x}%`,
                  top: `${layer.y}%`,
                  transform: `translate(-50%, -50%) rotate(${layer.rotation || 0}deg)`,
                }}
              >
                {/* Text Layer */}
                {layer.type === 'text' && (
                  <div
                    style={{
                      fontFamily: layer.fontFamily,
                      fontSize: `${layer.fontSize}px`,
                      color: layer.fill,
                      fontWeight: layer.fontWeight,
                      fontStyle: layer.fontStyle,
                      textAlign: layer.textAlign,
                      whiteSpace: 'nowrap',
                      textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                    }}
                  >
                    {layer.text || 'Text Layer'}
                  </div>
                )}

                {/* Image Layer */}
                {layer.type === 'image' && (
                  <div
                    style={{
                      width: `${120 * (layer.scale || 1)}px`,
                      opacity: layer.opacity !== undefined ? layer.opacity : 1,
                    }}
                  >
                    <img
                      src={layer.src}
                      alt={layer.name || 'Logo'}
                      className="w-full h-auto object-contain pointer-events-none"
                    />
                  </div>
                )}

                {/* Selected Layer Coordinate Tag */}
                {isSelected && (
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-sky-500 text-white text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shadow whitespace-nowrap pointer-events-none">
                    X: {layer.x}% Y: {layer.y}%
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2D Canvas Controls Footer */}
      <div className="mt-3 flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
        <span className="flex items-center gap-1">
          <Move className="w-3.5 h-3.5 text-sky-400" /> Click & drag graphic elements to adjust absolute X / Y position
        </span>
        <span className="text-[11px] font-mono text-slate-500">
          ZONES ({Object.values(config.sections).reduce((acc, s) => acc + s.layers.length, 0)} TOTAL LAYERS)
        </span>
      </div>
    </div>
  );
};
