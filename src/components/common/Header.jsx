import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPage = location.pathname;

  const navigationItems = [
    { key: 'home', label: t('nav.home'), path: '/' },
    { key: 'rooms', label: t('nav.rooms'), path: '/rooms' },
    { key: 'about', label: t('nav.about'), path: '/about' },
  ];

  const handleLanguageToggle = () => {
    const newLanguage = language === 'en' ? 'bg' : 'en';
    setLanguage(newLanguage);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 cursor-pointer">
            <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">LC</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-elegant text-secondary-900">
                La Casa Boutique - GF
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={`font-medium transition-colors duration-200 ${
                  currentPage === item.path
                    ? 'text-primary-600 border-b-2 border-primary-600 pb-1'
                    : 'text-secondary-700 hover:text-primary-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Language Switcher & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <button
              onClick={handleLanguageToggle}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-secondary-300 hover:border-primary-500 transition-colors duration-200"
            >
              <span className="text-lg">
                {language === 'en' ? '🇺🇸' : '🇧🇬'}
              </span>
              <span className="text-sm font-medium text-secondary-700">
                {language === 'en' ? 'EN' : 'BG'}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span 
                  className={`bg-secondary-900 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
                  }`}
                />
                <span 
                  className={`bg-secondary-900 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span 
                  className={`bg-secondary-900 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-secondary-200 bg-white">
            <nav className="py-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  onClick={handleMobileMenuClose}
                  className={`block w-full text-left px-4 py-3 font-medium transition-colors duration-200 ${
                    currentPage === item.path
                      ? 'text-primary-600 bg-primary-50 border-l-4 border-primary-600'
                      : 'text-secondary-700 hover:text-primary-600 hover:bg-secondary-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 