import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Map, 
  Eye, 
  Sparkles, 
  CheckCircle2, 
  FileCheck, 
  ShieldCheck, 
  ExternalLink,
  Layers,
  BookOpen,
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { DocumentResource } from '../types';
import { BrochureReaderModal } from './BrochureReaderModal';
import { generateOfficialBrochurePDF } from '../utils/pdfGenerator';

interface DocumentCenterProps {
  documents: DocumentResource[];
  onUpdateDocuments?: (docs: DocumentResource[]) => void;
  onOpenPayment?: () => void;
  onOpenContact?: () => void;
  onScheduleTour?: (projectName: string) => void;
}

export const DocumentCenter: React.FC<DocumentCenterProps> = ({
  documents,
  onOpenPayment,
  onOpenContact,
  onScheduleTour
}) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Brochure' | 'Site Plan' | 'Floor Plan' | 'Financing Guide'>('All');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [selectedDocumentForReading, setSelectedDocumentForReading] = useState<DocumentResource | null>(null);

  const filteredDocs = activeFilter === 'All' 
    ? documents 
    : documents.filter((d) => d.type === activeFilter);

  const handleDownload = async (e: React.MouseEvent, doc: DocumentResource) => {
    e.stopPropagation();
    setDownloadingId(doc.id);
    
    try {
      if (doc.fileUrl && doc.fileUrl !== '#' && !doc.fileUrl.startsWith('data:text/plain')) {
        // If data URL or external URL
        if (doc.fileUrl.startsWith('data:')) {
          // Convert data URI to Blob for robust downloading across all browsers
          const arr = doc.fileUrl.split(',');
          const mime = arr[0].match(/:(.*?);/)?.[1] || 'application/pdf';
          const bstr = atob(arr[1]);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          const blob = new Blob([u8arr], { type: mime });
          const blobUrl = URL.createObjectURL(blob);
          const element = window.document.createElement('a');
          element.href = blobUrl;
          element.download = `${doc.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
          window.document.body.appendChild(element);
          element.click();
          window.document.body.removeChild(element);
          setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
        } else {
          const element = window.document.createElement('a');
          element.href = doc.fileUrl;
          element.download = `${doc.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
          window.document.body.appendChild(element);
          element.click();
          window.document.body.removeChild(element);
        }
      } else {
        // Generate authentic multi-page PDF with accurate metric specs & Kaabsan branding
        const pdfBlob = await generateOfficialBrochurePDF(doc);
        const blobUrl = URL.createObjectURL(pdfBlob);
        const element = window.document.createElement('a');
        element.href = blobUrl;
        element.download = `${doc.title.replace(/[^a-zA-Z0-9]/g, '_')}_Official.pdf`;
        window.document.body.appendChild(element);
        element.click();
        window.document.body.removeChild(element);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
      }

      setDownloadingId(null);
      setDownloadSuccess(doc.id);
      setTimeout(() => setDownloadSuccess(null), 3000);
    } catch (err) {
      console.error('Error downloading brochure:', err);
      setDownloadingId(null);
    }
  };

  return (
    <section id="downloads" className="py-20 bg-white border-y border-[#E5E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C2A55D]/15 border border-[#C2A55D]/30 text-[#8C733E] text-xs font-semibold uppercase tracking-wider mb-3">
              <FileCheck className="w-3.5 h-3.5" /> Official Downloads & Blueprints
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1A1A]">
              Brochures & Master Site Plans
            </h2>
            <p className="mt-2 text-[#6B665E] max-w-2xl text-sm sm:text-base leading-relaxed">
              Explore and download official architectural booklets, master cadastral site plans, metric room floor plans (m²), and 60-month Islamic financing schedules.
            </p>
          </div>

          {/* Quick Action Badges */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#8C867A] hidden sm:inline">All PDF Documents are Free:</span>
            <span className="px-3 py-1.5 rounded-lg bg-[#FAF9F6] border border-[#E5E2DA] text-xs font-medium text-[#1A1A1A] flex items-center gap-1.5 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C2A55D]" /> Kaabsan Certified
            </span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-8 border-b border-[#F0ECE1]">
          <div className="flex flex-wrap gap-2">
            {(['All', 'Brochure', 'Site Plan', 'Floor Plan', 'Financing Guide'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-[#1A1A1A] text-white shadow-sm'
                    : 'bg-[#F7F5F0] text-[#6B665E] hover:bg-[#EBE7DF] hover:text-[#1A1A1A]'
                }`}
              >
                {filter === 'All' ? `All Documents (${documents.length})` : filter}
              </button>
            ))}
          </div>

          <span className="text-xs text-[#8C733E] font-medium hidden lg:inline">
            ✨ Click any document to open full interactive booklet
          </span>
        </div>

        {/* Documents Grid */}
        {filteredDocs.length === 0 ? (
          <div className="text-center py-16 bg-[#FAF9F6] rounded-3xl border border-[#E5E2DA] p-8">
            <FileText className="w-12 h-12 text-[#A19B8E] mx-auto mb-3" />
            <h3 className="text-lg font-serif font-bold text-[#1A1A1A]">No documents found for this category</h3>
            <p className="text-xs text-[#6B665E] mt-1 mb-4">Try selecting another filter or view all official documents.</p>
            <button
              onClick={() => setActiveFilter('All')}
              className="px-4 py-2 bg-[#1A1A1A] text-white text-xs font-semibold rounded-xl"
            >
              Show All Documents
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocs.map((doc) => {
              const isDownloading = downloadingId === doc.id;
              const isSuccess = downloadSuccess === doc.id;

              return (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDocumentForReading(doc)}
                  className="bg-[#FAF9F6] border border-[#E5E2DA] rounded-3xl overflow-hidden hover:border-[#C2A55D] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                >
                  {/* Top Preview Image Container */}
                  {doc.coverImage && (
                    <div className="relative h-44 overflow-hidden bg-gray-100">
                      <img
                        src={doc.coverImage}
                        alt={doc.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide uppercase bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center gap-1.5">
                          {doc.type === 'Site Plan' && <Map className="w-3 h-3 text-[#C2A55D]" />}
                          {doc.type === 'Brochure' && <FileText className="w-3 h-3 text-[#25D366]" />}
                          {doc.type === 'Floor Plan' && <Layers className="w-3 h-3 text-[#38BDF8]" />}
                          {doc.type === 'Financing Guide' && <ShieldCheck className="w-3 h-3 text-[#FBBF24]" />}
                          {doc.type}
                        </span>

                        {doc.pageCount && (
                          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#C2A55D] text-[#1A1A1A]">
                            {doc.pageCount} Pages
                          </span>
                        )}
                      </div>

                      {/* Hover Overlay Prompt */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <span className="px-3.5 py-2 rounded-xl bg-white/90 text-[#1A1A1A] text-xs font-bold flex items-center gap-1.5 shadow-lg">
                          <BookOpen className="w-4 h-4 text-[#8C733E]" /> Read Brochure
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {!doc.coverImage && (
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide uppercase bg-white border border-[#E5E2DA] text-[#6B665E] flex items-center gap-1.5">
                            <FileText className="w-3 h-3 text-[#C2A55D]" /> {doc.type}
                          </span>
                          <span className="text-[11px] font-mono text-[#8C867A]">
                            {doc.fileSize}
                          </span>
                        </div>
                      )}

                      {/* Project Name & Title */}
                      <span className="text-[11px] font-bold uppercase text-[#8C733E] tracking-wider block mb-1">
                        {doc.projectName}
                      </span>
                      <h3 className="text-base sm:text-lg font-serif font-bold text-[#1A1A1A] group-hover:text-[#8C733E] transition-colors mb-2 leading-snug">
                        {doc.title}
                      </h3>

                      <p className="text-xs text-[#6B665E] leading-relaxed mb-4 line-clamp-3">
                        {doc.description}
                      </p>
                    </div>

                    {/* Footer Actions */}
                    <div className="space-y-3 pt-3 border-t border-[#EAE6DC]">
                      {/* Document Details Metadata */}
                      <div className="flex items-center justify-between text-[11px] text-[#8C867A]">
                        <span className="font-mono">
                          {doc.fileSize || 'PDF'}
                        </span>
                        {doc.updatedAt && (
                          <span className="text-[10px] text-gray-400">
                            Updated {doc.updatedAt}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDocumentForReading(doc);
                          }}
                          className="px-3 py-2 rounded-xl text-xs font-bold text-[#1A1A1A] bg-white border border-[#E5E2DA] hover:bg-[#F0ECE1] transition-all flex items-center gap-1.5 shadow-xs"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-[#8C733E]" />
                          <span>Read Online</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleDownload(e, doc)}
                          disabled={isDownloading}
                          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                            isSuccess
                              ? 'bg-[#128C7E] text-white'
                              : 'bg-[#1A1A1A] text-white hover:bg-[#333] active:scale-95'
                          }`}
                        >
                          {isDownloading ? (
                            <>
                              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                              <span>Downloading...</span>
                            </>
                          ) : isSuccess ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                              <span>Downloaded!</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-3.5 h-3.5 text-[#C2A55D]" />
                              <span>Download PDF</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Banner for Direct Assistance */}
        <div className="mt-14 bg-[#1A1A1A] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-xs uppercase font-bold text-[#C2A55D] tracking-wider mb-1 block">
              Need a Printed Master Catalog or Blueprint?
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">
              Visit Kaabsan Corporate Headquarters or connect directly with our engineering sales team.
            </h3>
            <p className="text-xs sm:text-sm text-[#B3AEA3] max-w-xl">
              Kaabsan Real Estate (Masalaha Office & Airport Avenue) has prepared full physical engineering blueprints, land deeds, and Darasaalam Bank mortgage contracts.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
            {onOpenPayment && (
              <button
                type="button"
                onClick={onOpenPayment}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#C2A55D] hover:bg-[#D4B86A] text-[#1A1A1A] font-bold text-xs sm:text-sm transition-colors whitespace-nowrap shadow-md cursor-pointer"
              >
                Zaad & Bank Deposit Portal
              </button>
            )}
            <a
              href={`https://wa.me/252636100090?text=${encodeURIComponent('Kaabsan Real Estate Official Website:\nHello Kaabsan Real Estate, I would like to request the official printed brochures and metric site plans.')}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 whitespace-nowrap shadow-md cursor-pointer"
            >
              WhatsApp Sales (+252 63 6100090)
            </a>
          </div>
        </div>

      </div>

      {/* Interactive Multi-Page Brochure Reader Modal */}
      <BrochureReaderModal
        document={selectedDocumentForReading}
        isOpen={!!selectedDocumentForReading}
        onClose={() => setSelectedDocumentForReading(null)}
        onScheduleTour={onScheduleTour}
      />
    </section>
  );
};

