import React, { createContext, useContext, useState, useEffect } from 'react';

// Translation data
const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      rooms: 'Rooms',
      about: 'About Us',
      booking: 'Booking',
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
        title: 'Welcome to La Casa Boutique - GF',
        subtitle: 'Experience luxury and comfort in the heart of the city',
        cta: 'Book Your Stay'
      },
      intro: {
        title: 'About Our Hotel',
        description: 'La Casa Boutique - GF offers an unforgettable experience with elegant accommodations, exceptional service, and prime location. Discover the perfect blend of comfort and sophistication.'
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
      title: 'About La Casa Boutique - GF',
      story: {
        title: 'Our Story',
        description: 'Founded with a passion for hospitality and luxury, La Casa Boutique - GF has been providing exceptional experiences for our guests. Our commitment to excellence and attention to detail make us a premier destination.'
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
        description: 'Our dedicated team of professionals is committed to making your stay unforgettable.'
      }
    },
    
    // Booking Page
    booking: {
      title: 'Book Your Stay',
      form: {
        checkIn: 'Check-in Date',
        checkOut: 'Check-out Date',
        guests: 'Number of Guests',
        roomType: 'Room Type',
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        phone: 'Phone Number',
        specialRequests: 'Special Requests',
        submit: 'Book Now',
        required: 'Required field'
      },
      confirmation: {
        title: 'Booking Confirmation',
        message: 'Thank you for your booking! We will contact you shortly to confirm your reservation.'
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
      copyright: '© 2024 La Casa Boutique - GF. All rights reserved.'
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
      booking: 'Резервация',
      language: 'Език'
    },
    
    // Language Selection Page
    languageSelection: {
      title: 'Добре дошли в Ла Каза Бутик - ГФ',
      subtitle: 'Моля, изберете предпочитания от вас език',
      english: 'Английски',
      bulgarian: 'Български',
      continue: 'Продължи'
    },
    
    // Home Page
    home: {
      hero: {
        title: 'Добре дошли в Ла Каза Бутик - ГФ',
        subtitle: 'Насладете се на лукс и комфорт в сърцето на града',
        cta: 'Резервирайте вашия престой'
      },
      intro: {
        title: 'За нашия хотел',
        description: 'Ла Каза Бутик - ГФ предлага незабравимо преживяване с елегантни помещения, изключително обслужване и отлично местоположение. Открийте перфектното съчетание от комфорт и изтънченост.'
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
      title: 'За Ла Каза Бутик - ГФ',
      story: {
        title: 'Нашата история',
        description: 'Основан с страст към гостоприемството и лукса, Ла Каза Бутик - ГФ предоставя изключителни преживявания за нашите гости. Нашата отдаденост към съвършенството и вниманието към детайлите ни правят предпочитана дестинация.'
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
    
    // Booking Page
    booking: {
      title: 'Резервирайте вашия престой',
      form: {
        checkIn: 'Дата на настаняване',
        checkOut: 'Дата на напускане',
        guests: 'Брой гости',
        roomType: 'Тип стая',
        firstName: 'Име',
        lastName: 'Фамилия',
        email: 'Имейл',
        phone: 'Телефон',
        specialRequests: 'Специални заявки',
        submit: 'Резервирайте сега',
        required: 'Задължително поле'
      },
      confirmation: {
        title: 'Потвърждение на резервацията',
        message: 'Благодарим ви за резервацията! Ще се свържем с вас скоро, за да потвърдим вашата резервация.'
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
      copyright: '© 2024 Ла Каза Бутик - ГФ. Всички права запазени.'
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