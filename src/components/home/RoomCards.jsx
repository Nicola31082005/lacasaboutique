import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { getAvailableRooms } from '../../data/rooms';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const RoomCards = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Get available rooms from static data
  const rooms = getAvailableRooms();

  return (
    <div className="relative px-4 md:px-8">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1280: {
            slidesPerView: 3.5,
            spaceBetween: 32,
          }
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={{
          prevEl: '.rooms-prev',
          nextEl: '.rooms-next',
        }}
        pagination={{
          el: '.rooms-pagination',
          clickable: true,
          bulletClass: 'rooms-bullet',
          bulletActiveClass: 'rooms-bullet-active',
        }}
        loop={true}
        className="rooms-swiper pb-12"
      >
        {rooms.map((room, index) => (
          <SwiperSlide key={room.id}>
            <motion.div
              className="card h-[500px] flex flex-col cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              onClick={() => navigate(`/rooms/${room.id}`)}
            >
              {/* Room Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={room.images[0]}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  {room.pricing.currency}{room.pricing.basePrice}/{room.pricing.period}
                </div>
              </div>

              {/* Room Details */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="mb-3 text-secondary-900 text-xl font-semibold">
                  {room.name}
                </h3>
                
                <p className="text-secondary-600 mb-4 text-sm leading-relaxed h-12 overflow-hidden">
                  {room.description}
                </p>

                {/* Room Info */}
                <div className="mb-4 text-sm text-secondary-600">
                  <div className="flex items-center gap-4">
                    <span>{room.size}</span>
                    <span>{room.capacity.adults} adults</span>
                    {room.capacity.children > 0 && <span>{room.capacity.children} children</span>}
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-6 flex-1">
                  <div className="flex flex-wrap gap-2">
                    {room.amenities.slice(0, 6).map((amenity, amenityIndex) => (
                      <span
                        key={amenityIndex}
                        className="px-2 py-1 bg-primary-50 text-primary-700 rounded text-xs font-medium"
                        title={amenity.name}
                      >
                        {amenity.icon} {amenity.name}
                      </span>
                    ))}
                    {room.amenities.length > 6 && (
                      <span className="px-2 py-1 bg-secondary-100 text-secondary-600 rounded text-xs font-medium">
                        +{room.amenities.length - 6} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-auto">
                  <button 
                    className="btn-primary w-full text-sm py-2"
                    onClick={() => navigate(`/rooms/${room.id}`)}
                  >
                    {t('rooms.details.viewDetails')}
                  </button>
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button className="rooms-prev w-10 h-10 bg-primary-100 hover:bg-primary-600 text-primary-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="rooms-pagination flex space-x-2"></div>

        <button className="rooms-next w-10 h-10 bg-primary-100 hover:bg-primary-600 text-primary-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default RoomCards; 