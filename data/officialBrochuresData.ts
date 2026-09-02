export interface OfficialBrochureData {
  id: string;
  key: 'aragsan' | 'bilicsan' | 'masalaha' | 'rugsan' | 'financing';
  title: string;
  subtitle: string;
  projectName: string;
  developer: string;
  financedBy?: string;
  architect?: string;
  location: string;
  coverImage: string;
  pageCount: number;
  fileSize: string;
  unitSummary: string;
  totalAreaMetric: string;
  priceMetric: string;
  contactPhones: string[];
  contactEmail: string;
  website: string;
  pages: Array<{
    pageNumber: number;
    title: string;
    category: string;
    image: string;
    subtitle?: string;
    description: string;
    tableData?: Array<{ label: string; value: string }>;
    bulletPoints?: string[];
  }>;
  floorPlansMetric: Array<{
    levelName: string;
    grossArea: string;
    netArea?: string;
    highlights: string[];
    roomBreakdown?: Array<{ room: string; areaM2: string }>;
  }>;
  amenities: string[];
}

export const OFFICIAL_BROCHURES: Record<string, OfficialBrochureData> = {
  aragsan: {
    id: 'brochure-aragsan',
    key: 'aragsan',
    title: 'Aragsan Village Master Architecture & Villa Booklet',
    subtitle: '66 Contemporary Standalone Luxury Houses with Social Living & Sports Infrastructure',
    projectName: 'Aragsan Village',
    developer: 'Kaabsan Real Estate (Telesom Group)',
    architect: 'Teamwork Architects',
    location: 'Buurta Kala-jeexan (Jigjiga Yar), Hargeisa, Somaliland',
    coverImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
    pageCount: 23,
    fileSize: '18.4 MB (PDF)',
    unitSummary: '66 Contemporary Houses | 2 Parking Lots By Unit',
    totalAreaMetric: 'Total Const. 361.99 m² | Plot 483 m² (up to 562.69 m²)',
    priceMetric: 'Starting from $292,508.40 (60-Month Islamic Financing)',
    contactPhones: ['+252 636100090', '380 (Telesom Shortcode)'],
    contactEmail: 'sales@kaabsan.com',
    website: 'www.kaabsanre.co',
    amenities: [
      'Preschool for 240 Students',
      'Elementary School for 120 Students',
      'Well-Equipped Commercial Gym',
      'Children’s Playgrounds with Modern Rides',
      'Mosque for 120 People',
      'Full Basketball Courts',
      'Football & Sports Turf Areas',
      'Nicely Designed Landscape with Decorative Pools',
      '24/7 Security Gatehouse & Asphalt Paved Roads'
    ],
    floorPlansMetric: [
      {
        levelName: 'Ground Floor Plan',
        grossArea: '177.28 m²',
        netArea: '194.99 m²',
        highlights: [
          'Double-height ceiling formal Living Room (32.63 m²)',
          'Multi-functional Kitchen (19.64 m²) with separated Cooking Area (6.83 m²)',
          'Private Guest Bedroom (18.40 m²) with en-suite Bathroom (5.50 m²)',
          'Dining Area (14.40 m²) overlooking outdoor Veranda (23.64 m²)',
          'Staff/Maid Bedroom (13.08 m²) with dedicated Staff Entrance (9.90 m²)',
          'Storage (5.33 m²), Guest WC (2.67 m²), and Entrance Lobby (8.63 m²)'
        ],
        roomBreakdown: [
          { room: 'Living Room', areaM2: '32.63 m²' },
          { room: 'Main Kitchen', areaM2: '19.64 m²' },
          { room: 'Guest Bedroom', areaM2: '18.40 m²' },
          { room: 'Dining Area', areaM2: '14.40 m²' },
          { room: 'Staff Bedroom', areaM2: '13.08 m²' },
          { room: 'Veranda', areaM2: '23.64 m²' },
          { room: 'Cooking Area', areaM2: '6.83 m²' },
          { room: 'Bathroom (GF-11)', areaM2: '5.50 m²' },
          { room: 'Storage Pantry', areaM2: '5.33 m²' },
          { room: 'Entrance & Hall', areaM2: '18.08 m²' }
        ]
      },
      {
        levelName: 'First Floor Plan',
        grossArea: '172.87 m²',
        netArea: '153.40 m²',
        highlights: [
          'Expansive Master Bedroom (26.13 m²) with Walk-in Dressing (3.45 m²) & Luxury Bath (4.54 m²)',
          'Bedroom 2 (17.31 m²) with private Balcony (7.02 m²)',
          'Bedroom 3 (19.91 m²) with private Balcony (6.90 m²)',
          'Bedroom 4 (12.85 m²) with en-suite Bathroom (5.50 m²)',
          'Family TV Lounge (21.56 m²) and Central Hall (9.89 m²)',
          'Dedicated Laundry Room (3.94 m²)'
        ],
        roomBreakdown: [
          { room: 'Master Suite', areaM2: '26.13 m²' },
          { room: 'Family TV Lounge', areaM2: '21.56 m²' },
          { room: 'Bedroom 3', areaM2: '19.91 m²' },
          { room: 'Bedroom 2', areaM2: '17.31 m²' },
          { room: 'Bedroom 4', areaM2: '12.85 m²' },
          { room: 'Balconies (Total)', areaM2: '13.92 m²' },
          { room: 'Bathrooms (First Floor)', areaM2: '14.48 m²' },
          { room: 'Laundry Room', areaM2: '3.94 m²' }
        ]
      },
      {
        levelName: 'Terrace & Rooftop Floor',
        grossArea: '11.84 m²',
        netArea: '151.88 m²',
        highlights: [
          'Panoramic Outdoor Rooftop Terrace (114.39 m²)',
          'Satellite & Solar Panel Technical Zone (30.21 m²)',
          'Enclosed Staircase Hall (7.28 m²)',
          '360° Mountain and Hargeisa City View Corridor'
        ],
        roomBreakdown: [
          { room: 'Outdoor Open Terrace', areaM2: '114.39 m²' },
          { room: 'Solar / Satellite Area', areaM2: '30.21 m²' },
          { room: 'Upper Stair Hall', areaM2: '7.28 m²' }
        ]
      }
    ],
    pages: [
      {
        pageNumber: 1,
        title: 'Aragsan Somaliland - Executive Cover',
        category: 'Architecture',
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
        subtitle: 'Designed by Teamwork Architects for Kaabsan Real Estate',
        description: 'Aragsan Village is a premier master-planned hillside villa sanctuary set against the scenic backdrop of Buurta Kala-jeexan in Jigjiga Yar, Hargeisa.'
      },
      {
        pageNumber: 2,
        title: 'Master Aerial Overview & Street Layout',
        category: 'Master Plan',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
        subtitle: '66 G+1 Luxury Contemporary Houses',
        description: 'Comprehensive aerial layout showcasing wide paved internal avenues, perimeter gated security, street lighting, and dedicated community center.'
      },
      {
        pageNumber: 3,
        title: 'Social Living & Educational Facilities',
        category: 'Amenities',
        image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1600&q=85',
        subtitle: 'Preschool, Elementary School, Mosque & Commercial Gym',
        description: 'An integrated lifestyle hub featuring educational schooling for 360 students, daily shopping markets, sports courts, and a community mosque.'
      },
      {
        pageNumber: 4,
        title: 'Ground Floor Metric Architectural Plan',
        category: 'Floor Plan',
        image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1600&q=85',
        subtitle: 'Gross Area: 177.28 m² | Net Usable Area: 194.99 m²',
        description: 'Includes formal double-height Majlis, guest bedroom with bath, fitted luxury kitchen with separated cooking area, pantry, and staff quarters.'
      },
      {
        pageNumber: 5,
        title: 'First Floor Metric Architectural Plan',
        category: 'Floor Plan',
        image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
        subtitle: 'Gross Area: 172.87 m² | Net Usable Area: 153.40 m²',
        description: 'Features master suite with walk-in dressing and private bath, 3 additional family bedrooms with balconies, family TV lounge, and laundry room.'
      },
      {
        pageNumber: 6,
        title: 'Rooftop Terrace & Satellite Solar Plan',
        category: 'Floor Plan',
        image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
        subtitle: 'Terrace: 114.39 m² | Satellite & Solar: 30.21 m²',
        description: 'Dedicated entertainment rooftop terrace offering panoramic vistas of Hargeisa and mountain breezes.'
      }
    ]
  },

  bilicsan: {
    id: 'brochure-bilicsan',
    key: 'bilicsan',
    title: 'Bilicsan Village Modern Luxury Residences Catalog',
    subtitle: 'Typology A: 7-Bedroom Executive Compound Villas in Masalaha / Jigjiga Yar',
    projectName: 'Bilicsan Village',
    developer: 'Kaabsan Real Estate (Telesom Group)',
    location: 'Masalaha Area, Hargeisa, Somaliland',
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
    pageCount: 11,
    fileSize: '12.6 MB (PDF)',
    unitSummary: '16 Luxury Villas | Typology A (7 Bedrooms)',
    totalAreaMetric: 'Plot 450 m² | Built Area 380 m²',
    priceMetric: '$275,000 – $336,000 (30% Down Payment, 60 Months)',
    contactPhones: ['+252 636100090', '380 (Call Center)'],
    contactEmail: 'sales@kaabsan.com',
    website: 'www.kaabsanre.co',
    amenities: [
      '7-Bedroom Executive Multi-Level Villa',
      'Dual Kitchens: Inside Luxury Kitchen & Outside Heavy Kitchen',
      '2 Dedicated Parking Slots + Visitor Parking',
      'Integrated Guard / Security Room with Private Bathroom',
      'Service / Maid Room with Private Bathroom',
      'Private Landscaped Garden & Backyard Walkway',
      'Private Office / Study Room on First Floor',
      'Spacious Family Room & Master Suite Balcony',
      '24/7 Security & High-Grade Kaabsan Ready-Mix Construction'
    ],
    floorPlansMetric: [
      {
        levelName: 'Ground Floor Plan',
        grossArea: '160 m²',
        highlights: [
          'Living & Dining Room overlooking garden',
          'Entrance Lobby & Visitor WC',
          'Guest Bedroom with En-suite Bathroom',
          'Inside Luxury Kitchen & Separate Outside Kitchen',
          'Outdoor Covered Terrace for family tea',
          'Maid / Service Room with private bathroom',
          'Security Gatehouse with bathroom & 2 parking bays'
        ]
      },
      {
        levelName: 'First Floor Plan',
        grossArea: '150 m²',
        highlights: [
          'Executive Master Bedroom with private Master Bath & Balcony',
          '3 Additional Family Bedrooms (Bedrooms 2, 3, and 4)',
          'Private Dedicated Office / Study Room',
          'Spacious Family Room',
          'Shared and Guest Bathrooms'
        ]
      },
      {
        levelName: 'Second Floor Plan',
        grossArea: '70 m²',
        highlights: [
          'Bedroom 5 with private bathroom',
          'Anteroom / Lounge',
          'Open Roof Terrace with mountain breeze'
        ]
      }
    ],
    pages: [
      {
        pageNumber: 1,
        title: 'Bilicsan Village - Official Cover',
        category: 'Overview',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
        subtitle: 'Hargeisa, Somaliland',
        description: 'Welcome to Bilicsan Village by Kaabsan Real Estate, where modern elegance meets functional family sanctuary.'
      },
      {
        pageNumber: 2,
        title: 'Site Plan & 16 Villa Master Layout',
        category: 'Site Plan',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
        subtitle: '10M Wide Asphalt Road & Perimeter Security',
        description: 'Gated master layout featuring 16 individual villas (Unit 01 to Unit 16), wide internal roadways, service shops, and green gardens.'
      },
      {
        pageNumber: 3,
        title: 'Ground Floor Typology A Plan',
        category: 'Floor Plan',
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85',
        subtitle: 'Inside & Outside Kitchens, Maid Quarters & Security Room',
        description: 'Detailed floor plan with numerical room keys, dining area, guest suite, dual kitchens, and covered terrace.'
      },
      {
        pageNumber: 4,
        title: 'First Floor Typology A Plan',
        category: 'Floor Plan',
        image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85',
        subtitle: 'Master Suite, Office Room & Family Living',
        description: 'Upper floor plan showing 4 bedrooms, dedicated home office, family lounge, and master balcony.'
      }
    ]
  },

  masalaha: {
    id: 'brochure-masalaha',
    key: 'masalaha',
    title: 'Masallaha Luxury Apartments Official Architecture Catalog',
    subtitle: 'Dual G+6 Residential Towers (Block A & B) with 78-Car Parking Facility & STP System',
    projectName: 'Masallaha Apartments',
    developer: 'Kaabsan Real Estate (Telesom Group)',
    financedBy: 'Dara Salaam Bank',
    location: 'Masalaha Area (Airport Road Corridor), Hargeisa, Somaliland',
    coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
    pageCount: 20,
    fileSize: '15.8 MB (PDF)',
    unitSummary: 'Dual G+6 Towers (Block A & B) | 2, 3, 4-Bed & 5-Bed Penthouses',
    totalAreaMetric: 'Units 107 m² to 272 m² (All areas in sq.m)',
    priceMetric: '5-Year Flexible Installment Plan (Dara Salaam Bank)',
    contactPhones: ['+252 636100090', '380 (Call Center)'],
    contactEmail: 'sales@kaabsan.com',
    website: 'www.kaabsanre.co',
    amenities: [
      '78-Car Parking Facility (accommodates 78 vehicles)',
      '24/7 State-of-the-Art CCTV Surveillance Camera System',
      'High-Speed Modern Elevator Lifts in Block A and Block B',
      'Standby Backup Generator for 24/7 Uninterrupted Power',
      'Integrated Sewage Treatment Plant (STP) for Eco-Friendly Living',
      '24/7 Guarded Security Gatehouse',
      'Kids Play Area & Landscaped Garden Zone',
      'Ground Floor Convenience Commercial Shops'
    ],
    floorPlansMetric: [
      {
        levelName: '6th Floor: 4-Bedroom Penthouse',
        grossArea: '272 sq.m',
        highlights: [
          'Top floor luxury rooftop suite',
          'Wrap-around panoramic terrace overlooking Hargeisa city',
          '4 Master-sized bedrooms with private en-suite baths',
          'Expansive open-concept living & dining salon'
        ]
      },
      {
        levelName: 'Ground to 6th Floor: 4-Bedroom Apartment',
        grossArea: '223 sq.m',
        highlights: [
          '4 Generous bedrooms with built-in wardrobes',
          'Spacious kitchen with modern cabinetry',
          'Large living room with floor-to-ceiling windows',
          'Private balcony & separate utility laundry zone'
        ]
      },
      {
        levelName: '1st to 5th Floor: 3-Bedroom Apartment',
        grossArea: '158 sq.m',
        highlights: [
          '3 Bedrooms including master ensuite',
          'Contemporary European-style fitted kitchen',
          'Open dining and family lounge',
          'Private outdoor balcony'
        ]
      },
      {
        levelName: '2-Bedroom Apartment Types',
        grossArea: '107 - 125 sq.m',
        highlights: [
          'Type A: Area 113 sq.m (Ground to 5th Floor)',
          'Type B: Area 107 sq.m (5th Floor)',
          'Type C: Area 125 sq.m (5th Floor)'
        ]
      }
    ],
    pages: [
      {
        pageNumber: 1,
        title: 'Masallaha Apartments - Official Cover',
        category: 'Overview',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
        subtitle: 'Financed by Dara Salaam Bank',
        description: 'Somaliland’s most sophisticated multi-story residential towers situated in the thriving Masallaha district.'
      },
      {
        pageNumber: 2,
        title: 'Location Map & Airport Corridor Proximity',
        category: 'Location',
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85',
        subtitle: 'Proximity to Egal Airport & Masalaha Amenities',
        description: 'Prime connectivity adjacent to Hargeisa International Airport, Ambassador Hotel, and educational centers.'
      },
      {
        pageNumber: 3,
        title: 'Dual Tower Site Plan (Block A & Block B)',
        category: 'Site Plan',
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=85',
        subtitle: '78 Parking Bays, Tennis Court & Green Garden',
        description: 'Phase 1 development comprising Block A and Block B, 6-feet internal roadway, and security cabin.'
      },
      {
        pageNumber: 4,
        title: 'Floor Plans: 2, 3 & 4 Bedroom Typologies',
        category: 'Floor Plan',
        image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
        subtitle: 'All Metric Dimensions: 113 m², 158 m², 223 m², 272 m²',
        description: 'Detailed layout of ground floor, typical 1-4 floor, 5th floor, and 6th floor penthouse units.'
      }
    ]
  },

  rugsan: {
    id: 'brochure-rugsan',
    key: 'rugsan',
    title: 'Rugsan Gardens Master Community Official Brochure',
    subtitle: '70 Contemporary Modern Townhouses + DSQ (5 & 6 Bedroom Master Ensuite)',
    projectName: 'Rugsan Gardens',
    developer: 'Kaabsan Real Estate Company',
    financedBy: 'Dara Salaam Bank',
    location: 'Masallaha Area (East Airport), Hargeisa, Somaliland',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    pageCount: 11,
    fileSize: '14.2 MB (PDF)',
    unitSummary: '70 Modern Town Houses + DSQ | 100% Sold Out',
    totalAreaMetric: 'Plot 400 m² | Built 321 m²',
    priceMetric: '$240,000 (Delivered & Occupied)',
    contactPhones: ['+252 636100091', '380 (Call Center)'],
    contactEmail: 'sales@kaabsan.com',
    website: 'www.kaabsanre.com',
    amenities: [
      '70 Contemporary Modern Town Houses + DSQ',
      '5 & 6 Bedroom Townhouses (Master Ensuite)',
      '2 Parking Bays per Unit + Visitor Parking Available',
      'Kindergarten & Children’s Play Area',
      'Jogging Path & Green Recreational Park',
      'Commercial Shops & Well-Equipped Multi-Purpose Gym',
      'Borehole Water & Standby Generator for Public Areas',
      'Manned Gatehouse with 24Hr Security & CCTV Cameras',
      'Designer Fitted Kitchen with Upper Cabinets & Granite Countertops',
      'Luxurious Bathrooms with Double Vanity Sinks & Glass Showers'
    ],
    floorPlansMetric: [
      {
        levelName: 'Lower / Ground Level Plan',
        grossArea: '160 m²',
        highlights: [
          'Double-volume Lounge (6.0 x 5.4 m) & Dining (4.0 x 4.0 m)',
          'Main Kitchen (4.0 x 4.0 m) & Outdoor Kitchen (2.1 x 3.4 m)',
          'Guest Bedroom (3.8 x 4.5 m) with Guest Bath (2.6 x 1.2 m)',
          'DSQ (2.85 x 3.0 m) with DSQ Bath (2.8 x 1.4 m)',
          'Outdoor Covered Terrace (4.9 x 3.6 m) & Yard (5.5 x 2.7 m)',
          'Entrance Verandah (6.5 x 3.3 m) & 2 Parking Bays'
        ]
      },
      {
        levelName: 'Upper Level Plan (Level 2)',
        grossArea: '130 m²',
        highlights: [
          'Family Room (3.4 x 4.0 m) with void overlooking ground lounge',
          'Master Bedroom (5.6 x 5.6 m) with luxury Bath (3.9 x 2.2 m) & Balcony (3.8 x 1.7 m)',
          'Bedroom 2 (4.0 x 4.0 m), Bedroom 3 (4.0 x 4.0 m), Bedroom 4 (4.0 x 4.0 m)',
          'Multiple ensuite & shared bathrooms'
        ]
      },
      {
        levelName: 'Level 3 / Roof Terrace Level',
        grossArea: '31 m²',
        highlights: [
          'Master Suite (5.6 x 5.6 m) with Master Bath (3.9 x 2.2 m)',
          'Upper Lounge (4.6 x 4.0 m)',
          'Roof Terrace (4.6 x 4.0 m)'
        ]
      }
    ],
    pages: [
      {
        pageNumber: 1,
        title: 'Rugsan Gardens - Official Cover',
        category: 'Overview',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
        subtitle: 'Masallaha, Hargeisa Somaliland',
        description: 'The landmark gated community that established Kaabsan Real Estate as the benchmark for luxury living in Somaliland.'
      },
      {
        pageNumber: 2,
        title: 'Master Community Aerial & 70 Townhouses',
        category: 'Master Plan',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
        subtitle: '100% Sold Out & Delivered',
        description: '70 townhouses nestled in wide paved avenues with private gym, kindergarten, and 24/7 security.'
      },
      {
        pageNumber: 3,
        title: 'Lower Level 5 & 6 Bedroom Floor Plan',
        category: 'Floor Plan',
        image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1600&q=85',
        subtitle: 'Double Volume Lounge, Dining, Kitchen & DSQ',
        description: 'Detailed architectural drawing featuring parking, entrance verandah, lounge, outdoor terrace, and guest bedroom.'
      },
      {
        pageNumber: 4,
        title: 'Upper Level & Level 3 Roof Terrace Plans',
        category: 'Floor Plan',
        image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
        subtitle: 'Master Ensuite, Family Room & Roof Terrace',
        description: 'Upper levels showing spacious family suites, roof terrace (4.6 x 4.0 m), and multiple ensuite bathrooms.'
      }
    ]
  }
};
