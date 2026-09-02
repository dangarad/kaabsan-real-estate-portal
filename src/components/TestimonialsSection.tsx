import React from 'react';
import { Star, Quote, MapPin, Building2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { TestimonialItem } from '../types';
import { useTranslation } from '../context/LanguageContext';

interface TestimonialsSectionProps {
  testimonials: TestimonialItem[];
  onOpenContact: (msg?: string) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  onOpenContact
}) => {
  const { t, language } = useTranslation();

  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-[#F4F1EA] border-t border-[#E5E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#E5E2DA]">
          <div>
            <div className="text-xs text-[#C2A55D] font-semibold mb-3 flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-[#C2A55D] text-[#C2A55D]" /> 
              <span>
                {language === 'ar' ? 'آراء وتجارب العملاء والملاك' : language === 'so' ? 'Aragtida Macaamiisha' : 'Client Stories & Testimonials'}
              </span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-[#1A1A1A] tracking-tight">
              {language === 'ar' ? 'ثقة مئات العائلات والمغتربين' : language === 'so' ? 'Kalsoonida Qoysaska & Qurbajoogta' : 'Trusted by Families & Diaspora'}
            </h2>
            <p className="text-xs sm:text-sm text-[#6B665E] font-light mt-2 max-w-2xl">
              {language === 'ar'
                ? 'مئات العائلات في صوماليلاند والمملكة المتحدة والولايات المتحدة وكندا والخليج العربي تسكن وتستثمر بثقة في روغسان جاردنز وقرية أراغسان وشقق المصلى.'
                : language === 'so'
                ? 'Boqolaal qoys oo jooga Somaliland, UK, USA, Canada, iyo Europe ayaa ku nool ama maalgashaday mashaariicda Rugsan Gardens, Aragsan Village, iyo Masallaha Apartments.'
                : 'Hundreds of proud families across Somaliland, the UK, USA, Canada, and the Gulf reside and invest in Rugsan Gardens, Aragsan Village, and Masallaha Apartments.'
              }
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <div className="flex -space-x-2">
              {testimonials.map((tItem, idx) => (
                <img
                  key={idx}
                  src={tItem.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80'}
                  alt={tItem.clientName}
                  className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-xs"
                />
              ))}
            </div>
            <div>
              <div className="flex items-center text-[#C2A55D]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#C2A55D]" />
                ))}
              </div>
              <span className="text-xs font-bold text-[#1A1A1A]">
                {language === 'ar' ? '4.9 / 5.0 (+500 عائلة)' : language === 'so' ? '4.9 / 5.0 (500+ Qoys)' : '4.9 / 5.0 (500+ Families)'}
              </span>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-[#FFFFFF] border border-[#E5E2DA] rounded-2xl p-7 flex flex-col justify-between shadow-sm hover:border-[#C2A55D] hover:shadow-md transition-all duration-300 relative group"
            >
              <div className="space-y-4">
                {/* Quote icon and rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-[#C2A55D] gap-0.5">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C2A55D] text-[#C2A55D]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#E5E2DA] group-hover:text-[#C2A55D]/30 transition-colors" />
                </div>

                {/* Testimonial Quote */}
                <p className="text-xs sm:text-sm text-[#4A4742] font-light leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Client Info & Property */}
              <div className="pt-5 mt-6 border-t border-[#F0ECE1] flex items-center gap-3.5">
                <img
                  src={item.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'}
                  alt={item.clientName}
                  className="w-11 h-11 rounded-full object-cover border border-[#E5E2DA] shadow-xs flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-xs sm:text-sm text-[#1A1A1A] truncate">
                    {item.clientName}
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-[#8C867D] truncate">
                    <MapPin className="w-3 h-3 text-[#C2A55D] flex-shrink-0" />
                    <span>{item.clientLocation}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-[#A69177] font-medium truncate mt-0.5">
                    <Building2 className="w-2.5 h-2.5 flex-shrink-0" />
                    <span>{item.propertyPurchased}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Diaspora Guarantee Strip */}
        <div className="mt-12 bg-white rounded-2xl border border-[#E5E2DA] p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F4F1EA] text-[#C2A55D] flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-xs sm:text-sm text-[#1A1A1A]">
                {language === 'ar' ? 'ضمان وأمان كامل بإشراف مجموعة تيليسوم وكابسان' : language === 'so' ? 'Damaanad Qaad Buuxa oo Telesom Group & Kaabsan ah' : 'Full Assurance by Telesom Group & Kaabsan'}
              </h5>
              <p className="text-xs text-[#6B665E]">
                {language === 'ar'
                  ? 'صك ملكية حرة مسجل رسمياً، تسليم هندسي متطابق مع المواصفات، وتسهيلات مصرفية إسلامية موثوقة.'
                  : language === 'so'
                  ? 'Mulkiyad dhab ah (Title Deed), dhisid heerkii lagu heshiiyay ah, iyo taageero dhameystiran.'
                  : 'Guaranteed Freehold Title Deeds, construction compliant with master standards, and complete diaspora support.'
                }
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenContact("Waxaan doonayaa inaan helo xogta qoysaska qurbajoogta ah ee guryaha iibsaday...")}
            className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#35322E] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer flex-shrink-0"
          >
            {language === 'ar' ? 'انضم إلى عائلة ملاك كابسان' : language === 'so' ? 'Ku Biir Qoysaska Kaabsan' : 'Join Kaabsan Homeowners'}
          </button>
        </div>

      </div>
    </section>
  );
};
