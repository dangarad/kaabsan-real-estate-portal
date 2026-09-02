import React, { useState } from 'react';
import { MapPin, ArrowRight, TrendingUp, Shield, Sparkles } from 'lucide-react';
import { Neighborhood } from '../types';
import { NEIGHBORHOODS } from '../data/properties';
import { useTranslation } from '../context/LanguageContext';

interface NeighborhoodsSectionProps {
  onSelectNeighborhood: (name: string) => void;
  onOpenAIWithNeighborhood: (name: string) => void;
}

export const NeighborhoodsSection: React.FC<NeighborhoodsSectionProps> = ({
  onSelectNeighborhood,
  onOpenAIWithNeighborhood
}) => {
  const { t, language } = useTranslation();
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<Neighborhood>(NEIGHBORHOODS[0]);

  return (
    <section id="neighborhoods" className="py-20 sm:py-28 bg-[#F4F1EA] border-t border-[#E5E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs text-[#C2A55D] font-semibold mb-3">
            {language === 'ar' ? 'أبرز الأحياء والمناطق السكنية' : language === 'so' ? 'Xaafadaha & Degmooyinka Ugu Caansan' : 'Prime Enclaves & Districts'}
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-[#1A1A1A] tracking-tight mb-4">
            {language === 'ar' ? 'أرقى المواقع الاستراتيجية في هرجيسا' : language === 'so' ? 'Goobaha Ugu Qiimaha Badan ee Hargeysa' : 'Hargeisa’s Most Coveted Locations'}
          </h2>
          <p className="text-sm sm:text-base text-[#6B665E] font-light leading-relaxed">
            {language === 'ar'
              ? 'من مجمعات المصلى الحديثة ومناظر الجبال في بوورتا كلاجيكسان، إلى الحي الدبلوماسي العريق في الشعب وحيوية حي جيجيجا يار وطريق المطار.'
              : language === 'so'
              ? 'Laga soo bilaabo magaalada casriga ah ee Masalaha iyo Buurta Kala-jeexan ilaa xaafadda diblomaasiyadda ee Shacabka iyo Jigjiga Yar.'
              : 'From the planned modern expanses of Masalaha and scenic mountain slopes of Buurta Kala-jeexan to the prestigious diplomatic quarter of Shacabka and bustling Jigjiga Yar.'
            }
          </p>
        </div>

        {/* Neighborhood Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-10">
          {NEIGHBORHOODS.map((n) => (
            <button
              key={n.id}
              onClick={() => setSelectedNeighborhood(n)}
              className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                selectedNeighborhood.id === n.id
                  ? 'bg-white border-[#C2A55D] shadow-md'
                  : 'bg-[#EAE6DE] border-[#E5E2DA] hover:bg-white hover:border-[#D5D0C5] text-[#6B665E] hover:text-[#1A1A1A]'
              }`}
            >
              <div className="text-xs font-semibold text-[#1A1A1A] mb-0.5 truncate">{n.name}</div>
              <div className="text-xs text-[#C2A55D] font-medium truncate">{n.pricePerSqft}</div>
            </button>
          ))}
        </div>

        {/* Active Neighborhood Feature Showcase */}
        <div className="bg-[#FFFFFF] border border-[#E5E2DA] rounded-2xl overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Left Column: Image & Tagline */}
          <div className="lg:col-span-7 relative min-h-[360px] lg:min-h-[480px]">
            <img
              src={selectedNeighborhood.image}
              alt={selectedNeighborhood.name}
              onError={(e) => {
                const fallback = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
                if (e.currentTarget.src !== fallback) {
                  e.currentTarget.src = fallback;
                }
              }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs text-[#35322E] font-medium mb-2 shadow-sm">
                <MapPin className="w-3 h-3 text-[#C2A55D]" />
                <span>{language === 'ar' ? 'دليل أحياء هرجيسا السكنية' : language === 'so' ? 'Hagaha Degmooyinka Hargeysa' : 'Hargeisa District Guide'}</span>
              </div>
              <h3 className="font-serif-luxury text-3xl sm:text-4xl text-white font-normal drop-shadow-md">
                {selectedNeighborhood.name}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-200 font-light mt-1 drop-shadow">
                {selectedNeighborhood.tagline}
              </p>
            </div>
          </div>

          {/* Right Column: Key Metrics & Narrative */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white">
            <div>
              <div className="grid grid-cols-2 gap-4 pb-6 border-b border-[#E5E2DA]">
                <div>
                  <div className="text-xs text-[#8C867D] font-medium">{language === 'ar' ? 'متوسط أسعار الفلل' : language === 'so' ? 'Celceliska Qiimaha' : 'Average Home Value'}</div>
                  <div className="font-serif-luxury text-xl sm:text-2xl text-[#C2A55D] mt-0.5 font-semibold">
                    {selectedNeighborhood.avgPrice}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#8C867D] font-medium">{language === 'ar' ? 'سعر القدم المربع' : language === 'so' ? 'Qiimaha Sq.Ft.' : 'Est. Price / Sq.Ft.'}</div>
                  <div className="font-serif-luxury text-xl sm:text-2xl text-[#1A1A1A] mt-0.5">
                    {selectedNeighborhood.pricePerSqft}
                  </div>
                </div>
              </div>

              <div className="py-5 border-b border-[#E5E2DA]">
                <div className="text-xs text-[#8C867D] mb-2 font-semibold">
                  {language === 'ar' ? 'مميزات وطابع المنطقة' : language === 'so' ? 'Astaamaha & Jawiga Xaafadda' : 'District Character & Highlights'}
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {selectedNeighborhood.vibe.map((v) => (
                    <span key={v} className="px-2.5 py-1 bg-[#F4F1EA] border border-[#E5E2DA] text-[#35322E] text-xs rounded-full">
                      {v}
                    </span>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#4A4742] font-light leading-relaxed">
                  {selectedNeighborhood.description}
                </p>
              </div>

              <div className="pt-4">
                <div className="text-xs text-[#8C867D] mb-2 font-semibold">
                  {language === 'ar' ? 'المعالم والخدمات الرئيسية' : language === 'so' ? 'Adeegyada Muhiimka ah' : 'Key Enclave Features'}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#35322E]">
                  {selectedNeighborhood.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C2A55D] flex-shrink-0"></span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="pt-4 border-t border-[#E5E2DA] flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onSelectNeighborhood(selectedNeighborhood.name)}
                className="flex-1 py-3 bg-[#35322E] hover:bg-[#1F1D1A] text-white font-medium text-xs rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span>{language === 'ar' ? `استعرض عقارات ${selectedNeighborhood.name}` : language === 'so' ? `Eeg Guryaha ${selectedNeighborhood.name}` : `View ${selectedNeighborhood.name} Properties`}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C2A55D]" />
              </button>

              <button
                onClick={() => onOpenAIWithNeighborhood(selectedNeighborhood.name)}
                className="px-4 py-3 bg-[#F4F1EA] hover:bg-[#EAE6DE] border border-[#E5E2DA] text-[#35322E] text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer font-medium"
                title="AI Market Intelligence for this district"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C2A55D]" />
                <span className="hidden sm:inline">{language === 'ar' ? 'استشارة الذكاء الاصطناعي' : language === 'so' ? 'Talo AI' : 'AI Comps'}</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
