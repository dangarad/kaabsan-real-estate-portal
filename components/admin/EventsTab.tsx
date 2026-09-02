import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  Image as ImageIcon, 
  Check, 
  ExternalLink,
  Award,
  Sparkles,
  Clock,
  CheckCircle2,
  Share2,
  Video,
  Play,
  Search,
  Link as LinkIcon
} from 'lucide-react';
import { LaptopImageUploader } from '../LaptopImageUploader';
import { KaabsanEvent } from '../EventsPage';
import { SafeImage } from '../SafeImage';
import { isYouTubeUrl, getYouTubeThumbnail, extractYouTubeId } from '../../utils/mediaUtils';

interface EventsTabProps {
  events: KaabsanEvent[];
  onUpdateEvents: (updated: KaabsanEvent[]) => void;
}

export const EventsTab: React.FC<EventsTabProps> = ({
  events,
  onUpdateEvents
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [form, setForm] = useState<Partial<KaabsanEvent>>({
    title: '',
    titleSo: '',
    titleAr: '',
    category: 'handover',
    date: new Date().toISOString().split('T')[0],
    dateDisplay: 'August 2026',
    location: 'Masalaha, Hargeisa',
    locationSo: 'Masalaha, Hargeysa',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    videoUrl: '',
    gallery: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80'
    ],
    description: '',
    descriptionSo: '',
    descriptionAr: '',
    highlights: ['Key Handover to Homeowners', 'Telesom Group & Bank Delegation', 'Asphalt Roads Inauguration'],
    attendeesCount: '350+ Guests',
    isUpcoming: false
  });

  const [newHighlight, setNewHighlight] = useState('');
  const [newGalleryUrl, setNewGalleryUrl] = useState('');

  const filteredEvents = events.filter(e => 
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.titleSo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (event: KaabsanEvent) => {
    setEditingId(event.id);
    setForm({ ...event });
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title && !form.titleSo) return;

    // Intelligently resolve YouTube links
    let finalImage = form.image || '';
    let finalVideoUrl = form.videoUrl || '';

    // If the image field contains a YouTube URL, extract thumbnail and set videoUrl
    if (isYouTubeUrl(finalImage)) {
      if (!finalVideoUrl) finalVideoUrl = finalImage;
      const ytThumb = getYouTubeThumbnail(finalImage);
      if (ytThumb) finalImage = ytThumb;
    } else if (finalVideoUrl && isYouTubeUrl(finalVideoUrl) && (!finalImage || finalImage.includes('unsplash'))) {
      const ytThumb = getYouTubeThumbnail(finalVideoUrl);
      if (ytThumb) finalImage = ytThumb;
    }

    if (editingId) {
      const updated = events.map(ev => 
        ev.id === editingId ? { 
          ...ev, 
          ...form,
          image: finalImage || ev.image,
          videoUrl: finalVideoUrl
        } as KaabsanEvent : ev
      );
      onUpdateEvents(updated);
    } else {
      const newEv: KaabsanEvent = {
        id: `event-${Date.now()}`,
        title: form.title || form.titleSo || 'Ceremony Event',
        titleSo: form.titleSo || form.title || 'Munaasabad Cusub',
        titleAr: form.titleAr || form.title || '',
        category: form.category || 'handover',
        date: form.date || new Date().toISOString().split('T')[0],
        dateDisplay: form.dateDisplay || '2026',
        location: form.location || 'Hargeisa',
        locationSo: form.locationSo || 'Hargeysa',
        image: finalImage || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
        videoUrl: finalVideoUrl,
        gallery: form.gallery && form.gallery.length > 0 ? form.gallery : [finalImage],
        description: form.description || form.descriptionSo || '',
        descriptionSo: form.descriptionSo || form.description || '',
        descriptionAr: form.descriptionAr || '',
        highlights: form.highlights && form.highlights.length > 0 ? form.highlights : ['Munaasabad Rasmi ah oo Kaabsan'],
        attendeesCount: form.attendeesCount || '200+ Guests',
        isUpcoming: form.isUpcoming || false
      };
      onUpdateEvents([newEv, ...events]);
    }

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
    setIsAdding(false);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Ma hubtaa inaad tirtirto munaasabaddan?')) {
      onUpdateEvents(events.filter(e => e.id !== id));
    }
  };

  const addHighlight = () => {
    if (!newHighlight.trim()) return;
    setForm({
      ...form,
      highlights: [...(form.highlights || []), newHighlight.trim()]
    });
    setNewHighlight('');
  };

  const removeHighlight = (index: number) => {
    const list = [...(form.highlights || [])];
    list.splice(index, 1);
    setForm({ ...form, highlights: list });
  };

  const addGalleryImage = () => {
    if (!newGalleryUrl.trim()) return;
    setForm({
      ...form,
      gallery: [...(form.gallery || []), newGalleryUrl.trim()]
    });
    setNewGalleryUrl('');
  };

  const removeGalleryImage = (index: number) => {
    const list = [...(form.gallery || [])];
    list.splice(index, 1);
    setForm({ ...form, gallery: list });
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#C2A55D]" />
            Maamulka Munaasabadaha & Muuqaallada (Events & Videos)
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Ku dar munaasabado cusub, sawirro, iyo link-yada YouTube ee xafladaha wareejinta furayaasha & dhagax-dhigga
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setEditingId(null);
              setForm({
                title: '',
                titleSo: '',
                titleAr: '',
                category: 'handover',
                date: new Date().toISOString().split('T')[0],
                dateDisplay: 'August 2026',
                location: 'Masalaha, Hargeisa',
                locationSo: 'Masalaha, Hargeysa',
                image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
                videoUrl: '',
                gallery: [
                  'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
                  'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80'
                ],
                description: '',
                descriptionSo: '',
                descriptionAr: '',
                highlights: ['Key Handover to Homeowners', 'Telesom Group & Bank Delegation'],
                attendeesCount: '350+ Guests'
              });
              setIsAdding(true);
            }}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Ku Dar Munaasabad / YouTube Video
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2.5 text-emerald-800 text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Munaasabadda si guul leh ayaa loo keydiyay loona daabacay websaytka!</span>
        </div>
      )}

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Raadi munaasabad (magac, goob, ama nooc)..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>

      {/* Event Add/Edit Form */}
      {isAdding && (
        <div className="bg-white p-6 rounded-2xl border-2 border-indigo-200 shadow-md space-y-5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h4 className="font-bold text-sm text-gray-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              {editingId ? 'Wax ka beddel Munaasabadda' : 'Geli Munaasabad Cusub & YouTube Video'}
            </h4>
            <button
              onClick={() => setIsAdding(false)}
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Category */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Nooca Munaasabadda (Category)</label>
                <select
                  value={form.category || 'handover'}
                  onChange={e => setForm({ ...form, category: e.target.value as any })}
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="handover">Wareejinta Furayaasha (Key Handover)</option>
                  <option value="groundbreaking">Dhagax-dhigga (Groundbreaking)</option>
                  <option value="community">Kulamada Bulshada (Community Forum)</option>
                  <option value="education">Furitaanka Dugsiyada (Education Campus)</option>
                  <option value="expo">Warshadaha & Soo Bandhigga (Industrial/Expo)</option>
                </select>
              </div>

              {/* Title Somali */}
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-gray-700">Cinwaanka Munaasabadda (Somali) *</label>
                <input
                  type="text"
                  required
                  value={form.titleSo || ''}
                  onChange={e => setForm({ ...form, titleSo: e.target.value })}
                  placeholder="tusaale: Xafladdii Weynayd ee Wareejinta Furayaasha Rugsan Gardens"
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Title English */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Event Title (English)</label>
                <input
                  type="text"
                  value={form.title || ''}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Rugsan Gardens Phase 1 Key Handover Gala"
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Title Arabic */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Cinwaanka (Arabic)</label>
                <input
                  type="text"
                  value={form.titleAr || ''}
                  onChange={e => setForm({ ...form, titleAr: e.target.value })}
                  placeholder="حفل تسليم المفاتيح لقرية روغسان"
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Date */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Taariikhda (ISO Date)</label>
                <input
                  type="date"
                  value={form.date || ''}
                  onChange={e => setForm({ ...form, date: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Date Display */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Qoraalka Bisha (e.g. November 2024)</label>
                <input
                  type="text"
                  value={form.dateDisplay || ''}
                  onChange={e => setForm({ ...form, dateDisplay: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Attendees */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Tirada Ka Qayb-gashay (Attendees)</label>
                <input
                  type="text"
                  value={form.attendeesCount || ''}
                  onChange={e => setForm({ ...form, attendeesCount: e.target.value })}
                  placeholder="450+ Attendees"
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Location Somali */}
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-gray-700">Goobta (Location Somali)</label>
                <input
                  type="text"
                  value={form.locationSo || ''}
                  onChange={e => setForm({ ...form, locationSo: e.target.value })}
                  placeholder="Fagaaraha Rugsan Gardens, Masalaha, Hargeysa"
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Location English */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Location (English)</label>
                <input
                  type="text"
                  value={form.location || ''}
                  onChange={e => setForm({ ...form, location: e.target.value })}
                  placeholder="Rugsan Gardens Plaza, Masalaha, Hargeisa"
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* YouTube Video Link Input */}
            <div className="p-4 bg-red-50/60 border border-red-200 rounded-2xl space-y-2">
              <label className="text-xs font-bold text-red-900 flex items-center gap-1.5">
                <Video className="w-4 h-4 text-red-600" />
                Muuqaal YouTube (YouTube Video Link - Ikhtiyaari)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={form.videoUrl || ''}
                  onChange={e => {
                    const val = e.target.value;
                    setForm(prev => {
                      const ytThumb = isYouTubeUrl(val) ? getYouTubeThumbnail(val) : null;
                      return {
                        ...prev,
                        videoUrl: val,
                        // If current image is placeholder or empty, auto-set to YouTube HD thumbnail
                        image: ytThumb && (!prev.image || prev.image.includes('unsplash')) ? ytThumb : prev.image
                      };
                    });
                  }}
                  placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ ama https://youtu.be/..."
                  className="flex-1 px-3.5 py-2 text-xs bg-white border border-red-300 rounded-xl focus:ring-2 focus:ring-red-500 text-gray-900"
                />
                {form.videoUrl && isYouTubeUrl(form.videoUrl) && (
                  <span className="px-3 py-2 bg-red-600 text-white rounded-xl text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Video Sax ah
                  </span>
                )}
              </div>
              <p className="text-[11px] text-red-700">
                ⭐ Marka aad link YouTube ah geliso, websaytka waxaa ka shaqaynaya Video Player toos ah, sawirka (cover thumbnail) na si toos ah ayaa looga soo jarayaa.
              </p>
            </div>

            {/* Direct Laptop Image Upload for Hero / Cover */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <label className="text-xs font-bold text-gray-700">Sawirka Weyn ee Munaasabadda (Hero Image / Cover)</label>
              <LaptopImageUploader
                currentValue={form.image || ''}
                onImageSelected={(url) => {
                  if (isYouTubeUrl(url)) {
                    const ytThumb = getYouTubeThumbnail(url);
                    setForm({ 
                      ...form, 
                      image: ytThumb || url,
                      videoUrl: url 
                    });
                  } else {
                    setForm({ ...form, image: url });
                  }
                }}
                label="Soo Geli Sawirka Weyn ee Munaasabadda (Laptop / Phone / YouTube)"
              />
            </div>

            {/* Event Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Faahfaahinta Munaasabadda (Somali)</label>
                <textarea
                  rows={3}
                  value={form.descriptionSo || ''}
                  onChange={e => setForm({ ...form, descriptionSo: e.target.value })}
                  placeholder="Qor faahfaahinta munaasabadda, dadka muhiimka ah ee ka soo qayb galay iyo guulaha laga gaadhay..."
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Event Description (English)</label>
                <textarea
                  rows={3}
                  value={form.description || ''}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  placeholder="English summary of the event highlights, key moments and ceremony notes..."
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Highlights List */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <label className="text-xs font-bold text-gray-700">Qodobbada Muhiimka ah (Event Highlights)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newHighlight}
                  onChange={e => setNewHighlight(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addHighlight(); } }}
                  placeholder="tusaale: 68 Shahaadooyinka Lahaanshaha oo lagu wareejiyay mulkiilayaasha"
                  className="flex-1 px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={addHighlight}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Ku Dar
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {form.highlights?.map((hl, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-800 text-xs rounded-lg border border-indigo-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{hl}</span>
                    <button
                      type="button"
                      onClick={() => removeHighlight(idx)}
                      className="text-indigo-400 hover:text-indigo-700 ml-1 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Event Gallery Photos */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <label className="text-xs font-bold text-gray-700">Sawirrada Dheeraadka ah ee Xafladda (Ceremony Gallery)</label>
              
              {/* Add gallery image with LaptopImageUploader */}
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 space-y-2">
                <LaptopImageUploader
                  onImageSelected={(url) => {
                    if (url) {
                      setForm(prev => ({
                        ...prev,
                        gallery: [...(prev.gallery || []), url]
                      }));
                    }
                  }}
                  label="Ka soo geli sawir cusub Laptop-ka ama geli Link"
                  helperText="Sawirkani wuxuu si toos ah ugu darsoomi doonaa Album-ka xafladda"
                />
              </div>

              {/* Existing Gallery Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5 pt-2">
                {form.gallery?.map((imgUrl, idx) => (
                  <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 group bg-gray-100">
                    <SafeImage
                      src={imgUrl}
                      alt={`Gallery ${idx + 1}`}
                      fallbackType="event"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(idx)}
                      className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-xs"
                      title="Tirtir Sawirkan"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Save Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl cursor-pointer"
              >
                Ka Noqo
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" /> Keydi Munaasabadda
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Events List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredEvents.map((event) => {
          const hasVideo = isYouTubeUrl(event.videoUrl) || isYouTubeUrl(event.image);
          const coverImage = event.image || (event.videoUrl ? getYouTubeThumbnail(event.videoUrl) : '') || '';

          return (
            <div 
              key={event.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video bg-gray-900 overflow-hidden">
                  <SafeImage 
                    src={coverImage} 
                    alt={event.title}
                    fallbackType="event"
                    className="w-full h-full object-cover" 
                  />

                  {/* Video Play Badge if YouTube Video */}
                  {hasVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/25 pointer-events-none">
                      <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                    </div>
                  )}

                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/70 text-white backdrop-blur-xs uppercase tracking-wider">
                      {event.category}
                    </span>
                    {hasVideo && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-red-600 text-white flex items-center gap-1 shadow-xs">
                        <Video className="w-3 h-3" /> YouTube
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-2.5 right-2.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#C2A55D] text-black">
                      {event.dateDisplay}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-2.5">
                  <h4 className="font-bold text-sm text-gray-900 line-clamp-2">
                    {event.titleSo || event.title}
                  </h4>
                  <p className="text-xs text-gray-500 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C2A55D] flex-shrink-0" />
                    <span className="truncate">{event.locationSo || event.location}</span>
                  </p>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {event.descriptionSo || event.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-gray-100 mt-2 flex items-center justify-between">
                <span className="text-[11px] text-gray-500 font-medium">
                  {event.attendeesCount}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleEdit(event)}
                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors cursor-pointer"
                    title="Wax ka beddel"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                    title="Tirtir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
