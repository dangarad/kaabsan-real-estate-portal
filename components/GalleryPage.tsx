import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Sparkles, 
  Eye, 
  Download, 
  Share2, 
  Check, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  ShieldCheck, 
  Building2, 
  Calendar, 
  ExternalLink,
  Filter,
  Maximize2,
  Image as ImageIcon
} from 'lucide-react';
import { MasterCommunity, Property } from '../types';
import { loadCustomGalleryMedia, saveCustomGalleryMedia, CustomMediaItem } from '../utils/storageMigration';
import { subscribeToGalleryItemsFromFirestore } from '../lib/firebase';
import { SafeImage } from './SafeImage';
import { isYouTubeUrl, getYouTubeThumbnail, getYouTubeEmbedUrl } from '../utils/mediaUtils';

export interface GalleryItem {
  id: string;
  title: string;
  project: string;
  projectName: string;
  category: 'photo' | 'floorplan' | 'video' | 'construction';
  image: string;
  videoUrl?: string;
  tag: string;
  description: string;
  sqm?: string;
  price?: string;
  isCustom?: boolean;
}

interface GalleryPageProps {
  onBack: () => void;
  onSelectProject: (projectId: string) => void;
  onOpenScheduleTour: (projectName?: string) => void;
  onOpenContact: (msg?: string) => void;
  properties?: Property[];
  masterCommunities?: MasterCommunity[];
}

