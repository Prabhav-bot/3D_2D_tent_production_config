import React, { useRef } from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { ImageLayer } from '../../types/configurator';
import { Image as ImageIcon, Upload, Trash2, Sliders } from 'lucide-react';

export const ImageLayerTool: React.FC = () => {
  const config = useConfiguratorStore((state) => state.config);
  const activeSectionId = config.activeSectionId;
  const activeSection = config.sections[activeSectionId];
  const selectedLayerId = config.selectedLayerId;

  const addImageLayer = useConfiguratorStore((state) => state.addImageLayer);
  const updateLayer = useConfiguratorStore((state) => state.updateLayer);
  const deleteLayer = useConfiguratorStore((state) => state.deleteLayer);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeImageLayer = activeSection?.layers.find(
    (l) => l.id === selectedLayerId && l.type === 'image'
  ) as ImageLayer | undefined;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      if (!src) return;

      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        addImageLayer(src, file.name, aspectRatio);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);

    if (e.target) e.target.value = '';
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 shadow-lg space-y-4">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-200 uppercase tracking-wider">
          <ImageIcon className="w-4 h-4 text-sky-400" /> Logo / Image Upload Toolkit
        </label>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-md shadow-sky-500/20 transition-all"
        >
          <Upload className="w-3.5 h-3.5" /> Upload Logo (+$25)
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/svg+xml,image/webp"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {activeImageLayer ? (
        <div className="space-y-3 pt-2 border-t border-slate-800">
          {/* Logo Name & Thumbnail Preview */}
          <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
            <img
              src={activeImageLayer.src}
              alt={activeImageLayer.name}
              className="w-12 h-12 object-contain bg-slate-900 rounded p-1 border border-slate-700"
            />
            <div className="flex-1 overflow-hidden">
              <span className="text-xs font-semibold text-slate-200 block truncate">{activeImageLayer.name}</span>
              <span className="text-[10px] text-slate-400 block font-mono">
                X: {activeImageLayer.x}% | Y: {activeImageLayer.y}%
              </span>
            </div>
          </div>

          {/* Scale Slider */}
          <div>
            <div className="flex justify-between text-[11px] text-slate-400 mb-1">
              <span>Image Scale</span>
              <span className="text-white font-mono">{activeImageLayer.scale.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min={0.2}
              max={2.5}
              step={0.05}
              value={activeImageLayer.scale}
              onChange={(e) =>
                updateLayer(activeSectionId, activeImageLayer.id, {
                  scale: parseFloat(e.target.value),
                })
              }
              className="w-full accent-sky-500"
            />
          </div>

          {/* Rotation Slider */}
          <div>
            <div className="flex justify-between text-[11px] text-slate-400 mb-1">
              <span>Rotation Angle</span>
              <span className="text-white font-mono">{activeImageLayer.rotation || 0}°</span>
            </div>
            <input
              type="range"
              min={0}
              max={360}
              value={activeImageLayer.rotation || 0}
              onChange={(e) =>
                updateLayer(activeSectionId, activeImageLayer.id, {
                  rotation: parseInt(e.target.value, 10),
                })
              }
              className="w-full accent-sky-500"
            />
          </div>

          {/* Position X / Y Coordinate Inputs */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] font-mono text-slate-400 mb-0.5 block">X Position (%):</label>
              <input
                type="number"
                min={0}
                max={100}
                value={activeImageLayer.x}
                onChange={(e) => updateLayer(activeSectionId, activeImageLayer.id, { x: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-mono text-slate-400 mb-0.5 block">Y Position (%):</label>
              <input
                type="number"
                min={0}
                max={100}
                value={activeImageLayer.y}
                onChange={(e) => updateLayer(activeSectionId, activeImageLayer.id, { y: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white"
              />
            </div>
          </div>

          {/* Delete Button */}
          <div className="flex justify-end pt-2 border-t border-slate-800">
            <button
              onClick={() => deleteLayer(activeSectionId, activeImageLayer.id)}
              className="flex items-center gap-1 text-rose-400 hover:text-rose-300 text-xs px-2.5 py-1 rounded-lg border border-rose-500/30 bg-rose-500/10 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Remove Image
            </button>
          </div>
        </div>
      ) : (
        <div className="text-xs text-slate-400 italic bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
          Upload transparent PNG, SVG, or JPG vector logo assets.
        </div>
      )}
    </div>
  );
};
