import { Property, Neighborhood, TeamMember, PressArticle, NotableSale, MasterCommunity } from '../types';

export const MASTER_COMMUNITIES: MasterCommunity[] = [
  {
    id: 'rugsan-gardens',
    name: 'Rugsan Gardens',
    location: 'Masallaha - Airport Road Corridor, Hargeisa',
    units: '70 Modern Townhouses + DSQ (Guryo Iib Diyaar ah)',
    status: 'Guryo Iib Diyaar ah • Kaabsan Direct Sale',
    description: 'The landmark gated master community in Masallaha near Egal International Airport. Comprising 70 contemporary 5 & 6-bedroom townhouses + DSQ (Plot: 400 m², Built Area: 321 m², Price: $225,000) with private resident gym, kindergarten, paved avenues, and 24/7 security gatehouse.',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=85'
    ],
    price: 225000,
    priceDisplay: '$225,000',
    actualSqm: 400,
    builtArea: 321,
    gpsDms: '9°31\'12.40"N 44° 3\'54.09"E',
    gpsCoordinates: { lat: 9.520111, lng: 44.065025 },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=9.520111,44.065025',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=9.520111,44.065025',
    features: [
      'Price: $225,000 (Available for Purchase)',
      'GPS: 9°31\'12.40"N 44° 3\'54.09"E (Masallaha)',
      'Plot: 400 m² | Built Area: 321 m²',
      '70 Modern Townhouses + DSQ',
      '5 & 6 Bedroom Master Ensuite + DSQ',
      'Private Resident Gym & Kindergarten',
      'Direct Title Transfer & Full Ownership'
    ]
  },
  {
    id: 'aragsan-village',
    name: 'Aragsan Village',
    location: 'Buurta Kala-jeexan (Jigjiga Yar), Hargeisa',
    units: '66 G+1 Luxury Contemporary Houses (Ready for Purchase)',
    status: 'Guryo Iib Diyaar ah • Kaabsan Direct Sale',
    description: 'Scenic hillside master sanctuary in Jigjiga Yar (Buurta Kala-jeexan) designed by Teamwork Architects for Kaabsan Real Estate (Telesom Group). 66 standalone contemporary G+1 luxury houses. Gross construction area: 361.99 m² (Net interior: 348.39 m² + 114.39 m² panoramic rooftop terrace). Standard plot: 483 m² (up to 562.69 m²). Starting from $292,508.40.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=85'
    ],
    price: 292508.40,
    priceDisplay: '$292,508.40',
    actualSqm: 483,
    builtArea: 362,
    gpsDms: '9°34\'33.29"N 44° 0\'31.24"E',
    gpsCoordinates: { lat: 9.575914, lng: 44.008678 },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=9.575914,44.008678',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=9.575914,44.008678',
    features: [
      'Price: Starting from $292,508.40 (Standard 483 m²)',
      'GPS: 9°34\'33.29"N 44° 0\'31.24"E (Buurta Kala-jeexan)',
      'Villa Typology: G+1 Standalone (6 Bedrooms + Staff Suite)',
      'Gross Const. 361.99 m² | Plot 483 m² (up to 562.69 m²)',
      'Direct Title Transfer & Legal Handover',
      'Preschool (240 students) & Elementary School (120 students)',
      'Commercial Gym, Mosque (120 cap), Sports Turf & Decorative Pools'
    ]
  },
  {
    id: 'bilicsan-village',
    name: 'Bilicsan Village',
    location: 'Masalaha / Airport Highway Corridor, Hargeisa',
    units: '16 Modern Luxury Compound Villas (Typology A: 7 Bedrooms)',
    status: 'Guryo Iib Diyaar ah • Kaabsan Direct Sale',
    description: 'Gated luxury compound enclave of 16 modern executive villas (Typology A: 7 bedrooms, dual kitchens, maid quarters, guard room, and 1st floor office/study). Plot: 450 m² | Built Area: 380 m². Prices range between $275,000 and $336,000.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85'
    ],
    price: 275000,
    priceDisplay: '$275,000 - $336,000',
    priceRange: '$275,000 – $336,000',
    actualSqm: 450,
    builtArea: 380,
    gpsDms: '9°31\'35.15"N 44° 4\'5.42"E',
    gpsCoordinates: { lat: 9.526431, lng: 44.068172 },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=9.526431,44.068172',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=9.526431,44.068172',
    features: [
      'Price Range: $275,000 – $336,000',
      'GPS: 9°31\'35.15"N 44° 4\'5.42"E (Airport Corridor)',
      'Typology A: 7-Bedroom Executive Multi-Level Villa',
      'Plot: 450 m² | Built Area: 380 m²',
      'Dual Kitchens: Inside Luxury Kitchen & Outside Heavy Kitchen',
      'Private Office / Study Room, Maid Suite & Guard Room',
      'Direct Title Transfer & Legal Handover'
    ]
  },
  {
    id: 'masalaha-apartments',
    name: 'Masallaha Luxury Apartments',
    location: 'Masallaha - Airport Road Corridor, Hargeisa',
    units: 'Dual G+6 Residential Towers (Block A & B) • Penthouses & Apartments',
    status: 'Dabaqyo Iib Diyaar ah • Kaabsan Direct Sale',
    description: 'Somaliland’s most advanced multi-story residential towers (Block A & Block B). Features 4-bed rooftop penthouses (272 m²), 4-bed apartments (223.32 m²), 3-bed apartments (158.14 m²), and 2-bed suites (107 – 125 m²). Equipped with 78-car parking facility, modern elevators, 24/7 backup generator, eco-friendly sewage treatment plant (STP), and commercial retail shops.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85'
    ],
    price: 135000,
    priceDisplay: '$135,000 - $285,000',
    priceRange: '$135,000 – $285,000',
    actualSqm: 272,
    builtArea: 272,
    gpsDms: '9°31\'48.59"N 44° 4\'52.72"E',
    gpsCoordinates: { lat: 9.530164, lng: 44.081311 },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=9.530164,44.081311',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=9.530164,44.081311',
    features: [
      'GPS: 9°31\'48.59"N 44° 4\'52.72"E (Masallaha)',
      '5-Bed Penthouse: 272 m² | 4-Bed: 223.32 m²',
      '3-Bed: 158.14 m² | 2-Bed: 107 – 125 m²',
      '78-Car Parking Facility (Resident & Commercial)',
      'Dual High-Speed Elevators & 24/7 Backup Generator',
      'Eco-Friendly STP Sewage Treatment & Retail Shops',
      'Direct Title Transfer & Legal Handover'
    ]
  }
];

