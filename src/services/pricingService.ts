import { ConfigurationState, PricingBreakdown } from '../types/configurator';

export const BASE_VARIANT_PRICES: Record<string, number> = {
  '5x5': 299.00,
  '6.5x6.5': 399.00,
  '8x8': 499.00,
};

export const FRAME_PRICES: Record<string, number> = {
  aluminum: 0,
  black_anodized: 50.00,
  heavy_steel: 80.00,
};

export const WALL_PRICES: Record<string, number> = {
  none: 0,
  back_wall: 75.00,
  full_enclosure: 180.00,
};

export const PRINTING_PRICES: Record<string, number> = {
  dye_sublimation: 40.00,
  uv_coating: 65.00,
  screen_print: 20.00,
};

export const COST_PER_TEXT_LAYER = 10.00;
export const COST_PER_IMAGE_LAYER = 25.00;

/**
 * Calculates pricing dynamically based on current Configuration JSON state.
 * Simulates a server API endpoint (/api/calculate-price).
 */
export async function calculatePriceApi(config: ConfigurationState): Promise<PricingBreakdown> {
  // Simulate API network latency (100ms)
  await new Promise((resolve) => setTimeout(resolve, 100));

  const basePrice = BASE_VARIANT_PRICES[config.variantSize] || 399.00;
  const frameUpgradeCost = FRAME_PRICES[config.frameFinish] || 0;
  const wallOptionCost = WALL_PRICES[config.wallOption] || 0;
  const printTechniqueCost = PRINTING_PRICES[config.printingTechnique] || 40.00;

  // Calculate layer counts across all sections
  let totalTextLayers = 0;
  let totalImageLayers = 0;

  Object.values(config.sections).forEach((section) => {
    section.layers.forEach((layer) => {
      if (layer.type === 'text') totalTextLayers++;
      if (layer.type === 'image') totalImageLayers++;
    });
  });

  const textLayersCost = totalTextLayers * COST_PER_TEXT_LAYER;
  const imageLayersCost = totalImageLayers * COST_PER_IMAGE_LAYER;

  // Color surcharge for custom non-standard hexes
  const colorSurcharge = 0;

  const subtotal =
    basePrice +
    frameUpgradeCost +
    wallOptionCost +
    printTechniqueCost +
    textLayersCost +
    imageLayersCost +
    colorSurcharge;

  const taxEstimate = Math.round(subtotal * 0.08 * 100) / 100; // 8% estimated tax
  const totalPrice = Math.round((subtotal + taxEstimate) * 100) / 100;

  const breakdownItems = [
    { label: `Base Tent Canopy (${config.variantSize} ft)`, amount: basePrice },
    { label: `Frame Finish (${config.frameFinish.replace('_', ' ')})`, amount: frameUpgradeCost },
    { label: `Wall Enclosure (${config.wallOption.replace('_', ' ')})`, amount: wallOptionCost },
    { label: `Print Technique (${config.printingTechnique.replace('_', ' ')})`, amount: printTechniqueCost },
  ];

  if (totalTextLayers > 0) {
    breakdownItems.push({ label: `Text Layers (${totalTextLayers} x $${COST_PER_TEXT_LAYER})`, amount: textLayersCost });
  }

  if (totalImageLayers > 0) {
    breakdownItems.push({ label: `Logo Image Uploads (${totalImageLayers} x $${COST_PER_IMAGE_LAYER})`, amount: imageLayersCost });
  }

  return {
    basePrice,
    variantSizeAdjustment: 0,
    frameUpgradeCost,
    wallOptionCost,
    textLayersCost,
    imageLayersCost,
    colorSurcharge,
    printTechniqueCost,
    subtotal,
    taxEstimate,
    totalPrice,
    currency: 'USD',
    breakdownItems,
  };
}
