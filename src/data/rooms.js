export const roomTypes = {
  ROYAL: 'royal',
  GOLDEN: 'golden', 
  STUDIO: 'studio',
  DELUXE: 'deluxe',
  SUITE: 'suite'
};

export const roomAmenities = {
  // Basic amenities
  WIFI: { id: 'wifi', name: 'Безплатен Wi-Fi', icon: '📶' },
  AC: { id: 'ac', name: 'Климатик', icon: '❄️' },
  TV: { id: 'tv', name: 'Смарт телевизор', icon: '📺' },
  MINIBAR: { id: 'minibar', name: 'Минибар', icon: '🍷' },
  
  // Bathroom amenities
  FULL_BATHROOM: { id: 'full_bathroom', name: 'Баня с пълно оборудване', icon: '🛁' },
  SHOWER: { id: 'shower', name: 'Душ', icon: '🚿' },
  BIDET: { id: 'bidet', name: 'Биде', icon: '🚽' },
  HAIRDRYER: { id: 'hairdryer', name: 'Сешоар', icon: '💨' },
  
  // Room features
  BALCONY: { id: 'balcony', name: 'Балкон', icon: '🏗️' },
  CITY_VIEW: { id: 'city_view', name: 'Градска гледка', icon: '🏙️' },
  
  // Bed options
  KING_BED: { id: 'king_bed', name: 'King Size легло', icon: '🛏️' },
  TWIN_BEDS: { id: 'twin_beds', name: 'Две отделни легла', icon: '🛏️' },
  
  // Furniture & amenities
  SEATING_AREA: { id: 'seating_area', name: 'Кът за сядане', icon: '🪑' },
  DINING_AREA: { id: 'dining_area', name: 'Трапезарна зона', icon: '🍽️' },
  WARDROBE: { id: 'wardrobe', name: 'Гардероб', icon: '👔' },
  RATTAN_SET: { id: 'rattan_set', name: 'Ратанов комплект', icon: '🪴' },
  
  // Special features
  TWO_BEDROOMS: { id: 'two_bedrooms', name: 'Две самостоятелни спални', icon: '🏠' },
  TWO_BATHROOMS: { id: 'two_bathrooms', name: 'Две бани', icon: '🛁' },
  WORK_SPACE: { id: 'work_space', name: 'Работно пространство', icon: '💻' }
};

