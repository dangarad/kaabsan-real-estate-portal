import React, { useState, useEffect } from 'react';
import { Search, MapPin, DollarSign, Bed, Home, ArrowRight, ShieldCheck, Award, Sparkles, Building2, Phone } from 'lucide-react';
import { Property, SiteConfig } from '../types';
import { useTranslation } from '../context/LanguageContext';

interface HeroProps {
  siteConfig?: SiteConfig;
  onSearch: (filters: {
    neighborhood: string;
    priceRange: string;
    beds: string;
    style?: string;
    keyword: string;
  }) => void;
  onExploreClick?: () => void;
  onOpenValuation: () => void;
  onOpenAIAdvisor: () => void;
  onOpenContact: (msg?: string) => void;
}

const DEFAULT_HERO_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=75',
    title: 'Rugsan Gardens Master Community',
    location: 'Masallaha, Hargeisa'
  },
  {
    url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=75',
    title: 'Aragsan Village Modern Villas',
    location: 'Buurta Kala-jeexan, Jigjiga Yar'
  },
  {
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=75',
    title: 'Masallaha Luxury Apartments & Penthouses',
    location: 'Airport Road Corridor, Hargeisa'
  }
];

export const Hero: React.FC<HeroProps> = ({
  siteConfig,
  onSearch,
  onExploreClick,
  onOpenValuation,
  onOpenAIAdvisor,
  onOpenContact
}) => {
  const { t, language } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadedSlides, setLoadedSlides] = useState<Set<number>>(() => new Set([0]));
  const [neighborhood, setNeighborhood] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [beds, setBeds] = useState('All');
  const [style, setStyle] = useState('All');
  const [keyword, setKeyword] = useState('');

  const heroImages = siteConfig?.hero?.heroImages?.length
    ? siteConfig.hero.heroImages
    : DEFAULT_HERO_IMAGES;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % heroImages.length;
        setLoadedSlides((s) => new Set(s).add(next));
        return next;
      });
    }, 6500);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      neighborhood,
      priceRange,
      beds,
      style,
      keyword
    });
    if (onExploreClick) onExploreClick();
  };

  return (
    <div className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#24211E] text-white">
      {/* Background Image Carousel with zoom animation */}
      {heroImages.map((img, index) => {
        const shouldRender = loadedSlides.has(index) || index === 0;
        return (
          <div
            key={img.url + index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-105 will-change-transform' : 'opacity-0 scale-100 pointer-events-none'
            } transform transition-transform duration-[7000ms]`}
          >
            {shouldRender && (
              <img
                src={img.url}
                alt={img.title}
                width={1200}
                height={800}
                loading={index === 0 ? "eager" : "lazy"}
                decoding={index === 0 ? "sync" : "async"}
                fetchPriority={index === 0 ? "high" : "low"}
                onError={(e) => {
                  const fallback = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=75';
                  if (e.currentTarget.src !== fallback) {
                    e.currentTarget.src = fallback;
                  }
                }}
                className="w-full h-full object-cover object-center filter brightness-[0.60]"
              />
            )}
          </div>
        );
      })}

      {/* Luxury Gradient Overlay - Natural Warm Tone */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#F9F8F6] via-transparent to-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/30 to-black/70 pointer-events-none" />

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-12 flex-1 flex flex-col justify-center items-center text-center">
        {/* Top Tagline */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1F1D1A]/85 border border-[#C2A55D]/40 backdrop-blur-md mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <span className="w-2 h-2 rounded-full bg-[#C2A55D] animate-ping"></span>
          <span className="text-xs text-[#EBE6DF] font-medium tracking-wide">
            {siteConfig?.hero?.badge || t.heroBadge || 'Part of Telesom Group • Somaliland Premier Real Estate'}
          </span>
        </div>

        {/* Hero Headline */}
        <h1 className="font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight max-w-5xl leading-[1.08] mb-6 drop-shadow-2xl text-white">
          {siteConfig?.hero?.title || t.heroTitle || (
            <>
              Building Modern Communities <br />
              <span className="font-extrabold text-[#DFCA85]">Across Somaliland</span>
            </>
          )}
        </h1>

        {/* Hero Subtitle */}
        {((siteConfig?.hero?.subtitle !== undefined && siteConfig.hero.subtitle.trim().length > 0) ? siteConfig.hero.subtitle : t.heroSubtitle) && (
          <p className="text-neutral-200 text-sm sm:text-base md:text-lg max-w-3xl font-medium tracking-wide leading-relaxed mb-10 drop-shadow-md">
            {(siteConfig?.hero?.subtitle !== undefined && siteConfig.hero.subtitle.trim().length > 0)
              ? siteConfig.hero.subtitle
              : t.heroSubtitle}
          </p>
        )}

        {/* Rapid Search Bar - Natural Tones Light Card */}
        <div className="w-full max-w-5xl bg-[#FFFFFF]/95 backdrop-blur-xl border border-[#E5E2DA] p-3 sm:p-5 rounded-2xl shadow-2xl text-[#1A1A1A]">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center">
            {/* Neighborhood / Enclave */}
            <div className="text-left px-3 py-2 bg-[#F9F8F6] rounded-xl border border-[#E5E2DA] focus-within:border-[#C2A55D] transition-colors">
              <label htmlFor="hero-search-location" className="block text-xs text-[#6B665E] font-medium">{t.heroDistrictSelect || 'District / Area'}</label>
              <select
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="w-full bg-transparent text-sm text-[#1A1A1A] font-light focus:outline-none cursor-pointer mt-0.5"
                id="hero-search-location"
                aria-label={t.heroDistrictSelect || 'District / Area'}
              >
                <option value="All">{t.heroAllDistricts || 'All Districts'}</option>
                <option value="Masalaha">Masalaha (Rugsan Gardens)</option>
                <option value="Buurta Kala-jeexan">Buurta Kala-jeexan (Aragsan)</option>
                <option value="Jigjiga Yar">Jigjiga Yar</option>
                <option value="Shacabka">Shacabka (Diplomatic)</option>
                <option value="Airport Road">Airport Road</option>
                <option value="Ibrahim Koodbuur">Ibrahim Koodbuur</option>
                <option value="Ahmed Dhagax">Ahmed Dhagax</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="text-left px-3 py-2 bg-[#F9F8F6] rounded-xl border border-[#E5E2DA] focus-within:border-[#C2A55D] transition-colors">
              <label htmlFor="hero-search-price" className="block text-xs text-[#6B665E] font-medium">{language === 'ar' ? 'الميزانية ($ USD)' : language === 'so' ? 'Miisaaniyadda ($ USD)' : 'Budget ($ USD)'}</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full bg-transparent text-sm text-[#1A1A1A] font-light focus:outline-none cursor-pointer mt-0.5"
                id="hero-search-price"
                aria-label={language === 'ar' ? 'الميزانية ($ USD)' : language === 'so' ? 'Miisaaniyadda ($ USD)' : 'Budget ($ USD)'}
              >
                <option value="All">{language === 'ar' ? 'جميع الأسعار' : language === 'so' ? 'Dhammaan Qiimaha' : 'Any Budget'}</option>
                <option value="under150">$100k – $150k</option>
                <option value="150-250">$150k – $250k</option>
                <option value="250-350">$250k – $350k</option>
                <option value="350+">$350k+ Prime Estate</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div className="text-left px-3 py-2 bg-[#F9F8F6] rounded-xl border border-[#E5E2DA] focus-within:border-[#C2A55D] transition-colors">
              <label htmlFor="hero-search-beds" className="block text-xs text-[#6B665E] font-medium">{t.bedsLabel || 'Bedrooms'}</label>
              <select
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
                className="w-full bg-transparent text-sm text-[#1A1A1A] font-light focus:outline-none cursor-pointer mt-0.5"
                id="hero-search-beds"
                aria-label={t.bedsLabel || 'Bedrooms'}
              >
                <option value="All">{t.heroAllTypes || 'Any Bedrooms'}</option>
                <option value="2+">2-3 Bed Apartments</option>
                <option value="4+">4-5 Bed Homes</option>
                <option value="6+">6+ Bed Townhouses & Villas</option>
              </select>
            </div>

            {/* Keyword / Development */}
            <div className="text-left px-3 py-2 bg-[#F9F8F6] rounded-xl border border-[#E5E2DA] focus-within:border-[#C2A55D] transition-colors">
              <label htmlFor="hero-search-keyword" className="block text-xs text-[#6B665E] font-medium">{language === 'ar' ? 'بحث باسم المشروع' : language === 'so' ? 'Erayga / Mashruuca' : 'Keyword / Project'}</label>
              <input
                type="text"
                placeholder={t.heroSearchPlaceholder || "e.g. Rugsan, Aragsan, Gated, Gym"}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full bg-transparent text-sm text-[#1A1A1A] font-light focus:outline-none placeholder:text-[#8C867D] mt-0.5"
                id="hero-search-keyword"
                aria-label={language === 'ar' ? 'بحث باسم المشروع' : language === 'so' ? 'Erayga / Mashruuca' : 'Keyword / Project'}
              />
            </div>

            {/* Search Submit Button */}
            <button
              type="submit"
              className="w-full h-full min-h-[52px] bg-[#35322E] hover:bg-[#1F1D1A] text-white font-semibold rounded-xl flex items-center justify-center gap-2 text-xs transition-all shadow-md cursor-pointer"
              id="hero-search-submit-btn"
              aria-label={t.heroExploreBtn || 'Explore Listings'}
            >
              <Search className="w-4 h-4 text-[#C2A55D]" />
              <span>{t.heroExploreBtn || 'Explore Listings'}</span>
            </button>
          </form>

          {/* Quick Filter Tags */}
          <div className="mt-3.5 pt-3 border-t border-[#E5E2DA] flex flex-wrap items-center justify-between gap-2 text-xs text-[#6B665E]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-[#8C867D] font-bold">{language === 'ar' ? 'المشاريع:' : language === 'so' ? 'Mashaariicda:' : 'Projects:'}</span>
              {['Rugsan Gardens', 'Aragsan Village', 'Bilicsan Village', 'Masallaha Apartments', language === 'ar' ? 'تمويل 5 سنوات' : language === 'so' ? '5 Sano Maalgelin' : '5-Year Financing'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    const cleanTag = tag.split(' ')[0];
                    setKeyword(cleanTag);
                    onSearch({ neighborhood: 'All', priceRange: 'All', beds: 'All', style: 'All', keyword: cleanTag });
                    if (onExploreClick) onExploreClick();
                  }}
                  className="px-2.5 py-1 rounded-full bg-[#F2EFE9] border border-[#E5E2DA] text-[11px] font-bold text-[#4A4742] hover:border-[#C2A55D] hover:text-[#1A1A1A] hover:bg-white transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={onOpenAIAdvisor}
              className="inline-flex items-center gap-1.5 text-[#C2A55D] hover:text-[#35322E] hover:underline text-xs font-bold cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C2A55D]" />
              <span>{t.heroAiAdvisorBtn || 'Ask Kaabsan AI Advisor'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Stats Row at Bottom */}
      <div className="relative z-10 border-t border-[#E5E2DA] bg-[#F9F8F6] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="border-r border-[#E5E2DA] last:border-none">
            <div className="text-2xl sm:text-3xl lg:text-4xl text-[#C2A55D] font-extrabold tracking-tight">
              {t.statDeliveredHomes || '250+'}
            </div>
            <div className="text-xs text-[#6B665E] mt-1 font-bold">
              {t.statDeliveredHomesLabel || 'Rugsan Townhouses Delivered'}
            </div>
          </div>

          <div className="border-r border-[#E5E2DA] last:border-none">
            <div className="text-2xl sm:text-3xl lg:text-4xl text-[#1A1A1A] font-extrabold tracking-tight">
              {language === 'ar' ? '60 شهراً' : language === 'so' ? '60 Bilood' : '60 Months'}
            </div>
            <div className="text-xs text-[#6B665E] mt-1 font-bold">
              {language === 'ar' ? 'تمويل إسلامي مرن بدون فوائد (0% Riba)' : language === 'so' ? 'Maalgelin Islaami ah (0% Riba)' : 'Flexible Islamic Financing (0% Riba)'}
            </div>
          </div>

          <div className="border-r border-[#E5E2DA] last:border-none">
            <div className="text-2xl sm:text-3xl lg:text-4xl text-[#1A1A1A] font-extrabold tracking-tight">
              Telesom Group
            </div>
            <div className="text-xs text-[#6B665E] mt-1 font-bold">
              {language === 'ar' ? 'ثقة وموثوقية مؤسسية كبرى' : language === 'so' ? 'Kalsooni & Khibrad Ganacsi' : 'Institutional Backing & Trust'}
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl lg:text-4xl text-[#C2A55D] font-extrabold tracking-tight">
              Batching Plant
            </div>
            <div className="text-xs text-[#6B665E] mt-1 font-bold">
              {t.concreteBadge || 'Certified Ready-Mixed Concrete'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

