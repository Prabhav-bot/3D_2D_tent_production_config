import { create } from 'zustand';
import {
  ConfigurationState,
  CustomSection,
  FrameFinish,
  GraphicLayer,
  ImageLayer,
  PricingBreakdown,
  SectionZoneId,
  ShopifyCartItem,
  TentSizeVariant,
  TextLayer,
  WallAttachmentOption,
  PrintingTechnique,
} from '../types/configurator';
import { INITIAL_CONFIGURATION } from '../schema/tentProductSchema';
import { calculatePriceApi } from '../services/pricingService';
import { simulateShopifyAddToCart } from '../services/shopifyService';

interface ConfiguratorStore {
  // State
  config: ConfigurationState;
  pricing: PricingBreakdown;
  history: ConfigurationState[];
  historyIndex: number;
  isCalculatingPrice: boolean;

  // Modals & Drawers
  isCartOpen: boolean;
  isPdfModalOpen: boolean;
  isShopifyPayloadOpen: boolean;
  cartItems: ShopifyCartItem[];

  // 3D Controls
  cameraPreset: 'front' | 'back' | 'left' | 'right' | 'top' | 'iso';
  autoRotate3d: boolean;

  // Actions - Configuration
  setVariantSize: (size: TentSizeVariant) => void;
  setFrameFinish: (finish: FrameFinish) => void;
  setWallOption: (option: WallAttachmentOption) => void;
  setPrintingTechnique: (technique: PrintingTechnique) => void;
  setGlobalCanopyColor: (hex: string) => void;
  setSectionBackgroundColor: (sectionId: SectionZoneId, hex: string) => void;

  // Actions - Active Selection
  setActiveSection: (sectionId: SectionZoneId) => void;
  setSelectedLayer: (layerId: string | null) => void;

  // Actions - Layers
  addTextLayer: (sectionId?: SectionZoneId) => void;
  addImageLayer: (src: string, name: string, aspectRatio?: number, sectionId?: SectionZoneId) => void;
  updateLayer: (sectionId: SectionZoneId, layerId: string, updates: Partial<GraphicLayer>) => void;
  deleteLayer: (sectionId: SectionZoneId, layerId: string) => void;
  reorderLayers: (sectionId: SectionZoneId, newLayers: GraphicLayer[]) => void;

  // History (Undo/Redo)
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;

  // Modals & Cart Actions
  setCartOpen: (isOpen: boolean) => void;
  setPdfModalOpen: (isOpen: boolean) => void;
  setShopifyPayloadOpen: (isOpen: boolean) => void;
  addToCart: (thumbnail?: string) => Promise<void>;
  
  // 3D Controls
  setCameraPreset: (preset: 'front' | 'back' | 'left' | 'right' | 'top' | 'iso') => void;
  toggleAutoRotate3d: () => void;

  // Refresh pricing
  refreshPricing: () => Promise<void>;
}

const DEFAULT_PRICING: PricingBreakdown = {
  basePrice: 399,
  variantSizeAdjustment: 0,
  frameUpgradeCost: 0,
  wallOptionCost: 0,
  textLayersCost: 10,
  imageLayersCost: 0,
  colorSurcharge: 0,
  printTechniqueCost: 40,
  subtotal: 449,
  taxEstimate: 35.92,
  totalPrice: 484.92,
  currency: 'USD',
  breakdownItems: [
    { label: 'Base Tent Canopy (6.5x6.5 ft)', amount: 399 },
    { label: 'Print Technique (dye sublimation)', amount: 40 },
    { label: 'Text Layers (1 x $10)', amount: 10 },
  ],
};

