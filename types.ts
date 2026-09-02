export type PropertyStatus = 'For Sale' | 'Gated Community' | 'Luxury Apartments' | 'Under Development' | 'Commercial' | 'Sold Out' | 'Mashruuc Cusub' | 'Kuwo Socda' | 'Diyaar ah' | 'For Rent' | string;

export interface RentalUnit {
  id: string;
  title: string;
  communityId: 'rugsan-gardens' | 'aragsan-village' | 'bilicsan-village' | 'masalaha-apartments' | string;
  communityName: string;
  neighborhood: string;
  location: string;
  unitType: 'Executive Villa' | 'Townhouse + DSQ' | 'Penthouse' | 'Luxury Apartment' | 'G+1 Standalone';
  bedrooms: number;
  bathrooms: number;
  areaSqm: number;
  monthlyRentUSD: number;
  securityDepositUSD: number;
  furnishingStatus: 'Fully Furnished' | 'Semi-Furnished' | 'Unfurnished';
  availabilityStatus: 'Available Now' | 'Available Next Month' | 'Reserved';
  heroImage: string;
  galleryImages: string[];
  features: string[];
  utilitiesIncluded: string[];
  description: string;
  leaseTerms: string;
  minLeaseMonths: number;
  highlightBadge?: string;
}

export interface PropertyManagementLead {
  id: string;
  ownerName: string;
  phone: string;
  email?: string;
  propertyType: string;
  location: string;
  unitCount: number;
  requestedServices: string[];
  notes?: string;
  timestamp: string;
}

export interface Property {
  id: string;
  title: string;
  subtitle: string;
  address: string;
  city: string;
  neighborhood: string;
  state: string;
  zip: string;
  price?: number;
  priceDisplay?: string;
  priceRange?: string;
  actualSqm?: number | string;
  builtArea?: number | string;
  villaType?: string;
  floorPlans?: Array<{ name: string; area: string; details?: string }>;
  inventoryUnits?: Array<{
    sn: number;
    villaNo: string;
    villaType: string;
    actualSqm: number;
    builtArea: number;
    price: number;
    priceDisplay: string;
    status?: string;
  }>;
  status: PropertyStatus;
  beds: number;
  baths: number;
  sqft: number;
  lotSize: string;
  yearBuilt: number;
  architecturalStyle: string;
  heroImage: string;
  galleryImages: string[];
  description: string;
  keyFeatures: string[];
  amenities: string[];
  videoUrl?: string;
  isFeatured?: boolean;
  isMasterProject?: boolean;
  paymentPlan?: string;
  gpsDms?: string;
  gpsCoordinates?: { lat: number; lng: number };
  googleMapsUrl?: string;
  directionsUrl?: string;
  agent: {
    name: string;
    title: string;
    phone: string;
    email: string;
    photo: string;
  };
}

export interface Neighborhood {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  avgPrice: string;
  pricePerSqft: string;
  image: string;
  vibe: string[];
  highlights: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  accolades: string[];
  languages: string[];
  email: string;
  phone: string;
}

export interface PressArticle {
  id: string;
  title: string;
  publication: string;
  date: string;
  category: string;
  snippet: string;
  link: string;
  image: string;
}

export interface NotableSale {
  id: string;
  title: string;
  neighborhood: string;
  salePrice: string;
  year: string;
  description: string;
  image: string;
  notableFact: string;
}

export interface MasterCommunity {
  id: string;
  name: string;
  location: string;
  units: string;
  status: string;
  description: string;
  image: string;
  galleryImages?: string[];
  price?: number;
  priceDisplay?: string;
  priceRange?: string;
  actualSqm?: number | string;
  builtArea?: number | string;
  floorPlans?: Array<{ name: string; area: string; details?: string }>;
  features: string[];
  gpsDms?: string;
  gpsCoordinates?: { lat: number; lng: number };
  googleMapsUrl?: string;
  directionsUrl?: string;
  paymentPlan?: string;
}

export type PaymentMethod = 'zaad' | 'edahab' | 'darasalaam' | 'premier' | 'dahabshiil';

export interface PaymentSubmission {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  propertyTitle: string;
  paymentMethod: PaymentMethod;
  amount: number;
  transactionRef: string;
  notes?: string;
  receiptImage?: string;
  date: string;
  status: 'Pending Verification' | 'Verified' | 'Rejected';
}

export interface DocumentResource {
  id: string;
  title: string;
  projectName: string;
  type: 'Brochure' | 'Site Plan' | 'Floor Plan' | 'Financing Guide';
  fileUrl: string;
  fileSize: string;
  updatedAt: string;
  description: string;
  coverImage?: string;
  brochureKey?: 'aragsan' | 'bilicsan' | 'masalaha' | 'rugsan' | 'financing';
  pageCount?: number;
  featured?: boolean;
}

export interface LeadInquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  type?: 'Tour Request' | 'Property Inquiry' | 'General Contact' | 'AI Consultation' | 'tour' | 'inquiry' | 'contact' | 'purchase' | string;
  propertyName?: string;
  preferredDate?: string;
  message: string;
  timestamp: string;
  status: 'New' | 'New Inquiry' | 'Contacted' | 'Tour Scheduled' | 'Closed Deal' | 'Closed' | 'Cancelled';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  question_en?: string;
  question_so?: string;
  question_ar?: string;
  answer_en?: string;
  answer_so?: string;
  answer_ar?: string;
  category_en?: string;
  category_so?: string;
  category_ar?: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  clientLocation: string;
  propertyPurchased: string;
  quote: string;
  rating: number;
  avatar?: string;
  year?: string;
}

export type Language = 'en' | 'so' | 'ar';

export interface WhatsAppTemplates {
  hotlineNumber: string;
  defaultInquiry: string;
  propertyInquiry: string;
  cashPurchase: string;
  bankRoutePurchase: string;
  siteTourBooking: string;
  propertyValuation: string;
  quickMessages: string[];
}

export interface BankFinancingConfig {
  enabled: boolean;
  markupPercent: number; // default 15
  description: string;
  partnerBanks: string[];
}

export interface AboutConfig {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  vision: string;
  mission: string;
  concretePlantTitle: string;
  concretePlantDesc: string;
}

export interface SiteConfig {
  domainName?: string;
  announcementBar?: string;
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaExploreText: string;
    ctaValuationText: string;
    ctaAdvisorText: string;
    heroImages: Array<{
      url: string;
      title: string;
      location: string;
    }>;
  };
  company: {
    name: string;
    parentGroup: string;
    logoUrl?: string;
    tagline?: string;
    phone: string;
    salesPhone: string;
    whatsapp: string;
    email: string;
    address: string;
    officeHours: string;
    zaadMerchant: string;
    edahabMerchant?: string;
    projectAccounts?: {
      masalaha: string;
      aragsan: string;
      rugsan: string;
      bilicsan: string;
    };
    banks: {
      darasalaam: string;
      premier: string;
      dahabshiil: string;
      [key: string]: string;
    };
  };
  whatsappTemplates?: WhatsAppTemplates;
  bankFinancing?: BankFinancingConfig;
  about?: AboutConfig;
  financing: {
    years: number;
    months: number;
    downPaymentPercent: number;
    ribaTerms: string;
    description: string;
  };
  stats: {
    deliveredHomes: string;
    masterCommunities: string;
    diasporaFamilies: string;
    customerSatisfaction: string;
  };
  faqs: FAQItem[];
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    linkedin?: string;
    twitter?: string;
    whatsapp?: string;
    [key: string]: string | undefined;
  };
}


