import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  Check, 
  Clock, 
  Compass, 
  CheckCircle2, 
  Layers, 
  Building2, 
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { LaptopImageUploader } from '../LaptopImageUploader';
import { UpcomingProject } from '../UpcomingProjectsPage';

interface UpcomingProjectsTabProps {
  upcomingProjects: UpcomingProject[];
  onUpdateUpcomingProjects: (updated: UpcomingProject[]) => void;
}

export const UpcomingProjectsTab: React.FC<UpcomingProjectsTabProps> = ({
  upcomingProjects,
  onUpdateUpcomingProjects
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [form, setForm] = useState<Partial<UpcomingProject>>({
    name: '',
    nameSo: '',
    nameAr: '',
    location: 'Airport Expressway Corridor, Hargeisa',
    locationSo: 'Jidka Madaarka, Hargeysa',
    status: 'Engineering Master Planning & Soil Testing',
    statusSo: 'Qorshaynta Injineernimada & Tijaabada Dhulka',
    statusAr: 'التخطيط الهندسي المتقدم وفحص التربة',
    expectedLaunch: 'Q4 2026',
    totalUnits: '120 Luxury Contemporary Villas',
    propertyType: 'G+1 & G+2 Modern Mountain Villas',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: '',
    descriptionSo: '',
    descriptionAr: '',
    features: ['Kaabsan Ready-Mix Batching Plant Concrete', '24/7 Gated Security & Asphalt Roads', '5-Year Sharia Compliant Financing (0% Riba)'],
    vipRegistrationOpen: true
  });

  const [newFeature, setNewFeature] = useState('');

  const filteredProjects = upcomingProjects.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.nameSo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (project: UpcomingProject) => {
    setEditingId(project.id);
    setForm({ ...project });
    setIsAdding(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.nameSo) return;

    if (editingId) {
      const updated = upcomingProjects.map(p =>
        p.id === editingId ? { ...p, ...form } as UpcomingProject : p
      );
      onUpdateUpcomingProjects(updated);
    } else {
      const newProj: UpcomingProject = {
        id: `upcoming-${Date.now()}`,
        name: form.name || '',
        nameSo: form.nameSo || form.name || '',
        nameAr: form.nameAr || form.name || '',
        location: form.location || 'Hargeisa',
        locationSo: form.locationSo || 'Hargeysa',
        status: form.status || 'Planning',
        statusSo: form.statusSo || 'Qorshayn',
        statusAr: form.statusAr || 'تخطيط',
        expectedLaunch: form.expectedLaunch || '2026',
        totalUnits: form.totalUnits || '100 Units',
        propertyType: form.propertyType || 'Villas & Apartments',
        image: form.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        description: form.description || '',
        descriptionSo: form.descriptionSo || '',
        descriptionAr: form.descriptionAr || '',
        features: form.features || [],
        vipRegistrationOpen: form.vipRegistrationOpen !== false
      };
      onUpdateUpcomingProjects([newProj, ...upcomingProjects]);
    }

    setIsAdding(false);
    setEditingId(null);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleDelete = (id: string) => {
    if (confirm('Ma hubtaa inaad tirtirto mashruucan soo socda?')) {
      onUpdateUpcomingProjects(upcomingProjects.filter(p => p.id !== id));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const addFeature = () => {
    if (!newFeature.trim()) return;
    setForm({
      ...form,
      features: [...(form.features || []), newFeature.trim()]
    });
    setNewFeature('');
  };

  const removeFeature = (idx: number) => {
    const updated = [...(form.features || [])];
    updated.splice(idx, 1);
    setForm({ ...form, features: updated });
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            Upcoming Projects Pipeline & VIP Priority Waitlist CMS
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Maamul mashaariicda mustaqbalka (Pipeline), xilliyada daahfurka (Launch Dates), iyo foomamka VIP Waitlist-ka.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingId(null);
            setForm({
              name: '',
              nameSo: '',
              nameAr: '',
              location: 'Masalaha, Hargeisa',
              locationSo: 'Masalaha, Hargeysa',
              status: 'Engineering Master Planning & Soil Testing',
              statusSo: 'Qorshaynta Injineernimada & Tijaabada Dhulka',
              statusAr: 'التخطيط الهندسي المتقدم وفحص التربة',
              expectedLaunch: 'Q4 2026',
              totalUnits: '100 Luxury Villas',
              propertyType: 'Modern G+1 Villas',
              image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
              description: '',
              descriptionSo: '',
              descriptionAr: '',
              features: ['Kaabsan Ready-Mix Batching Plant Concrete', '24/7 Gated Security & Asphalt Roads'],
              vipRegistrationOpen: true
            });
            setIsAdding(true);
          }}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Ku Dar Mashruuc Cusub (Upcoming)
        </button>
      </div>

      {saveSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Mashaariicda mustaqbalka si guul leh ayaa loo keydiyay!</span>
        </div>
      )}

      {/* Add / Edit Form Drawer */}
      {isAdding && (
        <div className="bg-white p-6 rounded-2xl border-2 border-amber-300 shadow-xl space-y-5 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              {editingId ? 'Wax ka beddel Mashruuca Soo Socda' : 'Ku Dar Mashruuc Cusub oo Soo Socda'}
            </h3>
            <button
              onClick={() => setIsAdding(false)}
              className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-gray-700">Magaca Mashruuca (Somali)</label>
                <input
                  type="text"
                  required
                  value={form.nameSo || ''}
                  onChange={e => setForm({ ...form, nameSo: e.target.value })}
                  placeholder="tusaale: Kaabsan Hills Estate (Wejiga 2-aad)"
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Xilliga Daahfurka (Launch Timeline)</label>
                <input
                  type="text"
                  value={form.expectedLaunch || ''}
                  onChange={e => setForm({ ...form, expectedLaunch: e.target.value })}
                  placeholder="tusaale: Q4 2026 / Early 2027"
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-gray-700">Project Name (English)</label>
                <input
                  type="text"
                  required
                  value={form.name || ''}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Kaabsan Hills Estate (Phase 2)"
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Tirada Cutubyada (Total Units)</label>
                <input
                  type="text"
                  value={form.totalUnits || ''}
                  onChange={e => setForm({ ...form, totalUnits: e.target.value })}
                  placeholder="tusaale: 120 Luxury Villas"
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Nooca Guriga (Property Type)</label>
                <input
                  type="text"
                  value={form.propertyType || ''}
                  onChange={e => setForm({ ...form, propertyType: e.target.value })}
                  placeholder="G+1 Mountain Villas & Penthouses"
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Goobta (Location Somali)</label>
                <input
                  type="text"
                  value={form.locationSo || ''}
                  onChange={e => setForm({ ...form, locationSo: e.target.value })}
                  placeholder="Dhabarka Sare ee Masalaha, Hargeysa"
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Location (English)</label>
                <input
                  type="text"
                  value={form.location || ''}
                  onChange={e => setForm({ ...form, location: e.target.value })}
                  placeholder="Masalaha Highland Ridge, Hargeisa"
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-gray-700">Xaaladda Hadda (Status Stage Somali)</label>
                <input
                  type="text"
                  value={form.statusSo || ''}
                  onChange={e => setForm({ ...form, statusSo: e.target.value })}
                  placeholder="Qorshaynta Injineernimada & Tijaabada Dhulka"
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">VIP Priority Waitlist</label>
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="vipReg"
                    checked={form.vipRegistrationOpen}
                    onChange={e => setForm({ ...form, vipRegistrationOpen: e.target.checked })}
                    className="w-4 h-4 text-amber-500 rounded border-gray-300 focus:ring-amber-400"
                  />
                  <label htmlFor="vipReg" className="text-xs text-gray-700 font-semibold cursor-pointer">
                    Furan yahay Diiwaangelinta VIP Waitlist
                  </label>
                </div>
              </div>
            </div>

            {/* Direct Laptop Image Upload for Hero */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <label className="text-xs font-bold text-gray-700">Sawirka 3D Render-ka Mashruuca (Hero Render)</label>
              <LaptopImageUploader
                currentUrl={form.image || ''}
                onImageSelected={(url) => setForm({ ...form, image: url })}
                label="Soo Geli Sawirka 3D Render-ka Mashruuca (Laptop / Phone)"
              />
            </div>

            {/* Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Faahfaahinta Mashruuca (Somali)</label>
                <textarea
                  rows={3}
                  value={form.descriptionSo || ''}
                  onChange={e => setForm({ ...form, descriptionSo: e.target.value })}
                  placeholder="Faahfaahin ku saabsan mashruuca mustaqbalka, deegaanka, naqshadda iyo faa'iidooyinka..."
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Project Description (English)</label>
                <textarea
                  rows={3}
                  value={form.description || ''}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  placeholder="English overview of upcoming master plan community..."
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <label className="text-xs font-bold text-gray-700">Astaamaha & Qalabka (Project Features)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newFeature}
                  onChange={e => setNewFeature(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addFeature(); } }}
                  placeholder="tusaale: Beero cagaaran & Garoomo kubadeed oo gaar ah"
                  className="flex-1 px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500"
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Ku Dar
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {form.features?.map((feat, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 text-xs rounded-lg border border-amber-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>{feat}</span>
                    <button
                      type="button"
                      onClick={() => removeFeature(idx)}
                      className="text-amber-400 hover:text-amber-700 ml-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
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
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" /> Keydi Mashruuca Soo Socda
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Upcoming Projects List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((proj) => (
          <div 
            key={proj.id}
            className="bg-white rounded-2xl border border-gray-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-video bg-gray-100 overflow-hidden">
                <img 
                  src={proj.image} 
                  alt={proj.name}
                  className="w-full h-full object-cover" 
                />
                <div className="absolute top-2.5 left-2.5">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/70 text-white backdrop-blur-xs">
                    {proj.totalUnits}
                  </span>
                </div>
                <div className="absolute bottom-2.5 right-2.5">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-[#C2A55D] text-black">
                    {proj.expectedLaunch}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <h4 className="font-bold text-sm text-gray-900 line-clamp-1">
                  {proj.nameSo || proj.name}
                </h4>
                <p className="text-xs text-gray-500 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C2A55D] flex-shrink-0" />
                  <span className="truncate">{proj.locationSo || proj.location}</span>
                </p>
                <div className="text-[11px] font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60 inline-block">
                  {proj.statusSo || proj.status}
                </div>
                <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                  {proj.descriptionSo || proj.description}
                </p>
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-gray-100 mt-2 flex items-center justify-between">
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${proj.vipRegistrationOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'}`}>
                {proj.vipRegistrationOpen ? 'VIP Waitlist Active' : 'Waitlist Closed'}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleEdit(proj)}
                  className="p-2 text-amber-600 hover:bg-amber-50 rounded-xl transition-colors cursor-pointer"
                  title="Wax ka beddel"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(proj.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                  title="Tirtir"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
