import { initializeApp, getApps, getApp } from 'firebase/app';
import { Property, MasterCommunity, SiteConfig, DocumentResource } from '../types';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore';

const firebaseConfig = {
  projectId: "gen-lang-client-0826556763",
  appId: "1:329093905551:web:e41d5fea48cbad5ef7c4fa",
  apiKey: "AIzaSyCfMfA32OWz8ptqfWJ8Z4mI2qT4SpGmswg",
  authDomain: "gen-lang-client-0826556763.firebaseapp.com",
  storageBucket: "gen-lang-client-0826556763.firebasestorage.app",
  messagingSenderId: "329093905551"
};

export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app, "ai-studio-kaabsanrealestat-7154ffec-df85-4950-bc20-49aa16882068");

export interface FirestoreLead {
  id?: string;
  fullName: string;
  phone: string;
  email?: string;
  country?: string;
  propertyTitle?: string;
  project?: string;
  type: 'tour' | 'contact' | 'valuation' | 'purchase' | 'mortgage' | 'callback';
  message?: string;
  status: 'new' | 'contacted' | 'scheduled' | 'completed' | 'cancelled';
  preferredDate?: string;
  preferredTime?: string;
  financingPlan?: string;
  createdAt: string;
  notes?: string;
}

export interface FirestoreGalleryItem {
  id?: string;
  title: string;
  project: string;
  projectName: string;
  category: 'photo' | 'video' | 'floorplan' | 'construction';
  image: string;
  tag?: string;
  description?: string;
  sqm?: string;
  price?: string;
  createdAt?: string;
}

// Leads collection helpers
export async function saveLeadToFirestore(lead: Omit<FirestoreLead, 'id'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'leads'), {
      ...lead,
      createdAt: lead.createdAt || new Date().toISOString(),
      serverCreated: serverTimestamp()
    });
    return docRef.id;
  } catch (err) {
    console.warn('Firebase saveLead error, continuing offline:', err);
    return 'local-' + Date.now();
  }
}

export function subscribeToLeadsFromFirestore(callback: (leads: FirestoreLead[]) => void) {
  try {
    const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
    return onSnapshot(
      q,
      (snapshot) => {
        const items: FirestoreLead[] = [];
        snapshot.forEach((docSnap) => {
          items.push({
            id: docSnap.id,
            ...(docSnap.data() as Omit<FirestoreLead, 'id'>)
          });
        });
        callback(items);
      },
      (err) => {
        console.warn('Firestore leads subscription fallback:', err);
      }
    );
  } catch (err) {
    console.warn('Cannot subscribe to leads:', err);
    return () => {};
  }
}

export async function updateLeadStatusInFirestore(leadId: string, status: FirestoreLead['status']) {
  if (leadId.startsWith('local-') || leadId.startsWith('lead-')) {
    return;
  }
  try {
    const docRef = doc(db, 'leads', leadId);
    await updateDoc(docRef, { status });
  } catch (err) {
    console.warn('Error updating lead in firestore:', err);
  }
}

export async function deleteLeadFromFirestore(leadId: string) {
  if (leadId.startsWith('local-') || leadId.startsWith('lead-')) {
    return;
  }
  try {
    const docRef = doc(db, 'leads', leadId);
    await deleteDoc(docRef);
  } catch (err) {
    console.warn('Error deleting lead from firestore:', err);
  }
}

// Properties Cloud Syncing
export async function savePropertiesToFirestore(properties: Property[]) {
  try {
    // 1. Save each individual property into 'properties' collection for unlimited document capacity
    for (const prop of properties) {
      if (prop && prop.id) {
        const propRef = doc(db, 'properties', prop.id);
        await setDoc(propRef, {
          ...prop,
          serverUpdated: serverTimestamp()
        }, { merge: true });
      }
    }

    // 2. Also update aggregate site_settings
    const docRef = doc(db, 'site_settings', 'properties_data');
    await setDoc(docRef, {
      items: properties,
      updatedAt: new Date().toISOString(),
      serverUpdated: serverTimestamp()
    }, { merge: true });
  } catch (err) {
    console.warn('Error syncing properties to firestore:', err);
  }
}

export function subscribeToPropertiesFromFirestore(callback: (properties: Property[]) => void) {
  try {
    // Listen to collection 'properties' first
    const colRef = collection(db, 'properties');
    return onSnapshot(colRef, (snapshot) => {
      if (snapshot && !snapshot.empty && snapshot.docs.length > 0) {
        const list: Property[] = [];
        snapshot.forEach((docSnap) => {
          list.push(docSnap.data() as Property);
        });
        if (list.length > 0) {
          callback(list);
          return;
        }
      }
      
      // Fallback to site_settings/properties_data if collection is empty
      const docRef = doc(db, 'site_settings', 'properties_data');
      getDocs(collection(db, 'site_settings')).catch(() => {});
    }, (err) => {
      console.warn('Firestore properties collection subscription fallback:', err);
    });
  } catch (err) {
    console.warn('Cannot subscribe to properties:', err);
    return () => {};
  }
}

