import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Building2, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Navigation, 
  Compass, 
  Phone, 
  Calendar,
  Search,
  ExternalLink,
  Copy,
  Check,
  Share2,
  Navigation2,
  Car,
  Globe
} from 'lucide-react';
import { MasterCommunity } from '../types';
import { useTranslation } from '../context/LanguageContext';

export interface InteractiveMasterMapProps {
  communities?: MasterCommunity[];
  onSelectMasterCommunity: (id: string) => void;
  onOpenScheduleTour: (communityName: string) => void;
  onOpenContact: (message?: string) => void;
  onOpenCalculator?: () => void;
}

export interface MapZone {
  id: string;
  communityId: string;
  name: string;
  nameSo: string;
  nameAr: string;
  type: 'Townhouse Gated Community' | 'G+1 Luxury Hillside Villas' | 'Executive Compound Villas' | 'G+6 Twin Residential Towers' | 'Commercial & Mixed-Use';
  location: string;
  district: 'Masallaha' | 'Jigjiga Yar (Buurta Kala-jeexan)' | 'Airport Corridor' | 'Masalaha South';
  coordinatesDms: string;
  coordinatesDecimal: { lat: number; lng: number };
  googleMapsUrl: string;
  directionsUrl: string;
  appleMapsUrl: string;
  color: string;
  accentColor: string;
  plotCount: string;
  priceStart: string;
  downPayment: string;
  monthlyInstallment: string;
  plotSize: string;
  builtArea: string;
  amenities: string[];
  status: string;
  image: string;
  svgPath: string;
  center: { x: number; y: number };
  plots: Array<{
    id: string;
    label: string;
    x: number;
    y: number;
    status: 'Available' | 'Reserved' | 'Ready' | 'VIP';
    size: string;
  }>;
}

