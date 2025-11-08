export const hotelInfo = {
  name: "La Casa Boutique - GF",
  shortName: "LC",
  tagline: "Luxury Hotel Experience",
  description:
    "Experience luxury and comfort in the heart of the city. Our boutique hotel offers personalized service and elegant accommodations for the discerning traveler.",

  contact: {
    address: "Охрид 5, Костинброд 2230",
    phone: "0888771268",
    phoneSecondary: "0888774068",
    phoneThird: "0886871268",
    email: "reservations@lacasaboutique-gf.com",
    website: "www.lacasaboutique-gf.com",

    // Location coordinates for Kostinbrod
    location: {
      lat: 42.809360586199276,
      lng: 23.200231472461372,
      city: "Костинброд",
      country: "България",
      zipCode: "2230",
    },
  },

  // Business hours
  hours: {
    reception: "24/7",
    checkIn: "14:00",
    checkOut: "11:00",
    restaurant: {
      breakfast: "07:00 - 10:30",
      lunch: "12:00 - 15:00",
      dinner: "18:00 - 22:00",
    },
  },

  // Social media
  social: {
    facebook: "https://facebook.com/lacasaboutique",
    instagram: "https://instagram.com/lacasaboutique",
    twitter: "https://twitter.com/lacasaboutique",
    linkedin: "https://linkedin.com/company/lacasaboutique",
  },

  // Hotel features
  features: {
    totalRooms: 6,
    totalSuites: 6,
    floors: 1,
    established: 2025,
    rating: 5,
  },

  // Transportation
  transportation: {
    airport: {
      distance: "20 km",
      time: "25 min",
      methods: ["Taxi", "Car"],
      transferService: {
        available: true,
        bookingRequired: true,
        description: "Hotel offers airport transfer service",
      },
    },
    parking: {
      available: true,
      type: "Free valet parking",
      spaces: 12,
    },
  },

  // Policies
  policies: {
    petPolicy: "Pets allowed with prior notice",
    smokingPolicy: "Non-smoking hotel",
    cancellation: "Free cancellation up to 24 hours before check-in",
    childPolicy: "Children of all ages are welcome",
  },
};

export default hotelInfo;
