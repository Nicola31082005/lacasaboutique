import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const LanguageSelection = ({ onLanguageSelected }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const { setLanguage, t } = useLanguage();

  const handleLanguageSelect = (selectedLanguage) => {
    if (isAnimating) return;

    setIsAnimating(true);
    setLanguage(selectedLanguage);

    // Add a short delay for smooth transition
    setTimeout(() => {
      onLanguageSelected(selectedLanguage);
    }, 1200);
  };

  const languages = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
      description: 'Continue in English'
    },
    {
      code: 'bg',
      name: 'Bulgarian',
      nativeName: 'Български',
      flag: '🇧🇬',
      description: 'Продължете на български'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
      {/* Elegant Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary-100 rounded-full opacity-30 blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-secondary-100 rounded-full opacity-40 blur-2xl animate-float animation-delay-600"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-accent-100 rounded-full opacity-25 blur-xl animate-float animation-delay-300"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-lg mx-auto"
        >
          {/* Hotel Identity */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="mb-12"
          >
            <div className="relative mb-6">
              <img
                src="/logo.png"
                alt="La Casa Boutique Logo"
                className="w-24 h-24 object-contain mx-auto drop-shadow-xl"
              />
              <div className="absolute inset-0 w-24 h-24 mx-auto bg-primary-200 rounded-full -z-10 blur-xl opacity-30"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-elegant text-secondary-900 mb-3 text-balance">
              La Casa Boutique
            </h1>
            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-primary-400 to-transparent mx-auto"></div>
          </motion.div>

          {/* Welcome Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-2xl font-elegant text-secondary-800 mb-4">
              Welcome to Excellence
            </h2>
            <h3 className="text-xl font-elegant text-secondary-800 mb-6">
              Добре дошли в съвършенството
            </h3>
            <p className="text-secondary-600 text-lg leading-relaxed max-w-md mx-auto">
              Choose your language to begin your luxury experience
            </p>
            <p className="text-secondary-600 leading-relaxed max-w-md mx-auto mt-2">
              Изберете вашия език, за да започнете луксозното си преживяване
            </p>
          </motion.div>

          {/* Language Selection */}
          <div className="space-y-4 mb-8">
            {languages.map((language, index) => (
              <motion.div
                key={language.code}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.15 }}
                className="relative"
              >
                <button
                  onClick={() => handleLanguageSelect(language.code)}
                  disabled={isAnimating}
                  className={`
                    group relative w-full bg-white border-2 border-primary-200 rounded-2xl p-6
                    transition-all duration-500 ease-out
                    hover:border-primary-400 hover:shadow-xl hover:-translate-y-2
                    focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500
                    ${isAnimating ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
                    overflow-hidden
                  `}
                >
                  {/* Hover Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-secondary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                        {language.flag}
                      </div>
                      <div className="text-left">
                        <div className="text-xl font-elegant text-secondary-900 mb-1">
                          {language.nativeName}
                        </div>
                        <div className="text-sm text-secondary-600 font-medium">
                          {language.description}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <motion.div
                        className="w-3 h-3 bg-primary-400 rounded-full"
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.2 }}
                      ></motion.div>
                      <svg
                        className="w-5 h-5 text-primary-600 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>

          {/* Loading State */}
          {isAnimating && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-primary-200"
            >
              <div className="flex items-center justify-center space-x-2 mb-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce animation-delay-300"></div>
                <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce animation-delay-600"></div>
              </div>
              <p className="text-secondary-700 font-medium">
                Preparing your experience...
              </p>
            </motion.div>
          )}

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 text-secondary-500 text-sm font-medium">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-primary-300"></div>
              <span>Luxury • Comfort • Experience</span>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-primary-300"></div>
            </div>
            <div className="mt-2 text-secondary-500 text-sm">
              Лукс • Комфорт • Преживяване
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary-50/50 to-transparent pointer-events-none"></div>
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-primary-50/30 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default LanguageSelection;