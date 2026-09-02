import React, { useState } from 'react';
import { Calendar, MapPin, Users, Award, ChevronRight, Sparkles, Clock, CheckCircle2, MessageCircle, ArrowLeft, Image as ImageIcon, Video, Share2, Play, ExternalLink, Youtube } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { SafeImage } from './SafeImage';
import { extractYouTubeId, getYouTubeEmbedUrl, getYouTubeThumbnail, isYouTubeUrl } from '../utils/mediaUtils';
import { SiteConfig } from '../types';

interface EventsPageProps {
  onBack: () => void;
  onOpenContact: (msg?: string) => void;
  onSelectProject?: (projectName: string) => void;
  events?: KaabsanEvent[];
  siteConfig?: SiteConfig;
}

export interface KaabsanEvent {
  id: string;
  title: string;
  titleSo: string;
  titleAr: string;
  category: 'handover' | 'groundbreaking' | 'community' | 'expo' | 'education';
  date: string;
  dateDisplay: string;
  location: string;
  locationSo: string;
  image: string;
  videoUrl?: string; // YouTube or video URL
  gallery: string[];
  description: string;
  descriptionSo: string;
  descriptionAr: string;
  highlights: string[];
  attendeesCount: string;
  isUpcoming?: boolean;
}

export const EVENTS_DATA: KaabsanEvent[] = [
  {
    id: 'event-01',
    title: 'Rugsan Gardens Phase 1 Official Key Handover Gala',
    titleSo: 'Xafladdii Weynayd ee Wareejinta Furayaasha Rugsan Gardens (Phase 1)',
    titleAr: 'حفل التسليم الرسمي للمفاتيح لقرية روغسان جاردنز',
    category: 'handover',
    date: '2024-11-15',
    dateDisplay: 'November 2024',
    location: 'Rugsan Gardens Central Plaza, Masalaha, Hargeisa',
    locationSo: 'Fagaaraha Dhexe ee Rugsan Gardens, Masalaha, Hargeysa',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    gallery: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A historic celebration marking the successful completion and key handover of 68 luxury contemporary townhouses in Rugsan Gardens, attended by homeowners, Telesom executives, and community elders.',
    descriptionSo: 'Xaflad ballaadhan oo lagu wareejinayay furayaasha 68-ka guri ee casriga ah ee Rugsan Gardens, waxaana ka qayb galay qoysaska mulkiilayaasha ah, madaxda Telesom Group, culimo iyo madaxda qaranka.',
    descriptionAr: 'احتفال تاريخي بمناسبة تسليم المفاتيح لـ 68 منزلاً عصرياً في مشروع روغسان جاردنز بحضور كبار مسؤولي مجموعة تيليسوم وأصحاب المنازل.',
    highlights: [
      '68 Title Deeds officially transferred to diaspora and local homeowners',
      'High-level delegation from Telesom Group & Dara Salaam Bank',
      'Inauguration of community asphalt roads and 24/7 security gatehouse',
      'Ribbon cutting ceremony by the Chairman'
    ],
    attendeesCount: '450+ Attendees'
  },
  {
    id: 'event-02',
    title: 'Aragsan Village Official Groundbreaking & VIP Launch',
    titleSo: 'Xafladda Dhagax-dhigga & Furitaanka Rasmiga ah ee Aragsan Village',
    titleAr: 'حفل وضع حجر الأساس والتدشين الرسمي لقرية أراغسان',
    category: 'groundbreaking',
    date: '2024-08-20',
    dateDisplay: 'August 2024',
    location: 'Buurta Kala-jeexan (Jigjiga Yar), Hargeisa',
    locationSo: 'Buurta Kala-jeexan (Jigjiga Yar), Hargeysa',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Groundbreaking ceremony for the 66 G+1 luxury contemporary houses in Buurta Kala-jeexan, overlooking the scenic hills of Jigjiga Yar with modern underground infrastructure.',
    descriptionSo: 'Dhagax-dhigga mashruuca weyn ee Aragsan Village oo ka kooban 66 guri oo G+1 ah oo ku yaal Buurta Kala-jeexan, oo leh kaabayaal casri ah oo dhulka hoos mara.',
    descriptionAr: 'مراسم وضع حجر الأساس لـ 66 فيلا عصرية فاخرة G+1 في قرية أراغسان بإطلالات بانورامية رائعة وبنية تحتية تحت الأرض.',
    highlights: [
      'Official unveiling of architectural scale model (1:100)',
      'Launch of the 60-Month Islamic Financing Scheme with Dara Salaam Bank',
      'Site blessing & presentation by Kaabsan Chief Civil Engineers',
      'Signing of initial Phase 1 diaspora allocations'
    ],
    attendeesCount: '300+ Guests'
  },
  {
    id: 'event-03',
    title: 'Australian Islamic School Campus Inauguration at Rugsan',
    titleSo: 'Furitaanka Dugsiga Caalamiga ah ee Australian Islamic School (Rugsan)',
    titleAr: 'افتتاح الحرم التعليمي للمدرسة الإسلامية الأسترالية في روغسان',
    category: 'education',
    date: '2024-09-05',
    dateDisplay: 'September 2024',
    location: 'Australian Islamic School Campus, Rugsan Gardens, Hargeisa',
    locationSo: 'Xarunta Dugsiga ee Xaafadda Rugsan Gardens, Masalaha, Hargeysa',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Inauguration of the state-of-the-art educational campus inside Rugsan Gardens offering international Australian curriculum and Islamic studies for 240+ students.',
    descriptionSo: 'Furitaanka dugsiga caalamiga ah ee carruurta loogu talagalay oo ku dhex yaal xaafadda Rugsan Gardens, bixinayana manhajka caalamiga ah ee Australia iyo barashada diinta Islaamka.',
    descriptionAr: 'افتتاح الصرح التعليمي الحديث داخل روغسان جاردنز لتقديم المنهج الأسترالي والتربية الإسلامية لأكثر من 240 طالباً.',
    highlights: [
      'Dedicated classrooms, science labs, and safe play zones',
      'Walkable campus access for all Rugsan Gardens residents',
      'Address by educational leaders and community committee'
    ],
    attendeesCount: '350+ Parents & Students'
  },
  {
    id: 'event-04',
    title: 'Annual Diaspora Homeowners & Investor Forum',
    titleSo: 'Madasha Sanadlaha ah ee Qurbajoogta & Maalgashadayaasha Kaabsan',
    titleAr: 'المنتدى السنوي للمغتربين والمستثمرين في كابسان العقارية',
    category: 'community',
    date: '2024-07-25',
    dateDisplay: 'July 2024',
    location: 'Ambassador Hotel Grand Ballroom & Live Virtual Stream, Hargeisa',
    locationSo: 'Hoolka Weyn ee Huteelka Ambassador & Tooska Internet-ka, Hargeysa',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An exclusive annual gathering uniting diaspora investors from the UK, North America, Europe, and Gulf countries to discuss property appreciation, title deeds, and upcoming master phases.',
    descriptionSo: 'Kulan ballaadhan oo sanadkiiba mar ay isugu yimaadaan qurbajoogta ka kala timid UK, Maraykanka, Yurub iyo Khaliijka si ay u falanqeeyaan korodhka qiimaha guryaha iyo mashaariicda cusub.',
    descriptionAr: 'تجمع سنوي مميز يجمع المستثمرين المغتربين لمناقشة العوائد الاستثمارية وخطط المشاريع المستقبلية.',
    highlights: [
      'Keynote on Hargeisa Urban Expansion by Kaabsan Urban Planners',
      '1-on-1 consultations with Dara Salaam Bank financing officers',
      'Exclusive preview of upcoming master communities'
    ],
    attendeesCount: '600+ Global Attendees'
  },
  {
    id: 'event-05',
    title: 'Ready-Mix Automated Concrete Batching Plant Launch',
    titleSo: 'Xafladdii Furitaanka Warshadda Shubka Diyaar-ka ah ee Kaabsan',
    titleAr: 'تدشين مصنع الخرسانة الجاهزة الآلي التابع لشركة كابسان',
    category: 'expo',
    date: '2023-10-12',
    dateDisplay: 'October 2023',
    location: 'Kaabsan Industrial Plant, Airport Road, Hargeisa',
    locationSo: 'Goobta Warshadaha Kaabsan, Jidka Madaarka, Hargeysa',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Commissioning of the first automated ready-mix German batching plant in Somaliland to ensure ASTM standard high-strength structural concrete for all Kaabsan master developments.',
    descriptionSo: 'Furitaanka warshadda ugu horreysay ee shubka casriga ah ee Somaliland oo si toos ah u farsamaysa shubka dhismaha ee heerka caalamiga ah ee mashaariicda Kaabsan.',
    descriptionAr: 'تدشين أول مصنع آلي للخرسانة الجاهزة في صوماليلاند لضمان أعلى معايير الجودة الإنشائية لمشاريعنا.',
    highlights: [
      'Automated batching capacity of 120 m³/hour',
      'Fleet of 10 modern transit mixers and 42m boom pumps',
      'Zero construction delay guarantee for homeowners'
    ],
    attendeesCount: '250+ Engineers & Contractors'
  }
];

