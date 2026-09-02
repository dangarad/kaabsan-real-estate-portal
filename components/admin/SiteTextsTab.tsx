import React, { useState } from 'react';
import { 
  Type, 
  Search, 
  CheckCircle2, 
  RotateCcw, 
  Globe, 
  Sparkles, 
  Languages, 
  Layout, 
  Compass, 
  Layers, 
  Calculator, 
  Building2, 
  Factory, 
  Info, 
  ShoppingBag, 
  FolderDown, 
  ChevronDown, 
  ChevronRight,
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';
import { Language, TranslationDictionary, translations as DEFAULT_TRANSLATIONS } from '../../utils/translations';

interface SiteTextsTabProps {
  currentTranslations: Record<Language, TranslationDictionary>;
  onSaveTranslations: (updated: Record<Language, TranslationDictionary>) => void;
  onResetTranslations: () => void;
}

interface TranslationGroup {
  id: string;
  title: string;
  somaliTitle: string;
  icon: React.ReactNode;
  description: string;
  keys: Array<{
    key: keyof TranslationDictionary;
    label: string;
    description: string;
    isLongText?: boolean;
  }>;
}

const TRANSLATION_GROUPS: TranslationGroup[] = [
  {
    id: 'header_nav',
    title: 'Top Bar & Navigation Menu',
    somaliTitle: 'Dusha Sare & Xidhiidhada Menu-ga',
    icon: <Layout className="w-4 h-4 text-indigo-600" />,
    description: 'Qoraallada ku yaal dusha sare ee website-ka iyo dhammaan xidhiidhada navigation-ka.',
    keys: [
      { key: 'partOfTelesom', label: 'Telesom Group Sub-Brand Badge', description: 'Qoraalka tilmaamaya Telesom Group' },
      { key: 'officialDomain', label: 'Official Domain Label', description: 'Magaca domain-ka rasmiga ah (kaabsanrealestate.com)' },
      { key: 'shortcodeCall', label: 'Shortcode Phone Call Button', description: 'Qoraalka wicitaanka shortcode-ka (380)' },
      { key: 'whatsappCall', label: 'WhatsApp Header Hotline Text', description: 'Lambarka WhatsApp ee dusha sare' },
      { key: 'navHome', label: 'Nav: Home (Bogga Hore)', description: 'Badhanka bogga hore' },
      { key: 'navProjects', label: 'Nav: Projects (Mashaariicda)', description: 'Menu-ga mashaariicda waaweyn' },
      { key: 'navBuy', label: 'Nav: Buy (Iibso)', description: 'Menu-ga iibsashada guryaha' },
      { key: 'navSell', label: 'Nav: Sell (Iibi)', description: 'Menu-ga diiwaangelinta guryaha iibka ah' },
      { key: 'navGallery', label: 'Nav: Gallery (Sawirrada)', description: 'Menu-ga bandhigga sawirrada mashaariicda' },
      { key: 'navBlog', label: 'Nav: Blog / News (Wararka)', description: 'Menu-ga wararka iyo saxaafadda' },
      { key: 'navAbout', label: 'Nav: About Us (Nagu Saabsan)', description: 'Menu-ga xogta shirkadda Kaabsan' },
      { key: 'navFinancing', label: 'Nav: 60-Month Financing (Maalgelinta 5-ta Sano)', description: 'Menu-ga xisaabiyaha maalgelinta 60-ka bilood' },
      { key: 'navAiAdvisor', label: 'Nav: AI Advisor (La-taliyaha AI)', description: 'Badhanka la-taliyaha caqliga macmalka ah' },
      { key: 'navScheduleTour', label: 'Nav: Schedule Tour (Ballanso Kormeer)', description: 'Badhanka ballansashada booqashada goobta' },
      { key: 'navPayZaad', label: 'Nav: Pay (Zaad / Bixi Lacag)', description: 'Badhanka lacag bixinta tooska ah ee Zaad' },
      { key: 'navFavorites', label: 'Nav: Favorites (Keydsan)', description: 'Badhanka guryaha aad jecleysatay' },
      { key: 'navAdminPortal', label: 'Nav: Admin Portal (Galka Maamulka)', description: 'Badhanka gelitaanka maamulka' }
    ]
  },
  {
    id: 'hero_section',
    title: 'Hero Banner & Search Controls',
    somaliTitle: 'Qaybta Hero & Baadhista Guryaha',
    icon: <Sparkles className="w-4 h-4 text-amber-500" />,
    description: 'Cinwaannada waaweyn ee bogga hore, badhamada ficilka (CTAs), iyo qaybta baadhista degdegga ah.',
    keys: [
      { key: 'heroBadge', label: 'Hero Top Eyebrow Badge', description: 'Calaamadda yar ee ka sarreysa cinwaanka hero-ga' },
      { key: 'heroTitle', label: 'Hero Main Headline', description: 'Cinwaanka weyn ee bogga hore (Main Headline)', isLongText: true },
      { key: 'heroSubtitle', label: 'Hero Subtitle & Description', description: 'Qoraalka sharraxaadda hoose ee hero-ga', isLongText: true },
      { key: 'heroExploreBtn', label: 'Hero CTA: Explore Button', description: 'Badhanka eegista mashaariicda' },
      { key: 'heroFinancingBtn', label: 'Hero CTA: Financing Calculator Button', description: 'Badhanka xisaabinta qorshaha 5-ta sano' },
      { key: 'heroAiAdvisorBtn', label: 'Hero CTA: Ask AI Advisor Button', description: 'Badhanka la-tashiga AI-ga' },
      { key: 'heroSearchPlaceholder', label: 'Hero Search Input Placeholder', description: 'Qoraalka baadhista guryaha' },
      { key: 'heroDistrictSelect', label: 'Search Filter: District Dropdown Label', description: 'Qoraalka xulashada xaafadaha' },
      { key: 'heroTypeSelect', label: 'Search Filter: Type Dropdown Label', description: 'Qoraalka xulashada noocyada guryaha' },
      { key: 'heroAllDistricts', label: 'Search Filter: All Districts Option', description: 'Doorashada dhammaan xaafadaha' },
      { key: 'heroAllTypes', label: 'Search Filter: All Types Option', description: 'Doorashada dhammaan noocyada' }
    ]
  },
  {
    id: 'master_projects',
    title: 'Master Projects & Community Badges',
    somaliTitle: 'Mashaariicda Waaweyn & Calaamadaha',
    icon: <Building2 className="w-4 h-4 text-emerald-600" />,
    description: 'Qoraallada dropdown-ka mashaariicda (Rugsan, Aragsan, Bilicsan, Masallaha) iyo calaamadaha iibka.',
    keys: [
      { key: 'projectsMenuTitle', label: 'Projects Dropdown Main Title', description: 'Cinwaanka menu-ga mashaariicda' },
      { key: 'projectsMenuDesc', label: 'Projects Dropdown Subtitle', description: 'Sharraxaadda mashaariicda' },
      { key: 'viewMasterCommunity', label: 'View Master Community Button', description: 'Badhanka eegista mashruuca' },
      { key: 'exploreAllProjects', label: 'Explore All Projects Button', description: 'Badhanka eeg dhammaan mashaariicda' },
      { key: 'soldOutBadge', label: 'Status Badge: Sold Out (100% Waa La Gatay)', description: 'Calaamadda marka mashruucu dhammaado' },
      { key: 'availableBadge', label: 'Status Badge: Available (Iib Diyaar ah)', description: 'Calaamadda marka guryo diyaar yihiin' },
      { key: 'installmentBadge', label: 'Status Badge: 5-Year Plan (Maalgelin 5 Sano)', description: 'Calaamadda maalgelinta 60-ka bilood' }
    ]
  },
  {
    id: 'properties_listings',
    title: 'Property Listings & Cards',
    somaliTitle: 'Liisaska Guryaha & Kaararka',
    icon: <Layers className="w-4 h-4 text-blue-600" />,
    description: 'Qoraallada filtarrada guryaha, calaamadaha qolalka, suuliyada, baaxadda, iyo badhamada.',
    keys: [
      { key: 'featuredPropertiesTitle', label: 'Properties Section Title', description: 'Cinwaanka qaybta guryaha la soo xulay' },
      { key: 'featuredPropertiesSubtitle', label: 'Properties Section Subtitle', description: 'Sharraxaadda qaybta guryaha', isLongText: true },
      { key: 'filterAll', label: 'Filter: All (Dhammaan)', description: 'Filtarka dhammaan guryaha' },
      { key: 'filterVillas', label: 'Filter: Luxury Villas', description: 'Filtarka villooyinka' },
      { key: 'filterApartments', label: 'Filter: Apartments', description: 'Filtarka dabaqyada' },
      { key: 'filterTownhouses', label: 'Filter: Townhouses', description: 'Filtarka townhouses' },
      { key: 'filterReady', label: 'Filter: Move-in Ready', description: 'Filtarka guryaha diyaarka ah' },
      { key: 'filter5YearPlan', label: 'Filter: 5-Year Financing Plan', description: 'Filtarka qorshaha maalgelinta' },
      { key: 'bedsLabel', label: 'Card Label: Bedrooms (Qolalka Jiifka)', description: 'Qoraalka tirada qolalka' },
      { key: 'bathsLabel', label: 'Card Label: Bathrooms (Suuliyada)', description: 'Qoraalka tirada suuliyada' },
      { key: 'areaLabel', label: 'Card Label: Built Area (Baaxadda Dhismaha)', description: 'Qoraalka cabbirka guriga m²' },
      { key: 'lotSizeLabel', label: 'Card Label: Plot Size (Baaxadda Dhulka)', description: 'Qoraalka cabbirka dhulka' },
      { key: 'viewDetailsBtn', label: 'Card Button: View Details', description: 'Badhanka faahfaahinta guriga' },
      { key: 'bookTourBtn', label: 'Card Button: Book Site Tour', description: 'Badhanka ballansashada kormeerka' },
      { key: 'downPaymentLabel', label: 'Card Label: Down Payment (30%)', description: 'Qoraalka lacagta horumarinta ah' },
      { key: 'monthlyInstallmentLabel', label: 'Card Label: Monthly Installment (60 Mos)', description: 'Qoraalka lacagta bisha ee 60-ka bilood' }
    ]
  },
  {
    id: 'financing_calculator',
    title: 'Islamic Financing Calculator (Dara Salaam Bank)',
    somaliTitle: 'Xisaabiyaha Maalgelinta (Dara Salaam Bank)',
    icon: <Calculator className="w-4 h-4 text-purple-600" />,
    description: 'Qoraallada xisaabiyaha rasmiga ah ee 60-ka bilood (0% Riba) iyo shuruudaha heshiiska.',
    keys: [
      { key: 'calculatorTitle', label: 'Calculator Main Title', description: 'Cinwaanka xisaabiyaha maalgelinta', isLongText: true },
      { key: 'calculatorSubtitle', label: 'Calculator Subtitle', description: 'Faahfaahinta xisaabiyaha', isLongText: true },
      { key: 'shariaBadge', label: 'Sharia Compliant 0% Riba Badge', description: 'Calaamadda 100% Islaamiga ah' },
      { key: 'calculateBtn', label: 'Calculate Financing Button', description: 'Badhanka xisaabinta qidmadda' },
      { key: 'propertyPriceLabel', label: 'Property Total Price Input Label', description: 'Qoraalka qiimaha guud ee guriga' },
      { key: 'downPayment30Label', label: '30% Down Payment Label', description: 'Qoraalka 30% horumarinta ah' },
      { key: 'monthlyAmountLabel', label: 'Monthly Payment Label (60 Months)', description: 'Qoraalka lacag bixinta bille-ha ah' },
      { key: 'zeroRibaNotice', label: 'Zero Riba & Title Deed Notice', description: 'Sharciga mulkiyadda iyo xorriyadda dulsaarka', isLongText: true }
    ]
  },
  {
    id: 'ready_mix',
    title: 'Ready-Mix Concrete Plant Section',
    somaliTitle: 'Warshadda Shamiitada Ready-Mix',
    icon: <Factory className="w-4 h-4 text-orange-600" />,
    description: 'Qoraallada warshadda casriga ah ee shamiitada ee Kaabsan Ready-Mix ee Waddada Madaarka.',
    keys: [
      { key: 'concreteBadge', label: 'Ready-Mix Eyebrow Badge', description: 'Calaamadda qaybta warshadda' },
      { key: 'concreteTitle', label: 'Ready-Mix Section Title', description: 'Cinwaanka warshadda shamiitada' },
      { key: 'concreteDesc', label: 'Ready-Mix Detailed Description', description: 'Sharraxaadda awoodda warshadda', isLongText: true },
      { key: 'concreteFeature1', label: 'Feature 1: Automated Precision Batching', description: 'Qodobka 1aad ee warshadda' },
      { key: 'concreteFeature2', label: 'Feature 2: Lab Tested Quality', description: 'Qodobka 2aad ee warshadda' },
      { key: 'concreteFeature3', label: 'Feature 3: Transit Mixer Trucks Fleet', description: 'Qodobka 3aad ee warshadda' },
      { key: 'concreteFeature4', label: 'Feature 4: 24/7 Fast Delivery', description: 'Qodobka 4aad ee warshadda' }
    ]
  },
  {
    id: 'about_company',
    title: 'About Company, Vision & Mission',
    somaliTitle: 'Ku Saabsan Shirkadda, Hiigsiga & Hadafka',
    icon: <Info className="w-4 h-4 text-cyan-600" />,
    description: 'Qoraallada rasmiga ah ee bogga About Us, taariikhda, aragtida iyo qiyamka Kaabsan.',
    keys: [
      { key: 'aboutWelcomeTitle', label: 'Welcome to Kaabsan Title', description: 'Cinwaanka soo dhoweynta' },
      { key: 'aboutVisionTitle', label: 'Vision Title (OUR VISION)', description: 'Cinwaanka hiigsiga' },
      { key: 'aboutVisionText', label: 'Vision Text', description: 'Qoraalka hiigsiga', isLongText: true },
      { key: 'aboutPurposeTitle', label: 'Purpose Title (OUR PURPOSE)', description: 'Cinwaanka ujeedada' },
      { key: 'aboutPurposeText', label: 'Purpose Text', description: 'Qoraalka ujeedada shirkadda', isLongText: true },
      { key: 'aboutMissionTitle', label: 'Mission Title (OUR MISSION)', description: 'Cinwaanka hadafka shirkadda' },
      { key: 'aboutMissionText', label: 'Mission Text', description: 'Qoraalka hadafka shirkadda', isLongText: true },
      { key: 'whoWeAreTitle', label: 'Who We Are Title', description: 'Cinwaanka Yaan Nahay' },
      { key: 'whoWeAreText', label: 'Who We Are Description', description: 'Qoraalka Yaan Nahay', isLongText: true },
      { key: 'ourDisciplinesTitle', label: 'Our Disciplines Title', description: 'Cinwaanka takhasusaadka shirkadda' },
      { key: 'inviteVisitTitle', label: 'Visit Our Sales Center Title', description: 'Cinwaanka booqashada xafiiska' },
      { key: 'inviteVisitDesc', label: 'Visit Sales Center Description', description: 'Qoraalka martiqaadka booqashada', isLongText: true }
    ]
  },
  {
    id: 'buy_sell_pages',
    title: 'Buy & Sell Portal Pages',
    somaliTitle: 'Bogagga Iibso & Iibi',
    icon: <ShoppingBag className="w-4 h-4 text-pink-600" />,
    description: 'Qoraallada bogagga gaarka ah ee iibsashada iyo diiwaangelinta guryaha iibka ah.',
    keys: [
      { key: 'buyPageTitle', label: 'Buy Page Main Title', description: 'Cinwaanka bogga iibso' },
      { key: 'buyPageDesc', label: 'Buy Page Subtitle', description: 'Sharraxaadda bogga iibso', isLongText: true },
      { key: 'sellPageTitle', label: 'Sell Page Main Title', description: 'Cinwaanka bogga iibi' },
      { key: 'sellPageDesc', label: 'Sell Page Subtitle', description: 'Sharraxaadda bogga iibi', isLongText: true },
      { key: 'valuationEstimateBtn', label: 'Free Valuation Button', description: 'Badhanka qiyaasta qiimaha bilaashka ah' },
      { key: 'submitListingBtn', label: 'Submit Listing Button', description: 'Badhanka diiwaangelinta guriga' }
    ]
  },
  {
    id: 'footer_newsletter',
    title: 'Footer, Copyright & Newsletter',
    somaliTitle: 'Qaybta Hoose (Footer) & Wargelinta',
    icon: <FolderDown className="w-4 h-4 text-slate-600" />,
    description: 'Qoraallada qaybta hoose ee website-ka, copyright-ka, iyo wargelinta emailka.',
    keys: [
      { key: 'footerAboutText', label: 'Footer About Summary Text', description: 'Qoraalka kooban ee Kaabsan & Telesom', isLongText: true },
      { key: 'footerQuickLinks', label: 'Footer Column 1: Quick Links Title', description: 'Cinwaanka links-ka degdegga ah' },
      { key: 'footerOurProjects', label: 'Footer Column 2: Our Projects Title', description: 'Cinwaanka mashaariicda' },
      { key: 'footerContactUs', label: 'Footer Column 3: Contact Us Title', description: 'Cinwaanka xidhiidhka' },
      { key: 'footerRights', label: 'Copyright & Telesom Ecosystem Notice', description: 'Qoraalka xuquuqda dhowran' },
      { key: 'footerShariaNotice', label: 'Footer Sharia 0% Riba Notice', description: 'Calaamadda maalgelinta islaamiga ah' },
      { key: 'requestCallbackBtn', label: 'Footer Request Callback Button', description: 'Badhanka codsiga wicitaanka' },
      { key: 'newsletterTitle', label: 'Newsletter Title', description: 'Cinwaanka wargelinta suuqa' },
      { key: 'newsletterPlaceholder', label: 'Newsletter Email Input Placeholder', description: 'Qoraalka geli emailka' },
      { key: 'newsletterBtn', label: 'Newsletter Subscribe Button', description: 'Badhanka is-diiwaangelinta' }
    ]
  }
];

export const SiteTextsTab: React.FC<SiteTextsTabProps> = ({
  currentTranslations,
  onSaveTranslations,
  onResetTranslations
}) => {
  const [selectedLang, setSelectedLang] = useState<Language>('so');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState<string>('all');
  const [localTranslations, setLocalTranslations] = useState<Record<Language, TranslationDictionary>>(currentTranslations);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    header_nav: true,
    hero_section: true,
    master_projects: true,
    properties_listings: true,
    financing_calculator: true,
    ready_mix: true,
    about_company: true,
    buy_sell_pages: true,
    footer_newsletter: true
  });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const handleTextChange = (key: keyof TranslationDictionary, value: string) => {
    setLocalTranslations(prev => ({
      ...prev,
      [selectedLang]: {
        ...prev[selectedLang],
        [key]: value
      }
    }));
    setSaveSuccess(false);
  };

  const handleResetField = (key: keyof TranslationDictionary) => {
    const defaultValue = DEFAULT_TRANSLATIONS[selectedLang][key];
    handleTextChange(key, defaultValue);
  };

  const handleSaveAll = () => {
    onSaveTranslations(localTranslations);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 4000);
  };

  const handleResetAll = () => {
    if (window.confirm('Ma hubtaa inaad dib ugu celiso dhammaan qoraallada asalkoodii rasmiga ahaa?')) {
      onResetTranslations();
      setLocalTranslations(DEFAULT_TRANSLATIONS);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 4000);
    }
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Filter groups and keys based on search and selected group
  const filteredGroups = TRANSLATION_GROUPS.filter(g => {
    if (selectedGroupId !== 'all' && g.id !== selectedGroupId) return false;
    return true;
  }).map(g => {
    if (!searchQuery.trim()) return g;
    const q = searchQuery.toLowerCase();
    const matchingKeys = g.keys.filter(k => {
      const currentValue = (localTranslations[selectedLang]?.[k.key] || '').toLowerCase();
      const defaultVal = (DEFAULT_TRANSLATIONS[selectedLang]?.[k.key] || '').toLowerCase();
      const label = k.label.toLowerCase();
      const keyName = String(k.key).toLowerCase();
      return currentValue.includes(q) || defaultVal.includes(q) || label.includes(q) || keyName.includes(q);
    });
    return {
      ...g,
      keys: matchingKeys
    };
  }).filter(g => g.keys.length > 0);

  const totalKeysCount = TRANSLATION_GROUPS.reduce((acc, g) => acc + g.keys.length, 0);

  return (
    <div className="space-y-6 animate-in fade-in pb-12">
      {/* Top Banner & Language Selector */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <Type className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  Tifaftiraha Dhammaan Qoraallada Website-ka
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
                    {totalKeysCount} Qodob
                  </span>
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Ka beddel xaraf kasta, cinwaan kasta, badhan kasta, iyo sharraxaad kasta oo ku yaal website-ka Kaabsan 3-da luuqadoodba (Soomaali, English, Arabic).
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleResetAll}
              type="button"
              className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
              title="Dib ugu celi asalkii rasmiga ahaa"
            >
              <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
              Dib u Celi Asalkii
            </button>

            <button
              onClick={handleSaveAll}
              type="button"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              Badbaadi Dhammaan Qoraallada
            </button>
          </div>
        </div>

        {/* Save Success Alert */}
        {saveSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Dhammaan qoraallada aad beddeshay si guul leh ayaa loo badbaadiyay, waxaana isla markiiba laga arki karaa guud ahaan website-ka!
            </div>
            <span className="text-[11px] text-emerald-600 font-mono">Live Synchronized</span>
          </div>
        )}

        {/* Language Tabs & Instant Search Bar */}
        <div className="pt-3 border-t border-gray-100 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-gray-100/80 p-1.5 rounded-xl border border-gray-200">
            <span className="text-xs font-bold text-gray-500 px-2 flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5 text-gray-600" />
              Luuqadda:
            </span>
            <button
              onClick={() => setSelectedLang('so')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedLang === 'so'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-white/80'
              }`}
            >
              🇸🇴 Soomaali
            </button>
            <button
              onClick={() => setSelectedLang('en')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedLang === 'en'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-white/80'
              }`}
            >
              🇬🇧 English
            </button>
            <button
              onClick={() => setSelectedLang('ar')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedLang === 'ar'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-white/80'
              }`}
            >
              🇸🇦 العربية
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Raadi xaraf, eray, ama meel ay ku taalo (Search any text)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 outline-none focus:bg-white focus:border-indigo-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <button
            onClick={() => setSelectedGroupId('all')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
              selectedGroupId === 'all'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Dhammaan Qaybaha ({totalKeysCount})
          </button>
          {TRANSLATION_GROUPS.map(g => (
            <button
              key={g.id}
              onClick={() => setSelectedGroupId(g.id)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                selectedGroupId === g.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {g.somaliTitle}
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedGroupId === g.id ? 'bg-indigo-700 text-white' : 'bg-gray-200 text-gray-700'}`}>
                {g.keys.length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Translation Groups List */}
      <div className="space-y-4">
        {filteredGroups.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center space-y-3">
            <Search className="w-8 h-8 text-gray-300 mx-auto" />
            <div className="text-sm font-bold text-gray-700">Lama helin qoraal ku habboon baadhitaankaaga "{searchQuery}"</div>
            <p className="text-xs text-gray-500">Isku day inaad raadiso eray kale ama dooro "Dhammaan Qaybaha".</p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-semibold hover:bg-indigo-100 transition-colors"
            >
              Nadiifi Raadinta
            </button>
          </div>
        ) : (
          filteredGroups.map(group => {
            const isExpanded = expandedGroups[group.id] ?? true;
            return (
              <div 
                key={group.id} 
                className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden transition-shadow hover:shadow-md"
              >
                {/* Group Header */}
                <button
                  onClick={() => toggleGroup(group.id)}
                  type="button"
                  className="w-full px-6 py-4 bg-gray-50/70 hover:bg-gray-50 flex items-center justify-between border-b border-gray-200 text-left transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-xl border border-gray-200 shadow-2xs">
                      {group.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                        {group.somaliTitle}
                        <span className="text-[11px] font-normal text-gray-500">({group.title})</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-200 text-gray-700">
                          {group.keys.length} items
                        </span>
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">{group.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-400">
                    <span className="text-xs text-gray-500 hidden sm:inline">
                      {isExpanded ? 'Qari' : 'Furo'}
                    </span>
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </button>

                {/* Group Items */}
                {isExpanded && (
                  <div className="p-6 space-y-5 divide-y divide-gray-100">
                    {group.keys.map(item => {
                      const currentValue = localTranslations[selectedLang]?.[item.key] ?? DEFAULT_TRANSLATIONS[selectedLang]?.[item.key] ?? '';
                      const defaultVal = DEFAULT_TRANSLATIONS[selectedLang]?.[item.key] ?? '';
                      const isModified = currentValue !== defaultVal;

                      return (
                        <div key={item.key} className="pt-4 first:pt-0 space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <div className="flex items-center gap-2">
                              <label className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                                {item.label}
                                {isModified && (
                                  <span className="w-2 h-2 rounded-full bg-amber-500" title="Waxaa lagu sameeyay wax ka beddel" />
                                )}
                              </label>
                              <button
                                onClick={() => handleCopyKey(item.key)}
                                className="text-[10px] font-mono text-gray-400 hover:text-indigo-600 flex items-center gap-0.5"
                                title="Nuuxi furaha (Key)"
                              >
                                <code>{item.key}</code>
                                {copiedKey === item.key ? (
                                  <Check className="w-3 h-3 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>

                            <div className="flex items-center gap-2">
                              {isModified && (
                                <button
                                  type="button"
                                  onClick={() => handleResetField(item.key)}
                                  className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 cursor-pointer"
                                  title="Dib ugu celi qoraalkii asalka ahaa"
                                >
                                  <RotateCcw className="w-3 h-3" />
                                  Dib u celi asalkii
                                </button>
                              )}
                              <span className="text-[10px] text-gray-400 font-mono">
                                {currentValue.length} xaraf
                              </span>
                            </div>
                          </div>

                          <p className="text-[11px] text-gray-500 leading-tight">
                            {item.description}
                          </p>

                          {item.isLongText ? (
                            <textarea
                              rows={3}
                              value={currentValue}
                              onChange={(e) => handleTextChange(item.key, e.target.value)}
                              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all font-medium leading-relaxed resize-y"
                              dir={selectedLang === 'ar' ? 'rtl' : 'ltr'}
                            />
                          ) : (
                            <input
                              type="text"
                              value={currentValue}
                              onChange={(e) => handleTextChange(item.key, e.target.value)}
                              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all font-medium"
                              dir={selectedLang === 'ar' ? 'rtl' : 'ltr'}
                            />
                          )}

                          {/* Original default preview if modified */}
                          {isModified && (
                            <div className="text-[11px] text-gray-500 bg-amber-50/60 p-2.5 rounded-lg border border-amber-200/60 flex items-start justify-between gap-2">
                              <div>
                                <span className="font-bold text-amber-800">Qoraalkii hore: </span>
                                <span className="italic">{defaultVal}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Floating Bottom Sticky Save Bar for convenience */}
      <div className="sticky bottom-4 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-gray-200 shadow-xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-gray-800">
            Luuqadda Hadda La Tifaftirayo: <span className="text-indigo-600 uppercase">{selectedLang}</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetAll}
            type="button"
            className="px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
            Dib u Celi Dhammaan
          </button>

          <button
            onClick={handleSaveAll}
            type="button"
            className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            Badbaadi Dhammaan Qoraallada
          </button>
        </div>
      </div>
    </div>
  );
};
