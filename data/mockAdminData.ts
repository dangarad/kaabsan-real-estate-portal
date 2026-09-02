import { DocumentResource, PaymentSubmission, LeadInquiry, TestimonialItem } from '../types';

export const INITIAL_DOCUMENTS: DocumentResource[] = [
  {
    id: 'doc-aragsan-brochure',
    title: 'Aragsan Village - Master Architecture & Villa Booklet',
    projectName: 'Aragsan Village',
    type: 'Brochure',
    fileUrl: '#',
    fileSize: '18.4 MB (PDF)',
    updatedAt: '2026-08-18',
    description: 'Official 23-page architectural booklet for Aragsan Village. 66 luxury houses, G+1 villas (Gross: 361.99 m², Plot: 483 m²), preschool, gym, mosque, sports courts, and full metric room breakdowns.',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    brochureKey: 'aragsan',
    pageCount: 23,
    featured: true
  },
  {
    id: 'doc-masalaha-brochure',
    title: 'Masallaha Luxury Apartments - Official Master Brochure',
    projectName: 'Masallaha Apartments',
    type: 'Brochure',
    fileUrl: '#',
    fileSize: '15.8 MB (PDF)',
    updatedAt: '2026-08-18',
    description: 'Official architectural catalog for Masallaha Dual G+6 Towers (Block A & B). Financed by Dara Salaam Bank, 78-car parking bays, modern elevators, backup generator, STP sewage treatment, and luxury penthouses.',
    coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85',
    brochureKey: 'masalaha',
    pageCount: 20,
    featured: true
  },
  {
    id: 'doc-masalaha-floorplans',
    title: 'Masallaha Luxury Apartments - Floor Plans & Typologies (107m² - 272m²)',
    projectName: 'Masallaha Apartments',
    type: 'Floor Plan',
    fileUrl: '#',
    fileSize: '9.4 MB (PDF)',
    updatedAt: '2026-08-18',
    description: 'Detailed architectural drawings for 2-Bed (107-125 m²), 3-Bed (158 m²), 4-Bed (223 m²), and 6th-floor 5-Bed Penthouse (272 m² with wrap-around terrace).',
    coverImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=85',
    brochureKey: 'masalaha',
    pageCount: 8,
    featured: true
  },
  {
    id: 'doc-bilicsan-brochure',
    title: 'Bilicsan Village - Modern Luxury Residences Catalog',
    projectName: 'Bilicsan Village',
    type: 'Brochure',
    fileUrl: '#',
    fileSize: '12.6 MB (PDF)',
    updatedAt: '2026-08-18',
    description: 'Typology A 7-bedroom compound villas in Masalaha / Jigjiga Yar corridor (Plot: 450 m², Built: 380 m²), double kitchens, staff quarters, security room, private gardens, and 2+ parking bays.',
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
    brochureKey: 'bilicsan',
    pageCount: 11,
    featured: true
  },
  {
    id: 'doc-rugsan-brochure',
    title: 'Rugsan Gardens - Master Community Official Brochure',
    projectName: 'Rugsan Gardens',
    type: 'Brochure',
    fileUrl: '#',
    fileSize: '14.2 MB (PDF)',
    updatedAt: '2026-08-18',
    description: 'Official brochure for 70 contemporary modern townhouses + DSQ (Plot: 400 m², Built: 321 m²), kindergarten, jogging track, private gym, shops, borehole water, and 24/7 security gatehouse.',
    coverImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=85',
    brochureKey: 'rugsan',
    pageCount: 11,
    featured: true
  },
  {
    id: 'doc-aragsan-siteplan',
    title: 'Aragsan Village - Master Community Site Cadastral Plan',
    projectName: 'Aragsan Village',
    type: 'Site Plan',
    fileUrl: '#',
    fileSize: '7.1 MB (PDF)',
    updatedAt: '2026-08-15',
    description: 'Full master site layout with designated plot boundaries (473 m² - 562 m²), community preschool, sports courts, internal road networks, and perimeter security perimeters.',
    coverImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
    brochureKey: 'aragsan',
    pageCount: 4
  },
  {
    id: 'doc-masalaha-siteplan',
    title: 'Masallaha Apartments - Master Site & 78-Bay Parking Plan',
    projectName: 'Masallaha Apartments',
    type: 'Site Plan',
    fileUrl: '#',
    fileSize: '6.5 MB (PDF)',
    updatedAt: '2026-08-15',
    description: 'Site plan featuring Dual Towers (Block A & B), 78-car parking bays, tennis/recreation court, landscaped garden buffer, and security cabin.',
    coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85',
    brochureKey: 'masalaha',
    pageCount: 3
  },
  {
    id: 'doc-financing-guide',
    title: 'Kaabsan 5-Year (60-Month) Islamic Installment Guide',
    projectName: 'All Projects',
    type: 'Financing Guide',
    fileUrl: '#',
    fileSize: '3.5 MB (PDF)',
    updatedAt: '2026-08-18',
    description: 'Complete breakdown of the 60-month direct financing program with Dara Salaam Bank. 30% Down payment, 0% Riba, transparent monthly schedules, and diaspora payment terms.',
    coverImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=85',
    pageCount: 6
  }
];

