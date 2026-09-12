import { ConfigurationState, CustomSection, SectionZoneId } from '../types/configurator';

export const SECTION_DEFINITIONS: Record<SectionZoneId, { label: string; description: string }> = {
  roof_front: { label: 'Front Roof Slope', description: 'Main front facing canopy peak area' },
  roof_back: { label: 'Back Roof Slope', description: 'Rear canopy peak area' },
  roof_left: { label: 'Left Roof Slope', description: 'Left side canopy peak area' },
  roof_right: { label: 'Right Roof Slope', description: 'Right side canopy peak area' },
  valance_front: { label: 'Front Valance', description: 'Front overhang banner strip' },
  valance_back: { label: 'Back Valance', description: 'Rear overhang banner strip' },
  valance_left: { label: 'Left Valance', description: 'Left overhang banner strip' },
  valance_right: { label: 'Right Valance', description: 'Right overhang banner strip' },
  back_wall: { label: 'Back Wall Panel', description: 'Full back wall enclosure panel' },
};

const createDefaultSection = (id: SectionZoneId): CustomSection => ({
  id,
  label: SECTION_DEFINITIONS[id].label,
  description: SECTION_DEFINITIONS[id].description,
  backgroundColor: '', // Empty string inherits globalCanopyColor
  layers: [],
});

export const INITIAL_CONFIGURATION: ConfigurationState = {
  productId: 'canopy-tent-10x10',
  productTitle: 'Pro Custom Canopy Tent',
  variantSize: '6.5x6.5',
  frameFinish: 'aluminum',
  printingTechnique: 'dye_sublimation',
  wallOption: 'none',
  globalCanopyColor: '#1E293B',
  activeSectionId: 'roof_front',
  selectedLayerId: null,
  customNote: '',
  sections: {
    roof_front: {
      ...createDefaultSection('roof_front'),
      layers: [
        {
          id: 'text-1',
          type: 'text',
          text: 'YOUR BRAND HERE',
          fontFamily: 'Montserrat',
          fontSize: 32,
          fill: '#F8FAFC',
          x: 50,
          y: 50,
          rotation: 0,
          fontWeight: 'bold',
          fontStyle: 'normal',
          textAlign: 'center',
          visible: true,
        },
      ],
    },
    roof_back: createDefaultSection('roof_back'),
    roof_left: createDefaultSection('roof_left'),
    roof_right: createDefaultSection('roof_right'),
    valance_front: {
      ...createDefaultSection('valance_front'),
      layers: [
        {
          id: 'text-valance-1',
          type: 'text',
          text: 'WWW.YOURWEBSITE.COM',
          fontFamily: 'Oswald',
          fontSize: 22,
          fill: '#38BDF8',
          x: 50,
          y: 50,
          rotation: 0,
          fontWeight: 'bold',
          fontStyle: 'normal',
          textAlign: 'center',
          visible: true,
        },
      ],
    },
    valance_back: createDefaultSection('valance_back'),
    valance_left: createDefaultSection('valance_left'),
    valance_right: createDefaultSection('valance_right'),
    back_wall: createDefaultSection('back_wall'),
  },
};

export const PRESET_CANOPY_COLORS = [
  { name: 'Dark Slate', hex: '#1E293B' },
  { name: 'Midnight Black', hex: '#0F172A' },
  { name: 'Royal Blue', hex: '#1D4ED8' },
  { name: 'Crimson Red', hex: '#DC2626' },
  { name: 'Emerald Green', hex: '#059669' },
  { name: 'Pure White', hex: '#F8FAFC' },
  { name: 'Sunshine Yellow', hex: '#EAB308' },
  { name: 'Vibrant Orange', hex: '#EA580C' },
];

export const PRESET_FRAME_FINISHES = [
  { id: 'aluminum', label: 'Commercial Aluminum', desc: 'Standard rust-proof aluminum frame', surcharge: 0 },
  { id: 'black_anodized', label: 'Black Anodized Metal', desc: 'Sleek scratch-resistant black coating', surcharge: 50 },
  { id: 'heavy_steel', label: 'Heavy Duty Steel', desc: 'Wind-rated reinforced steel structure', surcharge: 80 },
];
