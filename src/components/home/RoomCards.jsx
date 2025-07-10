import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const RoomCards = ({ onNavigate }) => {
  const { t } = useLanguage();

  const rooms = [
    {
      id: 1,
      name: 'Luxury Suite',
      description: 'Spacious suite with panoramic city views, marble bathroom, and premium amenities',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      price: '€150',
      features: ['City View', 'King Bed', 'Marble Bath', 'Balcony']
    },
    {
      id: 2,
      name: 'Deluxe Room',
      description: 'Elegantly designed room with modern comfort and sophisticated style',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
      price: '€120',
      features: ['Garden View', 'Queen Bed', 'Workspace', 'Wi-Fi']
    },
    {
      id: 3,
      name: 'Presidential Suite',
      description: 'Ultimate luxury with separate living area, premium furnishings, and exclusive services',
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      price: '€300',
      features: ['Living Area', 'Butler Service', 'Premium Bar', 'Terrace']
    },
    {
      id: 4,
      name: 'Executive Room',
      description: 'Perfect for business travelers with modern amenities and workspace',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80',
      price: '€100',
      features: ['Business Desk', 'High-Speed Wi-Fi', 'Coffee Machine', 'City View']
    },
    {
      id: 5,
      name: 'Junior Suite',
      description: 'Comfortable accommodation with separate seating area and modern amenities',
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
      price: '€180',
      features: ['Seating Area', 'Minibar', 'Room Service', 'Garden View']
    }
  ];

  return (
    <div className="relative">
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
              className="card h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              {/* Room Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  {room.price}/night
                </div>
              </div>

              {/* Room Details */}
              <div className="p-6">
                <h3 className="mb-3 text-secondary-900 text-xl font-semibold">
                  {room.name}
                </h3>
                
                <p className="text-secondary-600 mb-4 text-sm leading-relaxed">
                  {room.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {room.features.map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="px-2 py-1 bg-primary-50 text-primary-700 rounded text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button 
                    className="btn-secondary flex-1 text-sm py-2"
                    onClick={() => onNavigate && onNavigate('/rooms')}
                  >
                    {t('rooms.details.viewDetails')}
                  </button>
                  <button 
                    className="btn-primary flex-1 text-sm py-2"
                    onClick={() => onNavigate && onNavigate('/booking')}
                  >
                    {t('rooms.details.bookNow')}
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