export const INITIAL_PAYMENT_SUBMISSIONS: PaymentSubmission[] = [
  {
    id: 'PAY-1082',
    customerName: 'Guled Mohamed Farah',
    customerPhone: '+252 63 4421190',
    customerEmail: 'guled.farah@example.com',
    propertyTitle: 'Rugsan Gardens Executive Townhouse (Unit 14)',
    paymentMethod: 'zaad',
    amount: 5000,
    transactionRef: 'ZAAD-982310',
    notes: 'Initial booking deposit via Merchant Zaad (Ku-Iibso).',
    date: '2026-08-16 11:20 AM',
    status: 'Verified'
  },
  {
    id: 'PAY-1083',
    customerName: 'Amina Abdi Warsame (UK Diaspora)',
    customerPhone: '+44 7911 123456',
    customerEmail: 'amina.w@example.co.uk',
    propertyTitle: 'Aragsan Village Master Family Villa (Plot 09)',
    paymentMethod: 'darasalaam',
    amount: 15000,
    transactionRef: 'DSB-TXN-882194',
    notes: 'Wire transfer to Kaabsan Real Estate USD Account.',
    date: '2026-08-15 04:45 PM',
    status: 'Verified'
  },
  {
    id: 'PAY-1084',
    customerName: 'Abdirashid Ali Hassan',
    customerPhone: '+252 63 4108872',
    customerEmail: 'rashid.hassan@gmail.com',
    propertyTitle: 'Masalaha Luxury Apartments (3-Bed Penthouse 4B)',
    paymentMethod: 'premier',
    amount: 8000,
    transactionRef: 'PB-TRANSFER-554109',
    notes: 'Premier Bank account to account instant transfer.',
    date: '2026-08-17 08:15 AM',
    status: 'Pending Verification'
  }
];

export const INITIAL_LEADS: LeadInquiry[] = [
  {
    id: 'LEAD-901',
    name: 'Khadar Ahmed Jama',
    phone: '+252 63 4402911',
    email: 'khadar.jama@telesom.com',
    type: 'Tour Request',
    propertyName: 'Rugsan Gardens Executive Townhouse',
    preferredDate: '2026-08-19 (Morning 10:00 AM)',
    message: 'Waxaan rabaa inaan soo eego guriga 6-qol ah ee Rugsan Gardens.',
    timestamp: '2026-08-17 09:30 AM',
    status: 'New'
  },
  {
    id: 'LEAD-902',
    name: 'Fadumo Hassan Nur (Sweden)',
    phone: '+46 70 123 4567',
    email: 'fadumo.nur@hotmail.com',
    type: 'Property Inquiry',
    propertyName: 'Aragsan Village Master Family Villa',
    message: 'Waxaan doonayaa faahfaahinta qorshaha 60-ka bilood ee Aragsan Village.',
    timestamp: '2026-08-16 06:12 PM',
    status: 'Contacted'
  }
];

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    clientName: 'Dr. Jamaal Cumar (UK Diaspora)',
    clientLocation: 'London, United Kingdom',
    propertyPurchased: 'Rugsan Gardens Townhouse',
    quote: 'Waxaan Hargeysa ka iibsaday guri ku yaalla Rugsan Gardens anigoo London jooga. Adeegga, dhismaha shubka adag iyo nidaamka 60-ka bilood ee Telesom Group waxa ay ahaayeen kuwo si hufan oo la aamini karo u fulay.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    year: '2024'
  },
  {
    id: 'test-2',
    clientName: 'Safiyo Maxamuud Cali',
    clientLocation: 'Minneapolis, Minnesota, USA',
    propertyPurchased: 'Aragsan Village Mountain Villa',
    quote: 'Aragsan Village jawiga buurta Kala-jeexan iyo dugsiga carruurta ayaa noo soo jiitay qoys ahaan. 30% Down payment ayaan bixinay, inta kalena bil kasta ayaan bixinaa iyadoo aan wax ribo ah lahayn.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    year: '2024'
  },
  {
    id: 'test-3',
    clientName: 'Eng. Cabdiraxmaan Xasan',
    clientLocation: 'Hargeisa, Somaliland',
    propertyPurchased: 'Masallaha Luxury Apartments',
    quote: 'Dabaqyada Masallaha tayada 81 baabuur baakinkooda, wiishashka casriga ah iyo laydhka 24/7 ka ah waxay u dhigmaan dhismayaasha ugu tayada sarreeya ee Dubai ama Nairobi.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    year: '2025'
  }
];