// Master Communities Cloud Syncing
export async function saveMasterCommunitiesToFirestore(communities: MasterCommunity[]) {
  try {
    const docRef = doc(db, 'site_settings', 'master_communities_data');
    await setDoc(docRef, {
      items: communities,
      updatedAt: new Date().toISOString(),
      serverUpdated: serverTimestamp()
    }, { merge: true });
  } catch (err) {
    console.warn('Error syncing master communities to firestore:', err);
  }
}

export function subscribeToMasterCommunitiesFromFirestore(callback: (communities: MasterCommunity[]) => void) {
  try {
    const docRef = doc(db, 'site_settings', 'master_communities_data');
    return onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data && Array.isArray(data.items) && data.items.length > 0) {
          callback(data.items as MasterCommunity[]);
        }
      }
    }, (err) => {
      console.warn('Firestore master communities subscription fallback:', err);
    });
  } catch (err) {
    console.warn('Cannot subscribe to master communities:', err);
    return () => {};
  }
}

// Site Config Cloud Syncing
export async function saveSiteConfigToFirestore(config: SiteConfig) {
  try {
    const docRef = doc(db, 'site_settings', 'site_config_data');
    await setDoc(docRef, {
      config,
      updatedAt: new Date().toISOString(),
      serverUpdated: serverTimestamp()
    }, { merge: true });
  } catch (err) {
    console.warn('Error syncing site config to firestore:', err);
  }
}

export function subscribeToSiteConfigFromFirestore(callback: (config: SiteConfig) => void) {
  try {
    const docRef = doc(db, 'site_settings', 'site_config_data');
    return onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data && data.config) {
          callback(data.config as SiteConfig);
        }
      }
    }, (err) => {
      console.warn('Firestore site config subscription fallback:', err);
    });
  } catch (err) {
    console.warn('Cannot subscribe to site config:', err);
    return () => {};
  }
}

export async function saveGalleryItemToFirestore(item: FirestoreGalleryItem): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'gallery_items'), {
      ...item,
      createdAt: item.createdAt || new Date().toISOString(),
      serverCreated: serverTimestamp()
    });
    return docRef.id;
  } catch (err) {
    console.warn('Firebase saveGalleryItem error:', err);
    return 'local-' + Date.now();
  }
}

export function subscribeToGalleryItemsFromFirestore(callback: (items: FirestoreGalleryItem[]) => void) {
  try {
    const q = query(collection(db, 'gallery_items'), orderBy('createdAt', 'desc'));
    return onSnapshot(
      q,
      (snapshot) => {
        const items: FirestoreGalleryItem[] = [];
        snapshot.forEach((docSnap) => {
          items.push({
            id: docSnap.id,
            ...(docSnap.data() as Omit<FirestoreGalleryItem, 'id'>)
          });
        });
        callback(items);
      },
      (err) => {
        console.warn('Firestore gallery subscription fallback:', err);
      }
    );
  } catch (err) {
    console.warn('Cannot subscribe to gallery:', err);
    return () => {};
  }
}

export async function deleteGalleryItemFromFirestore(itemId: string) {
  if (itemId.startsWith('local-') || itemId.startsWith('base-')) {
    return;
  }
  try {
    const docRef = doc(db, 'gallery_items', itemId);
    await deleteDoc(docRef);
  } catch (err) {
    console.warn('Error deleting gallery item from firestore:', err);
  }
}

// Documents & Brochures Cloud Syncing
export async function saveDocumentsToFirestore(documents: DocumentResource[]) {
  try {
    const docRef = doc(db, 'site_settings', 'documents_data');
    await setDoc(docRef, {
      items: documents,
      updatedAt: new Date().toISOString(),
      serverUpdated: serverTimestamp()
    }, { merge: true });
  } catch (err) {
    console.warn('Error syncing documents to firestore:', err);
  }
}

export function subscribeToDocumentsFromFirestore(callback: (documents: DocumentResource[]) => void) {
  try {
    const docRef = doc(db, 'site_settings', 'documents_data');
    return onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data && Array.isArray(data.items)) {
          callback(data.items as DocumentResource[]);
        }
      }
    }, (err) => {
      console.warn('Firestore documents subscription fallback:', err);
    });
  } catch (err) {
    console.warn('Cannot subscribe to documents:', err);
    return () => {};
  }
}

