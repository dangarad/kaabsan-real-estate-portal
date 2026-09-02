import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  CreditCard, 
  CheckCircle2, 
  Copy, 
  Phone, 
  ArrowRight, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Wallet,
  Check,
  Info,
  Layers,
  Smartphone
} from 'lucide-react';
import { PaymentMethod, PaymentSubmission } from '../types';
import { useTranslation } from '../context/LanguageContext';
import { saveLeadToFirestore } from '../lib/firebase';

interface DirectPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPropertyTitle?: string;
  onPaymentSuccess?: (submission: PaymentSubmission) => void;
}

interface ProjectAccountConfig {
  id: string;
  name: string;
  subTitle: string;
  darasalaamAccount: string;
  badge: string;
  color: string;
}

const PROJECT_LIST: ProjectAccountConfig[] = [
  {
    id: 'masalaha',
    name: 'Masallaha Apartments',
    subTitle: 'Masallaha Luxury Apartments & Penthouses',
    darasalaamAccount: '64713269',
    badge: 'Airport Corridor',
    color: 'from-amber-600 to-amber-700'
  },
  {
    id: 'aragsan',
    name: 'Aragsan Village',
    subTitle: 'Buurta Kala-jeexan, Jigjiga Yar Luxury Villas',
    darasalaamAccount: '61043988',
    badge: 'Jigjiga Yar Hillside',
    color: 'from-emerald-700 to-emerald-800'
  },
  {
    id: 'rugsan',
    name: 'Rugsan Gardens',
    subTitle: 'Masallaha Master Planned Executive Townhouses',
    darasalaamAccount: '61131900',
    badge: 'Masallaha Gated',
    color: 'from-stone-700 to-stone-900'
  },
  {
    id: 'bilicsan',
    name: 'Bilicsan Village',
    subTitle: '16 Luxury Standalone Villas Community',
    darasalaamAccount: '61043977',
    badge: 'Luxury Villas',
    color: 'from-indigo-800 to-indigo-950'
  },
  {
    id: 'general',
    name: 'Mashaariicda Guud / General Booking',
    subTitle: 'Dhul, Qorshayaal Cusub & Adeegyo Kale',
    darasalaamAccount: '61131900',
    badge: 'General Corporate',
    color: 'from-neutral-800 to-neutral-900'
  }
];

