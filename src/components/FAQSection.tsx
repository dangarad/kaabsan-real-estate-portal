import React, { useState, useMemo } from 'react';
import { HelpCircle, ChevronDown, MessageSquare, Sparkles, Search } from 'lucide-react';
import { FAQItem, Language } from '../types';
import { useTranslation } from '../context/LanguageContext';

interface FAQSectionProps {
  faqs: FAQItem[];
  onOpenContact: (msg?: string) => void;
  onOpenAIAdvisor?: () => void;
}

const DEFAULT_FAQ_DICTIONARY: Record<string, {
  question_en: string;
  answer_en: string;
  category_en: string;
  question_so: string;
  answer_so: string;
  category_so: string;
  question_ar: string;
  answer_ar: string;
  category_ar: string;
}> = {
  'faq-1': {
    question_en: 'How does the 5-Year (60-Month) Dara Salaam Bank financing work?',
    answer_en: 'You pay an initial 30% down payment upon signing the agreement. The remaining 70% is financed with 0% Riba Murabaha through Dara Salaam Bank, payable in 60 equal monthly installments.',
    category_en: 'Financing',
    question_so: 'Sidee u shaqeysaa Maalgelinta 5-ta Sano ee Dara Salaam Bank (60 Months)?',
    answer_so: 'Waxaad bixinaysaa 30% Down Payment horumarin ah marka heshiiska la saxiixo. Inta hadhay ee 70% ah waxaa maalgelinaya Dara Salaam Bank oo lagu qaybinayaa 60 bilood (5 sano) oo siman oo 0% Riba ah.',
    category_so: 'Maalgelin',
    question_ar: 'كيف تعمل خطة التمويل البنكي لمدة 5 سنوات (60 شهراً) عبر بنك دار السلام؟',
    answer_ar: 'يتم دفع دفعة أولى مقدمة قدرها 30% عند توقيع العقد، ويتم تمويل المتبقي (70%) بمرابحة إسلامية خالية من الربا بنسبة 0% مقسمة على 60 شهراً (5 سنوات) بأقساط متساوية.',
    category_ar: 'التمويل'
  },
  'faq-2': {
    question_en: 'What are the main master-planned communities currently active or ready?',
    answer_en: 'Our flagship developments include Rugsan Gardens located in Masallaha ($225,000), Aragsan Village in Buurta Kala-jeexan ($292,000), and Masallaha Luxury Heights Apartments.',
    category_en: 'Projects',
    question_so: 'Waa kuwee mashaariicda ugu waaweyn ee hadda socda ama diyaar ah?',
    answer_so: 'Waxaa ugu caansan Rugsan Gardens oo ku yaal Masallaha ($225,000) iyo Aragsan Village oo ku yaal Buurta Kala-jeexan ($292,000), iyo Masallaha Luxury Apartments.',
    category_so: 'Mashaariicda',
    question_ar: 'ما هي أبرز المجتمعات السكنية والمشاريع المتوفرة حالياً؟',
    answer_ar: 'تشمل مشاريعنا الرئيسية روغسان جاردنز في المصلى (225,000 دولار)، وقرية أراغسان في جبل كالا-جيخان (292,000 دولار)، بالإضافة إلى شقق المصلى الفاخرة.',
    category_ar: 'المشاريع'
  },
  'faq-3': {
    question_en: 'Are all property titles, land deeds, and registrations legally guaranteed?',
    answer_en: 'Yes, 100% of Kaabsan properties have official Hargeisa Municipality approvals, Regional Court registration records, and Full Freehold Title Deeds issued in the buyer\'s legal name.',
    category_en: 'Legal & Titles',
    question_so: 'Sharciga dhulka iyo mulkiyadda ma yihiin kuwo sugan?',
    answer_so: 'Haa, dhammaan dhulka iyo guryaha Kaabsan waxay leeyihiin Liisanka Dowladda Hoose ee Hargeysa, Diiwaanka Maxkamadda, iyo Mulkiyad Buuxda (Full Freehold Title Deed).',
    category_so: 'Sharciga & Mulkiyadda',
    question_ar: 'هل سندات الملكية والتسجيلات القانونية مضمونة وموثقة رسمياً؟',
    answer_ar: 'نعم، جميع أراضي ومنازل كابسان حاصلة على تراخيص رسمية من بلدية هرجيسا، ومسجلة لدى المحكمة الإقليمية، مع سند ملكية حرة كاملة (Full Freehold Title Deed).',
    category_ar: 'الملكية والقانون'
  },
  'faq-4': {
    question_en: 'How can Diaspora and overseas buyers inspect, purchase, and finalize properties?',
    answer_en: 'Diaspora clients can tour properties via guided 3D virtual walkthroughs and live high-definition WhatsApp video inspections with dedicated consultants. Payments and title deeds can be managed securely from anywhere in the world.',
    category_en: 'Diaspora Services',
    question_so: 'Dadka qurbajoogta ah (Diaspora) sidee bay guri u iibsan karaan ama u kormeeri karaan?',
    answer_so: 'Waxaad ku kormeeri kartaa 3D Virtual Tour ama fiidiyow toos ah oo wakiilkayagu kuula galo WhatsApp Video Call. Lacag-bixintana waxaa toos loogu diri karaa akoonnada bangiyada rasmiga ah ama Zaad.',
    category_so: 'Qurbajoogta',
    question_ar: 'كيف يمكن للمغتربين والعملاء في الخارج معاينة وشراء العقارات؟',
    answer_ar: 'يمكن لعملائنا في المهجر معاينة العقارات عبر جولات افتراضية ثلاثية الأبعاد ومكالمات فيديو مباشرة عالية الدقة عبر واتساب مع مستشارينا، مع سهولة التحويلات البنكية وتوثيق الملكية.',
    category_ar: 'المغتربون'
  }
};

