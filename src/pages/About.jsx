import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getFeaturedAmenities } from '../data/amenities';
import hotelInfo from '../data/hotelInfo';

const About = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Get featured amenities from static data
  const amenities = getFeaturedAmenities();

  const teamMembers = [
    {
      name: 'Maria Petrova',
      role: 'Hotel Manager',
    },
    {
      name: 'Georgi Ivanov',
      role: 'Head Chef',
    },
    {
      name: 'Elena Dimitrova',
      role: 'Guest Relations',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="section-padding bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-700 text-white">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="mb-4 text-white">
              {t('about.title')}
            </h1>
            <p className="text-xl text-secondary-100 max-w-2xl mx-auto">
              Discover the story behind our luxury boutique hotel and the dedicated team that makes it special.
            </p>
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
                  <p className="text-secondary-600">Established in {hotelInfo.features.established}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  <p className="text-secondary-600">{hotelInfo.features.totalRooms} luxurious rooms and suites</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  <p className="text-secondary-600">Located in {hotelInfo.contact.location.city}, {hotelInfo.contact.location.country}</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-secondary-200 to-secondary-300 h-96 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-secondary-700 font-semibold">Hotel Story Image</span>
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
              Luxury amenities crafted for your comfort
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((amenity) => (
              <div key={amenity.id} className="card text-center hover:shadow-xl transition-all duration-300 border border-primary-200">
                <div className="p-8">
                  <div className="text-4xl mb-4">{amenity.icon}</div>
                  <h3 className="mb-2 text-secondary-900">
                    {amenity.name}
                  </h3>
                  <p className="text-secondary-600">
                    {amenity.description}
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

     
      {/* Call to Action Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 text-white">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="mb-4 text-white">
              Ready to Experience {hotelInfo.name}?
            </h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied guests who have made unforgettable memories with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => navigate('/rooms')}
              >
                View Our Rooms
              </button>
              <button 
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all duration-300"
                onClick={() => navigate('/contact')}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 