import React from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { GraphicLayer } from '../../types/configurator';
import { Layers, Eye, EyeOff, Trash2, ArrowUp, ArrowDown, Type, Image as ImageIcon } from 'lucide-react';

export const LayerManagerList: React.FC = () => {
  const config = useConfiguratorStore((state) => state.config);
  const activeSectionId = config.activeSectionId;
  const activeSection = config.sections[activeSectionId];
  const selectedLayerId = config.selectedLayerId;

  const setSelectedLayer = useConfiguratorStore((state) => state.setSelectedLayer);
  const updateLayer = useConfiguratorStore((state) => state.updateLayer);
  const deleteLayer = useConfiguratorStore((state) => state.deleteLayer);
  const reorderLayers = useConfiguratorStore((state) => state.reorderLayers);

  const layers = activeSection?.layers || [];

  const moveLayer = (index: number, direction: 'up' | 'down') => {
    const newLayers = [...layers];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newLayers.length) return;

    const temp = newLayers[index];
    newLayers[index] = newLayers[targetIndex];
    newLayers[targetIndex] = temp;

    reorderLayers(activeSectionId, newLayers);
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-200 uppercase tracking-wider">
          <Layers className="w-4 h-4 text-sky-400" /> Active Section Layers ({layers.length})
        </label>
      </div>

      {layers.length > 0 ? (
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {layers.map((layer, index) => {
            const isSelected = selectedLayerId === layer.id;

            return (
              <div
                key={layer.id}
                onClick={() => setSelectedLayer(layer.id)}
                className={`flex items-center justify-between p-2 rounded-xl border text-xs cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-sky-500/10 border-sky-500 text-white ring-1 ring-sky-500'
                    : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  {layer.type === 'text' ? (
                    <Type className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  ) : (
                    <ImageIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  )}
                  <span className="truncate font-medium">
                    {layer.type === 'text' ? layer.text || 'Text Layer' : layer.name || 'Logo Image'}
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                  {/* Reorder Buttons */}
                  <button
                    onClick={() => moveLayer(index, 'up')}
                    disabled={index === 0}
                    className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30"
                    title="Move Layer Up"
                  >
                    <ArrowUp className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => moveLayer(index, 'down')}
                    disabled={index === layers.length - 1}
                    className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30"
                    title="Move Layer Down"
                  >
                    <ArrowDown className="w-3 h-3" />
                  </button>

                  {/* Visibility Toggle */}
                  <button
                    onClick={() => updateLayer(activeSectionId, layer.id, { visible: !layer.visible })}
                    className="p-1 rounded text-slate-400 hover:text-white"
                    title={layer.visible ? 'Hide Layer' : 'Show Layer'}
                  >
                    {layer.visible ? <Eye className="w-3.5 h-3.5 text-sky-400" /> : <EyeOff className="w-3.5 h-3.5 text-slate-500" />}
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteLayer(activeSectionId, layer.id)}
                    className="p-1 rounded text-rose-400 hover:text-rose-300"
                    title="Delete Layer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-xs text-slate-400 italic bg-slate-950/60 p-3 rounded-xl border border-slate-800/60 text-center">
          No graphic layers in this section. Add text or upload logos to customize.
        </div>
      )}
    </div>
  );
};