export const rooms = [
  {
    id: 1,
    name: 'Кралският апартамент',
    nameEn: 'The Royal Apartment',
    type: roomTypes.ROYAL,
    description: 'Кралският апартамент предлага изразено усещане за простор, тишина и завършеност. Впечатлява с богати дървесни текстури, пурпурни акценти и мебели, подбрани с внимание към формата и материалите.',
    longDescription: 'Кралският апартамент предлага изразено усещане за простор, тишина и завършеност. Впечатлява с богати дървесни текстури, пурпурни акценти и мебели, подбрани с внимание към формата и материалите. Централната спалня е организирана около монументално легло с декоративен гръб и стенна композиция, допълнена от класически кресла и ръчно изработени елементи. Втората зона за отдих предлага диван с кожа в наситен керемиден цвят, масивен гардероб, елегантна витрина и достъп до балкон с гледка към външния двор на ресторанта. Банята е решена с мраморен финиш, LED огледало, черен обков и пълно оборудване. Пространството е подходящо както за двойки, така и за гости, които ценят тишината, симетрията и изяществото на един завършен интериор.',
    
    size: '45m²',
    capacity: { adults: 2, children: 1 },
    bedConfiguration: 'King Size легло',
    
    pricing: {
      basePrice: 180,
      currency: '€',
      period: 'нощ',
      discounts: {
        weekly: 0.10,
        monthly: 0.15,
        earlyBird: 0.05
      }
    },
    
    images: [
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80'
    ],
    
    amenities: [
      roomAmenities.KING_BED,
      roomAmenities.SEATING_AREA,
      roomAmenities.FULL_BATHROOM,
      roomAmenities.BALCONY,
      roomAmenities.TV,
      roomAmenities.AC,
      roomAmenities.MINIBAR,
      roomAmenities.WIFI,
      roomAmenities.WARDROBE,
      roomAmenities.RATTAN_SET
    ],
    
    features: {
      smokingAllowed: false,
      petFriendly: false,
      accessible: true,
      soundproof: true
    }
  },
  
  {
    id: 2,
    name: 'Златният апартамент',
    nameEn: 'The Golden Apartment',
    type: roomTypes.GOLDEN,
    description: 'Златният апартамент е най-просторното помещение в хотела, съставен от две отделни спални, които споделят един и същ естетически език – тишина, елегантност и внимание към детайла.',
    longDescription: 'Златният апартамент е най-просторното помещение в хотела, съставен от две отделни спални, които споделят един и същ естетически език – тишина, елегантност и внимание към детайла. Първата стая разполага с балкон, изобилна естествена светлина и мебели в златисто-бели тонове с фини ръчни орнаменти, съчетани с барокови кресла и изящни фигури, а банята към нея е решена в дълбоки сини и каменни нюанси, с душ с дъждовна пита и осветено огледало. Втората спалня, Scretisca, следва същата линия – пастелни стени, богато декорирани мебели, деликатно осветление и самостоятелна баня в идентична стилистика. Апартаментът е идеален както за семейства, така и за гости, които търсят уединение и комфорт.',
    
    size: '60m²',
    capacity: { adults: 4, children: 2 },
    bedConfiguration: 'Две самостоятелни спални',
    
    pricing: {
      basePrice: 220,
      currency: '€',
      period: 'нощ',
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
      roomAmenities.TWO_BEDROOMS,
      roomAmenities.TWO_BATHROOMS,
      roomAmenities.BALCONY,
      roomAmenities.TV,
      roomAmenities.AC,
      roomAmenities.MINIBAR,
      roomAmenities.WIFI,
      roomAmenities.WARDROBE,
      roomAmenities.RATTAN_SET,
      roomAmenities.WORK_SPACE
    ],
    
    features: {
      smokingAllowed: false,
      petFriendly: false,
      accessible: true,
      soundproof: true
    }
  },
  
  {
    id: 3,
    name: 'София',
    nameEn: 'Sofia',
    type: roomTypes.STUDIO,
    description: 'Стая София е самостоятелно студио, сгушено под скосения покрив на най-горния етаж — тихо, светло пространство, създадено за пълноценен отдих.',
    longDescription: 'Стая София е самостоятелно студио, сгушено под скосения покрив на най-горния етаж — тихо, светло пространство, създадено за пълноценен отдих. Състои се от просторна дневна зона, две отделни легла и деликатно обособена баня. Интериорът е решен в меки тонове и класически силуети, с ръчно декориран гардероб, витрина с орнаменти и изящен скрин с огледало, които внасят усещане за домашен уют и естетическа завършеност. Панорамните прозорци, бароковият кът за сядане, телевизорът с плосък екран осигуряват едновременно уединение и удобство.',
    
    size: '35m²',
    capacity: { adults: 2, children: 1 },
    bedConfiguration: 'Две отделни легла',
    
    pricing: {
      basePrice: 140,
      currency: '€',
      period: 'нощ',
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
      roomAmenities.TWIN_BEDS,
      roomAmenities.FULL_BATHROOM,
      roomAmenities.SEATING_AREA,
      roomAmenities.TV,
      roomAmenities.MINIBAR,
      roomAmenities.AC,
      roomAmenities.WIFI,
      roomAmenities.WARDROBE
    ],
    
    features: {
      smokingAllowed: false,
      petFriendly: false,
      accessible: true,
      soundproof: true
    }
  },
  
  {
    id: 4,
    name: 'Александрия',
    nameEn: 'Alexandria',
    type: roomTypes.DELUXE,
    description: 'Пищна, симетрична и изразително топла, стая Александрия впечатлява с класически бароков силует, драматична стенна композиция и дълбоки земни тонове.',
    longDescription: 'Пищна, симетрична и изразително топла, стая Александрия впечатлява с класически бароков силует, драматична стенна композиция и дълбоки земни тонове. Обзаведена с ръчно изработени италиански мебели, тя съчетава златни акценти, тапицирани легла и богати текстури в стил, който излъчва изтънченост и комфорт. Пространството осигурява пълно уединение и тишина, докато големите прозорци позволяват естествената светлина да моделира атмосферата през целия ден. Банята е завършена с душ, биде и мивка в топъл каменен финиш.',
    
    size: '40m²',
    capacity: { adults: 2, children: 1 },
    bedConfiguration: 'Две отделни легла',
    
    pricing: {
      basePrice: 150,
      currency: '€',
      period: 'нощ',
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
      roomAmenities.TWIN_BEDS,
      roomAmenities.SEATING_AREA,
      roomAmenities.MINIBAR,
      roomAmenities.TV,
      roomAmenities.FULL_BATHROOM,
      roomAmenities.AC,
      roomAmenities.WIFI,
      roomAmenities.WARDROBE
    ],
    
    features: {
      smokingAllowed: false,
      petFriendly: false,
      accessible: true,
      soundproof: true
    }
  },
  
  {
    id: 5,
    name: 'Рим',
    nameEn: 'Rome',
    type: roomTypes.SUITE,
    description: 'Стая Рим носи дискретен разкош, вдъхновен от духа на класическата италианска естетика. Просторна и добре осветена, тя съчетава мекотата на кремави тонове с дълбочината на смарагдови акценти.',
    longDescription: 'Стая Рим носи дискретен разкош, вдъхновен от духа на класическата италианска естетика. Просторна и добре осветена, тя съчетава мекотата на кремави тонове с дълбочината на смарагдови акценти. Огледалата, рамкирани в ръчно изрисувани орнаменти, придават дълбочина и спокойна симетрия, докато декоративните детайли по леглото и мебелите създават усещане за завършена хармония. Изискан кът за сядане, витрина с декоративни стъкларии и отделена трапезна зона добавят усещане за обитаване и комфорт.',
    
    size: '50m²',
    capacity: { adults: 2, children: 2 },
    bedConfiguration: 'King Size легло',
    
    pricing: {
      basePrice: 170,
      currency: '€',
      period: 'нощ',
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
      roomAmenities.KING_BED,
      roomAmenities.AC,
      roomAmenities.SEATING_AREA,
      roomAmenities.MINIBAR,
      roomAmenities.TV,
      roomAmenities.BALCONY,
      roomAmenities.SHOWER,
      roomAmenities.WIFI,
      roomAmenities.WARDROBE,
      roomAmenities.CITY_VIEW
    ],
    
    features: {
      smokingAllowed: false,
      petFriendly: false,
      accessible: true,
      soundproof: true
    }
  },

  {
    id: 6,
    name: 'Виена',
    nameEn: 'Vienna',
    type: roomTypes.DELUXE,
    description: 'Стаята Виена улавя елегантността на стария Виенски дух с подчертана изисканост и внимание към всеки детайл.',
    longDescription: 'Стаята Виена улавя елегантността на стария Виенски дух с подчертана изисканост и внимание към всеки детайл. Меката светлина се филтрира през тежките завеси в наситен оранжев тон, а класическите кресла и фино резбованите мебели придават завършеност на интериора. Пространството излъчва естествено равновесие – елегантно съчетание между функционалност и естетика. Интимният кът за сядане е оформен с мисъл за онези моменти, които изискват повече време и тишина.',
    
    size: '45m²',
    capacity: { adults: 2, children: 1 },
    bedConfiguration: 'Две отделни легла',
    
    pricing: {
      basePrice: 160,
      currency: '€',
      period: 'нощ',
      discounts: {
        weekly: 0.15,
        monthly: 0.22,
        earlyBird: 0.08
      }
    },
    
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
    
    amenities: [
      roomAmenities.TWIN_BEDS,
      roomAmenities.AC,
      roomAmenities.TV,
      roomAmenities.MINIBAR,
      roomAmenities.WIFI,
      roomAmenities.SHOWER,
      roomAmenities.DINING_AREA,
      roomAmenities.BALCONY,
      roomAmenities.WARDROBE
    ],
    
    features: {
      smokingAllowed: false,
      petFriendly: false,
      accessible: true,
      soundproof: true
    }
  }
];

// Helper functions
export const getRoomsByType = (type) => {
  return rooms.filter(room => room.type === type);
};


export const getRooms = () => {
  return rooms;
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