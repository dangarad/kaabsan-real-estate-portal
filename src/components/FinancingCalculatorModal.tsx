import React, { useState, useMemo } from 'react';
import { 
  X, 
  Calculator, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  Download, 
  Building, 
  DollarSign, 
  Calendar, 
  Percent, 
  HelpCircle,
  Share2,
  CreditCard
} from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { Property } from '../types';

interface FinancingCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProperty?: Property | null;
  initialPrice?: number;
  onSelectPropertyForTour?: (propertyTitle: string) => void;
  onOpenPayment?: (propertyTitle?: string) => void;
}

const PRESET_PROJECTS = [
  { id: 'rugsan', title: 'Rugsan Gardens Townhouse (Masalaha)', price: 225000, beds: 4, baths: 4, area: '260 m²' },
  { id: 'aragsan', title: 'Aragsan Village Villa (Buurta Kala-jeexan)', price: 292000, beds: 5, baths: 5, area: '340 m²' },
  { id: 'bilicsan', title: 'Bilicsan Village Home (Airport Road)', price: 185000, beds: 3, baths: 3, area: '210 m²' },
  { id: 'masallaha', title: 'Masallaha Luxury Apartment', price: 135000, beds: 3, baths: 2, area: '155 m²' },
  { id: 'custom', title: 'Custom Amount / Guri Kale', price: 200000, beds: 0, baths: 0, area: '' }
];

