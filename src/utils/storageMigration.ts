import { Property, MasterCommunity, SiteConfig, TeamMember, TestimonialItem, PressArticle, DocumentResource, FAQItem } from '../types';

export interface CustomMediaItem {
  id: string;
  title: string;
  projectName: string;
  project: string;
  category: 'photo' | 'floorplan' | 'video' | 'construction';
  image: string;
  videoUrl?: string;
  tag: string;
  description: string;
  sqm?: string;
  price?: string;
  dateAdded?: string;
  uploadedAt?: string;
}

function findStoredData<T>(keys: string[]): T | null {
  for (const key of keys) {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        const parsed = JSON.parse(item);
        if (parsed && (Array.isArray(parsed) ? parsed.length > 0 : Object.keys(parsed).length > 0)) {
          return parsed as T;
        }
      }
    } catch {
      // Continue checking next key
    }
  }
  return null;
}

/**
 * Load Properties while safely preserving all user edits (text, titles, prices, descriptions) and uploaded photos
 */
export function loadMergedProperties(initialProps: Property[]): Property[] {
  const propertyKeys = [
    'kaabsan_current_properties',
    'kaabsan_properties_v9',
    'kaabsan_properties_v12',
    'kaabsan_properties_v11',
    'kaabsan_properties_v10',
    'kaabsan_properties_v8',
    'kaabsan_properties_v7',
    'kaabsan_properties_data',
    'kaabsan_properties',
    'kaabsan_custom_properties',
    'kaabsan_user_properties'
  ];

  // Try the primary current key first
  try {
    const primaryRaw = localStorage.getItem('kaabsan_current_properties') || localStorage.getItem('kaabsan_properties_v9');
    if (primaryRaw) {
      const primaryParsed: Property[] = JSON.parse(primaryRaw);
      if (Array.isArray(primaryParsed) && primaryParsed.length > 0) {
        return primaryParsed;
      }
    }
  } catch {
    // ignore
  }

  // Collect all historical stored properties
  const allStoredProps: Property[] = [];
  for (const key of propertyKeys) {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed: Property[] = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          allStoredProps.push(...parsed);
        }
      }
    } catch {
      // ignore
    }
  }

  if (allStoredProps.length === 0) {
    return initialProps;
  }

  // Create lookup map by ID
  const propMapById = new Map<string, Property>();
  for (const p of allStoredProps) {
    if (!p || !p.id) continue;
    if (!propMapById.has(p.id)) {
      propMapById.set(p.id, p);
    }
  }

  // Merge with initial properties
  const merged: Property[] = initialProps.map((base) => {
    const stored = propMapById.get(base.id);
    if (!stored) return base;

    return {
      ...base,
      ...stored,
      id: base.id,
      title: stored.title || base.title,
      subtitle: stored.subtitle || base.subtitle,
      description: stored.description || base.description,
      price: stored.price || base.price,
      priceDisplay: stored.priceDisplay || base.priceDisplay,
      status: stored.status || base.status,
      beds: stored.beds ?? base.beds,
      baths: stored.baths ?? base.baths,
      sqft: stored.sqft ?? base.sqft,
      lotSize: stored.lotSize || base.lotSize,
      neighborhood: stored.neighborhood || base.neighborhood,
      address: stored.address || base.address,
      heroImage: (stored.heroImage && stored.heroImage.trim().length > 0) ? stored.heroImage : base.heroImage,
      galleryImages: (stored.galleryImages && stored.galleryImages.length > 0) ? stored.galleryImages : base.galleryImages,
      videoUrl: stored.videoUrl !== undefined ? stored.videoUrl : base.videoUrl,
      paymentPlan: stored.paymentPlan || base.paymentPlan,
      keyFeatures: (stored.keyFeatures && stored.keyFeatures.length > 0) ? stored.keyFeatures : base.keyFeatures,
      amenities: (stored.amenities && stored.amenities.length > 0) ? stored.amenities : base.amenities
    };
  });

  // Strictly deduplicate by id
  const finalProps: Property[] = [];
  const seenIds = new Set<string>();

  for (const p of merged) {
    if (!seenIds.has(p.id)) {
      seenIds.add(p.id);
      finalProps.push(p);
    }
  }

  // Also include any user-created custom properties that are not in base
  for (const stored of allStoredProps) {
    if (stored && stored.id && !seenIds.has(stored.id)) {
      seenIds.add(stored.id);
      finalProps.push(stored);
    }
  }

  return finalProps;
}