export const HARGEISA_ZONES: MapZone[] = [
  {
    id: 'zone-aragsan',
    communityId: 'aragsan-village',
    name: 'Aragsan Village Master Sanctuary',
    nameSo: 'Mashruuca Aragsan Village (Buurta Kala-jeexan)',
    nameAr: 'قرية أراغسان الفاخرة (بورتا كلا-جيخان)',
    type: 'G+1 Luxury Hillside Villas',
    location: 'Jigjiga Yar - Buurta Kala-jeexan, Hargeisa',
    district: 'Jigjiga Yar (Buurta Kala-jeexan)',
    coordinatesDms: '9°34\'33.29"N 44° 0\'31.24"E',
    coordinatesDecimal: { lat: 9.575914, lng: 44.008678 },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=9.575914,44.008678',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=9.575914,44.008678',
    appleMapsUrl: 'https://maps.apple.com/?daddr=9.575914,44.008678',
    color: '#0D9488',
    accentColor: '#0F766E',
    plotCount: '66 Standalone G+1 Luxury Villas',
    priceStart: 'La xidhiidh WhatsApp',
    downPayment: '30% Horeysiin (Down)',
    monthlyInstallment: 'Maalgelin 60 Bilood (0% Riba)',
    plotSize: '483 m² - 562.69 m²',
    builtArea: '361.99 m² (Net 348.39 m²)',
    amenities: ['Preschool (240 cap)', 'Elementary School (120 cap)', 'Mosque (120 cap)', 'Sports Turf', 'Commercial Gym'],
    status: 'Ready for Purchase (Guryo Iib Diyaar ah)',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    svgPath: 'M 220 120 L 410 90 L 460 210 L 330 260 L 190 200 Z',
    center: { x: 320, y: 170 },
    plots: [
      { id: 'AV-01', label: 'Villa 01', x: 250, y: 130, status: 'Ready', size: '483 m²' },
      { id: 'AV-02', label: 'Villa 02', x: 290, y: 120, status: 'Available', size: '483 m²' },
      { id: 'AV-03', label: 'Villa 03', x: 330, y: 110, status: 'Available', size: '512 m²' },
      { id: 'AV-04', label: 'Villa 04', x: 370, y: 105, status: 'VIP', size: '562 m²' },
      { id: 'AV-05', label: 'Villa 05', x: 240, y: 165, status: 'Ready', size: '483 m²' },
      { id: 'AV-06', label: 'Villa 06', x: 280, y: 155, status: 'Available', size: '483 m²' },
      { id: 'AV-07', label: 'Villa 07', x: 320, y: 145, status: 'Ready', size: '483 m²' },
      { id: 'AV-08', label: 'Villa 08', x: 360, y: 140, status: 'Available', size: '483 m²' },
      { id: 'AV-09', label: 'Villa 09', x: 230, y: 200, status: 'Available', size: '483 m²' },
      { id: 'AV-10', label: 'Villa 10', x: 270, y: 190, status: 'Available', size: '483 m²' },
      { id: 'AV-11', label: 'Villa 11', x: 310, y: 180, status: 'Reserved', size: '562 m²' },
      { id: 'AV-12', label: 'Villa 12', x: 350, y: 175, status: 'Ready', size: '483 m²' }
    ]
  },
  {
    id: 'zone-rugsan',
    communityId: 'rugsan-gardens',
    name: 'Rugsan Gardens Master Community',
    nameSo: 'Mashruuca Rugsan Gardens',
    nameAr: 'مشروع روغسان جاردنز السكني',
    type: 'Townhouse Gated Community',
    location: 'Masallaha, Airport Road Corridor, Hargeisa',
    district: 'Masallaha',
    coordinatesDms: '9°31\'12.40"N 44° 3\'54.09"E',
    coordinatesDecimal: { lat: 9.520111, lng: 44.065025 },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=9.520111,44.065025',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=9.520111,44.065025',
    appleMapsUrl: 'https://maps.apple.com/?daddr=9.520111,44.065025',
    color: '#C2A55D',
    accentColor: '#B3954C',
    plotCount: '70 Modern Townhouses + DSQ',
    priceStart: 'La xidhiidh WhatsApp',
    downPayment: '30% Horeysiin (Down)',
    monthlyInstallment: 'Maalgelin 60 Bilood (0% Riba)',
    plotSize: '400 m²',
    builtArea: '321 m²',
    amenities: ['Private Resident Gym', 'Kindergarten', '24/7 Gatehouse Security', 'Jogging Boulevard', 'Borehole Water'],
    status: 'Ready for Purchase (Guryo Iib Diyaar ah)',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    svgPath: 'M 540 380 L 680 340 L 740 430 L 630 480 L 530 440 Z',
    center: { x: 625, y: 415 },
    plots: [
      { id: 'RG-A01', label: 'Plot A1', x: 570, y: 380, status: 'Ready', size: '400 m²' },
      { id: 'RG-A02', label: 'Plot A2', x: 600, y: 370, status: 'Available', size: '400 m²' },
      { id: 'RG-A03', label: 'Plot A3', x: 630, y: 360, status: 'Available', size: '400 m²' },
      { id: 'RG-A04', label: 'Plot A4', x: 660, y: 350, status: 'Reserved', size: '400 m²' },
      { id: 'RG-B01', label: 'Plot B1', x: 560, y: 410, status: 'Ready', size: '400 m²' },
      { id: 'RG-B02', label: 'Plot B2', x: 590, y: 400, status: 'Available', size: '400 m²' },
      { id: 'RG-B03', label: 'Plot B3', x: 620, y: 390, status: 'Ready', size: '400 m²' },
      { id: 'RG-B04', label: 'Plot B4', x: 650, y: 380, status: 'Available', size: '400 m²' },
      { id: 'RG-C01', label: 'Plot C1', x: 570, y: 440, status: 'Available', size: '400 m²' },
      { id: 'RG-C02', label: 'Plot C2', x: 600, y: 430, status: 'Ready', size: '400 m²' },
      { id: 'RG-C03', label: 'Plot C3', x: 630, y: 420, status: 'Available', size: '400 m²' },
      { id: 'RG-C04', label: 'Plot C4', x: 660, y: 410, status: 'Available', size: '400 m²' }
    ]
  },
  {
    id: 'zone-bilicsan',
    communityId: 'bilicsan-village',
    name: 'Bilicsan Village Luxury Compound',
    nameSo: 'Mashruuca Bilicsan Village (Airport Corridor)',
    nameAr: 'قرية بيليكسان الفاخرة (طريق المطار)',
    type: 'Executive Compound Villas',
    location: 'Masalaha / Airport Highway Corridor, Hargeisa',
    district: 'Airport Corridor',
    coordinatesDms: '9°31\'35.15"N 44° 4\'5.42"E',
    coordinatesDecimal: { lat: 9.526431, lng: 44.068172 },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=9.526431,44.068172',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=9.526431,44.068172',
    appleMapsUrl: 'https://maps.apple.com/?daddr=9.526431,44.068172',
    color: '#854D0E',
    accentColor: '#A16207',
    plotCount: '16 Modern Luxury Compound Villas',
    priceStart: 'La xidhiidh WhatsApp',
    downPayment: '30% Horeysiin (Down)',
    monthlyInstallment: 'Maalgelin 60 Bilood (0% Riba)',
    plotSize: '450 m²',
    builtArea: '380 m²',
    amenities: ['Typology A: 7 Bedrooms', 'Dual Luxury Kitchens', 'Private Study & Maid Quarters', 'Guardhouse Security'],
    status: 'Ready for Purchase (Guryo Iib Diyaar ah)',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    svgPath: 'M 720 220 L 840 200 L 890 300 L 780 330 Z',
    center: { x: 800, y: 260 },
    plots: [
      { id: 'BV-01', label: 'Villa 01', x: 745, y: 230, status: 'Ready', size: '450 m²' },
      { id: 'BV-02', label: 'Villa 02', x: 785, y: 220, status: 'Available', size: '450 m²' },
      { id: 'BV-03', label: 'Villa 03', x: 825, y: 210, status: 'Available', size: '450 m²' },
      { id: 'BV-04', label: 'Villa 04', x: 755, y: 265, status: 'Ready', size: '450 m²' },
      { id: 'BV-05', label: 'Villa 05', x: 795, y: 255, status: 'Available', size: '450 m²' },
      { id: 'BV-06', label: 'Villa 06', x: 835, y: 245, status: 'Reserved', size: '450 m²' },
      { id: 'BV-07', label: 'Villa 07', x: 765, y: 300, status: 'Available', size: '450 m²' },
      { id: 'BV-08', label: 'Villa 08', x: 805, y: 290, status: 'Ready', size: '450 m²' }
    ]
  },
  {
    id: 'zone-masalaha-apts',
    communityId: 'masalaha-apartments',
    name: 'Masallaha Luxury Towers (G+6)',
    nameSo: 'Dabaqyada Dhaadheer ee Masallaha (Block A & B)',
    nameAr: 'أبراج مسلحة السكنية الفاخرة (G+6)',
    type: 'G+6 Twin Residential Towers',
    location: 'Masallaha Main Boulevard, Hargeisa',
    district: 'Masallaha',
    coordinatesDms: '9°31\'48.59"N 44° 4\'52.72"E',
    coordinatesDecimal: { lat: 9.530164, lng: 44.081311 },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=9.530164,44.081311',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=9.530164,44.081311',
    appleMapsUrl: 'https://maps.apple.com/?daddr=9.530164,44.081311',
    color: '#4F46E5',
    accentColor: '#4338CA',
    plotCount: 'Twin Towers • Penthouses & Apartments',
    priceStart: 'La xidhiidh WhatsApp',
    downPayment: '30% Horeysiin (Down)',
    monthlyInstallment: 'Maalgelin 60 Bilood (0% Riba)',
    plotSize: '272 m² (Penthouse) | 158 m² (3-Bed)',
    builtArea: 'G+6 Reinforced Concrete',
    amenities: ['78-Car Parking Bay', 'Dual Elevators', '24/7 Backup Generator', 'STP Treatment Plant', 'Retail Arcade'],
    status: 'Dabaqyo Iib Diyaar ah (Ready for Handover)',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    svgPath: 'M 440 440 L 520 420 L 540 500 L 470 520 Z',
    center: { x: 485, y: 465 },
    plots: [
      { id: 'MT-A1', label: 'Penthouse A', x: 465, y: 445, status: 'VIP', size: '272 m²' },
      { id: 'MT-A2', label: 'Suite 4B', x: 495, y: 440, status: 'Ready', size: '223 m²' },
      { id: 'MT-B1', label: 'Suite 3A', x: 475, y: 480, status: 'Available', size: '158 m²' },
      { id: 'MT-B2', label: 'Suite 2B', x: 505, y: 475, status: 'Available', size: '125 m²' }
    ]
  }
];

