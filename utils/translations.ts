export type Language = 'en' | 'so' | 'ar';

export interface TranslationDictionary {
  // Top Bar & Branding
  partOfTelesom: string;
  officialDomain: string;
  shortcodeCall: string;
  whatsappCall: string;

  // Nav Items
  navHome: string;
  navProjects: string;
  navUpcoming: string;
  navEvents: string;
  navBuy: string;
  navRent: string;
  navSell: string;
  navGallery: string;
  navBlog: string;
  navAbout: string;
  navFinancing: string;
  navAiAdvisor: string;
  navScheduleTour: string;
  navPayZaad: string;
  navFavorites: string;
  navAdminPortal: string;
  priceOnRequest: string;
  contactWhatsAppForPrice: string;
  inquireOnWhatsApp: string;

  // Hero Section
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroExploreBtn: string;
  heroFinancingBtn: string;
  heroAiAdvisorBtn: string;
  heroSearchPlaceholder: string;
  heroDistrictSelect: string;
  heroTypeSelect: string;
  heroAllDistricts: string;
  heroAllTypes: string;

  // Projects Dropdown & Section
  projectsMenuTitle: string;
  projectsMenuDesc: string;
  viewMasterCommunity: string;
  exploreAllProjects: string;
  soldOutBadge: string;
  availableBadge: string;
  installmentBadge: string;

  // Stats
  statDeliveredHomes: string;
  statDeliveredHomesLabel: string;
  statMasterCommunities: string;
  statMasterCommunitiesLabel: string;
  statDiasporaFamilies: string;
  statDiasporaFamiliesLabel: string;
  statSatisfaction: string;
  statSatisfactionLabel: string;

  // Property Listings
  featuredPropertiesTitle: string;
  featuredPropertiesSubtitle: string;
  filterAll: string;
  filterVillas: string;
  filterApartments: string;
  filterTownhouses: string;
  filterReady: string;
  filter5YearPlan: string;
  bedsLabel: string;
  bathsLabel: string;
  areaLabel: string;
  lotSizeLabel: string;
  viewDetailsBtn: string;
  bookTourBtn: string;
  downPaymentLabel: string;
  monthlyInstallmentLabel: string;

  // Ready-Mix Concrete Section
  concreteBadge: string;
  concreteTitle: string;
  concreteDesc: string;
  concreteFeature1: string;
  concreteFeature2: string;
  concreteFeature3: string;
  concreteFeature4: string;

  // Financing Estimator
  calculatorTitle: string;
  calculatorSubtitle: string;
  shariaBadge: string;
  calculateBtn: string;
  propertyPriceLabel: string;
  downPayment30Label: string;
  monthlyAmountLabel: string;
  zeroRibaNotice: string;

  // Buy & Sell Page
  buyPageTitle: string;
  buyPageDesc: string;
  sellPageTitle: string;
  sellPageDesc: string;
  valuationEstimateBtn: string;
  submitListingBtn: string;

  // About Page
  aboutWelcomeTitle: string;
  aboutVisionTitle: string;
  aboutVisionText: string;
  aboutPurposeTitle: string;
  aboutPurposeText: string;
  aboutMissionTitle: string;
  aboutMissionText: string;
  whoWeAreTitle: string;
  whoWeAreText: string;
  ourDisciplinesTitle: string;
  inviteVisitTitle: string;
  inviteVisitDesc: string;

  // Footer
  footerAboutText: string;
  footerQuickLinks: string;
  footerOurProjects: string;
  footerContactUs: string;
  footerRights: string;
  footerShariaNotice: string;
  requestCallbackBtn: string;
  newsletterTitle: string;
  newsletterPlaceholder: string;
  newsletterBtn: string;