export const PROPERTIES: Property[] = [
  {
    id: 'kaabsan-01',
    title: 'Rugsan Gardens Master Community',
    subtitle: 'Masallaha (Airport Road) - 70 Luxury Townhouses + DSQ (Guryo Iib ah)',
    address: 'Rugsan Gardens Avenue, Masallaha (Airport Corridor)',
    city: 'Hargeisa',
    neighborhood: 'Masalaha',
    state: 'Somaliland',
    zip: '00000',
    price: 225000,
    priceDisplay: '$225,000',
    actualSqm: 400,
    builtArea: 321,
    status: 'For Sale',
    beds: 6,
    baths: 6,
    sqft: 3455, // ~321 sqm
    lotSize: '400 m² (Total Area: 400 SQM)',
    yearBuilt: 2025,
    architecturalStyle: 'Contemporary Urban Townhouse',
    heroImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'The landmark gated community by Kaabsan Real Estate. 70 contemporary townhouses + DSQ (5 & 6 bedroom master ensuite, plot: 400 m², built area: 321 m²) with private gym, kindergarten, jogging paths, standby generator, and 24/7 gatehouse security. Available with 60-month Islamic installment financing (30% down payment).',
    keyFeatures: [
      'Price: $225,000 (Available for Purchase)',
      'Total Plot: 400 m² | Built Area: 321 m²',
      'Status: Guryo Iib Diyaar ah (Ready for Purchase)',
      '70 Contemporary Modern Town Houses + DSQ',
      '5 & 6 Bedroom Townhouses (Master Ensuite)',
      'Location: Masallaha (Airport Road Corridor)',
      'Kindergarten & Children’s Play Area',
      'Jogging Path & Multi-Purpose Commercial Gym',
      'Borehole Water & Standby Backup Generator',
      '24/7 Security Gatehouse & CCTV Surveillance',
      '5-Year (60-Month) Islamic Installment Plan (30% Down Payment)'
    ],
    amenities: ['24/7 Gated Security', 'Community Gym', 'Kids Play Area', 'Paved Roads', 'Water Tank', 'Solar Lighting', 'Balcony', 'Covered Parking', 'Kindergarten', 'Jogging Path'],
    isFeatured: true,
    isMasterProject: true,
    paymentPlan: '5-Year Islamic Financing (30% Down Payment = $67,500 | $2,625/month)',
    agent: {
      name: 'Kaabsan Sales Team',
      title: 'Senior Property Advisor',
      phone: '+252 63 6100090',
      email: 'sales@kaabsan.com',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'
    }
  },
  {
    id: 'kaabsan-02',
    title: 'Aragsan Village Master Luxury Villa (G+1)',
    subtitle: 'Jigjiga Yar (Buurta Kala-jeexan) - 66 Standalone Luxury Houses (Gross Const. 361.99 m²)',
    address: 'Aragsan Village, Jigjiga Yar - Buurta Kala-jeexan',
    city: 'Hargeisa',
    neighborhood: 'Buurta Kala-jeexan',
    state: 'Somaliland',
    zip: '00000',
    price: 292508.40,
    priceDisplay: '$292,508.40',
    actualSqm: 483,
    builtArea: 362,
    villaType: 'G+1',
    status: 'For Sale',
    beds: 6,
    baths: 6,
    sqft: 3896, // ~362 sqm gross
    lotSize: '483 m² (473 - 562.69 m²)',
    yearBuilt: 2025,
    architecturalStyle: 'Modern G+1 Mediterranean Luxury Villa by Teamwork Architects',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Aragsan Village is a premier master-planned hillside villa sanctuary set against the scenic backdrop of Buurta Kala-jeexan in Jigjiga Yar, Hargeisa. Designed by Teamwork Architects for Kaabsan Real Estate (Telesom Group). Comprises 66 standalone contemporary G+1 houses. Gross construction area: 361.99 m² (Ground Floor: 177.28 m², First Floor: 172.87 m², Rooftop Hall: 11.84 m² + 114.39 m² open terrace). Available on 5-year 0% Riba Islamic financing with 30% down payment ($87,752.52) and $3,412.60 monthly installments.',
    floorPlans: [
      { name: 'Ground Floor Plan (Gross: 177.28 m² | Net: 194.99 m²)', area: '177.28 m²', details: 'Double-height Living Room (32.63 m²), Main Kitchen (19.64 m²) + Cooking Area (6.83 m²), Guest Bedroom (18.40 m²) + Bath (5.50 m²), Dining (14.40 m²), Veranda (23.64 m²), Staff Suite (13.08 m²), Storage (5.33 m²)' },
      { name: 'First Floor Plan (Gross: 172.87 m² | Net: 153.40 m²)', area: '172.87 m²', details: 'Master Suite (26.13 m²) + Dressing (3.45 m²) + Bath (4.54 m²), Bedroom 2 (17.31 m²) + Balcony, Bedroom 3 (19.91 m²) + Balcony, Bedroom 4 (12.85 m²), Family TV Lounge (21.56 m²), Laundry (3.94 m²)' },
      { name: 'Rooftop Terrace & Technical Zone', area: '151.88 m²', details: 'Panoramic Outdoor Rooftop Terrace (114.39 m²), Satellite & Solar Panel Technical Zone (30.21 m²), Enclosed Staircase Hall (7.28 m²)' }
    ],
    keyFeatures: [
      'Villa Typology: G+1 Standalone Luxury House (66 Units Total)',
      'Gross Construction Area: 361.99 m² (Ground: 177.28 m², 1st: 172.87 m²)',
      'Outdoor Rooftop Terrace: 114.39 m² (Panoramic City & Mountain Views)',
      'Standard Plot: 483 m² (Variations: 473.34 m² to 562.69 m²)',
      'Price: Starting from $292,508.40',
      '60-Month Islamic Financing (30% Down = $87,752.52 | $3,412.60/month)',
      'Preschool for 240 Students & Elementary School for 120 Students',
      'Commercial Gym, Community Mosque (120 People), Basketball & Football Courts',
      '2 Dedicated Parking Bays per Unit & Decorative Water Pools',
      '24/7 Security Gatehouse & Asphalt Paved Roads'
    ],
    inventoryUnits: [
      { sn: 1, villaNo: 'Villa 33', villaType: 'G+1', actualSqm: 483, builtArea: 362, price: 292508.40, priceDisplay: '$292,508.40', status: 'Available' },
      { sn: 2, villaNo: 'Villa 34', villaType: 'G+1', actualSqm: 483, builtArea: 362, price: 292508.40, priceDisplay: '$292,508.40', status: 'Available' },
      { sn: 3, villaNo: 'Villa 35', villaType: 'G+1', actualSqm: 485.41, builtArea: 362, price: 292867.49, priceDisplay: '$292,867.49', status: 'Available' },
      { sn: 4, villaNo: 'Villa 36', villaType: 'G+1', actualSqm: 483, builtArea: 362, price: 292508.40, priceDisplay: '$292,508.40', status: 'Available' },
      { sn: 5, villaNo: 'Villa 38', villaType: 'G+1', actualSqm: 483, builtArea: 362, price: 292508.40, priceDisplay: '$292,508.40', status: 'Available' },
      { sn: 6, villaNo: 'Villa 39', villaType: 'G+1', actualSqm: 483, builtArea: 362, price: 292508.40, priceDisplay: '$292,508.40', status: 'Available' },
      { sn: 7, villaNo: 'Villa 40', villaType: 'G+1', actualSqm: 485.41, builtArea: 362, price: 292867.49, priceDisplay: '$292,867.49', status: 'Available' },
      { sn: 8, villaNo: 'Villa 41', villaType: 'G+1', actualSqm: 485.41, builtArea: 362, price: 292867.49, priceDisplay: '$292,867.49', status: 'Available' },
      { sn: 9, villaNo: 'Villa 42', villaType: 'G+1', actualSqm: 483, builtArea: 362, price: 292508.40, priceDisplay: '$292,508.40', status: 'Available' },
      { sn: 10, villaNo: 'Villa 43', villaType: 'G+1', actualSqm: 483, builtArea: 362, price: 292508.40, priceDisplay: '$292,508.40', status: 'Available' },
      { sn: 11, villaNo: 'Villa 44', villaType: 'G+1', actualSqm: 483, builtArea: 362, price: 292508.40, priceDisplay: '$292,508.40', status: 'Available' },
      { sn: 12, villaNo: 'Villa 46', villaType: 'G+1', actualSqm: 483, builtArea: 362, price: 292508.40, priceDisplay: '$292,508.40', status: 'Available' },
      { sn: 13, villaNo: 'Villa 47', villaType: 'G+1', actualSqm: 483, builtArea: 362, price: 292508.40, priceDisplay: '$292,508.40', status: 'Available' },
      { sn: 14, villaNo: 'Villa 48', villaType: 'G+1', actualSqm: 483, builtArea: 362, price: 292508.40, priceDisplay: '$292,508.40', status: 'Available' },
      { sn: 15, villaNo: 'Villa 49', villaType: 'G+1', actualSqm: 483, builtArea: 362, price: 292508.40, priceDisplay: '$292,508.40', status: 'Available' },
      { sn: 16, villaNo: 'Villa 53', villaType: 'G+1', actualSqm: 473.34, builtArea: 362, price: 291218.06, priceDisplay: '$291,218.06', status: 'Available' },
      { sn: 17, villaNo: 'Villa 55', villaType: 'G+1', actualSqm: 474.34, builtArea: 362, price: 291218.06, priceDisplay: '$291,218.06', status: 'Available' },
      { sn: 18, villaNo: 'Villa 58', villaType: 'G+1', actualSqm: 506.94, builtArea: 362, price: 296075.46, priceDisplay: '$296,075.46', status: 'Available' },
      { sn: 19, villaNo: 'Villa 60', villaType: 'G+1', actualSqm: 562.69, builtArea: 362, price: 304382.21, priceDisplay: '$304,382.21', status: 'Available' },
      { sn: 20, villaNo: 'Villa 63', villaType: 'G+1', actualSqm: 551.10, builtArea: 362, price: 302655.30, priceDisplay: '$302,655.30', status: 'Available' }
    ],
    amenities: ['Gated Entrance', 'Private Garden', 'Rooftop Terrace (114 m²)', 'Balconies', 'Water Reservoir', 'Modern Kitchen', 'Perimeter Wall', 'Commercial Gym', 'Preschool & Elementary School', 'Basketball Courts'],
    isFeatured: true,
    isMasterProject: true,
    paymentPlan: '5-Year Islamic Financing (30% Down Payment = $87,752.52 | $3,412.60/month)',
    agent: {
      name: 'Kaabsan Sales Team',
      title: 'Senior Property Advisor',
      phone: '+252 63 6100090',
      email: 'sales@kaabsan.com',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
    }
  },
  {
    id: 'kaabsan-03',
    title: 'Bilicsan Village Modern Luxury Compound Villa',
    subtitle: 'Masalaha / Airport Highway Corridor - 16 Executive Compound Villas (Typology A: 7 Bedrooms)',
    address: 'Bilicsan Village, Masalaha Airport Corridor',
    city: 'Hargeisa',
    neighborhood: 'Masalaha',
    state: 'Somaliland',
    zip: '00000',
    price: 275000,
    priceDisplay: '$275,000 - $336,000',
    priceRange: '$275,000 - $336,000',
    actualSqm: 450,
    builtArea: 380,
    status: 'For Sale',
    beds: 7,
    baths: 7,
    sqft: 4090, // ~380 sqm
    lotSize: '450 m²',
    yearBuilt: 2025,
    architecturalStyle: 'Modern Contemporary Compound Villa (Typology A)',
    heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Welcome to Bilicsan Village by Kaabsan Real Estate. Gated compound development of 16 luxury villas (Typology A: 7 Bedrooms, built area: 380 m², plot: 450 m²). Features dual kitchens (inside show kitchen and outside heavy kitchen), dedicated 1st floor office/study, maid suite, and private guard quarters. Prices range between $275,000 and $336,000 with 5-year flexible financing (30% down payment = $82,500).',
    floorPlans: [
      { name: 'Ground Floor Plan (160 m²)', area: '160 m²', details: 'Living & Dining Room overlooking garden, Entrance Lobby, Guest Bedroom with en-suite, Inside Luxury Kitchen & Separate Outside Kitchen, Covered Terrace, Maid Room with bath, Guard room with bath & 2 parking bays.' },
      { name: 'First Floor Plan (150 m²)', area: '150 m²', details: 'Executive Master Suite with private bath & balcony, 3 Family Bedrooms, Dedicated Private Office / Study Room, Spacious Family Living Room.' },
      { name: 'Second Floor Plan (70 m²)', area: '70 m²', details: 'Bedroom 5 with private bathroom, Anteroom / Lounge, and Open Roof Terrace.' }
    ],
    keyFeatures: [
      '16 Luxury Standalone Compound Villas (Typology A)',
      '7 Bedrooms + Private Dedicated Office / Study Room',
      'Plot: 450 m² | Built Area: 380 m²',
      'Dual Kitchens: Inside Luxury Kitchen & Outside Heavy Kitchen',
      '2 Dedicated Parking Bays + Visitor Parking',
      'Integrated Guard Room with Private Bath & Maid Suite with Private Bath',
      'Price Range: $275,000 – $336,000',
      '5-Year Flexible Installment Plan (30% Down Payment = $82,500)',
      'Constructed with High-Grade Kaabsan Ready-Mix Batching Concrete',
      '24/7 Security Gatehouse & 10-Meter Wide Asphalt Internal Roads'
    ],
    amenities: ['Private Courtyard', 'Dual Kitchens', 'Car Parking (2 Slots)', 'Water Reservoir', 'Modern Kitchen', 'Perimeter Wall', 'Dedicated Study Room', 'Maid Room & Guard Room'],
    isFeatured: true,
    isMasterProject: true,
    paymentPlan: '5-Year Flexible Financing (30% Down Payment = $82,500 | 60 Months)',
    agent: {
      name: 'Kaabsan Sales Team',
      title: 'Senior Property Advisor',
      phone: '+252 63 6100090',
      email: 'sales@kaabsan.com',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'
    }
  },
  {
    id: 'kaabsan-04',
    title: 'Masallaha Luxury Apartments & Penthouses',
    subtitle: 'Masallaha (Airport Road Corridor) - Dual G+6 Towers (Block A & B)',
    address: 'Masallaha Luxury Towers, Airport Road Corridor',
    city: 'Hargeisa',
    neighborhood: 'Masalaha',
    state: 'Somaliland',
    zip: '00000',
    price: 135000,
    priceDisplay: '$135,000 - $285,000',
    priceRange: '$135,000 - $285,000',
    status: 'Luxury Apartments',
    beds: 4,
    baths: 4,
    sqft: 2927,
    lotSize: 'Dual G+6 Towers (Block A & B)',
    yearBuilt: 2025,
    architecturalStyle: 'Dual G+6 Residential Towers (Block A & B) by Dara Salaam Bank',
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1800&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Somaliland’s most sophisticated multi-story residential towers situated in the thriving Masallaha district (Airport Road Corridor). Financed by Dara Salaam Bank. Comprises Block A and Block B (G+6) offering 4-bedroom penthouses (272 m²), 4-bedroom typical apartments (223.32 m²), 3-bedroom apartments (158.14 m²), and 2-bedroom units (107 – 125 m²). Features 78-car parking facility, high-speed elevators, standby backup generator, eco-friendly Sewage Treatment Plant (STP), and ground-floor convenience shops.',
    floorPlans: [
      { name: '6th Floor: 4-Bedroom Penthouse', area: '272 sq.m', details: 'Top floor luxury penthouse with wrap-around panoramic terrace overlooking Hargeisa city, 4 master bedrooms with ensuite baths, open-concept salon.' },
      { name: 'Ground to 6th Floor: 4-Bedroom Apartment', area: '223.32 sq.m', details: '4 generous bedrooms with built-in wardrobes, spacious European kitchen, living salon, private balcony & separate utility laundry zone.' },
      { name: '1st to 5th Floor: 3-Bedroom Apartment', area: '158.14 sq.m', details: '3 bedrooms including master ensuite, fitted kitchen, open dining and family lounge, private outdoor balcony.' },
      { name: '2-Bedroom Apartment (Typology A)', area: '113 sq.m', details: '2 bedrooms, modern living area & balcony (Ground to 5th Floor).' },
      { name: '2-Bedroom Apartment (Typology B)', area: '107 sq.m', details: 'Efficient 2-bedroom layout on the 5th floor.' },
      { name: '2-Bedroom Apartment (Typology C)', area: '125 sq.m', details: 'Spacious 2-bedroom corner suite on the 5th floor.' }
    ],
    keyFeatures: [
      'Dual G+6 Residential Towers (Block A & Block B)',
      '4-Bedroom Penthouse: 272 sq.m (Panoramic Rooftop Terrace)',
      '4-Bedroom Apartment: 223.32 sq.m',
      '3-Bedroom Apartment: 158.14 sq.m',
      '2-Bedroom Typologies: 107 sq.m, 113 sq.m, 125 sq.m',
      '78-Car Parking Facility (Resident & Commercial Spaces)',
      'High-Speed Modern Elevators in Block A & Block B',
      'Standby Backup Generator for 24/7 Uninterrupted Electricity',
      'Integrated Sewage Treatment Plant (STP) for Eco-Friendly Living',
      '5-Year Flexible Installment Plan through Dara Salaam Bank'
    ],
    amenities: [
      'High-Speed Elevators',
      '78-Car Parking Facility',
      '24/7 Backup Generator',
      'Ground Floor Shops',
      'Kids Play Area & Landscaped Garden',
      '24/7 CCTV Camera System',
      'STP Sewage Treatment Plant',
      'Manned Security Gatehouse',
      'Panoramic City View Balconies'
    ],
    isFeatured: true,
    isMasterProject: true,
    paymentPlan: '5-Year Installment Plan (Dara Salaam Bank Financing)',
    agent: {
      name: 'Kaabsan Sales Desk',
      title: 'Apartments Coordinator',
      phone: '380 (Telesom Shortcode)',
      email: 'sales@kaabsan.com',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'
    }
  }
];

