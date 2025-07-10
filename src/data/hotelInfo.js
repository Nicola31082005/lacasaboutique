export const hotelInfo = {
  name: "La Casa Boutique - GF",
  shortName: "LC",
  tagline: "Luxury Hotel Experience",
  description: "Experience luxury and comfort in the heart of the city. Our boutique hotel offers personalized service and elegant accommodations for the discerning traveler.",
  
  contact: {
    address: "123 Luxury Street, Sofia, Bulgaria",
    phone: "+359 2 123 4567",
    email: "info@lacasaboutique.com",
    website: "www.lacasaboutique.com",
    
    // Location coordinates
    location: {
      lat: 42.6977,
      lng: 23.3219,
      city: "Sofia",
      country: "Bulgaria",
      zipCode: "1000"
    }
  },
  
  // Business hours
  hours: {
    reception: "24/7",
    checkIn: "15:00",
    checkOut: "12:00",
    restaurant: {
      breakfast: "07:00 - 10:30",
      lunch: "12:00 - 15:00",
      dinner: "18:00 - 22:00"
    },
    spa: "09:00 - 21:00",
    gym: "06:00 - 23:00"
  },
  
  // Social media
  social: {
    facebook: "https://facebook.com/lacasaboutique",
    instagram: "https://instagram.com/lacasaboutique",
    twitter: "https://twitter.com/lacasaboutique",
    linkedin: "https://linkedin.com/company/lacasaboutique"
  },
  
  // Hotel features
  features: {
    totalRooms: 45,
    totalSuites: 12,
    floors: 8,
    established: 2020,
    rating: 5,
    certifications: ["Green Hotel", "Luxury Travel", "City Center Excellence"]
  },
  
  // Transportation
  transportation: {
    airport: {
      distance: "12 km",
      time: "30 min",
      methods: ["Taxi", "Metro", "Hotel Shuttle"]
    },
    metro: {
      station: "Sofia Central",
      walkTime: "5 min"
    },
    parking: {
      available: true,
      type: "Free valet parking",
      spaces: 60
    }
  },
  
  // Policies
  policies: {
    petPolicy: "Pets allowed with prior notice",
    smokingPolicy: "Non-smoking hotel",
    cancellation: "Free cancellation up to 24 hours before check-in",
    childPolicy: "Children of all ages are welcome"
  }
};

export default hotelInfo; 