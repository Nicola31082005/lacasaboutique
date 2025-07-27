import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { rooms as allRooms } from '../data/rooms';

const Rooms = () => {
  const { t, language } = useLanguage();
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
              <div
                key={room.id}
                className="card room-card-grid h-[560px] cursor-pointer bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                onClick={() => navigate(`/rooms/${room.id}`)}
              >
                {/* Room Image - Fixed Height */}
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={room.images[0]}
                    alt={language === 'en' ? room.nameEn : room.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    {room.pricing.currency}{room.pricing.basePrice}/{room.pricing.period}
                  </div>
                </div>

                {/* Room Details - Flexible but structured */}
                <div className="p-6 flex flex-col justify-between" style={{ minHeight: '240px' }}>
                  {/* Title - Fixed Height */}
                  <div className="mb-3">
                    <h3 className="text-secondary-900 text-xl font-semibold line-clamp-2 h-14 overflow-hidden leading-7">
                      {language === 'en' ? room.nameEn : room.name}
                    </h3>
                  </div>

                  {/* Description - Fixed Height */}
                  <p className="text-secondary-600 text-sm mb-4 leading-relaxed h-16 overflow-hidden line-clamp-4">
                    {language === 'en' ? room.descriptionEn : room.description}
                  </p>

                  {/* Room Info - Fixed Height */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-secondary-600 h-5">
                    <span>{room.capacity.adults} adults</span>
                    {room.capacity.children > 0 && <span>{room.capacity.children} children</span>}
                    <span>{room.size}</span>
                  </div>

                  {/* Amenities - Fixed Height and Standardized Display */}
                  <div className="mb-4 h-20 overflow-hidden">
                    <h4 className="text-xs font-medium text-secondary-800 mb-2">
                      {t('rooms.details.amenities')}:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.slice(0, 4).map((amenity, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-medium truncate max-w-[110px]"
                          title={language === 'en' ? (amenity.nameEn || amenity.name) : amenity.name}
                        >
                          {amenity.icon} {(language === 'en' ? (amenity.nameEn || amenity.name) : amenity.name).length > 10
                            ? (language === 'en' ? (amenity.nameEn || amenity.name) : amenity.name).substring(0, 10) + '...'
                            : (language === 'en' ? (amenity.nameEn || amenity.name) : amenity.name)
                          }
                        </span>
                      ))}
                      {room.amenities.length > 4 && (
                        <span className="px-2 py-1 bg-secondary-100 text-secondary-600 rounded text-xs font-medium">
                          +{room.amenities.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons - Fixed Height */}
                <div className="px-6 pb-6">
                  <button
                    className="btn-primary w-full text-sm py-3 font-medium"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/rooms/${room.id}`);
                    }}
                  >
                    {t('rooms.details.viewDetails')}
                  </button>
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