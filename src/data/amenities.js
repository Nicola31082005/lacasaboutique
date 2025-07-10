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
    id: 'wifi',
    name: 'Free Wi-Fi',
    category: amenityCategories.CONNECTIVITY,
    description: 'Complimentary high-speed Wi-Fi throughout the hotel',
    icon: '📶',
    available: true,
    hours: '24/7',
    features: ['High-Speed Internet', 'Hotel-Wide Coverage', 'No Data Limits', 'Secure Connection']
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
    id: 'pet_services',
    name: 'Pet Services',
    category: amenityCategories.FAMILY,
    description: 'Pet-friendly accommodations and services',
    icon: '🐕',
    available: true,
    hours: '24/7',
    features: ['Pet Beds', 'Walking Service', 'Pet Sitting', 'Grooming Referrals']
  },
  


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
    ['fitness', 'restaurant', 'wifi', ].includes(amenity.id)
  );
};

export default hotelAmenities; 