# La Casa Boutique - GF Hotel Website Implementation Guide

## Project Overview
A modern Single Page Application (SPA) for La Casa Boutique - GF hotel with multi-language support (English/Bulgarian), featuring image carousels, room showcases, and booking functionality.

## Current Status
- ✅ Vite React app initialized
- ✅ Basic project structure in place
- ⏳ Implementation pending

## Technology Stack & Libraries

### Core Dependencies
- **React 19.1.0** - Main framework
- **React Router DOM** - Navigation and routing
- **React Context API** - State management for language switching
- **Framer Motion** - Animations and transitions
- **Swiper.js** - Carousel functionality
- **React Hook Form** - Form handling
- **Leaflet/React-Leaflet** - Interactive maps
- **React Icons** - Icon library
- **Tailwind CSS** - Styling framework

### Dev Dependencies
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Project Structure
```
src/
├── components/
│   ├── common/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── LanguageSelector.jsx
│   │   └── Loading.jsx
│   ├── home/
│   │   ├── HeroCarousel.jsx
│   │   ├── IntroductionSection.jsx
│   │   ├── RoomCards.jsx
│   │   └── LocationMap.jsx
│   ├── rooms/
│   │   ├── RoomsList.jsx
│   │   └── RoomCard.jsx
│   ├── about/
│   │   └── AboutSection.jsx
│   └── booking/
│       └── BookingForm.jsx
├── pages/
│   ├── LanguageSelection.jsx
│   ├── Home.jsx
│   ├── Rooms.jsx
│   ├── About.jsx
│   └── Booking.jsx
├── context/
│   └── LanguageContext.jsx
├── utils/
│   └── translations.js
├── assets/
│   ├── images/
│   │   ├── hotel/
│   │   └── rooms/
│   └── icons/
├── styles/
│   └── globals.css
└── data/
    ├── hotelData.js
    └── roomsData.js
```

## Implementation Phase Plan

### Phase 1: Foundation Setup (Priority: High)
1. **Install Required Dependencies**
   ```bash
   npm install react-router-dom framer-motion swiper react-hook-form leaflet react-leaflet react-icons tailwindcss
   ```

2. **Setup Tailwind CSS**
   - Configure Tailwind CSS
   - Create base styles
   - Setup responsive breakpoints

3. **Create Language Context**
   - Implement React Context for language management
   - Create translation utility functions
   - Setup language persistence (localStorage)

4. **Language Selection Page**
   - Create initial language selection screen
   - Implement language choice persistence
   - Route to main app after selection

### Phase 2: Core Navigation & Layout (Priority: High)
1. **Setup React Router**
   - Configure main routes (Home, Rooms, About, Booking)
   - Implement protected routing logic
   - Setup navigation guards

2. **Create Header Component**
   - Navigation menu (Home, Rooms, About Us)
   - Language switcher
   - Mobile responsive hamburger menu
   - Logo/branding

3. **Create Footer Component**
   - Contact information
   - Social media links
   - Copyright information

### Phase 3: Home Page Implementation (Priority: High)
1. **Hero Carousel Component**
   - Implement Swiper.js carousel
   - Add hotel main images (large format)
   - Auto-play functionality
   - Navigation dots/arrows
   - Responsive design

2. **Introduction Section**
   - Heading with hotel introduction
   - Brief description text
   - Elegant typography and spacing

3. **Call-to-Action Button**
   - "Order Now" button
   - Route to booking page
   - Smooth animations
   - Eye-catching design

4. **Room Cards Carousel**
   - Smaller cards format
   - Moving/sliding functionality
   - Room images and descriptions
   - Hover effects and interactions
   - Link to individual room details

5. **Location Map Integration**
   - Integrate Leaflet maps
   - Mark hotel location
   - Custom marker with hotel branding
   - Interactive map controls

### Phase 4: Additional Pages (Priority: Medium)
1. **Rooms Page**
   - Detailed room listings
   - Filter and search functionality
   - Room image galleries
   - Pricing information
   - Availability calendar

2. **About Us Page**
   - Hotel history and story
   - Team information
   - Facilities and amenities
   - Image gallery

3. **Booking Page**
   - Booking form with validation
   - Date picker integration
   - Room selection
   - Guest information form
   - Booking confirmation

### Phase 5: Data Management (Priority: Medium)
1. **Create Static Data Files**
   - Hotel information
   - Room details and images
   - Pricing data
   - Translation strings

2. **Implement Data Fetching**
   - Create data service layer
   - Implement loading states
   - Error handling

### Phase 6: Styling & Animations (Priority: Medium)
1. **Responsive Design**
   - Mobile-first approach
   - Tablet and desktop layouts
   - Cross-browser compatibility

2. **Animations & Transitions**
   - Framer Motion implementations
   - Page transitions
   - Component animations
   - Loading animations

3. **UI/UX Enhancements**
   - Consistent color scheme
   - Typography system
   - Spacing and layout grid
   - Interactive elements

### Phase 7: Multi-Language Implementation (Priority: High)
1. **Translation System**
   - Create translation JSON files
   - Implement translation hooks
   - Context provider setup
   - Dynamic language switching

2. **Language Files Structure**
   ```
   utils/translations/
   ├── en.json
   └── bg.json
   ```

3. **Language Features**
   - Language detection
   - URL-based language routing
   - Language preference persistence
   - RTL support (if needed)

### Phase 8: Testing & Optimization (Priority: Low)
1. **Performance Optimization**
   - Image optimization
   - Code splitting
   - Lazy loading
   - Bundle analysis

2. **Testing**
   - Component testing
   - Integration testing
   - Cross-browser testing
   - Mobile testing

3. **SEO & Accessibility**
   - Meta tags optimization
   - Accessibility compliance
   - Search engine optimization

## Key Implementation Notes

### Language Context Pattern
```javascript
// Example structure for LanguageContext
const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key, // translation function
});
```

### Carousel Implementation
- Use Swiper.js for both hero and room carousels
- Implement different configurations for each carousel type
- Ensure touch/swipe support for mobile devices

### Responsive Design Breakpoints
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

### Color Scheme Suggestion
- Primary: Warm gold/champagne tones
- Secondary: Deep navy or charcoal
- Accent: Soft cream/white
- Text: Dark gray/black for readability

## Installation Commands

```bash
# Install main dependencies
npm install react-router-dom framer-motion swiper react-hook-form leaflet react-leaflet react-icons

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install additional utilities
npm install classnames clsx

# Install development dependencies
npm install -D prettier eslint-config-prettier
```

## Implementation Priority Order
1. **Phase 1**: Foundation Setup
2. **Phase 7**: Multi-Language Implementation
3. **Phase 2**: Core Navigation & Layout
4. **Phase 3**: Home Page Implementation
5. **Phase 4**: Additional Pages
6. **Phase 5**: Data Management
7. **Phase 6**: Styling & Animations
8. **Phase 8**: Testing & Optimization

## Success Criteria
- ✅ Fully functional SPA with all requested pages
- ✅ Working language switching (English/Bulgarian)
- ✅ Responsive design across all devices
- ✅ Smooth animations and transitions
- ✅ Interactive carousels and maps
- ✅ Professional hotel branding and design
- ✅ Booking functionality
- ✅ SEO-friendly implementation

## Next Steps
1. Start with Phase 1: Foundation Setup
2. Install all required dependencies
3. Setup Tailwind CSS configuration
4. Create the language context system
5. Implement the language selection page

---

*This document will be updated as implementation progresses. Each completed task should be marked with ✅ and any changes or discoveries should be documented.* 