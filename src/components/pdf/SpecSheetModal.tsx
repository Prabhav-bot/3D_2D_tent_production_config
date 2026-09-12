import React, { useState } from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { FileText, Download, X, Check, Loader2, FileCheck, Layers, DollarSign } from 'lucide-react';
import { generateProductionPdf } from '../../services/pdfService';

interface SpecSheetModalProps {
  canvas3dElement: HTMLCanvasElement | null;
  flat2dCanvasElement: HTMLCanvasElement | null;
}

export const SpecSheetModal: React.FC<SpecSheetModalProps> = ({
  canvas3dElement,
  flat2dCanvasElement,
}) => {
  const isPdfModalOpen = useConfiguratorStore((state) => state.isPdfModalOpen);
  const setPdfModalOpen = useConfiguratorStore((state) => state.setPdfModalOpen);
  const config = useConfiguratorStore((state) => state.config);
  const pricing = useConfiguratorStore((state) => state.pricing);

  const [isGenerating, setIsGenerating] = useState(false);

  if (!isPdfModalOpen) return null;

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      await generateProductionPdf(config, pricing, canvas3dElement, flat2dCanvasElement);
    } catch (e) {
      console.error('PDF generation error', e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100">Production Summary PDF Spec Sheet</h3>
              <p className="text-xs text-slate-400">Print-ready manufacturing specification sheet with 2D & 3D snapshots</p>
            </div>
          </div>
          <button
            onClick={() => setPdfModalOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Spec Overview Card */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200">Specification Metadata</span>
            <span className="text-xs font-mono text-sky-400 font-semibold">SKU: CANOPY-{config.variantSize}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Model Size</span>
              <strong className="text-slate-100">{config.variantSize} FT Commercial Tent</strong>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Frame Finish</span>
              <strong className="text-slate-100 capitalize">{config.frameFinish.replace('_', ' ')}</strong>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Print Technology</span>
              <strong className="text-slate-100 capitalize">{config.printingTechnique.replace('_', ' ')}</strong>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Total Price (Inc Tax)</span>
              <strong className="text-emerald-400">${pricing.totalPrice.toFixed(2)} USD</strong>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-300 pt-1">
            <FileCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Includes 2D high-res layout snapshots, vector placement coordinate matrix, and Shopify order barcodes.</span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={() => setPdfModalOpen(false)}
            className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-sky-500/20 transition-all disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Generating PDF...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" /> Download Production PDF
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
