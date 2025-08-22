export const roomTypes = {
  ROYAL: "royal",
  GOLDEN: "golden",
  STUDIO: "studio",
  DELUXE: "deluxe",
  SUITE: "suite",
};

export const roomAmenities = {
  // Basic amenities
  WIFI: {
    id: "wifi",
    name: "Безплатен Wi-Fi",
    nameEn: "Free Wi-Fi",
    icon: "📶",
  },
  AC: { id: "ac", name: "Климатик", nameEn: "Air conditioning", icon: "❄️" },
  TV: { id: "tv", name: "Смарт телевизор", nameEn: "Smart TV", icon: "📺" },
  MINIBAR: { id: "minibar", name: "Минибар", nameEn: "Minibar", icon: "🍷" },

  // Bathroom amenities
  FULL_BATHROOM: {
    id: "full_bathroom",
    name: "Баня с пълно оборудване(черен обков, сешоар, биде)",
    nameEn: "Fully equipped bathroom (black fixtures, hairdryer, bidet)",
    icon: "🛁",
  },
  SHOWER: {
    id: "shower",
    name: "Душ",
    nameEn: "Bathroom with shower",
    icon: "🚿",
  },
  BIDET: { id: "bidet", name: "Биде", nameEn: "Bidet", icon: "🚽" },
  HAIRDRYER: {
    id: "hairdryer",
    name: "Сешоар",
    nameEn: "Hairdryer",
    icon: "💨",
  },

  // Room features
  BALCONY: {
    id: "balcony",
    name: "Балкон с гледка и ратанов комплект",
    nameEn: "Balcony with a view and rattan set",
    icon: "🏗️",
  },
  CITY_VIEW: {
    id: "city_view",
    name: "Градска гледка",
    nameEn: "City view",
    icon: "🏙️",
  },

  // Bed options
  KING_BED: {
    id: "king_bed",
    name: "Легло King size",
    nameEn: "King-size bed",
    icon: "🛏️",
  },
  TWIN_BEDS: {
    id: "twin_beds",
    name: "Две отделни легла",
    nameEn: "Two separate beds",
    icon: "🛏️",
  },

  // Furniture & amenities
  SEATING_AREA: {
    id: "seating_area",
    name: "Кът за сядане с кожени кресла и диван",
    nameEn: "Seating area with leather armchairs and sofa",
    icon: "🪑",
  },
  DINING_AREA: {
    id: "dining_area",
    name: "Отделна трапезарна зона",
    nameEn: "Separate dining area",
    icon: "🍽️",
  },
  WARDROBE: {
    id: "wardrobe",
    name: "Гардероб",
    nameEn: "Wardrobe",
    icon: "👔",
  },
  RATTAN_SET: {
    id: "rattan_set",
    name: "Ратанов комплект",
    nameEn: "Rattan set",
    icon: "🪴",
  },

  // Special features
  TWO_BEDROOMS: {
    id: "two_bedrooms",
    name: "Две самостоятелни спални",
    nameEn: "Two separate bedrooms",
    icon: "🏠",
  },
  TWO_BATHROOMS: {
    id: "two_bathrooms",
    name: "Две бани с пълно оборудване(душ, тоалетна, мивка, сешоар, биде)",
    nameEn:
      "Two fully equipped bathrooms (shower, toilet, sink, hairdryer, bidet)",
    icon: "🛁",
  },
  WORK_SPACE: {
    id: "work_space",
    name: "Работно пространство",
    nameEn: "Work area",
    icon: "💻",
  },
  DNEVNA_ZONA: {
    id: "dnevna_zona",
    name: "Дневна зона с диван и фотьойли",
    nameEn: "Living area with sofa and armchairs",
    icon: "🛋️",
  },
  PROSTORANA_ZONA: {
    id: "prostorana_zona",
    name: "Просторна зона за сядане",
    nameEn: "Spacious seating area",
    icon: "🪑",
  },
  BALKON_MASA: {
    id: "balkon_masa",
    name: "Балкон с маса и столове",
    nameEn: "Balcony with table and chairs",
    icon: "🍽️",
  },
  SEATING_SOFA_TABLE: {
    id: "seating_sofa_table",
    name: "Кът за сядане с диван и маса",
    nameEn: "Seating area with sofa and table",
    icon: "🛋️",
  },
};

