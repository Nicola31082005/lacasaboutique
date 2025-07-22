import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import hotelInfo from '../../data/hotelInfo';

const Footer = () => {
  const { t } = useLanguage();

  

  const quickLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.rooms'), path: '/rooms' },
    { name: t('nav.about'), path: '/about' },
  ];

  const contactInfo = [
    { 
      type: 'address', 
      label: t('footer.contact.address'), 
      value: hotelInfo.contact.address
    },
    { 
      type: 'phone', 
      label: t('footer.contact.phone'), 
      value: `${hotelInfo.contact.phone} / ${hotelInfo.contact.phoneSecondary} / ${hotelInfo.contact.phoneThird}`
    },
    { 
      type: 'email', 
      label: t('footer.contact.email'), 
      value: hotelInfo.contact.email
    },
  ];

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Hotel Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/logo.png" 
                alt="La Casa Boutique Logo" 
                className="w-20 h-16 object-contain"
              />
              <div>
                <h3 className="text-xl font-elegant text-white">
                  La Casa Boutique - GF
                </h3>
              </div>
            </div>
            <p className="text-secondary-300 leading-relaxed mb-6 max-w-md">
              Experience luxury and comfort in the heart of the city. Our boutique hotel offers 
              personalized service and elegant accommodations for the discerning traveler.
            </p>
         
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-secondary-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              {t('footer.contact.title')}
            </h4>
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <div key={info.type} className="flex flex-col">
                  <span className="text-secondary-400 text-sm mb-1">
                    {info.label}
                  </span>
                  <span className="text-secondary-200">
                    {info.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>



        {/* Bottom Footer */}
        <div className="border-t border-secondary-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-secondary-400 text-sm">
              {t('footer.copyright')}
            </p>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 