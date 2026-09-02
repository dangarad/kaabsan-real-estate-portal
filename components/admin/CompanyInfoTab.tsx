import React, { useState } from 'react';
import { 
  Phone, 
  CheckCircle2, 
  CreditCard, 
  Building2, 
  Clock, 
  Mail, 
  MapPin, 
  Hash, 
  BarChart3, 
  Globe, 
  Share2, 
  Image as ImageIcon, 
  Sparkles, 
  RotateCcw, 
  Eye,
  Sliders,
  Check,
  Save,
  ExternalLink,
  Video,
  Play,
  ArrowLeft
} from 'lucide-react';
import { SiteConfig } from '../../types';
import { LaptopImageUploader } from '../LaptopImageUploader';
import { KaabsanLogo } from '../KaabsanLogo';

interface CompanyInfoTabProps {
  config: SiteConfig;
  onChange: (updated: SiteConfig) => void;
  onSave: () => void;
  onBackToDashboard?: () => void;
}

export const CompanyInfoTab: React.FC<CompanyInfoTabProps> = ({
  config,
  onChange,
  onSave,
  onBackToDashboard
}) => {
  const [logoPreviewBg, setLogoPreviewBg] = useState<'dark' | 'light' | 'gold'>('dark');
  const [savedToast, setSavedToast] = useState<string | null>(null);

  const triggerNotification = (msg: string) => {
    onSave();
    setSavedToast(msg);
    setTimeout(() => setSavedToast(null), 3500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerNotification('Dhammaan xogta shirkadda, astaanta, baraha bulshada & akoonnada si buuxda ayaa loo badbaadiyay!');
  };

  const handleResetLogo = () => {
    if (window.confirm('Ma hubtaa inaad dib ugu celiso astaanta asalka ah ee Dahabka ah ee Kaabsan Real Estate?')) {
      onChange({
        ...config,
        company: {
          ...config.company,
          logoUrl: ''
        }
      });
      triggerNotification('Astaanta asalka ah ee Kaabsan ayaa dib loo soo celiyay!');
    }
  };

  const currentYoutubeUrl = config.socialLinks?.youtube || 'https://www.youtube.com/@kaabsanrealestate';

  return (
    <div className="space-y-6 animate-in fade-in pb-12">
      {/* Top Card */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            {onBackToDashboard && (
              <button
                type="button"
                onClick={onBackToDashboard}
                className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors mr-1 cursor-pointer"
                title="Ku noqo Dashboard-ka"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-600" />
              Astaanta (Logo), Magaca, YouTube & Xogta Shirkadda
            </h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Ka maamul astaanta rasmiga ah (Logo-da), channel-ka YouTube & baraha bulshada, magaca shirkadda (Telesom Group), xisaabaadka Zaad & Bangiyada, iyo xafiisyada. Qayb kasta waxay leedahay badhan "Kaydi" oo u gaar ah!
          </p>
        </div>

        <button
          onClick={handleSubmit}
          type="button"
          className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 shadow-sm whitespace-nowrap self-start sm:self-auto"
        >
          <CheckCircle2 className="w-4 h-4" /> Badbaadi Dhammaan Xogta
        </button>
      </div>

      {savedToast && (
        <div className="p-4 bg-emerald-500 text-white rounded-2xl shadow-lg text-xs font-bold flex items-center justify-between gap-2 animate-in fade-in sticky top-4 z-50">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-white" />
            <span>{savedToast}</span>
          </div>
          <button 
            onClick={() => setSavedToast(null)}
            className="text-white/80 hover:text-white text-xs font-semibold px-2 py-0.5 rounded"
          >
            OK
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. LOGO & BRAND ASSETS STUDIO */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-3">
            <div>
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-amber-500" /> 
                1. Astaanta Shirkadda & Naqshadda (Company Logo Studio)
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Geli logo cusub oo aad ka soo gelinayso laptop-kaaga (PNG, SVG, Transparent) ama isticmaal astaanta asalka ah ee dahabka ah.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              {config.company.logoUrl && (
                <button
                  type="button"
                  onClick={handleResetLogo}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1.5 cursor-pointer bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Dib u Celi Logo-dii Asalka ahayd
                </button>
              )}
              <button
                type="button"
                onClick={() => triggerNotification('Astaanta shirkadda (Logo) si toos ah ayaa loo badbaadiyay!')}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" /> Kaydi Astaanta
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Uploader Section */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  1. Ka Soo Geli Logo Cusub Laptop-kaaga (Direct File Upload):
                </label>
                <LaptopImageUploader
                  currentValue={config.company.logoUrl}
                  onImageSelected={(newLogo) => {
                    onChange({
                      ...config,
                      company: { ...config.company, logoUrl: newLogo }
                    });
                  }}
                  label="Dooro Sawirka Logo-da (PNG, SVG, JPG)"
                  helperText="Waxaa lagu talinayaa sawir Transparent ah (PNG ama SVG) oo tayadiisu sarreyso."
                  aspectRatio="landscape"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  2. Ama Geli Logo URL Toos ah (Direct Image URL):
                </label>
                <input
                  type="url"
                  placeholder="https://mysite.com/assets/logo.png"
                  value={config.company.logoUrl || ''}
                  onChange={(e) => onChange({
                    ...config,
                    company: { ...config.company, logoUrl: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 outline-none focus:bg-white focus:border-indigo-500 font-mono"
                />
                <p className="text-[11px] text-gray-400 mt-1">
                  Haddii aad ka tagto maran, nidaamku wuxuu si toos ah u isticmaalayaa astaanta rasmiga ah ee dahabka ah ee Kaabsan Real Estate.
                </p>
              </div>
            </div>

            {/* Real-time Interactive Live Preview */}
            <div className="lg:col-span-6 bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-indigo-600" />
                  Muuqaalka Tooska ah (Live Logo Preview)
                </span>

                {/* Preview BG Switcher */}
                <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-gray-200 text-[11px] font-semibold">
                  <button
                    type="button"
                    onClick={() => setLogoPreviewBg('dark')}
                    className={`px-2 py-0.5 rounded cursor-pointer ${logoPreviewBg === 'dark' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    Dark Nav
                  </button>
                  <button
                    type="button"
                    onClick={() => setLogoPreviewBg('light')}
                    className={`px-2 py-0.5 rounded cursor-pointer ${logoPreviewBg === 'light' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    Light Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setLogoPreviewBg('gold')}
                    className={`px-2 py-0.5 rounded cursor-pointer ${logoPreviewBg === 'gold' ? 'bg-amber-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    Footer
                  </button>
                </div>
              </div>

              {/* Preview Box */}
              <div className={`p-8 rounded-xl flex flex-col items-center justify-center min-h-[140px] border transition-all ${
                logoPreviewBg === 'dark'
                  ? 'bg-[#181614] border-[#2E2B26]'
                  : logoPreviewBg === 'light'
                  ? 'bg-white border-gray-200'
                  : 'bg-[#23201D] border-[#35322E]'
              }`}>
                <KaabsanLogo
                  variant={logoPreviewBg === 'light' ? 'dark' : 'gold'}
                  size="lg"
                  customLogoUrl={config.company.logoUrl}
                />
                <span className={`text-[10px] mt-3 tracking-widest uppercase font-mono ${
                  logoPreviewBg === 'light' ? 'text-gray-400' : 'text-neutral-500'
                }`}>
                  {config.company.name || 'Kaabsan Real Estate'} • {config.company.parentGroup || 'Telesom Group'}
                </span>
              </div>

              <div className="text-[11px] text-gray-500 leading-relaxed bg-white p-3 rounded-xl border border-gray-200">
                <span className="font-bold text-gray-800">Meelaha ay ka muuqanayso:</span> Astaantan cusub waxay toos uga muuqanaysaa Header-ka (Dusha Sare), Qaybta Hoose (Footer), Buugaagta PDF-ka, Rasiidhada Lacag-bixinta, iyo Galka Maamulka.
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={() => triggerNotification('Astaanta shirkadda (Logo) si toos ah ayaa loo badbaadiyay!')}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" /> Kaydi Astaanta Shirkadda (Save Logo)
            </button>
          </div>
        </div>

        {/* 2. DOMAIN & BRAND IDENTITY */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-600" /> 2. Magaca Shirkadda & Xogta Guud
            </h3>
            <button
              type="button"
              onClick={() => triggerNotification('Magaca shirkadda & xogta guud si toos ah ayaa loo badbaadiyay!')}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" /> Kaydi Magaca & Xogta
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Magaca Shirkadda (Company Name)</label>
              <input
                type="text"
                value={config.company.name}
                onChange={(e) => onChange({
                  ...config,
                  company: { ...config.company, name: e.target.value }
                })}
                placeholder="Kaabsan Real Estate"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 outline-none focus:bg-white focus:border-indigo-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Shirkadda Waalidka ah (Parent Group)</label>
              <input
                type="text"
                value={config.company.parentGroup}
                onChange={(e) => onChange({
                  ...config,
                  company: { ...config.company, parentGroup: e.target.value }
                })}
                placeholder="Telesom Group"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 outline-none focus:bg-white focus:border-indigo-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Domain-ka Rasmiga ah (Official Domain)</label>
              <input
                type="text"
                value={config.domainName || 'kaabsanrealestate.com'}
                onChange={(e) => onChange({
                  ...config,
                  domainName: e.target.value
                })}
                placeholder="kaabsanrealestate.com"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 outline-none focus:bg-white focus:border-indigo-500 font-mono font-bold text-indigo-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Qoraalka Banner-ka Sare (Header Announcement Bar)</label>
              <input
                type="text"
                value={config.announcementBar || 'Official Portal of Kaabsan Real Estate (kaabsanrealestate.com) • Part of Telesom Group'}
                onChange={(e) => onChange({
                  ...config,
                  announcementBar: e.target.value
                })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 outline-none focus:bg-white focus:border-indigo-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Halku-dhegga Shirkadda (Company Tagline / Slogan)</label>
              <input
                type="text"
                value={config.company.tagline || 'Pioneering Master Planned Communities in Somaliland'}
                onChange={(e) => onChange({
                  ...config,
                  company: { ...config.company, tagline: e.target.value }
                })}
                placeholder="Pioneering Master Planned Communities in Somaliland"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 outline-none focus:bg-white focus:border-indigo-500 font-medium"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={() => triggerNotification('Magaca shirkadda & xogta guud si toos ah ayaa loo badbaadiyay!')}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" /> Kaydi Magaca & Xogta Guud (Save Info)
            </button>
          </div>
        </div>

        {/* 3. CONTACTS & HOTLINES */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Phone className="w-4 h-4 text-indigo-600" /> 3. Taleefannada, WhatsApp & Cinwaannada
            </h3>
            <button
              type="button"
              onClick={() => triggerNotification('Taleefannada, xafiisyada & cinwaannada si toos ah ayaa loo badbaadiyay!')}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" /> Kaydi Taleefannada & Cinwaanka
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Taleefanka Guud / Shortcode 380</label>
              <input
                type="text"
                value={config.company.phone}
                onChange={(e) => onChange({
                  ...config,
                  company: { ...config.company, phone: e.target.value }
                })}
                placeholder="+252 63 6100090"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 outline-none focus:bg-white focus:border-indigo-500 font-mono font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Taleefanka Iibka Tooska ah (Sales Phone)</label>
              <input
                type="text"
                value={config.company.salesPhone || '+252 63 4420000'}
                onChange={(e) => onChange({
                  ...config,
                  company: { ...config.company, salesPhone: e.target.value }
                })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 outline-none focus:bg-white focus:border-indigo-500 font-mono font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">WhatsApp-ka Rasmiga ah (Hotline)</label>
              <input
                type="text"
                value={config.company.whatsapp}
                onChange={(e) => onChange({
                  ...config,
                  company: { ...config.company, whatsapp: e.target.value }
                })}
                placeholder="+252636100090"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 outline-none focus:bg-white focus:border-indigo-500 font-mono font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Emailka Rasmiga ah (Official Email)</label>
              <input
                type="email"
                value={config.company.email}
                onChange={(e) => onChange({
                  ...config,
                  company: { ...config.company, email: e.target.value }
                })}
                placeholder="info@kaabsan.com"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 outline-none focus:bg-white focus:border-indigo-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Saacadaha Shaqada (Office Hours)</label>
              <input
                type="text"
                value={config.company.officeHours}
                onChange={(e) => onChange({
                  ...config,
                  company: { ...config.company, officeHours: e.target.value }
                })}
                placeholder="Sabti - Khamiis: 8:00 AM - 6:00 PM (Jimce: Xidhan)"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 outline-none focus:bg-white focus:border-indigo-500 font-medium"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-xs font-bold text-gray-700 mb-1">Goobta Xafiiska & Xarunta Iibka (Hargeisa, Somaliland)</label>
            <input
              type="text"
              value={config.company.address}
              onChange={(e) => onChange({
                ...config,
                company: { ...config.company, address: e.target.value }
              })}
              placeholder="Telesom Headquarters & Kaabsan Sales Pavilion, Masallaha, Airport Road, Hargeisa, Somaliland"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 outline-none focus:bg-white focus:border-indigo-500 font-medium"
            />
          </div>

          <div className="flex justify-end pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={() => triggerNotification('Taleefannada, xafiisyada & cinwaannada si toos ah ayaa loo badbaadiyay!')}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" /> Kaydi Xafiisyada & Taleefannada (Save Contacts)
            </button>
          </div>
        </div>

        {/* 4. SOCIAL MEDIA & YOUTUBE CHANNELS */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-red-200/80 shadow-md space-y-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>

          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-3 relative z-10">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-red-100 text-red-600 rounded-lg">
                  <Play className="w-4 h-4 fill-red-600" />
                </span>
                <h3 className="text-sm font-bold text-gray-900">
                  4. Baraha Bulshada & Channel-ka YouTube (YouTube & Social Media)
                </h3>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Geli link-ga channel-kaaga YouTube ama muuqaallada si toos loogu xidho website-ka oo dhan (Footer, Header, Muuqaallada & Munaasabadaha).
              </p>
            </div>

            <button
              type="button"
              onClick={() => triggerNotification('Baraha bulshada iyo link-ga YouTube si buuxda ayaa loo badbaadiyay!')}
              className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer self-start sm:self-auto hover:scale-105 active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" /> Kaydi Baraha Bulshada & YouTube
            </button>
          </div>

          {/* YouTube Highlight Box */}
          <div className="p-5 bg-gradient-to-br from-red-50 via-white to-red-50/50 rounded-2xl border border-red-200 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
                <label className="text-xs font-bold text-red-950 flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-red-600" />
                  YouTube Channel Link (Xidhiidhka Tooska ah ee YouTube):
                </label>
              </div>
              
              {currentYoutubeUrl && (
                <a
                  href={currentYoutubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 font-bold bg-white px-3 py-1 rounded-lg border border-red-200 shadow-xs transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Tijaabi / Fur YouTube Channel-ka
                </a>
              )}
            </div>

            <div className="relative">
              <input
                type="url"
                value={config.socialLinks?.youtube || ''}
                onChange={(e) => onChange({
                  ...config,
                  socialLinks: { ...config.socialLinks, youtube: e.target.value }
                })}
                placeholder="https://www.youtube.com/@kaabsanrealestate ama https://www.youtube.com/channel/UC..."
                className="w-full pl-11 pr-4 py-3 bg-white border-2 border-red-300 rounded-xl text-xs text-gray-900 font-mono font-bold outline-none focus:border-red-600 shadow-inner"
              />
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-red-600">
                <Play className="w-4 h-4 fill-red-600" />
              </div>
            </div>

            <div className="text-[11px] text-gray-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
              <span>
                💡 <strong>Talo:</strong> Link-gani wuxuu si toos ah u xidhayaa astaanta YouTube ee ku taal <em>Header-ka sare</em>, <em>Footer-ka hoose</em>, iyo dhammaan boggaga mashaariicda.
              </span>
              <span className="font-mono text-[10px] text-red-700 bg-red-100/60 px-2 py-0.5 rounded">
                Live Synced
              </span>
            </div>
          </div>

          {/* Other Social Networks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
              <label className="block text-xs font-bold text-gray-800 flex items-center gap-1.5">
                <span className="text-blue-600 font-bold">f</span> Facebook Page URL
              </label>
              <input
                type="text"
                value={config.socialLinks?.facebook || 'https://www.facebook.com/kaabsanrealestate/'}
                onChange={(e) => onChange({
                  ...config,
                  socialLinks: { ...config.socialLinks, facebook: e.target.value }
                })}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-900 outline-none focus:border-indigo-500 font-mono"
              />
            </div>

            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
              <label className="block text-xs font-bold text-gray-800 flex items-center gap-1.5">
                <span className="text-pink-600 font-bold">📷</span> Instagram Profile URL
              </label>
              <input
                type="text"
                value={config.socialLinks?.instagram || 'https://www.instagram.com/kaabsanrealestate/'}
                onChange={(e) => onChange({
                  ...config,
                  socialLinks: { ...config.socialLinks, instagram: e.target.value }
                })}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-900 outline-none focus:border-indigo-500 font-mono"
              />
            </div>

            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
              <label className="block text-xs font-bold text-gray-800 flex items-center gap-1.5">
                <span className="text-black font-bold">🎵</span> TikTok Account URL
              </label>
              <input
                type="text"
                value={config.socialLinks?.tiktok || 'https://www.tiktok.com/@kaabsanrealestate'}
                onChange={(e) => onChange({
                  ...config,
                  socialLinks: { ...config.socialLinks, tiktok: e.target.value }
                })}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-900 outline-none focus:border-indigo-500 font-mono"
              />
            </div>

            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
              <label className="block text-xs font-bold text-gray-800 flex items-center gap-1.5">
                <span className="text-emerald-600 font-bold">💬</span> WhatsApp Direct Link
              </label>
              <input
                type="text"
                value={config.company.whatsapp ? `https://wa.me/${config.company.whatsapp.replace(/\D/g, '')}` : 'https://wa.me/252636100090'}
                readOnly
                className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-xs text-gray-600 font-mono cursor-not-allowed"
              />
            </div>
          </div>

          {/* Dedicated Section Save Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-gray-100 gap-3">
            <span className="text-xs text-gray-500">
              Markaad link cusub geliso ama bedesho, ku dhufo badhanka hoose si aad u keydiso:
            </span>
            <button
              type="button"
              onClick={() => triggerNotification('Baraha bulshada iyo link-ga YouTube si buuxda ayaa loo badbaadiyay!')}
              className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              Kaydi Baraha Bulshada & YouTube (Save Links)
            </button>
          </div>
        </div>

        {/* 5. BANKING & PAYMENT ACCOUNTS */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-100 gap-2">
            <div>
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-indigo-600" /> 5. Akoonnada Bangiyada & Adeegyada Lacag-bixinta
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Halkaan waxaad ku maamuli kartaa akoonnada Dara-Salaam Bank ee u gaarka ah mashaariicda, akoonnada guud ee Dahabshiil & Premier Bank, iyo nambarada Ku-Iibso ee Zaad & E-Dahab.
              </p>
            </div>

            <button
              type="button"
              onClick={() => triggerNotification('Akoonnada bangiyada & Zaad/E-Dahab si toos ah ayaa loo badbaadiyay!')}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer self-start sm:self-auto"
            >
              <Save className="w-3.5 h-3.5" /> Kaydi Akoonnada
            </button>
          </div>

          {/* Section A: Dara-Salaam Bank Project Specific Accounts */}
          <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-200/70 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                A. Dara-Salaam Bank — Akoonnada Mashaariicda Gaarka ah
              </h4>
              <span className="text-[11px] font-semibold text-amber-700">Project-Specific</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Masallaha Apartments (DSB)</label>
                <input
                  type="text"
                  value={config.company.projectAccounts?.masalaha || '64713269'}
                  onChange={(e) => onChange({
                    ...config,
                    company: {
                      ...config.company,
                      projectAccounts: {
                        ...(config.company.projectAccounts || {
                          masalaha: '64713269',
                          aragsan: '61043988',
                          rugsan: '61131900',
                          bilicsan: '61043977'
                        }),
                        masalaha: e.target.value
                      }
                    }
                  })}
                  className="w-full px-3.5 py-2 bg-white border border-amber-300 rounded-xl text-xs text-gray-900 font-mono font-bold focus:border-amber-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Aragsan Village (DSB)</label>
                <input
                  type="text"
                  value={config.company.projectAccounts?.aragsan || '61043988'}
                  onChange={(e) => onChange({
                    ...config,
                    company: {
                      ...config.company,
                      projectAccounts: {
                        ...(config.company.projectAccounts || {
                          masalaha: '64713269',
                          aragsan: '61043988',
                          rugsan: '61131900',
                          bilicsan: '61043977'
                        }),
                        aragsan: e.target.value
                      }
                    }
                  })}
                  className="w-full px-3.5 py-2 bg-white border border-amber-300 rounded-xl text-xs text-gray-900 font-mono font-bold focus:border-amber-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Rugsan Gardens (DSB)</label>
                <input
                  type="text"
                  value={config.company.projectAccounts?.rugsan || '61131900'}
                  onChange={(e) => onChange({
                    ...config,
                    company: {
                      ...config.company,
                      projectAccounts: {
                        ...(config.company.projectAccounts || {
                          masalaha: '64713269',
                          aragsan: '61043988',
                          rugsan: '61131900',
                          bilicsan: '61043977'
                        }),
                        rugsan: e.target.value
                      }
                    }
                  })}
                  className="w-full px-3.5 py-2 bg-white border border-amber-300 rounded-xl text-xs text-gray-900 font-mono font-bold focus:border-amber-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Bilicsan Village (DSB)</label>
                <input
                  type="text"
                  value={config.company.projectAccounts?.bilicsan || '61043977'}
                  onChange={(e) => onChange({
                    ...config,
                    company: {
                      ...config.company,
                      projectAccounts: {
                        ...(config.company.projectAccounts || {
                          masalaha: '64713269',
                          aragsan: '61043988',
                          rugsan: '61131900',
                          bilicsan: '61043977'
                        }),
                        bilicsan: e.target.value
                      }
                    }
                  })}
                  className="w-full px-3.5 py-2 bg-white border border-amber-300 rounded-xl text-xs text-gray-900 font-mono font-bold focus:border-amber-600 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section B: General Bank Accounts */}
          <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-200/70 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                B. Akoonnada Guud (General Bank Accounts) — Dahabshiil & Premier
              </h4>
              <span className="text-[11px] font-semibold text-blue-700">All Projects Compatible</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Dahabshiil Bank (General Account)</label>
                <input
                  type="text"
                  value={config.company.banks.dahabshiil || '208016005002'}
                  onChange={(e) => onChange({
                    ...config,
                    company: {
                      ...config.company,
                      banks: { ...config.company.banks, dahabshiil: e.target.value }
                    }
                  })}
                  className="w-full px-3.5 py-2.5 bg-white border border-blue-300 rounded-xl text-xs text-gray-900 font-mono font-bold focus:border-blue-600 outline-none"
                />
                <p className="text-[10px] text-gray-500 mt-1">Cidii aan haysan Dara-Salaam ama lacagtu ugu jirto Dahabshiil.</p>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Premier Bank (General Account)</label>
                <input
                  type="text"
                  value={config.company.banks.premier || '100603115002'}
                  onChange={(e) => onChange({
                    ...config,
                    company: {
                      ...config.company,
                      banks: { ...config.company.banks, premier: e.target.value }
                    }
                  })}
                  className="w-full px-3.5 py-2.5 bg-white border border-blue-300 rounded-xl text-xs text-gray-900 font-mono font-bold focus:border-blue-600 outline-none"
                />
                <p className="text-[10px] text-gray-500 mt-1">Cidii aan haysan Dara-Salaam ama lacagtu ugu jirto Premier Bank.</p>
              </div>
            </div>
          </div>

          {/* Section C: Mobile Money / Ku-Iibso */}
          <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-200/70 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                C. Adeegyada Moobilka ee Ku-Iibso (Merchant Codes)
              </h4>
              <span className="text-[11px] font-semibold text-emerald-700">Mobile Money</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Zaad Ku-Iibso (Telesom)</label>
                <input
                  type="text"
                  value={config.company.zaadMerchant || '444457'}
                  onChange={(e) => onChange({
                    ...config,
                    company: { ...config.company, zaadMerchant: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 bg-white border border-emerald-300 rounded-xl text-xs text-gray-900 font-mono font-bold text-emerald-700 focus:border-emerald-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">E-Dahab Ku-Iibso (Somtel)</label>
                <input
                  type="text"
                  value={config.company.edahabMerchant || '735777'}
                  onChange={(e) => onChange({
                    ...config,
                    company: { ...config.company, edahabMerchant: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 bg-white border border-orange-300 rounded-xl text-xs text-gray-900 font-mono font-bold text-orange-700 focus:border-orange-600 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={() => triggerNotification('Akoonnada bangiyada & Zaad/E-Dahab si toos ah ayaa loo badbaadiyay!')}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" /> Kaydi Akoonnada & Zaad (Save Bank Accounts)
            </button>
          </div>
        </div>

        {/* 6. STATISTICS */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-600" /> 6. Tirooyinka & Guulaha (Key Statistics)
            </h3>
            <button
              type="button"
              onClick={() => triggerNotification('Tirooyinka & guulaha shirkadda si toos ah ayaa loo badbaadiyay!')}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" /> Kaydi Tirooyinka
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Guryaha La Wareejiyay</label>
              <input
                type="text"
                value={config.stats.deliveredHomes}
                onChange={(e) => onChange({
                  ...config,
                  stats: { ...config.stats, deliveredHomes: e.target.value }
                })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 outline-none focus:bg-white focus:border-indigo-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Mashaariicda Waaweyn</label>
              <input
                type="text"
                value={config.stats.masterCommunities}
                onChange={(e) => onChange({
                  ...config,
                  stats: { ...config.stats, masterCommunities: e.target.value }
                })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 outline-none focus:bg-white focus:border-indigo-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Qoysaska Qurbajoogta ah</label>
              <input
                type="text"
                value={config.stats.diasporaFamilies}
                onChange={(e) => onChange({
                  ...config,
                  stats: { ...config.stats, diasporaFamilies: e.target.value }
                })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 outline-none focus:bg-white focus:border-indigo-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Heerka Kalsoonida (%)</label>
              <input
                type="text"
                value={config.stats.customerSatisfaction}
                onChange={(e) => onChange({
                  ...config,
                  stats: { ...config.stats, customerSatisfaction: e.target.value }
                })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 outline-none focus:bg-white focus:border-indigo-500 font-bold"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={() => triggerNotification('Tirooyinka & guulaha shirkadda si toos ah ayaa loo badbaadiyay!')}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" /> Kaydi Tirooyinka (Save Statistics)
            </button>
          </div>
        </div>

        {/* Global Bottom Save Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200 gap-3">
          <span className="text-xs text-gray-500">
            Waxa aad bedeshay xogta waxaa lagu dabaqi doonaa bogagga oo dhan marka aad badbaadiso.
          </span>
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md hover:scale-102"
          >
            <CheckCircle2 className="w-4 h-4" /> Badbaadi Dhammaan Xogta Shirkadda
          </button>
        </div>
      </form>
    </div>
  );
};
