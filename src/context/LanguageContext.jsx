import React, { createContext, useContext, useState, useEffect } from 'react';

// Translation data
const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      rooms: 'Rooms',
      about: 'About Us',
      language: 'Language'
    },

    // Language Selection Page
    languageSelection: {
      title: 'Welcome to La Casa Boutique - GF',
      subtitle: 'Please select your preferred language',
      english: 'English',
      bulgarian: 'Bulgarian',
      continue: 'Continue'
    },

    // Home Page
    home: {
      hero: {
        title: 'Welcome to La Casa Boutique',
        subtitle: 'Timeless Aesthetics',
        cta: 'Book Your Stay',
        luxuryAccommodations: 'Luxury Accommodations',
        luxuryAccommodationsSubtitle: 'Elegantly designed rooms with premium amenities',
        exceptionalDining: 'Exceptional Dining',
        exceptionalDiningSubtitle: 'Savor culinary excellence in our restaurant',
        primeLocation: 'Prime Location',
        primeLocationSubtitle: 'Perfectly situated in the heart of the city',
        scroll: 'SCROLL',
        luxuryHotelExperience: 'Luxury Hotel Experience'
      },
      intro: {
        title: 'About Our Hotel',
        description: 'Welcome to a world of elegance and solitude, just minutes away from Sofia. La Casa Boutique embodies a sense of comfort and precision, wrapped in classic tones and baroque accents. Each room is individually designed with great attention to detail and furnished with handcrafted Italian pieces. Whether you\'re seeking a romantic getaway, a quiet retreat, or a brief escape from the everyday rhythm, we will welcome you with warmth and care for your every need—creating a presence that lingers long after your stay.'
      },
      rooms: {
        title: 'Our Rooms',
        subtitle: 'Choose from our carefully designed accommodations',
        viewAll: 'View All Rooms'
      },
      location: {
        title: 'Our Location',
        description: 'Perfectly situated in the heart of the city'
      },
      gettingHere: {
        title: 'Getting Here',
        byCar: 'By Car',
        fromAirport: 'From Airport',
        airportTransfer: 'Airport Transfer Available',
        transferInfo: 'We offer airport transfer service - contact us when booking',
        getDirections: 'Get Directions'
      }
    },

    // Rooms Page
    rooms: {
      title: 'Our Rooms',
      subtitle: 'Discover our elegant accommodations',
      filter: {
        all: 'All Rooms',
        available: 'Available',
        luxury: 'Luxury',
        standard: 'Standard'
      },
      details: {
        guests: 'Guests',
        size: 'Size',
        amenities: 'Amenities',
        bookNow: 'Book Now',
        viewDetails: 'View Details'
      }
    },

    // About Page
    about: {
      title: 'About La Casa Boutique',
      subtitle: 'Discover the story behind our luxury boutique hotel and the dedicated team that makes it special.',
      story: {
        title: 'Our Story',
        description: 'La Casa Boutique is a boutique guesthouse located in the center of Kostinbrod. It is a natural continuation of the Gerasimov family\'s long-standing dedication to quality, coziness, and detail. At its core stands the experience and prestige gained over the years with Navona Restaurant, established in 1999 with the same devotion to hospitality and authentic ambiance. With equal attention and consistency, the guesthouse was built step by step as a family endeavor. Every space in La Casa Boutique has its own unique character. The house offers five rooms — Alexandria, Sofia, Roma, Wien, The Royal Suite — and one apartment, The Golden Suite. The interior is carefully crafted with handmade Italian furniture by Silik, an Italian brand with a long-standing tradition in the baroque style, offering a refined balance between classic lines and contemporary feel. Each detail has its place, and every room has its own personality and aura. La Casa Boutique greets its guests with calm rhythm and grace, a space marked by its unique touch — refined, harmonious, and built with care and consistency. Coming soon, La Casa Boutique will offer even more amenities — new rooms, a relaxation area with jacuzzi, sauna, and a salt room, providing even more complete care and tranquility.',
        established: 'Established in',
        rooms: 'luxurious rooms and suites',
        located: 'Located in'
      },
      amenities: {
        title: 'Amenities',
        subtitle: 'Luxury amenities crafted for your comfort',
        wifi: 'Free Wi-Fi',
        parking: 'Free Parking',
        breakfast: 'Complimentary Breakfast',
        concierge: '24/7 Concierge Service',
        spa: 'Spa Services',
        fitness: 'Fitness Center'
      },
      team: {
        title: 'Our Team',
        description: 'Our team is committed to making your stay unforgettable.'
      },
      cta: {
        title: 'Ready to Experience',
        subtitle: 'Join thousands of satisfied guests who have made unforgettable memories with us.',
        viewRooms: 'View Our Rooms',
        contactUs: 'Contact Us'
      },
      gettingHere: {
        title: 'Getting Here',
        subtitle: 'Find us easily and travel with comfort',
        location: {
          title: 'Location',
          description: 'La Casa Boutique is conveniently located in the center of Kostinbrod, just minutes from Sofia.'
        },
        directions: {
          title: 'Directions',
          fromSofia: 'From Sofia center: 20 minutes by car via A1 highway',
          fromAirport: 'From Sofia Airport: 30 minutes by car or shuttle service',
          parking: 'Free parking available on-site'
        },
        transfers: {
          title: 'Airport Transfers',
          description: 'We offer convenient airport transfer service for our guests.',
          bookingInfo: 'Please contact us when making your reservation to arrange airport pickup.',
          contactForBooking: 'Airport transfers can be arranged upon request during booking.'
        }
      }
    },

    // Footer
    footer: {
      contact: {
        title: 'Contact Information',
        address: 'Address',
        phone: 'Phone',
        email: 'Email'
      },
      followUs: 'Follow Us',
      copyright: '© 2025 La Casa Boutique - GF. All rights reserved.'
    },

    // Amenities
    amenities: {
      wifi: {
        name: 'Free Wi-Fi',
        description: 'Complimentary high-speed Wi-Fi throughout the hotel'
      },
      restaurant: {
        name: 'Fine Dining Restaurant',
        description: 'Award-winning restaurant featuring international and local cuisine'
      },
      wellness: {
        name: 'Wellness Center',
        description: 'Wellness center with spa services'
      }
    },

    // Common
    common: {
      loading: 'Loading...',
      error: 'Something went wrong. Please try again.',
      close: 'Close',
      open: 'Open',
      more: 'More',
      less: 'Less',
      next: 'Next',
      previous: 'Previous',
      save: 'Save',
      cancel: 'Cancel',
      confirm: 'Confirm',
      back: 'Back'
    }
  },

  bg: {
    // Navigation
    nav: {
      home: 'Начало',
      rooms: 'Стаи',
      about: 'За нас',
      language: 'Език'
    },

    // Language Selection Page
    languageSelection: {
      title: 'Добре дошли в La Casa Boutique - GF',
      subtitle: 'Моля, изберете предпочитания от вас език',
      english: 'Английски',
      bulgarian: 'Български',
      continue: 'Продължи'
    },

    // Home Page
    home: {
      hero: {
        title: 'Добре дошли в La Casa Boutique',
        subtitle: 'Вечна естетика',
        cta: 'Резервирайте вашия престой',
        luxuryAccommodations: 'Луксозни настанявания',
        luxuryAccommodationsSubtitle: 'Елегантно проектирани стаи с премиум удобства',
        exceptionalDining: 'Изключителна кухня',
        exceptionalDiningSubtitle: 'Насладете се на кулинарното изкуство в нашия ресторант',
        primeLocation: 'Първокласно местоположение',
        primeLocationSubtitle: 'Перфектно разположен в сърцето на града',
        scroll: 'ПРЕВЪРТЕТЕ',
        luxuryHotelExperience: 'Луксозно хотелско преживяване'
      },
      intro: {
        title: 'За нашия хотел',
        description: 'Добре дошли в свят на елегантност и уединение, разположен на минути от София. La Casa Boutique въплъщава усещане за комфорт и прецизност, облечено в класически тонове и барокови акценти. Всяка стая е индивидуално проектирана, с внимание към детайла и обзавена с ръчно изработени италиански мебели. Независимо дали търсите романтичен престой, тиха почивка или кратко бягство от ежедневния ритъм, тук ще ви посрещнем с топлина и внимание към всяка ваша нужда- с присъствие, което остава дълго след престоя.'
      },
      rooms: {
        title: 'Нашите стаи',
        subtitle: 'Изберете от нашите внимателно проектирани помещения',
        viewAll: 'Вижте всички стаи'
      },
      location: {
        title: 'Нашето местоположение',
        description: 'Перфектно разположен в сърцето на града'
      },
      gettingHere: {
        title: 'Как да стигнете до нас',
        byCar: 'С кола',
        fromAirport: 'От летището',
        airportTransfer: 'Наличен трансфер от летището',
        transferInfo: 'Предлагаме услуга за трансфер от летището - свържете се с нас при резервация',
        getDirections: 'Вземете указания'
      }
    },

    // Rooms Page
    rooms: {
      title: 'Нашите стаи',
      subtitle: 'Открийте нашите елегантни помещения',
      filter: {
        all: 'Всички стаи',
        available: 'Налични',
        luxury: 'Луксозни',
        standard: 'Стандартни'
      },
      details: {
        guests: 'Гости',
        size: 'Размер',
        amenities: 'Удобства',
        bookNow: 'Резервирайте сега',
        viewDetails: 'Вижте детайли'
      }
    },

    // About Page
    about: {
      title: 'За La Casa Boutique',
      subtitle: 'Открийте историята зад нашия луксозен бутиков хотел и отдадения екип, който го прави специален.',
      story: {
        title: 'Нашата история',
        description: 'La Casa Boutique е бутикова къща за гости, намираща се в центъра на гр. Костинброд, и е естествено продължение на дългогодишната отдаденост на семейство Герасимови към качеството, уюта и детайла. В основата ѝ стои опитът и престижът, натрупан през годините с ресторант "Навона" – създаден през 1999 г. със същата отдаденост към гостоприемството и автентичната атмосфера. Със същото внимание и постоянство, къщата за гости се изгражда стъпка по стъпка, като семейно дело. Всяко пространство в La Casa Boutique носи уникален характер, като къщата разполага с 5 стаи- Alexandria, Sofia, Roma, Wien, The Royal suite и един апартамент- The golden suite. Интериорът е прецизно оформен с ръчно изработени италиански мебели от Silik, италианска марка с дългогодишна традиция в бароковия стил, внасящ изтънченост и фин баланс между класическа линия и съвременно усещане. Всеки детайл има собствено място и всяка стая носи собствен характер и излъчване. La Casa Boutique посреща със спокоен ритъм и изящество, пространство, с уникален по себе си почерк – фино, хармонично и изградено с усет и постоянство. Скоро La Casa Boutique ще посрещне своите гости с още допълнителни удобства — нови стаи, релакс зона с джакузи, сауна и солна стая, за да предложи още по-пълноценна грижа и спокойствие.',
        established: 'Основан през',
        rooms: 'луксозни стаи и апартаменти',
        located: 'Разположен в'
      },
      amenities: {
        title: 'Удобства',
        subtitle: 'Луксозни удобства, създадени за вашия комфорт',
        wifi: 'Безплатен Wi-Fi',
        parking: 'Безплатен паркинг',
        breakfast: 'Безплатна закуска',
        concierge: '24/7 Консиерж услуги',
        spa: 'СПА услуги',
        fitness: 'Фитнес център'
      },
      team: {
        title: 'Нашият екип',
        description: 'Нашият отдаден екип от професионалисти е ангажиран да направи вашия престой незабравим.'
      },
      cta: {
        title: 'Готови ли сте да преживеете',
        subtitle: 'Присъединете се към хиляди доволни гости, които са направили незабравими спомени с нас.',
        viewRooms: 'Вижте нашите стаи',
        contactUs: 'Свържете се с нас'
      },
      gettingHere: {
        title: 'Как да стигнете до нас',
        subtitle: 'Намерете ни лесно и пътувайте удобно',
        location: {
          title: 'Местоположение',
          description: 'La Casa Boutique е удобно разположен в центъра на гр. Костинброд, само на минути от София.'
        },
        directions: {
          title: 'Указания',
          fromSofia: 'От центъра на София: 20 минути с кола по магистрала А1',
          fromAirport: 'От летище София: 30 минути с кола или трансферна услуга',
          parking: 'Безплатен паркинг на място'
        },
        transfers: {
          title: 'Трансфер от летището',
          description: 'Предлагаме удобна услуга за трансфер от летището за нашите гости.',
          bookingInfo: 'Моля, свържете се с нас при правене на резервация, за да организирате трансфер от летището.',
          contactForBooking: 'Трансферът от летището може да бъде организиран при поискване по време на резервацията.'
        }
      }
    },

    // Footer
    footer: {
      contact: {
        title: 'Информация за контакт',
        address: 'Адрес',
        phone: 'Телефон',
        email: 'Имейл'
      },
      followUs: 'Следете ни',
      copyright: '© 2025 La Casa Boutique - GF. Всички права запазени.'
    },

    // Amenities
    amenities: {
      wifi: {
        name: 'Безплатен Wi-Fi',
        description: 'Безплатен високоскоростен Wi-Fi в целия хотел'
      },
      restaurant: {
        name: 'Ресторант за фина кухня',
        description: 'Награден ресторант с международна и местна кухня'
      },
      wellness: {
        name: 'Уелнес център',
        description: 'Уелнес център със СПА услуги'
      }
    },

    // Common
    common: {
      loading: 'Зареждане...',
      error: 'Възникна грешка. Моля, опитайте отново.',
      close: 'Затвори',
      open: 'Отвори',
      more: 'Още',
      less: 'По-малко',
      next: 'Следващ',
      previous: 'Предишен',
      save: 'Запази',
      cancel: 'Отказ',
      confirm: 'Потвърди',
      back: 'Назад'
    }
  }
};

// Create the context
const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
  isLoading: false
});

// Language Provider component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(true);

  // Load language from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('hotel-language');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'bg')) {
      setLanguage(savedLanguage);
    }
    setIsLoading(false);
  }, []);

  // Save language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('hotel-language', language);
  }, [language]);

  // Translation function
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if translation not found
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return the key itself if no translation found
          }
        }
        break;
      }
    }

    return typeof value === 'string' ? value : key;
  };

  // Change language function
  const changeLanguage = (newLanguage) => {
    if (newLanguage === 'en' || newLanguage === 'bg') {
      setLanguage(newLanguage);
    }
  };

  const value = {
    language,
    setLanguage: changeLanguage,
    t,
    isLoading
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
};

export default LanguageContext;