export const roomTypes = {
  STANDARD: 'standard',
  DELUXE: 'deluxe',
  JUNIOR_SUITE: 'junior_suite',
  LUXURY_SUITE: 'luxury_suite',
  PRESIDENTIAL: 'presidential'
};

export const roomAmenities = {
  // Basic amenities
  WIFI: { id: 'wifi', name: 'Free Wi-Fi', icon: '📶' },
  AC: { id: 'ac', name: 'Air Conditioning', icon: '❄️' },
  TV: { id: 'tv', name: 'Smart TV', icon: '📺' },
  MINIBAR: { id: 'minibar', name: 'Minibar', icon: '🍾' },
  SAFE: { id: 'safe', name: 'Safe', icon: '🔒' },
  
  // Bathroom amenities
  BATHROOM_LUXURY: { id: 'bathroom_luxury', name: 'Luxury Bathroom', icon: '🛁' },
  MARBLE_BATH: { id: 'marble_bath', name: 'Marble Bathroom', icon: '🛁' },
  SEPARATE_SHOWER: { id: 'separate_shower', name: 'Separate Shower', icon: '🚿' },
  BATHROBE: { id: 'bathrobe', name: 'Bathrobe & Slippers', icon: '🥼' },
  
  // Room features
  CITY_VIEW: { id: 'city_view', name: 'City View', icon: '🏙️' },
  GARDEN_VIEW: { id: 'garden_view', name: 'Garden View', icon: '🌿' },
  BALCONY: { id: 'balcony', name: 'Private Balcony', icon: '🏗️' },
  TERRACE: { id: 'terrace', name: 'Private Terrace', icon: '🌅' },
  
  // Bed options
  KING_BED: { id: 'king_bed', name: 'King Size Bed', icon: '🛏️' },
  QUEEN_BED: { id: 'queen_bed', name: 'Queen Size Bed', icon: '🛏️' },
  TWIN_BEDS: { id: 'twin_beds', name: 'Twin Beds', icon: '🛏️' },
  
  // Work amenities
  DESK: { id: 'desk', name: 'Work Desk', icon: '💻' },
  BUSINESS_CENTER: { id: 'business_center', name: 'Business Center Access', icon: '🏢' },
  PRINTER: { id: 'printer', name: 'In-room Printer', icon: '🖨️' },
  
  // Luxury amenities
  BUTLER_SERVICE: { id: 'butler_service', name: 'Butler Service', icon: '👔' },
  CONCIERGE: { id: 'concierge', name: 'Concierge Service', icon: '🎩' },
  ROOM_SERVICE: { id: 'room_service', name: '24/7 Room Service', icon: '🍽️' },
  PREMIUM_BAR: { id: 'premium_bar', name: 'Premium Bar', icon: '🥂' },
  
  // Additional services
  BREAKFAST: { id: 'breakfast', name: 'Breakfast Included', icon: '🍳' },
  SPA_ACCESS: { id: 'spa_access', name: 'Spa Access', icon: '🧘' },
  GYM_ACCESS: { id: 'gym_access', name: 'Gym Access', icon: '🏋️' },
  POOL_ACCESS: { id: 'pool_access', name: 'Pool Access', icon: '🏊' }
};

