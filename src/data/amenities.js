export const amenityCategories = {
  WELLNESS: 'wellness',
  BUSINESS: 'business',
  DINING: 'dining',
  RECREATION: 'recreation',
  SERVICES: 'services',
  CONNECTIVITY: 'connectivity',
  TRANSPORTATION: 'transportation',
  FAMILY: 'family'
};

export const hotelAmenities = [
  // Wellness & Spa
  {
    id: 'spa',
    name: 'Luxury Spa',
    category: amenityCategories.WELLNESS,
    description: 'Full-service spa with massage therapy, facial treatments, and wellness packages',
    icon: '🧘‍♀️',
    available: true,
    hours: '09:00 - 21:00',
    features: ['Massage Therapy', 'Facial Treatments', 'Body Treatments', 'Wellness Packages']
  },
  {
    id: 'fitness',
    name: 'Fitness Center',
    category: amenityCategories.WELLNESS,
    description: '24/7 state-of-the-art fitness center with modern equipment',
    icon: '🏋️‍♂️',
    available: true,
    hours: '24/7',
    features: ['Cardio Equipment', 'Weight Training', 'Personal Training', 'Yoga Classes']
  },
  {
    id: 'pool',
    name: 'Indoor Pool',
    category: amenityCategories.RECREATION,
    description: 'Heated indoor pool with city views and poolside service',
    icon: '🏊‍♂️',
    available: true,
    hours: '06:00 - 22:00',
    features: ['Heated Pool', 'City Views', 'Poolside Service', 'Changing Rooms']
  },
  {
    id: 'sauna',
    name: 'Sauna & Steam Room',
    category: amenityCategories.WELLNESS,
    description: 'Traditional sauna and steam room for relaxation and wellness',
    icon: '🧖‍♀️',
    available: true,
    hours: '09:00 - 21:00',
    features: ['Finnish Sauna', 'Steam Room', 'Relaxation Area', 'Towel Service']
  },

  // Business & Connectivity
  {
    id: 'business_center',
    name: 'Business Center',
    category: amenityCategories.BUSINESS,
    description: '24/7 business center with computers, printing, and meeting facilities',
    icon: '💼',
    available: true,
    hours: '24/7',
    features: ['Computer Access', 'Printing/Copying', 'Meeting Rooms', 'Conference Facilities']
  },
  {
    id: 'wifi',
    name: 'Free Wi-Fi',
    category: amenityCategories.CONNECTIVITY,
    description: 'Complimentary high-speed Wi-Fi throughout the hotel',
    icon: '📶',
    available: true,
    hours: '24/7',
    features: ['High-Speed Internet', 'Hotel-Wide Coverage', 'No Data Limits', 'Secure Connection']
  },
  {
    id: 'meeting_rooms',
    name: 'Meeting Rooms',
    category: amenityCategories.BUSINESS,
    description: 'Modern meeting rooms with AV equipment and catering services',
    icon: '🏢',
    available: true,
    hours: '07:00 - 23:00',
    features: ['AV Equipment', 'Catering Services', 'Flexible Layouts', 'Technical Support']
  },

  // Dining
  {
    id: 'restaurant',
    name: 'Fine Dining Restaurant',
    category: amenityCategories.DINING,
    description: 'Award-winning restaurant featuring international and local cuisine',
    icon: '🍽️',
    available: true,
    hours: '18:00 - 22:00',
    features: ['International Cuisine', 'Local Specialties', 'Wine Selection', 'Private Dining']
  },
  {
    id: 'bar',
    name: 'Rooftop Bar',
    category: amenityCategories.DINING,
    description: 'Elegant rooftop bar with panoramic city views and craft cocktails',
    icon: '🍸',
    available: true,
    hours: '17:00 - 02:00',
    features: ['Craft Cocktails', 'City Views', 'Live Music', 'Outdoor Seating']
  },
  {
    id: 'room_service',
    name: '24/7 Room Service',
    category: amenityCategories.SERVICES,
    description: 'Round-the-clock room service with extensive menu options',
    icon: '🛎️',
    available: true,
    hours: '24/7',
    features: ['Extensive Menu', 'Quick Service', 'Special Dietary Options', 'Breakfast in Bed']
  },
  {
    id: 'breakfast',
    name: 'Continental Breakfast',
    category: amenityCategories.DINING,
    description: 'Complimentary continental breakfast with fresh local ingredients',
    icon: '🥐',
    available: true,
    hours: '07:00 - 10:30',
    features: ['Fresh Pastries', 'Local Specialties', 'Healthy Options', 'Coffee & Tea']
  },

  // Services
  {
    id: 'concierge',
    name: 'Concierge Service',
    category: amenityCategories.SERVICES,
    description: 'Professional concierge service for bookings, recommendations, and assistance',
    icon: '🎩',
    available: true,
    hours: '24/7',
    features: ['Tour Bookings', 'Restaurant Reservations', 'Local Recommendations', 'Travel Assistance']
  },
  {
    id: 'housekeeping',
    name: 'Daily Housekeeping',
    category: amenityCategories.SERVICES,
    description: 'Daily housekeeping service with eco-friendly products',
    icon: '🧹',
    available: true,
    hours: '09:00 - 17:00',
    features: ['Daily Cleaning', 'Eco-Friendly Products', 'Turndown Service', 'Laundry Service']
  },
  {
    id: 'laundry',
    name: 'Laundry & Dry Cleaning',
    category: amenityCategories.SERVICES,
    description: 'Professional laundry and dry cleaning services',
    icon: '👔',
    available: true,
    hours: '08:00 - 18:00',
    features: ['Same-Day Service', 'Dry Cleaning', 'Pressing Service', 'Eco-Friendly Options']
  },
  {
    id: 'valet',
    name: 'Valet Parking',
    category: amenityCategories.TRANSPORTATION,
    description: 'Complimentary valet parking service for hotel guests',
    icon: '🚗',
    available: true,
    hours: '24/7',
    features: ['Free Parking', 'Valet Service', 'Secure Garage', 'Car Wash Service']
  },

  // Transportation
  {
    id: 'airport_shuttle',
    name: 'Airport Shuttle',
    category: amenityCategories.TRANSPORTATION,
    description: 'Complimentary shuttle service to and from the airport',
    icon: '🚐',
    available: true,
    hours: '05:00 - 23:00',
    features: ['Airport Transfer', 'Schedule Service', 'Luggage Assistance', 'Reservation Required']
  },
  {
    id: 'taxi_service',
    name: 'Taxi Service',
    category: amenityCategories.TRANSPORTATION,
    description: 'On-demand taxi service available through concierge',
    icon: '🚕',
    available: true,
    hours: '24/7',
    features: ['On-Demand Service', 'City Tours', 'Business Travel', 'Airport Transfer']
  },

  // Family & Recreation
  {
    id: 'babysitting',
    name: 'Babysitting Service',
    category: amenityCategories.FAMILY,
    description: 'Professional babysitting service for families with children',
    icon: '👶',
    available: true,
    hours: '09:00 - 22:00',
    features: ['Certified Babysitters', 'In-Room Service', 'Activity Planning', 'Advance Booking']
  },
  {
    id: 'pet_services',
    name: 'Pet Services',
    category: amenityCategories.FAMILY,
    description: 'Pet-friendly accommodations and services',
    icon: '🐕',
    available: true,
    hours: '24/7',
    features: ['Pet Beds', 'Walking Service', 'Pet Sitting', 'Grooming Referrals']
  },
  {
    id: 'library',
    name: 'Hotel Library',
    category: amenityCategories.RECREATION,
    description: 'Quiet library with books, magazines, and comfortable seating',
    icon: '📚',
    available: true,
    hours: '24/7',
    features: ['Book Collection', 'Reading Area', 'Free Wi-Fi', 'Quiet Environment']
  },

  // Additional Services
  {
    id: 'currency_exchange',
    name: 'Currency Exchange',
    category: amenityCategories.SERVICES,
    description: 'Currency exchange service at competitive rates',
    icon: '💱',
    available: true,
    hours: '08:00 - 20:00',
    features: ['Major Currencies', 'Competitive Rates', 'Quick Service', 'Travel Assistance']
  },
  {
    id: 'luggage_storage',
    name: 'Luggage Storage',
    category: amenityCategories.SERVICES,
    description: 'Secure luggage storage for early arrivals and late departures',
    icon: '🧳',
    available: true,
    hours: '24/7',
    features: ['Secure Storage', 'Early Check-in', 'Late Check-out', 'Complimentary Service']
  }
];

// Helper functions
export const getAmenitiesByCategory = (category) => {
  return hotelAmenities.filter(amenity => amenity.category === category);
};

export const getAvailableAmenities = () => {
  return hotelAmenities.filter(amenity => amenity.available);
};

export const getAmenityById = (id) => {
  return hotelAmenities.find(amenity => amenity.id === id);
};

export const getFeaturedAmenities = () => {
  return hotelAmenities.filter(amenity => 
    ['spa', 'fitness', 'restaurant', 'bar', 'pool', 'business_center', 'wifi', 'concierge'].includes(amenity.id)
  );
};

export default hotelAmenities; 