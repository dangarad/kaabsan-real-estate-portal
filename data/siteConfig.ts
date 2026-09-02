import { SiteConfig } from '../types';

export const INITIAL_SITE_CONFIG: SiteConfig = {
  domainName: 'www.kaabsanrealestate.com',
  announcementBar: 'Official Portal of Kaabsan Real Estate (www.kaabsanrealestate.com) • Part of Telesom Group',
  hero: {
    badge: 'Part of Telesom Group • Somaliland Premier Real Estate',
    title: 'Hargeisa Master Planned Communities & Modern Living',
    subtitle: 'Mashaariicda aad iibsan karto: Rugsan Gardens, Aragsan Village, Bilicsan Village & Masallaha Apartment. Iib toos ah oo leh shahaadada lahaanshaha rasmiga ah (Freehold Title Deeds).',
    ctaExploreText: 'Eeg Guryaha & Mashaariicda',
    ctaValuationText: 'Xisaabi Maalgelinta 5-ta Sano',
    ctaAdvisorText: 'Waydii AI Property Advisor',
    heroImages: [
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=75',
        title: 'Rugsan Gardens Master Community',
        location: 'Masallaha - Madaarka Agtiisa, Hargeisa'
      },
      {
        url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=75',
        title: 'Aragsan Village Modern Villas',
        location: 'Jigjiga Yar - Buurta Kala-jeexan, Hargeisa'
      },
      {
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=75',
        title: 'Masallaha Luxury Apartments & Penthouses',
        location: 'Airport Road Corridor, Hargeisa'
      }
    ]
  },
  company: {
    name: 'Kaabsan Real Estate',
    parentGroup: 'Telesom Group',
    phone: '+252 63 6100090',
    salesPhone: '+252 63 4420000',
    whatsapp: '+252636100090',
    email: 'info@kaabsan.com',
    address: 'Telesom Headquarters & Kaabsan Sales Pavilion, Masallaha, Hargeisa, Somaliland',
    officeHours: 'Sabti - Khamiis: 8:00 AM - 6:00 PM (Jimce: Xidhan)',
    zaadMerchant: '444457',
    edahabMerchant: '735777',
    projectAccounts: {
      masalaha: '64713269',
      aragsan: '61043988',
      rugsan: '61131900',
      bilicsan: '61043977'
    },
    banks: {
      darasalaam: 'Dara-Salaam Bank: Masallaha (64713269) | Aragsan (61043988) | Rugsan (61131900) | Bilicsan (61043977)',
      premier: '100603115002',
      dahabshiil: '208016005002'
    }
  },
  whatsappTemplates: {
    hotlineNumber: '+252636100090',
    defaultInquiry: 'Asc Kaabsan Real Estate, waxaan rabaa macluumaad ku saabsan guryaha iyo mashaariicda Hargeysa.',
    propertyInquiry: 'Asc Kaabsan, waxaan doonayaa faahfaahinta {property_title} ee ku yaal {location}. Qiimaha: {price}. Fadlan ii soo dira macluumaadka buuxa.',
    cashPurchase: 'Asc Kaabsan, waxaan rabaa inaan guri ku iibsado Cash / Direct Kaabsan (0% Bank Markup) oo ah {property_title} qiimihiisuna yahay {price}. Sideen u bilaabi karaa?',
    bankRoutePurchase: 'Asc Kaabsan, waxaan doonayaa inaan ku iibsado Bank Route (+15% Bank Facility) guriga {property_title}. Qiimaha Asalka: {base_price}, Qiimaha Bangiga (+15%): {bank_price}. Fadlan faahfaahin iga siiya sida bangiyada (Dahabshiil / Premier / Dara-Salaam) aan u mariyo.',
    siteTourBooking: 'Asc Kaabsan, waxaan rabaa inaan ballansado booqasho goobta ah (Site Tour) oo ku saabsan {property_title}. Magacaygu waa {customer_name}, Taariikhda aan doonayo: {tour_date}.',
    propertyValuation: 'Asc Kaabsan, waxaan doonayaa inaan iibiyo ama qiimeeyo guri/dhul ku yaal Hargeysa ({neighborhood}). Fadlan ila soo xidhiidha.',
    quickMessages: [
      'Asc Kaabsan, waxaan doonayaa faahfaahinta Rugsan Gardens iyo Aragsan Village.',
      'Asc, waxaan rabaa macluumaadka iibsashada Cash iyo Bank Route (+15%).',
      'Asc, waxaan rabaa macluumaadka qorshaha bixinta 60-ka bilood (0% Riba).',
      'Asc, waxaan rabaa inaan ballansado booqashada goobta (Site Tour) Hargeysa.',
      'I would like to speak with a Kaabsan corporate sales representative.'
    ]
  },
  bankFinancing: {
    enabled: true,
    markupPercent: 15,
    description: 'Iibsashada Bank Route waxaa lagu kordhinayaa 15% oo ah faa\'iidada/dulsaarka adeegga bangiga. Waxaad ku iibsan kartaa bangiyada wada-shaqeynta leh sida Dahabshiil Bank, Premier Bank, Dara-Salaam Bank, iyo IBS Bank.',
    partnerBanks: [
      'Dahabshiil Islamic Bank',
      'Premier Bank',
      'Dara-Salaam Bank',
      'IBS Bank'
    ]
  },
  about: {
    badge: 'About Kaabsan Real Estate • Telesom Group Affiliate',
    title: 'Shaping Somaliland’s Urban Landscape & Communities',
    subtitle: 'Somaliland’s premier master developer of gated communities, luxury high-rises, and industrial concrete infrastructure.',
    description: 'As a proud member of the Telesom Group ecosystem, Kaabsan Real Estate is dedicated to creating sustainable, master-planned residential communities, state-of-the-art commercial complexes, and world-class civil infrastructure across Somaliland.',
    vision: 'To be the most trusted, innovative, and sustainable master community developer in the Horn of Africa.',
    mission: 'To deliver superior quality housing with transparent Islamic financing, guaranteed freehold title deeds, and enduring engineering standards.',
    concretePlantTitle: 'Kaabsan Modern Ready-Mix & Batching Plant',
    concretePlantDesc: 'Kaabsan operates the nation’s foremost automated batching facility on Airport Road, guaranteeing laboratory-tested, high-grade concrete for all our developments and major infrastructure projects in Somaliland.'
  },
  financing: {
    years: 5,
    months: 60,
    downPaymentPercent: 30,
    ribaTerms: '0% Riba (Dara Salaam Bank Islamic Financing Murabaha)',
    description: 'Maalgelin toos ah oo 5 Sano ah (60 Bilood) oo ay bixinayso Dara Salaam Bank. Bixi 30% Down Payment horeysiin ah, inta soo hadhayna ku bixi maalgelin bille ah oo aan wax dulsaar/riba ah lahayn.'
  },
  stats: {
    deliveredHomes: '250+',
    masterCommunities: '4',
    diasporaFamilies: '500+',
    customerSatisfaction: '99.4%'
  },
  socialLinks: {
    facebook: 'https://www.facebook.com/kaabsanrealestate/',
    instagram: 'https://www.instagram.com/kaabsanrealestate/',
    tiktok: 'https://www.tiktok.com/@kaabsanrealestate',
    youtube: 'https://www.youtube.com/@kaabsanrealestate'
  },
  faqs: [
    {
      id: 'faq-1',
      question: 'How does the 5-Year (60-Month) Dara Salaam Bank financing work?',
      answer: 'You pay an initial 30% down payment upon signing the agreement. The remaining 70% is financed with 0% Riba Murabaha through Dara Salaam Bank, payable in 60 equal monthly installments.',
      category: 'Financing',
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
    {
      id: 'faq-2',
      question: 'What are the main master-planned communities currently active or ready?',
      answer: 'Our flagship developments include Rugsan Gardens located in Masallaha ($225,000), Aragsan Village in Buurta Kala-jeexan ($292,000), and Masallaha Luxury Heights Apartments.',
      category: 'Projects',
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
    {
      id: 'faq-3',
      question: 'Are all property titles, land deeds, and registrations legally guaranteed?',
      answer: 'Yes, 100% of Kaabsan properties have official Hargeisa Municipality approvals, Regional Court registration records, and Full Freehold Title Deeds issued in the buyer\'s legal name.',
      category: 'Legal',
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
    {
      id: 'faq-4',
      question: 'How can Diaspora and overseas buyers inspect, purchase, and finalize properties?',
      answer: 'Diaspora clients can tour properties via guided 3D virtual walkthroughs and live high-definition WhatsApp video inspections with dedicated consultants. Payments and title deeds can be managed securely from anywhere in the world.',
      category: 'Diaspora',
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
  ]
};
