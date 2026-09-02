import React from 'react';
import { 
  ArrowLeft, 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  Award, 
  Users, 
  CheckCircle2, 
  Check, 
  Layers, 
  Clock, 
  Globe2, 
  Factory, 
  ExternalLink,
  Calendar,
  MessageCircle,
  Eye,
  Target,
  HeartHandshake,
  Compass,
  Briefcase,
  PenTool,
  Wrench,
  KeyRound,
  Home,
  Youtube
} from 'lucide-react';
import { SiteConfig } from '../types';
import { useTranslation } from '../context/LanguageContext';

interface AboutPageProps {
  onBack: () => void;
  onOpenContact: (msg?: string) => void;
  onSelectProject?: (projectId: string) => void;
  onOpenScheduleTour?: (proj?: string) => void;
  siteConfig?: SiteConfig;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onBack,
  onOpenContact,
  onSelectProject,
  onOpenScheduleTour,
  siteConfig
}) => {
  const { t, language } = useTranslation();

  const specializedServices = [
    {
      icon: <PenTool className="w-5 h-5 text-[#C2A55D]" />,
      title: language === 'ar' ? 'التصميم المعماري' : language === 'so' ? 'Naqshadaynta Dhismaha' : 'Architectural Design',
      desc: language === 'ar' ? 'تصاميم جمالية فريدة ومواكبة للمناخ للفلل الفاخرة والمجتمعات المتكاملة.' : language === 'so' ? 'Naqshado casri ah oo ku habboon cimilada looguna talagalay guryaha raaxada leh.' : 'Modern, climate-responsive and bespoke aesthetic designs for luxury villas and master communities.'
    },
    {
      icon: <Building2 className="w-5 h-5 text-[#C2A55D]" />,
      title: language === 'ar' ? 'الهندسة المدنية والإنشائية' : language === 'so' ? 'Injineernimada Madaniga & Qaab-dhismeedka' : 'Civil & Structural Engineering',
      desc: language === 'ar' ? 'سلامة إنشائية معتمدة بفضل خرسانة كابسان الجاهزة والهندسة الدقيقة.' : language === 'so' ? 'Dhisme adag oo la hubo iyadoo la adeegsanayo shubka Kaabsan Ready-Mix.' : 'Certified structural integrity backed by Kaabsan Ready-Mix concrete and precision engineering.'
    },
    {
      icon: <Wrench className="w-5 h-5 text-[#C2A55D]" />,
      title: language === 'ar' ? 'التنفيذ والإنشاء' : language === 'so' ? 'Dhismaha & Fulinta Mashaariicda' : 'Construction & Execution',
      desc: language === 'ar' ? 'تطوير شامل للمجتمعات السكنية والشقق الفاخرة والمراكز التجارية.' : language === 'so' ? 'Dhisidda magaalooyinka xiran, dabaqyada raaxada leh iyo xarumaha ganacsiga.' : 'End-to-end development of master-planned communities, luxury apartments, and commercial plazas.'
    },
    {
      icon: <KeyRound className="w-5 h-5 text-[#C2A55D]" />,
      title: language === 'ar' ? 'المبيعات والتمويل الإسلامي' : language === 'so' ? 'Iibka & Maalgelinta 5-ta Sano' : 'Sales & 60-Month Financing',
      desc: language === 'ar' ? 'قنوات استثمار للمغتربين وتمويل إسلامي مرابحة لمدة 60 شهراً بدفعة 30%.' : language === 'so' ? 'Adeegyo u gaar ah qurbajoogta iyo maalgelin 60 bilood ah oo aan dulsaar lahayn.' : 'Comprehensive diaspora investment channels and customized Sharia-compliant 60-month financing.'
    },
    {
      icon: <Layers className="w-5 h-5 text-[#C2A55D]" />,
      title: language === 'ar' ? 'إدارة العقارات والوحدات' : language === 'so' ? 'Maareynta Hantida Maguurtada' : 'Property Management',
      desc: language === 'ar' ? 'خدمة المستأجرين، تحصيل الإيجارات، والصيانة الدورية للحفاظ على قيمة الأصول.' : language === 'so' ? 'Kireynta guryaha, ururinta kirada, ilaalinta guriga iyo adeeg hufan.' : 'Dedicated tenant servicing, rent collection, occupancy optimization, and asset protection.'
    },
    {
      icon: <Home className="w-5 h-5 text-[#C2A55D]" />,
      title: language === 'ar' ? 'صيانة المرافق والمجتمعات' : language === 'so' ? 'Dayactirka & Ilaalinta Xarumaha' : 'Building & Facilities Maintenance',
      desc: language === 'ar' ? 'صيانة مستمرة للبنية التحتية، أمن وحراسة 24/7، ونظافة المجمعات المغلقة.' : language === 'so' ? 'Ilaalada 24/7 ee albaabbada, nadaafadda deegaanka iyo dayactirka guud.' : 'Ongoing infrastructure maintenance, 24/7 security management, and community upkeep.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1A1A1A] pb-24 animate-in fade-in duration-300">
      
      {/* Top Breadcrumb Bar */}
      <div className="bg-[#FFFFFF] border-b border-[#E5E2DA] sticky top-[68px] z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 text-xs text-[#6B665E]">
            <button 
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-[#35322E] hover:text-[#C2A55D] font-bold transition-colors cursor-pointer bg-[#F4F1EA] hover:bg-[#EAE6DE] px-3.5 py-1.5 rounded-xl border border-[#E5E2DA]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.navHome || 'Home'}</span>
            </button>
            <span className="text-[#D8D3C8]">/</span>
            <span className="font-bold text-[#1A1A1A] text-xs sm:text-sm">
              {t.navAbout || 'About Us'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenContact('I would like to consult with the Kaabsan Real Estate team.')}
              className="bg-[#35322E] hover:bg-[#1A1815] text-white px-4 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-sm"
            >
              {language === 'ar' ? 'تحدث مع خبرائنا' : language === 'so' ? 'La Hadal Kooxdayada' : 'Speak to Our Team'}
            </button>
          </div>
        </div>
      </div>

      {/* Hero Banner with Official Introduction */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-[#24211E] text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-xl border border-[#E5E2DA]">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#C2A55D] bg-black/40 px-3.5 py-1 rounded-full border border-white/10 w-fit">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C2A55D]" />
              {t.partOfTelesom} • {language === 'ar' ? 'شركة تطوير عقاري متكاملة ومرخصة' : language === 'so' ? 'Shirkad Sharciyeysan oo Horumarineed' : 'Registered Full Service Agency'}
            </div>
            
            <h1 className="font-serif-luxury text-3xl sm:text-5xl font-normal leading-tight">
              {t.aboutWelcomeTitle || 'Welcome To Kaabsan Real Estate'}
            </h1>

            <p className="text-sm sm:text-base text-[#D8D3C8] font-light leading-relaxed">
              {language === 'ar'
                ? 'كابسان العقارية، شركة تطوير وتسويق عقاري مرخصة بالكامل في صوماليلاند وإحدى شركات مجموعة تيليسوم (Telesom Group)، كبرى الشركات الاستثمارية في المنطقة. ترتكز مشاريعنا على مزيج من الفلل الفاخرة والمجمعات السكنية المغلقة والمراكز التجارية الحديثة في قلب هرجيسا.'
                : language === 'so'
                ? 'Kaabsan Real Estate waa shirkad si buuxda uga diiwaangashan Somaliland, qaybna ka ah Telesom Group oo ah shirkadda ugu weyn uguna sumcadda badan dalka. Mashaariicdayadu waxay isugu jiraan magaalooyin casri ah sida Rugsan Gardens iyo Aragsan Village, dabaqyo raaxo leh iyo goobo ganacsi.'
                : 'Kaabsan Real Estate, a registered full service real estate agency in Somaliland. The company is part of the Telesom Group, one of the largest and most reputable companies in the region. Our projects are a combination of residential high-level luxury homes, affordable properties and prime commercial real estate in the heart of Hargeisa, Somaliland.'
              }
            </p>

            <p className="text-xs sm:text-sm text-[#A8A39A] font-light leading-relaxed">
              {language === 'ar'
                ? 'نقدم نهجاً مبتكراً في الخدمات العقارية، مستفيدين من أحدث الحلول الرقمية، والفحوصات المعملية لخرسانة البناء، والتمويل المتوافق مع الشريعة الإسلامية بالتعاون مع البنوك الإسلامية للمجموعة.'
                : language === 'so'
                ? 'Annagoo ah shirkad xirfad sare leh, waxaan keenay habab casri ah oo suuqgeyn iyo dhisid ah, tignoolajiyad casri ah oo lagu hubiyo tayada dhismaha iyo maalgelin fudud oo 60 bilood ah.'
                : 'As a professional real estate agency in Somaliland, we offer an innovative approach towards property services. This is by using new and progressive marketing platforms and methods, particularly within the ever-expanding digital area of marketing.'
              }
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/10">
                <div className="text-[#C2A55D] font-bold text-lg font-serif-luxury">Telesom Group</div>
                <div className="text-[11px] text-[#D8D3C8]">{language === 'ar' ? 'دعم وموثوقية مؤسسية كبرى' : language === 'so' ? 'Kalsooni Shirkadeed oo Sugan' : 'Reputable Corporate Backing'}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/10">
                <div className="text-[#C2A55D] font-bold text-lg font-serif-luxury">{language === 'ar' ? 'خدمات متكاملة' : language === 'so' ? 'Adeeg Buuxa' : 'Full Service'}</div>
                <div className="text-[11px] text-[#D8D3C8]">{language === 'ar' ? 'تصميم، بناء، تمويل، إدارة' : language === 'so' ? 'Naqshad, Dhisme, Maalgelin' : 'Design, Build, Manage, Sell'}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 col-span-2 sm:col-span-1">
                <div className="text-[#C2A55D] font-bold text-lg font-serif-luxury">Hargeisa, Somaliland</div>
                <div className="text-[11px] text-[#D8D3C8]">{language === 'ar' ? 'مواقع سكنية وتجارية استراتيجية' : language === 'so' ? 'Goobo Istiraatiiji ah' : 'Prime Residential & Commercial'}</div>
              </div>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-20 bg-cover bg-center pointer-events-none hidden md:block" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80')` }}></div>
        </div>
      </div>

      {/* Vision, Purpose & Mission Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* OUR VISION */}
        <div className="bg-white border border-[#E5E2DA] rounded-3xl p-8 space-y-4 hover:border-[#C2A55D] transition-all shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F4F1EA] text-[#C2A55D] flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-[#C2A55D] uppercase tracking-wider">{t.aboutVisionTitle}</div>
            <h3 className="font-serif-luxury text-xl text-[#1A1A1A]">
              {language === 'ar' ? 'الريادة والتميز في التطوير العقاري' : language === 'so' ? 'Hormuudka Adeegyada Hantida' : 'Leading Provider of Real Estate'}
            </h3>
            <p className="text-xs sm:text-sm text-[#6B665E] font-light leading-relaxed">
              {t.aboutVisionText}
            </p>
          </div>
          <div className="pt-2 border-t border-[#F2EFE9] text-[11px] text-[#8C867D] font-medium">
            {language === 'ar' ? 'الريادة السوقية والتميز' : language === 'so' ? 'Hoggaanka Suuqa & Tayada' : 'Market Leadership & Excellence'}
          </div>
        </div>

        {/* OUR PURPOSE */}
        <div className="bg-white border border-[#E5E2DA] rounded-3xl p-8 space-y-4 hover:border-[#C2A55D] transition-all shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F4F1EA] text-[#C2A55D] flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-[#C2A55D] uppercase tracking-wider">{t.aboutPurposeTitle}</div>
            <h3 className="font-serif-luxury text-xl text-[#1A1A1A]">
              {language === 'ar' ? 'ارتقاء بنمط الحياة والمجتمعات' : language === 'so' ? 'Horumarinta Nolosha & Deegaanka' : 'Creating Lifestyles & Raising Standards'}
            </h3>
            <p className="text-xs sm:text-sm text-[#6B665E] font-light leading-relaxed">
              {t.aboutPurposeText}
            </p>
          </div>
          <div className="pt-2 border-t border-[#F2EFE9] text-[11px] text-[#8C867D] font-medium">
            {language === 'ar' ? 'مجمعات سكنية بمعايير عالمية' : language === 'so' ? 'Magaalooyin Heersare ah' : 'High Standard Community Living'}
          </div>
        </div>

        {/* OUR MISSION */}
        <div className="bg-white border border-[#E5E2DA] rounded-3xl p-8 space-y-4 hover:border-[#C2A55D] transition-all shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F4F1EA] text-[#C2A55D] flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-[#C2A55D] uppercase tracking-wider">{t.aboutMissionTitle}</div>
            <h3 className="font-serif-luxury text-xl text-[#1A1A1A]">
              {language === 'ar' ? 'أثر إيجابي ومستدام لعملائنا' : language === 'so' ? 'Saamayn Wanaagsan oo Joogto ah' : 'Inspiring a Positive, Lasting Impact'}
            </h3>
            <p className="text-xs sm:text-sm text-[#6B665E] font-light leading-relaxed">
              {t.aboutMissionText}
            </p>
          </div>
          <div className="pt-2 border-t border-[#F2EFE9] text-[11px] text-[#8C867D] font-medium">
            {language === 'ar' ? 'النزاهة، الشفافية، والمشورة الصادقة' : language === 'so' ? 'Daacadnimo, Run & Talo Sugan' : 'Integrity, Honesty & Sound Advice'}
          </div>
        </div>

      </div>

      {/* WHO WE ARE - Comprehensive Narrative Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white border border-[#E5E2DA] rounded-3xl p-8 sm:p-14 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#C2A55D] uppercase tracking-wider">
                <Users className="w-4 h-4 text-[#C2A55D]" />
                {t.whoWeAreTitle}
              </div>

              <h2 className="font-serif-luxury text-2xl sm:text-4xl text-[#1A1A1A] leading-tight font-normal">
                {language === 'ar' ? 'ثقافة أخلاقية، ابتكار مستمر وخدمة استثنائية' : language === 'so' ? 'Anshax Sare, Horumar Casri ah & Adeeg Gaar ah' : 'Ethical Culture, Progressive Innovation & Exceptional Service'}
              </h2>

              <p className="text-xs sm:text-sm text-[#4A4742] font-light leading-relaxed">
                {t.whoWeAreText}
              </p>

              <p className="text-xs sm:text-sm text-[#4A4742] font-light leading-relaxed">
                {language === 'ar'
                  ? 'مع التزامنا بالملكية طويلة الأجل وتقديم أرقى العقارات والخدمات لعملائنا، تركز كابسان على التفاعل مع العملاء، والاهتمام بأدق التفاصيل، والتنفيذ الفعّال لتحقيق تطلعاتهم وتجاوزها.'
                  : language === 'so'
                  ? 'Annagoo u heellan lahaanshaha muddada fog iyo u adeegidda macaamiisheenna, Kaabsan waxay xoogga saartaa xiriirka macaamiisha, fiiro gaar ah oo la siiyo faahfaahinta, iyo shaqo hufan oo lagu qanco.'
                  : 'With a commitment to long-term ownership and providing superior real estate and service to our clients, Kaabsan Real Estate emphasises client engagement, attention to detail and efficient execution to meet and surpass client requirements and expectations.'
                }
              </p>

              <p className="text-xs sm:text-sm text-[#4A4742] font-light leading-relaxed">
                {language === 'ar'
                  ? 'نفتخر بتقديم باقة مخصصة من الخدمات عالية الجودة المصممة لتلبية احتياجاتك العقارية المحددة في صوماليلاند مع انتشار استراتيجي لمكاتب المبيعات.'
                  : language === 'so'
                  ? 'Waxaan ku faannaa adeegyo tayo sare leh oo ku habboon baahiyahaaga gaarka ah ee guryaha iyo dhulka, iyadoo xafiisyadayadu u taagan yihiin inay ku caawiyaan meel kasta.'
                  : 'We pride ourselves on offering a customized menu of high-quality services tailored to your specific real estate needs. Our level of service remains consistent across the group, and our office network provides a great support to our projects with offices strategically located to provide the largest possible sales reach.'
                }
              </p>

              <div className="p-4 rounded-2xl bg-[#F4F1EA] border border-[#E5E2DA] text-xs text-[#35322E] italic leading-relaxed">
                {language === 'ar'
                  ? '"نجمع بين رؤيتنا المبتكرة وممارساتنا الأصيلة في تقديم مشورة واضحة وواقعية. في كابسان، نسعد بالتواصل مع جميع أبناء الوطن والمغتربين للإجابة على كل استفسار عقاري."'
                  : language === 'so'
                  ? '"Waxaan isku darnaa aragti casri ah iyo dhaqan suubban oo talo dhab ah ku dhisan. Kaabsan Real Estate waxay jeceshahay inay ka hadasho hantida Somaliland oo ay la xiriirto bulshada qaybaheeda kala duwan."'
                  : '"We combine our innovative outlook with traditional and familiar practices of providing no nonsense, down to earth advice and service. At Kaabsan Real Estate, we love talking about property in Somaliland and connecting with people from all walks of life."'
                }
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#E5E2DA] aspect-[4/3] bg-[#24211E]">
                <img 
                  src="https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1000&q=80" 
                  alt="Kaabsan Excellence" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="text-xs font-bold text-[#C2A55D] uppercase tracking-wider">{language === 'ar' ? 'فكر بتميز • كن متميزاً' : language === 'so' ? 'Feker Gaar ah • Horumar Cusub' : 'Think Different • Be Different'}</div>
                  <div className="font-serif-luxury text-xl font-normal mt-1">{language === 'ar' ? 'تطوير وتحديث المعايير العقارية' : language === 'so' ? 'Casriyeynta Dhismaha Somaliland' : 'Disrupting & Modernizing Real Estate'}</div>
                </div>
              </div>

              <div className="bg-[#24211E] text-white rounded-2xl p-5 space-y-2 border border-[#E5E2DA]">
                <h4 className="font-serif-luxury text-base text-[#C2A55D]">{language === 'ar' ? 'فريق عمل متكامل ومتناسق' : language === 'so' ? 'Koox Midaysan oo Hufan' : 'One Seamless Team'}</h4>
                <p className="text-xs text-[#D8D3C8] font-light leading-relaxed">
                  {language === 'ar' ? 'يوفر هذا لعملائنا الراحة والمسؤولية الكاملة بوجود فريق واحد يتولى جميع جوانب المشروع العقاري من التخطيط حتى التسليم.' : language === 'so' ? 'Tani waxay u fududaynaysaa macaamiisheenna inay helaan koox keliya oo gacanta ku haysa dhammaan howlaha mashruuca.' : 'This helps us provide our client base with the ease and accountability of having one team handling all aspects of a property project.'}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Specialized Professional Disciplines */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold text-[#C2A55D] uppercase tracking-wider">
            {t.ourDisciplinesTitle}
          </div>
          <h3 className="font-serif-luxury text-2xl sm:text-4xl text-[#1A1A1A]">
            {language === 'ar' ? 'الخدمات العقارية الشاملة' : language === 'so' ? 'Adeegyada Dhameystiran ee Kaabsan' : 'Comprehensive Real Estate Services'}
          </h3>
          <p className="text-xs sm:text-sm text-[#6B665E] font-light">
            {language === 'ar'
              ? 'يتخصص محترفو كابسان في التصميم المعماري، الهندسة المدنية، الإنشاء، إدارة العقارات، المبيعات، الإيجار، وصيانة المباني والمرافق.'
              : language === 'so'
              ? 'Khubarada Kaabsan waxay ku takhasuseen naqshadaynta dhismaha, injineernimada, maareynta guryaha, iibka, kirada, iyo dayactirka xarumaha.'
              : 'Furthermore, our Kaabsan professionals specialise in architectural design, civil and structural engineering, construction, property management, sales, rentals, building maintenance, facilities management and property management.'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {specializedServices.map((srv, idx) => (
            <div key={idx} className="bg-white border border-[#E5E2DA] rounded-3xl p-6 space-y-3 hover:border-[#C2A55D] transition-all shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#F4F1EA] flex items-center justify-center">
                {srv.icon}
              </div>
              <h4 className="font-serif-luxury text-base text-[#1A1A1A] font-bold">
                {srv.title}
              </h4>
              <p className="text-xs text-[#6B665E] font-light leading-relaxed">
                {srv.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Invitation & Visit Us Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-gradient-to-br from-[#24211E] to-[#1A1815] text-white rounded-3xl p-8 sm:p-14 border border-[#E5E2DA] shadow-xl">
          <div className="max-w-3xl space-y-5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#C2A55D] uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-[#C2A55D]" />
              {t.inviteVisitTitle}
            </div>

            <h3 className="font-serif-luxury text-2xl sm:text-4xl text-white font-normal leading-tight">
              {t.inviteVisitDesc}
            </h3>

            <p className="text-xs sm:text-sm text-[#D8D3C8] font-light leading-relaxed">
              {language === 'ar'
                ? 'سواء كنت تبحث عن شراء فيلا أحلامك، أو استكشاف التمويل الإسلامي لمدة 60 شهراً، أو عرض عقارك للبيع، أو التعرف على مشاريعنا في روغسان جاردنز، وقرية أراغسان، وبليكسان، وشقق المصلى — فأبوابنا مفتوحة دائماً لاستقبالكم.'
                : language === 'so'
                ? 'Haddii aad doonayso inaad iibsato gurigaaga riyada, barato maalgelinta 5-ta sano, iibiso gurigaaga, ama aad wax ka ogaato mashaariicda Rugsan Gardens, Aragsan Village, Bilicsan Village iyo Masallaha Apartments — albaabbadayadu mar kasta way kuu furan yihiin.'
                : 'Whether you are looking to purchase your dream family villa, explore 60-month financing, list your property with our sales desk, or learn about our master developments in Rugsan Gardens, Aragsan Village, Bilicsan Village, and Masallaha Luxury Apartments — our doors are always open.'
              }
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenContact('I would like to schedule a visit to the Kaabsan Real Estate office.')}
                className="px-6 py-3 bg-[#C2A55D] hover:bg-[#B3954C] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-md flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>{language === 'ar' ? 'حجز موعد في المكتب' : language === 'so' ? 'Ballanso Kulan Xafiis' : 'Schedule an Office Meeting'}</span>
              </button>

              <a
                href="tel:380"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#C2A55D]" />
                <span>{language === 'ar' ? 'اتصل بالرقم 380' : language === 'so' ? 'Wac 380 Direct' : 'Call Shortcode 380'}</span>
              </a>

              <a
                href={`https://wa.me/${(siteConfig?.whatsappTemplates?.hotlineNumber || siteConfig?.company?.whatsapp || '+252636100090').replace(/\D/g, '')}?text=${encodeURIComponent('Kaabsan Real Estate Official Website:\nAsc Kaabsan Real Estate, waxaan rabaa inaan xog dheeraad ah ka helo shirkadda iyo mashaariicda.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: {siteConfig?.company?.whatsapp || '+252 (63) 6100090'}</span>
              </a>

              <a
                href={siteConfig?.socialLinks?.youtube || 'https://www.youtube.com/@kaabsanrealestate'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-2 shadow-md"
              >
                <Youtube className="w-4 h-4 fill-current" />
                <span>YouTube: Kaabsan</span>
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
