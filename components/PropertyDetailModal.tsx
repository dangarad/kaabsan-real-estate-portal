import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  Share2, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  Calendar, 
  Building, 
  Check, 
  Phone, 
  Mail, 
  Calculator, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  Printer,
  FileText,
  Layers,
  CreditCard
} from 'lucide-react';
import { Property } from '../types';
import { useTranslation } from '../context/LanguageContext';

interface PropertyDetailModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onOpenScheduleTour: (property: Property) => void;
  onAskAIWithContext: (property: Property, initialQuestion?: string) => void;
  currency: 'USD' | 'EUR' | 'GBP';
  siteConfig?: any;
  onOpenPayment?: (propertyTitle?: string) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  isOpen,
  onClose,
  isSaved,
  onToggleSave,
  onOpenScheduleTour,
  onAskAIWithContext,
  currency,
  siteConfig,
  onOpenPayment
}) => {
  const { t, language } = useTranslation();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [financingMonths, setFinancingMonths] = useState(60);
  const [paymentRoute, setPaymentRoute] = useState<'cash' | 'bank_route'>('cash');
  const [copiedShare, setCopiedShare] = useState(false);

  if (!isOpen || !property) return null;

  const images = property.galleryImages && property.galleryImages.length > 0
    ? property.galleryImages
    : [property.heroImage];

  const markupPercent = siteConfig?.bankFinancing?.markupPercent || 15;
  const isBankRoute = paymentRoute === 'bank_route';
  const basePrice = property.price || 225000;
  const bankMarkupAmount = Math.round(basePrice * (markupPercent / 100));
  const effectivePrice = isBankRoute ? basePrice + bankMarkupAmount : basePrice;

  const formatPrice = (amount: number) => {
    let rate = 1;
    let symbol = '$';
    if (currency === 'EUR') {
      rate = 0.92;
      symbol = '€';
    } else if (currency === 'GBP') {
      rate = 0.79;
      symbol = '£';
    }
    const converted = Math.round(amount * rate);
    return `${symbol}${converted.toLocaleString()}`;
  };

  // Financing calculation based on selected route
  const downPaymentAmount = effectivePrice * (downPaymentPercent / 100);
  const financedBalance = effectivePrice - downPaymentAmount;
  const monthlyInstallment = Math.round(financedBalance / financingMonths);

  const pricePerSqFt = Math.round(effectivePrice / (property.sqft || 1));

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppInquiry = () => {
    const phone = siteConfig?.whatsappTemplates?.hotlineNumber || siteConfig?.company?.whatsapp || '+252636100090';
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    
    let msg = '';
    if (isBankRoute) {
      msg = siteConfig?.whatsappTemplates?.bankRoutePurchase || `Asc Kaabsan, waxaan doonayaa inaan ku iibsado Bank Route (+15% Bank Facility) guriga {property_title}. Qiimaha Asalka: {base_price}, Qiimaha Bangiga (+15%): {bank_price}. Fadlan faahfaahin iga siiya sida bangiyada (Dahabshiil / Premier / Dara-Salaam) aan u mariyo.`;
      msg = msg
        .replace('{property_title}', property.title)
        .replace('{base_price}', formatPrice(basePrice))
        .replace('{bank_price}', formatPrice(effectivePrice));
    } else {
      msg = siteConfig?.whatsappTemplates?.cashPurchase || `Asc Kaabsan, waxaan rabaa inaan guri ku iibsado Cash / Direct Kaabsan (0% Bank Markup) oo ah {property_title} qiimihiisuna yahay {price}. Sideen u bilaabi karaa?`;
      msg = msg
        .replace('{property_title}', property.title)
        .replace('{price}', formatPrice(basePrice));
    }

    const formatted = `Kaabsan Real Estate Official Website:\nAsc Kaabsan Real Estate, waxaan rabaa inaan ogaado qiimaha dhabta ah & faahfaahinta guriga "${property.title}" (${property.neighborhood}, ${property.city}). Fadlan faahfaahin buuxda & qorshaha bixinta iiga soo dira WhatsApp.`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(formatted)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-300">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-[#FFFFFF] border border-[#E5E2DA] rounded-2xl shadow-2xl text-[#1A1A1A] my-auto overflow-hidden">
        
        {/* Top Floating Control Bar */}
        <div className="sticky top-0 z-30 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E5E2DA] px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#C2A55D] font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Kaabsan Real Estate | {property.status}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggleSave(property.id)}
              className="p-2 rounded-full bg-[#F4F1EA] hover:bg-[#EAE6DE] text-[#35322E] transition-colors cursor-pointer"
              title="Save to Favorites"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'text-[#C2A55D] fill-[#C2A55D]' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-[#F4F1EA] hover:bg-[#EAE6DE] text-[#35322E] transition-colors relative cursor-pointer"
              title="Share Listing"
            >
              <Share2 className="w-4 h-4" />
              {copiedShare && (
                <span className="absolute -bottom-7 right-0 bg-[#35322E] text-white text-[9px] font-bold px-2 py-0.5 rounded shadow whitespace-nowrap">
                  Link Copied!
                </span>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="p-2 rounded-full bg-[#F4F1EA] hover:bg-[#EAE6DE] text-[#35322E] transition-colors hidden sm:inline-flex cursor-pointer"
              title="Print Brochure"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#F4F1EA] hover:bg-[#EAE6DE] text-[#35322E] transition-colors ml-2 cursor-pointer"
              id="close-property-modal-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hero Gallery Slider */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-[#24211E] overflow-hidden">
          <img
            src={images[activeImageIndex]}
            alt={property.title}
            onError={(e) => {
              const fallback = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85';
              if (e.currentTarget.src !== fallback) {
                e.currentTarget.src = fallback;
              }
            }}
            className="w-full h-full object-cover transition-all duration-500"
          />

          {/* Nav buttons for gallery */}
          {images.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
              <button
                onClick={() => setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                className="pointer-events-auto p-2 rounded-full bg-white/85 backdrop-blur-md text-[#1A1A1A] hover:bg-[#35322E] hover:text-white transition-colors cursor-pointer shadow-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                className="pointer-events-auto p-2 rounded-full bg-white/85 backdrop-blur-md text-[#1A1A1A] hover:bg-[#35322E] hover:text-white transition-colors cursor-pointer shadow-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Thumbnails row */}
        {images.length > 1 && (
          <div className="flex gap-2 p-3 bg-[#F4F1EA] overflow-x-auto border-b border-[#E5E2DA] scrollbar-none">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                  idx === activeImageIndex ? 'border-[#A69177] opacity-100 scale-105 shadow-sm' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt="thumbnail"
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

        {/* Modal Main Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Header Title, Address, and Price */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-[#E5E2DA]">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#C2A55D] font-bold mb-1">
                <MapPin className="w-3.5 h-3.5" />
                {property.neighborhood}, {property.city}, Somaliland
              </div>
              <h1 className="text-2xl sm:text-4xl text-[#1A1A1A] font-extrabold tracking-tight leading-tight">
                {property.title}
              </h1>
              <p className="text-sm sm:text-base text-[#6B665E] font-medium mt-1">
                {property.subtitle}
              </p>
            </div>

            <div className="flex flex-col gap-3 min-w-[280px]">
              {/* WhatsApp Price Inquiry Box */}
              <div className="p-4 rounded-2xl border bg-[#F9F8F6] border-[#C2A55D]/60 shadow-sm">
                <div className="text-xs text-[#8C867D] font-bold">
                  {language === 'ar' ? 'معلومات السعر وخطة الأقساط' : language === 'so' ? 'Xogta Qiimaha & Qorshaha Bixinta' : 'Pricing & Payment Terms'}
                </div>
                <div className="text-sm sm:text-base text-[#1A1A1A] font-extrabold mt-1 leading-snug">
                  {language === 'ar' ? 'لمعرفة السعر الرسمي وتفاصيل التقسيط، يرجى التواصل عبر واتساب' : language === 'so' ? 'Si aad u ogaato Qiimaha fadlan la xidhiidh WhatsApp-ka' : 'For current pricing and installment breakdown, please contact via WhatsApp'}
                </div>
                <button
                  type="button"
                  onClick={handleWhatsAppInquiry}
                  className="w-full mt-3 py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'تواصل عبر واتساب للسعر' : language === 'so' ? 'Kala Xidhiidh WhatsApp Qiimaha' : 'Contact WhatsApp for Price'}</span>
                </button>
                <div className="text-[11px] text-emerald-800 font-bold mt-2 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{language === 'ar' ? 'تمويل إسلامي مرابحة متوفر حتى 60 شهراً' : language === 'so' ? 'Maalgelin Islaami ah oo ilaa 60 bilood ah' : 'Islamic Murabaha financing available up to 60 mos'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 py-4 px-5 bg-[#F9F8F6] rounded-xl border border-[#E5E2DA] text-center">
            <div className="p-2">
              <div className="text-xs text-[#6B665E] font-medium">{language === 'ar' ? 'الغرف' : language === 'so' ? 'Qolalka' : 'Bedrooms'}</div>
              <div className="font-serif-luxury text-xl text-[#1A1A1A] mt-0.5 flex items-center justify-center gap-1">
                <Bed className="w-4 h-4 text-[#C2A55D]" />
                {property.beds}
              </div>
            </div>
            <div className="p-2">
              <div className="text-xs text-[#6B665E] font-medium">{language === 'ar' ? 'الحمامات' : language === 'so' ? 'Musqushaha' : 'Bathrooms'}</div>
              <div className="font-serif-luxury text-xl text-[#1A1A1A] mt-0.5 flex items-center justify-center gap-1">
                <Bath className="w-4 h-4 text-[#C2A55D]" />
                {property.baths}
              </div>
            </div>
            <div className="p-2">
              <div className="text-xs text-[#6B665E] font-medium">{language === 'ar' ? 'مساحة البناء' : language === 'so' ? 'Dhismaha' : 'Built Area'}</div>
              <div className="font-serif-luxury text-xl text-[#1A1A1A] mt-0.5 flex items-center justify-center gap-1">
                <Maximize2 className="w-4 h-4 text-[#C2A55D]" />
                {property.builtArea ? `${property.builtArea} m²` : `${property.sqft} sqft`}
              </div>
            </div>
            <div className="p-2">
              <div className="text-xs text-[#6B665E] font-medium">{language === 'ar' ? 'مساحة الأرض' : language === 'so' ? 'Dhulka' : 'Plot Size'}</div>
              <div className="font-serif-luxury text-xl text-[#1A1A1A] mt-0.5 flex items-center justify-center gap-1">
                <Layers className="w-4 h-4 text-[#C2A55D]" />
                {property.actualSqm ? `${property.actualSqm} m²` : property.lotSize}
              </div>
            </div>
            <div className="p-2">
              <div className="text-xs text-[#6B665E] font-medium">{language === 'ar' ? 'سنة الإنجاز' : language === 'so' ? 'Sannadka' : 'Year Built'}</div>
              <div className="font-serif-luxury text-xl text-[#1A1A1A] mt-0.5 flex items-center justify-center gap-1">
                <Calendar className="w-4 h-4 text-[#C2A55D]" />
                {property.yearBuilt}
              </div>
            </div>
            <div className="p-2">
              <div className="text-xs text-[#6B665E] font-medium">{language === 'ar' ? 'النمط' : language === 'so' ? 'Naqshadda' : 'Style'}</div>
              <div className="font-serif-luxury text-base text-[#1A1A1A] mt-0.5 truncate" title={property.architecturalStyle}>
                {property.architecturalStyle}
              </div>
            </div>
          </div>

          {/* Description & AI Advisor Callout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 Cols: Narrative Description & Key Features */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="font-serif-luxury text-xl text-[#1A1A1A] mb-3 flex items-center gap-2">
                  <span>Development & Living Overview</span>
                  <span className="h-[1px] flex-1 bg-[#E5E2DA]"></span>
                </h3>
                <p className="text-sm sm:text-base text-[#4A4742] font-light leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              {/* Floor Plans Table (For Apartments like Masallaha) */}
              {property.floorPlans && property.floorPlans.length > 0 && (
                <div>
                  <h3 className="font-serif-luxury text-xl text-[#1A1A1A] mb-3 flex items-center gap-2">
                    <span>Naqshadaha & Cabirrada Dabaqyada (Floor Plans & Sizes)</span>
                    <span className="h-[1px] flex-1 bg-[#E5E2DA]"></span>
                  </h3>
                  <div className="bg-[#F9F8F6] rounded-2xl border border-[#E5E2DA] overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#EAE6DE] text-[#35322E] font-bold">
                        <tr>
                          <th className="p-3">Nooca Dabaqa (Typology)</th>
                          <th className="p-3">Bedka / Area</th>
                          <th className="p-3">Faahfaahin (Details)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E5E2DA]">
                        {property.floorPlans.map((fp, idx) => (
                          <tr key={idx} className="hover:bg-white/60 transition-colors">
                            <td className="p-3 font-semibold text-[#1A1A1A]">{fp.name}</td>
                            <td className="p-3 font-mono font-bold text-[#C2A55D]">{fp.area}</td>
                            <td className="p-3 text-[#6B665E]">{fp.details}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Available Inventory Units Table (For Aragsan Village) */}
              {property.inventoryUnits && property.inventoryUnits.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-serif-luxury text-xl text-[#1A1A1A] flex items-center gap-2">
                      <span>Guryaha Iibka Diyaarka ah (Available Units for Sale)</span>
                      <span className="h-[1px] flex-1 bg-[#E5E2DA]"></span>
                    </h3>
                  </div>
                  <div className="bg-[#F9F8F6] rounded-2xl border border-[#E5E2DA] overflow-hidden">
                    <div className="max-h-72 overflow-y-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="sticky top-0 bg-[#EAE6DE] text-[#35322E] font-bold z-10">
                          <tr>
                            <th className="p-2.5">SN</th>
                            <th className="p-2.5">Villa No</th>
                            <th className="p-2.5">Villa Type</th>
                            <th className="p-2.5">Actual SQM</th>
                            <th className="p-2.5">Built Area</th>
                            <th className="p-2.5">Purchase Price</th>
                            <th className="p-2.5">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E5E2DA]">
                          {property.inventoryUnits.map((u) => (
                            <tr key={u.sn} className="hover:bg-emerald-50/50 transition-colors">
                              <td className="p-2.5 font-mono text-gray-500">{u.sn}</td>
                              <td className="p-2.5 font-bold text-[#1A1A1A]">{u.villaNo}</td>
                              <td className="p-2.5 font-semibold text-emerald-700">{u.villaType}</td>
                              <td className="p-2.5 font-mono font-medium">{u.actualSqm} m²</td>
                              <td className="p-2.5 font-mono font-medium">{u.builtArea} m²</td>
                              <td className="p-2.5 font-mono font-bold text-emerald-600">{u.priceDisplay}</td>
                              <td className="p-2.5">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                  {u.status || 'Available'}
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

              {/* Key Features List */}
              <div>
                <h3 className="font-serif-luxury text-xl text-[#1A1A1A] mb-3 flex items-center gap-2">
                  <span>Specifications & Infrastructure Highlights</span>
                  <span className="h-[1px] flex-1 bg-[#E5E2DA]"></span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {property.keyFeatures.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#35322E] bg-[#F9F8F6] p-2.5 rounded-xl border border-[#E5E2DA]">
                      <Check className="w-4 h-4 text-[#C2A55D] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="font-serif-luxury text-xl text-[#1A1A1A] mb-3 flex items-center gap-2">
                  <span>Community Amenities</span>
                  <span className="h-[1px] flex-1 bg-[#E5E2DA]"></span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="px-3 py-1.5 bg-[#F4F1EA] border border-[#E5E2DA] text-[#35322E] text-xs rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 1 Col: Exclusive Agent Card & Schedule Tour CTA */}
            <div className="space-y-6">
              {/* Agent Representation Card */}
              <div className="bg-[#F9F8F6] border border-[#E5E2DA] p-5 rounded-2xl shadow-sm">
                <div className="text-xs text-[#C2A55D] font-semibold mb-3">
                  Kaabsan Project Representative
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={property.agent.photo}
                    alt={property.agent.name}
                    onError={(e) => {
                      const fallback = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80';
                      if (e.currentTarget.src !== fallback) {
                        e.currentTarget.src = fallback;
                      }
                    }}
                    className="w-14 h-14 rounded-full object-cover border border-[#E5E2DA]"
                  />
                  <div>
                    <h4 className="font-serif-luxury text-lg text-[#1A1A1A] font-normal">{property.agent.name}</h4>
                    <p className="text-xs text-[#6B665E]">{property.agent.title}</p>
                    <p className="text-xs text-[#C2A55D] font-semibold mt-0.5">Kaabsan Real Estate</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-[#4A4742] mb-5 border-t border-[#E5E2DA] pt-3">
                  <a href="tel:380" className="flex items-center gap-2 text-[#C2A55D] font-semibold">
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call 380 (Telesom Shortcode)</span>
                  </a>
                  <a href={`tel:${property.agent.phone}`} className="flex items-center gap-2 hover:text-[#1A1A1A] transition-colors font-mono">
                    <Phone className="w-3.5 h-3.5 text-[#C2A55D]" />
                    <span>{property.agent.phone}</span>
                  </a>
                  <a href={`mailto:${property.agent.email}`} className="flex items-center gap-2 hover:text-[#C2A55D] transition-colors">
                    <Mail className="w-3.5 h-3.5 text-[#C2A55D]" />
                    <span>{property.agent.email}</span>
                  </a>
                </div>

                <button
                  onClick={() => onOpenScheduleTour(property)}
                  className="w-full py-3 bg-[#35322E] hover:bg-[#1F1D1A] text-white font-semibold text-xs rounded-xl transition-colors shadow-md cursor-pointer"
                  id="schedule-private-viewing-btn"
                >
                  {language === 'ar' ? 'حجز موعد للمعاينة الميدانية' : language === 'so' ? 'Qabso Ballan Kormeer' : 'Book On-Site Visit'}
                </button>
              </div>

              {/* AI Real Estate Intelligence Widget */}
              <div className="bg-[#FFFFFF] border border-[#C2A55D]/40 p-5 rounded-2xl shadow-sm">
                <div className="flex items-center gap-2 text-[#C2A55D] text-xs font-semibold mb-2">
                  <Sparkles className="w-4 h-4 text-[#C2A55D]" />
                  <span>{language === 'ar' ? 'مستشار كابسان الذكي' : language === 'so' ? 'La-taliyaha Kaabsan AI' : 'Kaabsan AI Advisor'}</span>
                </div>
                <p className="text-xs text-[#6B665E] font-light mb-4">
                  {language === 'ar' 
                    ? 'استفسر عن خطط التقسيط، المخططات، تسجيل وثائق الملكية ومواصفات البناء.' 
                    : language === 'so' 
                    ? 'Weydii qorshaha bixinta 60-ka bilood, lahaanshaha, iyo faahfaahinta dhismaha.' 
                    : 'Ask about installment structures, unit layouts, title deeds registration, and construction specs.'}
                </p>
                <div className="space-y-2">
                  <button
                    onClick={() => onAskAIWithContext(property, `Explain the 60-month payment plan, down payment requirement, and title transfer timeline for ${property.title}.`)}
                    className="w-full text-left px-3 py-2 bg-[#F9F8F6] hover:bg-[#F2EFE9] text-xs text-[#35322E] hover:text-[#1A1A1A] border border-[#E5E2DA] rounded-lg transition-colors cursor-pointer"
                  >
                    ✦ {language === 'ar' ? 'كيف يعمل نظام التقسيط 60 شهراً؟' : language === 'so' ? 'Sidee buu u shaqeeyaa qorshaha 60-ka bilood?' : 'How does the 60-month financing work?'}
                  </button>
                  <button
                    onClick={() => onAskAIWithContext(property, `What are the civil construction standards, batching concrete specs, and delivery guarantees for ${property.title}?`)}
                    className="w-full text-left px-3 py-2 bg-[#F9F8F6] hover:bg-[#F2EFE9] text-xs text-[#35322E] hover:text-[#1A1A1A] border border-[#E5E2DA] rounded-lg transition-colors cursor-pointer"
                  >
                    ✦ {language === 'ar' ? 'جودة البناء ومواصفات الخرسانة' : language === 'so' ? 'Tayada dhismaha iyo shamiitada' : 'Construction Quality & Concrete Specs'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 60-Month Islamic & Murabaha Financing Calculator */}
          <div className="bg-[#F4F1EA] border border-[#E5E2DA] p-6 sm:p-7 rounded-3xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#C2A55D] mb-1">
                  <Calculator className="w-4 h-4 text-[#C2A55D]" />
                  <span>{language === 'ar' ? 'حاسبة التمويل الإسلامي بالمرابحة' : language === 'so' ? 'Xisaabiyaha Maalgelinta Muraabaxada' : 'Murabaha Financing Calculator'}</span>
                </div>
                <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#1A1A1A]">
                  {language === 'ar' ? `خطة السداد 60 شهراً لـ ${property.title}` : language === 'so' ? `Qorshaha Bixinta 60-ka Bilood ee ${property.title}` : `60-Month Payment Plan for ${property.title}`}
                </h3>
              </div>

              {/* In-calculator route toggle */}
              <div className="flex bg-white p-1 rounded-xl border border-[#E5E2DA] shadow-xs">
                <button
                  type="button"
                  onClick={() => setPaymentRoute('cash')}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    !isBankRoute ? 'bg-[#35322E] text-white shadow-xs' : 'text-[#6B665E] hover:text-[#1A1A1A]'
                  }`}
                >
                  {language === 'ar' ? 'نقداً (0%)' : language === 'so' ? 'Caddaan (0%)' : 'Cash (0%)'}
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentRoute('bank_route')}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isBankRoute ? 'bg-[#C2A55D] text-white shadow-xs' : 'text-[#6B665E] hover:text-[#1A1A1A]'
                  }`}
                >
                  {language === 'ar' ? 'تمويل (+15% مرابحة)' : language === 'so' ? 'Maalgelin (+15% Muraabaxo)' : 'Financing (+15% Murabaha)'}
                </button>
              </div>
            </div>

            {/* Main Interactive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
              
              {/* Sliders Area (2 Cols) */}
              <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-[#E5E2DA] space-y-5">
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-[#1A1A1A] mb-2">
                    <span className="text-[#6B665E]">{language === 'ar' ? 'الدفعة الأولى:' : language === 'so' ? 'Horumarinta Hore:' : 'Upfront Down Payment:'}</span>
                    <span className="text-[#C2A55D] font-mono text-sm">{downPaymentPercent}% ({formatPrice(downPaymentAmount)})</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="60"
                    step="5"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full accent-[#C2A55D] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#8C867D] font-mono mt-1">
                    <span>15%</span>
                    <span>30% {language === 'ar' ? '(القياسي)' : language === 'so' ? '(Heerka)' : '(Standard)'}</span>
                    <span>60%</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-[#1A1A1A] mb-2">
                    <span className="text-[#6B665E]">{language === 'ar' ? 'مدة التمويل:' : language === 'so' ? 'Muddada Maalgelinta:' : 'Financing Period:'}</span>
                    <span className="text-[#C2A55D] font-mono text-sm">
                      {financingMonths} {language === 'ar' ? 'شهراً' : language === 'so' ? 'Bilood' : 'Months'} ({Math.round(financingMonths / 12)} {language === 'ar' ? 'سنوات' : language === 'so' ? 'Sano' : 'Years'})
                    </span>
                  </div>
                  <select
                    value={financingMonths}
                    onChange={(e) => setFinancingMonths(Number(e.target.value))}
                    className="w-full bg-[#F9F8F6] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1A1A1A] font-semibold cursor-pointer outline-none focus:border-[#C2A55D]"
                  >
                    <option value="12">12 {language === 'ar' ? 'شهراً (سنة واحدة)' : language === 'so' ? 'Bilood (1 Sano)' : 'Months (1 Year)'}</option>
                    <option value="24">24 {language === 'ar' ? 'شهراً (سنتان)' : language === 'so' ? 'Bilood (2 Sano)' : 'Months (2 Years)'}</option>
                    <option value="36">36 {language === 'ar' ? 'شهراً (3 سنوات)' : language === 'so' ? 'Bilood (3 Sano)' : 'Months (3 Years)'}</option>
                    <option value="48">48 {language === 'ar' ? 'شهراً (4 سنوات)' : language === 'so' ? 'Bilood (4 Sano)' : 'Months (4 Years)'}</option>
                    <option value="60">60 {language === 'ar' ? 'شهراً (5 سنوات - بنك دار السلام)' : language === 'so' ? 'Bilood (5 Sano - Dara Salaam Bank)' : 'Months (5 Years - Dara Salaam Bank)'}</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#E5E2DA] text-xs">
                  <div>
                    <span className="text-[#8C867D] block text-[11px]">{language === 'ar' ? 'إجمالي العقار:' : language === 'so' ? 'Wadarta Guriga:' : 'Total Property Price:'}</span>
                    <span className="font-bold text-[#1A1A1A] font-mono">{formatPrice(effectivePrice)}</span>
                  </div>
                  <div>
                    <span className="text-[#8C867D] block text-[11px]">{language === 'ar' ? 'الرصيد الممول المتبقي:' : language === 'so' ? 'Hadhaaga la qaybinayo:' : 'Financed Balance:'}</span>
                    <span className="font-bold text-[#C2A55D] font-mono">{formatPrice(financedBalance)}</span>
                  </div>
                </div>
              </div>

              {/* Result & Murabaha Breakdown Card (1 Col) */}
              <div className={`p-5 rounded-2xl border flex flex-col justify-between shadow-sm ${
                isBankRoute ? 'bg-[#24211E] text-white border-[#C2A55D]' : 'bg-white text-[#1A1A1A] border-[#E5E2DA]'
              }`}>
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className={isBankRoute ? 'text-[#C2A55D] font-bold' : 'text-[#6B665E] font-medium'}>
                      {isBankRoute 
                        ? (language === 'ar' ? 'تمويل المرابحة (15%)' : language === 'so' ? 'Maalgelinta Muraabaxada (15%)' : 'Murabaha Financing (15%)') 
                        : (language === 'ar' ? 'الشراء المباشر النقدي' : language === 'so' ? 'Iibka Tooska ah' : 'Cash Outright')}
                    </span>
                    <span className="text-[10px] bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                      0% Riba
                    </span>
                  </div>

                  {isBankRoute && (
                    <div className="space-y-1.5 text-xs border-b border-white/10 pb-3 mb-3">
                      <div className="flex justify-between text-gray-300 text-[11px]">
                        <span>{language === 'ar' ? 'السعر الأصلي:' : language === 'so' ? 'Qiimaha Asalka ah:' : 'Base Price:'}</span>
                        <span className="font-mono">{formatPrice(basePrice)}</span>
                      </div>
                      <div className="flex justify-between text-amber-300 font-medium text-[11px]">
                        <span>{language === 'ar' ? 'المرابحة (+15%):' : language === 'so' ? 'Muraabaxada (+15%):' : 'Markup (+15%):'}</span>
                        <span className="font-mono">+{formatPrice(bankMarkupAmount)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-white text-xs pt-1 border-t border-white/10">
                        <span>{language === 'ar' ? 'الإجمالي العام:' : language === 'so' ? 'Wadarta Guud:' : 'Total Amount:'}</span>
                        <span className="font-mono text-[#C2A55D]">{formatPrice(effectivePrice)}</span>
                      </div>
                    </div>
                  )}

                  <div className="text-center py-2">
                    <div className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">
                      {language === 'ar' ? 'القسط الشهري' : language === 'so' ? 'Bixinta Billaha ah' : 'Monthly Installment'}
                    </div>
                    <div className="font-serif-luxury text-3xl font-bold text-[#C2A55D] mt-1">
                      {formatPrice(monthlyInstallment)}
                      <span className="text-xs font-sans text-gray-400 font-normal"> / {language === 'ar' ? 'شهر' : language === 'so' ? 'bil' : 'mo'}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 space-y-2">
                  {onOpenPayment && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenPayment(property.title);
                      }}
                      className="w-full py-2.5 px-4 bg-[#1A1815] hover:bg-[#35322E] text-[#DFCA85] border border-[#C2A55D]/40 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <CreditCard className="w-3.5 h-3.5 text-[#C2A55D]" />
                      <span>{language === 'ar' ? 'الحسابات البنكية والدفع المباشر' : language === 'so' ? 'Akoonnada Bangiyada & Bixi Hadda' : 'Bank Accounts & Direct Pay'}</span>
                    </button>
                  )}
                  <button
                    onClick={handleWhatsAppInquiry}
                    className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>{language === 'ar' ? 'طلب عبر واتساب' : language === 'so' ? 'Ku Dalbo WhatsApp' : 'Apply via WhatsApp'}</span>
                  </button>
                  <div className="text-[10px] text-center text-gray-400">
                    {language === 'ar' ? 'البنوك الشريكة: دار السلام، دهب شيل، بريمير' : language === 'so' ? 'Bangiyada: Dara Salaam, Dahabshiil, Premier' : 'Partner Banks: Dara Salaam, Dahabshiil, Premier'}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
