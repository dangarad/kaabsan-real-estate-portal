import React, { useState } from 'react';
import { 
  Sparkles, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  Layers, 
  MapPin, 
  Compass, 
  Home, 
  Key, 
  FileCheck2, 
  ArrowRight, 
  MessageCircle, 
  Calendar, 
  Phone,
  Check
} from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

interface ValuationSectionProps {
  onOpenAIAdvisorWithQuery: (query: string) => void;
  onOpenContact: (initialMessage?: string) => void;
}

interface MasterCommunityMatch {
  id: string;
  name: string;
  nameSomali: string;
  location: string;
  neighborhood: string;
  type: string;
  beds: string;
  baths: string;
  builtArea: string;
  plotSize: string;
  category: string;
  tag: string;
  tagColor: string;
  image: string;
  features: string[];
  description: string;
  somaliDesc: string;
  deliveryStatus: string;
}

const MASTER_COMMUNITIES: MasterCommunityMatch[] = [
  {
    id: 'rugsan-gardens',
    name: 'Rugsan Gardens',
    nameSomali: 'Rugsan Gardens (Masallaha)',
    location: 'Masallaha, Airport Corridor, Hargeisa',
    neighborhood: 'Masallaha',
    type: 'Luxury Townhouses (G+1)',
    beds: '6 Qolal Hurdada',
    baths: '6 Musqulood',
    builtArea: '321 m² (3,455 sq.ft)',
    plotSize: 'Master Planned Compound',
    category: 'Gated Master Community',
    tag: 'Ready-Mix Concrete',
    tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Kaabsan Batching Plant Certified Concrete',
      '24/7 Security Gatehouse & Asphalt Roads',
      'Constant Borehole Water & Telesom Fiber',
      'Mosque, Green Courtyards & Resident Parking',
      'Mulkiilaha Tooska ah & Wareejin Qoraal Sharci ah'
    ],
    description: 'A master planned enclave of 70 modern G+1 townhouses designed with world-class engineering, double living rooms, and private balconies.',
    somaliDesc: '70 guri oo nooca Townhouse-ka casriga ah (G+1), leh 6 qol hurdada ah, 6 musqulood, qolalka fadhiga oo labanlaaban, iyo waddooyin laami ah oo ammaan ah.',
    deliveryStatus: 'Iibka & Qandaraasyadu Way Furan Yihiin'
  },
  {
    id: 'aragsan-village',
    name: 'Aragsan Village',
    nameSomali: 'Aragsan Village (Buurta Kala-jeexan)',
    location: 'Buurta Kala-jeexan, Jigjiga Yar, Hargeisa',
    neighborhood: 'Buurta Kala-jeexan',
    type: 'Hillside Standalone Luxury Villas',
    beds: '6 Qolal + Maids Room',
    baths: '6 Musqulood',
    builtArea: '362 m² (3,896 sq.ft)',
    plotSize: '24m x 18m Private Plot',
    category: 'Panoramic Luxury Enclave',
    tag: 'Panoramic Hillside',
    tagColor: 'bg-amber-100 text-amber-800 border-amber-200',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Elevated Hilltop Views of Hargeisa',
      'Integrated Elementary School & Preschool',
      'Artificial Turf Sports Field & Playground',
      '24/7 Gated Perimeter & Street Solar Lighting',
      'Iib Toos ah oo Kaabsan & Shahaadada Lahaanshaha'
    ],
    description: '66 standalone luxury villas perched on the scenic hills of Kala-jeexan, featuring integrated schooling and recreation for elite family living.',
    somaliDesc: '66 villa oo gaar u taagan dhalada Buurta Kala-jeexan, leh dugsi hoose/dhexe, garoomo kubadeed, iyo muuqaal indhaha soo jiita oo Hargeysa oo dhan laga daawado.',
    deliveryStatus: 'Iibka & Qandaraasyadu Way Furan Yihiin'
  },
  {
    id: 'bilicsan-village',
    name: 'Bilicsan Village',
    nameSomali: 'Bilicsan Village (Masallaha East)',
    location: 'Masallaha East, Airport Corridor, Hargeisa',
    neighborhood: 'Masallaha',
    type: 'Signature High-Privacy Compound Villas',
    beds: '7 Qolal + Office / Study',
    baths: '7 Musqulood',
    builtArea: '380 m² (4,090 sq.ft)',
    plotSize: '20m x 20m Plot',
    category: 'Exclusive Low-Density Community',
    tag: 'Signature 7-Bed Estate',
    tagColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    features: [
      '16 Exclusive High-Privacy Residential Compounds',
      'Indoor & Outdoor Dual Culinary Kitchens',
      'Dedicated Executive Home Office / Study Room',
      'Paved Internal Boulevards & Underground Drainage',
      'Iib Toos ah oo Kaabsan & Shahaadada Lahaanshaha'
    ],
    description: 'An elite 16-villa gated haven offering immense interior volume, dual kitchens, private prayer spaces, and maximum privacy for large families.',
    somaliDesc: '16 villa oo kaliya oo ku dhex yaal xaafad xidhan, 7 qol oo waasac ah, jikooyin gudaha iyo dibadda ah, xafiis gaar ah, iyo xasilooni buuxda.',
    deliveryStatus: 'Iibka & Qandaraasyadu Way Furan Yihiin'
  },
  {
    id: 'masalaha-apartments',
    name: 'Masallaha Luxury Apartments',
    nameSomali: 'Masallaha Apartments (Dabaqyada Casriga ah)',
    location: 'Masallaha Airport Highway, Hargeisa',
    neighborhood: 'Masallaha',
    type: 'Modern Multi-Story Residences & Penthouses',
    beds: '2 - 5 Qolal & Penthouses',
    baths: '2 - 5 Musqulood',
    builtArea: '113 m² – 272 m²',
    plotSize: 'Twin Residential Towers (G+6)',
    category: 'Vertical Modern Living',
    tag: 'Twin Tower Elevators',
    tagColor: 'bg-rose-100 text-rose-800 border-rose-200',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    features: [
      'High-Speed European Standard Passenger Elevators',
      '78-Car Dedicated Secure Ground Parking Bay',
      '24/7 Backup Generator & Borehole Supply',
      'Commercial Ground Retail & Rooftop Terraces',
      'Iib Toos ah oo Kaabsan & Shahaadada Lahaanshaha'
    ],
    description: 'Contemporary multi-story living with panoramic airport corridor views, elevator access, 2-to-5 bedroom floorplans, and turnkey finishings.',
    somaliDesc: 'Dabaqyo casri ah oo 6 dabaq ah leh wiishash degdeg ah, baakinka 78 gaadhi, dukaamo adeeg, iyo qorshayaal kala duwan oo 2 illaa 5 qol Penthouse ah.',
    deliveryStatus: 'Iibka & Qandaraasyadu Way Furan Yihiin'
  }
];