export const FAQSection: React.FC<FAQSectionProps> = ({
  faqs,
  onOpenContact,
  onOpenAIAdvisor
}) => {
  const { language } = useTranslation();
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getLocalizedFaq = (faq: FAQItem, lang: Language) => {
    const fallback = DEFAULT_FAQ_DICTIONARY[faq.id];
    let question = faq.question;
    let answer = faq.answer;
    let category = faq.category || 'General';

    if (lang === 'en') {
      question = faq.question_en || fallback?.question_en || (faq.question.startsWith('Sidee') || faq.question.startsWith('Waa kuwee') || faq.question.startsWith('Sharciga') || faq.question.startsWith('Dadka') ? (fallback?.question_en || faq.question) : faq.question);
      answer = faq.answer_en || fallback?.answer_en || (faq.answer.includes('Waxaad bixinaysaa') || faq.answer.includes('Waxaa ugu caansan') || faq.answer.includes('dhammaan dhulka') ? (fallback?.answer_en || faq.answer) : faq.answer);
      category = faq.category_en || fallback?.category_en || faq.category || 'General';
    } else if (lang === 'ar') {
      question = faq.question_ar || fallback?.question_ar || faq.question;
      answer = faq.answer_ar || fallback?.answer_ar || faq.answer;
      category = faq.category_ar || fallback?.category_ar || faq.category || 'General';
    } else {
      question = faq.question_so || fallback?.question_so || faq.question;
      answer = faq.answer_so || fallback?.answer_so || faq.answer;
      category = faq.category_so || fallback?.category_so || faq.category || 'General';
    }

    return { question, answer, category };
  };

  const localizedFaqs = useMemo(() => {
    return faqs.map((f) => ({
      ...f,
      ...getLocalizedFaq(f, language)
    }));
  }, [faqs, language]);

  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(localizedFaqs.map((f) => f.category)))];
  }, [localizedFaqs]);

  const filteredFaqs = localizedFaqs.filter((faq) => {
    const matchesCat = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faqs" className="py-20 sm:py-28 bg-[#FFFFFF] border-t border-[#E5E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F1EA] text-[#C2A55D] text-xs font-semibold border border-[#E5E2DA] mb-3">
            <HelpCircle className="w-3.5 h-3.5" /> 
            <span>
              {language === 'ar' ? 'الأسئلة الشائعة والمعلومات الهامة (FAQs)' : language === 'so' ? "Su'aalaha Badanaa La Isweydiiyo (FAQs)" : 'Frequently Asked Questions (FAQs)'}
            </span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-[#1A1A1A] tracking-tight mb-4">
            {language === 'ar' ? 'كل ما تود معرفته عن مشاريعنا والتمويل' : language === 'so' ? 'Wax Kasta Oo Aad U Baahan Tahay Inaad Ogaato' : 'Everything You Need to Know'}
          </h2>
          <p className="text-sm sm:text-base text-[#6B665E] font-light leading-relaxed">
            {language === 'ar'
              ? 'إليك إجابات شاملة حول خطط التمويل بالمرابحة لمدة 5 سنوات (60 شهراً)، مشاريع روغسان جاردنز، وقرية أراغسان، وبليكسان، وشقق المصلى، وخدمات تسجيل الملكية المخصصة للمغتربين.'
              : language === 'so'
              ? "Halkan ka hel jawaabaha su'aalaha ugu muhiimsan ee la xiriira maalgelinta 5-ta sano (60 bilood) ee Dara Salaam Bank, mashaariicda Rugsan, Aragsan, Bilicsan Village & Masallaha Apartment, mulkiyadda sharciga ah, iyo adeegyada qurbajoogta."
              : 'Find authoritative answers regarding our 5-year (60-month) Sharia financing plans, master communities (Rugsan Gardens, Aragsan Village), deed registrations, and diaspora concierge services.'
            }
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="max-w-4xl mx-auto mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1A1A1A] text-white shadow-sm'
                    : 'bg-[#F4F1EA] text-[#6B665E] hover:bg-[#EAE6DE] hover:text-[#1A1A1A]'
                }`}
              >
                {cat === 'All' ? (language === 'ar' ? 'الكل (All)' : language === 'so' ? 'Dhammaan (All)' : 'All Categories') : cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={language === 'ar' ? 'ابحث في الأسئلة...' : language === 'so' ? "Raadi su'aal..." : 'Search questions...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#F9F8F6] border border-[#E5E2DA] rounded-xl text-xs text-[#1A1A1A] placeholder:text-gray-400 focus:outline-none focus:border-[#C2A55D]"
            />
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-4xl mx-auto space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-[#F9F8F6] rounded-2xl border border-[#E5E2DA]">
              <p className="text-sm text-gray-500">
                {language === 'ar' ? 'لم يتم العثور على نتائج مطابقة لبحثك.' : language === 'so' ? "Wax su'aalo ah laguma helin raadintaada." : 'No matching questions found.'}
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'border-[#C2A55D] bg-[#FDFCF9] shadow-sm'
                      : 'border-[#E5E2DA] bg-[#FFFFFF] hover:border-gray-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    id={`faq-question-${faq.id}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#F4F1EA] text-[#C2A55D] text-xs font-bold flex items-center justify-center flex-shrink-0" aria-hidden="true">
                        ?
                      </span>
                      <span className="font-medium text-sm sm:text-base text-[#1A1A1A]">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-[#6B665E] transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? 'rotate-180 text-[#C2A55D]' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {isOpen && (
                    <div 
                      id={`faq-answer-${faq.id}`}
                      role="region"
                      aria-labelledby={`faq-question-${faq.id}`}
                      className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#555048] leading-relaxed border-t border-[#F0ECE1]"
                    >
                      <p className="pt-2 leading-relaxed">{faq.answer}</p>
                      {faq.category && (
                        <div className="mt-3">
                          <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#F4F1EA] text-[#8C867D] text-[11px] font-medium">
                            {language === 'ar' ? 'التصنيف:' : language === 'so' ? 'Qaybta:' : 'Category:'} {faq.category}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions? Banner */}
        <div className="max-w-4xl mx-auto mt-12 bg-gradient-to-r from-[#1A1A1A] via-[#24211D] to-[#1E3A2F] text-white p-6 sm:p-8 rounded-3xl shadow-md border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="font-serif-luxury text-xl sm:text-2xl font-normal text-white">
              {language === 'ar' ? 'هل لديك استفسار آخر أو ترغب في استشارة خاصة؟' : language === 'so' ? "Ma haysaa su'aal kale oo aan halkan ku jirin?" : 'Have additional questions?'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 font-light">
              {language === 'ar' ? 'تحدث مباشرة مع فريق مبيعات كابسان أو اسأل المستشار الذكي كابسان فوراً.' : language === 'so' ? 'La hadal kooxda iibka ee Kaabsan ama toos u waydii Kaabsan AI Advisor.' : 'Consult directly with the Kaabsan sales team or ask our AI Advisor.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {onOpenAIAdvisor && (
              <button
                type="button"
                onClick={onOpenAIAdvisor}
                className="px-4 py-2.5 bg-[#C2A55D] hover:bg-[#B3954E] text-[#1A1A1A] text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" /> 
                <span>{language === 'ar' ? 'اسأل المستشار الذكي' : language === 'so' ? 'Waydii AI Advisor' : 'Ask AI Advisor'}</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => onOpenContact("Waxaan qabaa su'aal ku saabsan guryaha Kaabsan...")}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" /> 
              <span>{language === 'ar' ? 'تواصل معنا' : language === 'so' ? 'Nala Soo Xiriir' : 'Contact Us'}</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
