import React, { useState } from 'react';
import { Heart, ChevronLeft, ChevronRight, Bed, Bath, Maximize2, Sparkles, MapPin, MessageCircle, ShieldCheck, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { Property } from '../types';
import { useTranslation } from '../context/LanguageContext';
import { SafeImage } from './SafeImage';

interface PropertyCardProps {
  property: Property;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onSelect: (property: Property) => void;
  onAskAI: (property: Property) => void;
  currency: 'USD' | 'EUR' | 'GBP';
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isSaved,
  onToggleSave,
  onSelect,
  onAskAI,
  currency
}) => {
  const { t, language } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = property.galleryImages && property.galleryImages.length > 0
    ? property.galleryImages
    : [property.heroImage];

  const handleWhatsAppPriceInquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(`Kaabsan Real Estate Official Website:\nAsc Kaabsan Real Estate, waxaan rabaa inaan ogaado qiimaha dhabta ah & qorshaha bixinta ee guriga: "${property.title}" (${property.neighborhood}, ${property.city}). Fadlan faahfaahin buuxda iiga soo dira WhatsApp.`);
    window.open(`https://wa.me/252636100090?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      onClick={() => onSelect(property)}
      className="group relative bg-[#FFFFFF] border border-[#E5E2DA] hover:border-[#C2A55D] rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl cursor-pointer flex flex-col"
      id={`property-card-${property.id}`}
    >
      {/* Media Gallery Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F2EFE9]">
        <SafeImage
          src={images[currentImageIndex]}
          alt={property.title}
          width={600}
          height={375}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Gradient Overlay on bottom of image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex flex-wrap gap-1.5 pointer-events-auto">
            {property.status === 'Sold Out' || property.status.toLowerCase().includes('sold out') ? (
              <span className="px-2.5 py-1 bg-red-800 text-white font-extrabold text-[11px] rounded-md shadow-md flex items-center gap-1 border border-red-500/40">
                <span className="w-1.5 h-1.5 rounded-full bg-red-300 animate-pulse"></span>
                {language === 'ar' ? 'تم البيع بالكامل' : language === 'so' ? 'Waa La Kala Gatay' : 'Sold Out'}
              </span>
            ) : property.status === 'Luxury Apartments' ? (
              <span className="px-2.5 py-1 bg-[#1A1A1A]/90 backdrop-blur-md text-[#DFCA85] font-extrabold text-[11px] rounded-md shadow-md flex items-center gap-1 border border-[#C2A55D]/30">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C2A55D]" />
                {language === 'ar' ? 'شقق فاخرة' : language === 'so' ? 'Dabaqyo Raaxo Leh' : 'Luxury Apartments'}
              </span>
            ) : (
              <span className="px-2.5 py-1 bg-[#1A1A1A]/90 backdrop-blur-md text-white font-extrabold text-[11px] rounded-md shadow-md flex items-center gap-1 border border-white/20">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C2A55D]" />
                {language === 'ar' ? 'عقار متاح للبيع' : language === 'so' ? 'Diyaar u ah Iib' : 'Available for Sale'}
              </span>
            )}

            {property.status !== 'Sold Out' && property.paymentPlan && (
              <span className="px-2 py-1 bg-[#C2A55D]/90 backdrop-blur-md text-[#1A1A1A] text-[11px] font-black rounded-md border border-[#C2A55D] hidden sm:inline-block shadow-sm">
                {language === 'ar' ? 'تقسيط 60 شهراً' : language === 'so' ? 'Maalgelin 60 Bilood' : '60-Mo Financing'}
              </span>
            )}
          </div>

          {/* Heart Bookmark Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(property.id);
            }}
            className="pointer-events-auto p-2 rounded-full bg-white/90 backdrop-blur-md text-[#35322E] hover:bg-white transition-colors focus:outline-none shadow-sm cursor-pointer"
            aria-label="Save property"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isSaved ? 'text-[#C2A55D] fill-[#C2A55D]' : 'text-[#6B665E] hover:text-[#1A1A1A]'
              }`}
            />
          </button>
        </div>

        {/* Image Slider Nav Arrows on Hover */}
        {images.length > 1 && (
          <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <button
              onClick={handlePrevImage}
              className="pointer-events-auto p-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#1A1A1A] hover:bg-[#35322E] hover:text-white transition-colors shadow-md cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImage}
              className="pointer-events-auto p-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#1A1A1A] hover:bg-[#35322E] hover:text-white transition-colors shadow-md cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Location & WhatsApp Price Prompt on Image Bottom */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
          <div>
            <div className="text-xs text-[#EBE6DF] font-bold flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#C2A55D]" />
              {property.neighborhood}, {property.city}
            </div>
            <div className="text-xs sm:text-sm text-white font-extrabold flex items-center gap-1.5 mt-0.5 drop-shadow">
              <span className="text-[#DFCA85]">
                {language === 'ar' ? 'السعر: تواصل عبر واتساب' : language === 'so' ? 'Qiimaha: La xidhiidh WhatsApp' : 'Price: Contact on WhatsApp'}
              </span>
            </div>
          </div>

          <div className="text-[11px] text-[#EBE6DF] bg-black/70 px-2.5 py-1 rounded-md backdrop-blur-sm border border-white/10 font-bold shrink-0">
            {property.actualSqm ? (language === 'ar' ? `الأرض: ${property.actualSqm} م²` : language === 'so' ? `Dhulka: ${property.actualSqm} m²` : `Plot: ${property.actualSqm} m²`) : property.lotSize}
          </div>
        </div>
      </div>

      {/* Property Details Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-extrabold text-base sm:text-lg text-[#1A1A1A] tracking-tight leading-snug group-hover:text-[#C2A55D] transition-colors line-clamp-1">
            {property.title}
          </h3>
          <p className="text-xs text-[#6B665E] font-medium mt-1 line-clamp-1">
            {property.address}
          </p>

          {/* Key Specs */}
          <div className="grid grid-cols-3 gap-2 py-3 my-2.5 border-y border-[#E5E2DA] text-xs text-[#4A4742]">
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-[#C2A55D]" />
              <span className="font-bold">{property.beds} {language === 'ar' ? 'غرف' : language === 'so' ? 'Qol' : 'Beds'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-[#C2A55D]" />
              <span className="font-bold">{property.baths} {language === 'ar' ? 'حمامات' : language === 'so' ? 'Musqush' : 'Baths'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-[#C2A55D]" />
              <span className="font-bold truncate">
                {property.builtArea 
                  ? (language === 'ar' ? `بناء: ${property.builtArea} م²` : language === 'so' ? `Dhismaha: ${property.builtArea} m²` : `Built: ${property.builtArea} m²`) 
                  : `${property.sqft.toLocaleString()} Sq.Ft.`}
              </span>
            </div>
          </div>

          {/* WhatsApp Price Button */}
          <button
            type="button"
            onClick={handleWhatsAppPriceInquiry}
            className="w-full mb-3 py-2 bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white font-extrabold text-xs rounded-xl transition-all border border-emerald-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>{language === 'ar' ? 'طلب السعر عبر واتساب' : language === 'so' ? 'Si aad u ogaato Qiimaha (WhatsApp)' : 'Inquire Price via WhatsApp'}</span>
          </button>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-2 flex items-center justify-between border-t border-[#F2EFE9]">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAskAI(property);
            }}
            className="inline-flex items-center gap-1 text-xs text-[#C2A55D] hover:text-[#1A1A1A] font-bold transition-colors group/ai cursor-pointer"
            title="Ask Kaabsan AI Advisor"
          >
            <Sparkles className="w-3 h-3 group-hover/ai:rotate-12 transition-transform" />
            <span>Kaabsan AI</span>
          </button>

          <span className="text-xs text-[#1A1A1A] group-hover:text-[#C2A55D] font-extrabold flex items-center gap-1 transition-colors">
            {language === 'ar' ? 'عرض تفاصيل العقار' : language === 'so' ? 'Eeg Faahfaahinta' : 'View Property'}
            <ChevronRightIcon className="w-3.5 h-3.5 text-[#C2A55D] group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </div>
  );
};
