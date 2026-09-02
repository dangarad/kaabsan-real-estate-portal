import React, { useState } from 'react';
import { 
  MessageCircle, 
  Send, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Check, 
  Smartphone, 
  Sparkles, 
  Info,
  Layers,
  HelpCircle
} from 'lucide-react';
import { SiteConfig, WhatsAppTemplates } from '../../types';

interface WhatsAppTemplatesTabProps {
  siteConfig: SiteConfig;
  onUpdateSiteConfig: (updated: SiteConfig) => void;
}

export const WhatsAppTemplatesTab: React.FC<WhatsAppTemplatesTabProps> = ({
  siteConfig,
  onUpdateSiteConfig
}) => {
  const defaultTemplates: WhatsAppTemplates = {
    hotlineNumber: siteConfig?.company?.whatsapp || '+252636100090',
    defaultInquiry: 'Asc Kaabsan Real Estate, waxaan rabaa macluumaad ku saabsan guryaha iyo mashaariicda Hargeysa.',
    propertyInquiry: 'Asc Kaabsan, waxaan doonayaa faahfaahinta {property_title} ee ku yaal {location}. Qiimaha: {price}. Fadlan ii soo dira macluumaadka buuxa.',
    cashPurchase: 'Asc Kaabsan, waxaan rabaa inaan guri ku iibsado Cash / Direct Kaabsan (0% Bank Markup) oo ah {property_title} qiimihiisuna yahay {price}. Sideen u bilaabi karaa?',
    bankRoutePurchase: 'Asc Kaabsan, waxaan doonayaa inaan ku iibsado Bank Route (+15% Bank Facility) guriga {property_title}. Qiimaha Asalka: {base_price}, Qiimaha Bangiga (+15%): {bank_price}. Fadlan faahfaahin iga siiya sida bangiyada (Dahabshiil / Premier / Dara-Salaam) aan u mariyo.',
    siteTourBooking: 'Asc Kaabsan, waxaan rabaa inaan ballansado booqasho goobta ah (Site Tour) oo ku saabsan {property_title}. Magacaygu waa {customer_name}, Taariikhda aan doonayo: {tour_date}.',
    propertyValuation: 'Asc Kaabsan, waxaan doonayaa inaan iibiyo ama qiimeeyo guri/dhul ku yaal Hargeysa ({neighborhood}). Fadlan ila soo xidhiidha.',
    quickMessages: [
      'Asc Kaabsan, waxaan doonayaa faahfaahinta Rugsan Gardens iyo Aragsan Village.',
      'Asc, waxaan rabaa macluumaadka iibsashada Cash iyo Bank Route (+15%).',
      'Asc, waxaan rabaa macluumaadka qorshaha bixinta 60-ka bilood (0% Riba).',
      'Asc, waxaan rabaa inaan ballansado booqashada goobta (Site Tour) Hargeysa.',
      'I would like to speak with a Kaabsan corporate sales representative.'
    ]
  };

  const [form, setForm] = useState<WhatsAppTemplates>(
    siteConfig?.whatsappTemplates || defaultTemplates
  );

  const [newQuickMsg, setNewQuickMsg] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<'property' | 'cash' | 'bank' | 'tour'>('bank');

  const handleSave = () => {
    const updated: SiteConfig = {
      ...siteConfig,
      company: {
        ...siteConfig.company,
        whatsapp: form.hotlineNumber
      },
      whatsappTemplates: form
    };

    onUpdateSiteConfig(updated);
    try {
      localStorage.setItem('kaabsan_site_config_v9', JSON.stringify(updated));
    } catch {
      // ignore
    }

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const addQuickMessage = () => {
    if (!newQuickMsg.trim()) return;
    setForm({
      ...form,
      quickMessages: [...(form.quickMessages || []), newQuickMsg.trim()]
    });
    setNewQuickMsg('');
  };

  const removeQuickMessage = (index: number) => {
    const updated = [...(form.quickMessages || [])];
    updated.splice(index, 1);
    setForm({ ...form, quickMessages: updated });
  };

  // Generate simulated preview text
  const getSimulatedText = () => {
    if (previewTemplate === 'bank') {
      return (form.bankRoutePurchase || defaultTemplates.bankRoutePurchase)
        .replace('{property_title}', 'Aragsan Village 4-Bed Luxury Villa')
        .replace('{base_price}', '$225,000')
        .replace('{bank_price}', '$258,750');
    }
    if (previewTemplate === 'cash') {
      return (form.cashPurchase || defaultTemplates.cashPurchase)
        .replace('{property_title}', 'Aragsan Village 4-Bed Luxury Villa')
        .replace('{price}', '$225,000');
    }
    if (previewTemplate === 'tour') {
      return (form.siteTourBooking || defaultTemplates.siteTourBooking)
        .replace('{property_title}', 'Rugsan Gardens Estate')
        .replace('{customer_name}', 'Ahmed M. Omer')
        .replace('{tour_date}', 'Tomorrow at 10:00 AM');
    }
    return (form.propertyInquiry || defaultTemplates.propertyInquiry)
      .replace('{property_title}', 'Masallaha Luxury Apartments (Type A)')
      .replace('{location}', 'Masalaha / Airport Road')
      .replace('{price}', '$115,000');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#128C7E]/15 via-white to-white border border-[#128C7E]/30 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#128C7E] font-bold text-xs uppercase tracking-wider mb-1">
            <MessageCircle className="w-4 h-4" />
            <span>Kaabsan Automated WhatsApp Gateway Management</span>
          </div>
          <h2 className="font-serif-luxury text-2xl text-[#1A1A1A]">
            WhatsApp Pre-Configured Messages & Customer Templates
          </h2>
          <p className="text-xs text-[#6B665E] mt-1 max-w-2xl">
            Maamul oo cusboonaysii fariimaha tooska ah ee WhatsApp-ka ee ka baxa bogga webka, fariimaha iibsashada Cash iyo Bank Route (+15%), qorshaha booqashada goobaha, iyo su'aalaha degdegga ah.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-[#128C7E] hover:bg-[#0E7064] text-white px-6 py-3 rounded-2xl font-bold text-xs shadow-md transition-all cursor-pointer whitespace-nowrap self-start md:self-auto"
          id="save-whatsapp-templates-btn"
        >
          {saveSuccess ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>Fariimaha Waa La Keydiyay!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Keydi Dhammaan Fariimaha (Save CMS)</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Form Editors */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. Official Hotline Phone Number */}
          <div className="bg-white border border-[#E5E2DA] rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="font-serif-luxury text-lg text-[#1A1A1A] flex items-center gap-2 border-b border-[#F2EFE9] pb-3">
              <Smartphone className="w-4 h-4 text-[#128C7E]" />
              <span>Official WhatsApp Phone Number / Hotline</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-[#35322E] mb-1">
                WhatsApp Phone Number (with Country Code)
              </label>
              <input
                type="text"
                value={form.hotlineNumber}
                onChange={(e) => setForm({ ...form, hotlineNumber: e.target.value })}
                placeholder="+252636100090"
                className="w-full bg-[#F9F8F6] border border-[#E5E2DA] rounded-xl px-4 py-2.5 text-xs text-[#1A1A1A] font-mono focus:outline-none focus:border-[#128C7E]"
              />
              <p className="text-[11px] text-[#8C867D] mt-1">
                Tusaale: <code className="text-[#128C7E] font-bold">+252636100090</code> ama <code className="text-[#128C7E] font-bold">252636100090</code>
              </p>
            </div>
          </div>

          {/* 2. Message Templates per Action */}
          <div className="bg-white border border-[#E5E2DA] rounded-3xl p-6 shadow-xs space-y-5">
            <h3 className="font-serif-luxury text-lg text-[#1A1A1A] flex items-center gap-2 border-b border-[#F2EFE9] pb-3">
              <Edit3 className="w-4 h-4 text-[#128C7E]" />
              <span>Pre-Configured Message Templates (Habka Fariimaha)</span>
            </h3>

            {/* Template A: Bank Route (+15%) Purchase */}
            <div className="space-y-1.5 p-4 bg-[#F9F8F6] rounded-2xl border border-[#E5E2DA]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#1A1A1A] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span>1. Bank Route (+15% Bank Facility) Purchase Message</span>
                </label>
                <span className="text-[10px] text-[#8C867D] font-mono">{'{property_title}, {base_price}, {bank_price}'}</span>
              </div>
              <textarea
                rows={3}
                value={form.bankRoutePurchase}
                onChange={(e) => setForm({ ...form, bankRoutePurchase: e.target.value })}
                className="w-full bg-white border border-[#E5E2DA] rounded-xl p-3 text-xs text-[#1A1A1A] leading-relaxed focus:outline-none focus:border-[#128C7E]"
              />
            </div>

            {/* Template B: Cash / Direct Purchase */}
            <div className="space-y-1.5 p-4 bg-[#F9F8F6] rounded-2xl border border-[#E5E2DA]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#1A1A1A] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span>2. Cash / Direct Developer (0% Bank Markup) Purchase Message</span>
                </label>
                <span className="text-[10px] text-[#8C867D] font-mono">{'{property_title}, {price}'}</span>
              </div>
              <textarea
                rows={3}
                value={form.cashPurchase}
                onChange={(e) => setForm({ ...form, cashPurchase: e.target.value })}
                className="w-full bg-white border border-[#E5E2DA] rounded-xl p-3 text-xs text-[#1A1A1A] leading-relaxed focus:outline-none focus:border-[#128C7E]"
              />
            </div>

            {/* Template C: General Property Inquiry */}
            <div className="space-y-1.5 p-4 bg-[#F9F8F6] rounded-2xl border border-[#E5E2DA]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#1A1A1A] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#128C7E]"></span>
                  <span>3. General Property Listing Inquiry</span>
                </label>
                <span className="text-[10px] text-[#8C867D] font-mono">{'{property_title}, {location}, {price}'}</span>
              </div>
              <textarea
                rows={3}
                value={form.propertyInquiry}
                onChange={(e) => setForm({ ...form, propertyInquiry: e.target.value })}
                className="w-full bg-white border border-[#E5E2DA] rounded-xl p-3 text-xs text-[#1A1A1A] leading-relaxed focus:outline-none focus:border-[#128C7E]"
              />
            </div>

            {/* Template D: Site Tour Booking */}
            <div className="space-y-1.5 p-4 bg-[#F9F8F6] rounded-2xl border border-[#E5E2DA]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#1A1A1A] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                  <span>4. Site Tour Booking Request</span>
                </label>
                <span className="text-[10px] text-[#8C867D] font-mono">{'{property_title}, {customer_name}, {tour_date}'}</span>
              </div>
              <textarea
                rows={3}
                value={form.siteTourBooking}
                onChange={(e) => setForm({ ...form, siteTourBooking: e.target.value })}
                className="w-full bg-white border border-[#E5E2DA] rounded-xl p-3 text-xs text-[#1A1A1A] leading-relaxed focus:outline-none focus:border-[#128C7E]"
              />
            </div>

            {/* Template E: Property Selling & Valuation */}
            <div className="space-y-1.5 p-4 bg-[#F9F8F6] rounded-2xl border border-[#E5E2DA]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#1A1A1A] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C2A55D]"></span>
                  <span>5. Property Selling & Valuation Inquiry</span>
                </label>
                <span className="text-[10px] text-[#8C867D] font-mono">{'{neighborhood}'}</span>
              </div>
              <textarea
                rows={2}
                value={form.propertyValuation}
                onChange={(e) => setForm({ ...form, propertyValuation: e.target.value })}
                className="w-full bg-white border border-[#E5E2DA] rounded-xl p-3 text-xs text-[#1A1A1A] leading-relaxed focus:outline-none focus:border-[#128C7E]"
              />
            </div>
          </div>

          {/* 3. Quick Messages List */}
          <div className="bg-white border border-[#E5E2DA] rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#F2EFE9] pb-3">
              <h3 className="font-serif-luxury text-lg text-[#1A1A1A] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#128C7E]" />
                <span>Quick WhatsApp Prompt Questions (Su'aalaha Degdegga ah)</span>
              </h3>
              <span className="text-xs bg-[#128C7E]/10 text-[#128C7E] px-2.5 py-0.5 rounded-full font-bold">
                {form.quickMessages?.length || 0} Questions
              </span>
            </div>

            <p className="text-xs text-[#6B665E]">
              Kuwani waa su'aalaha tooska ah ee macmiilku gujin karo marka uu furo WhatsApp Widget-ka.
            </p>

            <div className="space-y-2">
              {form.quickMessages?.map((msg, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-[#F9F8F6] p-3 rounded-2xl border border-[#E5E2DA]">
                  <span className="w-6 h-6 rounded-full bg-[#EAE6DE] text-[#35322E] text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={msg}
                    onChange={(e) => {
                      const updated = [...(form.quickMessages || [])];
                      updated[idx] = e.target.value;
                      setForm({ ...form, quickMessages: updated });
                    }}
                    className="flex-1 bg-white border border-[#E5E2DA] rounded-xl px-3 py-1.5 text-xs text-[#1A1A1A] focus:outline-none"
                  />
                  <button
                    onClick={() => removeQuickMessage(idx)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                    title="Delete Question"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Quick Message */}
            <div className="pt-3 border-t border-[#F2EFE9] flex items-center gap-2">
              <input
                type="text"
                value={newQuickMsg}
                onChange={(e) => setNewQuickMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addQuickMessage()}
                placeholder="Ku dar su'aal cusub oo WhatsApp ah..."
                className="flex-1 bg-[#F9F8F6] border border-[#E5E2DA] rounded-xl px-4 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#128C7E]"
              />
              <button
                onClick={addQuickMessage}
                className="px-4 py-2 bg-[#35322E] hover:bg-[#1A1815] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Ku dar</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right 1 Col: Live WhatsApp Simulation Card */}
        <div className="space-y-6">
          <div className="bg-[#128C7E] text-white p-5 rounded-3xl shadow-xl space-y-4 sticky top-24">
            <div className="flex items-center justify-between border-b border-white/20 pb-3">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                <span className="font-bold text-sm">Live WhatsApp Message Preview</span>
              </div>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono">
                {form.hotlineNumber}
              </span>
            </div>

            {/* Select Preview Route */}
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setPreviewTemplate('bank')}
                className={`text-[11px] px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                  previewTemplate === 'bank' ? 'bg-white text-[#128C7E]' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Bank Route (+15%)
              </button>
              <button
                onClick={() => setPreviewTemplate('cash')}
                className={`text-[11px] px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                  previewTemplate === 'cash' ? 'bg-white text-[#128C7E]' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Cash (0%)
              </button>
              <button
                onClick={() => setPreviewTemplate('property')}
                className={`text-[11px] px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                  previewTemplate === 'property' ? 'bg-white text-[#128C7E]' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Property Listing
              </button>
              <button
                onClick={() => setPreviewTemplate('tour')}
                className={`text-[11px] px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                  previewTemplate === 'tour' ? 'bg-white text-[#128C7E]' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Site Tour
              </button>
            </div>

            {/* Simulated Chat Bubble */}
            <div className="bg-[#ECE5DD] text-[#1A1A1A] p-4 rounded-2xl shadow-inner space-y-2">
              <div className="text-[10px] text-gray-500 font-mono text-center">
                🌐 [{siteConfig?.domainName || 'kaabsanrealestate.com'}]
              </div>
              <div className="bg-[#DCF8C6] p-3.5 rounded-2xl rounded-tr-none shadow-xs text-xs leading-relaxed">
                {getSimulatedText()}
                <div className="text-[9px] text-gray-500 text-right mt-1 font-mono">10:45 AM ✓✓</div>
              </div>
            </div>

            <div className="text-[11px] text-emerald-100 bg-white/10 p-3 rounded-2xl">
              💡 <strong>Xasuusin:</strong> Marka macmiilku gujiyo WhatsApp meel kasta oo webka ah, fariintan qaabaysan ayaa toos ugu furmaysa taleefankiisa ama kombuyuutarkiisa.
            </div>

            <button
              onClick={handleSave}
              className="w-full py-3 bg-white hover:bg-[#F2EFE9] text-[#128C7E] font-bold text-xs rounded-2xl transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Keydi Dhammaan Isbeddellada</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
