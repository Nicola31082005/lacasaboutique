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
        cta: 'Book Your Stay'
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
      story: {
        title: 'Our Story',
        description: 'La Casa Boutique is a boutique guesthouse located in the center of Kostinbrod. It is a natural continuation of the Gerasimov family\'s long-standing dedication to quality, coziness, and detail. At its core stands the experience and prestige gained over the years with Navona Restaurant, established in 1999 with the same devotion to hospitality and authentic ambiance. With equal attention and consistency, the guesthouse was built step by step as a family endeavor. Every space in La Casa Boutique has its own unique character. The house offers five rooms — Alexandria, Sofia, Roma, Wien, The Royal Suite — and one apartment, The Golden Suite. The interior is carefully crafted with handmade Italian furniture by Silik, an Italian brand with a long-standing tradition in the baroque style, offering a refined balance between classic lines and contemporary feel. Each detail has its place, and every room has its own personality and aura. La Casa Boutique greets its guests with calm rhythm and grace, a space marked by its unique touch — refined, harmonious, and built with care and consistency. Coming soon, La Casa Boutique will offer even more amenities — new rooms, a relaxation area with jacuzzi, sauna, and a salt room, providing even more complete care and tranquility.'
      },
      amenities: {
        title: 'Amenities',
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
        cta: 'Резервирайте вашия престой'
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
      story: {
        title: 'Нашата история',
        description: 'La Casa Boutique е бутикова къща за гости, намираща се в центъра на гр. Костинброд, и е естествено продължение на дългогодишната отдаденост на семейство Герасимови към качеството, уюта и детайла. В основата ѝ стои опитът и престижът, натрупан през годините с ресторант "Навона" – създаден през 1999 г. със същата отдаденост към гостоприемството и автентичната атмосфера. Със същото внимание и постоянство, къщата за гости се изгражда стъпка по стъпка, като семейно дело. Всяко пространство в La Casa Boutique носи уникален характер, като къщата разполага с 5 стаи- Alexandria, Sofia, Roma, Wien, The Royal suite и един апартамент- The golden suite. Интериорът е прецизно оформен с ръчно изработени италиански мебели от Silik, италианска марка с дългогодишна традиция в бароковия стил, внасящ изтънченост и фин баланс между класическа линия и съвременно усещане. Всеки детайл има собствено място и всяка стая носи собствен характер и излъчване. La Casa Boutique посреща със спокоен ритъм и изящество, пространство, с уникален по себе си почерк – фино, хармонично и изградено с усет и постоянство. Скоро La Casa Boutique ще посрещне своите гости с още допълнителни удобства — нови стаи, релакс зона с джакузи, сауна и солна стая, за да предложи още по-пълноценна грижа и спокойствие.'
      },
      amenities: {
        title: 'Удобства',
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