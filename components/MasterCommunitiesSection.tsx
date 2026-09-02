import React, { useState, Suspense, lazy } from 'react';
import { Shield, Sparkles, MapPin, CheckCircle2, ArrowRight, Home, Building, Users, Calendar, Phone, Map, Grid, Loader2 } from 'lucide-react';
import { MASTER_COMMUNITIES as DEFAULT_MASTER_COMMUNITIES } from '../data/properties';
import { Property, MasterCommunity } from '../types';
import { useTranslation } from '../context/LanguageContext';
import { SafeImage } from './SafeImage';

const InteractiveMasterMap = lazy(() => import('./InteractiveMasterMap').then(m => ({ default: m.InteractiveMasterMap })));

interface MasterCommunitiesSectionProps {
  communities?: MasterCommunity[];
  onSelectMasterCommunity: (id: string) => void;
  onOpenScheduleTour: (communityName: string) => void;
  onOpenContact: (message?: string) => void;
  onOpenCalculator?: () => void;
}

export const MasterCommunitiesSection: React.FC<MasterCommunitiesSectionProps> = ({
  communities,
  onSelectMasterCommunity,
  onOpenScheduleTour,
  onOpenContact,
  onOpenCalculator
}) => {
  const { t, language } = useTranslation();
  const [activeTab, setActiveTab] = useState<'map' | 'cards'>('map');
  const displayCommunities = communities && communities.length > 0 ? communities : DEFAULT_MASTER_COMMUNITIES;

  return (
    <section id="master-projects" className="py-20 bg-[#F9F8F6] border-b border-[#E5E2DA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#C2A55D]"></span>
              <span className="text-xs text-[#C2A55D] font-semibold">
                {language === 'ar' ? 'مشاريع كبرى رائدة ومخططات تفاعلية' : language === 'so' ? 'Mashaariicda Waaweyn & Khariidadda Qorshaha' : 'Flagship Developments & Interactive Masterplan'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl text-[#1A1A1A] font-extrabold tracking-tight">
              {t.projectsMenuTitle || 'Master-Planned Communities'}
            </h2>
            <p className="text-sm text-[#6B665E] max-w-2xl mt-2 font-medium leading-relaxed">
              {t.projectsMenuDesc || 'Experience the pinnacle of planned living in Somaliland. Modern gated environments engineered with top-grade reinforced concrete, 24/7 security, community gyms, parks, and schools.'}
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#6B665E] font-bold bg-[#EFECE6] px-3.5 py-1.5 rounded-full border border-[#E5E2DA]">
              {language === 'ar' ? 'معتمدة ومضمونة من مجموعة تيليسوم' : language === 'so' ? 'Telesom Group Tayo La Hubiyay' : 'Telesom Group Quality Certified'}
            </span>
          </div>
        </div>

        {/* Interactive Master Map (SVG Zoning & Plots) */}
        <div className="mb-14" id="interactive-hargeisa-map">
          <Suspense fallback={
            <div className="w-full h-[400px] bg-[#EFECE6] rounded-2xl border border-[#E5E2DA] flex flex-col items-center justify-center space-y-3">
              <Loader2 className="w-8 h-8 text-[#C2A55D] animate-spin" />
              <p className="text-xs text-[#6B665E] font-medium tracking-wide">Loading Interactive Masterplan...</p>
            </div>
          }>
            <InteractiveMasterMap
              communities={displayCommunities}
              onSelectMasterCommunity={onSelectMasterCommunity}
              onOpenScheduleTour={onOpenScheduleTour}
              onOpenContact={onOpenContact}
              onOpenCalculator={onOpenCalculator}
            />
          </Suspense>
        </div>

        {/* Section divider & Subheading for Flagship Project Cards */}
        <div className="flex items-center justify-between mb-8 pt-4 border-t border-[#E5E2DA]">
          <div>
            <h3 className="text-xl sm:text-2xl text-[#1A1A1A] font-extrabold tracking-tight">
              {language === 'ar' ? 'قائمة المشاريع المعتمدة' : language === 'so' ? 'Mashaariicda Rasmiga ah ee Kaabsan' : 'All Official Kaabsan Master Communities'}
            </h3>
            <p className="text-xs text-[#6B665E] mt-0.5 font-medium">
              {language === 'ar' ? 'تفاصيل الفلل والتاون هاوس والشقق السكنية' : language === 'so' ? 'Dooro mashruuc si aad u aragto buug-gacmeedka iyo naqshadda buuxda' : 'Select a project to explore floorplans, inventory units, and full brochures'}
            </p>
          </div>
        </div>

        {/* Master Communities Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCommunities.map((community, index) => (
            <div
              key={community.id}
              className="bg-[#FFFFFF] border border-[#E5E2DA] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#C2A55D] transition-all duration-300 flex flex-col group"
            >
              {/* Image Container */}
              <div 
                onClick={() => onSelectMasterCommunity(community.id)}
                className="relative aspect-[16/11] overflow-hidden bg-[#EAE6DE] cursor-pointer"
              >
                <SafeImage
                  src={community.image}
                  alt={community.name}
                  width={600}
                  height={412}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.98] contrast-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"></div>
                
                {/* Status Badge */}
                <div className="absolute top-3 left-3 bg-[#35322E]/90 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full text-[11px] font-medium border border-white/20">
                  {community.units}
                </div>

                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <div className="flex items-center gap-1 text-[11px] text-white/90 mb-0.5">
                    <MapPin className="w-3 h-3 text-[#D1B898]" />
                    <span className="truncate">{community.location}</span>
                  </div>
                  <h3 className="font-serif-luxury text-lg font-normal text-white drop-shadow-sm leading-tight group-hover:text-[#D1B898] transition-colors">
                    {community.name}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="inline-block text-[11px] bg-[#F4F1EA] text-[#C2A55D] font-semibold px-2 py-0.5 rounded-md mb-2.5 border border-[#E5E2DA] leading-tight">
                    {community.status}
                  </div>
                  <p className="text-xs text-[#6B665E] font-light leading-relaxed line-clamp-3">
                    {community.description}
                  </p>

                  {/* Features List */}
                  <div className="mt-3.5 space-y-1.5 border-t border-[#E5E2DA] pt-3">
                    {community.features.slice(0, 4).map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#35322E]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C2A55D] flex-shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-3 border-t border-[#E5E2DA] flex flex-col gap-2">
                  <button
                    onClick={() => onSelectMasterCommunity(community.id)}
                    className="w-full py-2.5 bg-[#C2A55D] hover:bg-[#B3954C] text-white text-xs font-bold rounded-xl transition-all text-center cursor-pointer shadow-sm flex items-center justify-center gap-1.5 group/btn"
                  >
                    <span>{t.viewMasterCommunity || (language === 'ar' ? 'عرض المشروع' : language === 'so' ? 'Eeg Mashruuca' : 'View Master Project')}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={() => onOpenContact(`I am inquiring about buying a home in ${community.name} (${community.location})`)}
                      className="flex-1 py-1.5 bg-[#35322E] hover:bg-[#1F1D1A] text-white text-[11px] font-semibold rounded-lg transition-colors text-center cursor-pointer"
                    >
                      {language === 'ar' ? 'استفسار' : language === 'so' ? 'Faahfaahin' : 'Inquire'}
                    </button>
                    <button
                      onClick={() => onOpenScheduleTour(community.name)}
                      className="px-3 py-1.5 bg-[#F4F1EA] hover:bg-[#EAE6DE] text-[#35322E] border border-[#E5E2DA] text-[11px] font-semibold rounded-lg transition-colors cursor-pointer"
                      title="Schedule On-Site Tour"
                    >
                      {language === 'ar' ? 'زيارة ميدانية' : language === 'so' ? 'Kormeer' : 'Tour Site'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
