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
    }, 800);
  };

  const languages = [
    {
      code: 'en',
      name: 'English',
      flag: '🇺🇸',
      bgColor: 'bg-gradient-to-br from-blue-600 to-blue-800',
      hoverColor: 'hover:from-blue-700 hover:to-blue-900'
    },
    {
      code: 'bg',
      name: 'Български',
      flag: '🇧🇬',
      bgColor: 'bg-gradient-to-br from-green-600 to-green-800',
      hoverColor: 'hover:from-green-700 hover:to-green-900'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md mx-auto"
      >
        {/* Hotel Logo/Title */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white text-2xl font-bold">LC</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-elegant text-secondary-900 mb-2">
            La Casa Boutique - GF
          </h1>
          <div className="w-24 h-1 bg-primary-600 mx-auto rounded-full"></div>
        </motion.div>

        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-xl md:text-2xl text-secondary-700 mb-4">
            Welcome / Добре дошли
          </h2>
          <p className="text-secondary-600 text-lg">
            Please select your preferred language
            <br />
            Моля, изберете предпочитания от вас език
          </p>
        </motion.div>

        {/* Language Options */}
        <div className="space-y-4">
          {languages.map((language, index) => (
            <motion.button
              key={language.code}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleLanguageSelect(language.code)}
              disabled={isAnimating}
              className={`
                w-full p-6 rounded-xl text-white font-semibold text-lg
                ${language.bgColor} ${language.hoverColor}
                transition-all duration-300 shadow-lg hover:shadow-xl
                transform hover:-translate-y-1 active:translate-y-0
                ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}
                flex items-center justify-center space-x-4
              `}
            >
              <span className="text-3xl">{language.flag}</span>
              <span className="text-xl">{language.name}</span>
              <motion.div
                className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </motion.div>
            </motion.button>
          ))}
        </div>

        {/* Loading Animation */}
        {isAnimating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 flex items-center justify-center"
          >
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce animation-delay-300"></div>
              <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce animation-delay-600"></div>
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 text-center text-secondary-500 text-sm"
        >
          <p>Experience luxury and comfort</p>
          <p>Насладете се на лукс и комфорт</p>
        </motion.div>
      </motion.div>

      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-secondary-200 rounded-full opacity-20 animate-float animation-delay-600"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent-200 rounded-full opacity-20 animate-float animation-delay-300"></div>
      </div>
    </div>
  );
};

export default LanguageSelection; 