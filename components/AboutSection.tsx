import React from 'react';
import { Award, Globe, Phone, Mail, CheckCircle2, ShieldCheck, Star, Building2, Layers } from 'lucide-react';
import { TEAM as DEFAULT_TEAM } from '../data/properties';
import { AboutConfig, TeamMember } from '../types';
import { useTranslation } from '../context/LanguageContext';

interface AboutSectionProps {
  aboutConfig?: AboutConfig;
  teamMembers?: TeamMember[];
  onOpenContact: (msg?: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ 
  aboutConfig,
  teamMembers = DEFAULT_TEAM,
  onOpenContact 
}) => {
  const { t, language } = useTranslation();
  const badge = aboutConfig?.badge || t.aboutWelcomeTitle || (language === 'ar' ? 'عن كابسان العقارية' : language === 'so' ? 'Ku Saabsan Kaabsan Real Estate' : 'About Kaabsan Real Estate');
  const title = aboutConfig?.title || (language === 'ar' ? 'ريادة التطوير العمراني في صوماليلاند' : language === 'so' ? 'Dhisidda Magaalooyin Casri ah oo Heersare ah' : 'Shaping Somaliland’s Urban Landscape');
  const description = aboutConfig?.description || (language === 'ar' 
    ? 'كإحدى شركات مجموعة تيليسوم الرائدة، تلتزم كابسان العقارية بتطوير مجتمعات سكنية متكاملة مغلقة وبنية تحتية وفق أعلى المواصفات العالمية.'
    : language === 'so'
    ? 'Qayb ka mid ah bahda Telesom Group, Kaabsan waxay u heellan tahay abuurista magaalooyin casri ah oo leh nabadgelyo buuxda, guryo raaxo leh iyo warshadda shubka oo tijaabaysan.'
    : 'As a proud member of the Telesom Group ecosystem, Kaabsan Real Estate is dedicated to creating sustainable, master-planned residential communities, state-of-the-art commercial complexes, and world-class civil infrastructure across Somaliland.'
  );
  const concretePlantTitle = aboutConfig?.concretePlantTitle || t.concreteTitle || (language === 'ar' ? 'مصنع الخرسانة الجاهزة (Ready-Mix)' : language === 'so' ? 'Warshadda Shubka Diyaar-ka ah' : 'Modern Batching Plant');
  const concretePlantDesc = aboutConfig?.concretePlantDesc || t.concreteDesc || (language === 'ar' ? 'منشأة آلية متطورة تنتج خرسانة جاهزة معتمدة مخبرياً لجميع المشاريع السكنية والمدنية.' : language === 'so' ? 'Waxaan Hargeysa ku shaqaysiinaa warshad automated ah oo soo saarta shubka diyaar-ka ah ee la hubiyay.' : 'We operate an automated, German-engineered concrete batching facility in Hargeisa delivering lab-tested ready-mix concrete for all residential and civic builds.');

  return (
    <section id="about" className="py-20 sm:py-28 bg-[#F9F8F6] border-t border-[#E5E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs text-[#C2A55D] font-semibold mb-3">
            {badge}
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-[#1A1A1A] tracking-tight mb-4">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-[#6B665E] font-light leading-relaxed">
            {description}
          </p>
        </div>

        {/* Leadership Profiles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-[#FFFFFF] border border-[#E5E2DA] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 shadow-sm hover:border-[#C2A55D] transition-all"
            >
              <div className="flex-shrink-0">
                <img
                  src={member.photo}
                  alt={member.name}
                  onError={(e) => {
                    const fallback = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80';
                    if (e.currentTarget.src !== fallback) {
                      e.currentTarget.src = fallback;
                    }
                  }}
                  className="w-36 h-44 sm:w-44 sm:h-56 rounded-xl object-cover border border-[#E5E2DA] shadow-sm"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-[#C2A55D] font-semibold">
                    {language === 'ar' ? 'القيادة التنفيذية' : language === 'so' ? 'Hoggaanka Fulinta' : 'Executive Leadership'}
                  </div>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#1A1A1A] font-normal mt-0.5">
                    {member.name}
                  </h3>
                  <p className="text-xs text-[#6B665E] font-light mb-3">
                    {member.role}
                  </p>
                  
                  <p className="text-xs sm:text-sm text-[#4A4742] font-light leading-relaxed mb-4">
                    {member.bio}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-[#E5E2DA]">
                  <div className="text-xs text-[#8C867D] font-medium">
                    {language === 'ar' ? 'الخبرات والمميزات:' : language === 'so' ? 'Astaamaha Gaarka ah:' : 'Key Distinctions:'}
                  </div>
                  <div className="space-y-1">
                    {(member.accolades || []).slice(0, 3).map((acc, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-[#35322E]">
                        <Star className="w-3 h-3 text-[#C2A55D] flex-shrink-0" />
                        <span className="truncate">{acc}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center gap-4 text-xs text-[#6B665E]">
                    <a href={`tel:${member.phone}`} className="hover:text-[#1A1A1A] transition-colors font-medium">
                      {member.phone}
                    </a>
                    <span>•</span>
                    <a href={`mailto:${member.email}`} className="hover:text-[#C2A55D] transition-colors truncate font-medium">
                      {member.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Telesom Backing & Quality Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#E5E2DA]">
          <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E5E2DA] shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#F4F1EA] border border-[#E5E2DA] flex items-center justify-center text-[#A69177] mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-serif-luxury text-xl text-[#1A1A1A] mb-2 font-normal">
              {language === 'ar' ? 'ثقة وموثوقية مجموعة تيليسوم' : language === 'so' ? 'Kalsoonida Telesom Group' : 'Telesom Group Institutional Trust'}
            </h4>
            <p className="text-xs text-[#6B665E] leading-relaxed font-light">
              {language === 'ar' 
                ? 'مدعومون من أكبر مجموعة اتصالات وخدمات مالية في صوماليلاند، مما يضمن دقة التسليم والشرعية القانونية والأمان الاستثماري.' 
                : language === 'so' 
                ? 'Waxaa garab taagan shirkadda ugu weyn isgaadhsiinta iyo maaliyadda Somaliland, iyadoo damaanad qaadaysa wareejinta guryaha iyo mulkiyadda sugan.'
                : 'Backed by Somaliland\'s premier telecommunications and financial services conglomerate, ensuring guaranteed project delivery, legal security, and transparent deeds.'
              }
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E5E2DA] shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#F4F1EA] border border-[#E5E2DA] flex items-center justify-center text-[#A69177] mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="font-serif-luxury text-xl text-[#1A1A1A] mb-2 font-normal">
              {concretePlantTitle}
            </h4>
            <p className="text-xs text-[#6B665E] leading-relaxed font-light">
              {concretePlantDesc}
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E5E2DA] shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#F4F1EA] border border-[#E5E2DA] flex items-center justify-center text-[#A69177] mb-4">
              <Globe className="w-5 h-5" />
            </div>
            <h4 className="font-serif-luxury text-xl text-[#1A1A1A] mb-2 font-normal">
              {language === 'ar' ? 'خدمة المغتربين والجاليات' : language === 'so' ? 'Adeegga Qurbajoogta' : 'Diaspora Investment Desk'}
            </h4>
            <p className="text-xs text-[#6B665E] leading-relaxed font-light">
              {language === 'ar'
                ? 'مكاتب استشارية في لندن، دبي، ومينيسوتا لخدمة المغتربين، وإصدار وثائق الملكية، والمتابعة بالفيديو المباشر والتمويل لمدة 60 شهراً.'
                : language === 'so'
                ? 'Xafiisyo u gaar ah qurbajoogta London, Dubai, Minneapolis iyo Stockholm si ay u helaan diiwaangelin toos ah, muuqaallo toos ah iyo maalgelin 5 sano ah.'
                : 'Dedicated concierge desks in London, Dubai, Minneapolis, and Stockholm assisting diaspora families with remote title registration, site live video feeds, and 60-month financing.'
              }
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

