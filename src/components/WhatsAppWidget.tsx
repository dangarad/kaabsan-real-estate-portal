import React, { useState } from 'react';
import { MessageCircle, X, Send, PhoneCall, Sparkles, CheckCircle2 } from 'lucide-react';
import { SiteConfig } from '../types';

interface WhatsAppWidgetProps {
  phoneNumber?: string;
  displayNumber?: string;
  siteConfig?: SiteConfig;
}

export const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({
  phoneNumber,
  displayNumber,
  siteConfig
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const activePhone = siteConfig?.whatsappTemplates?.hotlineNumber || siteConfig?.company?.whatsapp || phoneNumber || '252636100090';
  const cleanPhone = activePhone.replace(/[^0-9]/g, '');
  const activeDisplay = displayNumber || siteConfig?.company?.phone || '+252 63 6100090';

  const defaultQuickMessages = [
    'Asc Kaabsan, waxaan doonayaa faahfaahinta Rugsan Gardens iyo Aragsan Village.',
    'Asc, waxaan rabaa macluumaadka iibsashada Cash iyo Bank Route (+15%).',
    'Asc, waxaan rabaa macluumaadka qorshaha bixinta 60-ka bilood (0% Riba).',
    'Asc, waxaan rabaa inaan ballansado booqashada goobta (Site Tour) Hargeysa.',
    'I would like to speak with a Kaabsan corporate sales representative.'
  ];

  const quickMessages = siteConfig?.whatsappTemplates?.quickMessages && siteConfig.whatsappTemplates.quickMessages.length > 0
    ? siteConfig.whatsappTemplates.quickMessages
    : defaultQuickMessages;

  const handleSendMessage = (textToSend?: string) => {
    const defaultTemplate = siteConfig?.whatsappTemplates?.defaultInquiry || 'Asc Kaabsan Real Estate, waxaan rabaa macluumaad ku saabsan mashaariicda guryaha Hargeysa.';
    const userText = textToSend || message || defaultTemplate;
    const formattedWithSource = `Kaabsan Real Estate Official Website:\n${userText}`;
    const encoded = encodeURIComponent(formattedWithSource);
    window.open(`https://wa.me/${cleanPhone}?text=${encoded}`, '_blank', 'noopener,noreferrer');
    setMessage('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* WhatsApp Popup Card */}
      {isOpen && (
        <div 
          className="mb-3 w-[90vw] max-w-sm bg-white rounded-2xl shadow-2xl border border-[#E5E2DA] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
          id="whatsapp-chat-popup"
        >
          {/* Header */}
          <div className="bg-[#128C7E] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/20">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] border-2 border-[#128C7E] rounded-full" />
              </div>

              <div>
                <div className="flex items-center gap-1">
                  <h4 className="font-medium text-sm text-white">Kaabsan Real Estate</h4>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]/20" />
                </div>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span>Telesom Group</span>
                  <span>•</span>
                  <span>Online now</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-[#ECE5DD]/40 space-y-3 max-h-[65vh] overflow-y-auto">
            {/* Representative welcome bubble */}
            <div className="bg-white rounded-xl rounded-tl-none p-3 shadow-xs border border-[#E5E2DA] text-xs text-[#1A1A1A] space-y-1.5">
              <div className="text-[10px] text-[#C2A55D] font-semibold">Kaabsan Sales & Client Desk</div>
              <p className="leading-relaxed">
                Ku soo dhawoow Kaabsan Real Estate! Ma doonaysaa faahfaahin ku saabsan mashaariicda <strong>Rugsan Gardens</strong>, <strong>Aragsan Village</strong>, ama <strong>Qorshaha 60-ka Bilood</strong>?
              </p>
              <div className="text-[9px] text-gray-400 text-right font-mono">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>

            {/* Quick Prompts */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-medium text-[#6B665E] px-1">
                Dooro su'aalaha caadiga ah:
              </div>
              {quickMessages.map((msg, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(msg)}
                  className="w-full text-left text-xs bg-white hover:bg-[#F9F8F6] active:bg-emerald-50 text-[#35322E] p-2.5 rounded-xl border border-[#E5E2DA] hover:border-[#128C7E] transition-all flex items-center justify-between group cursor-pointer"
                >
                  <span className="line-clamp-2 pr-2">{msg}</span>
                  <Send className="w-3.5 h-3.5 text-[#128C7E] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </button>
              ))}
            </div>

            {/* Direct Call / Contact notice */}
            <div className="p-2.5 bg-emerald-50/80 rounded-xl border border-emerald-200/60 text-[11px] text-emerald-900 flex items-center justify-between">
              <div>
                <span className="font-semibold block">Toos u wac WhatsApp ama Mobile:</span>
                <span className="font-mono text-xs">{activeDisplay}</span>
              </div>
              <a 
                href={`tel:+${cleanPhone}`} 
                className="p-2 bg-[#128C7E] text-white rounded-lg hover:bg-[#075E54] transition-colors"
                title="Direct Phone Call"
              >
                <PhoneCall className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Custom Input Footer */}
          <div className="p-3 bg-white border-t border-[#E5E2DA]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Qor fariintaada halkan..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                aria-label="Fariinta WhatsApp"
                id="whatsapp-message-input"
                className="flex-1 bg-[#F9F8F6] border border-[#E5E2DA] focus:border-[#128C7E] rounded-xl px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="p-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl transition-colors flex-shrink-0 cursor-pointer shadow-xs"
                title="Send via WhatsApp"
                aria-label="Send via WhatsApp"
                id="whatsapp-submit-btn"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border-2 border-white/80"
        aria-label="Open WhatsApp Chat with Kaabsan Real Estate"
        id="whatsapp-floating-button"
      >
        <span className="relative flex items-center justify-center">
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
        </span>
        
        <span className="hidden sm:inline font-medium text-xs tracking-wide">
          WhatsApp (+252 63 6100090)
        </span>
      </button>
    </div>
  );
};
