import React from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { TextLayer } from '../../types/configurator';
import { Type, Plus, Trash2, AlignLeft, AlignCenter, AlignRight, Bold, Italic } from 'lucide-react';

export const TextLayerTool: React.FC = () => {
  const config = useConfiguratorStore((state) => state.config);
  const activeSectionId = config.activeSectionId;
  const activeSection = config.sections[activeSectionId];
  const selectedLayerId = config.selectedLayerId;

  const addTextLayer = useConfiguratorStore((state) => state.addTextLayer);
  const updateLayer = useConfiguratorStore((state) => state.updateLayer);
  const deleteLayer = useConfiguratorStore((state) => state.deleteLayer);

  const activeTextLayer = activeSection?.layers.find(
    (l) => l.id === selectedLayerId && l.type === 'text'
  ) as TextLayer | undefined;

  const fontOptions = ['Inter', 'Montserrat', 'Oswald', 'Playfair Display', 'Courier Prime', 'Impact'] as const;

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 shadow-lg space-y-4">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-200 uppercase tracking-wider">
          <Type className="w-4 h-4 text-sky-400" /> Text Graphic Layer Toolkit
        </label>
        <button
          onClick={() => addTextLayer()}
          className="flex items-center gap-1.5 bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-md shadow-sky-500/20 transition-all"
        >
          <Plus className="w-3.5 h-3.5" /> Add Text Layer (+$10)
        </button>
      </div>

      {activeTextLayer ? (
        <div className="space-y-3 pt-2 border-t border-slate-800">
          {/* Text String Input */}
          <div>
            <label className="text-[11px] font-medium text-slate-400 mb-1 block">Text Content</label>
            <input
              type="text"
              value={activeTextLayer.text}
              onFocus={(e) => {
                if (e.target.value === 'YOUR BRAND HERE' || e.target.value === 'WWW.YOURWEBSITE.COM') {
                  e.target.select();
                }
              }}
              onChange={(e) => updateLayer(activeSectionId, activeTextLayer.id, { text: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500 font-medium"
              placeholder="Enter custom text..."
            />
          </div>

          {/* Font Family & Color */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-medium text-slate-400 mb-1 block">Font Family</label>
              <select
                value={activeTextLayer.fontFamily}
                onChange={(e) =>
                  updateLayer(activeSectionId, activeTextLayer.id, {
                    fontFamily: e.target.value as any,
                  })
                }
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
              >
                {fontOptions.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-medium text-slate-400 mb-1 block">Text Color</label>
              <div className="flex items-center gap-2 bg-slate-950 border border-slate-700 rounded-xl p-1 px-2">
                <input
                  type="color"
                  value={activeTextLayer.fill}
                  onChange={(e) => updateLayer(activeSectionId, activeTextLayer.id, { fill: e.target.value })}
                  className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent"
                />
                <span className="text-xs font-mono text-slate-300 uppercase">{activeTextLayer.fill}</span>
              </div>
            </div>
          </div>

          {/* Font Size & Rotation Sliders */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                <span>Font Size</span>
                <span className="text-white font-mono">{activeTextLayer.fontSize}px</span>
              </div>
              <input
                type="range"
                min={12}
                max={96}
                value={activeTextLayer.fontSize}
                onChange={(e) =>
                  updateLayer(activeSectionId, activeTextLayer.id, {
                    fontSize: parseInt(e.target.value, 10),
                  })
                }
                className="w-full accent-sky-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                <span>Rotation</span>
                <span className="text-white font-mono">{activeTextLayer.rotation || 0}°</span>
              </div>
              <input
                type="range"
                min={0}
                max={360}
                value={activeTextLayer.rotation || 0}
                onChange={(e) =>
                  updateLayer(activeSectionId, activeTextLayer.id, {
                    rotation: parseInt(e.target.value, 10),
                  })
                }
                className="w-full accent-sky-500"
              />
            </div>
          </div>

          {/* Position X / Y Coordinate Numeric Inputs */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] font-mono text-slate-400 mb-0.5 block">X Coordinate (%):</label>
              <input
                type="number"
                min={0}
                max={100}
                value={activeTextLayer.x}
                onChange={(e) => updateLayer(activeSectionId, activeTextLayer.id, { x: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-mono text-slate-400 mb-0.5 block">Y Coordinate (%):</label>
              <input
                type="number"
                min={0}
                max={100}
                value={activeTextLayer.y}
                onChange={(e) => updateLayer(activeSectionId, activeTextLayer.id, { y: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white"
              />
            </div>
          </div>

          {/* Style Toggles & Delete Layer */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() =>
                  updateLayer(activeSectionId, activeTextLayer.id, {
                    fontWeight: activeTextLayer.fontWeight === 'bold' ? 'normal' : 'bold',
                  })
                }
                className={`p-1.5 rounded-lg text-xs ${
                  activeTextLayer.fontWeight === 'bold' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Bold"
              >
                <Bold className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() =>
                  updateLayer(activeSectionId, activeTextLayer.id, {
                    fontStyle: activeTextLayer.fontStyle === 'italic' ? 'normal' : 'italic',
                  })
                }
                className={`p-1.5 rounded-lg text-xs ${
                  activeTextLayer.fontStyle === 'italic' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Italic"
              >
                <Italic className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={() => deleteLayer(activeSectionId, activeTextLayer.id)}
              className="flex items-center gap-1 text-rose-400 hover:text-rose-300 text-xs px-2.5 py-1 rounded-lg border border-rose-500/30 bg-rose-500/10 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete Layer
            </button>
          </div>
        </div>
      ) : (
        <div className="text-xs text-slate-400 italic bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
          Select a text layer on the 2D canvas or click "+ Add Text Layer" to configure typography.
        </div>
      )}
    </div>
  );
};