export const NEIGHBORHOODS: Neighborhood[] = [
  {
    id: 'masalaha',
    name: 'Masalaha',
    slug: 'masalaha',
    tagline: 'The Epicenter of Master-Planned Living & Rugsan Gardens',
    description: 'Masalaha is Hargeisa’s fastest growing, highly planned luxury residential corridor. Home to Kaabsan’s landmark Rugsan Gardens gated community and the Masalaha Luxury Apartments, this district features wide paved avenues, clean air, and proximity to Egal International Airport.',
    avgPrice: '$195,000',
    pricePerSqft: '$48 / sq.ft',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    vibe: ['Master-Planned', 'Gated Communities', 'High Appreciation', 'Family Oriented'],
    highlights: [
      'Home to Rugsan Gardens 68 Luxury Townhouses',
      'Modern Paved Roads & Street Lighting',
      'Close to Egal International Airport & Masalaha Luxury Apartments',
      'Highest Capital Growth Potential in Hargeisa'
    ]
  },
  {
    id: 'jigjiga-yar',
    name: 'Jigjiga Yar',
    slug: 'jigjiga-yar',
    tagline: 'The Commercial, Diplomatic & Dining Capital of Hargeisa',
    description: 'Jigjiga Yar is the premier cosmopolitan heart of Hargeisa, packed with international cafes, supermarkets, corporate offices, and elite standalone private villas. A favorite for business leaders, expatriates, and prominent families.',
    avgPrice: '$280,000',
    pricePerSqft: '$55 / sq.ft',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    vibe: ['Cosmopolitan', 'Commercial Hub', 'High Liquidity', 'Elite Enclave'],
    highlights: [
      'Top Restaurants, Hotels & International Supermarkets',
      'Highest Commercial Land Value in Hargeisa',
      'Robust Rental Yield for Diaspora Investors',
      '24/7 Active Security & Modern Infrastructure'
    ]
  },
  {
    id: 'buurta-kala-jeexan',
    name: 'Buurta Kala-jeexan & Aragsan',
    slug: 'buurta-kala-jeexan',
    tagline: 'Scenic Mountain Views & Peaceful Gated Sanctuaries',
    description: 'Nestled beside the picturesque twin hills of Buurta Kala-jeexan, this peaceful district is home to Aragsan Village. It provides fresh mountain breezes, quiet residential surroundings, and easy access to central Hargeisa.',
    avgPrice: '$235,000',
    pricePerSqft: '$50 / sq.ft',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    vibe: ['Scenic Views', 'Aragsan Village', 'Peaceful Living', 'Equestrian & Nature'],
    highlights: [
      'Site of Aragsan Village Gated Community',
      'Breathtaking Natural Hilltop Views',
      'Community Schools & Child-Friendly Parks',
      'Growing Value with Infrastructure Expansion'
    ]
  },
  {
    id: 'shacabka',
    name: 'Shacabka',
    slug: 'shacabka',
    tagline: 'Historic Diplomatic & Government Headquarters District',
    description: 'Shacabka is the historic administrative and diplomatic heart of Somaliland, characterized by wide colonial-era plots, leafy gardens, quiet avenues, and paramount security. High demand from international embassies and multinational organizations.',
    avgPrice: '$310,000',
    pricePerSqft: '$60 / sq.ft',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    vibe: ['Diplomatic', 'High Security', 'Large Plots', 'Historic Prestige'],
    highlights: [
      'Diplomatic Headquarters & UN Compound Proximity',
      'Extremely Low Density & Large Compound Sizes',
      'Prime Rental Returns from International Agencies',
      'Highest Security Presence in Somaliland'
    ]
  },
  {
    id: 'airport-road',
    name: 'Airport Road & 26 June',
    slug: 'airport-road',
    tagline: 'The International Gateway & Commercial Corridor',
    description: 'Connecting Hargeisa City Centre to Egal International Airport, this bustling corridor is the prime destination for corporate headquarters, luxury hotels (like Ambassador Hotel), and mixed-use commercial developments.',
    avgPrice: '$250,000',
    pricePerSqft: '$52 / sq.ft',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    vibe: ['Commercial Corridor', 'Airport Gateway', 'Hotels & Corporate', 'High Traffic'],
    highlights: [
      'Home to Kaabsan Building & Ambassador Hotel Area',
      'Telesom Group Corporate Network Access',
      'Direct Gateway to Egal International Airport',
      'Prime Commercial Plots & Showrooms'
    ]
  },
  {
    id: 'ibrahim-koodbuur',
    name: 'Ibrahim Koodbuur',
    slug: 'ibrahim-koodbuur',
    tagline: 'Elevated City Scenery & Modern Residential Growth',
    description: 'Positioned in the north of Hargeisa, Ibrahim Koodbuur boasts elevated views over the city basin, cooler temperatures, and rapidly modernizing residential infrastructure.',
    avgPrice: '$180,000',
    pricePerSqft: '$45 / sq.ft',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    vibe: ['Hillside Breezes', 'City Views', 'Affordable Luxury', 'Spacious Homes'],
    highlights: [
      'Spectacular Panoramic City Sunsets',
      'New Asphalt Road Connections',
      'Rapid Capital Appreciation',
      'Modern Standalone Multi-Story Villas'
    ]
  }
];

