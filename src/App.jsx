import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import LanguageSelection from './pages/LanguageSelection';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import About from './pages/About';
import Booking from './pages/Booking';

function App() {
  const [showLanguageSelection, setShowLanguageSelection] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has already selected a language
    const savedLanguage = localStorage.getItem('hotel-language');
    if (savedLanguage) {
      setShowLanguageSelection(false);
    }
    setIsLoading(false);
  }, []);

  const handleLanguageSelected = (language) => {
    setShowLanguageSelection(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
            <span className="text-white text-xl font-bold">LC</span>
          </div>
          <div className="flex space-x-2 justify-center">
            <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce animation-delay-300"></div>
            <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce animation-delay-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <LanguageProvider>
      <div className="App">
        {showLanguageSelection ? (
          <LanguageSelection onLanguageSelected={handleLanguageSelected} />
        ) : (
          <Router>
            <MainApp />
          </Router>
        )}
      </div>
    </LanguageProvider>
  );
}

// Main App component that will contain the hotel website
const MainApp = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/about" element={<About />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
