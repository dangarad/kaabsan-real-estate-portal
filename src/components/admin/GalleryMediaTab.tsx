import React, { useState, useEffect } from 'react';
import { 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Upload, 
  Eye, 
  Sparkles, 
  Check, 
  Filter, 
  Building2, 
  ExternalLink,
  Save,
  Layers,
  MapPin,
  Calendar,
  Tag,
  Video,
  Play
} from 'lucide-react';
import { loadCustomGalleryMedia, saveCustomGalleryMedia, CustomMediaItem } from '../../utils/storageMigration';
import { Property, MasterCommunity } from '../../types';
import { BASE_GALLERY_ITEMS } from '../GalleryPage';
import { compressImageFile, sanitizeImageUrl } from '../../utils/imageCompressor';
import { SafeImage } from '../SafeImage';
import { LaptopImageUploader } from '../LaptopImageUploader';
import { isYouTubeUrl, getYouTubeThumbnail } from '../../utils/mediaUtils';
import { 
  saveGalleryItemToFirestore, 
  subscribeToGalleryItemsFromFirestore, 
  deleteGalleryItemFromFirestore 
} from '../../lib/firebase';

interface GalleryMediaTabProps {
  properties: Property[];
  masterCommunities: MasterCommunity[];
}

export const GalleryMediaTab: React.FC<GalleryMediaTabProps> = ({
  properties,
  masterCommunities
}) => {
  const [customMediaList, setCustomMediaList] = useState<CustomMediaItem[]>(() => {
    return loadCustomGalleryMedia();
  });

  // Subscribe to cloud Firestore gallery items
  useEffect(() => {
    const unsubscribe = subscribeToGalleryItemsFromFirestore((firestoreItems) => {
      if (firestoreItems && firestoreItems.length > 0) {
        setCustomMediaList((prev) => {
          const map = new Map<string, CustomMediaItem>();
          // local items first
          prev.forEach(p => map.set(p.id, p));
          // firestore items override/merge
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

  const [filterProject, setFilterProject] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // New Media Form State
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newProject, setNewProject] = useState('aragsan-village');
  const [newCategory, setNewCategory] = useState<'photo' | 'floorplan' | 'video' | 'construction'>('photo');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newTag, setNewTag] = useState('HD Photo');
  const [newSqm, setNewSqm] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Handle local file upload with automatic compression
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImageFile(file, 1400, 1000, 0.78);
        setNewImageUrl(compressed);
      } catch (err) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            setNewImageUrl(reader.result.toString());
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSaveMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl.trim() || !newTitle.trim()) return;

    let projectName = 'Aragsan Village';
    if (newProject === 'rugsan-gardens') projectName = 'Rugsan Gardens';
    else if (newProject === 'bilicsan-village' || newProject === 'bilicsan-estate') projectName = 'Bilicsan Village';
    else if (newProject === 'masalaha-apartments') projectName = 'Masallaha Apartments';
    else if (newProject === 'batching-plant') projectName = 'Kaabsan Ready-Mix Batching Plant';
    else if (newProject === 'events') projectName = 'Kaabsan Events & Community';

    let finalImage = newImageUrl.trim();
    let cat = newCategory;
    let videoUrl: string | undefined = undefined;

    if (isYouTubeUrl(finalImage)) {
      videoUrl = finalImage;
      cat = 'video';
      const ytThumb = getYouTubeThumbnail(finalImage);
      if (ytThumb) finalImage = ytThumb;
    }

    const rawId = `custom-media-${Date.now()}`;
    const newItem: CustomMediaItem = {
      id: rawId,
      title: newTitle.trim(),
      project: newProject,
      projectName,
      category: cat,
      image: finalImage,
      videoUrl,
      tag: newTag.trim() || (cat === 'video' ? 'YouTube Video' : 'Official Photo'),
      description: newDescription.trim() || `Sawirka rasmiga ah ee ${projectName}.`,
      sqm: newSqm.trim() || undefined,
      price: newPrice.trim() || undefined,
      dateAdded: new Date().toISOString()
    };

    const updated = [newItem, ...customMediaList];
    setCustomMediaList(updated);
    saveCustomGalleryMedia(updated);

    // Save to Firebase Firestore Cloud Database
    try {
      const firestoreId = await saveGalleryItemToFirestore({
        title: newItem.title,
        project: newItem.project,
        projectName: newItem.projectName,
        category: newItem.category,
        image: newItem.image,
        tag: newItem.tag,
        description: newItem.description,
        sqm: newItem.sqm,
        price: newItem.price,
        createdAt: newItem.dateAdded
      });
      if (firestoreId && !firestoreId.startsWith('local-')) {
        newItem.id = firestoreId;
        const synced = updated.map(m => m.id === rawId ? { ...m, id: firestoreId } : m);
        setCustomMediaList(synced);
        saveCustomGalleryMedia(synced);
      }
    } catch (err) {
      console.warn('Firebase save gallery error:', err);
    }

    // Reset Form
    setNewTitle('');
    setNewImageUrl('');
    setNewDescription('');
    setNewTag('HD Photo');
    setNewSqm('');
    setNewPrice('');
    setIsAdding(false);

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleDeleteCustomMedia = async (id: string) => {
    if (window.confirm('Ma hubtaa inaad tirtirto sawirkan maktabadda?')) {
      const updated = customMediaList.filter(m => m.id !== id);
      setCustomMediaList(updated);
      saveCustomGalleryMedia(updated);

      try {
        await deleteGalleryItemFromFirestore(id);
      } catch (err) {
        console.warn('Firebase delete gallery error:', err);
      }
    }
  };

  // Filtered List
  const filteredCustom = customMediaList.filter(item => {
    const matchProj = filterProject === 'all' || item.project === filterProject;
    const matchCat = filterCategory === 'all' || item.category === filterCategory;
    return matchProj && matchCat;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#C2A55D]/15 via-white to-white border border-[#C2A55D]/30 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#C2A55D] font-bold text-xs uppercase tracking-wider mb-1">
            <ImageIcon className="w-4 h-4" />
            <span>Kaabsan Media & Photo Gallery CMS</span>
          </div>
          <h2 className="font-serif-luxury text-2xl text-[#1A1A1A]">
            Maamulka Sawirrada & Maktabadda Webka (Media Gallery Manager)
          </h2>
          <p className="text-xs text-[#6B665E] mt-1 max-w-2xl">
            Halkan waxaad si toos ah uga soo galin kartaa sawirro cusub (Laptop/Device Upload ama Link URL), waxaad u kala qaybin kartaa mashaariicda (Rugsan, Aragsan, Bilicsan, Masallaha), waxaadna ku dari kartaa naqshadaha dabaqyada.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 bg-[#35322E] hover:bg-[#1A1815] text-white px-5 py-3 rounded-2xl font-bold text-xs shadow-md transition-all cursor-pointer whitespace-nowrap self-start md:self-auto"
          id="admin-add-photo-btn"
        >
          <Plus className="w-4 h-4 text-[#C2A55D]" />
          <span>{isAdding ? 'Xidh Foomka' : 'Soo Geli Sawir Cusub (Upload Media)'}</span>
        </button>
      </div>

      {/* Success Notification */}
      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Sawirka cusub si guul leh ayaa loogu daray maktabadda sawirrada ee website-ka!</span>
        </div>
      )}

      {/* Upload New Photo Form Modal/Drawer */}
      {isAdding && (
        <form onSubmit={handleSaveMedia} className="bg-white border border-[#C2A55D]/40 rounded-3xl p-6 sm:p-8 shadow-lg space-y-5 animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-serif-luxury text-lg text-[#1A1A1A] flex items-center gap-2">
              <Upload className="w-5 h-5 text-[#C2A55D]" />
              <span>Ku Dar Sawir Cusub Maktabadda (Add New Gallery Media)</span>
            </h3>
            <span className="text-[11px] text-gray-500 font-mono">Real-time Persistence</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Left Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                  Cinwaanka Sawirka (Photo Title) *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., Aragsan Village Master Bedroom / Rugsan Gardens VIP Living Room"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#1A1A1A] focus:bg-white focus:outline-none focus:border-[#C2A55D]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                    Mashruuca (Project)
                  </label>
                  <select
                    value={newProject}
                    onChange={(e) => setNewProject(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#1A1A1A] focus:bg-white focus:outline-none focus:border-[#C2A55D]"
                  >
                    <option value="aragsan-village">Aragsan Village (Buurta)</option>
                    <option value="rugsan-gardens">Rugsan Gardens (Masallaha)</option>
                    <option value="bilicsan-village">Bilicsan Village</option>
                    <option value="masalaha-apartments">Masallaha Apartments</option>
                    <option value="batching-plant">Kaabsan Ready-Mix Batching Plant</option>
                    <option value="events">Events & Handovers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                    Qaybta (Category)
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#1A1A1A] focus:bg-white focus:outline-none focus:border-[#C2A55D]"
                  >
                    <option value="photo">Sawir HD ah (HD Photo)</option>
                    <option value="floorplan">Naqshad / Dabaq (Floor Plan)</option>
                    <option value="construction">Goobta Dhismaha (Construction)</option>
                    <option value="video">Muuqaal Video ah</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] mb-1">Tag / Label</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Master Bedroom"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#1A1A1A] focus:bg-white focus:outline-none focus:border-[#C2A55D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] mb-1">Area / SQM (Opt)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 483 m²"
                    value={newSqm}
                    onChange={(e) => setNewSqm(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#1A1A1A] focus:bg-white focus:outline-none focus:border-[#C2A55D]"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-[#1A1A1A]">Price <span className="text-gray-400 font-normal text-[10px]">(Opt)</span></label>
                    {newPrice && (
                      <button
                        type="button"
                        onClick={() => setNewPrice('')}
                        className="text-[10px] text-red-600 hover:text-red-800 font-bold underline cursor-pointer"
                      >
                        Tirtir
                      </button>
                    )}
                  </div>
                  <input 
                    type="text" 
                    placeholder="e.g. $225,000 (ama ka tag marnaan)"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#1A1A1A] focus:bg-white focus:outline-none focus:border-[#C2A55D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                  Faahfaahin (Description)
                </label>
                <textarea
                  rows={2}
                  placeholder="Faahfaahinta sawirka ama muuqaalka..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#1A1A1A] focus:bg-white focus:outline-none focus:border-[#C2A55D]"
                />
              </div>
            </div>

            {/* Right: Upload File & Preview */}
            <div className="space-y-4">
              <LaptopImageUploader
                currentValue={newImageUrl}
                onImageSelected={(url) => {
                  setNewImageUrl(url);
                  if (isYouTubeUrl(url)) {
                    setNewCategory('video');
                    if (!newTag || newTag === 'Official Photo' || newTag === 'HD Photo') {
                      setNewTag('YouTube Video');
                    }
                  }
                }}
                label="Ka Soo Geli Kumbuyuutarka / Ama Geli Link / YouTube"
                helperText="Supports Direct Laptop Upload (PNG/JPG/WebP), CDN URLs, or YouTube links"
              />

              {isYouTubeUrl(newImageUrl) && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between gap-2 text-xs text-red-900">
                  <div className="flex items-center gap-2">
                    <Play className="w-4 h-4 text-red-600 fill-red-600" />
                    <span className="font-bold">Muuqaal YouTube ah ayaa la aqoonsaday!</span>
                  </div>
                  <a
                    href={newImageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-700 font-bold underline flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" /> Tijaabi Link-ga
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 cursor-pointer"
            >
              Ka Noqo (Cancel)
            </button>
            <button
              type="submit"
              disabled={!newImageUrl || !newTitle}
              className={`px-6 py-2.5 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md disabled:opacity-50 flex items-center gap-2 ${
                isYouTubeUrl(newImageUrl) || newCategory === 'video'
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-[#C2A55D] hover:bg-[#B3954C]'
              }`}
            >
              <Save className="w-4 h-4" />
              <span>
                {isYouTubeUrl(newImageUrl) || newCategory === 'video'
                  ? 'Keydi Muuqaalka YouTube-ka (Save Video)'
                  : 'Keydi Sawirka (Save to Gallery)'}
              </span>
            </button>
          </div>
        </form>
      )}

      {/* Filter and Stats Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-[#C2A55D]" />
            Shaandhee (Filter):
          </span>
          <select
            value={filterProject}
            onChange={(e) => setFilterProject(e.target.value)}
            className="text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-gray-800 focus:outline-none"
          >
            <option value="all">Dhammaan Mashaariicda (All)</option>
            <option value="aragsan-village">Aragsan Village</option>
            <option value="rugsan-gardens">Rugsan Gardens</option>
            <option value="bilicsan-village">Bilicsan Village</option>
            <option value="masalaha-apartments">Masallaha Apartments</option>
            <option value="batching-plant">Batching Plant</option>
            <option value="events">Events</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-gray-800 focus:outline-none"
          >
            <option value="all">Dhammaan Noocyada (All)</option>
            <option value="photo">Sawirro (Photos)</option>
            <option value="floorplan">Naqshado (Floorplans)</option>
            <option value="construction">Goobta Dhismaha (Construction)</option>
          </select>
        </div>

        <div className="text-xs text-gray-500 font-medium">
          Sawirrada Gaarka ah ee CMS: <strong className="text-gray-900">{customMediaList.length}</strong> | 
          Guud ahaan Sawirrada: <strong className="text-[#C2A55D]">{customMediaList.length + BASE_GALLERY_ITEMS.length}</strong>
        </div>
      </div>

      {/* Grid of Admin-Managed Custom Media */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C2A55D]" />
            <span>Sawirrada Adigu Aad Soo Gelisay (Admin Uploaded Media)</span>
          </h3>
          <span className="text-xs text-gray-400">{filteredCustom.length} Sawir</span>
        </div>

        {filteredCustom.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 border border-gray-200 text-center space-y-3">
            <ImageIcon className="w-12 h-12 text-gray-300 mx-auto" />
            <div className="text-sm font-bold text-gray-700">Weli wax sawirro gaar ah ma aadan soo gelin</div>
            <p className="text-xs text-gray-400 max-w-md mx-auto">
              Guji badhanka kore ee <strong className="text-[#C2A55D]">"Soo Geli Sawir Cusub"</strong> si aad sawirro cusub uga soo geliso laptop-kaaga ama taleefankaaga.
            </p>
            <button
              onClick={() => setIsAdding(true)}
              className="px-4 py-2 bg-[#35322E] text-white text-xs font-bold rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#C2A55D]" />
              <span>Soo Geli Hadda</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredCustom.map((item) => {
              const isVideo = item.category === 'video' || isYouTubeUrl(item.image) || (item.videoUrl && isYouTubeUrl(item.videoUrl));
              const displayImg = isYouTubeUrl(item.image) ? getYouTubeThumbnail(item.image) : item.image;

              return (
                <div 
                  key={item.id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
                >
                  <div className="relative aspect-[16/10] bg-gray-900 overflow-hidden">
                    <SafeImage 
                      src={displayImg} 
                      alt={item.title} 
                      fallbackType="project"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                        <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md">
                          <Play className="w-4 h-4 fill-white ml-0.5" />
                        </div>
                      </div>
                    )}
                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20">
                      {item.projectName}
                    </div>
                    <div className="absolute top-2 right-2 bg-[#C2A55D] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {item.tag}
                    </div>
                  </div>

                  <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 line-clamp-1">{item.title}</h4>
                      <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5">{item.description}</p>
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                      <span className="text-gray-400 font-mono capitalize">{item.category}</span>
                      <button
                        onClick={() => handleDeleteCustomMedia(item.id)}
                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                        title="Delete Photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold">Tirtir</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Built-in System Master Gallery Reference */}
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-gray-500" />
          <span>Sawirrada Asalka ah ee Mashaariicda (Base Master Gallery Photos)</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {BASE_GALLERY_ITEMS.map((base) => (
            <div key={base.id} className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50 text-center">
              <div className="aspect-[16/10] bg-gray-900">
                <img src={base.image} alt={base.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-2 text-[11px] font-bold text-gray-800 truncate">
                {base.projectName}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