export const NOTABLE_SALES: NotableSale[] = [
  {
    id: 'sale-01',
    title: 'Rugsan Gardens Phase 1 Master Community',
    neighborhood: 'Masalaha, Hargeisa',
    salePrice: '68 Townhouses (Sold Out)',
    year: '2023 - 2024',
    description: 'The monumental delivery of 68 bespoke townhouses in Masalaha, establishing Somaliland’s first fully gated, amenity-rich residential enclave.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    notableFact: '100% Sold Out with 24/7 Gated Security & Community Gym'
  },
  {
    id: 'sale-02',
    title: 'Aragsan Village Landmark Villa Collection',
    neighborhood: 'Buurta Kala-jeexan, Hargeisa',
    salePrice: 'Over 50+ Villas Sold',
    year: '2024',
    description: 'High-demand family villas sold to prominent diaspora returnees and local executives with flexible 60-Month Telesom Group installment plans.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80',
    notableFact: 'Pioneered 60-Month Islamic Financing for Real Estate'
  },
  {
    id: 'sale-03',
    title: 'Masalaha Luxury Apartments Launch',
    neighborhood: 'Airport Road / Masalaha',
    salePrice: 'Multi-Million Dollar Tower Development',
    year: '2024 - 2025',
    description: 'Setting a new high-rise luxury standard in Hargeisa with 81-vehicle basement parking, dual elevators, and backup generator power.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
    notableFact: 'First Purpose-Built Luxury Apartment Block with 81-Car Parking'
  },
  {
    id: 'sale-04',
    title: 'Kaabsan Modern Batching Plant Infrastructure',
    neighborhood: 'Airport Road & Greater Hargeisa',
    salePrice: 'Top Concrete Supplier for Major Developments',
    year: '2018 - Present',
    description: 'Supplying ready-mixed certified concrete and building blocks, guaranteeing international engineering resilience for all Kaabsan developments.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80',
    notableFact: 'Certified Structural Strength & High-Yield Construction'
  }
];

