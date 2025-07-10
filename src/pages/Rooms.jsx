import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Rooms = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { key: 'all', label: t('rooms.filter.all') },
    { key: 'available', label: t('rooms.filter.available') },
    { key: 'luxury', label: t('rooms.filter.luxury') },
    { key: 'standard', label: t('rooms.filter.standard') },
  ];

  const rooms = [
    {
      id: 1,
      name: 'Luxury Suite',
      type: 'luxury',
      guests: 2,
      size: '45m²',
      price: '€150/night',
      amenities: ['Wi-Fi', 'Breakfast', 'Spa'],
      available: true,
    },
    {
      id: 2,
      name: 'Deluxe Room',
      type: 'standard',
      guests: 2,
      size: '35m²',
      price: '€120/night',
      amenities: ['Wi-Fi', 'Breakfast'],
      available: true,
    },
    {
      id: 3,
      name: 'Presidential Suite',
      type: 'luxury',
      guests: 4,
      size: '80m²',
      price: '€300/night',
      amenities: ['Wi-Fi', 'Breakfast', 'Spa', 'Butler'],
      available: false,
    },
    {
      id: 4,
      name: 'Standard Room',
      type: 'standard',
      guests: 2,
      size: '25m²',
      price: '€90/night',
      amenities: ['Wi-Fi'],
      available: true,
    },
  ];

  const filteredRooms = rooms.filter(room => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'available') return room.available;
    return room.type === activeFilter;
  });

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="section-padding bg-gradient-to-br from-primary-100 to-primary-200">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="mb-4 text-primary-800">
              {t('rooms.title')}
            </h1>
            <p className="text-xl text-secondary-700">
              {t('rooms.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b border-secondary-200">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeFilter === filter.key
                    ? 'bg-primary-600 text-white'
                    : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
              <div key={room.id} className="card">
                <div className="h-48 bg-primary-100 flex items-center justify-center relative">
                  <span className="text-primary-600 font-semibold">Room {room.id} Image</span>
                  {!room.available && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                      Unavailable
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-secondary-900">{room.name}</h3>
                    <span className="text-primary-600 font-bold">{room.price}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-secondary-600">
                    <span>{room.guests} {t('rooms.details.guests')}</span>
                    <span>{room.size}</span>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-secondary-800 mb-2">
                      {t('rooms.details.amenities')}:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.map((amenity, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-sm"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="btn-secondary flex-1">
                      {t('rooms.details.viewDetails')}
                    </button>
                    <button 
                      className={`btn-primary flex-1 ${
                        !room.available ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      disabled={!room.available}
                      onClick={() => !room.available ? null : onNavigate && onNavigate('/booking')}
                    >
                      {t('rooms.details.bookNow')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredRooms.length === 0 && (
            <div className="text-center py-12">
              <p className="text-secondary-600 text-lg">
                No rooms found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Rooms; 