export const rooms = [
  {
    id: 1,
    name: "The Royal Suite",
    nameEn: "The Royal Suite",
    type: roomTypes.ROYAL,
    description:
      "Кралският апартамент предлага изразено усещане за простор, тишина и завършеност. Впечатлява с богати дървесни текстури, пурпурни акценти и мебели, подбрани с внимание към формата и материалите.",
    descriptionEn:
      "The Royal Suite offers a distinct sense of spaciousness, tranquility, and completeness. It impresses with rich wooden textures, crimson accents, and carefully selected furniture emphasizing form and material.",
    longDescription:
      "Кралският апартамент предлага изразено усещане за простор, тишина и завършеност. Впечатлява с богати дървесни текстури, пурпурни акценти и мебели, подбрани с внимание към формата и материалите. Централната спалня е организирана около монументално легло с декоративен гръб и стенна композиция, допълнена от класически кресла и ръчно изработени елементи. Втората зона за отдих предлага диван с кожа в наситен керемиден цвят, масивен гардероб, елегантна витрина и достъп до балкон с гледка към външния двор на ресторанта. Банята е решена с мраморен финиш, LED огледало, черен обков и пълно оборудване. Пространството е подходящо както за двойки, така и за гости, които ценят тишината, симетрията и изяществото на един завършен интериор.",
    longDescriptionEn:
      "The Royal Suite offers a distinct sense of spaciousness, tranquility, and completeness. It impresses with rich wooden textures, crimson accents, and carefully selected furniture emphasizing form and material. The central bedroom is organized around a monumental bed with a decorative headboard and wall composition, complemented by classic armchairs and handcrafted elements. The second lounging area features a deep terracotta leather sofa, a solid wardrobe, an elegant display cabinet, and access to a balcony overlooking the restaurant's courtyard. The bathroom is finished with marble surfaces, LED mirror, black fittings, and full amenities. This suite is perfect for both couples and guests who appreciate silence, symmetry, and the refined elegance of a cohesive interior.",

    capacity: { adults: 2, children: 1 },
    bedConfiguration: "King Size легло",
    bedConfigurationEn: "King-size bed",

    pricing: {
      basePrice: 180,
      currency: "€",
      period: "нощ",
      discounts: {
        weekly: 0.1,
        monthly: 0.15,
        earlyBird: 0.05,
      },
    },

    images: [
      "/The Royal suite/IMG_7670.HEIC.jpg",
      "/The Royal suite/IMG_7700.HEIC.jpg",
      "/The Royal suite/IMG_7673.HEIC.jpg",
      "/The Royal suite/IMG_7674.HEIC.jpg",
      "/The Royal suite/IMG_7698.HEIC.jpg",
      "/The Royal suite/IMG_7693.HEIC.jpg",
      "/The Royal suite/IMG_7708.HEIC.jpg",
      "/The Royal suite/IMG_7677.HEIC.jpg",
      "/The Royal suite/IMG_8052.JPG",
      "/The Royal suite/IMG_8043.JPG",
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
    ],

    features: {
      smokingAllowed: false,
      petFriendly: false,
      accessible: true,
      soundproof: true,
    },
  },

  {
    id: 2,
    name: "The Golden Suite",
    nameEn: "The Golden Suite",
    type: roomTypes.GOLDEN,
    description:
      "Златният апартамент е най-просторното помещение в хотела, съставен от две отделни спални, които споделят един и същ естетически език – тишина, елегантност и внимание към детайла.",
    descriptionEn:
      "The Golden Suite is the most spacious accommodation in the hotel, consisting of two separate bedrooms that share the same aesthetic language – calm, elegance, and attention to detail.",
    longDescription:
      "Златният апартамент е най-просторното помещение в хотела, съставен от две отделни спални, които споделят един и същ естетически език – тишина, елегантност и внимание към детайла. Първата стая разполага с балкон, изобилна естествена светлина и мебели в златисто-бели тонове с фини ръчни орнаменти, съчетани с барокови кресла и изящни фигури, а банята към нея е решена в дълбоки сини и каменни нюанси, с душ с дъждовна пита и осветено огледало. Втората спалня, Scretisca, следва същата линия – пастелни стени, богато декорирани мебели, деликатно осветление и самостоятелна баня в идентична стилистика. Апартаментът е идеален както за семейства, така и за гости, които търсят уединение и комфорт, като предлага две телевизии, климатизация, минибар, работно пространство и атмосфера, в която всеки елемент – от осветлението до текстила – е избран с мярка и вкус.",
    longDescriptionEn:
      "The Golden Suite is the most spacious accommodation in the hotel, consisting of two separate bedrooms that share the same aesthetic language – calm, elegance, and attention to detail. The first room includes a balcony, abundant natural light, and gold-white toned furniture with fine handcrafted ornaments, paired with baroque chairs and delicate figurines. The en-suite bathroom is designed in deep blue and stone hues, featuring a rain shower and illuminated mirror. The second bedroom, Scretisca, follows the same concept – pastel walls, richly decorated furniture, soft lighting, and a private bathroom in matching style. This suite is ideal for families or guests seeking privacy and comfort, offering two TVs, air conditioning, a minibar, a work area, and an atmosphere where every element – from lighting to fabric – is chosen with balance and taste.",

    capacity: { adults: 4, children: 2 },
    bedConfiguration: "Две самостоятелни спални",
    bedConfigurationEn: "Two separate bedrooms",

    pricing: {
      basePrice: 220,
      currency: "€",
      period: "нощ",
      discounts: {
        weekly: 0.12,
        monthly: 0.18,
        earlyBird: 0.07,
      },
    },

    images: [
      "/The Golden suite/IMG_7633.HEIC.jpg",
      "/The Golden suite/IMG_7634.HEIC.jpg",
      "/The Golden suite/IMG_7636.HEIC.jpg",
      "/The Golden suite/IMG_7637.HEIC.jpg",
      "/The Golden suite/IMG_7640.HEIC.jpg",
      "/The Golden suite/IMG_7644.HEIC.jpg",
      "/The Golden suite/IMG_7645.HEIC.jpg",
      "/The Golden suite/IMG_7654.HEIC.jpg",
      "/The Golden suite/IMG_7659.HEIC.jpg",
      "/The Golden suite/_A4A2280.JPG",
      "/The Golden suite/_A4A2282.JPG",
      "/The Golden suite/_A4A2283.JPG",
      "/The Golden suite/_A4A2290.JPG",
      "/The Golden suite/IMG_7996.JPG",
      "/The Golden suite/IMG_8011.JPG",
      "/The Golden suite/IMG_8013.JPG",
      "/The Golden suite/IMG_8019.JPG",
      "/The Golden suite/IMG_8027.JPG",
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
    ],

    features: {
      smokingAllowed: false,
      petFriendly: false,
      accessible: true,
      soundproof: true,
    },
  },

  {
    id: 3,
    name: "Sofia",
    nameEn: "Sofia",
    type: roomTypes.STUDIO,
    description:
      "Стая София е самостоятелно студио, сгушено под скосения покрив на най-горния етаж — тихо, светло пространство, създадено за пълноценен отдих.",
    descriptionEn:
      "The Sofia Room is a private studio nestled under the sloped roof of the top floor — a quiet, bright space designed for restful retreat.",
    longDescription:
      'Стая София е самостоятелно студио, сгушено под скосения покрив на най-горния етаж — тихо, светло пространство, създадено за пълноценен отдих. Състои се от просторна дневна зона, две отделни легла и деликатно обособена баня. Интериорът е решен в меки тонове и класически силуети, с ръчно декориран гардероб, витрина с орнаменти и изящен скрин с огледало, които внасят усещане за домашен уют и естетическа завършеност. Панорамните прозорци, бароковият кът за сядане, телевизорът с плосък екран осигуряват едновременно уединение и удобство. Практичното разпределение прави стаята подходяща както за индивидуален престой, така и за двама. „София" предлага тишина, пространство и самостоятелност — с всички необходими удобства под един покрив.',
    longDescriptionEn:
      'The Sofia Room is a private studio nestled under the sloped roof of the top floor — a quiet, bright space designed for restful retreat. It features a spacious living area, two separate beds, and a delicately separated bathroom. The interior is styled in soft tones and classic silhouettes, with a hand-painted wardrobe, an ornamented display cabinet, and a refined dresser with mirror, bringing a homely feel and aesthetic completeness. Panoramic windows, a baroque seating area, and a flat-screen TV offer both privacy and convenience. The practical layout makes it suitable for solo travelers or two guests. "Sofia" provides silence, space, and independence — with all the necessary comforts under one roof.',

    capacity: { adults: 2, children: 1 },
    bedConfiguration: "Две отделни легла",
    bedConfigurationEn: "Two separate beds",

    pricing: {
      basePrice: 140,
      currency: "€",
      period: "нощ",
      discounts: {
        weekly: 0.15,
        monthly: 0.2,
        earlyBird: 0.1,
      },
    },

    images: [
      "/Sofia/IMG_7711.HEIC.jpg",
      "/Sofia/IMG_7712.HEIC.jpg",
      "/Sofia/IMG_7713.HEIC.jpg",
      "/Sofia/IMG_7714.HEIC.jpg",
      "/Sofia/IMG_7717.HEIC.jpg",
      "/Sofia/IMG_7723.HEIC.jpg",
      "/Sofia/IMG_7727.HEIC.jpg",
      "/Sofia/IMG_7922.JPG",
      "/Sofia/IMG_7924.JPG",
      "/Sofia/IMG_7928.JPG",
      "/Sofia/IMG_7931.JPG",
    ],

    amenities: [
      roomAmenities.TWIN_BEDS,
      roomAmenities.FULL_BATHROOM,
      roomAmenities.SEATING_SOFA_TABLE,
      roomAmenities.TV,
      roomAmenities.MINIBAR,
      roomAmenities.AC,
      roomAmenities.WIFI,
      roomAmenities.WARDROBE,
    ],

    features: {
      smokingAllowed: false,
      petFriendly: false,
      accessible: true,
      soundproof: true,
    },
  },

  {
    id: 4,
    name: "Alexandria",
    nameEn: "Alexandria",
    type: roomTypes.DELUXE,
    description:
      "Пищна, симетрична и изразително топла, стая Александрия впечатлява с класически бароков силует, драматична стенна композиция и дълбоки земни тонове.",
    descriptionEn:
      "Lush, symmetrical, and warmly expressive, the Alexandria Room impresses with a classic baroque silhouette, dramatic wall composition, and deep earthy tones.",
    longDescription:
      "Пищна, симетрична и изразително топла, стая Александрия впечатлява с класически бароков силует, драматична стенна композиция и дълбоки земни тонове. Обзаведена с ръчно изработени италиански мебели, тя съчетава златни акценти, тапицирани легла и богати текстури в стил, който излъчва изтънченост и комфорт. Пространството осигурява пълно уединение и тишина, докато големите прозорци позволяват естествената светлина да моделира атмосферата през целия ден. Удобствата са подбрани с грижа към детайла – изящна витрина с порцелан, минибар, телевизор, гардероб и тоалетка с огледало оформят функционална и стилна среда. Банята е завършена с душ, биде и мивка в топъл каменен финиш, следвайки общия естетически език на стаята. Александрия съчетава уют и самостоятелност – еднакво подходяща за романтичен престой или лично уединение.",
    longDescriptionEn:
      "Lush, symmetrical, and warmly expressive, the Alexandria Room impresses with a classic baroque silhouette, dramatic wall composition, and deep earthy tones. Furnished with handcrafted Italian pieces, it combines gold accents, upholstered beds, and rich textures in a style that radiates refinement and comfort. The space ensures complete privacy and quiet, while large windows allow natural light to shape the atmosphere throughout the day. The amenities are selected with attention to detail – a fine porcelain display cabinet, minibar, TV, wardrobe, and vanity with mirror create a functional and elegant setting. The bathroom features a shower, bidet, and sink in warm stone finishes, maintaining the room's overall aesthetic language. Alexandria balances coziness and independence — ideal for romantic stays or personal retreats.",

    capacity: { adults: 2, children: 1 },
    bedConfiguration: "Две самостоятелни легла",
    bedConfigurationEn: "Two separate beds",

    pricing: {
      basePrice: 150,
      currency: "€",
      period: "нощ",
      discounts: {
        weekly: 0.18,
        monthly: 0.25,
        earlyBird: 0.12,
      },
    },

    images: [
      "/Alexandria/IMG_7731.HEIC.jpg",
      "/Alexandria/IMG_7741.HEIC.jpg",
      "/Alexandria/IMG_7747.HEIC.jpg",
      "/Alexandria/IMG_7748.HEIC.jpg",
      "/Alexandria/IMG_7749.HEIC.jpg",
      "/Alexandria/_A4A2258.JPG",
      "/Alexandria/_A4A2270.JPG",
      "/Alexandria/IMG_7980.JPG",
      "/Alexandria/IMG_7984.JPG",
    ],

    amenities: [
      roomAmenities.TWIN_BEDS,
      roomAmenities.PROSTORANA_ZONA,
      roomAmenities.MINIBAR,
      roomAmenities.TV,
      roomAmenities.FULL_BATHROOM,
      roomAmenities.AC,
      roomAmenities.WIFI,
      roomAmenities.WARDROBE,
    ],

    features: {
      smokingAllowed: false,
      petFriendly: false,
      accessible: true,
      soundproof: true,
    },
  },

  {
    id: 5,
    name: "Rome",
    nameEn: "Rome",
    type: roomTypes.SUITE,
    description:
      "Стая Рим носи дискретен разкош, вдъхновен от духа на класическата италианска естетика. Просторна и добре осветена, тя съчетава мекотата на кремави тонове с дълбочината на смарагдови акценти.",
    descriptionEn:
      "The Rome Room exudes understated luxury, inspired by classic Italian aesthetics. Spacious and well-lit, it combines the softness of cream tones with the depth of emerald accents.",
    longDescription:
      "Стая Рим носи дискретен разкош, вдъхновен от духа на класическата италианска естетика. Просторна и добре осветена, тя съчетава мекотата на кремави тонове с дълбочината на смарагдови акценти. Огледалата, рамкирани в ръчно изрисувани орнаменти, придават дълбочина и спокойна симетрия, докато декоративните детайли по леглото и мебелите създават усещане за завършена хармония. Изискан кът за сядане, витрина с декоративни стъкларии и отделена трапезна зона добавят усещане за обитаване и комфорт. Излазът към малък балкон с изглед към центъра на Костинброд допълва атмосферата з деликатна градска жизненост. Стаята едновременно предлага уединение и изтънченост – с усещане за дом, в който всеки детайл е внимателно премерен.",
    longDescriptionEn:
      "The Rome Room exudes understated luxury, inspired by classic Italian aesthetics. Spacious and well-lit, it combines the softness of cream tones with the depth of emerald accents. Mirrors framed in hand-painted ornaments add depth and peaceful symmetry, while the decorative details on the bed and furniture create a sense of harmonious completeness. An elegant seating area, a display cabinet with decorative glassware, and a separate dining space enhance the feeling of comfort and livability. The room also features a small balcony overlooking the center of Kostinbrod, adding a gentle urban vibrancy without disturbing the sense of seclusion. This room offers both intimacy and sophistication — a home-like atmosphere where every detail is thoughtfully placed.",

    capacity: { adults: 2, children: 2 },
    bedConfiguration: "King Size легло",
    bedConfigurationEn: "King-size bed",

    pricing: {
      basePrice: 170,
      currency: "€",
      period: "нощ",
      discounts: {
        weekly: 0.2,
        monthly: 0.3,
        earlyBird: 0.15,
      },
    },

    images: [
      "/Roma/IMG_7576.HEIC.jpg",
      "/Roma/IMG_7593.HEIC.jpg",
      "/Roma/_A4A2201.JPG",
      "/Roma/IMG_7888.JPG",
      "/Roma/IMG_7874.JPG",
      "/Roma/IMG_7582.jpg",
      "/Roma/IMG_7587.jpg",
      "/Roma/_A4A2223.JPG",
    ],

    amenities: [
      roomAmenities.KING_BED,
      roomAmenities.AC,
      roomAmenities.DNEVNA_ZONA,
      roomAmenities.MINIBAR,
      roomAmenities.TV,
      roomAmenities.BALKON_MASA,
      roomAmenities.SHOWER,
      roomAmenities.WIFI,
      roomAmenities.WARDROBE,
    ],

    features: {
      smokingAllowed: false,
      petFriendly: false,
      accessible: true,
      soundproof: true,
    },
  },

  {
    id: 6,
    name: "Vienna",
    nameEn: "Vienna",
    type: roomTypes.DELUXE,
    description:
      "Стаята Виена улавя елегантността на стария Виенски дух с подчертана изисканост и внимание към всеки детайл.",
    descriptionEn:
      "The Vienna Room captures the elegance of old Viennese spirit with pronounced refinement and attention to every detail.",
    longDescription:
      "Стаята Виена улавя елегантността на стария Виенски дух с подчертана изисканост и внимание към всеки детайл. Меката светлина се филтрира през тежките завеси в наситен оранжев тон, а класическите кресла и фино резбованите мебели придават завършеност на интериора. Пространството излъчва естествено равновесие – елегантно съчетание между функционалност и естетика. Интимният кът за сядане е оформен с мисъл за онези моменти, които изискват повече време и тишина. Във всяко ъгълче личи отношение – от деликатната орнаментика върху дървото до балкона, който разкрива гледка към живия ритъм на центъра на Костинброд, без да нарушава усещането за уединение.",
    longDescriptionEn:
      "The Vienna Room captures the elegance of old Viennese spirit with pronounced refinement and attention to every detail. Soft light filters through heavy curtains in deep orange tones, while classic armchairs and finely carved furniture give the interior a sense of completeness. The space exudes natural balance — an elegant blend of functionality and aesthetics. The intimate seating area is designed for moments that call for time and quiet. Every corner reflects thoughtful care — from the delicate wood ornamentation to the balcony overlooking the vibrant rhythm of Kostinbrod's center, without breaking the sense of privacy.",

    capacity: { adults: 2, children: 1 },
    bedConfiguration: "Две отделни легла",
    bedConfigurationEn: "Two separate beds",

    pricing: {
      basePrice: 160,
      currency: "€",
      period: "нощ",
      discounts: {
        weekly: 0.15,
        monthly: 0.22,
        earlyBird: 0.08,
      },
    },

    images: [
      "/Wien/IMG_7598.HEIC.jpg",
      "/Wien/IMG_7605.HEIC.jpg",
      "/Wien/IMG_7607.HEIC.jpg",
      "/Wien/Wien4.JPG",
      "/Wien/IMG_7809.JPG",
      "/Wien/IMG_7850.JPG",
      "/Wien/IMG_7863.JPG",
      "/Wien/IMG_7866.JPG",
    ],

    amenities: [
      roomAmenities.TWIN_BEDS,
      roomAmenities.AC,
      roomAmenities.TV,
      roomAmenities.MINIBAR,
      roomAmenities.WIFI,
      roomAmenities.SHOWER,
      roomAmenities.DINING_AREA,
      roomAmenities.BALKON_MASA,
      roomAmenities.WARDROBE,
    ],

    features: {
      smokingAllowed: false,
      petFriendly: false,
      accessible: true,
      soundproof: true,
    },
  },
];

// Helper functions
export const getRoomsByType = (type) => {
  return rooms.filter((room) => room.type === type);
};

export const getRooms = () => {
  return rooms;
};

export const getRoomById = (id) => {
  return rooms.find((room) => room.id === id);
};

export const getRoomsByPriceRange = (minPrice, maxPrice) => {
  return rooms.filter(
    (room) =>
      room.pricing.basePrice >= minPrice && room.pricing.basePrice <= maxPrice
  );
};

export default rooms;
