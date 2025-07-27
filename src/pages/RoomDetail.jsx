import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import { useLanguage } from '../context/LanguageContext';
import { getRoomById } from '../data/rooms';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

const RoomDetail = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // Get room data by ID
  const room = getRoomById(parseInt(roomId));

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-secondary-900 mb-4">Room Not Found</h2>
          <p className="text-secondary-600 mb-6">The room you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/rooms')}
            className="btn-primary"
          >
            Back to Rooms
          </button>
        </div>
      </div>
    );
  }

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setIsDragging(false);
  };

    const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  const handleSwipeStart = (e) => {
    setIsDragging(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setDragStart({ x: clientX, y: 0 });
  };

  const handleSwipeEnd = (e) => {
    if (!isDragging) return;

    const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const deltaX = clientX - dragStart.x;
    const threshold = 50; // minimum distance for a swipe

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        // Swiped right - go to previous image
        prevImage();
      } else {
        // Swiped left - go to next image
        nextImage();
      }
    }

    setIsDragging(false);
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <section className="bg-secondary-50 py-4">
        <div className="container-custom">
          <nav className="flex items-center space-x-2 text-sm text-secondary-600">
            <button
              onClick={() => navigate('/')}
              className="hover:text-primary-600 transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <button
              onClick={() => navigate('/rooms')}
              className="hover:text-primary-600 transition-colors"
            >
              Rooms
            </button>
            <span>/</span>
            <span className="text-secondary-900">{language === 'en' ? room.nameEn : room.name}</span>
          </nav>
        </div>
      </section>

      {/* Room Images */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Main Image Carousel */}
            <div className="space-y-4">
              <Swiper
                spaceBetween={10}
                navigation
                thumbs={{ swiper: thumbsSwiper }}
                modules={[Navigation, Pagination, Thumbs]}
                className="w-full h-96 rounded-lg overflow-hidden"
              >
                {room.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt={`${language === 'en' ? room.nameEn : room.name} ${index + 1}`}
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => openLightbox(index)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Thumbnail Navigation */}
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[Navigation, Thumbs]}
                className="w-full h-20"
              >
                {room.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt={`${language === 'en' ? room.nameEn : room.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover rounded cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
                      onClick={() => openLightbox(index)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Room Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-secondary-900 mb-2">{language === 'en' ? room.nameEn : room.name}</h1>
                <div className="flex items-center gap-4 text-secondary-600">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2L3 7v11h4v-6h6v6h4V7l-7-5z"/>
                    </svg>
                    {room.size}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                    </svg>
                    {room.capacity.adults} adults
                    {room.capacity.children > 0 && `, ${room.capacity.children} children`}
                  </span>
                </div>
                <div className="mt-2 text-secondary-600">
                  <span className="text-sm">{language === 'en' ? room.bedConfigurationEn : room.bedConfiguration}</span>
                </div>
              </div>

              <div className="bg-primary-50 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-2xl font-bold text-primary-600">
                      {room.pricing.currency}{room.pricing.basePrice}
                    </p>
                    <p className="text-sm text-secondary-600">per {room.pricing.period}</p>
                  </div>

                </div>
                <button className="btn-primary w-full">
                  Book Now
                </button>
              </div>


            </div>
          </div>
        </div>
      </section>

      {/* Room Description */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">About This Room</h2>
              <p className="text-secondary-700 leading-relaxed">
                {language === 'en' ? room.longDescriptionEn : room.longDescription}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">Amenities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {room.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <span className="text-xl">{amenity.icon}</span>
                    <span className="text-secondary-700">{language === 'en' ? (amenity.nameEn || amenity.name) : amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Rooms Button */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom text-center">
          <button
            onClick={() => navigate('/rooms')}
            className="btn-secondary"
          >
            ← Back to All Rooms
          </button>
        </div>
      </section>

                  {/* Simple Image Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div
            className="relative"
            onMouseDown={handleSwipeStart}
            onMouseUp={handleSwipeEnd}
            onTouchStart={handleSwipeStart}
            onTouchEnd={handleSwipeEnd}
          >
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="absolute top-4 right-4 text-white text-2xl z-10 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
            >
              ×
            </button>

            {/* Navigation */}
            {room.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl z-10 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
                >
                  ‹
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl z-10 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
                >
                  ›
                </button>
              </>
            )}

            {/* Image */}
            <img
              src={room.images[currentImageIndex]}
              alt={`${language === 'en' ? room.nameEn : room.name} ${currentImageIndex + 1}`}
              className="max-w-full max-h-screen object-contain select-none"
              onDragStart={(e) => e.preventDefault()}
            />

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-3 py-1 rounded">
              {currentImageIndex + 1} / {room.images.length}
              {room.images.length > 1 && (
                <div className="text-xs mt-1 opacity-75">Swipe or use arrows to navigate</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomDetail;