import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp,
  addDoc
} from 'firebase/firestore';
import { Property, MasterCommunity } from '../types';

let firebaseConfig: any = null;
try {
  const metaEnv = typeof import.meta !== 'undefined' ? (import.meta as any).env : null;
  if (metaEnv && metaEnv.VITE_FIREBASE_CONFIG) {
    firebaseConfig = JSON.parse(metaEnv.VITE_FIREBASE_CONFIG);
  }
} catch {
  // ignore
}

if (!firebaseConfig) {
  firebaseConfig = {
    apiKey: "AIzaSyDummyKeyForStaticProductionBuild7154",
    authDomain: "ai-studio-kaabsanrealestat-7154ffec-df85-4950-bc20-49aa16882068.firebaseapp.com",
    projectId: "ai-studio-kaabsanrealestat-7154ffec-df85-4950-bc20-49aa16882068",
    storageBucket: "ai-studio-kaabsanrealestat-7154ffec-df85-4950-bc20-49aa16882068.appspot.com",
    messagingSenderId: "81589094137",
    appId: "1:81589094137:web:7154ffecdf854950bc2049"
  };
}

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app, "ai-studio-kaabsanrealestat-7154ffec-df85-4950-bc20-49aa16882068");

// Leads
export interface FirestoreLead {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  propertyTitle?: string;
  propertyName?: string;
  source?: string;
  type?: 'viewing' | 'consultation' | 'inquiry' | 'contact' | 'direct_deal';
  status?: 'new' | 'contacted' | 'scheduled' | 'closed' | 'negotiation';
  notes?: string;
  createdAt?: string;
  rawDate?: any;
}

export async function submitLeadToFirestore(lead: Omit<FirestoreLead, 'id' | 'createdAt'>) {
  try {
    const colRef = collection(db, 'leads');
    const docData = {
      ...lead,
      status: lead.status || 'new',
      type: lead.type || 'inquiry',
      source: lead.source || 'Website Contact Form',
      createdAt: new Date().toISOString(),
      timestamp: serverTimestamp()
    };
    const res = await addDoc(colRef, docData);
    return res.id;
  } catch (err) {
    console.warn('Error saving lead to firestore:', err);
    return null;
  }
}

export function subscribeToLeadsFromFirestore(callback: (leads: FirestoreLead[]) => void) {
  try {
    const colRef = collection(db, 'leads');
    const q = query(colRef, orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const leads: FirestoreLead[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        leads.push({
          id: docSnap.id,
          name: data.name || 'Anonymous Client',
          phone: data.phone || 'No phone',
          email: data.email || '',
          propertyTitle: data.propertyTitle || data.propertyName || 'General Inquiry',
          propertyName: data.propertyName || data.propertyTitle || 'General Inquiry',
          source: data.source || 'Website',
          type: data.type || 'inquiry',
          status: data.status || 'new',
          notes: data.notes || '',
          createdAt: data.createdAt || new Date().toISOString()
        });
      });
      callback(leads);
    }, (err) => {
      console.warn('Firestore leads subscription error:', err);
    });
  } catch (err) {
    console.warn('Cannot subscribe to leads:', err);
    return () => {};
  }
}

export async function updateLeadStatusInFirestore(leadId: string, status: FirestoreLead['status']) {
  try {
    const docRef = doc(db, 'leads', leadId);
    await setDoc(docRef, { status, updatedAt: serverTimestamp() }, { merge: true });
  } catch (err) {
    console.warn('Error updating lead status in firestore:', err);
  }
}

export async function deleteLeadFromFirestore(leadId: string) {
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
    const validProps = properties.filter(p => p && p.id);
    const activeIds = new Set(validProps.map(p => p.id));

    for (const prop of validProps) {
      const propRef = doc(db, 'properties', prop.id);
      await setDoc(propRef, {
        ...prop,
        serverUpdated: serverTimestamp()
      }, { merge: true });
    }

    try {
      const existingSnapshot = await getDocs(collection(db, 'properties'));
      for (const docSnap of existingSnapshot.docs) {
        if (!activeIds.has(docSnap.id)) {
          await deleteDoc(doc(db, 'properties', docSnap.id));
        }
      }
    } catch (e) {
      console.warn('Could not clean up deleted properties:', e);
    }
  } catch (err) {
    console.warn('Error syncing properties to firestore:', err);
  }
}