export const rooms = [
  {
    id: 1,
    name: 'Executive Room',
    type: roomTypes.STANDARD,
    description: 'Perfect for business travelers with modern amenities and workspace. Comfortable accommodation with all essential features.',
    longDescription: 'Our Executive Room offers a perfect blend of comfort and functionality. Designed with the business traveler in mind, it features a dedicated workspace, high-speed internet, and modern amenities. The room is elegantly furnished with contemporary decor and provides a peaceful retreat after a busy day.',
    
    // Room specifications
    size: '25m²',
    capacity: { adults: 2, children: 1 },
    bedConfiguration: 'King bed or Twin beds',
    
    // Pricing
    pricing: {
      basePrice: 100,
      currency: '€',
      period: 'night',
      discounts: {
        weekly: 0.10,
        monthly: 0.15,
        earlyBird: 0.05
      }
    },
    
    // Images
    images: [
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80'
    ],
    
    // Amenities
    amenities: [
      roomAmenities.WIFI,
      roomAmenities.TV,
      roomAmenities.DESK,
      roomAmenities.KING_BED,
      roomAmenities.SAFE,
      roomAmenities.BATHROOM_LUXURY,
      roomAmenities.BREAKFAST
    ],
    
    // Availability
    availability: {
      available: true,
      totalRooms: 15,
      availableRooms: 8
    },
    
    // Room features
    features: {
      smokingAllowed: false,
      petFriendly: true,
      accessible: true,
      soundproof: true
    }
  },
  
  {
    id: 2,
    name: 'Deluxe Room',
    type: roomTypes.DELUXE,
    description: 'Elegantly designed room with modern comfort and sophisticated style. Enhanced amenities for a premium experience.',
    longDescription: 'The Deluxe Room provides an elevated experience with sophisticated design and enhanced amenities. Featuring premium furnishings, a spacious layout, and garden views, this room offers the perfect balance of luxury and comfort for discerning guests.',
    
    size: '35m²',
    capacity: { adults: 2, children: 2 },
    bedConfiguration: 'King bed or Queen bed',
    
    pricing: {
      basePrice: 120,
      currency: '€',
      period: 'night',
      discounts: {
        weekly: 0.12,
        monthly: 0.18,
        earlyBird: 0.07
      }
    },
    
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80'
    ],
    
    amenities: [
      roomAmenities.WIFI,
      roomAmenities.AC,
      roomAmenities.TV,
      roomAmenities.MINIBAR,
      roomAmenities.GARDEN_VIEW,
      roomAmenities.QUEEN_BED,
      roomAmenities.SAFE,
      roomAmenities.MARBLE_BATH,
      roomAmenities.DESK,
      roomAmenities.BREAKFAST,
      roomAmenities.SPA_ACCESS,
      roomAmenities.GYM_ACCESS
    ],
    
    availability: {
      available: true,
      totalRooms: 12,
      availableRooms: 5
    },
    
    features: {
      smokingAllowed: false,
      petFriendly: true,
      accessible: true,
      soundproof: true
    }
  },
  
  {
    id: 3,
    name: 'Junior Suite',
    type: roomTypes.JUNIOR_SUITE,
    description: 'Comfortable accommodation with separate seating area and modern amenities. More space for relaxation.',
    longDescription: 'The Junior Suite offers enhanced space and comfort with a separate seating area perfect for relaxation or informal meetings. Featuring modern amenities, elegant decor, and premium services, this suite provides an ideal retreat for both business and leisure travelers.',
    
    size: '50m²',
    capacity: { adults: 3, children: 2 },
    bedConfiguration: 'King bed + Sofa bed',
    
    pricing: {
      basePrice: 180,
      currency: '€',
      period: 'night',
      discounts: {
        weekly: 0.15,
        monthly: 0.20,
        earlyBird: 0.10
      }
    },
    
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
    
    amenities: [
      roomAmenities.WIFI,
      roomAmenities.AC,
      roomAmenities.TV,
      roomAmenities.MINIBAR,
      roomAmenities.GARDEN_VIEW,
      roomAmenities.KING_BED,
      roomAmenities.SAFE,
      roomAmenities.MARBLE_BATH,
      roomAmenities.SEPARATE_SHOWER,
      roomAmenities.BATHROBE,
      roomAmenities.DESK,
      roomAmenities.ROOM_SERVICE,
      roomAmenities.BREAKFAST,
      roomAmenities.SPA_ACCESS,
      roomAmenities.GYM_ACCESS,
      roomAmenities.POOL_ACCESS
    ],
    
    availability: {
      available: true,
      totalRooms: 8,
      availableRooms: 3
    },
    
    features: {
      smokingAllowed: false,
      petFriendly: true,
      accessible: true,
      soundproof: true
    }
  },
  
  {
    id: 4,
    name: 'Luxury Suite',
    type: roomTypes.LUXURY_SUITE,
    description: 'Spacious suite with panoramic city views, marble bathroom, and premium amenities. Ultimate comfort and luxury.',
    longDescription: 'Our Luxury Suite represents the pinnacle of comfort and elegance. With panoramic city views, a spacious layout, and premium amenities, this suite offers an unforgettable experience. The marble bathroom, separate living area, and personalized service ensure a truly luxurious stay.',
    
    size: '70m²',
    capacity: { adults: 4, children: 2 },
    bedConfiguration: 'King bed + Living area',
    
    pricing: {
      basePrice: 250,
      currency: '€',
      period: 'night',
      discounts: {
        weekly: 0.18,
        monthly: 0.25,
        earlyBird: 0.12
      }
    },
    
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
    
    amenities: [
      roomAmenities.WIFI,
      roomAmenities.TV,
      roomAmenities.MINIBAR,
      roomAmenities.CITY_VIEW,
      roomAmenities.BALCONY,
      roomAmenities.KING_BED,
      roomAmenities.SAFE,
      roomAmenities.BREAKFAST
    ],
    
    availability: {
      available: true,
      totalRooms: 6,
      availableRooms: 2
    },
    
    features: {
      smokingAllowed: false,
      petFriendly: true,
      accessible: true,
      soundproof: true
    }
  },
  
  {
    id: 5,
    name: 'Presidential Suite',
    type: roomTypes.PRESIDENTIAL,
    description: 'Ultimate luxury with separate living area, premium furnishings, and exclusive services. The epitome of elegance.',
    longDescription: 'The Presidential Suite offers the ultimate in luxury accommodation. With separate living and dining areas, premium furnishings, and exclusive services including butler service, this suite provides an unparalleled experience. The private terrace, premium bar, and personalized attention ensure a memorable stay.',
    
    size: '120m²',
    capacity: { adults: 6, children: 3 },
    bedConfiguration: 'King bed + Living area + Dining area',
    
    pricing: {
      basePrice: 400,
      currency: '€',
      period: 'night',
      discounts: {
        weekly: 0.20,
        monthly: 0.30,
        earlyBird: 0.15
      }
    },
    
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
    
    amenities: [
      roomAmenities.WIFI,
      roomAmenities.TV,
      roomAmenities.MINIBAR,
      roomAmenities.CITY_VIEW,
      roomAmenities.BALCONY,
      roomAmenities.KING_BED,
      roomAmenities.SAFE,
      roomAmenities.BREAKFAST
    ],
    
    availability: {
      available: true,
      totalRooms: 2,
      availableRooms: 2
    },
    
    features: {
      smokingAllowed: false,
      petFriendly: true,
      accessible: true,
      soundproof: true
    }
  }
];

// Helper functions
export const getRoomsByType = (type) => {
  return rooms.filter(room => room.type === type);
};

export const getAvailableRooms = () => {
  return rooms.filter(room => room.availability.available);
};

export const getRoomById = (id) => {
  return rooms.find(room => room.id === id);
};

export const getRoomsByPriceRange = (minPrice, maxPrice) => {
  return rooms.filter(room => 
    room.pricing.basePrice >= minPrice && room.pricing.basePrice <= maxPrice
  );
};

export default rooms; 