import React from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { SECTION_DEFINITIONS } from '../../schema/tentProductSchema';
import { SectionZoneId } from '../../types/configurator';
import { Layout, CheckCircle2 } from 'lucide-react';

export const SectionSelector: React.FC = () => {
  const activeSectionId = useConfiguratorStore((state) => state.config.activeSectionId);
  const setActiveSection = useConfiguratorStore((state) => state.setActiveSection);
  const sections = useConfiguratorStore((state) => state.config.sections);

  const zones: SectionZoneId[] = [
    'roof_front',
    'roof_back',
    'roof_left',
    'roof_right',
    'valance_front',
    'valance_back',
    'valance_left',
    'valance_right',
    'back_wall',
  ];

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <Layout className="w-4 h-4 text-sky-400" />
        <h4 className="font-semibold text-slate-200 text-sm">Select Printable Section Zone</h4>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
        {zones.map((zoneId) => {
          const meta = SECTION_DEFINITIONS[zoneId];
          const isActive = activeSectionId === zoneId;
          const layerCount = sections[zoneId]?.layers.length || 0;

          return (
            <button
              key={zoneId}
              onClick={() => setActiveSection(zoneId)}
              className={`relative flex flex-col items-start p-2.5 rounded-xl border text-left transition-all ${
                isActive
                  ? 'bg-sky-500/10 border-sky-500 text-white ring-1 ring-sky-500 shadow-md'
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
              }`}
            >
              <span className="text-xs font-medium leading-tight">{meta.label}</span>
              <div className="flex items-center justify-between w-full mt-1.5 text-[10px] text-slate-400">
                <span>{layerCount > 0 ? `${layerCount} layer(s)` : 'Empty'}</span>
                {layerCount > 0 && <CheckCircle2 className="w-3 h-3 text-sky-400" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
