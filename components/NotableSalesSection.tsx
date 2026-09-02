import React from 'react';
import { Award, Trophy, CheckCircle, ArrowUpRight, DollarSign, Building2, ShieldCheck } from 'lucide-react';
import { NOTABLE_SALES } from '../data/properties';
import { useTranslation } from '../context/LanguageContext';

interface NotableSalesSectionProps {
  onOpenValuation: () => void;
  onOpenContact: (msg?: string) => void;
}

export const NotableSalesSection: React.FC<NotableSalesSectionProps> = ({ onOpenValuation, onOpenContact }) => {
  const { t, language } = useTranslation();

  return (
    <section id="track-record" className="py-20 sm:py-28 bg-[#F4F1EA] border-t border-[#E5E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#E5E2DA]">
          <div>
            <div className="text-xs text-[#C2A55D] font-semibold mb-3">
              {language === 'ar' ? 'سجل الإنجاز والتسليم الهندسي' : language === 'so' ? 'Mashaariicda La Dhammaystiray & Waayo-aragnimada' : 'Proven Delivery & Execution'}
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-[#1A1A1A] tracking-tight">
              {language === 'ar' ? 'مشاريع مكتملة وسجل تسليم مشرق' : language === 'so' ? 'Mashaariicda La Wareejiyay & Taariikhda Guusha' : 'Delivered Developments & Track Record'}
            </h2>
            <p className="text-xs sm:text-sm text-[#6B665E] font-light mt-2 max-w-2xl">
              {language === 'ar'
                ? 'تتمتع شركة كابسان العقارية بسجل استثنائي لا مثيل له في تسليم المجمعات السكنية الكبرى في المواعيد المحددة مع بنية تحتية هندسية رصينة وصكوك ملكية حرة.'
                : language === 'so'
                ? 'Kaabsan Real Estate waxay leedahay taariikh dahabi ah oo ku saabsan wareejinta mashaariicda waqtigii loogu talagalay oo wata shahaadada mulkiyadda sharciga ah (Title Deeds).'
                : 'Kaabsan Real Estate has an unmatched record of delivering master-planned communities on schedule with superior civil engineering and full ownership title deeds.'
              }
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <span className="font-serif-luxury text-2xl sm:text-3xl text-[#C2A55D]">
              {language === 'ar' ? 'تسليم 100%' : language === 'so' ? '100% La Wareejiyay' : '100% Delivered'}
            </span>
            <span className="block text-xs text-[#6B665E]">
              {language === 'ar' ? 'اكتمل تسليم روغسان المرحلة 1 و 2' : language === 'so' ? 'Rugsan Wajiga 1 & 2 Si Buuxda Loo Wareejiyay' : 'Rugsan Phase 1 & 2 Handover Complete'}
            </span>
          </div>
        </div>

        {/* 2x2 Feature Grid of Delivered Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {NOTABLE_SALES.map((sale) => (
            <div
              key={sale.id}
              className="bg-[#FFFFFF] border border-[#E5E2DA] rounded-2xl overflow-hidden shadow-sm hover:border-[#C2A55D] hover:shadow-lg transition-all duration-300 group"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-[#EAE6DE]">
                <img
                  src={sale.image}
                  alt={sale.title}
                  onError={(e) => {
                    const fallback = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80';
                    if (e.currentTarget.src !== fallback) {
                      e.currentTarget.src = fallback;
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[#35322E] text-xs rounded-md border border-[#E5E2DA] font-semibold shadow-sm">
                    {sale.year}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <div className="text-xs text-[#EBE6DF]">
                      {sale.neighborhood}
                    </div>
                    <h3 className="font-serif-luxury text-xl sm:text-2xl text-white font-normal drop-shadow-md">
                      {sale.title}
                    </h3>
                  </div>

                  <div className="text-right">
                    <div className="font-serif-luxury text-xl sm:text-2xl text-[#E5D2BA] font-normal drop-shadow">
                      {sale.salePrice}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-xs sm:text-sm text-[#4A4742] font-light leading-relaxed mb-4">
                  {sale.description}
                </p>

                <div className="pt-3 border-t border-[#E5E2DA] flex items-center justify-between text-xs text-[#C2A55D]">
                  <span className="font-medium flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C2A55D]" />
                    {sale.notableFact}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Banner for Property Valuation & Land Acquisition */}
        <div className="bg-[#FFFFFF] border border-[#E5E2DA] p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#1A1A1A] font-normal">
              {language === 'ar' ? 'هل تبحث عن شراء، بيع، أو تقييم عقار في هرجيسا؟' : language === 'so' ? 'Ma doonaysaa inaad Iibsato, Iibiso, ama Qiimayso Guri Hargeysa?' : 'Looking to Buy, Sell, or Estimate Property in Hargeisa?'}
            </h3>
            <p className="text-xs sm:text-sm text-[#6B665E] font-light mt-1 max-w-2xl leading-relaxed">
              {language === 'ar'
                ? 'توفر كابسان العقارية نماذج تقييم معتمدة، وتدقيقاً رسمياً للملكية، وهياكل تقسيط إسلامي مرنة تصل إلى 60 شهراً.'
                : language === 'so'
                ? 'Kaabsan Real Estate waxay ku siinaysaa qiimayn suuqeed sax ah, hubinta mulkiyadda sharciga ah, iyo maalgelin 60 bilood ah.'
                : 'Kaabsan Real Estate provides institutional valuation models, certified title verification, and flexible 60-month financing structures.'
              }
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <button
              onClick={onOpenValuation}
              id="notable-sales-valuation-btn"
              className="py-3 px-6 bg-[#35322E] hover:bg-[#1F1D1A] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-sm text-center"
            >
              {language === 'ar' ? 'طلب تقييم عقار' : language === 'so' ? 'Qiimee Gurigaaga' : 'Estimate Valuation'}
            </button>
            <button
              onClick={() => onOpenContact('I would like to speak to a Kaabsan sales representative regarding land or home purchase')}
              id="notable-sales-contact-btn"
              className="py-3 px-5 bg-[#F4F1EA] hover:bg-[#EAE6DE] border border-[#E5E2DA] text-[#35322E] text-xs font-semibold rounded-xl transition-colors cursor-pointer text-center"
            >
              {language === 'ar' ? 'تواصل مع فريق المبيعات' : language === 'so' ? 'La Hadal Kooxda Iibka' : 'Contact Sales Team'}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