export const FinancingCalculatorModal: React.FC<FinancingCalculatorModalProps> = ({
  isOpen,
  onClose,
  initialProperty,
  initialPrice,
  onSelectPropertyForTour,
  onOpenPayment
}) => {
  const { t, language } = useTranslation();

  const [selectedPresetId, setSelectedPresetId] = useState<string>(() => {
    if (initialProperty) {
      if (initialProperty.title.toLowerCase().includes('rugsan')) return 'rugsan';
      if (initialProperty.title.toLowerCase().includes('aragsan')) return 'aragsan';
      if (initialProperty.title.toLowerCase().includes('bilicsan')) return 'bilicsan';
      if (initialProperty.title.toLowerCase().includes('masallaha')) return 'masallaha';
      return 'custom';
    }
    return 'rugsan';
  });

  const [customPrice, setCustomPrice] = useState<number>(() => {
    if (initialPrice) return initialPrice;
    if (initialProperty) return initialProperty.price;
    return 225000;
  });

  const [paymentMode, setPaymentMode] = useState<'murabaha' | 'cash'>('murabaha');
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);
  const [termMonths, setTermMonths] = useState<number>(60);
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');

  // Selected base price
  const basePrice = useMemo(() => {
    if (selectedPresetId === 'custom') {
      return customPrice > 0 ? customPrice : 200000;
    }
    const match = PRESET_PROJECTS.find(p => p.id === selectedPresetId);
    return match ? match.price : 225000;
  }, [selectedPresetId, customPrice]);

  // Murabaha calculations
  const murabahaProfitRate = paymentMode === 'murabaha' ? 0.15 : 0; // 15% fixed Islamic profit markup
  const profitAmount = Math.round(basePrice * murabahaProfitRate);
  const effectiveTotalPrice = basePrice + profitAmount;

  const downPaymentAmount = Math.round(effectiveTotalPrice * (downPaymentPercent / 100));
  const remainingFinancedBalance = effectiveTotalPrice - downPaymentAmount;
  const monthlyInstallment = Math.round(remainingFinancedBalance / termMonths);

  if (!isOpen) return null;

  const formatMoney = (val: number) => {
    return '$' + val.toLocaleString();
  };

  const handlePresetChange = (presetId: string) => {
    setSelectedPresetId(presetId);
    if (presetId !== 'custom') {
      const match = PRESET_PROJECTS.find(p => p.id === presetId);
      if (match) {
        setCustomPrice(match.price);
      }
    }
  };

  const getProjectName = () => {
    if (selectedPresetId === 'custom') {
      return `Custom Property (${formatMoney(basePrice)})`;
    }
    const p = PRESET_PROJECTS.find(item => item.id === selectedPresetId);
    return p ? p.title : 'Kaabsan Property';
  };

  const handleApplyWhatsApp = () => {
    const text = encodeURIComponent(
      `Kaabsan Real Estate Official Website:\n` +
      `*Codsi Maalgelin / Financing Application*\n` +
      `Mashruuca: ${getProjectName()}\n` +
      `Nooca Bixinta: ${paymentMode === 'murabaha' ? '15% Murabaha Islamic Financing' : 'Cash (0% markup)'}\n` +
      `Qiimaha Guud: ${formatMoney(effectiveTotalPrice)}\n` +
      `Horumarinta Hore (Down Payment): ${downPaymentPercent}% (${formatMoney(downPaymentAmount)})\n` +
      `Mudada: ${termMonths} Bilood (${Math.round(termMonths / 12)} Sano)\n` +
      `Qaybta Bishiiba: ${formatMoney(monthlyInstallment)} / bishii\n` +
      (applicantName ? `Magaca: ${applicantName}\n` : '') +
      (applicantPhone ? `Tel: ${applicantPhone}\n` : '') +
      `Fadlan ila soo xiriira si aan u dhammaystiro codsiga.`
    );
    window.open(`https://wa.me/252636100090?text=${text}`, '_blank');
  };

  const handlePrintSummary = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-[#FBF9F5] w-full max-w-4xl rounded-3xl border border-[#E5E2DA] shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#1F1D1A] text-white px-6 py-5 flex items-center justify-between border-b border-[#35322E]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C2A55D]/20 border border-[#C2A55D]/40 flex items-center justify-center text-[#C2A55D]">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold tracking-wider uppercase text-[#C2A55D] bg-[#C2A55D]/15 px-2.5 py-0.5 rounded-full border border-[#C2A55D]/30">
                  {language === 'ar' ? 'تمويل إسلامي 100%' : language === 'so' ? '100% Shareeco Waafaqsan' : '100% Sharia Compliant'}
                </span>
                <span className="text-[11px] text-neutral-400 font-mono">Dara Salaam Bank • 0% Riba</span>
              </div>
              <h2 className="text-lg sm:text-xl font-serif-luxury font-normal text-white mt-1">
                {language === 'ar' 
                  ? 'حاسبة التمويل الإسلامي بالمرابحة (60 شهراً)' 
                  : language === 'so' 
                  ? 'Xisaabiyaha Maalgelinta 5-ta Sano ee Kaabsan & Dara Salaam Bank' 
                  : '60-Month Islamic Financing & Murabaha Calculator'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">

          {/* Preset Project Selector Buttons */}
          <div>
            <label className="block text-xs font-bold text-[#1A1A1A] mb-2.5">
              {language === 'ar' ? 'اختر المشروع أو العقار:' : language === 'so' ? 'Dooro Mashruuca ama Guriga:' : 'Select Master Project or Property:'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {PRESET_PROJECTS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handlePresetChange(item.id)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    selectedPresetId === item.id
                      ? 'bg-[#1F1D1A] text-white border-[#1F1D1A] shadow-md ring-2 ring-[#C2A55D]'
                      : 'bg-white text-[#35322E] border-[#E5E2DA] hover:border-[#C2A55D] hover:bg-[#F9F8F6]'
                  }`}
                >
                  <div>
                    <div className="text-[11px] font-bold line-clamp-1">
                      {item.id === 'rugsan' ? 'Rugsan Gardens' :
                       item.id === 'aragsan' ? 'Aragsan Village' :
                       item.id === 'bilicsan' ? 'Bilicsan Village' :
                       item.id === 'masallaha' ? 'Masallaha Apt' : 'Custom Amount'}
                    </div>
                    <div className={`text-[10px] ${selectedPresetId === item.id ? 'text-neutral-400' : 'text-[#8C867D]'}`}>
                      {item.beds > 0 ? `${item.beds} Beds • ${item.area}` : 'Guri Kale'}
                    </div>
                  </div>
                  <div className={`mt-2 text-xs font-mono font-bold ${selectedPresetId === item.id ? 'text-[#C2A55D]' : 'text-[#1A1A1A]'}`}>
                    {item.id === 'custom' ? 'Custom $' : formatMoney(item.price)}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Price Input if selected */}
          {selectedPresetId === 'custom' && (
            <div className="p-4 bg-white rounded-2xl border border-[#E5E2DA] flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in duration-200">
              <div className="w-full sm:w-auto">
                <label className="block text-xs font-bold text-[#1A1A1A]">
                  {language === 'ar' ? 'أدخل قيمة العقار ($ USD):' : language === 'so' ? 'Geli Qiimaha Guriga aad rabto ($ USD):' : 'Enter Custom Property Value ($ USD):'}
                </label>
                <span className="text-[11px] text-[#6B665E]">Qiimo kasta oo u dhexeeya $50,000 ilaa $1,000,000</span>
              </div>
              <div className="relative w-full sm:w-64">
                <DollarSign className="w-4 h-4 text-[#8C867D] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  min="20000"
                  max="2000000"
                  step="5000"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(Number(e.target.value))}
                  className="w-full bg-[#F9F8F6] border border-[#E5E2DA] rounded-xl pl-9 pr-4 py-2 text-sm font-bold text-[#1A1A1A] focus:outline-none focus:border-[#C2A55D]"
                />
              </div>
            </div>
          )}

          {/* Payment Type Selection (Cash vs Murabaha Financing) */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E5E2DA] space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="text-xs font-bold text-[#1A1A1A] block">
                  {language === 'ar' ? 'طريقة السداد والتمويل:' : language === 'so' ? 'Qaabka Bixinta Lacagta (Cash vs Maalgelin):' : 'Payment & Financing Route:'}
                </span>
                <span className="text-[11px] text-[#6B665E]">
                  {language === 'ar' 
                    ? 'التمويل لمدة 60 شهراً مخصص لطلب المرابحة فقط. الدفع النقدي يتم مباشرة وبدون أي زيادة.' 
                    : language === 'so' 
                    ? 'Qorshaha 60-ka bilood wuxuu ku kooban yahay MAALGELIN kaliya. Haddii aad Cash marayso, lacagta si toos ah ayaad u shubaysaa.' 
                    : '60-month installment plan is exclusively for Financing/Murabaha. Cash route is direct payment with 0% markup.'}
                </span>
              </div>

              <div className="flex bg-[#EFECE6] p-1 rounded-xl border border-[#E5E2DA]">
                <button
                  type="button"
                  onClick={() => setPaymentMode('cash')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    paymentMode === 'cash'
                      ? 'bg-[#1F1D1A] text-white shadow-sm'
                      : 'text-[#6B665E] hover:text-[#1A1A1A]'
                  }`}
                >
                  💵 {language === 'ar' ? 'نقداً / مباشر (0% مرابحة)' : language === 'so' ? 'Lacag Caddaan ah (0% Dulsaar)' : 'Cash / Outright (0% Markup)'}
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMode('murabaha')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    paymentMode === 'murabaha'
                      ? 'bg-[#C2A55D] text-white shadow-sm'
                      : 'text-[#6B665E] hover:text-[#1A1A1A]'
                  }`}
                >
                  🏦 {language === 'ar' ? 'تمويل 60 شهراً (+15% مرابحة)' : language === 'so' ? 'Maalgelinta 60-ka Bilood' : '60-Month Financing (+15%)'}
                </button>
              </div>
            </div>

            {/* Informational Guidance Alert */}
            <div className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
              paymentMode === 'cash'
                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                : 'bg-amber-50/80 border-amber-200 text-amber-950'
            }`}>
              <ShieldCheck className={`w-4 h-4 flex-shrink-0 mt-0.5 ${paymentMode === 'cash' ? 'text-emerald-700' : 'text-[#C2A55D]'}`} />
              <div>
                <span className="font-bold block">
                  {paymentMode === 'cash' 
                    ? '💵 Cash Route (Iibka Tooska ah ee Kaabsan):' 
                    : '🏦 Maalgelinta 60-ka Bilood (Dara Salaam Bank & Kaabsan):'}
                </span>
                <p className="mt-0.5 text-[11px] leading-relaxed">
                  {paymentMode === 'cash'
                    ? 'Lacag bixinta 60-ka bilood waxay ku kooban tahay oo kaliya marka aad maalgelin rabto. Haddii aad Cash marayso, lacagta guriga si toos ah ayaad u shubaysaa 0% markup adigoo ku bixinaya 100% toos ah ama heshiiska wajiyada dhismaha.'
                    : 'Heshiiska Muraabaxada: Faa\'iido go\'an oo 15% ah ayaa lagu darayaa qiimaha asalka ah, waxaana laguu qaybinayaa 60 bilood (5 sano) oo siman, 0% Riba ah, adigoo bixinaya horumarin hore (Down Payment 15%-30%).'}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Calculation Grid (Sliders & Result Breakdown) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left Col: Mode-dependent view (7 cols) */}
            <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-3xl border border-[#E5E2DA] space-y-6 flex flex-col justify-between shadow-xs">
              
              {paymentMode === 'cash' ? (
                /* CASH ROUTE BREAKDOWN VIEW */
                <div className="space-y-4">
                  <div className="border-b border-[#E5E2DA] pb-3">
                    <h4 className="font-bold text-sm text-[#1A1A1A] flex items-center gap-2">
                      <span>Jadwalka Bixinta Lacagta Cash-ka ah (Direct Cash Milestone)</span>
                    </h4>
                    <p className="text-[11px] text-[#6B665E] mt-0.5">
                      Iibka Cash-ka ah uma baahna bangi ama dammaanad maalgelin. Waxaad lacagta toos ugu shubaysaa akoonnada Kaabsan Real Estate:
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EBE6DF] flex items-center justify-between">
                      <div>
                        <span className="font-bold text-xs text-[#1A1A1A] block">1. Horumarinta Hore / Booking (10%)</span>
                        <span className="text-[10px] text-[#6B665E]">Xaqiijinta goynta cutubka iyo heshiiska rasmiga ah</span>
                      </div>
                      <span className="font-mono font-bold text-xs text-[#1A1A1A]">{formatMoney(Math.round(basePrice * 0.10))}</span>
                    </div>

                    <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EBE6DF] flex items-center justify-between">
                      <div>
                        <span className="font-bold text-xs text-[#1A1A1A] block">2. Wajiga 1aad ee Dhismaha (40%)</span>
                        <span className="text-[10px] text-[#6B665E]">Dhameystirka aasaaska iyo qaab-dhismeedka (Structure)</span>
                      </div>
                      <span className="font-mono font-bold text-xs text-[#1A1A1A]">{formatMoney(Math.round(basePrice * 0.40))}</span>
                    </div>

                    <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EBE6DF] flex items-center justify-between">
                      <div>
                        <span className="font-bold text-xs text-[#1A1A1A] block">3. Wajiga 2aad & Furaha (50%)</span>
                        <span className="text-[10px] text-[#6B665E]">Dhameystirka furaha iyo wareejinta Buugga Mulkiyadda</span>
                      </div>
                      <span className="font-mono font-bold text-xs text-[#1A1A1A]">{formatMoney(Math.round(basePrice * 0.50))}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                    <span className="font-semibold">Wadarta Guud ee Cash (0% Markup):</span>
                    <span className="font-bold font-mono text-base text-emerald-700">{formatMoney(basePrice)}</span>
                  </div>
                </div>
              ) : (
                /* FINANCING 60-MONTH SLIDERS */
                <>
                  {/* Down Payment Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-[#35322E] flex items-center gap-1.5">
                        <Percent className="w-3.5 h-3.5 text-[#C2A55D]" />
                        {language === 'ar' ? 'الدفعة الأولى:' : language === 'so' ? 'Horumarinta Hore:' : 'Upfront Down Payment:'}
                      </span>
                      <span className="text-[#C2A55D] font-mono text-sm bg-[#FAF8F5] px-2.5 py-0.5 rounded-lg border border-[#E5E2DA]">
                        {downPaymentPercent}% = {formatMoney(downPaymentAmount)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="15"
                      max="60"
                      step="5"
                      value={downPaymentPercent}
                      onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                      className="w-full accent-[#C2A55D] h-2 bg-[#EFECE6] rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-[#8C867D] font-mono">
                      <span>15% ($ Min)</span>
                      <span className="font-bold text-[#C2A55D]">30% (Standard Telesom Plan)</span>
                      <span>60% ($ Max)</span>
                    </div>
                  </div>

                  {/* Financing Period Selection */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-[#35322E] flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#C2A55D]" />
                        {language === 'ar' ? 'مدة السداد بالشهور (Tenure):' : language === 'so' ? 'Muddada Maalgelinta (Bilood):' : 'Financing Tenure (Months):'}
                      </span>
                      <span className="text-[#1A1A1A] font-mono text-sm bg-[#FAF8F5] px-2.5 py-0.5 rounded-lg border border-[#E5E2DA]">
                        {termMonths} {language === 'ar' ? 'شهراً' : language === 'so' ? 'Bilood' : 'Months'} ({Math.round(termMonths / 12)} {language === 'ar' ? 'سنوات' : language === 'so' ? 'Sano' : 'Years'})
                      </span>
                    </div>
                    <div className="grid grid-cols-5 gap-1.5">
                      {[12, 24, 36, 48, 60].map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setTermMonths(m)}
                          className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer text-center ${
                            termMonths === m
                              ? 'bg-[#1F1D1A] text-white border-[#1F1D1A] shadow-xs'
                              : 'bg-[#F9F8F6] text-[#6B665E] border-[#E5E2DA] hover:border-[#C2A55D]'
                          }`}
                        >
                          {m} M
                          <span className="block text-[9px] font-normal opacity-80">{Math.round(m / 12)} Yr</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Breakdown numbers line */}
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#E5E2DA] text-xs">
                    <div className="bg-[#FAF8F5] p-2.5 rounded-xl border border-[#EBE6DF]">
                      <span className="text-[10px] text-[#8C867D] block">Qiimaha Asalka</span>
                      <span className="font-bold text-[#1A1A1A] font-mono">{formatMoney(basePrice)}</span>
                    </div>
                    <div className="bg-[#FAF8F5] p-2.5 rounded-xl border border-[#EBE6DF]">
                      <span className="text-[10px] text-[#8C867D] block">Muraabaxo (15%)</span>
                      <span className="font-bold text-[#C2A55D] font-mono">{formatMoney(profitAmount)}</span>
                    </div>
                    <div className="bg-[#FAF8F5] p-2.5 rounded-xl border border-[#EBE6DF]">
                      <span className="text-[10px] text-[#8C867D] block">Hadhaaga</span>
                      <span className="font-bold text-[#1A1A1A] font-mono">{formatMoney(remainingFinancedBalance)}</span>
                    </div>
                  </div>
                </>
              )}

            </div>

            {/* Right Col: Live Summary Card (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#1F1D1A] to-[#2B2824] text-white p-6 rounded-3xl border border-[#35322E] shadow-xl flex flex-col justify-between relative overflow-hidden">
              
              {/* Background ambient glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C2A55D]/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between border-b border-neutral-700/60 pb-3">
                  <span className="text-xs text-neutral-300 font-medium">
                    {paymentMode === 'cash' ? 'Wadarta Bixinta Cash' : 'Qaybta Bishiiba Waa (Installment)'}
                  </span>
                  <span className="text-xs font-mono text-[#C2A55D] bg-[#C2A55D]/20 px-2 py-0.5 rounded-md">
                    {paymentMode === 'cash' ? '0% Markup (Toos)' : `${termMonths} Bilood (5 Sano)`}
                  </span>
                </div>

                {/* Big Display Number */}
                <div className="py-2">
                  {paymentMode === 'cash' ? (
                    <div>
                      <div className="text-3xl sm:text-4xl lg:text-5xl font-mono font-normal text-[#C2A55D] tracking-tight">
                        {formatMoney(basePrice)}
                      </div>
                      <p className="text-[11px] text-emerald-400 font-medium mt-1">
                        ✓ Qiimaha dhabta ah ee guriga (0% dulsaar bangi)
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="text-3xl sm:text-4xl lg:text-5xl font-mono font-normal text-[#C2A55D] tracking-tight">
                        {formatMoney(monthlyInstallment)}
                        <span className="text-sm sm:text-base font-sans text-neutral-300 font-normal ml-1">/ bishii</span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-1">
                        Lacag bille ah oo go'an oo aan isbeddelayn ilaa {termMonths} bilood
                      </p>
                    </div>
                  )}
                </div>

                {/* Key Summary Rows */}
                <div className="space-y-2 text-xs border-t border-neutral-700/60 pt-3">
                  {paymentMode === 'cash' ? (
                    <>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Habka Bixinta:</span>
                        <span className="font-bold text-white">Direct Cash / Bank Transfer</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Mudada 60-ka Bilood:</span>
                        <span className="font-bold text-neutral-300">Ma khuseyso (Kaliya Maalgelin)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Qiimaha Guud:</span>
                        <span className="font-mono font-bold text-[#C2A55D]">{formatMoney(basePrice)}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Horumarinta Hore (Down Payment):</span>
                        <span className="font-mono font-bold text-white">{formatMoney(downPaymentAmount)} ({downPaymentPercent}%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Hadhaaga Billeysada ah:</span>
                        <span className="font-mono font-bold text-white">{formatMoney(remainingFinancedBalance)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Wadarta Guud ee Guriga:</span>
                        <span className="font-mono font-bold text-[#C2A55D]">{formatMoney(effectiveTotalPrice)}</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between text-[11px] text-neutral-400">
                    <span>Mulkiyadda:</span>
                    <span className="text-white">Freehold Title Deed (Dowladda Hoose)</span>
                  </div>
                </div>
              </div>

              {/* Call to Action Buttons */}
              <div className="space-y-2.5 pt-6 relative z-10">
                {onOpenPayment && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      const currentPreset = PRESET_PROJECTS.find(p => p.id === selectedPresetId);
                      const projectTitle = currentPreset?.title || initialProperty?.title || 'Rugsan Gardens';
                      onOpenPayment(projectTitle);
                    }}
                    className="w-full py-3 bg-[#1A1815] hover:bg-[#2A2620] border border-[#C2A55D]/40 text-[#DFCA85] text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4 text-[#C2A55D]" />
                    <span>Akoonnada Bangiyada & Bixi Hadda (Zaad / Bank)</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleApplyWhatsApp}
                  className="w-full py-3 bg-[#C2A55D] hover:bg-[#B3954C] text-white text-xs font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>{paymentMode === 'cash' ? 'Ku Iibso Cash WhatsApp (+252 63 6100090)' : 'Ku Codso Maalgelinta 60-ka Bilood WhatsApp'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href="tel:380"
                    className="flex-1 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-[11px] font-semibold rounded-xl text-center flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#C2A55D]" />
                    <span>Wac 380 Direct</span>
                  </a>
                  <button
                    type="button"
                    onClick={handlePrintSummary}
                    className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-[11px] font-semibold rounded-xl flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    title="Print Summary"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Print</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Sharia Compliance & Telesom Security Guarantee Notice */}
          <div className="p-4 bg-[#EFECE6] rounded-2xl border border-[#E5E2DA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-white border border-[#E5E2DA] text-[#C2A55D]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-[#1A1A1A]">
                  {language === 'ar' ? 'ضمانات التمويل الإسلامي ومجموعة تيليسوم' : language === 'so' ? 'Kalsoonida Telesom Group & Dara Salaam Bank' : 'Telesom Group & Dara Salaam Bank Guarantee'}
                </h4>
                <p className="text-[#6B665E] text-[11px] mt-0.5 leading-relaxed">
                  {language === 'ar'
                    ? 'كافة العقود مسجلة وموثقة رسمياً، ويتم تسليم صك الملكية الحر المباشر، مع إشراف هيئة الرقابة الشرعية.'
                    : language === 'so'
                    ? 'Dhammaan heshiisyadu waa kuwo sharci ah oo sugan. Waxaad helaysaa mulkiyad buuxda oo diiwaangashan adigoo bixinaya qayb bille ah oo xasiloon.'
                    : 'All contracts are registered and authenticated. You obtain complete registered freehold ownership with stable, zero-riba monthly installments.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-[10px] font-bold bg-white text-[#35322E] px-3 py-1.5 rounded-full border border-[#E5E2DA]">
                Dara Salaam Bank Approved
              </span>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-white px-6 py-4 border-t border-[#E5E2DA] flex items-center justify-between text-xs text-[#8C867D]">
          <span>© Kaabsan Real Estate • Telesom Group</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#F4F1EA] hover:bg-[#EAE6DE] text-[#35322E] font-bold rounded-xl transition-colors cursor-pointer"
          >
            {language === 'ar' ? 'إغلاق' : language === 'so' ? 'Xidh' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
