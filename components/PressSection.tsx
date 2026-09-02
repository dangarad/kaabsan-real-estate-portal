import React from 'react';
import { Newspaper, ExternalLink, ArrowUpRight } from 'lucide-react';
import { PRESS as DEFAULT_PRESS } from '../data/properties';
import { PressArticle } from '../types';
import { useTranslation } from '../context/LanguageContext';

interface PressSectionProps {
  pressArticles?: PressArticle[];
}

export const PressSection: React.FC<PressSectionProps> = ({
  pressArticles = DEFAULT_PRESS
}) => {
  const { t, language } = useTranslation();

  return (
    <section id="press" className="py-20 sm:py-28 bg-[#F9F8F6] border-t border-[#E5E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#E5E2DA]">
          <div>
            <div className="text-xs text-[#C2A55D] font-semibold mb-3">
              {language === 'ar' ? 'المقالات والأخبار والتقارير الإعلامية' : language === 'so' ? 'Qoraallada & Wararka Warbaahinta' : 'Blog Posts & Media Insights'}
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-[#1A1A1A] tracking-tight">
              {language === 'ar' ? 'آخر أخبار وتطورات مشاريع كابسان' : language === 'so' ? 'Wararka & Qoraallada Ugu Dambeeya ee Kaabsan' : 'Latest News & Insights from Kaabsan'}
            </h2>
          </div>

          <div className="mt-4 md:mt-0 text-xs text-[#6B665E]">
            Horn Business • SLNTV • East Africa Real Estate • BBC Somali
          </div>
        </div>

        {/* Press Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pressArticles.map((item) => (
            <div
              key={item.id}
              className="bg-[#FFFFFF] border border-[#E5E2DA] rounded-2xl overflow-hidden shadow-sm hover:border-[#C2A55D] hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-[#EAE6DE]">
                  <img
                    src={item.image}
                    alt={item.publication}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md text-[#35322E] text-xs rounded-md border border-[#E5E2DA] font-semibold shadow-sm">
                      {item.publication}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="text-xs text-[#C2A55D] font-semibold mb-1">
                    {item.category} • {item.date}
                  </div>
                  <h3 className="font-serif-luxury text-lg text-[#1A1A1A] font-normal leading-snug group-hover:text-[#C2A55D] transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#6B665E] font-light leading-relaxed">
                    {item.snippet}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <a
                  href={item.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[#35322E] group-hover:text-[#C2A55D] transition-colors font-semibold"
                >
                  <span>{language === 'ar' ? 'قراءة المقال بالكامل' : language === 'so' ? 'Akhri Qoraalka' : 'Read Article / Blog'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Media Mentions Banner */}
        <div className="mt-16 pt-10 border-t border-[#E5E2DA] text-center">
          <div className="text-xs text-[#8C867D] mb-6 font-medium">
            {language === 'ar' ? 'الشركاء والتغطيات الإعلامية المعتمدة' : language === 'so' ? 'Wada-shaqeynta & Warbaahinta Rasmiga ah' : 'Institutional Coverage & Partners'}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-[#6B665E] text-sm font-serif-luxury">
            <span className="hover:text-[#1A1A1A] transition-colors">Telesom Group</span>
            <span className="hover:text-[#1A1A1A] transition-colors">Dara Salaam Bank</span>
            <span className="hover:text-[#1A1A1A] transition-colors">Horn Business Review</span>
            <span className="hover:text-[#1A1A1A] transition-colors">East Africa Construction Expo</span>
            <span className="hover:text-[#1A1A1A] transition-colors">BBC Somali Business</span>
          </div>
        </div>

      </div>
    </section>
  );
};