  // Common UI Actions & Labels
  selectLanguage: string;
  directPaymentTitle: string;
  directPaymentSubtitle: string;
  verifiedAccountsBadge: string;
  directPaymentDesc: string;
  projectAccountBadge: string;
  stepSelectProject: string;
  stepSelectBank: string;
  stepSubmitProof: string;
  labelFullName: string;
  placeholderFullName: string;
  labelPhone: string;
  placeholderPhone: string;
  labelAmount: string;
  labelReference: string;
  placeholderReference: string;
  labelNotes: string;
  placeholderNotes: string;
  btnSubmitting: string;
  btnSubmitPayment: string;
  projectSpecificAccount: string;
  generalCorporateAccount: string;
  mobileMerchantService: string;
  copyAccount: string;
  copied: string;
  close: string;
  back: string;
  all: string;
  loading: string;
  submit: string;
  callNow: string;
  sendWhatsApp: string;
  downloadBrochure: string;
  scheduleSiteVisit: string;
  propertyNotFound: string;
  noPropertiesMatch: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  // 1. English (Global Standard - 100% Pure English)
  en: {
    partOfTelesom: 'Part of Telesom Group',
    officialDomain: 'kaabsanrealestate.com',
    shortcodeCall: 'Call 380 (Telesom Shortcode)',
    whatsappCall: 'WhatsApp: +252 63 6100090',

    navHome: 'Home',
    navProjects: 'Projects',
    navUpcoming: 'Upcoming Projects',
    navEvents: 'Events',
    navBuy: 'Buy',
    navRent: 'Rent & Management',
    navSell: 'Sell',
    navGallery: 'Gallery',
    navBlog: 'Blog',
    navAbout: 'About Us',
    navFinancing: '60-Month Financing',
    navAiAdvisor: 'Kaabsan AI Advisor',
    navScheduleTour: 'Schedule Tour',
    navPayZaad: 'Bank Accounts & Zaad',
    navFavorites: 'Saved',
    navAdminPortal: 'Admin Portal',
    priceOnRequest: 'Price on Request',
    contactWhatsAppForPrice: 'To inquire about current pricing, please contact us on WhatsApp',
    inquireOnWhatsApp: 'Inquire on WhatsApp',

    heroBadge: 'Part of Telesom Group • Somaliland Premier Real Estate',
    heroTitle: 'Hargeisa Master Planned Communities & Modern Living',
    heroSubtitle: 'Official master developments: Rugsan Gardens, Aragsan Village, Bilicsan Village & Masallaha Apartments. Freehold registered title deeds with up to 60-month flexible Islamic financing.',
    heroExploreBtn: 'Explore Properties & Projects',
    heroFinancingBtn: 'Calculate 5-Year Plan',
    heroAiAdvisorBtn: 'Ask Kaabsan AI Advisor',
    heroSearchPlaceholder: 'Search by project name, property type, or price...',
    heroDistrictSelect: 'All Locations',
    heroTypeSelect: 'All Property Types',
    heroAllDistricts: 'All Locations (Masallaha, Buurta Kala-jeexan)',
    heroAllTypes: 'All Types (Villas, Townhouses, Apartments)',

    projectsMenuTitle: 'Master Planned Communities',
    projectsMenuDesc: 'Gated master developments engineered by Kaabsan and Telesom Group.',
    viewMasterCommunity: 'View Master Project',
    exploreAllProjects: 'View All Master Communities',
    soldOutBadge: '100% Sold Out',
    availableBadge: 'Available for Sale',
    installmentBadge: '5-Year Plan',

    statDeliveredHomes: '250+',
    statDeliveredHomesLabel: 'Delivered Luxury Homes',
    statMasterCommunities: '4',
    statMasterCommunitiesLabel: 'Master Communities',
    statDiasporaFamilies: '500+',
    statDiasporaFamiliesLabel: 'Diaspora Homeowners',
    statSatisfaction: '99.4%',
    statSatisfactionLabel: 'Client Satisfaction',

    featuredPropertiesTitle: 'Exclusive Properties for Sale',
    featuredPropertiesSubtitle: 'Explore verified residential villas, townhouses, and luxury apartments in Hargeisa with freehold title deeds.',
    filterAll: 'All Properties',
    filterVillas: 'Luxury Villas',
    filterApartments: 'Modern Apartments',
    filterTownhouses: 'Townhouses',
    filterReady: 'Ready to Move',
    filter5YearPlan: '60-Month Installment',
    bedsLabel: 'Beds',
    bathsLabel: 'Baths',
    areaLabel: 'Built Area',
    lotSizeLabel: 'Lot Size',
    viewDetailsBtn: 'View Details',
    bookTourBtn: 'Book Site Tour',
    downPaymentLabel: '30% Down Payment',
    monthlyInstallmentLabel: '60-Month Payment',

    concreteBadge: 'Industrial Civil Infrastructure',
    concreteTitle: 'Kaabsan Ready-Mix Batching Plant',
    concreteDesc: 'Our automated computer-controlled batching facility on Airport Road produces laboratory-certified, high-strength concrete for all Kaabsan master communities and Somaliland infrastructure.',
    concreteFeature1: 'Computerized Mix Precision',
    concreteFeature2: 'Certified Compressive Strength',
    concreteFeature3: 'Dedicated Transit Mixer Fleet',
    concreteFeature4: '24/7 Site Delivery Capability',

    calculatorTitle: '60-Month Islamic Financing Calculator',
    calculatorSubtitle: 'Calculate your flexible 5-year installment plan backed by Telesom Islamic Murabaha financing with zero hidden fees.',
    shariaBadge: '100% Sharia Compliant • 0% Riba',
    calculateBtn: 'Calculate Installment',
    propertyPriceLabel: 'Property Value',
    downPayment30Label: '30% Down Payment',
    monthlyAmountLabel: 'Monthly Installment (60 Mos)',
    zeroRibaNotice: 'Direct ownership upon handover with official registered freehold title deed.',

    buyPageTitle: 'Find Your Dream Home in Hargeisa',
    buyPageDesc: 'Browse verified luxury villas and gated community properties with comprehensive 60-month financing.',
    sellPageTitle: 'Sell Your Property With Kaabsan',
    sellPageDesc: 'List your property with Somaliland’s largest real estate network and connect with thousands of local & diaspora buyers.',
    valuationEstimateBtn: 'Get Free Valuation Estimate',
    submitListingBtn: 'Submit Property For Sale',

    aboutWelcomeTitle: 'Welcome to Kaabsan Real Estate',
    aboutVisionTitle: 'OUR VISION',
    aboutVisionText: 'To be the leading provider of real estate services in the markets in which we operate.',
    aboutPurposeTitle: 'OUR PURPOSE',
    aboutPurposeText: 'We are committed to creating lifestyles and improving living standards by developing and building high standard dwellings.',
    aboutMissionTitle: 'OUR MISSION',
    aboutMissionText: 'Our mission is to make our customers exceptionally happy by offering a high-level service underpinned by integrity, honesty and sound advice. We want to inspire a positive, lasting impact.',
    whoWeAreTitle: 'Who We Are',
    whoWeAreText: 'Underpinning the growth of Kaabsan Real Estate in Somaliland has been a culture of high ethical standards, community involvement and an uncompromising professional obligation to deliver exceptional service.',
    ourDisciplinesTitle: 'Our Professional Disciplines',
    inviteVisitTitle: 'Visit Our Offices in Hargeisa',
    inviteVisitDesc: 'We invite anyone to drop in, speak to our team and see what we are all about.',

    footerAboutText: 'Kaabsan Real Estate is a registered full-service developer in Somaliland and a proud subsidiary of Telesom Group, building master-planned communities across Hargeisa.',
    footerQuickLinks: 'Quick Navigation',
    footerOurProjects: 'Master Developments',
    footerContactUs: 'Contact & Sales Office',
    footerRights: 'All Rights Reserved. Part of Telesom Group.',
    footerShariaNotice: '60-Month Sharia Financing • Certified Ready-Mix Concrete',
    requestCallbackBtn: 'Request Callback',
    newsletterTitle: 'Kaabsan Market Newsletter',
    newsletterPlaceholder: 'Enter your email address...',
    newsletterBtn: 'Subscribe',

    selectLanguage: 'Select Language',
    directPaymentTitle: 'Official Bank Accounts & Payment Methods',
    directPaymentSubtitle: 'Direct deposits and instant mobile payments for Kaabsan master developments.',
    verifiedAccountsBadge: 'Verified Corporate Accounts',
    directPaymentDesc: 'Select your master project to obtain its dedicated Dara-Salaam Bank account, or use our General Corporate Accounts (Dahabshiil & Premier) and Zaad / e-Dahab mobile merchant services.',
    projectAccountBadge: 'Each project has a dedicated Dara-Salaam account',
    stepSelectProject: 'Step 1: Choose Master Project',
    stepSelectBank: 'Step 2: Select Bank or Payment Method',
    stepSubmitProof: 'Step 3: Submit Payment Proof / Receipt',
    labelFullName: 'Full Name',
    placeholderFullName: 'e.g. John Doe',
    labelPhone: 'Phone Number / WhatsApp',
    placeholderPhone: 'e.g. +252 63 4400000',
    labelAmount: 'Payment Amount ($ USD)',
    labelReference: 'Ref No / Transaction ID',
    placeholderReference: 'e.g. ZAAD-98124 or Wire Reference',
    labelNotes: 'Additional Notes / Unit Number (Optional)',
    placeholderNotes: 'Enter unit number, agreement details, or special instructions...',
    btnSubmitting: 'Submitting payment proof...',
    btnSubmitPayment: 'Confirm & Submit Payment',
    projectSpecificAccount: 'Direct Project Account (Dara-Salaam Bank)',
    generalCorporateAccount: 'General Corporate Bank Accounts (Dahabshiil & Premier Bank)',
    mobileMerchantService: 'Mobile Merchant Payment (Zaad & e-Dahab)',
    copyAccount: 'Copy Account Number',
    copied: 'Copied to Clipboard!',
    close: 'Close',
    back: 'Back',
    all: 'All',
    loading: 'Loading...',
    submit: 'Submit Request',
    callNow: 'Call Now',
    sendWhatsApp: 'Chat on WhatsApp',
    downloadBrochure: 'Download Brochure',
    scheduleSiteVisit: 'Schedule Site Visit',
    propertyNotFound: 'No properties found matching your search.',
    noPropertiesMatch: 'Try adjusting your filters or search keywords.'
  },