export const InteractiveMasterMap: React.FC<InteractiveMasterMapProps> = ({
  communities,
  onSelectMasterCommunity,
  onOpenScheduleTour,
  onOpenContact,
  onOpenCalculator
}) => {
  const { language } = useTranslation();
  const [activeZoneId, setActiveZoneId] = useState<string>('zone-aragsan');
  const [hoveredPlot, setHoveredPlot] = useState<{
    id: string;
    label: string;
    zoneName: string;
    status: string;
    size: string;
    price: string;
    coordinates?: string;
  } | null>(null);
  const [viewMode, setViewMode] = useState<'satellite'>('satellite');
  const [filterDistrict, setFilterDistrict] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedGps, setCopiedGps] = useState<string | null>(null);

  const activeZone = useMemo(() => {
    return HARGEISA_ZONES.find(z => z.id === activeZoneId) || HARGEISA_ZONES[0];
  }, [activeZoneId]);

  const filteredZones = useMemo(() => {
    return HARGEISA_ZONES.filter(z => {
      if (filterDistrict !== 'all' && z.district !== filterDistrict) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return z.name.toLowerCase().includes(q) || 
               z.location.toLowerCase().includes(q) || 
               z.district.toLowerCase().includes(q) ||
               z.coordinatesDms.toLowerCase().includes(q);
      }
      return true;
    });
  }, [filterDistrict, searchQuery]);

  const handleCopyGps = (dms: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(dms);
    setCopiedGps(dms);
    setTimeout(() => setCopiedGps(null), 2500);
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#E5E2DA] rounded-3xl overflow-hidden shadow-lg">
      
      {/* Map Header & Controls */}
      <div className="p-5 sm:p-7 bg-[#FAF8F5] border-b border-[#E5E2DA] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 rounded-md bg-[#C2A55D]/20 text-[#C2A55D]">
              <Compass className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-[#C2A55D] tracking-wider uppercase">
              {language === 'ar' ? 'الخريطة التفاعلية ونظام الملاحة GPS' : language === 'so' ? 'Khariidadda & Tilmaamaha Tooska ah ee GPS' : 'Interactive Map & Direct GPS Navigation'}
            </span>
          </div>
          <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#1A1A1A] font-normal">
            {language === 'ar' 
              ? 'استكشف مواقع مشاريع كابسان وانتقل إليها مباشرة عبر GPS' 
              : language === 'so' 
              ? 'Sahami Goobaha Kaabsan & Toos u Tag Khariidadda (GPS)' 
              : 'Explore Kaabsan Master Communities & Direct GPS Navigation'}
          </h3>
          <p className="text-xs sm:text-sm text-[#6B665E] font-light mt-1 max-w-2xl">
            {language === 'ar'
              ? 'انقر على أي مشروع للحصول على إحداثيات GPS الدقيقة والتوجه مباشرة عبر خرائط Google أو Apple Maps.'
              : language === 'so'
              ? 'Guji mashruuc kasta si aad u hesho tilmaamaha GPS-ka saxda ah oo aad toos ugu tagto Google Maps ama Apple Maps.'
              : 'Click any project zone to retrieve exact GPS coordinates and launch instant turn-by-turn navigation via Google Maps or Apple Maps.'}
          </p>
        </div>

        {/* Live GPS Mode Badge */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-[#1F1D1A] p-1 rounded-2xl flex items-center border border-[#C2A55D]/30 shadow-xs">
            <div className="px-4 py-1.5 text-xs font-bold rounded-xl bg-[#35322E] text-[#C2A55D] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <Globe className="w-3.5 h-3.5 text-[#C2A55D]" />
              <span>{language === 'ar' ? 'ملاحة GPS مباشرة (Live)' : language === 'so' ? 'Malaaxada GPS Tooska ah (Live)' : 'GPS Live Hub'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK DESTINATION GPS BAR: 4 One-Click Direct Navigation Cards */}
      <div className="bg-[#24211E] text-white px-5 sm:px-7 py-3 border-b border-neutral-800">
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <Navigation2 className="w-4 h-4 text-[#C2A55D] animate-pulse" />
            <span className="text-xs font-bold text-[#E5E2DA] uppercase tracking-wider">
              {language === 'ar' ? 'إحداثيات GPS المباشرة (انقر للتوجه فورا)' : language === 'so' ? 'Tilmaamaha GPS ee Tooska ah (Guji si aad toos ugu tagto)' : 'Direct GPS Coordinates (Click to Navigate Instantly)'}
            </span>
          </div>
          <span className="text-[11px] text-[#A8A39A] hidden sm:inline">
            4 Landmark Projects in Hargeisa
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {HARGEISA_ZONES.map((zone) => {
            const isSelected = activeZoneId === zone.id;
            return (
              <div 
                key={zone.id}
                onClick={() => setActiveZoneId(zone.id)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                  isSelected 
                    ? 'bg-neutral-800/90 border-[#C2A55D] shadow-md ring-1 ring-[#C2A55D]' 
                    : 'bg-neutral-900/60 border-neutral-700/80 hover:bg-neutral-800/60 hover:border-neutral-600'
                }`}
              >
                <div className="flex items-start justify-between gap-1.5">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: zone.color }}></span>
                      <span className="text-xs font-bold text-white truncate max-w-[140px]">
                        {zone.name.split(' ')[0]} {zone.name.split(' ')[1] || ''}
                      </span>
                    </div>
                    <div className="text-[10px] text-gray-400 font-mono mt-0.5 truncate">
                      📍 {zone.coordinatesDms}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 pt-1 border-t border-white/10">
                  <a
                    href={zone.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 py-1 px-2 rounded-lg bg-[#C2A55D] hover:bg-[#B3954C] text-neutral-950 font-bold text-[10px] flex items-center justify-center gap-1 transition-colors shadow-xs"
                    title="Ku fur Google Maps si aad toos ugu tagto"
                  >
                    <Car className="w-3 h-3" />
                    <span>Toos u Tag</span>
                  </a>
                  
                  <button
                    type="button"
                    onClick={(e) => handleCopyGps(zone.coordinatesDms, e)}
                    className="py-1 px-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-gray-300 hover:text-white text-[10px] flex items-center gap-1 border border-neutral-600 transition-colors"
                    title="Koobiyeey GPS Coords"
                  >
                    {copiedGps === zone.coordinatesDms ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* District Selector & Search Bar */}
      <div className="px-5 sm:px-7 py-3 bg-[#F4F1EA] border-b border-[#E5E2DA] flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs font-bold text-[#35322E] flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#C2A55D]" />
            <span>Goobaha:</span>
          </span>
          <button
            onClick={() => setFilterDistrict('all')}
            className={`px-3 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer ${
              filterDistrict === 'all'
                ? 'bg-[#1F1D1A] text-white'
                : 'bg-white text-[#6B665E] hover:text-[#1A1A1A] border border-[#E5E2DA]'
            }`}
          >
            Dhammaan (All)
          </button>
          <button
            onClick={() => setFilterDistrict('Jigjiga Yar (Buurta Kala-jeexan)')}
            className={`px-3 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer ${
              filterDistrict === 'Jigjiga Yar (Buurta Kala-jeexan)'
                ? 'bg-[#0D9488] text-white'
                : 'bg-white text-[#6B665E] hover:text-[#1A1A1A] border border-[#E5E2DA]'
            }`}
          >
            Aragsan (Buurta Kala-jeexan)
          </button>
          <button
            onClick={() => setFilterDistrict('Masallaha')}
            className={`px-3 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer ${
              filterDistrict === 'Masallaha'
                ? 'bg-[#C2A55D] text-white'
                : 'bg-white text-[#6B665E] hover:text-[#1A1A1A] border border-[#E5E2DA]'
            }`}
          >
            Masallaha (Rugsan & Towers)
          </button>
          <button
            onClick={() => setFilterDistrict('Airport Corridor')}
            className={`px-3 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer ${
              filterDistrict === 'Airport Corridor'
                ? 'bg-[#854D0E] text-white'
                : 'bg-white text-[#6B665E] hover:text-[#1A1A1A] border border-[#E5E2DA]'
            }`}
          >
            Bilicsan (Airport Highway)
          </button>
        </div>

        {/* Search input for map */}
        <div className="relative min-w-[220px] hidden md:block">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Raadi magac ama GPS..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#E5E2DA] rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C2A55D]"
          />
        </div>
      </div>

      {/* Main Grid: Interactive Canvas/GPS Hub (Left 7/12) + Live Project Panel (Right 5/12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Column Container */}
        <div className="lg:col-span-7 bg-[#F4F1EA]/60 p-4 sm:p-6 relative flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-[#E5E2DA] min-h-[500px]">
          
          {viewMode === 'satellite' ? (
            /* LIVE SATELLITE & GPS NAVIGATION HUB */
            <div className="w-full h-full min-h-[460px] bg-[#1A1815] rounded-2xl p-4 sm:p-6 text-white flex flex-col justify-between border border-neutral-700 shadow-inner">
              <div>
                <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-[#C2A55D]" />
                    <h4 className="font-serif-luxury text-lg text-white">
                      Hargeisa Satellite & Live GPS Navigator
                    </h4>
                  </div>
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#C2A55D]/20 text-[#C2A55D] border border-[#C2A55D]/40 font-mono">
                    WGS84 Coordinates
                  </span>
                </div>

                <p className="text-xs text-gray-300 mb-4 leading-relaxed font-light">
                  Dooro mashruuc si aad toos ugu furto khariidadda Google Maps ama Apple Maps ee taleefankaaga, iyadoo lagu siinayo jidka ugu dhow (Turn-by-turn navigation):
                </p>

                {/* 4 Large Destination Cards */}
                <div className="space-y-3">
                  {HARGEISA_ZONES.map((zone) => {
                    const isSelected = activeZoneId === zone.id;
                    return (
                      <div 
                        key={zone.id}
                        onClick={() => setActiveZoneId(zone.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          isSelected 
                            ? 'bg-neutral-800 border-[#C2A55D] shadow-lg ring-1 ring-[#C2A55D]' 
                            : 'bg-neutral-900/80 border-neutral-800 hover:bg-neutral-800/80 hover:border-neutral-700'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: zone.color }} />
                            <h5 className="font-bold text-sm text-white">{zone.name}</h5>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-gray-300 border border-neutral-700 font-mono">
                              {zone.district}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs font-mono text-[#C2A55D]">
                            <MapPin className="w-3.5 h-3.5 text-[#C2A55D]" />
                            <span>GPS: {zone.coordinatesDms}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={zone.directionsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2 px-3.5 rounded-xl bg-[#C2A55D] hover:bg-[#B3954C] text-neutral-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                          >
                            <Navigation className="w-3.5 h-3.5" />
                            <span>Toos u Tag (Google Maps)</span>
                            <ExternalLink className="w-3 h-3 ml-0.5" />
                          </a>

                          <button
                            type="button"
                            onClick={(e) => handleCopyGps(zone.coordinatesDms, e)}
                            className="py-2 px-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-gray-300 hover:text-white border border-neutral-700 text-xs transition-colors"
                            title="Koobiyeey GPS"
                          >
                            {copiedGps === zone.coordinatesDms ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                <span>Telesom Group • Kaabsan Real Estate GPS Mapping Service</span>
                <span className="text-[#C2A55D] flex items-center gap-1 font-mono text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Live GPS WGS84
                </span>
              </div>
            </div>
          ) : (
            /* INTERACTIVE SVG MAP */
            <>
              {/* Compass Rose Floating Badge */}
              <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-md px-3 py-2 rounded-2xl border border-[#E5E2DA] shadow-sm flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#1F1D1A] flex items-center justify-center text-white text-[10px] font-bold font-mono">
                  N
                </div>
                <div className="text-[10px] leading-tight">
                  <span className="font-bold text-[#1A1A1A] block">Hargeisa Master Layout</span>
                  <span className="text-[#8C867D]">GPS Calibrated Grid</span>
                </div>
              </div>

              {/* Active Zone GPS Live Indicator Badge */}
              <div className="absolute top-6 right-6 z-10 bg-[#1F1D1A]/90 text-white backdrop-blur-md px-3 py-1.5 rounded-2xl border border-[#C2A55D] shadow-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full animate-ping bg-[#C2A55D]" />
                <span className="text-[11px] font-mono text-[#C2A55D] font-bold">
                  {activeZone.coordinatesDms}
                </span>
              </div>

              {/* SVG Map Canvas */}
              <svg 
                viewBox="0 0 1000 650" 
                className="w-full h-auto max-h-[560px] drop-shadow-md transition-all duration-300"
                style={{ filter: 'contrast(1.03)' }}
              >
                <defs>
                  {/* Background Grid Pattern */}
                  <pattern id="hga-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E5E0D5" strokeWidth="0.8" strokeDasharray="3 3" />
                  </pattern>
                  
                  {/* Topographic Contour Lines Pattern */}
                  <pattern id="topographic-hills" width="120" height="120" patternUnits="userSpaceOnUse">
                    <path d="M 0 60 Q 30 20, 60 60 T 120 60" fill="none" stroke="#D8D1C3" strokeWidth="1" opacity="0.6" />
                    <path d="M 0 90 Q 40 50, 80 90 T 160 90" fill="none" stroke="#E2DCD0" strokeWidth="0.8" opacity="0.4" />
                  </pattern>

                  {/* Glowing Drop Shadows for Interactive Zones */}
                  <filter id="glow-gold" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#C2A55D" floodOpacity="0.4" />
                  </filter>
                  <filter id="glow-teal" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#0D9488" floodOpacity="0.4" />
                  </filter>
                  <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#4F46E5" floodOpacity="0.4" />
                  </filter>
                </defs>

                {/* Background Base */}
                <rect width="1000" height="650" fill="#F8F6F1" rx="24" />
                <rect width="1000" height="650" fill="url(#hga-grid)" rx="24" />
                <rect width="1000" height="650" fill="url(#topographic-hills)" rx="24" />

                {/* Hillside Topography (Buurta Kala-jeexan & Northern Ridge) */}
                <path
                  d="M 120 40 Q 280 20 440 60 T 700 80 Q 850 120 950 60 L 950 0 L 100 0 Z"
                  fill="#EDE8DD"
                  opacity="0.7"
                />
                <text x="240" y="55" fill="#8C8476" fontSize="13" fontWeight="bold" letterSpacing="3" fontFamily="sans-serif">
                  ⛰️ BUURTA KALA-JEEXAN & JIGJIGA YAR HILLS
                </text>

                {/* Dooxa Hargeysa (Dry River Valley Running East-West) */}
                <path
                  d="M 0 310 Q 220 280 430 330 T 780 290 Q 900 320 1000 300 L 1000 340 Q 880 360 760 330 T 410 370 Q 200 320 0 350 Z"
                  fill="#E0D8C8"
                  stroke="#D2C8B5"
                  strokeWidth="1.5"
                />
                <text x="60" y="335" fill="#998F7D" fontSize="11" fontWeight="600" letterSpacing="2" fontFamily="sans-serif">
                  〰️ DOOXA HARGEISA (CENTRAL GREEN CORRIDOR)
                </text>

                {/* Egal International Airport Runway (HGA) */}
                <g transform="translate(680, 480) rotate(-22)">
                  <rect x="0" y="0" width="260" height="26" fill="#4B4842" rx="4" />
                  <line x1="10" y1="13" x2="250" y2="13" stroke="#FFFFFF" strokeWidth="2.5" strokeDasharray="12 8" />
                  <rect x="0" y="0" width="14" height="26" fill="#F3F0E6" opacity="0.8" />
                  <rect x="246" y="0" width="14" height="26" fill="#F3F0E6" opacity="0.8" />
                  <text x="80" y="17" fill="#FFFFFF" fontSize="10" fontWeight="bold" letterSpacing="2">
                    EGAL INT. AIRPORT (HGA)
                  </text>
                </g>
                <circle cx="760" cy="460" r="10" fill="#35322E" stroke="#FFFFFF" strokeWidth="2" />
                <text x="778" y="464" fill="#4B4842" fontSize="10" fontWeight="bold">
                  ✈️ Airport Terminal Area
                </text>

                {/* Major Arterial Roads & Highways */}
                {/* 1. Airport Road (Jidka Madaarka) */}
                <path
                  d="M 400 340 L 520 400 L 680 470 L 920 540"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <path
                  d="M 400 340 L 520 400 L 680 470 L 920 540"
                  fill="none"
                  stroke="#5A554C"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
                <path
                  d="M 400 340 L 520 400 L 680 470 L 920 540"
                  fill="none"
                  stroke="#F3F0E6"
                  strokeWidth="1.5"
                  strokeDasharray="8 6"
                />
                <text x="500" y="375" fill="#5A554C" fontSize="10" fontWeight="bold" transform="rotate(26, 500, 375)">
                  🛣️ AIRPORT HIGHWAY (MASALLAHA CORRIDOR)
                </text>

                {/* 2. Jigjiga Yar / Kala-jeexan Avenue */}
                <path
                  d="M 160 260 L 260 200 L 360 140 L 480 80"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="9"
                  strokeLinecap="round"
                />
                <path
                  d="M 160 260 L 260 200 L 360 140 L 480 80"
                  fill="none"
                  stroke="#5A554C"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path
                  d="M 160 260 L 260 200 L 360 140 L 480 80"
                  fill="none"
                  stroke="#F3F0E6"
                  strokeWidth="1.2"
                  strokeDasharray="6 6"
                />
                <text x="210" y="215" fill="#5A554C" fontSize="10" fontWeight="bold" transform="rotate(-30, 210, 215)">
                  🛣️ JIGJIGA YAR AVENUE (TO BUURTA KALA-JEEXAN)
                </text>

                {/* 3. Masallaha Ring Boulevard */}
                <path
                  d="M 460 520 L 540 430 L 640 370 L 760 330 L 880 290"
                  fill="none"
                  stroke="#DFD8CA"
                  strokeWidth="6"
                  strokeLinecap="round"
                />

                {/* 1. ZONE 1: ARAGSAN VILLAGE (BUURTA KALA-JEEXAN) */}
                <g 
                  className="cursor-pointer transition-all duration-300 group"
                  onClick={() => setActiveZoneId('zone-aragsan')}
                  onMouseEnter={() => setActiveZoneId('zone-aragsan')}
                >
                  {/* Zone Polygon Boundary */}
                  <polygon
                    points="210,120 400,90 450,210 320,260 180,200"
                    fill={activeZoneId === 'zone-aragsan' ? '#0D9488' : '#C7E4DF'}
                    fillOpacity={activeZoneId === 'zone-aragsan' ? 0.35 : 0.22}
                    stroke="#0D9488"
                    strokeWidth={activeZoneId === 'zone-aragsan' ? 3.5 : 2}
                    filter={activeZoneId === 'zone-aragsan' ? 'url(#glow-teal)' : undefined}
                    className="transition-all duration-300"
                  />

                  {/* Parcels Layer */}
                  <g opacity={viewMode === 'plots' || activeZoneId === 'zone-aragsan' ? 1 : 0.45}>
                    {HARGEISA_ZONES[0].plots.map((plot) => (
                      <g 
                        key={plot.id}
                        className="transition-transform hover:scale-125 duration-150 cursor-pointer"
                        onMouseEnter={(e) => {
                          e.stopPropagation();
                          setActiveZoneId('zone-aragsan');
                          setHoveredPlot({
                            id: plot.id,
                            label: `${plot.label} • Aragsan Village`,
                            zoneName: 'Aragsan Village',
                            status: plot.status,
                            size: plot.size,
                            price: '$292,508.40',
                            coordinates: '9°34\'33.29"N 44° 0\'31.24"E'
                          });
                        }}
                        onMouseLeave={() => setHoveredPlot(null)}
                      >
                        <rect
                          x={plot.x - 14}
                          y={plot.y - 10}
                          width="28"
                          height="20"
                          rx="4"
                          fill={plot.status === 'VIP' ? '#C2A55D' : plot.status === 'Ready' ? '#10B981' : '#0D9488'}
                          stroke="#FFFFFF"
                          strokeWidth="1.2"
                        />
                        <text x={plot.x} y={plot.y + 4} fontSize="7.5" fill="#FFFFFF" fontWeight="bold" textAnchor="middle">
                          {plot.label.replace('Villa ', 'V-')}
                        </text>
                      </g>
                    ))}
                  </g>

                  {/* Marker Pin & GPS Tag */}
                  <g transform="translate(320, 165)">
                    <circle cx="0" cy="0" r="16" fill="#0D9488" stroke="#FFFFFF" strokeWidth="3" />
                    <Building2 className="w-4 h-4 text-white" x="-8" y="-8" />
                    {/* Zone Label Floating Box */}
                    <rect x="-95" y="-38" width="190" height="24" rx="12" fill="#1F1D1A" stroke="#0D9488" strokeWidth="1.5" />
                    <text x="0" y="-22" fill="#FFFFFF" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                      📍 ARAGSAN (9°34'33.29"N 44° 0'31.24"E)
                    </text>
                  </g>
                </g>

                {/* 2. ZONE 2: RUGSAN GARDENS (MASALLAHA) */}
                <g 
                  className="cursor-pointer transition-all duration-300 group"
                  onClick={() => setActiveZoneId('zone-rugsan')}
                  onMouseEnter={() => setActiveZoneId('zone-rugsan')}
                >
                  {/* Zone Boundary */}
                  <polygon
                    points="530,370 670,330 730,420 620,470 520,430"
                    fill={activeZoneId === 'zone-rugsan' ? '#C2A55D' : '#EDE4CF'}
                    fillOpacity={activeZoneId === 'zone-rugsan' ? 0.4 : 0.25}
                    stroke="#C2A55D"
                    strokeWidth={activeZoneId === 'zone-rugsan' ? 3.5 : 2}
                    filter={activeZoneId === 'zone-rugsan' ? 'url(#glow-gold)' : undefined}
                    className="transition-all duration-300"
                  />

                  {/* Parcels Layer */}
                  <g opacity={viewMode === 'plots' || activeZoneId === 'zone-rugsan' ? 1 : 0.45}>
                    {HARGEISA_ZONES[1].plots.map((plot) => (
                      <g 
                        key={plot.id}
                        className="transition-transform hover:scale-125 duration-150 cursor-pointer"
                        onMouseEnter={(e) => {
                          e.stopPropagation();
                          setActiveZoneId('zone-rugsan');
                          setHoveredPlot({
                            id: plot.id,
                            label: `${plot.label} • Rugsan Gardens`,
                            zoneName: 'Rugsan Gardens',
                            status: plot.status,
                            size: plot.size,
                            price: '$225,000',
                            coordinates: '9°31\'12.40"N 44° 3\'54.09"E'
                          });
                        }}
                        onMouseLeave={() => setHoveredPlot(null)}
                      >
                        <rect
                          x={plot.x - 13}
                          y={plot.y - 9}
                          width="26"
                          height="18"
                          rx="3"
                          fill={plot.status === 'Reserved' ? '#94A3B8' : plot.status === 'Ready' ? '#10B981' : '#C2A55D'}
                          stroke="#FFFFFF"
                          strokeWidth="1.2"
                        />
                        <text x={plot.x} y={plot.y + 3.5} fontSize="7" fill="#FFFFFF" fontWeight="bold" textAnchor="middle">
                          {plot.label.replace('Plot ', 'P-')}
                        </text>
                      </g>
                    ))}
                  </g>

                  {/* Marker Pin & GPS Tag */}
                  <g transform="translate(625, 410)">
                    <circle cx="0" cy="0" r="16" fill="#C2A55D" stroke="#FFFFFF" strokeWidth="3" />
                    <Building2 className="w-4 h-4 text-white" x="-8" y="-8" />
                    {/* Zone Label Floating Box */}
                    <rect x="-95" y="-38" width="190" height="24" rx="12" fill="#1F1D1A" stroke="#C2A55D" strokeWidth="1.5" />
                    <text x="0" y="-22" fill="#FFFFFF" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                      📍 RUGSAN (9°31'12.40"N 44° 3'54.09"E)
                    </text>
                  </g>
                </g>

                {/* 3. ZONE 3: BILICSAN VILLAGE (AIRPORT CORRIDOR) */}
                <g 
                  className="cursor-pointer transition-all duration-300 group"
                  onClick={() => setActiveZoneId('zone-bilicsan')}
                  onMouseEnter={() => setActiveZoneId('zone-bilicsan')}
                >
                  {/* Zone Boundary */}
                  <polygon
                    points="710,210 830,190 880,290 770,320"
                    fill={activeZoneId === 'zone-bilicsan' ? '#854D0E' : '#E8DFD3'}
                    fillOpacity={activeZoneId === 'zone-bilicsan' ? 0.35 : 0.22}
                    stroke="#854D0E"
                    strokeWidth={activeZoneId === 'zone-bilicsan' ? 3.5 : 2}
                    className="transition-all duration-300"
                  />

                  {/* Parcels Layer */}
                  <g opacity={viewMode === 'plots' || activeZoneId === 'zone-bilicsan' ? 1 : 0.45}>
                    {HARGEISA_ZONES[2].plots.map((plot) => (
                      <g 
                        key={plot.id}
                        className="transition-transform hover:scale-125 duration-150 cursor-pointer"
                        onMouseEnter={(e) => {
                          e.stopPropagation();
                          setActiveZoneId('zone-bilicsan');
                          setHoveredPlot({
                            id: plot.id,
                            label: `${plot.label} • Bilicsan Village`,
                            zoneName: 'Bilicsan Village',
                            status: plot.status,
                            size: plot.size,
                            price: '$275,000+',
                            coordinates: '9°31\'35.15"N 44° 4\'5.42"E'
                          });
                        }}
                        onMouseLeave={() => setHoveredPlot(null)}
                      >
                        <rect
                          x={plot.x - 13}
                          y={plot.y - 9}
                          width="26"
                          height="18"
                          rx="3"
                          fill={plot.status === 'Ready' ? '#10B981' : '#854D0E'}
                          stroke="#FFFFFF"
                          strokeWidth="1.2"
                        />
                        <text x={plot.x} y={plot.y + 3} fontSize="7" fill="#FFFFFF" fontWeight="bold" textAnchor="middle">
                          {plot.label.replace('Villa ', 'B-')}
                        </text>
                      </g>
                    ))}
                  </g>

                  {/* Marker Pin & GPS Tag */}
                  <g transform="translate(800, 250)">
                    <circle cx="0" cy="0" r="15" fill="#854D0E" stroke="#FFFFFF" strokeWidth="3" />
                    <Building2 className="w-4 h-4 text-white" x="-8" y="-8" />
                    {/* Zone Label Floating Box */}
                    <rect x="-95" y="-38" width="190" height="24" rx="12" fill="#1F1D1A" stroke="#854D0E" strokeWidth="1.5" />
                    <text x="0" y="-22" fill="#FFFFFF" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                      📍 BILICSAN (9°31'35.15"N 44° 4'5.42"E)
                    </text>
                  </g>
                </g>

                {/* 4. ZONE 4: MASALLAHA LUXURY TOWERS (G+6) */}
                <g 
                  className="cursor-pointer transition-all duration-300 group"
                  onClick={() => setActiveZoneId('zone-masalaha-apts')}
                  onMouseEnter={() => setActiveZoneId('zone-masalaha-apts')}
                >
                  {/* Zone Boundary */}
                  <polygon
                    points="430,430 530,410 560,510 460,530"
                    fill={activeZoneId === 'zone-masalaha-apts' ? '#4F46E5' : '#DFDEEE'}
                    fillOpacity={activeZoneId === 'zone-masalaha-apts' ? 0.35 : 0.2}
                    stroke="#4F46E5"
                    strokeWidth={activeZoneId === 'zone-masalaha-apts' ? 3.5 : 2}
                    filter={activeZoneId === 'zone-masalaha-apts' ? 'url(#glow-blue)' : undefined}
                    className="transition-all duration-300"
                  />

                  {/* Marker Pin & GPS Tag */}
                  <g transform="translate(485, 465)">
                    <circle cx="0" cy="0" r="16" fill="#4F46E5" stroke="#FFFFFF" strokeWidth="3" />
                    <Building2 className="w-4 h-4 text-white" x="-8" y="-8" />
                    {/* Zone Label Floating Box */}
                    <rect x="-100" y="-38" width="200" height="24" rx="12" fill="#1F1D1A" stroke="#4F46E5" strokeWidth="1.5" />
                    <text x="0" y="-22" fill="#FFFFFF" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                      📍 MASALLAHA (9°31'48.59"N 44° 4'52.72"E)
                    </text>
                  </g>
                </g>

              </svg>

              {/* Interactive Plot Hover Floating Tooltip */}
              {hoveredPlot && (
                <div className="absolute top-20 right-8 z-30 bg-[#1F1D1A]/95 text-white p-3.5 rounded-2xl border border-[#C2A55D] shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-150 max-w-xs pointer-events-none">
                  <div className="flex items-center justify-between gap-2 border-b border-neutral-700 pb-1.5 mb-1.5">
                    <span className="text-xs font-bold text-[#C2A55D]">{hoveredPlot.label}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {hoveredPlot.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono mb-2">
                    <div>
                      <span className="text-gray-400 block text-[9px] font-sans">Plot Area:</span>
                      <span className="font-bold">{hoveredPlot.size}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[9px] font-sans">Base Price:</span>
                      <span className="font-bold text-[#C2A55D]">{hoveredPlot.price}</span>
                    </div>
                  </div>
                  {hoveredPlot.coordinates && (
                    <div className="text-[10px] text-gray-300 font-mono border-t border-neutral-700/80 pt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#C2A55D]" />
                      <span>GPS: {hoveredPlot.coordinates}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Bottom Map Legend */}
              <div className="absolute bottom-4 left-4 right-4 z-10 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#E5E2DA] shadow-sm flex flex-wrap items-center justify-between gap-3 text-[11px]">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#0D9488]" />
                    <span className="font-semibold text-[#1A1A1A]">Aragsan (Buurta Kala-jeexan)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#C2A55D]" />
                    <span className="font-semibold text-[#1A1A1A]">Rugsan (Masallaha)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#854D0E]" />
                    <span className="font-semibold text-[#1A1A1A]">Bilicsan (Airport Rd)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#4F46E5]" />
                    <span className="font-semibold text-[#1A1A1A]">Masallaha Towers</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[#6B665E] font-medium">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Available
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-slate-400"></span> Reserved
                  </span>
                </div>
              </div>
            </>
          )}

        </div>

        {/* Live Project Detail & GPS Flyout (Right 5/12) */}
        <div className="lg:col-span-5 p-6 sm:p-7 flex flex-col justify-between space-y-5 bg-white">
          
          {/* Active Zone Header Card */}
          <div className="space-y-4">
            
            {/* Top Project Selector Tabs */}
            <div className="grid grid-cols-4 gap-1.5 p-1 bg-[#FAF8F5] rounded-2xl border border-[#E5E2DA]">
              {HARGEISA_ZONES.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => setActiveZoneId(zone.id)}
                  className={`py-1.5 px-1 text-[11px] font-bold rounded-xl transition-all truncate text-center cursor-pointer ${
                    activeZoneId === zone.id
                      ? 'bg-[#1F1D1A] text-white shadow-xs'
                      : 'text-[#6B665E] hover:text-[#1A1A1A]'
                  }`}
                  title={zone.name}
                >
                  {zone.name.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Image & Main Info */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-[#EAE6DE] shadow-sm border border-[#E5E2DA] group">
              <img
                src={activeZone.image}
                alt={activeZone.name}
                onError={(e) => {
                  const fallback = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
                  if (e.currentTarget.src !== fallback) {
                    e.currentTarget.src = fallback;
                  }
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              
              <div className="absolute top-3 left-3 bg-[#1F1D1A]/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                {activeZone.plotCount}
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <div className="flex items-center gap-1.5 text-xs text-white/90 mb-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#D1B898]" />
                  <span>{activeZone.location}</span>
                </div>
                <h4 className="font-serif-luxury text-xl font-normal text-white leading-tight">
                  {language === 'ar' ? activeZone.nameAr : language === 'so' ? activeZone.nameSo : activeZone.name}
                </h4>
              </div>
            </div>

            {/* DEDICATED GPS & DIRECT NAVIGATION CARD */}
            <div className="bg-[#1A1815] text-white p-3.5 rounded-2xl border border-[#C2A55D]/60 shadow-md space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#C2A55D]">
                  <Navigation2 className="w-4 h-4 text-[#C2A55D]" />
                  <span>Tilmaamaha Goobta & GPS (Direct Coordinates)</span>
                </div>
                <span className="text-[10px] text-gray-400 font-mono">Hargeisa, Somaliland</span>
              </div>

              <div className="bg-black/50 p-2 rounded-xl border border-white/10 flex items-center justify-between gap-2">
                <div className="font-mono text-xs text-white font-semibold flex items-center gap-1.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-[#C2A55D] shrink-0" />
                  <span className="truncate">{activeZone.coordinatesDms}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyGps(activeZone.coordinatesDms)}
                  className="py-1 px-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-gray-300 hover:text-white border border-neutral-600 transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
                  title="Koobiyeey GPS"
                >
                  {copiedGps === activeZone.coordinatesDms ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-[10px] text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span className="text-[10px]">Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Direct Navigation Button */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={activeZone.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-[#C2A55D] hover:bg-[#B3954C] text-neutral-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm text-center cursor-pointer"
                >
                  <Car className="w-3.5 h-3.5" />
                  <span>Toos u Tag (Google Maps)</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>

                <a
                  href={activeZone.appleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-neutral-600 text-center cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5 text-[#C2A55D]" />
                  <span>Apple Maps</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            </div>

            {/* Metrics Matrix */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-[#E5E2DA]">
                <span className="text-[10px] text-[#8C867D] block font-medium">{language === 'ar' ? 'السعر وخطة السداد' : language === 'so' ? 'Qiimaha Rasmiga ah' : 'Pricing & Terms'}</span>
                <span className="text-xs sm:text-sm font-extrabold text-[#C2A55D] block mt-0.5">{activeZone.priceStart}</span>
                <span className="text-[10px] text-emerald-700 block mt-0.5">✓ 0% Bank Markup (Cash)</span>
              </div>
              <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-[#E5E2DA]">
                <span className="text-[10px] text-[#8C867D] block font-medium">Qorshaha 5-ta Sano (60 Mo)</span>
                <span className="text-xs font-extrabold text-[#1A1A1A] block">{activeZone.monthlyInstallment}</span>
                <span className="text-[10px] text-[#8C867D]">{activeZone.downPayment}</span>
              </div>
              <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-[#E5E2DA]">
                <span className="text-[10px] text-[#8C867D] block font-medium">Cabbirka Booska (Plot Size)</span>
                <span className="text-xs font-bold text-[#1A1A1A]">{activeZone.plotSize}</span>
              </div>
              <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-[#E5E2DA]">
                <span className="text-[10px] text-[#8C867D] block font-medium">Bedka Dhismaha (Built Area)</span>
                <span className="text-xs font-bold text-[#1A1A1A]">{activeZone.builtArea}</span>
              </div>
            </div>

            {/* Key Infrastructure & Amenities */}
            <div className="space-y-1.5 pt-1">
              <span className="text-xs font-bold text-[#1A1A1A] block">
                Adeegyada & Kaabayaasha Mashruuca:
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {activeZone.amenities.map((am, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-xs text-[#35322E]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C2A55D] flex-shrink-0" />
                    <span className="truncate">{am}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-3 border-t border-[#E5E2DA]">
            <button
              onClick={() => onSelectMasterCommunity(activeZone.communityId)}
              className="w-full py-3 bg-[#35322E] hover:bg-[#1F1D1A] text-white text-xs font-bold rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>{language === 'ar' ? 'عرض تفاصيل المشروع والمخطط' : language === 'so' ? 'Bogga Mashruuca & Naqshadda (View Project)' : 'View Project Blueprint & Masterplan'}</span>
              <ArrowRight className="w-4 h-4 text-[#C2A55D] group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onOpenScheduleTour(activeZone.name)}
                className="py-2.5 bg-[#FAF8F5] hover:bg-[#EFECE6] text-[#35322E] border border-[#E5E2DA] text-xs font-bold rounded-xl transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-[#C2A55D]" />
                <span>{language === 'ar' ? 'حجز زيارة' : language === 'so' ? 'Ballan Kormeer' : 'Book Site Tour'}</span>
              </button>
              <a
                href={`https://wa.me/252636100090?text=${encodeURIComponent(`Kaabsan Real Estate Official Website:\nAsc Kaabsan Real Estate, waxaan rabaa faahfaahinta qiimaha iyo boosaska ${activeZone.name} (GPS: ${activeZone.coordinatesDms}).`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-extrabold rounded-xl transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'استفسار واتساب' : language === 'so' ? 'WhatsApp Inquiry' : 'WhatsApp Inquiry'}</span>
              </a>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
