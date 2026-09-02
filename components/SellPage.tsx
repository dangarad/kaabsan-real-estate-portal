import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Building2, 
  MapPin, 
  DollarSign, 
  ShieldCheck, 
  Sparkles, 
  Upload, 
  Check, 
  Calendar, 
  Phone, 
  MessageCircle, 
  TrendingUp, 
  Users, 
  Award, 
  CheckCircle2, 
  Clock, 
  HelpCircle,
  FileText,
  Calculator
} from 'lucide-react';
import { LeadInquiry } from '../types';

interface SellPageProps {
  onBack: () => void;
  onOpenContact: (msg?: string) => void;
  onOpenAIAdvisor: (query?: string) => void;
}

export const SellPage: React.FC<SellPageProps> = ({
  onBack,
  onOpenContact,
  onOpenAIAdvisor
}) => {
  // Valuation State
  const [district, setDistrict] = useState('Masalaha');
  const [propertyType, setPropertyType] = useState('Villa');
  const [sqmSize, setSqmSize] = useState(450);
  const [bedrooms, setBedrooms] = useState(5);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  // Listing Submission Form State
  const [sellerName, setSellerName] = useState('');
  const [sellerPhone, setSellerPhone] = useState('');
  const [sellerEmail, setSellerEmail] = useState('');
  const [sellerLocation, setSellerLocation] = useState('Hargeisa, Somaliland');
  const [listingTitle, setListingTitle] = useState('');
  const [listingDistrict, setListingDistrict] = useState('Masalaha');
  const [listingType, setListingType] = useState('Villa');
  const [listingSqm, setListingSqm] = useState('');
  const [listingAskingPrice, setListingAskingPrice] = useState('');
  const [listingBeds, setListingBeds] = useState('4');
  const [listingDescription, setListingDescription] = useState('');
  const [uploadedImagePreview, setUploadedImagePreview] = useState('');
  const [hasLegalDeed, setHasLegalDeed] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const calculateEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    let baseRate = 600; // per sqm
    if (district === 'Masalaha') baseRate = 720;
    else if (district === 'Buurta Kala-jeexan' || district === 'Jigjiga Yar') baseRate = 680;
    else if (district === 'Shacabka') baseRate = 750;
    else if (district === 'Airport Road') baseRate = 700;

    let typeMultiplier = 1.0;
    if (propertyType === 'Luxury Villa (G+1)') typeMultiplier = 1.35;
    else if (propertyType === 'Apartment Suite') typeMultiplier = 0.95;
    else if (propertyType === 'Commercial Plot') typeMultiplier = 1.4;

    const total = Math.round(sqmSize * baseRate * typeMultiplier);
    setEstimatedPrice(total);
  };

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) setUploadedImagePreview(reader.result.toString());
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sellerName || !sellerPhone || !listingTitle) return;

    const newLead: LeadInquiry = {
      id: `sell-lead-${Date.now()}`,
      name: sellerName,
      email: sellerEmail || 'seller@client.com',
      phone: sellerPhone,
      type: 'Property Inquiry',
      propertyName: `${listingTitle} (${listingDistrict} - $${listingAskingPrice})`,
      message: `Codsiga Iibka Guriga: ${listingTitle}. Baaxadda: ${listingSqm} m², Qiimaha: $${listingAskingPrice}. Sharciga Dowladda: ${hasLegalDeed ? 'Waa Haystaa' : 'Waa Lagu Jiraa'}. Faahfaahin: ${listingDescription}`,
      status: 'New',
      timestamp: new Date().toISOString()
    };

    // Save to local storage
    try {
      const existing = localStorage.getItem('kaabsan_leads_v9') || localStorage.getItem('kaabsan_leads_v4');
      const leads = existing ? JSON.parse(existing) : [];
      localStorage.setItem('kaabsan_leads_v9', JSON.stringify([newLead, ...leads]));
    } catch {
      // ignore
    }

    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1A1A1A] pb-24 animate-in fade-in duration-300">
      
      {/* Top Breadcrumb Bar */}
      <div className="bg-[#FFFFFF] border-b border-[#E5E2DA] sticky top-[68px] z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 text-xs text-[#6B665E]">
            <button 
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-[#35322E] hover:text-[#C2A55D] font-bold transition-colors cursor-pointer bg-[#F4F1EA] hover:bg-[#EAE6DE] px-3.5 py-1.5 rounded-xl border border-[#E5E2DA]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Bogga Hore (Home)</span>
            </button>
            <span className="text-[#D8D3C8]">/</span>
            <span className="font-bold text-[#1A1A1A] text-xs sm:text-sm">
              Iibi Gurigaaga ama Dhulkaaga (Sell / List With Us)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:380"
              className="bg-[#F4F1EA] hover:bg-[#EAE6DE] border border-[#E5E2DA] text-[#35322E] px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#C2A55D]" />
              <span>Call 380</span>
            </a>

            <button
              onClick={() => onOpenContact('Waxaan rabaa inaan la hadlo waaxda qiimeynta iyo iibinta guryaha')}
              className="bg-[#35322E] hover:bg-[#1A1815] text-white px-4 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-sm"
            >
              La Tasho Qiimeeyaha
            </button>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-[#24211E] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-[#E5E2DA]">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#C2A55D] bg-black/40 px-3.5 py-1 rounded-full border border-white/10 w-fit">
              <TrendingUp className="w-3.5 h-3.5 text-[#C2A55D]" />
              Iibinta Guryaha & Dhulka • Shabakadda Telesom Group
            </div>
            
            <h1 className="font-serif-luxury text-3xl sm:text-5xl font-normal leading-tight">
              Ku Iibi Gurigaaga Qiimaha Ugu Sarreeya ee Suuqa
            </h1>

            <p className="text-xs sm:text-sm text-[#D8D3C8] font-light leading-relaxed">
              Kaabsan Real Estate waxay toos kuugu xiraysaa kumannaan maalgashadeyaal ah oo jooga qurbaha (UK, USA, Yurub, Khaliijka) iyo muwaadiniinta dalka, iyadoo la hubinayo hufnaan sharci iyo lacag bixin sugan.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                <div className="text-[#C2A55D] font-bold text-xs">Macaamiisha Qurbaha</div>
                <div className="text-[11px] text-[#D8D3C8]">UK, USA, Scandinavia, UAE</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                <div className="text-[#C2A55D] font-bold text-xs">Qiimeyn Sax ah</div>
                <div className="text-[11px] text-[#D8D3C8]">Qiimaha Dhabta ah ee Hargeysa</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 col-span-2 sm:col-span-1">
                <div className="text-[#C2A55D] font-bold text-xs">Hufnaan Sharci</div>
                <div className="text-[11px] text-[#D8D3C8]">Dukumenti Sugan & Telesom</div>
              </div>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-20 bg-cover bg-center pointer-events-none hidden md:block" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80')` }}></div>
        </div>
      </div>

      {/* Grid: 1. Valuation Estimator + 2. Submission Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Instant Valuation Estimator & Why Choose Kaabsan */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick Valuation Tool */}
          <div className="bg-white border border-[#E5E2DA] rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#C2A55D] uppercase tracking-wider">
              <Calculator className="w-4 h-4 text-[#C2A55D]" />
              Xisaabiye Qiimaha Gurigaaga
            </div>

            <h3 className="font-serif-luxury text-xl text-[#1A1A1A]">
              Qiyaas Qiimaha Hantidaadu Ka Joogto Suuqa Hargeysa
            </h3>

            <form onSubmit={calculateEstimate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                  Degmada / Deegaanka
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E5E2DA] text-xs text-[#1A1A1A] bg-[#F9F8F6] focus:outline-none focus:border-[#C2A55D]"
                >
                  <option value="Masalaha">Masalaha (Madaarka Cigaal Agtiisa)</option>
                  <option value="Buurta Kala-jeexan">Buurta Kala-jeexan (Jigjiga Yar)</option>
                  <option value="Jigjiga Yar">Jigjiga Yar Corridor</option>
                  <option value="Shacabka">Shacabka Diplomatic Area</option>
                  <option value="Airport Road">Airport Road Highway</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                    Nooca Dhismaha
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#E5E2DA] text-xs text-[#1A1A1A] bg-[#F9F8F6] focus:outline-none focus:border-[#C2A55D]"
                  >
                    <option value="Luxury Villa (G+1)">Luxury Villa (G+1)</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Apartment Suite">Apartment Suite</option>
                    <option value="Commercial Plot">Dhul Banaan (Plot)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                    Baaxadda (SQM): {sqmSize} m²
                  </label>
                  <input 
                    type="range"
                    min={100}
                    max={1200}
                    step={25}
                    value={sqmSize}
                    onChange={(e) => setSqmSize(Number(e.target.value))}
                    className="w-full mt-2 accent-[#C2A55D]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#35322E] hover:bg-[#1A1815] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Xisaabi Qiyaasta Qiimaha
              </button>
            </form>

            {estimatedPrice !== null && (
              <div className="p-4 rounded-2xl bg-[#F4F1EA] border border-[#C2A55D]/30 text-center space-y-1 animate-in fade-in">
                <div className="text-xs text-[#6B665E]">Qiyaasta Qiimaha Suuqa (Market Estimate):</div>
                <div className="font-serif-luxury text-2xl text-[#C2A55D] font-bold">
                  ${estimatedPrice.toLocaleString()} USD
                </div>
                <div className="text-[11px] text-[#8C867D]">
                  Waxay ku saleysan tahay xogta dhabta ah ee iibka Hargeysa {new Date().getFullYear()}.
                </div>
              </div>
            )}
          </div>

          {/* Benefits Card */}
          <div className="bg-[#24211E] text-white rounded-3xl p-6 sm:p-8 space-y-4">
            <h4 className="font-serif-luxury text-lg text-white">
              Maxaad U Dooranaysaa Kaabsan Real Estate?
            </h4>
            
            <ul className="space-y-3 text-xs text-[#D8D3C8]">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C2A55D] mt-0.5 flex-shrink-0" />
                <span><strong>Isku xirka Qurbajoogta:</strong> Boqolaal iibsadeyaal diyaar ah oo ka kala yimid UK, USA, iyo Yurub.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C2A55D] mt-0.5 flex-shrink-0" />
                <span><strong>Dammaanadda Telesom:</strong> Magac weyn iyo kalsooni buuxda oo dalka iyo dibaddaba laga yaqaan.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C2A55D] mt-0.5 flex-shrink-0" />
                <span><strong>Suuq-geyn Xirfad leh:</strong> Sawirro HD ah, duubis diyaaradeed (Drone), iyo muuqaallo 3D ah.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Right Column: Listing Application Form */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-[#E5E2DA] rounded-3xl p-6 sm:p-10 shadow-xs">
            
            {isSubmitted ? (
              <div className="text-center py-12 space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-serif-luxury text-2xl text-[#1A1A1A]">
                  Waad ku mahadsan tahay, Codsigaagii Waa La Helay!
                </h3>
                <p className="text-xs text-[#6B665E] max-w-md mx-auto leading-relaxed">
                  Kooxda xirfadlayaasha iibka ee Kaabsan Real Estate waxay kula soo xiriiri doonaan 24 saacadood gudahood si loo xaqiijiyo xogta gurigaaga loona bilaabo suuq-geynta rasmiga ah.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 bg-[#35322E] text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Geli Guri Kale
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitListing} className="space-y-6">
                <div>
                  <h3 className="font-serif-luxury text-2xl text-[#1A1A1A]">
                    Foomka Soo Gudbinta Guriga / Dhulka (List Property)
                  </h3>
                  <p className="text-xs text-[#6B665E] font-light mt-1">
                    Fadlan buuxi macluumaadka hoose si khubaradayadu kuugu daraan liiska guryaha rasmiga ah.
                  </p>
                </div>

                {/* Seller Contact Info */}
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-bold text-[#C2A55D] uppercase tracking-wider">
                    1. Xogtaada Qofka Iska Leh (Seller Information)
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">Magacaaga oo Buuxa *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g., Axmed Cali Jaamac"
                        value={sellerName}
                        onChange={(e) => setSellerName(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-[#E5E2DA] text-xs text-[#1A1A1A] bg-[#F9F8F6] focus:outline-none focus:border-[#C2A55D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">Telefoonka / WhatsApp *</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="+252 63... ama +44..."
                        value={sellerPhone}
                        onChange={(e) => setSellerPhone(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-[#E5E2DA] text-xs text-[#1A1A1A] bg-[#F9F8F6] focus:outline-none focus:border-[#C2A55D]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">Email Address</label>
                      <input 
                        type="email"
                        placeholder="email@domain.com"
                        value={sellerEmail}
                        onChange={(e) => setSellerEmail(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-[#E5E2DA] text-xs text-[#1A1A1A] bg-[#F9F8F6] focus:outline-none focus:border-[#C2A55D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">Magaalada aad Hadda Joogto</label>
                      <input 
                        type="text"
                        placeholder="Hargeisa, London, Minneapolis, Dubai..."
                        value={sellerLocation}
                        onChange={(e) => setSellerLocation(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-[#E5E2DA] text-xs text-[#1A1A1A] bg-[#F9F8F6] focus:outline-none focus:border-[#C2A55D]"
                      />
                    </div>
                  </div>
                </div>

                {/* Property Specifics */}
                <div className="space-y-3 pt-4 border-t border-[#F2EFE9]">
                  <div className="text-xs font-bold text-[#C2A55D] uppercase tracking-wider">
                    2. Faahfaahinta Guriga / Dhulka (Property Details)
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">Cinwaanka Guriga / Magaca *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g., Guri Villa G+1 ah oo ku yaalla Masalaha / Jigjiga Yar"
                      value={listingTitle}
                      onChange={(e) => setListingTitle(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#E5E2DA] text-xs text-[#1A1A1A] bg-[#F9F8F6] focus:outline-none focus:border-[#C2A55D]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">Degmada</label>
                      <select
                        value={listingDistrict}
                        onChange={(e) => setListingDistrict(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-[#E5E2DA] text-xs text-[#1A1A1A] bg-[#F9F8F6] focus:outline-none focus:border-[#C2A55D]"
                      >
                        <option value="Masalaha">Masalaha</option>
                        <option value="Jigjiga Yar">Jigjiga Yar</option>
                        <option value="Buurta Kala-jeexan">Buurta Kala-jeexan</option>
                        <option value="Shacabka">Shacabka</option>
                        <option value="Ibrahim Koodbuur">Ibrahim Koodbuur</option>
                        <option value="Airport Road">Airport Road</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">Nooca</label>
                      <select
                        value={listingType}
                        onChange={(e) => setListingType(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-[#E5E2DA] text-xs text-[#1A1A1A] bg-[#F9F8F6] focus:outline-none focus:border-[#C2A55D]"
                      >
                        <option value="Villa">Villa (G+1)</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Townhouse">Townhouse</option>
                        <option value="Land / Plot">Dhul Banaan</option>
                        <option value="Commercial">Dhisid Ganacsi</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">Baaxadda (SQM)</label>
                      <input 
                        type="text"
                        placeholder="e.g., 483 m²"
                        value={listingSqm}
                        onChange={(e) => setListingSqm(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-[#E5E2DA] text-xs text-[#1A1A1A] bg-[#F9F8F6] focus:outline-none focus:border-[#C2A55D]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">Qiimaha aad Rabto ($ USD)</label>
                      <input 
                        type="text"
                        placeholder="e.g., $250,000"
                        value={listingAskingPrice}
                        onChange={(e) => setListingAskingPrice(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-[#E5E2DA] text-xs text-[#1A1A1A] bg-[#F9F8F6] focus:outline-none focus:border-[#C2A55D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">Tirada Qolalka</label>
                      <select
                        value={listingBeds}
                        onChange={(e) => setListingBeds(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-[#E5E2DA] text-xs text-[#1A1A1A] bg-[#F9F8F6] focus:outline-none focus:border-[#C2A55D]"
                      >
                        <option value="3">3 Qol</option>
                        <option value="4">4 Qol</option>
                        <option value="5">5 Qol</option>
                        <option value="6">6+ Qol</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">Sawirka Guriga (Haddii aad hayso)</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageFile}
                      className="w-full text-xs text-[#6B665E] file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#35322E] file:text-white hover:file:bg-[#1A1815] cursor-pointer"
                    />
                    {uploadedImagePreview && (
                      <div className="mt-2 w-28 h-20 rounded-xl overflow-hidden border border-[#E5E2DA]">
                        <img src={uploadedImagePreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">Faahfaahin Dheeraad ah</label>
                    <textarea 
                      rows={3}
                      placeholder="Qor tayada dhismaha, sharciga dowladda, laydhka, biyaha, ama shuruudo kale..."
                      value={listingDescription}
                      onChange={(e) => setListingDescription(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#E5E2DA] text-xs text-[#1A1A1A] bg-[#F9F8F6] focus:outline-none focus:border-[#C2A55D]"
                    ></textarea>
                  </div>

                  {/* Deed Checkbox */}
                  <label className="flex items-center gap-2 cursor-pointer pt-1">
                    <input 
                      type="checkbox"
                      checked={hasLegalDeed}
                      onChange={(e) => setHasLegalDeed(e.target.checked)}
                      className="w-4 h-4 rounded text-[#C2A55D] focus:ring-[#C2A55D]"
                    />
                    <span className="text-xs text-[#4A4742]">
                      Waxaan xaqiijinayaa in gurigan/dhulkan uu leeyahay dukumenti rasmi ah oo sharciyeysan.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#C2A55D] hover:bg-[#B3954C] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Soo Gudbi Guriga Iibka ah</span>
                </button>
              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
