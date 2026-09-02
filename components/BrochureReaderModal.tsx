import React, { useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Phone,
  MessageCircle,
  Building,
  Layers,
  MapPin,
  CheckCircle2,
  Calendar,
  Sparkles,
  Maximize2,
  FileText,
  ShieldCheck,
  Award,
  ArrowRight,
  Table
} from 'lucide-react';
import { DocumentResource } from '../types';
import { OFFICIAL_BROCHURES, OfficialBrochureData } from '../data/officialBrochuresData';
import { generateOfficialBrochurePDF } from '../utils/pdfGenerator';

interface BrochureReaderModalProps {
  document: DocumentResource | null;
  isOpen: boolean;
  onClose: () => void;
  onScheduleTour?: (projectName: string) => void;
}

export const BrochureReaderModal: React.FC<BrochureReaderModalProps> = ({
  document,
  isOpen,
  onClose,
  onScheduleTour
}) => {
  const hasCustomFile = Boolean(document?.fileUrl && document.fileUrl !== '#' && !document.fileUrl.startsWith('data:text/plain'));
  const [activeTab, setActiveTab] = useState<'uploaded_file' | 'pages' | 'plans' | 'amenities' | 'overview'>(hasCustomFile ? 'uploaded_file' : 'pages');
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Auto-switch to uploaded file if a real file is attached
  React.useEffect(() => {
    if (document) {
      const custom = Boolean(document.fileUrl && document.fileUrl !== '#' && !document.fileUrl.startsWith('data:text/plain'));
      if (custom) {
        setActiveTab('uploaded_file');
      } else {
        setActiveTab('pages');
      }
      setCurrentPageIndex(0);
    }
  }, [document?.id, document?.fileUrl]);

  if (!isOpen || !document) return null;

  // Match official brochure data or construct fallback
  const key = document.brochureKey || (
    document.projectName.toLowerCase().includes('arag') ? 'aragsan' :
    document.projectName.toLowerCase().includes('bilic') ? 'bilicsan' :
    document.projectName.toLowerCase().includes('masal') ? 'masalaha' :
    document.projectName.toLowerCase().includes('rug') ? 'rugsan' : 'aragsan'
  );

  const officialData: OfficialBrochureData = OFFICIAL_BROCHURES[key] || OFFICIAL_BROCHURES.aragsan;

  const totalPages = officialData.pages.length;
  const currentPage = officialData.pages[currentPageIndex] || officialData.pages[0];

  const handleNextPage = () => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      if (document.fileUrl && document.fileUrl !== '#' && !document.fileUrl.startsWith('data:text/plain')) {
        if (document.fileUrl.startsWith('data:')) {
          const arr = document.fileUrl.split(',');
          const mime = arr[0].match(/:(.*?);/)?.[1] || 'application/pdf';
          const bstr = atob(arr[1]);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          const blob = new Blob([u8arr], { type: mime });
          const blobUrl = URL.createObjectURL(blob);
          const a = window.document.createElement('a');
          a.href = blobUrl;
          a.download = `${document.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
          window.document.body.appendChild(a);
          a.click();
          window.document.body.removeChild(a);
          setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
        } else {
          const a = window.document.createElement('a');
          a.href = document.fileUrl;
          a.download = `${document.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
          window.document.body.appendChild(a);
          a.click();
          window.document.body.removeChild(a);
        }
      } else {
        // Generate authentic multi-page PDF with accurate metric specs & Kaabsan branding
        const pdfBlob = await generateOfficialBrochurePDF(document);
        const blobUrl = URL.createObjectURL(pdfBlob);
        const a = window.document.createElement('a');
        a.href = blobUrl;
        a.download = `${officialData.projectName.replace(/\s+/g, '_')}_Official_Brochure_Metric.pdf`;
        window.document.body.appendChild(a);
        a.click();
        window.document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
      }

      setIsDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Error generating PDF brochure:', err);
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in">
      <div 
        id="brochure-reader-modal"
        className="bg-[#1A1A1A] text-white w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col max-h-[92vh]"
      >
        {/* Header Bar */}
        <div className="px-6 py-4 bg-[#141414] border-b border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#C2A55D]/20 border border-[#C2A55D]/40 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-[#C2A55D]" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C2A55D] block">
                {officialData.developer} • {officialData.projectName}
              </span>
              <h2 className="text-base sm:text-lg font-serif font-bold text-white truncate">
                {document.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 bg-[#C2A55D] hover:bg-[#D4B86A] text-[#1A1A1A] text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
            >
              {downloadSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-green-900" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download PDF ({officialData.fileSize})</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 py-2.5 bg-[#1F1F1F] border-b border-white/5 flex items-center justify-between overflow-x-auto gap-2">
          <div className="flex items-center gap-1.5 shrink-0">
            {hasCustomFile && (
              <button
                onClick={() => setActiveTab('uploaded_file')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'uploaded_file'
                    ? 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-400'
                    : 'bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900/60 hover:text-white border border-emerald-800/60'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Faylka Rasmiga ah (Uploaded PDF)</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('pages')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'pages'
                  ? 'bg-white/20 text-white shadow-sm'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              📖 Interactive Booklet ({totalPages} Pages)
            </button>

            <button
              onClick={() => setActiveTab('plans')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'plans'
                  ? 'bg-white/20 text-white shadow-sm'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              📐 Metric Floor Plans (m²)
            </button>

            <button
              onClick={() => setActiveTab('amenities')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'amenities'
                  ? 'bg-white/20 text-white shadow-sm'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              🏛️ Social Amenities & Facilities
            </button>

            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'overview'
                  ? 'bg-white/20 text-white shadow-sm'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              ℹ️ Project Overview & Pricing
            </button>
          </div>

          <span className="text-[11px] text-[#C2A55D] font-mono shrink-0 hidden md:inline">
            Unit of Area: Square Metre (m²)
          </span>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* TAB 0: OFFICIAL UPLOADED PDF / FILE VIEWER */}
          {activeTab === 'uploaded_file' && hasCustomFile && (
            <div className="space-y-4 animate-in fade-in">
              <div className="bg-[#141414] border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white flex items-center gap-2">
                      <span>{document.title}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-600/80 text-[10px] font-mono text-white">
                        {document.fileSize || 'PDF Document'}
                      </span>
                    </h3>
                    <p className="text-xs text-gray-400">
                      Faylkan waa buuggii rasmiga ahaa ee maamulku soo geliyey. Macaamiishu toos ayay u akhrisan karaan una soo degsan karaan.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={document.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[#C2A55D]" />
                    <span>Fullscreen / New Tab</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="px-4 py-2 rounded-xl bg-[#C2A55D] hover:bg-[#D4B86A] text-[#1A1A1A] text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>

              {/* Embedded Document Frame */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-white/20 h-[68vh] min-h-[480px] flex flex-col">
                <iframe
                  src={document.fileUrl}
                  title={document.title}
                  className="w-full flex-1 border-0"
                />
              </div>
            </div>
          )}
          {/* TAB 1: INTERACTIVE BOOKLET PAGES */}
          {activeTab === 'pages' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="relative bg-[#0F0F0F] rounded-2xl border border-white/10 overflow-hidden min-h-[380px] sm:min-h-[460px] flex flex-col md:flex-row">
                {/* Left: Page Preview Visual */}
                <div className="md:w-3/5 relative min-h-[260px] md:min-h-[460px] bg-black">
                  <img
                    src={currentPage.image}
                    alt={currentPage.title}
                    onError={(e) => {
                      const fallback = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
                      if (e.currentTarget.src !== fallback) {
                        e.currentTarget.src = fallback;
                      }
                    }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                  {/* Category Pill */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[11px] font-bold uppercase tracking-wider text-[#C2A55D]">
                    {currentPage.category} • Page {currentPage.pageNumber} of {totalPages}
                  </span>
                </div>

                {/* Right: Page Text & Technical Notes */}
                <div className="md:w-2/5 p-6 flex flex-col justify-between space-y-4 bg-[#141414]">
                  <div>
                    <span className="text-xs uppercase font-bold text-[#C2A55D] tracking-wider block mb-1">
                      {currentPage.subtitle || officialData.projectName}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-3 leading-snug">
                      {currentPage.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {currentPage.description}
                    </p>

                    {/* Quick Metric Highlights */}
                    <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Total Construction Area:</span>
                        <span className="font-semibold text-white font-mono">{officialData.totalAreaMetric}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Location:</span>
                        <span className="font-semibold text-white">{officialData.location}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Unit Type:</span>
                        <span className="font-semibold text-[#C2A55D]">{officialData.unitSummary}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & WhatsApp Inquiry */}
                  <div className="space-y-2 pt-4">
                    <a
                      href={`https://wa.me/252636100090?text=${encodeURIComponent(`Kaabsan Real Estate Official Website:\nAsc Kaabsan Real Estate, waxaan rabaa macluumaad dheeraad ah oo ku saabsan ${document.title}.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#128C7E] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Inquire (+252 63 6100090)</span>
                    </a>

                    {onScheduleTour && (
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onScheduleTour(officialData.projectName);
                        }}
                        className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all flex items-center justify-center gap-2"
                      >
                        <Calendar className="w-4 h-4 text-[#C2A55D]" />
                        <span>Schedule On-Site Tour</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Page Selector Carousel Thumbnails */}
              <div className="flex items-center justify-between gap-4 bg-[#141414] p-3 rounded-2xl border border-white/10">
                <button
                  type="button"
                  onClick={handlePrevPage}
                  disabled={currentPageIndex === 0}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2 overflow-x-auto py-1">
                  {officialData.pages.map((p, idx) => (
                    <button
                      key={p.pageNumber}
                      type="button"
                      onClick={() => setCurrentPageIndex(idx)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                        currentPageIndex === idx
                          ? 'bg-[#C2A55D] text-[#1A1A1A] font-bold shadow-sm'
                          : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      Page {p.pageNumber}: {p.category}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={currentPageIndex === totalPages - 1}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: METRIC FLOOR PLANS (m²) */}
          {activeTab === 'plans' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="bg-[#141414] p-6 rounded-2xl border border-white/10 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                      <Layers className="w-5 h-5 text-[#C2A55D]" />
                      Metric Architectural Floor Plans & Area Breakdown
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Official metric calculations measured in Square Metres (m² / sq.m) as specified in official Kaabsan engineering blueprints.
                    </p>
                  </div>

                  <span className="px-3 py-1.5 rounded-xl bg-[#C2A55D]/15 border border-[#C2A55D]/30 text-[#C2A55D] text-xs font-mono font-bold shrink-0">
                    {officialData.totalAreaMetric}
                  </span>
                </div>

                {/* Level by Level Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {officialData.floorPlansMetric.map((level, idx) => (
                    <div key={idx} className="bg-[#1E1E1E] p-5 rounded-2xl border border-white/10 space-y-3">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <h4 className="font-bold text-sm text-[#C2A55D]">{level.levelName}</h4>
                        <span className="px-2.5 py-1 rounded bg-white/10 text-white text-xs font-mono font-bold">
                          Gross: {level.grossArea} {level.netArea ? `| Net: ${level.netArea}` : ''}
                        </span>
                      </div>

                      {/* Highlights */}
                      <ul className="space-y-1.5 text-xs text-gray-300">
                        {level.highlights.map((hl, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#C2A55D] shrink-0 mt-0.5" />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Room Table if Available */}
                      {level.roomBreakdown && level.roomBreakdown.length > 0 && (
                        <div className="pt-2 border-t border-white/5">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1.5">
                            Individual Room Dimensions (m²)
                          </span>
                          <div className="grid grid-cols-2 gap-1.5">
                            {level.roomBreakdown.map((r, rIdx) => (
                              <div key={rIdx} className="flex items-center justify-between p-1.5 rounded bg-black/30 text-[11px]">
                                <span className="text-gray-300 truncate">{r.room}</span>
                                <span className="text-[#C2A55D] font-mono font-bold ml-2">{r.areaM2}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SOCIAL AMENITIES & FACILITIES */}
          {activeTab === 'amenities' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="bg-[#141414] p-6 rounded-2xl border border-white/10 space-y-4">
                <div>
                  <h3 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#C2A55D]" />
                    Master Community Infrastructure & Social Living
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Integrated educational, sporting, recreational, and security amenities designed for multi-generational living.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                  {officialData.amenities.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#1F1F1F] border border-white/10 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#C2A55D]/20 text-[#C2A55D] flex items-center justify-center shrink-0">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-white block leading-snug">{item}</span>
                        <span className="text-[10px] text-gray-400 mt-0.5 block">Kaabsan Certified Specification</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PROJECT OVERVIEW & CONTACT */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#141414] p-6 rounded-2xl border border-white/10 space-y-4">
                  <h3 className="text-lg font-serif font-bold text-white">Project Identity & Location</h3>
                  
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between py-2 border-b border-white/5">
                      <span className="text-gray-400">Master Developer</span>
                      <span className="font-bold text-white">{officialData.developer}</span>
                    </div>
                    {officialData.architect && (
                      <div className="flex items-center justify-between py-2 border-b border-white/5">
                        <span className="text-gray-400">Architect</span>
                        <span className="font-bold text-white">{officialData.architect}</span>
                      </div>
                    )}
                    {officialData.financedBy && (
                      <div className="flex items-center justify-between py-2 border-b border-white/5">
                        <span className="text-gray-400">Financed By</span>
                        <span className="font-bold text-[#C2A55D]">{officialData.financedBy}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between py-2 border-b border-white/5">
                      <span className="text-gray-400">Location</span>
                      <span className="font-bold text-white">{officialData.location}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-white/5">
                      <span className="text-gray-400">Unit Typology</span>
                      <span className="font-bold text-white">{officialData.unitSummary}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-white/5">
                      <span className="text-gray-400">Metric Construction</span>
                      <span className="font-bold text-[#C2A55D] font-mono">{officialData.totalAreaMetric}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#141414] p-6 rounded-2xl border border-white/10 space-y-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-white">Sales & Site Visit Desk</h3>
                    <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                      Visit the Kaabsan sales center or contact our senior real estate advisors to view original physical blueprints and secure your plot.
                    </p>

                    <div className="mt-4 space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Phone className="w-4 h-4 text-[#C2A55D]" />
                        <span className="font-mono">{officialData.contactPhones.join(' | ')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <MapPin className="w-4 h-4 text-[#C2A55D]" />
                        <span>Masalaha Corridor & Egal Airport Avenue, Hargeisa</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-white/10">
                    <button
                      onClick={handleDownload}
                      className="w-full py-3 bg-[#C2A55D] hover:bg-[#D4B86A] text-[#1A1A1A] text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Official Booklet PDF ({officialData.fileSize})</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Bar */}
        <div className="px-6 py-3 bg-[#141414] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <span>
            Official Kaabsan Document • All Areas in Square Metres (m²)
          </span>

          <div className="flex items-center gap-4">
            <a
              href={`https://wa.me/252636100090?text=${encodeURIComponent('Kaabsan Real Estate Official Website:\nAsc Kaabsan Real Estate, waxaan doonayaa xog dheeraad ah.')}`}
              target="_blank"
              rel="noreferrer"
              className="text-[#25D366] hover:underline flex items-center gap-1 font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5" /> +252 63 6100090
            </a>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium cursor-pointer"
            >
              Close Reader
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
