import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getFeaturedAmenities } from '../data/amenities';
import hotelInfo from '../data/hotelInfo';

const About = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Get featured amenities from static data
  const amenities = getFeaturedAmenities();

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="section-padding bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-700 text-white">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="mb-4 text-white">
              {t('about.title')}
            </h1>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-padding bg-primary-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6 text-secondary-900">
                {t('about.story.title')}
              </h2>
              <p className="text-secondary-600 leading-relaxed mb-6">
                {t('about.story.description')}
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  <p className="text-secondary-600">{t('about.story.established')} {hotelInfo.features.established}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  <p className="text-secondary-600">{hotelInfo.features.totalRooms} {t('about.story.rooms')}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  <p className="text-secondary-600">{t('about.story.located')} {hotelInfo.contact.location.city}, {hotelInfo.contact.location.country}</p>
                </div>
              </div>
            </div>
            <div className="h-96 rounded-lg overflow-hidden shadow-lg">
              <img
                src="/Carousel-Images/IMG_7670.HEIC_converted.jpg"
                alt="Hotel Story"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-secondary-900">
              {t('about.amenities.title')}
            </h2>
            <p className="text-secondary-600 text-lg">
              {t('about.amenities.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((amenity) => (
              <div key={amenity.id} className="card text-center hover:shadow-xl transition-all duration-300 border border-primary-200">
                <div className="p-8">
                  <div className="text-4xl mb-4">{amenity.icon}</div>
                  <h3 className="mb-2 text-secondary-900">
                    {t(`amenities.${amenity.id}.name`)}
                  </h3>
                  <p className="text-secondary-600">
                    {t(`amenities.${amenity.id}.description`)}
                  </p>
                  <div className="mt-4 text-sm text-primary-600 font-medium">
                    {amenity.hours}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Here Section */}
      <section className="section-padding bg-primary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-secondary-900">
              {t('about.gettingHere.title')}
            </h2>
            <p className="text-secondary-600 text-lg">
              {t('about.gettingHere.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Location */}
            <div className="card text-center hover:shadow-xl transition-all duration-300 border border-primary-200">
              <div className="p-8">
                <div className="text-4xl mb-4">📍</div>
                <h3 className="mb-4 text-secondary-900">
                  {t('about.gettingHere.location.title')}
                </h3>
                <p className="text-secondary-600 leading-relaxed">
                  {t('about.gettingHere.location.description')}
                </p>
              </div>
            </div>

            {/* Directions */}
            <div className="card text-center hover:shadow-xl transition-all duration-300 border border-primary-200">
              <div className="p-8">
                <div className="text-4xl mb-4">🗺️</div>
                <h3 className="mb-4 text-secondary-900">
                  {t('about.gettingHere.directions.title')}
                </h3>
                <div className="space-y-3 text-secondary-600">
                  <p className="text-sm leading-relaxed">
                    {t('about.gettingHere.directions.fromSofia')}
                  </p>
                  <p className="text-sm leading-relaxed">
                    {t('about.gettingHere.directions.fromAirport')}
                  </p>
                  <p className="text-sm leading-relaxed font-medium text-primary-600">
                    {t('about.gettingHere.directions.parking')}
                  </p>
                </div>
              </div>
            </div>

            {/* Airport Transfers */}
            <div className="card text-center hover:shadow-xl transition-all duration-300 border border-primary-200 bg-gradient-to-br from-primary-50 to-primary-100">
              <div className="p-8">
                <div className="text-4xl mb-4">✈️</div>
                <h3 className="mb-4 text-secondary-900">
                  {t('about.gettingHere.transfers.title')}
                </h3>
                <p className="text-secondary-600 leading-relaxed mb-4">
                  {t('about.gettingHere.transfers.description')}
                </p>
                <div className="bg-white p-4 rounded-lg border border-primary-200">
                  <p className="text-sm text-secondary-600 font-medium">
                    {t('about.gettingHere.transfers.contactForBooking')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 text-white">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="mb-4 text-white">
              {t('about.cta.title')} {hotelInfo.name}?
            </h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
              {t('about.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => navigate('/rooms')}
              >
                {t('about.cta.viewRooms')}
              </button>
              <button
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all duration-300"
                onClick={() => navigate('/contact')}
              >
                {t('about.cta.contactUs')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;