import React, { useState } from 'react';
import { Sparkles, MapPin, Calendar, CheckCircle2, MessageCircle, ArrowLeft, Clock, ShieldCheck, Compass, FileText, ChevronRight } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

interface UpcomingProjectsPageProps {
  onBack: () => void;
  onOpenContact: (msg?: string) => void;
  onSelectProject?: (projectName: string) => void;
  upcomingProjects?: UpcomingProject[];
}

export interface UpcomingProject {
  id: string;
  name: string;
  nameSo: string;
  nameAr: string;
  location: string;
  locationSo: string;
  status: string;
  statusSo: string;
  statusAr: string;
  expectedLaunch: string;
  totalUnits: string;
  propertyType: string;
  image: string;
  description: string;
  descriptionSo: string;
  descriptionAr: string;
  features: string[];
  vipRegistrationOpen: boolean;
}

export const UPCOMING_PROJECTS_DATA: UpcomingProject[] = [
  {
    id: 'upcoming-01',
    name: 'Kaabsan Hills Estate (Phase 2)',
    nameSo: 'Kaabsan Hills Estate (Wejiga 2-aad)',
    nameAr: 'تلال كابسان الفاخرة (المرحلة الثانية)',
    location: 'Masalaha Highland Ridge, Hargeisa',
    locationSo: 'Dhabarka Sare ee Masalaha, Hargeysa',
    status: 'Engineering Master Planning & Soil Testing',
    statusSo: 'Qorshaynta Injineernimada & Tijaabada Dhulka',
    statusAr: 'التخطيط الهندسي المتقدم وفحص التربة',
    expectedLaunch: 'Q4 2025 / Q1 2026',
    totalUnits: '120 Luxury Contemporary Villas',
    propertyType: 'G+1 & G+2 Panoramic Mountain Villas',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: 'An ultra-luxury gated mountain community expanding our Masalaha footprint, featuring smart green architecture, private infinity rooftop decks, and integrated solar energy grid.',
    descriptionSo: 'Xaafad weyn oo casri ah oo ku fadhida dhulka buuraleyda ah ee Masalaha, leh guryo smart ah, koronto qorraxda ku shaqeysa, waddooyin laami ah iyo beero cagaaran.',
    descriptionAr: 'مجتمع جبلي فاخر ومغلق يضم فلل ذكية مستدامة مع طاقة شمسية مدمجة وشوارع مسفلتة وحدائق عامة.',
    features: [
      '120 G+1 & G+2 Exclusive Smart Villas',
      'Underground fiber-optic internet & water grid',
      'Central Community Mosque & Commercial Plaza',
      '60-Month Zero-Riba Islamic Financing'
    ],
    vipRegistrationOpen: true
  },
  {
    id: 'upcoming-02',
    name: 'Marina Heights Waterfront Residences',
    nameSo: 'Marina Heights (Guryaha Xeebta Berbera)',
    nameAr: 'مارينا هايتس - الواجهة البحرية بربرة',
    location: 'Coastal Promenade, Berbera Free Zone Corridor',
    locationSo: 'Dhinaca Xeebta & Suuqa Xorta ah ee Berbera',
    status: 'Architectural Blueprint & Land Allocation Complete',
    statusSo: 'Naqshadda & Qoondeynta Dhulka oo Dhameystiran',
    statusAr: 'اكتمال المخططات الهندسية وتخصيص الأراضي',
    expectedLaunch: 'Early 2026',
    totalUnits: '45 Executive Beachfront Villas & 60 Luxury Suites',
    propertyType: 'Coastal Luxury Villas & Serviced Apartments',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    description: 'Premier executive waterfront development catering to the booming Berbera Port and trade hub, engineered with marine-grade reinforced concrete from Kaabsan Ready-Mix.',
    descriptionSo: 'Guryo iyo dabaqyo raaxo leh oo laga dhisayo xeebta Berbera, loogu talagalay maalgashadayaasha iyo ganacsatada Dekedda & Berbera Free Zone.',
    descriptionAr: 'مشروع سكني فاخر على الواجهة البحرية في بربرة لتلبية الطلب المتزايد لرجال الأعمال والمستثمرين.',
    features: [
      'Direct Private Beachfront & Boardwalk Access',
      'Marine-grade reinforced concrete foundation',
      'Private Yacht & Boat Marina access',
      'High rental yield investment opportunity'
    ],
    vipRegistrationOpen: true
  },
  {
    id: 'upcoming-03',
    name: 'Telesom Eco-Tech City & Boulevard',
    nameSo: 'Telesom Eco-Tech City & Boulevard',
    nameAr: 'مدينة تيليسوم إيكو-تيك المتكاملة',
    location: 'Airport Expressway Corridor, Hargeisa',
    locationSo: 'Waddada Weyn ee Madaarka Hargeysa',
    status: 'Master Zoning & Infrastructure Clearance',
    statusSo: 'Xadeynta Qorshaha Guud & Nadiifinta Goobta',
    statusAr: 'المخطط الهيكلي العام وتجهيز الموقع',
    expectedLaunch: 'Mid 2026',
    totalUnits: '200+ Mixed-Use Residential & Commercial Towers',
    propertyType: 'Mixed-Use Residential, Tech Hub & Retail',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    description: 'A revolutionary green smart city development on Airport Road featuring renewable solar micro-grids, commercial banking hubs, tech incubation parks, and modern residences.',
    descriptionSo: 'Magaalo weyn oo casri ah oo laga dhisayo jidka Madaarka Hargeysa, ka kooban xarumo ganacsi, teknoolojiyad, bangiyo, iyo dabaqyo casri ah.',
    descriptionAr: 'مدينة ذكية متكاملة على طريق المطار تضم مجمعات تجارية وتكنولوجية وسكنية حديثة مع طاقة متجددة.',
    features: [
      'Somaliland’s first fully integrated tech residential ecosystem',
      'Dedicated Dara Salaam Bank & Telesom Corporate Center',
      'Olympic-standard sports grounds & children parks',
      'High-speed multi-gigabit fiber connection'
    ],
    vipRegistrationOpen: true
  },
  {
    id: 'upcoming-04',
    name: 'Bilicsan Phase 2 Luxury Townhouses',
    nameSo: 'Bilicsan Phase 2 (Guryo Casri ah)',
    nameAr: 'بيليكسان إستيت (المرحلة الثانية)',
    location: 'Jigjiga Yar Prime Corridor, Hargeisa',
    locationSo: 'Bartamaha Jigjiga Yar, Hargeysa',
    status: 'Permits Approved & Ready for Pre-Sales',
    statusSo: 'Ruqsadihii oo Diyaar ah & Diiwaangelin Furan',
    statusAr: 'اكتمال التراخيص وجاهز للحجز المسبق',
    expectedLaunch: 'Q3 2025',
    totalUnits: '52 Contemporary G+1 Townhomes',
    propertyType: 'Contemporary 4-Bed Townhouses',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    description: 'Following the high demand in Jigjiga Yar, Bilicsan Phase 2 introduces sleek modern architecture with private courtyards, maid quarters, and premium imported finishes.',
    descriptionSo: 'Wejiga labaad ee Bilicsan oo ku yaal Jigjiga Yar, ka kooban guryo 4-qol ah oo casri ah, leh daarad gaar ah, qolka shaqaalaha, iyo agab tayo sare leh.',
    descriptionAr: 'المرحلة الثانية من بيليكسان إستيت في أفضل مواقع جيججيغا يار بتصاميم حديثة ومساحات رحبة.',
    features: [
      'Prime location in the heart of Jigjiga Yar',
      'Dedicated parking for 2 vehicles per unit',
      '5-Year 0% Riba installment option',
      '24/7 Monitored security & paved access'
    ],
    vipRegistrationOpen: true
  }
];