export const DirectPaymentModal: React.FC<DirectPaymentModalProps> = ({
  isOpen,
  onClose,
  selectedPropertyTitle = 'Rugsan Gardens Executive Townhouse',
  onPaymentSuccess
}) => {
  const { language, t } = useTranslation();

  // Detect project based on selectedPropertyTitle
  const initialProjectId = useMemo(() => {
    const title = (selectedPropertyTitle || '').toLowerCase();
    if (title.includes('masallaha') || title.includes('masalaha')) return 'masalaha';
    if (title.includes('aragsan')) return 'aragsan';
    if (title.includes('rugsan')) return 'rugsan';
    if (title.includes('bilicsan')) return 'bilicsan';
    return 'rugsan';
  }, [selectedPropertyTitle]);

  const [selectedProjectId, setSelectedProjectId] = useState<string>(initialProjectId);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('darasalaam');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Form inputs
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [amount, setAmount] = useState('5000');
  const [transactionRef, setTransactionRef] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const currentProject = PROJECT_LIST.find(p => p.id === selectedProjectId) || PROJECT_LIST[0];

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const getMethodAccountDetails = () => {
    switch (selectedMethod) {
      case 'darasalaam':
        return {
          bankName: 'Dara-Salaam Bank (DSB)',
          accountNumber: currentProject.darasalaamAccount,
          accountType: `Mashruuca ${currentProject.name} (Project Specific Account)`,
          isProjectSpecific: true
        };
      case 'dahabshiil':
        return {
          bankName: 'Dahabshiil Bank International (DIB)',
          accountNumber: '208016005002',
          accountType: 'General Bank Account (Akoon Guud)',
          isProjectSpecific: false
        };
      case 'premier':
        return {
          bankName: 'Premier Bank Somalia / Somaliland',
          accountNumber: '100603115002',
          accountType: 'General Bank Account (Akoon Guud)',
          isProjectSpecific: false
        };
      case 'zaad':
        return {
          bankName: 'ZAAD Merchant Service (Telesom)',
          accountNumber: '444457',
          accountType: 'Ku-Iibso Code (Merchant)',
          isProjectSpecific: false
        };
      case 'edahab':
        return {
          bankName: 'e-Dahab Merchant Service (Somtel / Dahabshiil)',
          accountNumber: '735777',
          accountType: 'Ku-Iibso Code (Merchant)',
          isProjectSpecific: false
        };
      default:
        return {
          bankName: 'Dara-Salaam Bank',
          accountNumber: currentProject.darasalaamAccount,
          accountType: 'Project Account',
          isProjectSpecific: true
        };
    }
  };

  const currentAccountDetails = getMethodAccountDetails();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !transactionRef) return;

    setIsSubmitting(true);
    
    const propTitle = `${currentProject.name} (${currentAccountDetails.bankName}: ${currentAccountDetails.accountNumber})`;

    const newSubmission: PaymentSubmission = {
      id: `PAY-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail.trim() || undefined,
      propertyTitle: propTitle,
      paymentMethod: selectedMethod,
      amount: Number(amount) || 0,
      transactionRef: transactionRef.trim(),
      notes: notes.trim() ? `${notes.trim()} [Project: ${currentProject.name}]` : `Project: ${currentProject.name}`,
      date: new Date().toLocaleString(),
      status: 'Pending Verification'
    };

    // 1. Save to Firebase Firestore Cloud Database
    try {
      await saveLeadToFirestore({
        fullName: customerName.trim(),
        phone: customerPhone.trim(),
        email: customerEmail.trim() || undefined,
        propertyTitle: currentProject.name,
        type: 'purchase',
        financingPlan: `${currentAccountDetails.bankName} (Acc: ${currentAccountDetails.accountNumber}) | Ref: ${transactionRef.trim()} ($${amount})`,
        message: `Lacag Bixin: $${amount} | Mashruuca: ${currentProject.name} | Habka: ${currentAccountDetails.bankName} (${currentAccountDetails.accountNumber}) | Ref: ${transactionRef.trim()}${notes ? ' | Qoraal: ' + notes : ''}`,
        status: 'new',
        createdAt: new Date().toISOString()
      });
    } catch (err) {
      console.warn('Firebase lead creation err:', err);
    }

    try {
      const existing = localStorage.getItem('kaabsan_payment_submissions');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(newSubmission);
      localStorage.setItem('kaabsan_payment_submissions', JSON.stringify(list));
    } catch {
      // ignore
    }

    if (onPaymentSuccess) {
      onPaymentSuccess(newSubmission);
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setTransactionRef('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#E5E2DA] overflow-hidden my-6">
        
        {/* Modal Header */}
        <div className="bg-[#1A1815] text-white p-5 sm:p-6 flex items-center justify-between border-b border-[#2E2B26] relative">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-[#C2A55D]/20 text-[#D8C28A] text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5 border border-[#C2A55D]/30">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C2A55D]" /> 
                {t.verifiedAccountsBadge}
              </span>
              <span className="text-[11px] text-[#A69F92]">Telesom Group</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif-luxury font-bold text-white">
              {t.directPaymentTitle}
            </h2>
            <p className="text-xs text-[#B8B2A7] leading-relaxed max-w-xl">
              {t.directPaymentDesc}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer flex-shrink-0 ml-3"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 max-h-[82vh] overflow-y-auto space-y-6">
          {isSubmitted ? (
            <div className="text-center py-8 px-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto mb-4 border border-emerald-500/30 shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif-luxury font-bold text-[#1A1A1A] mb-2">
                {language === 'ar' 
                  ? 'شكراً لك! تم استلام بيانات الدفع' 
                  : language === 'so' 
                  ? 'Mahadsanid! Dalabkaaga Lacag-bixinta waa la helay' 
                  : 'Thank You! Payment Details Submitted'}
              </h3>
              <p className="text-[#6B665E] max-w-lg mx-auto text-xs sm:text-sm leading-relaxed mb-6">
                Macluumaadka xawaaladdaada ee <strong>${Number(amount).toLocaleString()} USD</strong> ee mashruuca <strong>{currentProject.name}</strong> waxaa si toos ah loogu gudbiyay xafiiska xisaabaadka ee <strong>Kaabsan Real Estate</strong>.
              </p>

              <div className="bg-[#FAF9F6] border border-[#E5E2DA] rounded-2xl p-4 sm:p-5 max-w-md mx-auto text-left mb-6 text-xs space-y-2 text-[#4A4742] shadow-xs">
                <div className="flex justify-between items-center py-1 border-b border-[#EAE6DE]">
                  <span className="text-[#8C867A]">Mashruuca (Project):</span>
                  <span className="font-bold text-[#1A1A1A]">{currentProject.name}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#EAE6DE]">
                  <span className="text-[#8C867A]">Macaamiilka:</span>
                  <span className="font-semibold text-[#1A1A1A]">{customerName}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#EAE6DE]">
                  <span className="text-[#8C867A]">Bangiga / Habka:</span>
                  <span className="font-semibold text-[#1A1A1A]">{currentAccountDetails.bankName}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#EAE6DE]">
                  <span className="text-[#8C867A]">Akoonka Loo Diray:</span>
                  <span className="font-mono font-bold text-[#C2A55D]">{currentAccountDetails.accountNumber}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#EAE6DE]">
                  <span className="text-[#8C867A]">Qadarka:</span>
                  <span className="font-bold text-emerald-700 text-sm">${Number(amount).toLocaleString()} USD</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#8C867A]">Reference No / ID:</span>
                  <span className="font-mono font-bold text-[#1A1A1A] bg-white px-2 py-0.5 rounded border border-[#E5E2DA]">{transactionRef}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-3 bg-[#F4F1EA] hover:bg-[#EAE6DE] text-[#35322E] rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Xidh Daaqadda (Close)
                </button>
                <a
                  href={`https://wa.me/252636100090?text=${encodeURIComponent(`Kaabsan Real Estate Official Payment Notification:\nAsc Kaabsan Real Estate, waxaan xawilay lacag:\n• Mashruuca: ${currentProject.name}\n• Magaca: ${customerName}\n• Taleefanka: ${customerPhone}\n• Qadarka: $${amount} USD\n• Bangiga: ${currentAccountDetails.bankName}\n• Akoonka loo diray: ${currentAccountDetails.accountNumber}\n• Ref/Code: ${transactionRef}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 py-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4" /> 
                  U Dir Rasiidhka WhatsApp (+252 63 6100090)
                </a>
              </div>
            </div>
          ) : (
            <>
              {/* STEP 1: SELECT THE PROJECT FIRST */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#35322E] flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#C2A55D] text-neutral-950 font-bold text-[11px] flex items-center justify-center">1</span>
                    {t.stepSelectProject}
                  </label>
                  <span className="text-[11px] text-[#8C867A] hidden sm:inline">{t.projectAccountBadge}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {PROJECT_LIST.map((proj) => {
                    const isSelected = selectedProjectId === proj.id;
                    return (
                      <button
                        key={proj.id}
                        type="button"
                        onClick={() => setSelectedProjectId(proj.id)}
                        className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden cursor-pointer ${
                          isSelected
                            ? 'border-[#C2A55D] bg-[#FCFBF7] shadow-sm ring-2 ring-[#C2A55D]/30'
                            : 'border-[#E5E2DA] bg-white hover:border-[#C2A55D]/60 hover:bg-[#FAF9F6]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            isSelected ? 'bg-[#C2A55D] text-neutral-950' : 'bg-[#F4F1EA] text-[#6B665E]'
                          }`}>
                            {proj.badge}
                          </span>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-[#C2A55D]" />
                          )}
                        </div>
                        <h4 className="font-bold text-xs text-[#1A1A1A] leading-snug line-clamp-1">{proj.name}</h4>
                        <div className="mt-1 flex items-center gap-1 text-[10px] text-[#8C867A]">
                          <span>DSB:</span>
                          <span className="font-mono font-bold text-[#35322E]">{proj.darasalaamAccount}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP 2: SELECT PAYMENT METHOD / BANK */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#35322E] flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#C2A55D] text-neutral-950 font-bold text-[11px] flex items-center justify-center">2</span>
                    {t.stepSelectBank}
                  </label>
                  <span className="text-[11px] text-[#C2A55D] font-bold">DSB | DIB | PB | ZAAD | e-Dahab</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {/* Dara-Salaam Bank */}
                  <button
                    type="button"
                    onClick={() => setSelectedMethod('darasalaam')}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      selectedMethod === 'darasalaam'
                        ? 'border-[#C2A55D] bg-[#FCFBF7] shadow-sm ring-2 ring-[#C2A55D]/40'
                        : 'border-[#E5E2DA] bg-white hover:border-[#C2A55D]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-7 h-7 rounded-xl bg-[#C2A55D]/20 text-[#8C733E] flex items-center justify-center font-bold text-xs">
                        DSB
                      </span>
                      {selectedMethod === 'darasalaam' && (
                        <CheckCircle2 className="w-4 h-4 text-[#C2A55D]" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <p className="font-bold text-xs text-[#1A1A1A]">Dara-Salaam</p>
                      </div>
                      <p className="text-[10px] text-[#C2A55D] font-bold">Mashruuca Account</p>
                    </div>
                  </button>

                  {/* Dahabshiil Bank (General Account) */}
                  <button
                    type="button"
                    onClick={() => setSelectedMethod('dahabshiil')}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      selectedMethod === 'dahabshiil'
                        ? 'border-[#D97706] bg-[#FFFBEB] shadow-sm ring-2 ring-[#D97706]/40'
                        : 'border-[#E5E2DA] bg-white hover:border-[#C2A55D]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-7 h-7 rounded-xl bg-[#D97706]/15 text-[#D97706] flex items-center justify-center font-bold text-xs">
                        DIB
                      </span>
                      {selectedMethod === 'dahabshiil' && (
                        <CheckCircle2 className="w-4 h-4 text-[#D97706]" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-xs text-[#1A1A1A]">Dahabshiil Bank</p>
                      <p className="text-[10px] text-amber-700 font-semibold">General Account</p>
                    </div>
                  </button>

                  {/* Premier Bank (General Account) */}
                  <button
                    type="button"
                    onClick={() => setSelectedMethod('premier')}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      selectedMethod === 'premier'
                        ? 'border-[#006699] bg-[#F0F7FB] shadow-sm ring-2 ring-[#006699]/40'
                        : 'border-[#E5E2DA] bg-white hover:border-[#C2A55D]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-7 h-7 rounded-xl bg-[#006699]/15 text-[#006699] flex items-center justify-center font-bold text-xs">
                        PB
                      </span>
                      {selectedMethod === 'premier' && (
                        <CheckCircle2 className="w-4 h-4 text-[#006699]" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-xs text-[#1A1A1A]">Premier Bank</p>
                      <p className="text-[10px] text-[#006699] font-semibold">General Account</p>
                    </div>
                  </button>

                  {/* ZAAD Merchant */}
                  <button
                    type="button"
                    onClick={() => setSelectedMethod('zaad')}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      selectedMethod === 'zaad'
                        ? 'border-[#25D366] bg-[#F0FDF4] shadow-sm ring-2 ring-[#25D366]/40'
                        : 'border-[#E5E2DA] bg-white hover:border-[#C2A55D]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-7 h-7 rounded-xl bg-[#25D366]/15 text-[#128C7E] flex items-center justify-center font-bold text-xs">
                        ZD
                      </span>
                      {selectedMethod === 'zaad' && (
                        <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-xs text-[#1A1A1A]">ZAAD (Ku-Iibso)</p>
                      <p className="text-[10px] text-emerald-700 font-semibold">Code: 444457</p>
                    </div>
                  </button>

                  {/* E-Dahab Merchant */}
                  <button
                    type="button"
                    onClick={() => setSelectedMethod('edahab')}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      selectedMethod === 'edahab'
                        ? 'border-[#EA580C] bg-[#FFF7ED] shadow-sm ring-2 ring-[#EA580C]/40'
                        : 'border-[#E5E2DA] bg-white hover:border-[#C2A55D]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-7 h-7 rounded-xl bg-[#EA580C]/15 text-[#EA580C] flex items-center justify-center font-bold text-xs">
                        ED
                      </span>
                      {selectedMethod === 'edahab' && (
                        <CheckCircle2 className="w-4 h-4 text-[#EA580C]" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-xs text-[#1A1A1A]">E-Dahab</p>
                      <p className="text-[10px] text-orange-700 font-semibold">Code: 735777</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* DYNAMIC ACCOUNT DISPLAY CARD */}
              <div className="bg-[#FAF9F6] border border-[#E5E2DA] rounded-3xl p-5 sm:p-6 space-y-4 shadow-xs relative overflow-hidden">
                
                {/* Method 1: Dara-Salaam Bank (Project-Specific) */}
                {selectedMethod === 'darasalaam' && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="flex items-start justify-between pb-3 border-b border-[#E5E2DA] flex-wrap gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-[#C2A55D]/20 text-[#8C733E] text-[10px] font-bold uppercase tracking-wider">
                            Mashruuca {currentProject.name}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            Direct Project Account
                          </span>
                        </div>
                        <h4 className="text-base sm:text-lg font-serif-luxury font-bold text-[#1A1A1A] mt-1">
                          Dara-Salaam Bank — {currentProject.name}
                        </h4>
                        <p className="text-xs text-[#6B665E]">
                          Akoonkan rasmiga ah waxaa toos loogu talagalay lacagaha mashruuca <strong>{currentProject.name}</strong>.
                        </p>
                      </div>

                      <span className="px-3 py-1 rounded-xl bg-[#35322E] text-white text-xs font-mono font-bold">
                        USD / SLSH
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Account Number Box */}
                      <div className="p-4 bg-white rounded-2xl border-2 border-[#C2A55D]/40 flex items-center justify-between shadow-xs">
                        <div>
                          <p className="text-[10px] text-[#8C867A] uppercase font-bold tracking-wider">
                            Account Number ({currentProject.name}):
                          </p>
                          <p className="text-xl font-mono font-bold text-[#1A1A1A] tracking-wider mt-0.5">
                            {currentProject.darasalaamAccount}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(currentProject.darasalaamAccount, `dsb_${currentProject.id}`)}
                          className="px-3 py-2 text-xs bg-[#C2A55D] hover:bg-[#B3954C] text-neutral-950 rounded-xl flex items-center gap-1.5 font-bold transition-all shadow-xs cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" /> 
                          {copiedKey === `dsb_${currentProject.id}` ? 'Waa La Koobiyay!' : 'Koobi (Copy)'}
                        </button>
                      </div>

                      {/* Account Name */}
                      <div className="p-4 bg-white rounded-2xl border border-[#E5E2DA] flex flex-col justify-center">
                        <p className="text-[10px] text-[#8C867A] uppercase font-bold tracking-wider">Magaca Akoonka (Account Name):</p>
                        <p className="text-sm font-bold text-[#1A1A1A] mt-0.5">Kaabsan Real Estate</p>
                        <p className="text-[11px] text-[#6B665E] font-mono">Dara-Salaam Bank Somaliland</p>
                      </div>
                    </div>

                    <div className="bg-[#F4F1EA] p-3.5 rounded-2xl border border-[#E5E2DA] flex items-start gap-2.5 text-xs text-[#4A4742]">
                      <Info className="w-4 h-4 text-[#C2A55D] flex-shrink-0 mt-0.5" />
                      <p className="leading-relaxed">
                        Waxaad xawaaladda ka soo diri kartaa <strong>laamaha Dara-Salaam Bank</strong>, <strong>DSB Mobile Banking App</strong>, ama qadka tooska ah ee xisaabaadka.
                      </p>
                    </div>
                  </div>
                )}

                {/* Method 2: Dahabshiil Bank (General Account) */}
                {selectedMethod === 'dahabshiil' && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="flex items-start justify-between pb-3 border-b border-[#E5E2DA] flex-wrap gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-900 text-[10px] font-bold uppercase tracking-wider">
                            General Bank Account (Akoon Guud)
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold">
                            All Projects
                          </span>
                        </div>
                        <h4 className="text-base sm:text-lg font-serif-luxury font-bold text-[#1A1A1A] mt-1">
                          Dahabshiil Bank International — General Corporate Account
                        </h4>
                        <p className="text-xs text-[#6B665E]">
                          Akoonkan guud waxaa loogu talagalay macaamiisha doonaysa inay <strong>Dahabshiil Bank</strong> lacagta kaga soo shubaan mashruuc kasta (Masallaha, Aragsan, Rugsan ama Bilicsan).
                        </p>
                      </div>

                      <span className="px-3 py-1 rounded-xl bg-amber-600 text-white text-xs font-mono font-bold">
                        DIB USD
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Account Box */}
                      <div className="p-4 bg-white rounded-2xl border-2 border-amber-400/50 flex items-center justify-between shadow-xs">
                        <div>
                          <p className="text-[10px] text-[#8C867A] uppercase font-bold tracking-wider">Dahabshiil Account Number:</p>
                          <p className="text-xl font-mono font-bold text-[#1A1A1A] tracking-wider mt-0.5">
                            208016005002
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('208016005002', 'dahabshiil_acc')}
                          className="px-3 py-2 text-xs bg-amber-500 hover:bg-amber-600 text-white rounded-xl flex items-center gap-1.5 font-bold transition-all shadow-xs cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" /> 
                          {copiedKey === 'dahabshiil_acc' ? 'Waa La Koobiyay!' : 'Koobi (Copy)'}
                        </button>
                      </div>

                      {/* Account Name */}
                      <div className="p-4 bg-white rounded-2xl border border-[#E5E2DA] flex flex-col justify-center">
                        <p className="text-[10px] text-[#8C867A] uppercase font-bold tracking-wider">Magaca Akoonka (Account Name):</p>
                        <p className="text-sm font-bold text-[#1A1A1A] mt-0.5">Kaabsan Real Estate</p>
                        <p className="text-[11px] text-[#6B665E]">Dahabshiil Islamic Bank (DIB)</p>
                      </div>
                    </div>

                    <div className="bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-900">
                      <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="leading-relaxed">
                        Haddii aadan lahayn Dara-Salaam Bank ama lacagtaadu kuugu jirto <strong>Dahabshiil Bank</strong>, toos ugu soo dir akoonkan guud <strong>(208016005002)</strong>, kadibna hoos geli Reference Number-kaaga si aan ugu diiwaangelino mashruuca <strong>{currentProject.name}</strong>.
                      </p>
                    </div>
                  </div>
                )}

                {/* Method 3: Premier Bank (General Account) */}
                {selectedMethod === 'premier' && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="flex items-start justify-between pb-3 border-b border-[#E5E2DA] flex-wrap gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-900 text-[10px] font-bold uppercase tracking-wider">
                            General Bank Account (Akoon Guud)
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] font-bold">
                            All Projects
                          </span>
                        </div>
                        <h4 className="text-base sm:text-lg font-serif-luxury font-bold text-[#1A1A1A] mt-1">
                          Premier Bank — General Corporate Account
                        </h4>
                        <p className="text-xs text-[#6B665E]">
                          Akoonkan guud ee Premier Bank waxaa isticmaali kara macaamiisha dalka gudihiisa iyo qurbajoogta doonaya inay lacagta mashruuc kasta ku bixiyaan <strong>Premier Bank</strong>.
                        </p>
                      </div>

                      <span className="px-3 py-1 rounded-xl bg-[#006699] text-white text-xs font-mono font-bold">
                        PB USD
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Account Box */}
                      <div className="p-4 bg-white rounded-2xl border-2 border-[#006699]/40 flex items-center justify-between shadow-xs">
                        <div>
                          <p className="text-[10px] text-[#8C867A] uppercase font-bold tracking-wider">Premier Bank Account Number:</p>
                          <p className="text-xl font-mono font-bold text-[#1A1A1A] tracking-wider mt-0.5">
                            100603115002
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('100603115002', 'premier_acc')}
                          className="px-3 py-2 text-xs bg-[#006699] hover:bg-[#005580] text-white rounded-xl flex items-center gap-1.5 font-bold transition-all shadow-xs cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" /> 
                          {copiedKey === 'premier_acc' ? 'Waa La Koobiyay!' : 'Koobi (Copy)'}
                        </button>
                      </div>

                      {/* Account Name */}
                      <div className="p-4 bg-white rounded-2xl border border-[#E5E2DA] flex flex-col justify-center">
                        <p className="text-[10px] text-[#8C867A] uppercase font-bold tracking-wider">Magaca Akoonka (Account Name):</p>
                        <p className="text-sm font-bold text-[#1A1A1A] mt-0.5">Kaabsan Real Estate</p>
                        <p className="text-[11px] text-[#6B665E]">Premier Bank Somaliland / Somalia</p>
                      </div>
                    </div>

                    <div className="bg-blue-50/70 p-3.5 rounded-2xl border border-blue-200/80 flex items-start gap-2.5 text-xs text-blue-900">
                      <Info className="w-4 h-4 text-[#006699] flex-shrink-0 mt-0.5" />
                      <p className="leading-relaxed">
                        Haddii lacagtu kuugu jirto <strong>Premier Bank</strong> ama aad ka soo xawilayso dibadda, toos ugu soo dir akoonkan <strong>(100603115002)</strong>, waxaana lagu diiwaangelinayaa mashruuca <strong>{currentProject.name}</strong>.
                      </p>
                    </div>
                  </div>
                )}

                {/* Method 4: ZAAD Ku-Iibso */}
                {selectedMethod === 'zaad' && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="flex items-start justify-between pb-3 border-b border-[#E5E2DA] flex-wrap gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-900 text-[10px] font-bold uppercase tracking-wider">
                            Telesom Zaad Service
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            Ku-Iibso Merchant
                          </span>
                        </div>
                        <h4 className="text-base sm:text-lg font-serif-luxury font-bold text-[#1A1A1A] mt-1">
                          ZAAD (Ku-Iibso) — Kaabsan Real Estate
                        </h4>
                        <p className="text-xs text-[#6B665E]">
                          Ku bixi si toos ah oo degdeg ah adeegga Ku-Iibso ee Zaad (Telesom).
                        </p>
                      </div>

                      <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white text-xs font-mono font-bold">
                        *212#
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Ku-Iibso Box */}
                      <div className="p-4 bg-white rounded-2xl border-2 border-emerald-400/50 flex items-center justify-between shadow-xs">
                        <div>
                          <p className="text-[10px] text-[#8C867A] uppercase font-bold tracking-wider">Zaad Ku-Iibso Number:</p>
                          <p className="text-2xl font-mono font-bold text-emerald-800 tracking-wider mt-0.5">
                            444457
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('444457', 'zaad_merchant')}
                          className="px-3 py-2 text-xs bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl flex items-center gap-1.5 font-bold transition-all shadow-xs cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" /> 
                          {copiedKey === 'zaad_merchant' ? 'Waa La Koobiyay!' : 'Koobi (Copy)'}
                        </button>
                      </div>

                      {/* Account Name */}
                      <div className="p-4 bg-white rounded-2xl border border-[#E5E2DA] flex flex-col justify-center">
                        <p className="text-[10px] text-[#8C867A] uppercase font-bold tracking-wider">Magaca Ganacsiga (Merchant Name):</p>
                        <p className="text-sm font-bold text-[#1A1A1A] mt-0.5">Kaabsan Real Estate</p>
                        <p className="text-[11px] text-emerald-700 font-mono">Telesom Zaad Official Merchant</p>
                      </div>
                    </div>

                    <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200/80 text-xs text-emerald-950 space-y-1">
                      <p className="font-bold flex items-center gap-1.5">
                        <Smartphone className="w-4 h-4 text-emerald-700" /> 
                        Tallaabada Bixinta (USSD Shortcut):
                      </p>
                      <p className="text-[11px] text-[#4A4742] leading-relaxed">
                        Gali teleefankaaga: <code className="bg-white px-2 py-0.5 rounded border border-emerald-300 font-mono font-bold text-emerald-800">*212*1*444457*QADARKA#</code> ama adeegso <strong>Zaad App &gt; Ku-Iibso &gt; 444457</strong>.
                      </p>
                    </div>
                  </div>
                )}

                {/* Method 5: E-Dahab Ku-Iibso */}
                {selectedMethod === 'edahab' && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="flex items-start justify-between pb-3 border-b border-[#E5E2DA] flex-wrap gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-900 text-[10px] font-bold uppercase tracking-wider">
                            Somtel / Dahabshiil
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-orange-100 text-orange-800 text-[10px] font-bold">
                            Ku-Iibso Merchant
                          </span>
                        </div>
                        <h4 className="text-base sm:text-lg font-serif-luxury font-bold text-[#1A1A1A] mt-1">
                          E-Dahab (Ku-Iibso) — Kaabsan Real Estate
                        </h4>
                        <p className="text-xs text-[#6B665E]">
                          Ku bixi si toos ah oo fudud adeegga Ku-Iibso ee E-Dahab.
                        </p>
                      </div>

                      <span className="px-3 py-1 rounded-xl bg-orange-600 text-white text-xs font-mono font-bold">
                        *770# / *789#
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Ku-Iibso Box */}
                      <div className="p-4 bg-white rounded-2xl border-2 border-orange-400/50 flex items-center justify-between shadow-xs">
                        <div>
                          <p className="text-[10px] text-[#8C867A] uppercase font-bold tracking-wider">E-Dahab Ku-Iibso Number:</p>
                          <p className="text-2xl font-mono font-bold text-orange-800 tracking-wider mt-0.5">
                            735777
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('735777', 'edahab_merchant')}
                          className="px-3 py-2 text-xs bg-orange-600 hover:bg-orange-700 text-white rounded-xl flex items-center gap-1.5 font-bold transition-all shadow-xs cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" /> 
                          {copiedKey === 'edahab_merchant' ? 'Waa La Koobiyay!' : 'Koobi (Copy)'}
                        </button>
                      </div>

                      {/* Account Name */}
                      <div className="p-4 bg-white rounded-2xl border border-[#E5E2DA] flex flex-col justify-center">
                        <p className="text-[10px] text-[#8C867A] uppercase font-bold tracking-wider">Magaca Ganacsiga (Merchant Name):</p>
                        <p className="text-sm font-bold text-[#1A1A1A] mt-0.5">Kaabsan Real Estate</p>
                        <p className="text-[11px] text-orange-700 font-mono">eDahab Official Merchant</p>
                      </div>
                    </div>

                    <div className="bg-orange-50/70 p-3.5 rounded-2xl border border-orange-200/80 text-xs text-orange-950 space-y-1">
                      <p className="font-bold flex items-center gap-1.5">
                        <Smartphone className="w-4 h-4 text-orange-700" /> 
                        Tallaabada Bixinta:
                      </p>
                      <p className="text-[11px] text-[#4A4742] leading-relaxed">
                        Gali teleefankaaga: <code className="bg-white px-2 py-0.5 rounded border border-orange-300 font-mono font-bold text-orange-800">*770*1*735777*QADARKA#</code> ama adeegso <strong>eDahab App &gt; Ku-Iibso &gt; 735777</strong>.
                      </p>
                    </div>
                  </div>
                )}

              </div>

              {/* STEP 3: SUBMIT PAYMENT PROOF FORM */}
              <form onSubmit={handleSubmit} className="space-y-4 pt-2 border-t border-[#E5E2DA]">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#35322E] flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#C2A55D] text-neutral-950 font-bold text-[11px] flex items-center justify-center">3</span>
                    {t.stepSubmitProof}
                  </label>
                  <span className="text-[11px] text-amber-800 font-semibold">* Required</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-[#4A4742] mb-1">
                      {t.labelFullName} *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder={t.placeholderFullName}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D8D3C8] rounded-xl text-xs sm:text-sm text-[#1A1A1A] focus:outline-none focus:border-[#C2A55D] focus:ring-1 focus:ring-[#C2A55D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4A4742] mb-1">
                      {t.labelPhone} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder={t.placeholderPhone}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D8D3C8] rounded-xl text-xs sm:text-sm text-[#1A1A1A] focus:outline-none focus:border-[#C2A55D] focus:ring-1 focus:ring-[#C2A55D]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-[#4A4742] mb-1">
                      Project
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={currentProject.name}
                      className="w-full px-3.5 py-2.5 bg-[#F4F1EA] border border-[#D8D3C8] rounded-xl text-xs sm:text-sm font-bold text-[#1A1A1A] cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4A4742] mb-1">
                      {t.labelAmount} ($ USD) *
                    </label>
                    <input
                      type="number"
                      required
                      min="10"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D8D3C8] rounded-xl text-xs sm:text-sm font-bold text-[#1A1A1A] focus:outline-none focus:border-[#C2A55D] focus:ring-1 focus:ring-[#C2A55D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4A4742] mb-1">
                      {t.labelReference} *
                    </label>
                    <input
                      type="text"
                      required
                      value={transactionRef}
                      onChange={(e) => setTransactionRef(e.target.value)}
                      placeholder={t.placeholderReference}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D8D3C8] rounded-xl text-xs sm:text-sm font-mono font-bold text-[#1A1A1A] focus:outline-none focus:border-[#C2A55D] focus:ring-1 focus:ring-[#C2A55D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A4742] mb-1">
                    {t.labelNotes}
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={t.placeholderNotes}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D8D3C8] rounded-xl text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C2A55D]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#1A1815] hover:bg-[#35322E] text-white rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      {t.btnSubmitting}
                    </span>
                  ) : (
                    <>
                      <span>{t.btnSubmitPayment} ({currentProject.name} — ${Number(amount).toLocaleString()} USD)</span>
                      <ArrowRight className="w-4 h-4 text-[#C2A55D]" />
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