  // 2. Somali (Soomaali - 100% Af-Soomaali Dhamaystiran)
  so: {
    partOfTelesom: 'Xubin ka tirsan Telesom Group',
    officialDomain: 'kaabsanrealestate.com',
    shortcodeCall: 'Wac 380 (Telesom Shortcode)',
    whatsappCall: 'WhatsApp: +252 63 6100090',

    navHome: 'Bogga Hore',
    navProjects: 'Mashaariicda',
    navUpcoming: 'Mashaariicda Soo Socota',
    navEvents: 'Munaasabadaha',
    navBuy: 'Iibso',
    navRent: 'Kiro & Maareyn',
    navSell: 'Iibi Gurigaaga',
    navGallery: 'Sawirrada',
    navBlog: 'Wararka',
    navAbout: 'Nagu Saabsan',
    navFinancing: 'Maalgelinta 5-ta Sano',
    navAiAdvisor: 'Kaabsan AI Advisor',
    navScheduleTour: 'Ballanso Kormeer',
    navPayZaad: 'Akoonnada & Zaad',
    navFavorites: 'Keydsan',
    navAdminPortal: 'Galka Maamulka',
    priceOnRequest: 'Qiimaha: La xidhiidh WhatsApp',
    contactWhatsAppForPrice: 'Si aad u ogaato qiimaha dhabta ah, fadlan nagala soo xidhiidh WhatsApp',
    inquireOnWhatsApp: 'Kala Xidhiidh WhatsApp',

    heroBadge: 'Qayb ka mid ah Telesom Group • Hantida Maguurtada ah ee Somaliland',
    heroTitle: 'Mashaariicda Casriga ah & Guryaha Raaxada ee Hargeysa',
    heroSubtitle: 'Mashaariicda rasmiga ah: Rugsan Gardens, Aragsan Village, Bilicsan Village & Masallaha Apartments. Mulkiyad buuxda oo sharciyeysan iyo maalgelin Islaami ah oo ilaa 60 bilood ah.',
    heroExploreBtn: 'Eeg Guryaha & Mashaariicda',
    heroFinancingBtn: 'Xisaabi Maalgelinta 5-ta Sano',
    heroAiAdvisorBtn: 'Waydii Kaabsan AI Advisor',
    heroSearchPlaceholder: 'Raadi magaca mashruuca, nooca guriga, ama qiimaha...',
    heroDistrictSelect: 'Dhammaan Goobaha',
    heroTypeSelect: 'Noocyada Guryaha',
    heroAllDistricts: 'Dhammaan Goobaha (Masallaha, Buurta Kala-jeexan)',
    heroAllTypes: 'Dhammaan Noocyada (Villas, Townhouses, Apartments)',

    projectsMenuTitle: 'Mashaariicda Waaweyn ee Kaabsan',
    projectsMenuDesc: 'Magaalooyin casri ah oo ku dhex yaal Hargeysa oo ay dhistay Kaabsan iyo Telesom Group.',
    viewMasterCommunity: 'Eeg Mashruuca',
    exploreAllProjects: 'Eeg Dhammaan Mashaariicda',
    soldOutBadge: '100% Waa La Kala Gatay',
    availableBadge: 'Iib Diyaar ah',
    installmentBadge: 'Maalgelin 5 Sano',

    statDeliveredHomes: '250+',
    statDeliveredHomesLabel: 'Guryo La Wareejiyay',
    statMasterCommunities: '4',
    statMasterCommunitiesLabel: 'Mashaariic Waaweyn',
    statDiasporaFamilies: '500+',
    statDiasporaFamiliesLabel: 'Qoysaska Qurbajoogta',
    statSatisfaction: '99.4%',
    statSatisfactionLabel: 'Kalsoonida Macaamiisha',

    featuredPropertiesTitle: 'Guryaha & Dhulka Iibka ah',
    featuredPropertiesSubtitle: 'Ka dhex baadh guryaha raaxada leh iyo dhismayaasha Hargeysa ee leh dukumentiyada rasmiga ah ee dowladda.',
    filterAll: 'Dhammaan',
    filterVillas: 'Villas Raaxo leh',
    filterApartments: 'Apartments Casri ah',
    filterTownhouses: 'Townhouses',
    filterReady: 'Diyaar ah',
    filter5YearPlan: 'Maalgelin 60 Bilood',
    bedsLabel: 'Qolal',
    bathsLabel: 'Musqulo',
    areaLabel: 'Bedka Dhismaha',
    lotSizeLabel: 'Bedka Dhulka',
    viewDetailsBtn: 'Faahfaahin Buuxda',
    bookTourBtn: 'Ballanso Kormeer',
    downPaymentLabel: '30% Horumarin',
    monthlyInstallmentLabel: 'Bishii (60 Bilood)',

    concreteBadge: 'Warshadda Shubka Casriga ah',
    concreteTitle: 'Warshadda Shubka Diyaar-ka ah ee Kaabsan (Ready-Mix)',
    concreteDesc: 'Warshaddeena casriga ah ee Airport Road waxay soo saartaa shub tijaabadiisu sugan tahay oo loogu talagalay dhammaan mashaariicda Kaabsan iyo kaabayaasha Somaliland.',
    concreteFeature1: 'Xisaabinta Isku-dhafka Kumbuyuutarka',
    concreteFeature2: 'Xoogga Shubka oo La Hubiyay',
    concreteFeature3: 'Gaadiidka Shubka Isku-qasa oo Gaar ah',
    concreteFeature4: 'Gaarsiinta Goobta 24/7',

    calculatorTitle: 'Xisaabiyaha Maalgelinta 5-ta Sano ee Dara-Salaam Bank',
    calculatorSubtitle: 'Xisaabi maalgelintaada 60-ka bilood ah oo ay bixinayso Dara-Salaam Bank, ku saleysan heshiiska Islaamiga ah ee Murabaha oo aan lahayn dulsaar ama kharashyo qarsoon.',
    shariaBadge: '100% Sharia Compliant • 0% Riba • Dara-Salaam Bank',
    calculateBtn: 'Xisaabi Maalgelinta',
    propertyPriceLabel: 'Qiimaha Guriga',
    downPayment30Label: '30% Horumarin',
    monthlyAmountLabel: 'Bishii Maalgelintu Waa (60 Bilood)',
    zeroRibaNotice: 'La wareegid toos ah oo leh sharciga dowladda hoose iyo mulkiyadda buuxda.',

    buyPageTitle: 'Ka Hel Gurigaaga Riyada Hargeysa',
    buyPageDesc: 'Ka dhex raadso guryaha raaxada ee diyaar-ka ah iyo mashaariicda leh maalgelinta 5-ta sano ee Dara-Salaam Bank.',
    sellPageTitle: 'Ku Iibi Gurigaaga Shabakadda Kaabsan',
    sellPageDesc: 'Diiwaangeli gurigaaga ama dhulkaaga si ay u gaarto kumanaan macaamiil ah oo gudaha iyo dibadda jooga.',
    valuationEstimateBtn: 'Xisaabi Qiimaha Gurigaaga',
    submitListingBtn: 'Soo Gudbi Guriga Iibka ah',

    aboutWelcomeTitle: 'Ku Soo Dhawoow Kaabsan Real Estate',
    aboutVisionTitle: 'ARAGTIDAYADA',
    aboutVisionText: 'Inaan noqono hormuudka adeegyada hantida maguurtada ah ee suuqyada aan ka shaqeyno.',
    aboutPurposeTitle: 'UJEEDKAYAGA',
    aboutPurposeText: 'Waxaa naga go’an abuurista hab-nololeed casri ah iyo kor u qaadista tayada nolosha annagoo dhiseyna deegaanno heersare ah.',
    aboutMissionTitle: 'HADAFAYAGA',
    aboutMissionText: 'Hadafkayagu waa inaan macaamiishayada ka dhigno kuwo aad ugu qanacsan adeeg hufan oo ku saleysan daacadnimo, run iyo talo sugan.',
    whoWeAreTitle: 'Yaanu Nahay',
    whoWeAreText: 'Koboca Kaabsan Real Estate ee Somaliland waxaa aasaas u ah dhaqan anshax sare leh, ka qaybgalka bulshada iyo u heellanaanta adeeg gaar ah.',
    ourDisciplinesTitle: 'Takhasusyada Xirfadeed ee Kaabsan',
    inviteVisitTitle: 'Booqashada Xafiisyadayada Hargeysa',
    inviteVisitDesc: 'Waxaan qof kasta ku martiqaadaynaa inuu soo booqdo xafiisyadayada, la kulmo kooxdayada, oo arko shaqada aan qabanno.',

    footerAboutText: 'Kaabsan Real Estate waa shirkad si buuxda uga diiwaangashan Somaliland, qaybna ka ah Telesom Group, dhisaysana mashaariicda ugu waaweyn Hargeysa.',
    footerQuickLinks: 'Hagaha Bogga',
    footerOurProjects: 'Mashaariicda Waaweyn',
    footerContactUs: 'Xiriirka & Xafiiska Iibka',
    footerRights: 'Dhammaan Xuquuqda Way Dhawran Tahay. Qayb ka mid ah Telesom Group.',
    footerShariaNotice: 'Maalgelin 60 Bilood ah oo Islaami ah (Dara-Salaam Bank) • Warshadda Shubka ee Ready-Mix',
    requestCallbackBtn: 'Codso In Lagula Soo Xiriiro',
    newsletterTitle: 'Wargeyska Suuqa Kaabsan',
    newsletterPlaceholder: 'Geli email-kaaga halkan...',
    newsletterBtn: 'Is Diiwaangeli',

    selectLanguage: 'Dooro Luqadda',
    directPaymentTitle: 'Akoonnada Bangiyada & Lacag-Bixinta',
    directPaymentSubtitle: 'Akoonnada rasmiga ah ee shirkadda ee lacag-dhigashada tooska ah iyo Zaad / e-Dahab.',
    verifiedAccountsBadge: 'Akoonnada Rasmiga ah ee Shirkadda',
    directPaymentDesc: 'Dooro mashruuca aad guri/dhul ka iibsanayso si aad u hesho akoonkiisa gaarka ah ee Dara-Salaam Bank, ama adeegso Akoonnada Guud (Dahabshiil & Premier) iyo Zaad / E-Dahab.',
    projectAccountBadge: 'Mashruuc kasta wuxuu leeyahay account Dara-Salaam gaar ah',
    stepSelectProject: 'Tallaabada 1: Dooro Mashruuca Aad Lacagta U Dirayso',
    stepSelectBank: 'Tallaabada 2: Dooro Bangiga ama Adeegga Lacag-Bixinta',
    stepSubmitProof: 'Tallaabada 3: Xaqiiji oo Gudbi Rasiidhka Lacag-Bixinta',
    labelFullName: 'Magacaaga oo Buuxa',
    placeholderFullName: 'tusaale: Guuleed Maxamed Xasan',
    labelPhone: 'Telefoonkaaga / WhatsApp',
    placeholderPhone: 'tusaale: +252 63 4400000',
    labelAmount: 'Qadarka Lacagta ($ USD)',
    labelReference: 'Ref No / Transaction ID',
    placeholderReference: 'tusaale: ZAAD-98124 ama Lambarka Bankiga',
    labelNotes: 'Faahfaahin Dheeraad ah / Lambarka Guriga (Optional)',
    placeholderNotes: 'Qor faahfaahin ku saabsan cutubka, heshiiska, ama lambarka guriga...',
    btnSubmitting: 'Waa la gudbinayaa rasiidhka...',
    btnSubmitPayment: 'Xaqiiji oo Gudbi Lacag-Bixinta',
    projectSpecificAccount: 'Akoonka Gaarka ah ee Mashruuca (Dara-Salaam Bank)',
    generalCorporateAccount: 'Akoonnada Guud ee Shirkadda (Dahabshiil & Premier Bank)',
    mobileMerchantService: 'Adeegyada Ku-Iibso ee Moobilka (Zaad & e-Dahab)',
    copyAccount: 'Koobiyeey Akoonka',
    copied: 'Waa La Koobiyay!',
    close: 'Xidh',
    back: 'Dib u Noqo',
    all: 'Dhammaan',
    loading: 'Fadlan sug...',
    submit: 'Soo Gudbi Codsiga',
    callNow: 'Wac Hadda',
    sendWhatsApp: 'Farriin WhatsApp',
    downloadBrochure: 'Degso Buug-yaraha',
    scheduleSiteVisit: 'Ballanso Booqasho Goobta ah',
    propertyNotFound: 'Lama helin guryo ku habboon raadintaada.',
    noPropertiesMatch: 'Fadlan wax ka beddel xulashadaada ama ereyada aad raadinayso.'
  },

