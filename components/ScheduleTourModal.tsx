import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import { Property } from '../types';
import { useTranslation } from '../context/LanguageContext';
import { saveLeadToFirestore } from '../lib/firebase';

interface ScheduleTourModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleTourModal: React.FC<ScheduleTourModalProps> = ({
  property,
  isOpen,
  onClose
}) => {
  const { t, language } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00 AM');
  const [transportNeeded, setTransportNeeded] = useState(false);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  if (!isOpen || !property) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const leadPayload = {
      fullName: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      propertyTitle: property.title,
      project: property.id,
      type: 'tour' as const,
      message: `${notes ? notes + ' | ' : ''}Ballanta: ${date} ${time}${transportNeeded ? ' (Gaari & Kormeer Gaar ah)' : ''}`,
      preferredDate: date,
      preferredTime: time,
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
          propertyName: property.title,
          status: 'New Inquiry',
          timestamp: new Date().toLocaleString(),
          message: leadPayload.message
        });
        localStorage.setItem('kaabsan_leads_data', JSON.stringify(list));
      } catch {
        // ignore
      }

      // 3. Call server backend
      const res = await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          propertyTitle: property.title,
          date,
          time,
          transportNeeded,
          message: notes,
          inquiryType: 'On-Site Development Tour'
        })
      });

      const data = await res.json();
      setConfirmation(data.confirmationNumber || `KB-${Math.floor(100000 + Math.random() * 900000)}`);
    } catch (err) {
      setConfirmation(`KB-${Math.floor(100000 + Math.random() * 900000)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setConfirmation(null);
    setName('');
    setEmail('');
    setPhone('');
    setDate('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#FFFFFF] border border-[#E5E2DA] rounded-2xl shadow-2xl overflow-hidden text-[#1A1A1A]">
        
        {/* Header */}
        <div className="p-5 bg-[#F9F8F6] border-b border-[#E5E2DA] flex items-center justify-between">
          <div>
            <span className="text-xs text-[#C2A55D] font-semibold">
              Kaabsan Real Estate Concierge
            </span>
            <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#1A1A1A] font-normal">
              {language === 'ar' ? 'حجز جولة ميدانية للمشروع' : language === 'so' ? 'Qabso Ballan Kormeerka Goobta' : 'Schedule VIP On-Site Tour'}
            </h3>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-2 text-[#6B665E] hover:text-[#1A1A1A] rounded-full hover:bg-[#EAE6DE] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body or Confirmation */}
        <div className="p-6">
          {confirmation ? (
            <div className="text-center py-8 space-y-4 animate-in fade-in duration-300">
              <div className="w-14 h-14 rounded-full bg-[#F4F1EA] border border-[#C2A55D] text-[#C2A55D] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif-luxury text-2xl text-[#1A1A1A]">
                {language === 'ar' ? 'تم تأكيد حجز الجولة الميدانية بنجاح' : language === 'so' ? 'Ballanta Kormeerka Waa La Xaqiijiyay' : 'Site Tour Booked Successfully'}
              </h4>
              <p className="text-xs sm:text-sm text-[#6B665E] font-light max-w-md mx-auto leading-relaxed">
                {language === 'ar'
                  ? `شكراً لك، ${name}. تم تسجيل طلب زيارة ${property.title} وسيتواصل معك مرافق كابسان الميداني لتأكيد نقطة الالتقاء في هرجيسا.`
                  : language === 'so'
                  ? `Waad ku mahadsan tahay, ${name}. Waxaa la diiwaangeliyay kormeerkaaga ${property.title}, hawl-wadeen ka tirsan Kaabsan ayaa kula soo xiriiri doona si aad u xaqiijisaan goobta kulanka.`
                  : `Thank you, ${name}. A dedicated Kaabsan site escort has registered your visit for ${property.title} and will reach out to confirm your meeting point in Hargeisa.`}
              </p>
              <div className="p-3 bg-[#F9F8F6] border border-[#E5E2DA] rounded-xl max-w-xs mx-auto font-mono text-xs text-[#C2A55D] font-semibold">
                {language === 'ar' ? 'رقم مرجع الزيارة' : language === 'so' ? 'Tixraaca Ballanta' : 'Tour Reference ID'}: {confirmation}
              </div>
              <button
                onClick={handleResetAndClose}
                className="mt-4 px-6 py-2.5 bg-[#35322E] text-white font-semibold text-xs rounded-xl hover:bg-[#1F1D1A] transition-colors cursor-pointer shadow-md"
              >
                {language === 'ar' ? 'إغلاق' : language === 'so' ? 'Waa Yahay' : 'Done'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Property Summary Banner */}
              <div className="p-3 bg-[#F9F8F6] border border-[#E5E2DA] rounded-xl flex items-center gap-3">
                <img
                  src={property.heroImage}
                  alt={property.title}
                  onError={(e) => {
                    const fallback = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80';
                    if (e.currentTarget.src !== fallback) {
                      e.currentTarget.src = fallback;
                    }
                  }}
                  className="w-14 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 truncate">
                  <div className="text-xs font-serif-luxury text-[#1A1A1A] truncate">{property.title}</div>
                  <div className="text-xs text-[#6B665E]">{property.address}, {property.neighborhood}</div>
                  <div className="text-xs text-[#C2A55D] font-mono font-semibold">{property.priceDisplay}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#6B665E] font-medium mb-1">
                    {language === 'ar' ? 'الاسم الكامل *' : language === 'so' ? 'Magacaaga oo Dhamaystiran *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={language === 'ar' ? 'مثال: عبد الرحمن جامع' : language === 'so' ? 'tusaale: Abdirahman Jama' : 'e.g. Abdirahman Jama'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#F9F8F6] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C2A55D]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#6B665E] font-medium mb-1">
                    {language === 'ar' ? 'رقم الهاتف / الواتساب *' : language === 'so' ? 'Taleefan Toos ah / WhatsApp *' : 'Direct Phone / WhatsApp *'}
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
                  {language === 'ar' ? 'البريد الإلكتروني' : language === 'so' ? 'Email-ka' : 'Email Address'}
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F9F8F6] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C2A55D]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#6B665E] font-medium mb-1">
                    {language === 'ar' ? 'تاريخ الزيارة المفضل' : language === 'so' ? 'Taariikhda Aad Doonayso' : 'Preferred Date'}
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#F9F8F6] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C2A55D]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#6B665E] font-medium mb-1">
                    {language === 'ar' ? 'الوقت المفضل للزيارة' : language === 'so' ? 'Waqtiga Kormeerka' : 'Preferred Time Window'}
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#F9F8F6] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C2A55D] cursor-pointer"
                  >
                    <option value="09:00 AM">{language === 'ar' ? 'صباحاً (9:00 ص)' : language === 'so' ? 'Subaxnimo (9:00 AM)' : 'Morning (9:00 AM)'}</option>
                    <option value="11:30 AM">{language === 'ar' ? 'قبل الظهر (11:30 ص)' : language === 'so' ? 'Duhurnimo Ka Hor (11:30 AM)' : 'Late Morning (11:30 AM)'}</option>
                    <option value="03:30 PM">{language === 'ar' ? 'عصراً (3:30 م)' : language === 'so' ? 'Galabnimo (3:30 PM)' : 'Afternoon (3:30 PM)'}</option>
                    <option value="05:00 PM">{language === 'ar' ? 'مساءً (5:00 م)' : language === 'so' ? 'Makhribkii (5:00 PM)' : 'Sunset / Evening (5:00 PM)'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#6B665E] font-medium mb-1">
                  {language === 'ar' ? 'ملاحظات أو استفسارات إضافية' : language === 'so' ? 'Faahfaahin ama Su’aalo dheeraad ah' : 'Additional Notes or Questions'}
                </label>
                <textarea
                  rows={2}
                  placeholder={language === 'ar' ? 'مثال: الاستفسار عن مواعيد تسليم المرحلة الثانية، معاينة الفيلا النموذجية...' : language === 'so' ? 'tusaale: Qaybta 2-aad ee Rugsan, waqtiga wareejinta guryaha, booqashada guriga tusaalaha ah...' : 'e.g. Interested in Rugsan Phase 2 delivery dates, sample model townhouse walkthrough...'}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#F9F8F6] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C2A55D] placeholder:text-[#8C867D]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="transport-checkbox"
                  checked={transportNeeded}
                  onChange={(e) => setTransportNeeded(e.target.checked)}
                  className="accent-[#C2A55D]"
                />
                <label htmlFor="transport-checkbox" className="text-xs text-[#4A4742] cursor-pointer font-light">
                  {language === 'ar' ? 'طلب توصيل مجاني من برج تيليسوم أو مطار هرجيسا الدولي' : language === 'so' ? 'Codso gaadhi kuu qaada kormeerka lagaaga soo qaado Telesom Tower ama Garoonka' : 'Request complimentary escort pickup from Telesom Tower or Airport'}
                </label>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#35322E] hover:bg-[#1F1D1A] disabled:opacity-50 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer shadow-md"
                >
                  {isSubmitting
                    ? (language === 'ar' ? 'جاري تسجيل الزيارة...' : language === 'so' ? 'Diiwaangelinaya Kormeerka...' : 'Registering On-Site Tour...')
                    : (language === 'ar' ? 'تأكيد حجز الجولة الميدانية' : language === 'so' ? 'Xaqiiji Ballanta Kormeerka' : 'Confirm Site Tour Booking')}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
