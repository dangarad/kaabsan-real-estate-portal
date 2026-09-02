import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  SlidersHorizontal, 
  Grid, 
  List, 
  ArrowUpDown, 
  Sparkles, 
  RotateCcw,
  Check,
  Building,
  ShieldCheck
} from 'lucide-react';
import { Property } from '../types';
import { PropertyCard } from './PropertyCard';
import { useTranslation } from '../context/LanguageContext';

interface PropertyListingsProps {
  properties: Property[];
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onAskAI: (property: Property) => void;
  currency: 'USD' | 'EUR' | 'GBP';
  filterState: {
    neighborhood: string;
    priceRange: string;
    beds: string;
    style: string;
    keyword: string;
  };
  setFilterState: React.Dispatch<React.SetStateAction<{
    neighborhood: string;
    priceRange: string;
    beds: string;
    style: string;
    keyword: string;
  }>>;
}

export const PropertyListings: React.FC<PropertyListingsProps> = ({
  properties,
  savedIds,
  onToggleSave,
  onSelectProperty,
  onAskAI,
  currency,
  filterState,
  setFilterState
}) => {
  const { t, language } = useTranslation();
  const [activeTab, setActiveTab] = useState<'All' | 'For Sale' | 'Luxury Apartments' | 'Sold Out'>('All');
  const [sortBy, setSortBy] = useState<'price-desc' | 'price-asc' | 'sqft-desc' | 'newest'>('price-desc');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const neighborhoods = ['All', 'Masalaha', 'Buurta Kala-jeexan', 'Jigjiga Yar'];
  const architecturalStyles = ['All', 'Contemporary Urban Villa', 'Modern Mediterranean Villa', 'Modern Contemporary Compound', 'Contemporary High-Rise'];

  const architectStylesTranslated = (styles: string[], lang: string) => {
    return styles.map((s) => {
      if (s === 'All') return { value: 'All', label: lang === 'ar' ? 'جميع التصاميم' : lang === 'so' ? 'Dhammaan Naqshadaha' : 'All Styles' };
      if (s === 'Contemporary Urban Villa') return { value: s, label: lang === 'ar' ? 'فيلا عصرية حديثة' : lang === 'so' ? 'Villa Casri ah (Urban)' : s };
      if (s === 'Modern Mediterranean Villa') return { value: s, label: lang === 'ar' ? 'فيلا على الطراز المتوسطي' : lang === 'so' ? 'Villa Modern Mediterranean' : s };
      if (s === 'Modern Contemporary Compound') return { value: s, label: lang === 'ar' ? 'مجمع سكني متكامل فاخر' : lang === 'so' ? 'Compound Casri ah oo Dhammaystiran' : s };
      if (s === 'Contemporary High-Rise') return { value: s, label: lang === 'ar' ? 'شقق وأبراج سكنية فاخرة' : lang === 'so' ? 'Dabaqyo & Qasriyo Dhaadheer' : s };
      return { value: s, label: s };
    });
  };

  // Filter and Sort Logic
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      // Tab filter
      if (activeTab !== 'All') {
        if (activeTab === 'Sold Out') {
          if (p.status !== 'Sold Out' && !p.status.toLowerCase().includes('sold out')) return false;
        } else if (activeTab === 'For Sale') {
          if (p.status !== 'For Sale') return false;
        } else if (activeTab === 'Luxury Apartments') {
          if (p.status !== 'Luxury Apartments') return false;
        } else if (p.status !== activeTab) {
          return false;
        }
      }

      // Neighborhood filter
      if (filterState.neighborhood !== 'All' && p.neighborhood !== filterState.neighborhood) {
        return false;
      }

      // Price filter
      if (filterState.priceRange !== 'All') {
        const price = p.price;
        if (filterState.priceRange === 'under150' && price > 150000) return false;
        if (filterState.priceRange === '150-250' && (price < 150000 || price > 250000)) return false;
        if (filterState.priceRange === '250-350' && (price < 250000 || price > 350000)) return false;
        if (filterState.priceRange === '350+' && price < 350000) return false;
      }

      // Beds filter
      if (filterState.beds !== 'All') {
        const minBeds = parseInt(filterState.beds.replace('+', ''), 10);
        if (p.beds < minBeds) return false;
      }

      // Style filter
      if (filterState.style !== 'All' && !p.architecturalStyle.toLowerCase().includes(filterState.style.toLowerCase())) {
        return false;
      }

      // Keyword filter
      if (filterState.keyword.trim() !== '') {
        const query = filterState.keyword.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesAddress = p.address.toLowerCase().includes(query);
        const matchesNeighborhood = p.neighborhood.toLowerCase().includes(query);
        const matchesStyle = p.architecturalStyle.toLowerCase().includes(query);
        const matchesAmenities = p.amenities.some((a) => a.toLowerCase().includes(query));
        const matchesFeatures = p.keyFeatures.some((f) => f.toLowerCase().includes(query));
        if (!matchesTitle && !matchesAddress && !matchesNeighborhood && !matchesStyle && !matchesAmenities && !matchesFeatures) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'sqft-desc') return b.sqft - a.sqft;
      if (sortBy === 'newest') return b.yearBuilt - a.yearBuilt;
      return 0;
    });
  }, [properties, activeTab, filterState, sortBy]);

  const handleResetFilters = () => {
    setFilterState({
      neighborhood: 'All',
      priceRange: 'All',
      beds: 'All',
      style: 'All',
      keyword: ''
    });
    setActiveTab('All');
  };

  const isFiltering = filterState.neighborhood !== 'All' ||
    filterState.priceRange !== 'All' ||
    filterState.beds !== 'All' ||
    filterState.style !== 'All' ||
    filterState.keyword !== '' ||
    activeTab !== 'All';

  return (
    <section id="properties" className="py-16 sm:py-24 bg-[#F9F8F6] border-t border-[#E5E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#E5E2DA]">
          <div>
            <div className="text-xs text-[#C2A55D] font-bold mb-2">
              {language === 'ar' ? 'مشاريع وعقارات كابسان' : language === 'so' ? 'Guryaha & Mashaariicda Kaabsan' : 'Kaabsan Real Estate Portfolio'}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A1A1A] tracking-tight">
              {t.featuredPropertiesTitle || 'Properties & Developments For Sale'}
            </h2>
            <p className="text-xs sm:text-sm text-[#6B665E] font-medium mt-2 max-w-2xl leading-relaxed">
              {t.featuredPropertiesSubtitle || 'Explore our master-planned townhouses, luxury apartments, and standalone family villas in Hargeisa with available 60-month Islamic installment financing.'}
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <span className="text-xs text-[#6B665E] font-bold bg-[#EFECE6] px-3.5 py-1.5 rounded-full border border-[#E5E2DA]">
              {filteredProperties.length} {language === 'ar' ? 'عقار متوفر' : language === 'so' ? 'Guri oo Diyaar ah' : 'Properties Available'}
            </span>
          </div>
        </div>

        {/* Filter Tabs Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'All', label: language === 'ar' ? 'الكل (روغسان، أراغسان، بيلكسان، مصالحة)' : language === 'so' ? 'Dhammaan (Rugsan, Aragsan, Bilicsan, Masallaha)' : 'All (Rugsan, Aragsan, Bilicsan, Masallaha)' },
              { id: 'For Sale', label: language === 'ar' ? 'عقارات للبيع' : language === 'so' ? 'Guryo Iib ah (For Sale)' : 'For Sale' },
              { id: 'Luxury Apartments', label: language === 'ar' ? 'شقق مصالحة الفاخرة' : language === 'so' ? 'Masallaha Apartments (Dabaqyo)' : 'Luxury Apartments' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs transition-all cursor-pointer font-medium ${
                  activeTab === tab.id
                    ? 'bg-[#35322E] text-white shadow-md'
                    : 'bg-white text-[#4A4742] border border-[#E5E2DA] hover:border-[#C2A55D] hover:text-[#1A1A1A]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Controls: Sort & Filter Toggle */}
          <div className="flex items-center gap-3">
            {/* Sort Select */}
            <div className="flex items-center gap-2 bg-white border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#35322E]">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#C2A55D]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label={language === 'ar' ? 'ترتيب العقارات' : language === 'so' ? 'Kala saar guryaha' : 'Sort Properties'}
                id="property-listings-sort-select"
                className="bg-transparent text-xs text-[#1A1A1A] focus:outline-none cursor-pointer"
              >
                <option value="price-desc">{language === 'ar' ? 'السعر: من الأعلى للأدنى' : language === 'so' ? 'Qiimaha: Sare ilaa Hoos' : 'Price: High to Low'}</option>
                <option value="price-asc">{language === 'ar' ? 'السعر: من الأدنى للأعلى' : language === 'so' ? 'Qiimaha: Hoos ilaa Sare' : 'Price: Low to High'}</option>
                <option value="sqft-desc">{language === 'ar' ? 'المساحة: الأكبر أولاً' : language === 'so' ? 'Baaxadda: Ugu ballaadhan' : 'Area: Largest First'}</option>
                <option value="newest">{language === 'ar' ? 'الأحدث بناءً' : language === 'so' ? 'Sannadka: Ugu Cusub' : 'Year: Newest Built'}</option>
              </select>
            </div>

            {/* Advanced Filters Button */}
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs transition-colors cursor-pointer ${
                showAdvancedFilters || isFiltering
                  ? 'bg-[#C2A55D] text-white border-[#C2A55D]'
                  : 'bg-white text-[#4A4742] border-[#E5E2DA] hover:border-[#C2A55D]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'تصفية' : language === 'so' ? 'Shaandhaynta' : 'Filters'}</span>
              {isFiltering && <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>}
            </button>
          </div>
        </div>

        {/* Advanced Filters Panel */}
        {showAdvancedFilters && (
          <div className="bg-[#FFFFFF] border border-[#E5E2DA] rounded-2xl p-5 mb-8 shadow-sm animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Neighborhood */}
              <div>
                <label className="block text-xs text-[#6B665E] font-medium mb-1">
                  {language === 'ar' ? 'المنطقة / الحي' : language === 'so' ? 'Xaafadda / Degmada' : 'District / Neighborhood'}
                </label>
                <select
                  value={filterState.neighborhood}
                  onChange={(e) => setFilterState((prev) => ({ ...prev, neighborhood: e.target.value }))}
                  className="w-full bg-[#F9F8F6] border border-[#E5E2DA] focus:border-[#C2A55D] rounded-xl px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none cursor-pointer"
                >
                  {neighborhoods.map((n) => (
                    <option key={n} value={n}>
                      {n === 'All' ? (language === 'ar' ? 'جميع المناطق' : language === 'so' ? 'Dhammaan Xaafadaha' : 'All Districts') : n}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-xs text-[#6B665E] font-medium mb-1">
                  {language === 'ar' ? 'نطاق السعر ($ USD)' : language === 'so' ? 'Xadka Qiimaha ($ USD)' : 'Price Range ($ USD)'}
                </label>
                <select
                  value={filterState.priceRange}
                  onChange={(e) => setFilterState((prev) => ({ ...prev, priceRange: e.target.value }))}
                  className="w-full bg-[#F9F8F6] border border-[#E5E2DA] focus:border-[#C2A55D] rounded-xl px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none cursor-pointer"
                >
                  <option value="All">{language === 'ar' ? 'جميع الأسعار' : language === 'so' ? 'Dhammaan Qiimaha' : 'All Prices'}</option>
                  <option value="under150">{language === 'ar' ? 'أقل من $150,000' : language === 'so' ? 'Ka yar $150,000' : 'Under $150,000'}</option>
                  <option value="150-250">$150,000 – $250,000</option>
                  <option value="250-350">$250,000 – $350,000</option>
                  <option value="350+">{language === 'ar' ? 'أكثر من $350,000 فاخر/تجاري' : language === 'so' ? '$350,000+ Guryo Heer Sare ah' : '$350,000+ Luxury / Commercial'}</option>
                </select>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-xs text-[#6B665E] font-medium mb-1">
                  {language === 'ar' ? 'عدد الغرف' : language === 'so' ? 'Tirada Qolalka' : 'Bedrooms'}
                </label>
                <select
                  value={filterState.beds}
                  onChange={(e) => setFilterState((prev) => ({ ...prev, beds: e.target.value }))}
                  className="w-full bg-[#F9F8F6] border border-[#E5E2DA] focus:border-[#C2A55D] rounded-xl px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none cursor-pointer"
                >
                  <option value="All">{language === 'ar' ? 'جميع الغرف' : language === 'so' ? 'Dhammaan Qolalka' : 'All Bedrooms'}</option>
                  <option value="2+">{language === 'ar' ? '2+ غرف نوم' : language === 'so' ? '2+ Qolal' : '2+ Bedrooms'}</option>
                  <option value="4+">{language === 'ar' ? '4+ غرف نوم' : language === 'so' ? '4+ Qolal' : '4+ Bedrooms'}</option>
                  <option value="6+">{language === 'ar' ? '6+ غرف نوم (فيلات وتاون هاوس)' : language === 'so' ? '6+ Qolal (Fiilooyin & Townhouses)' : '6+ Bedrooms (Townhouses & Villas)'}</option>
                </select>
              </div>

              {/* Architectural Style */}
              <div>
                <label className="block text-xs text-[#6B665E] font-medium mb-1">
                  {language === 'ar' ? 'طراز وتصميم العقار' : language === 'so' ? 'Qaabka & Naqshadda' : 'Design / Property Style'}
                </label>
                <select
                  value={filterState.style}
                  onChange={(e) => setFilterState((prev) => ({ ...prev, style: e.target.value }))}
                  className="w-full bg-[#F9F8F6] border border-[#E5E2DA] focus:border-[#C2A55D] rounded-xl px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none cursor-pointer"
                >
                  {architectStylesTranslated(architecturalStyles, language).map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="mt-4 pt-4 border-t border-[#E5E2DA] flex items-center justify-between">
              <span className="text-xs text-[#6B665E]">
                {language === 'ar'
                  ? `عرض ${filteredProperties.length} من أصل ${properties.length} عقار`
                  : language === 'so'
                  ? `Muujinaya ${filteredProperties.length} ka mid ah ${properties.length} guri`
                  : `Showing ${filteredProperties.length} of ${properties.length} properties`}
              </span>
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1.5 text-xs text-[#C2A55D] hover:text-[#35322E] font-semibold cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'إعادة ضبط التصفية' : language === 'so' ? 'Dib u deji Shaandhada' : 'Reset All Filters'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Property Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isSaved={savedIds.includes(property.id)}
                onToggleSave={onToggleSave}
                onSelect={onSelectProperty}
                onAskAI={onAskAI}
                currency={currency}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-[#E5E2DA] rounded-3xl p-8 shadow-sm">
            <h3 className="font-serif-luxury text-2xl text-[#1A1A1A] mb-2 font-normal">
              {language === 'ar' ? 'لم يتم العثور على عقارات مطابقة للبحث' : language === 'so' ? 'Wax guryo ah oo ku habboon lama helin' : 'No Properties Match Your Search'}
            </h3>
            <p className="text-xs text-[#6B665E] max-w-md mx-auto mb-6">
              {language === 'ar'
                ? 'جرب تعديل معايير البحث والتصفية أو استشر مستشار الذكاء الاصطناعي لكابسان للاطلاع على المراحل القادمة.'
                : language === 'so'
                ? 'Fadlan bedel shuruudaha shaandhada ama la tasho Kaabsan AI Advisor si aad u hesho wejiyada cusub.'
                : 'Try adjusting your filter criteria or consult our Kaabsan AI Advisor for off-market developments and upcoming project phases.'}
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 bg-[#35322E] hover:bg-[#1F1D1A] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-sm"
            >
              {language === 'ar' ? 'مسح جميع التصفية' : language === 'so' ? 'Tirtir Shaandhada' : 'Clear All Filters'}
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
