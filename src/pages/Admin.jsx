import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminAuth from '../components/admin/AdminAuth';
import RoomEditor from '../components/admin/RoomEditor';
import HotelInfoEditor from '../components/admin/HotelInfoEditor';
import AmenitiesEditor from '../components/admin/AmenitiesEditor';
import { getStoredToken, getStoredRepo, clearToken } from '../utils/github';

// Import current data
import { rooms as initialRooms, roomTypes, roomAmenities } from '../data/rooms';
import { hotelInfo as initialHotelInfo } from '../data/hotelInfo';
import { hotelAmenities as initialHotelAmenities, amenityCategories } from '../data/amenities';

const tabs = [
  { id: 'rooms', label: 'Rooms', icon: '🛏️' },
  { id: 'hotel', label: 'Hotel Info', icon: '🏨' },
  { id: 'amenities', label: 'Amenities', icon: '✨' },
];

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authData, setAuthData] = useState({ token: null, owner: null, repo: null });
  const [activeTab, setActiveTab] = useState('rooms');
  const [isLoading, setIsLoading] = useState(true);

  // Data state
  const [rooms, setRooms] = useState([...initialRooms]);
  const [hotelInfo, setHotelInfo] = useState({ ...initialHotelInfo });
  const [hotelAmenities, setHotelAmenities] = useState([...initialHotelAmenities]);

  useEffect(() => {
    // Check for existing authentication
    const token = getStoredToken();
    const repo = getStoredRepo();

    if (token && repo) {
      setAuthData({ token, owner: repo.owner, repo: repo.repo });
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleAuthenticated = (token, owner, repo) => {
    setAuthData({ token, owner, repo });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    clearToken();
    setIsAuthenticated(false);
    setAuthData({ token: null, owner: null, repo: null });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={handleAuthenticated} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                <span className="text-slate-900 font-bold text-lg">LC</span>
              </div>
              <div>
                <h1 className="text-white font-semibold">La Casa Admin</h1>
                <p className="text-xs text-slate-400">{authData.owner}/{authData.repo}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors text-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="bg-slate-800/30 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'text-amber-400 bg-amber-500/10'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'rooms' && (
            <motion.div
              key="rooms"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <RoomEditor
                rooms={rooms}
                setRooms={setRooms}
                roomTypes={roomTypes}
                roomAmenities={roomAmenities}
                authData={authData}
              />
            </motion.div>
          )}

          {activeTab === 'hotel' && (
            <motion.div
              key="hotel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <HotelInfoEditor
                hotelInfo={hotelInfo}
                setHotelInfo={setHotelInfo}
                authData={authData}
              />
            </motion.div>
          )}

          {activeTab === 'amenities' && (
            <motion.div
              key="amenities"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <AmenitiesEditor
                hotelAmenities={hotelAmenities}
                setHotelAmenities={setHotelAmenities}
                amenityCategories={amenityCategories}
                authData={authData}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Admin;

