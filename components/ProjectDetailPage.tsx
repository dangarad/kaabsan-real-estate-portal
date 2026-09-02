import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  Phone, 
  Download, 
  ChevronRight, 
  Building2, 
  Home, 
  Layers, 
  DollarSign, 
  Maximize2, 
  Share2, 
  Heart,
  Car,
  Zap,
  Camera,
  Check,
  MessageCircle,
  FileText,
  Clock,
  Compass,
  CheckCheck,
  Sliders,
  Send,
  ExternalLink,
  Shield,
  Eye,
  Award,
  Trees,
  School,
  Wifi,
  Key,
  Copy,
  Navigation,
  Navigation2,
  Globe
} from 'lucide-react';
import { MasterCommunity, Property, DocumentResource } from '../types';
import { generateOfficialBrochurePDF } from '../utils/pdfGenerator';
import { useTranslation } from '../context/LanguageContext';

interface ProjectDetailPageProps {
  community: MasterCommunity;
  property?: Property;
  documents?: DocumentResource[];
  onBack: () => void;
  onSelectOtherProject: (projectId: string) => void;
  onOpenScheduleTour: (projectName: string) => void;
  onOpenContact: (msg?: string) => void;
  onOpenPayment: () => void;
  onOpenAIAdvisor: (query: string) => void;
  currency?: 'USD' | 'EUR' | 'GBP';
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  community,
  property,
  documents = [],
  onBack,
  onSelectOtherProject,
  onOpenScheduleTour,
  onOpenContact,
  onOpenPayment,
  onOpenAIAdvisor,
  currency = 'USD'
}) => {
  const { t, language } = useTranslation();
  // Safe fallbacks for community
  const safeCommunity: MasterCommunity = community || {
    id: 'rugsan-gardens',
    name: 'Rugsan Gardens',
    location: 'Masallaha - Madaarka Agtiisa, Hargeisa',
    units: '68 Luxury Townhouses (100% Sold Out)',
    status: 'Dhammaan Waa La Wada Iibsaday (100% Sold Out)',
    description: 'Master community-ga casriga ah ee ugu horreeyay Somaliland oo ku yaalla Masallaha (Madaarka Cigaal agtiisa). Mashruucan oo ka koobnaa 68 Townhouse oo raaxo leh (Total Area: 400 m², Built Area: 321 m², Qiimaha: $240,000), gym gaar ah, waddooyin laami ah, iyo beero waa la wada iibsaday (100% Sold Out).',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    features: [
      'Qiimaha: $240,000',
      'Total Area: 400 m² | Built Area: 321 m²',
      '100% La Wada Iibsaday (68 Townhouses Sold Out)',
      'Masallaha - Madaarka Agtiisa',
      'Gym, Beero & 24/7 Nabadgelyo',
      'Dhismayaal Heer Caalami ah'
    ]
  };

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'overview' | 'floorplans' | 'inventory' | 'amenities' | 'location' | 'tour'>('all');
  
  // Specific project details helper
  const projectId = safeCommunity.id || 'rugsan-gardens';
  const isRugsan = projectId.includes('rugsan');
  const isAragsan = projectId.includes('aragsan');
  const isBilicsan = projectId.includes('bilicsan');
  const isMasalaha = projectId.includes('masalaha');

  // Base price
  const basePrice = property?.price || (isRugsan ? 240000 : isAragsan ? 292508 : isBilicsan ? 275000 : 180000);

  // Selected floor plan index
  const [selectedFloorPlanIndex, setSelectedFloorPlanIndex] = useState<number>(0);

  // Inline Tour Request state
  const [tourName, setTourName] = useState('');
  const [tourPhone, setTourPhone] = useState('');
  const [tourDate, setTourDate] = useState('');
  const [tourSubmitted, setTourSubmitted] = useState(false);
  const [copiedGps, setCopiedGps] = useState(false);

  // Exact Project GPS Coordinates & Navigation URLs
  const projectGpsDms = isAragsan ? '9°34\'33.29"N 44° 0\'31.24"E' 
    : isRugsan ? '9°31\'12.40"N 44° 3\'54.09"E' 
    : isBilicsan ? '9°31\'35.15"N 44° 4\'5.42"E' 
    : '9°31\'48.59"N 44° 4\'52.72"E';

  const projectDecimalCoords = isAragsan ? '9.575914,44.008678' 
    : isRugsan ? '9.520111,44.065025' 
    : isBilicsan ? '9.526431,44.068172' 
    : '9.530164,44.081311';

  const projectGoogleMapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${projectDecimalCoords}`;
  const projectGoogleMapsSearch = `https://www.google.com/maps/search/?api=1&query=${projectDecimalCoords}`;
  const projectAppleMaps = `https://maps.apple.com/?daddr=${projectDecimalCoords}`;

  const handleCopyGps = () => {
    navigator.clipboard.writeText(projectGpsDms);
    setCopiedGps(true);
    setTimeout(() => setCopiedGps(false), 2500);
  };

  // Safe gallery images
  const images = (safeCommunity?.galleryImages && safeCommunity.galleryImages.length > 0)
    ? safeCommunity.galleryImages
    : (property?.galleryImages && property.galleryImages.length > 0)
    ? property.galleryImages 
    : [safeCommunity.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85'];

  const [downloadingDocId, setDownloadingDocId] = useState<string | null>(null);

  const handleDownloadDoc = async (doc: DocumentResource) => {
    setDownloadingDocId(doc.id);
    try {
      if (doc.fileUrl && doc.fileUrl !== '#' && !doc.fileUrl.startsWith('data:text/plain')) {
        if (doc.fileUrl.startsWith('data:')) {
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
      setDownloadingDocId(null);
    } catch (err) {
      console.error('Error generating PDF:', err);
      setDownloadingDocId(null);
    }
  };

  const projectBrochures = (documents || []).filter(d => 
    d?.title?.toLowerCase().includes(safeCommunity.name.toLowerCase()) || 
    d?.category?.toLowerCase().includes(safeCommunity.name.toLowerCase()) ||
    d?.projectName?.toLowerCase().includes(safeCommunity.name.toLowerCase()) ||
    d?.id?.includes(safeCommunity.id)
  );

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const isSoldOut = (safeCommunity.status && safeCommunity.status.toLowerCase().includes('sold out')) || (property && property.status === 'Sold Out');

  const handleTourSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tourName || !tourPhone) return;
    setTourSubmitted(true);
    setTimeout(() => {
      onOpenContact(`Booqasho Goobta: ${safeCommunity.name} - Macmiil: ${tourName}, Tel: ${tourPhone}, Taariikh: ${tourDate || 'Sida ugu dhakhsaha badan'}`);
    }, 1000);
  };

  // Specific project floor plans definition if not in property
  const floorPlansList = (property?.floorPlans && property.floorPlans.length > 0)
    ? property.floorPlans
    : isMasalaha
    ? [
        { name: '5-Bed Penthouse (6th Floor)', area: '272 m²', details: 'Top-floor luxury penthouse with wrap-around panoramic terrace overlooking Hargeisa city, 4 master bedrooms with ensuite baths, open-concept salon.' },
        { name: '4-Bed Luxury Apartment (Ground - 6th)', area: '223.32 m²', details: '4 generous bedrooms with built-in wardrobes, spacious European kitchen, living salon, private balcony & separate utility laundry zone.' },
        { name: '3-Bed Family Apartment (1st - 5th)', area: '158.14 m²', details: '3 bedrooms including master ensuite, fitted kitchen, open dining and family lounge, private outdoor balcony.' },
        { name: '2-Bed Modern Suite (Typologies A, B, C)', area: '107 - 125 m²', details: 'Typology A (113 m²), Typology B (107 m²), Typology C (125 m²). 2 bedrooms, modern living area & private balcony.' }
      ]
    : isAragsan
    ? [
        { name: 'Ground Floor Plan (Gross: 177.28 m² | Net: 194.99 m²)', area: '177.28 m²', details: 'Double-height Living Room (32.63 m²), Main Kitchen (19.64 m²) + Cooking Area (6.83 m²), Guest Bedroom (18.40 m²) + Bath (5.50 m²), Dining (14.40 m²), Veranda (23.64 m²), Staff Suite (13.08 m²), Storage (5.33 m²)' },
        { name: 'First Floor Plan (Gross: 172.87 m² | Net: 153.40 m²)', area: '172.87 m²', details: 'Master Suite (26.13 m²) + Dressing (3.45 m²) + Bath (4.54 m²), Bedroom 2 (17.31 m²) + Balcony, Bedroom 3 (19.91 m²) + Balcony, Bedroom 4 (12.85 m²), Family TV Lounge (21.56 m²), Laundry (3.94 m²)' },
        { name: 'Rooftop Terrace & Technical Zone', area: '151.88 m²', details: 'Panoramic Outdoor Rooftop Terrace (114.39 m²), Satellite & Solar Panel Technical Zone (30.21 m²), Enclosed Staircase Hall (7.28 m²)' }
      ]
    : isBilicsan
    ? [
        { name: 'Ground Floor Plan (160 m²)', area: '160 m²', details: 'Living & Dining Room overlooking garden, Entrance Lobby, Guest Bedroom with en-suite, Inside Luxury Kitchen & Separate Outside Kitchen, Covered Terrace, Maid Room with bath, Guard room with bath & 2 parking bays.' },
        { name: 'First Floor Plan (150 m²)', area: '150 m²', details: 'Executive Master Suite with private bath & balcony, 3 Family Bedrooms, Dedicated Private Office / Study Room, Spacious Family Living Room.' },
        { name: 'Second Floor Plan (70 m²)', area: '70 m²', details: 'Bedroom 5 with private bathroom, Anteroom / Lounge, and Open Roof Terrace.' }
      ]
    : [
        { name: 'Dabaqa Hoose (Ground Floor)', area: '160 m²', details: 'Fadhiga weyn ee martida (Majlis), qolka cuntada, jiko heersare ah oo leh kayd (pantry), qolka martida oo musqul leh, iyo barxad hore & dambe.' },
        { name: 'Dabaqa Sare (First Floor)', area: '161 m²', details: 'Master Suite oo leh musqul raaxo leh, qolka labiska (walk-in closet), balakoon weyn, 3 qol oo carruur ah oo musqulo leh, iyo qolka nasashada qoyska (Family TV Lounge).' }
      ];

  // Specific inventory for Aragsan or Masallaha
  const inventoryUnits = property?.inventoryUnits || (isAragsan ? [
    { sn: '1', villaNo: 'Villa 33', actualSqm: '483.00', villaType: 'G+1 Standalone', builtArea: '362', priceDisplay: '$292,508.40' },
    { sn: '2', villaNo: 'Villa 34', actualSqm: '483.00', villaType: 'G+1 Standalone', builtArea: '362', priceDisplay: '$292,508.40' },
    { sn: '3', villaNo: 'Villa 35', actualSqm: '485.41', villaType: 'G+1 Standalone', builtArea: '362', priceDisplay: '$292,867.49' },
    { sn: '4', villaNo: 'Villa 36', actualSqm: '483.00', villaType: 'G+1 Standalone', builtArea: '362', priceDisplay: '$292,508.40' },
    { sn: '5', villaNo: 'Villa 38', actualSqm: '483.00', villaType: 'G+1 Standalone', builtArea: '362', priceDisplay: '$292,508.40' },
    { sn: '6', villaNo: 'Villa 39', actualSqm: '483.00', villaType: 'G+1 Standalone', builtArea: '362', priceDisplay: '$292,508.40' },
    { sn: '7', villaNo: 'Villa 40', actualSqm: '485.41', villaType: 'G+1 Standalone', builtArea: '362', priceDisplay: '$292,867.49' },
    { sn: '8', villaNo: 'Villa 41', actualSqm: '485.41', villaType: 'G+1 Standalone', builtArea: '362', priceDisplay: '$292,867.49' },
    { sn: '9', villaNo: 'Villa 58', actualSqm: '506.94', villaType: 'G+1 Standalone', builtArea: '362', priceDisplay: '$296,075.46' },
    { sn: '10', villaNo: 'Villa 60', actualSqm: '562.69', villaType: 'G+1 Standalone', builtArea: '362', priceDisplay: '$304,382.21' }
  ] : []);

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1A1A1A] pb-24">
      
      {/* Top Fixed Breadcrumb Bar */}
      <div className="bg-[#FFFFFF] border-b border-[#E5E2DA] sticky top-[68px] z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 text-xs text-[#6B665E]">
            <button 
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-[#35322E] hover:text-[#C2A55D] font-bold transition-colors cursor-pointer bg-[#F4F1EA] hover:bg-[#EAE6DE] px-3.5 py-1.5 rounded-xl border border-[#E5E2DA]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{language === 'ar' ? 'جميع المشاريع' : language === 'so' ? 'Mashaariicda oo Dhan' : 'All Projects'}</span>
            </button>
            <span className="text-[#D8D3C8]">/</span>
            <span className="text-[#8C867D] hidden sm:inline">{language === 'ar' ? 'المشاريع' : language === 'so' ? 'Mashaariic' : 'Projects'}</span>
            <span className="text-[#D8D3C8] hidden sm:inline">/</span>
            <span className="font-bold text-[#1A1A1A] truncate max-w-[200px] sm:max-w-none text-xs sm:text-sm">
              {safeCommunity.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-[#F4F1EA] hover:bg-[#EAE6DE] text-[#35322E] transition-colors border border-[#E5E2DA] flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
              title="Share project link"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-[#6B665E]" />}
              <span className="hidden md:inline">{copiedLink ? (language === 'ar' ? 'تم النسخ!' : language === 'so' ? 'Waa la guriyay!' : 'Link Copied!') : (language === 'ar' ? 'مشاركة' : language === 'so' ? 'La wadaag' : 'Share')}</span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('project-tour-booking');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else onOpenScheduleTour(safeCommunity.name);
              }}
              className="bg-[#35322E] hover:bg-[#1A1815] text-white px-4 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-sm flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C2A55D]" />
              <span>Book Site Tour</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Visual Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="relative rounded-3xl overflow-hidden bg-[#24211E] aspect-[16/9] md:aspect-[21/9] shadow-xl border border-[#E5E2DA]">
          <img 
            src={images[activeImageIndex] || safeCommunity.image} 
            alt={safeCommunity.name} 
            onError={(e) => {
              const fallback = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85';
              if (e.currentTarget.src !== fallback) {
                e.currentTarget.src = fallback;
              }
            }}
            className="w-full h-full object-cover transition-transform duration-700 brightness-[0.92]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent"></div>

          {/* Top Status and Specs Overlay */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <span className={`px-3.5 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1.5 ${
                isSoldOut ? 'bg-red-800 text-white border border-red-500/50' : 'bg-[#1E3A2F] text-white border border-[#C2A55D]/40'
              }`}>
                <span className={`w-2 h-2 rounded-full ${isSoldOut ? 'bg-red-300 animate-pulse' : 'bg-[#C2A55D]'}`}></span>
                {safeCommunity.status}
              </span>

              <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white rounded-full text-xs font-medium border border-white/20">
                {safeCommunity.units}
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-[#35322E] border border-white/50 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#C2A55D]" />
              <span>Kaabsan • Telesom Group Quality</span>
            </div>
          </div>

          {/* Bottom Title & Specs Card */}
          <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#EBE6DF] mb-1 font-light">
                <MapPin className="w-4 h-4 text-[#C2A55D]" />
                <span>{safeCommunity.location}</span>
              </div>
              <h1 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-white drop-shadow-md leading-tight">
                {safeCommunity.name}
              </h1>
            </div>

            <div className="bg-black/75 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-white/20 flex flex-wrap items-center gap-4">
              <div>
                <div className="text-[11px] text-[#A8A39A] uppercase tracking-wider font-bold">
                  {language === 'ar' ? 'معلومات السعر وخطة الأقساط' : language === 'so' ? 'Xogta Qiimaha & Qorshaha' : 'Official Pricing & Terms'}
                </div>
                <div className="text-sm sm:text-base font-extrabold text-[#DFCA85] mt-0.5">
                  {language === 'ar' ? 'تواصل عبر واتساب للسعر الرسمي' : language === 'so' ? 'Fadlan la xidhiidh WhatsApp' : 'Contact WhatsApp for Official Price'}
                </div>
              </div>

              <a
                href={`https://wa.me/252636100090?text=${encodeURIComponent(`Kaabsan Real Estate Official Website:\nAsc Kaabsan Real Estate, waxaan doonayaa inaan ogaado qiimaha rasmiga ah & qorshaha lacag-bixinta ee mashruuca ${safeCommunity.name} (${safeCommunity.location}).`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-extrabold rounded-xl transition-colors shrink-0 flex items-center gap-1.5 shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              
              <div className="border-l border-white/20 pl-4">
                <div className="text-[11px] text-[#A8A39A] uppercase tracking-wider font-bold">Dhulka (Plot)</div>
                <div className="text-base sm:text-lg font-extrabold text-[#C2A55D]">
                  {property?.actualSqm || (isRugsan ? 400 : isAragsan ? 483 : isBilicsan ? 450 : 250)} m²
                </div>
              </div>

              <div className="border-l border-white/20 pl-4">
                <div className="text-[11px] text-[#A8A39A] uppercase tracking-wider font-bold">Dhismaha (Built)</div>
                <div className="text-base sm:text-lg font-extrabold text-white">
                  {property?.builtArea || (isRugsan ? 321 : isAragsan ? 362 : isBilicsan ? 380 : 272)} m²
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Thumbnails Strip */}
        {images.length > 1 && (
          <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                  activeImageIndex === idx ? 'border-[#C2A55D] ring-2 ring-[#C2A55D]/30 scale-105' : 'border-[#E5E2DA] opacity-75 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`${safeCommunity.name} view ${idx + 1}`}
                  onError={(e) => {
                    const fallback = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80';
                    if (e.currentTarget.src !== fallback) {
                      e.currentTarget.src = fallback;
                    }
                  }}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Internal Navigation Sub-tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E5E2DA]">
          {[
            { id: 'all', label: language === 'ar' ? 'عرض شامل' : language === 'so' ? 'Dhammaan Xogta' : 'Full Overview' },
            { id: 'overview', label: language === 'ar' ? 'نظرة عامة' : language === 'so' ? 'Xogta Guud' : 'Overview' },
            { id: 'floorplans', label: language === 'ar' ? 'المخططات' : language === 'so' ? 'Naqshadaha' : 'Floor Plans' },
            { id: 'inventory', label: language === 'ar' ? 'الوحدات المتاحة' : language === 'so' ? 'Shaxda Cutubyada' : 'Available Units' },
            { id: 'amenities', label: language === 'ar' ? 'المرافق والخدمات' : language === 'so' ? 'Adeegyada' : 'Amenities' },
            { id: 'location', label: language === 'ar' ? 'الموقع والخريطة' : language === 'so' ? 'Goobta & Khariidadda' : 'Location & Map' },
            { id: 'tour', label: language === 'ar' ? 'حجز جولة' : language === 'so' ? 'Booqashada Goobta' : 'Book Tour' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#35322E] text-white shadow-sm'
                  : 'bg-white text-[#4A4742] hover:bg-[#EFECE6] border border-[#E5E2DA]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Page Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left 2 Columns: Dynamic Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* SECTION 1: OVERVIEW */}
            {(activeTab === 'all' || activeTab === 'overview') && (
              <div className="bg-white border border-[#E5E2DA] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
                <div>
                  <span className="text-xs text-[#C2A55D] font-bold uppercase tracking-wider">Mashruuca & Heerka Dhismaha</span>
                  <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#1A1A1A] font-normal mt-1">
                    Faahfaahinta Rasmiga ah ee {safeCommunity.name}
                  </h2>
                </div>

                <p className="text-sm text-[#4A4742] font-light leading-relaxed whitespace-pre-line">
                  {safeCommunity.description}
                </p>

                {/* Key Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {(safeCommunity.features || []).map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-[#F9F8F6] border border-[#E5E2DA]">
                      <CheckCircle2 className="w-4 h-4 text-[#C2A55D] flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-[#35322E] font-medium leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Ready-Mix Concrete Certification Note */}
                <div className="p-4 rounded-2xl bg-[#F4F1EA] border border-[#E5E2DA] flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#C2A55D] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#1A1A1A]">Shubka Tayaysan ee Kaabsan Ready-Mix Plant</h4>
                    <p className="text-xs text-[#6B665E] font-light mt-0.5">
                      Dhammaan guryaha iyo dhismayaasha mashruuca waxaa lagu dhisay shubka casriga ah ee warshadda Kaabsan Batching Plant oo tijaabiyay shaybaadh heer caalami ah.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 2: FLOOR PLANS & TYPOLOGIES */}
            {(activeTab === 'all' || activeTab === 'floorplans') && (
              <div className="bg-white border border-[#E5E2DA] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
                <div>
                  <span className="text-xs text-[#C2A55D] font-bold uppercase tracking-wider">Architectural Floor Plans</span>
                  <h3 className="font-serif-luxury text-2xl text-[#1A1A1A] font-normal mt-1">
                    Naqshadaha Dabaqyada & Qolalka ({safeCommunity.name})
                  </h3>
                  <p className="text-xs text-[#6B665E] font-light mt-1">
                    Dooro nooca dabaqa ama villa-da si aad u aragto cabbirka saxda ah iyo qaab dhismeedka qolalka.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Floor plan selector pills */}
                  <div className="flex flex-wrap gap-2">
                    {floorPlansList.map((fp, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedFloorPlanIndex(i)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                          selectedFloorPlanIndex === i
                            ? 'bg-[#C2A55D] text-white'
                            : 'bg-[#F4F1EA] text-[#35322E] hover:bg-[#EAE6DE] border border-[#E5E2DA]'
                        }`}
                      >
                        {fp.name} ({fp.area})
                      </button>
                    ))}
                  </div>

                  {/* Active Floor Plan Details Card */}
                  {floorPlansList[selectedFloorPlanIndex] && (
                    <div className="p-5 rounded-2xl bg-[#F9F8F6] border border-[#E5E2DA] space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-[#1A1A1A]">
                          {floorPlansList[selectedFloorPlanIndex].name}
                        </h4>
                        <span className="text-sm font-bold text-[#C2A55D]">
                          {floorPlansList[selectedFloorPlanIndex].area}
                        </span>
                      </div>
                      <p className="text-xs text-[#6B665E] leading-relaxed font-light">
                        {floorPlansList[selectedFloorPlanIndex].details}
                      </p>
                    </div>
                  )}

                  {/* Floor plans overview table */}
                  <div className="overflow-x-auto border border-[#E5E2DA] rounded-2xl">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#F4F1EA] text-[#35322E] font-bold border-b border-[#E5E2DA]">
                        <tr>
                          <th className="py-3 px-4">Typology / Dabaqa</th>
                          <th className="py-3 px-4">Bedka Guud</th>
                          <th className="py-3 px-4">Faahfaahinta Qolalka</th>
                          <th className="py-3 px-4 text-right">Xaaladda</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E5E2DA]">
                        {floorPlansList.map((fp, i) => (
                          <tr key={i} className="hover:bg-[#F9F8F6] transition-colors">
                            <td className="py-3 px-4 font-bold text-[#1A1A1A]">{fp.name}</td>
                            <td className="py-3 px-4 font-bold text-[#C2A55D]">{fp.area}</td>
                            <td className="py-3 px-4 text-[#6B665E]">{fp.details}</td>
                            <td className="py-3 px-4 text-right">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                isSoldOut ? 'bg-red-100 text-red-800' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              }`}>
                                {isSoldOut ? 'Sold Out' : 'Diyaar ah'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 3: INVENTORY TABLE */}
            {(activeTab === 'all' || activeTab === 'inventory') && (
              <div className="bg-white border border-[#E5E2DA] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs text-[#C2A55D] font-bold uppercase tracking-wider">Unit Availability & Pricing</span>
                    <h3 className="font-serif-luxury text-2xl text-[#1A1A1A] font-normal mt-1">
                      Shaxda Cutubyada Iibka ah ({safeCommunity.name})
                    </h3>
                    <p className="text-xs text-[#6B665E] font-light mt-1">
                      Xogta rasmiga ah ee cutubyada, cabbirka dhulka, dhismaha, iyo qiimaha iibka.
                    </p>
                  </div>
                  {inventoryUnits.length > 0 && (
                    <span className="text-xs bg-[#F4F1EA] text-[#35322E] px-3 py-1 rounded-full border border-[#E5E2DA] font-semibold self-start">
                      {inventoryUnits.length} Cutub oo Diyaar ah
                    </span>
                  )}
                </div>

                {inventoryUnits.length > 0 ? (
                  <div className="overflow-x-auto max-h-96 overflow-y-auto border border-[#E5E2DA] rounded-2xl">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#F4F1EA] text-[#35322E] font-bold border-b border-[#E5E2DA] sticky top-0 z-10">
                        <tr>
                          <th className="py-3 px-3.5">#</th>
                          <th className="py-3 px-3.5">Villa / Unit No</th>
                          <th className="py-3 px-3.5">Nooca (Type)</th>
                          <th className="py-3 px-3.5">Dhulka (Plot SQM)</th>
                          <th className="py-3 px-3.5">Dhismaha (Built SQM)</th>
                          <th className="py-3 px-3.5 text-right">{language === 'ar' ? 'السعر والاستفسار' : language === 'so' ? 'Qiimaha & Xogta' : 'Pricing & Inquiry'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E5E2DA]">
                        {inventoryUnits.map((u) => (
                          <tr key={u.sn} className="hover:bg-[#F9F8F6] transition-colors">
                            <td className="py-2.5 px-3.5 text-[#8C867D]">{u.sn}</td>
                            <td className="py-2.5 px-3.5 font-bold text-[#1A1A1A]">{u.villaNo}</td>
                            <td className="py-2.5 px-3.5 text-[#35322E] font-medium">{u.villaType}</td>
                            <td className="py-2.5 px-3.5 text-[#35322E]">{u.actualSqm} m²</td>
                            <td className="py-2.5 px-3.5 text-[#6B665E]">{u.builtArea} m²</td>
                            <td className="py-2.5 px-3.5 text-right font-bold">
                              <a
                                href={`https://wa.me/252636100090?text=${encodeURIComponent(`Kaabsan Real Estate Official Website:\nAsc Kaabsan Real Estate, waxaan doonayaa inaan ogaado qiimaha cutubka: ${u.villaNo} (${u.villaType}, ${safeCommunity.name}).`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#25D366]/15 hover:bg-[#25D366] text-[#1E7E34] hover:text-white rounded-lg text-[11px] font-extrabold transition-colors cursor-pointer"
                              >
                                <Phone className="w-3 h-3" />
                                <span>{language === 'ar' ? 'استفسر واتساب' : language === 'so' ? 'Weydii WhatsApp' : 'Inquire on WhatsApp'}</span>
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-6 rounded-2xl bg-[#F9F8F6] border border-[#E5E2DA] text-center space-y-2">
                    <Building2 className="w-8 h-8 text-[#C2A55D] mx-auto opacity-70" />
                    <h4 className="text-sm font-bold text-[#1A1A1A]">
                      {isSoldOut 
                        ? (language === 'ar' ? 'تم بيع جميع وحدات هذا المشروع بالكامل (100% مباع)' : language === 'so' ? 'Dhammaan Cutubyada Mashruucan Waa La Wada Iibsaday (100%)' : 'All Units in this Project are 100% Sold Out')
                        : (language === 'ar' ? 'الوحدات متاحة للشراء المباشر عبر كابسان العقارية' : language === 'so' ? 'Cutubyada Waxaa Diyaar u ah Iibka Tooska ah ee Kaabsan Real Estate' : 'Units Available for Direct Purchase with Kaabsan Real Estate')}
                    </h4>
                    <p className="text-xs text-[#6B665E] max-w-md mx-auto font-light">
                      {isSoldOut 
                        ? (language === 'ar' ? 'تم بيع جميع الفلل بالكامل. يرجى التواصل مع فريق المبيعات للوحدات المتاحة أو المشاريع القادمة.' : language === 'so' ? 'Rugsan Gardens 68-kii townhouse waa la wada iibsaday. Fadlan la xiriir xafiiska iibka haddii aad doonayso resale ama cutubyo cusub.' : 'All 68 townhouses in Rugsan Gardens are sold out. Contact our sales desk for resales or upcoming phases.')
                        : (language === 'ar' ? 'تواصل مع مستشار المبيعات للحصول على أحدث جدول للوحدات الشاغرة.' : language === 'so' ? 'Kala soo xiriir xafiiska iibka si aad u hesho shaxda cutubyada ugu dambeeya ee bannaan.' : 'Contact our sales office for the latest live inventory breakdown.')}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* SECTION 5: AMENITIES & COMMUNITY HIGHLIGHTS */}
            {(activeTab === 'all' || activeTab === 'amenities') && (
              <div className="bg-white border border-[#E5E2DA] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
                <div>
                  <span className="text-xs text-[#C2A55D] font-bold uppercase tracking-wider">Adeegyada & Tayada</span>
                  <h3 className="font-serif-luxury text-2xl text-[#1A1A1A] font-normal mt-1">
                    Adeegyada Gaarka ah ee {safeCommunity.name}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-[#F9F8F6] border border-[#E5E2DA] flex items-start gap-3">
                    <Shield className="w-5 h-5 text-[#C2A55D] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-[#1A1A1A]">24/7 Gated Security & CCTV</h4>
                      <p className="text-xs text-[#6B665E] font-light mt-0.5">Ilaalo tababaran iyo kaamirooyin ilaalinaya deegaanka 24 saacadood.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F9F8F6] border border-[#E5E2DA] flex items-start gap-3">
                    <Wifi className="w-5 h-5 text-[#C2A55D] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-[#1A1A1A]">Telesom High-Speed Fiber</h4>
                      <p className="text-xs text-[#6B665E] font-light mt-0.5">Khad internetka fiber optic ah oo toos u gala guri kasta.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F9F8F6] border border-[#E5E2DA] flex items-start gap-3">
                    <Trees className="w-5 h-5 text-[#C2A55D] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-[#1A1A1A]">Jardiinooyin & Meelaha Carruurta</h4>
                      <p className="text-xs text-[#6B665E] font-light mt-0.5">Beeraha cagaaran iyo meelaha ciyaarta carruurta ee nabadgelyada leh.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F9F8F6] border border-[#E5E2DA] flex items-start gap-3">
                    <Car className="w-5 h-5 text-[#C2A55D] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-[#1A1A1A]">Waddooyin Laami ah & Baakin</h4>
                      <p className="text-xs text-[#6B665E] font-light mt-0.5">Waddooyin laami ah oo iftiimaya iyo baakin ballaadhan.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 5.5: DEDICATED LOCATION & GPS NAVIGATION SECTION */}
            {(activeTab === 'all' || activeTab === 'location') && (
              <div className="bg-[#1A1815] text-white border border-[#C2A55D]/40 rounded-3xl p-6 sm:p-8 shadow-md space-y-5 animate-in fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-[#C2A55D]">
                      <Navigation2 className="w-4 h-4 text-[#C2A55D] animate-pulse" />
                      <span>Tilmaamaha Goobta & GPS Navigation</span>
                    </div>
                    <h3 className="font-serif-luxury text-2xl text-white font-normal mt-1">
                      Toos u Tag Goobta Mashruuca {safeCommunity.name}
                    </h3>
                  </div>

                  <span className="text-[11px] px-3 py-1 bg-black/60 text-[#C2A55D] rounded-full border border-[#C2A55D]/40 font-mono w-fit">
                    Hargeisa, Somaliland
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                  Waxaad si toos ah ugu tagi kartaa mashruuca adoo isticmaalaya tilmaamaha GPS-ka ee rasmiga ah. Guji badhanka hoose si aad ugu furto Google Maps ama Apple Maps:
                </p>

                {/* GPS Info Box */}
                <div className="bg-black/60 p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="text-[11px] text-[#A8A39A] font-medium">Tilmaamaha GPS (DMS Format):</div>
                    <div className="font-mono text-sm sm:text-base font-bold text-white flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#C2A55D] shrink-0" />
                      <span>{projectGpsDms}</span>
                    </div>
                    <div className="text-[10px] text-gray-400 font-mono">
                      Goobta: {safeCommunity.location}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyGps}
                    className="py-2 px-3.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-gray-200 hover:text-white border border-neutral-600 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                  >
                    {copiedGps ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">GPS Waa La Koobiyeeyay!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Koobiyeey GPS</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Navigation CTA Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <a
                    href={projectGoogleMapsDirections}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl bg-[#C2A55D] hover:bg-[#B3954C] text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md text-center"
                  >
                    <Car className="w-4 h-4" />
                    <span>Toos u Tag (Raac Jidka Google Maps)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={projectAppleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-neutral-600 text-center"
                  >
                    <Globe className="w-4 h-4 text-[#C2A55D]" />
                    <span>Ku Fur Apple Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}

            {/* SECTION 6: INLINE TOUR BOOKING FORM */}
            {(activeTab === 'all' || activeTab === 'tour') && (
              <div id="project-tour-booking" className="bg-white border border-[#E5E2DA] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
                <div>
                  <span className="text-xs text-[#C2A55D] font-bold uppercase tracking-wider">Site Inspection & VIP Tour</span>
                  <h3 className="font-serif-luxury text-2xl text-[#1A1A1A] font-normal mt-1">
                    Qabso Booqasho Goobta ah (Visit {safeCommunity.name})
                  </h3>
                  <p className="text-xs text-[#6B665E] font-light mt-1">
                    Kooxdayada iibka ayaa kugu soo dhaweyn doonta goobta mashruuca si aad indhahaaga ugu soo aragto dhismaha iyo adeegyada.
                  </p>
                </div>

                {tourSubmitted ? (
                  <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                    <h4 className="text-sm font-bold text-emerald-900">Codsigaagii Booqashada Waa La Helay!</h4>
                    <p className="text-xs text-emerald-700">
                      Wakiilkayaga iibka ayaa sida ugu dhakhsaha badan kuula soo xiriiri doona si loo xaqiijiyo ballantaada.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleTourSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#35322E] mb-1">Magacaaga oo Buuxa</label>
                        <input 
                          type="text" 
                          required
                          value={tourName}
                          onChange={(e) => setTourName(e.target.value)}
                          placeholder="Tusaale: Ahmed Cali"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E2DA] bg-[#F9F8F6] text-xs focus:outline-none focus:border-[#C2A55D]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#35322E] mb-1">Taleefankaaga / WhatsApp</label>
                        <input 
                          type="tel" 
                          required
                          value={tourPhone}
                          onChange={(e) => setTourPhone(e.target.value)}
                          placeholder="+252 63 XXXXXXX"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E2DA] bg-[#F9F8F6] text-xs focus:outline-none focus:border-[#C2A55D]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#35322E] mb-1">Maalinta & Waqtiga Aad Doonayso</label>
                      <input 
                        type="date" 
                        value={tourDate}
                        onChange={(e) => setTourDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E2DA] bg-[#F9F8F6] text-xs focus:outline-none focus:border-[#C2A55D]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#35322E] hover:bg-[#1A1815] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4 text-[#C2A55D]" />
                      <span>{language === 'ar' ? 'تأكيد حجز الموعد' : language === 'so' ? 'Xaqiiji Ballanta Booqashada' : 'Confirm Tour Booking'}</span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* SECTION 7: OTHER PROJECTS SWITCHER */}
            <div className="pt-4">
              <h3 className="font-serif-luxury text-xl text-[#1A1A1A] mb-4">
                {language === 'ar' ? 'مشاريع كابسان العقارية الأخرى' : language === 'so' ? 'Mashaariicda Kale ee Kaabsan Real Estate' : 'Other Kaabsan Developments'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'rugsan-gardens', name: 'Rugsan Gardens', loc: 'Masallaha', status: language === 'ar' ? 'وحدات جاهزة للتسليم' : language === 'so' ? 'Guryo Diyaar ah (Ready)' : 'Ready for Handover' },
                  { id: 'aragsan-village', name: 'Aragsan Village', loc: 'Jigjiga Yar', status: language === 'ar' ? 'فلل فاخرة G+1' : language === 'so' ? 'G+1 Luxury Villas' : 'G+1 Luxury Villas' },
                  { id: 'bilicsan-village', name: 'Bilicsan Village', loc: 'Corridor', status: language === 'ar' ? 'فلل متميزة' : language === 'so' ? 'Executive Villas' : 'Executive Villas' },
                  { id: 'masalaha-apartments', name: 'Masallaha Apartments', loc: 'Airport Rd', status: language === 'ar' ? 'شقق فاخرة' : language === 'so' ? 'Luxury Apartments' : 'Luxury Apartments' }
                ].filter(p => p.id !== safeCommunity.id).map(p => (
                  <button
                    key={p.id}
                    onClick={() => onSelectOtherProject(p.id)}
                    className="p-4 rounded-2xl bg-white border border-[#E5E2DA] hover:border-[#C2A55D] text-left transition-all hover:shadow-md cursor-pointer group"
                  >
                    <div className="text-[11px] text-[#C2A55D] font-semibold">{p.status}</div>
                    <div className="font-serif-luxury text-base text-[#1A1A1A] group-hover:text-[#C2A55D] transition-colors font-medium">
                      {p.name}
                    </div>
                    <div className="text-xs text-[#6B665E] mt-0.5">{p.loc}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right 1 Column: Direct Contact, Booking, Brochure Downloads, Telesom Guarantee */}
          <div className="space-y-6">
            
            {/* Quick Action Contact Box */}
            <div className="bg-white border border-[#E5E2DA] rounded-3xl p-6 shadow-sm space-y-5">
              <h3 className="font-serif-luxury text-xl text-[#1A1A1A]">
                Toos ula Xiriir Xafiiska Iibka
              </h3>
              <p className="text-xs text-[#6B665E] font-light leading-relaxed">
                Khubaradayada iibka ee Kaabsan Real Estate waxay diyaar kuugu yihiin xafiiska Telesom Tower ama khadka taleefanka.
              </p>

              <div className="space-y-2.5">
                <a
                  href="tel:380"
                  className="w-full py-3 bg-[#C2A55D] hover:bg-[#B3954C] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>Wac 380 (Telesom Shortcode)</span>
                </a>

                <a
                  href={`https://wa.me/252636100090?text=${encodeURIComponent(`Kaabsan Real Estate Official Website:\nAsc Kaabsan Real Estate, waxaan doonayaa faahfaahinta iyo qiimaha rasmiga ah ee mashruuca ${safeCommunity.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp: +252 63 6100090</span>
                </a>

                <button
                  onClick={() => onOpenContact(`Waxaan rabaa la-talin gaar ah oo ku saabsan ${safeCommunity.name}`)}
                  className="w-full py-2.5 bg-[#F4F1EA] hover:bg-[#EAE6DE] text-[#35322E] text-xs font-bold rounded-xl border border-[#E5E2DA] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Codso La-talin Gaar ah</span>
                </button>
              </div>

              {/* Direct Zaad Pay */}
              <div className="pt-3 border-t border-[#E5E2DA]">
                <button
                  onClick={onOpenPayment}
                  className="w-full py-2 bg-[#EFECE6] hover:bg-[#E5E0D5] text-[#35322E] text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Zaad Merchant & Bank Account Pay</span>
                </button>
              </div>
            </div>

            {/* Official Downloads / Brochures */}
            {projectBrochures.length > 0 && (
              <div className="bg-white border border-[#E5E2DA] rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="font-serif-luxury text-lg text-[#1A1A1A] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#C2A55D]" />
                  Buugagta & Naqshadda (Downloads)
                </h3>
                <p className="text-xs text-[#6B665E] font-light">
                  Kala soo deg buugga rasmiga ah ee {safeCommunity.name} (PDF).
                </p>

                <div className="space-y-2">
                  {projectBrochures.map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => handleDownloadDoc(doc)}
                      disabled={downloadingDocId === doc.id}
                      className="w-full p-3 rounded-xl bg-[#F9F8F6] hover:bg-[#F4F1EA] border border-[#E5E2DA] flex items-center justify-between transition-colors text-xs font-medium text-[#35322E] group text-left cursor-pointer"
                    >
                      <span className="truncate max-w-[190px]">{doc.title}</span>
                      {downloadingDocId === doc.id ? (
                        <span className="w-3.5 h-3.5 border-2 border-[#C2A55D] border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        <Download className="w-3.5 h-3.5 text-[#C2A55D] group-hover:translate-y-0.5 transition-transform shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Telesom Certified Quality Badge Box */}
            <div className="bg-[#24211E] text-white rounded-3xl p-6 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#C2A55D]">
                <ShieldCheck className="w-4 h-4 text-[#C2A55D]" />
                Telesom Group Quality Guarantee
              </div>
              <p className="text-xs text-[#A8A39A] font-light leading-relaxed">
                Mashruuca {safeCommunity.name} waxaa dhisay oo dammaanad qaadaya Kaabsan Real Estate (Shirkad ka tirsan Telesom Group), iyadoo la isticmaalay shubka tayeysan ee Kaabsan Batching Plant.
              </p>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