export const useConfiguratorStore = create<ConfiguratorStore>((set, get) => {
  const saveToHistory = (newConfig: ConfigurationState) => {
    const { history, historyIndex } = get();
    const updatedHistory = history.slice(0, historyIndex + 1);
    updatedHistory.push(newConfig);

    set({
      config: newConfig,
      history: updatedHistory,
      historyIndex: updatedHistory.length - 1,
      canUndo: updatedHistory.length > 1,
      canRedo: false,
    });

    get().refreshPricing();
  };

  return {
    config: INITIAL_CONFIGURATION,
    pricing: DEFAULT_PRICING,
    history: [INITIAL_CONFIGURATION],
    historyIndex: 0,
    isCalculatingPrice: false,
    canUndo: false,
    canRedo: false,

    isCartOpen: false,
    isPdfModalOpen: false,
    isShopifyPayloadOpen: false,
    cartItems: [],

    cameraPreset: 'front',
    autoRotate3d: false,

    refreshPricing: async () => {
      set({ isCalculatingPrice: true });
      try {
        const pricing = await calculatePriceApi(get().config);
        set({ pricing, isCalculatingPrice: false });
      } catch (err) {
        console.error('Pricing calculation failed', err);
        set({ isCalculatingPrice: false });
      }
    },

    setVariantSize: (variantSize) => {
      const newConfig = { ...get().config, variantSize };
      saveToHistory(newConfig);
    },

    setFrameFinish: (frameFinish) => {
      const newConfig = { ...get().config, frameFinish };
      saveToHistory(newConfig);
    },

    setWallOption: (wallOption) => {
      const newConfig = { ...get().config, wallOption };
      saveToHistory(newConfig);
    },

    setPrintingTechnique: (printingTechnique) => {
      const newConfig = { ...get().config, printingTechnique };
      saveToHistory(newConfig);
    },

    setGlobalCanopyColor: (globalCanopyColor) => {
      const newConfig = { ...get().config, globalCanopyColor };
      saveToHistory(newConfig);
    },

    setSectionBackgroundColor: (sectionId, backgroundColor) => {
      const { config } = get();
      const currentSec = config.sections[sectionId];
      if (!currentSec) return;

      const newSections = {
        ...config.sections,
        [sectionId]: { ...currentSec, backgroundColor },
      };

      saveToHistory({ ...config, sections: newSections });
    },

    setActiveSection: (activeSectionId) => {
      set((state) => ({
        config: { ...state.config, activeSectionId, selectedLayerId: null },
      }));
    },

    setSelectedLayer: (selectedLayerId) => {
      set((state) => ({
        config: { ...state.config, selectedLayerId },
      }));
    },

    addTextLayer: (targetSectionId) => {
      const { config } = get();
      const secId = targetSectionId || config.activeSectionId;
      const section = config.sections[secId];
      if (!section) return;

      const isPlaceholder = (l: GraphicLayer) =>
        l.type === 'text' &&
        (l.text === 'YOUR BRAND HERE' || l.text === 'WWW.YOURWEBSITE.COM' || l.id === 'text-1' || l.id === 'text-valance-1');

      const existingLayers = section.layers.filter((l) => !isPlaceholder(l));

      const newLayer: TextLayer = {
        id: `text-${Date.now()}`,
        type: 'text',
        text: 'NEW CUSTOM TEXT',
        fontFamily: 'Inter',
        fontSize: 28,
        fill: '#FFFFFF',
        x: 50,
        y: 50,
        rotation: 0,
        fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'center',
        visible: true,
      };

      const updatedSection: CustomSection = {
        ...section,
        layers: [...existingLayers, newLayer],
      };

      const newConfig: ConfigurationState = {
        ...config,
        selectedLayerId: newLayer.id,
        sections: { ...config.sections, [secId]: updatedSection },
      };

      saveToHistory(newConfig);
    },

    addImageLayer: (src, name, aspectRatio = 1, targetSectionId) => {
      const { config } = get();
      const secId = targetSectionId || config.activeSectionId;
      const section = config.sections[secId];
      if (!section) return;

      const isPlaceholder = (l: GraphicLayer) =>
        l.type === 'text' &&
        (l.text === 'YOUR BRAND HERE' || l.text === 'WWW.YOURWEBSITE.COM' || l.id === 'text-1' || l.id === 'text-valance-1');

      const existingLayers = section.layers.filter((l) => !isPlaceholder(l));

      const newLayer: ImageLayer = {
        id: `img-${Date.now()}`,
        type: 'image',
        src,
        name,
        scale: 1,
        x: 50,
        y: 50,
        rotation: 0,
        opacity: 1,
        aspectRatio,
        visible: true,
      };

      const updatedSection: CustomSection = {
        ...section,
        layers: [...existingLayers, newLayer],
      };

      const newConfig: ConfigurationState = {
        ...config,
        selectedLayerId: newLayer.id,
        sections: { ...config.sections, [secId]: updatedSection },
      };

      saveToHistory(newConfig);
    },

    updateLayer: (sectionId, layerId, updates) => {
      const { config } = get();
      const section = config.sections[sectionId];
      if (!section) return;

      const updatedLayers = section.layers.map((l) =>
        l.id === layerId ? ({ ...l, ...updates } as GraphicLayer) : l
      );

      const updatedSection: CustomSection = {
        ...section,
        layers: updatedLayers,
      };

      const newConfig: ConfigurationState = {
        ...config,
        sections: { ...config.sections, [sectionId]: updatedSection },
      };

      saveToHistory(newConfig);
    },

    deleteLayer: (sectionId, layerId) => {
      const { config } = get();
      const section = config.sections[sectionId];
      if (!section) return;

      const updatedLayers = section.layers.filter((l) => l.id !== layerId);

      const updatedSection: CustomSection = {
        ...section,
        layers: updatedLayers,
      };

      const newConfig: ConfigurationState = {
        ...config,
        selectedLayerId: config.selectedLayerId === layerId ? null : config.selectedLayerId,
        sections: { ...config.sections, [sectionId]: updatedSection },
      };

      saveToHistory(newConfig);
    },

    reorderLayers: (sectionId, newLayers) => {
      const { config } = get();
      const section = config.sections[sectionId];
      if (!section) return;

      const updatedSection: CustomSection = {
        ...section,
        layers: newLayers,
      };

      saveToHistory({
        ...config,
        sections: { ...config.sections, [sectionId]: updatedSection },
      });
    },

    undo: () => {
      const { history, historyIndex } = get();
      if (historyIndex > 0) {
        const prevIndex = historyIndex - 1;
        const prevConfig = history[prevIndex];
        set({
          config: prevConfig,
          historyIndex: prevIndex,
          canUndo: prevIndex > 0,
          canRedo: true,
        });
        get().refreshPricing();
      }
    },

    redo: () => {
      const { history, historyIndex } = get();
      if (historyIndex < history.length - 1) {
        const nextIndex = historyIndex + 1;
        const nextConfig = history[nextIndex];
        set({
          config: nextConfig,
          historyIndex: nextIndex,
          canUndo: true,
          canRedo: nextIndex < history.length - 1,
        });
        get().refreshPricing();
      }
    },

    setCartOpen: (isCartOpen) => set({ isCartOpen }),
    setPdfModalOpen: (isPdfModalOpen) => set({ isPdfModalOpen }),
    setShopifyPayloadOpen: (isShopifyPayloadOpen) => set({ isShopifyPayloadOpen }),

    addToCart: async (thumbnail) => {
      const { config, pricing } = get();
      const cartItem = await simulateShopifyAddToCart(config, pricing, thumbnail);
      set((state) => ({
        cartItems: [cartItem, ...state.cartItems],
        isCartOpen: true,
      }));
    },

    setCameraPreset: (cameraPreset) => set({ cameraPreset }),
    toggleAutoRotate3d: () => set((state) => ({ autoRotate3d: !state.autoRotate3d })),
  };
});