export const BASE_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'base-gal-aragsan-01',
    title: 'Aragsan Village - Paved Central Avenue & Modern Villas',
    project: 'aragsan-village',
    projectName: 'Aragsan Village',
    category: 'photo',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    tag: 'Master Community',
    description: 'Interlocking paved boulevard with landscaped center median trees, street lighting, and contemporary two-story villas under clear blue skies at Jigjiga Yar.',
    sqm: 'Plot 483 m² | Built 362 m²',
    price: 'Starting from $292,508'
  },
  {
    id: 'base-gal-aragsan-02',
    title: 'Aragsan Village - Main Gatehouse & Commercial Plaza',
    project: 'aragsan-village',
    projectName: 'Aragsan Village',
    category: 'photo',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
    tag: 'Gated Entrance & School',
    description: 'Secure perimeter entrance gate with barrier arms, commercial buildings, and Australian Islamic School facility.',
    sqm: 'Security Gatehouse & Plaza',
    price: '24/7 Monitored Access'
  },
  {
    id: 'base-gal-aragsan-03',
    title: 'Aragsan Village - 114 m² Panoramic Rooftop Terrace',
    project: 'aragsan-village',
    projectName: 'Aragsan Village',
    category: 'photo',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
    tag: 'Rooftop Terrace',
    description: 'Spectacular 114.39 m² open-air rooftop terrace overlooking the scenic mountain ridge of Buurta Kala-jeexan and Hargeisa skyline.',
    sqm: '114.39 m² Terrace Area',
    price: 'Mountain & City Views'
  },
  {
    id: 'base-gal-aragsan-04',
    title: 'Aragsan Village - Double-Height Executive Living Salon',
    project: 'aragsan-village',
    projectName: 'Aragsan Village',
    category: 'photo',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
    tag: 'Luxury Interior',
    description: 'High-ceiling formal reception majlis featuring double-height picture windows, porcelain tiling, and open dining access.',
    sqm: 'Ground Floor Salon (32.63 m²)',
    price: 'Executive Interior'
  },
  {
    id: 'base-gal-aragsan-05',
    title: 'Aragsan Village - Modern Fitted Kitchen & Island',
    project: 'aragsan-village',
    projectName: 'Aragsan Village',
    category: 'photo',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
    tag: 'Modern Kitchen',
    description: 'European-style fitted kitchen with separate auxiliary cooking room, quartz countertops, and breakfast bar.',
    sqm: 'Main Kitchen (19.64 m²)',
    price: 'Dual Cooking Zones'
  },
  {
    id: 'base-gal-aragsan-06',
    title: 'Aragsan Village - Master Suite with Private Balcony',
    project: 'aragsan-village',
    projectName: 'Aragsan Village',
    category: 'photo',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
    tag: 'Master Bedroom',
    description: 'First floor master suite with dedicated dressing room, en-suite bathroom, and shaded outdoor balcony.',
    sqm: 'Master Suite (26.13 m²)',
    price: 'Private Balcony'
  },
  {
    id: 'base-gal-aragsan-07',
    title: 'Aragsan Village - Community Gym, Mosque & Sports Turf',
    project: 'aragsan-village',
    projectName: 'Aragsan Village',
    category: 'photo',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=85',
    tag: 'Sports & Amenities',
    description: 'Dedicated sports turf, community fitness gym, 120-capacity mosque, and children recreation park.',
    sqm: 'Resident Sports Club',
    price: 'Community Facility'
  },
  {
    id: 'base-gal-rugsan-01',
    title: 'Rugsan Gardens - Community Aerial & Paved Avenues',
    project: 'rugsan-gardens',
    projectName: 'Rugsan Gardens',
    category: 'photo',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85',
    tag: 'Gated Master Plan',
    description: 'Paved avenues, lush green landscaping, Somaliland flags, and completed luxury townhouses in Masallaha.',
    sqm: 'Plot 400 m² | Built 321 m²',
    price: '$225,000 (Available for Purchase)'
  },
  {
    id: 'base-gal-rugsan-02',
    title: 'Rugsan Gardens - Modern Townhouse Villa Exterior',
    project: 'rugsan-gardens',
    projectName: 'Rugsan Gardens',
    category: 'photo',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
    tag: 'Modern Architecture',
    description: 'Sand-beige contemporary townhouse facade featuring two-story double height glass window, stone accents, and boundary gate.',
    sqm: 'Unit 59 | 5-6 Bedrooms',
    price: '$225,000'
  },
  {
    id: 'base-gal-rugsan-03',
    title: 'Rugsan Gardens - Executive Living Room & Majlis',
    project: 'rugsan-gardens',
    projectName: 'Rugsan Gardens',
    category: 'photo',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
    tag: 'Luxury Interior',
    description: 'Spacious formal living room with curved silver/gold tufted sofas, custom center table, and designer tiled flooring.',
    sqm: 'Spacious Reception Majlis',
    price: 'Designer Furnished'
  },
  {
    id: 'base-gal-rugsan-04',
    title: 'Rugsan Gardens - Chef L-Shaped Modern Kitchen',
    project: 'rugsan-gardens',
    projectName: 'Rugsan Gardens',
    category: 'photo',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85',
    tag: 'Modern Kitchen',
    description: 'L-shaped kitchen equipped with black granite countertops, double stainless sink, oven, microwave, and custom two-tone cabinetry.',
    sqm: 'Inside Luxury Kitchen',
    price: 'Premium Appliances'
  },
  {
    id: 'base-gal-rugsan-05',
    title: 'Rugsan Gardens - Contemporary Dining Room',
    project: 'rugsan-gardens',
    projectName: 'Rugsan Gardens',
    category: 'photo',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=85',
    tag: 'Family Dining',
    description: '8-seater glass dining table with channel-tufted velvet chairs, elegant dual-layer drapes, and ambient lighting.',
    sqm: '8-Person Dining Suite',
    price: 'Open Plan Elegance'
  },
  {
    id: 'base-gal-rugsan-06',
    title: 'Rugsan Gardens - Fluted TV Feature Wall & Credenza',
    project: 'rugsan-gardens',
    projectName: 'Rugsan Gardens',
    category: 'photo',
    image: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&w=1600&q=85',
    tag: 'Entertainment Suite',
    description: 'Mounted flat-screen television with gold-trimmed fluted media console, gold leaf accents, and decorative pampas grass.',
    sqm: 'Media Wall Lounge',
    price: 'Custom Joinery'
  },
  {
    id: 'base-gal-rugsan-07',
    title: 'Rugsan Gardens - Kitchen Pantry & Built-In Refrigerator',
    project: 'rugsan-gardens',
    projectName: 'Rugsan Gardens',
    category: 'photo',
    image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=1600&q=85',
    tag: 'Kitchen Storage',
    description: 'Dedicated refrigerator alcove with stainless steel fridge, tall custom wood pantry storage, and marble tiled walls.',
    sqm: 'Smart Storage Alcove',
    price: 'Integrated Pantry'
  },
  {
    id: 'base-gal-03',
    title: 'Bilicsan Village - Modern Contemporary Architecture',
    project: 'bilicsan-village',
    projectName: 'Bilicsan Village',
    category: 'photo',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
    tag: 'Family Residences',
    description: 'Contemporary architectural design tailored for modern families, built with high-grade laboratory-tested Kaabsan Ready-Mix concrete.',
    sqm: 'Plot 450 m² | Built 360 m²',
    price: '$275,000 – $336,000'
  },
  {
    id: 'base-gal-04',
    title: 'Masallaha Luxury Apartments - Dual Towers Block A & B',
    project: 'masalaha-apartments',
    projectName: 'Masallaha Apartments',
    category: 'photo',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
    tag: 'Tower Suites',
    description: 'Premier residential towers in Masallaha featuring 81 secure parking spaces, smart high-speed elevators, and integrated wastewater treatment (STP).',
    sqm: '107 m² - 272 m² (Penthouses)',
    price: '5-Year Installment Plan'
  },
  {
    id: 'base-gal-05',
    title: 'Kaabsan Modern Ready-Mix Concrete Batching Plant',
    project: 'batching-plant',
    projectName: 'Kaabsan Batching Plant',
    category: 'construction',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=85',
    tag: 'Quality & Strength',
    description: 'State-of-the-art computer-controlled concrete batching plant on Airport Road supplying certified high-durability concrete for all Kaabsan master developments.',
    sqm: 'Heavy Industrial Plant',
    price: 'Laboratory Tested Strength'
  },
  {
    id: 'base-gal-06',
    title: 'Aragsan Village - Spacious Master Salon & Majlis',
    project: 'aragsan-village',
    projectName: 'Aragsan Village',
    category: 'photo',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
    tag: 'Interior Elegance',
    description: 'Expansive formal salon and family living spaces featuring floor-to-ceiling glass windows for optimal natural light and luxury finishes.',
    sqm: 'Double Height Ceilings',
    price: 'Custom Luxury Finishes'
  },
  {
    id: 'base-gal-07',
    title: 'Masallaha Apartments - 5-Bed Penthouse Rooftop Terrace',
    project: 'masalaha-apartments',
    projectName: 'Masallaha Apartments',
    category: 'photo',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
    tag: '272 m² Penthouse',
    description: 'Exclusive top-floor rooftop terrace offering 360-degree panoramic views of Hargeisa city and Cigaal International Airport corridor.',
    sqm: '272 m² Rooftop Suite',
    price: 'Top Floor Luxury'
  },
  {
    id: 'base-gal-08',
    title: 'Aragsan Village - Ground & First Floor Architectural Blueprint',
    project: 'aragsan-village',
    projectName: 'Aragsan Village',
    category: 'floorplan',
    image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1600&q=85',
    tag: 'G+1 Floor Plan',
    description: 'Detailed architectural layout for ground floor (Majlis, Dining, Kitchen, Guest Suite) and upper level (Master Suite, Balcony, Family Quarters).',
    sqm: 'Built Area 465 m²',
    price: 'Detailed Blueprint'
  },
  {
    id: 'base-gal-09',
    title: 'Rugsan Gardens - Community Gym & Handover Ceremony',
    project: 'events',
    projectName: 'Rugsan Handover',
    category: 'photo',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1600&q=85',
    tag: 'Community Handover',
    description: 'Official key handover ceremony and inauguration of the private fitness center and community amenities for 68 homeowner families.',
    sqm: '68 Families Moved In',
    price: 'Telesom Guarantee'
  },
  {
    id: 'base-gal-10',
    title: 'Masallaha Apartments - Architectural Typology 3-Bed Suite',
    project: 'masalaha-apartments',
    projectName: 'Masallaha Apartments',
    category: 'floorplan',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
    tag: '3-Bed Blueprint',
    description: 'Functional 158.14 m² apartment blueprint featuring three en-suite bedrooms, open-concept lounge, modern kitchen, and private balcony.',
    sqm: '158.14 m²',
    price: '60-Month Financing'
  },
  {
    id: 'base-gal-11',
    title: 'Aragsan Village - Paved Roads & Street Solar Infrastructure',
    project: 'aragsan-village',
    projectName: 'Aragsan Village',
    category: 'construction',
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=85',
    tag: 'Infrastructure',
    description: 'Asphalt-paved internal roads, solar-powered street lighting network, perimeter security wall, and 24/7 guarded gatehouse.',
    sqm: 'Gated Master Community',
    price: '24/7 Security'
  },
  {
    id: 'base-gal-12',
    title: 'Bilicsan Village - European Modern Kitchen & Living',
    project: 'bilicsan-village',
    projectName: 'Bilicsan Village',
    category: 'photo',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85',
    tag: 'Modern Interior',
    description: 'Contemporary European-style kitchen with fitted custom cabinetry, quartz countertops, and spacious integrated dining area.',
    sqm: 'Designer Finish',
    price: 'Fitted Kitchen'
  }
];