export const UpcomingProjectsPage: React.FC<UpcomingProjectsPageProps> = ({ onBack, onOpenContact, upcomingProjects = UPCOMING_PROJECTS_DATA }) => {
  const { language } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<UpcomingProject | null>(null);

  const allProjects = upcomingProjects && upcomingProjects.length > 0 ? upcomingProjects : UPCOMING_PROJECTS_DATA;

  const handleWhatsAppVIPInquiry = (projectName: string) => {
    const text = encodeURIComponent(`Kaabsan Real Estate Official Website:\nAsc Kaabsan Real Estate, waxaan doonayaa inaan iska diiwaangeliyo liiska VIP Priority Waitlist-ka mashruuca soo socda ee "${projectName}". Fadlan qiimaha, naqshadda & sida aan u ballansan karo cutubyo hore iiga soo dira WhatsApp.`);
    window.open(`https://wa.me/252636100090?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] font-sans pb-24">
      {/* Hero Header */}
      <div className="relative bg-[#1A1A1A] text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#C2A55D_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-20 bg-cover bg-center pointer-events-none hidden md:block" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80')` }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C2A55D] hover:text-white transition-colors mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            {language === 'ar' ? 'العودة للرئيسية' : language === 'so' ? 'Ku Noqo Bogga Hore' : 'Back to Home'}
          </button>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C2A55D]/20 border border-[#C2A55D]/40 text-[#DFCA85] text-xs font-extrabold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            {language === 'ar' ? 'مشاريع كابسان المستقبلية' : language === 'so' ? 'Mashaariicda Soo Socota ee Kaabsan' : 'Upcoming Master Developments & Expansions'}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl">
            {language === 'ar'
              ? 'المشاريع المستقبلية وقائمة حجز كبار الشخصيات'
              : language === 'so'
              ? 'Mashaariicda Cusub ee Soo Socota & Diiwaangelinta VIP-da'
              : 'Upcoming Master Communities & VIP Priority Reservations'}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#E5E2DA] max-w-2xl font-normal leading-relaxed">
            {language === 'ar'
              ? 'احجز موقعك مبكراً في أرقى المشاريع القادمة في هرجيسا وبربرة. لمعرفة تفاصيل الأسعار وخطط السداد، تواصل معنا مباشرة عبر واتساب.'
              : language === 'so'
              ? 'Ka mid noqo kuwa ugu horreeya ee booskooda ka xaqiijista mashaariicda waaweyn ee Kaabsan ee Hargeysa & Berbera. Qiimaha & qorshaha lacag bixinta toos nooga weydii WhatsApp.'
              : 'Be among the first to secure prime off-market units in upcoming master communities across Hargeisa and Berbera. For full pricing and allocations, connect with us on WhatsApp.'}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => handleWhatsAppVIPInquiry('General Upcoming Master Projects Waitlist')}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#C2A55D] hover:bg-[#A68838] text-[#1A1A1A] font-extrabold text-sm rounded-xl transition-all shadow-xl cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              {language === 'ar' ? 'التسجيل في قائمة VIP عبر واتساب' : language === 'so' ? 'Isku Diiwaangeli VIP WhatsApp' : 'Join VIP Priority Waitlist on WhatsApp'}
            </button>
            <div className="flex items-center gap-2 text-xs text-[#E5E2DA] font-semibold bg-white/10 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10">
              <ShieldCheck className="w-4 h-4 text-[#C2A55D]" />
              <span>5-Year 0% Riba Financing Available on All Projects</span>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        {allProjects.map((project, index) => (
          <div
            key={project.id}
            className="bg-white rounded-3xl border border-[#E5E2DA] hover:border-[#C2A55D] shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0"
          >
            {/* Project Image Banner */}
            <div className={`lg:col-span-6 relative min-h-[320px] lg:min-h-[420px] bg-[#F2EFE9] overflow-hidden ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-[#1A1A1A]/90 backdrop-blur-md text-[#DFCA85] text-xs font-black rounded-lg border border-[#C2A55D]/40 flex items-center gap-1.5 shadow-md">
                  <Clock className="w-3.5 h-3.5 text-[#C2A55D]" />
                  {project.expectedLaunch}
                </span>
                <span className="px-3 py-1 bg-emerald-800/90 backdrop-blur-md text-white text-xs font-bold rounded-lg shadow-md">
                  VIP Waitlist Open
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-xs text-[#DFCA85] font-extrabold flex items-center gap-1 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C2A55D]" />
                  {language === 'so' ? project.locationSo : project.location}
                </div>
                <div className="text-xl sm:text-2xl font-black">
                  {language === 'ar' ? project.nameAr : language === 'so' ? project.nameSo : project.name}
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className={`lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-[#6B665E] border-b border-[#F2EFE9] pb-3">
                  <span className="text-[#C2A55D] font-extrabold uppercase tracking-wider">{project.propertyType}</span>
                  <span>{project.totalUnits}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] leading-tight">
                  {language === 'ar' ? project.nameAr : language === 'so' ? project.nameSo : project.name}
                </h3>

                <p className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg inline-block border border-emerald-200">
                  Status: {language === 'ar' ? project.statusAr : language === 'so' ? project.statusSo : project.status}
                </p>

                <p className="text-sm text-[#4A4742] leading-relaxed">
                  {language === 'ar' ? project.descriptionAr : language === 'so' ? project.descriptionSo : project.description}
                </p>

                {/* Features */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
                    {language === 'ar' ? 'أبرز مميزات المشروع' : language === 'so' ? 'Qodobbada Muhiimka ah' : 'Master Highlights'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#35322E] bg-[#F9F8F6] p-2.5 rounded-xl border border-[#E5E2DA]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C2A55D] shrink-0 mt-0.5" />
                        <span className="font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & WhatsApp CTA (Strictly No Static Dollar Figures, WhatsApp Inquiry) */}
              <div className="pt-6 mt-6 border-t border-[#E5E2DA] space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-bold text-[#6B665E] uppercase tracking-wider block">
                      {language === 'ar' ? 'معلومات الأسعار وحجز الوحدات' : language === 'so' ? 'Qiimaha & Qoondeynta Booska' : 'Pricing & Unit Allocation'}
                    </span>
                    <span className="text-sm font-extrabold text-[#1A1A1A]">
                      {language === 'ar' ? 'السعر عند الطلب • تواصل عبر واتساب' : language === 'so' ? 'Qiimaha: Fadlan la xidhiidh WhatsApp' : 'Price on Request • Inquire via WhatsApp'}
                    </span>
                  </div>

                  <button
                    onClick={() => handleWhatsAppVIPInquiry(project.name)}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{language === 'ar' ? 'استفسار عن السعر عبر واتساب' : language === 'so' ? 'Weydii Qiimaha WhatsApp' : 'Inquire Price on WhatsApp'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
