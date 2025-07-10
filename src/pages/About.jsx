import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const About = ({ onNavigate }) => {
  const { t } = useLanguage();

  const amenities = [
    { key: 'wifi', icon: '📶' },
    { key: 'parking', icon: '🅿️' },
    { key: 'breakfast', icon: '🍳' },
    { key: 'concierge', icon: '🏨' },
    { key: 'spa', icon: '🧘‍♀️' },
    { key: 'fitness', icon: '💪' },
  ];

  const teamMembers = [
    {
      name: 'Maria Petrova',
      role: 'Hotel Manager',
      description: 'Leading our team with 15 years of hospitality experience.',
    },
    {
      name: 'Georgi Ivanov',
      role: 'Head Chef',
      description: 'Creating culinary masterpieces with local and international flavors.',
    },
    {
      name: 'Elena Dimitrova',
      role: 'Guest Relations',
      description: 'Ensuring every guest has an unforgettable experience.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="section-padding bg-gradient-to-br from-primary-100 to-primary-200">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="mb-4 text-primary-800">
              {t('about.title')}
            </h1>
            <p className="text-xl text-secondary-700 max-w-2xl mx-auto">
              Discover the story behind our luxury hotel and the dedicated team that makes it special.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6 text-secondary-900">
                {t('about.story.title')}
              </h2>
              <p className="text-secondary-600 leading-relaxed mb-6">
                {t('about.story.description')}
              </p>
              <p className="text-secondary-600 leading-relaxed">
                Our commitment to excellence extends beyond comfortable accommodations. We believe in creating moments that last a lifetime, whether you're here for business or pleasure.
              </p>
            </div>
            <div className="bg-primary-100 h-96 rounded-lg flex items-center justify-center">
              <span className="text-primary-600 font-semibold">Hotel Story Image</span>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-secondary-900">
              {t('about.amenities.title')}
            </h2>
            <p className="text-secondary-600 text-lg">
              Everything you need for a perfect stay
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((amenity) => (
              <div key={amenity.key} className="card text-center">
                <div className="p-8">
                  <div className="text-4xl mb-4">{amenity.icon}</div>
                  <h3 className="mb-2 text-secondary-900">
                    {t(`about.amenities.${amenity.key}`)}
                  </h3>
                  <p className="text-secondary-600">
                    Enjoy premium {amenity.key} services during your stay
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-secondary-900">
              {t('about.team.title')}
            </h2>
            <p className="text-secondary-600 text-lg">
              {t('about.team.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="card text-center">
                <div className="p-8">
                  <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary-600 font-semibold text-lg">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="mb-2 text-secondary-900">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                  <p className="text-secondary-600 text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="mb-4 text-white">
              Ready to Experience La Casa Boutique - GF?
            </h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied guests who have made unforgettable memories with us.
            </p>
            <button 
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors duration-300"
              onClick={() => onNavigate && onNavigate('/booking')}
            >
              Book Your Stay Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 