export const ValuationSection: React.FC<ValuationSectionProps> = ({
  onOpenAIAdvisorWithQuery,
  onOpenContact
}) => {
  const { language } = useTranslation();
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<'all' | 'villa' | 'townhouse' | 'apartment'>('all');
  const [activeProject, setActiveProject] = useState<MasterCommunityMatch>(MASTER_COMMUNITIES[0]);

  const filteredProjects = MASTER_COMMUNITIES.filter(proj => {
    if (selectedTypeFilter === 'all') return true;
    if (selectedTypeFilter === 'villa') return proj.id === 'aragsan-village' || proj.id === 'bilicsan-village';
    if (selectedTypeFilter === 'townhouse') return proj.id === 'rugsan-gardens';
    if (selectedTypeFilter === 'apartment') return proj.id === 'masalaha-apartments';
    return true;
  });

  const handleWhatsAppInquiry = (project: MasterCommunityMatch) => {
    const text = encodeURIComponent(
      `Kaabsan Real Estate Official Website:\nAsc Kaabsan Real Estate, waxaan doonayaa faahfaahinta iyo qiimaha rasmiga ah ee mashruuca ${project.name} (${project.location}). Fadlan faahfaahin buuxda & qorshaha bixinta iiga soo dira WhatsApp.`
    );
    window.open(`https://wa.me/252636100090?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="community-matcher" className="py-20 bg-[#F9F8F6] border-t border-[#E5E2DA] relative overflow-hidden">
      {/* Background Subtle Ambience */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C2A55D]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C2A55D]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E2DA] shadow-xs">
            <Compass className="w-4 h-4 text-[#C2A55D]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#C2A55D]">
              {language === 'ar' ? 'اختيار المجتمع والمنزل المناسب' : language === 'so' ? 'Hel Guriga & Xaafadda Kugu Habboon' : 'Lifestyle & Community Matcher'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1A1A1A] font-bold tracking-tight">
            {language === 'ar' 
              ? 'اكتشف مجتمع كابسان المثالي لعائلتك' 
              : language === 'so' 
              ? 'Dooro Mashruuca & Naqshadda Kugu Habboon' 
              : 'Match Your Dream Community & Living Style'}
          </h2>

          <p className="text-sm sm:text-base text-[#6B665E] font-light leading-relaxed">
            {language === 'ar'
              ? 'استكشف المجمعات السكنية المغلقة والمطورة وفق أعلى معايير الهندسة بواسطة كابسان ومجموعة تيلسوم. للتفاصيل والأسعار وخطط الدفع، تواصل مباشرة مع فريق المبيعات عبر واتساب.'
              : language === 'so'
              ? 'Dooro nooca guriga, qoyskaaga iyo nolosha aad jeceshahay si aad u hesho mashruuca Kaabsan ee kugu habboon — Rugsan, Aragsan, Bilicsan, ama Masallaha. Si aad u hesho qiimaha rasmiga ah iyo qorshaha bixinta, fadlan toos noola soo xidhiidh WhatsApp.'
              : 'Explore master-planned gated enclaves engineered to perfection by Kaabsan and Telesom Group. For verified official pricing, custom floorplans, and 5-year financing structures, connect directly with our sales advisors via WhatsApp.'}
          </p>

          {/* Interactive Lifestyle Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              onClick={() => setSelectedTypeFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedTypeFilter === 'all'
                  ? 'bg-[#1A1A1A] text-white shadow-md'
                  : 'bg-white border border-[#E5E2DA] text-[#6B665E] hover:border-[#C2A55D] hover:text-[#1A1A1A]'
              }`}
            >
              {language === 'ar' ? 'جميع المشاريع' : language === 'so' ? 'Dhammaan Mashaariicda (All Projects)' : 'All Master Projects'}
            </button>
            <button
              onClick={() => setSelectedTypeFilter('townhouse')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedTypeFilter === 'townhouse'
                  ? 'bg-[#1A1A1A] text-white shadow-md'
                  : 'bg-white border border-[#E5E2DA] text-[#6B665E] hover:border-[#C2A55D] hover:text-[#1A1A1A]'
              }`}
            >
              {language === 'ar' ? 'تاون هاوس (Rugsan Gardens)' : language === 'so' ? 'Modern Townhouses (Rugsan)' : 'Modern Townhouses'}
            </button>
            <button
              onClick={() => setSelectedTypeFilter('villa')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedTypeFilter === 'villa'
                  ? 'bg-[#1A1A1A] text-white shadow-md'
                  : 'bg-white border border-[#E5E2DA] text-[#6B665E] hover:border-[#C2A55D] hover:text-[#1A1A1A]'
              }`}
            >
              {language === 'ar' ? 'فلل فاخرة (Aragsan & Bilicsan)' : language === 'so' ? 'Luxury Villas (Aragsan & Bilicsan)' : 'Standalone Luxury Villas'}
            </button>
            <button
              onClick={() => setSelectedTypeFilter('apartment')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedTypeFilter === 'apartment'
                  ? 'bg-[#1A1A1A] text-white shadow-md'
                  : 'bg-white border border-[#E5E2DA] text-[#6B665E] hover:border-[#C2A55D] hover:text-[#1A1A1A]'
              }`}
            >
              {language === 'ar' ? 'شقق وبنتهاوس (Masallaha Apartments)' : language === 'so' ? 'Dabaqyo & Penthouses (Masallaha)' : 'Multi-Story Apartments'}
            </button>
          </div>
        </div>

        {/* Master Project Interactive Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {filteredProjects.map((project) => {
            const isSelected = activeProject.id === project.id;
            return (
              <button
                key={project.id}
                onClick={() => setActiveProject(project)}
                className={`text-left p-4 rounded-2xl transition-all cursor-pointer flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-white border-[#C2A55D] shadow-xl ring-2 ring-[#C2A55D]/20 scale-[1.02]'
                    : 'bg-white/80 border-[#E5E2DA] hover:bg-white hover:border-[#C2A55D]/50 shadow-xs'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${project.tagColor}`}>
                      {project.tag}
                    </span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-[#C2A55D] text-white flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-sm text-[#1A1A1A]">{project.name}</h3>
                  <p className="text-[11px] text-[#6B665E] flex items-center gap-1 truncate">
                    <MapPin className="w-3 h-3 text-[#C2A55D] flex-shrink-0" />
                    <span>{project.location}</span>
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-[#F2EFE9] flex items-center justify-between text-[11px] font-semibold text-[#1A1A1A]">
                  <span>{project.beds}</span>
                  <span className="text-[#C2A55D] font-bold">{project.builtArea}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Project Highlight Detail Card (Zero Price Clutter, Pure Craftsmanship & Direct Action) */}
        <div className="bg-white border border-[#E5E2DA] rounded-3xl p-6 sm:p-10 shadow-xl mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Image with Overlays */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-lg border border-[#E5E2DA] bg-[#1A1A1A] aspect-[4/3]">
              <img 
                src={activeProject.image} 
                alt={activeProject.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border bg-white/95 text-[#1A1A1A] shadow-sm backdrop-blur-xs`}>
                  {activeProject.category}
                </span>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#128C7E] text-white shadow-sm">
                  {activeProject.deliveryStatus}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h4 className="text-xl font-bold">{activeProject.name}</h4>
                <p className="text-xs text-white/80 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C2A55D]" />
                  <span>{activeProject.location}</span>
                </p>
              </div>
            </div>

            {/* Right: Technical Specs, Certified Engineering & Direct Actions */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#C2A55D] mb-1">
                  <Building2 className="w-4 h-4 text-[#C2A55D]" />
                  <span>{activeProject.type}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A]">
                  {language === 'so' ? activeProject.nameSomali : activeProject.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B665E] mt-2 leading-relaxed">
                  {language === 'so' ? activeProject.somaliDesc : activeProject.description}
                </p>
              </div>

              {/* 4 Key Spec Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-[#F9F8F6] border border-[#E5E2DA] rounded-xl text-center">
                  <span className="text-[10px] font-bold uppercase text-[#8C867A] block">Bedrooms</span>
                  <span className="text-sm font-bold text-[#1A1A1A] mt-0.5 block">{activeProject.beds}</span>
                </div>
                <div className="p-3 bg-[#F9F8F6] border border-[#E5E2DA] rounded-xl text-center">
                  <span className="text-[10px] font-bold uppercase text-[#8C867A] block">Bathrooms</span>
                  <span className="text-sm font-bold text-[#1A1A1A] mt-0.5 block">{activeProject.baths}</span>
                </div>
                <div className="p-3 bg-[#F9F8F6] border border-[#E5E2DA] rounded-xl text-center">
                  <span className="text-[10px] font-bold uppercase text-[#8C867A] block">Built Area</span>
                  <span className="text-sm font-bold text-[#C2A55D] mt-0.5 block">{activeProject.builtArea}</span>
                </div>
                <div className="p-3 bg-[#F9F8F6] border border-[#E5E2DA] rounded-xl text-center">
                  <span className="text-[10px] font-bold uppercase text-[#8C867A] block">Financing Partner</span>
                  <span className="text-sm font-bold text-[#1A1A1A] mt-0.5 block">Dara Salaam Bank</span>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider block">
                  {language === 'ar' ? 'المواصفات والمزايا الهندسية:' : language === 'so' ? 'Tilmaamaha & Faa\'iidooyinka Mashruuca:' : 'Key Engineering & Community Highlights:'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeProject.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#35322E]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C2A55D] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Official Price Notice & High-Converting Actions */}
              <div className="pt-2 border-t border-[#F2EFE9] flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => handleWhatsAppInquiry(activeProject)}
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>
                    {language === 'ar' 
                      ? 'طلب السعر وخطط الدفع عبر واتساب' 
                      : language === 'so' 
                      ? 'Dalbo Qiimaha & Faahfaahinta (WhatsApp)' 
                      : 'Request Official Pricing via WhatsApp'}
                  </span>
                </button>

                <button
                  onClick={() => onOpenContact(`Waxaan doonayaa inaan ballansado booqashada goobta (Site Tour) ee mashruuca ${activeProject.name}`)}
                  className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-[#1A1A1A] hover:bg-[#35322E] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#C2A55D]" />
                  <span>{language === 'ar' ? 'حجز موعد زيارة ميدانية' : language === 'so' ? 'Ballanso Kormeer Goobta' : 'Book Site Tour'}</span>
                </button>

                <button
                  onClick={() => onOpenAIAdvisorWithQuery(`Ii sharax faahfaahinta, deegaanka iyo sababta aan u dooranayo mashruuca ${activeProject.name} ee Kaabsan Real Estate.`)}
                  className="w-full sm:w-auto py-3.5 px-4 rounded-xl bg-[#F4F1EA] hover:bg-[#EAE5D9] text-[#35322E] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-[#E5E2DA]"
                  title="Kaabsan AI Assistant"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C2A55D]" />
                  <span>AI Advisor</span>
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* 4-Step Homeownership Journey (Tubta 4-ta Tallaabo ee Lahaanshaha Guriga ee Kaabsan) */}
        <div className="bg-[#1A1A1A] text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle gold grid effect */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C2A55D]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[11px] font-bold text-[#C2A55D] uppercase tracking-widest bg-[#2E2B27] px-3 py-1 rounded-full border border-[#C2A55D]/30 inline-block">
                {language === 'ar' ? 'رحلة التملك الميسرة' : language === 'so' ? 'Tubta 4-ta Tallaabo ee Lahaanshaha' : 'Seamless 4-Step Homeownership'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                {language === 'ar' 
                  ? 'كيف تمتلك منزلك في مشاريع كابسان؟' 
                  : language === 'so' 
                  ? 'Sida Aad U Yeelan Kartid Gurigaaga Kaabsan' 
                  : 'Your Direct Path to Owning a Kaabsan Luxury Home'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-light">
                {language === 'ar'
                  ? 'خطوات واضحة ومضمونة 100% بدون أي تعقيدات، مع ضمانات قانونية وتمويل إسلامي 0% ربا.'
                  : language === 'so'
                  ? 'Tallaabooyin cad oo hufan, 100% waafaqsan Shareecada Islaamka, lehna shahaadada dhabta ah ee lahaanshaha.'
                  : 'A transparent, transparently structured process backed by Telesom Group and Dara Salaam Bank.'}
              </p>
            </div>

            {/* 4 Steps Timeline Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Step 1 */}
              <div className="p-5 rounded-2xl bg-[#24211E] border border-white/10 relative flex flex-col justify-between group hover:border-[#C2A55D]/60 transition-colors">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#C2A55D]/20 text-[#C2A55D] flex items-center justify-center font-bold text-sm border border-[#C2A55D]/40">
                    01
                  </div>
                  <h4 className="font-bold text-sm text-white flex items-center gap-2">
                    <Home className="w-4 h-4 text-[#C2A55D]" />
                    <span>{language === 'ar' ? 'اختيار المشروع والوحدة' : language === 'so' ? 'Doorashada Guriga & Booska' : 'Match & Unit Selection'}</span>
                  </h4>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    {language === 'so' 
                      ? 'Kala dooro Rugsan, Aragsan, Bilicsan, ama Masallaha adigoo dooranaya booska (plot) iyo tirada qolalka ee qoyskaagu u baahan yahay.'
                      : 'Choose your desired master community, plot orientation, and bedroom layout tailored to your lifestyle.'}
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-5 rounded-2xl bg-[#24211E] border border-white/10 relative flex flex-col justify-between group hover:border-[#C2A55D]/60 transition-colors">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#C2A55D]/20 text-[#C2A55D] flex items-center justify-center font-bold text-sm border border-[#C2A55D]/40">
                    02
                  </div>
                  <h4 className="font-bold text-sm text-white flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#C2A55D]" />
                    <span>{language === 'ar' ? 'معاينة الموقع أو جولة افتراضية' : language === 'so' ? 'Kormeerka Goobta (Site Tour)' : 'Site Tour & Verification'}</span>
                  </h4>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    {language === 'so' 
                      ? 'Booqasho toos ah oo aad ku tagto goobta dhismaha Hargeysa, ama kormeer muuqaal ah (Direct Video Tour) haddii aad dibadda joogto.'
                      : 'Walk the live site in Hargeisa or join a private real-time video inspection if you are based in the Diaspora.'}
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-5 rounded-2xl bg-[#24211E] border border-white/10 relative flex flex-col justify-between group hover:border-[#C2A55D]/60 transition-colors">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#C2A55D]/20 text-[#C2A55D] flex items-center justify-center font-bold text-sm border border-[#C2A55D]/40">
                    03
                  </div>
                  <h4 className="font-bold text-sm text-white flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-[#C2A55D]" />
                    <span>{language === 'ar' ? 'العقد والتمويل الإسلامي' : language === 'so' ? 'Heshiiska & Maalgelinta' : 'Contract & Murabaha Plan'}</span>
                  </h4>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    {language === 'so' 
                      ? 'Saxeex heshiis sharci ah adigoo bixinaya Cash ama dooranaya maalgelinta 5-ta Sano ee Dara Salaam Bank (30% Down Payment & 0% Riba).'
                      : 'Sign your verified legal contract via direct cash or the 5-Year Murabaha installment structure backed by Dara Salaam Bank.'}
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="p-5 rounded-2xl bg-[#24211E] border border-white/10 relative flex flex-col justify-between group hover:border-[#C2A55D]/60 transition-colors">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#C2A55D]/20 text-[#C2A55D] flex items-center justify-center font-bold text-sm border border-[#C2A55D]/40">
                    04
                  </div>
                  <h4 className="font-bold text-sm text-white flex items-center gap-2">
                    <Key className="w-4 h-4 text-[#C2A55D]" />
                    <span>{language === 'ar' ? 'استلام المفتاح وسند الملكية' : language === 'so' ? 'Furaha & Shahaadada Lahaanshaha' : 'Key Handover & Title Deed'}</span>
                  </h4>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    {language === 'so' 
                      ? 'La wareeg furaha gurigaaga cusub oo wata shahaadada dhabta ah ee lahaanshaha (Official Registered Title Deed).'
                      : 'Receive the physical keys to your turnkey luxury home along with the official, notarized title deed registered in your name.'}
                  </p>
                </div>
              </div>

            </div>

            {/* Bottom Direct VIP Advisory Strip */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-xs text-gray-300">
                <ShieldCheck className="w-5 h-5 text-[#C2A55D] flex-shrink-0" />
                <span>
                  {language === 'so'
                    ? 'Dhammaan mashaariicda waxaa damaanad qaaday Telesom Group & Kaabsan Ready-Mix Batching Plant.'
                    : 'All communities backed by the solid reputation of Telesom Group and certified by Kaabsan Batching Plant.'}
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href="tel:380"
                  className="flex-1 sm:flex-none py-2.5 px-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C2A55D]" />
                  <span>{language === 'so' ? 'Wac 380 Toos' : 'Call 380 Direct'}</span>
                </a>

                <a
                  href={`https://wa.me/252636100090?text=${encodeURIComponent('Kaabsan Real Estate Official Website:\nAsc Kaabsan Real Estate, waxaan doonayaa la-talin gaar ah oo ku saabsan sida aan guri uga iibsan karo mashaariicda Kaabsan.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none py-2.5 px-5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>WhatsApp VIP Advisory</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
