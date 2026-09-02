import { RentalUnit } from '../types';

export const RENTAL_UNITS: RentalUnit[] = [
  {
    id: 'rent-rugsan-01',
    title: 'Rugsan Gardens 5-Bed Townhouse + DSQ',
    communityId: 'rugsan-gardens',
    communityName: 'Rugsan Gardens',
    neighborhood: 'Masalaha / Airport Corridor',
    location: 'Airport Road, Masallaha, Hargeisa',
    unitType: 'Townhouse + DSQ',
    bedrooms: 5,
    bathrooms: 6,
    areaSqm: 321,
    monthlyRentUSD: 1400,
    securityDepositUSD: 1400,
    furnishingStatus: 'Semi-Furnished',
    availabilityStatus: 'Available Now',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85'
    ],
    features: [
      'Gated Community with 24/7 Security Gatehouse',
      'Dedicated Domestic Staff Quarters (DSQ)',
      'Private Landscaped Garden & 2-Car Parking',
      'Modern Fitted Kitchen with Premium Cabinetry',
      'Access to Community Kindergarten & Resident Gym'
    ],
    utilitiesIncluded: [
      '24/7 Standby Backup Power Generator',
      'Central High-Capacity Water Reservoir',
      'Fiber Optic High-Speed Internet Ready',
      'Gated Security & Compound Waste Disposal'
    ],
    description: 'Executive 5-bedroom townhouse within Rugsan Gardens gated community, located along the Masallaha Airport Road. Ideal for UN, diplomatic staff, diaspora families, and multinational corporate executives.',
    leaseTerms: 'Minimum 1-Year Lease • 1-Month Security Deposit • Quarterly or Bi-Annual Rent Payment',
    minLeaseMonths: 12,
    highlightBadge: 'Diplomatic & NGO Choice'
  },
  {
    id: 'rent-aragsan-01',
    title: 'Aragsan Village 6-Bed G+1 Hillside Villa',
    communityId: 'aragsan-village',
    communityName: 'Aragsan Village',
    neighborhood: 'Buurta Kala-jeexan (Jigjiga Yar)',
    location: 'Jigjiga Yar Heights, Hargeisa',
    unitType: 'G+1 Standalone',
    bedrooms: 6,
    bathrooms: 7,
    areaSqm: 362,
    monthlyRentUSD: 1850,
    securityDepositUSD: 1850,
    furnishingStatus: 'Fully Furnished',
    availabilityStatus: 'Available Now',
    heroImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85'
    ],
    features: [
      '114 m² Panoramic Rooftop Terrace with Mountain Views',
      'Fully Furnished with Luxury Imported Italian Furniture',
      'Executive Study/Office & Family Living Lounge',
      'Master Suite with Walk-In Closet & Spa Bathroom',
      'Community Sports Turf, School & Commercial Fitness Center'
    ],
    utilitiesIncluded: [
      '24/7 Dedicated Power Grid Backup',
      'Pressurized Continuous Water Supply',
      '24/7 Monitored CCTV & Security Patrols',
      'Compound Maintenance & Landscaping Servicing'
    ],
    description: 'Ultra-luxurious fully furnished standalone villa situated on the scenic heights of Buurta Kala-jeexan in Aragsan Village. Offers unmatched security, luxury furnishings, and panoramic city views.',
    leaseTerms: '6 to 24 Months Lease Available • Corporate & Embassy Leases Preferred',
    minLeaseMonths: 6,
    highlightBadge: 'Luxury Furnished'
  },
  {
    id: 'rent-bilicsan-01',
    title: 'Bilicsan Village 7-Bed Executive Compound Villa',
    communityId: 'bilicsan-village',
    communityName: 'Bilicsan Village',
    neighborhood: 'Masalaha / Airport Corridor',
    location: 'Airport Highway, Masalaha, Hargeisa',
    unitType: 'Executive Villa',
    bedrooms: 7,
    bathrooms: 8,
    areaSqm: 380,
    monthlyRentUSD: 1650,
    securityDepositUSD: 1650,
    furnishingStatus: 'Semi-Furnished',
    availabilityStatus: 'Available Next Month',
    heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85'
    ],
    features: [
      'Typology A: 7 En-suite Master Bedrooms',
      'Dual Kitchens: Show Kitchen & Heavy Cooking Kitchen',
      'Dedicated Security Guard House & Maid Living Quarters',
      'Spacious Multi-Car Paved Driveway & High Perimeter Walls',
      'Exclusive 16-Villa Private Compound Enclave'
    ],
    utilitiesIncluded: [
      'Continuous Redundant Power & Solar Backup',
      'Dedicated High-Pressure Water Pumps',
      '24/7 Armed & Gated Compound Security',
      'Rapid In-House Facilities Maintenance'
    ],
    description: 'Expansive 7-bedroom executive compound villa in Bilicsan Village. Tailored specifically for large families, international organizations, and institutional tenants seeking privacy, security, and dual kitchen capabilities.',
    leaseTerms: '1-Year Renewable Lease • Corporate Invoicing Supported',
    minLeaseMonths: 12,
    highlightBadge: 'Spacious 7-Bed'
  },
  {
    id: 'rent-masalaha-penthouse',
    title: 'Masallaha Towers 4-Bed Rooftop Sky Penthouse',
    communityId: 'masalaha-apartments',
    communityName: 'Masallaha Luxury Apartments',
    neighborhood: 'Masalaha - Airport Highway',
    location: 'Towers Block A, Airport Road, Hargeisa',
    unitType: 'Penthouse',
    bedrooms: 4,
    bathrooms: 4,
    areaSqm: 272,
    monthlyRentUSD: 1100,
    securityDepositUSD: 1100,
    furnishingStatus: 'Fully Furnished',
    availabilityStatus: 'Available Now',
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=85'
    ],
    features: [
      'Top Floor G+6 Sky Penthouse with 360-Degree Airport & City Views',
      'High-Speed Double Passenger Elevators with Smart Keycard',
      'Assigned Basement Secure Parking Space for 2 Vehicles',
      'Open-Concept Living with High Ceilings & Large Balconies',
      'On-Site Ground-Floor Supermarket & Retail Convenience'
    ],
    utilitiesIncluded: [
      '24/7 Heavy-Duty Central Generator',
      'Central Sewage Treatment Plant (STP)',
      'High-Speed Fiber Internet Connection',
      'Building Concierge & Reception Desk'
    ],
    description: 'Rooftop sky penthouse in Somaliland’s premier G+6 residential tower. Boasting elevator access, secure basement parking, fully furnished contemporary interiors, and round-the-clock power and water.',
    leaseTerms: '6 to 12 Months Lease • Online Rental Payments Supported',
    minLeaseMonths: 6,
    highlightBadge: 'Sky Penthouse'
  },
  {
    id: 'rent-masalaha-3bed',
    title: 'Masallaha Towers 3-Bed Luxury Apartment',
    communityId: 'masalaha-apartments',
    communityName: 'Masallaha Luxury Apartments',
    neighborhood: 'Masalaha - Airport Highway',
    location: 'Towers Block B, Airport Road, Hargeisa',
    unitType: 'Luxury Apartment',
    bedrooms: 3,
    bathrooms: 3,
    areaSqm: 158,
    monthlyRentUSD: 750,
    securityDepositUSD: 750,
    furnishingStatus: 'Semi-Furnished',
    availabilityStatus: 'Available Now',
    heroImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=85'
    ],
    features: [
      'Spacious 158 m² Layout with Ensuite Master Bedroom',
      'Modern Fitted Kitchen with Breakfast Bar',
      'Covered Balcony with Airport Highway View',
      'Modern Elevator Access & Dedicated Parking Slot',
      '24/7 Security & Keycard Access Control'
    ],
    utilitiesIncluded: [
      '24/7 Generator Power Backup',
      'Continuous Clean Water Supply',
      'Garbage Collection & Common Area Janitorial Service',
      '24/7 Security Gatehouse & Intercom'
    ],
    description: 'Modern 3-bedroom apartment unit in Masallaha Towers Block B. An affordable, secure, and low-maintenance urban home for executives, couples, and small families.',
    leaseTerms: 'Minimum 6-Month Lease • Monthly or Quarterly Rent Collection',
    minLeaseMonths: 6,
    highlightBadge: 'Best Value'
  }
];
