import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const HeroCarousel = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Hotel showcase slides with placeholder content
  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: t('home.hero.title'),
      subtitle: t('home.hero.subtitle'),
      overlay: 'from-black/60 via-black/30 to-transparent'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Luxury Accommodations',
      subtitle: 'Elegantly designed rooms with premium amenities',
      overlay: 'from-black/50 via-black/25 to-transparent'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Exceptional Dining',
      subtitle: 'Savor culinary excellence in our restaurant',
      overlay: 'from-black/55 via-black/30 to-transparent'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Prime Location',
      subtitle: 'Perfectly situated in the heart of the city',
      overlay: 'from-black/60 via-black/35 to-transparent'
    }
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{
          crossFade: true
        }}
        navigation={{
          prevEl: '.hero-prev',
          nextEl: '.hero-next',
        }}
        pagination={{
          el: '.hero-pagination',
          clickable: true,
          bulletClass: 'hero-bullet',
          bulletActiveClass: 'hero-bullet-active',
        }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        speed={1000}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative">
            <div className="relative h-full w-full">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              >
                <div className="absolute inset-0 bg-black/20"></div>
              </div>

              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${slide.overlay}`}></div>

              {/* Content */}
              <div className="relative h-full flex items-center justify-center">
                <div className="text-center text-white max-w-4xl mx-auto px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  >
                    <h1 className="mb-6 text-white drop-shadow-lg">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-white/90 drop-shadow-md leading-relaxed">
                      {slide.subtitle}
                    </p>
                    {index === 0 && ( // Only show CTA button on first slide
                      <motion.button
                        className="btn-primary text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        onClick={() => onNavigate && onNavigate('/booking')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {t('home.hero.cta')}
                      </motion.button>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="hero-prev absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 cursor-pointer group">
        <svg className="w-6 h-6 text-white group-hover:text-primary-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      
      <div className="hero-next absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 cursor-pointer group">
        <svg className="w-6 h-6 text-white group-hover:text-primary-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Custom Pagination */}
      <div className="hero-pagination absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-3"></div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-8 left-8 text-white/80 hidden md:flex flex-col items-center space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <span className="text-sm font-medium tracking-wider rotate-90 transform origin-center">
          SCROLL
        </span>
        <motion.div
          className="w-px h-12 bg-white/60"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Hotel Info Badge */}
      <motion.div
        className="absolute top-8 left-8 bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white hidden md:block"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">LC</span>
          </div>
          <div>
            <p className="font-elegant text-sm font-semibold">La Casa Boutique - GF</p>
            <p className="text-xs text-white/80">Luxury Hotel Experience</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroCarousel; 