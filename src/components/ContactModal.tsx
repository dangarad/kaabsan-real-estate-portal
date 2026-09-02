import React, { useState, useEffect } from 'react';
import { X, Phone, Mail, MapPin, CheckCircle2, ShieldCheck, Clock, MessageCircle } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { saveLeadToFirestore } from '../lib/firebase';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMessage?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  initialMessage = ''
}) => {
  const { t, language } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('Rugsan Gardens Purchase');
  const [message, setMessage] = useState(initialMessage);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (initialMessage) {
      setMessage(initialMessage);
    }
  }, [initialMessage]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const leadPayload = {
      fullName: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      propertyTitle: inquiryType,
      type: 'contact' as const,
      message: `${message ? message + ' | ' : ''}Nooca Codsiga: ${inquiryType}`,
      status: 'new' as const,
      createdAt: new Date().toISOString()
    };

    try {
      // 1. Save to Firebase Firestore Cloud Database
      await saveLeadToFirestore(leadPayload);

      // 2. Also keep in local storage
      try {
        const stored = localStorage.getItem('kaabsan_leads_data');
        const list = stored ? JSON.parse(stored) : [];
        list.unshift({
          id: `lead-${Date.now()}`,
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          propertyName: inquiryType,
          status: 'New Inquiry',
          timestamp: new Date().toLocaleString(),
          message: message.trim()
        });
        localStorage.setItem('kaabsan_leads_data', JSON.stringify(list));
      } catch {
        // ignore
      }

      await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          inquiryType,
          message
        })
      });
      setConfirmed(true);
    } catch (err) {
      setConfirmed(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setConfirmed(false);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FFFFFF] border border-[#E5E2DA] rounded-2xl shadow-2xl overflow-hidden text-[#1A1A1A]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#F9F8F6] border-b border-[#E5E2DA] flex items-center justify-between">
          <div>
            <span className="text-xs text-[#C2A55D] font-semibold">
              Kaabsan Real Estate • Telesom Group
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#1A1A1A] font-normal">
              {language === 'ar' ? 'استشارة وحجز العقارات' : language === 'so' ? 'La-talinta & Ballansashada Guriga' : 'Property Consultation & Booking'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-[#6B665E] hover:text-[#1A1A1A] rounded-full hover:bg-[#EAE6DE] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {confirmed ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#F4F1EA] border border-[#C2A55D] text-[#C2A55D] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif-luxury text-2xl text-[#1A1A1A]">
                {language === 'ar' ? 'تم استلام طلبك بنجاح' : language === 'so' ? 'Codsigaagii Waa La Helay' : 'Inquiry Received'}
              </h4>
              <p className="text-xs sm:text-sm text-[#6B665E] font-light max-w-md mx-auto leading-relaxed">
                {language === 'ar'
                  ? `شكراً لك، ${name}. سيتواصل معك أحد مستشاري كابسان العقاريين مباشرة عبر الهاتف أو الواتساب أو البريد الإلكتروني في أقرب وقت.`
                  : language === 'so'
                  ? `Waad ku mahadsan tahay, ${name}. Khuburada guryaha ee Kaabsan ayaa toos kuugula soo xiriiri doona taleefanka, WhatsApp ama email-ka muddo kooban gudaheed.`
                  : `Thank you, ${name}. A Kaabsan property specialist or site coordinator will contact you directly via phone/WhatsApp or email shortly.`
                }
              </p>
              <div className="pt-2 text-xs text-[#C2A55D] font-medium">
                {language === 'ar'
                  ? 'للمساعدة الفورية، اتصل على الرقم القصير 380 أو اتصل على +252 63 6100090.'
                  : language === 'so'
                  ? 'Caawinaad degdeg ah, wac lambarka gaaban ee 380 ama +252 63 6100090.'
                  : 'For immediate assistance, dial Shortcode 380 or call +252 63 6100090.'
                }
              </div>
              <button
                onClick={handleClose}
                className="mt-4 px-6 py-2.5 bg-[#35322E] text-white font-semibold text-xs rounded-xl hover:bg-[#1F1D1A] transition-colors cursor-pointer shadow-md"
              >
                {language === 'ar' ? 'إغلاق النافذة' : language === 'so' ? 'Xidh Daaqadda' : 'Close Window'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              
              {/* Form */}
              <form onSubmit={handleSubmit} className="md:col-span-7 space-y-4">
                <div>
                  <label className="block text-xs text-[#6B665E] font-medium mb-1">
                    {language === 'ar' ? 'الاسم الكامل *' : language === 'so' ? 'Magacaaga oo Dhamaystiran *' : 'Your Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={language === 'ar' ? 'مثال: جامع حسن' : language === 'so' ? 'tusaale: Jama Hassan' : 'e.g. Jama Hassan'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#F9F8F6] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C2A55D]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-[#6B665E] font-medium mb-1">
                      {language === 'ar' ? 'البريد الإلكتروني *' : language === 'so' ? 'Email-kaaga *' : 'Email Address *'}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jama@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#F9F8F6] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C2A55D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#6B665E] font-medium mb-1">
                      {language === 'ar' ? 'رقم الهاتف / الواتساب *' : language === 'so' ? 'Taleefan / WhatsApp *' : 'Phone / WhatsApp *'}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+252 63 XXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#F9F8F6] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C2A55D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#6B665E] font-medium mb-1">
                    {language === 'ar' ? 'نوع الطلب والاستفسار' : language === 'so' ? 'Nooca Codsiga / Mashruuca' : 'Inquiry Type'}
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full bg-[#F9F8F6] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C2A55D] cursor-pointer"
                  >
                    <option value="Rugsan Gardens Purchase">{language === 'ar' ? 'شراء في مشروع روغسان غاردنز' : language === 'so' ? 'Rugsan Gardens Townhouse / Phase 2 Inquiry' : 'Rugsan Gardens Townhouse / Phase 2 Inquiry'}</option>
                    <option value="Aragsan Village Villa">{language === 'ar' ? 'فيلا فاخرة في أراغسان فيليدج' : language === 'so' ? 'Aragsan Village Mountain Villa' : 'Aragsan Village Mountain Villa'}</option>
                    <option value="Masalaha Luxury Apartments">{language === 'ar' ? 'شقق المصلى الفاخرة' : language === 'so' ? 'Masallaha Luxury Apartments' : 'Masallaha Luxury Apartments'}</option>
                    <option value="60-Month Installment Plan">{language === 'ar' ? 'طلب خطة التقسيط الإسلامي 60 شهراً' : language === 'so' ? '60-Month Islamic Installment Application' : '60-Month Islamic Installment Application'}</option>
                    <option value="Diaspora Investment Advisory">{language === 'ar' ? 'خدمات المغتربين والتسجيل العقاري' : language === 'so' ? 'Diaspora Remote Title Registration & Buying' : 'Diaspora Remote Title Registration & Buying'}</option>
                    <option value="Ready-Mix Concrete Supply">{language === 'ar' ? 'توريد الخرسانة الجاهزة (مصنع كابسان)' : language === 'so' ? 'Ready-Mix Concrete Supply (Batching Plant)' : 'Ready-Mix Concrete Supply (Batching Plant)'}</option>
                    <option value="Site Tour Booking">{language === 'ar' ? 'حجز جولة ميدانية للمشاريع' : language === 'so' ? 'Site Tour Booking (Booqo Goobta)' : 'Schedule VIP On-Site Tour'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-[#6B665E] font-medium mb-1">
                    {language === 'ar' ? 'الرسالة / المواصفات المطلوبة' : language === 'so' ? 'Farriinta / Qolalka & Miisaaniyadda' : 'Message / Preferred Property Specs'}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={language === 'ar' ? 'أخبرنا عن المجتمع المطلوب، عدد الغرف، الميزانية...' : language === 'so' ? 'Faahfaahin ku saabsan xaafadda aad rabto, qolalka, iyo miisaaniyaddaada...' : 'Tell us your desired community, bedroom count, budget, or timeline...'}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#F9F8F6] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C2A55D] placeholder:text-[#8C867D]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#35322E] hover:bg-[#1F1D1A] text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer shadow-md"
                >
                  {isSubmitting ? (language === 'ar' ? 'جاري الإرسال...' : language === 'so' ? 'Diraya Codsiga...' : 'Submitting Request...') : (language === 'ar' ? 'إرسال الطلب إلى مبيعات كابسان' : language === 'so' ? 'U Dir Codsiga Kooxda Kaabsan' : 'Send Inquiry to Kaabsan Sales')}
                </button>
              </form>

              {/* Contact Sidebar */}
              <div className="md:col-span-5 bg-[#F9F8F6] p-5 rounded-2xl border border-[#E5E2DA] space-y-4 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-[#C2A55D] font-semibold mb-3">
                    {language === 'ar' ? 'المقر الرئيسي ومكتب المبيعات' : language === 'so' ? 'Xafiiska Dhexe & Qaybta Iibka' : 'Head Office & Sales Desk'}
                  </div>
                  <p className="text-xs text-[#4A4742] font-light leading-relaxed mb-4">
                    {language === 'ar' ? 'برج تيليسوم، الشارع الرئيسي' : 'Telesom Tower, Main Road'}<br />
                    {language === 'ar' ? 'هرجيسا، أرض الصومال' : 'Hargeisa, Somaliland'}
                  </p>

                  <div className="space-y-2 text-xs text-[#4A4742]">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#C2A55D]" />
                      <span>{language === 'ar' ? 'اتصل بـ 380 (تيليسوم مجاناً)' : language === 'so' ? 'Wac 380 (Telesom)' : 'Call 380 (Telesom)'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#C2A55D]" />
                      <span>+252 (63) 6100090</span>
                    </div>
                    <a 
                      href={`https://wa.me/252636100090?text=${encodeURIComponent('Kaabsan Real Estate Official Website:\nAsc Kaabsan Real Estate, waxaan rabaa macluumaad guud iyo faahfaahin ku saabsan mashaariicda.')}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-medium"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>{language === 'ar' ? 'محادثة عبر واتساب (+252 63 6100090)' : language === 'so' ? 'Kula hadal WhatsApp (+252 63 6100090)' : 'Chat on WhatsApp (+252 63 6100090)'}</span>
                    </a>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#C2A55D]" />
                      <span>sales@kaabsan.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#C2A55D]" />
                      <span>{language === 'ar' ? 'السبت – الخميس: 8:00 ص – 6:00 م' : language === 'so' ? 'Sabti – Khamiis: 8:00 AM – 6:00 PM' : 'Sat – Thu: 8:00 AM – 6:00 PM'}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-white border border-[#E5E2DA] rounded-xl text-xs text-[#6B665E] leading-relaxed font-light shadow-sm">
                  <span className="text-[#C2A55D] font-semibold block mb-0.5">
                    {language === 'ar' ? 'ضمان مجموعة تيليسوم' : language === 'so' ? 'Damaanadda Telesom' : 'Telesom Guarantee'}
                  </span>
                  {language === 'ar'
                    ? 'مدعوم بأمان مجموعة تيليسوم، وسندات ملكية موثقة رسمياً، وشروط تمويل إسلامية واضحة.'
                    : language === 'so'
                    ? 'Waxaa dammaanad buuxda ku leh Telesom Group, waraaqo mulkiyad ah oo sugan, iyo heshiisyo Shareeco ah.'
                    : 'Backed by Telesom Group security, verified property ownership deeds, and Islamic financing terms.'
                  }
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
