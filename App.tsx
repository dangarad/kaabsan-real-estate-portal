import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MasterCommunitiesSection } from './components/MasterCommunitiesSection';
import { PropertyListings } from './components/PropertyListings';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { FloatingLanguageWidget } from './components/FloatingLanguageWidget';
import { Footer } from './components/Footer';
import { EVENTS_DATA, KaabsanEvent } from './components/EventsPage';
import { UPCOMING_PROJECTS_DATA, UpcomingProject } from './components/UpcomingProjectsPage';

// Code-split Lazy Loaded Lower Sections for fast First Contentful Paint
const NotableSalesSection = lazy(() => import('./components/NotableSalesSection').then(m => ({ default: m.NotableSalesSection })));
const AboutSection = lazy(() => import('./components/AboutSection').then(m => ({ default: m.AboutSection })));
const PressSection = lazy(() => import('./components/PressSection').then(m => ({ default: m.PressSection })));
const ValuationSection = lazy(() => import('./components/ValuationSection').then(m => ({ default: m.ValuationSection })));
const FAQSection = lazy(() => import('./components/FAQSection').then(m => ({ default: m.FAQSection })));
const TestimonialsSection = lazy(() => import('./components/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })));
const NeighborhoodsSection = lazy(() => import('./components/NeighborhoodsSection').then(m => ({ default: m.NeighborhoodsSection })));

// Code-split Lazy Loaded Pages & Heavy Modals
const AdminPanel = lazy(() => import('./components/AdminPanel').then(m => ({ default: m.AdminPanel })));
const ProjectDetailPage = lazy(() => import('./components/ProjectDetailPage').then(m => ({ default: m.ProjectDetailPage })));
const GalleryPage = lazy(() => import('./components/GalleryPage').then(m => ({ default: m.GalleryPage })));
const BlogPage = lazy(() => import('./components/BlogPage').then(m => ({ default: m.BlogPage })));
const BuyPage = lazy(() => import('./components/BuyPage').then(m => ({ default: m.BuyPage })));
const PropertyManagementPage = lazy(() => import('./components/PropertyManagementPage').then(m => ({ default: m.PropertyManagementPage })));
const SellPage = lazy(() => import('./components/SellPage').then(m => ({ default: m.SellPage })));
const AboutPage = lazy(() => import('./components/AboutPage').then(m => ({ default: m.AboutPage })));
const EventsPage = lazy(() => import('./components/EventsPage').then(m => ({ default: m.EventsPage })));
const UpcomingProjectsPage = lazy(() => import('./components/UpcomingProjectsPage').then(m => ({ default: m.UpcomingProjectsPage })));
const DocumentCenter = lazy(() => import('./components/DocumentCenter').then(m => ({ default: m.DocumentCenter })));

// Code-split Modals
const PropertyDetailModal = lazy(() => import('./components/PropertyDetailModal').then(m => ({ default: m.PropertyDetailModal })));
const AIAdvisorModal = lazy(() => import('./components/AIAdvisorModal').then(m => ({ default: m.AIAdvisorModal })));
const SavedFavoritesModal = lazy(() => import('./components/SavedFavoritesModal').then(m => ({ default: m.SavedFavoritesModal })));
const ScheduleTourModal = lazy(() => import('./components/ScheduleTourModal').then(m => ({ default: m.ScheduleTourModal })));
const ContactModal = lazy(() => import('./components/ContactModal').then(m => ({ default: m.ContactModal })));
const FinancingCalculatorModal = lazy(() => import('./components/FinancingCalculatorModal').then(m => ({ default: m.FinancingCalculatorModal })));
const DirectPaymentModal = lazy(() => import('./components/DirectPaymentModal').then(m => ({ default: m.DirectPaymentModal })));

import { PROPERTIES as INITIAL_PROPERTIES, MASTER_COMMUNITIES as INITIAL_MASTER_COMMUNITIES, TEAM as INITIAL_TEAM, PRESS as INITIAL_PRESS } from './data/properties';
import { INITIAL_DOCUMENTS, INITIAL_PAYMENT_SUBMISSIONS, INITIAL_LEADS, INITIAL_TESTIMONIALS } from './data/mockAdminData';
import { INITIAL_SITE_CONFIG } from './data/siteConfig';
import { Property, DocumentResource, PaymentSubmission, LeadInquiry, MasterCommunity, SiteConfig, TeamMember, TestimonialItem, PressArticle } from './types';
import { loadMergedProperties, loadMergedMasterCommunities, loadMergedSiteConfig, loadMergedTeamMembers, loadMergedDocuments } from './utils/storageMigration';
import { Language, TranslationDictionary, loadMergedTranslations } from './utils/translations';
import { 
  subscribeToLeadsFromFirestore,
  subscribeToPropertiesFromFirestore,
  subscribeToMasterCommunitiesFromFirestore,
  subscribeToSiteConfigFromFirestore,
  subscribeToDocumentsFromFirestore,
  savePropertiesToFirestore,
  saveMasterCommunitiesToFirestore,
  saveSiteConfigToFirestore,
  saveDocumentsToFirestore
} from './lib/firebase';

export default function App() {
  const [activeTab, setActiveTab] = useState('properties');
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD');
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem('kaabsan_language');
      return (stored as Language) || 'en';
    } catch {
      return 'en';
    }
  });

  // Dynamic Translations state (persisted in localStorage and editable via Admin)
  const [translationsData, setTranslationsData] = useState<Record<Language, TranslationDictionary>>(() => {
    return loadMergedTranslations();
  });

  useEffect(() => {
    const handleTranslationsUpdated = () => {
      setTranslationsData(loadMergedTranslations());
    };
    window.addEventListener('kaabsan_translations_updated', handleTranslationsUpdated);
    return () => window.removeEventListener('kaabsan_translations_updated', handleTranslationsUpdated);
  }, []);
  
  // Manage dynamic site config (Hero, contacts, Zaad merchant, financing, FAQs)
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    return loadMergedSiteConfig(INITIAL_SITE_CONFIG);
  });

  // Manage master communities (Rugsan, Aragsan, Bilicsan, Masallaha)
  const [masterCommunitiesList, setMasterCommunitiesList] = useState<MasterCommunity[]>(() => {
    return loadMergedMasterCommunities(INITIAL_MASTER_COMMUNITIES);
  });

  // Manage dynamic editable properties (persisted to localStorage)
  const [propertiesList, setPropertiesList] = useState<Property[]>(() => {
    return loadMergedProperties(INITIAL_PROPERTIES);
  });

  // Manage documents / blueprints (Brochures and site plans)
  const [documentsList, setDocumentsList] = useState<DocumentResource[]>(() => {
    return loadMergedDocuments(INITIAL_DOCUMENTS);
  });

  // Manage Payment submissions
  const [paymentsList, setPaymentsList] = useState<PaymentSubmission[]>(() => {
    try {
      const stored = localStorage.getItem('kaabsan_payment_submissions');
      return stored ? JSON.parse(stored) : INITIAL_PAYMENT_SUBMISSIONS;
    } catch {
      return INITIAL_PAYMENT_SUBMISSIONS;
    }
  });

  // Manage Leads & Tour Requests
  const [leadsList, setLeadsList] = useState<LeadInquiry[]>(() => {
    try {
      const stored = localStorage.getItem('kaabsan_leads_data');
      return stored ? JSON.parse(stored) : INITIAL_LEADS;
    } catch {
      return INITIAL_LEADS;
    }
  });

  // Real-time Firestore sync for Leads
  useEffect(() => {
    const unsubscribe = subscribeToLeadsFromFirestore((cloudLeads) => {
      if (cloudLeads && cloudLeads.length > 0) {
        setLeadsList((prev) => {
          const map = new Map<string, LeadInquiry>();
          // local first
          prev.forEach(l => map.set(l.id, l));
          // firestore overrides/merges
          cloudLeads.forEach(cl => {
            if (cl.id) {
              map.set(cl.id, {
                id: cl.id,
                name: cl.fullName,
                phone: cl.phone,
                email: cl.email,
                propertyName: cl.propertyTitle || 'General Inquiry',
                status: cl.status === 'new' ? 'New Inquiry' : cl.status === 'contacted' ? 'Contacted' : cl.status === 'scheduled' ? 'Tour Scheduled' : 'Closed Deal',
                timestamp: cl.createdAt ? new Date(cl.createdAt).toLocaleString() : new Date().toLocaleString(),
                message: cl.message || ''
              });
            }
          });
          const merged = Array.from(map.values());
          try {
            localStorage.setItem('kaabsan_leads_data', JSON.stringify(merged));
          } catch {
            // ignore
          }
          return merged;
        });
      }
    });

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  // Manage Leadership Team Members (Persisted)
  const [teamMembersList, setTeamMembersList] = useState<TeamMember[]>(() => {
    return loadMergedTeamMembers(INITIAL_TEAM);
  });

  // Manage Testimonials & Reviews (Persisted)
  const [testimonialsList, setTestimonialsList] = useState<TestimonialItem[]>(() => {
    try {
      const stored = localStorage.getItem('kaabsan_testimonials');
      return stored ? JSON.parse(stored) : INITIAL_TESTIMONIALS;
    } catch {
      return INITIAL_TESTIMONIALS;
    }
  });

  // Manage Press & Media Blog Posts (Persisted)
  const [pressArticlesList, setPressArticlesList] = useState<PressArticle[]>(() => {
    try {
      const stored = localStorage.getItem('kaabsan_press_articles');
      return stored ? JSON.parse(stored) : INITIAL_PRESS;
    } catch {
      return INITIAL_PRESS;
    }
  });

  // Manage Events & Galas (Persisted)
  const [eventsList, setEventsList] = useState<KaabsanEvent[]>(() => {
    try {
      const stored = localStorage.getItem('kaabsan_events_data');
      return stored ? JSON.parse(stored) : EVENTS_DATA;
    } catch {
      return EVENTS_DATA;
    }
  });

  // Manage Upcoming Projects Pipeline (Persisted)
  const [upcomingProjectsList, setUpcomingProjectsList] = useState<UpcomingProject[]>(() => {
    try {
      const stored = localStorage.getItem('kaabsan_upcoming_projects_data');
      return stored ? JSON.parse(stored) : UPCOMING_PROJECTS_DATA;
    } catch {
      return UPCOMING_PROJECTS_DATA;
    }
  });

  const handleUpdateEvents = (updated: KaabsanEvent[]) => {
    setEventsList(updated);
    try {
      localStorage.setItem('kaabsan_events_data', JSON.stringify(updated));
    } catch {}
  };

  const handleUpdateUpcomingProjects = (updated: UpcomingProject[]) => {
    setUpcomingProjectsList(updated);
    try {
      localStorage.setItem('kaabsan_upcoming_projects_data', JSON.stringify(updated));
    } catch {}
  };

  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('kaabsan_saved_properties');
      return stored ? JSON.parse(stored) : ['kaabsan-01', 'kaabsan-02'];
    } catch {
      return ['kaabsan-01', 'kaabsan-02'];
    }
  });

  // Modal States
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [isAIAdvisorOpen, setIsAIAdvisorOpen] = useState(false);
  const [aiAdvisorQuery, setAiAdvisorQuery] = useState('');
  const [aiAdvisorProperty, setAiAdvisorProperty] = useState<Property | null>(null);

  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);

  const [isScheduleTourOpen, setIsScheduleTourOpen] = useState(false);
  const [tourTargetProperty, setTourTargetProperty] = useState<Property | null>(null);

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactMessage, setContactMessage] = useState('');

  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [calculatorProperty, setCalculatorProperty] = useState<Property | null>(null);

  // Payment & Admin Modals
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentPropertyTitle, setPaymentPropertyTitle] = useState('Rugsan Gardens Executive Townhouse');

  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Check URL hash / pathname for direct admin routing (e.g. /#admin or /admin) or project routing (#project/rugsan-gardens)
  useEffect(() => {
    const handleHashCheck = () => {
      const hash = window.location.hash.toLowerCase();
      const pathname = window.location.pathname.toLowerCase();

      const isDirectAdmin = 
        hash === '#admin' || 
        hash === '#/admin' || 
        hash === '#/admin/login' || 
        hash === '#admin/login' || 
        hash === '#login' || 
        pathname === '/admin' || 
        pathname === '/admin/login' ||
        pathname.endsWith('/admin') ||
        pathname.endsWith('/admin/login');
      setIsAdminPanelOpen(isDirectAdmin);

      if (hash.startsWith('#project/')) {
        const pId = hash.replace('#project/', '').trim();
        setSelectedProjectId(pId);
      } else if (hash === '#rugsan-gardens' || hash === '#aragsan-village' || hash === '#bilicsan-village' || hash === '#bilicsan-estate' || hash === '#masalaha-apartments') {
        setSelectedProjectId(hash.replace('#', '').trim());
      } else if (!hash.includes('project')) {
        // If user navigated away from project hash
        if (hash === '' || hash === '#home' || hash === '#properties') {
          setSelectedProjectId(null);
        }
      }
    };
    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    window.addEventListener('popstate', handleHashCheck);
    return () => {
      window.removeEventListener('hashchange', handleHashCheck);
      window.removeEventListener('popstate', handleHashCheck);
    };
  }, []);

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    window.location.hash = `project/${projectId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromProject = () => {
    setSelectedProjectId(null);
    window.location.hash = 'master-projects';
    const el = document.getElementById('master-projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCloseAdmin = () => {
    setIsAdminPanelOpen(false);
    if (window.location.hash.toLowerCase().includes('admin') || window.location.hash.toLowerCase().includes('login')) {
      window.location.hash = '';
    }
    if (window.location.pathname.toLowerCase().includes('/admin')) {
      window.history.pushState(null, '', '/');
    }
  };

  // Global Search / Filter State
  const [filterState, setFilterState] = useState({
    neighborhood: 'All',
    priceRange: 'All',
    beds: 'All',
    style: 'All',
    keyword: ''
  });

  // Real-time Firestore sync for Properties, Communities, and Site Config
  useEffect(() => {
    const unsubProperties = subscribeToPropertiesFromFirestore((cloudProps) => {
      if (cloudProps && cloudProps.length > 0) {
        setPropertiesList(cloudProps);
        try {
          localStorage.setItem('kaabsan_current_properties', JSON.stringify(cloudProps));
          localStorage.setItem('kaabsan_properties_v9', JSON.stringify(cloudProps));
        } catch {
          // ignore
        }
      }
    });

    const unsubCommunities = subscribeToMasterCommunitiesFromFirestore((cloudComm) => {
      if (cloudComm && cloudComm.length > 0) {
        setMasterCommunitiesList(cloudComm);
        try {
          localStorage.setItem('kaabsan_current_communities', JSON.stringify(cloudComm));
          localStorage.setItem('kaabsan_master_communities_v9', JSON.stringify(cloudComm));
        } catch {
          // ignore
        }
      }
    });

    const unsubConfig = subscribeToSiteConfigFromFirestore((cloudConfig) => {
      if (cloudConfig && cloudConfig.company) {
        setSiteConfig(cloudConfig);
        try {
          localStorage.setItem('kaabsan_current_site_config', JSON.stringify(cloudConfig));
          localStorage.setItem('kaabsan_site_config_v9', JSON.stringify(cloudConfig));
        } catch {
          // ignore
        }
      }
    });

    const unsubDocuments = subscribeToDocumentsFromFirestore((cloudDocs) => {
      if (cloudDocs && Array.isArray(cloudDocs)) {
        setDocumentsList(cloudDocs);
        try {
          localStorage.setItem('kaabsan_current_documents', JSON.stringify(cloudDocs));
          localStorage.setItem('kaabsan_documents_v11', JSON.stringify(cloudDocs));
        } catch {
          // ignore
        }
      }
    });

    return () => {
      if (typeof unsubProperties === 'function') unsubProperties();
      if (typeof unsubCommunities === 'function') unsubCommunities();
      if (typeof unsubConfig === 'function') unsubConfig();
      if (typeof unsubDocuments === 'function') unsubDocuments();
    };
  }, []);

  // Persist properties
  const handleUpdateProperties = (updated: Property[]) => {
    setPropertiesList(updated);
    try {
      localStorage.setItem('kaabsan_current_properties', JSON.stringify(updated));
      localStorage.setItem('kaabsan_properties_v9', JSON.stringify(updated));
    } catch (e) {
      // ignore
    }
    savePropertiesToFirestore(updated);
  };

  // Persist site config
  const handleUpdateSiteConfig = (updated: SiteConfig) => {
    setSiteConfig(updated);
    try {
      localStorage.setItem('kaabsan_current_site_config', JSON.stringify(updated));
      localStorage.setItem('kaabsan_site_config_v9', JSON.stringify(updated));
    } catch (e) {
      // ignore
    }
    saveSiteConfigToFirestore(updated);
  };

  // Persist master communities
  const handleUpdateMasterCommunities = (updated: MasterCommunity[]) => {
    setMasterCommunitiesList(updated);
    try {
      localStorage.setItem('kaabsan_current_communities', JSON.stringify(updated));
      localStorage.setItem('kaabsan_master_communities_v9', JSON.stringify(updated));
    } catch (e) {
      // ignore
    }
    saveMasterCommunitiesToFirestore(updated);
  };

  // Persist documents
  const handleUpdateDocuments = (updated: DocumentResource[]) => {
    setDocumentsList(updated);
    try {
      localStorage.setItem('kaabsan_current_documents', JSON.stringify(updated));
      localStorage.setItem('kaabsan_documents_v11', JSON.stringify(updated));
    } catch (e) {
      // ignore
    }
    saveDocumentsToFirestore(updated);
  };

  // Persist payments
  const handleUpdatePayments = (updated: PaymentSubmission[]) => {
    setPaymentsList(updated);
    try {
      localStorage.setItem('kaabsan_payment_submissions', JSON.stringify(updated));
    } catch (e) {
      // ignore
    }
  };

  // Persist leads
  const handleUpdateLeads = (updated: LeadInquiry[]) => {
    setLeadsList(updated);
    try {
      localStorage.setItem('kaabsan_leads_data', JSON.stringify(updated));
    } catch (e) {
      // ignore
    }
  };

  // Persist team members
  const handleUpdateTeamMembers = (updated: TeamMember[]) => {
    setTeamMembersList(updated);
    try {
      localStorage.setItem('kaabsan_current_team_members', JSON.stringify(updated));
      localStorage.setItem('kaabsan_team_members', JSON.stringify(updated));
    } catch (e) {
      // ignore
    }
  };

  // Persist testimonials
  const handleUpdateTestimonials = (updated: TestimonialItem[]) => {
    setTestimonialsList(updated);
    try {
      localStorage.setItem('kaabsan_testimonials', JSON.stringify(updated));
    } catch (e) {
      // ignore
    }
  };

  // Persist press / blog articles
  const handleUpdatePressArticles = (updated: PressArticle[]) => {
    setPressArticlesList(updated);
    try {
      localStorage.setItem('kaabsan_press_articles', JSON.stringify(updated));
    } catch (e) {
      // ignore
    }
  };

  // Persist bookmarks
  useEffect(() => {
    try {
      localStorage.setItem('kaabsan_saved_properties', JSON.stringify(savedPropertyIds));
    } catch (e) {
      // ignore
    }
  }, [savedPropertyIds]);

  const handleToggleSave = (id: string) => {
    setSavedPropertyIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleOpenPropertyDetail = (property: Property) => {
    // Direct mapping to standalone project pages (Rugsan Gardens, Aragsan Village, Bilicsan Village, Masalaha Apartments)
    const titleLower = property.title.toLowerCase();
    const idLower = property.id.toLowerCase();
    
    let targetProjectId: string | null = null;
    if (idLower.includes('rugsan') || titleLower.includes('rugsan') || idLower === 'kaabsan-01') {
      targetProjectId = 'rugsan-gardens';
    } else if (idLower.includes('aragsan') || titleLower.includes('aragsan') || idLower === 'kaabsan-02') {
      targetProjectId = 'aragsan-village';
    } else if (idLower.includes('bilicsan') || titleLower.includes('bilicsan') || idLower === 'kaabsan-03') {
      targetProjectId = 'bilicsan-village';
    } else if (idLower.includes('masalaha') || titleLower.includes('masalaha') || titleLower.includes('apartment') || idLower === 'kaabsan-04') {
      targetProjectId = 'masalaha-apartments';
    } else {
      const match = masterCommunitiesList.find(c => 
        c.id === property.id || 
        c.name.toLowerCase().includes(property.title.toLowerCase().split(' ')[0]) ||
        property.title.toLowerCase().includes(c.name.toLowerCase().split(' ')[0])
      );
      if (match) targetProjectId = match.id;
    }

    if (targetProjectId) {
      handleSelectProject(targetProjectId);
    } else {
      setSelectedProperty(property);
      setIsDetailModalOpen(true);
    }
  };

  const handleOpenAIAdvisor = (query = '', property: Property | null = null) => {
    setAiAdvisorQuery(query);
    setAiAdvisorProperty(property);
    setIsAIAdvisorOpen(true);
  };

  const handleOpenScheduleTour = (property: Property) => {
    setTourTargetProperty(property);
    setIsScheduleTourOpen(true);
  };

  const handleOpenContact = (message = '') => {
    setContactMessage(message);
    setIsContactModalOpen(true);
  };

  const handleOpenCalculator = (property?: Property | null) => {
    setCalculatorProperty(property || null);
    setIsCalculatorOpen(true);
  };

  const handleOpenPaymentWithProperty = (title?: string) => {
    if (title) setPaymentPropertyTitle(title);
    setIsPaymentModalOpen(true);
  };

  const handleSelectNeighborhood = (neighborhoodName: string) => {
    setFilterState((prev) => ({
      ...prev,
      neighborhood: neighborhoodName
    }));
    const el = document.getElementById('properties');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHeroSearch = (filters: { neighborhood: string; priceRange: string; beds: string; keyword: string }) => {
    setFilterState((prev) => ({
      ...prev,
      neighborhood: filters.neighborhood,
      priceRange: filters.priceRange,
      beds: filters.beds,
      keyword: filters.keyword
    }));
    const el = document.getElementById('properties');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const savedPropertiesList = propertiesList.filter((p) => savedPropertyIds.includes(p.id));

  // Find active community & property for dedicated project page
  const selectedCommunity = selectedProjectId
    ? (masterCommunitiesList.find((c) => 
        c.id === selectedProjectId || 
        c.id.includes(selectedProjectId) || 
        selectedProjectId.includes(c.id) ||
        c.name.toLowerCase().includes(selectedProjectId.toLowerCase().replace(/[-_]/g, ' ').split(' ')[0])
      ) || 
      INITIAL_MASTER_COMMUNITIES.find((c) => 
        c.id === selectedProjectId || 
        c.id.includes(selectedProjectId) || 
        selectedProjectId.includes(c.id)
      ) || 
      INITIAL_MASTER_COMMUNITIES[0])
    : null;

  const selectedCommunityProperty = selectedCommunity
    ? (propertiesList.find((p) => 
        p.id === selectedCommunity.id || 
        p.title.toLowerCase().includes(selectedCommunity.name.toLowerCase().split(' ')[0]) ||
        selectedCommunity.name.toLowerCase().includes(p.title.toLowerCase().split(' ')[0])
      ) || 
      INITIAL_PROPERTIES.find((p) => 
        p.id === selectedCommunity.id || 
        p.title.toLowerCase().includes(selectedCommunity.name.toLowerCase().split(' ')[0])
      ) || 
      propertiesList[0])
    : undefined;

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1A1A1A] font-sans selection:bg-[#A69177] selection:text-white">
      
      {/* Top Fixed Navigation Bar */}
      <Navbar
        activeTab={selectedProjectId ? `project-${selectedProjectId}` : activeTab}
        setActiveTab={(tab) => {
          if (tab === 'home' || tab === 'properties' || tab === 'downloads' || tab === 'financing-plans' || tab === 'neighborhoods' || tab === 'valuation' || tab === 'buy' || tab === 'rent' || tab === 'sell' || tab === 'about' || tab === 'gallery' || tab === 'blog') {
            setSelectedProjectId(null);
          }
          setActiveTab(tab);
        }}
        savedCount={savedPropertyIds.length}
        onOpenFavorites={() => setIsSavedDrawerOpen(true)}
        onOpenAIAdvisor={() => handleOpenAIAdvisor('What are the key residential developments and 60-month financing terms offered by Kaabsan in Hargeisa?')}
        onOpenContact={() => handleOpenContact()}
        onOpenPayment={() => handleOpenPaymentWithProperty()}
        onSelectProject={handleSelectProject}
        currency={currency}
        setCurrency={setCurrency}
        language={language}
        setLanguage={setLanguage}
        siteConfig={siteConfig}
        masterCommunities={masterCommunitiesList}
        properties={propertiesList}
      />

      {/* Main Content Flow */}
      <main>
        <Suspense fallback={
          <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4 py-20">
            <div className="w-10 h-10 border-3 border-[#C5A880] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs uppercase tracking-widest text-[#8C827A] font-medium">Kaabsan Real Estate</p>
          </div>
        }>
          {selectedCommunity ? (
            /* Dedicated Single Project Page View */
            <ProjectDetailPage
              community={selectedCommunity}
              property={selectedCommunityProperty}
              documents={documentsList}
              onBack={handleBackFromProject}
              onSelectOtherProject={handleSelectProject}
              onOpenScheduleTour={(projectName) => {
                const matchProp = propertiesList.find(p => p.title.toLowerCase().includes(projectName.toLowerCase())) || propertiesList[0];
                handleOpenScheduleTour(matchProp);
              }}
              onOpenContact={(msg) => handleOpenContact(msg || `Waxaan rabaa faahfaahinta mashruuca ${selectedCommunity.name}`)}
              onOpenPayment={() => handleOpenPaymentWithProperty(selectedCommunity.name)}
              onOpenAIAdvisor={(query) => handleOpenAIAdvisor(query, selectedCommunityProperty)}
              currency={currency}
            />
          ) : activeTab === 'buy' ? (
            /* Dedicated Standalone Buy Page */
            <BuyPage
              onBack={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              properties={propertiesList}
              masterCommunities={masterCommunitiesList}
              onSelectProperty={handleOpenPropertyDetail}
              onSelectProject={handleSelectProject}
              onOpenScheduleTour={handleOpenScheduleTour}
              onOpenContact={(msg) => handleOpenContact(msg)}
              onOpenPayment={(title) => handleOpenPaymentWithProperty(title)}
              onOpenAIAdvisor={(query, prop) => handleOpenAIAdvisor(query, prop)}
              savedPropertyIds={savedPropertyIds}
              onToggleSave={handleToggleSave}
              currency={currency}
            />
          ) : (activeTab === 'rent' || activeTab === 'property-management') ? (
            /* Dedicated Standalone Property Management & Rental Page */
            <PropertyManagementPage
              onBack={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenContact={(msg) => handleOpenContact(msg)}
              onOpenAIAdvisor={(query) => handleOpenAIAdvisor(query)}
              onSelectProject={handleSelectProject}
              currency={currency}
            />
          ) : activeTab === 'sell' ? (
            /* Dedicated Standalone Sell Page */
            <SellPage
              onBack={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenContact={(msg) => handleOpenContact(msg)}
              onOpenAIAdvisor={(query) => handleOpenAIAdvisor(query)}
            />
          ) : activeTab === 'about' ? (
            /* Dedicated Standalone About Us Page */
            <AboutPage
              onBack={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenContact={(msg) => handleOpenContact(msg)}
              onSelectProject={handleSelectProject}
              onOpenScheduleTour={(proj) => handleOpenContact(`Waxaan rabaa booqasho: ${proj || 'Kaabsan'}`)}
              siteConfig={siteConfig}
            />
          ) : activeTab === 'gallery' ? (
            /* Dedicated Standalone Gallery & Media Page */
            <GalleryPage
              onBack={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectProject={handleSelectProject}
              onOpenScheduleTour={(projectName) => {
                const matchProp = propertiesList.find(p => projectName && p.title.toLowerCase().includes(projectName.toLowerCase())) || propertiesList[0];
                handleOpenScheduleTour(matchProp);
              }}
              onOpenContact={(msg) => handleOpenContact(msg)}
              properties={propertiesList}
              masterCommunities={masterCommunitiesList}
            />
          ) : activeTab === 'events' ? (
            /* Dedicated Standalone Events & Launches Page (Xafladaha & Munaasabadaha) */
            <EventsPage
              events={eventsList}
              onBack={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenContact={(msg) => handleOpenContact(msg)}
              onSelectProject={handleSelectProject}
              siteConfig={siteConfig}
            />
          ) : activeTab === 'upcoming' ? (
            /* Dedicated Standalone Upcoming Projects Page (Mashaariicda Soo Socota) */
            <UpcomingProjectsPage
              upcomingProjects={upcomingProjectsList}
              onBack={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenContact={(msg) => handleOpenContact(msg)}
              onSelectProject={handleSelectProject}
            />
          ) : activeTab === 'blog' ? (
            /* Dedicated Standalone Blog & News Page */
            <BlogPage
              onBack={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectProject={handleSelectProject}
              onOpenContact={(msg) => handleOpenContact(msg)}
            />
          ) : (
            /* Standard Multi-Section Homepage */
            <>
              {/* Cinematic Hero */}
              <Hero
                siteConfig={siteConfig}
                onSearch={handleHeroSearch}
                onOpenAIAdvisor={() => handleOpenAIAdvisor('Compare Rugsan Gardens in Masalaha with Aragsan Village in Buurta Kala-jeexan regarding price per sq.ft and 60-month financing terms.')}
                onOpenValuation={() => {
                  const el = document.getElementById('valuation');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                onOpenContact={(msg) => handleOpenContact(msg)}
              />

              {/* Master Planned Communities Spotlight (Rugsan, Aragsan, Masalaha) */}
              <MasterCommunitiesSection
                communities={masterCommunitiesList}
                onSelectMasterCommunity={handleSelectProject}
                onOpenScheduleTour={(communityName) => {
                  const matchProp = propertiesList.find(p => p.title.toLowerCase().includes(communityName.toLowerCase())) || propertiesList[0];
                  handleOpenScheduleTour(matchProp);
                }}
                onOpenContact={(msg) => handleOpenContact(msg)}
                onOpenCalculator={() => handleOpenCalculator()}
              />

              {/* Portfolio & Exclusive Listings */}
              <PropertyListings
                properties={propertiesList}
                savedIds={savedPropertyIds}
                onToggleSave={handleToggleSave}
                onSelectProperty={handleOpenPropertyDetail}
                onAskAI={(property) => handleOpenAIAdvisor(`Provide an in-depth overview and 60-month payment plan breakdown for ${property.title} located in ${property.neighborhood}, Hargeisa.`, property)}
                currency={currency}
                filterState={filterState}
                setFilterState={setFilterState}
              />

              {/* Official Blueprints & Brochure Download Center */}
              <DocumentCenter
                documents={documentsList}
                onUpdateDocuments={handleUpdateDocuments}
                onOpenPayment={() => handleOpenPaymentWithProperty()}
                onOpenContact={() => handleOpenContact('Request official brochure catalog via email/mail')}
                onScheduleTour={(projectName) => {
                  const matchProp = propertiesList.find(p => projectName && p.title.toLowerCase().includes(projectName.toLowerCase())) || propertiesList[0];
                  handleOpenScheduleTour(matchProp);
                }}
              />

              {/* Delivered Developments & Track Record */}
              <NotableSalesSection
                onOpenValuation={() => {
                  const el = document.getElementById('valuation');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              />

              {/* Client Reviews & Testimonials */}
              <TestimonialsSection
                testimonials={testimonialsList}
                onOpenContact={(msg) => handleOpenContact(msg || 'Su\'aalo ku saabsan khibradda macaamiisha Kaabsan')}
              />

              {/* Kaabsan Heritage, Telesom Affiliation & Ready-Mix Plant */}
              <AboutSection 
                aboutConfig={siteConfig.about}
                teamMembers={teamMembersList}
                onOpenContact={() => handleOpenContact('I would like to schedule a private advisory consultation at the Kaabsan Head Office.')} 
              />

              {/* Media Coverage & Corporate Partners */}
              <PressSection pressArticles={pressArticlesList} />

              {/* Frequently Asked Questions (FAQs) */}
              <FAQSection
                faqs={siteConfig.faqs}
                onOpenContact={(msg) => handleOpenContact(msg || "Waxaan rabaa inaan wax ka ogaado maalgelinta Kaabsan & Dara Salaam Bank")}
                onOpenAIAdvisor={() => handleOpenAIAdvisor('Kaabsan FAQs and financing terms')}
              />

              {/* Property Valuation & 60-Month Installment Estimator */}
              <ValuationSection
                onOpenAIAdvisorWithQuery={(query) => handleOpenAIAdvisor(query)}
                onOpenContact={(msg) => handleOpenContact(msg)}
              />
            </>
          )}
        </Suspense>
      </main>

      {/* Footer */}
      <Footer
        onOpenContact={(msg) => handleOpenContact(msg)}
        onOpenValuation={() => {
          const el = document.getElementById('valuation');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenAIAdvisor={() => handleOpenAIAdvisor()}
        onOpenPayment={() => handleOpenPaymentWithProperty()}
        onSelectProject={handleSelectProject}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          setSelectedProjectId(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAdmin={() => {
          setIsAdminPanelOpen(true);
          try {
            window.history.pushState(null, '', '/admin/login');
          } catch {
            window.location.hash = '/admin/login';
          }
        }}
        siteConfig={siteConfig}
      />

      {/* Modals & Portals */}
      <Suspense fallback={null}>
        {/* 1. Property Full Details Modal */}
        {isDetailModalOpen && (
          <PropertyDetailModal
            property={selectedProperty}
            isOpen={isDetailModalOpen}
            onClose={() => setIsDetailModalOpen(false)}
            isSaved={selectedProperty ? savedPropertyIds.includes(selectedProperty.id) : false}
            onToggleSave={handleToggleSave}
            onOpenScheduleTour={(prop) => {
              setIsDetailModalOpen(false);
              handleOpenScheduleTour(prop);
            }}
            onAskAIWithContext={(prop, q) => {
              handleOpenAIAdvisor(q, prop);
            }}
            currency={currency}
            siteConfig={siteConfig}
            onOpenPayment={(title) => handleOpenPaymentWithProperty(title)}
          />
        )}

        {/* 2. AI Market Intelligence Advisor Modal (Gemini 3.1 Pro) */}
        {isAIAdvisorOpen && (
          <AIAdvisorModal
            isOpen={isAIAdvisorOpen}
            onClose={() => setIsAIAdvisorOpen(false)}
            initialQuery={aiAdvisorQuery}
            contextProperty={aiAdvisorProperty}
            onOpenScheduleTour={(prop) => {
              setIsAIAdvisorOpen(false);
              handleOpenScheduleTour(prop);
            }}
          />
        )}

        {/* 3. Saved Favorites / Client Portfolio Drawer */}
        {isSavedDrawerOpen && (
          <SavedFavoritesModal
            isOpen={isSavedDrawerOpen}
            onClose={() => setIsSavedDrawerOpen(false)}
            savedProperties={savedPropertiesList}
            onRemoveFavorite={handleToggleSave}
            onSelectProperty={handleOpenPropertyDetail}
            onOpenScheduleTour={(prop) => {
              setIsSavedDrawerOpen(false);
              handleOpenScheduleTour(prop);
            }}
            onOpenContact={(msg) => {
              setIsSavedDrawerOpen(false);
              handleOpenContact(msg);
            }}
            currency={currency}
          />
        )}

        {/* 4. Schedule On-Site Tour Modal */}
        {isScheduleTourOpen && (
          <ScheduleTourModal
            property={tourTargetProperty}
            isOpen={isScheduleTourOpen}
            onClose={() => setIsScheduleTourOpen(false)}
          />
        )}

        {/* 5. Contact & Consultation Modal */}
        {isContactModalOpen && (
          <ContactModal
            isOpen={isContactModalOpen}
            onClose={() => setIsContactModalOpen(false)}
            initialMessage={contactMessage}
          />
        )}

        {/* 5.1 Interactive 60-Month Islamic Financing & Murabaha Calculator Modal */}
        {isCalculatorOpen && (
          <FinancingCalculatorModal
            isOpen={isCalculatorOpen}
            onClose={() => setIsCalculatorOpen(false)}
            initialProperty={calculatorProperty}
            onOpenPayment={(title) => handleOpenPaymentWithProperty(title)}
            onSelectPropertyForTour={(propertyTitle) => {
              setIsCalculatorOpen(false);
              const matchProp = propertiesList.find(p => p.title.toLowerCase().includes(propertyTitle.toLowerCase())) || propertiesList[0];
              handleOpenScheduleTour(matchProp);
            }}
          />
        )}

        {/* 6. Direct Payment (Zaad, Dara-Salaam, Premier, Dahabshiil) */}
        {isPaymentModalOpen && (
          <DirectPaymentModal
            isOpen={isPaymentModalOpen}
            onClose={() => setIsPaymentModalOpen(false)}
            selectedPropertyTitle={paymentPropertyTitle}
            onPaymentSuccess={(newPay) => {
              handleUpdatePayments([newPay, ...paymentsList]);
            }}
          />
        )}

        {/* 7. Standalone Admin Control Portal (Direct /admin or #admin URL access) */}
        {isAdminPanelOpen && (
          <AdminPanel
            isOpen={isAdminPanelOpen}
            onClose={handleCloseAdmin}
            properties={propertiesList}
            onUpdateProperties={handleUpdateProperties}
            masterCommunities={masterCommunitiesList}
            onUpdateMasterCommunities={handleUpdateMasterCommunities}
            siteConfig={siteConfig}
            onUpdateSiteConfig={handleUpdateSiteConfig}
            teamMembers={teamMembersList}
            onUpdateTeamMembers={handleUpdateTeamMembers}
            testimonials={testimonialsList}
            onUpdateTestimonials={handleUpdateTestimonials}
            pressArticles={pressArticlesList}
            onUpdatePressArticles={handleUpdatePressArticles}
            events={eventsList}
            onUpdateEvents={handleUpdateEvents}
            upcomingProjects={upcomingProjectsList}
            onUpdateUpcomingProjects={handleUpdateUpcomingProjects}
            paymentSubmissions={paymentsList}
            onUpdatePayments={handleUpdatePayments}
            documents={documentsList}
            onUpdateDocuments={handleUpdateDocuments}
            leads={leadsList}
            onUpdateLeads={handleUpdateLeads}
            translations={translationsData}
            onUpdateTranslations={setTranslationsData}
            onResetTranslations={() => setTranslationsData(loadMergedTranslations())}
          />
        )}
      </Suspense>

      {/* 8. Floating WhatsApp Interactive Popup Widget */}
      <WhatsAppWidget
        siteConfig={siteConfig}
        phoneNumber={siteConfig.whatsappTemplates?.hotlineNumber || siteConfig.company.whatsapp}
        displayNumber={siteConfig.company.whatsapp}
      />

      {/* 9. Floating Multi-Language Switcher (Bottom-Right corner: English, Somali, Arabic Saudi) */}
      <FloatingLanguageWidget
        language={language}
        onLanguageChange={(l) => {
          setLanguage(l);
          try {
            localStorage.setItem('kaabsan_language', l);
          } catch {}
        }}
      />

    </div>
  );
}
