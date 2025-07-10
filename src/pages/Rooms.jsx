import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { rooms as allRooms } from '../data/rooms';

const Rooms = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

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

      {/* Rooms Grid */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allRooms.map((room) => (
              <div key={room.id} className="card">
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={room.images[0]}
                    alt={room.name}
                    className="w-full h-full object-cover"
                  />
                  {!room.availability.available && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                      Unavailable
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-secondary-900">{room.name}</h3>
                    <span className="text-primary-600 font-bold">
                      {room.pricing.currency}{room.pricing.basePrice}/{room.pricing.period}
                    </span>
                  </div>
                  
                  <p className="text-secondary-600 text-sm mb-4 leading-relaxed">
                    {room.description}
                  </p>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-secondary-600">
                    <span>{room.capacity.adults} adults</span>
                    {room.capacity.children > 0 && <span>{room.capacity.children} children</span>}
                    <span>{room.size}</span>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-secondary-800 mb-2">
                      {t('rooms.details.amenities')}:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.slice(0, 4).map((amenity, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-sm"
                          title={amenity.name}
                        >
                          {amenity.icon} {amenity.name}
                        </span>
                      ))}
                      {room.amenities.length > 4 && (
                        <span className="px-2 py-1 bg-secondary-100 text-secondary-600 rounded text-sm">
                          +{room.amenities.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="btn-primary w-full">
                      {t('rooms.details.viewDetails')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {allRooms.length === 0 && (
            <div className="text-center py-12">
              <p className="text-secondary-600 text-lg">
                No rooms available.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Rooms; 