export const EventsPage: React.FC<EventsPageProps> = ({ onBack, onOpenContact, events = EVENTS_DATA, siteConfig }) => {
  const { language } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [modalActiveTab, setModalActiveTab] = useState<'video' | 'gallery'>('video');

  const allEvents = events && events.length > 0 ? events : EVENTS_DATA;
  const [activeModalEvent, setActiveModalEvent] = useState<KaabsanEvent | null>(null);

  const filteredEvents = selectedCategory === 'all'
    ? allEvents
    : allEvents.filter((e) => e.category === selectedCategory);

  const handleWhatsAppInquiry = (eventTitle: string) => {
    const text = `Salaan Kaabsan Real Estate, waxaan jeclaan lahaa inaan macluumaad dheeraad ah ka helo munaasabadda: "${eventTitle}". Fadlan faahfaahin iga siiya mashaariicda la xidhiidha.`;
    window.open(`https://wa.me/${(siteConfig?.whatsappTemplates?.hotlineNumber || siteConfig?.company?.whatsapp || '+252636100090').replace(/\D/g, '')}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const categoryTabs = [
    { id: 'all', label: language === 'ar' ? 'جميع الفعاليات' : language === 'so' ? 'Dhammaan Xafladaha' : 'All Events' },
    { id: 'handover', label: language === 'ar' ? 'تسليم المفاتيح' : language === 'so' ? 'Wareejinta Furayaasha' : 'Key Handovers' },
    { id: 'groundbreaking', label: language === 'ar' ? 'وضع حجر الأساس' : language === 'so' ? 'Dhagax-dhigga' : 'Groundbreakings' },
    { id: 'community', label: language === 'ar' ? 'لقاءات المجتمع' : language === 'so' ? 'Kulamada Bulshada' : 'Community' },
    { id: 'education', label: language === 'ar' ? 'التعليم' : language === 'so' ? 'Waxbarashada' : 'Education' },
    { id: 'expo', label: language === 'ar' ? 'المعارض والصناعة' : language === 'so' ? 'Warshadaha & Soo Bandhigga' : 'Industrial Launch' }
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] pb-24">
      {/* Header Banner */}
      <div className="relative bg-[#1F1D1A] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#C2A55D_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-20 bg-cover bg-center pointer-events-none hidden md:block" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80')` }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs text-[#EBE6DF] hover:text-[#C2A55D] mb-6 transition-colors bg-white/5 px-3 py-1.5 rounded-full border border-white/10 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'العودة للرئيسية' : language === 'so' ? 'Ku Noqo Bogga Hore' : 'Back to Home'}</span>
          </button>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C2A55D]/20 border border-[#C2A55D]/40 text-[#DFCA85] text-xs font-bold mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'أحداث وفعاليات كابسان العقارية' : language === 'so' ? 'Munaasabadaha & Dhacdooyinka Kaabsan' : 'Kaabsan Milestone Ceremonies'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl">
            {language === 'ar'
              ? 'توثيق الإنجازات وتسليم المشاريع للمواطنين'
              : language === 'so'
              ? 'Dabaaldagga Guulaha & Wareejinta Furayaasha'
              : 'Celebrating Milestones & Key Handovers'}
          </h1>

          <p className="text-sm sm:text-base text-[#D4CFC7] max-w-2xl mt-4 leading-relaxed">
            {language === 'ar'
              ? 'شاهد لقطات وفيديوهات احتفالات تسليم المنازل، وضع حجر الأساس للمجتمعات الجديدة، والفعاليات الرسمية لمجموعة كابسان وتيليسوم.'
              : language === 'so'
              ? 'Daawo muuqaallada iyo sawirrada xafladaha wareejinta furayaasha, dhagax-dhigga mashaariicda cusub, iyo shirarka sanadlaha ah ee Kaabsan & Telesom Group.'
              : 'Explore high-resolution footage and ceremony galleries of key handovers, groundbreaking ceremonies, and annual homeowner forums.'}
          </p>

          {/* YouTube Channel CTA Button */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={siteConfig?.socialLinks?.youtube || 'https://www.youtube.com/@kaabsanrealestate'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg hover:shadow-red-600/30"
              id="events-youtube-channel-btn"
            >
              <Youtube className="w-4 h-4 fill-current" />
              <span>{language === 'ar' ? 'قناة يوتيوب الرسمية لكابسان' : language === 'so' ? 'Daawo Kaabsan YouTube Channel' : 'Official Kaabsan YouTube'}</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Category Tabs Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white p-2 rounded-2xl shadow-lg border border-[#E5E2DA] flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categoryTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === tab.id
                  ? 'bg-[#1A1A1A] text-white shadow-sm'
                  : 'text-[#6B665E] hover:text-[#1A1A1A] hover:bg-[#F2EFE9]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => {
            const hasVideo = isYouTubeUrl(event.videoUrl) || isYouTubeUrl(event.image);
            const coverImageSrc = event.image || (event.videoUrl ? getYouTubeThumbnail(event.videoUrl) : '') || '';

            return (
              <div
                key={event.id}
                className="bg-white rounded-2xl border border-[#E5E2DA] hover:border-[#C2A55D] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Event Cover Image / Video Thumbnail */}
                  <div 
                    onClick={() => {
                      setModalActiveTab(hasVideo ? 'video' : 'gallery');
                      setActiveModalEvent(event);
                    }}
                    className="relative aspect-[16/10] overflow-hidden bg-[#1F1D1A] cursor-pointer"
                  >
                    <SafeImage
                      src={coverImageSrc}
                      alt={event.title}
                      fallbackType="event"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Date Badge */}
                    <div className="absolute top-3 left-3 bg-[#1A1A1A]/85 backdrop-blur-md text-[#DFCA85] text-[11px] font-extrabold px-3 py-1 rounded-md flex items-center gap-1.5 shadow-md">
                      <Calendar className="w-3.5 h-3.5 text-[#C2A55D]" />
                      {event.dateDisplay}
                    </div>

                    {/* Video Indicator Overlay */}
                    {hasVideo && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/40 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 fill-white ml-0.5" />
                        </div>
                      </div>
                    )}

                    {/* Video Tag / Location Banner */}
                    <div className="absolute bottom-3 left-3 right-3 bg-black/75 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between">
                      <div className="flex items-center gap-1.5 truncate">
                        <MapPin className="w-3.5 h-3.5 text-[#C2A55D] shrink-0" />
                        <span className="truncate">{language === 'so' ? event.locationSo : event.location}</span>
                      </div>
                      {hasVideo && (
                        <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider flex items-center gap-1 shrink-0 ml-2">
                          <Video className="w-3 h-3" /> Video
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#C2A55D] font-extrabold uppercase tracking-wider">
                      <span>{event.category.toUpperCase()}</span>
                      <span className="text-[#6B665E] font-semibold">{event.attendeesCount}</span>
                    </div>

                    <h3 
                      onClick={() => {
                        setModalActiveTab(hasVideo ? 'video' : 'gallery');
                        setActiveModalEvent(event);
                      }}
                      className="text-xl font-bold text-[#1A1A1A] leading-snug group-hover:text-[#C2A55D] transition-colors cursor-pointer"
                    >
                      {language === 'ar' ? event.titleAr : language === 'so' ? event.titleSo : event.title}
                    </h3>

                    <p className="text-xs text-[#6B665E] leading-relaxed line-clamp-3">
                      {language === 'ar' ? event.descriptionAr : language === 'so' ? event.descriptionSo : event.description}
                    </p>

                    {/* Highlights Bullet List */}
                    <div className="pt-2 space-y-1.5 border-t border-[#F2EFE9]">
                      {event.highlights.slice(0, 2).map((hl, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[11px] text-[#4A4742]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C2A55D] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-6 pt-0 space-y-2">
                  <button
                    onClick={() => {
                      setModalActiveTab(hasVideo ? 'video' : 'gallery');
                      setActiveModalEvent(event);
                    }}
                    className="w-full py-2.5 bg-[#F9F8F6] hover:bg-[#1A1A1A] text-[#1A1A1A] hover:text-white font-extrabold text-xs rounded-xl transition-colors border border-[#E5E2DA] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {hasVideo ? (
                      <>
                        <Play className="w-3.5 h-3.5 text-[#C2A55D] fill-[#C2A55D]" />
                        <span>{language === 'ar' ? 'مشاهدة الفيديو والصور' : language === 'so' ? 'Daawo Muuqaalka & Sawirrada' : 'Watch Video & View Gallery'}</span>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-3.5 h-3.5 text-[#C2A55D]" />
                        <span>{language === 'ar' ? 'عرض تفاصيل وصور الحفل' : language === 'so' ? 'Eeg Sawirrada & Faahfaahinta Xafladda' : 'View Ceremony Details & Gallery'}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleWhatsAppInquiry(event.title)}
                    className="w-full py-2 bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white font-bold text-xs rounded-xl transition-colors border border-emerald-200 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'استفسار عبر واتساب' : language === 'so' ? 'Kala Xidhiidh WhatsApp' : 'Inquire on WhatsApp'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Event Details & YouTube Player Modal */}
      {activeModalEvent && (() => {
        const videoSource = activeModalEvent.videoUrl || (isYouTubeUrl(activeModalEvent.image) ? activeModalEvent.image : '');
        const ytId = extractYouTubeId(videoSource);
        const embedUrl = ytId ? getYouTubeEmbedUrl(videoSource, { autoplay: true }) : null;

        return (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#E5E2DA] animate-in fade-in zoom-in-95 duration-200 my-8">
              
              {/* Media Container: Either YouTube Embed Player or Safe Cover Image */}
              <div className="relative aspect-[16/9] w-full bg-black">
                {embedUrl && modalActiveTab === 'video' ? (
                  <iframe
                    src={embedUrl}
                    title={activeModalEvent.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <SafeImage
                    src={activeModalEvent.image}
                    alt={activeModalEvent.title}
                    fallbackType="event"
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Close Button */}
                <button
                  onClick={() => setActiveModalEvent(null)}
                  className="absolute top-4 right-4 bg-black/75 hover:bg-black text-white w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-colors shadow-lg z-20"
                >
                  ✕
                </button>

                {/* Bottom Title Ribbon (if photo mode or video overlaid) */}
                {(!embedUrl || modalActiveTab !== 'video') && (
                  <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-4 rounded-2xl text-white">
                    <span className="text-xs text-[#DFCA85] font-extrabold uppercase tracking-widest block mb-1">
                      {activeModalEvent.category.toUpperCase()} • {activeModalEvent.dateDisplay}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black leading-tight">
                      {language === 'ar' ? activeModalEvent.titleAr : language === 'so' ? activeModalEvent.titleSo : activeModalEvent.title}
                    </h2>
                  </div>
                )}
              </div>

              {/* Video vs Photo Switcher (if event has both video & photos) */}
              {embedUrl && activeModalEvent.gallery && activeModalEvent.gallery.length > 0 && (
                <div className="flex border-b border-[#E5E2DA] bg-[#F9F8F6] px-6 pt-3 gap-2">
                  <button
                    onClick={() => setModalActiveTab('video')}
                    className={`pb-3 px-4 text-xs font-bold flex items-center gap-1.5 border-b-2 cursor-pointer transition-all ${
                      modalActiveTab === 'video'
                        ? 'border-red-600 text-red-600'
                        : 'border-transparent text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    <Video className="w-3.5 h-3.5" /> Muuqaalka Xafladda (Video)
                  </button>
                  <button
                    onClick={() => setModalActiveTab('gallery')}
                    className={`pb-3 px-4 text-xs font-bold flex items-center gap-1.5 border-b-2 cursor-pointer transition-all ${
                      modalActiveTab === 'gallery'
                        ? 'border-[#C2A55D] text-[#1A1A1A]'
                        : 'border-transparent text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" /> Sawirrada Xafladda ({activeModalEvent.gallery.length})
                  </button>
                </div>
              )}

              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#6B665E] bg-[#F9F8F6] p-3 rounded-xl border border-[#E5E2DA]">
                  <MapPin className="w-4 h-4 text-[#C2A55D] shrink-0" />
                  <span>{language === 'so' ? activeModalEvent.locationSo : activeModalEvent.location}</span>
                  <span className="ml-auto font-bold text-[#1A1A1A]">{activeModalEvent.attendeesCount}</span>
                </div>

                <div>
                  <h4 className="text-sm font-black text-[#1A1A1A] mb-2 uppercase tracking-wide">
                    {language === 'ar' ? 'نبذة عن الفعالية' : language === 'so' ? 'Dulmar Guud ee Munaasabadda' : 'Event Overview'}
                  </h4>
                  <p className="text-sm text-[#4A4742] leading-relaxed">
                    {language === 'ar' ? activeModalEvent.descriptionAr : language === 'so' ? activeModalEvent.descriptionSo : activeModalEvent.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-black text-[#1A1A1A] mb-3 uppercase tracking-wide">
                    {language === 'ar' ? 'أبرز الإنجازات والوقائع' : language === 'so' ? 'Qodobbada Ugu Waaweynaa' : 'Key Highlights & Milestones'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeModalEvent.highlights.map((hl, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-[#FDFCFB] p-3 rounded-xl border border-[#E5E2DA] text-xs text-[#35322E] font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#C2A55D] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Event Gallery Grid */}
                {activeModalEvent.gallery && activeModalEvent.gallery.length > 0 && (
                  <div>
                    <h4 className="text-sm font-black text-[#1A1A1A] mb-3 uppercase tracking-wide">
                      {language === 'ar' ? 'معرض صور الحفل' : language === 'so' ? 'Sawirrada Xafladda' : 'Ceremony Gallery'}
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {activeModalEvent.gallery.map((imgUrl, idx) => (
                        <div key={idx} className="aspect-[4/3] rounded-xl overflow-hidden border border-[#E5E2DA] bg-gray-100">
                          <SafeImage 
                            src={imgUrl} 
                            alt={`Gallery ${idx + 1}`} 
                            fallbackType="event"
                            className="w-full h-full object-cover hover:scale-105 transition-transform" 
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#E5E2DA]">
                  <button
                    onClick={() => handleWhatsAppInquiry(activeModalEvent.title)}
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{language === 'ar' ? 'تواصل مع فريق الفعاليات عبر واتساب' : language === 'so' ? 'Kala Xidhiidh Kooxda Xafladaha WhatsApp' : 'Contact Event Team via WhatsApp'}</span>
                  </button>
                  <button
                    onClick={() => setActiveModalEvent(null)}
                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    {language === 'ar' ? 'إغلاق' : language === 'so' ? 'Xidh' : 'Close'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
