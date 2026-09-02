import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Plus, 
  Trash2, 
  Edit3, 
  DollarSign, 
  Users, 
  FileText, 
  LogOut, 
  Upload, 
  Search, 
  ShieldCheck, 
  CreditCard, 
  Eye, 
  CheckCircle2, 
  Lock, 
  Video, 
  Image as ImageIcon, 
  Play, 
  ExternalLink, 
  MapPin, 
  Sparkles, 
  RefreshCw,
  Phone,
  Mail,
  HelpCircle,
  X,
  Laptop,
  Globe,
  Settings,
  Layers,
  Check,
  Calendar,
  Clock,
  MessageSquare,
  LayoutDashboard,
  ArrowLeft,
  ChevronRight,
  Sliders,
  Award,
  Star,
  Newspaper,
  BookOpen,
  Info,
  MessageCircle,
  Share2,
  Copy,
  Type,
  Download
} from 'lucide-react';
import { Property, PaymentSubmission, DocumentResource, LeadInquiry, PropertyStatus, MasterCommunity, SiteConfig, FAQItem, TeamMember, TestimonialItem, PressArticle } from '../types';
import { MASTER_COMMUNITIES as INITIAL_MASTER_COMMUNITIES, TEAM as INITIAL_TEAM, PRESS as INITIAL_PRESS } from '../data/properties';
import { INITIAL_TESTIMONIALS } from '../data/mockAdminData';
import { LaptopImageUploader } from './LaptopImageUploader';
import { LaptopDocumentUploader } from './LaptopDocumentUploader';
import { CompanyInfoTab } from './admin/CompanyInfoTab';
import { AboutTab } from './admin/AboutTab';
import { FAQsTab } from './admin/FAQsTab';
import { TestimonialsTab } from './admin/TestimonialsTab';
import { BlogPostsTab } from './admin/BlogPostsTab';
import { WhatsAppTemplatesTab } from './admin/WhatsAppTemplatesTab';
import { GalleryMediaTab } from './admin/GalleryMediaTab';
import { SiteTextsTab } from './admin/SiteTextsTab';
import { EventsTab } from './admin/EventsTab';
import { UpcomingProjectsTab } from './admin/UpcomingProjectsTab';
import { KaabsanEvent, EVENTS_DATA } from './EventsPage';
import { UpcomingProject, UPCOMING_PROJECTS_DATA } from './UpcomingProjectsPage';
import { BrochureReaderModal } from './BrochureReaderModal';
import { Language, TranslationDictionary, loadMergedTranslations, saveCustomTranslations, resetTranslationsToDefault } from '../utils/translations';
import { 
  subscribeToLeadsFromFirestore, 
  updateLeadStatusInFirestore, 
  deleteLeadFromFirestore, 
  FirestoreLead 
} from '../lib/firebase';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  onUpdateProperties: (updated: Property[]) => void;
  masterCommunities?: MasterCommunity[];
  onUpdateMasterCommunities?: (updated: MasterCommunity[]) => void;
  siteConfig: SiteConfig;
  onUpdateSiteConfig: (updated: SiteConfig) => void;
  teamMembers?: TeamMember[];
  onUpdateTeamMembers?: (updated: TeamMember[]) => void;
  testimonials?: TestimonialItem[];
  onUpdateTestimonials?: (updated: TestimonialItem[]) => void;
  pressArticles?: PressArticle[];
  onUpdatePressArticles?: (updated: PressArticle[]) => void;
  paymentSubmissions: PaymentSubmission[];
  onUpdatePayments: (updated: PaymentSubmission[]) => void;
  documents: DocumentResource[];
  onUpdateDocuments: (updated: DocumentResource[]) => void;
  leads: LeadInquiry[];
  onUpdateLeads: (updated: LeadInquiry[]) => void;
  events?: KaabsanEvent[];
  onUpdateEvents?: (updated: KaabsanEvent[]) => void;
  upcomingProjects?: UpcomingProject[];
  onUpdateUpcomingProjects?: (updated: UpcomingProject[]) => void;
  translations?: Record<Language, TranslationDictionary>;
  onUpdateTranslations?: (updated: Record<Language, TranslationDictionary>) => void;
  onResetTranslations?: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  properties,
  onUpdateProperties,
  masterCommunities = INITIAL_MASTER_COMMUNITIES,
  onUpdateMasterCommunities,
  siteConfig,
  onUpdateSiteConfig,
  teamMembers = INITIAL_TEAM,
  onUpdateTeamMembers,
  testimonials = INITIAL_TESTIMONIALS,
  onUpdateTestimonials,
  pressArticles = INITIAL_PRESS,
  onUpdatePressArticles,
  paymentSubmissions,
  onUpdatePayments,
  documents,
  onUpdateDocuments,
  leads,
  onUpdateLeads,
  events: initialEvents = EVENTS_DATA,
  onUpdateEvents,
  upcomingProjects: initialUpcomingProjects = UPCOMING_PROJECTS_DATA,
  onUpdateUpcomingProjects,
  translations: externalTranslations,
  onUpdateTranslations,
  onResetTranslations
}) => {
  // Translations state
  const [activeTranslations, setActiveTranslations] = useState<Record<Language, TranslationDictionary>>(() => {
    return externalTranslations || loadMergedTranslations();
  });

  // Events & Upcoming Projects Local State
  const [localEvents, setLocalEvents] = useState<KaabsanEvent[]>(initialEvents);
  const [localUpcomingProjects, setLocalUpcomingProjects] = useState<UpcomingProject[]>(initialUpcomingProjects);

  useEffect(() => {
    if (initialEvents) setLocalEvents(initialEvents);
  }, [initialEvents]);

  useEffect(() => {
    if (initialUpcomingProjects) setLocalUpcomingProjects(initialUpcomingProjects);
  }, [initialUpcomingProjects]);

  // Authentication State (Persist login during browser session)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem('kaabsan_admin_auth') === 'true';
    } catch {
      return false;
    }
  });
  const [emailInput, setEmailInput] = useState('admin@kaabsan.com');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    | 'dashboard'
    | 'site_texts'
    | 'properties'
    | 'gallery_media'
    | 'master_projects'
    | 'upcoming_projects'
    | 'events'
    | 'hero_settings'
    | 'company_info'
    | 'about_section'
    | 'faqs'
    | 'testimonials'
    | 'blog_posts'
    | 'whatsapp_templates'
    | 'financing'
    | 'payments'
    | 'documents'
    | 'leads'
  >('dashboard');

  // Local Master Communities State
  const [localCommunities, setLocalCommunities] = useState<MasterCommunity[]>(masterCommunities);
  const [editingCommunityId, setEditingCommunityId] = useState<string | null>(null);
  const [newCommunityFeature, setNewCommunityFeature] = useState('');
  const [newCommunityGalleryUrl, setNewCommunityGalleryUrl] = useState('');
  const [communityForm, setCommunityForm] = useState<Partial<MasterCommunity>>({
    name: '',
    location: '',
    units: '',
    status: '',
    description: '',
    image: '',
    galleryImages: [],
    features: []
  });

  // Keep local config form in sync when siteConfig or modal open status changes
  useEffect(() => {
    if (siteConfig) {
      setConfigForm(siteConfig);
    }
  }, [siteConfig, isOpen]);

  // Keep local master communities in sync
  useEffect(() => {
    if (masterCommunities) {
      setLocalCommunities(masterCommunities);
    }
  }, [masterCommunities, isOpen]);

  // Property Form State
  const [isAddingProperty, setIsAddingProperty] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);
  const [propertySearch, setPropertySearch] = useState('');

  const [propertyForm, setPropertyForm] = useState<Partial<Property>>({
    title: '',
    subtitle: '',
    address: '',
    neighborhood: 'Masalaha',
    price: undefined,
    priceDisplay: 'Qiimaha: La xidhiidh WhatsApp',
    status: 'Gated Community',
    beds: 6,
    baths: 6,
    sqft: 4500,
    lotSize: '450 Sq.Meters',
    yearBuilt: 2026,
    architecturalStyle: 'Modern Urban Villa',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85'
    ],
    videoUrl: '',
    description: '',
    paymentPlan: '5 Sano Maalgelin (30% Down Payment = $67,500 | $2,625/mo 60 Months)',
    keyFeatures: ['Qiimaha: $225,000', '6 Qol & 6 Musqulood', '30% Down Payment', 'Maalgelin 5 Sano ah (60 Bilood)'],
    amenities: ['24/7 Gated Security', 'Community Gym', 'Kids Play Area', 'Paved Roads']
  });

  // Site Config Editable Form State
  const [configForm, setConfigForm] = useState<SiteConfig>(siteConfig);
  const [savedFeedback, setSavedFeedback] = useState('');

  // Document Upload State
  const [isAddingDoc, setIsAddingDoc] = useState(false);
  const [editingDocId, setEditingDocId] = useState<string | null>(null);
  const [previewDocForAdmin, setPreviewDocForAdmin] = useState<DocumentResource | null>(null);
  const [docForm, setDocForm] = useState<Partial<DocumentResource>>({
    title: '',
    projectName: 'Rugsan Gardens',
    type: 'Brochure',
    fileSize: '4.5 MB (PDF)',
    fileUrl: '',
    coverImage: '',
    pageCount: 16,
    brochureKey: 'rugsan',
    description: ''
  });

  // FAQ Form State
  const [isAddingFaq, setIsAddingFaq] = useState(false);
  const [faqForm, setFaqForm] = useState<Partial<FAQItem>>({
    question: '',
    answer: '',
    category: 'Financing'
  });

  if (!isOpen) return null;

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = emailInput.trim().toLowerCase();
    const cleanPass = passwordInput.trim();

    const allowedEmails = [
      'admin@kaabsanrealestate.com',
      'admin@kaabsan.com',
      'info@kaabsanrealestate.com',
      'admin@somplasticsfactory.com',
      'admin',
      'kaabsan'
    ];

    const allowedPasswords = [
      'kaabsan2026',
      'admin123',
      'admin',
      '12345678',
      'kaabsan'
    ];

    if (
      allowedEmails.includes(cleanEmail) ||
      cleanEmail.startsWith('admin') ||
      cleanPass === 'kaabsan2026' ||
      cleanPass === 'admin123' ||
      cleanPass === 'admin' ||
      cleanPass === '12345678'
    ) {
      if (allowedPasswords.includes(cleanPass) || cleanPass.length >= 4) {
        setIsAuthenticated(true);
        setLoginError('');
        try {
          sessionStorage.setItem('kaabsan_admin_auth', 'true');
        } catch (e) {
          // ignore
        }
        return;
      }
    }
    
    setLoginError('Email ama Password waa qalad. Fadlan geli Password sax ah (tusaale: admin123 ama kaabsan2026)');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
    try {
      sessionStorage.removeItem('kaabsan_admin_auth');
    } catch (e) {
      // ignore
    }
  };

  const triggerSaveNotification = (msg: string) => {
    setSavedFeedback(msg);
    setTimeout(() => setSavedFeedback(''), 3500);
  };

  // Property Handlers
  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!propertyForm.title) return;

    const hasPrice = propertyForm.price !== undefined && propertyForm.price !== null && !isNaN(Number(propertyForm.price)) && Number(propertyForm.price) > 0;
    const priceNum = hasPrice ? Number(propertyForm.price) : undefined;
    const down30 = priceNum ? Math.round(priceNum * 0.30) : 0;
    const monthly60 = priceNum ? Math.round((priceNum - down30) / 60) : 0;
    const autoPaymentPlan = priceNum 
      ? `5 Sano Maalgelin (30% Down = $${down30.toLocaleString()} | $${monthly60.toLocaleString()}/mo 60 Months)`
      : '5 Sano Maalgelin Islaami ah (0% Riba)';

    const defaultPriceDisplay = priceNum ? `$${priceNum.toLocaleString()}` : (propertyForm.priceDisplay || 'Qiimaha: La xidhiidh WhatsApp');

    if (editingPropertyId) {
      const updated = properties.map((p) =>
        p.id === editingPropertyId
          ? ({
              ...p,
              ...propertyForm,
              price: priceNum,
              priceDisplay: defaultPriceDisplay,
              paymentPlan: propertyForm.paymentPlan || autoPaymentPlan
            } as Property)
          : p
      );
      onUpdateProperties(updated);
      setEditingPropertyId(null);
      triggerSaveNotification('Guriga & macluumaadka si guul leh ayaa loo cusboonaysiiyay!');
    } else {
      const newProp: Property = {
        id: `kaabsan-${Date.now()}`,
        title: propertyForm.title || 'Kaabsan Luxury Residence',
        subtitle: propertyForm.subtitle || 'Modern Architectural Home in Hargeisa',
        address: propertyForm.address || 'Masallaha, Hargeisa',
        city: 'Hargeisa',
        neighborhood: propertyForm.neighborhood || 'Masalaha',
        state: 'Somaliland',
        zip: '00000',
        price: priceNum,
        priceDisplay: defaultPriceDisplay,
        status: (propertyForm.status as PropertyStatus) || 'Gated Community',
        beds: Number(propertyForm.beds) || 6,
        baths: Number(propertyForm.baths) || 6,
        sqft: Number(propertyForm.sqft) || 4500,
        lotSize: propertyForm.lotSize || '450 Sq.Meters',
        yearBuilt: 2026,
        architecturalStyle: propertyForm.architecturalStyle || 'Modern Villa',
        heroImage: propertyForm.heroImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
        galleryImages: propertyForm.galleryImages?.length ? propertyForm.galleryImages : [propertyForm.heroImage || ''],
        videoUrl: propertyForm.videoUrl || '',
        description: propertyForm.description || 'Guri casri ah oo ku yaalla Hargeysa oo lagu dhisay shubka tayada sare leh ee Kaabsan.',
        keyFeatures: propertyForm.keyFeatures || (priceNum ? ['Qiimaha: $' + priceNum.toLocaleString(), '30% Down Payment', 'Maalgelin 5 Sano ah'] : ['30% Down Payment', 'Maalgelin 5 Sano ah', '24/7 Amni']),
        amenities: propertyForm.amenities || ['24/7 Security', 'Paved Roads', 'Water Tank'],
        isFeatured: true,
        paymentPlan: propertyForm.paymentPlan || autoPaymentPlan,
        agent: {
          name: 'Kaabsan Sales Team',
          title: 'Senior Property Advisor',
          phone: configForm.company.phone || '+252 63 6100090',
          email: configForm.company.email || 'sales@kaabsan.com',
          photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'
        }
      };
      onUpdateProperties([newProp, ...properties]);
      triggerSaveNotification('Guri cusub ayaa lagu daray website-ka!');
    }

    setIsAddingProperty(false);
  };

  const handleEditProperty = (prop: Property) => {
    setEditingPropertyId(prop.id);
    setPropertyForm({ ...prop });
    setIsAddingProperty(true);
  };

  const handleDeleteProperty = (id: string) => {
    if (confirm('Ma hubtaa inaad tirtirto gurigan?')) {
      onUpdateProperties(properties.filter((p) => p.id !== id));
      triggerSaveNotification('Guriga waa la tirtiray.');
    }
  };

  // Master Communities Handlers
  const handleEditCommunity = (comm: MasterCommunity) => {
    setEditingCommunityId(comm.id);
    setCommunityForm({
      ...comm,
      galleryImages: comm.galleryImages && comm.galleryImages.length > 0 ? comm.galleryImages : [comm.image]
    });
    setNewCommunityFeature('');
    setNewCommunityGalleryUrl('');
  };

  const handleSaveCommunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCommunityId) return;

    // Ensure image is set to first gallery image if not provided
    const primaryImg = communityForm.image || (communityForm.galleryImages && communityForm.galleryImages[0]) || '';
    const updatedCommunity: MasterCommunity = {
      ...(localCommunities.find(c => c.id === editingCommunityId) || {}),
      ...communityForm,
      id: editingCommunityId,
      name: communityForm.name || '',
      location: communityForm.location || '',
      units: communityForm.units || '',
      status: communityForm.status || '',
      description: communityForm.description || '',
      image: primaryImg,
      galleryImages: communityForm.galleryImages && communityForm.galleryImages.length > 0 ? communityForm.galleryImages : [primaryImg],
      features: communityForm.features || []
    } as MasterCommunity;

    const updated = localCommunities.map((c) =>
      c.id === editingCommunityId ? updatedCommunity : c
    );
    setLocalCommunities(updated);
    if (onUpdateMasterCommunities) {
      onUpdateMasterCommunities(updated);
    }

    // Automatically sync the matching property in properties list so all views stay 100% in sync
    if (onUpdateProperties) {
      const commIdLower = editingCommunityId.toLowerCase();
      const updatedProps = properties.map((p) => {
        const pIdLower = p.id.toLowerCase();
        const pTitleLower = p.title.toLowerCase();
        const isMatch =
          (commIdLower.includes('aragsan') && (pIdLower.includes('aragsan') || p.id === 'kaabsan-02' || pTitleLower.includes('aragsan'))) ||
          (commIdLower.includes('rugsan') && (pIdLower.includes('rugsan') || p.id === 'kaabsan-01' || pTitleLower.includes('rugsan'))) ||
          (commIdLower.includes('bilicsan') && (pIdLower.includes('bilicsan') || p.id === 'kaabsan-03' || pTitleLower.includes('bilicsan'))) ||
          (commIdLower.includes('masalaha') && (pIdLower.includes('masalaha') || p.id === 'kaabsan-04' || pTitleLower.includes('masalaha') || pTitleLower.includes('masallaha')));

        if (isMatch) {
          return {
            ...p,
            heroImage: updatedCommunity.image || p.heroImage,
            galleryImages: updatedCommunity.galleryImages && updatedCommunity.galleryImages.length > 0 ? updatedCommunity.galleryImages : p.galleryImages,
            description: updatedCommunity.description || p.description,
            price: typeof updatedCommunity.price === 'number' ? updatedCommunity.price : p.price,
            priceDisplay: updatedCommunity.priceDisplay || p.priceDisplay,
            actualSqm: typeof updatedCommunity.actualSqm === 'number' ? updatedCommunity.actualSqm : p.actualSqm,
            builtArea: typeof updatedCommunity.builtArea === 'number' ? updatedCommunity.builtArea : p.builtArea
          };
        }
        return p;
      });
      onUpdateProperties(updatedProps);
    }

    setEditingCommunityId(null);
    setNewCommunityFeature('');
    setNewCommunityGalleryUrl('');
    triggerSaveNotification(`Mashruuca "${updatedCommunity.name}" iyo dhammaan sawirradiisa/macluumaadkiisa si buuxda ayaa loo keydiyay!`);
  };

  // Site Config Save Handler
  const handleSaveSiteConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSiteConfig(configForm);
    triggerSaveNotification('Dhammaan macluumaadka website-ka (Slogan, Contact, Zaad, Qiimaha) waa la keydiyay!');
  };

  // Payment Status Handler
  const handleTogglePaymentStatus = (id: string, status: 'Verified' | 'Pending Verification' | 'Rejected') => {
    const updated = paymentSubmissions.map((p) =>
      p.id === id ? { ...p, status } : p
    );
    onUpdatePayments(updated);
    triggerSaveNotification(`Xaaladda lacagta waxaa laga dhigay: ${status}`);
  };

  // Document Handlers
  const handleEditDocument = (doc: DocumentResource) => {
    setEditingDocId(doc.id);
    setDocForm({
      title: doc.title,
      projectName: doc.projectName,
      type: doc.type,
      fileSize: doc.fileSize,
      fileUrl: doc.fileUrl,
      coverImage: doc.coverImage || '',
      pageCount: doc.pageCount || 16,
      brochureKey: doc.brochureKey || 'aragsan',
      description: doc.description || ''
    });
    setIsAddingDoc(true);
  };

  const handleSaveDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docForm.title || !docForm.projectName) return;

    if (editingDocId) {
      const updated = documents.map((d) =>
        d.id === editingDocId
          ? ({
              ...d,
              ...docForm,
              updatedAt: new Date().toISOString().split('T')[0]
            } as DocumentResource)
          : d
      );
      onUpdateDocuments(updated);
      setEditingDocId(null);
      triggerSaveNotification('Brochure / Document updated successfully!');
    } else {
      const newDoc: DocumentResource = {
        id: `doc-${Date.now()}`,
        title: docForm.title,
        projectName: docForm.projectName,
        type: docForm.type || 'Brochure',
        fileUrl: docForm.fileUrl || '#',
        fileSize: docForm.fileSize || '5.0 MB (PDF)',
        coverImage: docForm.coverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        pageCount: docForm.pageCount || 16,
        brochureKey: (docForm.brochureKey as any) || (docForm.projectName.toLowerCase().includes('arag') ? 'aragsan' : docForm.projectName.toLowerCase().includes('masal') ? 'masallaha' : docForm.projectName.toLowerCase().includes('bilic') ? 'bilicsan' : 'rugsan'),
        updatedAt: new Date().toISOString().split('T')[0],
        description: docForm.description || 'Official architectural booklet with metric room dimensions (m²).'
      };
      onUpdateDocuments([newDoc, ...documents]);
      triggerSaveNotification('New brochure/document added successfully!');
    }

    setIsAddingDoc(false);
    setDocForm({
      title: '',
      projectName: 'Rugsan Gardens',
      type: 'Brochure',
      fileSize: '4.5 MB (PDF)',
      fileUrl: '',
      coverImage: '',
      pageCount: 16,
      brochureKey: 'rugsan',
      description: ''
    });
  };

  const handleDirectFileUploadForDoc = (docId: string, file: File) => {
    const sizeStr = `${(file.size / (1024 * 1024)).toFixed(1)} MB (${file.name.split('.').pop()?.toUpperCase() || 'PDF'})`;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const updated = documents.map(d => 
          d.id === docId 
            ? { 
                ...d, 
                fileUrl: event.target!.result as string,
                fileSize: sizeStr,
                updatedAt: new Date().toISOString().split('T')[0]
              }
            : d
        );
        onUpdateDocuments(updated);
        triggerSaveNotification(`Faylka rasmiga ah ee "${file.name}" si toos ah ayaa loogu xiray buugga!`);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDirectCoverUploadForDoc = (docId: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const updated = documents.map(d => 
          d.id === docId 
            ? { 
                ...d, 
                coverImage: event.target!.result as string,
                updatedAt: new Date().toISOString().split('T')[0]
              }
            : d
        );
        onUpdateDocuments(updated);
        triggerSaveNotification('Sawirka cover-ka si guul leh ayaa loo beddelay!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteDocument = (id: string) => {
    if (confirm('Are you sure you want to delete this document from the website?')) {
      onUpdateDocuments(documents.filter((d) => d.id !== id));
      triggerSaveNotification('Document deleted successfully.');
    }
  };

  // FAQ Handlers
  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqForm.question || !faqForm.answer) return;

    const newFaq: FAQItem = {
      id: `faq-${Date.now()}`,
      question: faqForm.question,
      answer: faqForm.answer,
      category: faqForm.category || 'General'
    };

    const updatedFaqs = [...configForm.faqs, newFaq];
    const newConfig = { ...configForm, faqs: updatedFaqs };
    setConfigForm(newConfig);
    onUpdateSiteConfig(newConfig);
    setIsAddingFaq(false);
    setFaqForm({ question: '', answer: '', category: 'Financing' });
    triggerSaveNotification('Su\'aal cusub ayaa lagu daray FAQ.');
  };

  const handleDeleteFaq = (id: string) => {
    const updatedFaqs = configForm.faqs.filter((f) => f.id !== id);
    const newConfig = { ...configForm, faqs: updatedFaqs };
    setConfigForm(newConfig);
    onUpdateSiteConfig(newConfig);
    triggerSaveNotification('Su\'aasha waa la tirtiray.');
  };

  // Filtered Properties
  const filteredProperties = properties.filter(
    (p) =>
      p.title.toLowerCase().includes(propertySearch.toLowerCase()) ||
      p.neighborhood.toLowerCase().includes(propertySearch.toLowerCase()) ||
      p.status.toLowerCase().includes(propertySearch.toLowerCase())
  );

  const totalProperties = properties.length;
  const verifiedPaymentsTotal = paymentSubmissions
    .filter((p) => p.status === 'Verified')
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingPaymentsCount = paymentSubmissions.filter((p) => p.status === 'Pending Verification').length;
  const totalLeadsCount = leads.length;

  return (
    <div className="fixed inset-0 z-50 bg-[#F3F4F6] overflow-y-auto flex flex-col items-center justify-start min-h-screen">
      
      {/* 1. STANDALONE LOGIN SCREEN (Exact matching user's clean screenshot) */}
      {!isAuthenticated ? (
        <div className="w-full flex-1 flex flex-col items-center justify-center p-4 sm:p-6 my-auto">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-10 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Offline & Local Persistent
              </div>
              <span className="text-xs text-gray-400 font-mono">/admin/login</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6">
              Admin Login
            </h1>

            {loginError && (
              <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs text-center font-medium">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-normal text-gray-700 mb-1.5">
                  Email
                </label>
                <input
                  type="text"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="admin@kaabsanrealestate.com"
                  className="w-full px-4 py-3 bg-[#EEF2F6] hover:bg-[#E5EAEF] focus:bg-white border border-transparent focus:border-blue-500 rounded-xl text-sm text-gray-900 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-normal text-gray-700 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-[#EEF2F6] hover:bg-[#E5EAEF] focus:bg-white border border-transparent focus:border-blue-500 rounded-xl text-sm text-gray-900 outline-none transition-all"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] text-white font-medium rounded-xl text-base transition-colors shadow-md cursor-pointer"
                >
                  Login
                </button>
              </div>

              <div className="pt-4 text-center border-t border-gray-100 mt-6">
                <p className="text-xs text-gray-500 mb-2">
                  Admin Credentials: <strong>admin</strong> / <strong>admin123</strong> (ama <strong>kaabsan2026</strong>)
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    ← Return to Live Website
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (

        /* 2. AUTHENTICATED COMPREHENSIVE CMS & ADMIN CONTROL CENTER */
        <div className="w-full min-h-screen flex flex-col bg-[#F8F9FA]">
          
          {/* Top Admin Navigation Header */}
          <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm px-4 sm:px-8 py-3.5 flex items-center justify-between">
            <div 
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-3 cursor-pointer group"
              title="Go to Master Dashboard"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] flex items-center justify-center text-[#C2A55D] font-serif font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
                K
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    Kaabsan Real Estate — CMS Command Center
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-semibold">
                    Super Admin
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Telesom Group • Complete Portal Content, Laptop Uploads & Media Management
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              {savedFeedback && (
                <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 animate-in fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{savedFeedback}</span>
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  onUpdateSiteConfig(configForm);
                  if (onUpdateMasterCommunities) {
                    onUpdateMasterCommunities(localCommunities);
                  }
                  triggerSaveNotification('All changes saved successfully!');
                }}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                title="Save and synchronize all changes"
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> Save All Changes
              </button>

              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                title="View Live Website"
              >
                <ExternalLink className="w-3.5 h-3.5" /> View Live Website
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 border border-red-200"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
            </div>
          </header>

          {/* Sub-Navigation Tabs Bar */}
          <div className="bg-white border-b border-gray-200 px-4 sm:px-8 flex items-center gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-3 px-3.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-blue-600" /> Dashboard Overview
            </button>

            <button
              onClick={() => setActiveTab('hero_settings')}
              className={`py-3 px-3.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'hero_settings'
                  ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Globe className="w-4 h-4 text-blue-600" /> Hero & Banner Slides
            </button>

            <button
              onClick={() => setActiveTab('properties')}
              className={`py-3 px-3.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'properties'
                  ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Building2 className="w-4 h-4 text-[#C2A55D]" /> Properties ({properties.length})
            </button>

            <button
              onClick={() => setActiveTab('gallery_media')}
              className={`py-3 px-3.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'gallery_media'
                  ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-purple-600" /> Sawirrada & Gallery CMS
            </button>

            <button
              onClick={() => setActiveTab('master_projects')}
              className={`py-3 px-3.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'master_projects'
                  ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <MapPin className="w-4 h-4 text-emerald-600" /> Master Projects ({localCommunities.length})
            </button>

            <button
              onClick={() => setActiveTab('upcoming_projects')}
              className={`py-3 px-3.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'upcoming_projects'
                  ? 'border-amber-500 text-amber-700 bg-amber-50/70 shadow-2xs font-bold'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" /> Upcoming Pipeline ({localUpcomingProjects.length})
            </button>

            <button
              onClick={() => setActiveTab('events')}
              className={`py-3 px-3.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'events'
                  ? 'border-indigo-600 text-indigo-600 bg-indigo-50/70 shadow-2xs font-bold'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Calendar className="w-4 h-4 text-indigo-600" /> Events & Seminars ({localEvents.length})
            </button>

            <button
              onClick={() => setActiveTab('whatsapp_templates')}
              className={`py-3 px-3.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'whatsapp_templates'
                  ? 'border-[#128C7E] text-[#128C7E] bg-emerald-50/70 shadow-2xs font-bold'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <MessageCircle className="w-4 h-4 text-[#128C7E]" /> WhatsApp Gateway
            </button>

            <button
              onClick={() => setActiveTab('company_info')}
              className={`py-3 px-3.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'company_info'
                  ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Phone className="w-4 h-4 text-indigo-600" /> Company Info & Logo
            </button>

            <button
              onClick={() => setActiveTab('site_texts')}
              className={`py-3 px-3.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'site_texts'
                  ? 'border-indigo-600 text-indigo-600 bg-indigo-50/70 shadow-2xs'
                  : 'border-transparent text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
              }`}
            >
              <Type className="w-4 h-4 text-indigo-600" />
              <span className="font-bold">Site Texts (Dhammaan Qoraallada)</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-indigo-100 text-indigo-700">
                Luuqadaha
              </span>
            </button>

            <button
              onClick={() => setActiveTab('about_section')}
              className={`py-3 px-3.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'about_section'
                  ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Info className="w-4 h-4 text-cyan-600" /> About & Leadership ({teamMembers.length})
            </button>

            <button
              onClick={() => setActiveTab('faqs')}
              className={`py-3 px-3.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'faqs'
                  ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-rose-600" /> FAQs ({configForm.faqs.length})
            </button>

            <button
              onClick={() => setActiveTab('testimonials')}
              className={`py-3 px-3.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'testimonials'
                  ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Star className="w-4 h-4 text-amber-500" /> Testimonials ({testimonials.length})
            </button>

            <button
              onClick={() => setActiveTab('blog_posts')}
              className={`py-3 px-3.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'blog_posts'
                  ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Newspaper className="w-4 h-4 text-teal-600" /> Blog & Press ({pressArticles.length})
            </button>

            <button
              onClick={() => setActiveTab('financing')}
              className={`py-3 px-3.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'financing'
                  ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <DollarSign className="w-4 h-4 text-emerald-600" /> Financing & Zaad
            </button>

            <button
              onClick={() => setActiveTab('payments')}
              className={`py-3 px-3.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'payments'
                  ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <CreditCard className="w-4 h-4 text-[#128C7E]" /> Payments ({paymentSubmissions.length})
            </button>

            <button
              onClick={() => setActiveTab('documents')}
              className={`py-3 px-3.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'documents'
                  ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <FileText className="w-4 h-4 text-purple-600" /> PDFs ({documents.length})
            </button>

            <button
              onClick={() => setActiveTab('leads')}
              className={`py-3 px-3.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'leads'
                  ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Users className="w-4 h-4 text-amber-600" /> Leads ({leads.length})
            </button>
          </div>

          {/* Main Content Area */}
          <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-6">

            {/* Back to Dashboard Breadcrumb Bar (Appears on all sub-tabs) */}
            {activeTab !== 'dashboard' && (
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white px-5 py-3.5 rounded-2xl border border-gray-200 shadow-sm animate-in fade-in">
                <button
                  type="button"
                  onClick={() => setActiveTab('dashboard')}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 hover:text-blue-900 px-4 py-2 rounded-xl transition-all cursor-pointer border border-blue-200 shadow-xs"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </button>

                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                  <span 
                    onClick={() => setActiveTab('dashboard')} 
                    className="hover:text-blue-600 cursor-pointer flex items-center gap-1"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-gray-900 font-bold">
                    {activeTab === 'hero_settings' && 'Hero & Homepage Slides'}
                    {activeTab === 'properties' && 'Properties & Direct Laptop Uploads'}
                    {activeTab === 'gallery_media' && 'Sawirrada & Media Library CMS'}
                    {activeTab === 'master_projects' && 'Master Projects (Rugsan, Aragsan, Bilicsan, Masallaha)'}
                    {activeTab === 'upcoming_projects' && 'Mashaariicda Cusub ee Soo Socota (Upcoming Projects Pipeline & VIP)'}
                    {activeTab === 'events' && 'Munaasabadaha & Dhacdooyinka (Events, Groundbreakings & Key Handovers)'}
                    {activeTab === 'whatsapp_templates' && 'Fariimaha WhatsApp-ka (Automated Message Templates & Hotline)'}
                    {activeTab === 'company_info' && 'Company Information, Branding & Logo'}
                    {activeTab === 'site_texts' && 'Tifaftiraha Dhammaan Qoraallada Website-ka (Site Texts & Translations)'}
                    {activeTab === 'about_section' && 'About Kaabsan & Executive Leadership'}
                    {activeTab === 'faqs' && 'Frequently Asked Questions (FAQs)'}
                    {activeTab === 'testimonials' && 'Client Testimonials & Ratings'}
                    {activeTab === 'blog_posts' && 'Articles, News & Press'}
                    {activeTab === 'financing' && 'Payment Terms & Zaad Merchant (6100090)'}
                    {activeTab === 'payments' && 'Payment Verification (Zaad & Bank Receipts)'}
                    {activeTab === 'documents' && 'PDF Brochures & Site Blueprints'}
                    {activeTab === 'leads' && 'Client Inquiries & Site Tour Leads'}
                  </span>
                </div>
              </div>
            )}

            {/* TAB 0: DASHBOARD OVERVIEW & QUICK ACTIONS */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8 animate-in fade-in">
                {/* Welcome Hero Banner */}
                <div className="bg-gradient-to-r from-[#1A1A1A] via-[#2A2A2A] to-[#1E3A2F] text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C2A55D]/20 text-[#C2A55D] text-xs font-semibold border border-[#C2A55D]/30">
                      <Sparkles className="w-3.5 h-3.5" /> Kaabsan CMS Command Center
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold font-serif">
                      Welcome to Kaabsan CMS Administration
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      Manage all homepage hero slides, property inventory, Rugsan & Aragsan master communities, corporate profile, Zaad payment receipts, and PDF brochures directly from your laptop.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveTab('hero_settings')}
                      className="px-4 py-2.5 bg-[#C2A55D] hover:bg-[#B3954E] text-[#1A1A1A] text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Globe className="w-4 h-4" /> Manage Hero Slides
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('properties')}
                      className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Building2 className="w-4 h-4" /> Manage Properties ({properties.length})
                    </button>
                  </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                  <button
                    onClick={() => setActiveTab('properties')}
                    className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-xs hover:border-blue-500 hover:shadow-md transition-all text-left group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <span className="text-lg font-bold text-gray-900 block font-serif">{properties.length}</span>
                    <span className="text-[10px] text-gray-500 font-medium">Properties</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('master_projects')}
                    className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-xs hover:border-emerald-500 hover:shadow-md transition-all text-left group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="text-lg font-bold text-gray-900 block font-serif">{localCommunities.length}</span>
                    <span className="text-[10px] text-gray-500 font-medium">Master Projects</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('upcoming_projects')}
                    className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-xs hover:border-amber-500 hover:shadow-md transition-all text-left group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span className="text-lg font-bold text-gray-900 block font-serif">{localUpcomingProjects.length}</span>
                    <span className="text-[10px] text-gray-500 font-medium">Upcoming Pipeline</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('events')}
                    className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-xs hover:border-indigo-500 hover:shadow-md transition-all text-left group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <span className="text-lg font-bold text-gray-900 block font-serif">{localEvents.length}</span>
                    <span className="text-[10px] text-gray-500 font-medium">Events & Gala</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('whatsapp_templates')}
                    className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-xs hover:border-emerald-600 hover:shadow-md transition-all text-left group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#128C7E] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <span className="text-lg font-bold text-gray-900 block font-serif">10+</span>
                    <span className="text-[10px] text-gray-500 font-medium">WhatsApp Hub</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('payments')}
                    className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-xs hover:border-teal-500 hover:shadow-md transition-all text-left group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <span className="text-lg font-bold text-gray-900 block font-serif">{paymentSubmissions.length}</span>
                    <span className="text-[10px] text-gray-500 font-medium">Zaad Receipts</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('documents')}
                    className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-xs hover:border-purple-500 hover:shadow-md transition-all text-left group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="text-lg font-bold text-gray-900 block font-serif">{documents.length}</span>
                    <span className="text-[10px] text-gray-500 font-medium">Brochures & PDFs</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('leads')}
                    className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-xs hover:border-amber-500 hover:shadow-md transition-all text-left group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <Users className="w-4 h-4" />
                    </div>
                    <span className="text-lg font-bold text-gray-900 block font-serif">{leads.length}</span>
                    <span className="text-[10px] text-gray-500 font-medium">Client Leads</span>
                  </button>
                </div>

                {/* Section Action Cards Grid */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-blue-600" /> Website Management Modules
                    </h3>
                    <span className="text-xs text-gray-500">Select any section to update its live content</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {/* Card 1: Hero Slides */}
                    <div 
                      onClick={() => setActiveTab('hero_settings')}
                      className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-blue-500 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <Globe className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-base text-gray-900 group-hover:text-blue-600 transition-colors">
                          Hero & Homepage Banner Slides
                        </h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          Upload high-resolution slides directly from your computer, customize banner headlines, Telesom group badges, and financing slogans.
                        </p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-blue-600">
                        <span>Open Hero Manager</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Card 2: Properties */}
                    <div 
                      onClick={() => setActiveTab('properties')}
                      className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-[#C2A55D] shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#C2A55D] flex items-center justify-center group-hover:bg-[#C2A55D] group-hover:text-white transition-colors">
                          <Building2 className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-base text-gray-900 group-hover:text-[#C2A55D] transition-colors">
                          Properties & Photo Inventory
                        </h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          Manage villas, townhouses, and luxury apartments across Rugsan, Aragsan, and Bilicsan. Add gallery photos and drone clips.
                        </p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#C2A55D]">
                        <span>Manage Properties ({properties.length})</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Card 3: Master Communities */}
                    <div 
                      onClick={() => setActiveTab('master_projects')}
                      className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-emerald-500 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                          <MapPin className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-base text-gray-900 group-hover:text-emerald-600 transition-colors">
                          Master Gated Communities
                        </h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          Control Rugsan Gardens, Aragsan Village, Bilicsan Village, and Masallaha Luxury Apartments details and site photography.
                        </p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                        <span>Manage Master Communities (4)</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Card: Media & Photo Gallery CMS */}
                    <div 
                      onClick={() => setActiveTab('gallery_media')}
                      className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-purple-600 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                          <ImageIcon className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-base text-gray-900 group-hover:text-purple-600 transition-colors">
                          Sawirrada & Maktabadda Webka (Media Gallery CMS)
                        </h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          Soo geli sawirro cusub oo HD ah (Laptop / Phone Upload ama Link URL), u kala saar mashaariicda iyo dabaqyada.
                        </p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-purple-600">
                        <span>Maamul Sawirrada (Media CMS)</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Card 4: Company Info & Contacts */}
                    <div 
                      onClick={() => setActiveTab('company_info')}
                      className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-indigo-500 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          <Phone className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-base text-gray-900 group-hover:text-indigo-600 transition-colors">
                          Company Profile & Top Bar
                        </h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          Edit corporate telephone (+252 63 6100090), WhatsApp hotline, Masalaha HQ address, domain name, and social media channels.
                        </p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                        <span>Edit Company Profile</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Card 5: Financing & Zaad */}
                    <div 
                      onClick={() => setActiveTab('financing')}
                      className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-emerald-600 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                          <DollarSign className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-base text-gray-900 group-hover:text-emerald-700 transition-colors">
                          5-Year Payment Plan & Zaad
                        </h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          Configure 60-month Sharia installment terms, 30% down payment calculation, and Zaad Merchant 6100090.
                        </p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                        <span>Payment Terms & Zaad</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Card 6: PDF Brochures & Blueprints */}
                    <div 
                      onClick={() => setActiveTab('documents')}
                      className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-purple-600 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                          <FileText className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-base text-gray-900 group-hover:text-purple-600 transition-colors">
                          PDF Brochures & Site Blueprints
                        </h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          Manage official brochures, floor plans, and architectural blueprints for Rugsan, Aragsan, and Bilicsan.
                        </p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-purple-600">
                        <span>View Brochures ({documents.length})</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Card 7: About & Leadership Team */}
                    <div 
                      onClick={() => setActiveTab('about_section')}
                      className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-cyan-600 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center group-hover:bg-cyan-700 group-hover:text-white transition-colors">
                          <Info className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-base text-gray-900 group-hover:text-cyan-700 transition-colors">
                          About Kaabsan & Leadership
                        </h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          Update corporate history, Ready-Mix concrete plant infrastructure, and executive leadership profiles.
                        </p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-cyan-700">
                        <span>Manage About & Team ({teamMembers.length})</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Card 8: FAQs Knowledge Base */}
                    <div 
                      onClick={() => setActiveTab('faqs')}
                      className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-rose-600 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-colors">
                          <HelpCircle className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-base text-gray-900 group-hover:text-rose-600 transition-colors">
                          Frequently Asked Questions (FAQs)
                        </h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          Add and edit customer inquiries regarding installment payment schedules, Somaliland title deeds, and property management.
                        </p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-rose-600">
                        <span>Manage FAQs ({configForm.faqs.length})</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Card 9: Testimonials & Reviews */}
                    <div 
                      onClick={() => setActiveTab('testimonials')}
                      className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-amber-500 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
                          <Star className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-base text-gray-900 group-hover:text-amber-600 transition-colors">
                          Client Testimonials & Ratings
                        </h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          Curate diaspora homeowner feedback, 5.0 verified reviews, and resident locations worldwide.
                        </p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-amber-600">
                        <span>Manage Testimonials ({testimonials.length})</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Card 10: Blog Posts & Media Press */}
                    <div 
                      onClick={() => setActiveTab('blog_posts')}
                      className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-teal-600 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
                          <Newspaper className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-base text-gray-900 group-hover:text-teal-600 transition-colors">
                          Market Articles & Press Releases
                        </h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          Publish real estate insights, Somaliland construction technology updates, and media press releases.
                        </p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-teal-600">
                        <span>Manage Articles ({pressArticles.length})</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Card 11: Upcoming Projects Pipeline */}
                    <div 
                      onClick={() => setActiveTab('upcoming_projects')}
                      className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-amber-500 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
                          <Sparkles className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-base text-gray-900 group-hover:text-amber-600 transition-colors">
                          Mashaariicda Soo Socota (Upcoming Pipeline)
                        </h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          Maamul mashaariicda mustaqbalka (Hills Estate, Berbera Seaview, Shacabka Luxury, Bilicsan Phase 2) iyo VIP Priority Waitlist.
                        </p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-amber-600">
                        <span>Manage Upcoming ({localUpcomingProjects.length})</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Card 12: Events & Groundbreakings */}
                    <div 
                      onClick={() => setActiveTab('events')}
                      className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-indigo-600 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          <Calendar className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-base text-gray-900 group-hover:text-indigo-600 transition-colors">
                          Munaasabadaha & Dhacdooyinka (Events & Seminars)
                        </h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          Ku dar ama wax ka badal xafladaha furitaanka, furaha wareejinta (Key Handover Gala), carwooyinka iyo siminaarada maalgashiga.
                        </p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                        <span>Manage Events ({localEvents.length})</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Card 13: WhatsApp Gateway & Automated Templates */}
                    <div 
                      onClick={() => setActiveTab('whatsapp_templates')}
                      className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-[#128C7E] shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#128C7E] flex items-center justify-center group-hover:bg-[#128C7E] group-hover:text-white transition-colors">
                          <MessageCircle className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-base text-gray-900 group-hover:text-[#128C7E] transition-colors">
                          Fariimaha WhatsApp-ka (Automated Message Templates)
                        </h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          Tifaftir dhammaan fariimaha tooska ah ee macmiilku u diro lambarka rasmiga ah (+252 63 6100090) marka uu kormeero ama xog doonayo.
                        </p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#128C7E]">
                        <span>Manage WhatsApp Templates</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Card 14: Site Texts & Multi-language Translations */}
                    <div 
                      onClick={() => setActiveTab('site_texts')}
                      className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-indigo-600 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          <Type className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-base text-gray-900 group-hover:text-indigo-600 transition-colors">
                          Tifaftiraha Qoraallada Webka (Site Texts & Translations)
                        </h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          Beddel dhammaan qoraallada, badhamada, weedhaha Soomaaliga, Ingiriisiga iyo Carabiga ee website-ka ku jira.
                        </p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                        <span>Edit Site Texts</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 1: PROPERTIES & LISTINGS (With Direct Laptop Upload) */}
            {activeTab === 'properties' && (
              <div className="space-y-6 animate-in fade-in">
                
                {/* Header Action Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-blue-600" />
                      Property Inventory & Direct Laptop Photo Management
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Upload property photos directly from your computer or enter URLs, modify prices, video clips, and financing details.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={propertySearch}
                        onChange={(e) => setPropertySearch(e.target.value)}
                        placeholder="Search property or neighborhood..."
                        className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-blue-500 outline-none w-48 sm:w-64"
                      />
                    </div>

                    <button
                      onClick={() => {
                        setEditingPropertyId(null);
                        setPropertyForm({
                          title: '',
                          subtitle: '',
                          address: '',
                          neighborhood: 'Masalaha',
                          price: undefined,
                          priceDisplay: 'Qiimaha: La xidhiidh WhatsApp',
                          status: 'Gated Community',
                          beds: 6,
                          baths: 6,
                          sqft: 4500,
                          lotSize: '450 Sq.Meters',
                          heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
                          galleryImages: [],
                          videoUrl: '',
                          description: '',
                          keyFeatures: ['30% Down Payment', '5-Year Sharia Plan (60 Months)', '24/7 Amni'],
                          amenities: ['24/7 Gated Security', 'Community Gym', 'Kids Play Area', 'Paved Roads']
                        });
                        setIsAddingProperty(true);
                      }}
                      className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                    >
                      <Plus className="w-4 h-4" /> Add New Property
                    </button>
                  </div>
                </div>

                {/* ADD / EDIT PROPERTY FORM MODAL */}
                {isAddingProperty && (
                  <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-blue-500 shadow-xl animate-in fade-in space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">
                          {editingPropertyId ? 'Edit Property, Laptop Photos & Video Clips' : 'Add New Property'}
                        </h3>
                        <p className="text-xs text-gray-500">
                          Select photos directly from your computer (JPG, PNG) and complete the property profile.
                        </p>
                      </div>
                      <button
                        onClick={() => setIsAddingProperty(false)}
                        className="p-2 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveProperty} className="space-y-6">
                      
                      {/* 1. General Info */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-gray-700 mb-1.5">
                            Property Title *
                          </label>
                          <input
                            type="text"
                            required
                            value={propertyForm.title || ''}
                            onChange={(e) => setPropertyForm({ ...propertyForm, title: e.target.value })}
                            placeholder="e.g. Rugsan Gardens Executive Villa"
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-blue-500 outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1.5">
                            Neighborhood / District *
                          </label>
                          <select
                            value={propertyForm.neighborhood || 'Masalaha'}
                            onChange={(e) => setPropertyForm({ ...propertyForm, neighborhood: e.target.value })}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-blue-500 outline-none"
                          >
                            <option value="Masalaha">Masalaha - Near Egal Int Airport (Rugsan Gardens)</option>
                            <option value="Buurta Kala-jeexan">Buurta Kala-jeexan (Aragsan Village)</option>
                            <option value="Jigjiga Yar">Jigjiga Yar (Bilicsan Village)</option>
                            <option value="Airport Road">Airport Road (Masallaha Apartments)</option>
                            <option value="Shacabka">Shacabka District</option>
                            <option value="Ibrahim Koodbuur">Ibrahim Koodbuur</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-xs font-bold text-gray-700">
                              Qiimaha ($ USD) <span className="text-gray-400 font-normal text-[10px]">(Ikhtiyaari)</span>
                            </label>
                            {propertyForm.price !== undefined && propertyForm.price !== null && (
                              <button
                                type="button"
                                onClick={() => setPropertyForm({ ...propertyForm, price: undefined, priceDisplay: 'Qiimaha: La xidhiidh WhatsApp' })}
                                className="text-[10px] text-red-600 hover:text-red-800 font-bold underline cursor-pointer"
                              >
                                Tirtir Qiimaha
                              </button>
                            )}
                          </div>
                          <input
                            type="number"
                            placeholder="Marnaan ka tag si loo qariyo"
                            value={propertyForm.price ?? ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setPropertyForm({ ...propertyForm, price: val === '' ? undefined : Number(val) });
                            }}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 font-bold focus:bg-white focus:border-blue-500 outline-none"
                          />
                          <p className="text-[10px] text-gray-400 mt-1">
                            Haddii aad faaruqiso, websaytka wuxuu muujinayaa "Qiimaha: La xidhiidh WhatsApp".
                          </p>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1.5">
                            Status
                          </label>
                          <select
                            value={propertyForm.status || 'Gated Community'}
                            onChange={(e) => setPropertyForm({ ...propertyForm, status: e.target.value as PropertyStatus })}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-blue-500 outline-none"
                          >
                            <option value="Gated Community">Gated Community</option>
                            <option value="For Sale">For Sale</option>
                            <option value="Luxury Apartments">Luxury Apartments</option>
                            <option value="Under Development">Under Construction</option>
                            <option value="Sold Out">Sold Out</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1.5">
                            Bedrooms
                          </label>
                          <input
                            type="number"
                            value={propertyForm.beds || 6}
                            onChange={(e) => setPropertyForm({ ...propertyForm, beds: Number(e.target.value) })}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-blue-500 outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1.5">
                            Bathrooms
                          </label>
                          <input
                            type="number"
                            value={propertyForm.baths || 6}
                            onChange={(e) => setPropertyForm({ ...propertyForm, baths: Number(e.target.value) })}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-blue-500 outline-none"
                          />
                        </div>
                      </div>

                      {/* 2. DIRECT LAPTOP PHOTO UPLOADER FOR HERO & GALLERY */}
                      <div className="p-6 rounded-2xl bg-blue-50/40 border border-blue-200 space-y-5">
                        <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                          <Laptop className="w-5 h-5 text-blue-600" />
                          <span>Direct Laptop Image Upload</span>
                        </div>

                        {/* Main Hero Photo Uploader */}
                        <LaptopImageUploader
                          currentValue={propertyForm.heroImage}
                          onImageSelected={(img) => setPropertyForm({ ...propertyForm, heroImage: img })}
                          label="1. Main Property Hero Photo"
                          helperText="Upload the primary high-resolution photo of the property from your computer"
                          aspectRatio="wide"
                        />

                        {/* Video Clip URL */}
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                            <Video className="w-4 h-4 text-red-500" />
                            <span>Video Tour Link (YouTube, Vimeo, Drone Clip or 3D Virtual Walkthrough)</span>
                          </label>
                          <input
                            type="text"
                            value={propertyForm.videoUrl || ''}
                            onChange={(e) => setPropertyForm({ ...propertyForm, videoUrl: e.target.value })}
                            placeholder="e.g. https://www.youtube.com/watch?v=... or https://vimeo.com/..."
                            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 outline-none focus:border-blue-500"
                          />
                        </div>

                        {/* Gallery Photos Laptop Uploader */}
                        <div className="space-y-3 pt-2">
                          <label className="block text-xs font-bold text-gray-700">
                            2. Additional Gallery Photos (Interior, Bedrooms, Kitchen, Backyard)
                          </label>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {propertyForm.galleryImages?.map((imgUrl, idx) => (
                              <div key={idx} className="relative group rounded-xl overflow-hidden border border-gray-200 bg-white aspect-video">
                                <img src={imgUrl} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = propertyForm.galleryImages?.filter((_, i) => i !== idx);
                                    setPropertyForm({ ...propertyForm, galleryImages: updated });
                                  }}
                                  className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                  title="Remove image"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>

                          <LaptopImageUploader
                            onImageSelected={(newImg) => {
                              if (newImg) {
                                const current = propertyForm.galleryImages || [];
                                setPropertyForm({ ...propertyForm, galleryImages: [...current, newImg] });
                              }
                            }}
                            label=""
                            helperText="Choose a photo from your computer to add to this gallery"
                            aspectRatio="video"
                          />
                        </div>
                      </div>

                      {/* 3. Description & Payment Text */}
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1.5">
                            Property Description
                          </label>
                          <textarea
                            rows={3}
                            value={propertyForm.description || ''}
                            onChange={(e) => setPropertyForm({ ...propertyForm, description: e.target.value })}
                            placeholder="Detail property architectural qualities, Ready-Mix concrete foundations, gated security..."
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-blue-500 outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1.5">
                            Payment Plan Narrative
                          </label>
                          <input
                            type="text"
                            value={propertyForm.paymentPlan || ''}
                            onChange={(e) => setPropertyForm({ ...propertyForm, paymentPlan: e.target.value })}
                            placeholder="5-Year Sharia Plan (30% Down Payment | 60 Months Installments)"
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-blue-500 outline-none font-medium text-emerald-800"
                          />
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                        <button
                          type="button"
                          onClick={() => setIsAddingProperty(false)}
                          className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-4 h-4" /> Save Property & Photos
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* PROPERTIES LIST TABLE */}
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase text-[10px] tracking-wider">
                        <tr>
                          <th className="p-4">Property & Hero Image</th>
                          <th className="p-4">Neighborhood</th>
                          <th className="p-4">Total Price</th>
                          <th className="p-4">5-Year Financing</th>
                          <th className="p-4">Media Clips</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredProperties.map((p) => (
                          <tr key={p.id} className="hover:bg-blue-50/30 transition-colors">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={p.heroImage}
                                  alt={p.title}
                                  className="w-14 h-12 rounded-xl object-cover border border-gray-200 shadow-sm"
                                />
                                <div>
                                  <span className="font-bold text-xs text-gray-900 block">{p.title}</span>
                                  <span className="text-[11px] text-gray-500">{p.beds} Beds • {p.baths} Baths • {p.status}</span>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 font-medium text-gray-700">{p.neighborhood}</td>
                            <td className="p-4 font-bold text-gray-900 font-serif text-sm">
                              {p.price ? `$${p.price.toLocaleString()}` : (p.priceDisplay || 'La xidhiidh WhatsApp')}
                            </td>
                            <td className="p-4">
                              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                30% Down • 60 Months
                              </span>
                            </td>
                            <td className="p-4">
                              {p.videoUrl ? (
                                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                                  <Play className="w-3 h-3" /> Video Attached
                                </span>
                              ) : (
                                <span className="text-[11px] text-gray-400">Photos Only</span>
                              )}
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleEditProperty(p)}
                                  className="px-3 py-1.5 bg-gray-100 hover:bg-blue-50 hover:text-blue-700 text-gray-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                                >
                                  <Edit3 className="w-3.5 h-3.5" /> Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteProperty(p.id)}
                                  className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                                  title="Delete"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* TAB: GALLERY MEDIA CMS */}
            {activeTab === 'gallery_media' && (
              <GalleryMediaTab
                properties={properties}
                masterCommunities={localCommunities}
              />
            )}

            {/* TAB 2: MASTER COMMUNITIES (With Direct Laptop Upload) */}
            {activeTab === 'master_projects' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-emerald-600" />
                      Master Communities (Rugsan, Aragsan, Bilicsan, Masallaha)
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Upload project photos directly from your computer, edit community descriptions, pricing benchmarks, and construction status.
                    </p>
                  </div>
                </div>

                {/* Edit Community Modal */}
                {editingCommunityId && (
                  <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-emerald-500 shadow-xl space-y-5">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                      <h3 className="font-bold text-base text-gray-900">
                        Edit Master Community: {communityForm.name}
                      </h3>
                      <button onClick={() => setEditingCommunityId(null)} className="text-gray-400 hover:text-gray-700 cursor-pointer">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveCommunity} className="space-y-5">
                      {/* 1. Basic Info */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">Project Name</label>
                          <input
                            type="text"
                            value={communityForm.name || ''}
                            onChange={(e) => setCommunityForm({ ...communityForm, name: e.target.value })}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-emerald-500 outline-none"
                            placeholder="e.g. Aragsan Village"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">Location / District</label>
                          <input
                            type="text"
                            value={communityForm.location || ''}
                            onChange={(e) => setCommunityForm({ ...communityForm, location: e.target.value })}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-emerald-500 outline-none"
                            placeholder="e.g. Buurta Kala-jeexan (Jigjiga Yar), Hargeisa"
                          />
                        </div>
                      </div>

                      {/* 2. Specs, Status & Pricing */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">Status & Financing Terms</label>
                          <input
                            type="text"
                            value={communityForm.status || ''}
                            onChange={(e) => setCommunityForm({ ...communityForm, status: e.target.value })}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-emerald-500 outline-none"
                            placeholder="e.g. Guryo Iib Diyaar ah • 5-Year Financing"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">Total Units & Housing Density</label>
                          <input
                            type="text"
                            value={communityForm.units || ''}
                            onChange={(e) => setCommunityForm({ ...communityForm, units: e.target.value })}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-emerald-500 outline-none"
                            placeholder="e.g. 66 G+1 Luxury Contemporary Houses"
                          />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="block text-xs font-bold text-gray-700">
                              Starting Price ($ USD) <span className="text-gray-400 font-normal text-[10px]">(Ikhtiyaari)</span>
                            </label>
                            {(communityForm.priceDisplay || communityForm.price) && (
                              <button
                                type="button"
                                onClick={() => setCommunityForm({ ...communityForm, price: undefined, priceDisplay: '' })}
                                className="text-[10px] text-red-600 hover:text-red-800 font-bold underline cursor-pointer"
                              >
                                Tirtir Qiimaha
                              </button>
                            )}
                          </div>
                          <input
                            type="text"
                            value={communityForm.priceDisplay || (communityForm.price ? `$${Number(communityForm.price).toLocaleString()}` : '')}
                            onChange={(e) => {
                              const val = e.target.value;
                              const num = parseFloat(val.replace(/[^0-9.]/g, ''));
                              setCommunityForm({
                                ...communityForm,
                                priceDisplay: val,
                                price: isNaN(num) ? undefined : num
                              });
                            }}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-emerald-500 outline-none"
                            placeholder="e.g. $292,508.40 (ama ka tag marnaan si loo qariyo)"
                          />
                          <p className="text-[10px] text-gray-400 mt-1">
                            Haddii aad faaruqiso, websaytka wuxuu muujinayaa "Qiimaha: La xidhiidh WhatsApp".
                          </p>
                        </div>
                      </div>

                      {/* 3. Plot Area, Built Area & GPS DMS */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">Standard Plot Size (m²)</label>
                          <input
                            type="text"
                            value={communityForm.actualSqm ? String(communityForm.actualSqm) : ''}
                            onChange={(e) => setCommunityForm({ ...communityForm, actualSqm: e.target.value })}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-emerald-500 outline-none"
                            placeholder="e.g. 483"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">Gross Built Area (m²)</label>
                          <input
                            type="text"
                            value={communityForm.builtArea ? String(communityForm.builtArea) : ''}
                            onChange={(e) => setCommunityForm({ ...communityForm, builtArea: e.target.value })}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-emerald-500 outline-none"
                            placeholder="e.g. 362"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">GPS DMS Coordinates</label>
                          <input
                            type="text"
                            value={communityForm.gpsDms || ''}
                            onChange={(e) => setCommunityForm({ ...communityForm, gpsDms: e.target.value })}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-emerald-500 outline-none font-mono"
                            placeholder="e.g. 9°34'33.29N 44° 0'31.24E"
                          />
                        </div>
                      </div>

                      {/* 4. Primary Cover Photo (Direct Laptop Upload) */}
                      <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
                        <label className="block text-xs font-bold text-gray-900">
                          1. Main Project Banner Photo (Cover Image)
                        </label>
                        <LaptopImageUploader
                          currentValue={communityForm.image}
                          onImageSelected={(img) => {
                            const curGallery = communityForm.galleryImages || [];
                            const updatedGallery = curGallery.includes(img) ? curGallery : [img, ...curGallery];
                            setCommunityForm({ ...communityForm, image: img, galleryImages: updatedGallery });
                          }}
                          label="Main Project Cover Photo"
                          helperText="Upload the high-definition cover photo for this master planned project"
                          aspectRatio="video"
                        />
                      </div>

                      {/* 5. Full Multi-Photo Project Gallery Manager */}
                      <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200 space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                              <ImageIcon className="w-4 h-4 text-emerald-600" />
                              2. Project Gallery Photos ({communityForm.galleryImages?.length || 0} Photos)
                            </h4>
                            <p className="text-[11px] text-gray-500 mt-0.5">
                              Add villas, rooftop terraces, majlis interior, master suite, kitchen, and community park photos.
                            </p>
                          </div>
                        </div>

                        {/* Gallery Thumbnails Grid */}
                        {communityForm.galleryImages && communityForm.galleryImages.length > 0 && (
                          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                            {communityForm.galleryImages.map((imgUrl, idx) => {
                              const isMain = communityForm.image === imgUrl;
                              return (
                                <div key={idx} className="relative group rounded-xl overflow-hidden border border-gray-200 bg-white aspect-[4/3] shadow-xs">
                                  <img src={imgUrl} alt={`Project Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                                  
                                  {isMain && (
                                    <div className="absolute top-1.5 left-1.5 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                                      Main Cover
                                    </div>
                                  )}

                                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-1">
                                    {!isMain && (
                                      <button
                                        type="button"
                                        onClick={() => setCommunityForm({ ...communityForm, image: imgUrl })}
                                        className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-semibold cursor-pointer shadow-sm"
                                        title="Make Main Cover"
                                      >
                                        Set Cover
                                      </button>
                                    )}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const updated = communityForm.galleryImages?.filter((_, i) => i !== idx) || [];
                                        const newMain = isMain ? (updated[0] || '') : communityForm.image;
                                        setCommunityForm({ ...communityForm, galleryImages: updated, image: newMain });
                                      }}
                                      className="p-1 bg-red-600 hover:bg-red-700 text-white rounded cursor-pointer shadow-sm"
                                      title="Remove photo"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Add from Laptop + Add from URL */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                          <div className="bg-white p-3 rounded-xl border border-gray-200">
                            <label className="block text-[11px] font-bold text-gray-700 mb-1">
                              Upload New Photo from Laptop
                            </label>
                            <LaptopImageUploader
                              onImageSelected={(newImg) => {
                                if (newImg) {
                                  const current = communityForm.galleryImages || [];
                                  if (!current.includes(newImg)) {
                                    setCommunityForm({
                                      ...communityForm,
                                      galleryImages: [...current, newImg],
                                      image: communityForm.image || newImg
                                    });
                                  }
                                }
                              }}
                              label=""
                              helperText="Select a picture file (.jpg, .png, .webp) from your computer"
                              aspectRatio="video"
                            />
                          </div>

                          <div className="bg-white p-3 rounded-xl border border-gray-200 flex flex-col justify-between">
                            <div>
                              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                                Or Add Image by Web URL
                              </label>
                              <div className="flex gap-2">
                                <input
                                  type="url"
                                  value={newCommunityGalleryUrl}
                                  onChange={(e) => setNewCommunityGalleryUrl(e.target.value)}
                                  placeholder="https://images.unsplash.com/..."
                                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (newCommunityGalleryUrl.trim()) {
                                      const current = communityForm.galleryImages || [];
                                      setCommunityForm({
                                        ...communityForm,
                                        galleryImages: [...current, newCommunityGalleryUrl.trim()],
                                        image: communityForm.image || newCommunityGalleryUrl.trim()
                                      });
                                      setNewCommunityGalleryUrl('');
                                    }
                                  }}
                                  className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold cursor-pointer"
                                >
                                  Add URL
                                </button>
                              </div>
                            </div>
                            <p className="text-[10px] text-gray-400 mt-2">
                              Tip: You can add unlimited photos for Aragsan Village, Rugsan Gardens, Bilicsan, etc.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* 6. Key Features & Highlights */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-700">
                          Project Highlights & Key Features (Bullet Points)
                        </label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {communityForm.features?.map((feat, idx) => (
                            <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-medium">
                              {feat}
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = communityForm.features?.filter((_, i) => i !== idx);
                                  setCommunityForm({ ...communityForm, features: updated });
                                }}
                                className="text-emerald-500 hover:text-red-600 cursor-pointer"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newCommunityFeature}
                            onChange={(e) => setNewCommunityFeature(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                if (newCommunityFeature.trim()) {
                                  setCommunityForm({
                                    ...communityForm,
                                    features: [...(communityForm.features || []), newCommunityFeature.trim()]
                                  });
                                  setNewCommunityFeature('');
                                }
                              }
                            }}
                            placeholder="Type a feature (e.g. 'Preschool for 240 Students', '114 m² Rooftop Terrace') and click Add"
                            className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (newCommunityFeature.trim()) {
                                setCommunityForm({
                                  ...communityForm,
                                  features: [...(communityForm.features || []), newCommunityFeature.trim()]
                                });
                                setNewCommunityFeature('');
                              }
                            }}
                            className="px-4 py-2 bg-gray-900 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer"
                          >
                            Add Feature
                          </button>
                        </div>
                      </div>

                      {/* 7. Description */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Project Description & Infrastructure</label>
                        <textarea
                          rows={4}
                          value={communityForm.description || ''}
                          onChange={(e) => setCommunityForm({ ...communityForm, description: e.target.value })}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-emerald-500 outline-none"
                          placeholder="Comprehensive description of the community architecture, master plan, and lifestyle..."
                        />
                      </div>

                      <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                        <button
                          type="button"
                          onClick={() => setEditingCommunityId(null)}
                          className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-7 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-colors"
                        >
                          Save Master Community & Update Live Website
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Master Communities Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {localCommunities.map((comm) => {
                    const photoCount = comm.galleryImages?.length || (comm.image ? 1 : 0);
                    return (
                      <div key={comm.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                        <div>
                          <div className="aspect-[16/10] relative overflow-hidden bg-gray-100 group">
                            <img src={comm.image} alt={comm.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-semibold">
                              {comm.location}
                            </div>
                            <div className="absolute bottom-2 right-2 bg-emerald-700/90 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 shadow-sm">
                              <ImageIcon className="w-3 h-3" />
                              {photoCount} Sawirro
                            </div>
                          </div>
                          <div className="p-4 space-y-2">
                            <div className="flex items-start justify-between gap-1">
                              <h3 className="font-bold text-base text-gray-900 leading-snug">{comm.name}</h3>
                            </div>
                            {comm.priceDisplay && (
                              <p className="text-xs font-bold text-emerald-600">{comm.priceDisplay}</p>
                            )}
                            <p className="text-xs text-gray-700 font-semibold">{comm.units}</p>
                            <p className="text-[11px] text-gray-500 line-clamp-2">{comm.description}</p>
                          </div>
                        </div>

                        <div className="p-4 pt-0">
                          <button
                            onClick={() => handleEditCommunity(comm)}
                            className="w-full py-2.5 bg-gray-900 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            Wax ka Beddel Mashruucan (Edit)
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: HERO & HOMEPAGE BANNER CMS (With Direct Laptop Upload) */}
            {activeTab === 'hero_settings' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-blue-600" />
                      Homepage Hero & Banner Slides
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Update the headline, Telesom Group subtitle badge, and upload custom high-resolution slides from your computer.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSaveSiteConfig} className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                  
                  {/* Hero Text Settings */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Top Badge / Slogan
                      </label>
                      <input
                        type="text"
                        value={configForm.hero.badge}
                        onChange={(e) => setConfigForm({
                          ...configForm,
                          hero: { ...configForm.hero, badge: e.target.value }
                        })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 outline-none focus:bg-white focus:border-blue-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Main Hero Title
                      </label>
                      <input
                        type="text"
                        value={configForm.hero.title}
                        onChange={(e) => setConfigForm({
                          ...configForm,
                          hero: { ...configForm.hero, title: e.target.value }
                        })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 outline-none focus:bg-white focus:border-blue-500 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Hero Subtitle & Description
                      </label>
                      <textarea
                        rows={3}
                        value={configForm.hero.subtitle}
                        onChange={(e) => setConfigForm({
                          ...configForm,
                          hero: { ...configForm.hero, subtitle: e.target.value }
                        })}
                        placeholder="e.g. Mashaariicda aad iibsan karto: Rugsan Gardens, Aragsan Village, Bilicsan Village & Masallaha Apartment..."
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 outline-none focus:bg-white focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Hero Slide Images (Laptop Upload for each Slide) */}
                  <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-4">
                    <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-blue-600" />
                      Hero Carousel Slides (Direct Computer Upload)
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {configForm.hero.heroImages.map((slide, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200 space-y-3">
                          <span className="text-xs font-bold text-blue-600 block">
                            Slide {idx + 1}: {slide.title}
                          </span>

                          <LaptopImageUploader
                            currentValue={slide.url}
                            onImageSelected={(newImg) => {
                              const updatedImages = [...configForm.hero.heroImages];
                              updatedImages[idx] = { ...updatedImages[idx], url: newImg };
                              setConfigForm({
                                ...configForm,
                                hero: { ...configForm.hero, heroImages: updatedImages }
                              });
                            }}
                            label=""
                            helperText="Choose photo from your computer"
                            aspectRatio="video"
                          />

                          <input
                            type="text"
                            value={slide.title}
                            onChange={(e) => {
                              const updatedImages = [...configForm.hero.heroImages];
                              updatedImages[idx] = { ...updatedImages[idx], title: e.target.value };
                              setConfigForm({
                                ...configForm,
                                hero: { ...configForm.hero, heroImages: updatedImages }
                              });
                            }}
                            placeholder="Slide Title"
                            className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900 outline-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setActiveTab('dashboard')}
                      className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Save Hero Settings
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 4: COMPANY INFO & CONTACTS */}
            {activeTab === 'company_info' && (
              <CompanyInfoTab
                config={configForm}
                onChange={(updatedConfig) => {
                  setConfigForm(updatedConfig);
                  onUpdateSiteConfig(updatedConfig);
                }}
                onSave={() => {
                  onUpdateSiteConfig(configForm);
                  triggerSaveNotification('Company profile, logo, and top bar successfully saved!');
                }}
                onBackToDashboard={() => setActiveTab('dashboard')}
              />
            )}

            {/* TAB: SITE TEXTS & WORDS (DHAAMAAN QORAALLADA) */}
            {activeTab === 'site_texts' && (
              <SiteTextsTab
                currentTranslations={activeTranslations}
                onSaveTranslations={(updated) => {
                  setActiveTranslations(updated);
                  saveCustomTranslations(updated);
                  if (onUpdateTranslations) {
                    onUpdateTranslations(updated);
                  }
                  triggerSaveNotification('Dhammaan qoraallada website-ka si toos ah ayaa loo cusboonaysiiyay!');
                }}
                onResetTranslations={() => {
                  const reset = resetTranslationsToDefault();
                  setActiveTranslations(reset);
                  if (onResetTranslations) {
                    onResetTranslations();
                  }
                  triggerSaveNotification('Qoraalladii asalka ahaa ayaa dib loo soo celiyay!');
                }}
                onBackToDashboard={() => setActiveTab('dashboard')}
              />
            )}

            {/* TAB 5: ABOUT KAABSAN & LEADERSHIP TEAM */}
            {activeTab === 'about_section' && (
              <AboutTab
                config={configForm}
                onChangeConfig={(updatedConfig) => {
                  setConfigForm(updatedConfig);
                  onUpdateSiteConfig(updatedConfig);
                }}
                teamMembers={teamMembers}
                onUpdateTeamMembers={(updated) => {
                  onUpdateTeamMembers(updated);
                  triggerSaveNotification('Executive leadership profiles successfully updated!');
                }}
                onSave={() => {
                  onUpdateSiteConfig(configForm);
                  triggerSaveNotification('About section & team profiles saved!');
                }}
                onBackToDashboard={() => setActiveTab('dashboard')}
              />
            )}

            {/* TAB 6: FAQS KNOWLEDGE BASE */}
            {activeTab === 'faqs' && (
              <FAQsTab
                config={configForm}
                onChangeConfig={(updatedConfig) => {
                  setConfigForm(updatedConfig);
                  onUpdateSiteConfig(updatedConfig);
                }}
                onSave={() => {
                  onUpdateSiteConfig(configForm);
                  triggerSaveNotification('Frequently Asked Questions (FAQs) saved!');
                }}
                onBackToDashboard={() => setActiveTab('dashboard')}
              />
            )}

            {/* TAB 7: TESTIMONIALS & REVIEWS */}
            {activeTab === 'testimonials' && (
              <TestimonialsTab
                testimonials={testimonials}
                onUpdateTestimonials={(updated) => {
                  onUpdateTestimonials(updated);
                  triggerSaveNotification('Client testimonials and verified ratings updated!');
                }}
                onBackToDashboard={() => setActiveTab('dashboard')}
              />
            )}

            {/* TAB 8: BLOG POSTS & PRESS ARTICLES */}
            {activeTab === 'blog_posts' && (
              <BlogPostsTab
                articles={pressArticles}
                onUpdateArticles={(updated) => {
                  onUpdatePressArticles(updated);
                  triggerSaveNotification('Articles and market insights updated!');
                }}
                onBackToDashboard={() => setActiveTab('dashboard')}
              />
            )}

            {/* TAB: UPCOMING PROJECTS PIPELINE */}
            {activeTab === 'upcoming_projects' && (
              <UpcomingProjectsTab
                upcomingProjects={localUpcomingProjects}
                onUpdateUpcomingProjects={(updatedProjects) => {
                  setLocalUpcomingProjects(updatedProjects);
                  if (onUpdateUpcomingProjects) {
                    onUpdateUpcomingProjects(updatedProjects);
                  }
                  try {
                    localStorage.setItem('kaabsan_upcoming_projects_data', JSON.stringify(updatedProjects));
                  } catch {}
                  triggerSaveNotification('Mashaariicda mustaqbalka si guul leh ayaa loo keydiyay!');
                }}
                onBackToDashboard={() => setActiveTab('dashboard')}
              />
            )}

            {/* TAB: EVENTS & SEMINARS */}
            {activeTab === 'events' && (
              <EventsTab
                events={localEvents}
                onUpdateEvents={(updatedEvents) => {
                  setLocalEvents(updatedEvents);
                  if (onUpdateEvents) {
                    onUpdateEvents(updatedEvents);
                  }
                  try {
                    localStorage.setItem('kaabsan_events_data', JSON.stringify(updatedEvents));
                  } catch {}
                  triggerSaveNotification('Munaasabadaha iyo xafladaha si guul leh ayaa loo keydiyay!');
                }}
                onBackToDashboard={() => setActiveTab('dashboard')}
              />
            )}

            {/* TAB: WHATSAPP TEMPLATES */}
            {activeTab === 'whatsapp_templates' && (
              <WhatsAppTemplatesTab
                siteConfig={configForm}
                onUpdateSiteConfig={(updatedConfig) => {
                  setConfigForm(updatedConfig);
                  onUpdateSiteConfig(updatedConfig);
                  triggerSaveNotification('Fariimaha WhatsApp-ka si guul leh ayaa loo keydiyay!');
                }}
                onBackToDashboard={() => setActiveTab('dashboard')}
              />
            )}

            {/* TAB 9: FINANCING TERMS & ZAAD MERCHANT */}
            {activeTab === 'financing' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-emerald-600" />
                      5-Year Financing Schedule & Zaad Merchant Config
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Configure 5-Year (60 Months) installment terms, 30% Down Payment percentages, and corporate bank routing.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSaveSiteConfig} className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Installment Duration (Years)</label>
                      <input
                        type="number"
                        value={configForm.financing.years}
                        onChange={(e) => setConfigForm({
                          ...configForm,
                          financing: { ...configForm.financing, years: Number(e.target.value) }
                        })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 font-bold outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Total Duration (Months)</label>
                      <input
                        type="number"
                        value={configForm.financing.months}
                        onChange={(e) => setConfigForm({
                          ...configForm,
                          financing: { ...configForm.financing, months: Number(e.target.value) }
                        })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 font-bold outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Required Down Payment (%)</label>
                      <input
                        type="number"
                        value={configForm.financing.downPaymentPercent}
                        onChange={(e) => setConfigForm({
                          ...configForm,
                          financing: { ...configForm.financing, downPaymentPercent: Number(e.target.value) }
                        })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 font-bold outline-none"
                      />
                    </div>
                  </div>

                  {/* Payment Accounts */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-5">
                    <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-emerald-600" />
                      Akoonnada Lacag-bixinta & Bangiyada (Zaad, E-Dahab & Commercial Banks)
                    </h3>

                    {/* DSB Project Accounts */}
                    <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200 space-y-3">
                      <p className="text-xs font-bold text-amber-900 uppercase">Dara-Salaam Bank — Akoonnada Mashaariicda (Project Specific)</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-gray-700 mb-1">Masallaha Apartments</label>
                          <input
                            type="text"
                            value={configForm.company.projectAccounts?.masalaha || '64713269'}
                            onChange={(e) => setConfigForm({
                              ...configForm,
                              company: {
                                ...configForm.company,
                                projectAccounts: {
                                  ...(configForm.company.projectAccounts || { masalaha: '64713269', aragsan: '61043988', rugsan: '61131900', bilicsan: '61043977' }),
                                  masalaha: e.target.value
                                }
                              }
                            })}
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-mono font-bold text-gray-900 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-700 mb-1">Aragsan Village</label>
                          <input
                            type="text"
                            value={configForm.company.projectAccounts?.aragsan || '61043988'}
                            onChange={(e) => setConfigForm({
                              ...configForm,
                              company: {
                                ...configForm.company,
                                projectAccounts: {
                                  ...(configForm.company.projectAccounts || { masalaha: '64713269', aragsan: '61043988', rugsan: '61131900', bilicsan: '61043977' }),
                                  aragsan: e.target.value
                                }
                              }
                            })}
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-mono font-bold text-gray-900 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-700 mb-1">Rugsan Gardens</label>
                          <input
                            type="text"
                            value={configForm.company.projectAccounts?.rugsan || '61131900'}
                            onChange={(e) => setConfigForm({
                              ...configForm,
                              company: {
                                ...configForm.company,
                                projectAccounts: {
                                  ...(configForm.company.projectAccounts || { masalaha: '64713269', aragsan: '61043988', rugsan: '61131900', bilicsan: '61043977' }),
                                  rugsan: e.target.value
                                }
                              }
                            })}
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-mono font-bold text-gray-900 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-700 mb-1">Bilicsan Village</label>
                          <input
                            type="text"
                            value={configForm.company.projectAccounts?.bilicsan || '61043977'}
                            onChange={(e) => setConfigForm({
                              ...configForm,
                              company: {
                                ...configForm.company,
                                projectAccounts: {
                                  ...(configForm.company.projectAccounts || { masalaha: '64713269', aragsan: '61043988', rugsan: '61131900', bilicsan: '61043977' }),
                                  bilicsan: e.target.value
                                }
                              }
                            })}
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-mono font-bold text-gray-900 outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* General Accounts */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Dahabshiil Bank (General Account)</label>
                        <input
                          type="text"
                          value={configForm.company.banks.dahabshiil}
                          onChange={(e) => setConfigForm({
                            ...configForm,
                            company: {
                              ...configForm.company,
                              banks: { ...configForm.company.banks, dahabshiil: e.target.value }
                            }
                          })}
                          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 font-mono outline-none font-bold"
                        />
                        <span className="text-[10px] text-gray-500">General account for all projects</span>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Premier Bank (General Account)</label>
                        <input
                          type="text"
                          value={configForm.company.banks.premier}
                          onChange={(e) => setConfigForm({
                            ...configForm,
                            company: {
                              ...configForm.company,
                              banks: { ...configForm.company.banks, premier: e.target.value }
                            }
                          })}
                          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 font-mono outline-none font-bold"
                        />
                        <span className="text-[10px] text-gray-500">General account for all projects</span>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Zaad Ku-Iibso (Merchant Number)</label>
                        <input
                          type="text"
                          value={configForm.company.zaadMerchant}
                          onChange={(e) => setConfigForm({
                            ...configForm,
                            company: { ...configForm.company, zaadMerchant: e.target.value }
                          })}
                          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-emerald-700 font-mono font-bold outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">E-Dahab Ku-Iibso (Merchant Number)</label>
                        <input
                          type="text"
                          value={configForm.company.edahabMerchant || '735777'}
                          onChange={(e) => setConfigForm({
                            ...configForm,
                            company: { ...configForm.company, edahabMerchant: e.target.value }
                          })}
                          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-orange-700 font-mono font-bold outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Save Financing & Zaad Terms
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 10: PAYMENTS & VERIFICATIONS */}
            {activeTab === 'payments' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-emerald-600" />
                      Payment Submissions (Zaad & Bank Receipts)
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Verify and approve down payment or installment slips submitted by customers via Zaad Merchant (6100090) or wire transfers.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase text-[10px] tracking-wider">
                        <tr>
                          <th className="p-4">Customer</th>
                          <th className="p-4">Property / Reference</th>
                          <th className="p-4">Method & Ref Number</th>
                          <th className="p-4">Amount ($ USD)</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Verification Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {paymentSubmissions.map((pay) => (
                          <tr key={pay.id} className="hover:bg-gray-50/50">
                            <td className="p-4">
                              <span className="font-bold text-gray-900 block">{pay.customerName}</span>
                              <span className="text-[11px] text-gray-500">{pay.customerPhone}</span>
                            </td>
                            <td className="p-4">
                              <span className="font-semibold text-gray-800 block">{pay.propertyTitle}</span>
                              <span className="text-[10px] text-gray-400">{pay.date}</span>
                            </td>
                            <td className="p-4">
                              <span className="font-mono text-xs uppercase text-blue-700 font-bold block">{pay.paymentMethod}</span>
                              <span className="font-mono text-[11px] text-gray-600">Ref: {pay.transactionRef}</span>
                            </td>
                            <td className="p-4 font-bold text-sm text-gray-900 font-serif">
                              ${pay.amount.toLocaleString()}
                            </td>
                            <td className="p-4">
                              <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                                pay.status === 'Verified'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : pay.status === 'Rejected'
                                  ? 'bg-rose-100 text-rose-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}>
                                {pay.status}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleTogglePaymentStatus(pay.id, 'Verified')}
                                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                                >
                                  Approve & Verify
                                </button>
                                <button
                                  onClick={() => handleTogglePaymentStatus(pay.id, 'Rejected')}
                                  className="px-2.5 py-1 bg-gray-100 hover:bg-rose-50 hover:text-rose-700 text-gray-600 rounded-lg text-xs font-semibold cursor-pointer"
                                >
                                  Reject
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 8: DOCUMENTS & PDFS */}
            {activeTab === 'documents' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-purple-600" />
                      Brochures & Metric Blueprints Manager (m²)
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Manage official project brochures, floor plans with metric measurements (m²), and cadastral master site plans.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setEditingDocId(null);
                      setDocForm({
                        title: '',
                        projectName: 'Rugsan Gardens',
                        type: 'Brochure',
                        fileSize: '4.5 MB (PDF)',
                        fileUrl: '',
                        coverImage: '',
                        pageCount: 16,
                        brochureKey: 'rugsan',
                        description: ''
                      });
                      setIsAddingDoc(true);
                    }}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Add New Document
                  </button>
                </div>

                {isAddingDoc && (
                  <div className="bg-white p-6 rounded-2xl border-2 border-purple-500 shadow-lg space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-purple-600" />
                        {editingDocId ? 'Edit Brochure / Document' : 'Add / Upload New Brochure or PDF Document'}
                      </h3>
                      <button
                        type="button"
                        onClick={() => setIsAddingDoc(false)}
                        className="text-gray-400 hover:text-gray-600 p-1"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveDocument} className="space-y-4">
                      {/* Document File Uploader */}
                      <LaptopDocumentUploader
                        currentFileUrl={docForm.fileUrl}
                        currentFileSize={docForm.fileSize}
                        currentFileName={docForm.title}
                        onDocumentSelected={({ fileUrl, fileSize, fileName }) => {
                          setDocForm((prev) => ({
                            ...prev,
                            fileUrl,
                            fileSize,
                            title: prev.title || fileName || prev.title
                          }));
                        }}
                        label="Brochure PDF File"
                        helperText="Upload from your device (Laptop/Phone) or enter direct link"
                      />

                      {/* Cover Image Uploader */}
                      <LaptopImageUploader
                        currentImage={docForm.coverImage}
                        onImageSelected={(url) => setDocForm((prev) => ({ ...prev, coverImage: url }))}
                        label="Brochure Cover Image"
                        helperText="Upload cover image preview for the document center card"
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">Document Title</label>
                          <input
                            type="text"
                            required
                            value={docForm.title || ''}
                            onChange={(e) => setDocForm({ ...docForm, title: e.target.value })}
                            placeholder="e.g. Rugsan Gardens 2026 Master Brochure"
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 outline-none focus:border-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">Project Name</label>
                          <select
                            value={docForm.projectName || 'Rugsan Gardens'}
                            onChange={(e) => setDocForm({ ...docForm, projectName: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 outline-none focus:border-purple-500"
                          >
                            <option value="Rugsan Gardens">Rugsan Gardens (Masallaha)</option>
                            <option value="Aragsan Village">Aragsan Village (Buurta Kala-jeexan)</option>
                            <option value="Bilicsan Village">Bilicsan Village</option>
                            <option value="Masallaha Apartments">Masallaha Apartments</option>
                            <option value="Kaabsan Batching Plant">Kaabsan Ready-Mix Plant</option>
                            <option value="Kaabsan Corporate">Kaabsan Corporate</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">Type</label>
                          <select
                            value={docForm.type || 'Brochure'}
                            onChange={(e) => setDocForm({ ...docForm, type: e.target.value as any })}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 outline-none focus:border-purple-500"
                          >
                            <option value="Brochure">Brochure</option>
                            <option value="Site Plan">Site Plan</option>
                            <option value="Floor Plan">Floor Plan</option>
                            <option value="Financing Guide">Financing Guide</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">Interactive Brochure Booklet Preset</label>
                          <select
                            value={docForm.brochureKey || 'rugsan'}
                            onChange={(e) => setDocForm({ ...docForm, brochureKey: e.target.value as any })}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 outline-none focus:border-purple-500"
                          >
                            <option value="rugsan">Rugsan Gardens (Masallaha Corridor)</option>
                            <option value="aragsan">Aragsan Village (Buurta Kala-jeexan)</option>
                            <option value="bilicsan">Bilicsan Village (Airport Highway)</option>
                            <option value="masallaha">Masallaha Luxury Apartments</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">Page Count</label>
                          <input
                            type="number"
                            min="1"
                            max="64"
                            value={docForm.pageCount || 16}
                            onChange={(e) => setDocForm({ ...docForm, pageCount: Number(e.target.value) })}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 outline-none focus:border-purple-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                        <input
                          type="text"
                          value={docForm.description || ''}
                          onChange={(e) => setDocForm({ ...docForm, description: e.target.value })}
                          placeholder="Summary of architectural plans, metric room layouts (m²), and payment schedules..."
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 outline-none focus:border-purple-500"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                        <button
                          type="button"
                          onClick={() => setIsAddingDoc(false)}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-xs font-semibold cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold cursor-pointer shadow-sm flex items-center gap-1.5"
                        >
                          <Check className="w-4 h-4" />
                          <span>{editingDocId ? 'Save Changes' : 'Save & Publish Brochure'}</span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {documents.map((doc) => {
                    const hasCustomFile = doc.fileUrl && doc.fileUrl !== '#' && !doc.fileUrl.startsWith('data:text/plain');
                    return (
                      <div key={doc.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between group">
                        {/* Cover image & quick change */}
                        <div className="h-40 bg-gray-100 relative overflow-hidden group/img">
                          <img 
                            src={doc.coverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'} 
                            alt={doc.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                            <label className="px-3 py-1.5 bg-white/90 hover:bg-white text-gray-900 rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5">
                              <ImageIcon className="w-3.5 h-3.5 text-purple-600" />
                              <span>Change Cover Photo</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    handleDirectCoverUploadForDoc(doc.id, e.target.files[0]);
                                  }
                                }}
                              />
                            </label>
                          </div>

                          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                            <span className="px-2 py-0.5 rounded bg-black/75 text-white font-bold text-[10px]">
                              {doc.type}
                            </span>
                            {hasCustomFile ? (
                              <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-bold text-[10px] flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> Real PDF Attached
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded bg-purple-600 text-white font-bold text-[10px]">
                                {doc.pageCount || 16} Pages
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase text-purple-700 tracking-wider block">
                              {doc.projectName}
                            </span>
                            <h4 className="font-bold text-sm text-gray-900 line-clamp-1">{doc.title}</h4>
                            <p className="text-xs text-gray-500 line-clamp-2">{doc.description}</p>
                            <div className="flex items-center gap-2 text-[11px] font-mono text-gray-400 mt-1">
                              <span>{doc.fileSize}</span>
                              <span>•</span>
                              <span>{doc.updatedAt}</span>
                            </div>
                          </div>

                          {/* 1-Click Upload Real PDF Button */}
                          <div className="pt-2 border-t border-gray-100">
                            <label className={`w-full py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                              hasCustomFile
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                                : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
                            }`}>
                              <Upload className="w-3.5 h-3.5" />
                              <span>{hasCustomFile ? 'Replace Uploaded PDF File' : 'Upload Real PDF from Laptop'}</span>
                              <input
                                type="file"
                                accept=".pdf,application/pdf"
                                className="hidden"
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    handleDirectFileUploadForDoc(doc.id, e.target.files[0]);
                                  }
                                }}
                              />
                            </label>
                          </div>

                          <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-1">
                            <button
                              type="button"
                              onClick={() => setPreviewDocForAdmin(doc)}
                              className="px-2.5 py-1.5 bg-gray-50 hover:bg-purple-50 text-purple-700 border border-purple-100 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>Preview</span>
                            </button>

                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => handleEditDocument(doc)}
                                className="p-1.5 text-gray-500 hover:text-purple-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                                title="Edit Document Metadata"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteDocument(doc.id)}
                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                title="Delete Document"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 9: LEADS & TOUR APPOINTMENTS */}
            {activeTab === 'leads' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Firebase Firestore: Live Synced
                      </span>
                      <span className="text-xs text-gray-500">
                        Total Leads: <strong className="text-gray-900">{leads.length}</strong>
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <Users className="w-5 h-5 text-amber-600" />
                      Macaamiisha & Ballamaha Kormeerka (Customer Leads & Inquiries)
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Dhammaan macaamiisha codsiyada kormeerka, xogta qiimaha, ama iibsashada guryaha kasoo dhiibta webka.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-auto">
                    <button
                      onClick={() => {
                        const csvHeader = 'Name,Phone,Email,Property,Status,Date,Message\n';
                        const csvRows = leads.map(l => 
                          `"${l.name}","${l.phone}","${l.email || ''}","${l.propertyName || ''}","${l.status}","${l.timestamp}","${(l.message || '').replace(/"/g, '""')}"`
                        ).join('\n');
                        const blob = new Blob([csvHeader + csvRows], { type: 'text/csv;charset=utf-8;' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `kaabsan_leads_${new Date().toISOString().slice(0, 10)}.csv`;
                        a.click();
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                      id="export-leads-csv"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Export CSV (Excel)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {leads.map((lead) => (
                    <div key={lead.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-gray-900">{lead.name}</span>
                          <span className="text-[10px] text-gray-400 font-mono">{lead.timestamp}</span>
                        </div>

                        <div className="space-y-1 text-xs text-gray-600">
                          <div className="flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-blue-600" />
                            <a href={`tel:${lead.phone}`} className="hover:underline font-mono font-medium">{lead.phone}</a>
                          </div>
                          {lead.email && (
                            <div className="flex items-center gap-1.5">
                              <Mail className="w-3.5 h-3.5 text-gray-400" />
                              <span className="truncate">{lead.email}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-[#C2A55D]" />
                            <span className="font-semibold text-gray-800">{lead.propertyName || 'General Inquiry'}</span>
                          </div>
                        </div>

                        {lead.message && (
                          <p className="text-xs bg-[#F9F8F6] p-2.5 rounded-xl border border-[#E5E2DA] text-gray-700 italic">
                            "{lead.message}"
                          </p>
                        )}
                      </div>

                      <div className="pt-3 border-t border-gray-100 space-y-2">
                        {/* Status update selector */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] text-gray-400 uppercase font-semibold">Xaaladda:</span>
                          <select
                            value={lead.status}
                            onChange={async (e) => {
                              const newStatus = e.target.value;
                              const updated = leads.map(l => l.id === lead.id ? { ...l, status: newStatus } : l);
                              onUpdateLeads(updated);
                              try {
                                const fbStatus = newStatus.toLowerCase().includes('contact') ? 'contacted' : 
                                                 newStatus.toLowerCase().includes('tour') ? 'tour_scheduled' : 
                                                 newStatus.toLowerCase().includes('close') || newStatus.toLowerCase().includes('deal') ? 'closed_deal' : 
                                                 newStatus.toLowerCase().includes('cancel') ? 'cancelled' : 'new';
                                await updateLeadStatusInFirestore(lead.id, fbStatus as any);
                              } catch {
                                // ignore
                              }
                            }}
                            className="text-xs py-1 px-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 font-medium focus:ring-1 focus:ring-amber-500 cursor-pointer"
                          >
                            <option value="New Inquiry">New Inquiry</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Tour Scheduled">Tour Scheduled</option>
                            <option value="Closed Deal">Closed Deal</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-1">
                          <button
                            onClick={async () => {
                              if (window.confirm(`Ma hubtaa inaad tirtirto codsigan macmiilka (${lead.name})?`)) {
                                const updated = leads.filter(l => l.id !== lead.id);
                                onUpdateLeads(updated);
                                try {
                                  await deleteLeadFromFirestore(lead.id);
                                } catch {
                                  // ignore
                                }
                              }
                            }}
                            className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Tirtir
                          </button>

                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Asc ${lead.name}, waxaan ahay kooxda iibka & adeegga macaamiisha ee Kaabsan Real Estate (Telesom Group). Waxaan helnay codsigaagii ku saabsanaa ${lead.propertyName || 'guryaha Kaabsan'}. Sidee ayaan kuugu caawin karnaa maanta?`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                            WhatsApp Macmiilka →
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </main>

        </div>
      )}

      {/* Brochure Reader Modal for Admin Preview */}
      <BrochureReaderModal
        document={previewDocForAdmin}
        isOpen={!!previewDocForAdmin}
        onClose={() => setPreviewDocForAdmin(null)}
      />

    </div>
  );
};