/**
 * Load Master Communities while safely preserving custom user text & uploaded photos
 */
export function loadMergedMasterCommunities(initialCommunities: MasterCommunity[]): MasterCommunity[] {
  const communityKeys = [
    'kaabsan_current_communities',
    'kaabsan_master_communities_v9',
    'kaabsan_master_communities_v12',
    'kaabsan_master_communities_v11',
    'kaabsan_master_communities_v10',
    'kaabsan_master_communities_v8',
    'kaabsan_master_communities_v7',
    'kaabsan_master_communities',
    'kaabsan_custom_communities'
  ];

  // Try the primary current key first
  try {
    const primaryRaw = localStorage.getItem('kaabsan_current_communities') || localStorage.getItem('kaabsan_master_communities_v9');
    if (primaryRaw) {
      const primaryParsed: MasterCommunity[] = JSON.parse(primaryRaw);
      if (Array.isArray(primaryParsed) && primaryParsed.length > 0) {
        return primaryParsed;
      }
    }
  } catch {
    // ignore
  }

  const allStored: MasterCommunity[] = [];
  for (const key of communityKeys) {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed: MasterCommunity[] = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          allStored.push(...parsed);
        }
      }
    } catch {
      // ignore
    }
  }

  if (allStored.length === 0) {
    return initialCommunities;
  }

  const commMapById = new Map<string, MasterCommunity>();
  for (const c of allStored) {
    if (c && c.id && !commMapById.has(c.id)) {
      commMapById.set(c.id, c);
    }
  }

  const merged = initialCommunities.map((base) => {
    const stored = commMapById.get(base.id);
    if (!stored) return base;

    return {
      ...base,
      ...stored,
      id: base.id,
      name: stored.name || base.name,
      location: stored.location || base.location,
      units: stored.units || base.units,
      status: stored.status || base.status,
      description: stored.description || base.description,
      image: (stored.image && stored.image.trim().length > 0) ? stored.image : base.image,
      galleryImages: (stored.galleryImages && stored.galleryImages.length > 0) ? stored.galleryImages : base.galleryImages,
      price: stored.price || base.price,
      priceDisplay: stored.priceDisplay || base.priceDisplay,
      priceRange: stored.priceRange || base.priceRange,
      actualSqm: stored.actualSqm || base.actualSqm,
      builtArea: stored.builtArea || base.builtArea,
      gpsDms: stored.gpsDms || base.gpsDms,
      gpsCoordinates: stored.gpsCoordinates || base.gpsCoordinates,
      features: (stored.features && stored.features.length > 0) ? stored.features : base.features
    };
  });

  // Guarantee strict uniqueness
  const finalCommunities: MasterCommunity[] = [];
  const seenIds = new Set<string>();

  for (const c of merged) {
    if (!seenIds.has(c.id)) {
      seenIds.add(c.id);
      finalCommunities.push(c);
    }
  }

  // Include custom added communities
  for (const stored of allStored) {
    if (stored && stored.id && !seenIds.has(stored.id)) {
      seenIds.add(stored.id);
      finalCommunities.push(stored);
    }
  }

  return finalCommunities;
}

/**
 * Load SiteConfig while preserving user uploaded hero slides, logos, contacts, and texts
 */
export function loadMergedSiteConfig(initialConfig: SiteConfig): SiteConfig {
  const configKeys = [
    'kaabsan_current_site_config',
    'kaabsan_site_config_v9',
    'kaabsan_site_config_v12',
    'kaabsan_site_config_v11',
    'kaabsan_site_config_v10',
    'kaabsan_site_config_v8',
    'kaabsan_site_config',
    'kaabsan_custom_site_config'
  ];

  const stored = findStoredData<SiteConfig>(configKeys);
  if (!stored) return initialConfig;

  // Check if user uploaded hero images
  const heroImages = (stored.hero?.heroImages && stored.hero.heroImages.length > 0)
    ? stored.hero.heroImages
    : initialConfig.hero.heroImages;

  return {
    ...initialConfig,
    ...stored,
    hero: {
      ...initialConfig.hero,
      ...stored.hero,
      heroImages
    },
    company: {
      ...initialConfig.company,
      ...stored.company
    },
    whatsappTemplates: {
      ...initialConfig.whatsappTemplates,
      ...stored.whatsappTemplates
    },
    bankFinancing: {
      ...initialConfig.bankFinancing,
      ...stored.bankFinancing
    },
    about: {
      ...initialConfig.about,
      ...stored.about
    },
    socialLinks: {
      ...initialConfig.socialLinks,
      ...stored.socialLinks
    },
    faqs: stored.faqs && stored.faqs.length > 0
      ? stored.faqs.map((sf: FAQItem) => {
          const base = initialConfig.faqs.find((b: FAQItem) => b.id === sf.id);
          return base ? { ...base, ...sf } : sf;
        })
      : initialConfig.faqs
  };
}

