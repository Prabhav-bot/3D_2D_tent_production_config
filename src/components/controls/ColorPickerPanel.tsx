import React from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { PRESET_CANOPY_COLORS } from '../../schema/tentProductSchema';
import { Palette, Paintbrush } from 'lucide-react';

export const ColorPickerPanel: React.FC = () => {
  const config = useConfiguratorStore((state) => state.config);
  const setGlobalCanopyColor = useConfiguratorStore((state) => state.setGlobalCanopyColor);
  const setSectionBackgroundColor = useConfiguratorStore((state) => state.setSectionBackgroundColor);

  const activeSection = config.sections[config.activeSectionId];

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 shadow-lg space-y-4">
      {/* 1. Global Canopy Color */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-200 uppercase tracking-wider">
            <Palette className="w-4 h-4 text-sky-400" /> Global Canopy Color
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={config.globalCanopyColor}
              onChange={(e) => setGlobalCanopyColor(e.target.value)}
              className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent"
              title="Custom Hex Picker"
            />
            <span className="text-xs font-mono text-slate-400 uppercase">{config.globalCanopyColor}</span>
          </div>
        </div>

        {/* Color Swatches Grid */}
        <div className="flex flex-wrap gap-2">
          {PRESET_CANOPY_COLORS.map((c) => {
            const isSelected = config.globalCanopyColor.toLowerCase() === c.hex.toLowerCase();
            return (
              <button
                key={c.hex}
                onClick={() => setGlobalCanopyColor(c.hex)}
                className={`group relative w-8 h-8 rounded-xl transition-transform ${
                  isSelected ? 'scale-110 ring-2 ring-sky-400 ring-offset-2 ring-offset-slate-900' : 'hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              >
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow border border-slate-700">
                  {c.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Active Section Background Override */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Paintbrush className="w-4 h-4 text-sky-400" />
          <div>
            <span className="text-xs font-semibold text-slate-200 block">Section Background Override</span>
            <span className="text-[10px] text-slate-400">Override background color for {activeSection?.label}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={activeSection?.backgroundColor || config.globalCanopyColor}
            onChange={(e) => setSectionBackgroundColor(config.activeSectionId, e.target.value)}
            className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent"
            title="Custom Section Background Color"
          />
          <button
            onClick={() => setSectionBackgroundColor(config.activeSectionId, '')}
            className="text-[10px] text-sky-400 hover:underline"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
