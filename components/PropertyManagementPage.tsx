import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Key, 
  ShieldCheck, 
  Wallet, 
  TrendingUp, 
  Wrench, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  Search, 
  Bed, 
  Bath, 
  Square, 
  ArrowLeft, 
  FileText, 
  Clock, 
  Zap, 
  Droplet, 
  Wifi, 
  Lock, 
  X,
  MessageCircle,
  Home,
  ChevronRight
} from 'lucide-react';
import { RentalUnit, PropertyManagementLead } from '../types';
import { RENTAL_UNITS } from '../data/rentalProperties';

interface PropertyManagementPageProps {
  onBack: () => void;
  onOpenContact: (msg?: string) => void;
  onOpenAIAdvisor: (query?: string) => void;
  onSelectProject?: (projectId: string) => void;
  currency?: 'USD' | 'EUR' | 'GBP';
}

export const PropertyManagementPage: React.FC<PropertyManagementPageProps> = ({
  onBack,
  onOpenContact,
  onOpenAIAdvisor,
  onSelectProject,
  currency = 'USD'
}) => {
  const [activeView, setActiveView] = useState<'rentals' | 'landlord'>('rentals');
  
  // Rental search & filter states
  const [selectedCommunity, setSelectedCommunity] = useState<string>('All');
  const [selectedFurnishing, setSelectedFurnishing] = useState<string>('All');
  const [selectedBedrooms, setSelectedBedrooms] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected Unit for Detail & Lease Application Modal
  const [selectedRentalUnit, setSelectedRentalUnit] = useState<RentalUnit | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<'details' | 'apply'>('details');

  // Application Form State
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantOrg, setApplicantOrg] = useState('Diaspora / Private');
  const [moveInDate, setMoveInDate] = useState('');
  const [leaseDuration, setLeaseDuration] = useState('12 Months (Standard)');
  const [applicantNotes, setApplicantNotes] = useState('');
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  // Landlord Onboarding Form State
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerPropType, setOwnerPropType] = useState('G+1 Luxury Villa');
  const [ownerLocation, setOwnerLocation] = useState('Jigjiga Yar / Buurta Kala-jeexan');
  const [ownerUnitCount, setOwnerUnitCount] = useState('1');
  const [ownerSelectedServices, setOwnerSelectedServices] = useState<string[]>([
    'Tenant Servicing',
    'Rent Collection',
    'Occupancy Optimization',
    'Asset Protection'
  ]);
  const [ownerNotes, setOwnerNotes] = useState('');
  const [ownerSubmitted, setOwnerSubmitted] = useState(false);

  // Filter rentals
  const filteredRentals = useMemo(() => {
    return RENTAL_UNITS.filter((unit) => {
      const matchSearch = !searchQuery || 
        unit.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        unit.communityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        unit.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
        unit.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCommunity = selectedCommunity === 'All' || unit.communityId === selectedCommunity;
      const matchFurnishing = selectedFurnishing === 'All' || unit.furnishingStatus === selectedFurnishing;
      const matchBedrooms = selectedBedrooms === 'All' || unit.bedrooms >= parseInt(selectedBedrooms);

      return matchSearch && matchCommunity && matchFurnishing && matchBedrooms;
    });
  }, [searchQuery, selectedCommunity, selectedFurnishing, selectedBedrooms]);

  const currencyRates = { USD: 1, EUR: 0.92, GBP: 0.79 };
  const currencySymbols = { USD: '$', EUR: '€', GBP: '£' };

  const formatPrice = (usdPrice: number) => {
    const converted = usdPrice * (currencyRates[currency] || 1);
    return `${currencySymbols[currency] || '$'}${converted.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantPhone || !selectedRentalUnit) return;

    const leadData = {
      id: `rental-app-${Date.now()}`,
      name: applicantName,
      phone: applicantPhone,
      email: applicantEmail,
      type: 'Rental Application',
      propertyName: `${selectedRentalUnit.title} (${selectedRentalUnit.communityName}) - Rent: $${selectedRentalUnit.monthlyRentUSD}/mo`,
      preferredDate: moveInDate,
      message: `Organization: ${applicantOrg} | Lease: ${leaseDuration} | Notes: ${applicantNotes}`,
      timestamp: new Date().toISOString(),
      status: 'New'
    };

    try {
      const existing = JSON.parse(localStorage.getItem('kaabsan_leads_data') || '[]');
      existing.unshift(leadData);
      localStorage.setItem('kaabsan_leads_data', JSON.stringify(existing));
    } catch {
      // Ignore local storage error
    }

    setApplicationSubmitted(true);
  };

  const handleWhatsAppApply = (unit: RentalUnit) => {
    const text = encodeURIComponent(
      `Kaabsan Real Estate Official Website:\nSalaamu Calaykum Kaabsan Real Estate,\n\nWaxaan doonayaa inaan codsado kireysiga gurigan:\n\n🏡 *Guriga:* ${unit.title}\n📍 *Goobta:* ${unit.location}\n💰 *Kirada Bishiiba:* $${unit.monthlyRentUSD} USD\n🛏️ *Qolalka:* ${unit.bedrooms} Qolal / ${unit.bathrooms} Suuli\n🛋️ *Furnishing:* ${unit.furnishingStatus}\n\nFadlan ila soo xidhiidha si aan u dhamaystirno shuruudaha heshiiska kirada.`
    );
    window.open(`https://wa.me/252636100090?text=${text}`, '_blank');
  };

  const handleOwnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerName || !ownerPhone) return;

    const leadData: PropertyManagementLead = {
      id: `pm-lead-${Date.now()}`,
      ownerName,
      phone: ownerPhone,
      email: ownerEmail,
      propertyType: ownerPropType,
      location: ownerLocation,
      unitCount: parseInt(ownerUnitCount) || 1,
      requestedServices: ownerSelectedServices,
      notes: ownerNotes,
      timestamp: new Date().toISOString()
    };

    try {
      const existing = JSON.parse(localStorage.getItem('kaabsan_pm_leads') || '[]');
      existing.unshift(leadData);
      localStorage.setItem('kaabsan_pm_leads', JSON.stringify(existing));
    } catch {
      // Ignore
    }

    setOwnerSubmitted(true);
  };

  const handleWhatsAppOwnerInquiry = () => {
    const text = encodeURIComponent(
      `Kaabsan Real Estate Official Website:\nSalaamu Calaykum Kaabsan Property Management,\n\nWaxaan doonayaa inaan idiin soo wareejiyo maareynta hantidayda (Villas / Apartments):\n\n👤 *Magaca:* ${ownerName || 'Hantiile'}\n📞 *Telefoon:* ${ownerPhone || 'Kaabsan Client'}\n🏢 *Nooca Guriga:* ${ownerPropType}\n📍 *Goobta:* ${ownerLocation}\n📊 *Adeegyada loo baahan yahay:* Dedicated Tenant Servicing, Rent Collection, Occupancy Optimization, Asset Protection.\n\nFadlan ila soo xidhiidha si aynu heshiis u kala saxeexano.`
    );
    window.open(`https://wa.me/252636100090?text=${text}`, '_blank');
  };

  const toggleService = (srv: string) => {
    setOwnerSelectedServices(prev => 
      prev.includes(srv) ? prev.filter(s => s !== srv) : [...prev, srv]
    );
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
              Property Management & Kireynta Guryaha
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenAIAdvisor('Explain Kaabsan property management services, tenant vetting, and rent collection standards in Hargeisa.')}
              className="bg-[#EFECE6] border border-[#C2A55D]/40 text-[#35322E] hover:bg-[#E8E4DC] px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C2A55D]" />
              <span className="hidden sm:inline">AI Management Advisor</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Header Section with 4 Pillars Spotlight */}
      <section className="relative bg-[#1A1815] text-white pt-16 pb-20 overflow-hidden">
        {/* Subtle Luxury Glow & Grid Background */}
        <div className="absolute inset-0 bg-radial from-[#C2A55D]/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C2A55D]/20 border border-[#C2A55D]/40 text-[#E0CD95] text-xs font-bold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-4 h-4 text-[#C2A55D]" />
              <span>Kaabsan Property Management & Executive Rentals</span>
            </div>
            
            <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-tight">
              Adeeg Maareyn Dhameystiran & <span className="text-[#C2A55D] italic">Guryo Kiro Diyaar ah</span>
            </h1>
            
            <p className="mt-4 text-sm sm:text-base text-gray-300 font-light leading-relaxed">
              Kaabsan waxay bixisaa maareynta hantida heer caalami ah oo ay ku jirto <strong>daryeelka kireystaha</strong>, <strong>ururinta kirada joogtada ah</strong>, <strong>kobcinta buuxsanaanta guriga</strong>, iyo <strong>ilaalinta qiimaha hantida</strong> ee mashaariicda Rugsan, Aragsan, Bilicsan & Masallaha.
            </p>

            {/* View Switcher Tabs (Rentals vs Landlords) */}
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  setActiveView('rentals');
                  const el = document.getElementById('available-rentals-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-sm ${
                  activeView === 'rentals'
                    ? 'bg-[#C2A55D] text-white ring-2 ring-[#C2A55D]/50'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                }`}
              >
                <Key className="w-4 h-4" />
                <span>Daawo Guryaha Kireynta Diyaarka ah ({RENTAL_UNITS.length})</span>
              </button>

              <button
                onClick={() => {
                  setActiveView('landlord');
                  const el = document.getElementById('owner-services-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-sm ${
                  activeView === 'landlord'
                    ? 'bg-[#C2A55D] text-white ring-2 ring-[#C2A55D]/50'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Ku Wareeji Maareynta Gurigaaga (For Property Owners)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Pillars Bento-Grid Section */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#C2A55D] uppercase tracking-widest block mb-1">
            4-ta Tiir ee Adeegga Kaabsan
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-4xl text-[#1A1A1A]">
            Standard-ka Sare ee Maareynta Hantida
          </h2>
          <p className="text-xs sm:text-sm text-[#6B665E] mt-2">
            Nidaam hufan oo loogu talagalay kireystaha raadinaya deegaan ammaan ah iyo hantiilaha raba dakhli joogto ah oo aan walwal lahayn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1 */}
          <div className="bg-white p-6 rounded-3xl border border-[#E5E2DA] shadow-xs hover:shadow-md transition-all hover:border-[#C2A55D]/50 group">
            <div className="w-12 h-12 rounded-2xl bg-[#F4F1EA] text-[#C2A55D] flex items-center justify-center mb-4 group-hover:bg-[#C2A55D] group-hover:text-white transition-colors">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-[#1A1A1A] text-base mb-2">Dedicated Tenant Servicing</h3>
            <p className="text-xs text-[#6B665E] leading-relaxed">
              Daryeel joogto ah 24/7, xalinta cabashooyinka kireystaha, iyo koox farsamo oo degdeg ugu gurmata ciladaha biyaha, korontada, iyo qalabka guriga.
            </p>
            <div className="mt-4 pt-4 border-t border-[#F2EFE9] text-[11px] font-semibold text-[#C2A55D] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>&lt; 2 Saacadood Jawaabta Farsamada</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white p-6 rounded-3xl border border-[#E5E2DA] shadow-xs hover:shadow-md transition-all hover:border-[#C2A55D]/50 group">
            <div className="w-12 h-12 rounded-2xl bg-[#F4F1EA] text-[#C2A55D] flex items-center justify-center mb-4 group-hover:bg-[#C2A55D] group-hover:text-white transition-colors">
              <Wallet className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-[#1A1A1A] text-base mb-2">Rent Collection & Reporting</h3>
            <p className="text-xs text-[#6B665E] leading-relaxed">
              Ururinta kirada bil kasta iyadoo la isticmaalayo Zaad, eDahab, iyo akoonada bangiyada rasmiga ah, oo leh warbixin maaliyadeed oo bishiiba loo diro hantiilaha.
            </p>
            <div className="mt-4 pt-4 border-t border-[#F2EFE9] text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>98.6% On-Time Rent Collection</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white p-6 rounded-3xl border border-[#E5E2DA] shadow-xs hover:shadow-md transition-all hover:border-[#C2A55D]/50 group">
            <div className="w-12 h-12 rounded-2xl bg-[#F4F1EA] text-[#C2A55D] flex items-center justify-center mb-4 group-hover:bg-[#C2A55D] group-hover:text-white transition-colors">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-[#1A1A1A] text-base mb-2">Occupancy Optimization</h3>
            <p className="text-xs text-[#6B665E] leading-relaxed">
              Kireynta tooska ah ee hay'adaha caalamiga ah (UN, NGOs, Safaaradaha), shirkadaha waaweyn, iyo qoysaska qurba-joogta ah si gurigu had iyo jeer u kireysnaado.
            </p>
            <div className="mt-4 pt-4 border-t border-[#F2EFE9] text-[11px] font-semibold text-[#35322E] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#C2A55D]" />
              <span>Corporate & NGO Network</span>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="bg-white p-6 rounded-3xl border border-[#E5E2DA] shadow-xs hover:shadow-md transition-all hover:border-[#C2A55D]/50 group">
            <div className="w-12 h-12 rounded-2xl bg-[#F4F1EA] text-[#C2A55D] flex items-center justify-center mb-4 group-hover:bg-[#C2A55D] group-hover:text-white transition-colors">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-[#1A1A1A] text-base mb-2">Asset Protection & Audits</h3>
            <p className="text-xs text-[#6B665E] leading-relaxed">
              Kormeer farsamo oo joogto ah, dhismaha iyo rinjiga oo la ilaaliyo iyadoo la adeegsanayo warshadda Kaabsan Ready-Mix & Doors, iyo ilaalinta 24/7 ee albaabada.
            </p>
            <div className="mt-4 pt-4 border-t border-[#F2EFE9] text-[11px] font-semibold text-blue-700 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" />
              <span>24/7 Gated Security & Cameras</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Available Rentals Directory Section */}
      <section id="available-rentals-section" className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#E5E2DA]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-[#C2A55D] uppercase tracking-widest block mb-1">
              Mashaariicda Rasmiga ah ee Diyaarka u ah Kireysiga
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-4xl text-[#1A1A1A]">
              Guryaha Kireynta Diyaarka ah ee Kaabsan
            </h2>
            <p className="text-xs sm:text-sm text-[#6B665E] mt-1.5">
              Dooro guri ku yaalla Rugsan Gardens, Aragsan Village, Bilicsan Village ama Masallaha Towers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenContact('Waxaan rabaa inaan la hadlo kooxda kireynta Kaabsan ee guryaha Rugsan, Aragsan, Bilicsan, iyo Masallaha.')}
              className="py-2.5 px-4 rounded-xl text-xs font-bold bg-[#35322E] hover:bg-[#1A1815] text-white transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 text-[#C2A55D]" />
              <span>La Xidhiidh Xafiiska Kireynta</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#E5E2DA] shadow-xs mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#8C867D] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Raadi guri, deegaan, qolal..."
                className="w-full bg-[#F9F8F6] border border-[#E5E2DA] rounded-xl pl-10 pr-3.5 py-2 text-xs text-[#1A1A1A] outline-none focus:border-[#C2A55D]"
              />
            </div>

            {/* Community Filter */}
            <div>
              <select
                value={selectedCommunity}
                onChange={(e) => setSelectedCommunity(e.target.value)}
                className="w-full bg-[#F9F8F6] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1A1A1A] font-medium outline-none focus:border-[#C2A55D] cursor-pointer"
              >
                <option value="All">Dhammaan Mashaariicda (All)</option>
                <option value="rugsan-gardens">Rugsan Gardens (Masallaha)</option>
                <option value="aragsan-village">Aragsan Village (Buurta Kala-jeexan)</option>
                <option value="bilicsan-village">Bilicsan Village (Airport Highway)</option>
                <option value="masalaha-apartments">Masallaha Luxury Towers</option>
              </select>
            </div>

            {/* Furnishing Status */}
            <div>
              <select
                value={selectedFurnishing}
                onChange={(e) => setSelectedFurnishing(e.target.value)}
                className="w-full bg-[#F9F8F6] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1A1A1A] font-medium outline-none focus:border-[#C2A55D] cursor-pointer"
              >
                <option value="All">Dhammaan Qalabka (Furnishing)</option>
                <option value="Fully Furnished">Fully Furnished (Qalabaysan)</option>
                <option value="Semi-Furnished">Semi-Furnished (Qeyb Qalabaysan)</option>
                <option value="Unfurnished">Unfurnished (Bilaa Qalab)</option>
              </select>
            </div>

            {/* Bedrooms Filter */}
            <div>
              <select
                value={selectedBedrooms}
                onChange={(e) => setSelectedBedrooms(e.target.value)}
                className="w-full bg-[#F9F8F6] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1A1A1A] font-medium outline-none focus:border-[#C2A55D] cursor-pointer"
              >
                <option value="All">Dhammaan Qolalka (Bedrooms)</option>
                <option value="3">3+ Qolal (3+ Beds)</option>
                <option value="4">4+ Qolal (4+ Beds)</option>
                <option value="5">5+ Qolal (5+ Beds)</option>
                <option value="6">6+ Qolal (6+ Beds)</option>
                <option value="7">7 Qolal (Executive 7-Bed)</option>
              </select>
            </div>

          </div>

          {/* Quick Community Buttons */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-[#F2EFE9] text-xs">
            <span className="text-[#8C867D] self-center mr-1 text-[11px]">Mashaariicda:</span>
            {[
              { id: 'All', label: 'Dhammaan' },
              { id: 'rugsan-gardens', label: 'Rugsan Gardens' },
              { id: 'aragsan-village', label: 'Aragsan Village' },
              { id: 'bilicsan-village', label: 'Bilicsan Village' },
              { id: 'masalaha-apartments', label: 'Masallaha Apartments' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCommunity(tab.id)}
                className={`px-3 py-1 rounded-full font-semibold transition-colors cursor-pointer ${
                  selectedCommunity === tab.id
                    ? 'bg-[#35322E] text-white'
                    : 'bg-[#F4F1EA] text-[#6B665E] hover:bg-[#EAE6DE]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Rentals List Grid */}
        {filteredRentals.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-[#E5E2DA] text-center max-w-lg mx-auto">
            <Home className="w-12 h-12 text-[#8C867D] mx-auto mb-3 opacity-60" />
            <h3 className="font-bold text-[#1A1A1A] text-lg">Ma jiraan guryo u dhigma raadintaada</h3>
            <p className="text-xs text-[#6B665E] mt-1 mb-4">
              Fadlan beddel qolalka ama mashruuca aad dooratay si aad u hesho guryo kale oo bannaan.
            </p>
            <button
              onClick={() => {
                setSelectedCommunity('All');
                setSelectedFurnishing('All');
                setSelectedBedrooms('All');
                setSearchQuery('');
              }}
              className="py-2 px-4 bg-[#35322E] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Dib u celi miirayaasha (Reset Filters)
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredRentals.map((unit) => (
              <div 
                key={unit.id}
                className="bg-white rounded-3xl border border-[#E5E2DA] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image & Badges */}
                <div className="relative h-60 w-full overflow-hidden bg-[#24211E]">
                  <img
                    src={unit.heroImage}
                    alt={unit.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[#35322E]/90 text-white backdrop-blur-xs border border-white/10 shadow-xs">
                      {unit.communityName}
                    </span>
                    {unit.highlightBadge && (
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[#C2A55D] text-white shadow-xs">
                        {unit.highlightBadge}
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-600 text-white shadow-xs">
                      {unit.furnishingStatus}
                    </span>
                  </div>

                  {/* Bottom Price in Image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                    <div>
                      <div className="text-[10px] text-gray-300 font-medium uppercase">Kirada Bille ah</div>
                      <div className="font-serif-luxury text-2xl font-bold text-[#E0CD95]">
                        {formatPrice(unit.monthlyRentUSD)}
                        <span className="text-xs font-sans text-white/80 font-normal"> / bishii</span>
                      </div>
                    </div>
                    <div className="text-[10px] bg-white/20 backdrop-blur-md px-2 py-1 rounded-md text-white">
                      Deposit: {formatPrice(unit.securityDepositUSD)}
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#8C867D] mb-1">
                      <span>{unit.unitType}</span>
                      <span>{unit.neighborhood}</span>
                    </div>
                    
                    <h3 className="font-serif-luxury text-lg text-[#1A1A1A] font-bold group-hover:text-[#C2A55D] transition-colors line-clamp-1">
                      {unit.title}
                    </h3>
                    
                    <p className="text-xs text-[#6B665E] line-clamp-2 mt-1.5 leading-relaxed font-light">
                      {unit.description}
                    </p>

                    {/* Specs Row */}
                    <div className="grid grid-cols-3 gap-2 py-3 my-3 border-y border-[#F2EFE9] text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1">
                          <Bed className="w-3.5 h-3.5 text-[#C2A55D]" /> {unit.bedrooms}
                        </span>
                        <span className="text-[10px] text-[#8C867D]">Qolal (Beds)</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1">
                          <Bath className="w-3.5 h-3.5 text-[#C2A55D]" /> {unit.bathrooms}
                        </span>
                        <span className="text-[10px] text-[#8C867D]">Suuli (Baths)</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1">
                          <Square className="w-3.5 h-3.5 text-[#C2A55D]" /> {unit.areaSqm} m²
                        </span>
                        <span className="text-[10px] text-[#8C867D]">Bedka (Area)</span>
                      </div>
                    </div>

                    {/* Utilities Included Pills */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-[#8C867D] uppercase tracking-wider block">
                        Waxyaabaha ku dhex jira (Included):
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {unit.utilitiesIncluded.slice(0, 3).map((util, idx) => (
                          <span key={idx} className="text-[10px] bg-[#F4F1EA] text-[#555048] px-2 py-0.5 rounded-md font-medium">
                            ✓ {util}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setSelectedRentalUnit(unit);
                        setActiveModalTab('apply');
                        setApplicationSubmitted(false);
                      }}
                      className="w-full py-2.5 px-3 bg-[#35322E] hover:bg-[#1A1815] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer text-center shadow-xs"
                    >
                      Codso Kirada Hadda
                    </button>

                    <button
                      onClick={() => handleWhatsAppApply(unit)}
                      className="w-full py-2.5 px-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedRentalUnit(unit);
                      setActiveModalTab('details');
                    }}
                    className="w-full text-center text-[11px] text-[#C2A55D] hover:underline font-bold cursor-pointer pt-1"
                  >
                    Daawo Faahfaahinta & Sawirrada Dheeraadka ah →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Landlord / Property Owner Management Onboarding Form Section */}
      <section id="owner-services-section" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#E5E2DA]">
        <div className="bg-[#1A1815] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[#C2A55D]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C2A55D]/20 border border-[#C2A55D]/40 text-[#E0CD95] text-xs font-bold">
                <Building2 className="w-3.5 h-3.5 text-[#C2A55D]" />
                <span>Ku Wareeji Maareynta Gurigaaga Kaabsan</span>
              </div>
              
              <h2 className="font-serif-luxury text-2xl sm:text-4xl text-white font-normal leading-tight">
                Ma Leedahay Villa ama Dabaq aad doonayso in <span className="text-[#C2A55D] italic">si xirfadeysan loo maareeyo?</span>
              </h2>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                Kaabsan Property Management waxay kugu caawinaysaa inaad hesho kireystayaal la hubiyay (UN, Safaarado, Shirkado), ururinta kirada oo toos ah, iyo dayactir joogto ah adigoo jooga dalka gudihiisa ama dibaddiisa.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  'Ururinta kirada bishii iyadoo aan dib-u-dhac lahayn (Zaad/eDahab/Bank)',
                  'Hubinta & xulashada kireystayaal xushmad iyo anshax leh (Vetting)',
                  'Warbixin maaliyadeed oo bile ah oo PDF ahaan laguu soo dirayo',
                  'Koox farsamo oo ilaalinaysa qiimaha iyo dhismaha gurigaaga'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-[#C2A55D] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3">
                <button
                  onClick={handleWhatsAppOwnerInquiry}
                  className="py-3 px-5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold rounded-2xl transition-colors cursor-pointer flex items-center gap-2 shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Kala Hadal WhatsApp Maamulka Hantida</span>
                </button>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-6 bg-white text-[#1A1A1A] p-6 sm:p-8 rounded-3xl border border-[#E5E2DA] shadow-xl">
              {ownerSubmitted ? (
                <div className="text-center py-10 space-y-3">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif-luxury text-xl text-[#1A1A1A] font-bold">Waad ku mahadsan tahay, {ownerName}!</h3>
                  <p className="text-xs text-[#6B665E] max-w-sm mx-auto">
                    Codsigaaga maareynta hantida si guul leh ayaa loo diiwaangeliyay. Madaxa Kaabsan Property Management ayaa kula soo xidhiidhi doona 24 saacadood gudahood.
                  </p>
                  <button
                    onClick={() => setOwnerSubmitted(false)}
                    className="mt-4 py-2 px-4 bg-[#35322E] text-white text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Geli codsi kale
                  </button>
                </div>
              ) : (
                <form onSubmit={handleOwnerSubmit} className="space-y-4">
                  <div>
                    <h3 className="font-serif-luxury text-lg text-[#1A1A1A] font-bold">
                      Foomka Diiwaangelinta Hantida (Owner Intake)
                    </h3>
                    <p className="text-[11px] text-[#8C867D]">
                      Geli xogta gurigaaga si aynu heshiis rasmi ah ugu kala saxeexanno.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-[#1A1A1A] mb-1">Magacaaga oo Buuxa *</label>
                      <input
                        type="text"
                        required
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        placeholder="Tus: Axmed Cali Faarax"
                        className="w-full bg-[#F9F8F6] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs outline-none focus:border-[#C2A55D]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#1A1A1A] mb-1">Telefoonka / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        value={ownerPhone}
                        onChange={(e) => setOwnerPhone(e.target.value)}
                        placeholder="+252 63 XXXXXXX"
                        className="w-full bg-[#F9F8F6] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs outline-none focus:border-[#C2A55D]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-[#1A1A1A] mb-1">Nooca Guriga</label>
                      <select
                        value={ownerPropType}
                        onChange={(e) => setOwnerPropType(e.target.value)}
                        className="w-full bg-[#F9F8F6] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs outline-none focus:border-[#C2A55D] cursor-pointer"
                      >
                        <option value="G+1 Luxury Villa">G+1 Luxury Villa</option>
                        <option value="Townhouse">Townhouse (Rugsan/Aragsan/Bilicsan)</option>
                        <option value="Residential Building (Apartments)">Dabaq Kireysan (Apartment Building)</option>
                        <option value="Commercial Space">Xarun Ganacsi (Commercial Unit)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#1A1A1A] mb-1">Goobta uu ku yaallo</label>
                      <input
                        type="text"
                        value={ownerLocation}
                        onChange={(e) => setOwnerLocation(e.target.value)}
                        placeholder="Tus: Jigjiga Yar, Masallaha, Shacabka..."
                        className="w-full bg-[#F9F8F6] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs outline-none focus:border-[#C2A55D]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#1A1A1A] mb-1.5">
                      Adeegyada aad rabaan (Dooro kuwa aad u baahan tahay):
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {[
                        'Tenant Servicing',
                        'Rent Collection',
                        'Occupancy Optimization',
                        'Asset Protection'
                      ].map((srv) => (
                        <label
                          key={srv}
                          onClick={() => toggleService(srv)}
                          className={`p-2 rounded-xl border text-[11px] font-semibold cursor-pointer flex items-center gap-2 transition-all ${
                            ownerSelectedServices.includes(srv)
                              ? 'bg-amber-50 border-[#C2A55D] text-[#1A1A1A]'
                              : 'bg-[#F9F8F6] border-[#E5E2DA] text-[#6B665E]'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={ownerSelectedServices.includes(srv)}
                            onChange={() => {}}
                            className="accent-[#C2A55D]"
                          />
                          <span>{srv}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#35322E] hover:bg-[#1A1815] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-sm mt-2"
                  >
                    Gudbi Codsiga Maareynta Hantida
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* RENTAL APPLICATION / DETAIL MODAL */}
      {selectedRentalUnit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E5E2DA] relative">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedRentalUnit(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/90 hover:bg-white text-[#1A1A1A] rounded-full flex items-center justify-center shadow-md cursor-pointer border border-[#E5E2DA]"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Carousel / Hero */}
            <div className="relative h-64 sm:h-72 w-full bg-[#24211E]">
              <img
                src={selectedRentalUnit.heroImage}
                alt={selectedRentalUnit.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              <div className="absolute bottom-4 left-6 right-6 text-white flex items-end justify-between">
                <div>
                  <span className="text-xs bg-[#C2A55D] text-white px-2.5 py-0.5 rounded-md font-bold mb-1 inline-block">
                    {selectedRentalUnit.communityName}
                  </span>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold">
                    {selectedRentalUnit.title}
                  </h3>
                  <p className="text-xs text-gray-300 mt-0.5">{selectedRentalUnit.location}</p>
                </div>

                <div className="text-right">
                  <div className="text-xs text-gray-300 uppercase font-medium">Kirada Bille ah</div>
                  <div className="font-serif-luxury text-2xl sm:text-3xl text-[#E0CD95] font-bold">
                    {formatPrice(selectedRentalUnit.monthlyRentUSD)}
                    <span className="text-xs font-sans text-white/80 font-normal"> / bil</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Tabs (Details vs Apply Form) */}
            <div className="flex border-b border-[#E5E2DA] bg-[#F9F8F6] px-6">
              <button
                onClick={() => setActiveModalTab('details')}
                className={`py-3 px-4 text-xs font-bold border-b-2 cursor-pointer transition-colors ${
                  activeModalTab === 'details'
                    ? 'border-[#C2A55D] text-[#1A1A1A]'
                    : 'border-transparent text-[#6B665E] hover:text-[#1A1A1A]'
                }`}
              >
                Faahfaahinta Guriga & Qalabka
              </button>
              <button
                onClick={() => setActiveModalTab('apply')}
                className={`py-3 px-4 text-xs font-bold border-b-2 cursor-pointer transition-colors ${
                  activeModalTab === 'apply'
                    ? 'border-[#C2A55D] text-[#1A1A1A]'
                    : 'border-transparent text-[#6B665E] hover:text-[#1A1A1A]'
                }`}
              >
                Foomka Codsiga Kirada (Lease Application)
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8">
              {activeModalTab === 'details' ? (
                <div className="space-y-6">
                  {/* Key Stats */}
                  <div className="grid grid-cols-4 gap-3 bg-[#F4F1EA] p-4 rounded-2xl text-center text-xs">
                    <div>
                      <span className="text-[#8C867D] block text-[10px]">Qolalka</span>
                      <strong className="text-sm text-[#1A1A1A]">{selectedRentalUnit.bedrooms} Beds</strong>
                    </div>
                    <div>
                      <span className="text-[#8C867D] block text-[10px]">Suuliyada</span>
                      <strong className="text-sm text-[#1A1A1A]">{selectedRentalUnit.bathrooms} Baths</strong>
                    </div>
                    <div>
                      <span className="text-[#8C867D] block text-[10px]">Bedka</span>
                      <strong className="text-sm text-[#1A1A1A]">{selectedRentalUnit.areaSqm} m²</strong>
                    </div>
                    <div>
                      <span className="text-[#8C867D] block text-[10px]">Furnishing</span>
                      <strong className="text-sm text-[#1A1A1A]">{selectedRentalUnit.furnishingStatus}</strong>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#1A1A1A] text-sm mb-2">Sharaxaadda Guriga:</h4>
                    <p className="text-xs text-[#6B665E] leading-relaxed">
                      {selectedRentalUnit.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-bold text-[#1A1A1A] text-sm mb-2">Astaamaha & Faa'iidooyinka (Features):</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#35322E]">
                      {selectedRentalUnit.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C2A55D]" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Utilities */}
                  <div className="bg-[#F9F8F6] p-4 rounded-2xl border border-[#E5E2DA]">
                    <h4 className="font-bold text-[#1A1A1A] text-xs mb-2 uppercase tracking-wider">
                      Adeegyada joogtada ah ee dhismaha ku jira (Included Services):
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#555048]">
                      {selectedRentalUnit.utilitiesIncluded.map((u, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Zap className="w-3.5 h-3.5 text-amber-600" />
                          <span>{u}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Lease Terms */}
                  <div className="text-xs text-[#6B665E] border-t border-[#E5E2DA] pt-4">
                    <strong className="text-[#1A1A1A]">Shuruudaha Heshiiska:</strong> {selectedRentalUnit.leaseTerms}
                  </div>

                  {/* Modal Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={() => setActiveModalTab('apply')}
                      className="flex-1 py-3 bg-[#35322E] hover:bg-[#1A1815] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-sm text-center"
                    >
                      Buuxi Foomka Codsiga Kirada
                    </button>

                    <button
                      onClick={() => handleWhatsAppApply(selectedRentalUnit)}
                      className="py-3 px-6 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Kaabsan</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Apply Form */
                <div>
                  {applicationSubmitted ? (
                    <div className="text-center py-8 space-y-3">
                      <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="font-serif-luxury text-xl text-[#1A1A1A] font-bold">
                        Codsigaaga si guul leh ayaa loo gudbiyay!
                      </h3>
                      <p className="text-xs text-[#6B665E] max-w-md mx-auto">
                        Kooxda kireynta ee Kaabsan Real Estate ayaa kula soo xidhiidhi doonta si loo qabto booqashada guriga (Physical Tour) iyo saxiixa heshiiska.
                      </p>
                      <button
                        onClick={() => setSelectedRentalUnit(null)}
                        className="py-2.5 px-6 bg-[#35322E] text-white text-xs font-bold rounded-xl cursor-pointer"
                      >
                        Xidh daaqadda
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplySubmit} className="space-y-4">
                      <div>
                        <h4 className="font-bold text-[#1A1A1A] text-sm">
                          Codsiga Kireysiga: {selectedRentalUnit.title}
                        </h4>
                        <p className="text-[11px] text-[#8C867D]">
                          Qiimaha: {formatPrice(selectedRentalUnit.monthlyRentUSD)}/bishii • Deposit: {formatPrice(selectedRentalUnit.securityDepositUSD)}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-[#1A1A1A] mb-1">Magacaaga oo Buuxa *</label>
                          <input
                            type="text"
                            required
                            value={applicantName}
                            onChange={(e) => setApplicantName(e.target.value)}
                            placeholder="Tus: Mustafe Axmed Warsame"
                            className="w-full bg-[#F9F8F6] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs outline-none focus:border-[#C2A55D]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-[#1A1A1A] mb-1">Telefoonka / WhatsApp *</label>
                          <input
                            type="tel"
                            required
                            value={applicantPhone}
                            onChange={(e) => setApplicantPhone(e.target.value)}
                            placeholder="+252 63 XXXXXXX"
                            className="w-full bg-[#F9F8F6] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs outline-none focus:border-[#C2A55D]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-[#1A1A1A] mb-1">Hay'adda / Shaqada (Category)</label>
                          <select
                            value={applicantOrg}
                            onChange={(e) => setApplicantOrg(e.target.value)}
                            className="w-full bg-[#F9F8F6] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs outline-none focus:border-[#C2A55D] cursor-pointer"
                          >
                            <option value="UN / International Agency">UN / Hay'ad Caalami ah</option>
                            <option value="Diplomatic / Embassy Staff">Safaarad / Diblomaasi</option>
                            <option value="Corporate / Telecom / Banking">Shirkad / Bangi / Telesom</option>
                            <option value="Diaspora Family">Qurba-joog (Diaspora)</option>
                            <option value="Local Business / Private">Ganacsi Gaar ah / Maxalli</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-[#1A1A1A] mb-1">Mudada aad doonayso inaad degto</label>
                          <select
                            value={leaseDuration}
                            onChange={(e) => setLeaseDuration(e.target.value)}
                            className="w-full bg-[#F9F8F6] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs outline-none focus:border-[#C2A55D] cursor-pointer"
                          >
                            <option value="6 Months">6 Bilood (Minimum)</option>
                            <option value="12 Months (Standard)">12 Bilood (1 Sano - Standard)</option>
                            <option value="24 Months (2 Years)">24 Bilood (2 Sano)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#1A1A1A] mb-1">Xilliga aad rabto inaad u guurto (Move-in Date)</label>
                        <input
                          type="date"
                          value={moveInDate}
                          onChange={(e) => setMoveInDate(e.target.value)}
                          className="w-full bg-[#F9F8F6] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs outline-none focus:border-[#C2A55D]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#1A1A1A] mb-1">Faahfaahin dheeraad ah ama codsi gaar ah</label>
                        <textarea
                          rows={2}
                          value={applicantNotes}
                          onChange={(e) => setApplicantNotes(e.target.value)}
                          placeholder="Qor haddii aad u baahan tahay qalab dheeraad ah ama taariikh gaar ah..."
                          className="w-full bg-[#F9F8F6] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs outline-none focus:border-[#C2A55D]"
                        />
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button
                          type="submit"
                          className="flex-1 py-3 bg-[#35322E] hover:bg-[#1A1815] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-sm"
                        >
                          Gudbi Codsiga Kirada
                        </button>
                        <button
                          type="button"
                          onClick={() => handleWhatsAppApply(selectedRentalUnit)}
                          className="py-3 px-5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>WhatsApp</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