export async function deletePropertyFromFirestore(propId: string) {
  try {
    const propRef = doc(db, 'properties', propId);
    await deleteDoc(propRef);
  } catch (err) {
    console.warn('Error deleting property from firestore:', err);
  }
}

export function subscribeToPropertiesFromFirestore(callback: (properties: Property[]) => void) {
  try {
    const colRef = collection(db, 'properties');
    return onSnapshot(colRef, (snapshot) => {
      if (snapshot && !snapshot.empty && snapshot.docs.length > 0) {
        const list: Property[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data() as Property;
          if (data && data.id) {
            list.push(data);
          }
        });
        if (list.length > 0) {
          callback(list);
        }
      }
    }, (err) => {
      console.warn('Firestore properties collection subscription error:', err);
    });
  } catch (err) {
    console.warn('Cannot subscribe to properties:', err);
    return () => {};
  }
}

// Master Communities Cloud Syncing
export async function saveMasterCommunitiesToFirestore(communities: MasterCommunity[]) {
  try {
    const validComm = communities.filter(c => c && c.id);
    const activeIds = new Set(validComm.map(c => c.id));

    for (const comm of validComm) {
      const commRef = doc(db, 'master_communities', comm.id);
      await setDoc(commRef, {
        ...comm,
        serverUpdated: serverTimestamp()
      }, { merge: true });
    }

    try {
      const existingSnapshot = await getDocs(collection(db, 'master_communities'));
      for (const docSnap of existingSnapshot.docs) {
        if (!activeIds.has(docSnap.id)) {
          await deleteDoc(doc(db, 'master_communities', docSnap.id));
        }
      }
    } catch (e) {
      // ignore
    }
  } catch (err) {
    console.warn('Error syncing master communities to firestore:', err);
  }
}

export function subscribeToMasterCommunitiesFromFirestore(callback: (communities: MasterCommunity[]) => void) {
  try {
    const colRef = collection(db, 'master_communities');
    return onSnapshot(colRef, (snapshot) => {
      if (snapshot && !snapshot.empty && snapshot.docs.length > 0) {
        const list: MasterCommunity[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data() as MasterCommunity;
          if (data && data.id) {
            list.push(data);
          }
        });
        if (list.length > 0) {
          callback(list);
          return;
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

// Gallery Media Items Cloud Syncing
export interface FirestoreGalleryItem {
  id?: string;
  title: string;
  project: string;
  projectName: string;
  category: string;
  image: string;
  tag?: string;
  description?: string;
  sqm?: string;
  price?: string;
  createdAt?: string;
}

export async function saveGalleryItemToFirestore(item: FirestoreGalleryItem) {
  try {
    const colRef = collection(db, 'gallery_media');
    const docData = {
      ...item,
      createdAt: item.createdAt || new Date().toISOString(),
      serverTimestamp: serverTimestamp()
    };
    if (item.id) {
      await setDoc(doc(db, 'gallery_media', item.id), docData, { merge: true });
      return item.id;
    } else {
      const res = await addDoc(colRef, docData);
      return res.id;
    }
  } catch (err) {
    console.warn('Error saving gallery item to firestore:', err);
    return null;
  }
}

export async function deleteGalleryItemFromFirestore(itemId: string) {
  try {
    const docRef = doc(db, 'gallery_media', itemId);
    await deleteDoc(docRef);
  } catch (err) {
    console.warn('Error deleting gallery item from firestore:', err);
  }
}

export function subscribeToGalleryItemsFromFirestore(callback: (items: FirestoreGalleryItem[]) => void) {
  try {
    const colRef = collection(db, 'gallery_media');
    return onSnapshot(colRef, (snapshot) => {
      const items: FirestoreGalleryItem[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as FirestoreGalleryItem;
        items.push({
          ...data,
          id: docSnap.id
        });
      });
      callback(items);
    }, (err) => {
      console.warn('Firestore gallery items subscription error:', err);
    });
  } catch (err) {
    console.warn('Cannot subscribe to gallery items:', err);
    return () => {};
  }
}
