import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import HeroCarousel from '../components/home/HeroCarousel';
import RoomCards from '../components/home/RoomCards';
import LocationMap from '../components/home/LocationMap';

const Home = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Introduction Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="mb-6 text-secondary-900">
              {t('home.intro.title')}
            </h2>
            <p className="text-secondary-600 leading-relaxed">
              {t('home.intro.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Rooms Section - Dynamic Carousel */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-secondary-900">
              {t('home.rooms.title')}
            </h2>
            <p className="text-secondary-600 text-lg">
              {t('home.rooms.subtitle')}
            </p>
          </div>
        </div>
          
        {/* Room Cards Carousel - Full Width */}
        <div className="w-full">
          <RoomCards />
        </div>
        
        <div className="container-custom">
          <div className="text-center mt-12">
            <button 
              className="btn-primary"
              onClick={() => navigate('/rooms')}
            >
              {t('home.rooms.viewAll')}
            </button>
          </div>
        </div>
      </section>

      {/* Location Section - Interactive Map */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-secondary-900">
              {t('home.location.title')}
            </h2>
            <p className="text-secondary-600 text-lg">
              {t('home.location.description')}
            </p>
          </div>
          
          <LocationMap />
        </div>
      </section>
    </div>
  );
};

export default Home; 