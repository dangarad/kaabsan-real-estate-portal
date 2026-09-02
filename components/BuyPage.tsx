import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Building2, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  ShieldCheck, 
  Sparkles, 
  Search, 
  Filter, 
  Calendar, 
  Phone, 
  CreditCard, 
  CheckCircle2, 
  ChevronRight,
  Eye,
  Heart,
  Calculator,
  ArrowRight
} from 'lucide-react';
import { Property, MasterCommunity } from '../types';
import { useTranslation } from '../context/LanguageContext';

interface BuyPageProps {
  onBack: () => void;
  properties: Property[];
  masterCommunities: MasterCommunity[];
  onSelectProperty: (property: Property) => void;
  onSelectProject: (projectId: string) => void;
  onOpenScheduleTour: (property: Property) => void;
  onOpenContact: (msg?: string) => void;
  onOpenPayment: (propTitle?: string) => void;
  onOpenAIAdvisor: (query?: string, prop?: Property) => void;
  savedPropertyIds: string[];
  onToggleSave: (id: string) => void;
  currency: 'USD' | 'EUR' | 'GBP';
}

export const BuyPage: React.FC<BuyPageProps> = ({
  onBack,
  properties,
  masterCommunities,
  onSelectProperty,
  onSelectProject,
  onOpenScheduleTour,
  onOpenContact,
  onOpenPayment,
  onOpenAIAdvisor,
  savedPropertyIds,
  onToggleSave,
  currency
}) => {
  const { t, language } = useTranslation();
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedBedrooms, setSelectedBedrooms] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'sqm'>('recommended');

  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      const matchSearch = !searchQuery || 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.subtitle && p.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchNeighborhood = selectedNeighborhood === 'All' || p.neighborhood.toLowerCase().includes(selectedNeighborhood.toLowerCase());
      const matchStatus = selectedStatus === 'All' || 
        (selectedStatus === 'For Sale' && p.status !== 'Sold Out') ||
        (selectedStatus === 'Sold Out' && p.status === 'Sold Out');
      const matchBedrooms = selectedBedrooms === 'All' || p.beds >= parseInt(selectedBedrooms);

      return matchSearch && matchNeighborhood && matchStatus && matchBedrooms;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'sqm') return (b.actualSqm || b.builtArea || 0) - (a.actualSqm || a.builtArea || 0);
      return 0;
    });
  }, [properties, searchQuery, selectedNeighborhood, selectedStatus, selectedBedrooms, sortBy]);

  const currencyRates = { USD: 1, EUR: 0.92, GBP: 0.79 };
  const currencySymbols = { USD: '$', EUR: '€', GBP: '£' };

  const formatPrice = (usdPrice: number) => {
    const converted = usdPrice * currencyRates[currency];
    return `${currencySymbols[currency]}${converted.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1A1A1A] pb-24 animate-in fade-in duration-300">
      
      {/* Top Breadcrumb Header */}
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
              Guryaha Iibka ah (Properties For Sale)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenAIAdvisor('I want advice on buying a villa in Aragsan Village vs an apartment in Masalaha.')}
              className="bg-[#EFECE6] border border-[#C2A55D]/40 text-[#35322E] hover:bg-[#E8E4DC] px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C2A55D]" />
              <span className="hidden sm:inline">AI Buyer Advisor</span>
            </button>

            <button
              onClick={() => onOpenContact('Waxaan doonayaa inaan guri iibsado oo aan la hadlo waaxda iibka')}
              className="bg-[#35322E] hover:bg-[#1A1815] text-white px-4 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-sm"
            >
              La Hadal Waaxda Iibka
            </button>
          </div>
        </div>
      </div>

      {/* Hero Banner for Buyer Page */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-[#24211E] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-[#E5E2DA]">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#C2A55D] bg-black/40 px-3.5 py-1 rounded-full border border-white/10 w-fit">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C2A55D]" />
              Dammaanad Rasmi ah • Telesom Group • 0% Riba
            </div>
            
            <h1 className="font-serif-luxury text-3xl sm:text-5xl font-normal leading-tight">
              Guryaha & Dabaqyada Iibka ah ee Somaliland
            </h1>

            <p className="text-xs sm:text-sm text-[#D8D3C8] font-light leading-relaxed">
              Mashaariicda aad iibsan karto waxay kala yihiin: Rugsan Gardens, Aragsan Village (Buurta Kala-jeexan), Bilicsan Village, iyo Masallaha Apartment oo dhammaantood lagu heli karo qorshaha maalgelinta 5-ta sano (60 bilood) ee Dara Salaam Bank.
            </p>

            {/* Value Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                <div className="text-[#C2A55D] font-bold text-xs">30% Down Payment</div>
                <div className="text-[11px] text-[#D8D3C8]">Bixinta Hore ee Fudud</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                <div className="text-[#C2A55D] font-bold text-xs">60 Bilood (5 Sano)</div>
                <div className="text-[11px] text-[#D8D3C8]">Maalgelin Siman oo Bille ah</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 col-span-2 sm:col-span-1">
                <div className="text-[#C2A55D] font-bold text-xs">Dara Salaam Bank</div>
                <div className="text-[11px] text-[#D8D3C8]">0% Riba • Sharia Certified</div>
              </div>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-20 bg-cover bg-center pointer-events-none hidden md:block" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80')` }}></div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-4">
        <div className="bg-white border border-[#E5E2DA] rounded-3xl p-5 shadow-xs space-y-4">
          
          {/* Row 1: Search & Sort */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-[#8C867D] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Raadi guri, degmo (Masalaha, Jigjiga Yar), nooca dhismaha..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E2DA] bg-[#F9F8F6] text-xs text-[#1A1A1A] placeholder-[#8C867D] focus:outline-none focus:border-[#C2A55D]"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-[#6B665E] font-medium whitespace-nowrap">Kala Saar:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full sm:w-auto px-3 py-2.5 rounded-xl border border-[#E5E2DA] bg-[#F9F8F6] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C2A55D] font-medium cursor-pointer"
              >
                <option value="recommended">La Soo Xulay (Recommended)</option>
                <option value="price-asc">Qiimaha: Ugu Hooseeya</option>
                <option value="price-desc">Qiimaha: Ugu Sarreeya</option>
                <option value="sqm">Baaxadda (SQM): Ugu Weyn</option>
              </select>
            </div>
          </div>

          {/* Row 2: Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#F2EFE9]">
            
            {/* Neighborhoods */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <span className="text-xs font-bold text-[#6B665E] mr-1">Deegaanka:</span>
              {['All', 'Masalaha', 'Buurta Kala-jeexan', 'Jigjiga Yar'].map((n) => (
                <button
                  key={n}
                  onClick={() => setSelectedNeighborhood(n)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedNeighborhood === n
                      ? 'bg-[#35322E] text-white shadow-xs'
                      : 'bg-[#F4F1EA] text-[#4A4742] hover:bg-[#EAE6DE] border border-[#E5E2DA]'
                  }`}
                >
                  {n === 'All' ? 'Dhammaan Deegaannada' : n}
                </button>
              ))}
            </div>

            {/* Status & Bedrooms */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-[#6B665E]">Xaaladda:</span>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-2.5 py-1 rounded-lg border border-[#E5E2DA] bg-[#F9F8F6] text-xs text-[#1A1A1A] focus:outline-none"
                >
                  <option value="All">Dhammaan</option>
                  <option value="For Sale">Iib Diyaar ah (Available)</option>
                  <option value="Sold Out">La Wada Iibsaday (Sold Out)</option>
                </select>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-[#6B665E]">Qolalka:</span>
                <select
                  value={selectedBedrooms}
                  onChange={(e) => setSelectedBedrooms(e.target.value)}
                  className="px-2.5 py-1 rounded-lg border border-[#E5E2DA] bg-[#F9F8F6] text-xs text-[#1A1A1A] focus:outline-none"
                >
                  <option value="All">Dhammaan</option>
                  <option value="3">3+ Qol</option>
                  <option value="4">4+ Qol</option>
                  <option value="6">6+ Qol</option>
                </select>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Property Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl text-[#1A1A1A] font-extrabold tracking-tight">
            Guryaha La Helay ({filteredProperties.length})
          </h2>
          <span className="text-xs font-bold text-[#6B665E] bg-[#EFECE6] px-3 py-1 rounded-full border border-[#E5E2DA]">
            Kaabsan Real Estate Portfolio
          </span>
        </div>

        {filteredProperties.length === 0 ? (
          <div className="bg-white border border-[#E5E2DA] rounded-3xl p-12 text-center space-y-3">
            <Building2 className="w-10 h-10 text-[#C2A55D] mx-auto opacity-60" />
            <h3 className="text-xl text-[#1A1A1A] font-extrabold">Wax guri ah lagama helin shuruudahan</h3>
            <p className="text-xs text-[#6B665E] font-medium">Fadlan beddel shaandhada ama raadi ereyo kale.</p>
            <button
              onClick={() => { setSelectedNeighborhood('All'); setSelectedStatus('All'); setSelectedBedrooms('All'); setSearchQuery(''); }}
              className="mt-2 px-4 py-2 bg-[#35322E] text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Dib u celi shaandhada
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => {
              const isSaved = savedPropertyIds.includes(property.id);

              return (
                <div
                  key={property.id}
                  className="bg-white border border-[#E5E2DA] rounded-3xl overflow-hidden hover:border-[#C2A55D] hover:shadow-xl transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Hero Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#24211E]">
                      <img 
                        src={property.heroImage} 
                        alt={property.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Badges */}
                      <span className={`absolute top-3 left-3 px-3 py-1 text-[11px] font-extrabold rounded-full border shadow-sm ${
                        property.status === 'Sold Out'
                          ? 'bg-red-900/90 text-white border-red-700'
                          : 'bg-emerald-900/90 text-white border-emerald-700'
                      }`}>
                        {property.status === 'Sold Out' ? '100% Sold Out' : 'Iib Diyaar ah'}
                      </span>

                      {/* Favorite Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleSave(property.id);
                        }}
                        className="absolute top-3 right-3 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors cursor-pointer"
                        title={isSaved ? 'Ka saar liiska' : 'Ku dar liiska'}
                      >
                        <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#C2A55D] text-[#C2A55D]' : 'text-white'}`} />
                      </button>

                      {/* WhatsApp Inquiry Strip */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 rounded-2xl bg-black/75 backdrop-blur-md text-white border border-white/10">
                        <div className="flex-1 pr-2">
                          <div className="text-[10px] text-[#D8D3C8] font-bold">Qiimaha & Qorshaha:</div>
                          <div className="font-extrabold text-xs text-[#DFCA85] truncate">Fadlan la xidhiidh WhatsApp</div>
                        </div>

                        <a
                          href={`https://wa.me/252636100090?text=${encodeURIComponent(`Kaabsan Real Estate Official Website:\nAsc Kaabsan Real Estate, waxaan doonayaa inaan ogaado qiimaha rasmiga ah ee ${property.title} (${property.neighborhood}).`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-2.5 py-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-[11px] font-extrabold rounded-xl transition-colors shrink-0 flex items-center gap-1 shadow-sm"
                        >
                          <Phone className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-1.5 text-xs text-[#8C867D] font-bold">
                        <MapPin className="w-3.5 h-3.5 text-[#C2A55D]" />
                        <span>{property.neighborhood}, Hargeisa</span>
                      </div>

                      <h3 
                        onClick={() => onSelectProperty(property)}
                        className="text-xl text-[#1A1A1A] group-hover:text-[#C2A55D] transition-colors cursor-pointer leading-snug font-extrabold"
                      >
                        {property.title}
                      </h3>

                      <p className="text-xs text-[#6B665E] font-medium line-clamp-2 leading-relaxed">
                        {property.description || property.subtitle}
                      </p>

                      {/* Specs Icons */}
                      <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#F2EFE9] text-xs text-[#4A4742] font-bold">
                        <div className="flex items-center gap-1.5">
                          <Bed className="w-4 h-4 text-[#C2A55D]" />
                          <span>{property.beds} Qol</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Bath className="w-4 h-4 text-[#C2A55D]" />
                          <span>{property.baths} Musqul</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Square className="w-4 h-4 text-[#C2A55D]" />
                          <span>{property.actualSqm || property.builtArea || 400} m²</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="px-6 pb-6 pt-1 flex items-center gap-2">
                    <button
                      onClick={() => onSelectProperty(property)}
                      className="flex-1 py-2.5 rounded-xl bg-[#35322E] hover:bg-[#1A1815] text-white text-xs font-extrabold transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#C2A55D]" />
                      <span>Eeg Faahfaahinta</span>
                    </button>

                    {property.status !== 'Sold Out' && (
                      <button
                        onClick={() => onOpenScheduleTour(property)}
                        className="px-3.5 py-2.5 rounded-xl bg-[#F4F1EA] hover:bg-[#EAE6DE] text-[#35322E] border border-[#E5E2DA] text-xs font-extrabold transition-colors cursor-pointer flex items-center gap-1"
                        title="Ballanso Booqasho"
                      >
                        <Calendar className="w-3.5 h-3.5 text-[#C2A55D]" />
                        <span>Booqasho</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Financing Calculator Teaser Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-gradient-to-br from-[#F4F1EA] to-[#EAE6DE] border border-[#E5E2DA] rounded-3xl p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-extrabold text-[#C2A55D] uppercase tracking-wider">
              <Calculator className="w-4 h-4 text-[#C2A55D]" />
              Qiyaas Maalgelintaada 5-ta Sano ah (Dara Salaam Bank)
            </div>
            <h3 className="text-2xl sm:text-3xl text-[#1A1A1A] font-extrabold tracking-tight">
              Ma Doonaysaa Inaad Ogaato Lacagta Billeed ee Kugu Soo Hagaagaysa?
            </h3>
            <p className="text-xs sm:text-sm text-[#6B665E] font-medium leading-relaxed">
              Adeegso xisaabiyaha rasmiga ah ee Kaabsan Real Estate iyo Dara Salaam Bank si aad u xisaabiso 30% Down payment-ka iyo lacagta bisha kasta ee 60-ka bilood iyadoo aan wax dulsaar ah lahayn (0% Riba).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <button
              onClick={() => onOpenContact('Waxaan doonayaa xisaabinta maalgelinta 60-ka bilood ee Dara Salaam Bank ee guri aan iibsanayo')}
              className="w-full sm:w-auto px-6 py-3 bg-[#35322E] hover:bg-[#1A1815] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-md text-center"
            >
              La Tasho Khubarada Maalgelinta
            </button>
            <button
              onClick={() => onOpenPayment()}
              className="w-full sm:w-auto px-6 py-3 bg-[#C2A55D] hover:bg-[#B3954C] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-md text-center flex items-center justify-center gap-1.5"
            >
              <CreditCard className="w-4 h-4" />
              <span>Zaad Pay / Deposit</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