export const GalleryPage: React.FC<GalleryPageProps> = ({
  onBack,
  onSelectProject,
  onOpenScheduleTour,
  onOpenContact,
  properties = [],
  masterCommunities = []
}) => {
  const [selectedProjectFilter, setSelectedProjectFilter] = useState<string>('all');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  // Custom uploaded media state
  const [customMedia, setCustomMedia] = useState<CustomMediaItem[]>(() => {
    return loadCustomGalleryMedia();
  });

  // Reload custom media and subscribe to Firestore gallery items
  useEffect(() => {
    setCustomMedia(loadCustomGalleryMedia());

    const unsubscribe = subscribeToGalleryItemsFromFirestore((firestoreItems) => {
      if (firestoreItems && firestoreItems.length > 0) {
        setCustomMedia((prev) => {
          const map = new Map<string, CustomMediaItem>();
          prev.forEach(p => map.set(p.id, p));
          firestoreItems.forEach(fi => {
            if (fi.id) {
              map.set(fi.id, {
                id: fi.id,
                title: fi.title,
                project: fi.project,
                projectName: fi.projectName,
                category: fi.category,
                image: fi.image,
                tag: fi.tag || 'Official Photo',
                description: fi.description || '',
                sqm: fi.sqm,
                price: fi.price,
                dateAdded: fi.createdAt
              });
            }
          });
          const merged = Array.from(map.values());
          saveCustomGalleryMedia(merged);
          return merged;
        });
      }
    });

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  // Collect ALL media items dynamically
  const allGalleryItems = useMemo(() => {
    const items: GalleryItem[] = [];

    // 1. Add custom user uploads FIRST
    customMedia.forEach((cm) => {
      items.push({
        id: cm.id,
        title: cm.title,
        project: cm.project,
        projectName: cm.projectName,
        category: cm.category,
        image: cm.image,
        tag: cm.tag || 'Custom Upload',
        description: cm.description || '',
        sqm: cm.sqm,
        price: cm.price,
        isCustom: true
      });
    });

    // 2. Add all dynamic photos from propertiesList (heroImage & galleryImages)
    properties.forEach((prop) => {
      let projKey = 'aragsan-village';
      if (prop.title.toLowerCase().includes('rugsan')) projKey = 'rugsan-gardens';
      else if (prop.title.toLowerCase().includes('bilicsan')) projKey = 'bilicsan-village';
      else if (prop.title.toLowerCase().includes('masalaha') || prop.title.toLowerCase().includes('apartment')) projKey = 'masalaha-apartments';

      // Hero Image
      if (prop.heroImage && !items.some(i => i.image === prop.heroImage)) {
        items.push({
          id: `prop-hero-${prop.id}`,
          title: prop.title,
          project: projKey,
          projectName: prop.title.split(' - ')[0] || prop.title,
          category: 'photo',
          image: prop.heroImage,
          tag: prop.status || 'Active Listing',
          description: prop.description || prop.subtitle,
          sqm: `${prop.builtArea || prop.actualSqm || 400} m²`,
          price: prop.priceDisplay
        });
      }

      // Gallery Images
      if (prop.galleryImages && Array.isArray(prop.galleryImages)) {
        prop.galleryImages.forEach((img, gIdx) => {
          if (img && !items.some(i => i.image === img)) {
            items.push({
              id: `prop-gal-${prop.id}-${gIdx}`,
              title: `${prop.title} (Photo ${gIdx + 1})`,
              project: projKey,
              projectName: prop.title.split(' - ')[0] || prop.title,
              category: gIdx === 3 ? 'floorplan' : 'photo',
              image: img,
              tag: gIdx === 3 ? 'Floor Plan / Interior' : 'HD Photo',
              description: `Sawirka ${gIdx + 1}aad ee mashruuca ${prop.title}.`,
              sqm: `${prop.builtArea || 400} m²`,
              price: prop.priceDisplay
            });
          }
        });
      }
    });

    // 3. Add all master community images
    masterCommunities.forEach((comm) => {
      if (comm.image && !items.some(i => i.image === comm.image)) {
        items.push({
          id: `comm-img-${comm.id}`,
          title: `${comm.name} Official View`,
          project: comm.id,
          projectName: comm.name,
          category: 'photo',
          image: comm.image,
          tag: comm.status || 'Flagship Community',
          description: comm.description,
          price: 'Telesom Group'
        });
      }
    });

    // 4. Add base fallback gallery items if not duplicate
    BASE_GALLERY_ITEMS.forEach((base) => {
      if (!items.some(i => i.image === base.image)) {
        items.push(base);
      }
    });

    return items;
  }, [properties, masterCommunities, customMedia]);

  const filteredItems = useMemo(() => {
    return allGalleryItems.filter(item => {
      const projectMatch = selectedProjectFilter === 'all' || 
        item.project === selectedProjectFilter ||
        item.project.includes(selectedProjectFilter) ||
        selectedProjectFilter.includes(item.project);
      
      const categoryMatch = selectedCategoryFilter === 'all' || item.category === selectedCategoryFilter;
      return projectMatch && categoryMatch;
    });
  }, [allGalleryItems, selectedProjectFilter, selectedCategoryFilter]);

  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1A1A1A] pb-24 animate-in fade-in duration-300">
      
      {/* Top Breadcrumb Bar */}
      <div className="bg-[#FFFFFF] border-b border-[#E5E2DA] sticky top-[68px] z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 text-xs text-[#6B665E]">
            <button 
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-[#35322E] hover:text-[#C2A55D] font-bold transition-colors cursor-pointer bg-[#F4F1EA] hover:bg-[#EAE6DE] px-3.5 py-1.5 rounded-xl border border-[#E5E2DA]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Home</span>
            </button>
            <span className="text-[#D8D3C8]">/</span>
            <span className="font-bold text-[#1A1A1A] text-xs sm:text-sm">
              Media Gallery & Architectural Blueprints
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenScheduleTour('All Projects')}
              className="bg-[#35322E] hover:bg-[#1A1815] text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-sm flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C2A55D]" />
              <span>Book Site Tour</span>
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-[#24211E] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-[#E5E2DA]">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#C2A55D] bg-black/40 px-3.5 py-1 rounded-full border border-white/10 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-[#C2A55D]" />
              Official Media & Architecture Portfolio
            </div>
            <h1 className="font-serif-luxury text-3xl sm:text-5xl font-normal leading-tight">
              Media Gallery & Architectural Blueprints
            </h1>
            <p className="text-xs sm:text-sm text-[#D8D3C8] font-light leading-relaxed">
              Explore high-resolution photography, architectural blueprints, master community developments, and construction progress across Rugsan Gardens, Aragsan Village, Bilicsan Village, and Masallaha Luxury Apartments.
            </p>
          </div>
          <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-20 bg-cover bg-center pointer-events-none hidden md:block" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80')` }}></div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-4">
        
        {/* Project Specific Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'aragsan-village', label: 'Aragsan Village (Buurta Kala-jeexan)' },
            { id: 'rugsan-gardens', label: 'Rugsan Gardens (Masallaha)' },
            { id: 'bilicsan-village', label: 'Bilicsan Village' },
            { id: 'masalaha-apartments', label: 'Masallaha Apartments' },
            { id: 'batching-plant', label: 'Kaabsan Batching Plant' },
            { id: 'events', label: 'Handover Ceremonies & Events' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedProjectFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedProjectFilter === tab.id
                  ? 'bg-[#35322E] text-white shadow-sm'
                  : 'bg-white text-[#4A4742] hover:bg-[#EFECE6] border border-[#E5E2DA]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Media Type Filter */}
        <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#6B665E] flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-[#C2A55D]" />
              Type:
            </span>
            {[
              { id: 'all', label: 'All Media' },
              { id: 'photo', label: 'HD Photos' },
              { id: 'floorplan', label: 'Blueprints & Floor Plans' },
              { id: 'construction', label: 'Construction & Quality' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryFilter(cat.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  selectedCategoryFilter === cat.id
                    ? 'bg-[#C2A55D] text-white'
                    : 'bg-[#F4F1EA] text-[#4A4742] hover:bg-[#EAE6DE] border border-[#E5E2DA]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {filteredItems.length === 0 ? (
          <div className="bg-white border border-[#E5E2DA] rounded-3xl p-12 text-center space-y-3">
            <Building2 className="w-10 h-10 text-[#C2A55D] mx-auto opacity-60" />
            <h3 className="font-serif-luxury text-xl text-[#1A1A1A]">No media found in this category</h3>
            <p className="text-xs text-[#6B665E]">Please select another category or reset filters.</p>
            <button
              onClick={() => { setSelectedProjectFilter('all'); setSelectedCategoryFilter('all'); }}
              className="mt-2 px-4 py-2 bg-[#35322E] text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => {
              const isVideo = item.category === 'video' || isYouTubeUrl(item.image) || (item.videoUrl && isYouTubeUrl(item.videoUrl));
              const displayImg = isYouTubeUrl(item.image) ? getYouTubeThumbnail(item.image) : item.image;

              return (
                <div 
                  key={item.id}
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative bg-white rounded-3xl overflow-hidden border border-[#E5E2DA] hover:border-[#C2A55D] transition-all hover:shadow-xl cursor-pointer flex flex-col"
                >
                  {/* Image Box */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#24211E]">
                    <SafeImage 
                      src={displayImg} 
                      alt={item.title} 
                      fallbackType="project"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                    
                    {/* Badge */}
                    <span className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold rounded-full border border-white/20 flex items-center gap-1.5">
                      {isVideo && <Play className="w-3 h-3 text-red-500 fill-red-500" />}
                      <span>{item.tag}</span>
                    </span>

                    {/* Project Tag */}
                    <span className="absolute top-3 right-3 px-3 py-1 bg-[#C2A55D] text-white text-[10px] font-bold rounded-full shadow-sm">
                      {item.projectName}
                    </span>

                    {/* Play button or Hover View Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {isVideo ? (
                        <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 fill-white ml-0.5" />
                        </div>
                      ) : (
                        <span className="bg-white/90 backdrop-blur-md text-[#1A1A1A] font-bold text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Eye className="w-3.5 h-3.5 text-[#C2A55D]" />
                          <span>View HD Media</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Details Footer */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif-luxury text-base text-[#1A1A1A] group-hover:text-[#C2A55D] transition-colors font-medium line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#6B665E] font-light mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-3 border-t border-[#F2EFE9] flex items-center justify-between text-xs">
                      <span className="text-[#8C867D] font-medium">{item.sqm || item.projectName}</span>
                      <span className="font-bold text-[#C2A55D]">{item.price || (isVideo ? 'HD Video' : 'Official Media')}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors cursor-pointer z-20"
            title="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors cursor-pointer z-20 hidden sm:block"
            title="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors cursor-pointer z-20 hidden sm:block"
            title="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Content */}
          <div className="max-w-4xl w-full bg-[#1A1A1A] rounded-3xl overflow-hidden border border-white/20 shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Media Container (Image or YouTube Video) */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-black overflow-hidden flex items-center justify-center">
              {(activeItem.videoUrl || isYouTubeUrl(activeItem.image)) ? (
                <iframe
                  src={getYouTubeEmbedUrl(activeItem.videoUrl || activeItem.image)}
                  title={activeItem.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <SafeImage 
                  src={activeItem.image} 
                  alt={activeItem.title} 
                  fallbackType="project"
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            {/* Bottom Details Panel */}
            <div className="p-6 bg-[#24211E] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#C2A55D] text-white uppercase">
                    {activeItem.tag}
                  </span>
                  <span className="text-xs text-[#D8D3C8]">{activeItem.projectName}</span>
                </div>
                <h2 className="font-serif-luxury text-xl text-white font-normal">
                  {activeItem.title}
                </h2>
                <p className="text-xs text-[#A8A39A] font-light mt-1 max-w-xl">
                  {activeItem.description}
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto flex-shrink-0">
                {activeItem.project !== 'batching-plant' && activeItem.project !== 'events' && (
                  <button
                    onClick={() => {
                      setLightboxIndex(null);
                      onSelectProject(activeItem.project);
                    }}
                    className="px-4 py-2 bg-[#C2A55D] hover:bg-[#B3954C] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>View Project</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  onClick={() => onOpenContact(`Inquiry regarding media: ${activeItem.title}`)}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Contact Advisor
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
