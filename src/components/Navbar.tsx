import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Building2, 
  MapPin, 
  Sparkles, 
  Heart, 
  Menu, 
  X, 
  Phone, 
  ChevronDown,
  ShieldCheck,
  ArrowRight,
  Images,
  BookOpen,
  Info,
  DollarSign,
  Tag,
  Calendar,
  Youtube,
  Facebook,
  Instagram,
  MessageCircle
} from 'lucide-react';
import { KaabsanLogo } from './KaabsanLogo';
import { MasterCommunity, Property, SiteConfig } from '../types';
import { Language, loadMergedTranslations, TranslationDictionary } from '../utils/translations';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  savedCount: number;
  onOpenFavorites: () => void;
  onOpenAIAdvisor: () => void;
  onOpenContact: () => void;
  onOpenPayment?: () => void;
  onSelectProject?: (projectId: string) => void;
  currency: 'USD' | 'EUR' | 'GBP';
  setCurrency: (c: 'USD' | 'EUR' | 'GBP') => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  siteConfig?: SiteConfig;
  masterCommunities?: MasterCommunity[];
  properties?: Property[];
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  onOpenFavorites,
  onOpenAIAdvisor,
  onOpenContact,
  onOpenPayment,
  onSelectProject,
  currency,
  setCurrency,
  language,
  setLanguage,
  siteConfig,
  masterCommunities = [],
  properties = []
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const [currencyDropdown, setCurrencyDropdown] = useState(false);
  
  // Smooth mouse hover state with timeout buffer
  const [projectsDropdown, setProjectsDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);

  // Dynamic merged translations
  const [translationsData, setTranslationsData] = useState<Record<Language, TranslationDictionary>>(() => {
    return loadMergedTranslations();
  });

  useEffect(() => {
    const handleTranslationsUpdate = () => {
      setTranslationsData(loadMergedTranslations());
    };
    window.addEventListener('kaabsan_translations_updated', handleTranslationsUpdate);
    return () => window.removeEventListener('kaabsan_translations_updated', handleTranslationsUpdate);
  }, []);

  const t = translationsData[language] || translationsData.en;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100));
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProjectsDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnterProjects = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setProjectsDropdown(true);
  };

  const handleMouseLeaveProjects = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setProjectsDropdown(false);
    }, 220); // 220ms buffer allows effortless diagonal cursor movement
  };

  // Dynamically resolve real uploaded/saved project photos and live information
  const projectsList = useMemo(() => {
    if (masterCommunities && masterCommunities.length > 0) {
      return masterCommunities.map((comm) => {
        const prop = properties.find(pr => pr.id === comm.id || pr.title.toLowerCase().includes(comm.name.toLowerCase()));
        const liveImage = comm.image || prop?.heroImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80';
        
        const livePrice = t.priceOnRequest;

        const liveStatus = comm.status || prop?.status || 'Available for Sale';
        let tag = t.availableBadge;
        let tagColor = 'bg-emerald-100 text-emerald-800 border-emerald-200';

        if (liveStatus.toLowerCase().includes('sold') || liveStatus.toLowerCase().includes('gatay')) {
          tag = t.soldOutBadge;
          tagColor = 'bg-red-100 text-red-700 border-red-200';
        } else if (liveStatus.toLowerCase().includes('plan') || liveStatus.toLowerCase().includes('financing') || liveStatus.toLowerCase().includes('qidmad') || liveStatus.toLowerCase().includes('installment') || liveStatus.toLowerCase().includes('maalgelin')) {
          tag = t.installmentBadge;
          tagColor = 'bg-amber-100 text-amber-800 border-amber-200';
        }

        return {
          id: comm.id,
          name: comm.name,
          location: comm.location,
          type: comm.units,
          tag,
          tagColor,
          fallbackImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
          image: liveImage,
          price: livePrice
        };
      });
    }

    const defaultMeta = [
      {
        id: 'rugsan-gardens',
        name: 'Rugsan Gardens',
        location: language === 'ar' ? 'المصلى (قرب المطار)' : language === 'so' ? 'Masallaha (Madaarka Agtiisa)' : 'Masallaha (Airport Road)',
        type: '70 Modern Townhouses + DSQ',
        tag: t.availableBadge,
        tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        fallbackImg: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=400&q=80',
        image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=400&q=80',
        price: t.priceOnRequest
      },
      {
        id: 'aragsan-village',
        name: 'Aragsan Village',
        location: language === 'ar' ? 'جيجيجا يار (بورتا كلاجيكسان)' : language === 'so' ? 'Jigjiga Yar (Buurta Kala-jeexan)' : 'Jigjiga Yar (Kala-jeexan Hill)',
        type: '66 G+1 Luxury Contemporary Houses',
        tag: t.availableBadge,
        tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        fallbackImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
        price: t.priceOnRequest
      },
      {
        id: 'bilicsan-village',
        name: 'Bilicsan Village',
        location: language === 'ar' ? 'محور جيجيجا يار / المصلى' : language === 'so' ? 'Jigjiga Yar / Masallaha Corridor' : 'Jigjiga Yar / Masallaha Corridor',
        type: 'Modern Family Villas (7 Bedrooms)',
        tag: t.installmentBadge,
        tagColor: 'bg-amber-100 text-amber-800 border-amber-200',
        fallbackImg: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80',
        price: t.priceOnRequest
      },
      {
        id: 'masalaha-apartments',
        name: 'Masallaha Luxury Apartments',
        location: language === 'ar' ? 'طريق مطار المصلى' : language === 'so' ? 'Masallaha Airport Road' : 'Masallaha Airport Road',
        type: '2, 3, 4 Bed & Penthouses (272 m²)',
        tag: language === 'ar' ? 'موقف 81 سيارة' : '81 Car Parking',
        tagColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        fallbackImg: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80',
        price: t.priceOnRequest
      }
    ];

    return defaultMeta;
  }, [masterCommunities, properties, language, t]);

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    if (tabId === 'home' || tabId === 'buy' || tabId === 'sell' || tabId === 'rent' || tabId === 'gallery' || tabId === 'blog' || tabId === 'events' || tabId === 'about' || tabId === 'upcoming') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(tabId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Main Sticky Navbar */}
      <header 
        className={`sticky top-0 w-full z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-[#F9F8F6]/95 backdrop-blur-md border-b border-[#E5E2DA]/80 shadow-md py-3' 
            : 'bg-gradient-to-b from-[#F9F8F6]/95 via-[#F9F8F6]/80 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 lg:gap-6 xl:gap-8">
          {/* Brand Logo */}
          <button 
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group focus:outline-none cursor-pointer py-1 flex-shrink-0 inline-flex items-center"
            id="brand-logo-btn"
            aria-label="Kaabsan Real Estate Home"
          >
            <KaabsanLogo 
              variant="gold" 
              size="md" 
              className="group-hover:opacity-90 transition-opacity flex-shrink-0" 
              customLogoUrl={siteConfig?.company?.logoUrl}
            />
          </button>

          {/* Desktop Nav Items in Exact Order: Home -> Buy -> Sell -> Projects -> Rent & Management -> Gallery -> Blog -> Events -> About Us */}
          <nav className="hidden lg:flex items-center space-x-3 xl:space-x-4 rtl:space-x-reverse flex-shrink-0">
            
            {/* 1. Home */}
            <button
              onClick={() => handleNavClick('home')}
              className={`text-sm font-medium transition-all py-1 relative cursor-pointer whitespace-nowrap ${
                activeTab === 'home'
                  ? 'text-[#C2A55D] font-bold'
                  : 'text-[#4A4742] hover:text-[#1A1A1A]'
              }`}
              id="nav-link-home"
            >
              {t.navHome}
              {activeTab === 'home' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C2A55D] rounded-full"></span>
              )}
            </button>

            {/* 2. Buy */}
            <button
              onClick={() => handleNavClick('buy')}
              className={`text-sm font-medium transition-all py-1 relative cursor-pointer whitespace-nowrap ${
                activeTab === 'buy'
                  ? 'text-[#C2A55D] font-bold'
                  : 'text-[#4A4742] hover:text-[#1A1A1A]'
              }`}
              id="nav-link-buy"
            >
              {t.navBuy}
              {activeTab === 'buy' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C2A55D] rounded-full"></span>
              )}
            </button>

            {/* 3. Sell */}
            <button
              onClick={() => handleNavClick('sell')}
              className={`text-sm font-medium transition-all py-1 relative cursor-pointer whitespace-nowrap ${
                activeTab === 'sell'
                  ? 'text-[#C2A55D] font-bold'
                  : 'text-[#4A4742] hover:text-[#1A1A1A]'
              }`}
              id="nav-link-sell"
            >
              {t.navSell}
              {activeTab === 'sell' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C2A55D] rounded-full"></span>
              )}
            </button>

            {/* 4. Projects Dropdown */}
            <div 
              ref={dropdownRef}
              className="relative py-2"
              onMouseEnter={handleMouseEnterProjects}
              onMouseLeave={handleMouseLeaveProjects}
            >
              <button
                onClick={() => {
                  setProjectsDropdown(!projectsDropdown);
                }}
                className={`flex items-center gap-1 text-sm font-semibold py-1 cursor-pointer transition-all whitespace-nowrap ${
                  activeTab.startsWith('project') || activeTab === 'master-projects' || projectsDropdown
                    ? 'text-[#C2A55D]'
                    : 'text-[#4A4742] hover:text-[#1A1A1A]'
                }`}
                id="nav-projects-dropdown-btn"
                aria-expanded={projectsDropdown}
              >
                <span>{t.navProjects}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${projectsDropdown ? 'rotate-180 text-[#C2A55D]' : ''}`} />
              </button>

              {/* Projects Mega Dropdown Menu */}
              {projectsDropdown && (
                <div 
                  className="absolute left-0 rtl:left-auto rtl:right-0 pt-2 top-full w-[410px] z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                  onMouseEnter={handleMouseEnterProjects}
                  onMouseLeave={handleMouseLeaveProjects}
                >
                  <div className="bg-white border border-[#E5E2DA] rounded-3xl shadow-2xl p-4 ring-1 ring-black/5">
                    <div className="px-2 py-1.5 border-b border-[#F2EFE9] mb-2 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#C2A55D] uppercase tracking-wider">
                        {t.projectsMenuTitle}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {projectsList.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            if (onSelectProject) onSelectProject(p.id);
                            setProjectsDropdown(false);
                          }}
                          className="w-full text-left rtl:text-right p-2.5 rounded-2xl hover:bg-[#F9F8F6] transition-all flex items-center gap-3.5 group cursor-pointer border border-transparent hover:border-[#E5E2DA]"
                        >
                          <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#24211E] flex-shrink-0 border border-[#E5E2DA]">
                            <img 
                              src={p.image} 
                              alt={p.name} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = p.fallbackImg;
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <div className="text-xs font-bold text-[#1A1A1A] group-hover:text-[#C2A55D] transition-colors truncate">
                                {p.name}
                              </div>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border whitespace-nowrap ${p.tagColor}`}>
                                {p.tag}
                              </span>
                            </div>
                            <div className="text-[11px] text-[#6B665E] font-light truncate mt-0.5">
                              {p.location}
                            </div>
                            <div className="text-[11px] font-semibold text-[#C2A55D] mt-0.5">
                              {p.price}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="mt-2.5 pt-2.5 border-t border-[#F2EFE9] flex items-center justify-between px-1">
                      <button
                        onClick={() => {
                          setActiveTab('master-projects');
                          setProjectsDropdown(false);
                          const el = document.getElementById('master-projects');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="w-full text-center py-2 text-xs font-bold text-[#35322E] hover:text-[#C2A55D] hover:bg-[#F4F1EA] rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <span>{t.exploreAllProjects}</span>
                        <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 5. Rent & Management */}
            <button
              onClick={() => handleNavClick('rent')}
              className={`text-sm font-medium transition-all py-1 relative cursor-pointer whitespace-nowrap ${
                activeTab === 'rent'
                  ? 'text-[#C2A55D] font-bold'
                  : 'text-[#4A4742] hover:text-[#1A1A1A]'
              }`}
              id="nav-link-rent"
            >
              {t.navRent}
              {activeTab === 'rent' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C2A55D] rounded-full"></span>
              )}
            </button>

            {/* 6. Gallery */}
            <button
              onClick={() => handleNavClick('gallery')}
              className={`text-sm font-medium transition-all py-1 relative cursor-pointer whitespace-nowrap ${
                activeTab === 'gallery'
                  ? 'text-[#C2A55D] font-bold'
                  : 'text-[#4A4742] hover:text-[#1A1A1A]'
              }`}
              id="nav-link-gallery"
            >
              {t.navGallery}
              {activeTab === 'gallery' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C2A55D] rounded-full"></span>
              )}
            </button>

            {/* 7. Blog */}
            <button
              onClick={() => handleNavClick('blog')}
              className={`text-sm font-medium transition-all py-1 relative cursor-pointer whitespace-nowrap ${
                activeTab === 'blog'
                  ? 'text-[#C2A55D] font-bold'
                  : 'text-[#4A4742] hover:text-[#1A1A1A]'
              }`}
              id="nav-link-blog"
            >
              {t.navBlog}
              {activeTab === 'blog' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C2A55D] rounded-full"></span>
              )}
            </button>

            {/* 8. Events */}
            <button
              onClick={() => handleNavClick('events')}
              className={`text-sm font-medium transition-all py-1 relative cursor-pointer whitespace-nowrap ${
                activeTab === 'events'
                  ? 'text-[#C2A55D] font-bold'
                  : 'text-[#4A4742] hover:text-[#1A1A1A]'
              }`}
              id="nav-link-events"
            >
              {t.navEvents}
              {activeTab === 'events' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C2A55D] rounded-full"></span>
              )}
            </button>

            {/* 9. About Us */}
            <button
              onClick={() => handleNavClick('about')}
              className={`text-sm font-medium transition-all py-1 relative cursor-pointer whitespace-nowrap ${
                activeTab === 'about'
                  ? 'text-[#C2A55D] font-bold'
                  : 'text-[#4A4742] hover:text-[#1A1A1A]'
              }`}
              id="nav-link-about"
            >
              {t.navAbout}
              {activeTab === 'about' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C2A55D] rounded-full"></span>
              )}
            </button>
          </nav>

          {/* Actions: AI Advisor, Favorites, CTA & Mobile Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-3 rtl:space-x-reverse flex-shrink-0">
            {/* AI Advisor Button */}
            <button
              onClick={onOpenAIAdvisor}
              className="flex items-center gap-1.5 bg-[#EFECE6] border border-[#C2A55D]/40 text-[#35322E] hover:border-[#C2A55D] hover:bg-[#E8E4DC] px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shadow-xs group cursor-pointer"
              id="ai-advisor-trigger-btn"
              title="Kaabsan AI Property Advisor"
              aria-label="Kaabsan AI Property Advisor"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C2A55D] group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline font-semibold">Kaabsan AI</span>
            </button>

            {/* Saved Wishlist */}
            <button
              onClick={onOpenFavorites}
              className="relative p-2 text-[#4A4742] hover:text-[#1A1A1A] transition-colors rounded-full hover:bg-[#EFECE6] cursor-pointer"
              id="saved-favorites-btn"
              title={t.navFavorites}
              aria-label={t.navFavorites || "Saved Favorite Properties"}
            >
              <Heart className={`w-4 h-4 ${savedCount > 0 ? 'text-[#C2A55D] fill-[#C2A55D]' : ''}`} />
              {savedCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#C2A55D] text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Book Tour CTA on Desktop */}
            <button
              onClick={onOpenContact}
              className="hidden sm:inline-block bg-[#35322E] hover:bg-[#1F1D1A] text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-sm"
            >
              {t.navScheduleTour}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#4A4742] hover:text-[#1A1A1A] focus:outline-none cursor-pointer"
              id="mobile-menu-toggle-btn"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#F9F8F6] border-b border-[#E5E2DA] px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200 shadow-xl">
            <div className="flex flex-col space-y-1">
              
              {/* 1. Home */}
              <button
                onClick={() => handleNavClick('home')}
                className={`text-left rtl:text-right py-2.5 text-sm font-medium border-b border-[#E5E2DA]/60 ${
                  activeTab === 'home' ? 'text-[#C2A55D] font-bold' : 'text-[#35322E]'
                }`}
              >
                {t.navHome}
              </button>

              {/* 2. Buy */}
              <button
                onClick={() => handleNavClick('buy')}
                className={`text-left rtl:text-right py-2.5 text-sm font-medium border-b border-[#E5E2DA]/60 ${
                  activeTab === 'buy' ? 'text-[#C2A55D] font-bold' : 'text-[#35322E]'
                }`}
              >
                {t.navBuy}
              </button>

              {/* 3. Sell */}
              <button
                onClick={() => handleNavClick('sell')}
                className={`text-left rtl:text-right py-2.5 text-sm font-medium border-b border-[#E5E2DA]/60 ${
                  activeTab === 'sell' ? 'text-[#C2A55D] font-bold' : 'text-[#35322E]'
                }`}
              >
                {t.navSell}
              </button>

              {/* 4. Projects Submenu */}
              <div className="border-b border-[#E5E2DA]/60 pb-2">
                <button
                  onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
                  className="w-full flex items-center justify-between py-2 text-sm font-medium text-[#35322E]"
                >
                  <span className={activeTab.startsWith('project') || activeTab === 'master-projects' ? 'text-[#C2A55D] font-bold' : ''}>
                    {t.navProjects}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-[#C2A55D] transition-transform ${mobileProjectsOpen ? 'rotate-180' : ''}`} />
                </button>

                {mobileProjectsOpen && (
                  <div className="pl-2 rtl:pl-0 rtl:pr-2 space-y-2 py-2">
                    {projectsList.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          if (onSelectProject) onSelectProject(p.id);
                          setMobileMenuOpen(false);
                        }}
                        className="w-full text-left rtl:text-right p-2.5 rounded-xl bg-white border border-[#E5E2DA] hover:border-[#C2A55D] flex items-center gap-3"
                      >
                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-xs text-[#1A1A1A] truncate">{p.name}</div>
                          <div className="text-[10px] text-[#6B665E] truncate">{p.location}</div>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border whitespace-nowrap ${p.tagColor}`}>{p.tag}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 5. Rent & Management */}
              <button
                onClick={() => handleNavClick('rent')}
                className={`text-left rtl:text-right py-2.5 text-sm font-medium border-b border-[#E5E2DA]/60 ${
                  activeTab === 'rent' ? 'text-[#C2A55D] font-bold' : 'text-[#35322E]'
                }`}
              >
                {t.navRent}
              </button>

              {/* 6. Gallery */}
              <button
                onClick={() => handleNavClick('gallery')}
                className={`text-left rtl:text-right py-2.5 text-sm font-medium border-b border-[#E5E2DA]/60 ${
                  activeTab === 'gallery' ? 'text-[#C2A55D] font-bold' : 'text-[#35322E]'
                }`}
              >
                {t.navGallery}
              </button>

              {/* 7. Blog */}
              <button
                onClick={() => handleNavClick('blog')}
                className={`text-left rtl:text-right py-2.5 text-sm font-medium border-b border-[#E5E2DA]/60 ${
                  activeTab === 'blog' ? 'text-[#C2A55D] font-bold' : 'text-[#35322E]'
                }`}
              >
                {t.navBlog}
              </button>

              {/* 8. Events */}
              <button
                onClick={() => handleNavClick('events')}
                className={`text-left rtl:text-right py-2.5 text-sm font-medium border-b border-[#E5E2DA]/60 ${
                  activeTab === 'events' ? 'text-[#C2A55D] font-bold' : 'text-[#35322E]'
                }`}
              >
                {t.navEvents}
              </button>

              {/* 9. About Us */}
              <button
                onClick={() => handleNavClick('about')}
                className={`text-left rtl:text-right py-2.5 text-sm font-medium border-b border-[#E5E2DA]/60 ${
                  activeTab === 'about' ? 'text-[#C2A55D] font-bold' : 'text-[#35322E]'
                }`}
              >
                {t.navAbout}
              </button>

              {/* 10. Kaabsan AI Advisor (Mobile) */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenAIAdvisor) onOpenAIAdvisor();
                }}
                className="w-full text-left rtl:text-right py-2.5 text-sm font-semibold text-[#C2A55D] flex items-center justify-between border-b border-[#E5E2DA]/60"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C2A55D]" />
                  <span>Kaabsan AI Advisor</span>
                </span>
                <span className="text-[10px] bg-[#EFECE6] px-2 py-0.5 rounded-full text-[#35322E] font-bold">24/7 AI</span>
              </button>

              {/* 11. Schedule Tour (Mobile) */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenContact) onOpenContact();
                }}
                className="w-full text-left rtl:text-right py-2.5 text-sm font-bold text-[#1A1A1A] flex items-center gap-2 border-b border-[#E5E2DA]/60"
              >
                <Calendar className="w-4 h-4 text-[#C2A55D]" />
                <span>{t.navScheduleTour}</span>
              </button>

              {/* Direct Actions */}
              <div className="pt-4 flex flex-col space-y-2.5">
                <a 
                  href="tel:380"
                  className="w-full text-center py-2.5 bg-[#C2A55D] hover:bg-[#B3944D] text-white rounded-xl text-xs font-bold shadow-sm flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>{t.shortcodeCall}</span>
                </a>

                {/* Social Icons Bar in Mobile Menu */}
                <div className="flex items-center justify-center gap-3 pt-2">
                  <a
                    href={siteConfig?.socialLinks?.youtube || 'https://www.youtube.com/@kaabsanrealestate'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm flex items-center justify-center"
                    title="YouTube Channel"
                    aria-label="Kaabsan on YouTube"
                  >
                    <Youtube className="w-4 h-4 fill-current" />
                  </a>

                  <a
                    href={siteConfig?.socialLinks?.facebook || 'https://www.facebook.com/kaabsanrealestate/'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-[#1877F2] text-white hover:bg-[#1465cf] transition-colors shadow-sm flex items-center justify-center"
                    title="Facebook"
                    aria-label="Kaabsan on Facebook"
                  >
                    <Facebook className="w-4 h-4 fill-current" />
                  </a>

                  <a
                    href={siteConfig?.socialLinks?.instagram || 'https://www.instagram.com/kaabsanrealestate/'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white transition-colors shadow-sm flex items-center justify-center"
                    title="Instagram"
                    aria-label="Kaabsan on Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>

                  <a
                    href={`https://wa.me/${(siteConfig?.whatsappTemplates?.hotlineNumber || siteConfig?.company?.whatsapp || '+252636100090').replace(/\D/g, '')}?text=${encodeURIComponent('Asc Kaabsan Real Estate, waxaan doonayaa macluumaad.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-[#25D366] text-white hover:bg-[#20ba59] transition-colors shadow-sm flex items-center justify-center"
                    title="WhatsApp"
                    aria-label="Kaabsan on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        )}
        {/* Luxury Gold Scroll Progress Bar Indicator */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#E5E2DA]/40 pointer-events-none z-50">
          <div 
            className="h-full bg-gradient-to-r from-[#C2A55D] via-[#DFCA85] to-[#9E823E] transition-[width] duration-150 ease-out shadow-[0_0_12px_rgba(194,165,93,0.8)]"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>
    </>
  );
};