export const PRESS: PressArticle[] = [
  {
    id: 'press-01',
    title: 'Kaabsan Real Estate Transforms Hargeisa Skyline with Gated Communities',
    publication: 'Somaliland Business & Real Estate Review',
    date: '2024',
    category: 'Development Spotlight',
    snippet: 'How Telesom Group affiliate Kaabsan Real Estate is modernizing urban living with Rugsan Gardens and Aragsan Village.',
    link: 'https://kaabsanrealestate.com',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'press-02',
    title: 'The Rise of Masalaha: Diaspora Investment Drives Housing Boom',
    publication: 'Horn of Africa Property Gazette',
    date: '2024',
    category: 'Market Intelligence',
    snippet: 'Diaspora buyers from Europe, North America, and Gulf states embrace 60-month flexible financing for luxury homes in Somaliland.',
    link: 'https://kaabsanrealestate.com',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'press-03',
    title: 'Modern Ready-Mixed Concrete: Kaabsan Sets the Quality Benchmark',
    publication: 'East Africa Construction Digest',
    date: '2023',
    category: 'Engineering & Quality',
    snippet: 'How Kaabsan Modern Batching Plant ensures earthquake-resilient, laboratory-tested concrete for modern residential towers.',
    link: 'https://kaabsanrealestate.com',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'press-04',
    title: 'Flexible Islamic Financing Options Open Doors for Homebuyers',
    publication: 'Telesom Group Corporate Dispatch',
    date: '2024',
    category: 'Finance & Growth',
    snippet: 'Kaabsan Real Estate partners with leading financial mechanisms to offer 60-month installment plans with 0% Riba.',
    link: 'https://kaabsanrealestate.com',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
  }
];

export const TEAM: TeamMember[] = [
  {
    id: 'team-01',
    name: 'Kaabsan Executive Leadership',
    role: 'Executive Director & Head of Development',
    bio: 'Leading the strategic vision of Kaabsan Real Estate under the Telesom Group umbrella, delivering world-class master-planned communities across Somaliland.',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    accolades: ['Over 15 Years in Infrastructure & Real Estate', 'Telesom Group Leadership'],
    languages: ['Somali', 'English', 'Arabic'],
    email: 'info@kaabsan.com',
    phone: '+252 63 6100090'
  },
  {
    id: 'team-02',
    name: 'Diaspora & Private Client Advisory',
    role: 'Head of Diaspora Acquisitions & VIP Relations',
    bio: 'Specializing in guiding Somali diaspora investors from the UK, USA, Canada, Scandinavia, and UAE through property acquisition and 60-month financing.',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    accolades: ['Top Producer 2023-2024', 'Diaspora Investment Specialist'],
    languages: ['Somali', 'English', 'Swedish'],
    email: 'sales@kaabsan.com',
    phone: '+252 63 6100110'
  }
];
