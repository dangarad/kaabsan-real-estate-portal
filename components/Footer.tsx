import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram,
  Youtube, 
  Check, 
  Sparkles,
  ShieldCheck,
  Globe,
  Layers,
  MessageCircle,
  Lock
} from 'lucide-react';
import { KaabsanLogo } from './KaabsanLogo';
import { SiteConfig } from '../types';
import { useTranslation } from '../context/LanguageContext';

interface FooterProps {
  onOpenContact: (msg?: string) => void;
  onOpenValuation: () => void;
  onOpenAIAdvisor: () => void;
  onOpenPayment?: () => void;
  onSelectProject?: (projectId: string) => void;
  onNavigateTab?: (tab: string) => void;
  onOpenAdmin?: () => void;
  siteConfig?: SiteConfig;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenContact,
  onOpenValuation,
  onOpenAIAdvisor,
  onOpenPayment,
  onSelectProject,
  onNavigateTab,
  onOpenAdmin,
  siteConfig
}) => {
  const { t, language } = useTranslation();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#23201D] text-[#A8A39A] border-t border-[#35322E] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#35322E]">
          
          {/* Col 1 & 2: Brand, Affiliation, Newsletter */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <KaabsanLogo 
                variant="gold" 
                size="lg" 
                className="mb-2" 
                customLogoUrl={siteConfig?.company?.logoUrl}
              />
            </div>

            <p className="text-xs text-[#A8A39A] font-light leading-relaxed max-w-sm">
              {t.footerAboutText || (language === 'ar'
                ? 'المطور العقاري الرائد في صوماليلاند التابع لمجموعة تيليسوم. نقوم بإنشاء وتطوير مجمعات سكنية مغلقة وفاخرة ومصنع خرسانة جاهزة متطور.'
                : language === 'so'
                ? 'Hormuudka dhismaha magaalooyinka casriga ah iyo guryaha qoysaska ee Somaliland, xubin ka tirsan Telesom Group oo leh warshadda shubka casriga ah.'
                : 'Somaliland’s premier master developer shaping vibrant gated communities (Rugsan Gardens, Aragsan Village), luxury apartments, commercial centers, and operating the nation\'s leading automated concrete batching plant.'
              )}
            </p>

            {/* Newsletter form */}
            <div className="pt-2">
              <div className="text-xs text-[#EBE6DF] font-semibold mb-2">
                {t.newsletterTitle || (language === 'ar' ? 'اشترك في نشرة مشاريع كابسان والاستثمار' : language === 'so' ? 'Ku biir Wararka Mashaariicda & Maalgelinta' : 'Join Kaabsan Investor & Project Updates')}
              </div>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-[#C2A55D] font-medium py-2">
                  <Check className="w-4 h-4" />
                  <span>
                    {language === 'ar' ? 'شكراً لك. تم تسجيل بريدك بنجاح.' : language === 'so' ? 'Waad ku mahadsan tahay. Waad iska diiwaangelisay wararka mashaariicda.' : 'Thank you. You are subscribed to project releases.'}
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-md">
                  <input
                    type="email"
                    required
                    placeholder={t.newsletterPlaceholder || (language === 'ar' ? 'أدخل بريدك الإلكتروني...' : language === 'so' ? 'Geli email-kaaga halkan...' : 'Enter your email address...')}
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 bg-[#1A1815] border border-[#3A3632] focus:border-[#C2A55D] rounded-l-xl px-3.5 py-2.5 text-xs text-[#F9F8F6] focus:outline-none placeholder:text-[#6B665E]"
                  />
                  <button
                    type="submit"
                    className="bg-[#C2A55D] hover:bg-[#D4BC78] text-white font-semibold text-xs px-4 rounded-r-xl transition-colors cursor-pointer"
                  >
                    {t.newsletterBtn || (language === 'ar' ? 'اشتراك' : language === 'so' ? 'Diiwaangeli' : 'Subscribe')}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 3: Developments */}
          <div>
            <div className="text-xs text-[#F9F8F6] font-semibold mb-4">
              {t.footerOurProjects || (language === 'ar' ? 'المشاريع والتطورات' : language === 'so' ? 'Mashaariicda & Wararka' : 'Master Developments')}
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button 
                  onClick={() => onSelectProject ? onSelectProject('rugsan-gardens') : null} 
                  className="hover:text-[#C2A55D] transition-colors text-left cursor-pointer"
                >
                  Rugsan Gardens (Masallaha)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectProject ? onSelectProject('aragsan-village') : null} 
                  className="hover:text-[#C2A55D] transition-colors text-left cursor-pointer"
                >
                  Aragsan Village (Buurta)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectProject ? onSelectProject('bilicsan-village') : null} 
                  className="hover:text-[#C2A55D] transition-colors text-left cursor-pointer"
                >
                  Bilicsan Village
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectProject ? onSelectProject('masalaha-apartments') : null} 
                  className="hover:text-[#C2A55D] transition-colors text-left cursor-pointer"
                >
                  Masallaha Luxury Apartments
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab ? onNavigateTab('gallery') : null} 
                  className="hover:text-[#C2A55D] transition-colors text-left font-medium text-[#C2A55D] flex items-center gap-1 cursor-pointer"
                >
                  <span>{language === 'ar' ? 'معرض الصور الميدانية' : language === 'so' ? 'Sawirrada Rasmiga ah' : 'Official Photo Gallery'}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab ? onNavigateTab('blog') : null} 
                  className="hover:text-[#C2A55D] transition-colors text-left font-medium text-[#C2A55D] flex items-center gap-1 cursor-pointer"
                >
                  <span>{language === 'ar' ? 'الأخبار والمقالات العقارية' : language === 'so' ? 'Wararka & Falanqaynta' : 'News & Market Insights'}</span>
                </button>
              </li>
              <li>
                <a href="#master-projects" className="hover:text-[#C2A55D] transition-colors font-medium text-[#C2A55D] block">
                  {language === 'ar' ? 'التمويل الإسلامي 5 سنوات' : language === 'so' ? 'Maalgelinta 5-ta Sano' : '60-Month Islamic Financing'}
                </a>
              </li>
              <li>
                <button onClick={onOpenAIAdvisor} className="hover:text-[#C2A55D] transition-colors text-left flex items-center gap-1 cursor-pointer">
                  <Sparkles className="w-3 h-3 text-[#C2A55D]" />
                  <span>{t.navAiAdvisor || 'Kaabsan AI Advisor'}</span>
                </button>
              </li>
              {onOpenPayment && (
                <li>
                  <button onClick={onOpenPayment} className="hover:text-[#25D366] transition-colors text-left flex items-center gap-1 text-[#25D366] font-medium cursor-pointer">
                    <span>{t.navPayZaad || 'Zaad & Bank Payments'}</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 4: Quick Navigation & Services */}
          <div>
            <div className="text-xs text-[#F9F8F6] font-semibold mb-4">
              {t.footerQuickLinks || (language === 'ar' ? 'الروابط السريعة' : language === 'so' ? 'Adeegyada & Macluumaadka' : 'Quick Navigation')}
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button 
                  onClick={() => onNavigateTab ? onNavigateTab('buy') : null}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  {t.navBuy || (language === 'ar' ? 'شراء عقار' : language === 'so' ? 'Iibso (Buy)' : 'Buy Properties')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab ? onNavigateTab('rent') : null}
                  className="hover:text-[#C2A55D] transition-colors text-left font-medium text-[#C2A55D] cursor-pointer"
                >
                  {t.navRent || (language === 'ar' ? 'الإيجار وإدارة العقارات' : language === 'so' ? 'Kiro & Maareyn' : 'Rent & Property Management')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab ? onNavigateTab('sell') : null}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  {t.navSell || (language === 'ar' ? 'بيع عقارك' : language === 'so' ? 'Iibi (Sell)' : 'Sell Property')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab ? onNavigateTab('about') : null}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  {t.navAbout || (language === 'ar' ? 'من نحن' : language === 'so' ? 'Nagu Saabsan' : 'About Us')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab ? onNavigateTab('properties') : null}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Masallaha (Masallaha & Rugsan)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab ? onNavigateTab('properties') : null}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Buurta Kala-jeexan (Aragsan & Bilicsan)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Head Office & Contact */}
          <div>
            <div className="text-xs text-[#F9F8F6] font-semibold mb-4">
              {t.footerContactUs || (language === 'ar' ? 'المكتب الرئيسي والمبيعات' : language === 'so' ? 'Xarunta & Xafiiska Iibka' : 'Headquarters & Sales')}
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <strong className="text-white block font-medium">{language === 'ar' ? 'المكتب الرئيسي لكابسان' : language === 'so' ? 'Xafiiska Dhexe ee Kaabsan' : 'Kaabsan Head Office'}</strong>
                <span className="text-[#A8A39A]">{siteConfig?.company?.address || 'Telesom Tower, Main Road, Hargeisa, Somaliland'}</span>
              </div>

              <div>
                <strong className="text-white block font-medium">{language === 'ar' ? 'مصنع الخرسانة الجاهزة والموقع' : language === 'so' ? 'Warshadda Shubka & Xafiiska Goobta' : 'Batching Plant & Site Office'}</strong>
                <span className="text-[#A8A39A]">Masalaha Industrial Corridor, Airport Road, Hargeisa</span>
              </div>

              <div className="pt-2 space-y-1.5">
                <a href="tel:380" className="block text-[#C2A55D] hover:underline font-semibold">
                  {language === 'ar' ? 'الرمز المختصر: 380' : language === 'so' ? 'Wac 380 (Telesom Shortcode)' : 'Telesom Shortcode: 380'}
                </a>
                <a 
                  href={`https://wa.me/${(siteConfig?.whatsappTemplates?.hotlineNumber || siteConfig?.company?.whatsapp || '+252636100090').replace(/\D/g, '')}?text=${encodeURIComponent('Kaabsan Real Estate Official Website:\nAsc Kaabsan Real Estate, waxaan doonayaa inaan macluumaad ka helo mashaariicda iyo guryaha iibka ah.')}`}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1.5 text-white hover:text-[#25D366] font-mono transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>{siteConfig?.company?.phone || siteConfig?.company?.whatsapp || '+252 (63) 6100090'} (WhatsApp)</span>
                </a>
                <a href={`mailto:${siteConfig?.company?.email || 'sales@kaabsan.com'}`} className="block hover:text-white">
                  {siteConfig?.company?.email || 'sales@kaabsan.com'}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Legal, Social & URLs */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#8C867D] font-light">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <div>
              © {new Date().getFullYear()} {siteConfig?.company?.name || 'Kaabsan Real Estate'} ({siteConfig?.domainName || 'kaabsanrealestate.com'}). {t.footerRights || (language === 'ar' ? 'جميع الحقوق محفوظة. إحدى شركات مجموعة تيليسوم.' : language === 'so' ? 'Dhammaan Xuquuqda Way Dhawran Tahay. Xubin ka tirsan Telesom Group.' : 'All Rights Reserved. Part of Telesom Group.')}
            </div>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1 text-[#A8A39A] hover:text-[#C2A55D] font-medium transition-colors cursor-pointer bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-lg border border-white/10"
                id="footer-staff-admin-btn"
                title="Admin Control Panel"
              >
                <Lock className="w-3 h-3 text-[#C2A55D]" />
                <span>{t.navAdminPortal || 'Admin Portal'}</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[#A8A39A]">{language === 'ar' ? 'تمويل إسلامي مرابحة 5 سنوات' : language === 'so' ? 'Maalgelin 60 Bilood ah oo Islaami ah' : '60-Month Sharia-Compliant Financing'}</span>
            <span>•</span>
            <span className="text-[#A8A39A]">{language === 'ar' ? 'خرسانة جاهزة معتمدة مخبرياً' : language === 'so' ? 'Shubka Ready-Mix oo La Hubiyay' : 'Certified Ready-Mixed Concrete'}</span>
          </div>

          {/* Social Platforms: Facebook, Instagram, TikTok, YouTube, LinkedIn, Twitter, WhatsApp */}
          <div className="flex items-center space-x-2.5">
            <a 
              href={siteConfig?.socialLinks?.facebook || 'https://www.facebook.com/kaabsanrealestate/'} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2.5 rounded-xl bg-[#1877F2] text-white hover:bg-[#1465cf] hover:scale-105 active:scale-95 transition-all shadow-sm flex items-center justify-center" 
              aria-label="Kaabsan Real Estate on Facebook"
              title="Facebook: Kaabsan"
            >
              <Facebook className="w-4 h-4 fill-current" />
            </a>

            <a 
              href={siteConfig?.socialLinks?.instagram || 'https://www.instagram.com/kaabsanrealestate/'} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2.5 rounded-xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white hover:brightness-110 hover:scale-105 active:scale-95 transition-all shadow-sm flex items-center justify-center" 
              aria-label="Kaabsan Real Estate on Instagram"
              title="Instagram: Kaabsan"
            >
              <Instagram className="w-4 h-4" />
            </a>

            <a 
              href={siteConfig?.socialLinks?.tiktok || 'https://www.tiktok.com/@kaabsanrealestate'} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2.5 rounded-xl bg-[#010101] border border-[#25F4EE]/40 text-white hover:border-[#FE2C55]/60 hover:scale-105 active:scale-95 transition-all shadow-sm flex items-center justify-center relative overflow-hidden group" 
              aria-label="Kaabsan Real Estate on TikTok"
              title="TikTok: Kaabsan"
            >
              <svg className="w-4 h-4 fill-white group-hover:fill-[#25F4EE] transition-colors" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.27 6.27 0 0 0 1.87-4.47V8.71a8.18 8.18 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.87-.14z"/>
              </svg>
            </a>

            <a 
              href={siteConfig?.socialLinks?.youtube || 'https://www.youtube.com/@kaabsanrealestate'} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2.5 rounded-xl bg-[#FF0000] text-white hover:bg-[#D90000] hover:scale-105 active:scale-95 transition-all shadow-sm flex items-center justify-center" 
              aria-label="Kaabsan Real Estate on YouTube"
              title="YouTube: Kaabsan"
            >
              <Youtube className="w-4 h-4 fill-current" />
            </a>

            <a 
              href={`https://wa.me/${(siteConfig?.whatsappTemplates?.hotlineNumber || siteConfig?.company?.whatsapp || '+252636100090').replace(/\D/g, '')}?text=${encodeURIComponent('Kaabsan Real Estate Official Website:\nAsc Kaabsan Real Estate, waxaan doonayaa inaan macluumaad ka helo mashaariicda.')}`}
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2.5 rounded-xl bg-[#25D366] text-white hover:bg-[#20ba59] hover:scale-105 active:scale-95 transition-all shadow-sm flex items-center justify-center" 
              aria-label="Kaabsan Real Estate on WhatsApp"
              title="WhatsApp: Kaabsan"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
            </a>

            {/* Callback button */}
            <button
              onClick={() => onOpenContact('Request general callback')}
              className="ml-3 text-[#C2A55D] hover:underline cursor-pointer font-medium text-xs whitespace-nowrap"
            >
              {t.requestCallbackBtn || (language === 'ar' ? 'طلب معاودة الاتصال' : language === 'so' ? 'Codso Soo Wacitaan' : 'Request Callback')}
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
