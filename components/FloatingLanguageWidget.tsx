import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronUp } from 'lucide-react';
import { Language } from '../utils/translations';
import { useLanguage } from '../context/LanguageContext';

interface FloatingLanguageWidgetProps {
  language?: Language;
  setLanguage?: (lang: Language) => void;
  onLanguageChange?: (lang: Language) => void;
}

export const FloatingLanguageWidget: React.FC<FloatingLanguageWidgetProps> = ({
  language: propLang,
  setLanguage: propSetLang,
  onLanguageChange
}) => {
  const context = useLanguage();
  const activeLanguage = propLang || context?.language || 'en';

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: Array<{ code: Language; name: string; nativeName: string; flag: string }> = [
    { code: 'so', name: 'Somali', nativeName: 'Soomaali', flag: '🇸🇴' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' }
  ];

  const current = languages.find(l => l.code === activeLanguage) || languages[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: Language) => {
    if (propSetLang) propSetLang(code);
    if (onLanguageChange) onLanguageChange(code);
    if (context?.setLanguage) context.setLanguage(code);
    try {
      localStorage.setItem('kaabsan_language', code);
      window.dispatchEvent(new Event('kaabsan_language_changed'));
    } catch {}
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-[88px] right-6 z-40 flex flex-col items-end" ref={dropdownRef}>
      {/* Expanded Language Menu Popup */}
      {isOpen && (
        <div className="mb-2.5 w-56 bg-white/98 backdrop-blur-md border border-[#E5E2DA] rounded-2xl shadow-2xl p-2 animate-in fade-in slide-in-from-bottom-2 duration-150 ring-1 ring-black/5">
          <div className="px-3 py-1.5 border-b border-[#F2EFE9] mb-1 flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#8C867D] uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#C2A55D]" />
              Select Language
            </span>
          </div>

          <div className="space-y-1">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => handleSelect(l.code)}
                className={`w-full text-left rtl:text-right px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                  activeLanguage === l.code
                    ? 'bg-[#35322E] text-white font-bold shadow-xs'
                    : 'text-[#35322E] hover:bg-[#F4F1EA]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{l.flag}</span>
                  <div>
                    <div className="font-semibold leading-tight">{l.nativeName}</div>
                    <div className={`text-[10px] ${activeLanguage === l.code ? 'text-[#D8D3C8]' : 'text-[#8C867D]'}`}>
                      {l.name}
                    </div>
                  </div>
                </div>

                {activeLanguage === l.code && (
                  <Check className="w-4 h-4 text-[#C2A55D] stroke-[2.5]" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Floating Bottom-Right Trigger Pill directly above WhatsApp */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 px-3 py-1.5 bg-white/95 hover:bg-white text-[#35322E] border border-[#E5E2DA] hover:border-[#C2A55D] rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer backdrop-blur-md"
        id="floating-language-switcher-btn"
        title="Language / Luqadda / اللغة"
        aria-label="Change Language (English, Somali, Arabic)"
        aria-expanded={isOpen}
      >
        <span className="text-sm">{current.flag}</span>
        <span className="text-xs font-bold tracking-wide uppercase">{current.code}</span>
        <span className="text-[10px] text-[#8C867D] group-hover:text-[#C2A55D] transition-colors">
          <ChevronUp className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </span>
      </button>
    </div>
  );
};