/**
 * Load Team Members while preserving uploaded photos
 */
export function loadMergedTeamMembers(initialTeam: TeamMember[]): TeamMember[] {
  const stored = findStoredData<TeamMember[]>([
    'kaabsan_current_team_members',
    'kaabsan_team_members',
    'kaabsan_team_members_v12',
    'kaabsan_team_members_v9'
  ]);
  if (!stored || !Array.isArray(stored) || stored.length === 0) return initialTeam;

  const map = new Map<string, TeamMember>(stored.map(m => [m.id, m]));
  const merged = initialTeam.map(base => {
    const s = map.get(base.id);
    if (!s) return base;
    return {
      ...base,
      ...s,
      photo: s.photo || base.photo,
      name: s.name || base.name,
      role: s.role || base.role,
      bio: s.bio || base.bio
    };
  });

  for (const s of stored) {
    if (!merged.some(m => m.id === s.id)) {
      merged.push(s);
    }
  }

  return merged;
}

/**
 * Load Documents while preserving both official brochures and user uploaded PDFs
 */
export function loadMergedDocuments(initialDocuments: DocumentResource[]): DocumentResource[] {
  // Direct source of truth if admin has explicitly managed documents
  try {
    const current = localStorage.getItem('kaabsan_current_documents');
    if (current) {
      const parsed = JSON.parse(current);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch {
    // fallback
  }

  const documentKeys = [
    'kaabsan_documents_v11',
    'kaabsan_documents_v12',
    'kaabsan_documents_v9',
    'kaabsan_documents',
    'kaabsan_custom_documents'
  ];

  const allStored: DocumentResource[] = [];
  for (const key of documentKeys) {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed: DocumentResource[] = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          allStored.push(...parsed);
        }
      }
    } catch {
      // ignore
    }
  }

  if (allStored.length === 0) {
    return initialDocuments;
  }

  const docMapById = new Map<string, DocumentResource>();
  for (const d of allStored) {
    if (!docMapById.has(d.id) || (d.fileUrl && d.fileUrl !== '#')) {
      docMapById.set(d.id, d);
    }
  }

  // If we have stored documents from previous versions, return those
  const result: DocumentResource[] = Array.from(docMapById.values());
  return result.length > 0 ? result : initialDocuments;
}

/**
 * Load Custom Uploaded Media for the Gallery
 */
export function loadCustomGalleryMedia(): CustomMediaItem[] {
  const keys = [
    'kaabsan_current_custom_media',
    'kaabsan_custom_gallery_media',
    'kaabsan_gallery_images',
    'kaabsan_uploaded_photos',
    'kaabsan_media_items',
    'kaabsan_gallery_custom',
    'kaabsan_photos'
  ];

  const items: CustomMediaItem[] = [];
  const seenIds = new Set<string>();
  const seenUrls = new Set<string>();

  for (const k of keys) {
    try {
      const raw = localStorage.getItem(k);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          for (const item of parsed) {
            if (item && item.image && !seenUrls.has(item.image) && !seenIds.has(item.id)) {
              seenUrls.add(item.image);
              seenIds.add(item.id);
              items.push(item);
            }
          }
        }
      }
    } catch {
      // ignore
    }
  }
  return items;
}

/**
 * Save Custom Uploaded Media
 */
export function saveCustomGalleryMedia(media: CustomMediaItem[]) {
  try {
    localStorage.setItem('kaabsan_current_custom_media', JSON.stringify(media));
    localStorage.setItem('kaabsan_custom_gallery_media', JSON.stringify(media));
  } catch (err) {
    console.error('Failed to save custom media to localStorage:', err);
  }
}
