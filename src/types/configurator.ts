export type TentSizeVariant = '5x5' | '6.5x6.5' | '8x8';

export type FrameFinish = 'aluminum' | 'black_anodized' | 'heavy_steel';

export type PrintingTechnique = 'dye_sublimation' | 'uv_coating' | 'screen_print';

export type WallAttachmentOption = 'none' | 'back_wall' | 'full_enclosure';

export interface TextLayer {
  id: string;
  type: 'text';
  text: string;
  fontFamily: 'Inter' | 'Montserrat' | 'Oswald' | 'Playfair Display' | 'Courier Prime' | 'Impact';
  fontSize: number; // in px or relative units
  fill: string; // hex code
  x: number; // 0 - 100 percentage
  y: number; // 0 - 100 percentage
  rotation: number; // degrees 0-360
  fontWeight: 'normal' | 'bold';
  fontStyle: 'normal' | 'italic';
  textAlign: 'left' | 'center' | 'right';
  visible: boolean;
}

export interface ImageLayer {
  id: string;
  type: 'image';
  src: string; // base64 or object URL
  name: string;
  scale: number; // scale factor 0.1 to 3
  x: number; // 0 - 100 percentage
  y: number; // 0 - 100 percentage
  rotation: number; // degrees 0-360
  opacity: number; // 0 to 1
  aspectRatio: number;
  visible: boolean;
}

export type GraphicLayer = TextLayer | ImageLayer;

export type SectionZoneId =
  | 'roof_front'
  | 'roof_back'
  | 'roof_left'
  | 'roof_right'
  | 'valance_front'
  | 'valance_back'
  | 'valance_left'
  | 'valance_right'
  | 'back_wall';

export interface CustomSection {
  id: SectionZoneId;
  label: string;
  description: string;
  backgroundColor: string; // hex
  layers: GraphicLayer[];
}

export interface ConfigurationState {
  productId: string;
  productTitle: string;
  variantSize: TentSizeVariant;
  frameFinish: FrameFinish;
  printingTechnique: PrintingTechnique;
  wallOption: WallAttachmentOption;
  globalCanopyColor: string; // hex
  sections: Record<SectionZoneId, CustomSection>;
  activeSectionId: SectionZoneId;
  selectedLayerId: string | null;
  customNote: string;
}

export interface PricingBreakdown {
  basePrice: number;
  variantSizeAdjustment: number;
  frameUpgradeCost: number;
  wallOptionCost: number;
  textLayersCost: number;
  imageLayersCost: number;
  colorSurcharge: number;
  printTechniqueCost: number;
  subtotal: number;
  taxEstimate: number;
  totalPrice: number;
  currency: string;
  breakdownItems: Array<{ label: string; amount: number }>;
}

export interface ShopifyLineItemProperties {
  '_config_id': string;
  'Size': string;
  'Frame Finish': string;
  'Wall Addon': string;
  'Base Color': string;
  'Print Technique': string;
  'Total Custom Layers': string;
  'Custom Summary': string;
  '_production_pdf_metadata': string;
}

export interface ShopifyCartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  properties: ShopifyLineItemProperties;
  imageThumbnail: string;
}
