import { ConfigurationState, PricingBreakdown, ShopifyLineItemProperties, ShopifyCartItem } from '../types/configurator';

/**
 * Transforms the final configuration state and calculated pricing into Shopify Line Item Properties.
 */
export function buildShopifyProperties(
  config: ConfigurationState,
  pricing: PricingBreakdown
): ShopifyLineItemProperties {
  const configId = `CFG-${Date.now().toString(36).toUpperCase()}`;

  let totalTextCount = 0;
  let totalLogoCount = 0;
  const customSummaries: string[] = [];

  Object.entries(config.sections).forEach(([secId, section]) => {
    if (section.layers.length > 0) {
      const secSummary: string[] = [];
      section.layers.forEach((layer) => {
        if (layer.type === 'text') {
          totalTextCount++;
          secSummary.push(`Text: "${layer.text}"`);
        } else if (layer.type === 'image') {
          totalLogoCount++;
          secSummary.push(`Logo: ${layer.name || 'Custom Image'}`);
        }
      });
      customSummaries.push(`[${section.label}]: ${secSummary.join(', ')}`);
    }
  });

  const metadataJson = JSON.stringify({
    configId,
    timestamp: new Date().toISOString(),
    variantSize: config.variantSize,
    frameFinish: config.frameFinish,
    globalCanopyColor: config.globalCanopyColor,
    printingTechnique: config.printingTechnique,
    sections: config.sections,
  });

  return {
    '_config_id': configId,
    'Size': `${config.variantSize} ft Heavy Duty Canopy`,
    'Frame Finish': config.frameFinish.toUpperCase().replace('_', ' '),
    'Wall Addon': config.wallOption.toUpperCase().replace('_', ' '),
    'Base Color': config.globalCanopyColor,
    'Print Technique': config.printingTechnique.toUpperCase().replace('_', ' '),
    'Total Custom Layers': `${totalTextCount} Text, ${totalLogoCount} Logos`,
    'Custom Summary': customSummaries.length > 0 ? customSummaries.join(' | ') : 'Solid Color (No Custom Graphics)',
    '_production_pdf_metadata': metadataJson,
  };
}

/**
 * Simulates Shopify AJAX Cart API (/cart/add.js)
 */
export async function simulateShopifyAddToCart(
  config: ConfigurationState,
  pricing: PricingBreakdown,
  previewThumbnail: string = ''
): Promise<ShopifyCartItem> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  const properties = buildShopifyProperties(config, pricing);

  return {
    id: `cart-item-${Date.now()}`,
    title: `${config.productTitle} (${config.variantSize} ft)`,
    price: pricing.totalPrice,
    quantity: 1,
    properties,
    imageThumbnail: previewThumbnail || 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=300&auto=format&fit=crop&q=60',
  };
}
