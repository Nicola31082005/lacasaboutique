export const hotelInfo = {
  name: "La Casa Boutique - GF",
  shortName: "LC",
  tagline: "Luxury Hotel Experience",
  description: "Experience luxury and comfort in the heart of the city. Our boutique hotel offers personalized service and elegant accommodations for the discerning traveler.",
  
  contact: {
    address: "кв. Захари Зограф, Охрид 5, 2230 Kostinbrod",
    phone: "+359 2 123 4567",
    email: "info@lacasaboutique.com",
    website: "www.lacasaboutique.com",
    
    // Location coordinates
    location: {
      lat: 42.809360586199276,
      lng: 23.200231472461372,
      city: "Kostinbrod",
      country: "Bulgaria",
      zipCode: "1000"
    }
  },
  
  // Business hours
  hours: {
    reception: "24/7",
    checkIn: "14:00",
    checkOut: "11:00",
    restaurant: {
      breakfast: "07:00 - 10:30",
      lunch: "12:00 - 15:00",
      dinner: "18:00 - 22:00"
    },
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
    totalRooms: 10,
    totalSuites: 10,
    floors: 1,
    established: 2025,
    rating: 5,
  },
  
  // Transportation
  transportation: {
    airport: {
      distance: "12 km",
      time: "30 min",
      methods: ["Taxi", "Car"]
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