  // 3. Arabic (العربية - 100% لغة عربية فصحى معتمدة)
  ar: {
    partOfTelesom: 'إحدى شركات مجموعة تيليسوم',
    officialDomain: 'kaabsanrealestate.com',
    shortcodeCall: 'اتصل على 380 (الرمز المختصر)',
    whatsappCall: 'واتساب: 0090 610 63 252+',

    navHome: 'الرئيسية',
    navProjects: 'المشاريع السكنية',
    navUpcoming: 'المشاريع القادمة',
    navEvents: 'الفعاليات والمناسبات',
    navBuy: 'شراء عقار',
    navRent: 'الإيجار وإدارة العقارات',
    navSell: 'بيع عقار',
    navGallery: 'معرض الصور',
    navBlog: 'الأخبار والمقالات',
    navAbout: 'من نحن',
    navFinancing: 'التمويل الإسلامي (60 شهراً)',
    navAiAdvisor: 'المستشار الذكي كابسان',
    navScheduleTour: 'حجز جولة ميدانية',
    navPayZaad: 'الحسابات البنكية والدفع',
    navFavorites: 'المفضلة',
    navAdminPortal: 'بوابة الإدارة',
    priceOnRequest: 'السعر عند الطلب',
    contactWhatsAppForPrice: 'لمعرفة السعر وتفاصيل الأقساط، يرجى التواصل معنا عبر واتساب',
    inquireOnWhatsApp: 'استفسر عبر واتساب',

    heroBadge: 'إحدى شركات مجموعة تيليسوم • الرائدة في التطوير العقاري الفاخر في صوماليلاند',
    heroTitle: 'المجتمعات السكنية المتكاملة والمخططة في هرجيسا',
    heroSubtitle: 'المشاريع الرسمية المتاحة للشراء: روغسان جاردنز، قرية أراغسان، بليكسان إستيت وشقق مصلى الفاخرة. شراء مباشر مع صكوك ملكية حرة مسجلة ومعتمدة وأقساط ميسرة تصل إلى 60 شهراً.',
    heroExploreBtn: 'استكشف الفلل والمشاريع',
    heroFinancingBtn: 'حساب خطة التمويل 5 سنوات',
    heroAiAdvisorBtn: 'استشر الذكاء الاصطناعي كابسان',
    heroSearchPlaceholder: 'ابحث باسم المشروع، نوع العقار، أو السعر...',
    heroDistrictSelect: 'جميع المواقع',
    heroTypeSelect: 'نوع العقار',
    heroAllDistricts: 'جميع المواقع (المصلى، بورتا كلاجيكسان)',
    heroAllTypes: 'جميع الأنواع (فلل فاخرة، تاون هاوس، شقق راقية)',

    projectsMenuTitle: 'المشاريع والمجتمعات السكنية الكبرى',
    projectsMenuDesc: 'مجمعات سكنية مغلقة ومطورة بأعلى المعايير الهندسية بإشراف كابسان ومجموعة تيليسوم.',
    viewMasterCommunity: 'عرض المشروع',
    exploreAllProjects: 'استعراض كافة المجتمعات السكنية',
    soldOutBadge: 'تم البيع بالكامل 100%',
    availableBadge: 'متاح للبيع الفوري',
    installmentBadge: 'أقساط 5 سنوات',

    statDeliveredHomes: '+250',
    statDeliveredHomesLabel: 'فيلا ووحدة سكنية مسلّمة',
    statMasterCommunities: '4',
    statMasterCommunitiesLabel: 'مشاريع ومجتمعات رئيسية',
    statDiasporaFamilies: '+500',
    statDiasporaFamiliesLabel: 'عائلة من المغتربين والخليج',
    statSatisfaction: '99.4%',
    statSatisfactionLabel: 'نسبة رضا العملاء',

    featuredPropertiesTitle: 'عقارات وفلل حصرية متاحة للبيع',
    featuredPropertiesSubtitle: 'استكشف الفلل الفاخرة والشقق السكنية في هرجيسا مع صكوك ملكية حرة مسجلة ومعتمدة رسمياً.',
    filterAll: 'جميع العقارات',
    filterVillas: 'فلل فاخرة',
    filterApartments: 'شقق سكنية',
    filterTownhouses: 'تاون هاوس',
    filterReady: 'جاهز للتسليم',
    filter5YearPlan: 'أقساط 60 شهراً',
    bedsLabel: 'غرف النوم',
    bathsLabel: 'دورات المياه',
    areaLabel: 'مساحة البناء',
    lotSizeLabel: 'مساحة الأرض',
    viewDetailsBtn: 'تفاصيل العقار',
    bookTourBtn: 'حجز زيارة ميدانية',
    downPaymentLabel: 'دفعة أولى 30%',
    monthlyInstallmentLabel: 'القسط الشهري (60 شهراً)',

    concreteBadge: 'البنية التحتية والهندسة المدنية',
    concreteTitle: 'مصنع كابسان للخرسانة الجاهزة (Ready-Mix)',
    concreteDesc: 'مصنعنا الآلي المتطور والمتحكم به إلكترونياً على طريق المطار ينتج خرسانة عالية المقاومة ومطابقة لأعلى المواصفات المخبرية لجميع مجمعات كابسان ومشاريع البنية التحتية في صوماليلاند.',
    concreteFeature1: 'دقة الخلط عبر أنظمة الحوسبة الآلية',
    concreteFeature2: 'فحوصات معملية لقوة التحمل وضغط الخرسانة',
    concreteFeature3: 'أسطول شاحنات خلط ونقل حديث ومجهز',
    concreteFeature4: 'جاهزية توريد للمواقع على مدار 24/7',

    calculatorTitle: 'حاسبة التمويل الإسلامي بالمرابحة (60 شهراً)',
    calculatorSubtitle: 'احسب أقساطك الميسرة على مدى 5 سنوات المتوافقة تماماً مع أحكام الشريعة الإسلامية بالتعاون مع بنك دار السلام.',
    shariaBadge: 'متوافق 100% مع الشريعة الإسلامية • بدون فوائد ربوية • بنك دار السلام',
    calculateBtn: 'حساب القسط الشهري',
    propertyPriceLabel: 'قيمة العقار الإجمالية',
    downPayment30Label: 'الدفعة الأولى المطلوبة (30%)',
    monthlyAmountLabel: 'القسط الشهري التقريبي (لمدة 60 شهراً)',
    zeroRibaNotice: 'تسليم فوري للعقار مع إصدار صك الملكية الحر والمعتمد من البلدية والمحكمة.',

    buyPageTitle: 'امتلك منزل أحلامك في هرجيسا',
    buyPageDesc: 'تصفح الفلل الفاخرة والمجتمعات السكنية المغلقة مع خيارات التقسيط الميسرة حتى 5 سنوات.',
    sellPageTitle: 'اعرض عقارك للبيع عبر شبكة كابسان',
    sellPageDesc: 'سوّق عقارك عبر كبرى منصات التسويق العقاري وتواصل مع آلاف المشترين محلياً ومن المغتربين في دول الخليج والعالم.',
    valuationEstimateBtn: 'طلب تقييم مجاني للعقار',
    submitListingBtn: 'إرسال بيانات العقار للبيع',

    aboutWelcomeTitle: 'مرحباً بكم في شركة كابسان العقارية',
    aboutVisionTitle: 'رؤيتنا',
    aboutVisionText: 'أن نكون المزود الرائد والأول للخدمات والحلول العقارية المتميزة في الأسواق التي نعمل بها.',
    aboutPurposeTitle: 'هدفنا ورسالتنا',
    aboutPurposeText: 'نحن ملتزمون بالارتقاء بأنماط الحياة ورفع معايير المعيشة من خلال تطوير وبناء مجمعات سكنية رفيعة المستوى.',
    aboutMissionTitle: 'مهمتنا',
    aboutMissionText: 'مهمتنا هي إسعاد عملائنا بتقديم خدمات فائقة الجودة قائمة على النزاهة، والصدق، والاستشارات العقارية السديدة، وصنع أثر إيجابي دائم.',
    whoWeAreTitle: 'من نحن',
    whoWeAreText: 'يرتكز نمو شركة كابسان العقارية في صوماليلاند على ثقافة الالتزام بالمعايير الأخلاقية السامية، وخدمة المجتمع، والاحترافية العالية لتقديم خدمة استثنائية.',
    ourDisciplinesTitle: 'تخصصاتنا وخدماتنا المهنية المتكاملة',
    inviteVisitTitle: 'تفضل بزيارة مكاتبنا في هرجيسا',
    inviteVisitDesc: 'يسرنا ويسعدنا دائماً استقبالكم في مكاتبنا الرئيسية للتحدث مع فريقنا الاستشاري واستعراض أحدث الفرص الاستثمارية.',

    footerAboutText: 'شركة كابسان العقارية هي شركة تطوير ووساطة عقارية معتمدة ورسمية في صوماليلاند، وإحدى شركات مجموعة تيليسوم الرائدة.',
    footerQuickLinks: 'روابط الوصول السريع',
    footerOurProjects: 'مشاريعنا الرئيسية',
    footerContactUs: 'التواصل ومكتب المبيعات',
    footerRights: 'جميع الحقوق محفوظة. إحدى شركات مجموعة تيليسوم.',
    footerShariaNotice: 'تمويل إسلامي لمدة 60 شهراً (بنك دار السلام) • مصنع خرسانة جاهزة معتمد',
    requestCallbackBtn: 'طلب اتصال من الاستشاري',
    newsletterTitle: 'النشرة العقارية لكابسان',
    newsletterPlaceholder: 'أدخل بريدك الإلكتروني...',
    newsletterBtn: 'اشتراك',

    selectLanguage: 'اختر اللغة',
    directPaymentTitle: 'الحسابات البنكية الرسمية وطرق الدفع',
    directPaymentSubtitle: 'التحويلات البنكية المباشرة والدفع الإلكتروني عبر الهاتف لمشاريع كابسان العقارية.',
    verifiedAccountsBadge: 'حسابات بنكية رسمية ومعتمدة',
    directPaymentDesc: 'اختر المشروع السكني المراد الشراء منه للحصول على الحساب البنكي المباشر في بنك دار السلام، أو استخدم الحسابات البنكية العامة للشركة (دهب شيل وبريمير) أو خدمات زااد وإي-دهب.',
    projectAccountBadge: 'لكل مشروع حساب بنكي مخصص ومباشر في بنك دار السلام',
    stepSelectProject: 'الخطوة الأولى: اختر المشروع السكني',
    stepSelectBank: 'الخطوة الثانية: اختر البنك أو طريقة الدفع',
    stepSubmitProof: 'الخطوة الثالثة: تأكيد وإرسال إيصال السداد',
    labelFullName: 'الاسم الكامل',
    placeholderFullName: 'مثال: محمد عبد الله حسن',
    labelPhone: 'رقم الهاتف / واتساب',
    placeholderPhone: 'مثال: 000000 63 252+',
    labelAmount: 'المبلغ المدفوع ($ دولار أمريكي)',
    labelReference: 'رقم الحوالة / معرف العملية (Ref ID)',
    placeholderReference: 'مثال: رقم مرجع ZAAD أو رقم الحوالة البنكية',
    labelNotes: 'ملاحظات إضافية / رقم الوحدة السكنية (اختياري)',
    placeholderNotes: 'أدخل تفاصيل الوحدة السكنية، رقم العقد، أو أي تعليمات خاصة...',
    btnSubmitting: 'جاري إرسال إيصال السداد...',
    btnSubmitPayment: 'تأكيد وإرسال تفاصيل السداد',
    projectSpecificAccount: 'الحساب المباشر الخاص بالمشروع (بنك دار السلام)',
    generalCorporateAccount: 'الحسابات البنكية العامة للشركة (بنك دهب شيل وبنك بريمير)',
    mobileMerchantService: 'خدمات الدفع الفوري عبر الهاتف (زااد وإي-دهب)',
    copyAccount: 'نسخ رقم الحساب',
    copied: 'تم النسخ بنجاح!',
    close: 'إغلاق',
    back: 'رجوع',
    all: 'الكل',
    loading: 'جاري التحميل...',
    submit: 'إرسال الطلب',
    callNow: 'اتصل الآن',
    sendWhatsApp: 'محادثة عبر واتساب',
    downloadBrochure: 'تحميل كتيب المشروع',
    scheduleSiteVisit: 'حجز زيارة ميدانية',
    propertyNotFound: 'لم يتم العثور على عقارات مطابقة لخيارات البحث.',
    noPropertiesMatch: 'يرجى تعديل خيارات التصفية أو كلمات البحث.'
  }
};

const STORAGE_KEY = 'kaabsan_custom_translations_v2';

/**
 * Loads custom translations merged over default translations
 */
export function loadMergedTranslations(): Record<Language, TranslationDictionary> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return translations;
    const parsed = JSON.parse(stored);
    return {
      en: { ...translations.en, ...(parsed.en || {}) },
      so: { ...translations.so, ...(parsed.so || {}) },
      ar: { ...translations.ar, ...(parsed.ar || {}) }
    };
  } catch {
    return translations;
  }
}

/**
 * Saves updated custom translations to localStorage and dispatches a live event
 */
export function saveCustomTranslations(updated: Record<Language, TranslationDictionary>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('kaabsan_translations_updated'));
  } catch (err) {
    console.error('Failed to save custom translations:', err);
  }
}

/**
 * Resets translations back to system defaults
 */
export function resetTranslationsToDefault(): Record<Language, TranslationDictionary> {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event('kaabsan_translations_updated'));
  } catch (err) {
    console.error('Failed to reset translations:', err);
  }
  return translations;
}

