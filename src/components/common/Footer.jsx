import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  const socialLinks = [
    { name: 'Facebook', icon: '📘', url: '#' },
    { name: 'Instagram', icon: '📷', url: '#' },
    { name: 'Twitter', icon: '🐦', url: '#' },
    { name: 'LinkedIn', icon: '💼', url: '#' },
  ];

  const quickLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.rooms'), path: '/rooms' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.booking'), path: '/booking' },
  ];

  const contactInfo = [
    { 
      type: 'address', 
      label: t('footer.contact.address'), 
      value: '123 Luxury Street, Sofia, Bulgaria' 
    },
    { 
      type: 'phone', 
      label: t('footer.contact.phone'), 
      value: '+359 2 123 4567' 
    },
    { 
      type: 'email', 
      label: t('footer.contact.email'), 
      value: 'info@lacasaboutique.com' 
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
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">LC</span>
              </div>
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
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="w-10 h-10 bg-secondary-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-300"
                  title={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
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

        {/* Newsletter Section */}
        <div className="border-t border-secondary-800 py-8">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-white mb-4">
              Stay Connected
            </h4>
            <p className="text-secondary-300 mb-6">
              Subscribe to our newsletter for special offers and updates
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-secondary-800 border border-secondary-700 text-white placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-300 font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-secondary-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-secondary-400 text-sm">
              {t('footer.copyright')}
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-secondary-400 hover:text-primary-400 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-secondary-400 hover:text-primary-400 transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-secondary-400 hover:text-primary-400 transition-colors duration-200">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 